import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return new Response('Missing stripe signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook error:', err)
    return new Response('Webhook Error', { status: 400 })
  }

  // ==============================
  // FUNÇÃO CENTRAL DE ATUALIZAÇÃO
  // ==============================
  const handleSubscriptionUpdate = async (
    subscription: Stripe.Subscription
  ) => {
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('stripe_customer_id', subscription.customer as string)
      .single()

    if (!profile) {
      console.error(
        'Webhook Error: Profile not found for customer',
        subscription.customer
      )
      return
    }

    const subscriptionData = {
      id: subscription.id,
      user_id: profile.id,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      period_start_date: new Date(
        subscription.current_period_start * 1000
      ).toISOString(),
      period_end_date: new Date(
        subscription.current_period_end * 1000
      ).toISOString(),
      metadata: subscription.metadata,
    }

    // salva histórico (upsert)
    await supabaseAdmin
      .from('subscriptions')
      .upsert(subscriptionData)

    // mantém status atual no profile
    await supabaseAdmin
      .from('profiles')
      .update({
        subscription_status: subscription.status,
        stripe_subscription_id: subscription.id,
      })
      .eq('id', profile.id)
  }

  // ==============================
  // EVENTOS STRIPE
  // ==============================

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    await handleSubscriptionUpdate(subscription)
  }

  if (
    event.type === 'customer.subscription.updated' ||
    event.type === 'customer.subscription.deleted'
  ) {
    const subscription = event.data.object as Stripe.Subscription
    await handleSubscriptionUpdate(subscription)
  }

  return NextResponse.json({ received: true })
}
