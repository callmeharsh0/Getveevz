# GetVeevz Codebase Cleanup & Bug-Fix Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Remove dead components/code, prune unused dependencies, fix structural inconsistencies, and shrink the 559 KB bundle — without changing any visual output or the fixed obsidian/cobalt/sky theme.

**Current state:** `npm run build` passes (558.94 kB JS / gzip 182.85 kB, over the 500 kB chunk warning). No test suite, no linter, no typecheck in CI path (`vite build` does not run `tsc`).

---

## Audit findings

### A. Unused component files (import-graph verified)
| File | Why dead |
|---|---|
| `src/ui/sections/1-Hook/HookSection.jsx` | Not imported by App or anything else |
| `src/ui/sections/10-BookACall/BookACall.jsx` | Superseded by FinalCTA |
| `src/ui/sections/2-Results/ResultsSection.jsx` | Old version; App uses `ImageStreamHero.jsx` instead |
| `src/ui/sections/4-PortalTransition/PortalTransition.jsx` | Not imported |
| `src/ui/sections/8-Onboarding/OnboardingSection.jsx` | Not imported |
| `src/hooks/useReducedMotion.js` | Only referenced by itself/dead files |

### B. Files that become orphans after A
- `src/ui/common/BackgroundMotion.jsx` — only used by dead ResultsSection
- `src/utils/carouselMath.js` — only used by dead ResultsSection
- `src/ui/common/onboarding-dialog.tsx` — only used by dead OnboardingSection
- `src/ui/common/NavArrow.jsx` — not imported anywhere

### C. Unused npm dependencies (grep-verified zero imports)
- `embla-carousel-react` (only in dead onboarding-dialog)
- `@radix-ui/react-slot`, `class-variance-authority` (zero imports anywhere)
- `ogl` (zero imports — SplashCursor is self-contained)

### D. Structure issues
1. Inconsistent section folder naming: some numbered (`3-ProblemSolution`), some not (`Hero`, `FAQ`) — and numbers don't match render order (App renders Hero→Proof→ProblemSolution… while folders say 1-Hook, 2-Results).
2. Duplicated concern: `ui/common/parallax-floating.tsx` vs `ui/sections/ParallaxFloating/ParallaxFloatingSection.jsx` (wrapper around it) — merge into one location.
3. Dead state: `App.jsx:40` `isDark` state — theme is permanently dark; prop drilled to EditorialHeroSection for no effect.
4. Pointless `"use client"` directives in `SplashCursor.jsx`, `parallax-floating.tsx`, `ImageStreamHero.jsx` (Next.js directive, no-op in Vite).
5. No typecheck/lint gate: `vite build` skips `tsc`; mixed `.ts/.tsx` files are never type-checked.
6. Bundle: single 559 KB chunk — three.js + GSAP + motion all eagerly loaded.

