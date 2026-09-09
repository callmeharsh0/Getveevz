"use client";

import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Flame,
  Users,
} from "lucide-react";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

const exampleImages = [
  {
    url: "https://cdn.21st.dev/assets/mirror/52/52b151d355aa4cb6cb37f97fbd8ec4220186496e0e2cb63975a2b7756f3430ff.jpg",
    title: "Viral Hook Frame",
    tag: "4.2M Views",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/63/63536c1429b0897bad2245e153f83b4cd5edb05295ced36f5abd5c42639b6f.jpg",
    title: "Color Grade & Hooks",
    tag: "+412% Reach",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/e4/e4889c24cd905daec03b7e1e1b80272a5dc257bdde184b6ab490880302638213.jpg",
    title: "Audience Retention",
    tag: "1.8M Plays",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/ef/ef4b3850e919b354ceae8e2ee350f0ba264ee59636ac3dad6413c062baa18584.jpg",
    title: "Motion Waveform",
    tag: "92% Watch Time",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/0c/0cf551640ccf256e3b0ca6a86d1e35097ef7dadb74db3424380647192a30170d.jpg",
    title: "Podcast Ingestion",
    tag: "14 Clips Cut",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/b8/b830e628d8435311cd2a2b055311f44c25684f94c2f7ee06c187f1e3ca24c37d.jpg",
    title: "Creator Placement",
    tag: "SaaS Keynote",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/f6/f6c549ea344a0680070bb5afa17dadb44ad3108cf18d1ff2743881741fe8dba5.jpg",
    title: "Syndication Drop",
    tag: "45 Channels",
  },
  {
    url: "https://cdn.21st.dev/assets/mirror/de/de33e61d893c390086271e3ff0dbfbe8d6f5684f85909b0cda563ce3b3fcaa27.jpg",
    title: "Keynote Cutdown",
    tag: "850K Likes",
  },
];

