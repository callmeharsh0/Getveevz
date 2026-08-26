"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

const steps = [
  { n: "01", title: "Give Us Your Content", desc: "You provide the relevant content/assets." },
  { n: "02", title: "We Build the Campaign", desc: "We create the campaign structure, requirements and distribution system." },
  { n: "03", title: "Clips Go Live", desc: "Our clipping/distribution network publishes short-form content." },
  { n: "04", title: "Track & Optimize", desc: "We track performance and manage the campaign." },
];

// SWAP TARGET: 21st.dev "timeline" / "stepper" components — this is a
// real sequence (per brief), so numbered markers are justified here.
export default function HowItWorks() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="border-y border-border bg-surface px-6 py-28">
      <div className="mx-auto max-w-content">
        <h2 data-reveal className="text-center font-display text-3xl md:text-5xl">
          From Content to Distribution Without Building the Operation Yourself
        </h2>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {steps.map((step) => (
            <div key={step.n} data-reveal>
              <span className="font-display text-4xl text-accent">{step.n}</span>
              <h3 className="mt-4 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
