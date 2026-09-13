"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate, useInView } from "motion/react";
import {
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Flame,
  Users,
  Layers,
} from "lucide-react";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easeProgress * value;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toLocaleString()}
      {suffix}
    </span>
  );
}

const exampleImages = [
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.17.31 PM.jpeg",
    title: "Maggi Masala Origin Story",
    tag: "24M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8..jpeg",
    title: "Jio Vs Airtel",
    tag: "4.8M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.47.35 PM.jpeg",
    title: "He Saved The Whole Company",
    tag: "2.5M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.50.10 PM.jpeg",
    title: "World War 3",
    tag: "2.6M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.47.36 PM.jpeg",
    title: "The Comeback",
    tag: "2.4M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.18.16 PM.jpeg",
    title: "Nikhil Kamath Podcast",
    tag: "1.0M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.17.29M.jpeg",
    title: "Power of BCCI",
    tag: "1.9M Views",
  },
  {
    url: "/assets/WhatsApp Image 2026-09-12 at 8.47.35 PM (1).jpeg",
    title: "Power of China",
    tag: "1.5M Views",
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
      className="relative flex w-full min-h-[600px] sm:min-h-[780px] md:min-h-[940px] lg:min-h-[1000px] justify-center items-center overflow-hidden bg-[#000000] text-moonlight select-none border-b border-border/40"
    >
      {/* Ambient background depth & glow matching Hero and site theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[600px] bg-frost/10 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-[#177DFD]/5 blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_15%,#000000_100%)] z-10"
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
          <span className="w-2 h-2 rounded-full bg-[#177DFD] animate-pulse" />
          <span>(02) Verified Results &amp; Distribution Scale</span>
        </motion.div>

        {/* Big Display Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-moonlight leading-[1.08]"
        >
          Built to Distribute Content
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-frost via-white to-[#177DFD] mt-1">
            and Scale.
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
          We turn raw podcasts, keynotes, and interviews into high-retention short clips — engineered with algorithmic precision to generate compounding reach across every platform.
        </motion.p>

        {/* Metric Cards with Increasing Counter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl"
        >
          <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-border/90 backdrop-blur-xl shadow-xl hover:border-frost/60 transition-all duration-300 group">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={42.8} decimals={1} suffix="M+" />
            </span>
            <span className="mt-1 text-[11px] sm:text-xs text-muted font-medium uppercase tracking-wider text-center">
              Organic Views
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-border/90 backdrop-blur-xl shadow-xl hover:border-frost/60 transition-all duration-300 group">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#177DFD] to-[#177DFD] group-hover:scale-105 transition-transform duration-300">
              <Counter value={380} suffix="+" />
            </span>
            <span className="mt-1 text-[11px] sm:text-xs text-muted font-medium uppercase tracking-wider text-center">
              Clips Produced
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-border/90 backdrop-blur-xl shadow-xl hover:border-frost/60 transition-all duration-300 group">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={84.2} decimals={1} suffix="%" />
            </span>
            <span className="mt-1 text-[11px] sm:text-xs text-muted font-medium uppercase tracking-wider text-center">
              Hook Retention
            </span>
          </div>

          <div className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl bg-surface/80 border border-border/90 backdrop-blur-xl shadow-xl hover:border-frost/60 transition-all duration-300 group">
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#177DFD] to-[#177DFD] group-hover:scale-105 transition-transform duration-300">
              <Counter value={45} suffix="+" />
            </span>
            <span className="mt-1 text-[11px] sm:text-xs text-muted font-medium uppercase tracking-wider text-center">
              Channels
            </span>
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
        <FloatingElement depth={0.5} className="top-[6%] left-[2%] md:left-[8%]">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              alt={exampleImages[0].title}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-[#177DFD] font-semibold tracking-wide shadow-lg">
              {exampleImages[0].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 2 (Depth 1.0) - Top Left-Center */}
        <FloatingElement depth={1.0} className="top-[5%] left-[26%] md:left-[29%] hidden sm:block">
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
        <FloatingElement depth={2.0} className="top-[3%] right-[22%] md:right-[25%] hidden md:block">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[2].url}
              alt={exampleImages[2].title}
              className="w-28 h-40 sm:w-32 sm:h-48 md:w-36 md:h-56 lg:w-40 lg:h-60 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-[#177DFD] font-semibold tracking-wide shadow-lg">
              {exampleImages[2].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 4 (Depth 1.0) - Far Top Right */}
        <FloatingElement depth={1.0} className="top-[6%] right-[2%] md:right-[6%]">
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
        <FloatingElement depth={1.0} className="top-[38%] left-[1%] md:left-[4%] hidden sm:block">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              alt={exampleImages[4].title}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-[#177DFD] font-semibold tracking-wide shadow-lg">
              {exampleImages[4].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 6 (Depth 2.0) - Middle/Bottom Right */}
        <FloatingElement depth={2.0} className="top-[54%] right-[1%] md:right-[5%] hidden sm:block">
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
        <FloatingElement depth={3.5} className="top-[68%] left-[4%] md:left-[11%] hidden md:block">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[5].url}
              alt={exampleImages[5].title}
              className="w-36 sm:w-40 md:w-48 lg:w-52 h-auto aspect-[4/5] object-cover cursor-pointer"
            />
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-[#177DFD] font-semibold tracking-wide shadow-lg">
              {exampleImages[5].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 8 (Depth 1.0) - Bottom Center/Right */}
        <FloatingElement depth={1.0} className="top-[76%] right-[20%] md:right-[26%] hidden sm:block">
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
