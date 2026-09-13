"use client";

import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function FinalCTA() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="cta" ref={ref} className="border-t border-border px-4 sm:px-6 py-16 sm:py-28 md:py-32 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 data-reveal className="font-display text-2xl sm:text-3xl md:text-5xl leading-tight">
          You Already Have the Content.
          <br />
          Now Build the Distribution Behind It.
        </h2>
        <p data-reveal className="mt-6 text-lg text-muted">
          Let&apos;s see what we can build around your existing content.
        </p>
        <Button data-reveal size="lg" className="mt-10">
          Book a Strategy Call
        </Button>
      </div>
    </section>
  );
}
