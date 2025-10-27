import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const successUrl = process.env.STRIPE_SUCCESS_URL || 'http://localhost:3000/merci';
const cancelUrl = process.env.STRIPE_CANCEL_URL || 'http://localhost:3000/boutique';

export async function POST(request) {
  try {
    const { items = [] } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Le panier est vide.' }, { status: 400 });
    }

    const lineItems = items
      .filter((item) => Number.isFinite(item.price) && item.price > 0)
      .map((item) => {
        const amount = Math.round(item.price * 100);
        const safeAmount = Number.isFinite(amount) && amount >= 50 ? amount : 50;

        return {
        adjustable_quantity: { enabled: true, minimum: 1 },
        quantity: item.quantity ?? 1,
        price_data: {
          currency: 'eur',
          unit_amount: safeAmount,
          product_data: {
            name: item.title ?? 'Produit',
            metadata: {
              id: item.id,
              href: item.href ?? '',
            },
            images: item.image ? [item.image] : undefined,
          },
        },
      }});

    if (lineItems.length === 0) {
      return NextResponse.json({ error: 'Aucun article valide à facturer.' }, { status: 400 });
    }

    const baseSuccessUrl = successUrl.replace(/\s+/g, '');
    const successUrlWithSession = `${baseSuccessUrl}${baseSuccessUrl.includes('?') ? '&' : '?'}session_id={CHECKOUT_SESSION_ID}`;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: successUrlWithSession,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Impossible de créer la session de paiement.' }, { status: 500 });
  }
}
