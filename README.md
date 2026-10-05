# GetVeevz — Short-Form Video Distribution Platform

Official high-performance web platform for **GetVeevz** — turning long-form podcasts, interviews, and keynotes into a compounding short-form distribution engine across TikTok, Instagram Reels, and YouTube Shorts.

---

## Tech Stack

- **Framework & Bundler:** [Vite](https://vitejs.dev/) with React 18 & TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + PostCSS + Autoprefixer
- **Animations:** GSAP (ScrollTrigger) & Motion (Framer Motion)
- **3D Visualizations:** Three.js & `globe.gl`
- **Routing:** React Router v7 (`react-router-dom`)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Hosting Target:** [Vercel](https://vercel.com/) (Zero-configuration ready)

---

## ⚡ Deployment to Vercel

This repository is pre-configured with a hardened [`vercel.json`](./vercel.json) ready for 1-click deployment.

### Method 1: Git Repository (Recommended)
1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Go to [Vercel Dashboard](https://vercel.com/new).
3. Import the repository.
4. Vercel will automatically detect the settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**.

### Method 2: Vercel CLI
If deploying directly from your machine:
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 🛠️ Local Development

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```
Spins up a local web server serving the built `dist/` directory.

### 5. Type Checking
```bash
npm run lint
```
Runs `tsc --noEmit` to validate all TypeScript types.

---

## 📂 Project Architecture

```text
getveevz/
├── app/                  # Main page views & client-side routes
│   ├── page.tsx          # Homepage with all key sections
│   ├── routes.tsx        # React Router routes & scroll restoration
│   ├── services/         # Dedicated service breakdown & detail routes
│   ├── privacy/          # Privacy Policy
│   ├── terms/            # Terms & Conditions
│   ├── cookies/          # Cookie Policy
│   └── developer/        # Developer credits / profile
├── components/           # Reusable UI & layout blocks
│   ├── layout/           # UnifiedNav, Footer, Navigation overlays
│   ├── sections/         # Hero, Proof, Problem, Services, Questionnaire, etc.
│   ├── seo/              # HeadSEO meta tags & OpenGraph handlers
│   └── ui/               # Buttons, badges, and shared atoms
├── lib/                  # Utilities, email handlers, and custom hooks
│   ├── email.ts          # Smart client-side email routing (mailto / Gmail compose)
│   ├── useScrollReveal.ts# GSAP ScrollTrigger intersection animations
│   └── utils.ts          # Tailwind class merger (clsx + twMerge)
├── public/               # Static assets, logos, robots.txt, sitemap.xml
├── vercel.json           # Vercel deployment config, SPA rewrites, & security headers
├── vite.config.ts        # Vite build & chunking configuration
├── tailwind.config.ts    # Design system tokens, color palettes, and typography
└── package.json          # Dependencies & lifecycle scripts
```

---

## 🔒 Security & Performance Features

- **Enterprise Security Headers:** Configured in [`vercel.json`](./vercel.json) (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Permissions-Policy`, and strict `Content-Security-Policy`).
- **Zero Exposed Secrets:** Static client-side architecture with zero backend keys or databases exposed to the public.
- **Safe External Links:** All external anchor tags utilize `rel="noopener noreferrer"` to protect against reverse-tabnabbing exploits.
- **Performance Optimized:** Route-based lazy loading (`React.lazy` + `Suspense`) and code splitting ensure lightning-fast first paint times.
- **SEO Ready:** Complete OpenGraph metadata, Twitter cards, semantic HTML5 structure, `robots.txt`, and XML sitemaps.

---

## 📄 License & Client Handover
Delivered for **GetVeevz**. All proprietary assets, brand styling, and media belong to their respective owners.
