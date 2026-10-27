/**
 * Dual-mode Next.js config for portable deployment.
 *
 * DEPLOY_TARGET:
 *   - static     → `output: "export"`  (GitHub Pages, Netlify, CF Pages, S3, …)
 *   - standalone → `output: "standalone"` (Docker / Node VPS)
 *   - vercel     → no `output` override (Vercel native runtime)
 *
 * If DEPLOY_TARGET is unset and `VERCEL=1` (always set on Vercel builds),
 * we automatically pick `vercel` so `npm run build` does not accidentally
 * produce a static `out/` export that fights Vercel's Next.js integration.
 *
 * NEXT_PUBLIC_BASE_PATH:
 *   - GitHub Pages project site → "/Venkateshwaran_Mani_Portfolio"
 *   - Vercel / custom domain / root → "" (empty)
 */

function resolveTarget() {
  const explicit = (process.env.DEPLOY_TARGET || "").toLowerCase().trim();
  if (explicit === "static" || explicit === "standalone" || explicit === "vercel") {
    return explicit;
  }
  // Vercel always injects VERCEL=1 during install/build/runtime.
  if (process.env.VERCEL === "1") return "vercel";
  return "static";
}

const target = resolveTarget();
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
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

if (target === "standalone") {
  nextConfig.output = "standalone";
} else if (target === "vercel") {
  // Leave `output` unset — Vercel serves the standard Next.js build.
} else {
  nextConfig.output = "export";
  nextConfig.images = { unoptimized: true };
  nextConfig.trailingSlash = true;
}

export default nextConfig;
