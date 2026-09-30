"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Check, ArrowUpRight, Clock, Rocket, Zap, ShieldCheck } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type PricingTerm = "long-term" | "short-term" | "end-to-end";
export type PricingModelType = PricingTerm; // Backwards-compatibility alias
export type Currency = "USD" | "INR" | "AED";

export interface PlanSpec {
  label: string;
  value: string | { USD: string; INR: string; AED?: string };
}

export interface PricingPlan {
  id: string;
  name: string;
  badge: string | { USD: string; INR: string; AED?: string };
  popular?: boolean;
  subtitle: string;
  rateDisplay: {
    USD: string;
    INR: string;
    AED: string;
  };
  ratePeriod: string | { USD: string; INR: string; AED?: string };
  highlightNote: string | { USD: string; INR: string; AED?: string };
  icon: typeof Rocket;
  specs: PlanSpec[];
  subFormats?: {
    title: string | { USD: string; INR: string; AED?: string };
    desc: string | { USD: string; INR: string; AED?: string };
  }[];
}

const longTermPlans: PricingPlan[] = [
  {
    id: "long-term-3mo",
    name: "CPM to Retainer Transition",
    badge: {
      USD: "$1 / 1K CPM • No Views Guarantee",
      INR: "₹85 / 1K CPM • No Views Guarantee",
      AED: "3.7 AED / 1K CPM • No Views Guarantee",
    },
    popular: true,
    subtitle: "Test creators at $1/1K CPM with no views guarantee to filter winning pages, transitioning into a fixed retainer",
    rateDisplay: {
      USD: "$1 / 1K CPM ➔ Fixed Retainer",
      INR: "₹85 / 1K CPM ➔ Fixed Retainer",
      AED: "3.7 AED / 1K CPM ➔ Fixed Retainer",
    },
    ratePeriod: "Testing Phase ($1/1K CPM) • No Views Guarantee ➔ Retainer",
    highlightNote: {
      USD: "Month 1 tests 500–1,000 clippers at $1/1K views with no view guarantee to find viral hooks and angles, then shortlists the top 10–30 winning pages into a predictable monthly retainer.",
      INR: "Month 1 tests 500–1,000 clippers at ₹85/1K views with no view guarantee to find viral hooks and angles, then shortlists the top 10–30 winning pages into a predictable monthly retainer.",
      AED: "Month 1 tests 500–1,000 clippers at 3.7 AED/1K views with no view guarantee to find viral hooks and angles, then shortlists the top 10–30 winning pages into a predictable monthly retainer.",
    },
    icon: Rocket,
    specs: [
      {
        label: "Pricing Basis",
        value: {
          USD: "$1 per 1K views (CPM)",
          INR: "₹85 per 1K views (CPM)",
          AED: "3.7 AED per 1K views (CPM)",
        },
      },
      { label: "View Guarantee", value: "No views guarantee (pure performance testing & filtration)" },
      {
        label: "Month 1 (Testing)",
        value: {
          USD: "500–1,000 clippers at $1 / 1K views to filter top hooks, formats & winning pages",
          INR: "500–1,000 clippers at ₹85 / 1K views to filter top hooks, formats & winning pages",
          AED: "500–1,000 clippers at 3.7 AED / 1K views to filter top hooks, formats & winning pages",
        },
      },
      { label: "Months 2–3 (Retainer)", value: "Shortlist top 10–30 winning pages into a fixed monthly retainer" },
      { label: "Predictable Output", value: "Pay for guaranteed distribution from proven pages vs betting on views" },
      { label: "Scale & Renew", value: "Renew, optimize, and expand the proven system month after month" },
    ],
    subFormats: [
      {
        title: {
          USD: "Phase 1: CPM Testing ($1/1K)",
          INR: "Phase 1: CPM Testing (₹85/1K)",
          AED: "Phase 1: CPM Testing (3.7 AED/1K)",
        },
        desc: {
          USD: "Deploy clippers at $1/1K views with no view guarantee to test viral angles and filter high-retention pages.",
          INR: "Deploy clippers at ₹85/1K views with no view guarantee to test viral angles and filter high-retention pages.",
          AED: "Deploy clippers at 3.7 AED/1K views with no view guarantee to test viral angles and filter high-retention pages.",
        },
      },
      {
        title: "Phase 2: Winning Retainer",
        desc: "Lock the top 10–30 proven creator pages into fixed monthly retainers for consistent, compounding reach.",
      },
    ],
  },
  {
    id: "long-term-straight-retainer",
    name: "Normal Clipping (Straight Retainer)",
    badge: {
      USD: "$36K & $72K Retainers",
      INR: "36L & 72L Retainers",
      AED: "132K & 264K AED Retainers",
    },
    subtitle: "For brands already getting consistent views without needing a testing phase",
    rateDisplay: {
      USD: "$36K & $72K / mo",
      INR: "₹36L & ₹72L / mo",
      AED: "132K & 264K AED / mo",
    },
    ratePeriod: {
      USD: "Monthly Fixed Retainer ($36K & $72K Tiers)",
      INR: "Monthly Fixed Retainer (36L & 72L Tiers)",
      AED: "Monthly Fixed Retainer (132K & 264K AED Tiers)",
    },
    highlightNote: "Normal clipping on a fixed monthly retainer with defined deliverables: dedicated clipping pods, fixed monthly quotas, and zero view volatility.",
    icon: ShieldCheck,
    specs: [
      {
        label: "Tier 1 Pricing",
        value: {
          USD: "$36,000 / month (Tier 1)",
          INR: "₹36 Lakhs / month (36L Tier 1)",
          AED: "132,000 AED / month (Tier 1)",
        },
      },
      {
        label: "Tier 2 Pricing",
        value: {
          USD: "$72,000 / month (Tier 2)",
          INR: "₹72 Lakhs / month (72L Tier 2)",
          AED: "264,000 AED / month (Tier 2)",
        },
      },
      { label: "Ideal For", value: "Brands with steady traction wanting normal clipping without testing" },
      { label: "Deliverables", value: "Defined monthly clip volume, designated pages & posting frequency" },
      { label: "Quality Control", value: "Hand-crafted editing, custom hooks, sound design & strict brand standards" },
      { label: "Sustainable Scale", value: "Predictable monthly distribution engine without view volatility" },
    ],
    subFormats: [
      {
        title: {
          USD: "Tier 1: $36K / month",
          INR: "Tier 1: 36L / month",
          AED: "Tier 1: 132K AED / month",
        },
        desc: {
          USD: "$36,000 / month: Dedicated clipping pod, 60+ vertical cuts, multi-channel distribution.",
          INR: "₹36 Lakhs / month: Dedicated clipping pod, 60+ vertical cuts, multi-channel distribution.",
          AED: "132,000 AED / month: Dedicated clipping pod, 60+ vertical cuts, multi-channel distribution.",
        },
      },
      {
        title: {
          USD: "Tier 2: $72K / month",
          INR: "Tier 2: 72L / month",
          AED: "Tier 2: 264K AED / month",
        },
        desc: {
          USD: "$72,000 / month: Omnipresent reach surge, 120+ vertical cuts, dedicated clippers army across all platforms.",
          INR: "₹72 Lakhs / month: Omnipresent reach surge, 120+ vertical cuts, dedicated clippers army across all platforms.",
          AED: "264,000 AED / month: Omnipresent reach surge, 120+ vertical cuts, dedicated clippers army across all platforms.",
        },
      },
    ],
  },
];

