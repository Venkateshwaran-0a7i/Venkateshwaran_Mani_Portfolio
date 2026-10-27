/**
 * Writes static robots.txt + sitemap.xml into /public so they ship with
 * `output: "export"` builds (no runtime sitemap route required).
 *
 * Uses NEXT_PUBLIC_SITE_URL when set; otherwise falls back to the GitHub Pages URL.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const pub = join(root, "public");
mkdirSync(pub, { recursive: true });

const vercelHost = (process.env.VERCEL_URL || "").replace(/\/$/, "");
const base = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelHost ? `https://${vercelHost}` : "") ||
  "https://venkateshwaran-0a7i.github.io/Venkateshwaran_Mani_Portfolio"
).replace(/\/$/, "");

const today = new Date().toISOString().slice(0, 10);

const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

writeFileSync(join(pub, "robots.txt"), robots);
writeFileSync(join(pub, "sitemap.xml"), sitemap);
console.log(`SEO files written for ${base}`);
