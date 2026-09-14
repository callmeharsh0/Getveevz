"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Clock, TrendingUp, Zap, Sparkles, CheckCircle2, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AgencyInfoCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate Card 1 scaling and dimming as Card 2 scrolls up over it
      if (card1Ref.current && card2Ref.current) {
        gsap.to(card1Ref.current, {
          scale: 0.96,
          opacity: 0.4,
          filter: "blur(3px)",
          ease: "none",
          scrollTrigger: {
            trigger: card2Ref.current,
            start: "top 80%",
            end: "top 25%",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="campaign-models"
      className="relative w-full overflow-hidden bg-[#090e14] py-24 sm:py-32 md:py-40 px-4 sm:px-8 lg:px-12"
    >
      {/* Ambient background depth with site theme palette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-frost/5 blur-[170px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[400px] bg-surface/30 blur-[150px] rounded-full"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/[0.04] border border-border text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-frost backdrop-blur-md mb-6 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-frost" />
            <span>Campaign Architecture</span>
          </span>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-moonlight leading-[1.08]">
            Two distinct vehicles.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-frost via-moonlight to-white">
              Engineered for reach.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed font-normal">
            Deep-dive specifications for our ongoing growth retainer and time-compressed PR sprint.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* STACKING CARDS: Architectural Sharp Edges (Zero Corner Curves)            */}
        {/* ========================================================================= */}
        <div className="relative flex flex-col gap-12 sm:gap-16 pb-12">
          {/* ─────────────────────────────────────────────────────────────────────── */}
          {/* CARD 1: LONG TERM CAMPAIGN                                             */}
          {/* ─────────────────────────────────────────────────────────────────────── */}
          <div
            ref={card1Ref}
            className="sticky top-20 sm:top-28 z-10 origin-top will-change-transform transition-all duration-300"
          >
            {/* Architectural Outer Shell: Clean Rectangular Frame (Zero Corner Curves) */}
            <div className="group relative rounded-none border border-border/90 bg-surface/30 p-[1px] shadow-[0_24px_60px_rgba(0,0,0,0.7)]">
              {/* Inner Core: Surface Tone & Hairline Inset */}
              <div className="rounded-none bg-[#0a1017] p-6 sm:p-10 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] border border-border/40">
                {/* Card Top Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-none bg-surface border border-border text-frost font-mono text-xs font-semibold">
                      01
                    </span>
                    <div>
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-frost font-medium">
                        Retainer &amp; Compounding Growth
                      </span>
                      <h3 className="font-display text-2xl sm:text-4xl font-bold text-moonlight uppercase tracking-tight">
                        Long term
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-surface/80 border border-border text-xs font-mono text-frost">
                    <TrendingUp className="w-3.5 h-3.5 text-frost" />
                    <span>CPM Growth Model</span>
                  </div>
                </div>

                {/* Primary Description */}
                <div className="py-6 sm:py-8">
                  <p className="text-base sm:text-xl text-moonlight font-medium leading-relaxed max-w-2xl">
                    This will include the CPM based growth campaign (with retainer transition) and normal clipping.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-none bg-surface/30 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-frost" />
                        <span>CPM Performance Model</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Distribution scaled around verifiable CPM performance incentives with guaranteed retention benchmarks.
                      </p>
                    </div>

                    <div className="p-4 rounded-none bg-surface/30 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-frost" />
                        <span>Normal Clipping Cadence</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Continuous extraction of thumb-stopping vertical clips deployed weekly across Instagram, YouTube, and TikTok.
                      </p>
                    </div>

                    <div className="p-4 rounded-none bg-surface/30 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-frost" />
                        <span>Retainer Transition</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Structured transition into a dedicated monthly retainer as audience volume compounds over time.
                      </p>
                    </div>

                    <div className="p-4 rounded-none bg-surface/30 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-frost" />
                        <span>Dedicated Editorial Team</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Hand-assigned editors, storytellers, and campaign managers overseeing every asset.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-mono text-muted">
                    Ideal for: Founders, podcasts, and creators building long-term category authority.
                  </span>

                  <a
                    href="#pricing"
                    className="group/btn inline-flex items-center gap-3 rounded-none pl-6 pr-2.5 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase bg-moonlight text-oxford hover:bg-white transition-all duration-300 active:scale-[0.98] shadow-lg shrink-0"
                  >
                    <span>View Pricing Plans</span>
                    <span className="w-7 h-7 rounded-none bg-oxford/10 group-hover/btn:bg-oxford flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 text-oxford group-hover/btn:text-moonlight transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────────────── */}
          {/* CARD 2: SHORT TERM CAMPAIGN (SCROLLS UP OVER CARD 1)                   */}
          {/* ─────────────────────────────────────────────────────────────────────── */}
          <div
            ref={card2Ref}
            className="sticky top-24 sm:top-36 z-20 origin-top will-change-transform transition-all duration-300"
          >
            {/* Architectural Outer Shell: Sharp Rectangular Frame with Frost/Steel Accents */}
            <div className="group relative rounded-none border border-frost/50 bg-surface/40 p-[1px] shadow-[0_32px_70px_rgba(0,0,0,0.8)]">
              {/* Inner Core: Deep Surface with Site Palette Highlights */}
              <div className="rounded-none bg-[#0d141e] p-6 sm:p-10 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] border border-border/60">
                {/* Card Top Row */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-9 h-9 rounded-none bg-frost/20 border border-frost/40 text-moonlight font-mono text-xs font-semibold">
                      02
                    </span>
                    <div>
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-frost font-medium">
                        High-Impact Sprint · 25–30 Days
                      </span>
                      <h3 className="font-display text-2xl sm:text-4xl font-bold text-moonlight uppercase tracking-tight">
                        Short term
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-surface border border-frost/40 text-xs font-mono text-moonlight">
                    <Clock className="w-3.5 h-3.5 text-frost" />
                    <span>25–30 Days Total</span>
                  </div>
                </div>

                {/* Primary Description */}
                <div className="py-6 sm:py-8">
                  <p className="text-base sm:text-xl text-moonlight font-medium leading-relaxed max-w-2xl">
                    This will include the PR campaign and the mass clipping. Short term will be 25-30 days.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-none bg-surface/40 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <Zap className="w-4 h-4 text-frost" />
                        <span>Mass Clipping Blitz</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Rapid deployment of high-density clips deployed simultaneously across dozens of niche pages.
                      </p>
                    </div>

                    <div className="p-4 rounded-none bg-surface/40 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <Sparkles className="w-4 h-4 text-frost" />
                        <span>PR &amp; Creator Seeding</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Strategic creator amplification, press angles, and podcast soundbites for maximum earned awareness.
                      </p>
                    </div>

                    <div className="p-4 rounded-none bg-surface/40 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <Clock className="w-4 h-4 text-frost" />
                        <span>25–30 Day Delivery Window</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Strictly bounded timeline with front-loaded production, intensive distribution, and conclusive reporting.
                      </p>
                    </div>

                    <div className="p-4 rounded-none bg-surface/40 border border-border/60">
                      <div className="flex items-center gap-2 text-frost text-xs font-mono uppercase tracking-wider font-semibold mb-1">
                        <TrendingUp className="w-4 h-4 text-frost" />
                        <span>Immediate Viral Surge</span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed pl-6">
                        Designed to create an unavoidable wave of impressions across algorithms during key launch moments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs font-mono text-muted">
                    Ideal for: Product drops, book launches, funding press, and event momentum.
                  </span>

                  <a
                    href="#pricing"
                    className="group/btn inline-flex items-center gap-3 rounded-none pl-6 pr-2.5 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase bg-frost text-oxford hover:bg-white transition-all duration-300 active:scale-[0.98] shadow-lg shrink-0"
                  >
                    <span>Launch 30-Day Sprint</span>
                    <span className="w-7 h-7 rounded-none bg-oxford/10 group-hover/btn:bg-oxford flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-3.5 h-3.5 text-oxford group-hover/btn:text-frost transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
