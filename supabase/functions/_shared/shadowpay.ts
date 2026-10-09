/**
 * ShadowPay server SDK, vendored from vendor/shadowpay-sdk-0.1.4.tgz
 * (package/dist/server.js) because Deno can't install the private tarball.
 * Re-copy the files in ./shadowpay/ when the SDK is upgraded.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
// @deno-types="./shadowpay/server.d.ts"
import { ShadowPay, ShadowPayError } from './shadowpay/server.js'

export { ShadowPay, ShadowPayError }

let cached: ShadowPay | null = null

/**
 * The secret key comes from the SHADOWPAY_SECRET_KEY function secret, or
 * else from Supabase Vault (see migration 0017).
 */
export async function getShadowPay(): Promise<ShadowPay> {
  if (cached) return cached
  let key = Deno.env.get('SHADOWPAY_SECRET_KEY')
  if (!key) {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    )
    const { data, error } = await supabase.rpc('get_shadowpay_secret_key')
    if (error) throw new Error(`could not read ShadowPay key from Vault: ${error.message}`)
    key = typeof data === 'string' ? data : undefined
  }
  // Deno has no process.env, so the key must be passed explicitly.
  cached = new ShadowPay(key ?? '')
  return cached
}
