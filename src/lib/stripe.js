import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set. Add it to your environment configuration.');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20',
});
