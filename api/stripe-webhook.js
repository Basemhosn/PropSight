import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  const getStatus = (plan) => {
    if (plan === 'pro')   return 'pro';
    if (plan === 'lite')  return 'lite';
    if (plan === 'agent') return 'agent';
    return 'free';
  };

  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const plan   = session.metadata?.plan;
        if (userId && plan) {
          await supabase.from('profiles').update({
            subscription_status: getStatus(plan),
            stripe_customer_id:  session.customer,
          }).eq('id', userId);
          console.log(`✅ ${plan} activated for user ${userId}`);
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub    = event.data.object;
        const plan   = sub.metadata?.plan;
        const userId = sub.metadata?.userId;
        const status = sub.status;
        if (userId) {
          const newStatus = status === 'active' ? getStatus(plan) : status === 'past_due' ? getStatus(plan) : 'free';
          await supabase.from('profiles').update({
            subscription_status: newStatus,
          }).eq('stripe_customer_id', sub.customer);
          console.log(`🔄 Subscription updated: ${newStatus} for customer ${sub.customer}`);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        await supabase.from('profiles').update({
          subscription_status: 'free',
        }).eq('stripe_customer_id', sub.customer);
        console.log(`❌ Subscription cancelled for customer ${sub.customer}`);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        await supabase.from('profiles').update({
          subscription_status: 'free',
        }).eq('stripe_customer_id', invoice.customer);
        console.log(`💳 Payment failed for customer ${invoice.customer}`);
        break;
      }

      default:
        console.log(`Unhandled event: ${event.type}`);
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: err.message });
  }

  res.status(200).json({ received: true });
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => data += chunk);
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
