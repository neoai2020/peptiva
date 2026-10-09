/**
 * ShadowPay server SDK, vendored from vendor/shadowpay-sdk-0.1.4.tgz
 * (package/dist/server.js) because Deno can't install the private tarball.
 * Re-copy the files in ./shadowpay/ when the SDK is upgraded.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// @deno-types="./shadowpay/server.d.ts"
import { ShadowPay, ShadowPayError } from './shadowpay/server.js'

export { ShadowPay, ShadowPayError }

interface ShadowPayConfig {
  secret_key?: string | null
  relay_url?: string | null
  relay_token?: string | null
}

let cached: ShadowPay | null = null

/**
 * Settings come from function secrets (SHADOWPAY_SECRET_KEY,
 * SHADOWPAY_RELAY_URL, SHADOWPAY_RELAY_TOKEN), or else from Supabase Vault
 * (see migrations 0017 and 0018).
 */
async function loadConfig(): Promise<ShadowPayConfig> {
  const secretKey = Deno.env.get('SHADOWPAY_SECRET_KEY')
  if (secretKey) {
    return {
      secret_key: secretKey,
      relay_url: Deno.env.get('SHADOWPAY_RELAY_URL'),
      relay_token: Deno.env.get('SHADOWPAY_RELAY_TOKEN'),
    }
  }
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  )
  const { data, error } = await supabase.rpc('get_shadowpay_config')
  if (error) throw new Error(`could not read ShadowPay settings from Vault: ${error.message}`)
  return (data ?? {}) as ShadowPayConfig
}

export async function getShadowPay(): Promise<ShadowPay> {
  if (cached) return cached
  const { secret_key, relay_url, relay_token } = await loadConfig()
  // Live keys are locked to the relay's IP, so KingsGate is reached through
  // it; the token stops anyone else from using the relay.
  const options = relay_url
    ? {
      baseUrl: relay_url,
      fetch: (input: string, init: RequestInit) =>
        fetch(input, {
          ...init,
          headers: { ...(init.headers as Record<string, string>), 'x-relay-token': relay_token ?? '' },
        }),
    }
    : {}
  // Deno has no process.env, so the key must be passed explicitly.
  cached = new ShadowPay(secret_key ?? '', options)
  return cached
}
