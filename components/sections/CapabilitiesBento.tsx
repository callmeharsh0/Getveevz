"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Scissors,
  Share2,
  Users2,
  LineChart,
  Sparkles,
  ArrowUpRight,
  Flame,
  CheckCircle2,
  Activity,
  Layers,
  Radio,
} from "lucide-react";

export default function CapabilitiesBento() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="concept-assembly-bento"
      className="relative w-full bg-[#030e22] text-moonlight py-24 sm:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden border-b border-border/40"
    >
      {/* Visual concept label badge for client review */}
      <div className="mx-auto max-w-content mb-8 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          Option B · The Assembly Line (Connected Bento Grid)
        </span>
        <span className="text-[11px] font-mono text-muted/80 hidden sm:inline-block">
          All 4 capabilities visible at once
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
            A continuous four-stage assembly line engineered to transform 1 raw episode into millions of impressions.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
          {/* ========================================================================= */}
          {/* CARD 1: CLIPPING (7 Cols, Feature Card)                                    */}
          {/* ========================================================================= */}
          <div
            onMouseEnter={() => setHoveredIndex(0)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-7 p-7 sm:p-9 rounded-3xl bg-surface/50 border border-border/80 hover:border-frost/60 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_0_35px_rgba(139,163,197,0.15)]"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-frost/5 blur-[80px] rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider text-frost bg-oxford/70 border border-border/70 uppercase">
                  Stage 01 · Ingestion &amp; Cut
                </span>
                <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-frost group-hover:scale-110 group-hover:text-white transition-all">
                  <Scissors className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl text-white">
                Clipping
              </h3>
              <p className="mt-2 text-base text-frost font-medium">
                Turn long-form videos into short-form content.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-lg">
                Automated hook isolation, pacing remix, and 9:16 vertical smart auto-framing designed to seize attention in the first 3 seconds.
              </p>
            </div>

            {/* Simulated Live Audio Waveform Card */}
            <div className="mt-8 p-4 rounded-2xl bg-oxford/80 border border-border/60">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2.5">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Hook Detection Analyzer
                </span>
                <span className="text-emerald-400 font-semibold">18 Clips Isolated</span>
              </div>
              <div className="h-10 flex items-end gap-1">
                {[40, 65, 30, 90, 100, 75, 45, 85, 95, 60, 40, 92, 100, 80, 50, 88, 96, 70, 45, 85, 98, 65, 35].map(
                  (val, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm transition-all duration-300 ${
                        val >= 85 ? "bg-emerald-400" : "bg-frost/40 group-hover:bg-frost/60"
                      }`}
                      style={{ height: `${val}%` }}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 2: DISTRIBUTION (5 Cols)                                             */}
          {/* ========================================================================= */}
          <div
            onMouseEnter={() => setHoveredIndex(1)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-5 p-7 sm:p-9 rounded-3xl bg-surface/50 border border-border/80 hover:border-frost/60 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_0_35px_rgba(139,163,197,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider text-emerald-400 bg-oxford/70 border border-border/70 uppercase">
                  Stage 02 · Syndication
                </span>
                <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-all">
                  <Share2 className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl text-white">
                Distribution
              </h3>
              <p className="mt-2 text-base text-frost font-medium">
                Distribute content across relevant short-form platforms and pages.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
                Coordinated publishing across TikTok, YouTube Shorts, and Instagram Reels through our proprietary account mesh.
              </p>
            </div>

            {/* Platform cluster badge stack */}
            <div className="mt-8 space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-oxford/80 border border-border/50 text-xs">
                <span className="font-medium text-white">Instagram Reels</span>
                <span className="text-[10px] font-mono text-emerald-400">16 Synced Pages</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-oxford/80 border border-border/50 text-xs">
                <span className="font-medium text-white">TikTok Channels</span>
                <span className="text-[10px] font-mono text-emerald-400">18 Synced Pages</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-oxford/80 border border-border/50 text-xs">
                <span className="font-medium text-white">YouTube Shorts</span>
                <span className="text-[10px] font-mono text-emerald-400">8 Synced Pages</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 3: CAMPAIGN MANAGEMENT (5 Cols)                                      */}
          {/* ========================================================================= */}
          <div
            onMouseEnter={() => setHoveredIndex(2)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-5 p-7 sm:p-9 rounded-3xl bg-surface/50 border border-border/80 hover:border-frost/60 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_0_35px_rgba(139,163,197,0.15)]"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider text-frost bg-oxford/70 border border-border/70 uppercase">
                  Stage 03 · Pipeline Control
                </span>
                <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-frost group-hover:scale-110 group-hover:text-white transition-all">
                  <Users2 className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl text-white">
                Campaign Management
              </h3>
              <p className="mt-2 text-base text-frost font-medium">
                Coordinate the campaign, contributors, content requirements and submissions.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
                Automated assignment, quality assurance checks, brand guideline compliance, and timeline management.
              </p>
            </div>

            {/* Checklist of requirements */}
            <div className="mt-8 p-4 rounded-2xl bg-oxford/80 border border-border/60 space-y-2">
              <div className="flex items-center gap-2 text-xs text-moonlight">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Creator Chasing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-moonlight">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Automated Brand Safety Checks</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-moonlight">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Scheduled Drop Calendar</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 4: TRACKING (7 Cols, Feature Card)                                   */}
          {/* ========================================================================= */}
          <div
            onMouseEnter={() => setHoveredIndex(3)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="md:col-span-7 p-7 sm:p-9 rounded-3xl bg-surface/50 border border-border/80 hover:border-frost/60 backdrop-blur-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group shadow-xl hover:shadow-[0_0_35px_rgba(139,163,197,0.15)]"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider text-emerald-400 bg-oxford/70 border border-border/70 uppercase">
                  Stage 04 · Performance HUD
                </span>
                <div className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-all">
                  <LineChart className="w-4 h-4" />
                </div>
              </div>

              <h3 className="font-display font-medium text-2xl sm:text-3xl text-white">
                Tracking
              </h3>
              <p className="mt-2 text-base text-frost font-medium">
                Track campaign activity and performance.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed max-w-lg">
                Consolidated live telemetry across every channel: monitor watch time, viral velocity, retention drops, and conversion links.
              </p>
            </div>

            {/* Performance Stats Strip */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-oxford/80 border border-border/60 text-center">
                <span className="text-[10px] font-mono text-muted uppercase">Views Tracked</span>
                <p className="text-xl font-bold font-display text-white mt-1">42.8M+</p>
                <span className="text-[10px] font-mono text-emerald-400">+312%</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-oxford/80 border border-border/60 text-center">
                <span className="text-[10px] font-mono text-muted uppercase">Hook Hold</span>
                <p className="text-xl font-bold font-display text-white mt-1">84.2%</p>
                <span className="text-[10px] font-mono text-frost">Avg Rate</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-oxford/80 border border-border/60 text-center">
                <span className="text-[10px] font-mono text-muted uppercase">Telemetry Sync</span>
                <p className="text-xl font-bold font-display text-white mt-1">99.4%</p>
                <span className="text-[10px] font-mono text-emerald-400">Live API</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
