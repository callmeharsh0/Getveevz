"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Problem() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section ref={ref} className="px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h2 data-reveal className="font-display text-3xl md:text-5xl leading-tight">
          You&apos;re Already Creating the Content.
          <br />
          Why Isn&apos;t It Being Distributed Everywhere?
        </h2>
        <p data-reveal className="mt-6 text-lg text-muted">
          Most creators and businesses invest heavily in long-form content but
          don&apos;t have the infrastructure to consistently turn that content
          into large-scale short-form distribution. GetVeevz handles that
          operation.
        </p>

        {/* Placeholder visual: Long-form → Clips → Multiple channels */}
        <div data-reveal className="mt-14 flex h-40 items-center justify-center rounded-2xl border border-border bg-surface text-sm text-muted">
          Visual: Long-form content → Clips → Distribution channels
        </div>
      </div>
    </section>
  );
}
