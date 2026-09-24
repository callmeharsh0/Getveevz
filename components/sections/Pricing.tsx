"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Check, ArrowUpRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Currency = "USD" | "INR" | "AED";
type ContentFormat = "short-form" | "long-form";

interface PlanSpec {
  label: string;
  value: string;
}

interface BudgetPlan {
  id: string;
  name: string;
  subtitle: string;
  isPopular?: boolean;
  price: Record<Currency, string>;
  period: string;
  highlightNote?: string;
  specs: PlanSpec[];
}

const shortFormPlans: BudgetPlan[] = [
  {
    id: "budget-36k",
    name: "Growth Tier",
    subtitle: "fast-track your reach",
    price: {
      USD: "~$36k",
      INR: "~₹30L",
      AED: "~AED 132k",
    },
    period: "/ month",
    specs: [
      { label: "Pages", value: "20–30 Dedicated Posting Pages" },
      { label: "Content", value: "60–80 Short-Form Clips / mo" },
      { label: "Platforms", value: "YT Shorts, Reels & TikTok" },
      { label: "Tracking", value: "Live Real-Time Dashboard" },
      { label: "Team", value: "Dedicated Strategist & Editors" },
    ],
  },
  {
    id: "budget-72k",
    name: "Dominance Tier",
    subtitle: "own your category",
    isPopular: true,
    price: {
      USD: "~$72k",
      INR: "~₹60L",
      AED: "~AED 264k",
    },
    period: "/ month",
    specs: [
      { label: "Pages", value: "50+ Dedicated Posting Pages" },
      { label: "Content", value: "140+ Content Variations / mo" },
      { label: "Platforms", value: "All Major Short-Form Platforms" },
      { label: "Team", value: "Full Dedicated Growth Pod" },
      { label: "Support", value: "24/7 Slack & Strategy Support" },
    ],
  },
  {
    id: "budget-custom",
    name: "Custom Plan",
    subtitle: "built around you",
    price: {
      USD: "Custom",
      INR: "Custom",
      AED: "Custom",
    },
    period: "tailored",
    highlightNote: "We have a higher budget and need a custom short-form operation",
    specs: [
      { label: "Pages", value: "Unlimited Posting Pages" },
      { label: "Content", value: "Multi-Show Content & Distribution" },
      { label: "Pod", value: "Your Own Dedicated Creative Team" },
      { label: "Guarantees", value: "Custom Performance & Retention Targets" },
      { label: "Access", value: "Direct Access to Founders & Lead Editor" },
    ],
  },
];

