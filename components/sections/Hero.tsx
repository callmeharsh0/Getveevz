"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown, Menu, X, Play, Pause, Sparkles, Radio, Activity, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassButton } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";
import { Globe } from "@/components/ui/globe";

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
    pos: "top-[26%] left-[21%] sm:top-[25%] sm:left-[7%] lg:left-[8%]",
    size: "w-[50px] h-[50px] sm:w-[62px] sm:h-[62px] lg:w-[74px] lg:h-[74px]",
    anim: "hero-float-a",
    rotate: "-rotate-6 sm:-rotate-3",
    platformId: "tiktok",
    depth: 18,
  },
  {
    id: "youtube",
    name: "YouTube",
    src: "/assets/logos/youtube.png",
    pos: "top-[27%] right-[16%] sm:top-[40%] sm:right-[5%] lg:right-[6%]",
    size: "w-[50px] h-[50px] sm:w-[62px] sm:h-[62px] lg:w-[74px] lg:h-[74px]",
    anim: "hero-float-b",
    rotate: "rotate-6 sm:rotate-3",
    glow: "shadow-[0_0_24px_rgba(0,56,226,0.3)] ring-2 ring-[#0038E2]/30",
    platformId: "all",
    depth: 14,
  },
  {
    id: "instagram",
    name: "Instagram",
    src: "/assets/logos/instagram.png",
    pos: "top-[48%] left-2.5 sm:top-[60%] sm:left-[5%] lg:left-[6%]",
    size: "w-[48px] h-[48px] sm:w-[62px] sm:h-[62px] lg:w-[68px] lg:h-[68px]",
    anim: "hero-float-b",
    rotate: "-rotate-12 sm:-rotate-4",
    platformId: "reels",
    depth: 24,
  },
  {
    id: "shorts",
    name: "YouTube Shorts",
    src: "/assets/logos/youtubeshorts.png",
    pos: "top-[49%] right-2.5 sm:top-[26%] sm:right-[26%] lg:right-[28%]",
    size: "w-[48px] h-[48px] sm:w-[62px] sm:h-[62px] lg:w-[74px] lg:h-[74px]",
    anim: "hero-float-c",
    rotate: "rotate-12 sm:rotate-4",
    platformId: "shorts",
    depth: 20,
  },
  {
    id: "facebook",
    name: "Facebook",
    src: "/assets/logos/facebook.png",
    pos: "top-[58.5%] left-[22%] sm:bottom-[22%] sm:left-[12%] lg:left-[14%]",
    size: "w-[48px] h-[48px] sm:w-[58px] sm:h-[58px] lg:w-[68px] lg:h-[68px]",
    anim: "hero-float-a",
    rotate: "-rotate-2 sm:rotate-0",
    glow: "shadow-[0_0_28px_rgba(0,56,226,0.45)] ring-2 ring-[#0038E2]/40",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Update active navigation state based on scroll position (RAF throttled)
  useEffect(() => {
    const navSections = [
      { id: "results", topOffset: 0 },
      { id: "distribution", topOffset: 0 },
      { id: "about", topOffset: 0 },
      { id: "pricing", topOffset: 0 },
    ];

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 250;
          for (let i = navSections.length - 1; i >= 0; i--) {
            const el = document.getElementById(navSections[i].id);
            if (el && el.offsetTop <= scrollPos) {
              setActiveNav(navSections[i].id);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
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
      className="relative flex min-h-[100svh] min-h-[100dvh] flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 pt-3 sm:pt-5 pb-5 sm:pb-8 md:pb-14 bg-[#F3EFEA] text-[#111111] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* 0. INTERACTIVE MOUSE-FOLLOWING LIGHT BEAM & DEPTH MESH                    */}
      {/* ========================================================================= */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-br from-frost/30 via-blue-200/25 to-transparent blur-[120px] will-change-transform z-0"
      />

      {/* 3D Interactive Globe Background Layer (React Bits Pro with animated arcs & markers) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden opacity-75 flex items-center justify-center -translate-y-4 sm:translate-y-0"
      >
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-auto">
          <Globe
            primaryColor="#0038E2"
            neutralColor="#1C3252"
            atmosphereColor="rgba(0, 56, 226, 0.25)"
            globeColor="#F3EFEA"
            globeOpacity={0.35}
            showAtmosphere={true}
            autoRotateSpeed={0.7}
            interactive={true}
            enableZoom={false}
            arcCount={12}
            arcInterval={4800}
            arcAnimationDuration={2200}
            cameraAltitude={isMobile ? 3.35 : 2.2}
            pointSize={isMobile ? 0.32 : 0.28}
            landMapUrl="/images/globe-map.png"
            className="w-full h-full bg-transparent"
          />
        </div>
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
              logo.rotate,
              logo.glow,
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
        className="relative z-30 w-full flex items-center justify-between pointer-events-none transition-all duration-500 pt-1 sm:pt-2"
        data-reveal
      >
        {/* Logo Mark (Left) */}
        <a
          href="/"
          className="pointer-events-auto group flex items-center gap-2.5 sm:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-full"
          aria-label="GetVeevz Home"
        >
          <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border border-[#111111]/10 group-hover:border-[#111111]/30 transition-all duration-300 shadow-sm group-hover:scale-105 shrink-0">
            <img
              src="/assets/Logo.png"
              alt="GetVeevz logo"
              className="w-full h-full object-cover scale-[1.15]"
            />
          </div>
          <span className="font-display font-medium text-base sm:text-lg tracking-tight text-[#111111] group-hover:text-[#0038E2] transition-colors whitespace-nowrap">
            GetVeevz
          </span>
        </a>

        {/* CTA (Right) */}
        <div ref={ctaButtonRef} className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => {
              const cta = document.getElementById("cta") || document.querySelector("footer");
              if (cta) cta.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-10 sm:h-11 text-xs font-medium rounded-full bg-[#18181B] text-white hover:bg-black transition-all shadow-sm active:scale-95 border-0 outline-none cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/80 shrink-0" />
            <span className="whitespace-nowrap">Book a Strategy Call</span>
          </button>

          {/* Mobile Menu Toggle Button (44-48px white circle) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#111111]/15 text-[#111111] shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:text-[#0038E2] focus:outline-none focus:ring-2 focus:ring-[#0038E2] shrink-0 cursor-pointer active:scale-95 transition-all"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#111111]" /> : <Menu className="w-5 h-5 text-[#111111]" strokeWidth={1.8} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-x-4 top-20 z-50 p-6 rounded-2xl bg-moonlight text-oxford border border-moonlight/60 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
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
        className="w-full mt-9 sm:mt-8 md:mt-14 pt-1 sm:pt-2 flex flex-col items-center md:flex-row md:items-baseline md:justify-between gap-3 sm:gap-3 pb-1 z-10"
        data-reveal
      >
        {/* Left/Center Eyebrow: Section Tag */}
        <div className="flex items-center justify-center gap-2">
          <span className="eyebrow-item text-[11px] sm:text-xs tracking-[0.2em] uppercase font-medium text-[#495B7D] flex items-center gap-2">
            <span className="text-[#0038E2] font-mono text-[11px] sm:text-xs font-semibold">( 01 )</span>
            Distribution Engine
          </span>
        </div>

        {/* Right Eyebrow: Interactive Platform Selector */}
        <div className="eyebrow-item flex items-center justify-center md:justify-end w-full md:w-auto">
          <div className="inline-flex items-center justify-between md:justify-start w-[calc(100%-32px)] max-w-[350px] md:w-auto h-[48px] md:h-auto p-1 rounded-full bg-white/95 border border-[#111111]/10 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            {PLATFORMS.map((p) => {
              const isCurrent = activePlatform.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p)}
                  className={cn(
                    "h-full flex items-center justify-center px-3 sm:px-3.5 py-1.5 md:py-1 text-[11px] sm:text-[11px] font-mono rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap",
                    isCurrent
                      ? "bg-[#111111] text-white font-medium shadow-xs"
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
        className="relative my-auto py-1 sm:py-8 md:py-14 flex flex-col items-center justify-center text-center overflow-visible z-10"
        data-reveal
      >
        {/* Main Central Interactive Wordmark */}
        <div className="relative inline-flex items-baseline justify-center group cursor-default">
          <h1
            className="font-display font-medium text-[clamp(58px,17vw,82px)] md:text-[clamp(3.8rem,16.8vw,14.2rem)] leading-[0.92] tracking-[-0.04em] text-[#111111] select-none transition-all duration-300 flex whitespace-nowrap"
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

          {/* Trademark/Engine Glyph on desktop */}
          <div
            onClick={() => {
              const currentIdx = PLATFORMS.findIndex((p) => p.id === activePlatform.id);
              setActivePlatform(PLATFORMS[(currentIdx + 1) % PLATFORMS.length]);
            }}
            className="hidden sm:flex items-center justify-center w-7 h-7 md:w-9 md:h-9 rounded-full border border-[#111111]/25 text-[10px] md:text-xs font-mono text-[#555555] ml-2 self-end mb-3 md:mb-5 hover:scale-110 hover:border-[#111111] hover:text-[#111111] hover:bg-white hover:rotate-180 transition-all duration-500 cursor-pointer shadow-xs active:scale-95"
            title="Click to cycle distribution engine mode"
          >
            ©
          </div>
        </div>

        {/* Supporting Headline directly below GetVeevz */}
        <h2 className="font-display font-normal text-[17px] sm:text-lg md:text-2xl text-[#111111] leading-[1.4] max-w-[310px] sm:max-w-xl mx-auto mt-3 sm:mt-5 tracking-tight text-center">
          <span className="block sm:inline">We cut short form clips from long form </span>
          <span className="block sm:inline">content and post across social media </span>
          <span className="block sm:inline">platforms</span>
        </h2>

        {/* Trademark/Engine Glyph on mobile - centered below subtitle */}
        <div
          onClick={() => {
            const currentIdx = PLATFORMS.findIndex((p) => p.id === activePlatform.id);
            setActivePlatform(PLATFORMS[(currentIdx + 1) % PLATFORMS.length]);
          }}
          className="flex sm:hidden items-center justify-center w-5 h-5 rounded-full border border-[#111111]/25 text-[8px] font-mono text-[#555555] mx-auto mt-3 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xs"
          title="Click to cycle distribution engine mode"
        >
          ©
        </div>

        {/* Video Card: Positioned centered on mobile, floating on desktop */}
        <div
          ref={cardRightRef}
          onClick={toggleVideoPlayback}
          className="mt-16 sm:mt-10 xl:mt-0 xl:absolute xl:-right-2 xl:-bottom-8 flex items-center xl:flex-col gap-3 p-3 sm:p-3 rounded-[22px] sm:rounded-3xl bg-white border border-[#111111]/10 shadow-[0_12px_36px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.02] xl:hover:scale-105 hover:border-[#111111]/25 w-[calc(100%-32px)] max-w-[350px] sm:max-w-[380px] xl:w-56 text-left cursor-pointer group pointer-events-auto mx-auto"
        >
          {/* Micro Video Card Screen */}
          <div className="relative w-[138px] sm:w-[170px] xl:w-full h-[84px] sm:h-28 rounded-xl overflow-hidden bg-black border border-black/10 shrink-0">
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
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-white flex items-center gap-1 border border-white/20">
              {isVideoPlaying ? <Activity className="w-2 sm:w-2.5 h-2 sm:h-2.5 animate-spin" /> : <Pause className="w-2 sm:w-2.5 h-2 sm:h-2.5" />}
              <span>LIVE</span>
            </div>

            {/* Metric pill on video */}
            <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] font-bold text-white font-display drop-shadow-md">
                {activePlatform.metric}
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-white/90 bg-white/20 backdrop-blur-md px-1.5 py-0.2 rounded border border-white/30 uppercase">
                {activePlatform.tag}
              </span>
            </div>
          </div>

          {/* Micro Card Label */}
          <div className="flex items-center justify-between gap-2 px-1 w-full min-w-0">
            <div className="flex items-center gap-1.5 text-[#111111] font-medium leading-tight shrink-0">
              <Share2 className="w-3.5 h-3.5 text-[#0038E2] shrink-0" />
              <div className="text-[11px] sm:text-xs leading-snug whitespace-nowrap">
                <div>All Platforms</div>
                <div>Route</div>
              </div>
            </div>
            <div className="text-right font-mono text-[#0038E2] font-bold leading-snug shrink-0 whitespace-nowrap">
              <div className="text-[11px] sm:text-xs">98.4%</div>
              <div className="text-[11px] sm:text-xs">Sync</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. BOTTOM CONTROLS (DOWN ARROW & TELEMETRY STATS)                         */}
      {/* ========================================================================= */}
      <div className="w-full mt-2 sm:mt-6 md:mt-auto pt-2 sm:pt-4 flex items-end justify-between relative z-10">
        {/* BOTTOM CENTER on mobile, LEFT on desktop: Circular Downward Arrow Cue */}
        <div
          ref={bottomLeftRef}
          className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex flex-col items-center gap-1.5"
          data-reveal
        >
          {/* Subtle vertical guide line */}
          <div className="w-px h-8 sm:h-6 bg-[#111111]/15" />
          <button
            ref={arrowRef}
            onClick={scrollToNext}
            aria-label="Scroll to learn more about GetVeevz"
            className="group relative flex items-center justify-center w-[52px] h-[52px] sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border border-[#111111]/15 bg-white hover:bg-[#111111] hover:text-white backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] cursor-pointer active:scale-95"
          >
            <ArrowDown className="w-5 h-5 sm:w-5 sm:h-5 text-[#111111] group-hover:text-white group-hover:translate-y-0.5 transition-all duration-300 ease-out" />
            <span className="sr-only">Scroll down</span>
          </button>
        </div>

        {/* BOTTOM RIGHT: Big Stat Number */}
        <div
          ref={bottomRightRef}
          className="ml-auto flex flex-col items-end justify-end"
          data-reveal
        >
          <div className="flex items-baseline gap-1 sm:gap-1.5 cursor-default group">
            <span className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#111111] group-hover:text-[#0038E2] transition-colors">
              <HeroStatCounter
                platformId={activePlatform.id}
                target={activePlatform.value}
                prefix={activePlatform.counterPrefix ?? ""}
                suffix={activePlatform.counterSuffix || "M"}
              />
            </span>
            <span className="text-[11px] sm:text-xs md:text-sm font-mono text-[#495B7D] uppercase tracking-wider ml-0.5">
              {activePlatform.metric.split(" ")[1] || "Views"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
