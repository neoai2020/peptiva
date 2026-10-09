/**
 * ShadowPay server SDK, vendored from vendor/shadowpay-sdk-0.1.4.tgz
 * (package/dist/server.js) because Deno can't install the private tarball.
 * Re-copy the files in ./shadowpay/ when the SDK is upgraded.
 */
// @deno-types="./shadowpay/server.d.ts"
import { ShadowPay, ShadowPayError } from './shadowpay/server.js'

export { ShadowPay, ShadowPayError }

export function getShadowPay(): ShadowPay {
  // Deno has no process.env, so the key must be passed explicitly.
  return new ShadowPay(Deno.env.get('SHADOWPAY_SECRET_KEY') ?? '')
}
