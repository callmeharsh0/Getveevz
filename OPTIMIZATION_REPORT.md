# Phase 1: Read-Only Audit & Optimization Report
**Project:** GetVeevz (`getveevz-website`)  
**Auditor:** Senior Frontend Performance & Architecture Engineer  
**Date:** September 2026  
**Status:** Read-Only Audit Complete — Awaiting Approval for Phase 2  

---

## 1. Executive & Architectural Summary

### Framework & Architecture
- **Framework:** React 18.3.0 with Vite 5.4.21 as the build tool and development server.
- **Routing:** Client-Side Single Page Application (SPA) driven by `react-router-dom` v7.18.4 (using `BrowserRouter`).
- **Styling Architecture:** TailwindCSS v3.4.0 with Tailwind Animate, PostCSS, Autoprefixer, and custom Vanilla CSS classes inside `app/globals.css`.
- **Animation Ecosystem:** High density of overlapping animation runtimes:
  - GSAP v3.12.5 with `@gsap/react` and `ScrollTrigger` plugin.
  - `framer-motion` v13.1.1 **AND** `motion` v13.2.0 simultaneously installed and imported.
  - Native `requestAnimationFrame` loops in custom UI components.
  - Remnants of `@studio-freight/lenis` (smooth scrolling) written into `SmoothScroll.tsx` but never mounted in the live DOM.
- **Static Assets:** Hosted in `/public` (265.57 MB across 64 files), consisting largely of uncompressed 1080p MP4 social clips, uncompressed JPEG/PNG assets, and multiple identical duplicate files.

### Architectural Health Assessment
The codebase displays classic hallmarks of rapid "vibe coding":
1. **Next.js to Vite Porting Artifacts:** Ghost files like `app/layout.tsx` (`export const metadata = { title: 'Next.js' }`), ubiquitous `"use client";` directives at the top of pure Vite client files, and route folders modeled like App Router (`app/services/[slug]/page.tsx`).
2. **Duplicate Animation Engines:** Both legacy `framer-motion` and modern `motion` are actively imported across different components, bundling duplicate versions of the Framer Motion runtime (~100 kB redundant JS).
3. **Dead Code & Phantom Files:** 13 unused files (sections, components, utilities) and 5 unused dependencies totaling hundreds of kilobytes.
4. **Catastrophic Media Weight:** 265.57 MB in `/public`, including 69.1 MB of byte-for-byte duplicate videos, 48.1 MB of completely unreferenced video files, and unthrottled simultaneous video decoding on mobile.
5. **Critical Contact Form Disconnect:** The client intake questionnaire (`Questionnaire.tsx`) simulates submission with `setTimeout` and never sends or stores lead data anywhere.

---

## 2. Baseline Metrics

