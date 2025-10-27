require('dotenv').config({ path: '.env.local' });

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('STRIPE_SECRET_KEY is missing. Please set it in your .env.local file.');
  process.exit(1);
}

const stripe = require('stripe')(stripeSecretKey);

(async () => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: Math.round(0.01 * 100),
            product_data: {
              name: 'Produit Test Stripe',
            },
          },
        },
      ],
      success_url: 'http://localhost:3000/merci',
      cancel_url: 'http://localhost:3000/boutique',
    });
    console.log(session.url);
  } catch (error) {
    console.error(error);
  }
})();
