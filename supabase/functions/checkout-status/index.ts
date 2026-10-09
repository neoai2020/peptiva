/**
 * Order status for the return page, looked up by the `checkout_id`
 * ShadowPay appends to the return URL. Display only: whether an order is
 * paid is decided by shadowpay-webhook, never here.
 *
 * Body: { checkout_id }
 * Returns: { status: 'paid' | 'pending' | 'failed' }
 */
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handleOptions, jsonResponse } from '../_shared/cors.ts'
import { getShadowPay } from '../_shared/shadowpay.ts'

serve(async (req: Request) => {
  const pre = handleOptions(req)
  if (pre) return pre
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405)

  try {
    const { checkout_id } = await req.json() as { checkout_id?: string }
    if (!checkout_id) return jsonResponse({ error: 'checkout_id is required' }, 400)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    )
    const { data: order } = await supabase
      .from('orders')
      .select('status')
      .eq('shadowpay_checkout_id', checkout_id)
      .maybeSingle()
    if (!order) return jsonResponse({ error: 'Order not found' }, 404)

    if (order.status === 'paid' || order.status === 'fulfilled') return jsonResponse({ status: 'paid' })
    if (order.status !== 'pending') return jsonResponse({ status: 'failed' })

    // Webhooks can lag the shopper's return. Some providers never send a
    // failure event, so surface a declined/expired checkout from ShadowPay
    // rather than leaving the shopper on "processing".
    try {
      const checkout = await getShadowPay().checkouts.retrieve(checkout_id)
      if (checkout.status === 'failed' || checkout.status === 'expired') {
        return jsonResponse({ status: 'failed' })
      }
    } catch (err) {
      console.warn('[checkout-status] retrieve failed:', err)
    }
    return jsonResponse({ status: 'pending' })
  } catch (err) {
    console.error('[checkout-status] uncaught:', err)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
})
