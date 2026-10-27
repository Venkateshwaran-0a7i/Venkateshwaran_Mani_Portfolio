# Venkateshwaran Mani — Portfolio

Dark cyberpunk portfolio built with **Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis**.

Signature feature: a **cursor-controlled & scroll-scrubbed video background** — a short clip that behaves like an interactive 3D model.

This repo is **fully portable**. One codebase deploys to Vercel, Netlify, Cloudflare Pages, GitHub Pages, AWS Amplify / S3+CloudFront, Render, Railway, Docker/VPS, or any plain static host — **with zero code changes**.

---

## Quick start

```bash
nvm use            # Node 20 (.nvmrc) — Node >= 18.17 required
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run typecheck
npm run lint
npm run build:static      # → ./out  (static export, default)
npm run preview:static    # serve ./out locally
```

---

## Architecture

```
src/
  app/                 layout, page, not-found, globals.css
  components/          CinematicVideo, Navbar, LenisProvider, sections/…
  data/content.ts      all copy (edit this to update the site)
  fonts/               self-hosted Oswald / Syne / Space Grotesk / JetBrains Mono
  lib/asset.ts         asset() + siteUrl() helpers (base-path aware)
  lib/fonts.ts         next/font/local loaders
public/
  video/portfolio-background.mp4   (+ poster.jpg)
  Venkateshwaran_Mani_CV.pdf
  og-image.png · icon.svg · robots.txt · sitemap.xml · _headers
```

---

## Dual build modes (`DEPLOY_TARGET`)

| Value | `next.config` behaviour | Use for |
| --- | --- | --- |
| `static` **(default)** | `output: "export"`, `images.unoptimized`, `trailingSlash: true` | GitHub Pages, Netlify, CF Pages, S3, any static host |
| `standalone` | `output: "standalone"` | Docker / Node VPS / Railway / Render |
| `vercel` | no `output` override | Vercel native |

```bash
npm run build:static       # DEPLOY_TARGET=static
npm run build:standalone   # DEPLOY_TARGET=standalone
npm run build:vercel       # DEPLOY_TARGET=vercel
```

Scripts use `cross-env` so they work on Windows, macOS, and Linux.

### Base path (GitHub Pages project sites)

Set `NEXT_PUBLIC_BASE_PATH=/YourRepoName` (no trailing slash). It is applied to `basePath` + `assetPrefix`, and every raw `/public` URL goes through `asset()` so `<video>`, résumé links, etc. resolve correctly under a sub-path.

---

## Environment variables