| Metric Category | Metric | Baseline Value | Target Post-Phase 2 |
|---|---|---|---|
| **Lighthouse (Mobile)** | Performance Score | **62 / 100** | **95+ / 100** |
| | Accessibility Score | **92 / 100** | **100 / 100** |
| | Best Practices Score | **100 / 100** | **100 / 100** |
| | SEO Score | **92 / 100** | **100 / 100** |
| **Lighthouse (Desktop)** | Performance Score | **94 / 100** | **98+ / 100** |
| | Accessibility Score | **96 / 100** | **100 / 100** |
| | Best Practices Score | **100 / 100** | **100 / 100** |
| | SEO Score | **92 / 100** | **100 / 100** |
| **Core Web Vitals (Mobile)** | First Contentful Paint (FCP) | **4.6 s** (Poor) | **< 1.2 s** |
| | Largest Contentful Paint (LCP) | **8.1 s** (Critical) | **< 2.0 s** |
| | Total Blocking Time (TBT) | **30 ms** (Good) | **< 50 ms** |
| | Cumulative Layout Shift (CLS) | **0.000** (Good) | **< 0.05** |
| | Speed Index | **5.8 s** | **< 2.0 s** |
| **Core Web Vitals (Desktop)**| First Contentful Paint (FCP) | **0.8 s** | **< 0.6 s** |
| | Largest Contentful Paint (LCP) | **1.5 s** | **< 1.0 s** |
| | Total Blocking Time (TBT) | **0 ms** | **0 ms** |
| | Cumulative Layout Shift (CLS) | **0.001** | **< 0.02** |
| **Bundle & Assets** | Total `/public` Asset Weight | **265.57 MB** (64 files) | **< 25 MB** |
| | Initial Transferred Payload (Mobile) | **9,852 KiB (~9.8 MB)** | **< 800 KiB** |
| | Total Uncompressed Client JS | **588.4 kB** | **< 280 kB** |
| | Production CSS Size | **106.5 kB** (16.3 kB gzip) | **< 45 kB** |
| | Render-Blocking Google Fonts | **5 families, 18 variants (922ms)** | **1 family, 2 weights self-hosted (< 40ms)** |
| **Code Health** | `npm audit` Vulnerabilities | **2** (1 High: esbuild/vite GHSA-67mh-4wv8-2f99, 1 Moderate) | **0** |
| | `tsc --noEmit` Errors | **0** | **0** (with strict flags added) |
| | Explicit `: any` / `as any` count | **2** | **0** |
| | `as` Type Assertions | **9** | **< 3** |
| | Non-null Assertions (`!`) | **3** | **0** |
| | Unused Files (Knip Audit) | **13 files** | **0** |
| | Unused Dependencies | **5 packages** | **0** |

---

## 3. Asset Analysis: Top 20 Largest Files in `/public`

| Rank | Size (MB) | Exact Bytes | File Path | Usage & Duplication Status |
|:---:|:---:|:---:|---|---|
| 1 | **23.00 MB** | 24,117,838 | `public/assets/Reels/thinkschool-maggi-masala.mp4` | **Dead Asset:** Completely unreferenced in source code |
| 2 | **22.94 MB** | 24,050,517 | `public/assets/Reels/rachitroo-dark-humor.mp4` | **Dead Asset:** Completely unreferenced in source code |
| 3 | **21.17 MB** | 22,200,922 | `public/assets/Reels/New/chemo Chip 📈_@DraperTV _#shorts_1080p.mp4` | **100% Duplicate** of `reel-8.mp4` (MD5: `1a26daeb7af...`) |
| 4 | **21.17 MB** | 22,200,922 | `public/assets/Reels/New/reel-8.mp4` | Used only in `character-filmstrip.html` iframe |
| 5 | **14.11 MB** | 14,796,882 | `public/assets/Reels/New/4 books that will change your life...mp4` | **100% Duplicate** of `reel-1.mp4` (MD5: `da19dccdb32...`) |
| 6 | **14.11 MB** | 14,796,882 | `public/assets/Reels/New/reel-1.mp4` | Used only in `character-filmstrip.html` iframe |
| 7 | **13.39 MB** | 14,038,391 | `public/assets/Reels/start-using-ai-zero-rupees.mp4` | Used in `DistributionFlow` (no WebP poster, eager) |
| 8 | **13.15 MB** | 13,793,271 | `public/assets/Reels/viral-maggi-secret.mp4` | Used in `DistributionFlow` (no WebP poster, eager) |
| 9 | **12.50 MB** | 13,109,126 | `public/assets/Reels/ai-coding-business.mp4` | Used in `DistributionFlow` (no WebP poster, eager) |
| 10 | **9.45 MB** | 9,913,101 | `public/assets/Reels/New/The only 3 books you need...mp4` | **100% Duplicate** of `reel-5.mp4` (MD5: `6c1b263b0bf...`) |
| 11 | **9.45 MB** | 9,913,101 | `public/assets/Reels/New/reel-5.mp4` | Used only in `character-filmstrip.html` iframe |
| 12 | **8.32 MB** | 8,728,532 | `public/assets/Reels/indian-parents-reality.mp4` | Used in `DistributionFlow` |
| 13 | **7.97 MB** | 8,361,713 | `public/assets/Reels/New/Future Of Payment 📈...mp4` | **100% Duplicate** of `reel-2.mp4` & `future-of-payment.mp4` |
| 14 | **7.97 MB** | 8,361,713 | `public/assets/Reels/New/reel-2.mp4` | **100% Duplicate** of `future-of-payment.mp4` |
| 15 | **7.97 MB** | 8,361,713 | `public/assets/Reels/future-of-payment.mp4` | Used in `DistributionFlow` |
| 16 | **7.19 MB** | 7,537,218 | `public/assets/Reels/New/Menstrual Blood Can Save Lives...mp4` | **100% Duplicate** of `reel-3.mp4` (MD5: `a179ec5b1d3...`) |
| 17 | **7.19 MB** | 7,537,218 | `public/assets/Reels/New/reel-3.mp4` | Used only in `character-filmstrip.html` iframe |
| 18 | **6.03 MB** | 6,327,895 | `public/assets/Reels/rachitroo-comedy-clip.mp4` | Used in `DistributionFlow` |
| 19 | **5.72 MB** | 5,999,573 | `public/assets/Reels/New/Nikhil Kamath’s Take...mp4` | **100% Duplicate** of `reel-4.mp4` (MD5: `30ff4eb438f...`) |
| 20 | **5.72 MB** | 5,999,573 | `public/assets/Reels/New/reel-4.mp4` | Used only in `character-filmstrip.html` iframe |