const longFormPlans: BudgetPlan[] = [
  {
    id: "budget-long-episodic",
    name: "Episodic Tier",
    subtitle: "youtube & podcast production",
    price: {
      USD: "~$28k",
      INR: "~₹24L",
      AED: "~AED 105k",
    },
    period: "/ month",
    specs: [
      { label: "Episodes", value: "4–6 Full Long-Form Episodes / mo" },
      { label: "Editing", value: "Full Multi-Cam Cut, Color & Sound" },
      { label: "Packaging", value: "High-CTR Custom Thumbnails & Titles" },
      { label: "Motion", value: "Narrative Pacing & Motion Graphics" },
      { label: "Management", value: "Complete YouTube SEO & Publishing" },
    ],
  },
  {
    id: "budget-long-engine",
    name: "Full Engine Tier",
    subtitle: "episodic mastery + cutdown engine",
    isPopular: true,
    price: {
      USD: "~$58k",
      INR: "~₹48L",
      AED: "~AED 215k",
    },
    period: "/ month",
    specs: [
      { label: "Episodes", value: "8–12 Full Episodes / mo" },
      { label: "Cutdowns", value: "30+ Short-Form Cutdowns Included" },
      { label: "Graphics", value: "Custom 3D Animations & Motion Assets" },
      { label: "Strategy", value: "Audience Retention & Hook Direction" },
      { label: "Producer", value: "Dedicated YouTube Producer & Lead" },
    ],
  },
  {
    id: "budget-long-custom",
    name: "Studio Custom",
    subtitle: "enterprise media production",
    price: {
      USD: "Custom",
      INR: "Custom",
      AED: "Custom",
    },
    period: "tailored",
    highlightNote: "We need full-scale multi-show production and custom delivery",
    specs: [
      { label: "Shows", value: "Unlimited Multi-Channel Shows" },
      { label: "Scripting", value: "Full Research, Scripts & Concepting" },
      { label: "Studio", value: "On-Site / Remote Directorial Support" },
      { label: "Assets", value: "Complete Project Files & Raw Handoff" },
      { label: "Executive", value: "Executive Producer Direct Line" },
    ],
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentFormat, setContentFormat] = useState<ContentFormat>("short-form");
  const [selectedPlanId, setSelectedPlanId] = useState<string>("budget-72k");
  const [currency, setCurrency] = useState<Currency>("USD");

  const plans = contentFormat === "short-form" ? shortFormPlans : longFormPlans;
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[1];

  const handleFormatChange = (fmt: ContentFormat) => {
    setContentFormat(fmt);
    if (fmt === "short-form") {
      setSelectedPlanId("budget-72k");
    } else {
      setSelectedPlanId("budget-long-engine");
    }
  };

  // Listen for navigation / events from Agencies section or URL params
  useEffect(() => {
    const handleSelectTerm = (e: CustomEvent<string>) => {
      const term = e.detail;
      if (term === "short-term" || term === "short-form") {
        setContentFormat("short-form");
        setSelectedPlanId("budget-36k");
      } else if (term === "long-term" || term === "long-form") {
        setContentFormat("long-form");
        setSelectedPlanId("budget-long-engine");
      }
    };

    window.addEventListener("select-pricing-term" as unknown as string, handleSelectTerm as EventListener);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const term = params.get("term");
      if (term === "short-term" || term === "short-form") {
        setContentFormat("short-form");
        setSelectedPlanId("budget-36k");
      } else if (term === "long-term" || term === "long-form") {
        setContentFormat("long-form");
        setSelectedPlanId("budget-long-engine");
      }
    }

    return () => {
      window.removeEventListener("select-pricing-term" as unknown as string, handleSelectTerm as EventListener);
    };
  }, []);

  const handleOrder = () => {
    const cta = document.getElementById("cta") || document.querySelector("footer");
    cta?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pricing"
      className="relative w-full py-28 sm:py-36 lg:py-40 bg-[#090E14] text-white border-y border-white/10 overflow-hidden"
    >
      {/* Subtle ambient frost blue aura matching WeHandleItAll (#8BA3C6) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[450px] bg-[#8BA3C6]/[0.05] blur-[140px] z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#8BA3C6]/[0.04] blur-[140px] z-0"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Outer Shell Card with WeHandleItAll tactile aesthetic */}
        <div
          ref={containerRef}
          className="relative rounded-3xl sm:rounded-[2.5rem] bg-[#090E14] border border-[#8BA3C6]/20 p-6 sm:p-10 lg:p-14 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] select-none text-white"
        >
          {/* ── Top Row: Eyebrow + Title + Format Switcher & Currency Switcher ── */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8BA3C6]/10 border border-[#8BA3C6]/25 text-[10px] font-mono uppercase tracking-[0.2em] text-[#8BA3C6] mb-4">
                <Sparkles className="w-3 h-3 text-[#8BA3C6]" />
                <span>Pricing & Scale</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-white leading-[1.1]">
                Select your budget
              </h2>
            </div>

            {/* Switchers Row: Long-Form / Short-Form Switcher + Currency Switcher */}
            <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
              {/* Format Switcher Pill */}
              <div className="inline-flex items-center p-1 rounded-xl bg-[#090E14] border border-[#8BA3C6]/25">
                {(["short-form", "long-form"] as ContentFormat[]).map((fmt) => {
                  const isActive = contentFormat === fmt;
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleFormatChange(fmt)}
                      className={cn(
                        "px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider cursor-pointer transition-all duration-300",
                        isActive
                          ? "bg-[#8BA3C6] text-[#090E14] font-bold shadow-[0_0_12px_rgba(139,163,198,0.35)]"
                          : "text-[#8BA3C6]/70 hover:text-white"
                      )}
                    >
                      {fmt === "short-form" ? "Short-Form" : "Long-Form"}
                    </button>
                  );
                })}
              </div>

              {/* Currency Switcher Pill */}
              <div className="inline-flex items-center p-1 rounded-xl bg-[#090E14] border border-[#8BA3C6]/25">
                {(["USD", "INR", "AED"] as Currency[]).map((c) => {
                  const isActive = currency === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all duration-300",
                        isActive
                          ? "bg-[#8BA3C6] text-[#090E14] font-bold shadow-[0_0_12px_rgba(139,163,198,0.35)]"
                          : "text-[#8BA3C6]/70 hover:text-white"
                      )}
                    >
                      {c === "USD" ? "USD ($)" : c === "INR" ? "INR (₹)" : "AED ($)"}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ═════════════════════════════════════════════════════════
              DESKTOP: 3-Column Bento Grid with Tactile Solid Cards
          ═════════════════════════════════════════════════════════ */}
          <div className="hidden lg:grid grid-cols-3 gap-6 mt-10 items-stretch">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    "group cursor-pointer rounded-3xl p-7 lg:p-8 min-h-[460px] flex flex-col justify-between transition-all duration-300 bg-[#090E14]",
                    isSelected
                      ? "border-2 border-[#8BA3C6] shadow-[0_0_35px_rgba(139,163,198,0.15)] -translate-y-1"
                      : "border border-[#8BA3C6]/20 hover:border-[#8BA3C6]/50 hover:-translate-y-0.5 shadow-[0_18px_45px_-10px_rgba(0,0,0,0.8)]"
                  )}
                >
                  <div>
                    {/* Header: Radio + Plan Name + Price */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3.5">
                        {/* Radio — tactile circle */}
                        <div
                          className={cn(
                            "w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-0.5 ring-1 transition-all duration-300",
                            isSelected
                              ? "ring-[#8BA3C6] bg-[#8BA3C6]/10"
                              : "ring-[#8BA3C6]/30 bg-white/[0.02]"
                          )}
                        >
                          <div
                            className={cn(
                              "rounded-full transition-all duration-300",
                              isSelected
                                ? "w-3 h-3 bg-[#8BA3C6] shadow-[0_0_10px_rgba(139,163,198,0.9)]"
                                : "w-0 h-0"
                            )}
                          />
                        </div>

                        <div>
                          <h3 className="font-display font-bold text-xl text-white leading-tight tracking-tight">
                            {plan.name}
                          </h3>
                          <p className="text-xs text-[#8BA3C6]/80 font-normal lowercase mt-1 tracking-wide">
                            {plan.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-lg text-white leading-tight tracking-tight">
                          {plan.price[currency]}
                        </div>
                        <div className="text-[11px] text-[#8BA3C6]/80 font-mono mt-1">
                          {plan.period}
                        </div>
                      </div>
                    </div>

                    {/* Highlight Note */}
                    {plan.highlightNote && (
                      <div className="mt-5 p-3.5 rounded-xl bg-[#8BA3C6]/10 border border-[#8BA3C6]/25 text-[#8BA3C6] text-xs leading-relaxed">
                        &ldquo;{plan.highlightNote}&rdquo;
                      </div>
                    )}

                    {/* Feature Checklist */}
                    <ul className="mt-7 space-y-3.5 pt-5 border-t border-white/10">
                      {plan.specs.map((spec) => (
                        <li
                          key={spec.label}
                          className="flex items-center gap-3 text-[13px] text-white/85 font-normal"
                        >
                          <div className="w-5 h-5 rounded-md bg-[#8BA3C6]/10 border border-[#8BA3C6]/20 flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5 text-[#8BA3C6] stroke-[2.5]" />
                          </div>
                          <span>{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═════════════════════════════════════════════════════════
              MOBILE: Stacked Accordion with Tactile Solid Cards
          ═════════════════════════════════════════════════════════ */}
          <div className="lg:hidden flex flex-col gap-3.5 mt-8">
            {plans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "rounded-2xl p-5 transition-all duration-300 bg-[#090E14]",
                      isSelected
                        ? "border-2 border-[#8BA3C6] shadow-[0_0_25px_rgba(139,163,198,0.15)]"
                        : "border border-[#8BA3C6]/20 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.8)]"
                    )}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 ring-1 transition-all duration-300",
                            isSelected
                              ? "ring-[#8BA3C6] bg-[#8BA3C6]/10"
                              : "ring-[#8BA3C6]/30 bg-white/[0.02]"
                          )}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#8BA3C6] shadow-[0_0_8px_rgba(139,163,198,0.9)]" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-display font-bold text-base text-white leading-tight">
                            {plan.name}
                          </h3>
                          <p className="text-[11px] text-[#8BA3C6]/80 font-normal lowercase mt-0.5">
                            {plan.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-sm text-white leading-tight">
                          {plan.price[currency]}
                        </div>
                        <div className="text-[10px] text-[#8BA3C6]/80 font-mono mt-0.5">
                          {plan.period}
                        </div>
                      </div>
                    </div>

                    {/* Expanded Checklist */}
                    {isSelected && (
                      <div className="mt-5 pt-4 border-t border-white/10">
                        {plan.highlightNote && (
                          <div className="mb-4 p-3 rounded-xl bg-[#8BA3C6]/10 border border-[#8BA3C6]/25 text-[#8BA3C6] text-xs leading-relaxed">
                            &ldquo;{plan.highlightNote}&rdquo;
                          </div>
                        )}

                        <ul className="space-y-3">
                          {plan.specs.map((spec) => (
                            <li
                              key={spec.label}
                              className="flex items-center gap-2.5 text-xs text-white/85 font-normal"
                            >
                              <div className="w-4.5 h-4.5 rounded-md bg-[#8BA3C6]/10 border border-[#8BA3C6]/20 flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3 text-[#8BA3C6] stroke-[2.5]" />
                              </div>
                              <span>{spec.value}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ═════════════════════════════════════════════════════════
              BOTTOM BAR — Solid Footer Strip
          ═════════════════════════════════════════════════════════ */}

          {/* Desktop */}
          <div className="hidden lg:flex items-center justify-between mt-10 pt-7 border-t border-white/10">
            {/* Left: Selected summary */}
            <div className="flex items-center gap-3.5">
              <span className="text-[10px] font-mono text-[#8BA3C6]/80 uppercase tracking-[0.2em]">
                Selected:
              </span>
              <span className="text-sm font-semibold text-white bg-[#090E14] border border-[#8BA3C6]/25 px-4 py-2 rounded-xl">
                {selectedPlan.name} — {selectedPlan.price[currency]} {selectedPlan.period}
              </span>
            </div>

            {/* Right: Tactile CTA Button matching WeHandleItAll palette */}
            <button
              type="button"
              onClick={handleOrder}
              className="group inline-flex items-center gap-3 rounded-full bg-[#8BA3C6] hover:bg-[#9db5d8] text-[#090E14] pl-7 pr-2 py-2 cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(139,163,198,0.25)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-sm font-bold tracking-tight">
                {selectedPlan.id.includes("custom") ? "Discuss Custom Plan" : "Book Strategy Call"}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#090E14] flex items-center justify-center text-white group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-[#8BA3C6]" />
              </div>
            </button>
          </div>

          {/* Mobile */}
          <div className="lg:hidden mt-7">
            <button
              type="button"
              onClick={handleOrder}
              className="group w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#8BA3C6] hover:bg-[#9db5d8] text-[#090E14] pl-6 pr-2.5 py-2.5 cursor-pointer font-semibold transition-all duration-300 shadow-[0_4px_20px_rgba(139,163,198,0.25)] active:scale-[0.98]"
            >
              <span className="text-sm font-bold tracking-tight">
                {selectedPlan.id.includes("custom") ? "Discuss Custom Plan" : "Book Strategy Call"}
              </span>
              <div className="w-9 h-9 rounded-full bg-[#090E14] flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 text-[#8BA3C6]" />
              </div>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