export function ParallaxFloatingDemo() {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate("img", { opacity: [0, 1], scale: [0.94, 1] }, { duration: 0.6, delay: stagger(0.12) });
  }, [animate]);

  const scrollToCTA = () => {
    const cta = document.getElementById("cta") || document.querySelector("footer");
    if (cta) {
      cta.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      ref={scope}
      className="relative flex w-full min-h-[780px] sm:min-h-[860px] md:min-h-[940px] lg:min-h-[1000px] justify-center items-center overflow-hidden bg-[#02122F] text-moonlight select-none border-b border-border/40"
    >
      {/* Ambient background depth & glow matching Hero and site theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[600px] bg-frost/10 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-emerald-500/5 blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_15%,#02122F_100%)] z-10"
      />

      {/* ========================================================================= */}
      {/* CENTER FOREGROUND CONTENT: RESULTS HEADLINE, METRICS & CTA                 */}
      {/* ========================================================================= */}
      <div className="relative z-40 max-w-3xl mx-auto px-6 text-center flex flex-col items-center pointer-events-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-border/90 text-[11px] sm:text-xs font-mono uppercase tracking-eyebrow text-frost mb-6 backdrop-blur-xl shadow-xl"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>(02) Verified Results &amp; Distribution Scale</span>
        </motion.div>

        {/* Big Display Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-moonlight leading-[1.05]"
        >
          42.8M Organic Views.
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-frost via-white to-emerald-300 mt-1">
            Engineered at Scale.
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 text-sm sm:text-base md:text-[17px] text-muted max-w-xl mx-auto font-normal leading-relaxed"
        >
          We turn raw 2-hour podcasts, interviews, and keynotes into high-retention short clips — distributed across a synchronized 40+ account network to generate compounding authority.
        </motion.p>

        {/* Mini Performance Grid / KPI Chips */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-xl"
        >
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/70 border border-border/80 backdrop-blur-md text-xs sm:text-sm">
            <Flame className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-moonlight font-display text-sm sm:text-base">380+</span>
            <span className="text-muted text-[11px] sm:text-xs">Viral Clips Produced</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/70 border border-border/80 backdrop-blur-md text-xs sm:text-sm">
            <TrendingUp className="w-4 h-4 text-frost" />
            <span className="font-semibold text-moonlight font-display text-sm sm:text-base">84.2%</span>
            <span className="text-muted text-[11px] sm:text-xs">Avg. Hook Retention</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface/70 border border-border/80 backdrop-blur-md text-xs sm:text-sm">
            <Users className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-moonlight font-display text-sm sm:text-base">45+</span>
            <span className="text-muted text-[11px] sm:text-xs">Active Syndication Channels</span>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex items-center gap-4"
        >
          <button
            onClick={scrollToCTA}
            className="inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-xs sm:text-sm font-medium tracking-wide uppercase bg-moonlight text-oxford hover:bg-white hover:shadow-[0_0_30px_rgba(240,236,221,0.4)] transition-all duration-300 active:scale-95 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-oxford" />
            <span>Book a Distribution Call</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3D PARALLAX FLOATING BACKGROUND IMAGES WITH PERFORMANCE TAGS               */}
      {/* ========================================================================= */}
      <Floating sensitivity={-0.8} easingFactor={0.04} className="overflow-hidden pointer-events-none z-20">
        {/* Floating Image 1 (Depth 0.5) - Top Left */}
        <FloatingElement depth={0.5} className="top-[6%] left-[4%] md:left-[8%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              alt={exampleImages[0].title}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-emerald-300 font-semibold tracking-wide shadow-lg">
              {exampleImages[0].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 2 (Depth 1.0) - Top Left-Center */}
        <FloatingElement depth={1.0} className="top-[5%] left-[26%] md:left-[29%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[1].url}
              alt={exampleImages[1].title}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[1].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 3 (Depth 2.0) — Tall Vertical Reel Frame Top-Right */}
        <FloatingElement depth={2.0} className="top-[3%] right-[22%] md:right-[25%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[2].url}
              alt={exampleImages[2].title}
              className="w-28 h-40 sm:w-32 sm:h-48 md:w-36 md:h-56 lg:w-40 lg:h-60 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-emerald-300 font-semibold tracking-wide shadow-lg">
              {exampleImages[2].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 4 (Depth 1.0) - Far Top Right */}
        <FloatingElement depth={1.0} className="top-[6%] right-[3%] md:right-[6%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[3].url}
              alt={exampleImages[3].title}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[3].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 5 (Depth 1.0) - Middle Left */}
        <FloatingElement depth={1.0} className="top-[38%] left-[2%] md:left-[4%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              alt={exampleImages[4].title}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-emerald-300 font-semibold tracking-wide shadow-lg">
              {exampleImages[4].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 6 (Depth 2.0) - Middle/Bottom Right */}
        <FloatingElement depth={2.0} className="top-[54%] right-[3%] md:right-[5%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[7].url}
              alt={exampleImages[7].title}
              className="w-28 h-36 sm:w-36 sm:h-44 md:w-40 md:h-52 lg:w-48 lg:h-60 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[7].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 7 (Depth 3.5) - Bottom Left Feature Portrait */}
        <FloatingElement depth={3.5} className="top-[68%] left-[7%] md:left-[11%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[5].url}
              alt={exampleImages[5].title}
              className="w-36 sm:w-40 md:w-48 lg:w-52 h-auto aspect-[4/5] object-cover cursor-pointer"
            />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-emerald-300 font-semibold tracking-wide shadow-lg">
              {exampleImages[5].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 8 (Depth 1.0) - Bottom Center/Right */}
        <FloatingElement depth={1.0} className="top-[76%] right-[22%] md:right-[26%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[6].url}
              alt={exampleImages[6].title}
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[6].tag}
            </div>
          </div>
        </FloatingElement>
      </Floating>
    </div>
  );
}
