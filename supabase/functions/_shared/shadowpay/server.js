/** Bumped with package.json; a test keeps the two equal. */
export const VERSION = '0.1.4';
const DEFAULT_BASE_URL = 'https://app.kingsgatemerchants.com';
export class ShadowPayError extends Error {
    code;
    status;
    fields;
    constructor(code, message, status = null, fields = null) {
        super(message);
        this.code = code;
        this.status = status;
        this.fields = fields;
        this.name = 'ShadowPayError';
    }
}
function runtimeTag() {
    const g = globalThis;
    const parts = [];
    if (g.Bun)
        parts.push(`bun/${g.Bun.version}`);
    else if (g.Deno)
        parts.push(`deno/${g.Deno.version.deno}`);
    else if (g.process?.versions?.node)
        parts.push(`node/${g.process.versions.node}`);
    else
        parts.push('edge');
    if (g.process?.env?.NEXT_RUNTIME)
        parts.push(`nextjs/${g.process.env.NEXT_RUNTIME}`);
    return parts.join(' ');
}
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
function newIdempotencyKey() {
    return `sdk_${crypto.randomUUID()}`;
}
/**
 * Server-side client. Keep the secret key on your server: never ship it to a
 * browser, mobile app or public repository.
 */
export class ShadowPay {
    livemode;
    baseUrl;
    fetchImpl;
    maxRetries;
    apiKey;
    signingSecret = null;
    /** `apiKey` defaults to the SHADOWPAY_SECRET_KEY environment variable. */
    constructor(apiKey, options = {}) {
        const key = apiKey ?? globalThis.process?.env?.SHADOWPAY_SECRET_KEY;
        if (!key) {
            throw new ShadowPayError('authentication_failed', 'Set SHADOWPAY_SECRET_KEY on your server, or pass the key: new ShadowPay(key)');
        }
        if (!/^sp_(test|live)_/.test(key)) {
            throw new ShadowPayError('authentication_failed', 'Expected a ShadowPay key starting with sp_test_ or sp_live_');
        }
        this.apiKey = key;
        this.livemode = key.startsWith('sp_live_');
        this.baseUrl = (options.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '');
        // Arrow, not the bare global: edge runtimes throw 'Illegal invocation'
        // when fetch is called with `this` set to another object.
        this.fetchImpl = options.fetch ?? ((input, init) => fetch(input, init));
        this.maxRetries = options.maxRetries ?? 2;
    }
    checkouts = {
        /**
         * Creates a checkout. The SDK adds an idempotency key per call and reuses
         * it on its own retries. Pass your own only per payment attempt (e.g.
         * `${orderId}:${attempt}`), never the bare order id — that would replay
         * a declined or expired checkout forever.
         */
        create: (params, opts = {}) => this.request('POST', '/api/v1/sdk/checkouts', params, opts.idempotencyKey ?? newIdempotencyKey()),
        retrieve: (id) => this.request('GET', `/api/v1/sdk/checkouts/${encodeURIComponent(id)}`),
    };
    refunds = {
        /** Files a refund request; KingsGate executes it. */
        request: (checkoutId, params) => this.request('POST', `/api/v1/sdk/checkouts/${encodeURIComponent(checkoutId)}/refund-requests`, params, newIdempotencyKey()),
    };
    webhooks = {
        /**
         * Verifies a webhook and returns the parsed event. Pass the RAW request
         * body (e.g. `await req.text()`), not a re-serialised object. The signing
         * secret is fetched with your secret key and cached; pass `secret` only to
         * override it. Events from the other mode (test vs live) are rejected.
         */
        verify: async (rawBody, signatureHeader, secret, toleranceSeconds = 300) => {
            let event;
            if (secret) {
                event = await verifyWebhook(rawBody, signatureHeader, secret, toleranceSeconds);
            }
            else {
                try {
                    event = await verifyWebhook(rawBody, signatureHeader, await this.webhookSecret(false), toleranceSeconds);
                }
                catch (err) {
                    // The secret may have been rotated in Developers: refetch once, at most once a minute.
                    if (!(err instanceof ShadowPayError && err.message === SIGNATURE_MISMATCH) || !this.secretIsStale())
                        throw err;
                    event = await verifyWebhook(rawBody, signatureHeader, await this.webhookSecret(true), toleranceSeconds);
                }
            }
            if (event.livemode !== this.livemode) {
                throw new ShadowPayError('invalid_signature', `This is a ${event.livemode ? 'live' : 'test'} event but the key is ${this.livemode ? 'live' : 'test'}`);
            }
            return event;
        },
    };
    secretIsStale() {
        return !this.signingSecret || Date.now() - this.signingSecret.at > 60_000;
    }
    webhookSecret(refresh) {
        if (!this.signingSecret || refresh) {
            const value = this.request('GET', '/api/v1/sdk/webhook-secret').then((r) => r.secret);
            // A failed fetch is not cached, so the next webhook retries it.
            value.catch(() => {
                if (this.signingSecret?.value === value)
                    this.signingSecret = null;
            });
            this.signingSecret = { value, at: Date.now() };
        }
        return this.signingSecret.value;
    }
    async request(method, path, body, idempotencyKey) {
        let attempt = 0;
        for (;;) {
            let res;
            try {
                res = await this.fetchImpl(`${this.baseUrl}${path}`, {
                    method,
                    headers: {
                        authorization: `Bearer ${this.apiKey}`,
                        accept: 'application/json',
                        'user-agent': `shadowpay-sdk/${VERSION} ${runtimeTag()}`,
                        ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
                        ...(idempotencyKey ? { 'idempotency-key': idempotencyKey } : {}),
                    },
                    body: body !== undefined ? JSON.stringify(body) : undefined,
                });
            }
            catch (err) {
                if (attempt < this.maxRetries) {
                    await sleep(300 * 2 ** attempt++);
                    continue;
                }
                throw new ShadowPayError('network_error', err instanceof Error ? err.message : 'Network error');
            }
            const retryable = res.status === 429 || res.status >= 500;
            // POSTs are only retried with an idempotency key, so a retry can't double-create.
            if (retryable && attempt < this.maxRetries && (method === 'GET' || idempotencyKey)) {
                await sleep(300 * 2 ** attempt++);
                continue;
            }
            const json = (await res.json().catch(() => null));
            if (!res.ok) {
                const e = json?.error;
                throw new ShadowPayError(e?.code ?? 'processing_error', e?.message ?? `HTTP ${res.status}`, res.status, e?.fields ?? null);
            }
            return json;
        }
    }
}
const SIGNATURE_MISMATCH = 'Signature does not match';
function hexToBytes(hex) {
    if (!/^[0-9a-f]+$/i.test(hex) || hex.length % 2 !== 0)
        return null;
    const out = new Uint8Array(new ArrayBuffer(hex.length / 2));
    for (let i = 0; i < out.length; i++)
        out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    return out;
}
/**
 * Verifies `ShadowPay-Signature: t=<unix>,v1=<hex>` over `t + "." + rawBody`
 * with HMAC-SHA256 and returns the event. Throws ShadowPayError
 * `invalid_signature` on any mismatch or a timestamp outside the tolerance.
 */
export async function verifyWebhook(rawBody, signatureHeader, secret, toleranceSeconds = 300, nowSeconds = Math.floor(Date.now() / 1000)) {
    const parts = Object.fromEntries((signatureHeader ?? '').split(',').map((p) => {
        const i = p.indexOf('=');
        return [p.slice(0, i).trim(), p.slice(i + 1).trim()];
    }));
    const t = Number(parts.t);
    const sig = parts.v1 ? hexToBytes(parts.v1) : null;
    if (!Number.isInteger(t) || !sig)
        throw new ShadowPayError('invalid_signature', 'Missing or malformed signature header');
    if (Math.abs(nowSeconds - t) > toleranceSeconds)
        throw new ShadowPayError('invalid_signature', 'Signature timestamp outside the tolerance');
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    // subtle.verify compares in constant time.
    const ok = await crypto.subtle.verify('HMAC', key, sig, enc.encode(`${t}.${rawBody}`));
    if (!ok)
        throw new ShadowPayError('invalid_signature', SIGNATURE_MISMATCH);
    return JSON.parse(rawBody);
}
