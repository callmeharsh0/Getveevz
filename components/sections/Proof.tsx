"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { proofLogos } from "@/lib/data";

// SWAP TARGET: 21st.dev has several "logo marquee" / "logo cloud" components —
// paste one in here and feed it `proofLogos` from lib/data.ts.
export default function Proof() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="proof" ref={ref} className="border-y border-border bg-surface px-6 py-20">
      <div className="mx-auto max-w-content text-center">
        <h2 data-reveal className="font-display text-3xl md:text-4xl">
          Built to Distribute Content at Scale
        </h2>

        {proofLogos.length > 0 ? (
          <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-10 opacity-70">
            {proofLogos.map((logo) => (
              <span key={logo.name} className="text-lg text-muted">
                {logo.name}
              </span>
            ))}
          </div>
        ) : (
          <p data-reveal className="mt-10 text-sm text-muted">
            Client logos pending approval — do not publish until confirmed (see brief §6).
          </p>
        )}
      </div>
    </section>
  );
}
