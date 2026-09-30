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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { GlassButton, GlassCard } from "@/components/ui/glass-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    url: "/assets/cover1.png",
    title: "Maggi Masala Origin Story",
    tag: "24M Views",
  },
  {
    url: "/assets/cover2.png",
    title: "Jio Vs Airtel",
    tag: "4.8M Views",
  },
  {
    url: "/assets/cover3.png",
    title: "He Saved The Whole Company",
    tag: "3.5M Views",
  },
  {
    url: "/assets/cover4.png",
    title: "World War 3",
    tag: "2.6M Views",
  },
  {
    url: "/assets/cover5.png",
    title: "The Comeback",
    tag: "2.4M Views",
  },
  {
    url: "/assets/cover6.png",
    title: "Nikhil Kamath Podcast",
    tag: "1.9M Views",
  },
  {
    url: "/assets/cover7.png",
    title: "Power of BCCI",
    tag: "1.5M Views",
  },
  {
    url: "/assets/cover8.png",
    title: "Power of China",
    tag: "1.2M Views",
  },
];

const mobileResultCards = [
  // 0: Top Left (Cover 1 - 24M Views)
  {
    url: "/assets/cover1.png",
    title: "Maggi Masala Origin Story",
    tag: "24M Views",
  },
  // 1: Top Center (Cover 2 - 4.8M Views)
  {
    url: "/assets/cover2.png",
    title: "Jio Vs Airtel",
    tag: "4.8M Views",
  },
  // 2: Top Right (Cover 3 - 3.5M Views)
  {
    url: "/assets/cover3.png",
    title: "He Saved The Whole Company",
    tag: "3.5M Views",
  },
  // 3: Bottom Left (Cover 4 - 2.6M Views)
  {
    url: "/assets/cover4.png",
    title: "World War 3",
    tag: "2.6M Views",
  },
  // 4: Bottom Center (Cover 5 - 2.4M Views)
  {
    url: "/assets/cover5.png",
    title: "The Comeback",
    tag: "2.4M Views",
  },
  // 5: Bottom Right Front (Cover 6 - 1.9M Views)
  {
    url: "/assets/cover6.png",
    title: "Nikhil Kamath Podcast",
    tag: "1.9M Views",
  },
  // 6: Bottom Right Back (Cover 7 - 1.5M Views)
  {
    url: "/assets/cover7.png",
    title: "Power of BCCI",
    tag: "1.5M Views",
  },
];

