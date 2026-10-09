/**
 * Receives ShadowPay webhook events. This is the ONLY place an order
 * becomes paid: the shopper may never return to the site after paying.
 *
 * checkout.succeeded → mark_order_paid() (once, amount + currency checked);
 *                      on the first success, count the promo use and send
 *                      the order to Zapier.
 * checkout.failed / checkout.expired → status 'failed' if still pending.
 *                      A later success can still flip it to paid.
 * test → acknowledged.
 *
 * Bad signature → 400 (permanent). Anything else that stops verification
 * (e.g. the signing secret can't be fetched) → 503 so ShadowPay retries.
 */
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { getShadowPay, ShadowPayError } from '../_shared/shadowpay.ts'
import { notifyZapier } from '../_shared/zapier.ts'

function getSupabase(): SupabaseClient {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}

async function finalizePromoRedemption(supabase: SupabaseClient, promoId: unknown) {
  if (typeof promoId !== 'string' || !promoId) return
  const { error } = await supabase.rpc('increment_promo_uses', { p_id: promoId })
  if (error) console.error('[shadowpay-webhook] increment_promo_uses failed:', error.message)
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

serve(async (req: Request) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  const rawBody = await req.text()
  const signature = req.headers.get('shadowpay-signature')

  let event
  try {
    // Passing the secret skips the SDK's secret fetch, which live keys
    // only allow from allow-listed IPs.
    const secret = Deno.env.get('SHADOWPAY_WEBHOOK_SECRET') || undefined
    event = await (await getShadowPay()).webhooks.verify(rawBody, signature, secret)
  } catch (err) {
    if (err instanceof ShadowPayError && err.code === 'invalid_signature') {
      console.warn('[shadowpay-webhook] invalid signature:', err.message)
      return new Response('invalid signature', { status: 400 })
    }
    console.error('[shadowpay-webhook] verification unavailable:', err instanceof ShadowPayError ? err.code : err)
    return new Response('verification unavailable', { status: 503 })
  }

  const c = event.data?.checkout
  console.log(`[shadowpay-webhook] event=${event.type} id=${event.id} checkout=${c?.id ?? '-'} order=${c?.orderId ?? '-'}`)

  if (event.type === 'test' || !c) return new Response('ok')

  if (!UUID_RE.test(c.orderId)) {
    console.error('[shadowpay-webhook] payment for an order id this store did not create', { orderId: c.orderId, eventId: event.id })
    return new Response('ok')
  }

  const supabase = getSupabase()

  try {
    if (event.type === 'checkout.succeeded') {
      const { data: result, error } = await supabase.rpc('mark_order_paid', {
        p_order_id: c.orderId,
        p_event_id: event.id,
        p_checkout_id: c.id,
        p_amount: Number(c.amount),
        p_currency: c.currency,
      })
      if (error) throw new Error(`mark_order_paid failed: ${error.message}`)

      if (result === 'paid') {
        const { data: order } = await supabase
          .from('orders')
          .select('brand, customer_name, email, items, total, metadata')
          .eq('id', c.orderId)
          .single()
        if (order) {
          await finalizePromoRedemption(supabase, order.metadata?.promo_id)
          await notifyZapier({ ...order, total: Number(order.total) })
        }
      } else if (result !== 'already_paid') {
        // Money arrived that doesn't match an order: leave it for a human.
        console.error('[shadowpay-webhook] payment needs review', {
          result,
          orderId: c.orderId,
          paid: `${c.amount} ${c.currency}`,
          eventId: event.id,
        })
      }
    } else if (event.type === 'checkout.failed' || event.type === 'checkout.expired') {
      // Never downgrade a paid order: a late failure can't undo a success.
      // A replaced (older) checkout ending must not fail the current one.
      const { error } = await supabase
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', c.orderId)
        .eq('shadowpay_checkout_id', c.id)
        .eq('status', 'pending')
      if (error) throw new Error(`order update failed: ${error.message}`)
    }
  } catch (err) {
    console.error('[shadowpay-webhook] processing failed:', err)
    return new Response('processing failed', { status: 500 })
  }

  return new Response('ok')
})
