import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  lite:  process.env.STRIPE_LITE_PRICE_ID  || 'price_lite99',
  pro:   process.env.STRIPE_PRO_PRICE_ID   || 'price_pro299',
  agent: process.env.STRIPE_AGENT_PRICE_ID || 'price_agent99',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { userId, email, plan, successUrl, cancelUrl } = req.body;
  if (!userId || !plan || !PRICES[plan]) return res.status(400).json({ error: 'Invalid request' });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: PRICES[plan], quantity: 1 }],
      subscription_data: { metadata: { userId, plan } },
      metadata: { userId, plan },
      success_url: successUrl + '&session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: err.message });
  }
}
