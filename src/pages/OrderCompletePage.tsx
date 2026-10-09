import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getCheckoutStatus, LAST_ORDER_KEY, type OrderPaymentStatus } from '../lib/checkout'
import { useCart } from '../lib/cart'
import { waitForFbq } from '../lib/tracking/pixelLoaders'
import { trackEvent } from '../lib/analytics'

interface OrderInfo {
  brand?: 'vitalabs' | 'peptiva'
  description?: string
  displayPrice?: string
  amount?: number
  items?: { sku: string; compound: string; image: string | null; displayPrice: string; price?: number }[]
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: {
    address1: string
    address2: string
    city: string
    county: string
    postcode: string
    country: string
  }
}

function readLastOrder(): OrderInfo | null {
  try {
    const stored = sessionStorage.getItem(LAST_ORDER_KEY)
    return stored ? JSON.parse(stored) as OrderInfo : null
  } catch {
    return null
  }
}

const POLL_INTERVAL_MS = 3000
const POLL_MAX_ATTEMPTS = 40

export default function OrderCompletePage() {
  const [order] = useState<OrderInfo | null>(readLastOrder)
  const [searchParams] = useSearchParams()
  const checkoutId = searchParams.get('checkout_id')
  const [paymentStatus, setPaymentStatus] = useState<OrderPaymentStatus | 'checking' | 'unknown'>(
    checkoutId ? 'checking' : 'unknown',
  )
  const { clearCart } = useCart()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // The shopper can land here before ShadowPay's webhook marks the order
  // paid, so poll the server-side status rather than trusting the redirect.
  useEffect(() => {
    if (!checkoutId) return
    let cancelled = false
    let timer: number | undefined
    let attempts = 0
    const poll = async () => {
      const status = await getCheckoutStatus(checkoutId)
      if (cancelled) return
      attempts += 1
      if (status === 'paid' || status === 'failed') {
        setPaymentStatus(status)
      } else if (attempts >= POLL_MAX_ATTEMPTS) {
        setPaymentStatus('pending')
      } else {
        timer = window.setTimeout(poll, POLL_INTERVAL_MS)
      }
    }
    void poll()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [checkoutId])

  useEffect(() => {
    if (paymentStatus !== 'paid' || !checkoutId) return
    // Refreshing this page must not count the purchase twice.
    const trackedKey = `peptiva-purchase-tracked:${checkoutId}`
    if (sessionStorage.getItem(trackedKey)) return
    sessionStorage.setItem(trackedKey, '1')
    clearCart()

    let cancelled = false
    void (async () => {
      const parsed = readLastOrder()

      // First-party analytics: completed checkout. Powers conversion
      // rate + abandonment charts on the admin dashboard.
      trackEvent('checkout_completed', {
        props: {
          amount_pence: parsed?.amount,
          sku_count: parsed?.items?.length ?? 0,
        },
      })

      // Fire the Meta Purchase pixel. ShadowPay redirects here via a hard
      // navigation, so the page is a cold load — `useTracking()` injects
      // fbevents.js only after `ConfigProvider`'s async fetch resolves,
      // which races with this effect. Without the wait, `window.fbq` is
      // undefined the moment we get here and the event is silently lost.
      if (parsed?.amount) {
        const valueInPounds = parsed.amount / 100
        const ready = await waitForFbq(8000)
        if (cancelled) return
        if (ready && typeof window.fbq === 'function') {
          window.fbq('track', 'Purchase', {
            value: valueInPounds,
            currency: 'GBP',
          })
        } else {
          console.warn('[OrderComplete] Meta pixel never loaded — Purchase event skipped')
        }
      }
    })()
    return () => { cancelled = true }
  }, [paymentStatus, checkoutId, clearCart])

  if (paymentStatus !== 'paid') {
    return (
      <div className="oc-page">
        <header className="oc-header">
          <Link to="/" className="oc-logo">Peptiva</Link>
        </header>
        <main className="oc-main">
          <div className="oc-card">
            {paymentStatus === 'checking' && (
              <>
                <h1>Confirming your payment…</h1>
                <p className="oc-subtitle">This usually takes a few seconds. Please don't close this page.</p>
              </>
            )}
            {paymentStatus === 'pending' && (
              <>
                <h1>Your payment is processing</h1>
                <p className="oc-subtitle">
                  We haven't received confirmation yet. You'll get an email as soon as your
                  payment is confirmed — there's no need to pay again.
                </p>
              </>
            )}
            {paymentStatus === 'failed' && (
              <>
                <h1>Your payment didn't go through</h1>
                <p className="oc-subtitle">
                  You haven't been charged. Your cart is saved, so you can try again with
                  the same or a different card.
                </p>
              </>
            )}
            {paymentStatus === 'unknown' && (
              <>
                <h1>We couldn't find this payment</h1>
                <p className="oc-subtitle">If you've just paid, check your email for your order confirmation.</p>
              </>
            )}
            {paymentStatus !== 'checking' && <Link to="/" className="oc-btn">Return to Peptiva</Link>}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="oc-page">
      <header className="oc-header">
        <Link to="/" className="oc-logo">Peptiva</Link>
      </header>

      <main className="oc-main">
        <div className="oc-card">
          <div className="oc-icon">✓</div>
          <h1>Order confirmed!</h1>
          <p className="oc-subtitle">
            Thank you for your purchase. Your protocol is being prepared
            and you'll receive a confirmation email shortly.
          </p>

          {order?.items && order.items.length > 0 && (
            <div className="oc-items">
              {order.items.map((item, i) => (
                <div key={i} className="oc-item">
                  {item.image && <img src={item.image} alt={item.sku} className="oc-item-img" />}
                  <div className="oc-item-info">
                    <strong>{item.sku}</strong>
                    <span>{item.compound}</span>
                  </div>
                  <span className="oc-item-price">{item.displayPrice}</span>
                </div>
              ))}
            </div>
          )}

          {order?.displayPrice && (
            <div className="oc-total">
              <span>Total paid</span>
              <span>{order.displayPrice}</span>
            </div>
          )}

          {(order?.customerName || order?.shippingAddress) && (
            <div className="oc-details">
              {order.customerName && (
                <div className="oc-detail-block">
                  <h3>Customer</h3>
                  <p>{order.customerName}</p>
                  {order.customerEmail && <p>{order.customerEmail}</p>}
                  {order.customerPhone && <p>{order.customerPhone}</p>}
                </div>
              )}
              {order.shippingAddress && (
                <div className="oc-detail-block">
                  <h3>Shipping to</h3>
                  <p>{order.shippingAddress.address1}</p>
                  {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
                  <p>
                    {order.shippingAddress.city}
                    {order.shippingAddress.county ? `, ${order.shippingAddress.county}` : ''}
                  </p>
                  <p>{order.shippingAddress.postcode}</p>
                </div>
              )}
            </div>
          )}

          <div className="oc-next-steps">
            <h2>What happens next</h2>
            <div className="oc-steps">
              <div className="oc-step">
                <div className="oc-step-num">1</div>
                <div>
                  <strong>Order confirmation</strong>
                  <p>You'll receive an email with your order details within minutes.</p>
                </div>
              </div>
              <div className="oc-step">
                <div className="oc-step-num">2</div>
                <div>
                  <strong>Protocol preparation</strong>
                  <p>Our team prepares your personalised dosing protocol and documentation.</p>
                </div>
              </div>
              <div className="oc-step">
                <div className="oc-step-num">3</div>
                <div>
                  <strong>Fast dispatch</strong>
                  <p>Your order ships within 24 hours with free tracked delivery.</p>
                </div>
              </div>
              <div className="oc-step">
                <div className="oc-step-num">4</div>
                <div>
                  <strong>Start your protocol</strong>
                  <p>Follow your practitioner-reviewed guide for optimal results.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="oc-guarantees">
            <span>🛡️ 30-day guarantee</span>
            <span>🔬 99.3%+ purity</span>
            <span>📦 Free tracked shipping</span>
          </div>

          <Link to="/" className="oc-btn">Return to Peptiva</Link>
        </div>
      </main>

      <footer className="oc-footer">
        <p>Peptiva Ltd · UK-regulated laboratory · Sold for research use only</p>
        <p>© {new Date().getFullYear()} Peptiva</p>
      </footer>
    </div>
  )
}
