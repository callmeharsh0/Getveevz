"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Safe client-side plugin registration
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Simple internal classnames merger (zero dependencies)
function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export interface OutputNode {
  id: string;
  label: string;
  solution: string;
  desc: string;
  x: number;
  y: number;
  rot?: number;
  scale?: number;
  videoSrc?: string;
}

export interface ProblemBadge {
  text: string;
  x: number;
  y: number;
}

export interface DistributionFlowProps {
  /** Video source url for center long-form video */
  videoSrc?: string;
  /** Poster image before video loads */
  videoPoster?: string;
  /** Whether to show the intro statement above the pinned canvas */
  showIntroHeader?: boolean;
  /** Top line of the intro statement */
  headlinePrefix?: string;
  /** Highlighted accent word in intro statement */
  headlineAccent?: string;
  /** Primary line of the pinned punchline */
  punchlinePrimary?: string;
  /** Highlighted accent word of pinned punchline */
  punchlineAccent?: string;
  /** Custom output clip cards */
  outputs?: OutputNode[];
  /** Custom problem badges around the video */
  problemLabels?: ProblemBadge[];
  /** Custom bottom pipeline steps */
  flowSteps?: string[];
  /** Additional container className */
  className?: string;
}

const DEFAULT_OUTPUTS: OutputNode[] = [
  {
    id: "clip-1",
    label: "01",
    solution: "",
    desc: "",
    x: 100,
    y: -140,
    rot: -5.5,
    scale: 0.94,
    videoSrc: "/assets/Reels/future-of-payment.mp4",
  },
  {
    id: "clip-2",
    label: "02",
    solution: "",
    desc: "",
    x: 280,
    y: -260,
    rot: 4.5,
    scale: 1.02,
    videoSrc: "/assets/Reels/start-using-ai-zero-rupees.mp4",
  },
  {
    id: "clip-3",
    label: "03",
    solution: "",
    desc: "",
    x: 520,
    y: -150,
    rot: -6,
    scale: 1.05,
    videoSrc: "/assets/Reels/ai-coding-business.mp4",
  },
  {
    id: "clip-4",
    label: "04",
    solution: "",
    desc: "",
    x: 360,
    y: 15,
    rot: 6.5,
    scale: 0.98,
    videoSrc: "/assets/Reels/viral-maggi-secret.mp4",
  },
  {
    id: "clip-5",
    label: "05",
    solution: "",
    desc: "",
    x: 130,
    y: 190,
    rot: 4,
    scale: 0.95,
    videoSrc: "/assets/Reels/rachitroo-comedy-clip.mp4",
  },
  {
    id: "clip-6",
    label: "06",
    solution: "",
    desc: "",
    x: 490,
    y: 230,
    rot: -5,
    scale: 1.03,
    videoSrc: "/assets/Reels/indian-parents-reality.mp4",
  },
];

const CONNECTION_SEGMENTS = [
  // Clip 1: Inner mid-high
  { id: "line-1", path: "M 368 360 C 425 360, 470 260, 537 260", startX: 368, startY: 360, endX: 537, endY: 260, delay: 0 },
  // Clip 2: Upper middle, elevated
  { id: "line-2", path: "M 360 339 C 480 230, 590 140, 717 140", startX: 360, startY: 339, endX: 717, endY: 140, delay: 0.2 },
  // Clip 3: Far top-right
  { id: "line-3", path: "M 368 380 C 560 380, 760 250, 957 250", startX: 368, startY: 380, endX: 957, endY: 250, delay: 0.35 },
  // Clip 4: Center-right anchor
  { id: "line-4", path: "M 368 405 C 510 405, 650 415, 797 415", startX: 368, startY: 405, endX: 797, endY: 415, delay: 0.5 },
  // Clip 5: Inner mid-low
  { id: "line-5", path: "M 368 435 C 440 435, 490 590, 567 590", startX: 368, startY: 435, endX: 567, endY: 590, delay: 0.65 },
  // Clip 6: Far bottom-right
  { id: "line-6", path: "M 360 461 C 550 540, 740 630, 927 630", startX: 360, startY: 461, endX: 927, endY: 630, delay: 0.8 },
];

const DEFAULT_PROBLEM_LABELS: ProblemBadge[] = [
  { text: "Low Reach", x: -260, y: -70 },
  { text: "Lost Moments", x: 260, y: -70 },
  { text: "Limited Distribution", x: 0, y: 150 },
];

const DEFAULT_FLOW_STEPS: string[] = [
  "EXTRACT",
  "OPTIMIZE",
  "REPURPOSE",
  "DISTRIBUTE",
];

/**
 * DistributionFlow (Standalone TypeScript + Tailwind Component)
 * 
 * An interactive, scroll-pinned section showing how 1 raw long-form video
 * is extracted, optimized, and multiplied into 6 short-form clips.
 */
