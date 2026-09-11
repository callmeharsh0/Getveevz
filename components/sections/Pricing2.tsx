"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Megaphone,
  Crown,
  Gem,
  FileText,
  Share2,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Currency = "USD" | "INR";

interface PlanTier {
  id: string;
  badge: string;
  icon: React.ElementType;
  price: {
    USD: string;
    INR: string;
  };
  period: string;
  subtitle?: string;
  ctaText: string;
  specs: {
    icon: React.ElementType;
    label: string;
    value: string;
  }[];
}

const PRICING_PLANS: PlanTier[] = [
  {
    id: "basic",
    badge: "BASIC",
    icon: Megaphone,
    price: {
      USD: "$8K",
      INR: "₹6.8L",
    },
    period: "Onwards",
    subtitle: "PR CAMPAIGN",
    ctaText: "Get Started",
    specs: [
      {
        icon: FileText,
        label: "Pages",
        value: "Depends on niche",
      },
      {
        icon: Share2,
        label: "Platforms",
        value: "YT+IG+FB+TikTok",
      },
      {
        icon: TrendingUp,
        label: "Reports",
        value: "Yes",
      },
      {
        icon: ShieldCheck,
        label: "Quality",
        value: "10/10",
      },
    ],
  },
  {
    id: "authority",
    badge: "AUTHORITY",
    icon: Crown,
    price: {
      USD: "$40K",
      INR: "₹34L",
    },
    period: "/ 3 months",
    ctaText: "Guaranteed views!",
    specs: [
      {
        icon: FileText,
        label: "Pages",
        value: "30",
      },
      {
        icon: Share2,
        label: "Platforms",
        value: "YT+IG+FB+TikTok",
      },
      {
        icon: TrendingUp,
        label: "Weekly Reports",
        value: "Yes",
      },
      {
        icon: ShieldCheck,
        label: "Quality",
        value: "10/10",
      },
    ],
  },
  {
    id: "dominance",
    badge: "DOMINANCE",
    icon: Gem,
    price: {
      USD: "$80K",
      INR: "₹68L",
    },
    period: "/ 3 months",
    ctaText: "Guaranteed views!",
    specs: [
      {
        icon: FileText,
        label: "Pages",
        value: "60",
      },
      {
        icon: Share2,
        label: "Platforms",
        value: "YT+IG+FB+TikTok",
      },
      {
        icon: TrendingUp,
        label: "Weekly Reports",
        value: "Yes",
      },
      {
        icon: ShieldCheck,
        label: "Quality",
        value: "10/10",
      },
    ],
  },
];

