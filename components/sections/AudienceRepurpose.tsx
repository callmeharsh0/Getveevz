"use client";

import React from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Play, ArrowRight } from "lucide-react";

function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const stats = [
  { value: "1B+", label: "Views Generated" },
  { value: "1.5M+", label: "Followers Gained" },
  { value: "250+", label: "Active Pages" },
  { value: "80+", label: "Editors Trained" },
];

const platforms = [
  { name: "Instagram", icon: InstagramIcon, color: "from-pink-500 to-purple-600" },
  { name: "YouTube", icon: YouTubeIcon, color: "from-red-500 to-red-700" },
  { name: "TikTok", icon: TikTokIcon, color: "from-slate-800 to-slate-950 border border-white/10" },
  { name: "Facebook", icon: FacebookIcon, color: "from-blue-600 to-blue-800" },
];

export default function AudienceRepurpose() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="audience-growth"
      ref={ref}
      className="border-y border-border bg-background px-4 sm:px-6 py-14 sm:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-content">

        {/* ── Eyebrow + Headline ── */}
        <div data-reveal className="text-center max-w-3xl mx-auto">
          <span className="inline-block font-mono text-xs tracking-eyebrow uppercase text-muted">
            Content Distribution
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Your content deserves
            <br />
            <span className="italic text-frost">a bigger audience.</span>
          </h2>
          <p className="mt-4 text-base text-muted">
            We repurpose your long-form content into daily short-form clips — deployed everywhere.
          </p>
        </div>

        {/* ── Flow Diagram ── */}
        <div data-reveal className="mt-12 sm:mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">

          {/* Step 1: Long-form video */}
          <div className="relative w-full max-w-[240px] sm:max-w-[260px] aspect-video rounded-xl border border-border bg-surface p-4 flex flex-col justify-between group hover:border-muted transition-colors duration-300">
            <div className="flex items-center justify-between text-[11px] text-muted font-mono">
              <span className="px-2 py-0.5 rounded-full bg-background border border-border">4K Master</span>
              <span>48:22</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border border-border bg-background flex items-center justify-center text-foreground group-hover:bg-surface transition-all">
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              </div>
            </div>
            <div>
              <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-muted rounded-full" />
              </div>
              <p className="mt-1.5 text-[11px] text-muted font-medium truncate">Full Podcast / Keynote Recording</p>
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-5 h-5 text-muted rotate-90 md:rotate-0 shrink-0" />

          {/* Step 2: Short-form fan of clips */}
          <div className="relative w-44 sm:w-52 h-40 sm:h-44 flex items-center justify-center shrink-0">
            {/* Left card */}
            <div className="absolute -left-4 -rotate-12 w-24 h-36 rounded-xl border border-border bg-surface p-2 flex flex-col justify-between opacity-70 hover:opacity-100 hover:rotate-0 hover:z-20 transition-all duration-300 cursor-default">
              <span className="text-[9px] font-mono text-muted px-1.5 py-0.5 rounded bg-background border border-border w-fit">#01</span>
              <Play className="w-4 h-4 fill-current text-muted mx-auto" />
              <div className="h-0.5 bg-border rounded" />
            </div>

            {/* Center card — elevated */}
            <div className="absolute z-10 w-28 h-40 rounded-xl border border-muted/60 bg-surface p-2.5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.3)] scale-105">
              <div className="flex items-center justify-between text-[9px] font-mono text-muted">
                <span className="text-[9px] font-bold text-foreground">VIRAL HOOK</span>
                <span>0:45</span>
              </div>
              <Play className="w-5 h-5 fill-current text-foreground mx-auto" />
              <div>
                <p className="text-[9px] font-medium text-foreground truncate">High-Retention Edit</p>
                <div className="mt-1 h-0.5 bg-muted/40 rounded" />
              </div>
            </div>

            {/* Right card */}
            <div className="absolute -right-4 rotate-12 w-24 h-36 rounded-xl border border-border bg-surface p-2 flex flex-col justify-between opacity-70 hover:opacity-100 hover:rotate-0 hover:z-20 transition-all duration-300 cursor-default">
              <span className="text-[9px] font-mono text-muted px-1.5 py-0.5 rounded bg-background border border-border w-fit">#02</span>
              <Play className="w-4 h-4 fill-current text-muted mx-auto" />
              <div className="h-0.5 bg-border rounded" />
            </div>
          </div>

          {/* Arrow */}
          <ArrowRight className="w-5 h-5 text-muted rotate-90 md:rotate-0 shrink-0" />

          {/* Step 3: Platform grid */}
          <div className="grid grid-cols-2 gap-2 p-4 rounded-xl border border-border bg-surface">
            {platforms.map(({ name, icon: Icon, color }) => (
              <div
                key={name}
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white hover:scale-105 transition-transform duration-200`}
                title={name}
              >
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider rule ── */}
        <div data-reveal className="mt-20 relative flex items-center">
          <div className="flex-1 h-px bg-border" />
          <span className="mx-5 font-mono text-xs tracking-eyebrow uppercase text-muted whitespace-nowrap">
            what&apos;s running behind the scenes
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* ── Stats Row ── */}
        <div data-reveal className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="group bg-background hover:bg-surface transition-colors duration-300 px-6 py-8 text-center"
            >
              <span className="block font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                {value}
              </span>
              <span className="mt-2 block text-sm text-muted">{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
