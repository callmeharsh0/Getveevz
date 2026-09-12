"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  Activity,
  Zap,
} from "lucide-react";

interface Capability {
  id: string;
  step: string;
  badge: string;
  title: string;
  summary: string;
  details: string;
  metricLabel: string;
  metricValue: string;
  icon: React.ElementType;
}

const CAPABILITIES: Capability[] = [
  {
    id: "clipping",
    step: "01",
    badge: "PHASE 01 · RETENTION EXTRACTION",
    title: "Clipping",
    summary: "Turn long-form videos into short-form content.",
    details:
      "We dissect hours of podcasts, founder interviews, or keynotes to isolate high-retention narrative arcs, viral hooks, and concise value points tailored for 9:16 vertical attention.",
    metricLabel: "Benchmark Output",
    metricValue: "12 - 25 High-Value Clips / Episode",
    icon: Scissors,
  },
  {
    id: "distribution",
    step: "02",
    badge: "PHASE 02 · MULTI-NODE SYNDICATION",
    title: "Distribution",
    summary: "Distribute content across relevant short-form platforms and pages.",
    details:
      "Simultaneous algorithmic distribution across TikTok, YouTube Shorts, and Instagram Reels through a coordinated network of brand and thematic sub-channels for maximum surface area.",
    metricLabel: "Active Channel Network",
    metricValue: "40+ Coordinated Nodes",
    icon: Share2,
  },
  {
    id: "campaign-management",
    step: "03",
    badge: "PHASE 03 · WORKFLOW ORCHESTRATION",
    title: "Campaign Management",
    summary: "Coordinate the campaign, contributors, content requirements and submissions.",
    details:
      "End-to-end editorial pipeline: asset collection, contributor assignments, brand safety verification, review rounds, and scheduled publishing without manual creator chasing.",
    metricLabel: "Pipeline Turnaround",
    metricValue: "< 24h From Raw Long-Form to Drop",
    icon: Users2,
  },
  {
    id: "tracking",
    step: "04",
    badge: "PHASE 04 · REAL-TIME TELEMETRY",
    title: "Tracking",
    summary: "Track campaign activity and performance.",
    details:
      "Unified performance telemetry across all channels: track views, aggregate watch time, hook retention curves, and algorithmic momentum in one single live reporting view.",
    metricLabel: "Sync & Reporting Accuracy",
    metricValue: "99.4% Multi-Platform Telemetry",
    icon: LineChart,
  },
];