### E. Risks / non-goals
- Do NOT touch palette (#050508/#2563EB/#38BDF8), fonts, or animation feel (user-fixed design system).
- Verify visually after each deletion batch via `npm run dev` + full-page scroll.

---

## Plan

### Task 1: Delete dead section components
**Files (delete):**
- `src/ui/sections/1-Hook/HookSection.jsx`
- `src/ui/sections/10-BookACall/BookACall.jsx`
- `src/ui/sections/2-Results/ResultsSection.jsx`
- `src/ui/sections/4-PortalTransition/PortalTransition.jsx`
- `src/ui/sections/8-Onboarding/OnboardingSection.jsx`

**Steps:**
1. Delete the five files (and their now-empty folders).
2. `grep -rn "HookSection\|BookACall\b\|ResultsSection\|PortalTransition\|OnboardingSection" src` → expect zero hits.
3. Run `npm run build` → expect success, bundle smaller than current.

### Task 2: Delete orphaned helpers + prune dependencies
**Files (delete):**
- `src/ui/common/BackgroundMotion.jsx`
- `src/ui/common/NavArrow.jsx`
- `src/ui/common/onboarding-dialog.tsx`
- `src/hooks/useReducedMotion.js`
- `src/utils/carouselMath.js`

**Steps:**
1. Delete files; re-grep each basename → zero hits.
2. Remove from package.json: `embla-carousel-react`, `@radix-ui/react-slot`, `class-variance-authority`, `ogl`.
3. `npm install` then `npm run build` → success.

### Task 3: Clean App.jsx dead state + remove "use client"
**Files (modify):**
- `src/App.jsx:40` — remove `const [isDark, setIsDark] = useState(true);` and `useState` import.
- `src/App.jsx:102` — call `<EditorialHeroSection />`; remove the `isDark`/`setIsDark` props.
- `src/ui/sections/5-EditorialHero/EditorialHeroSection.jsx` — remove the `isDark`/`setIsDark` props from the signature and delete any branches keyed on them (keep the dark branch only).
- `src/ui/common/SplashCursor.jsx:1`, `src/ui/common/parallax-floating.tsx:1`, `src/ui/sections/2-Results/ImageStreamHero.jsx:1` — delete `"use client"` lines.

**Verify:** `npm run build` passes; dev-server visual scroll unchanged.

### Task 4: Normalize folder structure (renames only)
Rename to flat, order-matched names reflecting actual render order in App.jsx:

```
src/ui/sections/
  Hero/Hero.jsx                 → keep
  ProofMarquee/…                → keep
  ProblemSolution/              ← was 3-ProblemSolution
  WhatWeDo/, HowItWorks/, CaseStudies/, WhyGetVeevz/   → keep
  Pricing/                      ← was 9-Pricing
  FAQ/, FinalCTA/               → keep
  ReelCorridor/                 ← was 2-Results (ImageStreamHero + ResultCard + StatsCounter)
  ParallaxGallery/              ← was ParallaxFloating
  EditorialStatement/           ← was 5-EditorialHero
```

**Steps:**
1. `git mv` each directory; update the ~6 import sites in `App.jsx`.
2. Move `parallax-floating.tsx` content into `ParallaxGallery/` next to its section wrapper (or inline the wrapper if trivially thin); delete the common copy.
3. Update remaining importers (`use-mouse-position-ref.ts` stays in hooks).
4. `grep -rn "2-Results\|9-Pricing\|5-EditorialHero\|3-ProblemSolution\|common/parallax-floating" src` → zero hits.
5. `npm run build` → success.

### Task 5: Add typecheck + lint gates
**Steps:**
1. Add script `"typecheck": "tsc --noEmit"` to package.json (fix any errors surfaced in the `.ts/.tsx` files first — they've never been checked).
2. Add `"lint": "eslint src"` with a minimal flat ESLint config (react-hooks + react-refresh plugins) and fix auto-fixable issues.
3. Wire both into build: `"build": "tsc --noEmit && vite build"`. Note: `tsc` will flag `.jsx` files only loosely — acceptable scope for now; full TS migration is out of scope.
4. Commit.

### Task 6: Code-split heavy libs (bundle size)
**Steps:**
1. In `vite.config.js` add:
```js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        three: ["three"],
        gsap: ["gsap", "@gsap/react"],
        motion: ["motion"],
      },
    },
  },
},
```
2. Lazy-load below-the-fold showpieces in App.jsx:
```js
const ResultsStreamSection = lazy(() => import("./ui/sections/ReelCorridor/ImageStreamHero.jsx"));
const ParallaxFloatingSection = lazy(() => import("./ui/sections/ParallaxGallery/ParallaxFloatingSection.jsx"));
```
wrapped in `<Suspense fallback={null}>`.
3. `npm run build` → verify main chunk drops well under 500 KB and total gzip improves.
4. Visual smoke-test on `npm run preview` (lazy chunks must still mount when scrolled into view).

---

## Verification checklist (final)
- [ ] `npm run build` green, main chunk < 500 KB
- [ ] `npm run typecheck` and `npm run lint` green
- [ ] Full-page dev-server scroll identical to before (all 13 rendered sections present)
- [ ] `git status` shows only intended deletions/renames; theme untouched
