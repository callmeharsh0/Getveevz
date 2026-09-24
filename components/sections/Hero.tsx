"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Menu, X, Play, Pause, Sparkles, Radio, Activity, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassButton } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";
import GlobeMorph from "@/components/ui/GlobeMorph";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PLATFORMS = [
  { id: "all", name: "All Platforms", value: 1000, metric: "+1B Views", counterPrefix: "+", counterSuffix: "B", video: "/assets/distribution.mp4", tag: "All Platforms" },
  { id: "tiktok", name: "TikTok", value: 390, metric: "+390M Views", counterPrefix: "+", counterSuffix: "M", video: "/assets/clipping.mp4", tag: "Algorithm Priority" },
  { id: "reels", name: "IG Reels", value: 260, metric: "+260M Views", counterPrefix: "+", counterSuffix: "M", video: "/assets/agency-video-2.mp4", tag: "High Retention" },
  { id: "shorts", name: "YT Shorts", value: 150, metric: "+150M Views", counterPrefix: "+", counterSuffix: "M", video: "/assets/tracking.mp4", tag: "Search Authority" },
];

const SCATTERED_PLATFORM_LOGOS = [
  {
    id: "tiktok",
    name: "TikTok",
    src: "/assets/logos/tiktok.png",
    pos: "top-[25%] left-[5%] sm:left-[7%] lg:left-[8%]",
    size: "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
    anim: "hero-float-a",
    platformId: "tiktok",
    depth: 18,
  },
  {
    id: "instagram",
    name: "Instagram",
    src: "/assets/logos/instagram.png",
    pos: "top-[60%] left-[4%] sm:left-[5%] lg:left-[6%]",
    size: "w-11 h-11 sm:w-12 sm:h-12 lg:w-13 lg:h-13",
    anim: "hero-float-b",
    platformId: "reels",
    depth: 24,
  },
  {
    id: "shorts",
    name: "YouTube Shorts",
    src: "/assets/logos/youtubeshorts.png",
    pos: "top-[26%] right-[22%] sm:right-[26%] lg:right-[28%]",
    size: "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
    anim: "hero-float-c",
    platformId: "shorts",
    depth: 20,
  },
  {
    id: "youtube",
    name: "YouTube",
    src: "/assets/logos/youtube.png",
    pos: "top-[40%] right-[3%] sm:right-[5%] lg:right-[6%]",
    size: "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14",
    anim: "hero-float-a",
    platformId: "all",
    depth: 14,
  },
  {
    id: "facebook",
    name: "Facebook",
    src: "/assets/logos/facebook.png",
    pos: "bottom-[22%] left-[10%] sm:left-[12%] lg:left-[14%]",
    size: "w-10 h-10 sm:w-11 sm:h-11 lg:w-13 lg:h-13",
    anim: "hero-float-b",
    platformId: "all",
    depth: 16,
  },
];

