"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  Sparkles,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  Zap,
} from "lucide-react";

interface FlywheelNode {
  id: string;
  step: string;
  stage: string;
  title: string;
  summary: string;
  description: string;
  icon: React.ElementType;
}

const NODES: FlywheelNode[] = [
  {
    id: "clipping",
    step: "01",
    stage: "Stage 01 · Ingestion & Cut",
    title: "Clipping",
    summary: "Turn long-form videos into short-form content.",
    description:
      "Automated hook isolation, pacing remix, and 9:16 vertical smart auto-framing designed to seize attention in the first 3 seconds.",
    icon: Scissors,
  },
  {
    id: "distribution",
    step: "02",
    stage: "Stage 02 · Syndication",
    title: "Distribution",
    summary: "Distribute content across relevant short-form platforms and pages.",
    description:
      "Coordinated publishing across TikTok, YouTube Shorts, and Instagram Reels through our proprietary account mesh.",
    icon: Share2,
  },
  {
    id: "campaign-management",
    step: "03",
    stage: "Stage 03 · Pipeline Control",
    title: "Campaign Management",
    summary: "Coordinate the campaign, contributors, content requirements and submissions.",
    description:
      "Automated assignment, quality assurance checks, brand guideline compliance, and timeline management.",
    icon: Users2,
  },
  {
    id: "tracking",
    step: "04",
    stage: "Stage 04 · Performance HUD",
    title: "Tracking",
    summary: "Track campaign activity and performance.",
    description:
      "Consolidated live telemetry across every channel: monitor watch time, viral velocity, retention drops, and conversion links.",
    icon: LineChart,
  },
];