export default function Pricing2() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const scrollToCTA = () => {
    const cta = document.getElementById("cta") || document.querySelector("footer");
    if (cta) {
      cta.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="pricing2"
      className="relative w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#010817] text-white overflow-hidden flex flex-col justify-center border-t border-blue-950/60"
    >
      {/* ========================================================================= */}
      {/* 1. ATMOSPHERIC HORIZON ARC & COSMIC BLUE GLOW (Matching first demo image) */}
      {/* ========================================================================= */}
      {/* Top ambient radial spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-b from-blue-600/25 via-blue-800/15 to-transparent blur-[130px] z-0"
      />

      {/* Horizon arc glow matching reference image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 left-1/2 -translate-x-1/2 w-[150%] max-w-[1500px] h-[450px] rounded-[100%] border-t border-blue-400/40 bg-gradient-to-t from-blue-900/35 via-blue-950/10 to-transparent shadow-[0_-25px_90px_rgba(37,99,235,0.35)] z-0"
      />

      {/* Background Subtle Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#0e234a12_1px,transparent_1px),linear-gradient(to_bottom,#0e234a12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] z-0"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* ========================================================================= */}
        {/* 2. PILL BADGE HEADER & CURRENCY SWITCHER                                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center text-center">
          {/* Main glowing pill header matching reference screenshot */}
          <div className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 border border-cyan-400/40 shadow-[0_0_30px_rgba(37,99,235,0.55)]">
            <span className="font-display font-bold text-base sm:text-lg md:text-xl tracking-[0.12em] text-white uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              PRICING PLANS
            </span>
          </div>

          {/* Currency Toggle Switch (Default: USD) */}
          <div className="mt-5 inline-flex items-center gap-1 bg-[#041126]/90 p-1 rounded-full border border-blue-500/30 backdrop-blur-md shadow-inner">
            <button
              type="button"
              onClick={() => setCurrency("USD")}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 focus:outline-none",
                currency === "USD" ? "text-white" : "text-[#8BA3C5] hover:text-white"
              )}
            >
              {currency === "USD" && (
                <motion.div
                  layoutId="pricing2-currency-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <span>USD</span>
                <span className="text-[10px] opacity-75">($)</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrency("INR")}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 focus:outline-none",
                currency === "INR" ? "text-white" : "text-[#8BA3C5] hover:text-white"
              )}
            >
              {currency === "INR" && (
                <motion.div
                  layoutId="pricing2-currency-pill"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <span>INR</span>
                <span className="text-[10px] opacity-75">(₹)</span>
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. THREE PRICING CARDS (Dynamic Glow On Hover for Any Card)               */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const IconComponent = plan.icon;
            const isHovered = hoveredCard === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl p-6 lg:p-7 transition-all duration-300 backdrop-blur-md cursor-default",
                  // Base background & border matching reference screenshot
                  "bg-gradient-to-b from-[#041029]/95 via-[#030d21]/95 to-[#020817]/95",
                  "border",
                  // Dynamic interactive glow on hover for ANY card
                  isHovered
                    ? "border-cyan-400/80 -translate-y-1.5 shadow-[0_0_35px_rgba(37,99,235,0.45)]"
                    : "border-blue-500/25 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                )}
              >
                {/* Ethereal top ambient rim highlight on hover */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-2xl bg-gradient-to-b from-cyan-400/15 to-transparent transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                />

                <div className="relative z-10 flex flex-col">
                  {/* Top Badge Pill */}
                  <div className="flex justify-center">
                    <span
                      className={cn(
                        "px-4 py-0.5 rounded-full text-[10px] font-mono tracking-[0.2em] uppercase font-bold border transition-colors duration-300",
                        isHovered
                          ? "bg-blue-600/30 text-cyan-300 border-cyan-400/50"
                          : "bg-blue-950/70 text-blue-300/90 border-blue-700/40"
                      )}
                    >
                      {plan.badge}
                    </span>
                  </div>

                  {/* Circular Neon Icon Badge */}
                  <div className="mt-5 flex justify-center">
                    <div
                      className={cn(
                        "w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-300",
                        isHovered
                          ? "bg-gradient-to-b from-blue-600/30 to-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105"
                          : "bg-[#051433]/80 border-blue-500/40 text-blue-400 shadow-[0_0_14px_rgba(37,99,235,0.2)]"
                      )}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="mt-5 text-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currency}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="flex flex-col items-center"
                      >
                        <span className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                          {plan.price[currency]}
                        </span>
                        <span className="mt-1 text-xs font-medium tracking-wide text-[#8BA3C5]">
                          {plan.period}
                        </span>
                      </motion.div>
                    </AnimatePresence>

                    {/* Subtitle / Row Spacer (e.g. PR CAMPAIGN) */}
                    <div className="h-7 mt-2 flex items-center justify-center">
                      {plan.subtitle ? (
                        <span className="font-display text-sm font-semibold tracking-wider text-cyan-400 uppercase">
                          {plan.subtitle}
                        </span>
                      ) : (
                        <span className="text-transparent text-sm select-none">{"\u00A0"}</span>
                      )}
                    </div>
                  </div>

                  {/* Specs Table List */}
                  <div className="mt-4 space-y-2 pt-3 border-t border-blue-900/50">
                    {plan.specs.map((spec, sIdx) => {
                      const SpecIcon = spec.icon;
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center justify-between py-1.5 border-b border-blue-950/60 text-xs"
                        >
                          <div className="flex items-center gap-2 text-[#8BA3C5]">
                            <SpecIcon className="w-3.5 h-3.5 text-cyan-400/90 shrink-0" />
                            <span className="font-medium text-slate-300">
                              {spec.label}
                            </span>
                          </div>
                          <span className="font-semibold text-white tracking-wide text-right">
                            {spec.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="relative z-10 mt-6 pt-1">
                  <button
                    type="button"
                    onClick={scrollToCTA}
                    className={cn(
                      "w-full py-2.5 px-3 rounded-lg font-display font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5",
                      isHovered
                        ? "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.55)] border border-cyan-400/50 active:scale-98"
                        : "bg-[#061530] text-blue-200 border border-blue-600/30 hover:border-blue-400/50 active:scale-98"
                    )}
                  >
                    <span>{plan.ctaText}</span>
                    {plan.id === "basic" && <ArrowRight className="w-3.5 h-3.5" />}
                    {plan.id !== "basic" && <Sparkles className="w-3.5 h-3.5 opacity-80" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