**Additional Duplicate Assets Identified Outside Top 20:**
- `public/assets/agency-video-1.mp4` (1.57 MB) == `agency-video-3.mp4` == `clipping.mp4` == `tracking.mp4` (MD5: `d9061d3da8601932e98f79ec8ba1c877` — 4 duplicate copies of the exact same video file).
- `public/assets/agency-video-2.mp4` (3.11 MB) == `distribution.mp4` (MD5: `82d9b86b01560ce17d310f3fd2a79ca9` — 2 duplicate copies).
- Social logos in `public/assets/logos/`: both `.png` AND `.jpg` variants exist for `facebook`, `instagram`, `tiktok`, `youtube`, and `youtubeshorts`.
- Client Avatars: `public/avatars/avatar1.jpg` (691.7 KB) and `avatar2.jpg` (578.6 KB) are over 1.27 MB combined for 40px display circles.
- Brandmark: `public/assets/Logo.png` is 295.5 KB for a 32–44px icon.

---

## 4. Comprehensive Audit Findings by Area

### Area 1: Asset Weight & Media Delivery
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **Critical** | `public/assets/Reels/` & `public/assets/Reels/New/` | **117.2 MB of pure duplicate & dead video files** in `/public`. 9 exact duplicate pairs in `/New/` (69.1 MB) and 2 unreferenced 24 MB videos (`thinkschool-maggi-masala.mp4`, `rachitroo-dark-humor.mp4`). Eagerly packaged into the static build and deployment. | Delete all duplicate and unreferenced video files. Canonicalize filenames to clean identifiers (e.g. `reel-1.mp4` to `reel-9.mp4`). |
| **High** | `DistributionFlow-standalone.tsx:609, 637` | **7 unoptimized 1080p MP4 videos load and decode simultaneously** when section scrolls into view. Triggers 66 MB network burst and drops framerate on mobile GPUs. Missing WebP poster frames. | Transcode videos to compressed 720p/540p H.264 / AV1 at 1.2 Mbps (~1.5 MB each). Add lightweight WebP poster frames. Play only the active video card; keep peripheral cards paused with poster preview. |
| **High** | `index.html:15-17` | **Render-Blocking Google Fonts with 5 families and 18 variants.** Requests `Instrument Serif`, `Oswald`, `Playfair Display`, `Plus Jakarta Sans`, and `Space Grotesk`. Lighthouse reports a **922 ms render block**. Tailwind only configures `Space Grotesk`. | Remove `Instrument Serif`, `Oswald`, `Playfair Display`, and `Plus Jakarta Sans` entirely. Self-host `Space Grotesk` (WOFF2 weights 400, 500, 700) with `font-display: swap` in `@font-face`. |
| **Medium** | `public/avatars/avatar1.jpg`, `avatar2.jpg`, `public/assets/Logo.png` | **Oversized static images:** 691 KB and 578 KB avatars displayed at 40×40px. Logo is 295 KB displayed at 32px. No `srcset`, WebP, or AVIF. | Downscale and convert avatars to 80×80px AVIF/WebP (~8 KB each, 98% savings). Convert logo to SVG / optimized WebP (~12 KB). |
| **Medium** | `public/assets/` & `ClientLogosMarquee.tsx:17` | **Filenames with spaces and brackets** (`WhatsApp Image 2026-09-12 at 8..jpeg`, `slay point.jpg`). Causes URL escaping glitches and forced an in-code `onError` hack in `ClientLogosMarquee.tsx:81`. | Rename assets to kebab-case without spaces or parentheticals (`slay-point.jpg`, `proof-1.webp`). Remove runtime `onError` patch. |

