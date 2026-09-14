"use client";

import { useRef } from "react";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { faqs } from "@/lib/data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

// Map every FAQ to a bento grid span so the section
// reads as an asymmetrical masonry layout instead of a
// plain centred list.
const bentoSpans: Record<number, string> = {
  0: "col-span-2", // wide
  1: "col-span-1",
  2: "col-span-1",
  3: "col-span-1",
  4: "col-span-2", // wide
  5: "col-span-1",
  6: "col-span-1",
  7: "col-span-1",
  8: "col-span-2", // wide
};

export default function FAQ() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#050505] py-24 sm:py-32 md:py-40"
    >
      {/* ---------------------------------------------------------------- */}
      {/* Ethereal Glass: radial mesh gradient orbs                      */}
      {/* ---------------------------------------------------------------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/4 -translate-x-1/2 w-[600px] h-[400px] bg-frost/5 blur-[120px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 translate-x-1/2 w-[500px] h-[350px] bg-emerald-500/5 blur-[100px] rounded-full"
      />
      {/* Subtle film-grain overlay for physical paper feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(240,237,221,0.3) 0.5px, transparent 0.7px), radial-gradient(circle at 78% 71%, rgba(240,237,221,0.2) 0.5px, transparent 0.8px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* ---------------------------------------------------------------- */}
        {/* SECTION HEADER — massive typographic anchor                     */}
        {/* ---------------------------------------------------------------- */}
        <div className="col-span-3 mb-16 sm:mb-20">
          {/* Eyebrow pill */}
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-medium uppercase tracking-[0.3em] text-frost/80 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-frost/60" />
            Questions &amp; clarity
          </span>

          {/* Display heading */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-moonlight leading-[1.05]">
            Everything you
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-frost via-white to-emerald-300">
              need to know.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted max-w-xl leading-relaxed">
            The details behind how we turn long-form content into coordinated
            short-form distribution that compounds reach across every platform.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* ASYMMETRICAL BENTO GRID                                         */}
        {/* ---------------------------------------------------------------- */}
        <Accordion type="single" collapsible>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-5">
            {faqs.map((faq, i) => {
              const spanClass = bentoSpans[i] ?? "col-span-1";
              return (
                <div
                  key={i}
                  className={cn(
                    spanClass,
                    // Double-Bezel outer shell
                    "relative rounded-[2rem] bg-white/[0.03] border border-white/[0.06] p-[1px] backdrop-blur-sm",
                  )}
                >
                  <AccordionItem value={`item-${i}`} className="rounded-[2rem] overflow-hidden">
                    {/* Inner core — glass surface */}
                    <div className="rounded-[calc(2rem-1px)] bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <AccordionTrigger className="group flex w-full items-center justify-between px-6 py-5 text-left text-base font-medium text-moonlight/90 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-moonlight">
                        <span className="pr-4 leading-relaxed">
                          {faq.question}
                        </span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-frost/60 transition-[transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[state=open]:rotate-180" />
                      </AccordionTrigger>
                      <AccordionContent className="overflow-hidden data-[state=closed]:animate-none">
                        <div className="px-6 pb-5 text-sm leading-relaxed text-muted/80">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                </div>
              );
            })}
          </div>
        </Accordion>

        {/* ---------------------------------------------------------------- */}
        {/* CTA — Button-in-Button trailing icon                           */}
        {/* ---------------------------------------------------------------- */}
        <div className="col-span-3 mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-sm text-muted">
            Still have questions? Let&apos;s talk.
          </p>
          <button className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-xs sm:text-sm font-medium tracking-wide uppercase bg-moonlight text-oxford hover:bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-xl">
            <span>Get in touch</span>
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-oxford/10 group-hover:bg-oxford transition-colors duration-300">
              <ArrowUpRight className="h-3.5 w-3.5 text-oxford group-hover:text-moonlight transition-colors duration-300" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
