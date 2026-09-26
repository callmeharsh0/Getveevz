"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Check, ArrowUpRight, Clock, Rocket, Zap, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type PricingTerm = "long-term" | "short-term";
export type PricingModelType = PricingTerm; // Backwards-compatibility alias
export type Currency = "USD" | "INR";

export interface PlanSpec {
  label: string;
  value: string | { USD: string; INR: string };
}

export interface PricingPlan {
  id: string;
  name: string;
  badge: string;
  subtitle: string;
  rateDisplay: {
    USD: string;
    INR: string;
  };
  ratePeriod: string;
  highlightNote: string;
  icon: typeof Rocket;
  specs: PlanSpec[];
  subFormats?: { title: string; desc: string | { USD: string; INR: string } }[];
}

const longTermPlans: PricingPlan[] = [
  {
    id: "long-term-3mo",
    name: "3-Month Campaign",
    badge: "Test ➔ Identify ➔ Scale",
    subtitle: "Identify what works first, then scale only the strongest pages",
    rateDisplay: {
      USD: "$1–$3 CPM ➔ Fixed Retainer",
      INR: "₹85–₹250 CPM ➔ Fixed Retainer",
    },
    ratePeriod: "3-Month Hybrid Lifecycle",
    highlightNote: "Best when we want to identify what works first, then scale only the strongest pages.",
    icon: Rocket,
    specs: [
      {
        label: "Month 1 (Testing)",
        value: {
          USD: "500–1,000 clippers at $1–$3 / 1K views to filter top hooks, formats & pages",
          INR: "500–1,000 clippers at ₹85–₹250 / 1K views to filter top hooks, formats & pages",
        },
      },
      { label: "Months 2–3 (Scale)", value: "Shortlist top 10–30 winning pages into a fixed monthly retainer" },
      { label: "Predictable Output", value: "Pay for guaranteed distribution from proven pages vs betting on views" },
      { label: "Scale & Renew", value: "Renew, optimize, and expand the proven system month after month" },
    ],
  },
  {
    id: "long-term-straight-retainer",
    name: "Straight Retainer",
    badge: "Predictable Scale",
    subtitle: "For brands already getting consistent views without needing testing",
    rateDisplay: {
      USD: "Fixed Retainer",
      INR: "Fixed Retainer",
    },
    ratePeriod: "Monthly Engagement",
    highlightNote: "Instead of pricing around views, we work on a fixed monthly retainer with defined deliverables.",
    icon: ShieldCheck,
    specs: [
      { label: "Ideal For", value: "Brands with steady traction who don't need a testing phase" },
      { label: "Deliverables", value: "Defined monthly clip volume, designated pages & posting frequency" },
      { label: "Quality Control", value: "Hand-crafted editing, sound design & strict brand standards" },
      { label: "Sustainable Scale", value: "Predictable monthly distribution engine without view volatility" },
    ],
  },
];