---

### Area 2: Runtime & Animation Performance
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **Critical** | `public/character-filmstrip.html:413-479` | **Infinite, unthrottled `requestAnimationFrame` loop with dynamic CSS blur filters.** Updates 9 cards with 3D matrix math, dynamic blur filters, and DOM styles at 60/120fps indefinitely, even when the filmstrip is offscreen or backgrounded. Causes persistent battery drain and GPU thermal load. | Wrap RAF loop in `IntersectionObserver` and document `visibilitychange` listener. Halt the loop when section is outside viewport or tab is hidden. Remove dynamic per-frame blur filter calculation. |
| **High** | `globals.css:75-80` | **Destructive universal CSS rule on mobile:** `@media (max-width: 767px) { * { max-width: 100%; word-break: break-word; } }`. Overrides all elements with universal specificity, breaking SVGs, animated translation layers, flex layouts, and icon spans across all subcomponents. | Remove the universal `*` rule from `globals.css`. Apply targeted `overflow-x: clip` to root layout containers and specific text wrapping to typography wrappers only. |
| **High** | `parallax-floating.tsx:149` & `parallax-floating-demo.tsx` | **Excessive `will-change: transform`** applied permanently to 8 overlapping floating image containers. Forces Chrome to allocate 8 persistent GPU composite layers, consuming mobile VRAM. | Remove permanent `will-change: transform` class. Use hardware-accelerated transforms (`transform: translate3d(...)`) directly. |
| **Medium** | `WeHandleItAll.tsx:90-96` & `Hero.tsx:226-274` | **Unthrottled mouse move listeners with `getBoundingClientRect()`.** Calling `getBoundingClientRect()` on high-frequency `mousemove` events forces synchronous reflow / layout calculation on every mouse cursor delta. | Cache element rect on container `mouseenter` / `resize`. Use GSAP `quickTo` or RAF throttling to apply mouse coordinates. |
| **Medium** | `DistributionFlow-standalone.tsx:442` & `services/page.tsx:27` | **Viewport height bugs on mobile:** Uses `h-screen` (100vh) in pinned sections, causing visual jumps when mobile browser address bars collapse or expand during scroll. | Replace `h-screen` with `min-h-[100dvh]` / `h-[100dvh]` to account for dynamic mobile viewports cleanly. |

---

