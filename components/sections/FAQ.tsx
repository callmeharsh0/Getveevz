"use client";

import React, { useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Sliders,
  Layers,
  ShieldCheck,
  TrendingUp,
  Clock,
  MessageSquare,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BudgetTier = "36k" | "72k" | "custom";
export type VariantType = "configurator" | "wizard" | "deck";
export type ContentType = "podcast" | "keynote" | "interview" | "founder";

interface FormData {
  fullName: string;
  countryCode: string;
  contactNo: string;
  companyName: string;
  role: string;
  socialLinks: string;
  budget: BudgetTier | "";
  contentType: ContentType;
  platforms: string[];
}

const INITIAL_FORM: FormData = {
  fullName: "",
  countryCode: "+1",
  contactNo: "",
  companyName: "",
  role: "",
  socialLinks: "",
  budget: "36k",
  contentType: "podcast",
  platforms: ["tiktok", "reels", "shorts"],
};

const COUNTRY_CODES = [
  { code: "+1", label: "+1 (US/CA)" },
  { code: "+91", label: "+91 (IN)" },
  { code: "+971", label: "+971 (UAE)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+61", label: "+61 (AU)" },
  { code: "+65", label: "+65 (SG)" },
  { code: "+49", label: "+49 (DE)" },
];

const BUDGET_OPTIONS: {
  id: BudgetTier;
  primary: string;
  sublabel?: string;
  inr: string;
  aed: string;
  views: string;
  clips: string;
  creators: string;
}[] = [
  {
    id: "36k",
    primary: "$36k / month",
    inr: "₹31.2L INR",
    aed: "132k AED",
    views: "25M – 40M+ Views",
    clips: "40–60 Custom Clips",
    creators: "15+ Dedicated Clippers",
  },
  {
    id: "72k",
    primary: "$72k / month",
    inr: "₹62.5L INR",
    aed: "264k AED",
    views: "55M – 85M+ Views",
    clips: "80–120 Custom Clips",
    creators: "35+ Dedicated Clippers",
  },
  {
    id: "custom",
    primary: "Custom Enterprise Plan",
    sublabel: "From $100k+ / month",
    inr: "₹85L+ INR",
    aed: "365k+ AED",
    views: "120M+ Multi-Platform Reach",
    clips: "Unlimited Rapid Hooks",
    creators: "Custom Enterprise Mesh",
  },
];

const CONTENT_TYPES: { id: ContentType; label: string; icon: string }[] = [
  { id: "podcast", label: "Long Podcasts", icon: "🎙️" },
  { id: "founder", label: "Founder / CEO Talks", icon: "👔" },
  { id: "keynote", label: "Keynotes & Events", icon: "🎤" },
  { id: "interview", label: "Streams & Interviews", icon: "📹" },
];

const PLATFORM_OPTIONS = [
  { id: "tiktok", label: "TikTok", tag: "Algorithm Sync" },
  { id: "reels", label: "IG Reels", tag: "High Retention" },
  { id: "shorts", label: "YT Shorts", tag: "Search Authority" },
];

export default function FAQ() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [activeVariant, setActiveVariant] = useState<VariantType>("configurator");
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const selectedTier =
    BUDGET_OPTIONS.find((b) => b.id === formData.budget) || BUDGET_OPTIONS[0];

  const togglePlatform = (platId: string) => {
    setFormData((prev) => {
      const exists = prev.platforms.includes(platId);
      if (exists && prev.platforms.length === 1) return prev; // Keep at least one
      return {
        ...prev,
        platforms: exists
          ? prev.platforms.filter((p) => p !== platId)
          : [...prev.platforms, platId],
      };
    });
  };

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.contactNo.trim()) errs.contactNo = "Contact number is required";
    if (!formData.companyName.trim()) errs.companyName = "Company or channel name is required";
    if (!formData.role.trim()) errs.role = "Role is required";
    if (!formData.socialLinks.trim()) errs.socialLinks = "Content / channel link is required";
    if (!formData.budget) errs.budget = "Please select a target budget";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="relative w-full bg-[#090e14] py-24 sm:py-32 md:py-36 px-4 sm:px-6 lg:px-8 text-[#f2ece1] overflow-hidden select-none"
    >
      <div id="questionnaire" className="absolute -top-24 left-0 w-0 h-0" />

      {/* Atmospheric Radial Gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(0,56,226,0.07),transparent_70%)] blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[350px] bg-[radial-gradient(circle,rgba(139,163,198,0.06),transparent_70%)] blur-[140px] rounded-full"
      />

      {/* Precision Blueprint Grid Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(139,163,198,0.07)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)] opacity-70"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div data-reveal className="text-center mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#f2ece1] leading-[1.12]">
            Let&apos;s build your{" "}
            <span className="text-[#8BA3C6] italic font-normal inline-block pb-0.5">
              distribution.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#f2ece1]/60 font-sans max-w-md mx-auto leading-relaxed">
            Tell us about your content catalog. We review submissions and respond within 24 hours.
          </p>

          {/* ========================================================================= */}
          {/* VARIANT SWITCHER TABS (ALLOWS USER TO TEST ALL 3 DESIGNS LIVE)            */}
          {/* ========================================================================= */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-lg max-w-full overflow-x-auto">
            {[
              { id: "configurator" as VariantType, label: "01 · Live Configurator", icon: Sliders },
              { id: "wizard" as VariantType, label: "02 · Interactive Wizard", icon: Layers },
              { id: "deck" as VariantType, label: "03 · VIP Partnership Deck", icon: ShieldCheck },
            ].map((tab) => {
              const isActive = activeVariant === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveVariant(tab.id);
                    setWizardStep(1);
                  }}
                  className={cn(
                    "relative px-3.5 sm:px-4 py-2 text-xs font-mono rounded-full transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer",
                    isActive
                      ? "bg-[#f2ece1] text-[#090e14] font-semibold shadow-[0_2px_12px_rgba(242,236,225,0.25)] scale-[1.02]"
                      : "text-[#f2ece1]/70 hover:text-[#f2ece1] hover:bg-white/[0.05]"
                  )}
                >
                  <Icon className={cn("w-3.5 h-3.5", isActive ? "text-[#090e14]" : "text-[#8BA3C6]")} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Submitted State */}
        {isSubmitted ? (
          <div className="max-w-xl mx-auto rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 sm:p-2.5 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
            <div className="rounded-[calc(2rem-0.625rem)] bg-[#0b1017]/95 border border-white/[0.06] p-8 sm:p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0038E2]/20 border border-[#0038E2]/50 flex items-center justify-center mx-auto text-white shadow-[0_0_30px_rgba(0,56,226,0.35)]">
                <CheckCircle2 className="w-8 h-8 text-[#8BA3C6]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#f2ece1]">
                Application Received.
              </h3>
              <p className="text-sm text-[#f2ece1]/70 max-w-md mx-auto leading-relaxed font-sans">
                Thank you, <span className="text-[#f2ece1] font-medium">{formData.fullName}</span>. We
                logged your intake for{" "}
                <span className="text-[#8BA3C6] font-medium">{formData.companyName || "your brand"}</span>.
                Our distribution director will reach out via{" "}
                <span className="text-[#f2ece1]">
                  {formData.countryCode} {formData.contactNo}
                </span>{" "}
                within 24 hours with your custom reach projection.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData(INITIAL_FORM);
                    setWizardStep(1);
                  }}
                  className="text-xs font-mono text-[#8BA3C6] hover:underline underline-offset-4 tracking-wider transition-colors cursor-pointer"
                >
                  ← Submit another brief
                </button>
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* ========================================================================= */}
            {/* VARIANT 1: LIVE CAMPAIGN CONFIGURATOR (SPLIT TELEMETRY & TACTILE FORM)    */}
            {/* ========================================================================= */}
            {activeVariant === "configurator" && (
              <motion.div
                key="variant-configurator"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left Column: Live Dynamic Projection HUD */}
                <div className="lg:col-span-5 rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 sm:p-2.5 shadow-2xl">
                  <div className="rounded-[calc(2rem-0.625rem)] bg-[#0b1017]/95 border border-white/[0.06] p-6 sm:p-8 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#8BA3C6] flex items-center gap-2 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#0038E2] animate-pulse" />
                        Live Campaign Blueprint
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-white/70">
                        Interactive
                      </span>
                    </div>

                    {/* Metric 1: Projected Views */}
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#f2ece1]/70 font-mono">
                        <span className="flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#8BA3C6]" />
                          Projected Monthly Reach
                        </span>
                        <span className="text-[#8BA3C6] font-semibold">Top 1% Metric</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-display font-bold text-[#f2ece1] tracking-tight">
                        {selectedTier.views}
                      </p>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#0038E2] via-[#8BA3C6] to-white rounded-full transition-all duration-500"
                          style={{
                            width:
                              formData.budget === "36k"
                                ? "45%"
                                : formData.budget === "72k"
                                ? "75%"
                                : "100%",
                          }}
                        />
                      </div>
                    </div>

                    {/* Metric 2 & 3: Outputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8">
                        <span className="text-[10px] font-mono uppercase text-[#f2ece1]/60 block mb-1">
                          Hook Output
                        </span>
                        <p className="text-sm sm:text-base font-bold text-[#f2ece1] font-display">
                          {selectedTier.clips}
                        </p>
                      </div>
                      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/8">
                        <span className="text-[10px] font-mono uppercase text-[#f2ece1]/60 block mb-1">
                          Creator Pod
                        </span>
                        <p className="text-sm sm:text-base font-bold text-[#8BA3C6] font-display">
                          {selectedTier.creators}
                        </p>
                      </div>
                    </div>

                    {/* Active Channels */}
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#f2ece1]/60 block mb-2">
                        Target Channels (Click to Toggle)
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PLATFORM_OPTIONS.map((p) => {
                          const isSelected = formData.platforms.includes(p.id);
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => togglePlatform(p.id)}
                              className={cn(
                                "px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer flex items-center gap-1.5",
                                isSelected
                                  ? "bg-[#0038E2]/20 border-[#0038E2] text-[#f2ece1]"
                                  : "bg-white/[0.02] border-white/10 text-[#f2ece1]/50 hover:border-white/20"
                              )}
                            >
                              <span
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full",
                                  isSelected ? "bg-[#0038E2] animate-ping" : "bg-white/20"
                                )}
                              />
                              <span>{p.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Turnaround Guarantee Pill */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[#8BA3C6] shrink-0" />
                      <div className="text-xs text-[#f2ece1]/80 leading-tight">
                        <span className="font-semibold text-white">24-Hour Review:</span> We analyze
                        your channel &amp; send custom mockups before launch.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Tactile Intake Form */}
                <div className="lg:col-span-7 rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 sm:p-2.5 shadow-2xl">
                  <div className="rounded-[calc(2rem-0.625rem)] bg-[#0b1017]/95 border border-white/[0.06] p-6 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Content Type Selector Chips */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#f2ece1]/75 mb-2.5">
                          1. What type of long-form content do you produce?
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {CONTENT_TYPES.map((c) => {
                            const isSelected = formData.contentType === c.id;
                            return (
                              <button
                                key={c.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, contentType: c.id })}
                                className={cn(
                                  "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[64px]",
                                  isSelected
                                    ? "bg-[#8BA3C6]/15 border-[#8BA3C6] text-white shadow-sm"
                                    : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20 hover:bg-white/[0.04]"
                                )}
                              >
                                <span className="text-base">{c.icon}</span>
                                <span className="text-[11px] font-medium tracking-tight mt-1">
                                  {c.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2-Column Name & Contact */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="c-fullName"
                            className="block text-[11px] font-mono uppercase tracking-wider text-[#f2ece1]/75 mb-1.5"
                          >
                            2. Full Name <span className="text-[#8BA3C6]">*</span>
                          </label>
                          <input
                            id="c-fullName"
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => {
                              setFormData({ ...formData, fullName: e.target.value });
                              if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                            }}
                            placeholder="Alex Morgan"
                            className={cn(
                              "w-full rounded-xl bg-white/[0.02] border px-3.5 py-3 text-sm text-[#f2ece1] placeholder:text-[#f2ece1]/25 focus:outline-none focus:ring-1 transition-all",
                              errors.fullName
                                ? "border-red-400 focus:ring-red-400/30"
                                : "border-white/10 focus:border-[#8BA3C6] focus:ring-[#8BA3C6]/30"
                            )}
                          />
                          {errors.fullName && (
                            <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="c-contactNo"
                            className="block text-[11px] font-mono uppercase tracking-wider text-[#f2ece1]/75 mb-1.5"
                          >
                            3. WhatsApp / Phone <span className="text-[#8BA3C6]">*</span>
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={formData.countryCode}
                              onChange={(e) =>
                                setFormData({ ...formData, countryCode: e.target.value })
                              }
                              className="rounded-xl bg-[#090e14] border border-white/10 px-2.5 py-3 text-xs text-[#f2ece1] focus:outline-none"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code} className="bg-[#090e14]">
                                  {c.label}
                                </option>
                              ))}
                            </select>
                            <input
                              id="c-contactNo"
                              type="tel"
                              value={formData.contactNo}
                              onChange={(e) => {
                                setFormData({ ...formData, contactNo: e.target.value });
                                if (errors.contactNo) setErrors({ ...errors, contactNo: undefined });
                              }}
                              placeholder="Phone number"
                              className={cn(
                                "w-full rounded-xl bg-white/[0.02] border px-3.5 py-3 text-sm text-[#f2ece1] placeholder:text-[#f2ece1]/25 focus:outline-none focus:ring-1 transition-all",
                                errors.contactNo
                                  ? "border-red-400 focus:ring-red-400/30"
                                  : "border-white/10 focus:border-[#8BA3C6] focus:ring-[#8BA3C6]/30"
                              )}
                            />
                          </div>
                          {errors.contactNo && (
                            <p className="text-[10px] text-red-400 mt-1">{errors.contactNo}</p>
                          )}
                        </div>
                      </div>

                      {/* 2-Column Company & Social Link */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="c-company"
                            className="block text-[11px] font-mono uppercase tracking-wider text-[#f2ece1]/75 mb-1.5"
                          >
                            4. Company / Channel Name <span className="text-[#8BA3C6]">*</span>
                          </label>
                          <input
                            id="c-company"
                            type="text"
                            value={formData.companyName}
                            onChange={(e) => {
                              setFormData({ ...formData, companyName: e.target.value });
                              if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                            }}
                            placeholder="e.g. Dialogue Media"
                            className={cn(
                              "w-full rounded-xl bg-white/[0.02] border px-3.5 py-3 text-sm text-[#f2ece1] placeholder:text-[#f2ece1]/25 focus:outline-none focus:ring-1 transition-all",
                              errors.companyName
                                ? "border-red-400"
                                : "border-white/10 focus:border-[#8BA3C6]"
                            )}
                          />
                          {errors.companyName && (
                            <p className="text-[10px] text-red-400 mt-1">{errors.companyName}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="c-socialLinks"
                            className="block text-[11px] font-mono uppercase tracking-wider text-[#f2ece1]/75 mb-1.5"
                          >
                            5. Channel / Feed URL <span className="text-[#8BA3C6]">*</span>
                          </label>
                          <input
                            id="c-socialLinks"
                            type="text"
                            value={formData.socialLinks}
                            onChange={(e) => {
                              setFormData({ ...formData, socialLinks: e.target.value });
                              if (errors.socialLinks) setErrors({ ...errors, socialLinks: undefined });
                            }}
                            placeholder="youtube.com/@channel or feed"
                            className={cn(
                              "w-full rounded-xl bg-white/[0.02] border px-3.5 py-3 text-sm text-[#f2ece1] placeholder:text-[#f2ece1]/25 focus:outline-none focus:ring-1 transition-all",
                              errors.socialLinks
                                ? "border-red-400"
                                : "border-white/10 focus:border-[#8BA3C6]"
                            )}
                          />
                          {errors.socialLinks && (
                            <p className="text-[10px] text-red-400 mt-1">{errors.socialLinks}</p>
                          )}
                        </div>
                      </div>

                      {/* Interactive Budget Options with Live INR/AED */}
                      <div>
                        <label className="block text-[11px] font-mono uppercase tracking-wider text-[#f2ece1]/75 mb-2">
                          6. Select Target Scale (Updates Blueprint on Left)
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          {BUDGET_OPTIONS.map((opt) => {
                            const isSelected = formData.budget === opt.id;
                            return (
                              <div
                                key={opt.id}
                                onClick={() => setFormData({ ...formData, budget: opt.id })}
                                className={cn(
                                  "p-3 rounded-xl border cursor-pointer transition-all flex flex-col justify-between",
                                  isSelected
                                    ? "bg-[#8BA3C6]/15 border-[#8BA3C6] shadow-sm"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                )}
                              >
                                <div>
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs sm:text-sm font-bold text-[#f2ece1] font-display">
                                      {opt.primary}
                                    </p>
                                    {isSelected && (
                                      <span className="w-2 h-2 rounded-full bg-[#8BA3C6]" />
                                    )}
                                  </div>
                                  <p className="text-[10px] font-mono text-[#8BA3C6] mt-0.5">
                                    {opt.inr} • {opt.aed}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full rounded-full bg-[#f2ece1] text-[#090e14] px-6 py-3.5 font-medium text-sm sm:text-base hover:bg-white hover:shadow-[0_0_30px_rgba(242,236,225,0.25)] active:scale-[0.98] flex items-center justify-between transition-all disabled:opacity-60 cursor-pointer"
                      >
                        <span className="font-semibold tracking-tight">
                          {isSubmitting ? "Generating Blueprint..." : "Get Custom Distribution Blueprint"}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#090e14]/10 flex items-center justify-center group-hover:scale-105 group-hover:translate-x-0.5 transition-transform">
                          <ArrowRight className="w-4 h-4 text-[#090e14]" strokeWidth={2} />
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* VARIANT 2: MULTI-STEP INTERACTIVE WIZARD (TYPEFORM-STYLE PROGRESSION)     */}
            {/* ========================================================================= */}
            {activeVariant === "wizard" && (
              <motion.div
                key="variant-wizard"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="max-w-2xl mx-auto rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 sm:p-2.5 shadow-2xl"
              >
                <div className="rounded-[calc(2rem-0.625rem)] bg-[#0b1017]/95 border border-white/[0.06] p-6 sm:p-10">
                  {/* Step Progress Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#8BA3C6] font-semibold">
                        Step 0{wizardStep} of 03
                      </span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs text-white/70">
                        {wizardStep === 1
                          ? "Content Catalog"
                          : wizardStep === 2
                          ? "Distribution Scale"
                          : "Direct Contact"}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-28 bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#0038E2] to-[#8BA3C6] transition-all duration-300"
                        style={{ width: `${(wizardStep / 3) * 100}%` }}
                      />
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {/* WIZARD STEP 1 */}
                    {wizardStep === 1 && (
                      <motion.div
                        key="step-1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-2">
                            What type of content do you produce?
                          </h3>
                          <p className="text-xs sm:text-sm text-white/60">
                            Select the primary format of your video or audio catalog.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {CONTENT_TYPES.map((c) => (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, contentType: c.id })}
                              className={cn(
                                "p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3",
                                formData.contentType === c.id
                                  ? "bg-[#8BA3C6]/20 border-[#8BA3C6] text-white shadow-sm"
                                  : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20"
                              )}
                            >
                              <span className="text-2xl">{c.icon}</span>
                              <div>
                                <p className="text-sm font-semibold text-white">{c.label}</p>
                                <span className="text-[10px] font-mono text-white/50">
                                  {c.id === "podcast"
                                    ? "Conversational"
                                    : c.id === "founder"
                                    ? "High-Authority"
                                    : "Engaging Cuts"}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/75 mb-2">
                            Where can we review your catalog?
                          </label>
                          <input
                            type="text"
                            value={formData.socialLinks}
                            onChange={(e) => setFormData({ ...formData, socialLinks: e.target.value })}
                            placeholder="YouTube channel, Spotify feed, or Website link"
                            className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3.5 text-sm text-[#f2ece1] placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                          />
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            type="button"
                            onClick={() => setWizardStep(2)}
                            className="px-6 py-3 rounded-full bg-[#f2ece1] text-[#090e14] font-semibold text-sm flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
                          >
                            <span>Continue to Scale</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* WIZARD STEP 2 */}
                    {wizardStep === 2 && (
                      <motion.div
                        key="step-2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div>
                          <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-2">
                            Where do you want to dominate?
                          </h3>
                          <p className="text-xs sm:text-sm text-white/60">
                            Choose your target channels and estimated monthly budget.
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/75 mb-2">
                            Target Platforms
                          </label>
                          <div className="grid grid-cols-3 gap-3">
                            {PLATFORM_OPTIONS.map((p) => {
                              const isSelected = formData.platforms.includes(p.id);
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => togglePlatform(p.id)}
                                  className={cn(
                                    "p-3 rounded-xl border text-center transition-all cursor-pointer",
                                    isSelected
                                      ? "bg-[#0038E2]/25 border-[#0038E2] text-white"
                                      : "bg-white/[0.02] border-white/10 text-white/60 hover:border-white/20"
                                  )}
                                >
                                  <p className="text-sm font-bold text-white">{p.label}</p>
                                  <span className="text-[10px] font-mono text-[#8BA3C6]">
                                    {p.tag}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono uppercase tracking-wider text-white/75 mb-2">
                            Target Monthly Investment
                          </label>
                          <div className="space-y-2.5">
                            {BUDGET_OPTIONS.map((opt) => (
                              <div
                                key={opt.id}
                                onClick={() => setFormData({ ...formData, budget: opt.id })}
                                className={cn(
                                  "p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                                  formData.budget === opt.id
                                    ? "bg-[#8BA3C6]/15 border-[#8BA3C6]"
                                    : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                )}
                              >
                                <div>
                                  <p className="text-sm font-semibold text-white">{opt.primary}</p>
                                  <span className="text-xs font-mono text-[#8BA3C6]">
                                    {opt.views}
                                  </span>
                                </div>
                                <span className="text-xs font-mono text-white/50">
                                  {opt.inr} / {opt.aed}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <button
                            type="button"
                            onClick={() => setWizardStep(1)}
                            className="px-4 py-2.5 rounded-full text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setWizardStep(3)}
                            className="px-6 py-3 rounded-full bg-[#f2ece1] text-[#090e14] font-semibold text-sm flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
                          >
                            <span>Continue to Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* WIZARD STEP 3 */}
                    {wizardStep === 3 && (
                      <motion.div
                        key="step-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div>
                          <h3 className="text-xl sm:text-2xl font-display font-medium text-white mb-2">
                            Where should we send your blueprint?
                          </h3>
                          <p className="text-xs sm:text-sm text-white/60">
                            Our team prepares custom hooks &amp; view benchmarks within 24 hours.
                          </p>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Your full name"
                            className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                            WhatsApp / Contact Number
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={formData.countryCode}
                              onChange={(e) =>
                                setFormData({ ...formData, countryCode: e.target.value })
                              }
                              className="rounded-xl bg-[#090e14] border border-white/10 px-3 py-3 text-xs text-white"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code} className="bg-[#090e14]">
                                  {c.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              value={formData.contactNo}
                              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                              placeholder="Direct mobile / WhatsApp"
                              className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                              Brand / Company
                            </label>
                            <input
                              type="text"
                              value={formData.companyName}
                              onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                              }
                              placeholder="Company name"
                              className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                              Your Role
                            </label>
                            <input
                              type="text"
                              value={formData.role}
                              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                              placeholder="e.g. Founder, CMO"
                              className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <button
                            type="button"
                            onClick={() => setWizardStep(2)}
                            className="px-4 py-2.5 rounded-full text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back</span>
                          </button>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 rounded-full bg-[#f2ece1] text-[#090e14] font-semibold text-sm flex items-center gap-2 hover:bg-white transition-all cursor-pointer"
                          >
                            <span>{isSubmitting ? "Submitting..." : "Submit & Review"}</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* VARIANT 3: VIP PARTNERSHIP DECK (EDITORIAL LUXURY TIMELINE + REFINED FORM)*/}
            {/* ========================================================================= */}
            {activeVariant === "deck" && (
              <motion.div
                key="variant-deck"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
              >
                {/* Left Column: 3-Stage Process & Direct Line */}
                <div className="lg:col-span-5 rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 sm:p-2.5 shadow-2xl flex flex-col justify-between">
                  <div className="rounded-[calc(2rem-0.625rem)] bg-[#0b1017]/95 border border-white/[0.06] p-6 sm:p-8 h-full flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-[#8BA3C6] block mb-2 font-semibold">
                        What Happens Next
                      </span>
                      <h3 className="text-2xl font-display font-medium text-white tracking-tight">
                        Our 3-Stage Intake Protocol
                      </h3>
                      <p className="text-xs text-white/60 mt-1">
                        Zero friction. No sales pitches — just pure data and hook extraction.
                      </p>
                    </div>

                    {/* Timeline Steps */}
                    <div className="space-y-4">
                      {[
                        {
                          step: "01",
                          title: "4-Hour Content Audit",
                          desc: "We scan your YouTube or podcast catalog and isolate 5 high-converting hook concepts.",
                        },
                        {
                          step: "02",
                          title: "30-Day Distribution Map",
                          desc: "We model your reach potential across 200+ theme accounts in your niche.",
                        },
                        {
                          step: "03",
                          title: "Dedicated Pod Deployment",
                          desc: "A vetted team of 15–35+ clippers is reserved and briefed for your brand.",
                        },
                      ].map((s) => (
                        <div key={s.step} className="flex items-start gap-3.5">
                          <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 text-xs font-mono font-bold text-[#8BA3C6] flex items-center justify-center shrink-0">
                            {s.step}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-white">{s.title}</p>
                            <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Direct VIP Callout */}
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0038E2]/20 via-white/[0.02] to-transparent border border-[#0038E2]/40">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] font-semibold mb-1">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Need Fast Execution?</span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">
                        For campaigns over $50k or urgent launches, speak with our growth directors
                        directly.
                      </p>
                      <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center gap-2 text-xs font-mono text-white hover:text-[#8BA3C6] transition-colors underline underline-offset-4"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Message on WhatsApp →</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: High-End Condensed Form */}
                <div className="lg:col-span-7 rounded-[2rem] bg-white/[0.02] border border-white/10 p-2 sm:p-2.5 shadow-2xl">
                  <div className="rounded-[calc(2rem-0.625rem)] bg-[#0b1017]/95 border border-white/[0.06] p-6 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="Your name"
                            className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                            Company / Brand
                          </label>
                          <input
                            type="text"
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData({ ...formData, companyName: e.target.value })
                            }
                            placeholder="Company or podcast"
                            className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                            Contact Number / WhatsApp
                          </label>
                          <div className="flex gap-2">
                            <select
                              value={formData.countryCode}
                              onChange={(e) =>
                                setFormData({ ...formData, countryCode: e.target.value })
                              }
                              className="rounded-xl bg-[#090e14] border border-white/10 px-2.5 py-3 text-xs text-white"
                            >
                              {COUNTRY_CODES.map((c) => (
                                <option key={c.code} value={c.code} className="bg-[#090e14]">
                                  {c.label}
                                </option>
                              ))}
                            </select>
                            <input
                              type="tel"
                              value={formData.contactNo}
                              onChange={(e) =>
                                setFormData({ ...formData, contactNo: e.target.value })
                              }
                              placeholder="Phone number"
                              className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono uppercase text-white/75 mb-1.5">
                            Content / Channel URL
                          </label>
                          <input
                            type="text"
                            value={formData.socialLinks}
                            onChange={(e) =>
                              setFormData({ ...formData, socialLinks: e.target.value })
                            }
                            placeholder="YouTube or podcast link"
                            className="w-full rounded-xl bg-white/[0.02] border border-white/10 px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#8BA3C6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/75 mb-2">
                          Monthly Budget Tier
                        </label>
                        <div className="space-y-2">
                          {BUDGET_OPTIONS.map((opt) => (
                            <div
                              key={opt.id}
                              onClick={() => setFormData({ ...formData, budget: opt.id })}
                              className={cn(
                                "p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between",
                                formData.budget === opt.id
                                  ? "bg-[#8BA3C6]/15 border-[#8BA3C6]"
                                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={cn(
                                    "w-3.5 h-3.5 rounded-full border flex items-center justify-center",
                                    formData.budget === opt.id
                                      ? "border-[#8BA3C6] bg-[#8BA3C6]"
                                      : "border-white/30"
                                  )}
                                />
                                <span className="text-xs sm:text-sm font-medium text-white">
                                  {opt.primary}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-[#8BA3C6]">
                                {opt.inr} / {opt.aed}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative w-full rounded-full bg-[#f2ece1] text-[#090e14] px-6 py-3.5 font-medium text-sm sm:text-base hover:bg-white hover:shadow-[0_0_30px_rgba(242,236,225,0.25)] active:scale-[0.98] flex items-center justify-between transition-all disabled:opacity-60 cursor-pointer pt-2"
                      >
                        <span className="font-semibold tracking-tight">
                          {isSubmitting ? "Submitting Application..." : "Request Priority Catalog Audit"}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#090e14]/10 flex items-center justify-center group-hover:scale-105 group-hover:translate-x-0.5 transition-transform">
                          <ArrowRight className="w-4 h-4 text-[#090e14]" strokeWidth={2} />
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
