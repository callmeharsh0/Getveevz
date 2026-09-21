"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  MessageSquare,
  Flame,
  Rocket,
  TrendingUp,
  BarChart3,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    n: "01",
    phase: "PHASE 01 // DISCOVERY",
    title: "Strategy Discuss",
    desc: "Aligning on campaign goals, audience demographics, content hooks, and high-impact distribution angles.",
    icon: MessageSquare,
    badge: "Foundation",
    highlight: "Audience & Hooks",
  },
  {
    n: "02",
    phase: "PHASE 02 // PREPARATION",
    title: "Warmup Accounts",
    desc: "Algorithmic account warmup, security verification, and platform seasoning across TikTok, Reels, and Shorts.",
    icon: Flame,
    badge: "Algorithm Seasoning",
    highlight: "Zero Shadowban",
  },
  {
    n: "03",
    phase: "PHASE 03 // DEPLOYMENT",
    title: "Campaign Launching",
    desc: "Coordinated clip syndication rollout, automated scheduling, and multi-page short-form publishing.",
    icon: Rocket,
    badge: "Omni-Channel Sync",
    highlight: "Syndicated Push",
  },
  {
    n: "04",
    phase: "PHASE 04 // ACCELERATION",
    title: "Results",
    desc: "Rapid view generation, algorithmic reach acceleration, and compounding follower growth across your channels.",
    icon: TrendingUp,
    badge: "Virality Spike",
    highlight: "Exponential Reach",
  },
  {
    n: "05",
    phase: "PHASE 05 // INTELLIGENCE",
    title: "Weekly Report",
    desc: "Detailed performance breakdown, growth insights, retention analysis, and per-page metrics delivered weekly.",
    icon: BarChart3,
    badge: "Executive Briefing",
    highlight: "Weekly Audit",
  },
  {
    n: "06",
    phase: "PHASE 06 // COMMAND",
    title: "Tracking on Dashboard",
    desc: "24/7 consolidated live telemetry to monitor watch time, viral velocity, and audience conversion in real time.",
    icon: LayoutDashboard,
    badge: "24/7 Telemetry",
    highlight: "Real-Time Portal",
  },
];

/**
 * Tactical Deep Black Card with #8BA3C6 frost accent and GPU-accelerated spotlight.
 */
function TactileCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    cardRef.current.style.setProperty("--spotlight-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--spotlight-opacity", "0");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl bg-[#090E14] text-white transition-all duration-300 border border-[#8BA3C6]/20 shadow-[0_18px_45px_-10px_rgba(0,0,0,0.8)] hover:-translate-y-1 hover:border-[#8BA3C6]/50 ${className}`}
    >
      {/* Zero-rerender cursor spotlight in brand frost blue #8BA3C6 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity: "var(--spotlight-opacity, 0)",
          background:
            "radial-gradient(380px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(139, 163, 198, 0.14), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

export default function WeHandleItAll() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const laserBeamRef = useRef<HTMLDivElement>(null);
  const sparkRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Lenis & GSAP ScrollTrigger Scrub (Zero-rerender architecture) ──
  useEffect(() => {
    if (!timelineRef.current || !laserBeamRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(laserBeamRef.current, { scaleY: 1 });
      stepRefs.current.forEach((el) => el?.classList.add("is-active-step"));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        laserBeamRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
            onUpdate: (self) => {
              const progress = self.progress;

              if (sparkRef.current) {
                sparkRef.current.style.opacity =
                  progress > 0.02 && progress < 0.99 ? "1" : "0";
              }

              stepRefs.current.forEach((el, idx) => {
                if (!el) return;
                const threshold = idx / (services.length - 0.85);
                const isPassed = progress >= threshold || progress > 0.96;
                el.classList.toggle("is-active-step", isPassed);
              });
            },
          },
        }
      );
    }, timelineRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative border-y border-white/10 bg-[#090E14] text-white px-4 sm:px-6 py-28 sm:py-36 overflow-hidden"
    >
      {/* Subtle ambient frost blue aura matching #8BA3C6 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-gradient-to-b from-[#8BA3C6]/12 via-transparent to-transparent blur-[140px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#8BA3C6]/10 via-transparent to-transparent blur-[140px] z-0"
      />

      <div className="mx-auto max-w-content relative z-10">
        {/* ── Headline in Crisp White + Frost Italic (#8BA3C6) ── */}
        <div className="max-w-3xl">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-6xl tracking-tight text-white leading-[1.15] pb-1">
            From Strategizing to Creating Content,
            <br />
            <span className="italic text-[#8BA3C6]">We Handle It All.</span>
          </h2>
        </div>

        {/* ── Scroll-Driven Laser Spine Timeline with #8BA3C6 Glow ── */}
        <div ref={timelineRef} className="mt-20 sm:mt-24 relative">
          {/* Background Dim Guide Track */}
          <div className="absolute left-6 md:left-1/2 top-6 bottom-6 -translate-x-1/2 w-[2px] bg-[#8BA3C6]/20" />

          {/* Active Lenis-Scrubbed Glowing Laser Beam */}
          <div
            ref={laserBeamRef}
            className="absolute left-6 md:left-1/2 top-6 bottom-6 -translate-x-1/2 w-[2px] bg-gradient-to-b from-[#8BA3C6] via-[#8BA3C6] to-white shadow-[0_0_15px_rgba(139,163,198,0.85)] origin-top pointer-events-none"
          >
            {/* Leading Laser Spark Particle in #8BA3C6 */}
            <div
              ref={sparkRef}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#8BA3C6] shadow-[0_0_20px_rgba(139,163,198,1)] opacity-0 transition-opacity duration-200"
            >
              <span className="absolute inset-0 rounded-full bg-[#8BA3C6] animate-ping opacity-75" />
            </div>
          </div>

          <div className="space-y-12 sm:space-y-16 relative">
            {services.map(({ n, phase, title, desc, icon: Icon, badge, highlight }, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={n}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className={`step-row relative flex flex-col md:flex-row items-start md:items-center ${isEven ? "md:flex-row-reverse" : ""
                    } group`}
                >
                  {/* Content Card Side: Matching #090E14 Card with #8BA3C6 Accents */}
                  <div className="w-full md:w-[calc(50%-44px)] pl-16 md:pl-0">
                    <TactileCard className="step-card p-6 md:p-8">
                      {/* Phase & Badge Row */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="font-mono text-[11px] uppercase tracking-widest font-semibold text-[#8BA3C6]">
                          {phase}
                        </span>
                        <span className="step-badge px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase transition-all duration-300 bg-[#8BA3C6]/10 border border-[#8BA3C6]/25 text-[#8BA3C6]">
                          {badge}
                        </span>
                      </div>

                      {/* Title with Icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="step-icon-box w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-[#8BA3C6]/10 border border-[#8BA3C6]/20 text-[#8BA3C6]">
                          <Icon className="w-5 h-5 text-current" />
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                          {title}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans">
                        {desc}
                      </p>

                      {/* Bottom Highlight Tag */}
                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-[#8BA3C6]/80">
                        <CheckCircle2 className="step-check w-3.5 h-3.5 text-[#8BA3C6] transition-colors duration-300" />
                        <span>
                          Deliverable:{" "}
                          <strong className="text-white font-semibold">{highlight}</strong>
                        </span>
                      </div>
                    </TactileCard>
                  </div>

                  {/* Central Node on the Spine */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                    <div className="step-node w-11 h-11 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-500 shadow-xl bg-[#090E14] border-2 border-[#8BA3C6]/30 text-[#8BA3C6] group-hover:border-[#8BA3C6] group-hover:scale-105">
                      {n}
                    </div>
                  </div>

                  {/* Empty Opposite Half on Desktop */}
                  <div className="hidden md:block md:w-[calc(50%-44px)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
