import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ SERVICE ROLE
)

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return new NextResponse('Webhook Error', { status: 400 })
  }

  // ✅ PAGAMENTO CONFIRMADO
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerId = session.customer as string
    const subscriptionId = session.subscription as string

    await supabase
      .from('profiles')
      .update({
        subscription_status: 'active',
        stripe_subscription_id: subscriptionId,
      })
      .eq('stripe_customer_id', customerId)
  }

  // ❌ CANCELADO / EXPIRADO
  if (event.type === 'customer.subscription.deleted') {
    const sub = event.data.object as Stripe.Subscription

    await supabase
      .from('profiles')
      .update({
        subscription_status: 'canceled',
      })
      .eq('stripe_customer_id', sub.customer)
  }

  return NextResponse.json({ received: true })
}
