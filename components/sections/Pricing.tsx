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
      { label: "Team", value: "Full Dedicated Team" },
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
    highlightNote: "We have a higher budget and need a custom plan",
    specs: [
      { label: "Pages", value: "Unlimited Posting Pages" },
      { label: "Content", value: "Multi-Show Content & Distribution" },
      { label: "Pod", value: "Your Own Creative Team" },
      { label: "Guarantees", value: "Custom Performance Targets" },
      { label: "Access", value: "Direct Access to Founders" },
    ],
  },
];

/* ─── Haptic spring curve (no default ease-in-out) ─── */
const SPRING = "cubic-bezier(0.32, 0.72, 0, 1)";

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
      className="relative w-full py-28 sm:py-36 lg:py-40 bg-[#090e14] overflow-hidden"
    >
      {/* Ambient monochrome grey background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[580px] bg-white/[0.035] blur-[170px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[460px] bg-neutral-400/[0.025] blur-[160px] rounded-full"
      />

      {/* Atmospheric Edge Fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#090e14] to-transparent z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#090e14] to-transparent z-10"
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* ═══════════════════════════════════════════════════════════════
            DOUBLE-BEZEL OUTER SHELL (Doppelrand Architecture)
            — Outer tray with hairline ring, inner core with its own surface
        ═══════════════════════════════════════════════════════════════ */}
        <div className="rounded-[2.5rem] p-[3px] bg-gradient-to-b from-white/[0.09] via-white/[0.04] to-white/[0.02] shadow-[0_40px_80px_-12px_rgba(0,0,0,0.9)]">

          {/* Inner Core */}
          <div
            ref={containerRef}
            className="relative rounded-[calc(2.5rem-3px)] bg-gradient-to-b from-[#0e1724]/95 via-[#0b131e]/95 to-[#070b10]/95 p-8 sm:p-10 lg:p-14 select-none text-moonlight"
            style={{
              boxShadow: "inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.5)",
            }}
          >

            {/* ── Top Row: Eyebrow + Title + Currency Switcher ── */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 pb-8 border-b border-white/[0.06]">
              <div>
                {/* Eyebrow Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0038E2]/[0.06] ring-1 ring-[#0038E2]/20 text-[10px] font-mono uppercase tracking-[0.2em] text-[#0038E2] mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>Pricing & Scale</span>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight text-moonlight leading-[1.1]">
                  Select your budget
                </h2>
              </div>

              {/* Currency Switcher — Double-Bezel micro component */}
              <div className="rounded-2xl p-[2px] bg-gradient-to-b from-white/[0.08] to-white/[0.03] self-start sm:self-auto">
                <div className="inline-flex items-center p-1.5 rounded-[calc(1rem-2px)] bg-oxford">
                  {(["USD", "INR", "AED"] as Currency[]).map((c) => {
                    const isActive = currency === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCurrency(c)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-xs font-mono cursor-pointer",
                          isActive
                            ? "bg-[#0038E2] text-white font-bold shadow-[0_0_16px_rgba(0,56,226,0.4)]"
                            : "text-white/50 hover:text-white/80"
                        )}
                        style={{ transition: `all 500ms ${SPRING}` }}
                      >
                        {c === "USD" ? "USD ($)" : c === "INR" ? "INR (₹)" : "AED ($)"}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                DESKTOP: 3-Column Bento Grid with Double-Bezel Cards
            ═════════════════════════════════════════════════════════ */}
            <div className="hidden lg:grid grid-cols-3 gap-6 mt-10 items-stretch">
              {budgetPlans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className="group cursor-pointer"
                    style={{ transition: `transform 700ms ${SPRING}` }}
                  >
                    {/* Outer Shell */}
                    <div
                      className={cn(
                        "rounded-[2rem] p-[2px] h-full",
                        isSelected
                          ? "bg-gradient-to-b from-[#0038E2]/40 via-[#0038E2]/15 to-[#0038E2]/05 shadow-[0_0_50px_rgba(0,56,226,0.15)]"
                          : "bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-transparent"
                      )}
                      style={{ transition: `all 700ms ${SPRING}` }}
                    >
                      {/* Inner Core */}
                      <div
                        className={cn(
                          "relative rounded-[calc(2rem-2px)] p-7 lg:p-8 min-h-[460px] flex flex-col justify-between",
                          isSelected
                            ? "bg-oxford"
                            : "bg-[#090e14] group-hover:bg-[#0b1219]"
                        )}
                        style={{
                          boxShadow: isSelected
                            ? "inset 0 1px 1px rgba(0,56,226,0.15), inset 0 -1px 2px rgba(0,0,0,0.4)"
                            : "inset 0 1px 1px rgba(255,255,255,0.06), inset 0 -1px 2px rgba(0,0,0,0.3)",
                          transition: `all 700ms ${SPRING}`,
                        }}
                      >


                        <div>
                          {/* Header: Radio + Plan Name + Price */}
                          <div className="flex items-start justify-between gap-3 mt-2">
                            <div className="flex items-start gap-3.5">
                              {/* Radio — machined circle */}
                              <div
                                className={cn(
                                  "w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 mt-0.5 ring-1",
                                  isSelected
                                    ? "ring-[#0038E2] bg-[#0038E2]/10"
                                    : "ring-white/20 bg-white/[0.03]"
                                )}
                                style={{ transition: `all 500ms ${SPRING}` }}
                              >
                                <div
                                  className={cn(
                                    "rounded-full",
                                    isSelected
                                      ? "w-3 h-3 bg-[#0038E2] shadow-[0_0_12px_rgba(0,56,226,0.9)]"
                                      : "w-0 h-0"
                                  )}
                                  style={{ transition: `all 500ms ${SPRING}` }}
                                />
                              </div>

                              <div>
                                <h3 className="font-display font-bold text-xl text-moonlight leading-tight tracking-tight">
                                  {plan.name}
                                </h3>
                                <p className="text-xs text-[#495B7D] font-normal lowercase mt-1 tracking-wide">
                                  {plan.subtitle}
                                </p>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-right shrink-0">
                              <div className="font-display font-bold text-lg text-moonlight leading-tight tracking-tight">
                                {plan.price[currency]}
                              </div>
                              <div className="text-[11px] text-[#495B7D] font-mono mt-1">
                                {plan.period}
                              </div>
                            </div>
                          </div>

                          {/* Highlight Note */}
                          {plan.highlightNote && (
                            <div
                              className="mt-5 p-3 rounded-xl bg-[#0038E2]/[0.06] ring-1 ring-[#0038E2]/15 text-[#0038E2] text-xs leading-relaxed"
                              style={{
                                boxShadow: "inset 0 1px 0 rgba(0,56,226,0.1)",
                              }}
                            >
                              &ldquo;{plan.highlightNote}&rdquo;
                            </div>
                          )}

                          {/* Feature Checklist */}
                          <ul className="mt-7 space-y-3.5 pt-5 border-t border-white/[0.06]">
                            {plan.specs.map((spec) => (
                              <li
                                key={spec.label}
                                className="flex items-center gap-3 text-[13px] text-white/75 font-normal"
                              >
                                <div className="w-5 h-5 rounded-md bg-[#0038E2]/[0.08] ring-1 ring-[#0038E2]/15 flex items-center justify-center shrink-0">
                                  <Check className="w-3 h-3 text-[#0038E2] stroke-[2.5]" />
                                </div>
                                <span>{spec.value}</span>
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
                MOBILE: Stacked Accordion with Double-Bezel
            ═════════════════════════════════════════════════════════ */}
            <div className="lg:hidden flex flex-col gap-3.5 mt-8">
              {budgetPlans.map((plan) => {
                const isSelected = plan.id === selectedPlanId;

                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlanId(plan.id)}
                    className="cursor-pointer"
                  >
                    {/* Outer Shell */}
                    <div
                      className={cn(
                        "rounded-2xl p-[2px]",
                        isSelected
                          ? "bg-gradient-to-b from-[#0038E2]/35 via-[#0038E2]/12 to-[#0038E2]/05 shadow-[0_0_35px_rgba(0,56,226,0.12)]"
                          : "bg-gradient-to-b from-white/[0.07] to-transparent"
                      )}
                      style={{ transition: `all 500ms ${SPRING}` }}
                    >
                      {/* Inner Core */}
                      <div
                        className={cn(
                          "rounded-[calc(1rem-2px)] p-5",
                          isSelected ? "bg-oxford" : "bg-[#090e14]"
                        )}
                        style={{
                          boxShadow: isSelected
                            ? "inset 0 1px 1px rgba(0,56,226,0.12)"
                            : "inset 0 1px 1px rgba(255,255,255,0.04)",
                          transition: `all 500ms ${SPRING}`,
                        }}
                      >
                        {/* Header Row */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-5 h-5 rounded-full flex items-center justify-center shrink-0 ring-1",
                                isSelected
                                  ? "ring-[#0038E2] bg-[#0038E2]/10"
                                  : "ring-white/20 bg-white/[0.03]"
                              )}
                              style={{ transition: `all 500ms ${SPRING}` }}
                            >
                              {isSelected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0038E2] shadow-[0_0_8px_rgba(0,56,226,0.9)]" />
                              )}
                            </div>

                            <div>
                              <h3 className="font-display font-bold text-base text-moonlight leading-tight">
                                {plan.name}
                              </h3>
                              <p className="text-[11px] text-[#495B7D] font-normal lowercase mt-0.5">
                                {plan.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <div className="font-display font-bold text-sm text-moonlight leading-tight">
                              {plan.price[currency]}
                            </div>
                            <div className="text-[10px] text-[#495B7D] font-mono mt-0.5">
                              {plan.period}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Checklist */}
                        {isSelected && (
                          <div className="mt-5 pt-4 border-t border-white/[0.06]">
                            {plan.highlightNote && (
                              <div className="mb-4 p-3 rounded-xl bg-[#0038E2]/[0.06] ring-1 ring-[#0038E2]/15 text-[#0038E2] text-xs leading-relaxed">
                                &ldquo;{plan.highlightNote}&rdquo;
                              </div>
                            )}

                            <ul className="space-y-3">
                              {plan.specs.map((spec) => (
                                <li
                                  key={spec.label}
                                  className="flex items-center gap-2.5 text-xs text-white/75 font-normal"
                                >
                                  <div className="w-4.5 h-4.5 rounded-md bg-[#0038E2]/[0.08] ring-1 ring-[#0038E2]/15 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-[#0038E2] stroke-[2.5]" />
                                  </div>
                                  <span>{spec.value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ═════════════════════════════════════════════════════════
                BOTTOM BAR — Double-Bezel footer strip
            ═════════════════════════════════════════════════════════ */}

            {/* Desktop */}
            <div className="hidden lg:flex items-center justify-between mt-10 pt-7 border-t border-white/[0.06]">
              {/* Left: Selected summary */}
              <div className="flex items-center gap-3.5">
                <span className="text-[10px] font-mono text-[#495B7D] uppercase tracking-[0.2em]">
                  Selected:
                </span>
                <div className="rounded-xl p-[1.5px] bg-gradient-to-r from-white/[0.08] to-white/[0.03]">
                  <span className="block text-sm font-semibold text-moonlight bg-oxford px-4 py-2 rounded-[calc(0.75rem-1.5px)]">
                    {selectedPlan.name} — {selectedPlan.price[currency]} {selectedPlan.period}
                  </span>
                </div>
              </div>

              {/* Right: Button-in-Button CTA with trailing icon circle */}
              <button
                type="button"
                onClick={handleOrder}
                className="group inline-flex items-center gap-0 rounded-full bg-[#0038E2] hover:bg-[#0038E2]/90 pl-7 pr-2 py-2 cursor-pointer active:scale-[0.97]"
                style={{ transition: `all 600ms ${SPRING}` }}
              >
                <span className="text-sm font-semibold text-white tracking-tight mr-3">
                  {selectedPlan.id === "budget-custom" ? "Discuss Custom Plan" : "Book Strategy Call"}
                </span>
                {/* Nested icon circle — the "island" */}
                <div
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
                  style={{ transition: `transform 500ms ${SPRING}` }}
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

            {/* Mobile */}
            <div className="lg:hidden mt-7">
              <button
                type="button"
                onClick={handleOrder}
                className="group w-full inline-flex items-center justify-center gap-0 rounded-full bg-[#0038E2] hover:bg-[#0038E2]/90 pl-6 pr-2.5 py-2.5 cursor-pointer active:scale-[0.97]"
                style={{ transition: `all 600ms ${SPRING}` }}
              >
                <span className="text-sm font-semibold text-white tracking-tight mr-3">
                  {selectedPlan.id === "budget-custom" ? "Discuss Custom Plan" : "Book Strategy Call"}
                </span>
                <div
                  className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center"
                  style={{ transition: `transform 500ms ${SPRING}` }}
                >
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