const shortTermPlans: PricingPlan[] = [
  {
    id: "short-term-cpm",
    name: "CPM-Based Campaign",
    badge: "Defined View Target",
    subtitle: "Built to hit an agreed view target over a concentrated timeframe",
    rateDisplay: {
      USD: "$1–$3 / 1K Views",
      INR: "₹85–₹250 / 1K Views",
    },
    ratePeriod: "Agreed Budget Cap",
    highlightNote: "Ideal for product launches, events, announcements, or concentrated attention.",
    icon: Zap,
    specs: [
      {
        label: "Pricing Basis",
        value: {
          USD: "$1–$3 per 1K views based on audience and niche targeting",
          INR: "₹85–₹250 per 1K views based on audience and niche targeting",
        },
      },
      { label: "Format A (Fan Pages)", value: "Large clippers pool driving broad distribution toward view target" },
      { label: "Format B (Theme Pages)", value: "Agency-owned niche pages (70% native niche content + brand integration)" },
      { label: "Niches & Delivery", value: "Tech, AI, Business, Education, News — pay only for views delivered" },
      { label: "Re-Activatable", value: "Pages stay in agency network for repeatable future pushes" },
    ],
    subFormats: [
      {
        title: "A. Mass Fan-Page Clipping",
        desc: {
          USD: "Large pool of clippers posting across fan pages at $1–$3/1K views to test and scale fast.",
          INR: "Large pool of clippers posting across fan pages at ₹85–₹250/1K views to test and scale fast.",
        },
      },
      {
        title: "B. Agency-Owned Theme Pages",
        desc: "Native integration (70% niche content / 30% brand) across tech, AI, business, and news.",
      },
    ],
  },
  {
    id: "short-term-seeding",
    name: "Seeding Campaign",
    badge: "Immediate 24-Hr Blitz",
    subtitle: "Immediate, high-volume distribution through established theme pages",
    rateDisplay: {
      USD: "$12,000 — $100,000+",
      INR: "₹10 Lakh — ₹85 Lakh+",
    },
    ratePeriod: "Single-Day to Multi-Day Blitz",
    highlightNote: "You provide brief & narrative; we handle inventory, placements & 24-hr execution.",
    icon: Clock,
    specs: [
      { label: "Speed", value: "Distribution fully completed within 24 hours of brief approval" },
      { label: "Account Reach", value: "Targeted niche pages to massive 1M, 5M, or 10M+ follower accounts" },
      { label: "Niche Coverage", value: "Established pages in AI, Tech, Business, Finance, News & Updates" },
      { label: "Fixed Cost / Post", value: "Every page has its fixed cost per post — zero hidden fees" },
      {
        label: "Budget Scale",
        value: {
          USD: "$12,000 minimum up to $100,000+ for single-day high-volume surges",
          INR: "₹10 Lakh minimum up to ₹85 Lakh+ for single-day high-volume surges",
        },
      },
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [termType, setTermType] = useState<PricingTerm>("long-term");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("long-term-3mo");

  const plans = termType === "long-term" ? longTermPlans : shortTermPlans;
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];

  const handleTermChange = (type: PricingTerm) => {
    if (type === termType) return;
    setTermType(type);
    setSelectedPlanId(type === "long-term" ? "long-term-3mo" : "short-term-cpm");
  };

  const getLocalized = (val: string | { USD: string; INR: string }) => {
    if (typeof val === "string") return val;
    return val[currency];
  };

  // Dynamic spotlight cursor interaction with subtle luminous accent
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  // GSAP Entrance ScrollTrigger Animation
  useEffect(() => {
    if (typeof window === "undefined" || !shellRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        shellRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: shellRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Listen for navigation / events from Agencies section or URL parameters
  useEffect(() => {
    const handleSelectTerm = (e: CustomEvent<string>) => {
      const term = e.detail;
      if (term === "short-term") {
        setTermType("short-term");
        setSelectedPlanId("short-term-cpm");
      } else if (term === "long-term") {
        setTermType("long-term");
        setSelectedPlanId("long-term-3mo");
      }
    };

    window.addEventListener("select-pricing-term" as unknown as string, handleSelectTerm as EventListener);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const term = params.get("term");
      if (term === "short-term") {
        setTermType("short-term");
        setSelectedPlanId("short-term-cpm");
      } else if (term === "long-term") {
        setTermType("long-term");
        setSelectedPlanId("long-term-3mo");
      }
    }

    return () => {
      window.removeEventListener("select-pricing-term" as unknown as string, handleSelectTerm as EventListener);
    };
  }, []);

  const handleOrder = () => {
    const cta = document.getElementById("questionnaire") || document.getElementById("cta") || document.querySelector("footer");
    cta?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-label="Pricing and campaign frameworks"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-[#090A0D] text-[#F8F6F2] overflow-hidden"
    >
      {/* ── Top Section Border: Subtle Gradient Fade & Feathered Hairline ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-40 sm:h-56 bg-gradient-to-b from-[#090E14] via-[#090A0D]/75 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"
      />

      {/* ── Bottom Section Border: Subtle Gradient Fade & Feathered Hairline ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-40 sm:h-56 bg-gradient-to-t from-[#090E14] via-[#090A0D]/75 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"
      />

      {/* ── Spatial Depth Ambient Background Mesh (Obsidian Base + Subtle Accents) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 8%, rgba(0, 56, 226, 0.08) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 90% 90%, rgba(139, 163, 198, 0.05) 0%, transparent 70%)",
        }}
      />

      {/* Atmospheric micro-grain overlay for physical tactile depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-screen bg-[radial-gradient(#F8F6F2_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Doppelrand (Double-Bezel) Outer Hardware Shell in Deep Black ── */}
        <div
          ref={shellRef}
          className="relative rounded-[2.5rem] p-2.5 sm:p-3.5 bg-[#121316] border border-white/[0.08] shadow-[0_32px_100px_-20px_rgba(0,0,0,0.95)] before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
        >
          {/* Inner Concentric Core Enclosure in Solid Carbon Black */}
          <div className="relative rounded-[calc(2.5rem-0.75rem)] bg-[#0C0D0F] border border-white/[0.05] p-6 sm:p-10 lg:p-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden">
            
            {/* Ambient Radial Accent inside core */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-[#0038E2]/[0.05] blur-[140px]"
            />

            {/* ── Section Header Row: Eyebrow + Display Title + White-Shade Controls ── */}
            <header className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 after:pointer-events-none after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/[0.12] after:to-transparent">
              <div className="max-w-2xl">
                {/* Hero-Aligned Eyebrow Pill */}
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] sm:text-xs font-medium text-[#8BA3C6] mb-5 shadow-xs">
                  <span className="text-[#0038E2] font-mono text-[10px] sm:text-xs font-semibold">(02)</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2] inline-block animate-pulse" />
                  <span className="tracking-wide uppercase text-[10px] font-mono text-white/80">Transparent Economics</span>
                </div>

                <h2 className="font-display font-medium text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.08] [text-wrap:balance]">
                  Predictable scale.
                  <br />
                  <span className="text-[#8BA3C6] italic font-normal">
                    Calibrated frameworks.
                  </span>
                </h2>
                <p className="mt-3.5 text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl [text-wrap:pretty]">
                  Choose between long-term compounding retainers or high-impact short-term surge pushes.
                </p>
              </div>

              {/* ── White-Shade Controls: Term Switcher & Currency Switcher ── */}
              <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
                {/* Term Switcher: Long-Term vs Short-Term (White Shade Active) */}
                <div
                  role="tablist"
                  aria-label="Campaign duration selection"
                  className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] shadow-inner backdrop-blur-md"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={termType === "long-term"}
                    onClick={() => handleTermChange("long-term")}
                    className={cn(
                      "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-display tracking-wide cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98]",
                      termType === "long-term"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_14px_rgba(248,246,242,0.25)] scale-[1.02]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    Long-Term
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={termType === "short-term"}
                    onClick={() => handleTermChange("short-term")}
                    className={cn(
                      "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-display tracking-wide cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98]",
                      termType === "short-term"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_14px_rgba(248,246,242,0.25)] scale-[1.02]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    Short-Term
                  </button>
                </div>

                {/* Currency Switcher: USD ($) vs INR (₹) (White Shade Active) */}
                <div
                  role="group"
                  aria-label="Currency selection"
                  className="inline-flex items-center p-1 sm:p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] shadow-inner backdrop-blur-md"
                >
                  <button
                    type="button"
                    aria-label="Display prices in US Dollars"
                    aria-pressed={currency === "USD"}
                    onClick={() => setCurrency("USD")}
                    className={cn(
                      "px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-display tracking-wide cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98]",
                      currency === "USD"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_14px_rgba(248,246,242,0.25)] scale-[1.02]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    USD ($)
                  </button>
                  <button
                    type="button"
                    aria-label="Display prices in Indian Rupees"
                    aria-pressed={currency === "INR"}
                    onClick={() => setCurrency("INR")}
                    className={cn(
                      "px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-display tracking-wide cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98]",
                      currency === "INR"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_14px_rgba(248,246,242,0.25)] scale-[1.02]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    INR (₹)
                  </button>
                </div>
              </div>
            </header>

            {/* ═════════════════════════════════════════════════════════
                DOUBLE-BEZEL ASYMMETRICAL CARDS: Machined Obsidian Hardware
            ═════════════════════════════════════════════════════════ */}
            <div
              ref={cardsContainerRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 items-stretch"
            >
              {plans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;
                const Icon = plan.icon;

                return (
                  <div
                    key={plan.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPlanId(plan.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPlanId(plan.id);
                      }
                    }}
                    onMouseMove={handleCardMouseMove}
                    className={cn(
                      "group relative cursor-pointer rounded-[2.25rem] p-2 transition-all duration-500 ease-gentle flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2]",
                      isSelected
                        ? "bg-[#18191E] border-2 border-[#0038E2] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.95),0_0_32px_rgba(0,56,226,0.2)] ring-1 ring-[#0038E2]/40 -translate-y-1.5"
                        : "bg-[#131418] border border-white/[0.08] hover:border-white/[0.18] hover:-translate-y-1 hover:bg-[#16171C] shadow-[0_16px_40px_-10px_rgba(0,0,0,0.7)]"
                    )}
                  >
                    {/* Dynamic Spotlight Glow Layer (Cobalt/White Tint) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-[2.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 56, 226, 0.12), transparent 80%)",
                      }}
                    />

                    {/* Inner Core Card in Deep Obsidian */}
                    <div className="relative h-full rounded-[calc(2.25rem-0.5rem)] bg-[#0E0F12] border border-white/[0.04] p-7 sm:p-9 lg:p-10 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <div>
                        {/* Header: Radio Selector + Title + Hardware Icon */}
                        <div className="flex items-start justify-between gap-4 mb-5">
                          <div className="flex items-start gap-3.5">
                            {/* Machined Radio Button */}
                            <div
                              className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-1 ring-1 transition-all duration-500 ease-gentle",
                                isSelected
                                  ? "ring-[#0038E2] bg-[#0038E2]/20"
                                  : "ring-white/20 bg-black/40"
                              )}
                            >
                              <div
                                className={cn(
                                  "rounded-full transition-all duration-500 ease-gentle",
                                  isSelected
                                    ? "w-3 h-3 bg-[#0038E2] shadow-[0_0_12px_rgba(0,56,226,0.9)]"
                                    : "w-0 h-0"
                                )}
                              />
                            </div>

                            <div>
                              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-[#8BA3C6] font-semibold mb-2">
                                {plan.badge}
                              </div>
                              <h3 className="font-display font-medium text-2xl sm:text-[28px] text-white leading-tight tracking-tight [text-wrap:balance]">
                                {plan.name}
                              </h3>
                            </div>
                          </div>

                          {/* Hardware-Enclosed Icon Vessel */}
                          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8BA3C6] shrink-0 shadow-xs transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:text-white">
                            <Icon className="w-5 h-5 stroke-[1.5]" />
                          </div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-6 [text-wrap:pretty]">
                          {plan.subtitle}
                        </p>

                        {/* ── Economics Enclosure (Deep Black Container) ── */}
                        <div className="rounded-2xl p-4 sm:p-5 bg-[#090A0D] border border-white/[0.06] mb-6 shadow-xs">
                          <div className="text-[10px] sm:text-[11px] font-mono text-[#8BA3C6] uppercase tracking-widest mb-1.5 font-medium">
                            Economic Structure
                          </div>
                          <div className="font-display font-medium text-xl sm:text-2xl text-white tracking-tight tabular-nums">
                            {plan.rateDisplay[currency]}
                          </div>
                          <div className="text-xs text-white/50 font-mono mt-1">
                            {plan.ratePeriod}
                          </div>
                        </div>

                        {/* Sub-Formats (If Applicable) */}
                        {plan.subFormats && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {plan.subFormats.map((fmt) => (
                              <div
                                key={fmt.title}
                                className="rounded-xl p-3.5 bg-[#090A0D] border border-white/[0.06]"
                              >
                                <h4 className="text-xs font-medium text-white font-display mb-1">
                                  {fmt.title}
                                </h4>
                                <p className="text-[11px] text-white/65 leading-relaxed font-light">
                                  {getLocalized(fmt.desc)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Editorial Highlight Note with Cobalt Accent Bar */}
                        <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-l-[#0038E2] border border-white/[0.06] text-white/85 text-xs sm:text-[13px] leading-relaxed mb-6 italic font-light">
                          &ldquo;{plan.highlightNote}&rdquo;
                        </div>

                        {/* Detailed Specifications List */}
                        <div className="pt-6 border-t border-white/[0.06]">
                          <div className="text-[10px] sm:text-[11px] font-mono text-[#8BA3C6] uppercase tracking-widest mb-3.5 font-medium">
                            Operational Specifications
                          </div>
                          <ul className="space-y-3">
                            {plan.specs.map((spec) => (
                              <li
                                key={spec.label}
                                className="flex items-start gap-3 text-xs sm:text-sm text-white/75 font-light"
                              >
                                <div className="w-5 h-5 rounded-md bg-[#0038E2]/15 border border-[#0038E2]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#0038E2]">
                                  <Check className="w-3 h-3 stroke-[2.5]" />
                                </div>
                                <div>
                                  <span className="font-medium text-white font-mono text-xs mr-2">
                                    {spec.label}:
                                  </span>
                                  <span className="tabular-nums">{getLocalized(spec.value)}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ═════════════════════════════════════════════════════════
                BOTTOM HARDWARE BAR: Selection Pill & Button-in-Button CTA
            ═════════════════════════════════════════════════════════ */}
            <footer className="relative flex flex-col sm:flex-row items-center justify-between gap-5 mt-12 pt-8 before:pointer-events-none before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent">
              {/* Left: Active Selection Pill */}
              <div className="flex items-center gap-3 self-start sm:self-auto">
                <span className="text-[10px] font-mono text-[#8BA3C6] uppercase tracking-[0.2em] font-medium">
                  Active Plan:
                </span>
                <span className="text-xs sm:text-sm font-medium text-white bg-white/[0.04] border border-white/[0.1] px-4 py-2 rounded-xl shadow-xs tabular-nums">
                  {selectedPlan.name} · {selectedPlan.rateDisplay[currency]}
                </span>
              </div>

              {/* Right: Button-in-Button Trailing Icon CTA (Porcelain White Pill with Dark Inner Disc) */}
              <button
                type="button"
                onClick={handleOrder}
                className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-4 rounded-full bg-[#F8F6F2] hover:bg-white text-[#111111] pl-7 pr-2.5 py-2.5 cursor-pointer font-display font-semibold transition-all duration-300 ease-gentle shadow-[0_4px_28px_rgba(248,246,242,0.22)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2]"
              >
                <span className="text-xs sm:text-sm tracking-tight">
                  Submit Campaign Brief
                </span>
                {/* Trailing Icon Disc in Deep Obsidian */}
                <div className="w-9 h-9 rounded-full bg-[#111111] text-[#F8F6F2] group-hover:bg-[#0038E2] group-hover:text-white flex items-center justify-center transition-all duration-300 ease-gentle group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
            </footer>

          </div>
        </div>
      </div>
    </section>
  );
}
