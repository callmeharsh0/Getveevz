"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail, CheckCircle2, ShieldCheck, Zap, TrendingUp, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Currency = "USD" | "INR";
type ServiceTerm = "short-term" | "long-term";

interface PlanSpec {
  label: string;
  value: string;
}

interface PlanTier {
  id: string;
  name: string;
  badge?: string;
  isPopular?: boolean;
  price: Record<Currency, string>;
  period: string;
  subtitle: string;
  ctaText: string;
  specs: PlanSpec[];
}

const shortTermPlans: PlanTier[] = [
  {
    id: "sprint-pr",
    name: "PR Sprint",
    badge: "30-Day Sprint",
    price: { USD: "$8K", INR: "₹6.8L" },
    period: "/ sprint",
    subtitle: "Targeted PR & Launch Campaign",
    ctaText: "Launch Sprint",
    specs: [
      { label: "Account Network", value: "Tailored to niche (10–15 pages)" },
      { label: "Content Output", value: "25 Polished Short Clips" },
      { label: "Supported Platforms", value: "YT + IG + TikTok" },
      { label: "Intelligence Reports", value: "Weekly Sprint Summary" },
      { label: "Creative Direction", value: "Custom Storyboarding" },
    ],
  },
  {
    id: "sprint-growth",
    name: "Growth Blitz",
    badge: "Most Popular Sprint",
    isPopular: true,
    price: { USD: "$18K", INR: "₹15L" },
    period: "/ 45 days",
    subtitle: "High-Velocity Multi-Platform Saturation",
    ctaText: "Start Blitz",
    specs: [
      { label: "Account Network", value: "30 Distribution Pages" },
      { label: "Content Output", value: "60 High-Retention Clips" },
      { label: "Supported Platforms", value: "YT + IG + TikTok + FB" },
      { label: "Intelligence Reports", value: "Live Real-Time Dashboard" },
      { label: "Audience Target", value: "Guaranteed Algorithmic Push" },
    ],
  },
  {
    id: "sprint-takeover",
    name: "Takeover",
    badge: "Maximum Impact",
    price: { USD: "$32K", INR: "₹27L" },
    period: "/ 60 days",
    subtitle: "Category Buzz & Full Saturation",
    ctaText: "Dominate Category",
    specs: [
      { label: "Account Network", value: "50+ Distribution Pages" },
      { label: "Content Output", value: "120+ Viral Hook Variations" },
      { label: "Supported Platforms", value: "All Platforms (YT, IG, TikTok, FB)" },
      { label: "Intelligence Reports", value: "Dedicated Strategist & War Room" },
      { label: "Audience Target", value: "Mass Scale Multiplier" },
    ],
  },
];

