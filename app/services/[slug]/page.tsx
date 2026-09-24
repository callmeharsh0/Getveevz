"use client";

import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Check, ChevronDown } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { services, Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/useScrollReveal";

function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;

  const heroRef = useScrollReveal<HTMLDivElement>();
  const featuresRef = useScrollReveal<HTMLDivElement>();
  const benefitsRef = useScrollReveal<HTMLDivElement>();
  const processRef = useScrollReveal<HTMLDivElement>();
  const faqRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  if (!service) {
    return (
      <main className="relative w-full min-h-[100dvh] bg-[#F3EFEA] text-[#111111] flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none fixed inset-0 z-0" style={{
          background: "radial-gradient(ellipse at 20% 30%, rgba(139,163,197,0.15) 0%, transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(0,56,226,0.08) 0%, transparent 45%)",
        }} />
        <div className="relative z-10 text-center">
          <h1 className="font-display text-2xl font-bold text-[#111111] mb-4">
            Service Not Found
          </h1>
          <p className="text-[#555555] mb-6">
            We couldn&apos;t find the service you&apos;re looking for.
          </p>
          <Link to="/services">
            <GlassButton size="sm" contentClassName="text-sm">
              View All Services
            </GlassButton>
          </Link>
        </div>
      </main>
    );
  }

  const Icon = service.icon;

  return (
    <main className="relative w-full min-h-[100dvh] bg-[#F3EFEA] text-[#111111] font-sans overflow-hidden selection:bg-[#0038E2]/20 selection:text-[#0038E2]">
      {/* ── Soft Ambient Radial Depth Mesh (Hero section light aesthetic) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 20% 20%, rgba(139,163,197,0.22) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 85% 65%, rgba(0,56,226,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Subtle organic paper grain overlay */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035] mix-blend-multiply bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]"
      />

      {/* ── Main Content Container ── */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 pt-36 sm:pt-44 lg:pt-48 pb-28 sm:pb-36 lg:pb-40">
        
        {/* ── Hero Section (Light Canvas with Dark Obsidian Typography) ── */}
        <div ref={heroRef} className="max-w-4xl mb-20 sm:mb-24">
          <div
            data-reveal
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#111111]/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] font-medium text-[#0038E2] mb-8 shadow-sm backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2] inline-block animate-ping" />
            <span>Architecture Specification</span>
          </div>

          <h1
            data-reveal
            className="font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[72px] tracking-tight text-[#111111] leading-[1.08] mb-6"
          >
            {service.title}
          </h1>
          <p
            data-reveal
            className="text-base sm:text-lg md:text-xl text-[#555555] leading-relaxed max-w-2xl font-light"
          >
            {service.longDesc}
          </p>

          {/* Icon Badge */}
          <div data-reveal className="mt-8 flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white border border-[#111111]/10 shadow-[0_4px_14px_rgba(0,0,0,0.06)] text-[#0038E2]">
              <Icon className="w-7 h-7 stroke-[1.5]" />
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0038E2] font-semibold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Directory</span>
            </Link>
          </div>
        </div>

        {/* ── Features Grid (Asymmetrical Bento: LIGHT DOUBLE-BEZEL CARDS) ── */}
        <div ref={featuresRef} className="mb-24 sm:mb-28">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0038E2] font-semibold">
              Core Capabilities
            </span>
            <h2
              data-reveal
              className="font-display font-medium text-2xl sm:text-3xl text-[#111111] tracking-tight mt-1"
            >
              Systemic Feature Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {service.features.map((feature, i) => (
              <div
                key={feature.title}
                data-reveal
                className={cn(
                  "md:col-span-6",
                  i === 0 && "md:col-span-7 md:row-span-2"
                )}
              >
                <DoubleBezelCard className="h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#0038E2] font-semibold">
                      Module 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-[#111111] tracking-tight mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </DoubleBezelCard>
              </div>
            ))}
          </div>
        </div>

        {/* ── Benefits Section: LIGHT PORCELAIN CARDS ── */}
        <div ref={benefitsRef} className="mb-24 sm:mb-28">
          <div className="mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0038E2] font-semibold">
              Deliverables
            </span>
            <h2
              data-reveal
              className="font-display font-medium text-2xl sm:text-3xl text-[#111111] tracking-tight mt-1"
            >
              Scope of Execution
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.benefits.map((benefit, i) => (
              <div
                key={i}
                data-reveal
                className="group p-5 rounded-2xl bg-white border border-[#111111]/10 shadow-[0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#0038E2]/35 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-[#0038E2]/10 text-[#0038E2] shrink-0">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </div>
                  <span className="text-xs sm:text-sm text-[#333333] leading-relaxed font-light">
                    {benefit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Process Steps (Light Chronological Spine with White Cards) ── */}
        <div ref={processRef} className="mb-24 sm:mb-28">
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0038E2] font-semibold">
              Execution Path
            </span>
            <h2
              data-reveal
              className="font-display font-medium text-2xl sm:text-3xl text-[#111111] tracking-tight mt-1"
            >
              Step-by-Step Deployment
            </h2>
          </div>

          <div className="relative">
            {/* Vertical spine */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#0038E2]/40 via-[#495B7D]/20 to-transparent" />

            {service.processSteps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.step}
                  className={cn(
                    "relative mb-14 sm:mb-16 flex items-start",
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Step Node */}
                  <div
                    data-reveal
                    className="absolute left-6 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-10"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border border-[#111111]/15 shadow-md text-[#0038E2] font-mono text-xs font-bold">
                      {step.step}
                    </div>
                  </div>

                  {/* Content Light Card */}
                  <div
                    className={cn(
                      "ml-20 md:ml-0",
                      "md:w-[calc(50%-50px)]",
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    )}
                  >
                    <div
                      data-reveal
                      className="rounded-[2rem] p-2 bg-white/75 border border-[#111111]/10 shadow-[0_12px_28px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-[#0038E2]/30"
                    >
                      <div className="rounded-[calc(2rem-0.375rem)] bg-white border border-[#111111]/5 p-6 sm:p-7">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#0038E2] font-semibold mb-1 block">
                          Phase {step.step}
                        </span>
                        <h3 className="font-display font-medium text-lg text-[#111111] mb-2 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── FAQ Section: LIGHT ACCORDION CARDS ── */}
        <div ref={faqRef} className="mb-24 sm:mb-28 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#0038E2] font-semibold">
              FAQ
            </span>
            <h2
              data-reveal
              className="font-display font-medium text-2xl sm:text-3xl text-[#111111] tracking-tight mt-1"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {service.faq.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA (Light Double-Bezel Card) ── */}
        <div
          ref={ctaRef}
          className="relative text-center max-w-3xl mx-auto"
        >
          <div
            data-reveal
            className="rounded-[2.25rem] p-2 sm:p-2.5 bg-white/80 border border-[#111111]/10 shadow-[0_24px_54px_rgba(0,0,0,0.08)]"
          >
            <div className="rounded-[calc(2.25rem-0.5rem)] bg-gradient-to-b from-white via-white to-[#F8F6F2] border border-[#111111]/5 p-10 sm:p-14 lg:p-16 relative overflow-hidden">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#8BA3C5]/20 via-[#0038E2]/15 to-transparent blur-[80px]"
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0038E2]/5 border border-[#0038E2]/15 text-[10px] font-mono uppercase tracking-[0.2em] font-medium text-[#0038E2] mb-6">
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Immediate Action</span>
                </div>

                <h2 className="font-display font-medium text-3xl sm:text-4xl text-[#111111] tracking-tight leading-[1.15] mb-4">
                  Deploy {service.title}
                </h2>
                
                <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-xl mx-auto mb-10 font-light">
                  Reserve capacity with our specialized distribution team. We handle inventory, creators, and native execution.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={service.ctaHref}
                    className="group relative inline-flex items-center gap-3 pl-7 pr-2 py-2 rounded-full bg-[#111111] text-white font-medium text-sm sm:text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#0038E2] hover:scale-105 active:scale-[0.98] shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
                  >
                    <span>Book Strategy Call</span>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px]">
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] text-white" />
                    </div>
                  </a>

                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#111111]/15 text-xs sm:text-sm text-[#111111] font-medium transition-all duration-300 hover:bg-[#F3EFEA] hover:border-[#111111]/30 shadow-sm"
                  >
                    <span>All Services</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

/**
 * Double-Bezel Card — outer porcelain shell + inner white core
 */
function DoubleBezelCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.25rem] p-2 bg-white/75 border border-[#111111]/10 shadow-[0_16px_36px_rgba(0,0,0,0.05)]",
        "transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:-translate-y-1.5 hover:border-[#0038E2]/35 hover:shadow-lg hover:bg-white/90",
        className
      )}
    >
      <div
        className={cn(
          "h-full rounded-[calc(2.25rem-0.375rem)] bg-white",
          "border border-[#111111]/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]",
          "p-6 sm:p-8"
        )}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Animated FAQ — Light Porcelain Card on Cream Canvas
 */
function FAQItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      data-reveal
      className={cn("overflow-hidden rounded-[2rem] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]")}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="rounded-[2rem] bg-white/75 border border-[#111111]/10 p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.04)]">
        <div className="rounded-[calc(2rem-0.375rem)] bg-white border border-[#111111]/5">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-6 py-4 sm:py-5 text-left transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#FBF9F6]"
          >
            <span className="font-display font-medium text-[#111111] text-sm sm:text-base pr-4">
              {question}
            </span>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#0038E2] shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                open && "rotate-180"
              )}
            />
          </button>
          <div
            className={cn(
              "px-6 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
              open ? "max-h-56 pb-5 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-light">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