export function ParallaxFloatingDemo() {
  const [scope, animate] = useAnimate();
  const mobileStageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    animate("img", { opacity: [0, 1], scale: [0.94, 1] }, { duration: 0.6, delay: stagger(0.12) });
  }, [animate]);

  // Mobile Parallax via GSAP ScrollTrigger (Subtle transform: translate3d movement)
  useEffect(() => {
    if (!mobileStageRef.current || typeof window === "undefined" || window.innerWidth >= 768) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Top Left Card (Card 0)
      if (cardRefs.current[0]) {
        gsap.to(cardRefs.current[0], {
          y: -14,
          x: 4,
          rotation: -12,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      // Top Center Card (Card 1)
      if (cardRefs.current[1]) {
        gsap.to(cardRefs.current[1], {
          y: -16,
          x: -3,
          rotation: 1,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      // Top Right Card (Card 2)
      if (cardRefs.current[2]) {
        gsap.to(cardRefs.current[2], {
          y: -12,
          x: -4,
          rotation: 10,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      // Bottom Left Card (Card 3)
      if (cardRefs.current[3]) {
        gsap.to(cardRefs.current[3], {
          y: 14,
          x: 5,
          rotation: -9,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      // Bottom Center Card (Card 4)
      if (cardRefs.current[4]) {
        gsap.to(cardRefs.current[4], {
          y: 16,
          x: -4,
          rotation: -1,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      // Bottom Right Back Card (Card 5)
      if (cardRefs.current[5]) {
        gsap.to(cardRefs.current[5], {
          y: 10,
          x: -3,
          rotation: 6,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
      // Bottom Right Front Card (Card 6)
      if (cardRefs.current[6]) {
        gsap.to(cardRefs.current[6], {
          y: 18,
          x: -5,
          rotation: 8,
          ease: "none",
          scrollTrigger: {
            trigger: mobileStageRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, mobileStageRef);

    return () => ctx.revert();
  }, []);

  const scrollToCTA = () => {
    const cta = document.getElementById("cta") || document.querySelector("footer");
    if (cta) {
      cta.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE-ONLY RESULTS STAGE (EXACTLY MATCHING ATTACHED REFERENCE SPEC)       */}
      {/* ========================================================================= */}
      <div
        ref={mobileStageRef}
        className="results-mobile-stage flex md:hidden relative w-full max-w-[430px] mx-auto overflow-hidden px-3 xs:px-4 pt-4 xs:pt-5 pb-8 flex-col items-center select-none bg-[#090e14] text-moonlight"
      >
        {/* Ambient background depth & glow matching Desktop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] xs:w-[400px] h-[340px] bg-frost/10 blur-[130px] rounded-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/4 right-1/4 w-[220px] h-[220px] bg-steel/15 blur-[110px] rounded-full"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_15%,#090e14_100%)] z-0"
        />

        {/* TOP FLOATING CARDS CLUSTER */}
        <div className="relative w-full h-[128px] xs:h-[142px] sm:h-[150px] shrink-0 pointer-events-auto z-10">
          {/* Top Left Card (Maggi Masala Origin Story - 24M Views) */}
          <div
            ref={(el) => { cardRefs.current[0] = el; }}
            className="absolute top-[8px] left-[2px] xs:left-[6px] sm:left-[10px] w-[86px] xs:w-[96px] sm:w-[104px] h-[108px] xs:h-[118px] sm:h-[128px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden -rotate-[9deg] z-10 will-change-transform"
          >
            <img
              src={mobileResultCards[0].url}
              alt={mobileResultCards[0].title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[8px] xs:text-[9px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[0].tag}
            </div>
          </div>

          {/* Top Center Card (Jio Vs Airtel - 4.8M Views) */}
          <div
            ref={(el) => { cardRefs.current[1] = el; }}
            className="absolute top-[0px] left-1/2 -translate-x-1/2 w-[82px] xs:w-[92px] sm:w-[102px] h-[104px] xs:h-[116px] sm:h-[126px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden -rotate-[1deg] z-10 will-change-transform"
          >
            <img
              src={mobileResultCards[1].url}
              alt={mobileResultCards[1].title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[8px] xs:text-[9px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[1].tag}
            </div>
          </div>

          {/* Top Right Card (Teal Suit / Rupay Ka - 3.5M Views) */}
          <div
            ref={(el) => { cardRefs.current[2] = el; }}
            className="absolute top-[6px] right-[2px] xs:right-[6px] sm:right-[10px] w-[86px] xs:w-[96px] sm:w-[104px] h-[108px] xs:h-[120px] sm:h-[130px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden rotate-[8deg] z-10 will-change-transform"
          >
            <img
              src={mobileResultCards[2].url}
              alt={mobileResultCards[2].title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[8px] xs:text-[9px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[2].tag}
            </div>
          </div>
        </div>

        {/* SECTION LABEL BADGE MATCHING DESKTOP */}
        <div className="relative z-10 mt-2.5 xs:mt-3 flex items-center justify-center w-full px-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface/90 border border-border/90 text-[7.5px] xs:text-[8.5px] font-mono uppercase tracking-[0.14em] text-frost backdrop-blur-xl shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-frost animate-pulse shrink-0" />
            <span className="whitespace-nowrap">(02) Verified Results &amp; Distribution Scale</span>
          </div>
        </div>

        {/* MAIN DISPLAY HEADING MATCHING DESKTOP TYPOGRAPHY */}
        <h2 className="relative z-10 font-display font-medium text-[clamp(32px,10vw,48px)] leading-[1.08] tracking-tight text-moonlight text-center mt-3.5 xs:mt-4">
          <span className="block">1.5M+</span>
          <span className="block">Followers Gained</span>
        </h2>

        {/* STATISTIC METRIC CARDS MATCHING DESKTOP BLOCK STYLE */}
        <div className="relative z-10 mt-3 xs:mt-3.5 grid grid-cols-3 gap-1 xs:gap-1.5 w-full max-w-[270px] xs:max-w-[290px] px-0.5">
          {/* Stat 1 */}
          <GlassCard className="py-1.5 px-1 xs:py-2 xs:px-1.5 rounded-lg">
            <span className="font-display text-[14px] xs:text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={1} suffix="B+" />
            </span>
            <span className="mt-0.5 text-[6.5px] xs:text-[7px] text-muted font-medium uppercase tracking-wider text-center leading-tight">
              Views Generated
            </span>
          </GlassCard>

          {/* Stat 2 */}
          <GlassCard className="py-1.5 px-1 xs:py-2 xs:px-1.5 rounded-lg">
            <span className="font-display text-[14px] xs:text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={250} suffix="+" />
            </span>
            <span className="mt-0.5 text-[6.5px] xs:text-[7px] text-muted font-medium uppercase tracking-wider text-center leading-tight">
              Active Pages
            </span>
          </GlassCard>

          {/* Stat 3 */}
          <GlassCard className="py-1.5 px-1 xs:py-2 xs:px-1.5 rounded-lg">
            <span className="font-display text-[14px] xs:text-[16px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={200} suffix="+" />
            </span>
            <span className="mt-0.5 text-[6.5px] xs:text-[7px] text-muted font-medium uppercase tracking-wider text-center leading-tight">
              Editors Trained
            </span>
          </GlassCard>
        </div>

        {/* CTA BUTTON */}
        <div className="relative z-20 mt-5 xs:mt-6 sm:mt-7 flex items-center justify-center w-full px-1">
          <GlassButton
            size="default"
            onClick={scrollToCTA}
            contentClassName="flex items-center gap-2 xs:gap-2.5 text-[11px] xs:text-xs sm:text-sm tracking-wide uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-frost opacity-90 shrink-0" />
            <span className="whitespace-nowrap">Book a Distribution Call</span>
            <ArrowUpRight className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-frost shrink-0" />
          </GlassButton>
        </div>

        {/* BOTTOM FLOATING CARDS CLUSTER */}
        <div className="relative w-full h-[150px] xs:h-[162px] sm:h-[172px] shrink-0 mt-4 xs:mt-5 sm:mt-6 pointer-events-auto z-10">
          {/* Bottom Left Card (Nikhil Kamath Podcast - 1.0M Views) */}
          <div
            ref={(el) => { cardRefs.current[3] = el; }}
            className="absolute top-[10px] left-[2px] xs:left-[6px] sm:left-[10px] w-[86px] xs:w-[96px] sm:w-[104px] h-[108px] xs:h-[120px] sm:h-[130px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden -rotate-[8deg] z-10 will-change-transform"
          >
            <img
              src={mobileResultCards[3].url}
              alt={mobileResultCards[3].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[8px] xs:text-[9px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[3].tag}
            </div>
          </div>

          {/* Bottom Center Card (The Comeback / Laughing Guy - 2.4M Views) */}
          <div
            ref={(el) => { cardRefs.current[4] = el; }}
            className="absolute top-[22px] xs:top-[26px] left-[39%] -translate-x-[20%] w-[82px] xs:w-[92px] sm:w-[100px] h-[104px] xs:h-[116px] sm:h-[126px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden -rotate-[3deg] z-10 will-change-transform"
          >
            <img
              src={mobileResultCards[4].url}
              alt={mobileResultCards[4].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[8px] xs:text-[9px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[4].tag}
            </div>
          </div>

          {/* Bottom Right Back Card (Power of China / Mic Guy - 1.5M Views) */}
          <div
            ref={(el) => { cardRefs.current[5] = el; }}
            className="absolute top-[0px] right-[10px] xs:right-[16px] sm:right-[20px] w-[76px] xs:w-[84px] sm:w-[92px] h-[96px] xs:h-[104px] sm:h-[114px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden rotate-[4deg] z-0 will-change-transform"
          >
            <img
              src={mobileResultCards[6].url}
              alt={mobileResultCards[6].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[7.5px] xs:text-[8.5px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[6].tag}
            </div>
          </div>

          {/* Bottom Right Front Card (Power of BCCI / Allowance Guy - 1.9M Views) */}
          <div
            ref={(el) => { cardRefs.current[6] = el; }}
            className="absolute top-[38px] xs:top-[44px] sm:top-[48px] right-[2px] xs:right-[6px] sm:right-[10px] w-[86px] xs:w-[96px] sm:w-[104px] h-[108px] xs:h-[120px] sm:h-[130px] rounded-xl xs:rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md overflow-hidden rotate-[6deg] z-10 will-change-transform"
          >
            <img
              src={mobileResultCards[5].url}
              alt={mobileResultCards[5].title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 px-1.5 xs:px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[8px] xs:text-[9px] font-mono text-frost font-semibold tracking-wide shadow-lg whitespace-nowrap">
              {mobileResultCards[5].tag}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP RESULTS SECTION (UNTOUCHED AND IDENTICAL TO ORIGINAL)             */}
      {/* ========================================================================= */}
      <div
        ref={scope}
        className="hidden md:flex relative w-full min-h-[560px] sm:min-h-[680px] md:min-h-[760px] lg:min-h-[800px] pt-16 sm:pt-20 pb-8 sm:pb-10 justify-center items-center overflow-hidden bg-[#090e14] text-moonlight select-none"
      >
      {/* Ambient background depth & glow matching Hero and site theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[600px] bg-frost/10 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[420px] h-[420px] bg-steel/15 blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_15%,#090e14_100%)] z-10"
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
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 border border-border/90 text-[10px] sm:text-[11px] font-mono uppercase tracking-eyebrow text-frost mb-5 backdrop-blur-xl shadow-lg"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-frost animate-pulse" />
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
          1.5M+ Followers Gained
        </motion.h2>

        {/* Metric Cards with Increasing Counter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 sm:mt-7 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-lg"
        >
          <GlassCard className="p-2.5 sm:p-3 rounded-xl">
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={1} suffix="B+" />
            </span>
            <span className="mt-0.5 text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider text-center">
              Views Generated
            </span>
          </GlassCard>

          <GlassCard className="p-2.5 sm:p-3 rounded-xl">
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={250} suffix="+" />
            </span>
            <span className="mt-0.5 text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider text-center">
              Active Pages
            </span>
          </GlassCard>

          <GlassCard className="p-2.5 sm:p-3 rounded-xl">
            <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-moonlight to-frost group-hover:scale-105 transition-transform duration-300">
              <Counter value={200} suffix="+" />
            </span>
            <span className="mt-0.5 text-[10px] sm:text-[11px] text-muted font-medium uppercase tracking-wider text-center">
              Editors Trained
            </span>
          </GlassCard>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 flex items-center gap-4"
        >
          <GlassButton
            size="default"
            onClick={scrollToCTA}
            contentClassName="flex items-center gap-2.5 text-xs sm:text-sm tracking-wide uppercase"
          >
            <Sparkles className="w-4 h-4 text-frost opacity-90" />
            <span>Book a Distribution Call</span>
            <ArrowUpRight className="w-4 h-4 text-frost" />
          </GlassButton>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 3D PARALLAX FLOATING BACKGROUND IMAGES WITH PERFORMANCE TAGS               */}
      {/* ========================================================================= */}
      <Floating sensitivity={-0.8} easingFactor={0.04} className="overflow-hidden pointer-events-none z-20">
        {/* Floating Image 1 (Depth 0.5) - Top Left */}
        <FloatingElement depth={0.5} className="top-[6%] left-[2%] md:left-[8%] hidden md:block">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              alt={exampleImages[0].title}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[0].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 2 (Depth 1.0) - Top Left-Center */}
        <FloatingElement depth={1.0} className="top-[5%] left-[26%] md:left-[29%] hidden md:block">
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
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[2].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 4 (Depth 1.0) - Far Top Right */}
        <FloatingElement depth={1.0} className="top-[6%] right-[2%] md:right-[6%] hidden md:block">
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
        <FloatingElement depth={1.0} className="top-[38%] left-[1%] md:left-[4%] hidden md:block">
          <div className="relative group overflow-hidden rounded-2xl border border-white/20 bg-surface/50 shadow-2xl backdrop-blur-md pointer-events-auto transition-all duration-500 hover:scale-105 hover:border-frost/70 hover:shadow-[0_0_40px_rgba(139,163,197,0.35)]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              alt={exampleImages[4].title}
              className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 object-cover cursor-pointer"
            />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[4].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 6 (Depth 2.0) - Middle/Bottom Right */}
        <FloatingElement depth={2.0} className="top-[54%] right-[1%] md:right-[5%] hidden md:block">
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
            <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-mono text-frost font-semibold tracking-wide shadow-lg">
              {exampleImages[5].tag}
            </div>
          </div>
        </FloatingElement>

        {/* Floating Image 8 (Depth 1.0) - Bottom Center/Right */}
        <FloatingElement depth={1.0} className="top-[76%] right-[20%] md:right-[26%] hidden md:block">
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
    </>
  );
}
