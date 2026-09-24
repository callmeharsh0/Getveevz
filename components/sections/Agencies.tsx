"use client";

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ArrowUpRight, Check, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassButton } from "@/components/ui/glass-button";

interface ServiceItem {
  title: string;
  detail: string;
}

interface Agency {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  deliverables: string;
  description: string;
  link: string;
  videoSrc: string;
  maskType: "custom-a" | "rounded-rect" | "arch-pill";
  servicesList: ServiceItem[];
}

const agencies: Agency[] = [
  {
    id: "long-term",
    name: "Long term",
    tagline: "Continuous Growth Engine",
    duration: "Ongoing / Retainer",
    deliverables: "60+ Clips/Mo • Dedicated Pod",
    description:
      "This will include the CPM based growth campaign (with retainer transition) and normal clipping",
    link: "#cta",
    videoSrc: "/assets/agency-video-1.mp4",
    maskType: "custom-a",
    servicesList: [
      {
        title: "Test & Discover",
        detail: "Launch with 500–1,000+ clippers to test pages, hooks, formats, and content angles using CPM-based distribution.",
      },
      {
        title: "Identify Winners",
        detail: "Track performance to identify the top-performing pages and content formats that consistently generate results.",
      },
      {
        title: "Build the Network",
        detail: "Move the top 10–30 pages into a fixed monthly retainer with defined clips, posting frequency, and quality standards.",
      },
      {
        title: "Scale Continuously",
        detail: "Build a repeatable distribution system that can be renewed, optimized, and scaled month after month.",
      },
    ],
  },
  {
    id: "short-term",
    name: "Short term",
    tagline: "High-Impact Sprint",
    duration: "25–30 Days",
    deliverables: "Mass PR Blitz • Omnipresent Reach",
    description:
      "This will include the PR campaign and the mass clipping\nShort term will be 25-30 days",
    link: "#cta",
    videoSrc: "/assets/agency-video-2.mp4",
    maskType: "rounded-rect",
    servicesList: [
      {
        title: "Activate Fast",
        detail: "Launch targeted distribution for products, announcements, launches, or narratives without a long testing period.",
      },
      {
        title: "Reach at Scale",
        detail: "Deploy through mass fan-page clipping and niche theme pages, with CPM campaigns typically structured around $1–$3 / 1K views.",
      },
      {
        title: "Seed Everywhere",
        detail: "Use established pages ranging from niche accounts to 1M–10M+ followers, with fixed cost per post and execution possible within 24 hours.",
      },
      {
        title: "Push & Scale",
        detail: "Run concentrated campaigns from $12K minimum to $100K+, depending on the required reach, inventory, and timeframe.",
      },
    ],
  },
];

