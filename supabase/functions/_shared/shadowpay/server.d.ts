import type { Checkout, CreateCheckoutParams, ErrorCode, WebhookEvent } from './types.js';
export type * from './types.js';
/** Bumped with package.json; a test keeps the two equal. */
export declare const VERSION = "0.1.4";
export declare class ShadowPayError extends Error {
    readonly code: ErrorCode;
    readonly status: number | null;
    readonly fields: Record<string, string[]> | null;
    constructor(code: ErrorCode, message: string, status?: number | null, fields?: Record<string, string[]> | null);
}
/** The subset of fetch the client uses; any WHATWG fetch fits. */
export type FetchLike = (input: string, init: RequestInit) => Promise<Response>;
export type ShadowPayOptions = {
    /** Override the API origin (tests, staging). */
    baseUrl?: string;
    /** Custom fetch (tests, instrumentation). */
    fetch?: FetchLike;
    /** Retries for network errors, 429 and 5xx. Default 2. */
    maxRetries?: number;
};
/**
 * Server-side client. Keep the secret key on your server: never ship it to a
 * browser, mobile app or public repository.
 */
export declare class ShadowPay {
    readonly livemode: boolean;
    private readonly baseUrl;
    private readonly fetchImpl;
    private readonly maxRetries;
    private readonly apiKey;
    private signingSecret;
    /** `apiKey` defaults to the SHADOWPAY_SECRET_KEY environment variable. */
    constructor(apiKey?: string, options?: ShadowPayOptions);
    readonly checkouts: {
        /**
         * Creates a checkout. The SDK adds an idempotency key per call and reuses
         * it on its own retries. Pass your own only per payment attempt (e.g.
         * `${orderId}:${attempt}`), never the bare order id — that would replay
         * a declined or expired checkout forever.
         */
        create: (params: CreateCheckoutParams, opts?: {
            idempotencyKey?: string;
        }) => Promise<Checkout>;
        retrieve: (id: string) => Promise<Checkout>;
    };
    readonly refunds: {
        /** Files a refund request; KingsGate executes it. */
        request: (checkoutId: string, params: {
            amount?: string;
            reason: string;
        }) => Promise<unknown>;
    };
    readonly webhooks: {
        /**
         * Verifies a webhook and returns the parsed event. Pass the RAW request
         * body (e.g. `await req.text()`), not a re-serialised object. The signing
         * secret is fetched with your secret key and cached; pass `secret` only to
         * override it. Events from the other mode (test vs live) are rejected.
         */
        verify: (rawBody: string, signatureHeader: string | null | undefined, secret?: string, toleranceSeconds?: number) => Promise<WebhookEvent>;
    };
    private secretIsStale;
    private webhookSecret;
    private request;
}
/**
 * Verifies `ShadowPay-Signature: t=<unix>,v1=<hex>` over `t + "." + rawBody`
 * with HMAC-SHA256 and returns the event. Throws ShadowPayError
 * `invalid_signature` on any mismatch or a timestamp outside the tolerance.
 */
export declare function verifyWebhook(rawBody: string, signatureHeader: string | null | undefined, secret: string, toleranceSeconds?: number, nowSeconds?: number): Promise<WebhookEvent>;
