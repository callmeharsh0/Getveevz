"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const items = [
  { title: "Clipping", desc: "Turn long-form videos into short-form content." },
  { title: "Distribution", desc: "Distribute content across relevant short-form platforms and pages." },
  { title: "Campaign Management", desc: "Coordinate the campaign, contributors, content requirements and submissions." },
  { title: "Tracking", desc: "Track campaign activity and performance." },
];

// SWAP TARGET: 21st.dev "bento grid" / "feature grid" components map
// directly onto this 4-item array — paste one in and pass `items`.
export default function WhatWeDo() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="distribution" ref={ref} className="px-6 py-28">
      <div className="mx-auto max-w-content">
        <h2 data-reveal className="text-center font-display text-3xl md:text-5xl">
          Everything You Need to Turn Content Into Distribution
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              data-reveal
              className="rounded-2xl border border-border bg-surface p-8"
            >
              <h3 className="font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
