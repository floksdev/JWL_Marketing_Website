import Link from 'next/link';
import { stripe } from '@/lib/stripe';
import { PRODUCTS } from '@/lib/catalogue';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { getProductStatsMap, getReviewsForOrder } from '@/lib/supabase/products';
import OrderReviewSection from '@/components/boutique/OrderReviewSection';
import { sendOrderConfirmationEmail } from '@/lib/email/orderConfirmation';

export const metadata = {
  title: 'Merci pour votre commande — JWL Marketing',
};

function formatAmount(amount, currency = 'eur') {
  if (!Number.isFinite(amount)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency,
  }).format(amount / 100);
}

function formatOrderNumber(value) {
  if (value == null) return null;
  const num = Number(value);
  if (Number.isNaN(num)) return null;
  return String(num).padStart(3, '0');
}

const merciPageBaseUrl = process.env.MERCI_PAGE_URL || process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/merci';

function buildOrderLink(orderNumber) {
  if (!orderNumber) return null;
  if (!merciPageBaseUrl) return `/merci?order=${orderNumber}`;

  try {
    const url = new URL(merciPageBaseUrl);
    url.search = '';
    url.hash = '';
    url.searchParams.set('order', orderNumber);
    return url.toString();
  } catch {
    return `/merci?order=${orderNumber}`;
  }
}

export default async function MerciPage({ searchParams }) {
  const params = await searchParams;
  const sessionIdParam = params?.session_id ?? null;
  const orderNumberParam = params?.order ?? null;

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
          .select('id, order_number, items, total_cents, currency, email')
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
        .select('id, order_number, items, total_cents, currency, email')
        .eq('session_id', sessionIdParam)
        .maybeSingle();

      if (existingOrderError) {
        console.error('Supabase order lookup failed:', existingOrderError);
      }

      if (existingOrder) {
        orderRecord = existingOrder;
      } else {
        const { data: createdOrder, error: createError } = await supabase
          .from('orders')
          .insert({
            session_id: sessionIdParam,
            email: session.customer_details?.email ?? null,
            currency: session.currency,
            total_cents: session.amount_total ?? 0,
            items: simplifiedItems,
          })
          .select('id, order_number, items, total_cents, currency, email')
          .single();

        if (createError) {
          if (createError.code === '23505') {
            const { data: duplicateOrder } = await supabase
              .from('orders')
              .select('id, order_number, items, total_cents, currency, email')
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
            const absoluteOrderLink = buildOrderLink(formattedNumber);

            try {
              await sendOrderConfirmationEmail({
                to: customerEmail,
                customerName: session.customer_details?.name ?? null,
                orderNumber: formattedNumber ?? createdOrder?.order_number?.toString() ?? sessionIdParam,
                orderLink: absoluteOrderLink,
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

  const summaryItems = reviewSourceItems;
  const hasSummary = summaryItems.length > 0;

  const directLink = orderNumber ? `/merci?order=${orderNumber}` : null;

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

      {orderRecord?.id && reviewItems.length ? (
        <section className="mt-12">
          <OrderReviewSection orderId={orderRecord.id} orderNumber={orderNumber} items={reviewItems} />
        </section>
      ) : null}
    </main>
  );
}
