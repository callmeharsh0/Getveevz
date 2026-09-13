"use client";

import React from "react";
import { CircularTestimonials, Testimonial } from "@/components/ui/circular-testimonials";

const CLIENT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "GetVeevz transformed our 2-hour weekly podcast into 40+ high-retention short clips across TikTok and Reels. We scaled from 200k to over 14M monthly impressions without changing our production workflow.",
    name: "Tamar Mendelson",
    designation: "Host, The Dialogue Podcast",
    src:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    quote:
      "Unlike standard video editors who just trim video with subtitles, GetVeevz understands algorithmic distribution hooks, pacing, and multi-platform publishing schedules.",
    name: "Joe Charlescraft",
    designation: "Founder, SaaS Breakthrough Summit",
    src:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    quote:
      "The distribution engine is seamless. One keynote turned into 30 days of omnipresent authority on YouTube Shorts and Instagram with zero extra effort from our marketing team.",
    name: "Martina Edelweist",
    designation: "Head of Growth, Apex Media",
    src:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function ClientTestimonials() {
  return (
    <section id="testimonials" className="relative w-full py-28 sm:py-36 px-6 overflow-hidden bg-[#000000]">
      {/* Background Depth & Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-frost/10 blur-[150px] rounded-full opacity-60"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-border/80 text-[11px] sm:text-xs font-mono uppercase tracking-eyebrow text-frost mb-4 backdrop-blur-md">
            <span>Clients We Worked With</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-moonlight">
            Loved by High-Output <span className="text-frost">Creators & Founders</span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-muted font-body">
            Hear from teams who turned their long-form recordings into compounding organic distribution networks.
          </p>
        </div>

        {/* Circular Testimonials Component */}
        <div className="w-full flex justify-center items-center">
          <CircularTestimonials
            testimonials={CLIENT_TESTIMONIALS}
            autoplay={true}
            colors={{
              name: "#F0ECDD",
              designation: "#8BA3C5",
              testimony: "#E2DDCB",
              arrowBackground: "#23354D",
              arrowForeground: "#F0ECDD",
              arrowHoverBackground: "#8BA3C5",
            }}
            fontSizes={{
              name: "1.75rem",
              designation: "1rem",
              quote: "1.15rem",
            }}
          />
        </div>
      </div>
    </section>
  );
}