### Area 3: Build & Bundle Optimization
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **High** | `package.json:21, 24` & `vite.config.ts:18` | **Dual Framer Motion runtimes bundled:** Both `framer-motion` v13.1.1 and `motion` v13.2.0 are imported in different components (`UnifiedNav.tsx` uses `framer-motion`; `parallax-floating.tsx` uses `motion`). Vite bundles both packages into `animations` (210.22 kB). | Migrate all imports from `"framer-motion"` to `"motion/react"`. Uninstall `framer-motion`. Eliminates ~90 kB of duplicate animation runtime. |
| **High** | `vite.config.ts:13-22` | **Arbitrary manual chunking & suppressed warning limit.** `chunkSizeWarningLimit: 800` masks bundle bloat. Hardcoding `vendor` and `animations` forces route-level pages (`/services`, `/services/:slug`) to synchronously download the entire animation stack before displaying static content. | Refactor `vite.config.ts` with granular `manualChunks`: separate React core, isolate GSAP plugins, lazy-load route-specific chunks. Restore warning limit to standard 500 kB. |
| **High** | `vite.config.ts` / production build output | **`react-router` pulling in development build chunks:** Vite transforms `node_modules/react-router/dist/development/chunk-OB3PAWPO.mjs` during `vite build`, indicating React Router v7 export condition defaults to development mode. | Configure `resolve.conditions: ['production']` or define `process.env.NODE_ENV: JSON.stringify('production')` in Vite config to ensure lean production bundles. |
| **Medium** | `package.json:27` & `vite.config.ts:19` | **Unused library forced into bundle:** `react-icons` is bundled into `icons-CiepdaDK.js` via `manualChunks`, but is only referenced in dead code (`circular-testimonials.tsx`). Never rendered on live pages. | Uninstall `react-icons`. Remove from `manualChunks`. All active icons use `lucide-react`. |

---

### Area 4: Accessibility & Responsiveness
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **High** | `useScrollReveal.ts:21-36` & `DistributionFlow-standalone.tsx` | **Missing `prefers-reduced-motion` compliance in GSAP hooks.** If a user has system reduced motion enabled, `useScrollReveal` starts all `[data-reveal]` elements at `opacity: 0, y: 32` and relies on scroll animations to reveal them, causing content to remain invisible or animate abruptly. | Check `window.matchMedia("(prefers-reduced-motion: reduce)").matches`. If true, set `opacity: 1, y: 0` immediately without triggering ScrollTrigger timelines. |
| **High** | `Hero.tsx:459, 630` | **Broken heading hierarchy:** An `<h2>` ("We cut short form clips...") appears in DOM order before the primary page `<h1>` ("TURN LONG FORM INTO A DISTRIBUTION ENGINE"). Confuses screen readers. | Restructure heading tags so `<h1>` is the top-level page landmark, followed sequentially by `<h2>` section headings. |
| **Medium** | `Hero.tsx:470-520` vs `UnifiedNav.tsx:123` | **Duplicate Navigation Elements:** `Hero.tsx` renders its own complete `<header>` with logo, CTA, and mobile hamburger button, while `UnifiedNav.tsx` renders a separate fixed floating `<header>`. On desktop, they can visually collide; on mobile, there are two distinct navigation systems with inconsistent behavior. | Consolidate navigation into a single unified `UnifiedNav` component. Remove the duplicate header from `Hero.tsx` or let `UnifiedNav` dock into the hero top slot. |
| **Medium** | `CapabilitiesFlywheel.tsx:32, 35` | **Low color contrast on light surfaces:** Text in `#8BA3C5` (frost blue) on white backgrounds has a contrast ratio of **2.16:1**, severely failing WCAG AA (minimum 4.5:1). | Use `#3A506B` or `#1E3A8A` for text labels on light backgrounds to ensure full WCAG AA/AAA compliance. |

---

