"use client";

import React, { useRef, useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Taste: gate motion behind user OS preference (Section 6.B).
// Keep the API surface the same so nothing downstream breaks.
function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  videoSrc?: string;
  videoPoster?: string;
  showIntroHeader?: boolean;
  headlinePrefix?: string;
  headlineAccent?: string;
  punchlinePrimary?: string;
  punchlineAccent?: string;
  outputs?: OutputNode[];
  problemLabels?: ProblemBadge[];
  flowSteps?: string[];
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

export default function DistributionFlow({
  videoSrc = "/assets/distribution.mp4",
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
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
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

  // Statement Header intersection observer
  useEffect(() => {
    if (!showIntroHeader) return;
    const el = statementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHeaderVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [showIntroHeader]);

  // Reduced-motion detection (Section 6.B - mandatory for MOTION_INTENSITY > 3).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // 3D Parallax Tilt Effect on Source Video
  // Taste: rAF-throttled so a fast pointer doesn't queue 60+ style writes/sec
  // on the same frame. Behaviour is identical, perf is smoother on mobile.
  const tiltRafRef = useRef<number | null>(null);
  const handleSourceMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion) return;
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      const next = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateZ(12px)`;
      if (tiltRafRef.current !== null) return;
      tiltRafRef.current = window.requestAnimationFrame(() => {
        el.style.transform = next;
        tiltRafRef.current = null;
      });
    },
    [reducedMotion]
  );

  const handleSourceMouseLeave = useCallback(() => {
    if (tiltRafRef.current !== null) {
      window.cancelAnimationFrame(tiltRafRef.current);
      tiltRafRef.current = null;
    }
    const el = tiltRef.current;
    if (el) {
      el.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  }, []);

  useEffect(() => {
    return () => {
      if (tiltRafRef.current !== null) {
        window.cancelAnimationFrame(tiltRafRef.current);
      }
    };
  }, []);

  // Card Hover Interactivity
  const handlePieceEnter = useCallback((id: string) => {
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    const label = labelRefs.current[id];
    if (inner) {
      inner.style.transform = "translateY(-6px) scale(1.05)";
      inner.style.borderColor = "rgba(139, 163, 197, 0.7)";
      inner.style.boxShadow = "0 20px 45px rgba(2, 18, 47, 0.8), 0 0 25px rgba(139, 163, 197, 0.3)";
    }
    if (label) {
      const title = label.querySelector<HTMLElement>(".solution-title");
      if (title) title.style.color = "#8BA3C5";
    }
  }, []);

  const handlePieceLeave = useCallback((id: string) => {
    const inner = pieceRefs.current[id]?.querySelector<HTMLElement>(".piece-inner");
    const label = labelRefs.current[id];
    if (inner) {
      inner.style.transform = "translateY(0) scale(1)";
      inner.style.borderColor = "rgba(139, 163, 197, 0.25)";
      inner.style.boxShadow = "0 12px 28px rgba(2, 18, 47, 0.5)";
    }
    if (label) {
      const title = label.querySelector<HTMLElement>(".solution-title");
      if (title) title.style.color = "#F0ECDD";
    }
  }, []);

  // GSAP ScrollTrigger Sequence
  useGSAP(
    () => {
      if (!sourceRef.current) return;

      // Reduced-motion fallback: skip the scroll-driven choreography and
      // present the composed final state immediately. No pin, no scrub.
      if (reducedMotion) {
        gsap.set(sourceRef.current, { scale: 0.6, opacity: 1 });
        outputs.forEach((item) => {
          const el = pieceRefs.current[item.id];
          if (el) gsap.set(el, { x: item.x, y: item.y, scale: 1, opacity: 1 });
          const label = labelRefs.current[item.id];
          if (label) gsap.set(label, { opacity: 1 });
        });
        Object.values(problemLabelRefs.current).forEach((el) => {
          if (el) gsap.set(el, { opacity: 0 });
        });
        Object.values(flowStepRefs.current).forEach((el) => {
          if (el) gsap.set(el, { opacity: 1, y: 0 });
        });
        if (finalLineRef.current) {
          gsap.set(finalLineRef.current, { opacity: 1, x: 0 });
        }
        if (contentGroupRef.current) {
          gsap.set(contentGroupRef.current, { x: 140, scale: 0.86 });
        }
        return;
      }

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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
        },
      });

      // 1. Problem Badges appear & exit
      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.08 }, 0.02 + i * 0.03);
      });
      problemLabels.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 0, y: -10, duration: 0.06 }, 0.16 + i * 0.02);
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
    { scope: wrapperRef, dependencies: [outputs, problemLabels, flowSteps, reducedMotion] }
  );

  return (
    <section className={`w-full overflow-hidden bg-[#090e14] text-foreground ${className}`}>
      {/* ── Statement Header ── */}
      {showIntroHeader && (
        <div
          ref={statementRef}
          className="min-h-[45vh] flex items-center justify-center text-center px-6 py-24 relative z-10"
        >
          <div
            className={`max-w-3xl mx-auto transition-all duration-1000 ease-out ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-6"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border/80 text-[11px] sm:text-xs font-mono uppercase tracking-eyebrow text-frost mb-6 backdrop-blur-md">
              <span>The Distribution Problem</span>
            </div>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-normal text-muted tracking-tight font-display max-w-xl mx-auto leading-relaxed">
              {headlinePrefix}
            </h2>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-medium mt-3 tracking-tight text-moonlight font-display leading-[1.05]">
              Distribution{" "}
              <span className="text-frost italic">{headlineAccent}</span>
            </h2>
          </div>
        </div>
      )}

      {/* ── GSAP Scroll Pinned Canvas ── */}
      <div
        ref={wrapperRef}
        className="relative w-full h-screen bg-[#090e14] overflow-hidden select-none"
      >
        {/* Ambient Depth Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(73,91,125,0.22),transparent_65%)] blur-2xl"
        />

        {/* Pinned Punchline (Left Side) */}
        <div
          ref={finalLineRef}
          className="absolute left-[6%] top-1/2 -translate-y-1/2 max-w-[340px] text-left z-20 font-display text-2xl sm:text-3xl md:text-5xl font-medium leading-tight text-moonlight tracking-tight"
        >
          {punchlinePrimary}
          <br />
          <span className="text-frost font-medium">{punchlineAccent}</span>
        </div>

        {/* Scaled Center Cluster */}
        <div
          ref={contentGroupRef}
          className="absolute top-1/2 left-1/2 w-[1000px] h-[800px] -ml-[500px] -mt-[400px]"
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
              className="absolute -translate-x-1/2 -translate-y-1/2 text-[10px] sm:text-xs font-medium tracking-eyebrow uppercase text-black border border-white px-3.5 py-1.5 rounded-full bg-white z-[6] whitespace-nowrap shadow-lg"
            >
              {p.text}
            </div>
          ))}

          {/* Central Long-Form Video Source Card */}
          <div
            ref={sourceRef}
            className="absolute top-1/2 left-1/2 w-[360px] h-[203px] -ml-[180px] -mt-[101px] rounded-lg overflow-hidden bg-surface border border-frost/30 shadow-[0_24px_60px_rgba(2,18,47,0.95)] z-[5]"
          >
            <div
              ref={tiltRef}
              onMouseMove={handleSourceMouseMove}
              onMouseLeave={handleSourceMouseLeave}
              className="w-full h-full transition-transform duration-300 ease-out relative group"
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
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-oxford/40 via-transparent to-white/10" />
              <div className="pointer-events-none absolute bottom-2.5 left-3 rounded-full border border-border/80 bg-oxford/80 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-eyebrow text-frost backdrop-blur-md">
                Long-Form Master
              </div>
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
                className="absolute top-1/2 left-1/2 w-[124px] h-[172px] -ml-[62px] -mt-[86px] z-[4] cursor-pointer group"
              >
                {/* 9:16 Short Clip Card Frame */}
                <div
                  className="piece-inner w-full h-full rounded-lg bg-surface/90 border border-frost/25 flex flex-col justify-between p-2 shadow-[0_12px_28px_rgba(2,18,47,0.5)] transition-all duration-300 ease-out backdrop-blur-md overflow-hidden"
                >
                  <div className="w-full flex-1 rounded-sm bg-gradient-to-br from-storm via-oxford to-oxford border border-white/5 flex items-center justify-center relative overflow-hidden" />
                  <span className="text-[10.5px] text-frost tracking-wider uppercase font-mono font-medium truncate pt-1.5 px-0.5 leading-tight">
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
                  className={`absolute top-1/2 -translate-y-1/2 w-44 pointer-events-none ${
                    isLeft ? "text-right" : "text-left"
                  }`}
                >
                  <div className="solution-title text-xs sm:text-sm text-moonlight font-display font-medium tracking-tight transition-colors duration-300">
                    {item.solution}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted font-body mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Flow Pipeline Indicator */}
        <div className="absolute bottom-[6%] inset-x-0 flex justify-center items-center gap-4 sm:gap-6 z-[8] flex-wrap px-4">
          {flowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 sm:gap-5">
              <span
                ref={(el) => {
                  flowStepRefs.current[i] = el;
                }}
                className="text-[11px] sm:text-xs tracking-eyebrow text-frost uppercase font-semibold font-mono bg-surface/80 px-3 py-1 rounded-full border border-border/80 backdrop-blur-md shadow-sm"
              >
                {step}
              </span>
              {i < flowSteps.length - 1 && (
                <span className="text-xs font-mono text-muted/50">→</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
