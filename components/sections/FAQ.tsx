"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface FaqEntry {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqEntry[] = [
  {
    category: "Operations",
    question: "What exactly does GetVeevz do?",
    answer:
      "We turn your existing long-form content (podcasts, keynotes, webinars, and interviews) into coordinated short-form distribution engines across Instagram Reels, YouTube Shorts, and TikTok. We handle complete clipping, algorithmic pacing, multi-channel publishing, and unified performance tracking.",
  },
  {
    category: "Source Footage",
    question: "What type of raw content can we provide?",
    answer:
      "Any high-value long-form audio or video you produce: video podcasts, keynotes, YouTube long-form, webinars, earnings calls, or live streams. We ingest full 4K ProRes or standard MP4 formats directly through dedicated cloud pipelines.",
  },
  {
    category: "Platforms",
    question: "Which distribution platforms do you optimize for?",
    answer:
      "We coordinate synchronized distribution across Instagram Reels, YouTube Shorts, and TikTok. Each platform receives native vertical aspect ratios, customized retention hooks, algorithm-tested pacing, and tailored metadata for search authority.",
  },
  {
    category: "Creative Quality",
    question: "Who edits and produces the short-form clips?",
    answer:
      "Our in-house network of elite vertical video editors and storytellers. Every clip is hand-crafted with custom typography, sound design, dynamic zooms, and retention-tested pacing — never generic automated AI templates.",
  },
  {
    category: "Network Reach",
    question: "Where are the clips actually posted?",
    answer:
      "We deploy clips across your verified brand channels as well as our managed ecosystem of high-engagement niche distribution accounts and creator placements to compound organic reach and discovery.",
  },
  {
    category: "Onboarding",
    question: "How long does the onboarding process take?",
    answer:
      "Typically 48 to 72 hours. Once we complete our brief alignment and receive access to your catalog, our editorial team produces the first sprint batch of clips and begins deployment on your campaign timeline.",
  },
  {
    category: "Engagement",
    question: "How does your pricing and campaign model work?",
    answer:
      "We provide two distinct campaign structures: a Long-Term retainer for continuous compounding clipping and CPM-based growth, and a 25–30 day Short-Term sprint for targeted product launches, press moments, and mass PR seeding.",
  },
  {
    category: "Intelligence",
    question: "How do we track views and audience growth?",
    answer:
      "You receive access to a live real-time analytics dashboard tracking total views, watch time, follower growth, engagement rates, and per-page distribution performance with automated weekly intelligence summaries.",
  },
];

export default function FAQ() {
  const ref = useScrollReveal<HTMLDivElement>();

  // Split items evenly into 2 asymmetric columns to prevent layout jumps on accordion expand
  const col1 = FAQ_ITEMS.filter((_, i) => i % 2 === 0);
  const col2 = FAQ_ITEMS.filter((_, i) => i % 2 === 1);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden bg-[#090e14] py-24 sm:py-32 md:py-40"
    >
      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* AMBIENT MESH GLOW: Frost & Steel atmospheric gradients                */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/3 -translate-x-1/2 w-[680px] h-[450px] bg-frost/5 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-1/4 translate-x-1/2 w-[580px] h-[380px] bg-[#177DFD]/5 blur-[140px] rounded-full"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        {/* ────────────────────────────────────────────────────────────────── */}
        {/* SECTION HEADER: Massive agency typography scale                    */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div data-reveal className="mb-14 sm:mb-20 max-w-3xl">
          {/* Eyebrow badge */}
          <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-white/[0.04] border border-white/[0.08] text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-frost/90 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-frost animate-pulse" />
            Questions &amp; Details
          </span>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-moonlight leading-[1.05]">
            Everything you
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-frost via-moonlight to-white">
              need to know.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted max-w-xl leading-relaxed font-normal">
            Clear mechanics behind how we convert raw long-form footage into
            millions of coordinated short-form impressions.
          </p>
        </div>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* ASYMMETRICAL BENTO ACCORDION: Double-Bezel Hardware Architecture    */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <Accordion type="single" collapsible className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full">
              {col1.map((item, idx) => {
                const originalIndex = idx * 2;
                return (
                  <FaqCard
                    key={originalIndex}
                    item={item}
                    index={originalIndex}
                  />
                );
              })}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full">
              {col2.map((item, idx) => {
                const originalIndex = idx * 2 + 1;
                return (
                  <FaqCard
                    key={originalIndex}
                    item={item}
                    index={originalIndex}
                  />
                );
              })}
            </div>
          </div>
        </Accordion>

        {/* ────────────────────────────────────────────────────────────────── */}
        {/* CTA: Button-in-Button Nested Architecture                          */}
        {/* ────────────────────────────────────────────────────────────────── */}
        <div
          data-reveal
          className="mt-16 sm:mt-24 pt-10 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-center sm:text-left">
            <p className="text-base sm:text-lg font-medium text-moonlight font-display">
              Have a specific catalog or distribution question?
            </p>
            <p className="mt-1 text-xs sm:text-sm text-muted">
              Our strategy team reviews raw footage and catalogs within 24 hours.
            </p>
          </div>

          <a
            href="#pricing"
            className="group relative inline-flex items-center gap-3 rounded-full pl-6 pr-2.5 py-2 text-xs sm:text-sm font-semibold tracking-wide uppercase bg-moonlight text-oxford hover:bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-2xl shrink-0"
          >
            <span>Speak With Our Team</span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-oxford/10 group-hover:bg-oxford transition-colors duration-300">
              <ArrowUpRight className="h-4 w-4 text-oxford group-hover:text-moonlight transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqCard({ item, index }: { item: FaqEntry; index: number }) {
  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      data-reveal
      className={cn(
        // Double-Bezel Outer Shell: concentric curves with gradient hairline border
        "group relative rounded-[2rem] p-[1.5px] bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-white/[0.01]",
        "border border-white/[0.06] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:border-frost/40 hover:shadow-[0_16px_36px_rgba(2,18,47,0.6)]"
      )}
    >
      <AccordionItem
        value={`item-${index}`}
        className="rounded-[calc(2rem-1.5px)] border-none overflow-hidden"
      >
        {/* Double-Bezel Inner Core: deep surface with inner highlight reflection */}
        <div className="rounded-[calc(2rem-1.5px)] bg-[#0C131D]/95 px-5 sm:px-7 py-5 sm:py-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.07)] transition-colors duration-300">
          <AccordionTrigger
            className={cn(
              "group/trigger flex w-full items-start justify-between text-left py-0 hover:no-underline",
              // Hide primitive default chevron so custom kinetic circle chevron takes full control
              "[&>svg]:hidden"
            )}
          >
            <div className="flex flex-col gap-2 pr-3">
              {/* Category & index row */}
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] text-frost/70 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08]">
                  {paddedIndex}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted/70">
                  {item.category}
                </span>
              </div>

              {/* Question heading */}
              <span className="font-display text-base sm:text-lg font-medium text-moonlight/95 leading-snug group-hover/trigger:text-white transition-colors duration-300">
                {item.question}
              </span>
            </div>

            {/* Custom Kinetic Chevron Button */}
            <span className="shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.04] border border-white/[0.08] text-frost group-hover/trigger:text-white group-hover/trigger:bg-white/10 transition-all duration-300">
              <ChevronDown className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[state=open]:rotate-180" />
            </span>
          </AccordionTrigger>

          <AccordionContent className="overflow-hidden data-[state=closed]:animate-none">
            <div className="pt-4 mt-4 border-t border-white/[0.06] text-sm sm:text-[14.5px] leading-relaxed text-muted font-normal">
              {item.answer}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </div>
  );
}
