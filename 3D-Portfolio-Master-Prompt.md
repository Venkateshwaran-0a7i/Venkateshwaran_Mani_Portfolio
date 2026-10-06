# MASTER PROMPT — 2D → 3D Portfolio Migration
### Target repo: `Venkateshwaran_Mani_Portfolio` (Venkateshwaran-0a7i)

> Copy everything below the line into Claude Code, Cursor, or any repo-aware coding agent that has access to the cloned repository. It is written as a requirements document, not a conversation — the agent should treat every constraint as binding, not a suggestion.

---

# ROLE & ARCHITECTURAL CONTEXT
You are a Principal Frontend Engineer and Creative Technologist. You specialize in migrating static/2D marketing and portfolio sites into WebGL-driven, motion-rich experiences without sacrificing load performance, accessibility, or SEO. You are fluent in React/Next.js, Three.js / React Three Fiber, Tailwind CSS, the shadcn CLI registry ecosystem, Framer Motion, and GSAP. You treat every copied third-party component as code you now own and are responsible for — not a black-box dependency.

# SYSTEM OBJECTIVE
Migrate the existing 2D portfolio at `https://github.com/Venkateshwaran-0a7i/Venkateshwaran_Mani_Portfolio` into a 3D, scroll-driven, interactive portfolio — while preserving 100% of the existing content (bio, skills, projects, experience, contact info, resume link, social links) and all existing routes/URLs. The 3D layer is an enhancement over the content, not a replacement for it.

# PHASE 0 — REPO AUDIT (do this before writing any code)
Do not assume the current stack. Clone the repo and produce a short audit covering:
1. Framework: plain HTML/CSS/JS, React (CRA), Next.js, or Vite? What version?
2. Styling system currently used (CSS modules, Tailwind, styled-components, plain CSS)?
3. Content inventory: list every section/page and where its data lives (hardcoded JSX, JSON/MDX data files, CMS).
4. Existing routing (if any) and existing SEO setup (meta tags, OG images, sitemap).
5. Build/deploy target (GitHub Pages, Vercel, Netlify) — this determines whether SSR/SSG is available, which matters a lot for a Three.js-heavy site.
6. Current Lighthouse scores (Performance, Accessibility, SEO) as a baseline to protect.

Output this as a short "Migration Readiness Report" before proceeding to Phase 1. If the repo is plain HTML/CSS/JS, the plan below requires migrating it to **Next.js (App Router) + TypeScript + Tailwind CSS** first, since every target library below assumes that stack.

# TARGET TECHNICAL ENVIRONMENT
- Framework: Next.js 14+ (App Router), TypeScript
- 3D: `three`, `@react-three/fiber`, `@react-three/drei` for the actual 3D scenes (none of the four libraries below are 3D engines themselves — they supply UI/animation components that sit around or on top of the R3F canvas)
- Styling: Tailwind CSS + shadcn/ui primitives (`components/ui`)
- Animation: Framer Motion (for DOM/UI motion) + GSAP with ScrollTrigger (for scroll-choreographed sequences)
- Component sourcing: shadcn CLI (`npx shadcn add <url>`) as the install mechanism for all four registries below

# SOURCE COMPONENT LIBRARIES — WHAT EACH ONE ACTUALLY PROVIDES
Use each library for what it's genuinely good at. Do not force all four into the same section.

| Library | What it is | Install method | Licensing note |
|---|---|---|---|
| **21st.dev** (21st.dev) | Community registry (not a single-vendor library) of 12,000+ shadcn-style React/Tailwind/Radix components from many authors — hero sections, navs, cards, pricing blocks, shader/gradient backgrounds. Code is copied into your repo, not imported as a package. | Browse a component, copy its AI-ready install prompt or run the shadcn CLI command it gives you. 2 free copies/day on the free tier; unlimited via membership. | Mixed per-author licenses — check each component's page before shipping commercially. |
| **Skiper UI** (skiper-ui.com) | "Un-common" shadcn-compatible component registry (70+ components) built on React + Tailwind + Framer Motion/GSAP — image reveals, cursor trails, drag-and-scroll, dynamic island, token-swap style interactions. | `npx shadcn add @skiper-ui/<component>` | 24+ components free, the rest are paid (Pro license key required for CLI install of premium items). |
| **Vengeance UI** (vengenceui.com) | Focused library (~26+ components) of animated landing-page components on Radix + Tailwind + Framer Motion — 3D displacement text, perspective grids, flip/fade text, folder previews, spotlight navbars, staggered/bento grids. | `npx shadcn add "https://www.vengenceui.com/r/<component>.json"` | Appears free/open at present — re-verify current terms before shipping. |
| **Animmaster Lib** (animmasterlib.dev) | Paid, one-time-purchase pack of 300 hand-written components centered on WebGL shaders, GSAP scroll/hero/grid/mouse effects and 3D animations, delivered as a Google Drive folder of raw code (not a CLI registry). | Manual: purchase → download → hand-copy/paste the relevant components into the repo, adapting them to the Next.js/TS structure. | One-time PRO purchase = no future updates; Premium tier = lifetime updates. This is the only one of the four that costs money to access and isn't distributed via shadcn CLI — budget/approve this before the agent tries to use it, and don't fabricate its components if no purchase has been made. |

