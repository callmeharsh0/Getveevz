"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { caseStudies } from "@/lib/data";

// SWAP TARGET: 21st.dev "testimonial carousel" / "case study card" —
// this is the highest-leverage section per the brief. Each card must
// show Client → Campaign → Execution → Results with real numbers.
export default function CaseStudies() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="case-studies" ref={ref} className="px-6 py-28">
      <div className="mx-auto max-w-content">
        <h2 data-reveal className="text-center font-display text-3xl md:text-5xl">
          See What the Distribution Can Look Like
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              data-reveal
              className="flex flex-col rounded-2xl border border-border bg-surface p-8"
            >
              <span className="text-sm uppercase tracking-wide text-muted">
                {cs.client}
              </span>
              <p className="mt-4 text-sm text-muted">Campaign: {cs.campaign}</p>
              <p className="mt-2 text-sm text-muted">Execution: {cs.execution}</p>
              <p className="mt-6 font-display text-2xl text-accent">{cs.results}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
