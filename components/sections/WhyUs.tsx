"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const pillars = [
  "Managed clipping network",
  "Multi-platform distribution",
  "Campaign management",
  "Tracking",
  "Structured execution",
];

export default function WhyUs() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="about" ref={ref} className="border-y border-border bg-surface px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 data-reveal className="font-display text-3xl md:text-5xl">
          You&apos;re Not Hiring Another Video Editor.
        </h2>
        <p data-reveal className="mt-6 text-lg text-muted">
          GetVeevz is built around distribution, not simply editing individual
          videos.
        </p>

        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          {pillars.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border px-4 py-2 text-sm text-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
