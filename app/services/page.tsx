"use client";

import React from "react";
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
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

export default function ServicesPage() {
  const headerRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>();
  const comparisonRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <main className="relative w-full min-h-[100dvh] bg-[#F3EFEA] text-[#111111] font-sans overflow-hidden selection:bg-[#0038E2]/20 selection:text-[#0038E2]">
      {/* ── Soft Ambient Radial Depth Mesh (Hero section light aesthetic) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 20% 15%, rgba(139,163,197,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 70%, rgba(0,56,226,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Subtle organic paper grain overlay matching hero */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-multiply bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* ── Main Content Container ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-36 sm:pt-44 lg:pt-48 pb-28 sm:pb-36 lg:pb-40">
        
        {/* ── Section Header (Light Theme: Dark obsidian typography on cream) ── */}
        <div
          ref={headerRef}
          className="text-center max-w-4xl mx-auto mb-20 sm:mb-24 lg:mb-28"
        >
          {/* Eyebrow Pill Badge */}
          <div
            data-reveal
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#111111]/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] font-medium text-[#0038E2] mb-8 shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2] inline-block animate-ping" />
            <span>Distribution Architecture</span>
          </div>

          {/* Main Display Headline */}
          <h1
            data-reveal
            className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[76px] tracking-tight text-[#111111] leading-[1.06] mb-6"
          >
            Two Specialized Engines.
            <br />
            <span className="text-[#0038E2]">
              Zero Vanity Friction.
            </span>
          </h1>

          {/* Editorial Lead Paragraph */}
          <p
            data-reveal
            className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl mx-auto font-light"
          >
            Whether you require an ongoing compounding distribution flywheel or an immediate high-volume surge, our network turns raw content into sovereign market share.
          </p>
        </div>

        {/* ── Flagship Service Cards: FULLY LIGHT THEMED PORCELAIN CARDS ── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-28 sm:mb-36"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            const isRetainer = service.slug === "long-term-distribution";
            
            // Tailored metrics for each service
            const specs = isRetainer
              ? [
                  { label: "Clipping Force", value: "500–1,000+ Creators" },
                  { label: "Target CPM", value: "$1–$3 / 1K Views" },
                  { label: "Winning Pages", value: "10–30 Fixed Retainers" },
                  { label: "Horizon", value: "3-Month Compounding" },
                ]
              : [
                  { label: "Execution Speed", value: "Within 24 Hours" },
                  { label: "Account Reach", value: "1M–10M+ Followers" },
                  { label: "Surge Scale", value: "Up to $100K+ / Day" },
                  { label: "Pricing Model", value: "Fixed-Cost Placements" },
                ];

            return (
              <div
                key={service.slug}
                data-reveal
                className="group h-full"
              >
                <Link 
                  to={`/services/${service.slug}`} 
                  className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-[2.25rem]"
                >
                  {/* Outer Shell (Light Porcelain Double-Bezel Enclosure with Soft Ambient Drop Shadow) */}
                  <div className="relative h-full rounded-[2.25rem] p-2 sm:p-2.5 bg-white/75 border border-[#111111]/10 shadow-[0_20px_48px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[0_28px_60px_rgba(0,0,0,0.11)] group-hover:-translate-y-2 group-hover:border-[#0038E2]/35 group-hover:bg-white/95">
                    
                    {/* Inner Core (Concentric Machined Cavity in Pure White with Crisp Light-Mode Hierarchy) */}
                    <div className="relative h-full rounded-[calc(2.25rem-0.5rem)] bg-white border border-[#111111]/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] p-8 sm:p-10 lg:p-11 flex flex-col justify-between overflow-hidden">
                      
                      {/* Atmospheric Ambient Glow inside card */}
                      <div
                        aria-hidden="true"
                        className={cn(
                          "pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[70px] opacity-15 transition-opacity duration-700 group-hover:opacity-25",
                          isRetainer 
                            ? "bg-[radial-gradient(circle,#0038E2_0%,transparent_70%)]" 
                            : "bg-[radial-gradient(circle,#495B7D_0%,transparent_70%)]"
                        )}
                      />

                      {/* Card Content Top: Badge, Icon & Title */}
                      <div>
                        <div className="flex items-center justify-between mb-8">
                          {/* Hardware-Enclosed Icon Badge in Warm Bone */}
                          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:border-[#0038E2]/30">
                            <Icon className="w-7 h-7 stroke-[1.5] text-[#0038E2]" />
                          </div>

                          {/* Index Pill Tag */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0038E2]/5 border border-[#0038E2]/15 text-[10px] font-mono uppercase tracking-widest text-[#0038E2] font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2]" />
                            <span>{isRetainer ? "01 / RETAINER" : "02 / SURGE"}</span>
                          </div>
                        </div>

                        {/* Title & Short Tagline */}
                        <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-[34px] text-[#111111] tracking-tight leading-[1.15] mb-3 group-hover:text-[#0038E2] transition-colors duration-300">
                          {service.title}
                        </h2>
                        
                        <p className="text-sm sm:text-base text-[#555555] leading-relaxed mb-8 font-light">
                          {service.shortDesc}
                        </p>

                        {/* Live Architectural Spec Sheet (Nested Mini-Bento in Light Bone) */}
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

                        {/* Key Pillars Checklist */}
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

                      {/* Card Footer: Button-in-Button CTA */}
                      <div className="pt-6 border-t border-[#111111]/10 flex items-center justify-between">
                        <div className="inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-[#111111] text-white border border-[#111111] shadow-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#0038E2] group-hover:border-[#0038E2]">
                          <span className="text-xs sm:text-sm font-medium tracking-tight">
                            Explore Architecture
                          </span>
                          {/* Nested trailing icon disc */}
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105">
                            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                          </div>
                        </div>

                        <span className="text-[11px] font-mono text-[#777777] uppercase tracking-widest hidden sm:inline-block font-medium group-hover:text-[#0038E2] transition-colors">
                          View Breakdown →
                        </span>
                      </div>

                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Architectural Decision Matrix: FULLY LIGHT THEMED BLUEPRINT ── */}
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
              Direct comparison between compounding retainer deployment and rapid surge amplification.
            </p>
          </div>

          {/* Matrix Card: Light Double-Bezel Enclosure */}
          <div
            data-reveal
            className="rounded-[2.25rem] p-2 sm:p-2.5 bg-white/75 border border-[#111111]/10 shadow-[0_20px_48px_rgba(0,0,0,0.06)]"
          >
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-white border border-[#111111]/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[620px]">
                  <thead>
                    <tr className="border-b border-[#111111]/10 bg-[#F8F6F2]">
                      <th className="py-5 px-6 sm:px-8 text-xs font-mono uppercase tracking-wider text-[#777777] font-semibold">
                        Dimension
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold">
                        Long-Term Distribution
                      </th>
                      <th className="py-5 px-6 sm:px-8 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold">
                        Short-Term Campaign
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#111111]/6 text-xs sm:text-sm">
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-5 px-6 sm:px-8 font-mono text-[#0038E2] font-semibold">
                        Core Objective
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#222222] font-medium">
                        Compounding, repeatable monthly distribution engine
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#222222] font-medium">
                        Concentrated blast for launches, rounds, or announcements
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-5 px-6 sm:px-8 font-mono text-[#0038E2] font-semibold">
                        Deployment Timeframe
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        3-month minimum commitment / monthly retainer
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        Execution within 24 hours / 1 to 7 day surge
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-5 px-6 sm:px-8 font-mono text-[#0038E2] font-semibold">
                        Testing Volume
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        500–1,000+ clippers for broad A/B audience testing
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        Targeted seeding across agency-owned theme pages
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-5 px-6 sm:px-8 font-mono text-[#0038E2] font-semibold">
                        Scale Ceiling
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        Top 10–30 performing pages transitioned to retainers
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        Scaled from $12K minimum up to $100K+ in a single day
                      </td>
                    </tr>
                    <tr className="hover:bg-[#FAF8F5] transition-colors">
                      <td className="py-5 px-6 sm:px-8 font-mono text-[#0038E2] font-semibold">
                        Economics
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        Performance CPM ($1–$3/1K) moving to fixed monthly retainer
                      </td>
                      <td className="py-5 px-6 sm:px-8 text-[#444444]">
                        Fixed-cost per post with verified audience inventory
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* ── Executive Strategy Concierge: LIGHT DOUBLE-BEZEL CARD ── */}
        <div
          ref={ctaRef}
          className="relative text-center max-w-3xl mx-auto"
        >
          {/* Double-Bezel Light Enclosure for CTA */}
          <div
            data-reveal
            className="rounded-[2.25rem] p-2 sm:p-2.5 bg-white/80 border border-[#111111]/10 shadow-[0_24px_54px_rgba(0,0,0,0.08)]"
          >
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-b from-white via-white to-[#F8F6F2] border border-[#111111]/5 p-10 sm:p-14 lg:p-16 relative overflow-hidden">
              
              {/* Radial center highlight */}
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

                {/* Primary Button-in-Button Action */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:contact@getveevz.com?subject=Custom%20Distribution%20Inquiry"
                    className="group relative inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#111111] text-white font-medium text-sm sm:text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#0038E2] hover:scale-105 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
                  >
                    <span>Book Strategy Call</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
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
