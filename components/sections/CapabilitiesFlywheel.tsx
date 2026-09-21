"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  RotateCw,
  CheckCircle2,
  ArrowRight,
  Radio,
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
    stage: "Step 01 · Cut & Edit",
    title: "Clipping",
    summary: "Turn  long video into viral short clips.",
    description:
      "We find your best moments, cut out dead silence, add bold captions, and format every clip to hook viewers in the first 3 seconds.",
    outputStandard: " Ready-to-Post Clips Per Video",
    icon: Scissors,
  },
  {
    id: "distribution",
    step: "02",
    stage: "Step 02 · Post Everywhere",
    title: "Distribution",
    summary: "Post your clips across 200+ active social media pages.",
    description:
      "We publish your content across TikTok, Instagram Reels, and YouTube Shorts using our established network of theme and niche pages.",
    outputStandard: "200+ Active Social Pages",
    icon: Share2,
  },
  {
    id: "campaign-management",
    step: "03",
    stage: "Step 03 · 100% Done For You",
    title: "Management",
    summary: "We handle all creators, approvals, and quality checks.",
    description:
      "No chasing freelancers or managing spreadsheets. We review every clip against your brand rules and deliver on time.",
    outputStandard: "Fast 24-Hour Turnaround",
    icon: Users2,
  },
  {
    id: "tracking",
    step: "04",
    stage: "Step 04 · Track & Grow",
    title: "Tracking",
    summary: "See real-time views, watch time, and top-performing clips.",
    description:
      "Watch your views and clicks grow in one clean dashboard. We double down on what works so your reach keeps multiplying.",
    outputStandard: "Live Real-Time Dashboard",
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
      className="relative w-full bg-white text-[#111111] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden select-none border-y border-[#111111]/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle Hero-Matching Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0038E2]/[0.035] blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#8BA3C5]/[0.07] blur-[140px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,56,226,0.025),transparent_70%)]"
      />

      <div className="mx-auto max-w-content relative z-10">
        {/* Section Header with User-Friendly Language */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#111111]/10 shadow-sm text-[11px] sm:text-xs font-mono uppercase tracking-wider text-[#0038E2] font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2] inline-block animate-ping" />
            <Radio className="w-3.5 h-3.5 text-[#0038E2]" />
            How It Works
          </div>
          <h2 className="font-display font-medium text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#111111] leading-tight">
            Everything You Need to Turn Content Into Real Reach
          </h2>
        </div>

        {/* 2-Column Flywheel Layout with Fixed, Balanced Proportions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ========================================================================= */}
          {/* LEFT: INTERACTIVE ORBITAL FLYWHEEL                                        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-4 sm:p-8">
            {/* Outer Orbit Ring */}
            <div className="relative w-[260px] h-[260px] xs:w-[310px] xs:h-[310px] sm:w-[380px] sm:h-[380px] rounded-full border border-[#111111]/12 bg-[#F8F6F2]/60 flex items-center justify-center shadow-[0_12px_44px_rgba(0,0,0,0.04)]">
              {/* Spinning subtle dashed accent ring */}
              <div className="absolute inset-4 rounded-full border border-dashed border-[#0038E2]/25 animate-[spin_60s_linear_infinite]" />

              {/* Pulsing circular ambient glow */}
              <div className="absolute inset-0 rounded-full border border-[#0038E2]/10 pointer-events-none" />

              {/* Center Core Hub */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#111111] border border-black/10 flex flex-col items-center justify-center text-center p-3 shadow-[0_16px_40px_rgba(0,0,0,0.18)] z-10 transition-transform duration-500 hover:scale-105 cursor-default">
                <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-[#8BA3C5] animate-[spin_12s_linear_infinite] mb-1.5" />
                <span className="text-xs sm:text-sm font-bold font-display text-white tracking-wide">
                  GetVeevz
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-[#8BA3C5] mt-0.5 uppercase tracking-wider">
                  Onboarding
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
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 ${isActive
                        ? "bg-[#0038E2] text-white border-[#0038E2] scale-110 shadow-[0_10px_28px_rgba(0,56,226,0.35)] ring-4 ring-[#0038E2]/20"
                        : "bg-white text-[#495B7D] border-[#111111]/12 shadow-md hover:border-[#0038E2]/60 hover:text-[#0038E2] hover:scale-105"
                        }`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
                    </div>
                    <span
                      className={`mt-2 px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono transition-all duration-300 whitespace-nowrap ${isActive
                        ? "bg-[#0038E2] text-white border border-[#0038E2] font-semibold shadow-sm scale-105"
                        : "text-[#555555] group-hover:text-[#111111] bg-white border border-[#111111]/10 shadow-sm"
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
                    ? "w-9 bg-[#0038E2] shadow-[0_0_10px_rgba(0,56,226,0.4)]"
                    : "w-2 bg-[#111111]/15 hover:bg-[#111111]/30"
                    }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-[#495B7D]/75 mt-2">
              {isPaused ? "Paused on hover" : "Auto-cycling flywheel"}
            </span>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT: STANDARDIZED FIXED-SIZE FLYWHEEL SHOWCASE CARD                     */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7">
            <div className="relative w-full min-h-[480px] sm:min-h-[520px] rounded-3xl bg-white border border-[#111111]/12 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] p-5 sm:p-9 flex flex-col justify-between overflow-hidden">
              {/* Corner Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#0038E2]/[0.06] blur-[90px] rounded-full pointer-events-none" />

              {/* 1. FIXED TOP HEADER */}
              <div className="flex items-center justify-between border-b border-[#111111]/10 pb-4 shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider text-[#0038E2] bg-[#0038E2]/10 border border-[#0038E2]/20 uppercase font-semibold">
                    {current.stage}
                  </span>
                  <span className="text-xs font-mono text-[#666666] hidden sm:inline-block">
                    {current.step} / 04
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#F3EFEA] border border-[#111111]/10 flex items-center justify-center text-[#0038E2] shadow-sm">
                  {React.createElement(current.icon, { className: "w-4 h-4" })}
                </div>
              </div>

              {/* 2. FIXED COPY BODY */}
              <div className="py-2 shrink-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`text-${activeNode}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tight">
                      {current.title}
                    </h3>
                    <p className="mt-2 text-base sm:text-lg text-[#0038E2] font-medium line-clamp-1">
                      {current.summary}
                    </p>
                    <p className="mt-2.5 text-xs sm:text-sm text-[#495B7D] leading-relaxed line-clamp-2 max-w-xl">
                      {current.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* 3. STANDARDIZED FIXED-HEIGHT INTERACTIVE WIDGET (Hero light styling) */}
              <div className="h-[150px] w-full rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 p-4 sm:p-5 flex flex-col justify-between shrink-0 relative overflow-hidden shadow-inner">
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
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
                        <span className="flex items-center gap-2 text-[#111111] font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#0038E2] animate-pulse" />
                          Finding Viral Moments
                        </span>
                        <span className="text-[#0038E2] font-semibold bg-[#0038E2]/10 px-2 py-0.5 rounded border border-[#0038E2]/20">
                          18 Clips Created
                        </span>
                      </div>

                      {/* Equalizer Waveform with Hero palette */}
                      <div className="h-12 flex items-end gap-1.5 py-1">
                        {[40, 65, 30, 90, 100, 75, 45, 85, 95, 60, 40, 92, 100, 80, 50, 88, 96, 70, 45, 85, 98, 65, 35].map(
                          (val, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-sm transition-all duration-300 ${val >= 85
                                ? "bg-gradient-to-t from-[#0038E2] via-[#495B7D] to-[#8BA3C5] shadow-[0_0_6px_rgba(0,56,226,0.25)]"
                                : "bg-[#111111]/12 hover:bg-[#111111]/25"
                                }`}
                              style={{ height: `${val}%` }}
                            />
                          )
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#555555] pt-1 border-t border-[#111111]/8">
                        <span>Paced to keep viewers hooked</span>
                        <span>Formatted 9:16 for mobile</span>
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
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
                        <span className="flex items-center gap-2 text-[#111111] font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#0038E2] animate-pulse" />
                          Posting Across All Platforms
                        </span>
                        <span className="text-[#0038E2] font-semibold bg-[#0038E2]/10 px-2 py-0.5 rounded border border-[#0038E2]/20">
                          200+ Active Pages
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-1">
                        <div className="p-2 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                          <p className="text-[11px] font-bold text-[#111111]">Instagram</p>
                          <span className="text-[9px] font-mono text-[#0038E2] font-semibold">90 Pages Active</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                          <p className="text-[11px] font-bold text-[#111111]">TikTok</p>
                          <span className="text-[9px] font-mono text-[#0038E2] font-semibold">70 Pages Active</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                          <p className="text-[11px] font-bold text-[#111111]">YT Shorts</p>
                          <span className="text-[9px] font-mono text-[#0038E2] font-semibold">40 Pages Active</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#555555] pt-1 border-t border-[#111111]/8">
                        <span>Posted at peak viewing hours</span>
                        <span>Matched to your audience</span>
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
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
                        <span className="flex items-center gap-2 text-[#111111] font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#0038E2] animate-pulse" />
                          What We Take Care Of:
                        </span>
                        <span className="text-[#0038E2] font-semibold bg-[#0038E2]/10 px-2 py-0.5 rounded border border-[#0038E2]/20">
                          100% Hands-Off
                        </span>
                      </div>

                      <div className="space-y-1.5 py-1">
                        <div className="flex items-center gap-2 text-xs text-[#111111]/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0038E2] shrink-0" />
                          <span>Zero creator chasing — we brief &amp; direct all editors</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#111111]/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0038E2] shrink-0" />
                          <span>Quality check — every clip is approved before posting</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#555555] pt-1 border-t border-[#111111]/8">
                        <span>You own 100% of the content</span>
                        <span>Ready within 24 hours</span>
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
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#555555]">
                        <span className="flex items-center gap-2 text-[#111111] font-medium">
                          <span className="w-2 h-2 rounded-full bg-[#0038E2] animate-pulse" />
                          Live Campaign Results
                        </span>
                        <span className="text-[#0038E2] font-semibold bg-[#0038E2]/10 px-2 py-0.5 rounded border border-[#0038E2]/20">
                          Live Dashboard
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-1">
                        <div className="p-2 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                          <span className="text-[9px] font-mono text-[#666666] uppercase">Views</span>
                          <p className="text-sm sm:text-base font-bold font-display text-[#111111]">42.8M+</p>
                          <span className="text-[8px] font-mono text-[#0038E2] font-semibold">+312% Growth</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                          <span className="text-[9px] font-mono text-[#666666] uppercase">Watch Rate</span>
                          <p className="text-sm sm:text-base font-bold font-display text-[#111111]">84.2%</p>
                          <span className="text-[8px] font-mono text-[#495B7D] font-semibold">Hook Rate</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#111111]/10 text-center shadow-sm">
                          <span className="text-[9px] font-mono text-[#666666] uppercase">Network</span>
                          <p className="text-sm sm:text-base font-bold font-display text-[#111111]">200+</p>
                          <span className="text-[8px] font-mono text-[#0038E2] font-semibold">Pages Active</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#555555] pt-1 border-t border-[#111111]/8">
                        <span>All platforms in 1 dashboard</span>
                        <span>Updates live every minute</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 4. FIXED FOOTER */}
              <div className="pt-4 border-t border-[#111111]/10 flex items-center justify-between shrink-0">
                <div>
                  <span className="text-[10px] font-mono text-[#666666] uppercase tracking-wider block">
                    What You Get
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-[#111111] font-display">
                    {current.outputStandard}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNode((prev) => (prev + 1) % NODES.length)}
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] hover:bg-[#0038E2] text-xs font-mono text-white transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <span>Next Step</span>
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
