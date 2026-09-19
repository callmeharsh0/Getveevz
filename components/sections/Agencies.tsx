"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Agency {
  id: string;
  name: string;
  description: string;
  link: string;
  videoSrc: string;
  maskType: "custom-a" | "rounded-rect" | "arch-pill";
}

const agencies: Agency[] = [
  {
    id: "clipping",
    name: "Clipping",
    description:
      "Cut, remix and reformat your long-form footage into thumb-stopping short-form clips — ready for Reels, Shorts and TikTok.",
    link: "#",
    videoSrc: "/assets/agency-video-1.mp4",
    maskType: "custom-a",
  },
  {
    id: "distribution",
    name: "Distribution",
    description:
      "Multi-channel publishing, scheduling and algorithmic distribution across Instagram, YouTube and TikTok.",
    link: "#",
    videoSrc: "/assets/agency-video-2.mp4",
    maskType: "rounded-rect",
  },
  {
    id: "pr-seeding",
    name: "PR & Seeding",
    description:
      "Land creator placements, podcasts and press. Strategic seeding that turns one piece of content into a thousand earned moments.",
    link: "#",
    videoSrc: "/assets/agency-video-3.mp4",
    maskType: "arch-pill",
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
    <section className="relative w-full bg-[#F3EFEA] text-[#111111] py-28 sm:py-36 px-6 sm:px-8 lg:px-12 overflow-hidden select-none">
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
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-[#111111] leading-[1.08]">
            The services we provide
          </h2>
          <p className="mt-5 text-sm sm:text-base md:text-[17px] text-[#2D2D2D] leading-relaxed max-w-xl mx-auto font-normal">
            We specialise in clipping, multi-platform distribution, and creator PR.
            <br className="hidden sm:inline" /> Working as one unified engine – turning one piece of long-form footage into millions of views.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN INTERACTIVE AGENCIES GRID WITH SHARED SLIDING HOVER SHAPE       */}
        {/* ========================================================================= */}
        <div
          ref={gridRef}
          onMouseMove={handleGridMouseMove}
          onMouseLeave={handleGridLeave}
          style={{ perspective: 1200 }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 items-stretch max-w-6xl mx-auto"
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
            return (
              <div
                key={agency.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => moveToCard(index)}
                className="group relative z-20 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[500px] md:min-h-[530px] px-6 sm:px-8 py-12 cursor-pointer rounded-3xl"
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

                  {/* Description: Smoothly collapses on hover so button slides right below the main headline */}
                  <div
                    className={cn(
                      "grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden",
                      isActive
                        ? "grid-rows-[0fr] opacity-0 my-0 -translate-y-2 pointer-events-none"
                        : "grid-rows-[1fr] opacity-100 mt-5 mb-8 translate-y-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-[15px] leading-relaxed max-w-[270px] sm:max-w-[290px] mx-auto font-normal text-[#333333]">
                        {agency.description}
                      </p>
                    </div>
                  </div>

                  {/* Pill-shaped Button: Slides smoothly below main headline when description collapses */}
                  <a
                    href={agency.link}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm sm:text-[15px] font-medium transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border",
                      isActive
                        ? "mt-4 sm:mt-5 border-white/85 bg-white/15 text-white hover:bg-white hover:text-[#0038E2] shadow-md backdrop-blur-md"
                        : "mt-0 border-[#111111] bg-transparent text-[#111111] hover:bg-[#111111] hover:text-[#F3EFEA]"
                    )}
                  >
                    <span>Find out more</span>
                    <ArrowUpRight className="h-4 w-4 stroke-[1.6] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
