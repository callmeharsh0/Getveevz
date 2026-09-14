"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight, CheckCircle2, Clock, Sparkles, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignModel {
  id: string;
  name: string;
  badge: string;
  duration: string;
  headline: string;
  whoItsFor: string;
  includes: { title: string; desc: string }[];
  ctaText: string;
  link: string;
  videoSrc: string;
}

const campaignModels: CampaignModel[] = [
  {
    id: "long-term",
    name: "Long Term",
    badge: "Sustainable Engine",
    duration: "Months or Years Contract",
    headline: "Build perpetual distribution channels for your brand.",
    whoItsFor:
      "This is for someone who wants to build long-term content distribution channels for their brand.",
    includes: [
      {
        title: "CPM-Based Growth Campaign",
        desc: "Performance-oriented audience scaling with seamless retainer transition.",
      },
      {
        title: "Normal Clipping & Repurposing",
        desc: "Consistent, continuous extraction of high-retention short clips from long-form footage.",
      },
      {
        title: "Omnichannel Distribution",
        desc: "Systematic multi-account scheduling & algorithmic posting on Reels, TikTok & Shorts.",
      },
      {
        title: "Dedicated Account Ownership",
        desc: "Long-term partnership built for clients wanting multi-month or annual brand dominance.",
      },
    ],
    ctaText: "Book Long-Term Campaign",
    link: "#pricing",
    videoSrc: "/assets/agency-video-2.mp4",
  },
  {
    id: "short-term",
    name: "Short Term",
    badge: "Immediate Surge",
    duration: "25 – 30 Days Sprint",
    headline: "Launch your brand or product and command immediate attention.",
    whoItsFor:
      "This is for you if you want to launch your brand or product and need immediate attention.",
    includes: [
      {
        title: "PR & Media Campaign",
        desc: "High-impact creator seeding, podcast amplification, and strategic press mentions.",
      },
      {
        title: "Mass Clipping Blitz",
        desc: "Massive volume of varied hooks and cutdowns flooded across short-form channels.",
      },
      {
        title: "Launch-Focused Saturation",
        desc: "Concentrated 25–30 day push designed to dominate social feeds during your launch window.",
      },
      {
        title: "Rapid Execution Turnaround",
        desc: "Zero ramp-up lag — aggressive timeline built specifically for products and brand drops.",
      },
    ],
    ctaText: "Book Short-Term Sprint",
    link: "#pricing",
    videoSrc: "/assets/agency-video-1.mp4",
  },
];