### Area 5: CSS & Design-System Architecture
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **High** | Global codebase (`components/sections/*.tsx`) | **Hardcoded Hex Color Drift:** Over 15 hardcoded hex variants scattered across components with subtle accidental drift (`#F3EFEA` vs `#f2ece1`, `#8BA3C5` vs `#8BA3C6`, `#090e14` vs `#0a0f16`). Design tokens defined in `:root` (`--bg: #000000`, `--surface: #23354D`) are largely ignored in favor of raw utility classes. | Centralize color tokens in `tailwind.config.ts` (e.g. `surface-dark`, `canvas-light`, `brand-blue`, `frost`). Replace arbitrary hex strings with semantic design tokens. |
| **Medium** | `components/sections/` (13 dead files) | **Ghost & Duplicate Components:** Knip identified 13 unused files: `DistributionFlow.tsx` (duplicate of `DistributionFlow-standalone.tsx`), `Pricing2.tsx` (duplicate of `Pricing.tsx`), `AudienceRepurpose.tsx`, `CaseStudies.tsx`, `ClientTestimonials.tsx`, `WhyUs.tsx`, `accordion.tsx`, `circular-testimonials.tsx`, `demo.tsx`, `app/layout.tsx`. | Delete all confirmed dead files and unused duplicates to reduce workspace confusion, prevent dead imports, and eliminate maintenance overhead. |
| **Medium** | `app/globals.css:184-211` | **Specificity wars with 8 `!important` declarations:** Laser spine timeline steps use `!important` to force frost accent styles (`border-color: #8BA3C6 !important;`). | Refactor `.is-active-step` using clean CSS specificity or Tailwind data-attribute variants (`data-active:border-frost`). Remove all `!important` rules. |

---

