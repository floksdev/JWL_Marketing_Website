import Link from 'next/link';
import crypto from 'crypto';
import { stripe } from '@/lib/stripe';
import { PRODUCTS } from '@/lib/catalogue';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { getProductStatsMap, getReviewsForOrder } from '@/lib/supabase/products';
import OrderReviewSection from '@/components/boutique/OrderReviewSection';
import CahierDesChargesModal from '@/components/boutique/CahierDesChargesModal';
import { sendOrderConfirmationEmail } from '@/lib/email/orderConfirmation';
import { buildOrderLink, formatOrderNumber } from '@/lib/orders';
import { isAdminRequest } from '@/lib/auth/admin';

export const metadata = {
  title: 'Merci pour votre commande — JWL Marketing',
  description: 'Confirmation de commande, récapitulatif de paiement et accès à votre espace client JWL Marketing.',
};

function formatAmount(amount, currency = 'eur') {
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

export default async function MerciPage({ searchParams }) {
  const params = await searchParams;
  const sessionIdParam = params?.session_id ?? null;
  const orderNumberParam = params?.order ?? null;
  const tokenParam = params?.token ?? null;
  const isAdminViewer = await isAdminRequest();

  const supabase = getSupabaseAdmin();

  let session = null;
  let orderRecord = null;
  let reviewSourceItems = [];

  // 1. Accès direct par numéro de commande (?order=004)
  if (orderNumberParam) {
    const numericString = String(orderNumberParam).replace(/\D/g, '');
    if (numericString) {
      const orderNumberValue = Number(numericString);
      if (!Number.isNaN(orderNumberValue)) {
        const { data: orderByNumber, error } = await supabase
          .from('orders')
          .select('id, order_number, items, total_cents, currency, email, form_status, form_sections, form_payload, form_access_token, form_updated_at')
          .eq('order_number', orderNumberValue)
          .maybeSingle();

        if (error) {
          console.error('Supabase order lookup (by number) failed:', error);
        } else if (orderByNumber) {
          orderRecord = orderByNumber;
          if (Array.isArray(orderByNumber.items)) {
            reviewSourceItems = orderByNumber.items;
          }
        }
      }
    }
  }

  // 2. Retour immédiat Stripe (?session_id=...)
  if (!orderRecord && sessionIdParam) {
    try {
      session = await stripe.checkout.sessions.retrieve(sessionIdParam, {
        expand: ['line_items', 'line_items.data.price.product'],
      });

      const stripeLineItems = session?.line_items?.data ?? [];
      const simplifiedItems = stripeLineItems.map((item) => {
        const metadataId = item.price?.product?.metadata?.id;
        const catalogueProduct = metadataId ? PRODUCTS.find(product => product.slug === metadataId) : null;
        const fallbackImage = catalogueProduct?.image || item.price?.product?.images?.[0] || null;

        return {
          id: metadataId ?? item.id,
          slug: metadataId ?? item.id,
          name: item.description,
          quantity: item.quantity,
          amount_total: item.amount_total,
          amount_subtotal: item.amount_subtotal,
          currency: session.currency,
          image: fallbackImage,
        };
      });

      reviewSourceItems = simplifiedItems;

        const { data: existingOrder, error: existingOrderError } = await supabase
        .from('orders')
        .select('id, order_number, items, total_cents, currency, email, form_status, form_sections, form_payload, form_access_token, form_updated_at')
        .eq('session_id', sessionIdParam)
        .maybeSingle();

      if (existingOrderError) {
        console.error('Supabase order lookup failed:', existingOrderError);
      }

      if (existingOrder) {
        orderRecord = existingOrder;
      } else {
        const newAccessToken = crypto.randomBytes(24).toString('hex');
        let createdOrder = null;
        let createError = null;

        // Primary path: use transactional RPC if available
        const rpcResult = await supabase.rpc('create_order_with_number', {
          p_session_id: sessionIdParam,
          p_email: session.customer_details?.email ?? null,
          p_currency: session.currency ?? 'eur',
          p_total_cents: session.amount_total ?? 0,
          p_items: simplifiedItems,
          p_form_status: 'progress',
          p_form_sections: {},
          p_form_payload: {},
          p_form_access_token: newAccessToken,
        });
        createdOrder = rpcResult.data;
        createError = rpcResult.error;

        const rpcUnavailable = createError && (createError.code === 'PGRST202' || /Could not find the function/i.test(createError.message ?? ''));

        // Fallback to legacy insert if RPC not deployed yet
        if (rpcUnavailable) {
          let fallbackOrderNumber = null;
          try {
            const { data: lastOrder } = await supabase
              .from('orders')
              .select('order_number')
              .order('order_number', { ascending: false, nullsFirst: false })
              .limit(1)
              .maybeSingle();
            const lastNumber = Number(lastOrder?.order_number);
            fallbackOrderNumber = Number.isFinite(lastNumber) ? lastNumber + 1 : 1;
          } catch (counterError) {
            console.warn('Legacy order number fallback failed, defaulting to timestamp-based value:', counterError);
            fallbackOrderNumber = Number(new Date().getTime().toString().slice(-6));
          }

          const legacyResult = await supabase
            .from('orders')
            .insert({
              session_id: sessionIdParam,
              order_number: fallbackOrderNumber,
              email: session.customer_details?.email ?? null,
              currency: session.currency,
              total_cents: session.amount_total ?? 0,
              items: simplifiedItems,
              form_status: 'progress',
              form_sections: {},
              form_payload: {},
              form_access_token: newAccessToken,
            })
            .select('id, order_number, items, total_cents, currency, email, form_status, form_sections, form_payload, form_access_token, form_updated_at')
            .single();

          createdOrder = legacyResult.data;
          createError = legacyResult.error;
        }

        if (createError) {
            if (createError.code === '23505') {
              const { data: duplicateOrder } = await supabase
                .from('orders')
                .select('id, order_number, items, total_cents, currency, email, form_status, form_sections, form_payload, form_access_token, form_updated_at')
                .eq('session_id', sessionIdParam)
                .maybeSingle();
            if (duplicateOrder) {
              orderRecord = duplicateOrder;
            }
          } else {
            console.error('Supabase order insert failed:', createError);
          }
        } else {
          orderRecord = createdOrder;
          const customerEmail = session.customer_details?.email ?? null;

          if (customerEmail) {
            const formattedNumber = formatOrderNumber(createdOrder?.order_number);
            const absoluteOrderLink = buildOrderLink(formattedNumber, createdOrder?.form_access_token);

            try {
              await sendOrderConfirmationEmail({
                to: customerEmail,
                customerName: session.customer_details?.name ?? null,
                orderNumber: formattedNumber ?? createdOrder?.order_number?.toString() ?? sessionIdParam,
                orderLink: absoluteOrderLink,
                formLink: absoluteOrderLink,
                items: simplifiedItems,
                totalCents: session.amount_total ?? createdOrder?.total_cents ?? 0,
                currency: session.currency ?? createdOrder?.currency ?? 'eur',
              });
            } catch (emailError) {
              console.error('Order confirmation email failed:', emailError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Impossible de récupérer la session Stripe', error);
    }
  }

  if (orderRecord && (!reviewSourceItems || reviewSourceItems.length === 0)) {
    if (Array.isArray(orderRecord.items)) {
      reviewSourceItems = orderRecord.items;
    }
  }

  if (orderRecord && !orderRecord.form_access_token) {
    const refreshedToken = crypto.randomBytes(24).toString('hex');
    const { data: updatedOrder } = await supabase
      .from('orders')
      .update({ form_access_token: refreshedToken })
      .eq('id', orderRecord.id)
      .select('form_access_token')
      .single();
    orderRecord.form_access_token = updatedOrder?.form_access_token || refreshedToken;
  }

  const reviewMap = new Map();
  const slugs = [];
  for (const item of reviewSourceItems) {
    const slug = item.slug ?? item.id;
    if (!slug || reviewMap.has(slug)) continue;
    reviewMap.set(slug, item);
    slugs.push(slug);
  }

  const [statsMap, existingReviews] = await Promise.all([
    slugs.length ? getProductStatsMap(slugs) : Promise.resolve(new Map()),
    orderRecord?.id ? getReviewsForOrder(orderRecord.id) : Promise.resolve([]),
  ]);

  const reviewBySlug = new Map(existingReviews.map((review) => [review.product_slug, review]));

  const reviewItems = slugs.map((slug) => {
    const rawItem = reviewMap.get(slug);
    const catalogueProduct = PRODUCTS.find(product => product.slug === slug);
    const stats = statsMap.get(slug);
    const existingReview = reviewBySlug.get(slug);

    return {
      slug,
      title: rawItem?.name ?? rawItem?.description ?? catalogueProduct?.title ?? slug,
      image: rawItem?.image ?? catalogueProduct?.image ?? null,
      stats: {
        average_rating: stats?.average_rating ?? catalogueProduct?.rating ?? 0,
        total_reviews_count: stats?.total_reviews_count ?? catalogueProduct?.reviewsCount ?? 0,
      },
      existingReview: existingReview
        ? { rating: existingReview.rating }
        : null,
    };
  });

  const orderNumber = formatOrderNumber(orderRecord?.order_number);
  const currency = session?.currency ?? orderRecord?.currency ?? 'eur';
  const totalCents = session?.amount_total ?? orderRecord?.total_cents ?? null;
  const recipientEmail = session?.customer_details?.email ?? orderRecord?.email ?? null;
  const orderAccessToken = orderRecord?.form_access_token ?? null;
  const tokenMatches = Boolean(tokenParam && orderAccessToken && tokenParam === orderAccessToken);
  const viewerIsSessionOwner = Boolean(sessionIdParam && orderRecord);
  const viewerCanManage = isAdminViewer || viewerIsSessionOwner || tokenMatches;
  const formStatus = orderRecord?.form_status ?? 'todo';
  const formSections = orderRecord?.form_sections ?? {};
  const formPayload = orderRecord?.form_payload ?? {};
  const formUpdatedAt = orderRecord?.form_updated_at ?? null;
  const formAccessToken = viewerCanManage ? orderAccessToken : (isAdminViewer ? orderAccessToken : null);
  const canReview = isAdminViewer || viewerCanManage;

  const summaryItems = reviewSourceItems;
  const hasSummary = summaryItems.length > 0;

  const directLink = orderNumber ? buildOrderLink(orderNumber, orderAccessToken) : null;
  const showReviewSection = Boolean(orderRecord?.id && reviewItems.length && canReview);

  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-6 py-16">
      <header>
        <h1 className="text-3xl font-extrabold text-neutral-900 sm:text-4xl">Merci pour votre confiance !</h1>
        <p className="mt-4 max-w-2xl text-[15.5px] leading-7 text-neutral-700">
          Votre paiement a bien été enregistré. Retrouvez ci-dessous le détail de la commande et notez les packs reçus.
        </p>
      </header>

      {hasSummary ? (
        <section className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="border-b border-black/10 px-6 py-4">
            <p className="text-sm uppercase tracking-wide text-neutral-500">Commande confirmée</p>
            <p className="text-lg font-semibold text-neutral-900">
              {orderNumber ? `Commande #${orderNumber}` : sessionIdParam ? `Session ${sessionIdParam.slice(-6)}` : 'Commande'}
            </p>
            {recipientEmail ? (
              <p className="text-sm text-neutral-600">Envoyé à : {recipientEmail}</p>
            ) : null}
            {directLink ? (
              <p className="mt-2 text-xs text-neutral-500">
                Lien direct : <Link href={directLink} className="font-medium underline">{directLink}</Link>
              </p>
            ) : null}
          </div>

          <div className="px-6 py-4">
            <ul className="space-y-3">
              {summaryItems.map((item) => (
                <li key={`${item.slug}-${item.id ?? ''}`} className="flex items-start justify-between gap-4 text-sm text-neutral-700">
                  <div className="flex flex-1 items-start gap-3">
                    {item.image ? (
                      <div className="relative h-14 w-14 overflow-hidden rounded-md border border-black/10 bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name ?? item.title ?? item.slug} className="h-full w-full object-cover" />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-md border border-dashed border-black/20 text-xs text-neutral-400">
                        Visuel
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">{item.name ?? item.title ?? item.slug}</p>
                      <p className="text-xs text-neutral-500">
                        Quantité : {item.quantity ?? 1}
                        {Number.isFinite(item.amount_subtotal) ? ` • Sous-total : ${formatAmount(item.amount_subtotal, currency)}` : ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">
                    {Number.isFinite(item.amount_total) ? formatAmount(item.amount_total, currency) : '—'}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between border-t border-black/10 px-6 py-4 text-sm text-neutral-700">
            <span>Total payé</span>
            <span className="text-base font-semibold text-neutral-900">
              {Number.isFinite(totalCents) ? formatAmount(totalCents, currency) : '—'}
            </span>
          </div>
        </section>
      ) : (
        <p className="mt-10 text-sm text-neutral-600">
          Nous n’avons pas pu retrouver le détail de la commande. Si vous avez la moindre question, contactez-nous avec votre reçu Stripe.
        </p>
      )}

      {orderRecord ? (
        <section className="mt-10">
          <CahierDesChargesModal
            orderId={orderRecord.id}
            canManage={viewerCanManage}
            isAdmin={isAdminViewer}
            accessToken={formAccessToken}
            initialResponses={formPayload}
            initialStatuses={formSections}
            status={formStatus}
            lastUpdate={formUpdatedAt}
          />
        </section>
      ) : null}

      {showReviewSection ? (
        <section className="mt-10">
          <OrderReviewSection
            orderId={orderRecord.id}
            orderNumber={orderNumber}
            items={reviewItems}
            canReview={canReview}
            accessToken={formAccessToken}
          />
        </section>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/boutique"
          className="inline-flex items-center justify-center rounded-full border border-neutral-900 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
        >
          Retour à la boutique
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Besoin d’aide ? Contacte-moi
        </Link>
      </div>
    </main>
  );
}