export default function DistributionFlow({
  videoSrc = "/assets/clipping.mp4",
  videoPoster = "",
  showIntroHeader = true,
  headlinePrefix = "Your content isn't the problem",
  headlineAccent = "target the right audience",
  punchlinePrimary = "ONE PIECE OF CONTENT.",
  punchlineAccent = "INFINITE REACH.",
  outputs = DEFAULT_OUTPUTS,
  problemLabels = DEFAULT_PROBLEM_LABELS,
  flowSteps = DEFAULT_FLOW_STEPS,
  className = "",
}: DistributionFlowProps) {
  const statementRef = useRef<HTMLDivElement | null>(null);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const contentGroupRef = useRef<HTMLDivElement | null>(null);
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const tiltRef = useRef<HTMLDivElement | null>(null);
  const pieceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const problemLabelRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const flowStepRefs = useRef<Record<number, HTMLSpanElement | null>>({});
  const finalLineRef = useRef<HTMLDivElement | null>(null);
  const punchline1Ref = useRef<HTMLDivElement | null>(null);
  const punchline2Ref = useRef<HTMLDivElement | null>(null);
  const punchline3Ref = useRef<HTMLDivElement | null>(null);
  const punchline4Ref = useRef<HTMLDivElement | null>(null);
  const linesGroupRef = useRef<SVGSVGElement | null>(null);

  // 3D Parallax Tilt Effect on Source Video
  const handleSourceMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateZ(12px)`;
    },
    []
  );

  const handleSourceMouseLeave = useCallback(() => {
    const el = tiltRef.current;
    if (el) {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  }, []);

  // Card Hover Interactivity
  const handlePieceEnter = useCallback((id: string) => {
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    if (inner) {
      inner.style.transform = "translateY(-6px) scale(1.05)";
      inner.style.borderColor = "rgba(139, 163, 198, 0.7)";
      inner.style.boxShadow = "0 18px 36px rgba(139, 163, 198, 0.25)";
    }
  }, []);

  const handlePieceLeave = useCallback((id: string) => {
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    if (inner) {
      inner.style.transform = "translateY(0) scale(1)";
      inner.style.borderColor = "rgba(139, 163, 198, 0.35)";
      inner.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.4)";
    }
  }, []);

  // GSAP ScrollTrigger Sequence
  useGSAP(
    () => {
      if (!sourceRef.current || !wrapperRef.current) return;
      gsap.set(sourceRef.current, { scale: 1, opacity: 1, x: 0, y: 0 });

      outputs.forEach((item) => {
        const el = pieceRefs.current[item.id];
        if (el) gsap.set(el, { scale: 0, opacity: 0, x: 0, y: 0 });
      });

      Object.values(problemLabelRefs.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 10 });
      });

      Object.values(flowStepRefs.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 12 });
      });

      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

      if (punchline1Ref.current) gsap.set(punchline1Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });
      if (punchline2Ref.current) gsap.set(punchline2Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });
      if (punchline3Ref.current) gsap.set(punchline3Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });
      if (punchline4Ref.current) gsap.set(punchline4Ref.current, { opacity: 0, y: isMobile ? -14 : 20 });

      if (finalLineRef.current) {
        gsap.set(finalLineRef.current, {
          opacity: 1,
        });
      }

      if (statementRef.current) {
        gsap.set(statementRef.current, { opacity: 1, y: 0 });
      }

      if (linesGroupRef.current) {
        gsap.set(linesGroupRef.current, { opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Problem Badges appear & Statement fades gracefully as clips emerge
      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.05 }, 0.01 + i * 0.015);
      });

      if (statementRef.current) {
        tl.to(
          statementRef.current,
          { opacity: 0, y: -20, duration: 0.06, ease: "power2.in" },
          0.06
        );
      }

      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 0, y: -10, duration: 0.04 }, 0.07 + i * 0.015);
      });

      // 2. Shrink source video & move smoothly to left
      tl.to(
        sourceRef.current,
        { scale: 0.58, x: -240, duration: 0.10, ease: "power2.inOut" },
        0.08
      );

      // 3. Burst short-form cards outward to the right side
      if (linesGroupRef.current) {
        tl.to(
          linesGroupRef.current,
          { opacity: 1, duration: 0.12, ease: "power2.out" },
          0.12
        );
      }

      outputs.forEach((item, i) => {
        const el = pieceRefs.current[item.id];
        if (!el) return;
        tl.to(
          el,
          {
            x: item.x,
            y: item.y,
            rotation: item.rot || 0,
            scale: item.scale || 1,
            opacity: 1,
            duration: 0.14,
            ease: "back.out(1.2)",
          },
          0.12 + i * 0.02
        );
      });

      // 4. Shift content group slightly right to make room for punchline on left
      if (contentGroupRef.current) {
        tl.to(
          contentGroupRef.current,
          isMobile
            ? { x: 0, y: 36, scale: 0.30, duration: 0.10, ease: "power2.out" }
            : { x: 75, scale: 0.92, duration: 0.10, ease: "power2.out" },
          0.20
        );
      }

      // 5. Flow steps pipeline synchronized with narrative
      flowSteps.forEach((_, i) => {
        const el = flowStepRefs.current[i];
        const stepMilestones = [0.22, 0.42, 0.62, 0.82];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.04 }, stepMilestones[i] ?? (0.22 + i * 0.2));
      });

      // 6. Progressive Narrative: "You want leads" -> "you want conversion" -> "you want reach" -> "we have done it before"
      // Phase 1: "You want leads"
      if (punchline1Ref.current) {
        tl.to(
          punchline1Ref.current,
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.22
        );
        tl.to(
          punchline1Ref.current,
          { opacity: 0, y: isMobile ? 12 : -16, duration: 0.04, ease: "power2.in" },
          0.38
        );
      }

      // Phase 2: "you want conversion"
      if (punchline2Ref.current) {
        tl.to(
          punchline2Ref.current,
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.42
        );
        tl.to(
          punchline2Ref.current,
          { opacity: 0, y: isMobile ? 12 : -16, duration: 0.04, ease: "power2.in" },
          0.58
        );
      }

      // Phase 3: "you want reach"
      if (punchline3Ref.current) {
        tl.to(
          punchline3Ref.current,
          { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
          0.62
        );
        tl.to(
          punchline3Ref.current,
          { opacity: 0, y: isMobile ? 12 : -16, duration: 0.04, ease: "power2.in" },
          0.78
        );
      }

      // Phase 4: "we have done it before"
      if (punchline4Ref.current) {
        tl.to(
          punchline4Ref.current,
          { opacity: 1, y: 0, duration: 0.07, ease: "back.out(1.3)" },
          0.82
        );
      }
    },
    { scope: wrapperRef, dependencies: [outputs, problemLabels, flowSteps] }
  );

  return (
    <section id="distribution" className={classNames("w-full overflow-hidden bg-[#090e14] text-[#f2ece1]", className)}>
      {/* Pinned Scroll Sequence (GSAP Controlled) */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen bg-[#090e14] overflow-hidden select-none"
      >
        {/* Ambient Depth Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,163,198,0.12),transparent_70%)] blur-2xl z-[1]"
        />

        {/* Integrated Intro Statement (Act 1: Centered Above Video on Entry) */}
        {showIntroHeader && (
          <div
            ref={statementRef}
            className="absolute top-[7%] sm:top-[9%] inset-x-0 mx-auto text-center z-20 pointer-events-none px-6 max-w-4xl"
          >
            <p className="text-base sm:text-lg md:text-xl text-[#f2ece1]/75 tracking-tight font-sans mb-1 leading-tight font-normal">
              {headlinePrefix}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-[44px] font-semibold tracking-tight text-[#f2ece1] font-display leading-[1.1]">
              We make sure we{" "}
              <span className="text-[#8BA3C6]">
                target the right audience
              </span>
            </h2>
          </div>
        )}

        {/* Pinned Progressive Punchline (Top-centered on Mobile, Left Side on Desktop) */}
        <div
          ref={finalLineRef}
          className="absolute top-[8%] sm:top-[10%] md:top-1/2 md:-translate-y-1/2 inset-x-4 md:inset-x-auto md:left-[9%] lg:left-[11%] xl:left-[12%] text-center md:text-left max-w-sm sm:max-w-md md:max-w-[420px] lg:max-w-[460px] mx-auto md:mx-0 z-20 pointer-events-none"
        >
          <div className="relative h-[96px] sm:h-[110px] md:h-[130px] w-full flex items-center justify-center md:justify-start">
            {/* Phase 1: You want leads */}
            <div
              ref={punchline1Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">You want</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">leads?</span>
            </div>

            {/* Phase 2: you want conversion */}
            <div
              ref={punchline2Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">You want</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">conversion?</span>
            </div>

            {/* Phase 3: you want reach */}
            <div
              ref={punchline3Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">You want</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">reach?</span>
            </div>

            {/* Phase 4: we have done it before */}
            <div
              ref={punchline4Ref}
              className="absolute inset-0 flex flex-col justify-center text-center md:text-left font-display text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-medium leading-[1.15] text-[#f2ece1] tracking-tight"
            >
              <span className="whitespace-nowrap">We have</span>
              <span className="whitespace-nowrap text-[#8BA3C6] font-semibold">done it before</span>
            </div>
          </div>
        </div>

        {/* Scaled Center Cluster */}
        <div
          ref={contentGroupRef}
          className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] -ml-[500px] -mt-[400px] scale-[0.32] xs:scale-[0.40] sm:scale-70 md:scale-90 lg:scale-100 origin-center"
        >
          {/* Animated Dotted Connection Lines with Moving Dots Originating from Main Video */}
          <svg
            ref={linesGroupRef}
            viewBox="0 0 1000 800"
            className="pointer-events-none absolute inset-0 w-full h-full z-[2] overflow-visible"
            fill="none"
          >
            <style>{`
              @keyframes flowDotsOutward {
                from {
                  stroke-dashoffset: 0;
                }
                to {
                  stroke-dashoffset: -24;
                }
              }
              .animate-flowing-dots {
                animation: flowDotsOutward 1.2s linear infinite;
              }
            `}</style>
            {CONNECTION_SEGMENTS.map((seg) => (
              <g key={seg.id}>
                {/* Subtle static track */}
                <path
                  d={seg.path}
                  stroke="rgba(242, 236, 225, 0.18)"
                  strokeWidth="1.5"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                />
                {/* Moving dots continuously streaming outward to the right */}
                <path
                  d={seg.path}
                  stroke="rgba(242, 236, 225, 0.7)"
                  strokeWidth="2"
                  strokeDasharray="4 8"
                  strokeLinecap="round"
                  className="animate-flowing-dots"
                />
                {/* Pulse dot traveling along each segment */}
                <circle r="2.5" fill="#f2ece1">
                  <animateMotion
                    path={seg.path}
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin={`${seg.delay}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.95;0.95;0"
                    keyTimes="0;0.12;0.88;1"
                    dur="1.8s"
                    repeatCount="indefinite"
                    begin={`${seg.delay}s`}
                  />
                </circle>
                {/* Origin & Destination connector dots */}
                <circle cx={seg.startX} cy={seg.startY} r="3" fill="#f2ece1" opacity="0.85" />
                <circle cx={seg.endX} cy={seg.endY} r="2.5" fill="#f2ece1" opacity="0.65" />
              </g>
            ))}
          </svg>

          {/* Floating Problem Pill Badges */}
          {problemLabels.map((p, i) => (
            <div
              key={p.text}
              ref={(el) => {
                problemLabelRefs.current[i] = el;
              }}
              style={{
                top: `calc(50% + ${p.y}px)`,
                left: `calc(50% + ${p.x}px)`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-xs tracking-wider uppercase text-black border border-white px-3.5 py-1.5 rounded-full bg-white font-medium shadow-lg z-[6] whitespace-nowrap"
            >
              {p.text}
            </div>
          ))}

          {/* Central Long-Form Video Source Card (Glides to left upon scroll) */}
          <div
            ref={sourceRef}
            className="absolute top-1/2 left-1/2 w-[360px] h-[203px] -ml-[180px] -mt-[101px] rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] z-[5]"
          >
            <div
              ref={tiltRef}
              onMouseMove={handleSourceMouseMove}
              onMouseLeave={handleSourceMouseLeave}
              className="w-full h-full transition-transform duration-300 ease-out"
            >
              <video
                src={videoSrc}
                poster={videoPoster}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 6 Derivative Short-Form Cards (All moved to right side, clean minimal aesthetic) */}
          {outputs.map((item) => (
            <div
              key={item.id}
              ref={(el) => {
                pieceRefs.current[item.id] = el;
              }}
              onMouseEnter={() => handlePieceEnter(item.id)}
              onMouseLeave={() => handlePieceLeave(item.id)}
              className="absolute top-1/2 left-1/2 w-[126px] h-[224px] -ml-[63px] -mt-[112px] aspect-[9/16] z-[3] cursor-pointer group"
            >
              {/* 9:16 Short Clip Card Frame with Live Video Reel */}
              <div className="piece-inner relative w-full h-full rounded-xl overflow-hidden bg-[#070b10] border border-[#8BA3C6]/30 shadow-[0_12px_28px_rgba(0,0,0,0.6)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-[#8BA3C6]/80 group-hover:shadow-[0_18px_40px_rgba(139,163,198,0.25)]">
                {/* Background Reel Video */}
                {item.videoSrc ? (
                  <video
                    src={item.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-b from-[#141d2b]/80 via-[#0a0f16]/95 to-[#06090d]" />
                )}

                {/* Subtle Vignette & Gradient Overlays */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Flow Pipeline Indicator */}
        <div className="absolute bottom-[3%] sm:bottom-[6%] inset-x-0 flex justify-center items-center gap-2 sm:gap-6 z-[8] flex-wrap px-2 sm:px-4">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-2 sm:gap-6">
              <span
                ref={(el) => {
                  flowStepRefs.current[i] = el;
                }}
                className="text-[9px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] text-[#8BA3C6] uppercase font-semibold font-mono"
              >
                {step}
              </span>
              {i < flowSteps.length - 1 && (
                <span className="text-[9px] sm:text-xs text-[#f2ece1]/40">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
