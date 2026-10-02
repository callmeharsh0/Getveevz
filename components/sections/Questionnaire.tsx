"use client";

import React, { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { motion } from "motion/react";
import {
  CheckCircle2,
  ArrowRight,
  Check,
  Building2,
  User,
  Mail,
  Briefcase,
  Globe,
  DollarSign,
} from "lucide-react";
import { openSmartEmail, getSmartEmailLinkProps, isMobileDevice } from "@/lib/email";
import { cn } from "@/lib/utils";

export const BUDGET_OPTIONS = [
  {
    id: "$36k",
    label: "$36k",
    period: "for 3 months",
    desc: "Quarterly retainer",
  },
  {
    id: "$72k",
    label: "$72k",
    period: "for 3 months",
    desc: "High-volume reach surge",
  },
  {
    id: "$300k+",
    label: "$300k+",
    period: "for 3 months",
    desc: "Dominant category scale",
  },
  {
    id: "custom enterprise deals",
    label: "Custom enterprise deals",
    period: "3-month scope",
    desc: "Tailored multi-brand terms",
  },
] as const;

export type BudgetTier = (typeof BUDGET_OPTIONS)[number]["id"];

interface FormData {
  name: string;
  contactInfo: string;
  companyName: string;
  position: string;
  socialLinks: string;
  budget: BudgetTier | "";
}

const INITIAL_FORM: FormData = {
  name: "",
  contactInfo: "",
  companyName: "",
  position: "",
  socialLinks: "",
  budget: "$36k",
};

export default function Questionnaire() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.contactInfo.trim()) {
      errs.contactInfo = "Contact info (email, WhatsApp, or phone) is required";
    }
    if (!formData.companyName.trim()) {
      errs.companyName = "Company name is required";
    }
    if (!formData.position.trim()) {
      errs.position = "Your position in the company is required";
    }
    if (!formData.socialLinks.trim()) {
      errs.socialLinks = "Social media links or company website is required";
    }
    if (!formData.budget) {
      errs.budget = "Please select a budget tier for three months";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getQuestionnaireEmailData = () => {
    const subject = `Distribution Inquiry - ${formData.companyName || formData.name}`;

    const bodyText = [
      `Hi GetVeevz Distribution Team,`,
      ``,
      `Here is my project information:`,
      ``,
      `• Name: ${formData.name}`,
      `• Contact Info: ${formData.contactInfo}`,
      `• Company Name: ${formData.companyName}`,
      `• Position in Company: ${formData.position}`,
      `• Social Media Links / Website: ${formData.socialLinks}`,
      `• Budget (for three months): ${formData.budget}`,
      ``,
      `Please review our brand details and reach out with distribution projections and onboarding steps.`,
      ``,
      `Best regards,`,
      `${formData.name}`,
    ].join("\n");

    return { subject, body: bodyText };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const emailData = getQuestionnaireEmailData();
    openSmartEmail(emailData);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 400);
  };

  return (
    <section
      id="questionnaire"
      ref={ref}
      className="relative w-full bg-[#F3EFEA] text-[#111111] py-20 sm:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden select-none border-t border-[#111111]/10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0038E2]/[0.035] blur-[150px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#8BA3C5]/[0.06] blur-[140px] rounded-full"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div data-reveal className="text-center mb-10 sm:mb-12">
          <h2 className="font-display font-medium text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#111111] leading-[1.12]">
            Let&apos;s build your{" "}
            <span className="text-[#0038E2] italic font-normal inline-block pb-0.5">
              distribution.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#495B7D] font-sans max-w-lg mx-auto leading-relaxed">
            Fill out the brief below. Our team reviews submissions and prepares reach projections within 24 hours.
          </p>
        </div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] bg-white border border-[#111111]/12 p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6"
          >
            <div className="w-16 h-16 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/30 flex items-center justify-center mx-auto text-[#0038E2] shadow-[0_0_24px_rgba(0,56,226,0.2)]">
              <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                Inquiry Received.
              </h3>
              <p className="text-sm sm:text-base text-[#495B7D] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#111111] font-semibold">{formData.name}</span>. We
                logged your brief for{" "}
                <span className="text-[#0038E2] font-semibold">{formData.companyName}</span> ({formData.position}).
              </p>
            </div>

            <div className="bg-[#F8F6F2] rounded-2xl p-4 sm:p-5 max-w-md mx-auto text-left border border-[#111111]/8 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-[#111111]/6 pb-2">
                <span className="text-[#495B7D] font-mono text-xs uppercase">Contact</span>
                <span className="font-medium text-[#111111]">{formData.contactInfo}</span>
              </div>
              <div className="flex justify-between border-b border-[#111111]/6 pb-2">
                <span className="text-[#495B7D] font-mono text-xs uppercase">Budget (3 Mos)</span>
                <span className="font-semibold text-[#0038E2]">{formData.budget}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-[#495B7D] font-mono text-xs uppercase">Channel / Web</span>
                <span className="font-medium text-[#111111] truncate max-w-[200px]">
                  {formData.socialLinks}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#495B7D] max-w-md mx-auto">
              Our distribution team will review your assets and respond via{" "}
              <span className="text-[#111111] font-medium">{formData.contactInfo}</span> within 24 hours.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                {...getSmartEmailLinkProps(getQuestionnaireEmailData())}
                onClick={(e) => {
                  e.preventDefault();
                  openSmartEmail(getQuestionnaireEmailData());
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111111] hover:bg-[#0038E2] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
              >
                <span>{isMobileDevice() ? "Open in Mail App" : "Open in Gmail"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(INITIAL_FORM);
                  setErrors({});
                }}
                className="text-xs font-mono text-[#0038E2] hover:underline underline-offset-4 tracking-wider transition-colors cursor-pointer font-semibold"
              >
                ← Submit another inquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="rounded-[2.5rem] bg-white border border-[#111111]/12 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="f-name"
                    className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2"
                  >
                    <User className="w-3.5 h-3.5 text-[#0038E2]" />
                    <span>Name</span>
                    <span className="text-[#0038E2]">*</span>
                  </label>
                  <input
                    id="f-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="Alex Morgan"
                    className={cn(
                      "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3.5 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="f-contact"
                    className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#0038E2]" />
                    <span>Contact Info</span>
                    <span className="text-[#0038E2]">*</span>
                  </label>
                  <input
                    id="f-contact"
                    type="text"
                    value={formData.contactInfo}
                    onChange={(e) => {
                      setFormData({ ...formData, contactInfo: e.target.value });
                      if (errors.contactInfo) setErrors({ ...errors, contactInfo: undefined });
                    }}
                    placeholder="Email, WhatsApp, or Phone number"
                    className={cn(
                      "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3.5 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                      errors.contactInfo
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                    )}
                  />
                  {errors.contactInfo && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.contactInfo}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Company Name & Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="f-company"
                    className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#0038E2]" />
                    <span>Company Name</span>
                    <span className="text-[#0038E2]">*</span>
                  </label>
                  <input
                    id="f-company"
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => {
                      setFormData({ ...formData, companyName: e.target.value });
                      if (errors.companyName) setErrors({ ...errors, companyName: undefined });
                    }}
                    placeholder="e.g. Acme Media or Brand Name"
                    className={cn(
                      "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3.5 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                      errors.companyName
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                    )}
                  />
                  {errors.companyName && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="f-position"
                    className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#0038E2]" />
                    <span>Your Position in the Company</span>
                    <span className="text-[#0038E2]">*</span>
                  </label>
                  <input
                    id="f-position"
                    type="text"
                    value={formData.position}
                    onChange={(e) => {
                      setFormData({ ...formData, position: e.target.value });
                      if (errors.position) setErrors({ ...errors, position: undefined });
                    }}
                    placeholder="e.g. Founder, CEO, CMO, Head of Growth"
                    className={cn(
                      "w-full rounded-xl bg-[#F8F6F2] border px-4 py-3.5 text-sm text-[#111111] placeholder:text-[#111111]/35 focus:outline-none focus:ring-2 focus:ring-[#0038E2]/20 transition-all",
                      errors.position
                        ? "border-red-500 focus:border-red-500"
                        : "border-[#111111]/12 focus:border-[#0038E2] focus:bg-white"
                    )}
                  />
                  {errors.position && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.position}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Social Media Links / Website of company/brand */}
              <div>
                <label
                  htmlFor="f-social"
                  className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold mb-2"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0038E2]" />
                  <span>Social Media Links / Website of Company / Brand</span>
                  <span className="text-[#0038E2]">*</span>
                </label>
                <input
                  id="f-social"
                  type="text"
                  value={formData.socialLinks}
                  onChange={(e) => {
                    setFormData({ ...formData, socialLinks: e.target.value });
                    if (errors.socialLinks) setErrors({ ...errors, socialLinks: undefined });
                  }}
                  placeholder="Website URL, YouTube channel, Instagram handle, or podcast link"
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

              {/* Row 4: Budget (for three months) */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#111111] font-semibold">
                    <DollarSign className="w-3.5 h-3.5 text-[#0038E2]" />
                    <span>Budget (for three months)</span>
                    <span className="text-[#0038E2]">*</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#495B7D]">Select one tier</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {BUDGET_OPTIONS.map((opt) => {
                    const isSelected = formData.budget === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, budget: opt.id });
                          if (errors.budget) setErrors({ ...errors, budget: undefined });
                        }}
                        className={cn(
                          "relative p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group",
                          isSelected
                            ? "bg-white border-2 border-[#0038E2] shadow-sm shadow-[#0038E2]/10"
                            : "bg-[#F8F6F2] border-[#111111]/10 hover:border-[#0038E2]/40 hover:bg-white"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span
                            className={cn(
                              "font-display font-bold text-lg sm:text-xl tracking-tight leading-tight",
                              isSelected ? "text-[#0038E2]" : "text-[#111111]"
                            )}
                          >
                            {opt.label}
                          </span>
                          <span
                            className={cn(
                              "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors mt-0.5",
                              isSelected
                                ? "border-[#0038E2] bg-[#0038E2] text-white"
                                : "border-[#111111]/25 group-hover:border-[#0038E2]/60"
                            )}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </div>

                        <div>
                          <p
                            className={cn(
                              "text-xs font-mono font-medium",
                              isSelected ? "text-[#0038E2]" : "text-[#495B7D]"
                            )}
                          >
                            {opt.period}
                          </p>
                          <p className="text-[11px] text-[#495B7D]/80 mt-0.5 leading-snug">
                            {opt.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {errors.budget && (
                  <p className="text-xs text-red-500 mt-2">{errors.budget}</p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#111111]/8">
                <p className="text-xs text-[#495B7D] text-center sm:text-left">
                  We guarantee response within <span className="font-semibold text-[#111111]">24 hours</span>.
                  Zero obligations.
                </p>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#111111] hover:bg-[#0038E2] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  <span>{isSubmitting ? "Submitting..." : "Submit Inquiry"}</span>
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
