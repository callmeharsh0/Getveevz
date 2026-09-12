"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  Sparkles,
  RotateCw,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

interface FlywheelNode {
  id: string;
  step: string;
  title: string;
  summary: string;
  description: string;
  metric: string;
  icon: React.ElementType;
}

const NODES: FlywheelNode[] = [
  {
    id: "clipping",
    step: "01",
    title: "Clipping",
    summary: "Turn long-form videos into short-form content.",
    description:
      "We dissect hours of podcasts, founder interviews, or keynotes to isolate high-retention narrative arcs, viral hooks, and concise value points tailored for 9:16 vertical attention.",
    metric: "12 - 25 High-Value Clips / Episode",
    icon: Scissors,
  },
  {
    id: "distribution",
    step: "02",
    title: "Distribution",
    summary: "Distribute content across relevant short-form platforms and pages.",
    description:
      "Simultaneous algorithmic distribution across TikTok, YouTube Shorts, and Instagram Reels through our coordinated 40+ account mesh for maximum compound audience touchpoints.",
    metric: "40+ Synchronized Channels",
    icon: Share2,
  },
  {
    id: "campaign-management",
    step: "03",
    title: "Campaign Management",
    summary: "Coordinate the campaign, contributors, content requirements and submissions.",
    description:
      "End-to-end editorial pipeline: asset collection, contributor assignments, brand safety verification, review rounds, and scheduled publishing without manual creator chasing.",
    metric: "< 24h Turnaround Time",
    icon: Users2,
  },
  {
    id: "tracking",
    step: "04",
    title: "Tracking",
    summary: "Track campaign activity and performance.",
    description:
      "Unified performance telemetry across all channels: track views, aggregate watch time, hook retention curves, and algorithmic momentum in one single live reporting view.",
    metric: "99.4% Telemetry Accuracy",
    icon: LineChart,
  },
];

export default function CapabilitiesFlywheel() {
  const [activeNode, setActiveNode] = useState(0);
  const current = NODES[activeNode];

  return (
    <section
      id="concept-compounding-flywheel"
      className="relative w-full bg-[#030d20] text-moonlight py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-border/40"
    >
      {/* Visual concept label badge for client review */}
      <div className="mx-auto max-w-content mb-8 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-frost/10 border border-frost/25 text-[11px] font-mono uppercase tracking-wider text-frost">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Option D · The Compounding Flywheel (Orbital Cycle)
        </span>
        <span className="text-[11px] font-mono text-muted/80 hidden sm:inline-block">
          Interactive Closed-Loop System
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
            A compounding feedback flywheel where performance telemetry feeds back into better hooks and wider reach.
          </p>
        </div>

        {/* Flywheel Layout: Left Orbit Selector, Right Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Orbital Flywheel Visualizer */}
          <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-10 relative">
            {/* Outer Orbit Circle */}
            <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border border-border/60 flex items-center justify-center">
              {/* Spinning subtle dashed accent ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-frost/20 animate-[spin_60s_linear_infinite]" />

              {/* Core Hub */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-surface/90 border border-frost/40 backdrop-blur-xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_50px_rgba(139,163,197,0.25)] z-10">
                <RotateCw className="w-5 h-5 text-emerald-400 animate-[spin_12s_linear_infinite] mb-1.5" />
                <span className="text-[11px] sm:text-xs font-bold font-display text-white">
                  GetVeevz Engine
                </span>
                <span className="text-[9px] font-mono text-frost mt-0.5">Continuous Cycle</span>
              </div>

              {/* 4 Orbital Position Nodes */}
              {NODES.map((node, i) => {
                const isActive = activeNode === i;
                const Icon = node.icon;

                // 4 Cardinal positions: Top, Right, Bottom, Left
                const positions = [
                  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2", // 01 Top
                  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",  // 02 Right
                  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2", // 03 Bottom
                  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",  // 04 Left
                ];

                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(i)}
                    className={`absolute ${positions[i]} z-20 group transition-all duration-300 flex flex-col items-center`}
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-xl ${
                        isActive
                          ? "bg-white text-oxford border-white scale-110 shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                          : "bg-surface/90 text-frost border-border/80 hover:border-frost/50 hover:scale-105"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-colors ${
                        isActive
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "text-muted group-hover:text-white"
                      }`}
                    >
                      {node.step}. {node.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Spotlight Detail Card */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-surface/60 border border-border/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 border-b border-border/40 pb-4">
                <span className="text-xs font-mono text-emerald-400">
                  PHASE {current.step} OF 04 · ENGINE STAGE
                </span>
                <span className="text-xs font-mono text-muted">Compounding Flywheel</span>
              </div>

              <h3 className="font-display font-medium text-3xl sm:text-4xl text-white">
                {current.title}
              </h3>

              <p className="mt-3 text-lg text-frost font-medium">
                {current.summary}
              </p>

              <p className="mt-4 text-sm text-muted leading-relaxed">
                {current.description}
              </p>

              <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                    Performance Metric
                  </span>
                  <p className="text-base font-semibold text-white font-display mt-1">
                    {current.metric}
                  </p>
                </div>

                <button
                  onClick={() => setActiveNode((prev) => (prev + 1) % NODES.length)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-oxford border border-border hover:border-frost text-xs text-white transition-all"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
