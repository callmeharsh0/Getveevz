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
    id: "hook",
    label: "Hook — 0:42",
    solution: "Hook Extraction",
    desc: "Identifies a strong moment from the long-form content.",
    x: -300,
    y: -190,
  },
  {
    id: "reaction",
    label: "Reaction",
    solution: "Short-Form Optimization",
    desc: "Reformats the content for short-form platforms.",
    x: 300,
    y: -190,
  },
  {
    id: "insight",
    label: "Key Insight",
    solution: "Distribution",
    desc: "Positions the content for wider reach.",
    x: -300,
    y: 0,
  },
  {
    id: "bts",
    label: "Behind the Scenes",
    solution: "Repurposing",
    desc: "Extends the story across formats.",
    x: 300,
    y: 0,
  },
  {
    id: "quote",
    label: "Quote Card",
    solution: "Optimization",
    desc: "Tunes pacing and hooks for retention.",
    x: -300,
    y: 190,
  },
  {
    id: "highlight",
    label: "Highlight",
    solution: "Amplification",
    desc: "Feeds the platform algorithm consistently.",
    x: 300,
    y: 190,
  },
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
  headlinePrefix = "Your content isn't the problem.",
  headlineAccent = "Distribution is.",
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
    const label = labelRefs.current[id];
    if (inner) {
      inner.style.transform = "translateY(-6px) scale(1.05)";
      inner.style.borderColor = "rgba(139, 163, 198, 0.7)";
      inner.style.boxShadow = "0 18px 36px rgba(139, 163, 198, 0.25)";
    }
    if (label) {
      const title = label.querySelector<HTMLElement>(".solution-title");
      if (title) title.style.color = "#8BA3C6";
    }
  }, []);

  const handlePieceLeave = useCallback((id: string) => {
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    const label = labelRefs.current[id];
    if (inner) {
      inner.style.transform = "translateY(0) scale(1)";
      inner.style.borderColor = "rgba(139, 163, 198, 0.35)";
      inner.style.boxShadow = "0 12px 28px rgba(0, 0, 0, 0.4)";
    }
    if (label) {
      const title = label.querySelector<HTMLElement>(".solution-title");
      if (title) title.style.color = "#f2ece1";
    }
  }, []);

  // GSAP ScrollTrigger Sequence
  useGSAP(
    () => {
      if (!sourceRef.current || !wrapperRef.current) return;
      gsap.set(sourceRef.current, { scale: 1, opacity: 1 });

      outputs.forEach((item) => {
        const el = pieceRefs.current[item.id];
        if (el) gsap.set(el, { scale: 0, opacity: 0, x: 0, y: 0 });
        const label = labelRefs.current[item.id];
        if (label) gsap.set(label, { opacity: 0 });
      });

      Object.values(problemLabelRefs.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 10 });
      });

      Object.values(flowStepRefs.current).forEach((el) => {
        if (el) gsap.set(el, { opacity: 0, y: 12 });
      });

      if (finalLineRef.current) {
        gsap.set(finalLineRef.current, { opacity: 0, x: -24 });
      }

      if (statementRef.current) {
        gsap.set(statementRef.current, { opacity: 1, y: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Problem Badges appear & Statement fades gracefully as clips emerge
      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.08 }, 0.02 + i * 0.03);
      });

      if (statementRef.current) {
        tl.to(
          statementRef.current,
          { opacity: 0, y: -24, duration: 0.14, ease: "power2.in" },
          0.14
        );
      }

      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 0, y: -10, duration: 0.06 }, 0.18 + i * 0.02);
      });

      // 2. Shrink source video
      tl.to(
        sourceRef.current,
        { scale: 0.6, duration: 0.12, ease: "power2.inOut" },
        0.18
      );

      // 3. Burst short-form cards outward
      outputs.forEach((item, i) => {
        const el = pieceRefs.current[item.id];
        if (!el) return;
        tl.to(
          el,
          {
            x: item.x,
            y: item.y,
            scale: 1,
            opacity: 1,
            duration: 0.18,
            ease: "back.out(1.2)",
          },
          0.3 + i * 0.035
        );
      });

      // 4. Reveal descriptions
      outputs.forEach((item, i) => {
        const label = labelRefs.current[item.id];
        if (label) tl.to(label, { opacity: 1, duration: 0.08 }, 0.55 + i * 0.03);
      });

      // 5. Flow steps pipeline
      flowSteps.forEach((_, i) => {
        const el = flowStepRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.06 }, 0.78 + i * 0.045);
      });

      // 6. Stage shift & punchline reveal
      if (contentGroupRef.current) {
        tl.to(
          contentGroupRef.current,
          { x: 140, scale: 0.86, duration: 0.12, ease: "power2.out" },
          0.88
        );
      }
      if (finalLineRef.current) {
        tl.to(
          finalLineRef.current,
          { opacity: 1, x: 0, duration: 0.1, ease: "power2.out" },
          0.9
        );
      }
    },
    { scope: wrapperRef, dependencies: [outputs, problemLabels, flowSteps] }
  );

  return (
    <section className={classNames("w-full overflow-hidden bg-black text-[#f2ece1]", className)}>
      {/* ── GSAP Scroll Pinned Canvas ── */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen bg-black overflow-hidden select-none"
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
            <p className="text-sm sm:text-base md:text-lg text-[#f2ece1]/60 tracking-tight font-sans mb-1.5">
              {headlinePrefix}
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-[#f2ece1] font-display leading-[1.1]">
              Distribution{" "}
              <span className="text-[#8BA3C6]">
                {headlineAccent === "Distribution is." ? "is." : headlineAccent}
              </span>
            </h2>
          </div>
        )}

        {/* Pinned Punchline (Left Side - Revealed in Act 3) */}
        <div
          ref={finalLineRef}
          className="absolute left-[6%] top-1/2 -translate-y-1/2 max-w-[220px] sm:max-w-[280px] md:max-w-[340px] text-left z-10 font-display text-xl sm:text-2xl md:text-4xl font-medium leading-tight text-[#f2ece1]"
        >
          {punchlinePrimary}
          <br />
          <span className="text-[#8BA3C6]">{punchlineAccent}</span>
        </div>

        {/* Scaled Center Cluster */}
        <div
          ref={contentGroupRef}
          className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] -ml-[500px] -mt-[400px] scale-[0.42] xs:scale-[0.52] sm:scale-75 md:scale-90 lg:scale-100 origin-center"
        >
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

          {/* Central Long-Form Video Source Card */}
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

          {/* 6 Derivative Short-Form Cards */}
          {outputs.map((item) => {
            const isLeft = item.x < 0;
            return (
              <div
                key={item.id}
                ref={(el) => {
                  pieceRefs.current[item.id] = el;
                }}
                onMouseEnter={() => handlePieceEnter(item.id)}
                onMouseLeave={() => handlePieceLeave(item.id)}
                className="absolute top-1/2 left-1/2 w-[120px] h-[168px] -ml-[60px] -mt-[84px] z-[3] cursor-pointer"
              >
                {/* 9:16 Short Clip Card Frame */}
                <div
                  className="piece-inner w-full h-full rounded-xl bg-[#0a0a0a] border border-[#8BA3C6]/30 flex items-end p-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.4)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <span className="text-[11px] text-[#8BA3C6] tracking-wide font-mono">
                    {item.label}
                  </span>
                </div>

                {/* Card Title & Description Tooltip */}
                <div
                  ref={(el) => {
                    labelRefs.current[item.id] = el;
                  }}
                  style={{
                    [isLeft ? "right" : "left"]: "100%",
                    [isLeft ? "marginRight" : "marginLeft"]: 16,
                  }}
                  className={classNames(
                    "absolute top-1/2 -translate-y-1/2 w-40 pointer-events-none",
                    isLeft ? "text-right" : "text-left"
                  )}
                >
                  <div className="solution-title text-[13px] text-[#f2ece1] font-medium transition-colors duration-300">
                    {item.solution}
                  </div>
                  <div className="text-[11px] text-[#f2ece1]/50 mt-1 leading-snug">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Flow Pipeline Indicator */}
        <div className="absolute bottom-[6%] inset-x-0 flex justify-center items-center gap-6 z-[8] flex-wrap px-4">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-6">
              <span
                ref={(el) => {
                  flowStepRefs.current[i] = el;
                }}
                className="text-xs tracking-[0.2em] text-[#8BA3C6] uppercase font-semibold font-mono"
              >
                {step}
              </span>
              {i < flowSteps.length - 1 && (
                <span className="text-xs text-[#f2ece1]/40">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
