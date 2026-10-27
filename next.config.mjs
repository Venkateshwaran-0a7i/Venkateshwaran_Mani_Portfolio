/**
 * Dual-mode Next.js config for portable deployment.
 *
 * DEPLOY_TARGET:
 *   - static     (default) → `output: "export"`  (GitHub Pages, Netlify, CF Pages, S3, any static host)
 *   - standalone           → `output: "standalone"` (Docker / Node VPS)
 *   - vercel               → no `output` override (Vercel native)
 *
 * NEXT_PUBLIC_BASE_PATH:
 *   - GitHub Pages project site → "/Venkateshwaran_Mani_Portfolio"
 *   - Custom domain / root host → "" (empty)
 * Also mirrored into basePath + assetPrefix so <Link>/<Image>/_next assets resolve.
 */

const target = (process.env.DEPLOY_TARGET || "static").toLowerCase();
const rawBase = process.env.NEXT_PUBLIC_BASE_PATH || process.env.BASE_PATH || "";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  env: {
    // Always expose the resolved base path to the client (asset() helper).
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

if (target === "standalone") {
  nextConfig.output = "standalone";
} else if (target === "vercel") {
  // Vercel manages output itself — leave unset.
} else {
  // static (default)
  nextConfig.output = "export";
  nextConfig.images = { unoptimized: true };
  nextConfig.trailingSlash = true;
}

export default nextConfig;
