/**
 * Product images can be stored as site-relative paths (e.g.
 * /images/products/17.jpg) served from the storefront's /public folder.
 * Server-side fetches and third-party APIs need an absolute URL, so
 * resolve relative paths against the storefront origin that invoked us.
 */
export function resolveAssetUrl(url: string | null, req: Request): string | null {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  const origin = req.headers.get('Origin') ?? Deno.env.get('SITE_URL')
  if (!origin) return null
  try {
    return new URL(url, origin).toString()
  } catch {
    return null
  }
}
