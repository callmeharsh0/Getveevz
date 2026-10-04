"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Check,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  Compass
} from "lucide-react";
import { openSmartEmail, getSmartEmailLinkProps } from "@/lib/email";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";
import HeadSEO from "@/components/seo/HeadSEO";

const COMPARISON_COLUMNS = [
  { id: "longTerm" as const, label: "Long-Term Distribution", shortLabel: "Long-Term", tag: "Retainer", color: "text-[#111111]" },
  { id: "shortTerm" as const, label: "Short-Term Campaign", shortLabel: "Short-Term", tag: "Blitz Surge", color: "text-[#111111]" },
  { id: "endToEnd" as const, label: "End-to-End Marketing", shortLabel: "Turnkey", tag: "Full-Stack", color: "text-[#0038E2]" },
];

const COMPARISON_DATA = [
  {
    dimension: "Core Objective",
    longTerm: "Compounding, repeatable monthly distribution engine",
    shortTerm: "Concentrated blast for launches, rounds, or announcements",
    endToEnd: "We create your videos and post them across all platforms",
  },
  {
    dimension: "Deployment Timeframe",
    longTerm: "3-month plan commitment across all retainer tiers",
    shortTerm: "Execution within 24 hours / 25–30 day surge",
    endToEnd: "Monthly video production and regular posting schedule",
  },
  {
    dimension: "Testing Volume",
    longTerm: "500–1,000+ clippers for broad A/B audience testing",
    shortTerm: "Targeted seeding across agency-owned theme pages",
    endToEnd: "Scriptwriting, filming guidance, and fast video editing",
  },
  {
    dimension: "Scale Ceiling",
    longTerm: "Top 10–30 winning pages to retainers / 3-Month $36K & $72K tiers ($36K & $72K for 3 months)",
    shortTerm: "Starting at $8K up to $100K+",
    endToEnd: "Grow your presence on LinkedIn, X, Instagram, YouTube & TikTok",
  },
  {
    dimension: "Economics",
    longTerm: "$1/1K CPM Testing ➔ Retainer or 3-Month straight retainers ($36K & $72K for 3 months)",
    shortTerm: "$3/1K CPM (min 10M views) or Seeding starting at $8K",
    endToEnd: "Custom scope discussed and agreed on a quick call",
  },
];

