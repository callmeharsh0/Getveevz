"use client";

import React, { useState, useEffect } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mic,
  User,
  Sparkles,
  Video,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type BudgetTier = "36k" | "72k" | "custom";
export type ContentType = "podcast" | "founder" | "keynote" | "interview";

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

const CONTENT_TYPES: {
  id: ContentType;
  label: string;
  subtitle: string;
  icon: React.ElementType;
}[] = [
  {
    id: "podcast",
    label: "Long Podcasts",
    subtitle: "Conversational & Deep Dives",
    icon: Mic,
  },
  {
    id: "founder",
    label: "Founder & CEO Talks",
    subtitle: "High-Authority Narratives",
    icon: User,
  },
  {
    id: "keynote",
    label: "Keynotes & Events",
    subtitle: "Stage & Presentation Talks",
    icon: Sparkles,
  },
  {
    id: "interview",
    label: "Streams & Interviews",
    subtitle: "Engaging Unfiltered Cuts",
    icon: Video,
  },
];

const PLATFORM_OPTIONS = [
  { id: "tiktok", label: "TikTok", tag: "Algorithm Priority" },
  { id: "reels", label: "IG Reels", tag: "High Retention" },
  { id: "shorts", label: "YT Shorts", tag: "Search Authority" },
];

const BUDGET_OPTIONS: {
  id: BudgetTier;
  primary: string;
  sublabel?: string;
  inr: string;
  aed: string;
  views: string;
}[] = [
  {
    id: "36k",
    primary: "$36k / month",
    inr: "₹31.2L INR",
    aed: "132k AED",
    views: "25M – 40M+ Views",
  },
  {
    id: "72k",
    primary: "$72k / month",
    inr: "₹62.5L INR",
    aed: "264k AED",
    views: "55M – 85M+ Views",
  },
  {
    id: "custom",
    primary: "Custom Enterprise Plan",
    sublabel: "From $100k+ / month",
    inr: "₹85L+ INR",
    aed: "365k+ AED",
    views: "120M+ Multi-Platform Reach",
  },
];