const shortTermPlans: PricingPlan[] = [
  {
    id: "short-term-cpm",
    name: "CPM-Based Campaign",
    badge: {
      USD: "Min. 10M Views • $3 / 1K",
      INR: "Min. 10M Views • ₹250 / 1K",
      AED: "Min. 10M Views • 11 AED / 1K",
    },
    popular: true,
    subtitle: "We ask you how many views you want — minimum 10 million views requirement ($3 / 1K views)",
    rateDisplay: {
      USD: "$3 / 1K Views",
      INR: "₹250 / 1K Views",
      AED: "11 AED / 1K Views",
    },
    ratePeriod: "Custom Views • Minimum 10M Views Requirement ($3/1K)",
    highlightNote: {
      USD: "Tell us how many views you need (minimum 10M views). We deploy fan pages & theme pages at $3/1K views to deliver your target attention within an agreed timeframe.",
      INR: "Tell us how many views you need (minimum 10M views). We deploy fan pages & theme pages at ₹250/1K views to deliver your target attention within an agreed timeframe.",
      AED: "Tell us how many views you need (minimum 10M views). We deploy fan pages & theme pages at 11 AED/1K views to deliver your target attention within an agreed timeframe.",
    },
    icon: Zap,
    specs: [
      {
        label: "Pricing Basis",
        value: {
          USD: "$3 per 1,000 views",
          INR: "₹250 per 1,000 views",
          AED: "11 AED per 1,000 views",
        },
      },
      { label: "View Requirement", value: "Minimum 10 Million views (we ask you how many views you want)" },
      { label: "Format A (Fan Pages)", value: "Large clippers pool driving broad distribution toward agreed view target" },
      { label: "Format B (Theme Pages)", value: "Agency-owned niche pages (70% native niche content + brand integration)" },
      { label: "Niches & Delivery", value: "Tech, AI, Business, Education, News — pay only for views delivered" },
      { label: "Re-Activatable", value: "Pages stay in agency network for repeatable future pushes" },
    ],
    subFormats: [
      {
        title: "A. Mass Fan-Page Clipping",
        desc: {
          USD: "Large pool of clippers posting across fan pages at $3/1K views to hit your target volume (min 10M views).",
          INR: "Large pool of clippers posting across fan pages at ₹250/1K views to hit your target volume (min 10M views).",
          AED: "Large pool of clippers posting across fan pages at 11 AED/1K views to hit your target volume (min 10M views).",
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
    badge: {
      USD: "Starts at $7,200 USD",
      INR: "Starts at ₹6 Lakhs (6L)",
      AED: "Starts at 26,500 AED",
    },
    subtitle: "Immediate, high-volume distribution through established theme pages completed in 24 hours",
    rateDisplay: {
      USD: "Starts at $7,200 ($7.2K — $100K+)",
      INR: "Starts at ₹6 Lakhs (₹6L — ₹85L+)",
      AED: "Starts at 26,500 AED (26.5K — 365K+ AED)",
    },
    ratePeriod: {
      USD: "Starting at $7,200 USD",
      INR: "Starting at ₹6 Lakhs INR (₹6L)",
      AED: "Starting at 26,500 AED",
    },
    highlightNote: {
      USD: "Starting at $7,200 USD. You provide brief & narrative; we handle inventory, high-authority placements & rapid 24-hr execution.",
      INR: "Starting at ₹6 Lakhs INR. You provide brief & narrative; we handle inventory, high-authority placements & rapid 24-hr execution.",
      AED: "Starting at 26,500 AED. You provide brief & narrative; we handle inventory, high-authority placements & rapid 24-hr execution.",
    },
    icon: Clock,
    specs: [
      {
        label: "Starting Pricing",
        value: {
          USD: "Starts at $7,200 USD",
          INR: "Starts at ₹6 Lakhs INR (₹6L)",
          AED: "Starts at 26,500 AED",
        },
      },
      { label: "Execution Speed", value: "Distribution fully completed within 24 hours of brief approval" },
      { label: "Account Reach", value: "Targeted niche pages to massive 1M, 5M, or 10M+ follower accounts" },
      { label: "Niche Coverage", value: "Established pages in AI, Tech, Business, Finance, News & Updates" },
      { label: "Fixed Cost / Post", value: "Every page has its fixed cost per post — zero hidden fees" },
      {
        label: "Budget Range",
        value: {
          USD: "$7,200 minimum up to $100,000+ for single-day high-volume surges",
          INR: "₹6 Lakhs minimum up to ₹85 Lakh+ for single-day high-volume surges",
          AED: "26,500 AED minimum up to 365,000+ AED for single-day high-volume surges",
        },
      },
    ],
    subFormats: [
      {
        title: {
          USD: "Starting at $7,200 USD",
          INR: "Starting at ₹6 Lakhs (6L)",
          AED: "Starting at 26,500 AED",
        },
        desc: {
          USD: "Transparent tier pricing starting from $7,200 USD for single-day blitz surges.",
          INR: "Transparent tier pricing starting from ₹6 Lakhs INR (6L) for single-day blitz surges.",
          AED: "Transparent tier pricing starting from 26,500 AED for single-day blitz surges.",
        },
      },
      {
        title: "Mega-Account Placements",
        desc: "Placements on established creator and theme pages with up to 1M, 5M, or 10M+ followers.",
      },
    ],
  },
];

const endToEndPlans: PricingPlan[] = [];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [termType, setTermType] = useState<PricingTerm>("long-term");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("long-term-3mo");

  const plans =
    termType === "long-term"
      ? longTermPlans
      : termType === "short-term"
      ? shortTermPlans
      : endToEndPlans;
  const selectedPlan =
    plans.find((p) => p.id === selectedPlanId) ||
    (termType === "short-term" ? shortTermPlans[0] : longTermPlans[0]);

  const handleTermChange = (type: PricingTerm) => {
    if (type === termType) return;
    setTermType(type);
    if (type === "long-term") {
      setSelectedPlanId("long-term-3mo");
    } else if (type === "short-term") {
      setSelectedPlanId("short-term-cpm");
    } else {
      setSelectedPlanId("end-to-end");
    }
  };

  const getLocalized = (val: string | { USD: string; INR: string; AED?: string } | undefined): string => {
    if (!val) return "";
    if (typeof val === "string") return val;
    return val[currency] || val["USD"] || "";
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
      } else if (term === "end-to-end" || term === "end-to-end-marketing") {
        setTermType("end-to-end");
        setSelectedPlanId("end-to-end");
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
      } else if (term === "end-to-end" || term === "end-to-end-marketing" || term === "endtoend" || term === "e2e") {
        setTermType("end-to-end");
        setSelectedPlanId("end-to-end");
      }
    }

    return () => {
      window.removeEventListener("select-pricing-term" as unknown as string, handleSelectTerm as EventListener);
    };
  }, []);

  const getPricingMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Campaign Brief: ${selectedPlan.name} [${selectedPlan.rateDisplay[currency]}]`
    );

    const bodyText = [
      `Hi GetVeevz Distribution Team,`,
      ``,
      `I would like to submit a campaign brief for the following pricing framework:`,
      ``,
      `• Framework Selected: ${selectedPlan.name}`,
      `• Campaign Model: ${
        termType === "long-term"
          ? "Long-Term Retainer Engagement"
          : termType === "short-term"
          ? "Short-Term Blitz Push"
          : "End-to-End Turnkey Solution"
      }`,
      `• Chosen Currency: ${currency}`,
      `• Rate / Investment Structure: ${selectedPlan.rateDisplay[currency]}`,
      `• Deliverables / Period: ${getLocalized(selectedPlan.ratePeriod)}`,
      `• Framework Highlights: "${getLocalized(selectedPlan.highlightNote)}"`,
      ``,
      `Please contact us with custom reach projections, account inventory, and onboarding timeline.`,
      ``,
      `Best regards,`,
    ].join("\n");

    return `mailto:team@getveevz.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
  };

  const handleOrder = (e?: React.MouseEvent) => {
    const mailto = getPricingMailtoUrl();
    try {
      window.location.href = mailto;
    } catch {
      // fallback
    }

    const cta = document.getElementById("questionnaire") || document.getElementById("cta") || document.querySelector("footer");
    cta?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-label="Pricing and campaign frameworks"
      className="relative w-full py-16 sm:py-28 lg:py-36 bg-[#090A0D] text-[#F8F6F2] overflow-hidden"
    >
      {/* ── Top Section Border: Subtle Gradient Fade & Feathered Hairline ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-28 sm:h-48 bg-gradient-to-b from-[#090E14] via-[#090A0D]/75 to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-20"
      />

      {/* ── Bottom Section Border: Subtle Gradient Fade & Feathered Hairline ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-28 sm:h-48 bg-gradient-to-t from-[#090E14] via-[#090A0D]/75 to-transparent z-10"
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

      <div className="relative z-10 max-w-[1340px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* ── Main Doppelrand (Double-Bezel) Outer Hardware Shell in Deep Black ── */}
        <div
          ref={shellRef}
          className="relative rounded-2xl sm:rounded-[2.25rem] lg:rounded-[2.5rem] p-1.5 sm:p-2.5 lg:p-3.5 bg-[#121316] border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] sm:shadow-[0_32px_100px_-20px_rgba(0,0,0,0.95)] before:pointer-events-none before:absolute before:inset-x-10 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"
        >
          {/* Inner Concentric Core Enclosure in Solid Carbon Black */}
          <div className="relative rounded-[calc(1rem+0.25rem)] sm:rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.5rem-0.75rem)] bg-[#0C0D0F] border border-white/[0.05] p-4 sm:p-8 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] overflow-hidden">
            
            {/* Ambient Radial Accent inside core */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-[#0038E2]/[0.05] blur-[140px]"
            />

            {/* ── Section Header Row: Eyebrow + Display Title + White-Shade Controls ── */}
            <header className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 lg:pb-10 after:pointer-events-none after:absolute after:bottom-0 after:inset-x-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/[0.12] after:to-transparent">
              <div className="max-w-2xl">
                <h2 className="font-display font-medium text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.12] [text-wrap:balance]">
                  Predictable scale.{" "}
                  <span className="text-[#8BA3C6] italic font-normal block sm:inline">
                    Calibrated frameworks.
                  </span>
                </h2>
                <p className="mt-2.5 sm:mt-3.5 text-xs sm:text-base text-white/70 font-light leading-relaxed max-w-xl [text-wrap:pretty]">
                  Choose between long-term retainers, short-term surge pushes, or full end-to-end solutions.
                </p>
              </div>

              {/* ── Precision Control Pills: Model Switcher & Currency Switcher ── */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
                {/* Model Switcher: Long-Term vs Short-Term vs End-to-End */}
                <div
                  role="tablist"
                  aria-label="Campaign model selection"
                  className="grid grid-cols-3 sm:inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-inner backdrop-blur-md"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={termType === "long-term"}
                    onClick={() => handleTermChange("long-term")}
                    className={cn(
                      "h-8 sm:h-9 px-3 sm:px-4 rounded-lg text-xs sm:text-[13px] font-display tracking-wide flex items-center justify-center cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98] whitespace-nowrap",
                      termType === "long-term"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_12px_rgba(248,246,242,0.2)]"
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
                      "h-8 sm:h-9 px-3 sm:px-4 rounded-lg text-xs sm:text-[13px] font-display tracking-wide flex items-center justify-center cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98] whitespace-nowrap",
                      termType === "short-term"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_12px_rgba(248,246,242,0.2)]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    Short-Term
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={termType === "end-to-end"}
                    onClick={() => handleTermChange("end-to-end")}
                    className={cn(
                      "h-8 sm:h-9 px-3 sm:px-4 rounded-lg text-xs sm:text-[13px] font-display tracking-wide flex items-center justify-center cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98] whitespace-nowrap",
                      termType === "end-to-end"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_12px_rgba(248,246,242,0.2)]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    End-to-End
                  </button>
                </div>

                {/* Currency Switcher: USD ($) vs INR (₹) vs AED */}
                <div
                  role="group"
                  aria-label="Currency selection"
                  className="grid grid-cols-3 sm:inline-flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-inner backdrop-blur-md"
                >
                  <button
                    type="button"
                    aria-label="Display prices in US Dollars"
                    aria-pressed={currency === "USD"}
                    onClick={() => setCurrency("USD")}
                    className={cn(
                      "h-8 sm:h-9 px-3 sm:px-3.5 rounded-lg text-xs sm:text-[13px] font-display tracking-wide flex items-center justify-center cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98] whitespace-nowrap",
                      currency === "USD"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_12px_rgba(248,246,242,0.2)]"
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
                      "h-8 sm:h-9 px-3 sm:px-3.5 rounded-lg text-xs sm:text-[13px] font-display tracking-wide flex items-center justify-center cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98] whitespace-nowrap",
                      currency === "INR"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_12px_rgba(248,246,242,0.2)]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    INR (₹)
                  </button>
                  <button
                    type="button"
                    aria-label="Display prices in UAE Dirhams"
                    aria-pressed={currency === "AED"}
                    onClick={() => setCurrency("AED")}
                    className={cn(
                      "h-8 sm:h-9 px-3 sm:px-3.5 rounded-lg text-xs sm:text-[13px] font-display tracking-wide flex items-center justify-center cursor-pointer transition-all duration-300 ease-gentle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] active:scale-[0.98] whitespace-nowrap",
                      currency === "AED"
                        ? "bg-[#F8F6F2] text-[#111111] font-semibold shadow-[0_2px_12px_rgba(248,246,242,0.2)]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    AED (د.إ)
                  </button>
                </div>
              </div>
            </header>

            {/* ═════════════════════════════════════════════════════════
                DOUBLE-BEZEL ASYMMETRICAL CARDS: Machined Obsidian Hardware
            ═════════════════════════════════════════════════════════ */}
            {termType === "end-to-end" ? (
              <div
                ref={cardsContainerRef}
                className="mt-6 sm:mt-10 lg:mt-12 w-full rounded-2xl sm:rounded-[2rem] lg:rounded-[2.25rem] p-1.5 sm:p-2 bg-[#131418] border border-white/[0.08] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.7)]"
              >
                <div className="w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-[calc(1rem+0.25rem)] sm:rounded-[calc(2rem-0.375rem)] lg:rounded-[calc(2.25rem-0.5rem)] bg-[#0E0F12] border border-white/[0.04] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
              </div>
            ) : (
              <div
                ref={cardsContainerRef}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-10 lg:mt-12 items-stretch"
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
                      "group relative cursor-pointer rounded-2xl sm:rounded-[2rem] lg:rounded-[2.25rem] p-1.5 sm:p-2 transition-all duration-500 ease-gentle flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2]",
                      isSelected
                        ? "bg-[#18191E] border-2 border-[#0038E2] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.95),0_0_28px_rgba(0,56,226,0.22)] ring-1 ring-[#0038E2]/40 -translate-y-1 sm:-translate-y-1.5"
                        : "bg-[#131418] border border-white/[0.08] hover:border-white/[0.18] hover:-translate-y-1 hover:bg-[#16171C] shadow-[0_12px_32px_-10px_rgba(0,0,0,0.7)]"
                    )}
                  >
                    {/* Dynamic Spotlight Glow Layer (Cobalt/White Tint) */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-[2rem] lg:rounded-[2.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 56, 226, 0.12), transparent 80%)",
                      }}
                    />

                    {/* Inner Core Card in Deep Obsidian */}
                    <div className="relative h-full rounded-[calc(1rem+0.25rem)] sm:rounded-[calc(2rem-0.375rem)] lg:rounded-[calc(2.25rem-0.5rem)] bg-[#0E0F12] border border-white/[0.04] p-4 sm:p-7 lg:p-9 flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <div>
                        {/* Header: Radio Selector + Title + Hardware Icon */}
                        <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
                          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                            {/* Machined Radio Button */}
                            <div
                              className={cn(
                                "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 sm:mt-1 ring-1 transition-all duration-500 ease-gentle",
                                isSelected
                                  ? "ring-[#0038E2] bg-[#0038E2]/20"
                                  : "ring-white/20 bg-black/40"
                              )}
                            >
                              <div
                                className={cn(
                                  "rounded-full transition-all duration-500 ease-gentle",
                                  isSelected
                                    ? "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#0038E2] shadow-[0_0_12px_rgba(0,56,226,0.9)]"
                                    : "w-0 h-0"
                                )}
                              />
                            </div>

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                                <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#8BA3C6] font-semibold">
                                  {getLocalized(plan.badge)}
                                </span>
                              </div>
                              <h3 className="font-display font-medium text-lg sm:text-2xl lg:text-[26px] text-white leading-tight tracking-tight [text-wrap:balance]">
                                {plan.name}
                              </h3>
                            </div>
                          </div>

                          {/* Hardware-Enclosed Icon Vessel */}
                          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[#8BA3C6] shrink-0 shadow-xs transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:text-white">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                          </div>
                        </div>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mb-4 sm:mb-5 [text-wrap:pretty]">
                          {plan.subtitle}
                        </p>

                        {/* ── Economics Enclosure (Deep Black Container) ── */}
                        <div className="rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 bg-[#090A0D] border border-white/[0.06] mb-4 sm:mb-5 shadow-xs">
                          <div className="text-[9px] sm:text-[11px] font-mono text-[#8BA3C6] uppercase tracking-widest mb-1 font-medium">
                            Economic Structure
                          </div>
                          <div className="font-display font-medium text-lg sm:text-xl lg:text-2xl text-white tracking-tight tabular-nums">
                            {plan.rateDisplay[currency]}
                          </div>
                          <div className="text-[11px] sm:text-xs text-white/50 font-mono mt-0.5 sm:mt-1">
                            {getLocalized(plan.ratePeriod)}
                          </div>
                        </div>

                        {/* Sub-Formats (If Applicable) */}
                        {plan.subFormats && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-5">
                            {plan.subFormats.map((fmt, fIdx) => (
                              <div
                                key={typeof fmt.title === "string" ? fmt.title : fmt.title.USD || fIdx}
                                className="rounded-lg sm:rounded-xl p-2.5 sm:p-3.5 bg-[#090A0D] border border-white/[0.06]"
                              >
                                <h4 className="text-[11px] sm:text-xs font-medium text-white font-display mb-0.5 sm:mb-1">
                                  {getLocalized(fmt.title)}
                                </h4>
                                <p className="text-[10px] sm:text-[11px] text-white/65 leading-relaxed font-light">
                                  {getLocalized(fmt.desc)}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Editorial Highlight Note with Cobalt Accent Bar */}
                        <div className="p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.03] border-l-2 border-l-[#0038E2] border border-white/[0.06] text-white/85 text-[11px] sm:text-xs lg:text-[13px] leading-relaxed mb-4 sm:mb-5 italic font-light">
                          &ldquo;{getLocalized(plan.highlightNote)}&rdquo;
                        </div>

                        {/* Detailed Specifications List */}
                        <div className="pt-4 sm:pt-5 border-t border-white/[0.06]">
                          <div className="text-[9px] sm:text-[10px] font-mono text-[#8BA3C6] uppercase tracking-widest mb-2.5 sm:mb-3 font-medium">
                            Operational Specifications
                          </div>
                          <ul className="space-y-2 sm:space-y-2.5">
                            {plan.specs.map((spec) => (
                              <li
                                key={spec.label}
                                className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 font-light"
                              >
                                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-md bg-[#0038E2]/15 border border-[#0038E2]/30 flex items-center justify-center shrink-0 mt-0.5 text-[#0038E2]">
                                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
                                </div>
                                <div className="leading-snug">
                                  <span className="font-medium text-white font-mono text-[11px] sm:text-xs mr-1.5 sm:mr-2">
                                    {spec.label}:
                                  </span>
                                  <span className="tabular-nums text-white/80">{getLocalized(spec.value)}</span>
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
          )}

          {/* ═════════════════════════════════════════════════════════
              BOTTOM HARDWARE BAR: Selection Pill & Button-in-Button CTA
          ═════════════════════════════════════════════════════════ */}
          {termType !== "end-to-end" && (
            <footer className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-5 mt-6 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 before:pointer-events-none before:absolute before:top-0 before:inset-x-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/[0.12] before:to-transparent">
              {/* Left: Active Selection Pill */}
              <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
                <span className="text-[9px] sm:text-[10px] font-mono text-[#8BA3C6] uppercase tracking-[0.2em] font-medium shrink-0">
                  Selected:
                </span>
                <span className="text-xs sm:text-sm font-medium text-white bg-white/[0.04] border border-white/[0.1] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-xs tabular-nums truncate">
                  {selectedPlan.name} · {selectedPlan.rateDisplay[currency]}
                </span>
              </div>

              {/* Right: Button-in-Button Trailing Icon CTA (Porcelain White Pill with Dark Inner Disc) */}
              <a
                href={getPricingMailtoUrl()}
                onClick={handleOrder}
                className="group relative w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 sm:gap-4 rounded-full bg-[#F8F6F2] hover:bg-white text-[#111111] pl-5 sm:pl-7 pr-2 py-2 sm:py-2.5 cursor-pointer font-display font-semibold transition-all duration-300 ease-gentle shadow-[0_4px_24px_rgba(248,246,242,0.18)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2]"
              >
                <span className="text-xs sm:text-sm tracking-tight font-medium">
                  Submit Campaign Brief
                </span>
                {/* Trailing Icon Disc in Deep Obsidian */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#111111] text-[#F8F6F2] group-hover:bg-[#0038E2] group-hover:text-white flex items-center justify-center transition-all duration-300 ease-gentle group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 shadow-sm shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                </div>
              </a>
            </footer>
          )}

            {/* Bottom Trust Guarantees */}
            <div className="mt-6 pt-5 border-t border-white/[0.04] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] sm:text-xs text-white/50 font-mono">
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