const longTermPlans: PlanTier[] = [
  {
    id: "long-growth",
    name: "Growth Engine",
    badge: "Quarterly Retainer",
    price: { USD: "$24K", INR: "₹20L" },
    period: "/ 3 months",
    subtitle: "Continuous Compounding Reach",
    ctaText: "Build Engine",
    specs: [
      { label: "Account Network", value: "15 Dedicated Fan Pages" },
      { label: "Content Output", value: "40 Clips / Month (120 Total)" },
      { label: "Supported Platforms", value: "YT + IG + TikTok" },
      { label: "Intelligence Reports", value: "Bi-Weekly Strategy & Reports" },
      { label: "Strategic Moat", value: "Consistent Algorithmic Growth" },
    ],
  },
  {
    id: "long-authority",
    name: "Authority",
    badge: "Most Popular",
    isPopular: true,
    price: { USD: "$40K", INR: "₹34L" },
    period: "/ 3 months",
    subtitle: "Continuous Compounding Growth",
    ctaText: "Claim Authority",
    specs: [
      { label: "Account Network", value: "30 Distribution Pages" },
      { label: "Content Output", value: "80 Clips / Month (240 Total)" },
      { label: "Supported Platforms", value: "YT + IG + TikTok + FB" },
      { label: "Intelligence Reports", value: "Live Real-Time Dashboard" },
      { label: "Audience Target", value: "Guaranteed Impressions" },
    ],
  },
  {
    id: "long-dominance",
    name: "Dominance",
    badge: "Full Ecosystem",
    price: { USD: "$80K", INR: "₹68L" },
    period: "/ 3 months",
    subtitle: "Category Leadership & Mass PR",
    ctaText: "Dominate Category",
    specs: [
      { label: "Account Network", value: "60 Distribution Pages" },
      { label: "Content Output", value: "150 Clips / Month (450 Total)" },
      { label: "Supported Platforms", value: "All Platforms (YT, IG, TikTok, FB)" },
      { label: "Intelligence Reports", value: "Dedicated Strategist" },
      { label: "Audience Target", value: "Maximum Scale Multiplier" },
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const enterpriseRef = useRef<HTMLDivElement>(null);

  const [serviceTerm, setServiceTerm] = useState<ServiceTerm>("short-term");
  const [currency, setCurrency] = useState<Currency>("USD");

  const plans = serviceTerm === "short-term" ? shortTermPlans : longTermPlans;

  const scrollToCTA = () => {
    const el = document.getElementById("cta") || document.querySelector("footer");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  // GSAP ScrollTrigger entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Cards staggered entrance animation
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current.filter(Boolean),
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Enterprise strip entrance animation
      if (enterpriseRef.current) {
        gsap.fromTo(
          enterpriseRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: enterpriseRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth re-animation when switching between Short-Term and Long-Term
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0.6, y: 16, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.08, ease: "power2.out" }
      );
    }
  }, [serviceTerm]);

  // 3D Magnetic Card Tilt Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full overflow-hidden bg-[#090e14] py-28 sm:py-36 md:py-44 px-4 sm:px-8 lg:px-12"
    >
      {/* Ambient Radial Depth Mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-1/4 -translate-x-1/2 w-[720px] h-[500px] bg-frost/5 blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-1/4 translate-x-1/2 w-[640px] h-[440px] bg-storm/20 blur-[150px] rounded-full"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-border/90 text-[11px] sm:text-xs font-mono uppercase tracking-eyebrow text-frost mb-6 backdrop-blur-xl shadow-xl">
            <span className="w-2 h-2 rounded-full bg-frost animate-pulse" />
            <span>(08) Transparent Investment</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-moonlight leading-[1.05]">
            Pick your
            <span className="inline-block ml-3 sm:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-frost via-moonlight to-white">
              velocity
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-normal">
            Predictable distribution infrastructure engineered for exponential algorithmic audience acquisition across Instagram, YouTube Shorts, and TikTok
          </p>
        </div>

        {/* Dual Switcher Controls: Service Duration & Currency */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          {/* Duration Switcher (Short-Term vs Long-Term) */}
          <div className="inline-flex items-center p-1 rounded-full bg-surface/80 border border-border/80 backdrop-blur-md shadow-inner">
            <button
              type="button"
              onClick={() => setServiceTerm("short-term")}
              className={cn(
                "relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2",
                serviceTerm === "short-term"
                  ? "bg-moonlight text-oxford font-semibold shadow-md scale-100"
                  : "text-muted hover:text-white"
              )}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Short-Term Sprints</span>
            </button>
            <button
              type="button"
              onClick={() => setServiceTerm("long-term")}
              className={cn(
                "relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2",
                serviceTerm === "long-term"
                  ? "bg-moonlight text-oxford font-semibold shadow-md scale-100"
                  : "text-muted hover:text-white"
              )}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Long-Term Retainers</span>
              <span
                className={cn(
                  "hidden xs:inline-block text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase transition-colors tracking-tight",
                  serviceTerm === "long-term"
                    ? "bg-oxford/20 text-oxford"
                    : "bg-frost/20 text-frost"
                )}
              >
                Best ROI
              </span>
            </button>
          </div>

          {/* Currency Switcher */}
          <div className="inline-flex items-center p-1 rounded-full bg-surface/80 border border-border/80 backdrop-blur-md shadow-inner">
            {(["USD", "INR"] as Currency[]).map((c) => {
              const isActive = currency === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isActive
                      ? "bg-moonlight text-oxford font-semibold shadow-md scale-100"
                      : "text-muted hover:text-white"
                  )}
                >
                  {c === "USD" ? "USD ($)" : "INR (₹)"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Context Label */}
        <div className="mt-4 text-center">
          <p className="text-xs sm:text-sm text-frost/90 font-mono tracking-wide">
            {serviceTerm === "short-term"
              ? "⚡ Targeted 30–60 day sprint campaigns for product launches, event PR, and rapid market testing"
              : "📈 3+ month compounding growth retainers for sustained category dominance and audience ownership"}
          </p>
        </div>

        {/* Cards Grid: Mathematically Balanced 3-Column Bento Architecture */}
        <div
          ref={cardsContainerRef}
          className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {plans.map((plan, index) => {
            const isPopular = plan.isPopular;

            return (
              <div
                key={plan.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                style={{ transformStyle: "preserve-3d" }}
                className={cn(
                  // Architectural Outer Shell with Reduced Modern Radius
                  "group relative rounded-xl p-[1px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col will-change-transform",
                  isPopular
                    ? "bg-gradient-to-b from-frost/60 via-steel/30 to-border/40 border border-frost/50 shadow-[0_24px_60px_rgba(2,18,47,0.85)] lg:-translate-y-3"
                    : "bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-white/[0.01] border border-border/70 hover:border-frost/40 hover:shadow-[0_20px_50px_rgba(2,18,47,0.7)]"
                )}
              >
                {/* Popular Floating Badge */}
                {isPopular && (
                  <div className="absolute -top-3 inset-x-0 mx-auto w-max z-20">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-frost text-oxford text-[10px] font-mono font-bold tracking-widest uppercase shadow-lg border border-white/20">
                      <ShieldCheck className="w-3 h-3 text-oxford" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Inner Core */}
                <div
                  className={cn(
                    "relative rounded-[11px] p-7 sm:p-9 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] border border-border/40 flex flex-col justify-between flex-1 transition-colors duration-300",
                    isPopular ? "bg-[#0d1522]/95" : "bg-[#0a1017]/95"
                  )}
                >
                  <div>
                    {/* Header: Tier Name & Subtitle */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                          {plan.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted font-normal">
                          {plan.subtitle}
                        </p>
                      </div>

                      {!isPopular && plan.badge && (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-frost/80 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-border/80">
                          {plan.badge}
                        </span>
                      )}
                    </div>

                    {/* Price Block */}
                    <div className="mt-8 pb-7 border-b border-white/[0.07]">
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                          {plan.price[currency]}
                        </span>
                        <span className="text-xs sm:text-sm font-mono text-muted uppercase tracking-wider">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Deliverables Specs List */}
                    <div className="mt-8 space-y-4">
                      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-frost/80 font-semibold">
                        What&apos;s Included:
                      </p>
                      <ul className="space-y-3.5">
                        {plan.specs.map((spec) => (
                          <li
                            key={spec.label}
                            className="flex items-center justify-between text-xs sm:text-sm"
                          >
                            <span className="flex items-center gap-2 text-muted">
                              <CheckCircle2
                                className={cn(
                                  "w-4 h-4 shrink-0",
                                  isPopular ? "text-frost" : "text-frost/70"
                                )}
                              />
                              {spec.label}
                            </span>
                            <span className="font-medium text-white text-right">
                              {spec.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Button-in-Button CTA */}
                  <div className="mt-10 pt-6">
                    <button
                      type="button"
                      onClick={scrollToCTA}
                      className={cn(
                        "group/btn w-full inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-lg",
                        isPopular
                          ? "bg-moonlight text-oxford hover:bg-white"
                          : "bg-white/[0.06] text-white hover:bg-white hover:text-oxford border border-white/[0.1]"
                      )}
                    >
                      <span>{plan.ctaText}</span>
                      <span
                        className={cn(
                          "inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                          isPopular
                            ? "bg-oxford/10 group-hover/btn:bg-oxford"
                            : "bg-white/10 group-hover/btn:bg-oxford/10"
                        )}
                      >
                        <ArrowUpRight
                          className={cn(
                            "w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
                            isPopular
                              ? "text-oxford group-hover/btn:text-moonlight"
                              : "text-white group-hover/btn:text-oxford"
                          )}
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rollover Bridge Note */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface/70 border border-border/80 text-[11px] sm:text-xs text-muted backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-frost shrink-0" />
            <span>
              Starting with a Short-Term Sprint? 100% of your sprint investment rolls over into an ongoing Long-Term Retainer
            </span>
          </div>
        </div>

        {/* Executive Enterprise Strip */}
        <div
          ref={enterpriseRef}
          className="mt-10 sm:mt-14 rounded-xl p-[1px] bg-gradient-to-r from-border via-border/50 to-transparent border border-border/60 shadow-[0_16px_40px_rgba(2,18,47,0.5)]"
        >
          <div className="rounded-[11px] bg-[#0a1017]/95 border border-border/40 px-6 sm:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="text-center sm:text-left">
              <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                Need enterprise volume, multi-host syndication, or white-labeling?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-muted">
                We design custom multi-tier distribution arrangements for high-volume catalogs and creator studios
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <GlassButton
                size="default"
                onClick={scrollToCTA}
                contentClassName="flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-wide uppercase"
              >
                <span>Book a Call</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                </span>
              </GlassButton>

              <a
                href="mailto:contact@getveevz.com?subject=GetVeevz%20Enterprise%20Distribution%20Inquiry"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 border border-border/80 text-xs sm:text-sm font-medium text-muted hover:text-moonlight hover:border-frost/50 transition-all active:scale-[0.98] bg-surface/50"
              >
                <Mail className="w-3.5 h-3.5 text-frost" />
                <span>Email Team</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
