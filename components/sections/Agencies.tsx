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
  icon: React.ReactNode;
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
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <rect x="6" y="3" width="4" height="18" rx="1" />
        <rect x="14" y="3" width="4" height="18" rx="1" />
        <path d="M3 8h3M3 12h3M3 16h3M18 8h3M18 12h3M18 16h3" />
      </svg>
    ),
  },
  {
    id: "distribution",
    name: "Distribution",
    description:
      "Get your content in front of the right audience. Multi-channel publishing, scheduling and analytics across every major platform.",
    link: "#",
    videoSrc: "/assets/agency-video-2.mp4",
    maskType: "rounded-rect",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    id: "pr-seeding",
    name: "PR / Seeding",
    description:
      "Land press, podcasts and creator placements. Strategic seeding that turns one piece of content into a thousand earned moments.",
    link: "#",
    videoSrc: "/assets/agency-video-3.mp4",
    maskType: "arch-pill",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M3 11l18-8-8 18-2-8-8-2z" />
      </svg>
    ),
  },
];

export default function Agencies() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slidingShapeRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const previousIndexRef = useRef<number | null>(null);

  // Function to calculate relative position of target card inside grid
  const getTargetBounds = (index: number) => {
    const cardEl = cardRefs.current[index];
    const gridEl = gridRef.current;
    if (!cardEl || !gridEl) return null;

    const cardRect = cardEl.getBoundingClientRect();
    const gridRect = gridEl.getBoundingClientRect();

    // Add inset padding around card for refined floating aesthetic
    const insetX = 16;
    const insetY = 16;

    return {
      x: cardRect.left - gridRect.left + insetX,
      y: cardRect.top - gridRect.top + insetY,
      width: cardRect.width - insetX * 2,
      height: cardRect.height - insetY * 2,
    };
  };

  const handleCardEnter = (index: number) => {
    setHoveredIndex(index);
    const bounds = getTargetBounds(index);
    if (!bounds || !slidingShapeRef.current) return;

    gsap.killTweensOf(slidingShapeRef.current);

    if (previousIndexRef.current === null) {
      // 1. Initial Reveal: Set position at target card, then smoothly scale in
      gsap.set(slidingShapeRef.current, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        scale: 0.3,
        opacity: 0,
        transformOrigin: "center center",
      });

      gsap.to(slidingShapeRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    } else {
      // 2. Sliding transition: Smoothly glide across containers to new coordinates
      gsap.to(slidingShapeRef.current, {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    // Video play/pause management with smooth crossfade
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === index) {
        video.currentTime = 0;
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });

    previousIndexRef.current = index;
  };

  const handleGridLeave = () => {
    setHoveredIndex(null);
    previousIndexRef.current = null;

    if (slidingShapeRef.current) {
      gsap.killTweensOf(slidingShapeRef.current);
      gsap.to(slidingShapeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.45,
        ease: "power2.inOut",
      });
    }

    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) video.pause();
    });
  };

  // Re-sync sliding shape on window resize
  useEffect(() => {
    const handleResize = () => {
      if (hoveredIndex !== null) {
        const bounds = getTargetBounds(hoveredIndex);
        if (bounds && slidingShapeRef.current) {
          gsap.set(slidingShapeRef.current, {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [hoveredIndex]);

  // Dynamic mask/shape class depending on active agency
  const getActiveMaskClass = () => {
    if (hoveredIndex === null) return "rounded-3xl";
    const agency = agencies[hoveredIndex];
    switch (agency?.maskType) {
      case "custom-a":
        return "[clip-path:url(#custom-cutout-mask)]";
      case "rounded-rect":
        return "rounded-[2.5rem]";
      case "arch-pill":
        return "rounded-t-[7rem] rounded-b-[2.5rem]";
      default:
        return "rounded-3xl";
    }
  };

  return (
    <section className="relative w-full bg-[#F3EFEA] text-[#1A1A1A] py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* SVG CLIP-PATH DEFINITION (FOR CUSTOM CHUNKY 'a' CUTOUT IN CARD 1)        */}
      {/* ========================================================================= */}
      <svg
        className="absolute w-0 h-0 pointer-events-none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="custom-cutout-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0.12,0.05 C 0.05,0.05 0.0,0.1 0.0,0.17 L 0.0,0.7 C 0.0,0.76 0.05,0.8 0.12,0.8 L 0.25,0.8 L 0.25,0.92 C 0.25,0.97 0.29,1.0 0.36,1.0 L 0.88,1.0 C 0.95,1.0 1.0,0.96 1.0,0.89 L 1.0,0.35 C 1.0,0.29 0.95,0.25 0.88,0.25 L 0.75,0.25 L 0.75,0.13 C 0.75,0.07 0.7,0.05 0.63,0.05 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#4A4A4A]">
            What we do
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1A1A1A]">
            From raw footage to real reach.
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-[#4A4A4A] leading-relaxed">
            Three services, one mission — make your content impossible to scroll past.
            <br className="hidden sm:inline" /> Clipping, distribution and PR, working as one engine.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3-COLUMN INTERACTIVE AGENCIES GRID WITH SHARED SLIDING HOVER SHAPE       */}
        {/* ========================================================================= */}
        <div
          ref={gridRef}
          onMouseLeave={handleGridLeave}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {/* ========================================================================= */}
          {/* SHARED SLIDING GSAP HOVER SHAPE (GLIDES FROM CARD TO CARD)               */}
          {/* ========================================================================= */}
          <div
            ref={slidingShapeRef}
            style={{ transform: "scale(0)", opacity: 0 }}
            className={cn(
              "pointer-events-none absolute top-0 left-0 z-0 overflow-hidden shadow-2xl transition-[border-radius,clip-path] duration-500 will-change-transform",
              getActiveMaskClass()
            )}
          >
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
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                )}
              />
            ))}

            {/* Darkening tint overlay to guarantee contrast over any footage */}
            <div className="absolute inset-0 bg-black/25 backdrop-brightness-95" />
          </div>

          {/* ========================================================================= */}
          {/* AGENCY CARDS (FOREGROUND CONTENT)                                         */}
          {/* ========================================================================= */}
          {agencies.map((agency, index) => {
            const isActive = hoveredIndex === index;
            return (
              <div
                key={agency.id}
                ref={(el) => (cardRefs.current[index] = el)}
                onMouseEnter={() => handleCardEnter(index)}
                onClick={() => {
                  if (hoveredIndex === index) {
                    handleGridLeave();
                  } else {
                    handleCardEnter(index);
                  }
                }}
                className="group relative z-10 flex flex-col items-center justify-center min-h-[440px] sm:min-h-[480px] md:min-h-[520px] p-8 sm:p-10 cursor-pointer overflow-hidden rounded-3xl transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center text-center max-w-xs transition-transform duration-300 group-hover:scale-[1.02]">
                  {/* Icon + Title Row */}
                  <div
                    className={cn(
                      "mb-5 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300",
                      isActive
                        ? "border-white/80 bg-white/10 text-white backdrop-blur-md"
                        : "border-[#1A1A1A]/30 bg-white/40 text-[#1A1A1A]"
                    )}
                  >
                    {agency.icon}
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight transition-colors duration-300",
                      isActive ? "text-white drop-shadow-md" : "text-[#1A1A1A]"
                    )}
                  >
                    {agency.name}
                  </h3>

                  {/* Description Paragraph */}
                  <p
                    className={cn(
                      "mt-4 text-xs sm:text-sm leading-relaxed transition-colors duration-300 font-medium",
                      isActive ? "text-white/90 drop-shadow-sm" : "text-[#4A4A4A]"
                    )}
                  >
                    {agency.description}
                  </p>

                  {/* Pill-shaped Button */}
                  <a
                    href={agency.link}
                    onClick={(e) => e.stopPropagation()}
                    className={cn(
                      "mt-8 inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 border",
                      isActive
                        ? "border-white bg-white/20 text-white backdrop-blur-md hover:bg-white hover:text-[#1A1A1A] shadow-lg"
                        : "border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F3EFEA]"
                    )}
                  >
                    <span>Find out more</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