export default function Agencies() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slidingShapeRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);
  const hoveredIndexRef = useRef<number>(0);
  const previousIndexRef = useRef<number | null>(null);

  // Sync ref with state so resize handlers always have the latest index
  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex;
  }, [hoveredIndex]);

  const baseBoundsRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null);

  // Function to calculate relative position of target card inside grid
  const getTargetBounds = (index: number) => {
    const cardEl = cardRefs.current[index];
    const gridEl = gridRef.current;
    if (!cardEl || !gridEl) return null;

    const insetX = 4;
    const insetY = 4;

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
        opacity: 1,
      });
    } else {
      gsap.to(slidingShapeRef.current, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
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
    const shapeWidth = currentCard ? currentCard.offsetWidth - 8 : 380;
    const shapeHeight = currentCard ? currentCard.offsetHeight - 8 : 560;

    const targetX = mouseX - shapeWidth / 2;
    const targetY = mouseY - shapeHeight / 2;

    const clampedX = Math.max(0, Math.min(gridRect.width - shapeWidth, targetX));
    const clampedY = Math.max(-10, Math.min(gridRect.height - shapeHeight + 10, targetY));

    gsap.to(slidingShapeRef.current, {
      x: clampedX,
      y: clampedY,
      width: shapeWidth,
      height: shapeHeight,
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
  }, []);

  return (
    <section className="relative w-full bg-[#F3EFEA] text-[#111111] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/5 border border-[#111111]/10 text-[#111111] text-xs font-mono uppercase tracking-eyebrow mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0038E2]" />
            <span>Campaign & Partnership Models</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-[#111111] leading-[1.08]">
            Choose your distribution horizon
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-[17px] text-[#2D2D2D] leading-relaxed max-w-xl mx-auto font-normal">
            Whether you need an explosive 30-day launch surge or a permanent compounding distribution channel — we execute both with surgical focus.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2-COLUMN INTERACTIVE GRID WITH SHARED SLIDING HOVER SHAPE                 */}
        {/* ========================================================================= */}
        <div
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridLeave}
          className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto"
        >
          {/* ========================================================================= */}
          {/* SHARED SLIDING GSAP HOVER SHAPE                                           */}
          {/* ========================================================================= */}
          <div
            ref={slidingShapeRef}
            className="pointer-events-none absolute top-0 left-0 z-0 overflow-hidden rounded-[2rem] shadow-2xl transition-[border-radius] duration-500 will-change-transform bg-[#0038E2]"
          >
            {/* Ambient Graphic Backdrop for Card 0 */}
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
                className="absolute inset-0 w-full h-full opacity-15"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M 125 16 C 220 16 265 60 265 145 L 265 265 C 265 355 190 415 95 415 C 35 415 0 365 0 285 L 0 160 C 0 65 52 16 125 16 Z"
                  fill="#EDE6DC"
                />
              </svg>
            </div>

            {/* Crossfading Layered Campaign Background Videos */}
            {campaignModels.map((model, i) => (
              <video
                key={model.id}
                ref={(el) => (videoRefs.current[i] = el)}
                src={model.videoSrc}
                muted
                loop
                playsInline
                preload="metadata"
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 z-0",
                  hoveredIndex === i ? "opacity-25 mix-blend-screen" : "opacity-0"
                )}
              />
            ))}

            {/* Gradient Mask to ensure ultra-clean contrast for text */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0038E2]/90 via-[#002FB8]/85 to-[#001D80]/95" />
          </div>

          {/* ========================================================================= */}
          {/* CAMPAIGN CARDS                                                            */}
          {/* ========================================================================= */}
          {campaignModels.map((model, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={model.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => moveToCard(index)}
                className={cn(
                  "group relative z-20 flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-[2rem] border transition-all duration-300 cursor-pointer",
                  isActive
                    ? "border-transparent text-white"
                    : "border-[#111111]/12 bg-white/70 hover:bg-white/90 text-[#111111] shadow-sm"
                )}
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors duration-300",
                        isActive
                          ? "bg-white/20 text-white border border-white/30 backdrop-blur-md"
                          : "bg-[#111111]/5 text-[#111111] border border-[#111111]/10"
                      )}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{model.duration}</span>
                    </span>

                    <span
                      className={cn(
                        "text-[11px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-full transition-colors duration-300",
                        isActive
                          ? "text-cyan-300 bg-white/10"
                          : "text-[#0038E2] bg-[#0038E2]/10 font-medium"
                      )}
                    >
                      {model.badge}
                    </span>
                  </div>

                  {/* Title & Headline */}
                  <h3
                    className={cn(
                      "font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight transition-colors duration-300",
                      isActive ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" : "text-[#111111]"
                    )}
                  >
                    {model.name}
                  </h3>

                  <p
                    className={cn(
                      "mt-3 text-sm sm:text-base leading-snug font-medium transition-colors duration-300",
                      isActive ? "text-white/90" : "text-[#333333]"
                    )}
                  >
                    {model.headline}
                  </p>

                  {/* Who It's For Highlight Box */}
                  <div
                    className={cn(
                      "mt-5 p-4 rounded-xl border transition-all duration-300 text-xs sm:text-sm leading-relaxed",
                      isActive
                        ? "bg-white/10 border-white/20 text-white/95 backdrop-blur-md"
                        : "bg-[#F3EFEA]/80 border-[#111111]/10 text-[#444444]"
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <Target
                        className={cn(
                          "w-4 h-4 mt-0.5 shrink-0 transition-colors duration-300",
                          isActive ? "text-cyan-300" : "text-[#0038E2]"
                        )}
                      />
                      <p className="font-medium italic">
                        &ldquo;{model.whoItsFor}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* What's Included List */}
                  <div className="mt-6 sm:mt-8 space-y-3.5">
                    <p
                      className={cn(
                        "text-xs font-mono uppercase tracking-wider font-semibold transition-colors duration-300",
                        isActive ? "text-white/80" : "text-[#111111]/70"
                      )}
                    >
                      What&apos;s included:
                    </p>
                    <ul className="space-y-3">
                      {model.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className={cn(
                              "w-4 h-4 mt-0.5 shrink-0 transition-colors duration-300",
                              isActive ? "text-white drop-shadow-sm" : "text-[#0038E2]"
                            )}
                          />
                          <div className="text-xs sm:text-[13px] leading-snug">
                            <span
                              className={cn(
                                "font-semibold transition-colors duration-300",
                                isActive ? "text-white" : "text-[#111111]"
                              )}
                            >
                              {item.title}
                            </span>
                            <span
                              className={cn(
                                "block text-[11px] sm:text-xs mt-0.5 transition-colors duration-300",
                                isActive ? "text-white/75" : "text-[#555555]"
                              )}
                            >
                              {item.desc}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-8 pt-6 border-t border-current/10">
                  <a
                    href={model.link}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 rounded-full py-3 px-6 text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm active:scale-95",
                      isActive
                        ? "bg-white text-[#0038E2] hover:bg-[#F3EFEA] hover:shadow-lg"
                        : "bg-[#111111] text-[#F3EFEA] hover:bg-[#0038E2] hover:text-white"
                    )}
                  >
                    <span>{model.ctaText}</span>
                    <ArrowUpRight className="h-4 w-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