export default function CapabilitiesCommandCenter() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const current = CAPABILITIES[activeTab];

  // Auto-cycle through tabs unless hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % CAPABILITIES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="concept-command-center"
      className="relative w-full bg-[#02122F] text-moonlight py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-border/40"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Visual concept label badge for client review */}
      <div className="mx-auto max-w-content mb-8 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-frost/10 border border-frost/25 text-[11px] font-mono uppercase tracking-wider text-frost">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Option A · The Command Center (Interactive Product Console)
        </span>
        <span className="text-[11px] font-mono text-muted/80 hidden sm:inline-block">
          Auto-progressing (Pause on hover)
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
            From raw, unedited footage to algorithmic reach across a synchronized 40+ account network.
          </p>
        </div>

        {/* Tab Switcher Navigation Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12">
          {CAPABILITIES.map((cap, idx) => {
            const isActive = activeTab === idx;
            const Icon = cap.icon;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-surface text-white border border-frost/50 shadow-[0_0_25px_rgba(139,163,197,0.25)]"
                    : "bg-surface/50 text-muted hover:text-white border border-border/60 hover:border-frost/30"
                }`}
              >
                <span className={`font-mono text-[11px] ${isActive ? "text-emerald-400" : "text-muted"}`}>
                  {cap.step}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-frost" : "text-muted"}`} />
                <span>{cap.title}</span>

                {/* Progress bar inside active pill */}
                {isActive && !isPaused && (
                  <motion.div
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-frost via-emerald-400 to-frost rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Command Center Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Context Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-9 rounded-3xl bg-surface/60 border border-border/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-frost/5 blur-[90px] rounded-full pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-oxford/70 border border-border/70 text-[10px] sm:text-xs font-mono tracking-wider text-emerald-400 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {current.badge}
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-white">
                {current.title}
              </h3>

              <p className="mt-3 text-base sm:text-lg text-frost font-medium">
                {current.summary}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-muted leading-relaxed">
                {current.details}
              </p>
            </div>

            {/* Benchmark Card */}
            <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted">
                  {current.metricLabel}
                </p>
                <p className="mt-1 text-sm sm:text-base font-semibold text-white font-display">
                  {current.metricValue}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>

          {/* Right Live Interactive Mockup Console */}
          <div className="lg:col-span-7 rounded-3xl bg-[#031536] border border-border/80 shadow-2xl p-6 sm:p-8 relative min-h-[420px] sm:min-h-[460px] flex flex-col justify-between overflow-hidden">
            <AnimatePresence mode="wait">
              {/* STAGE 1: CLIPPING */}
              {activeTab === 0 && (
                <motion.div
                  key="clip-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col h-full justify-between gap-6"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-frost" />
                      <span className="font-mono text-xs text-white uppercase tracking-wider">
                        Autonomous Clip Extraction Engine
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      PROCESSING 60FPS
                    </span>
                  </div>

                  {/* Audio Waveform Analysis */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
                      <span>Source Audio Waveform Analysis</span>
                      <span className="text-emerald-400">3 Hook Spikes Detected</span>
                    </div>
                    <div className="h-14 sm:h-16 flex items-end gap-1.5 p-2 rounded-xl bg-oxford/70 border border-border/50">
                      {[35, 55, 40, 85, 95, 60, 45, 70, 92, 100, 75, 45, 30, 80, 95, 70, 50, 40, 85, 95, 100, 65, 40, 25].map(
                        (height, i) => {
                          const isSpike = height >= 85;
                          return (
                            <div
                              key={i}
                              className={`flex-1 rounded-full transition-all duration-500 ${
                                isSpike
                                  ? "bg-gradient-to-t from-frost to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                                  : "bg-surface/70"
                              }`}
                              style={{ height: `${height}%` }}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>

                  {/* Extracted Hooks Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-surface/50 border border-border/60 hover:border-frost/50 transition-colors">
                      <span className="text-[10px] font-mono text-frost uppercase">Hook 01</span>
                      <p className="text-xs font-semibold text-white mt-1">00:03:12 – 00:03:54</p>
                      <span className="text-[10px] font-mono text-emerald-400">94% Retention Score</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface/50 border border-border/60 hover:border-frost/50 transition-colors">
                      <span className="text-[10px] font-mono text-frost uppercase">Hook 02</span>
                      <p className="text-xs font-semibold text-white mt-1">00:18:40 – 00:19:35</p>
                      <span className="text-[10px] font-mono text-emerald-400">91% Retention Score</span>
                    </div>
                    <div className="p-3 rounded-xl bg-surface/50 border border-border/60 hover:border-frost/50 transition-colors">
                      <span className="text-[10px] font-mono text-frost uppercase">Hook 03</span>
                      <p className="text-xs font-semibold text-white mt-1">00:44:10 – 00:45:02</p>
                      <span className="text-[10px] font-mono text-emerald-400">96% Retention Score</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-muted border-t border-border/40 pt-3">
                    <span>Aspect: Dynamic 9:16 Smart Auto-Framing</span>
                    <span>Captions: Kinetic Grotesk Subtitles</span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 2: DISTRIBUTION */}
              {activeTab === 1 && (
                <motion.div
                  key="dist-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col h-full justify-between gap-6"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs text-white uppercase tracking-wider">
                        Synchronized Multi-Node Distribution Mesh
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-frost/10 text-frost border border-frost/30">
                      42 CHANNELS ACTIVE
                    </span>
                  </div>

                  {/* Network Graph Simulation */}
                  <div className="p-4 rounded-2xl bg-oxford/70 border border-border/60 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-frost/20 flex items-center justify-center border border-frost/40">
                          <Zap className="w-4 h-4 text-frost" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">Central Content Hub</p>
                          <p className="text-[10px] font-mono text-muted">Raw Episode Dispatched</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">Broadcasting</span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 rounded-xl bg-surface/70 border border-border/50">
                        <p className="text-xs font-bold text-white">Instagram Reels</p>
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">16 Nodes · 100% Sync</p>
                      </div>
                      <div className="p-3 rounded-xl bg-surface/70 border border-border/50">
                        <p className="text-xs font-bold text-white">TikTok Network</p>
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">18 Nodes · Live</p>
                      </div>
                      <div className="p-3 rounded-xl bg-surface/70 border border-border/50">
                        <p className="text-xs font-bold text-white">YouTube Shorts</p>
                        <p className="text-[10px] font-mono text-emerald-400 mt-1">8 Nodes · Scheduled</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-muted border-t border-border/40 pt-3">
                    <span>Algorithm-Adaptive Timing Engine</span>
                    <span className="text-frost font-medium">Global Latency: 140ms</span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 3: CAMPAIGN MANAGEMENT */}
              {activeTab === 2 && (
                <motion.div
                  key="mgmt-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col h-full justify-between gap-6"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <div className="flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-frost" />
                      <span className="font-mono text-xs text-white uppercase tracking-wider">
                        Workflow &amp; Contributor Orchestration
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      QA VERIFIED
                    </span>
                  </div>

                  {/* Submission Queue Items */}
                  <div className="space-y-2.5">
                    {[
                      { name: "Founder Story 30s Cut", contributor: "@sarah_cuts", status: "Approved & Live", time: "12m ago" },
                      { name: "Framework Teaser 9:16", contributor: "@marcus_remix", status: "Approved & Live", time: "44m ago" },
                      { name: "Podcast Punchline 03", contributor: "@alex_reels", status: "In Quality Review", time: "Just now" },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 rounded-xl bg-oxford/70 border border-border/50 text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="font-medium text-white">{item.name}</span>
                          <span className="text-[10px] font-mono text-muted">by {item.contributor}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-emerald-400">{item.status}</span>
                          <span className="text-[10px] font-mono text-muted">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-muted border-t border-border/40 pt-3">
                    <span>Automated Creator Bounties &amp; Rights Transfer</span>
                    <span>Zero Manual Follow-Ups</span>
                  </div>
                </motion.div>
              )}

              {/* STAGE 4: TRACKING */}
              {activeTab === 3 && (
                <motion.div
                  key="tracking-panel"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col h-full justify-between gap-6"
                >
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <div className="flex items-center gap-2">
                      <LineChart className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono text-xs text-white uppercase tracking-wider">
                        Real-Time Telemetry &amp; Campaign Performance
                      </span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      LIVE FEED
                    </span>
                  </div>

                  {/* Big Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-xl bg-oxford/70 border border-border/50 text-center">
                      <p className="text-[10px] font-mono uppercase text-muted">Total Views</p>
                      <p className="text-lg font-bold font-display text-white mt-1">42.8M</p>
                      <p className="text-[10px] font-mono text-emerald-400">+312% MoM</p>
                    </div>
                    <div className="p-3 rounded-xl bg-oxford/70 border border-border/50 text-center">
                      <p className="text-[10px] font-mono uppercase text-muted">Watch Time</p>
                      <p className="text-lg font-bold font-display text-white mt-1">1.8M hrs</p>
                      <p className="text-[10px] font-mono text-emerald-400">Compounding</p>
                    </div>
                    <div className="p-3 rounded-xl bg-oxford/70 border border-border/50 text-center">
                      <p className="text-[10px] font-mono uppercase text-muted">Hook Hold</p>
                      <p className="text-lg font-bold font-display text-white mt-1">84.2%</p>
                      <p className="text-[10px] font-mono text-frost">First 3 Sec</p>
                    </div>
                    <div className="p-3 rounded-xl bg-oxford/70 border border-border/50 text-center">
                      <p className="text-[10px] font-mono uppercase text-muted">Followers</p>
                      <p className="text-lg font-bold font-display text-white mt-1">+184K</p>
                      <p className="text-[10px] font-mono text-emerald-400">Direct Funnel</p>
                    </div>
                  </div>

                  {/* Retention Curve Simulator */}
                  <div className="p-3.5 rounded-xl bg-oxford/70 border border-border/50">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted mb-2">
                      <span>Algorithmic Retention Curve Across 380 Clips</span>
                      <span className="text-emerald-400 font-semibold">92% Average Completion</span>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1">
                      {[100, 95, 91, 88, 86, 85, 84, 83, 83, 82, 82, 81, 80, 80, 79, 79, 78, 78, 77, 76, 75, 75, 74, 74].map(
                        (val, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-frost/50 hover:bg-emerald-400 transition-colors rounded-t-sm"
                            style={{ height: `${val}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-muted border-t border-border/40 pt-3">
                    <span>Synchronized Cross-Platform Tracking</span>
                    <span className="text-emerald-400 font-medium">Refreshed Every 60s</span>
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