Copy `.env.example` → `.env.local` (or set in your host's dashboard):

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Absolute origin for metadataBase, OG, canonical, sitemap, robots (no trailing slash) |
| `NEXT_PUBLIC_BASE_PATH` | only for sub-path hosts | e.g. `/Venkateshwaran_Mani_Portfolio` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | optional | Formspree / Web3Forms / Getform URL. Empty → mailto: fallback |
| `DEPLOY_TARGET` | optional | `static` \| `standalone` \| `vercel` |

`scripts/generate-seo.mjs` runs on `prebuild` and rewrites `public/robots.txt` + `public/sitemap.xml` from `NEXT_PUBLIC_SITE_URL`.

---

## Deployment guides

### 1) Vercel

```bash
# Install CLI (optional) or connect the GitHub repo in the Vercel dashboard
vercel
```

- **Framework preset:** Next.js (do **not** set Output Directory — leave blank)
- **Build command:** from `vercel.json` → `npm run build:vercel` (`DEPLOY_TARGET=vercel`, no static `out/` export)
- **Node.js:** `20.x` (`.nvmrc` + `engines`)
- **Env (Project → Settings → Environment Variables):**
  - `NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app` (or your custom domain)
  - Leave `NEXT_PUBLIC_BASE_PATH` **empty** (GitHub Pages only)
  - Optional: `NEXT_PUBLIC_FORM_ENDPOINT`
- Headers / caching: see `vercel.json`
- Auto-detect: if `DEPLOY_TARGET` is unset, `VERCEL=1` forces vercel mode so a plain `npm run build` still works

### 2) Netlify

- **Build command:** `npm run build:static`  
- **Publish directory:** `out`  
- **Env:** `DEPLOY_TARGET=static`, `NEXT_PUBLIC_SITE_URL=https://your-site.netlify.app`  
- Config file: `netlify.toml` (+ `public/_headers`)

### 3) Cloudflare Pages

- **Build command:** `npm run build:static`  
- **Build output directory:** `out`  
- **Env:** `DEPLOY_TARGET=static`, `NEXT_PUBLIC_SITE_URL=https://your-site.pages.dev`  
- Headers: `public/_headers` is picked up automatically

### 4) GitHub Pages

Workflow: `.github/workflows/deploy.yml`

1. Repo → **Settings → Pages → Source: GitHub Actions**
2. Push to `main` (or run the workflow manually)
3. The workflow sets `NEXT_PUBLIC_BASE_PATH` from the repository name and `NEXT_PUBLIC_SITE_URL` from `actions/configure-pages`
4. Optional repo **Variable:** `NEXT_PUBLIC_FORM_ENDPOINT`

For a **user/org site** (`username.github.io`) set repository Variable `NEXT_PUBLIC_BASE_PATH` to empty and adjust the workflow env accordingly.

### 5) AWS Amplify / S3 + CloudFront

**Amplify**

- Build command: `npm run build:static`  
- Artifact: `out`  
- Env: `DEPLOY_TARGET=static`, `NEXT_PUBLIC_SITE_URL=https://…`

**S3 + CloudFront**

```bash
npm run build:static
aws s3 sync out/ s3://YOUR_BUCKET --delete
# Invalidate CloudFront distribution
```

Enable CloudFront to forward Range requests for `/video/*` (needed for scrubbing).

### 6) Render / Railway (Docker or Node)

**Docker (recommended)**

```bash
docker compose up --build
# → http://localhost:3000
```

Or:

```bash
docker build -t portfolio \
  --build-arg NEXT_PUBLIC_SITE_URL=https://example.com .
docker run -p 3000:3000 portfolio
```

**Node standalone (no Docker)**

```bash
npm run build:standalone
node .next/standalone/server.js
```

Copy `.next/static` and `public` next to the standalone server (the Dockerfile already does this).

### 7) Any plain static host / nginx VPS

```bash
npm run build:static
# Upload the entire `out/` folder
```

An example nginx config with gzip, long-cache for `/_next/static` and `/video`, and **Range request support** lives in `nginx.conf`.

---

## Video engine notes

`<video>` is never played — it is `muted`, `playsInline`, `preload="auto"`, no `autoPlay`, no `loop`, and permanently paused. A `requestAnimationFrame` loop drives `currentTime` from cursor X + scroll progress (LERP 0.10). Poster: `public/video/poster.jpg`. On load failure the stage falls back to the poster + CSS gradient. `prefers-reduced-motion` freezes scrubbing and parallax.

### Encoding (critical for scrubbing)

Browsers seek instantly only to *keyframes*. The shipped file is all-intra (~6.3 MB):

```bash
# Frame-accurate scrubbing (every frame a keyframe)
ffmpeg -i port/Venkateshwaran_M.mp4 -an -c:v libx264 -g 1 -keyint_min 1 \
  -crf 22 -preset slow -pix_fmt yuv420p -movflags +faststart \
  public/video/portfolio-background.mp4

# Smaller / lower-bitrate variant (still all-intra) — aim < ~25 MB for GH/CF Pages
ffmpeg -i port/Venkateshwaran_M.mp4 -an -c:v libx264 -g 1 -keyint_min 1 \
  -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart \
  public/video/portfolio-background.mp4
```

> **Size limits:** keep the file under ~**25 MB** for GitHub Pages and Cloudflare Pages soft limits. Hosts must support **HTTP Range requests** or scrubbing will stutter.

---

## Contact form

Client-only (no API routes / server actions):

1. Set `NEXT_PUBLIC_FORM_ENDPOINT` to a Formspree / Web3Forms / Getform URL → JSON POST.
2. Leave it empty → `mailto:` with prefilled subject/body + “Copy message”.

Communication channel cards (LinkedIn, Email, Mobile, GitHub) always stay available.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Video does not scrub / feels stuck | Re-encode all-intra (`-g 1`). Confirm host sends `Accept-Ranges: bytes`. Check HUD bottom-left for live `SCRUB` values. |
| Assets 404 under a sub-path | Set `NEXT_PUBLIC_BASE_PATH=/RepoName` and rebuild. Never hardcode `/video/...` — use `asset()`. |
| 404 on refresh / deep links | Static export uses `trailingSlash: true`. Configure the host to serve `*/index.html`. GitHub Pages + Netlify + CF Pages handle this; for nginx use the provided `try_files`. |
| Large video rejected | Raise `-crf` (e.g. 26) or shorten the clip. Stay under ~25 MB. |
| Fonts missing offline | Fonts are self-hosted under `src/fonts/` via `next/font/local` — no Google Fonts network needed at build time. |
| `overflow: hidden` broke scroll | Never put `overflow: hidden` on `html`/`body` — it breaks Lenis. |
| Docker build fails on fonts | Ensure `src/fonts/**` is not ignored by `.dockerignore`. |

---

## Scripts reference

```
npm run dev
npm run build              # respects DEPLOY_TARGET (default static via next.config)
npm run build:static
npm run build:standalone
npm run build:vercel
npm run start              # next start (standalone / vercel modes)
npm run preview:static     # serve ./out
npm run lint
npm run typecheck
npm run seo                # regenerate robots.txt + sitemap.xml
```

---

## License

Personal portfolio — © Venkateshwaran Mani. All rights reserved.
