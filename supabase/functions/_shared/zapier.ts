/**
 * Sends a paid order to the fulfilment Zap. Non-fatal: the order is
 * already in the database, so a Zapier outage only logs.
 */

interface ZapierOrder {
  brand: string
  customer_name: string | null
  email: string | null
  items: unknown
  total: number
  metadata: Record<string, unknown> | null
}

interface ShippingAddress {
  address1?: string
  address2?: string
  city?: string
  county?: string
  postcode?: string
  country?: string
}

export async function notifyZapier(order: ZapierOrder): Promise<void> {
  const zapierUrl = Deno.env.get('ZAPIER_WEBHOOK_URL')
  if (!zapierUrl) {
    console.warn('[zapier] ZAPIER_WEBHOOK_URL not set; skipping')
    return
  }

  const md = order.metadata ?? {}
  const shipping = (md.shippingAddress ?? {}) as ShippingAddress
  const items = Array.isArray(order.items) ? order.items as { sku?: string; compound?: string }[] : []
  const productNames = items.map(i => [i.sku, i.compound].filter(Boolean).join(' — '))
  const totalGBP = order.total.toFixed(2)
  const aov = items.length > 0 ? (order.total / items.length).toFixed(2) : totalGBP

  const payload = {
    brand: order.brand,
    name: order.customer_name ?? '',
    email: order.email ?? '',
    phone: typeof md.phone === 'string' ? md.phone : '',
    shipping_address1: shipping.address1 ?? '',
    shipping_address2: shipping.address2 ?? '',
    shipping_city: shipping.city ?? '',
    shipping_county: shipping.county ?? '',
    shipping_postcode: shipping.postcode ?? '',
    shipping_country: shipping.country ?? '',
    products: productNames.join(' | '),
    order_total: `£${totalGBP}`,
    aov: `£${aov}`,
    item_count: items.length,
    order_date: new Date().toISOString(),
  }

  try {
    const res = await fetch(zapierUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) console.error(`[zapier] returned ${res.status}: ${await res.text()}`)
  } catch (err) {
    console.error('[zapier] request failed:', err)
  }
}