export default function CapabilitiesFlywheel() {
  const [activeNode, setActiveNode] = useState(0);
  const current = NODES[activeNode];

  return (
    <section
      id="system-capabilities"
      className="relative w-full bg-[#000000] text-moonlight py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-border/30 select-none"
    >
      {/* Ambient background depth glows matching theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/5 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-frost/5 blur-[140px] rounded-full"
      />

      <div className="mx-auto max-w-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-frost">
            System Capabilities
          </p>
          <h2 className="mt-4 font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Everything You Need to Turn Content Into Distribution
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
            A compounding feedback flywheel where performance telemetry continuously feeds back into viral hooks, multi-platform publishing, and compounding audience growth.
          </p>
        </div>

        {/* 2-Column Flywheel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* ========================================================================= */}
          {/* LEFT: INTERACTIVE ORBITAL FLYWHEEL                                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-6 sm:p-8">
            {/* Outer Orbit Ring */}
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.06)]">
              {/* Spinning subtle dashed accent ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/20 animate-[spin_60s_linear_infinite]" />

              {/* Pulsing outer ring glow */}
              <div className="absolute inset-0 rounded-full border border-blue-400/10 pointer-events-none" />

              {/* Center Core Hub */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0a0c14]/90 border border-blue-500/30 backdrop-blur-xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_40px_rgba(59,130,246,0.25)] z-10">
                <RotateCw className="w-5 h-5 text-blue-400 animate-[spin_12s_linear_infinite] mb-1.5" />
                <span className="text-[11px] sm:text-xs font-bold font-display text-white tracking-wide">
                  GetVeevz Engine
                </span>
                <span className="text-[9px] font-mono text-blue-300/80 mt-0.5 uppercase tracking-wider">
                  Compounding Loop
                </span>
              </div>

              {/* 4 Cardinal Orbital Nodes: Top, Right, Bottom, Left */}
              {NODES.map((node, i) => {
                const isActive = activeNode === i;
                const Icon = node.icon;

                // 4 Cardinal positions: Top, Right, Bottom, Left
                const positions = [
                  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",    // 01 Clipping (Top)
                  "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",     // 02 Distribution (Right)
                  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",  // 03 Campaign Management (Bottom)
                  "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",    // 04 Tracking (Left)
                ];

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setActiveNode(i)}
                    className={`absolute ${positions[i]} z-20 group transition-all duration-300 flex flex-col items-center focus:outline-none`}
                    aria-label={`Select ${node.title}`}
                  >
                    <div
                      className={`w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-2xl ${
                        isActive
                          ? "bg-white text-black border-white scale-110 shadow-[0_0_30px_rgba(59,130,246,0.5)] ring-4 ring-blue-500/30"
                          : "bg-[#0d0f1a] text-frost border-white/10 hover:border-blue-400/50 hover:text-white hover:scale-105"
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span
                      className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-mono transition-all ${
                        isActive
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold shadow-sm"
                          : "text-muted group-hover:text-white bg-black/60 border border-white/5"
                      }`}
                    >
                      {node.step}. {node.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Step Indicators */}
            <div className="mt-8 flex items-center gap-2">
              {NODES.map((n, idx) => (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeNode === idx ? "w-8 bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.6)]" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: OPTION B CARD ADAPTED AS THE ACTIVE FLYWHEEL DISPLAY              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* CARD 1: CLIPPING */}
              {activeNode === 0 && (
                <motion.div
                  key="flywheel-card-clipping"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-7 sm:p-9 rounded-3xl bg-[#080b14]/90 border border-white/15 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30 uppercase">
                        {current.stage}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-blue-400 shadow-md">
                        <Scissors className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-frost font-medium">
                      {current.summary}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                      {current.description}
                    </p>
                  </div>

                  {/* Simulated Live Audio Waveform Card */}
                  <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#04060c] border border-white/10">
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-3">
                      <span className="flex items-center gap-2 text-white">
                        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                        Hook Detection Analyzer
                      </span>
                      <span className="text-blue-400 font-semibold">18 Clips Isolated</span>
                    </div>
                    <div className="h-12 flex items-end gap-1.5">
                      {[40, 65, 30, 90, 100, 75, 45, 85, 95, 60, 40, 92, 100, 80, 50, 88, 96, 70, 45, 85, 98, 65, 35].map(
                        (val, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-sm transition-all duration-300 ${
                              val >= 85
                                ? "bg-gradient-to-t from-blue-600 to-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                                : "bg-frost/25 hover:bg-frost/50"
                            }`}
                            style={{ height: `${val}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Bottom Navigation Cue */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">Next in Flywheel: Distribution</span>
                    <button
                      onClick={() => setActiveNode(1)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors"
                    >
                      <span>Proceed</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* CARD 2: DISTRIBUTION */}
              {activeNode === 1 && (
                <motion.div
                  key="flywheel-card-distribution"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-7 sm:p-9 rounded-3xl bg-[#080b14]/90 border border-white/15 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30 uppercase">
                        {current.stage}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-blue-400 shadow-md">
                        <Share2 className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-frost font-medium">
                      {current.summary}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                      {current.description}
                    </p>
                  </div>

                  {/* Platform cluster badge stack */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#04060c] border border-white/10 text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="font-medium text-white">Instagram Reels</span>
                      </div>
                      <span className="text-[11px] font-mono text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded border border-blue-500/30">
                        16 Synced Pages
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#04060c] border border-white/10 text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="font-medium text-white">TikTok Channels</span>
                      </div>
                      <span className="text-[11px] font-mono text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded border border-blue-500/30">
                        18 Synced Pages
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#04060c] border border-white/10 text-xs sm:text-sm">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="font-medium text-white">YouTube Shorts</span>
                      </div>
                      <span className="text-[11px] font-mono text-blue-300 bg-blue-500/15 px-2.5 py-0.5 rounded border border-blue-500/30">
                        8 Synced Pages
                      </span>
                    </div>
                  </div>

                  {/* Bottom Navigation Cue */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">Next in Flywheel: Campaign Management</span>
                    <button
                      onClick={() => setActiveNode(2)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors"
                    >
                      <span>Proceed</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* CARD 3: CAMPAIGN MANAGEMENT */}
              {activeNode === 2 && (
                <motion.div
                  key="flywheel-card-management"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-7 sm:p-9 rounded-3xl bg-[#080b14]/90 border border-white/15 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30 uppercase">
                        {current.stage}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-blue-400 shadow-md">
                        <Users2 className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-frost font-medium">
                      {current.summary}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                      {current.description}
                    </p>
                  </div>

                  {/* Checklist of requirements */}
                  <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#04060c] border border-white/10 space-y-3">
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-moonlight">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Zero Creator Chasing</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-moonlight">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Automated Brand Safety Checks</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs sm:text-sm text-moonlight">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>Scheduled Drop Calendar</span>
                    </div>
                  </div>

                  {/* Bottom Navigation Cue */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">Next in Flywheel: Tracking</span>
                    <button
                      onClick={() => setActiveNode(3)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors"
                    >
                      <span>Proceed</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* CARD 4: TRACKING */}
              {activeNode === 3 && (
                <motion.div
                  key="flywheel-card-tracking"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-7 sm:p-9 rounded-3xl bg-[#080b14]/90 border border-white/15 hover:border-blue-400/40 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider text-blue-300 bg-blue-500/10 border border-blue-500/30 uppercase">
                        {current.stage}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-surface/80 border border-border flex items-center justify-center text-blue-400 shadow-md">
                        <LineChart className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-frost font-medium">
                      {current.summary}
                    </p>
                    <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-xl">
                      {current.description}
                    </p>
                  </div>

                  {/* Performance Stats Strip */}
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#04060c] border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-muted uppercase">Views Tracked</span>
                      <p className="text-xl sm:text-2xl font-bold font-display text-white mt-1">42.8M+</p>
                      <span className="text-[10px] font-mono text-blue-400 font-semibold">+312%</span>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#04060c] border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-muted uppercase">Hook Hold</span>
                      <p className="text-xl sm:text-2xl font-bold font-display text-white mt-1">84.2%</p>
                      <span className="text-[10px] font-mono text-frost">Avg Rate</span>
                    </div>
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#04060c] border border-white/10 text-center">
                      <span className="text-[10px] font-mono text-muted uppercase">Telemetry Sync</span>
                      <p className="text-xl sm:text-2xl font-bold font-display text-white mt-1">99.4%</p>
                      <span className="text-[10px] font-mono text-blue-400 font-semibold">Live API</span>
                    </div>
                  </div>

                  {/* Bottom Navigation Cue */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted">Completes Flywheel Loop · Feeds back into Stage 01</span>
                    <button
                      onClick={() => setActiveNode(0)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-white transition-colors"
                    >
                      <span>Restart Loop</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