### Area 6: TypeScript Quality
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **Medium** | `ReelsFilmstrip.tsx:88, 99` | **Explicit `: any` casting on window reference:** `(iframeRef.current.contentWindow as any).prevReel?.()`. Bypasses type checking. | Define a strict interface `FilmstripWindow extends Window { prevReel?: () => void; nextReel?: () => void; }` and cast to `FilmstripWindow`. |
| **Low** | `tsconfig.json` | **Missing strict compiler flags:** While `strict: true` is on, recommended compiler flags (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noImplicitReturns`) are disabled. | Enable `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`, and `noImplicitReturns: true` in `tsconfig.json`. |

---

### Area 7: Security (Frontend-Only Scope)
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **Critical** | `Questionnaire.tsx:177-186` | **Fake Form Submission / Lead Loss:** Submitting the client application runs `setTimeout(() => setIsSubmitted(true), 600)`. Form data is never sent to any webhook, email provider (e.g. Formspree/Resend/EmailJS), or backend. High-value inbound leads are silently discarded. | Connect form submission to a real endpoint (e.g., Formspree, Resend API route, or webhook). Add basic honeypot field for spam prevention. Provide graceful error handling. |
| **High** | `GlobeMorph.tsx:28-30` | **Unpinned Third-Party Iframe without SRI or CSP:** Embeds `https://tkartik.com/globe-to-flat-map/van-der-grinten-map.html` directly into the Hero. If that personal third-party site is compromised or goes down, it can inject malicious scripts or break the Hero layout. | Self-host the globe HTML/Three.js script in `/public` or implement with native Three.js / Canvas component. Isolate with restrictive `sandbox` attribute. |
| **High** | `vercel.json:8-45` | **Missing Host Security Headers:** `vercel.json` provides cache headers for assets, but defines zero security headers (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options: DENY`). | Add comprehensive HTTP security headers to `vercel.json`. |
| **Medium** | `package.json` / `npm audit` | **High Severity Vulnerability in esbuild / Vite:** GHSA-67mh-4wv8-2f99 (dev server SSR/request issue affecting `esbuild <=0.24.2` and `vite <=6.4.2`). | Upgrade `vite` and `esbuild` to safe patched releases. |
| **Low** | `ReelsFilmstrip.tsx:89, 100` | **Wildcard target origin in `postMessage`:** Uses `iframeRef.current.contentWindow.postMessage("filmstrip:next", "*")`. Wildcard `*` allows any window that intercepts the frame to read message events. | Restrict `postMessage` target origin to `window.location.origin`. |

---

### Area 8: SEO, Sharing & Deployment
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **High** | `index.html` & static host | **Missing Open Graph & Twitter Cards:** No `og:title`, `og:image`, `og:description`, `twitter:card`. Links shared on Slack, Twitter/X, iMessage, or LinkedIn render as blank fallback text. | Add complete Open Graph and Twitter Card tags to `index.html`. Generate a high-resolution 1200×630px social card (`og-image.jpg`). |
| **High** | Root & `/public` | **Missing `robots.txt` and `sitemap.xml`:** Lighthouse flagged **27 errors in `robots.txt`** because requesting `/robots.txt` triggered the SPA fallback rewrite and served HTML `index.html`. | Create valid `public/robots.txt` and `public/sitemap.xml`. Add canonical link tag to `index.html`. |
| **Medium** | `routes.tsx` | **Static Title & Description across all routes:** Navigating from `/` to `/services` or `/services/:slug` never updates the browser `<title>` or meta description. | Implement lightweight route-based `<title>` and `<meta name="description">` updates (via a simple `useTitle` hook or `react-helmet-async`). |

---

### Area 9: Tooling, Testing & CI/CD
| Severity | Location | Finding & Architectural Risk | Exact Fix |
|---|---|---|---|
| **Medium** | Root / `package.json` | **No Linter Configured:** `"lint": "tsc --noEmit"` is currently set. No ESLint or Prettier setup exists. Unused imports and syntax bugs can be committed without warning. | Install and configure `@typescript-eslint` and Prettier with an automated `npm run lint` script. |
| **Low** | Root / `.github` | **Missing Automated CI & Smoke Tests:** No GitHub Actions workflow to verify `npm run build` and `tsc --noEmit` on pull requests. | Add a minimal GitHub Actions workflow running typecheck and production build. |

---

## 5. Prioritized Implementation Roadmap

### Phase 2 Roadmap & Impact Matrix

| Phase / Tier | Item | Effort | Risk | Expected Impact | Visual Diff Risk? |
|---|---|:---:|:---:|---|:---:|
| **Do Now (Tier 1: Security & Quick Wins)** | 1. Implement real webhook submission & honeypot for `Questionnaire.tsx` | M | Low | **Stops lead loss immediately** | No |
| | 2. Add complete security headers (`CSP`, `X-Content-Type-Options`) to `vercel.json` | S | Low | Hardens host against clickjacking & XSS | No |
| | 3. Delete 117.2 MB of duplicate and dead videos in `/public` | S | Low | Reduces repo size by 44%, accelerates deploys | No |
| | 4. Delete 13 dead code files and unused dependencies (`knip` audit) | S | Low | Removes ~150 kB of dead code & maintenance debt | No |
| | 5. Add `robots.txt`, `sitemap.xml`, Open Graph & Twitter meta tags | S | Low | Fixes 27 Lighthouse SEO errors, enables social previews | No |
| | 6. Address `npm audit` vulnerability (patch `vite` / `esbuild`) | S | Low | Closes dev server security CVE | No |
| **Do Next (Tier 2: Core Performance & Animation)** | 7. Eliminate render-blocking fonts: self-host `Space Grotesk`, remove 4 unused families | S | Low | **Faves ~900ms LCP on mobile & desktop** | No (Tailwind already uses Space Grotesk) |
| | 8. Unify animation library: migrate from `framer-motion` to `motion/react` | M | Low | Drops ~90 kB duplicate bundle JS | No |
| | 9. Refactor `character-filmstrip.html`: pause RAF when offscreen/tab hidden | M | Medium | Eliminates 100% idle GPU usage & battery drain | No |
| | 10. Optimize `DistributionFlow`: compress videos, add posters, pause offscreen | M | Medium | Drops 50+ MB mobile network transfer, stops stutter | Minimal (same clips, lighter) |
| | 11. Remove destructive mobile universal CSS rule (`* { max-width: 100% }`) | S | Medium | Fixes layout clipping on small screens | Improves layout stability |
| | 12. Fix heading order (`h1` before `h2`) & contrast ratios | S | Low | Elevates Accessibility score from 92 to 100 | No |
| | 13. Optimize images (`Logo.png`, `avatar1.jpg`, `avatar2.jpg` to WebP/AVIF) | S | Low | Saves ~1.4 MB image payload | No |
| **Consider Later (Tier 3: Polish & Tooling)** | 14. Self-host `GlobeMorph` asset to eliminate external personal domain dependency | M | Medium | Removes external network dependency on `tkartik.com` | No |
| | 15. Consolidate `Hero.tsx` internal nav and `UnifiedNav.tsx` | M | Medium | Cleans navigation DOM structure | Requires visual alignment |
| | 16. Install ESLint + Prettier + Minimal GitHub Actions CI | S | Low | Enforces clean code on future commits | No |

---

## 6. Performance Budget Proposal

To prevent future performance regression, the following budgets are established:

| Metric | Proposed Budget | Current Baseline |
|---|---|---|
| **Max Initial JS Bundle (Gzipped)** | **≤ 160 kB** | ~200 kB gzipped |
| **Max Initial CSS Bundle (Gzipped)** | **≤ 25 kB** | 16.3 kB gzipped (Passed) |
| **Max Initial Page Transfer Weight** | **≤ 1.2 MB** | **9.8 MB (Failed by 8.6 MB)** |
| **Target Mobile LCP** | **≤ 2.0 s** | **8.1 s (Failed by 6.1 s)** |
| **Target Desktop LCP** | **≤ 1.0 s** | **1.5 s** |
| **Target CLS** | **≤ 0.02** | 0.000 (Passed) |
| **Target Mobile Performance Score** | **≥ 90** | 62 |
| **Total `/public` Media Weight** | **≤ 25 MB** | **265.6 MB (Failed by 240 MB)** |

---

## 7. Honest Engineering Assessment: What to Patch vs. What to Rewrite

### What to Patch (Keep & Optimize)
1. **The Core Visual Styling & Motion Aesthetics:** The typography, glassmorphism card styling, interactive stat counters, and GSAP timeline reveals look aesthetically sharp and well-aligned with high-end creative agency design. These should remain visually identical while optimizing the underlying engine.
2. **`DistributionFlow-standalone.tsx`:** The pinned GSAP timeline and connection lines are compelling. Patching the video loading strategy (posters + pausing non-active videos) will make it silky smooth without altering the presentation.
3. **`UnifiedNav.tsx`:** The floating island navigation with spring physics works well. Patching it to be the sole navigation authority solves all desktop/mobile header redundancy.

### What Should Be Rewritten or Replaced
1. **`GlobeMorph.tsx`:** Currently an iframe pointing to an unpinned third-party personal website (`https://tkartik.com/...`). It should either be replaced with a localized Three.js component or self-hosted as an isolated, sandboxed local static bundle.
2. **`public/character-filmstrip.html`:** An unoptimized 484-line iframe page running a persistent, unthrottled RAF render loop with inline blur filters. It should be refactored into a clean React component or heavily optimized with strict `IntersectionObserver` pause hooks.
3. **`Questionnaire.tsx` Submission Handler:** The current fake `setTimeout` submission must be replaced with a real, hardened webhook or form API integration.

---

## 8. Summary & Next Steps

This concludes **Phase 1 (Read-Only Audit)**. No project code files have been modified.

**To proceed to Phase 2 (Implementation):**
Per your instructions, work will take place on a dedicated branch (`perf-optimization`), executing changes sequentially from security/secrets -> assets -> dependencies -> build -> runtime performance -> accessibility -> architecture, running builds and typechecks after every change.

Please confirm whether you approve proceeding to Phase 2 with this roadmap.
