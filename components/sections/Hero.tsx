"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowDown, Menu, X, Play, Pause, Sparkles, Radio, Activity, Share2 } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { cn } from "@/lib/utils";

const Globe = React.lazy(() =>
  import("@/components/ui/globe").then((m) => ({ default: m.Globe }))
);

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
    pos: "top-[18%] left-[7%] sm:top-[22%] sm:left-[6%] lg:left-[7%]",
    size: "w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[68px] lg:h-[68px]",
    anim: "hero-float-a",
    rotate: "-rotate-6 sm:-rotate-3",
    platformId: "tiktok",
    depth: 18,
  },
  {
    id: "youtube",
    name: "YouTube",
    src: "/assets/logos/youtube.png",
    pos: "top-[23%] right-2 sm:top-[34%] sm:right-[5%] lg:right-[6%]",
    size: "w-[36px] h-[36px] sm:w-[56px] sm:h-[56px] lg:w-[68px] lg:h-[68px]",
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
    pos: "top-[35%] left-1.5 sm:top-[46%] sm:left-[4%] lg:left-[5%]",
    size: "w-[46px] h-[46px] sm:w-[56px] sm:h-[56px] lg:w-[66px] lg:h-[66px]",
    anim: "hero-float-b",
    rotate: "-rotate-12 sm:-rotate-4",
    platformId: "reels",
    depth: 24,
  },
  {
    id: "shorts",
    name: "YouTube Shorts",
    src: "/assets/logos/youtubeshorts.png",
    pos: "top-[43%] right-[6%] sm:top-[20%] sm:right-[15%] lg:right-[17%]",
    size: "w-[38px] h-[38px] sm:w-[56px] sm:h-[56px] lg:w-[68px] lg:h-[68px]",
    anim: "hero-float-c",
    rotate: "rotate-12 sm:rotate-4",
    platformId: "shorts",
    depth: 20,
  },
  {
    id: "facebook",
    name: "Facebook",
    src: "/assets/logos/facebook.png",
    pos: "top-[55%] left-[5%] sm:top-[68%] sm:left-[7%] lg:left-[15%]",
    size: "w-[34px] h-[34px] sm:w-[52px] sm:h-[52px] lg:w-[64px] lg:h-[64px]",
    anim: "hero-float-a",
    rotate: "-rotate-6 sm:rotate-0",
    glow: "shadow-[0_0_28px_rgba(0,56,226,0.45)] ring-2 ring-[#0038E2]/40",
    platformId: "all",
    depth: 16,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    src: "/assets/logos/linked in.png",
    pos: "top-[63%] right-2 sm:top-[57%] sm:right-[6%] lg:right-[20%]",
    size: "w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] lg:w-[64px] lg:h-[64px]",
    anim: "hero-float-b",
    rotate: "rotate-6 sm:rotate-1",
    platformId: "all",
    depth: 14,
  },
  {
    id: "x",
    name: "X",
    src: "/assets/logos/x.png",
    pos: "top-[76%] left-3 sm:top-[84%] sm:left-[14%] lg:left-[40%]",
    size: "w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] lg:w-[58px] lg:h-[58px]",
    anim: "hero-float-c",
    rotate: "-rotate-6 sm:rotate-2",
    platformId: "all",
    depth: 18,
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

    const startDelay = 120;

    const timerId = setTimeout(() => {
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

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

    let spotlightX = gsap.quickTo(spotlightRef.current, "x", { duration: 0.6, ease: "power2.out" });
    let spotlightY = gsap.quickTo(spotlightRef.current, "y", { duration: 0.6, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      spotlightX(x);
      spotlightY(y);

      const normX = (x / rect.width - 0.5) * 2;
      const normY = (y / rect.height - 0.5) * 2;

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

      gsap.set(navRef.current, { opacity: 0, y: -20 });
      if (eyebrowsRef.current) {
        gsap.set(eyebrowsRef.current.querySelectorAll(".eyebrow-item"), { opacity: 0, y: 16 });
      }
      gsap.set(wordmarkRef.current, { opacity: 0, scale: 0.94, y: 20 });
      gsap.set(".floating-scatter-logo", { opacity: 0, scale: 0.6, y: 20 });
      gsap.set(cardRightRef.current, { opacity: 0, scale: 0.8, y: 30 });
      gsap.set([bottomLeftRef.current, bottomRightRef.current], { opacity: 0, y: 24 });

      tl.to(navRef.current, { opacity: 1, y: 0, duration: 0.6 })
        .to(eyebrowsRef.current?.querySelectorAll(".eyebrow-item") || [], { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, "-=0.35")
        .to(wordmarkRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3")
        .to(".floating-scatter-logo", { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "back.out(1.5)" }, "-=0.5")
        .to([bottomLeftRef.current, bottomRightRef.current], { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .to(cardRightRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.7 }, "-=0.4");

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

  useEffect(() => {
    const navSections = [
      { id: "results", target: "results" },
      { id: "distribution", target: "distribution" },
      { id: "about", target: "agencies" },
      { id: "pricing", target: "pricing" },
    ];

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.scrollY + 250;
          for (let i = navSections.length - 1; i >= 0; i--) {
            const el = document.getElementById(navSections[i].target);
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
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetId = id === "about" ? "agencies" : id;
    const target = document.getElementById(targetId);
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
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -left-48 w-96 h-96 rounded-full bg-gradient-to-br from-frost/30 via-blue-200/25 to-transparent blur-[120px] will-change-transform z-0"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden opacity-75 flex items-center justify-center"
      >
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center pointer-events-auto">
          <React.Suspense fallback={null}>
            <Globe
              primaryColor="#0038E2"
              neutralColor="#1C3252"
              atmosphereColor="#0038E2"
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
          </React.Suspense>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3EFEA] via-transparent to-[#F3EFEA]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#F3EFEA_85%)] pointer-events-none" />
      </div>

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
              "floating-scatter-logo absolute flex items-center justify-center rounded-xl sm:rounded-2xl bg-white/95 border border-[#111111]/10 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] sm:shadow-[0_12px_32px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-2xl hover:border-[#0038E2]/50 hover:scale-115 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto p-1.5 sm:p-2.5",
              logo.id === "shorts" ? "z-[5]" : "z-20",
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
              alt={`${logo.name} short-form distribution network`}
              className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
              loading="eager"
            />
          </button>
        );
      })}

      <header
        ref={navRef}
        className="relative z-30 w-full flex items-center justify-between pointer-events-none transition-all duration-500 pt-1 sm:pt-2"
        data-reveal
      >
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

      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-md z-40 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="lg:hidden fixed inset-x-4 top-20 z-50 p-5 sm:p-6 rounded-3xl bg-[#090A0D]/95 text-white border border-white/[0.12] shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#8BA3C5] font-semibold">
                Directory
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/[0.15] text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              {[
                { id: "home", label: "Home" },
                { id: "results", label: "Results" },
                { id: "distribution", label: "Distribution" },
                { id: "services", label: "Services" },
                { id: "about", label: "About" },
                { id: "pricing", label: "Pricing" },
              ].map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      handleNavClick(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.98]",
                      isActive
                        ? "bg-white text-[#111111] font-semibold shadow-sm"
                        : "text-white/75 hover:text-white hover:bg-white/[0.06]"
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight
                      className={cn(
                        "w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5",
                        isActive ? "text-[#0038E2]" : "text-white/30 group-hover:text-white/70"
                      )}
                    />
                  </button>
                );
              })}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                const cta = document.getElementById("cta") || document.querySelector("footer");
                if (cta) cta.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full mt-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-[#0038E2] hover:bg-[#002ec7] active:scale-[0.98] text-white font-medium text-sm shadow-[0_8px_24px_rgba(0,56,226,0.35)] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white/90" />
              <span>Book a Strategy Call</span>
            </button>

            <div className="flex items-center justify-between pt-1 px-1 text-[10.5px] font-mono text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                team@getveevz.com
              </span>
              <span>© GetVeevz 2026</span>
            </div>
          </div>
        </>
      )}

      <div
        ref={eyebrowsRef}
        className="w-full mt-2.5 sm:mt-8 md:mt-14 pt-0.5 sm:pt-2 flex flex-col items-center md:flex-row md:items-baseline md:justify-between gap-1.5 sm:gap-3 pb-1 z-10"
        data-reveal
      >
        <div className="flex items-center justify-center gap-2">
          <span className="eyebrow-item text-[10.5px] sm:text-xs tracking-[0.2em] uppercase font-medium text-[#495B7D] flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#0038E2] font-mono text-[10.5px] sm:text-xs font-semibold">( 01 )</span>
            Distribution Engine
          </span>
        </div>

        <div className="eyebrow-item flex items-center justify-center md:justify-end w-full md:w-auto">
          <div className="inline-flex items-center justify-between md:justify-start w-auto sm:max-w-none md:max-w-none scale-[0.80] origin-center sm:scale-100 h-[32px] sm:h-[38px] p-0.5 sm:p-1 rounded-full bg-white/95 border border-[#111111]/10 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {PLATFORMS.map((p) => {
              const isCurrent = activePlatform.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActivePlatform(p)}
                  className={cn(
                    "h-full flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 md:py-1 text-[9.5px] sm:text-[11px] font-mono rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap",
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

      <div
        ref={wordmarkRef}
        className="relative my-auto py-1 sm:py-8 md:py-14 flex flex-col items-center justify-center text-center overflow-visible z-20"
        data-reveal
      >
        <div className="flex flex-col items-center justify-center text-center translate-y-[35%] sm:translate-y-0 transition-transform">
          <div className="relative z-20 inline-flex items-baseline justify-center group cursor-default">
            <h1
              aria-label="GetVeevz — Short-Form Video Distribution &amp; Clipping Engine"
              className="font-display font-medium text-[clamp(70px,20.4vw,98px)] md:text-[clamp(3.8rem,16.8vw,14.2rem)] leading-[0.92] tracking-[-0.04em] text-[#111111] select-none transition-all duration-300 flex whitespace-nowrap"
              style={{
                fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
                textShadow: "0 2px 24px rgba(0, 0, 0, 0.08)",
              }}
            >
              <span className="sr-only">GetVeevz — Short-Form Video Distribution &amp; Clipping Engine</span>
              <span aria-hidden="true" className="flex">
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
              </span>
            </h1>

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

          <h2 className="font-display font-normal text-[12.5px] sm:text-base md:text-2xl text-[#333333] sm:text-[#111111] leading-[1.45] max-w-[270px] sm:max-w-xl mx-auto mt-2 sm:mt-5 tracking-tight text-center">
            <span className="block sm:inline">We cut short form clips from long form </span>
            <span className="block sm:inline">content and post across social media </span>
            <span className="block sm:inline">platforms</span>
          </h2>

          <div
            onClick={() => {
              const currentIdx = PLATFORMS.findIndex((p) => p.id === activePlatform.id);
              setActivePlatform(PLATFORMS[(currentIdx + 1) % PLATFORMS.length]);
            }}
            className="flex sm:hidden items-center justify-center w-4 h-4 rounded-full border border-[#111111]/25 text-[7px] font-mono text-[#555555] mx-auto mt-1.5 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-2xs"
            title="Click to cycle distribution engine mode"
          >
            ©
          </div>
        </div>

        <div className="w-full flex justify-center translate-y-[75%] sm:translate-y-0 xl:contents pointer-events-auto">
          <div
            ref={cardRightRef}
            onClick={toggleVideoPlayback}
            className="mt-4 sm:mt-10 xl:mt-0 xl:absolute xl:-right-2 xl:-bottom-8 flex items-center xl:flex-col gap-3 p-3 sm:p-3 rounded-[22px] sm:rounded-3xl bg-white border border-[#111111]/10 shadow-[0_12px_36px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:scale-[1.02] xl:hover:scale-105 hover:border-[#111111]/25 w-[calc(100%-32px)] max-w-[350px] sm:max-w-[380px] xl:w-56 text-left cursor-pointer group pointer-events-auto mx-auto"
          >
            <div className="relative w-[138px] sm:w-[170px] xl:w-full h-[84px] sm:h-28 rounded-xl overflow-hidden bg-black border border-black/10 shrink-0">
              <video
                ref={videoPreviewRef}
                src={activePlatform.video}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[8px] sm:text-[9px] font-mono text-white flex items-center gap-1 border border-white/20">
                {isVideoPlaying ? <Activity className="w-2 sm:w-2.5 h-2 sm:h-2.5 animate-spin" /> : <Pause className="w-2 sm:w-2.5 h-2 sm:h-2.5" />}
                <span>LIVE</span>
              </div>

              <div className="absolute bottom-1.5 sm:bottom-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex items-center justify-between">
                <span className="text-[9px] sm:text-[10px] font-bold text-white font-display drop-shadow-md">
                  {activePlatform.metric}
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-white/90 bg-white/20 backdrop-blur-md px-1.5 py-0.2 rounded border border-white/30 uppercase">
                  {activePlatform.tag}
                </span>
              </div>
            </div>

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
      </div>

      <div className="w-full mt-2 sm:mt-6 md:mt-auto pt-2 sm:pt-4 flex items-end justify-between relative z-10">
        <div
          ref={bottomLeftRef}
          className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex flex-col items-center gap-1.5"
          data-reveal
        >
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
