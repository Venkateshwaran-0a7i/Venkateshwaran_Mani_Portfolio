/**
 * Prefix a /public path with the deployment base path.
 *
 * Next.js auto-prefixes <Link>, <Image> and `/_next/*` when `basePath` is set,
 * but NOT raw `<video src>`, `<a href="/file.pdf">`, CSS `url()`, or `<source>`.
 * Always wrap those with `asset()`.
 */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");

export function asset(path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/** Absolute site origin for metadata / OG / sitemap. No trailing slash. */
export function siteUrl(): string {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (BASE_PATH) {
    return `https://venkateshwaran-0a7i.github.io${BASE_PATH}`;
  }
  return "https://venkateshwaran-0a7i.github.io/Venkateshwaran_Mani_Portfolio";
}