export default function ServicesPage() {
  const [mobileCompareTab, setMobileCompareTab] = useState<"longTerm" | "shortTerm" | "endToEnd">("longTerm");
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>();
  const comparisonRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://getveevz.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Services",
          "item": "https://getveevz.com/services"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Distribution Architecture & Services — GetVeevz",
      "url": "https://getveevz.com/services",
      "description":
        "Explore GetVeevz distribution models: 3-month test-to-scale clipping retainers, straight monthly retainers, and high-impact short-term surge seeding campaigns.",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": services.map((s, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": s.title,
          "url": `https://getveevz.com/services/${s.slug}`
        }))
      }
    }
  ];

  return (
    <main className="relative w-full min-h-[100dvh] bg-[#F3EFEA] text-[#111111] font-sans overflow-hidden selection:bg-[#0038E2]/20 selection:text-[#0038E2]">
      <HeadSEO
        title="Distribution Architecture & Services — GetVeevz"
        description="Explore GetVeevz distribution models: 3-month test-to-scale clipping retainers, straight monthly retainers, and high-impact short-term surge seeding campaigns."
        canonical="https://getveevz.com/services"
        jsonLd={jsonLd}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 20% 15%, rgba(139,163,197,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 70%, rgba(0,56,226,0.12) 0%, transparent 60%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-multiply bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-20 sm:pt-28 lg:pt-48 pb-28 sm:pb-36 lg:pb-40">

        <div
          ref={headerRef}
          className="text-center max-w-4xl mx-auto mb-20 sm:mb-24 lg:mb-28"
        >
          <div
            data-reveal
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#111111]/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] font-medium text-[#0038E2] mb-8 shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2] inline-block animate-ping" />
            <span>Distribution Architecture</span>
          </div>

          <h1
            data-reveal
            className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-tight text-[#111111] leading-[1.06] mb-6"
          >
            Three Specialized Engines.
            <br />
            <span className="text-[#0038E2]">
              Zero Vanity Friction.
            </span>
          </h1>

          <p
            data-reveal
            className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl mx-auto font-light"
          >
            Whether you need ongoing monthly video distribution, an immediate high-impact campaign, or complete end-to-end video creation and posting, we help you get your brand in front of millions of viewers.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-28 sm:mb-36"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isRetainer = service.slug === "long-term-distribution";
            const isEndToEnd = service.slug === "end-to-end-marketing";

            const specs = isRetainer
              ? [
                { label: "Model 01", value: "3-Month Test-to-Scale" },
                { label: "Model 02", value: "3-Month Straight Retainer" },
                { label: "Month 1 CPM", value: "$1 / 1K Performance Testing" },
                { label: "Months 2–3", value: "Top 10–30 Pages on Retainer" },
              ]
              : isEndToEnd
                ? [
                  { label: "Model 05", value: "Video Scripting & Editing" },
                  { label: "Model 06", value: "Multi-Platform Posting" },
                  { label: "Platforms", value: "LinkedIn, X, IG, YouTube, TikTok" },
                  { label: "Execution", value: "100% Done-For-You" },
                ]
                : [
                  { label: "Model 03", value: "CPM Campaign (Fan + Theme)" },
                  { label: "Model 04", value: "24-Hour High-Volume Seeding" },
                  { label: "Seeding Budget", value: "$8K min to $100K+" },
                  { label: "Account Reach", value: "1M–10M+ Follower Properties" },
                ];

            return (
              <div
                key={service.slug}
                data-reveal
                className={cn("group h-full", isEndToEnd && "lg:col-span-2")}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-[2.25rem]"
                >
                  <div className="relative h-full rounded-[2.25rem] p-2 sm:p-2.5 bg-white/75 border border-[#111111]/10 shadow-[0_20px_48px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-700 ease-gentle group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.11)] group-hover:-translate-y-2 group-hover:border-[#0038E2]/35 group-hover:bg-white/95">

                    <div className="relative h-full rounded-[calc(2.25rem-0.5rem)] bg-white border border-[#111111]/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-8 sm:p-10 lg:p-11 flex flex-col justify-between overflow-hidden">

                      <div
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[70px] opacity-15 transition-opacity duration-700 group-hover:opacity-25",
                          isRetainer
                            ? "bg-[radial-gradient(circle,#0038E2_0%,transparent_70%)]"
                            : isEndToEnd
                              ? "bg-[radial-gradient(circle,#0038E2_0%,transparent_70%)]"
                              : "bg-[radial-gradient(circle,#495B7D_0%,transparent_70%)]"
                        )}
                      />

                      {isEndToEnd ? (
                        <div className="flex flex-col lg:flex-row lg:items-stretch justify-between gap-8 lg:gap-12 h-full">
                          <div className="flex flex-col justify-between lg:w-[40%] shrink-0">
                            <div>
                              <div className="flex items-center justify-between mb-6 sm:mb-8">
                                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 shadow-sm transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:border-[#0038E2]/30">
                                  <Icon className="w-7 h-7 stroke-[1.5] text-[#0038E2]" />
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0038E2]/5 border border-[#0038E2]/15 text-[10px] font-mono uppercase tracking-widest text-[#0038E2] font-semibold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2]" />
                                  <span>03 / END-TO-END</span>
                                </div>
                              </div>

                              <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-[34px] text-[#111111] tracking-tight leading-[1.15] mb-3 group-hover:text-[#0038E2] transition-colors duration-300">
                                {service.title}
                              </h2>

                              <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-6 font-light">
                                We make your videos and post them across all platforms. Everything is completely handled for you from start to finish.
                              </p>
                            </div>

                            <div className="pt-6 border-t border-[#111111]/10 flex items-center justify-between mt-auto">
                              <div className="inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white border border-[#111111] shadow-sm transition-all duration-500 ease-gentle group-hover:bg-[#0038E2] group-hover:border-[#0038E2]">
                                <span className="text-xs sm:text-sm font-medium tracking-tight">
                                  Explore Service
                                </span>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white transition-all duration-500 ease-gentle group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                                </div>
                              </div>

                              <span className="text-[11px] font-mono text-[#777777] uppercase tracking-widest hidden sm:inline-block font-medium group-hover:text-[#0038E2] transition-colors">
                                View Breakdown →
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col justify-between flex-1 lg:pl-6 lg:border-l lg:border-[#111111]/10">
                            <div>
                              <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#0038E2] font-semibold mb-3">
                                What We Do For You
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                                {specs.map((spec) => (
                                  <div
                                    key={spec.label}
                                    className="rounded-xl p-3 sm:p-3.5 bg-[#F8F6F2] border border-[#111111]/8 transition-colors duration-500 group-hover:border-[#111111]/15 group-hover:bg-[#F3EFEA]"
                                  >
                                    <div className="text-[10px] sm:text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-1">
                                      {spec.label}
                                    </div>
                                    <div className="text-xs sm:text-sm font-medium text-[#111111] tracking-tight font-display">
                                      {spec.value}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mb-6">
                                {service.features.slice(0, 4).map((feature) => (
                                  <div
                                    key={feature.title}
                                    className="flex items-start gap-3 text-xs sm:text-sm text-[#444444]"
                                  >
                                    <div className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#0038E2]/10 text-[#0038E2] shrink-0">
                                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                    </div>
                                    <span className="leading-relaxed">
                                      <strong className="font-medium text-[#111111]">{feature.title}:</strong>{" "}
                                      <span className="text-[#666666]">{feature.desc}</span>
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-[#111111]/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#666666]">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                                <span>We handle scripting, filming guidance, editing, and posting</span>
                              </div>
                              <div className="text-[#0038E2] font-semibold">
                                100% Yours · Full Rights to All Videos
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="flex items-center justify-between mb-8">
                              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 shadow-sm transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:border-[#0038E2]/30">
                                <Icon className="w-7 h-7 stroke-[1.5] text-[#0038E2]" />
                              </div>

                              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0038E2]/5 border border-[#0038E2]/15 text-[10px] font-mono uppercase tracking-widest text-[#0038E2] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2]" />
                                <span>{isRetainer ? "01 / RETAINER" : "02 / SURGE"}</span>
                              </div>
                            </div>

                            <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-[34px] text-[#111111] tracking-tight leading-[1.15] mb-3 group-hover:text-[#0038E2] transition-colors duration-300">
                              {service.title}
                            </h2>

                            <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-8 font-light">
                              {service.shortDesc}
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-8">
                              {specs.map((spec) => (
                                <div
                                  key={spec.label}
                                  className="rounded-xl p-3 sm:p-3.5 bg-[#F8F6F2] border border-[#111111]/8 transition-colors duration-500 group-hover:border-[#111111]/15 group-hover:bg-[#F3EFEA]"
                                >
                                  <div className="text-[10px] sm:text-[11px] font-mono text-[#777777] uppercase tracking-wider mb-1">
                                    {spec.label}
                                  </div>
                                  <div className="text-xs sm:text-sm font-medium text-[#111111] tracking-tight font-display">
                                    {spec.value}
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="space-y-2.5 mb-10">
                              {service.features.slice(0, 3).map((feature) => (
                                <div
                                  key={feature.title}
                                  className="flex items-start gap-3 text-xs sm:text-sm text-[#444444]"
                                >
                                  <div className="mt-0.5 flex items-center justify-center w-4 h-4 rounded-full bg-[#0038E2]/10 text-[#0038E2] shrink-0">
                                    <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                  </div>
                                  <span className="leading-relaxed">
                                    <strong className="font-medium text-[#111111]">{feature.title}:</strong>{" "}
                                    <span className="text-[#666666]">{feature.desc}</span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-6 border-t border-[#111111]/10 flex items-center justify-between">
                            <div className="inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white border border-[#111111] shadow-sm transition-all duration-500 ease-gentle group-hover:bg-[#0038E2] group-hover:border-[#0038E2]">
                              <span className="text-xs sm:text-sm font-medium tracking-tight">
                                Explore Architecture
                              </span>
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white transition-all duration-500 ease-gentle group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                              </div>
                            </div>

                            <span className="text-[11px] font-mono text-[#777777] uppercase tracking-widest hidden sm:inline-block font-medium group-hover:text-[#0038E2] transition-colors">
                              View Breakdown →
                            </span>
                          </div>
                        </>
                      )}

                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        <div
          ref={comparisonRef}
          className="mb-28 sm:mb-36"
        >
          <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
            <div
              data-reveal
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#111111]/10 text-[10px] font-mono uppercase tracking-[0.2em] font-medium text-[#0038E2] mb-4 shadow-sm"
            >
              <Layers className="w-3.5 h-3.5 stroke-[1.5]" />
              <span>Comparative Blueprint</span>
            </div>
            <h2
              data-reveal
              className="font-display font-medium text-2xl sm:text-3xl md:text-4xl text-[#111111] tracking-tight"
            >
              Selecting the Optimal Vector
            </h2>
            <p
              data-reveal
              className="mt-3 text-sm sm:text-base text-[#555555] font-light"
            >
              Direct comparison across compounding retainer engines, high-velocity surges, and full-stack turnkey production.
            </p>
          </div>

          <div
            data-reveal
            className="rounded-[2rem] sm:rounded-[2.25rem] p-1.5 sm:p-2.5 bg-white/75 border border-[#111111]/10 shadow-[0_20px_48px_rgba(0,0,0,0.06)]"
          >
            <div className="rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.25rem-0.5rem)] bg-white border border-[#111111]/5 overflow-hidden">
              
              {/* Mobile Interactive Tabbed Cards (Zero awkward line wrapping) */}
              <div className="md:hidden">
                {/* Segmented Tier Tabs */}
                <div className="p-2 sm:p-3 bg-[#F8F6F2] border-b border-[#111111]/8 grid grid-cols-3 gap-1.5">
                  {COMPARISON_COLUMNS.map((col) => {
                    const isSelected = mobileCompareTab === col.id;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setMobileCompareTab(col.id)}
                        className={cn(
                          "py-2 px-1.5 rounded-xl text-center transition-all duration-200 cursor-pointer flex flex-col items-center justify-center gap-0.5",
                          isSelected
                            ? "bg-white text-[#111111] shadow-xs font-semibold border border-[#111111]/10"
                            : "text-[#666666] hover:text-[#111111] hover:bg-white/50"
                        )}
                      >
                        <span className="text-[9px] font-mono uppercase tracking-wider text-[#0038E2] leading-none">
                          {col.tag}
                        </span>
                        <span className="text-[11px] font-display font-medium tracking-tight leading-tight">
                          {col.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Tier Details */}
                <div className="divide-y divide-[#111111]/6 p-2 sm:p-4">
                  {COMPARISON_DATA.map((row) => (
                    <div key={row.dimension} className="py-3.5 px-3 flex flex-col gap-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#0038E2] font-semibold">
                        {row.dimension}
                      </span>
                      <p className="text-xs text-[#222222] font-medium leading-relaxed">
                        {row[mobileCompareTab]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop & Tablet Full Comparison Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[760px]">
                  <thead>
                    <tr className="border-b border-[#111111]/10 bg-[#F8F6F2]">
                      <th className="py-5 px-6 sm:px-8 text-xs font-mono uppercase tracking-wider text-[#777777] font-semibold w-48 min-w-[180px] whitespace-nowrap">
                        Dimension
                      </th>
                      {COMPARISON_COLUMNS.map((col) => (
                        <th
                          key={col.id}
                          className={cn(
                            "py-5 px-6 sm:px-8 text-xs font-mono uppercase tracking-wider font-semibold min-w-[200px]",
                            col.color
                          )}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111111]/6 text-xs sm:text-sm">
                    {COMPARISON_DATA.map((row) => (
                      <tr key={row.dimension} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-5 px-6 sm:px-8 font-mono text-[#0038E2] font-semibold whitespace-nowrap">
                          {row.dimension}
                        </td>
                        <td className="py-5 px-6 sm:px-8 text-[#222222] font-medium">
                          {row.longTerm}
                        </td>
                        <td className="py-5 px-6 sm:px-8 text-[#444444]">
                          {row.shortTerm}
                        </td>
                        <td className="py-5 px-6 sm:px-8 text-[#444444]">
                          {row.endToEnd}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        <div
          ref={ctaRef}
          className="relative text-center max-w-3xl mx-auto"
        >
          <div
            data-reveal
            className="rounded-[2.25rem] p-2 sm:p-2.5 bg-white/80 border border-[#111111]/10 shadow-[0_24px_54px_rgba(0,0,0,0.08)]"
          >
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-b from-white via-white to-[#F8F6F2] border border-[#111111]/5 p-10 sm:p-14 lg:p-16 relative overflow-hidden">

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#8BA3C5]/20 via-[#0038E2]/15 to-transparent blur-[80px]"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0038E2]/5 border border-[#0038E2]/15 text-[10px] font-mono uppercase tracking-[0.2em] font-medium text-[#0038E2] mb-6">
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Strategic Onboarding</span>
                </div>

                <h2 className="font-display font-medium text-3xl sm:text-4xl md:text-5xl text-[#111111] tracking-tight leading-[1.12] mb-4">
                  Need a Custom Hybrid Vector?
                </h2>

                <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl mx-auto mb-10 font-light">
                  Most tier-1 brands run a hybrid protocol: a continuous long-term clipping engine backed by high-velocity surge bursts around flagship product drops.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    {...getSmartEmailLinkProps({ subject: "Custom Distribution Inquiry" })}
                    onClick={(e) => {
                      e.preventDefault();
                      openSmartEmail({ subject: "Custom Distribution Inquiry" });
                    }}
                    className="group relative inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#111111] text-white font-medium text-sm sm:text-base transition-all duration-500 ease-gentle hover:bg-[#0038E2] hover:scale-105 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.18)] cursor-pointer"
                  >
                    <span>Book Strategy Call</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 transition-transform duration-500 ease-gentle group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5] text-white" />
                    </div>
                  </a>

                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#111111]/15 text-xs sm:text-sm text-[#111111] font-medium transition-all duration-300 hover:bg-[#F3EFEA] hover:border-[#111111]/30 shadow-sm"
                  >
                    <span>Back to Overview</span>
                  </Link>
                </div>

                <div className="mt-8 text-xs font-mono text-[#777777]">
                  Response SLA: Guaranteed within 4 business hours
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