export default function Questionnaire() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const validateStep1 = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.socialLinks.trim()) {
      errs.socialLinks = "Please provide your channel or content link";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.budget) {
      errs.budget = "Please select a target monthly investment tier";
    }
    if (formData.platforms.length === 0) {
      errs.platforms = "Select at least one target channel";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.contactNo.trim()) errs.contactNo = "Contact number is required";
    if (!formData.companyName.trim()) errs.companyName = "Company or channel name is required";
    if (!formData.role.trim()) errs.role = "Role is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section
      id="questionnaire"
      ref={ref}
      className="relative w-full bg-[#F3EFEA] text-[#111111] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-[#111111]/10"
    >

      {/* Hero-Matching Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0038E2]/[0.035] blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8BA3C5]/[0.06] blur-[140px] rounded-full"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Header (Hero Palette) */}
        <div data-reveal className="text-center mb-10 sm:mb-14">
          <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] leading-[1.12]">
            Let&apos;s build your{" "}
            <span className="text-[#0038E2] italic font-normal inline-block pb-0.5">
              distribution.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#495B7D] font-sans max-w-md mx-auto leading-relaxed">
            Tell us about your content catalog. We review submissions and respond within 24 hours.
          </p>
        </div>

        {/* Global Submitted State */}
        {isSubmitted ? (
          <div className="rounded-[2.5rem] bg-white border border-[#111111]/12 p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/30 flex items-center justify-center mx-auto text-[#0038E2] shadow-[0_0_24px_rgba(0,56,226,0.2)]">
              <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
              Application Received.
            </h3>
            <p className="text-sm sm:text-base text-[#495B7D] max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-[#111111] font-semibold">{formData.fullName}</span>. We
              logged your brief for{" "}
              <span className="text-[#0038E2] font-semibold">{formData.companyName || "your brand"}</span>.
              Our distribution team will review your channel and contact you via{" "}
              <span className="text-[#111111] font-medium">
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
                className="text-xs font-mono text-[#0038E2] hover:underline underline-offset-4 tracking-wider transition-colors cursor-pointer font-semibold"
              >
                ← Submit another brief
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Interactive Wizard Card */
          <div className="rounded-[2.5rem] bg-white border border-[#111111]/12 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] relative overflow-hidden">
            {/* Step Progress Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#111111]/10 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#0038E2] bg-[#0038E2]/10 border border-[#0038E2]/20 font-semibold">
                  Step 0{wizardStep} of 03
                </span>
                <span className="text-xs font-mono text-[#495B7D] hidden sm:inline-block">
                  {wizardStep === 1
                    ? "Content Format & Channel"
                    : wizardStep === 2
                    ? "Target Channels & Scale"
                    : "Direct Contact Information"}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-24 sm:w-32 bg-[#111111]/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0038E2] transition-all duration-300 rounded-full"
                  style={{ width: `${(wizardStep / 3) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* ========================================================================= */}
                {/* STEP 1: CONTENT TYPE & CHANNEL LINK                                       */}
                {/* ========================================================================= */}
                {wizardStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-medium text-[#111111] tracking-tight">
                        What type of content do you produce?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#495B7D] mt-1">
                        Select the primary format of your video or audio catalog.
                      </p>
                    </div>

                    {/* Vector Icon Cards (No Emojis) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {CONTENT_TYPES.map((c) => {
                        const isSelected = formData.contentType === c.id;
                        const Icon = c.icon;
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, contentType: c.id })}
                            className={cn(
                              "p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start gap-3.5",
                              isSelected
                                ? "bg-white border-2 border-[#0038E2] shadow-sm scale-[1.01]"
                                : "bg-[#F8F6F2] border-[#111111]/10 hover:border-[#0038E2]/40 hover:bg-white"
                            )}
                          >
                            <div
                              className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                                isSelected
                                  ? "bg-[#0038E2] text-white shadow-sm"
                                  : "bg-white border border-[#111111]/10 text-[#0038E2]"
                              )}
                            >
                              <Icon className="w-5 h-5" strokeWidth={1.75} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-[#111111] font-display">
                                {c.label}
                              </p>
                              <p className="text-xs text-[#495B7D] mt-0.5">{c.subtitle}</p>
                            </div>
                            {isSelected && (
                              <span className="w-5 h-5 rounded-full bg-[#0038E2] text-white flex items-center justify-center shrink-0">
                                <Check className="w-3 h-3" strokeWidth={3} />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Channel / Feed Link Input */}
                    <div>
                      <label
                        htmlFor="w-socialLinks"
                        className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2"
                      >
                        Where can we review your catalog? <span className="text-[#0038E2]">*</span>
                      </label>
                      <input
                        id="w-socialLinks"
                        type="text"
                        value={formData.socialLinks}
                        onChange={(e) => {
                          setFormData({ ...formData, socialLinks: e.target.value });
                          if (errors.socialLinks) setErrors({ ...errors, socialLinks: undefined });
                        }}
                        placeholder="YouTube channel, Spotify podcast feed, or Website"
                        className={cn(
                          "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3.5 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                          errors.socialLinks
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                        )}
                      />
                      {errors.socialLinks && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.socialLinks}</p>
                      )}
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep1()) setWizardStep(2);
                        }}
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#0038E2] text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <span>Continue to Scale</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ========================================================================= */}
                {/* STEP 2: TARGET CHANNELS & BUDGET SCALE                                    */}
                {/* ========================================================================= */}
                {wizardStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-medium text-[#111111] tracking-tight">
                        Where do you want to dominate?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#495B7D] mt-1">
                        Choose your target channels and estimated monthly budget.
                      </p>
                    </div>

                    {/* Platform Selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2">
                        Target Channels (Click to Toggle)
                      </label>
                      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
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
                                  ? "bg-[#0038E2] text-white border-[#0038E2] shadow-sm"
                                  : "bg-[#F8F6F2] border-[#111111]/10 text-[#111111] hover:border-[#0038E2]/40 hover:bg-white"
                              )}
                            >
                              <p className="text-sm font-bold font-display">{p.label}</p>
                              <span
                                className={cn(
                                  "text-[10px] font-mono mt-0.5 block",
                                  isSelected ? "text-white/85" : "text-[#495B7D]"
                                )}
                              >
                                {p.tag}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.platforms && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.platforms}</p>
                      )}
                    </div>

                    {/* Budget Tiers */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2">
                        Target Monthly Investment Tier
                      </label>
                      <div className="space-y-2.5">
                        {BUDGET_OPTIONS.map((opt) => {
                          const isSelected = formData.budget === opt.id;
                          return (
                            <div
                              key={opt.id}
                              onClick={() => {
                                setFormData({ ...formData, budget: opt.id });
                                if (errors.budget) setErrors({ ...errors, budget: undefined });
                              }}
                              className={cn(
                                "p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2",
                                isSelected
                                  ? "bg-white border-2 border-[#0038E2] shadow-sm"
                                  : "bg-[#F8F6F2] border-[#111111]/10 hover:border-[#0038E2]/40 hover:bg-white"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={cn(
                                    "w-4 h-4 rounded-full border flex items-center justify-center shrink-0",
                                    isSelected
                                      ? "border-[#0038E2] bg-[#0038E2]"
                                      : "border-[#111111]/30"
                                  )}
                                >
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </span>
                                <div>
                                  <p className="text-sm font-bold text-[#111111] font-display">
                                    {opt.primary}
                                  </p>
                                  <span className="text-xs font-mono text-[#0038E2] font-semibold">
                                    {opt.views}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pl-7 sm:pl-0 text-xs font-mono text-[#495B7D]">
                                <span className="px-2 py-0.5 rounded bg-white border border-[#111111]/10">
                                  {opt.inr}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white border border-[#111111]/10">
                                  {opt.aed}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {errors.budget && (
                        <p className="text-xs text-red-500 mt-1.5">{errors.budget}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={() => setWizardStep(1)}
                        className="px-4 py-2.5 rounded-full text-xs font-mono text-[#495B7D] hover:text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (validateStep2()) setWizardStep(3);
                        }}
                        className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#0038E2] text-white text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        <span>Continue to Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ========================================================================= */}
                {/* STEP 3: DIRECT CONTACT INFORMATION                                       */}
                {/* ========================================================================= */}
                {wizardStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div>
                      <h3 className="text-xl sm:text-2xl font-display font-medium text-[#111111] tracking-tight">
                        Where should we send your blueprint?
                      </h3>
                      <p className="text-xs sm:text-sm text-[#495B7D] mt-1">
                        Our team prepares custom hooks &amp; view benchmarks within 24 hours.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="w-fullName"
                        className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-1.5"
                      >
                        Full Name <span className="text-[#0038E2]">*</span>
                      </label>
                      <input
                        id="w-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="Alex Morgan"
                        className={cn(
                          "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                          errors.fullName
                            ? "border-red-500 focus:border-red-500"
                            : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                        )}
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* WhatsApp / Phone */}
                    <div>
                      <label
                        htmlFor="w-contactNo"
                        className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-1.5"
                      >
                        WhatsApp / Contact Number <span className="text-[#0038E2]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={formData.countryCode}
                          onChange={(e) =>
                            setFormData({ ...formData, countryCode: e.target.value })
                          }
                          aria-label="Country Code"
                          className="rounded-xl bg-[#F8F6F2] border border-[#111111]/12 px-3 py-3 text-xs text-[#111111] focus:outline-none focus:border-[#0038E2] cursor-pointer"
                        >
                          {COUNTRY_CODES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                        <input
                          id="w-contactNo"
                          type="tel"
                          value={formData.contactNo}
                          onChange={(e) => {
                            setFormData({ ...formData, contactNo: e.target.value });
                            if (errors.contactNo) setErrors({ ...errors, contactNo: undefined });
                          }}
                          placeholder="Phone or WhatsApp number"
                          className={cn(
                            "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                            errors.contactNo
                              ? "border-red-500 focus:border-red-500"
                              : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                          )}
                        />
                      </div>
                      {errors.contactNo && (
                        <p className="text-xs text-red-500 mt-1">{errors.contactNo}</p>
                      )}
                    </div>

                    {/* Company & Role */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="w-company"
                          className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-1.5"
                        >
                          Brand / Company <span className="text-[#0038E2]">*</span>
                        </label>
                        <input
                          id="w-company"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => {
                            setFormData({ ...formData, companyName: e.target.value });
                            if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                          }}
                          placeholder="e.g. Dialogue Media"
                          className={cn(
                            "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                            errors.companyName
                              ? "border-red-500 focus:border-red-500"
                              : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                          )}
                        />
                        {errors.companyName && (
                          <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="w-role"
                          className="block text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-1.5"
                        >
                          Your Role <span className="text-[#0038E2]">*</span>
                        </label>
                        <input
                          id="w-role"
                          type="text"
                          value={formData.role}
                          onChange={(e) => {
                            setFormData({ ...formData, role: e.target.value });
                            if (errors.role) setErrors({ ...errors, role: undefined });
                          }}
                          placeholder="e.g. Founder, CMO, Creator"
                          className={cn(
                            "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                            errors.role
                              ? "border-red-500 focus:border-red-500"
                              : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                          )}
                        />
                        {errors.role && (
                          <p className="text-xs text-red-500 mt-1">{errors.role}</p>
                        )}
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setWizardStep(2)}
                        className="px-4 py-2.5 rounded-full text-xs font-mono text-[#495B7D] hover:text-[#111111] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group inline-flex items-center gap-3 px-6 sm:px-7 py-3 rounded-full bg-[#111111] hover:bg-[#0038E2] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                      >
                        <span>{isSubmitting ? "Submitting..." : "Submit & Get Blueprint"}</span>
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
