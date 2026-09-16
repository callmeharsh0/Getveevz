"use client";

import { LiquidGlassButton } from "@/components/ui/liquid-glass";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { Sparkles } from "lucide-react";

export default function FinalCTA() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section id="cta" ref={ref} className="border-t border-border px-4 sm:px-6 py-16 sm:py-28 md:py-32 text-center relative overflow-hidden">
      {/* Ambient background glow for liquid glass refraction */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-frost/20 via-[#0038E2]/25 to-transparent blur-[120px] -z-10" />

      <div className="mx-auto max-w-2xl">
        <h2 data-reveal className="font-display text-2xl sm:text-3xl md:text-5xl leading-tight">
          You Already Have the Content.
          <br />
          Now Build the Distribution Behind It.
        </h2>
        <p data-reveal className="mt-6 text-lg text-muted">
          Let&apos;s see what we can build around your existing content.
        </p>
        <div data-reveal className="mt-10 flex justify-center">
          <LiquidGlassButton
            size="lg"
            variant="frost"
            href="mailto:contact@getveevz.com?subject=GetVeevz%20Strategy%20Call%20Booking"
            className="px-9 sm:px-11 py-4 text-base sm:text-lg shadow-2xl hover:scale-105"
          >
            <Sparkles className="w-5 h-5 text-frost opacity-90 animate-pulse" />
            <span>Book a Strategy Call</span>
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
}
