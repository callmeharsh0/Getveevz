"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Play,
  Activity,
} from "lucide-react";

interface FlywheelNode {
  id: string;
  step: string;
  stage: string;
  title: string;
  summary: string;
  description: string;
  outputStandard: string;
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
    outputStandard: "12 - 25 High-Value Clips / Episode",
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
    outputStandard: "40+ Synchronized Channels",
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
    outputStandard: "< 24h Turnaround Time",
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
    outputStandard: "99.4% Telemetry Accuracy",
    icon: LineChart,
  },
];

export default function CapabilitiesFlywheel() {
  const [activeNode, setActiveNode] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const current = NODES[activeNode];

  // Auto-advance every 6 seconds unless user is hovering/interacting
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % NODES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="system-capabilities"
      className="relative w-full bg-[#000000] text-moonlight py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-border/30 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[180px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-frost/5 blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.03),transparent_70%)]"
      />

      <div className="mx-auto max-w-content relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-4">
            <Sparkles className="w-3 h-3 text-blue-400" />
            System Capabilities · Compounding Loop
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            Everything You Need to Turn Content Into Distribution
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
            A compounding feedback flywheel where performance telemetry continuously feeds back into viral hooks, multi-platform publishing, and compounding audience growth.
          </p>
        </div>

        {/* 2-Column Flywheel Layout with Fixed, Balanced Proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================================= */}
          {/* LEFT: INTERACTIVE ORBITAL FLYWHEEL                                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-4 sm:p-8">
            {/* Outer Orbit Ring */}
            <div className="relative w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_60px_rgba(59,130,246,0.08)]">
              {/* Spinning subtle dashed accent ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-blue-500/25 animate-[spin_60s_linear_infinite]" />

              {/* Pulsing circular ambient glow */}
              <div className="absolute inset-0 rounded-full border border-blue-400/10 pointer-events-none" />

              {/* Center Core Hub */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#070912]/95 border border-blue-500/35 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-3 shadow-[0_0_50px_rgba(59,130,246,0.3)] z-10 transition-transform duration-500 hover:scale-105 cursor-default">
                <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 animate-[spin_12s_linear_infinite] mb-1.5" />
                <span className="text-xs sm:text-sm font-bold font-display text-white tracking-wide">
                  GetVeevz Engine
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-blue-300/80 mt-0.5 uppercase tracking-wider">
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
                    className={`absolute ${positions[i]} z-20 group transition-all duration-300 flex flex-col items-center focus:outline-none cursor-pointer`}
                    aria-label={`Select ${node.title}`}
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-2xl ${isActive
                          ? "bg-white text-black border-white scale-110 shadow-[0_0_35px_rgba(59,130,246,0.6)] ring-4 ring-blue-500/40"
                          : "bg-[#0b0e18] text-frost border-white/10 hover:border-blue-400/50 hover:text-white hover:scale-105"
                        }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span
                      className={`mt-2 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono transition-all duration-300 whitespace-nowrap ${isActive
                          ? "bg-blue-500/25 text-blue-300 border border-blue-500/50 font-semibold shadow-md scale-105"
                          : "text-muted group-hover:text-white bg-black/80 border border-white/10"
                        }`}
                    >
                      {node.step}. {node.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Step Indicators with Timer Progress Bar */}
            <div className="mt-10 flex items-center gap-2">
              {NODES.map((n, idx) => (
                <button
                  key={n.id}
                  onClick={() => setActiveNode(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 relative overflow-hidden ${activeNode === idx
                      ? "w-9 bg-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-muted/60 mt-2">
              {isPaused ? "Paused on hover" : "Auto-cycling flywheel"}
            </span>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: STANDARDIZED FIXED-SIZE FLYWHEEL SHOWCASE CARD                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            {/* 
              FIXED GENERALIZED SIZE CARD CONTAINER:
              Fixed height (520px) and fixed width behavior prevents any layout jump or aspect ratio distortion!
            */}
            <div className="relative w-full h-[520px] sm:h-[530px] rounded-3xl bg-[#080b14]/90 border border-white/15 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.85)] p-7 sm:p-9 flex flex-col justify-between overflow-hidden">
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

              {/* 1. FIXED TOP HEADER (Height ~60px) */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider text-blue-300 bg-blue-500/15 border border-blue-500/35 uppercase">
                    {current.stage}
                  </span>
                  <span className="text-xs font-mono text-muted hidden sm:inline-block">
                    {current.step} / 04
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0e1322] border border-white/10 flex items-center justify-center text-blue-400 shadow-md">
                  {React.createElement(current.icon, { className: "w-4 h-4" })}
                </div>
              </div>

              {/* 2. FIXED COPY BODY (Height ~140px) */}
              <div className="py-2 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeNode}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-frost font-medium line-clamp-1">
                      {current.summary}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm text-muted leading-relaxed line-clamp-2 max-w-xl">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3. STANDARDIZED FIXED-HEIGHT INTERACTIVE WIDGET (Exactly 150px) */}
              <div className="h-[150px] w-full rounded-2xl bg-[#04060c] border border-white/10 p-4 sm:p-5 flex flex-col justify-between shrink-0 relative overflow-hidden shadow-inner">
                <AnimatePresence mode="wait">
                  {/* WIDGET 1: CLIPPING */}
                  {activeNode === 0 && (
                    <motion.div
                      key="widget-clipping"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                        <span className="flex items-center gap-2 text-white font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                          Hook Detection Analyzer
                        </span>
                        <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/25">
                          18 Clips Isolated
                        </span>
                      </div>

                      {/* Equalizer Waveform */}
                      <div className="h-12 flex items-end gap-1.5 py-1">
                        {[40, 65, 30, 90, 100, 75, 45, 85, 95, 60, 40, 92, 100, 80, 50, 88, 96, 70, 45, 85, 98, 65, 35].map(
                          (val, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-sm transition-all duration-300 ${val >= 85
                                  ? "bg-gradient-to-t from-blue-600 to-blue-300 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                                  : "bg-frost/25 hover:bg-frost/50"
                                }`}
                              style={{ height: `${val}%` }}
                            />
                          )
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted/80 pt-1 border-t border-white/5">
                        <span>Pacing: Vertical Retention Cuts</span>
                        <span>Auto-Framing: 9:16 Aspect</span>
                      </div>
                    </motion.div>
                  )}

                  {/* WIDGET 2: DISTRIBUTION */}
                  {activeNode === 1 && (
                    <motion.div
                      key="widget-distribution"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                        <span className="flex items-center gap-2 text-white font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                          Synchronized Platform Network
                        </span>
                        <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/25">
                          40+ Nodes Live
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-1">
                        <div className="p-2 rounded-xl bg-[#090d18] border border-white/10 text-center">
                          <p className="text-[11px] font-bold text-white">Instagram</p>
                          <span className="text-[9px] font-mono text-blue-300">16 Pages Sync</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#090d18] border border-white/10 text-center">
                          <p className="text-[11px] font-bold text-white">TikTok</p>
                          <span className="text-[9px] font-mono text-blue-300">18 Pages Sync</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#090d18] border border-white/10 text-center">
                          <p className="text-[11px] font-bold text-white">YT Shorts</p>
                          <span className="text-[9px] font-mono text-blue-300">8 Pages Sync</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted/80 pt-1 border-t border-white/5">
                        <span>Scheduled Deployment Mesh</span>
                        <span>Broadcast Latency: 120ms</span>
                      </div>
                    </motion.div>
                  )}

                  {/* WIDGET 3: CAMPAIGN MANAGEMENT */}
                  {activeNode === 2 && (
                    <motion.div
                      key="widget-management"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                        <span className="flex items-center gap-2 text-white font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                          Automated Pipeline Checklist
                        </span>
                        <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/25">
                          Verified SLA
                        </span>
                      </div>

                      <div className="space-y-1.5 py-1">
                        <div className="flex items-center gap-2 text-xs text-moonlight/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>Zero Creator Chasing · Automated Briefs</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-moonlight/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                          <span>Brand Safety &amp; Guideline Verification</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted/80 pt-1 border-t border-white/5">
                        <span>Automated Rights Transfer</span>
                        <span>Turnaround: &lt;24 Hours</span>
                      </div>
                    </motion.div>
                  )}

                  {/* WIDGET 4: TRACKING */}
                  {activeNode === 3 && (
                    <motion.div
                      key="widget-tracking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                        <span className="flex items-center gap-2 text-white font-medium">
                          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                          Real-Time Campaign Telemetry
                        </span>
                        <span className="text-blue-400 font-semibold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/25">
                          Live API
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-1">
                        <div className="p-2 rounded-xl bg-[#090d18] border border-white/10 text-center">
                          <span className="text-[9px] font-mono text-muted uppercase">Views</span>
                          <p className="text-sm sm:text-base font-bold font-display text-white">42.8M+</p>
                          <span className="text-[8px] font-mono text-blue-400">+312%</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#090d18] border border-white/10 text-center">
                          <span className="text-[9px] font-mono text-muted uppercase">Hook Hold</span>
                          <p className="text-sm sm:text-base font-bold font-display text-white">84.2%</p>
                          <span className="text-[8px] font-mono text-frost">Avg Rate</span>
                        </div>
                        <div className="p-2 rounded-xl bg-[#090d18] border border-white/10 text-center">
                          <span className="text-[9px] font-mono text-muted uppercase">Sync</span>
                          <p className="text-sm sm:text-base font-bold font-display text-white">99.4%</p>
                          <span className="text-[8px] font-mono text-blue-400">Realtime</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-muted/80 pt-1 border-t border-white/5">
                        <span>Multi-Platform Consolidation</span>
                        <span>Telemetry Cycle: 60s Refresh</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. FIXED FOOTER (Height ~50px) */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
                    Output Standard
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white font-display">
                    {current.outputStandard}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNode((prev) => (prev + 1) % NODES.length)}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d1222] border border-white/15 hover:border-blue-400/60 hover:bg-blue-600/10 text-xs font-mono text-blue-300 hover:text-white transition-all shadow-md active:scale-95"
                >
                  <span>Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
