"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, X, RotateCw, CheckCircle2, Sparkles, Clock, Layers, Maximize2, PanelRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agency {
  id: string;
  name: string;
  description: string;
  link: string;
  videoSrc: string;
  maskType: "custom-a" | "rounded-rect" | "arch-pill";
}

interface ServiceDetail {
  tag: string;
  duration: string;
  highlights: string[];
  deliverables: { title: string; desc: string }[];
  idealFor: string;
}

const agencies: Agency[] = [
  {
    id: "long-term",
    name: "Long term",
    description:
      "This will include the CPM based growth campaign (with retainer transition) and normal clipping",
    link: "#",
    videoSrc: "/assets/agency-video-1.mp4",
    maskType: "custom-a",
  },
  {
    id: "short-term",
    name: "Short term",
    description:
      "This will include the PR campaign and the mass clipping\nShort term will be 25-30 days",
    link: "#",
    videoSrc: "/assets/agency-video-2.mp4",
    maskType: "rounded-rect",
  },
];

const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "long-term": {
    tag: "Continuous Scaling Engine",
    duration: "Ongoing / Retainer Transition",
    highlights: ["CPM-Based Growth", "Normal Clipping", "Retainer Transition", "Omnichannel Distribution"],
    deliverables: [
      {
        title: "CPM-Based Growth Campaign",
        desc: "Performance incentives tied directly to verified view milestones across your core channels.",
      },
      {
        title: "Normal Clipping Cadence",
        desc: "30–60 curated short-form assets per month repurposed from podcasts and long-form streams.",
      },
      {
        title: "Retainer Transition Model",
        desc: "Gradual phase-in into a dedicated production team with locked monthly retainer predictability.",
      },
      {
        title: "Omnichannel Algorithm Distribution",
        desc: "Coordinated distribution and SEO optimization across Instagram Reels, YouTube Shorts, and TikTok.",
      },
    ],
    idealFor: "Brands and creators building an evergreen distribution flywheel with compounding views over quarters.",
  },
  "short-term": {
    tag: "High-Impact Viral Sprint",
    duration: "25–30 Days Total Sprint",
    highlights: ["25–30 Day Sprint", "Mass Clipping Drop", "Targeted PR Seeding", "Algorithm Surge"],
    deliverables: [
      {
        title: "Targeted PR Campaign",
        desc: "High-leverage outreach, creator network placements, podcast syndication, and earned media buzz.",
      },
      {
        title: "Mass Clipping Drop",
        desc: "High-velocity coordinated blast across 20+ creator pages to flood recommendation feeds simultaneously.",
      },
      {
        title: "25–30 Day Intensive Sprint",
        desc: "Rapid execution window engineered to maximize algorithm momentum during launches or critical events.",
      },
      {
        title: "Attribution & Performance Wrap",
        desc: "Comprehensive post-sprint analytics audit, aggregate view metrics, and audience conversion tracking.",
      },
    ],
    idealFor: "Product launches, funding rounds, event surges, or creators needing an immediate algorithmic spike.",
  },
};

type RevealMode = "flip" | "modal" | "inline" | "drawer";

