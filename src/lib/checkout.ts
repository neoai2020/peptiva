import type { NextAction } from '@shadowpayhq/sdk/js'
import { supabase } from './supabase'

/* ── Checkout state passed via React Router ── */

export interface CheckoutItem {
  sku: string
  compound: string
  image: string | null
  price: number
  displayPrice: string
}

export interface CheckoutState {
  items: CheckoutItem[]
  amount: number
  quantity: number
  description: string
  displayPrice: string
  email?: string
  returnPath?: string
}

/** sessionStorage key for the order shown on the return page. */
export const LAST_ORDER_KEY = 'peptiva-last-order'

/* ── Edge Function calls ── */

export interface CreateCheckoutResponse {
  orderId: string
  checkoutId: string
  nextAction: NextAction | null
}

export class CheckoutError extends Error {
  code: string | null
  orderId: string | null

  constructor(message: string, code: string | null = null, orderId: string | null = null) {
    super(message)
    this.code = code
    this.orderId = orderId
  }
}

export async function createCheckout(opts: {
  /** Reuse the order from a previous attempt so a retry doesn't open a second payment. */
  orderId?: string
  /** Total in pence after any promo discount. */
  amount: number
  /** Pre-discount subtotal in pence — required when redemptionToken set. */
  subtotal: number
  /** HMAC token issued by redeem-promo; the server re-derives the amount from it. */
  redemptionToken?: string
  description?: string
  brand: string
  items: CheckoutItem[]
  quantity: number
  customer: { firstName: string; lastName: string; email: string; phone: string }
  shipping: {
    address1: string
    address2: string
    city: string
    county: string
    postcode: string
    country: string
  }
  returnPath: string
}): Promise<CreateCheckoutResponse> {
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      order_id: opts.orderId,
      amount: opts.amount,
      subtotal: opts.subtotal,
      redemption_token: opts.redemptionToken,
      description: opts.description,
      brand: opts.brand,
      items: opts.items,
      quantity: opts.quantity,
      customer: {
        first_name: opts.customer.firstName,
        last_name: opts.customer.lastName,
        email: opts.customer.email,
        phone: opts.customer.phone,
      },
      shipping: opts.shipping,
      return_path: opts.returnPath,
    },
  })

  if (error) {
    // supabase-js wraps non-2xx responses; the JSON body carries our error.
    let body: { error?: string; code?: string; orderId?: string } | null = null
    try {
      body = await (error as { context?: Response }).context?.json() ?? null
    } catch { /* not JSON */ }
    throw new CheckoutError(body?.error ?? error.message ?? 'Failed to start payment', body?.code ?? null, body?.orderId ?? null)
  }
  return data as CreateCheckoutResponse
}

export type OrderPaymentStatus = 'paid' | 'pending' | 'failed'

export async function getCheckoutStatus(checkoutId: string): Promise<OrderPaymentStatus | null> {
  const { data, error } = await supabase.functions.invoke('checkout-status', {
    body: { checkout_id: checkoutId },
  })
  if (error) return null
  return (data as { status: OrderPaymentStatus }).status
}
