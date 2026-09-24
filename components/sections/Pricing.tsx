"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Check, ArrowRight, Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Currency = "USD" | "INR" | "AED";

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

const budgetPlans: BudgetPlan[] = [
  {
    id: "budget-36k",
    name: "Growth Tier",
    subtitle: "high-velocity distribution",
    price: {
      USD: "~$36k",
      INR: "~₹30L",
      AED: "~AED 132k",
    },
    period: "/ month",
    specs: [
      { label: "Pages", value: "20–30 Dedicated Distribution Pages" },
      { label: "Content", value: "60–80 High-Retention Clips / mo" },
      { label: "Platforms", value: "YT Shorts, Reels & TikTok" },
      { label: "Tracking", value: "Live Real-Time Dashboard" },
      { label: "Team", value: "Dedicated Strategist & Editors" },
    ],
  },
  {
    id: "budget-72k",
    name: "Dominance Tier",
    subtitle: "category saturation",
    isPopular: true,
    price: {
      USD: "~$72k",
      INR: "~₹60L",
      AED: "~AED 264k",
    },
    period: "/ month",
    specs: [
      { label: "Pages", value: "50+ Dedicated Distribution Pages" },
      { label: "Content", value: "140+ Viral Hook Variations / mo" },
      { label: "Platforms", value: "Full Omni-Platform Saturation" },
      { label: "Team", value: "Full Dedicated Distribution Pod" },
      { label: "Support", value: "24/7 Slack & Executive Strategy" },
    ],
  },
  {
    id: "budget-custom",
    name: "Custom Enterprise",
    subtitle: "bespoke infrastructure",
    price: {
      USD: "Custom",
      INR: "Custom",
      AED: "Custom",
    },
    period: "tailored",
    highlightNote: "We have a higher budget and need a custom plan",
    specs: [
      { label: "Pages", value: "Unlimited Page Ecosystem" },
      { label: "Content", value: "Multi-Show Repurposing & Distribution" },
      { label: "Pod", value: "Dedicated In-House Creative Pod" },
      { label: "Guarantees", value: "Custom Algorithmic SLAs" },
      { label: "Access", value: "Direct Access to Founders" },
    ],
  },
];

