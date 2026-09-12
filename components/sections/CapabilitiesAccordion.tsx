"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface CapabilityBlade {
  id: string;
  step: string;
  title: string;
  summary: string;
  description: string;
  metric: string;
  accent: string;
  icon: React.ElementType;
  highlights: string[];
}

const BLADES: CapabilityBlade[] = [
  {
    id: "clipping",
    step: "01",
    title: "Clipping",
    summary: "Turn long-form videos into short-form content.",
    description:
      "We dissect hours of podcasts, founder interviews, or keynotes to isolate high-retention narrative arcs, viral hooks, and concise value points tailored for 9:16 vertical attention.",
    metric: "12 - 25 High-Value Clips / Episode",
    accent: "from-blue-500/20 to-frost/10",
    icon: Scissors,
    highlights: ["Autonomous Hook Detection", "Dynamic 9:16 Auto-Framing", "Kinetic Grotesk Captions"],
  },
  {
    id: "distribution",
    step: "02",
    title: "Distribution",
    summary: "Distribute content across relevant short-form platforms and pages.",
    description:
      "Coordinated publishing across TikTok, YouTube Shorts, and Instagram Reels through our proprietary account mesh, syndicating each cut into compounding organic reach.",
    metric: "40+ Synchronized Channels",
    accent: "from-emerald-500/20 to-frost/10",
    icon: Share2,
    highlights: ["Multi-Account Sync", "Algorithm-Adaptive Timing", "Platform-Native Metadata"],
  },
  {
    id: "campaign-management",
    step: "03",
    title: "Campaign Management",
    summary: "Coordinate the campaign, contributors, content requirements and submissions.",
    description:
      "End-to-end editorial orchestration: contributor management, compliance checking, quality assurance, asset tracking, and scheduled publishing without manual chasing.",
    metric: "< 24h Turnaround Time",
    accent: "from-amber-500/20 to-frost/10",
    icon: Users2,
    highlights: ["Zero Creator Chasing", "Brand Safety Compliance", "Automated Review Pipeline"],
  },
  {
    id: "tracking",
    step: "04",
    title: "Tracking",
    summary: "Track campaign activity and performance.",
    description:
      "Real-time consolidated telemetry across every channel: monitor watch time, viral velocity, retention drops, and conversion links in one live reporting interface.",
    metric: "99.4% Multi-Platform Telemetry",
    accent: "from-purple-500/20 to-frost/10",
    icon: LineChart,
    highlights: ["Live View Velocity HUD", "Hook Retention Drop-Off Curves", "Unified Channel Analytics"],
  },
];

export default function CapabilitiesAccordion() {
  const [activeBlade, setActiveBlade] = useState(0);

  return (
    <section
      id="concept-expanding-blades"
      className="relative w-full bg-[#02122F] text-moonlight py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-border/40"
    >
      {/* Visual concept label badge for client review */}
      <div className="mx-auto max-w-content mb-8 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-frost/10 border border-frost/25 text-[11px] font-mono uppercase tracking-wider text-frost">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Option C · The Expanding Blades (Horizontal Accordion)
        </span>
        <span className="text-[11px] font-mono text-muted/80 hidden sm:inline-block">
          Hover or click blades to expand
        </span>
      </div>

      <div className="mx-auto max-w-content">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-frost">
            System Capabilities
          </p>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Everything You Need to Turn Content Into Distribution
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto">
            Interactive architectural blades that expand to reveal each layer of the GetVeevz engine.
          </p>
        </div>

        {/* Horizontal Accordion Blades Container */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[520px] w-full items-stretch">
          {BLADES.map((blade, idx) => {
            const isActive = activeBlade === idx;
            const Icon = blade.icon;

            return (
              <div
                key={blade.id}
                onClick={() => setActiveBlade(idx)}
                onMouseEnter={() => setActiveBlade(idx)}
                className={`relative rounded-3xl border transition-all duration-500 ease-out cursor-pointer overflow-hidden backdrop-blur-xl ${
                  isActive
                    ? "lg:flex-[3.2] bg-surface/70 border-frost/60 shadow-[0_0_40px_rgba(139,163,197,0.2)] p-6 sm:p-9 flex flex-col justify-between"
                    : "lg:flex-[1] bg-surface/30 border-border/60 hover:border-frost/30 p-5 sm:p-6 flex lg:flex-col justify-between items-center lg:items-start"
                }`}
              >
                {/* Background ambient gradient when active */}
                {isActive && (
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 bg-gradient-to-br ${blade.accent} pointer-events-none opacity-60`}
                  />
                )}

                {/* Top Blade Header */}
                <div className="relative z-10 w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold ${
                        isActive ? "text-emerald-400" : "text-muted"
                      }`}
                    >
                      {blade.step}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                        isActive ? "bg-white text-oxford" : "bg-oxford/80 text-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {isActive && (
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-oxford/70 border border-border/70 text-[10px] font-mono text-emerald-400">
                      ACTIVE STAGE
                    </span>
                  )}
                </div>

                {/* Collapsed State: Vertical Typography on Desktop */}
                {!isActive && (
                  <div className="relative z-10 lg:my-auto">
                    <p className="font-display text-lg lg:text-xl font-medium text-moonlight lg:[writing-mode:vertical-rl] lg:rotate-180 tracking-wider">
                      {blade.title}
                    </p>
                  </div>
                )}

                {/* Expanded State: Detailed View */}
                {isActive && (
                  <div className="relative z-10 my-6 lg:my-auto max-w-xl">
                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                      {blade.title}
                    </h3>

                    <p className="mt-2 text-base sm:text-lg text-frost font-medium">
                      {blade.summary}
                    </p>

                    <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
                      {blade.description}
                    </p>

                    {/* Feature Highlights Pills */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {blade.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-oxford/80 border border-border/70 text-xs text-white"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Blade Footer */}
                <div className="relative z-10 w-full pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                  {isActive ? (
                    <>
                      <div>
                        <span className="text-[10px] font-mono text-muted uppercase">Output Standard</span>
                        <p className="font-semibold text-white font-display text-sm">{blade.metric}</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-oxford flex items-center justify-center text-frost">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </>
                  ) : (
                    <span className="text-[10px] font-mono text-muted hidden lg:block uppercase">Click to expand</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