export default function Agencies() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slidingShapeRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const hoveredIndexRef = useRef<number>(0);
  const previousIndexRef = useRef<number | null>(null);

  // Reveal mode state to allow trying all 4 animations
  const [revealMode, setRevealMode] = useState<RevealMode>("flip");
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedService, setSelectedService] = useState<Agency | null>(null);
  const [expandedInlineCards, setExpandedInlineCards] = useState<Record<string, boolean>>({});

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
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  // Cursor follow: shape smoothly follows mouse across the grid area
  const handleGridMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const gridEl = gridRef.current;
    if (!gridEl || !slidingShapeRef.current) return;

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
      videoRefs.current.forEach((video, i) => {
        if (!video) return;
        if (i === activeCardIndex) {
          video.currentTime = 0;
          video.play().catch(() => {});
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

  // Run on mount
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

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
        setFlippedCards({});
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(initTimer);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Trigger reveal depending on current mode
  const handleCardAction = (agency: Agency, index: number) => {
    moveToCard(index);

    if (revealMode === "flip") {
      setFlippedCards((prev) => ({
        ...prev,
        [agency.id]: !prev[agency.id],
      }));
    } else if (revealMode === "modal") {
      setSelectedService(agency);
    } else if (revealMode === "inline") {
      setExpandedInlineCards((prev) => {
        const next = { ...prev, [agency.id]: !prev[agency.id] };
        setTimeout(() => {
          const bounds = getTargetBounds(index);
          if (bounds && slidingShapeRef.current) {
            gsap.to(slidingShapeRef.current, {
              height: bounds.height,
              duration: 0.35,
              ease: "power2.out",
            });
          }
        }, 80);
        return next;
      });
    } else if (revealMode === "drawer") {
      setSelectedService(agency);
    }
  };

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
    <section className="relative w-full bg-[#F3EFEA] text-[#111111] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* SVG CLIP-PATH DEFINITION                                                  */}
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
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#111111] leading-[1.08]">
            The services we provide
          </h2>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[17px] text-[#2D2D2D] leading-relaxed max-w-xl mx-auto font-normal">
            We specialise in clipping, multi-platform distribution, and creator PR.
            <br className="hidden sm:inline" /> Working as one unified engine – turning one piece of long-form footage into millions of views.
          </p>

          {/* ========================================================================= */}
          {/* INTERACTIVE ANIMATION PREVIEW SELECTOR                                    */}
          {/* ========================================================================= */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8E2D8] text-[11px] font-mono text-[#555555] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#0038E2]" />
              <span>Choose click reveal animation to preview</span>
            </div>

            <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-full bg-[#E5DFD7] border border-[#D3CAC0] shadow-inner gap-1">
              {[
                { id: "flip", label: "1. 3D Flip", icon: RotateCw },
                { id: "modal", label: "2. Expand Modal", icon: Maximize2 },
                { id: "inline", label: "3. Inline Tray", icon: Layers },
                { id: "drawer", label: "4. Side Drawer", icon: PanelRight },
              ].map((m) => {
                const Icon = m.icon;
                const isActive = revealMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setRevealMode(m.id as RevealMode);
                      setSelectedService(null);
                      setFlippedCards({});
                      setExpandedInlineCards({});
                    }}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                      isActive
                        ? "bg-[#0038E2] text-white shadow-md font-semibold scale-[1.02]"
                        : "text-[#444444] hover:text-[#111111] hover:bg-[#DDD6CC]"
                    )}
                  >
                    <Icon className={cn("w-3 h-3", isActive ? "text-white" : "text-[#666666]")} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-[#777777] font-mono">
              Click any card or &ldquo;Find out more&rdquo; to test the selected reveal
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN INTERACTIVE AGENCIES GRID WITH SHARED SLIDING HOVER SHAPE       */}
        {/* ========================================================================= */}
        <div
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridLeave}
          style={{ perspective: 1400 }}
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

            {/* Subtle contrast gradient for Card 2 */}
            <div
              className={cn(
                "absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 bg-black/25",
                hoveredIndex === 0 ? "opacity-0" : "opacity-100"
              )}
            />
          </div>

          {/* ========================================================================= */}
          {/* AGENCY CARDS                                                              */}
          {/* ========================================================================= */}
          {agencies.map((agency, index) => {
            const isActive = hoveredIndex === index;
            const isFlipped = !!flippedCards[agency.id];
            const isInlineExpanded = !!expandedInlineCards[agency.id];
            const details = SERVICE_DETAILS[agency.id];

            return (
              <div
                key={agency.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => handleCardAction(agency, index)}
                style={{ perspective: 1200 }}
                className="group relative z-20 min-h-[340px] sm:min-h-[460px] md:min-h-[530px] rounded-3xl cursor-pointer"
              >
                {/* 3D FLIP CONTAINER */}
                <div
                  style={{ transformStyle: "preserve-3d" }}
                  className={cn(
                    "relative w-full h-full min-h-[340px] sm:min-h-[460px] md:min-h-[530px] rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
                    revealMode === "flip" && isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
                  )}
                >
                  {/* ================================================================= */}
                  {/* FRONT FACE (Original interactive design preserved 100%)           */}
                  {/* ================================================================= */}
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="w-full h-full flex flex-col items-center justify-center px-5 sm:px-8 py-10 sm:py-12"
                  >
                    <div className="flex flex-col items-center justify-center text-center w-full max-w-xs transition-transform duration-300 group-hover:scale-[1.01]">
                      {/* Title */}
                      <h3
                        className={cn(
                          "font-display font-bold uppercase tracking-tight transition-colors duration-300 select-none whitespace-nowrap",
                          "text-2xl sm:text-3xl md:text-[2.35rem] lg:text-[2.65rem] leading-none",
                          isActive ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]" : "text-[#111111]"
                        )}
                      >
                        {agency.name}
                      </h3>

                      {/* Description: Smoothly collapses on hover when not inline-expanded */}
                      <div
                        className={cn(
                          "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                          isActive && !isInlineExpanded
                            ? "grid-rows-[0fr] opacity-0 my-0 -translate-y-2 pointer-events-none"
                            : "grid-rows-[1fr] opacity-100 mt-5 mb-8 translate-y-0"
                        )}
                      >
                        <div className="overflow-hidden">
                          <p className="text-sm sm:text-[15px] leading-relaxed max-w-[280px] sm:max-w-[320px] mx-auto font-normal text-[#333333] whitespace-pre-line">
                            {agency.description}
                          </p>
                        </div>
                      </div>

                      {/* Pill-shaped Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardAction(agency, index);
                        }}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm sm:text-[15px] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border",
                          isActive
                            ? "mt-4 sm:mt-5 border-white/85 bg-white/15 text-white hover:bg-white hover:text-[#0038E2] shadow-md backdrop-blur-md"
                            : "mt-0 border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F3EFEA]"
                        )}
                      >
                        <span>
                          {revealMode === "inline" && isInlineExpanded ? "Show less" : "Find out more"}
                        </span>
                        <ArrowUpRight className="h-4 w-4 stroke-[1.6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      {/* OPTION 3: INLINE TRAY ACCORDION */}
                      {revealMode === "inline" && (
                        <div
                          className={cn(
                            "w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden text-left",
                            isInlineExpanded
                              ? "max-h-[360px] opacity-100 mt-6 pt-4 border-t border-current/15"
                              : "max-h-0 opacity-0 mt-0 pointer-events-none"
                          )}
                        >
                          <div className="space-y-2 text-xs">
                            <span className="font-mono text-[10px] uppercase tracking-wider block opacity-70">
                              {details.duration}
                            </span>
                            {details.deliverables.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 pt-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#0038E2] mt-1.5 shrink-0" />
                                <div>
                                  <p className="font-semibold text-xs leading-tight text-inherit">{item.title}</p>
                                  <p className="text-[11px] opacity-80 leading-tight mt-0.5">{item.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ================================================================= */}
                  {/* OPTION 1: 3D FLIP BACK FACE                                       */}
                  {/* ================================================================= */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 z-30 rounded-3xl bg-[#091529] text-[#F3EFEA] border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-300" />
                        <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                          {details.duration}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedCards((prev) => ({ ...prev, [agency.id]: false }));
                        }}
                        className="text-xs font-mono uppercase text-[#8BA3C5] hover:text-white flex items-center gap-1 bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-full border border-white/10 transition-colors"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Flip back</span>
                      </button>
                    </div>

                    {/* Content */}
                    <div className="my-auto py-3">
                      <h4 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight mb-1">
                        {agency.name}
                      </h4>
                      <p className="text-xs font-mono text-[#8BA3C5] uppercase tracking-wider mb-4">
                        {details.tag}
                      </p>

                      <div className="space-y-3 text-left">
                        {details.deliverables.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-cyan-300 mt-0.5 shrink-0" />
                            <div>
                              <p className="text-xs font-semibold text-white leading-tight">{item.title}</p>
                              <p className="text-[11px] text-[#8BA3C5]/90 leading-tight mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-[10px] font-mono text-[#8BA3C5] line-clamp-1">
                        {details.idealFor}
                      </span>
                      <a
                        href="#pricing"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full bg-white text-[#0038E2] hover:bg-cyan-300 transition-colors shrink-0 shadow-md"
                      >
                        <span>Book Plan</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* OPTION 2: EXPANDED MODAL REVEAL (APPLE / LINEAR STYLE)                    */}
      {/* ========================================================================= */}
      {revealMode === "modal" && selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-[#091529] text-[#F3EFEA] rounded-3xl border border-white/20 p-6 sm:p-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Top glowing accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-[#0038E2]" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 text-xs font-mono uppercase tracking-wider mb-3">
                <Clock className="w-3.5 h-3.5" />
                {SERVICE_DETAILS[selectedService.id].duration}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight">
                {selectedService.name} Campaign
              </h3>
              <p className="mt-2 text-sm text-[#8BA3C5]">
                {SERVICE_DETAILS[selectedService.id].tag}
              </p>
            </div>

            {/* Deliverables Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {SERVICE_DETAILS[selectedService.id].deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-[#8BA3C5] leading-relaxed pl-6">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#8BA3C5] text-center sm:text-left max-w-sm">
                <strong className="text-white font-medium">Target fit: </strong>
                {SERVICE_DETAILS[selectedService.id].idealFor}
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
                <a
                  href="#pricing"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0038E2] hover:bg-cyan-300 text-xs font-semibold shadow-lg transition-colors"
                >
                  <span>Select Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OPTION 4: SLIDE-OVER SIDE DRAWER                                          */}
      {/* ========================================================================= */}
      {revealMode === "drawer" && selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedService(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md sm:max-w-lg bg-[#071120] text-[#F3EFEA] border-l border-white/15 h-full p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300"
          >
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {SERVICE_DETAILS[selectedService.id].duration}
                </span>
                <button
                  onClick={() => setSelectedService(null)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="py-6">
                <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white mb-2">
                  {selectedService.name}
                </h3>
                <p className="text-xs font-mono text-[#8BA3C5] uppercase tracking-wider mb-6">
                  {SERVICE_DETAILS[selectedService.id].tag}
                </p>

                <div className="space-y-4">
                  {SERVICE_DETAILS[selectedService.id].deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white/[0.04] border border-white/10"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <h4 className="text-xs font-semibold text-white">{item.title}</h4>
                      </div>
                      <p className="text-xs text-[#8BA3C5] leading-relaxed pl-6">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-[#0038E2]/15 border border-[#0038E2]/30">
                  <p className="text-xs text-white leading-relaxed">
                    <strong className="text-cyan-300">Strategy: </strong>
                    {SERVICE_DETAILS[selectedService.id].idealFor}
                  </p>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2.5 rounded-full border border-white/20 text-xs text-white hover:bg-white/10 transition-colors"
              >
                Back
              </button>
              <a
                href="#pricing"
                onClick={() => setSelectedService(null)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0038E2] hover:bg-cyan-300 text-xs font-semibold shadow-lg transition-colors"
              >
                <span>Get Started Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
