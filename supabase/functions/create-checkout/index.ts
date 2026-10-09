/**
 * Saves a pending order and opens a ShadowPay checkout for it.
 *
 * Body (amounts in pence, GBP):
 *   { order_id?, amount, subtotal?, redemption_token?, description?, brand?,
 *     items, quantity?, customer, shipping, return_path? }
 *
 * - If `redemption_token` is set it is verified exactly as before and the
 *   amount is server-recomputed as (subtotal − discount).
 * - Prices on the site are GBP. ShadowPay's provider page only accepts
 *   SHADOWPAY_CURRENCY (EUR today), so the GBP total is converted at
 *   SHADOWPAY_GBP_EUR_RATE, or today's ECB rate when that is unset. The
 *   exact charged amount is stored on the order for the webhook to check.
 * - Passing back `order_id` (a retry or double click) reuses that order
 *   while it is unpaid; ShadowPay then returns or replaces its checkout.
 *
 * Returns: { orderId, checkoutId, nextAction }
 */
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient, type SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { handleOptions, jsonResponse } from '../_shared/cors.ts'
import { verifyRedemptionToken } from '../_shared/redemption-token.ts'
import { getShadowPay, ShadowPayError } from '../_shared/shadowpay.ts'

type Brand = 'vitalabs' | 'peptiva'

interface CheckoutItem {
  sku?: string
  compound?: string
  image?: string | null
  price?: number
  displayPrice?: string
}

interface CreateCheckoutBody {
  order_id?: string
  amount: number
  subtotal?: number
  redemption_token?: string
  description?: string
  brand?: string
  items?: CheckoutItem[]
  quantity?: number
  customer?: { first_name?: string; last_name?: string; email?: string; phone?: string }
  shipping?: {
    address1?: string
    address2?: string
    city?: string
    county?: string
    postcode?: string
    country?: string
  }
  return_path?: string
}

function getSupabase(): SupabaseClient {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
}

async function gbpTo(currency: string): Promise<number> {
  if (currency === 'GBP') return 1
  const fixed = Number(Deno.env.get(`SHADOWPAY_GBP_${currency}_RATE`))
  if (fixed > 0) return fixed
  const res = await fetch(`https://api.frankfurter.app/latest?from=GBP&to=${currency}`)
  if (!res.ok) throw new Error(`exchange rate lookup failed (${res.status})`)
  const data = await res.json() as { rates?: Record<string, number> }
  const rate = data.rates?.[currency]
  if (!rate || rate <= 0) throw new Error('exchange rate lookup returned no rate')
  return rate
}

function safeReturnPath(path: string | undefined): string {
  return path && path.startsWith('/') && !path.startsWith('//') ? path : '/order-complete'
}