function HeroStatCounter({
  platformId = "all",
  target = 1000,
  suffix = "M",
  prefix = "+",
  duration = 2.2,
}: {
  platformId?: string;
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const isAll = platformId === "all";
  const [displayValue, setDisplayValue] = useState(isAll ? 800 : 0);
  const [currentSuffix, setCurrentSuffix] = useState(isAll ? "M" : suffix);
  const prevTargetRef = useRef(isAll ? 800 : 0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const startVal = isAll ? 800 : prevTargetRef.current;
    const diff = target - startVal;

    // Small delay on load so user visually catches the counter starting at 800M
    const startDelay = 120;

    const timerId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Smooth easeOutExpo curve
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = startVal + diff * ease;

        if (isAll) {
          const rounded = Math.round(current);
          if (rounded >= 1000) {
            setDisplayValue(1);
            setCurrentSuffix("B");
          } else {
            setDisplayValue(rounded);
            setCurrentSuffix("M");
          }
        } else {
          setDisplayValue(Math.round(current));
          setCurrentSuffix(suffix);
        }

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          if (isAll) {
            setDisplayValue(1);
            setCurrentSuffix("B");
            prevTargetRef.current = 1000;
          } else {
            setDisplayValue(target);
            setCurrentSuffix(suffix);
            prevTargetRef.current = target;
          }
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    }, startDelay);

    return () => {
      clearTimeout(timerId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [target, duration, isAll, suffix]);

  return (
    <span className="tabular-nums inline-block font-display tracking-tight">
      {prefix}
      {displayValue}
      {currentSuffix}
    </span>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const eyebrowsRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLButtonElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

  // Depth & Interactive Layer Refs
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const videoPreviewRef = useRef<HTMLVideoElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("distribution");
  const [activePlatform, setActivePlatform] = useState(PLATFORMS[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);

  // Interactive particle coordinates
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: (i * 37 + 13) % 94 + 3,
        top: (i * 41 + 17) % 80 + 10,
        size: (i % 3) + 1.5,
        opacity: 0.15 + (i % 4) * 0.06,
        color: i % 3 === 0 ? "bg-[#495B7D]/40" : i % 3 === 1 ? "bg-[#02122F]/30" : "bg-[#0038E2]/35",
      })),
    []
  );

  // GSAP Entrance, Interactive Spotlight & Mouse Parallax
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(
        [
          navRef.current,
          eyebrowsRef.current?.querySelectorAll(".eyebrow-item"),
          wordmarkRef.current,
          bottomLeftRef.current,
          bottomRightRef.current,
          cardRightRef.current,
        ],
        { opacity: 1, y: 0, scale: 1 }
      );
      gsap.set(container.querySelectorAll(".floating-scatter-logo"), { opacity: 1, scale: 1, y: 0 });
      return;
    }

    // Hardware-accelerated quickTo mouse spotlight & parallax
    let spotlightX = gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power2.out" });
    let spotlightY = gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update cursor glow beam
      spotlightX(x);
      spotlightY(y);

      // Normalised coordinates (-1 to 1) for 3D tilt
      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

      // 3D Parallax on scattered floating platform logos
      const logoNodes = container.querySelectorAll<HTMLElement>(".floating-scatter-logo");
      logoNodes.forEach((node) => {
        const depth = parseFloat(node.dataset.depth || "16");
        gsap.to(node, {
          x: normX * -depth,
          y: normY * -depth,
          duration: 0.65,
          ease: "power2.out",
        });
      });

      if (cardRightRef.current) {
        gsap.to(cardRightRef.current, {
          x: normX * -26,
          y: normY * -20,
          rotateY: normX * 10,
          rotateX: -normY * 10,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      // Magnetic pull on CTA button
      if (ctaButtonRef.current) {
        const ctaRect = ctaButtonRef.current.getBoundingClientRect();
        const dist = Math.hypot(e.clientX - (ctaRect.left + ctaRect.width / 2), e.clientY - (ctaRect.top + ctaRect.height / 2));
        if (dist < 100) {
          const pullX = (e.clientX - (ctaRect.left + ctaRect.width / 2)) * 0.3;
          const pullY = (e.clientY - (ctaRect.top + ctaRect.height / 2)) * 0.3;
          gsap.to(ctaButtonRef.current, { x: pullX, y: pullY, duration: 0.3, ease: "power2.out" });
        } else {
          gsap.to(ctaButtonRef.current, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
        }
      }
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Initial state
      gsap.set(navRef.current, { opacity: 0, y: -20 });
      if (eyebrowsRef.current) {
        gsap.set(eyebrowsRef.current.querySelectorAll(".eyebrow-item"), { opacity: 0, y: 16 });
      }
      gsap.set(wordmarkRef.current, { opacity: 0, scale: 0.94, y: 20 });
      gsap.set(".floating-scatter-logo", { opacity: 0, scale: 0.6, y: 20 });
      gsap.set(cardRightRef.current, { opacity: 0, scale: 0.8, y: 30 });
      gsap.set([bottomLeftRef.current, bottomRightRef.current], { opacity: 0, y: 24 });

      // Coordinated Staggered Entrance
      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(eyebrowsRef.current?.querySelectorAll(".eyebrow-item") || [], { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, "-=0.35")
        .to(wordmarkRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .to(".floating-scatter-logo", { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.5")
        .to([bottomLeftRef.current, bottomRightRef.current], { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .to(cardRightRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7 }, "-=0.4");

      // Scroll trigger for nav elevation
      if (navRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top+=40 top",
          onEnter: () => navRef.current?.classList.add("nav-scrolled"),
          onLeaveBack: () => navRef.current?.classList.remove("nav-scrolled"),
        });
      }

      container.addEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  // Update active navigation state based on scroll position
  useEffect(() => {
    const navSections = [
      { id: "results", topOffset: 0 },
      { id: "distribution", topOffset: 0 },
      { id: "about", topOffset: 0 },
      { id: "pricing", topOffset: 0 },
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (let i = navSections.length - 1; i >= 0; i--) {
        const el = document.getElementById(navSections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(navSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection =
      document.getElementById("results") ||
      document.getElementById("distribution") ||
      document.querySelector("section:nth-of-type(2)");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" });
    }
  };

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    if (id === "services") {
      navigate("/services");
      return;
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleVideoPlayback = () => {
    if (!videoPreviewRef.current) return;
    if (isVideoPlaying) {
      videoPreviewRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoPreviewRef.current.play().catch(() => { });
      setIsVideoPlaying(true);
    }
  };

  const letters = ["G", "e", "t", "V", "e", "e", "v", "z"];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col justify-between px-4 sm:px-8 md:px-12 lg:px-16 pt-5 pb-8 md:pb-14 bg-[#F3EFEA] text-[#111111] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 0. INTERACTIVE MOUSE-FOLLOWING LIGHT BEAM & DEPTH MESH                    */}
      {/* ========================================================================= */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-br from-frost/30 via-blue-200/25 to-transparent blur-[120px] will-change-transform z-0"
      />

      {/* 3D Globe Morph Background Layer (Inverted: Dark continents on cream bg) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden opacity-60"
      >
        <GlobeMorph
          hex="#1C3252"
          ocean="#F3EFEA"
          bg="#F3EFEA"
          landOpacity={0.85}
          globeOpacity={0.3}
          density={460}
          className="w-full h-full min-h-full min-w-full bg-transparent"
        />
        {/* Soft edge vignetting to blend seamlessly into cream background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3EFEA] via-transparent to-[#F3EFEA]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#F3EFEA_85%)] pointer-events-none" />
      </div>

      {/* Floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className={cn("absolute rounded-full animate-pulse", p.color)}
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${3 + (p.id % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* SCATTERED FLOATING PLATFORM LOGOS (SCATTERED ACROSS ENTIRE HERO SECTION)  */}
      {/* ========================================================================= */}
      {SCATTERED_PLATFORM_LOGOS.map((logo) => {
        const isCurrent = activePlatform.id === logo.platformId;
        return (
          <button
            key={logo.id}
            type="button"
            data-depth={logo.depth}
            onClick={() => {
              const match = PLATFORMS.find((p) => p.id === logo.platformId);
              if (match) setActivePlatform(match);
            }}
            aria-label={logo.name}
            className={cn(
              "floating-scatter-logo absolute z-20 flex items-center justify-center rounded-2xl bg-white/95 border border-[#111111]/10 backdrop-blur-xl shadow-[0_12px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:border-[#0038E2]/50 hover:scale-120 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto p-2 sm:p-2.5",
              logo.pos,
              logo.size,
              logo.anim,
              isCurrent ? "ring-2 ring-[#0038E2] shadow-[0_0_24px_rgba(0,56,226,0.35)] scale-105" : ""
            )}
          >
            <img
              src={logo.src}
              alt=""
              className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
              loading="eager"
            />
          </button>
        );
      })}

      {/* ========================================================================= */}
      {/* 1. TOP NAVIGATION BAR                                                     */}
      {/* ========================================================================= */}
      <header
        ref={navRef}
        className="relative z-30 w-full flex items-center justify-between pointer-events-none transition-all duration-500 pt-2"
        data-reveal
      >
        {/* Logo Mark (Left) */}
        <a
          href="/"
          className="pointer-events-auto group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-full"
          aria-label="GetVeevz Home"
        >
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full overflow-hidden bg-white border border-[#111111]/10 group-hover:border-[#111111]/30 transition-all duration-300 shadow-sm group-hover:scale-105">
            <img
              src="/assets/Logo.png"
              alt="GetVeevz logo"
              className="w-full h-full object-cover scale-[1.15]"
            />
          </div>
          <span className="hidden sm:inline-block font-display font-medium text-lg tracking-tight text-[#111111] group-hover:text-[#0038E2] transition-colors">
            GetVeevz
          </span>
        </a>

        {/* CTA (Right) */}
        <div ref={ctaButtonRef} className="pointer-events-auto flex items-center gap-3">
          <GlassButton
            size="sm"
            className="hidden sm:inline-flex glass-button-dark"
            onClick={() => {
              const cta = document.getElementById("cta") || document.querySelector("footer");
              if (cta) cta.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-frost opacity-85" />
            <span>Book a Strategy Call</span>
          </GlassButton>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#111111]/15 text-[#111111] hover:text-[#0038E2] focus:outline-none focus:ring-2 focus:ring-[#0038E2]"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-2xl bg-moonlight text-oxford border border-moonlight/60 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-oxford/10">
              <span className="text-xs font-mono uppercase tracking-eyebrow text-oxford/60">
                Navigation
              </span>
              <div className="flex items-center gap-2 text-xs text-oxford font-medium">
                <span className="w-2 h-2 rounded-full bg-frost inline-block animate-ping" />
                <span>Engine Active</span>
              </div>
            </div>
            <nav className="flex flex-col gap-1.5">
              {[
                { id: "distribution", label: "Distribution" },
                { id: "results", label: "Results" },
                { id: "pricing", label: "Pricing" },
                { id: "services", label: "Services" },
                { id: "about", label: "About" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleNavClick(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    "text-left px-3 py-2.5 rounded-lg text-sm transition-colors cursor-pointer",
                    activeNav === item.id
                      ? "bg-oxford text-moonlight font-medium"
                      : "text-oxford hover:bg-oxford/10"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <GlassButton
              size="default"
              className="w-full mt-2 glass-button-dark"
              onClick={() => {
                setMobileMenuOpen(false);
                const cta = document.getElementById("cta") || document.querySelector("footer");
                if (cta) cta.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book a Strategy Call
            </GlassButton>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 2. EYEBROW LABELS (BASELINE ALIGNED WITH INTERACTIVE PLATFORM SWITCHER)   */}
      {/* ========================================================================= */}
      <div
        ref={eyebrowsRef}
        className="w-full mt-8 sm:mt-14 md:mt-16 pt-2 flex flex-col md:flex-row md:items-baseline justify-between gap-3 pb-2 z-10"
        data-reveal
      >
        {/* Left Eyebrows */}
        <div className="flex flex-wrap items-baseline gap-3 sm:gap-8">

          <span className="eyebrow-item text-[11px] sm:text-xs tracking-eyebrow uppercase font-medium text-[#495B7D] flex items-center gap-2">
            <span className="text-[#0038E2] font-mono text-[10px] sm:text-xs font-semibold">(01)</span>
            Distribution Engine
          </span>
        </div>

        {/* Right Eyebrow: Interactive Platform Selector */}
        <div className="eyebrow-item flex items-center gap-2 md:justify-end">
          <div className="inline-flex p-0.5 sm:p-1 rounded-full bg-white/85 border border-[#111111]/10 backdrop-blur-md shadow-sm max-w-full flex-wrap">
            {PLATFORMS.map((p) => {
              const isCurrent = activePlatform.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p)}
                  className={cn(
                    "px-1.5 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] font-mono rounded-full transition-all duration-200",
                    isCurrent
                      ? "bg-[#111111] text-white font-semibold shadow-sm scale-105"
                      : "text-[#555555] hover:text-[#111111] hover:bg-black/5"
                  )}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTER DISPLAY WORDMARK + FLOATING INTERACTIVE 3D VIDEO CARDS          */}
      {/* ========================================================================= */}
      <div
        ref={wordmarkRef}
        className="relative my-auto py-8 sm:py-14 md:py-20 flex flex-col items-center justify-center text-center overflow-visible z-10"
        data-reveal
      >
        {/* Main Central Interactive Wordmark */}
        <div className="relative inline-flex items-baseline justify-center group cursor-default">
          <h1
            className="font-display font-medium text-[clamp(3.85rem,15.5vw,14.2rem)] leading-[0.88] tracking-[-0.04em] text-[#111111] select-none transition-all duration-300 flex"
            style={{
              fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
              textShadow: "0 2px 24px rgba(0, 0, 0, 0.08)",
            }}
          >
            {letters.map((char, index) => (
              <span
                key={index}
                onMouseEnter={() => setHoveredLetter(index)}
                onMouseLeave={() => setHoveredLetter(null)}
                className={cn(
                  "inline-block transition-transform duration-300 ease-out will-change-transform",
                  hoveredLetter === index
                    ? "scale-110 -translate-y-2 text-[#0038E2] drop-shadow-[0_0_24px_rgba(0,56,226,0.3)]"
                    : hoveredLetter === index - 1 || hoveredLetter === index + 1
                      ? "scale-105 -translate-y-1 text-[#495B7D]"
                      : ""
                )}
              >
                {char}
              </span>
            ))}
          </h1>

          {/* Trademark/Engine Glyph with interactive spin */}
          <div
            onClick={() => {
              const currentIdx = PLATFORMS.findIndex((p) => p.id === activePlatform.id);
              setActivePlatform(PLATFORMS[(currentIdx + 1) % PLATFORMS.length]);
            }}
            className="hidden sm:flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#111111]/20 text-[10px] md:text-xs font-mono text-[#555555] ml-2 md:ml-3 self-end mb-3 md:mb-5 hover:scale-110 hover:border-[#111111] hover:text-[#111111] hover:bg-white hover:rotate-180 transition-all duration-500 cursor-pointer shadow-sm active:scale-95"
            title="Click to cycle distribution engine mode"
          >
            ©
          </div>
        </div>

        {/* Supporting Headline directly below GetVeevz */}
        <h2 className="font-display font-normal text-base sm:text-xl md:text-2xl text-[#111111] leading-[1.3] max-w-xl mx-auto mt-4 sm:mt-6 tracking-tight text-center">
          We cut short form clip from long form content and post across social media platforms
        </h2>

        {/* Floating Interactive Right Node: Real-Time Video Preview Hologram */}
        <div
          ref={cardRightRef}
          onClick={toggleVideoPlayback}
          className="hidden xl:flex absolute -right-2 -bottom-2 flex-col gap-2.5 p-3 rounded-2xl bg-white/90 border border-[#111111]/10 backdrop-blur-xl shadow-xl transition-all duration-300 hover:scale-105 hover:border-[#111111]/25 w-56 text-left cursor-pointer group pointer-events-auto"
        >
          {/* Micro Video Card Screen */}
          <div className="relative w-full h-28 rounded-xl overflow-hidden bg-black border border-black/10">
            <video
              ref={videoPreviewRef}
              src={activePlatform.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Play/Pause Overlay Indicator */}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-mono text-white flex items-center gap-1 border border-white/20">
              {isVideoPlaying ? <Activity className="w-2.5 h-2.5 animate-spin" /> : <Pause className="w-2.5 h-2.5" />}
              <span>LIVE</span>
            </div>

            {/* Metric pill on video */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] font-bold text-white font-display drop-shadow-md">
                {activePlatform.metric}
              </span>
              <span className="text-[9px] font-mono text-white/90 bg-white/20 backdrop-blur-md px-1.5 py-0.2 rounded border border-white/30">
                {activePlatform.tag}
              </span>
            </div>
          </div>

          {/* Micro Card Label */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5 text-xs text-[#111111] font-medium">
              <Share2 className="w-3.5 h-3.5 text-[#0038E2]" />
              <span>{activePlatform.name} Route</span>
            </div>
            <span className="text-[10px] font-mono text-[#0038E2] font-semibold">98.4% Sync</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM CORNERS (ARROW & TELEMETRY STATS)                               */}
      {/* ========================================================================= */}
      <div className="w-full mt-4 sm:mt-8 md:mt-auto pt-4 sm:pt-6 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-6 items-end z-10">
        {/* BOTTOM LEFT: Circular Interactive Arrow Button */}
        <div
          ref={bottomLeftRef}
          className="md:col-span-6 lg:col-span-5 flex flex-col items-start gap-4"
          data-reveal
        >
          {/* Circular Interactive Magnetic Arrow Button (Scroll/Next Cue) */}
          <button
            ref={arrowRef}
            onClick={scrollToNext}
            aria-label="Scroll to learn more about GetVeevz"
            className="group relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#111111]/15 bg-white hover:bg-[#111111] hover:text-white backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] cursor-pointer active:scale-95"
          >
            <ArrowRight className="w-6 h-6 text-[#111111] group-hover:rotate-45 group-hover:text-white transition-all duration-300 ease-out" />
            <span className="sr-only">Scroll down</span>
            <span className="absolute inset-0 rounded-full border border-[#111111]/0 group-hover:border-[#111111]/30 transition-colors pointer-events-none" />
          </button>
        </div>

        {/* BOTTOM RIGHT: Big Stat Number */}
        <div
          ref={bottomRightRef}
          className="md:col-span-6 lg:col-span-7 flex flex-col md:items-end justify-end"
          data-reveal
        >
          {/* Big Stat Number with interactive active platform binding & increasing counter animation */}
          <div className="flex items-baseline gap-1.5 cursor-default group">
            <span className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] group-hover:text-[#0038E2] transition-colors">
              <HeroStatCounter
                platformId={activePlatform.id}
                target={activePlatform.value}
                prefix={activePlatform.counterPrefix ?? ""}
                suffix={activePlatform.counterSuffix || "M"}
              />
            </span>
            <span className="text-xs sm:text-sm font-mono text-[#495B7D] uppercase tracking-wider">
              {activePlatform.metric.split(" ")[1] || "Views"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
