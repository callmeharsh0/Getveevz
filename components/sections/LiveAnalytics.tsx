"use client";

import React from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Eye, BarChart2, TrendingUp, LayoutGrid, ArrowUpRight } from "lucide-react";

const features = [
  { title: "Live View Count", icon: Eye },
  { title: "Engagement Metrics", icon: BarChart2 },
  { title: "Conversion Tracking", icon: TrendingUp },
  { title: "Per Page Breakdown", icon: LayoutGrid },
];

const chartPoints = [
  { x: 0, y: 85 },
  { x: 60, y: 70 },
  { x: 130, y: 60 },
  { x: 210, y: 42 },
  { x: 290, y: 28 },
  { x: 370, y: 12 },
  { x: 440, y: 32 },
];

// Build SVG path from points
function buildPath(pts: { x: number; y: number }[]): string {
  return pts
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");
}

const linePath = buildPath(chartPoints);
const areaPath = `${linePath} L ${chartPoints[chartPoints.length - 1].x} 100 L 0 100 Z`;

export default function LiveAnalytics() {
  const ref = useScrollReveal<HTMLDivElement>();

  const scrollToCTA = () => {
    const el = document.getElementById("cta") || document.querySelector("footer");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="analytics"
      ref={ref}
      className="border-t border-border bg-background px-6 py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* ── Left: Copy Column ── */}
          <div>
            <div data-reveal>
              <span className="inline-block font-mono text-xs tracking-eyebrow uppercase text-muted">
                Performance Tracking
              </span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
                Your own live{" "}
                <span className="font-serif italic text-frost">analytics dashboard.</span>
              </h2>
              <p className="mt-4 text-base text-muted leading-relaxed">
                Track views, engagement, follower growth, and per-page performance in real time — across every platform, every page, every day.
              </p>
            </div>

            {/* Feature badges */}
            <div data-reveal className="mt-8 grid grid-cols-2 gap-3">
              {features.map(({ title, icon: Icon }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-surface hover:border-muted transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center text-muted shrink-0">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{title}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div data-reveal className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted font-medium">Ready to scale your brand?</p>
              <button
                type="button"
                onClick={scrollToCTA}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Let&apos;s get started — getVeevz
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Right: Dashboard Mockup ── */}
          <div data-reveal>
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">

              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                    <div className="w-3 h-3 rounded-full bg-border" />
                  </div>
                  <span className="ml-3 font-display text-xs font-semibold text-foreground">Overview</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#177DFD] animate-pulse" />
                  <span className="font-mono text-[10px] text-muted uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Metric Cards */}
              <div className="grid grid-cols-2 gap-px bg-border m-5 mb-0 rounded-xl overflow-hidden">
                <div className="bg-surface p-4">
                  <p className="text-xs text-muted">Live Views</p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-foreground">8,246</span>
                    <span className="text-[11px] font-mono text-[#177DFD]">+12.5%</span>
                  </div>
                </div>
                <div className="bg-surface p-4">
                  <p className="text-xs text-muted">Engagement</p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <span className="font-display text-2xl font-bold text-foreground">5,682</span>
                    <span className="text-[11px] font-mono text-[#177DFD]">+8.3%</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="mx-5 mt-4 p-4 rounded-xl border border-border bg-background">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-foreground">Views Over Time</span>
                  <span className="text-[10px] font-mono text-muted border border-border rounded px-2 py-0.5">
                    Peak: 7,842 — May 16
                  </span>
                </div>

                {/* SVG Area Chart */}
                <svg
                  viewBox="0 0 440 100"
                  className="w-full h-28"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8BA3C5" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8BA3C5" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Horizontal grid lines */}
                  {[25, 50, 75].map((y) => (
                    <line key={y} x1="0" y1={y} x2="440" y2={y} stroke="rgba(139,163,197,0.12)" strokeWidth="1" />
                  ))}
                  {/* Filled area */}
                  <path d={areaPath} fill="url(#areaGrad)" />
                  {/* Line */}
                  <path d={linePath} fill="none" stroke="#8BA3C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Peak dot */}
                  <circle cx="370" cy="12" r="3" fill="#F0ECDD" />
                  <circle cx="370" cy="12" r="6" fill="none" stroke="#8BA3C5" strokeWidth="1" strokeOpacity="0.5" />
                </svg>

                {/* X-axis labels */}
                <div className="mt-2 flex justify-between text-[10px] font-mono text-muted/70">
                  {["May 12", "May 13", "May 14", "May 15", "May 16", "May 17"].map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </div>

              {/* Platform breakdown */}
              <div className="mx-5 mt-4 mb-5">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-eyebrow text-muted mb-2 px-1">
                  <span>Platform</span>
                  <span>Views / Growth</span>
                </div>
                {[
                  { p: "YouTube Shorts", v: "3.4M", g: "+24%" },
                  { p: "Instagram Reels", v: "4.1M", g: "+38%" },
                ].map(({ p, v, g }) => (
                  <div
                    key={p}
                    className="flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-surface mb-1 last:mb-0 text-sm"
                  >
                    <span className="text-foreground font-medium">{p}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-foreground">{v}</span>
                      <span className="font-mono text-[11px] text-[#177DFD]">{g}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
