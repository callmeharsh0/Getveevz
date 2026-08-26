# GetVeevz Website Skeleton

Next.js 14 + Tailwind + shadcn-compatible skeleton, built section-by-section
to match the client brief exactly (Hero → Proof → Problem → What We Do →
How It Works → Case Studies → Why Us → FAQ → Final CTA).

## Setup

```bash
npm install
npm run dev
```

## How to pull in 21st.dev components

This skeleton already has the two files every 21st.dev / shadcn component
expects to exist, so pasted components work with zero edits:

- `lib/utils.ts` → the `cn()` helper
- `tailwind.config.ts` → the `accent`, `surface`, `border`, `muted` color
  tokens referenced by most components

**Workflow:**
1. Go to https://21st.dev, find a component (logo marquee, bento grid,
   testimonial carousel, accordion, etc.)
2. Copy the component code it gives you
3. Paste it into `components/ui/` (or a new file under `components/sections/`
   if it's a full section block)
4. If it imports a Radix primitive you don't have yet, `npm install` that
   package — the component's own code block will tell you which one
5. Replace the placeholder markup in the matching section file
   (`components/sections/*.tsx`) with the pasted component, keeping the
   existing copy/data props

Every section file has a `// SWAP TARGET` comment marking exactly where
to drop the replacement in.

## Content & data

All copy that depends on client approval (logos, case study numbers,
pricing, onboarding timeline) lives in `lib/data.ts`, flagged with
`PLACEHOLDER`. Don't ship any of those without sign-off — see brief §6
("Needs confirmation").

## Animation

- `components/layout/SmoothScroll.tsx` — Lenis, wraps the whole app
- `lib/useScrollReveal.ts` — GSAP ScrollTrigger hook; any element with
  `data-reveal` inside a section using this hook fades up on scroll
- Respects `prefers-reduced-motion` (see `app/globals.css`)

## Next steps

- [ ] Swap placeholder fonts (Inter/Space Grotesk) for confirmed brand type
- [ ] Swap `accent` hex in `tailwind.config.ts` for confirmed brand color
- [ ] Replace Hero visual placeholder once approved asset exists
- [ ] Populate `proofLogos` and `caseStudies` in `lib/data.ts` after approval
- [ ] Wire "Book a Strategy Call" buttons to Calendly/Cal.com embed
- [ ] Add analytics (PostHog/GA4) with scroll-depth + CTA click tracking