export default function Agencies() {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slidingShapeRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const hoveredIndexRef = useRef<number>(0);
  const previousIndexRef = useRef<number | null>(null);
  const [isGridHovered, setIsGridHovered] = useState<boolean>(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const toggleFlip = (index: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  // Sync ref with state so resize handlers always have the latest index without re-running mount effects
  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex;
  }, [hoveredIndex]);

  const baseBoundsRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  // Function to calculate relative position of target card inside grid
  const getTargetBounds = (index: number) => {
    const cardEl = cardRefs.current[index];
    const gridEl = gridRef.current;
    if (!cardEl || !gridEl) return null;

    const insetX = 6;
    const insetY = 12;

    const cardRect = cardEl.getBoundingClientRect();
    const gridRect = gridEl.getBoundingClientRect();

    return {
      x: cardRect.left - gridRect.left + insetX,
      y: cardRect.top - gridRect.top + insetY,
      width: cardRect.width - insetX * 2,
      height: cardRect.height - insetY * 2,
    };
  };

  const moveToCard = (index: number, immediate = false) => {
    if (index === previousIndexRef.current && !immediate) return;

    setHoveredIndex(index);
    previousIndexRef.current = index;

    const bounds = getTargetBounds(index);
    if (!bounds || !slidingShapeRef.current) return;

    baseBoundsRef.current = bounds;
    gsap.killTweensOf(slidingShapeRef.current);

    if (immediate) {
      gsap.set(slidingShapeRef.current, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
      });
    } else {
      gsap.to(slidingShapeRef.current, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      });
    }

    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  };

  // Cursor follow: shape smoothly follows mouse across the grid area
  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const gridEl = gridRef.current;
    if (!gridEl || !slidingShapeRef.current) return;

    if (!isGridHovered) {
      setIsGridHovered(true);
    }

    const gridRect = gridEl.getBoundingClientRect();
    const mouseX = e.clientX - gridRect.left;
    const mouseY = e.clientY - gridRect.top;

    // Detect which card the cursor is closest to horizontally
    let activeCardIndex = hoveredIndexRef.current;
    cardRefs.current.forEach((cardEl, i) => {
      if (!cardEl) return;
      const rect = cardEl.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right) {
        activeCardIndex = i;
      }
    });

    if (activeCardIndex !== hoveredIndexRef.current) {
      setHoveredIndex(activeCardIndex);
      previousIndexRef.current = activeCardIndex;
      // User request: when hover shift make it flip back to normal
      setFlippedIndex(null);
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i === activeCardIndex) {
          video.currentTime = 0;
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      });
    }

    const currentCard = cardRefs.current[activeCardIndex] || cardRefs.current[0];
    const shapeWidth = currentCard ? currentCard.offsetWidth - 12 : 320;
    const shapeHeight = currentCard ? currentCard.offsetHeight - 24 : 480;

    const targetX = mouseX - shapeWidth / 2;
    const targetY = mouseY - shapeHeight / 2;

    const clampedX = Math.max(0, Math.min(gridRect.width - shapeWidth, targetX));
    const clampedY = Math.max(-20, Math.min(gridRect.height - shapeHeight + 20, targetY));

    gsap.to(slidingShapeRef.current, {
      x: clampedX,
      y: clampedY,
      width: shapeWidth,
      height: shapeHeight,
      rotateX: 0,
      rotateY: 0,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleGridLeave = () => {
    setIsGridHovered(false);
    setFlippedIndex(null);
    // Smoothly settle and center on the last active card instead of resetting to Card 0
    const lastIndex = hoveredIndexRef.current;
    const bounds = getTargetBounds(lastIndex);
    if (bounds && slidingShapeRef.current) {
      gsap.to(slidingShapeRef.current, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        rotateX: 0,
        rotateY: 0,
        duration: 0.45,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  };

  // Run ONLY on mount: position shape at card 0 and register resize listener
  useEffect(() => {
    const initTimer = setTimeout(() => {
      moveToCard(0, true);
    }, 100);

    const handleResize = () => {
      const bounds = getTargetBounds(hoveredIndexRef.current);
      if (bounds && slidingShapeRef.current) {
        gsap.set(slidingShapeRef.current, {
          x: bounds.x,
          y: bounds.y,
          width: bounds.width,
          height: bounds.height,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // CRITICAL: Empty dependency array so hover events are never reset by re-triggered effects

  // Dynamic mask/shape class depending on active agency
  const getActiveMaskClass = () => {
    const agency = agencies[hoveredIndex];
    switch (agency?.maskType) {
      case "custom-a":
        return "[clip-path:url(#custom-cutout-mask)] rounded-none";
      case "rounded-rect":
        return "[clip-path:none] rounded-[2.5rem]";
      case "arch-pill":
        return "[clip-path:none] rounded-t-[7rem] rounded-b-[2.5rem]";
      default:
        return "[clip-path:none] rounded-3xl";
    }
  };

  return (
    <section className="relative w-full bg-[#F3EFEA] text-[#111111] py-16 sm:py-28 lg:py-36 px-4 sm:px-8 lg:px-12 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* SVG CLIP-PATH DEFINITION (FOR CUSTOM CHUNKY CUTOUT IN CARD 1)              */}
      {/* ========================================================================= */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="custom-cutout-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0.12,0.04 C 0.04,0.04 0.0,0.09 0.0,0.16 L 0.0,0.68 C 0.0,0.75 0.04,0.8 0.12,0.8 L 0.25,0.8 L 0.25,0.92 C 0.25,0.97 0.29,1.0 0.36,1.0 L 0.88,1.0 C 0.96,1.0 1.0,0.96 1.0,0.88 L 1.0,0.36 C 1.0,0.29 0.96,0.25 0.88,0.25 L 0.75,0.25 L 0.75,0.12 C 0.75,0.06 0.7,0.04 0.63,0.04 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#111111] leading-[1.08]">
            The services we provide
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN INTERACTIVE AGENCIES GRID WITH SHARED SLIDING HOVER SHAPE       */}
        {/* ========================================================================= */}
        <div
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridLeave}
          style={{ perspective: 1200 }}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch max-w-4xl lg:max-w-5xl mx-auto"
        >
          {/* ========================================================================= */}
          {/* SHARED SLIDING GSAP HOVER SHAPE (STRICTLY z-0, NEVER OVERLAPS TEXT)       */}
          {/* ========================================================================= */}
          <div
            ref={slidingShapeRef}
            style={{ transformStyle: "preserve-3d" }}
            className={cn(
              "pointer-events-none absolute top-0 left-0 z-0 overflow-hidden shadow-2xl transition-[border-radius,clip-path] duration-500 will-change-transform bg-[#0038E2]",
              getActiveMaskClass()
            )}
          >
            {/* Card 1 Graphic Artwork: Pure vibrant cobalt blue with solid warm cream motif */}
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500 pointer-events-none z-0",
                hoveredIndex === 0 ? "opacity-100" : "opacity-0"
              )}
            >
              <svg
                viewBox="0 0 340 440"
                fill="none"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full"
              >
                {/* Swirling cream agency motif with circular center hole */}
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M 125 16 C 220 16 265 60 265 145 L 265 265 C 265 355 190 415 95 415 C 35 415 0 365 0 285 L 0 160 C 0 65 52 16 125 16 Z M 138 126 C 92 126 56 162 56 208 C 56 254 92 290 138 290 C 184 290 220 254 220 208 C 220 162 184 126 138 126 Z"
                  fill="#EDE6DC"
                />
              </svg>
            </div>

            {/* Crossfading Layered Agency Videos */}
            {agencies.map((agency, i) => (
              <video
                key={agency.id}
                ref={(el) => (videoRefs.current[i] = el)}
                src={agency.videoSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 z-0",
                  hoveredIndex === i ? (i === 0 ? "opacity-25 mix-blend-screen" : "opacity-85") : "opacity-0"
                )}
              />
            ))}

            {/* Subtle contrast gradient for Card 2 & 3 */}
            <div
              className={cn(
                "absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 bg-black/25",
                hoveredIndex === 0 ? "opacity-0" : "opacity-100"
              )}
            />
          </div>

          {/* ========================================================================= */}
          {/* AGENCY CARDS (STRICTLY z-20 FOREGROUND)                                   */}
          {/* ========================================================================= */}
          {agencies.map((agency, index) => {
            const isActive = hoveredIndex === index;
            const isFlipped = flippedIndex === index;

            return (
              <div
                key={agency.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => {
                  moveToCard(index);
                  toggleFlip(index);
                }}
                className="group relative z-20 min-h-[460px] sm:min-h-[500px] md:min-h-[540px] cursor-pointer rounded-3xl"
                style={{
                  perspective: "1400px",
                  WebkitPerspective: "1400px",
                }}
              >
                {/* 3D FLIPPER CONTAINER */}
                <div
                  className="relative w-full h-full min-h-[460px] sm:min-h-[500px] md:min-h-[540px] rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] preserve-3d"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    WebkitTransform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* ========================================================= */}
                  {/* FRONT FACE                                                */}
                  {/* ========================================================= */}
                  <div
                    className={cn(
                      "absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center text-center px-6 sm:px-8 py-10 rounded-3xl",
                      "transition-opacity duration-300",
                      isFlipped ? "pointer-events-none opacity-0" : "pointer-events-auto opacity-100"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(0deg)",
                      WebkitTransform: "rotateY(0deg)",
                    }}
                  >
                    <div className="flex flex-col items-center justify-center text-center w-full max-w-xs transition-transform duration-300 group-hover:scale-[1.01] -translate-y-6 sm:-translate-y-8">
                      {/* Eyebrow Tag */}
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono uppercase tracking-wider mb-4 border transition-colors duration-300",
                          isActive
                            ? "bg-white/20 border-white/40 text-white"
                            : "bg-black/[0.04] border-black/10 text-[#495B7D]"
                        )}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{agency.tagline}</span>
                      </div>

                      {/* Title */}
                      <h3
                        className={cn(
                          "font-display font-bold uppercase tracking-tight transition-colors duration-300 select-none whitespace-nowrap",
                          "text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-none",
                          isActive ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" : "text-[#111111]"
                        )}
                      >
                        {agency.name}
                      </h3>

                      {/* Description */}
                      <p
                        className={cn(
                          "mt-4 text-sm sm:text-[15px] leading-relaxed max-w-[280px] sm:max-w-[320px] mx-auto font-normal whitespace-pre-line transition-colors duration-300",
                          isActive ? "text-white/90 drop-shadow-sm" : "text-[#333333]"
                        )}
                      >
                        {agency.description}
                      </p>

                      {/* Pill-shaped Flip Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveToCard(index);
                          toggleFlip(index);
                        }}
                        className={cn(
                          "mt-6 inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer",
                          isActive
                            ? "border-white/90 bg-white/25 text-white hover:bg-white hover:text-[#0038E2] shadow-lg"
                            : "border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F3EFEA]"
                        )}
                      >
                        <span>Reveal Services</span>
                        <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
                      </button>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* BACK FACE (REVEALED SERVICES BREAKDOWN)                   */}
                  {/* ========================================================= */}
                  <div
                    className={cn(
                      "absolute inset-0 w-full h-full backface-hidden flex flex-col justify-between p-6 sm:p-7 md:p-8 rounded-3xl",
                      "bg-[#02122F]/95 border border-white/25 text-white shadow-2xl transition-opacity duration-300",
                      isFlipped ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
                    )}
                    style={{
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      WebkitTransform: "rotateY(180deg)",
                    }}
                  >
                    {/* Back Header */}
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-frost">
                          <Sparkles className="w-3 h-3 text-frost" />
                          <span>{agency.tagline}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-moonlight/90 border border-white/10">
                            {agency.duration}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFlippedIndex(null);
                            }}
                            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-frost hover:text-white transition-all cursor-pointer"
                            title="Flip back"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-display font-bold text-xl sm:text-2xl text-white mt-2 leading-tight">
                        {agency.name}: Service Specs
                      </h4>
                    </div>

                    {/* Services List */}
                    <div className="my-2 space-y-2 text-left">
                      {agency.servicesList.map((srv, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-2.5 p-2 sm:p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1]"
                        >
                          <div className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-frost/25 text-frost shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <div>
                            <span className="block text-xs sm:text-sm font-semibold text-white leading-tight">
                              {srv.title}
                            </span>
                            <span className="block text-[11px] sm:text-xs text-white/75 leading-relaxed mt-0.5">
                              {srv.detail}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Back Footer Actions */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(agency.id === "long-term" ? "/services/long-term-distribution" : "/services/short-term-campaign");
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-xs font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                      >
                        <span>More Info</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-frost" />
                      </button>
                      <GlassButton
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          const targetTerm = agency.id === "long-term" ? "long-term" : "short-term";
                          window.dispatchEvent(
                            new CustomEvent("select-pricing-term", { detail: targetTerm })
                          );
                          const pricingEl = document.getElementById("pricing");
                          if (pricingEl) {
                            pricingEl.scrollIntoView({ behavior: "smooth" });
                          } else {
                            navigate(`/#pricing?term=${targetTerm}`);
                          }
                        }}
                        contentClassName="flex items-center gap-1.5 text-xs font-semibold tracking-wide"
                      >
                        <span>Explore Pricing</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-frost" />
                      </GlassButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