**Agent instruction:** if a task below calls for an Animmaster Lib component and it hasn't actually been purchased/downloaded into the repo, stop and flag it rather than inventing placeholder code that claims to be from that library.

# COMPONENT-TO-SECTION MAPPING (edit before running — this is the default plan)
| Portfolio section | 3D/motion treatment | Primary source |
|---|---|---|
| Hero / landing | Full-bleed R3F canvas (name/role in 3D type or a WebGL shader background) with a scroll-cue | Animmaster Lib (WebGL shader/hero) or 21st.dev (shader/gradient backgrounds) for the backdrop; hand-rolled R3F for any 3D model or particle field |
| Navigation | Sticky/spotlight navbar, mobile drawer | Vengeance UI (spotlight navbar) or Skiper UI (dynamic island) |
| About/bio | Scroll-triggered reveal, magnetic cursor | Skiper UI (image reveal, cursor trail) |
| Skills | Animated grid / bento layout | Vengeance UI (staggered grid, expandable bento grid) |
| Projects | 3D tilt/perspective cards, image-cursor-trail on hover | 21st.dev (project/portfolio card blocks) + Skiper UI (image cursor trail) |
| Experience/timeline | GSAP ScrollTrigger-driven vertical timeline | Animmaster Lib (scroll animations) |
| Testimonials/socials (if present) | Logo slider / stacked logos | Vengeance UI |
| Contact | Animated form with number/text reveal on submit | 21st.dev (form blocks) + Vengeance UI (animated number/flip text for confirmation state) |
| Page/section transitions | Shared transition layer | Animmaster Lib (page transitions) |
| Cursor | Custom cursor, hover states | Skiper UI |

# HARD CONSTRAINTS
1. **Content parity**: every piece of existing text, project data, links, and the resume/CV download must survive the migration unchanged unless the user explicitly asks for copy edits.
2. **Progressive enhancement / fallback**: detect `prefers-reduced-motion` and low-end devices (e.g. `navigator.hardwareConcurrency`, or a WebGL capability check) and serve a static/lightly-animated fallback of every 3D section — never a blank screen if WebGL/context creation fails.
3. **Performance budget**: keep Lighthouse Performance ≥ 85 on mobile. Concretely: lazy-load the R3F canvas below the fold, code-split each heavy component, compress/convert any 3D assets to `.glb`/Draco, cap shader/particle counts on mobile viewports, and never block first paint on Three.js hydration.
4. **Accessibility**: all interactive 3D/animated elements need a non-mouse path (keyboard focus, visible focus rings) and appropriate `aria-label`s; decorative canvases get `aria-hidden`. Respect `prefers-reduced-motion` by disabling parallax/scroll-jacking, not just slowing it down.
5. **SEO**: 3D/canvas content is invisible to crawlers — all real content (name, bio, project descriptions, links) must exist in the actual DOM/SSR output, not only inside canvas text or WebGL textures. Keep existing meta tags, OG image, and sitemap working after the framework migration.
6. **Licensing hygiene**: before installing any premium component (Skiper UI Pro, Animmaster Lib), confirm it's been purchased. Note each component's origin library in a code comment so future maintainers know which registry to check for updates/licensing.
7. **No framework lock-in surprises**: since components come from four different registries with different animation engines (Framer Motion vs GSAP vs raw CSS), standardize on one primary motion library per concern (e.g., GSAP+ScrollTrigger for scroll choreography, Framer Motion for micro-interactions) to avoid shipping two heavy animation runtimes redundantly.

# REQUIRED OUTPUT STRUCTURE
When executing this migration, do not jump straight to a wall of code. Deliver work in this order, and treat each as a checkpoint the user can review before you continue:

1. **Migration Readiness Report** (Phase 0 audit above)
2. **Architecture diagram** (Mermaid) showing: Next.js App Router structure → layout → sections → which are client components wrapping R3F canvases vs. server-rendered content
3. **Dependency manifest** — exact `package.json` additions, and the exact shadcn/CLI install commands per component pulled from 21st.dev / Skiper UI / Vengeance UI, plus a manual checklist for any Animmaster Lib components actually purchased
4. **Component mapping table** (use/refine the table above) confirmed against the real content inventory from Phase 0
5. **Implementation in phases**, each independently shippable:
   - Phase 1: Framework migration (if needed) + Tailwind/shadcn setup, content ported 1:1, zero visual regressions
   - Phase 2: Hero 3D scene + navigation
   - Phase 3: Remaining section-by-section motion upgrades per the mapping table
   - Phase 4: Fallback/reduced-motion/perf pass + Lighthouse re-check against Phase 0 baseline
6. **Edge cases & failure mitigations** — explicitly cover: WebGL unsupported/blocked, slow 3G/low-end mobile, reduced-motion users, JS-disabled crawlers, a component license that turns out to be Pro-only mid-implementation, and any content section discovered in Phase 0 that doesn't fit the default mapping table.

Do not produce placeholder code or "left as an exercise" sections — every phase's code must be complete and runnable against the actual repo contents discovered in Phase 0.