serve(async (req: Request) => {
  const pre = handleOptions(req)
  if (pre) return pre
  if (req.method !== 'POST') return jsonResponse({ error: 'Method not allowed' }, 405)

  try {
    const body: CreateCheckoutBody = await req.json()
    if (!body.amount || body.amount <= 0) {
      return jsonResponse({ error: 'Invalid amount' }, 400)
    }
    const email = body.customer?.email?.trim()
    if (!email) return jsonResponse({ error: 'Email is required' }, 400)

    const siteOrigin = req.headers.get('Origin') ?? Deno.env.get('SITE_URL')
    if (!siteOrigin) return jsonResponse({ error: 'Unknown site origin' }, 400)

    let finalPence = body.amount
    const promoMeta: Record<string, string> = {}
    if (body.redemption_token) {
      const verified = await verifyRedemptionToken(body.redemption_token)
      if (!verified) {
        return jsonResponse({ error: 'Promo token invalid or expired' }, 400)
      }
      if (!body.subtotal || body.subtotal !== verified.subtotal_pence) {
        // Cart changed between redeem-promo and pay — reject to force a fresh token.
        return jsonResponse({ error: 'Cart changed, re-apply promo code' }, 400)
      }
      finalPence = Math.max(0, verified.subtotal_pence - verified.discount_pence)
      promoMeta.promo_code = verified.code
      promoMeta.promo_id = verified.promo_id
      promoMeta.promo_type = verified.type
      promoMeta.promo_discount_pence = String(verified.discount_pence)
      promoMeta.promo_brand = verified.brand
    }
    if (finalPence <= 0) return jsonResponse({ error: 'Invalid amount' }, 400)

    const currency = (Deno.env.get('SHADOWPAY_CURRENCY') ?? 'EUR').toUpperCase()
    const rate = await gbpTo(currency)
    const chargedAmount = Math.round(finalPence * rate) / 100

    const brand: Brand = (promoMeta.promo_brand || body.brand) === 'peptiva' ? 'peptiva' : 'vitalabs'
    const customerName = [body.customer?.first_name, body.customer?.last_name]
      .map(s => s?.trim())
      .filter(Boolean)
      .join(' ') || null
    const shipping = body.shipping ?? {}
    const items = Array.isArray(body.items) ? body.items : []

    const orderFields = {
      brand,
      email,
      customer_name: customerName,
      items,
      subtotal: (body.subtotal ?? body.amount) / 100,
      total: finalPence / 100,
      currency: 'GBP',
      status: 'pending' as const,
      payment_method: 'shadowpay',
      charged_amount: chargedAmount,
      charged_currency: currency,
      metadata: {
        brand,
        description: body.description ?? null,
        skus: items.map(i => i.sku).filter(Boolean).join(', '),
        quantity: body.quantity ?? null,
        phone: body.customer?.phone ?? null,
        shippingAddress: shipping,
        fx_rate: rate,
        ...promoMeta,
      },
    }

    const supabase = getSupabase()

    let orderId: string | null = null
    if (body.order_id) {
      const { data: existing } = await supabase
        .from('orders')
        .select('id, brand, status')
        .eq('id', body.order_id)
        .maybeSingle()
      if (existing && existing.brand === brand && (existing.status === 'pending' || existing.status === 'failed')) {
        const { error } = await supabase.from('orders').update(orderFields).eq('id', existing.id)
        if (error) throw new Error(`order update failed: ${error.message}`)
        orderId = existing.id
      }
    }
    if (!orderId) {
      const { data: created, error } = await supabase
        .from('orders')
        .insert(orderFields)
        .select('id')
        .single()
      if (error || !created) throw new Error(`order insert failed: ${error?.message}`)
      orderId = created.id as string
    }

    const returnUrl = new URL(safeReturnPath(body.return_path), siteOrigin).toString()

    let checkout
    try {
      checkout = await (await getShadowPay()).checkouts.create({
        orderId,
        amount: chargedAmount.toFixed(2),
        currency,
        checkoutType: 'external',
        returnUrl,
        customer: { email, name: customerName ?? undefined, phone: body.customer?.phone || undefined },
        shipping: {
          firstName: body.customer?.first_name || undefined,
          lastName: body.customer?.last_name || undefined,
          email,
          phone: body.customer?.phone || undefined,
          country: shipping.country || undefined,
          state: shipping.county || undefined,
          city: shipping.city || undefined,
          line1: shipping.address1 || undefined,
          line2: shipping.address2 || undefined,
          postalCode: shipping.postcode || undefined,
        },
      })
    } catch (err) {
      if (err instanceof ShadowPayError) {
        console.error('[create-checkout] ShadowPay error:', err.code, err.message, err.fields)
        const status = err.code === 'order_in_progress' ? 409 : 502
        return jsonResponse({ error: 'Payment could not be started', code: err.code, orderId }, status)
      }
      throw err
    }

    await supabase.from('orders').update({ shadowpay_checkout_id: checkout.id }).eq('id', orderId)

    return jsonResponse({ orderId, checkoutId: checkout.id, nextAction: checkout.nextAction })
  } catch (err) {
    console.error('[create-checkout] uncaught:', err)
    return jsonResponse({ error: 'Internal server error' }, 500)
  }
})
