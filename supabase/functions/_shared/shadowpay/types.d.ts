/** Public ShadowPay API shapes. Mirrors the API contract; keep in step with it. */
export type CheckoutType = 'external' | 'hosted' | 'embedded';
export type CheckoutMethod = 'card' | 'paypal' | 'wallet' | 'redirect';
export type CheckoutStatus = 'open' | 'requires_action' | 'processing' | 'succeeded' | 'failed' | 'expired' | 'needs_review';
export type Address = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    /** ISO 3166-1 alpha-2, e.g. "US". */
    country?: string;
    state?: string;
    city?: string;
    line1?: string;
    line2?: string;
    postalCode?: string;
};
export type LineItem = {
    name: string;
    quantity: number;
    /** Decimal string in major units, e.g. "19.99". */
    unitAmount: string;
    sku?: string;
    imageUrl?: string;
};
export type CreateCheckoutParams = {
    /** Your order id. Shown in KingsGate as the order reference, verbatim. */
    orderId: string;
    /** Decimal string in major units with at most 2 decimals, e.g. "53.38". */
    amount: string;
    /** ISO 4217, e.g. "EUR". */
    currency: string;
    /** Defaults to the store's default checkout type. */
    checkoutType?: CheckoutType;
    method?: CheckoutMethod;
    items?: LineItem[];
    customer?: {
        email?: string;
        name?: string;
        phone?: string;
    };
    billing?: Address;
    shipping?: Address;
    /** Where the shopper lands after paying. Must be on one of your registered domains. */
    returnUrl: string;
    /** Where the shopper lands after a failed or cancelled payment. Defaults to returnUrl. */
    cancelUrl?: string;
};
export type NextAction = {
    type: 'redirect';
    url: string;
} | {
    type: 'mount';
    url: string;
    clientToken: string;
};
export type Checkout = {
    id: string;
    object: 'checkout';
    livemode: boolean;
    status: CheckoutStatus;
    orderId: string;
    amount: string;
    currency: string;
    checkoutType: CheckoutType;
    method: CheckoutMethod | null;
    /** What the browser should do next; null once the checkout has ended. */
    nextAction: NextAction | null;
    failureCode: string | null;
    expiresAt: string;
    paidAt: string | null;
    createdAt: string;
};
export type WebhookEventType = 'checkout.succeeded' | 'checkout.failed' | 'checkout.expired' | 'test';
export type WebhookEvent = {
    id: string;
    type: WebhookEventType;
    livemode: boolean;
    /** Unix seconds. */
    created: number;
    data: {
        checkout: Checkout | null;
    };
};
export type ErrorCode = 'invalid_request' | 'authentication_failed' | 'ip_not_allowed' | 'sdk_access_disabled' | 'not_found' | 'idempotency_conflict' | 'order_in_progress' | 'checkout_type_not_enabled' | 'method_not_available' | 'currency_not_supported' | 'card_declined' | 'authentication_required' | 'processing_error' | 'not_supported' | 'rate_limited' | 'invalid_signature' | 'network_error';
