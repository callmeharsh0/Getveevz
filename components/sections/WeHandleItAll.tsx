"use client";

import React from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Layout, Scissors, Calendar, Layers, Target, BarChart3 } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Page Creation & Setup",
    desc: "We create, brand, and set up all pages for you. Zero effort required from your side.",
    icon: Layout,
  },
  {
    n: "02",
    title: "Clipping & Editing",
    desc: "Every clip is edited to a 10/10 standard with hooks, captions, pacing, and optimization.",
    icon: Scissors,
  },
  {
    n: "03",
    title: "Daily Posting",
    desc: "2 unique clips per day across all pages with no delays or missed schedules.",
    icon: Calendar,
  },
  {
    n: "04",
    title: "Page Management",
    desc: "Full account handling including growth, engagement, and continuous optimization.",
    icon: Layers,
  },
  {
    n: "05",
    title: "Audience Targeting",
    desc: "Platform-specific targeting across YouTube, Instagram, and Facebook to maximize reach.",
    icon: Target,
  },
  {
    n: "06",
    title: "Weekly Reporting",
    desc: "Detailed Excel overview, growth, views, engagement, and per-page breakdown.",
    icon: BarChart3,
  },
];

export default function WeHandleItAll() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="full-service"
      ref={ref}
      className="border-y border-border bg-surface px-4 sm:px-6 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-content">

        {/* ── Eyebrow + Headline ── */}
        <div data-reveal className="max-w-2xl">
          <span className="inline-block font-mono text-xs tracking-eyebrow uppercase text-muted">
            What We Deliver
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-[1.1]">
            Everything.
            <br />
            <span className="italic text-frost">We handle it all.</span>
          </h2>
          <p className="mt-4 text-base text-muted max-w-lg">
            From page creation to weekly reporting — our team runs the entire distribution operation so you don&apos;t have to.
          </p>
        </div>

        {/* ── Services Grid ── */}
        <div
          data-reveal
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden"
        >
          {services.map(({ n, title, desc, icon: Icon }) => (
            <div
              key={n}
              className="group relative bg-surface hover:bg-background transition-colors duration-300 p-8 flex flex-col gap-5"
            >
              {/* Number */}
              <span className="font-display text-5xl font-bold text-border leading-none select-none transition-colors duration-300 group-hover:text-muted/40">
                {n}
              </span>

              {/* Icon + Title */}
              <div className="flex items-start gap-4">
                <div className="mt-0.5 w-9 h-9 rounded-lg border border-border bg-background flex items-center justify-center text-muted group-hover:text-foreground group-hover:border-muted transition-all duration-200 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