export default function Pricing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>("budget-72k");
  const [currency, setCurrency] = useState<Currency>("USD");

  const selectedPlan = budgetPlans.find((p) => p.id === selectedPlanId) || budgetPlans[1];

  // Listen for navigation / events from Agencies section or URL params
  useEffect(() => {
    const handleSelectTerm = (e: CustomEvent<string>) => {
      const term = e.detail;
      if (term === "short-term") {
        setSelectedPlanId("budget-36k");
      } else if (term === "long-term") {
        setSelectedPlanId("budget-72k");
      }
    };

    window.addEventListener("select-pricing-term" as unknown as string, handleSelectTerm as EventListener);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const term = params.get("term");
      if (term === "short-term") {
        setSelectedPlanId("budget-36k");
      } else if (term === "long-term") {
        setSelectedPlanId("budget-72k");
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
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-[#090e14] overflow-hidden"
    >
      {/* Ambient monochrome grey background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[580px] bg-white/[0.04] blur-[170px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[460px] bg-neutral-400/[0.03] blur-[160px] rounded-full"
      />

      {/* Atmospheric Fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#090e14] to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#090e14] to-transparent z-10"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Card Container Matching Site Theme & Selector Architecture */}
        <div
          ref={containerRef}
          className="relative bg-gradient-to-b from-[#0e1724]/95 via-[#0b131e]/95 to-[#070b10]/95 rounded-[32px] sm:rounded-[40px] p-7 sm:p-10 lg:p-12 shadow-[0_24px_70px_rgba(2,18,47,0.85)] border border-white/[0.12] backdrop-blur-xl select-none text-[#F0ECDD]"
        >
          {/* Top Row: Title & Currency Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono uppercase tracking-wider text-frost mb-2.5">
                <Sparkles className="w-3 h-3 text-frost" />
                <span>Pricing & Scale</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F0ECDD]">
                Select your budget
              </h2>
            </div>

            {/* Currency Switcher (USD, INR, AED) */}
            <div className="inline-flex items-center self-start sm:self-auto p-1.5 rounded-xl bg-white/[0.06] border border-white/10 backdrop-blur-md">
              {(["USD", "INR", "AED"] as Currency[]).map((c) => {
                const isActive = currency === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCurrency(c)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-frost text-[#02122F] font-bold shadow-md"
                        : "text-white/60 hover:text-white"
                    )}
                  >
                    {c === "USD" ? "USD ($)" : c === "INR" ? "INR (₹)" : "AED ($)"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================= */}
          {/* DESKTOP LAYOUT (3 Side-by-Side Cards)                    */}
          {/* ========================================================= */}
          <div className="hidden lg:grid grid-cols-3 gap-5 lg:gap-6 mt-8 items-stretch">
            {budgetPlans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    "relative rounded-2xl p-7 lg:p-8 min-h-[440px] transition-all duration-300 cursor-pointer flex flex-col justify-between select-none",
                    isSelected
                      ? "border-2 border-frost bg-frost/[0.08] shadow-[0_0_35px_rgba(139,163,197,0.18)] ring-1 ring-frost/50 scale-[1.01]"
                      : "border border-white/10 bg-white/[0.02] hover:border-frost/40 hover:bg-white/[0.04]"
                  )}
                >
                  <div>
                    {/* Header Row: Radio + Plan Name/Subtitle + Price */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Radio Button */}
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                            isSelected
                              ? "border-2 border-frost"
                              : "border-2 border-white/30"
                          )}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-frost shadow-[0_0_8px_rgba(139,163,197,0.9)]" />
                          )}
                        </div>

                        <div>
                          <h3 className="font-display font-bold text-lg text-[#F0ECDD] leading-tight">
                            {plan.name}
                          </h3>
                          <p className="text-xs text-frost/80 font-normal lowercase mt-0.5">
                            {plan.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Price on top-right */}
                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-base text-[#F0ECDD] leading-tight">
                          {plan.price[currency]}
                        </div>
                        <div className="text-[11px] text-frost/70 font-normal mt-0.5">
                          {plan.period}
                        </div>
                      </div>
                    </div>

                    {/* Highlight Note for Option 3 */}
                    {plan.highlightNote && (
                      <div className="mt-4 p-2.5 rounded-xl bg-frost/10 border border-frost/25 text-frost text-xs font-medium leading-snug">
                        "{plan.highlightNote}"
                      </div>
                    )}

                    {/* Features Checklist */}
                    <ul className="mt-6 space-y-3 pt-4 border-t border-white/[0.08]">
                      {plan.specs.map((spec) => (
                        <li
                          key={spec.label}
                          className="flex items-center gap-2.5 text-xs text-white/80 font-normal"
                        >
                          <Check className="w-3.5 h-3.5 text-frost stroke-[2.5] shrink-0" />
                          <span>{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* MOBILE LAYOUT (Stacked Accordion Matching Reference)    */}
          {/* ========================================================= */}
          <div className="lg:hidden flex flex-col gap-3 mt-6">
            {budgetPlans.map((plan) => {
              const isSelected = plan.id === selectedPlanId;

              return (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={cn(
                    "rounded-2xl p-5 transition-all duration-300 cursor-pointer",
                    isSelected
                      ? "border-2 border-frost bg-frost/[0.08] shadow-[0_0_35px_rgba(139,163,197,0.18)]"
                      : "border border-white/10 bg-white/[0.02] hover:border-frost/40 hover:bg-white/[0.04]"
                  )}
                >
                  {/* Header Row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "border-2 border-frost"
                            : "border-2 border-white/30"
                        )}
                      >
                        {isSelected && (
                          <div className="w-2.5 h-2.5 rounded-full bg-frost shadow-[0_0_8px_rgba(139,163,197,0.9)]" />
                        )}
                      </div>

                      <div>
                        <h3 className="font-display font-bold text-base text-[#F0ECDD] leading-tight">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-frost/80 font-normal lowercase mt-0.5">
                          {plan.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-display font-bold text-sm text-[#F0ECDD] leading-tight">
                        {plan.price[currency]}
                      </div>
                      <div className="text-[10px] text-frost/70 font-normal mt-0.5">
                        {plan.period}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Checklist on Active Mobile Card */}
                  {isSelected && (
                    <div className="mt-5 pt-4 border-t border-white/[0.08]">
                      {plan.highlightNote && (
                        <div className="mb-4 p-2.5 rounded-xl bg-frost/10 border border-frost/25 text-frost text-xs font-medium leading-snug">
                          "{plan.highlightNote}"
                        </div>
                      )}

                      <ul className="space-y-3">
                        {plan.specs.map((spec) => (
                          <li
                            key={spec.label}
                            className="flex items-center gap-2.5 text-xs text-white/80 font-normal"
                          >
                            <Check className="w-3.5 h-3.5 text-frost stroke-[2.5] shrink-0" />
                            <span>{spec.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* BOTTOM BAR / FOOTER                                      */}
          {/* ========================================================= */}
          {/* Desktop Bottom Controls Row */}
          <div className="hidden lg:flex items-center justify-between mt-8 pt-6 border-t border-white/[0.08]">
            {/* Left: Selected Tier Summary */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-frost/80 uppercase tracking-wider">
                Selected Budget:
              </span>
              <span className="text-sm font-semibold text-[#F0ECDD] bg-white/[0.06] border border-white/10 px-3.5 py-1.5 rounded-lg">
                {selectedPlan.name} ({selectedPlan.price[currency]} {selectedPlan.period})
              </span>
            </div>

            {/* Right: CTA Button */}
            <button
              type="button"
              onClick={handleOrder}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-frost hover:bg-white text-[#02122F] text-sm font-semibold shadow-[0_0_25px_rgba(139,163,197,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>
                {selectedPlan.id === "budget-custom" ? "Discuss Custom Plan" : "Book Strategy Call"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Bottom Full-Width Button */}
          <div className="lg:hidden mt-6">
            <button
              type="button"
              onClick={handleOrder}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-frost hover:bg-white text-[#02122F] text-sm font-semibold shadow-[0_0_25px_rgba(139,163,197,0.3)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>
                {selectedPlan.id === "budget-custom" ? "Discuss Custom Plan" : "Book Strategy Call"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
