"use client";

import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail, CheckCircle2, ShieldCheck } from "lucide-react";
import { LiquidGlassButton } from "@/components/ui/liquid-glass";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Currency = "USD" | "INR";

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

const plans: PlanTier[] = [
  {
    id: "basic",
    name: "Basic",
    badge: "PR Sprint",
    price: { USD: "$8K", INR: "₹6.8L" },
    period: "Onwards",
    subtitle: "Targeted PR & Launch Campaign",
    ctaText: "Launch Sprint",
    specs: [
      { label: "Account Network", value: "Tailored to niche" },
      { label: "Supported Platforms", value: "YT + IG + TikTok" },
      { label: "Intelligence Reports", value: "Weekly Summary" },
      { label: "Creative Direction", value: "Custom Storyboarding" },
    ],
  },
  {
    id: "authority",
    name: "Authority",
    badge: "Most Popular",
    isPopular: true,
    price: { USD: "$40K", INR: "₹34L" },
    period: "/ 3 months",
    subtitle: "Continuous Compounding Growth",
    ctaText: "Claim Authority",
    specs: [
      { label: "Account Network", value: "30 Distribution Pages" },
      { label: "Supported Platforms", value: "YT + IG + TikTok + FB" },
      { label: "Intelligence Reports", value: "Live Real-Time Dashboard" },
      { label: "Audience Target", value: "Guaranteed Impressions" },
    ],
  },
  {
    id: "dominance",
    name: "Dominance",
    badge: "Full Ecosystem",
    price: { USD: "$80K", INR: "₹68L" },
    period: "/ 3 months",
    subtitle: "Category Leadership & Mass PR",
    ctaText: "Dominate Category",
    specs: [
      { label: "Account Network", value: "60 Distribution Pages" },
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
  const [currency, setCurrency] = useState<Currency>("USD");

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
        {/* Section Header: Wide Horizontal Flow (2 Lines Max) */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-moonlight leading-[1.05]">
            Pick your
            <span className="inline-block ml-3 sm:ml-4 text-transparent bg-clip-text bg-gradient-to-r from-frost via-moonlight to-white">
              velocity.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed font-normal">
            Predictable distribution infrastructure engineered for exponential algorithmic audience acquisition across Instagram, YouTube Shorts, and TikTok.
          </p>
        </div>

        {/* Currency Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center p-1 rounded-full bg-surface/80 border border-border/80 backdrop-blur-md shadow-inner">
            {(["USD", "INR"] as Currency[]).map((c) => {
              const isActive = currency === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
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

        {/* Cards Grid: Mathematically Balanced 3-Column Bento Architecture */}
        <div
          ref={cardsContainerRef}
          className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
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

        {/* Executive Enterprise Strip */}
        <div
          ref={enterpriseRef}
          className="mt-12 sm:mt-16 rounded-xl p-[1px] bg-gradient-to-r from-border via-border/50 to-transparent border border-border/60 shadow-[0_16px_40px_rgba(2,18,47,0.5)]"
        >
          <div className="rounded-[11px] bg-[#0a1017]/95 border border-border/40 px-6 sm:px-10 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
            <div className="text-center sm:text-left">
              <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                Need enterprise volume, multi-host syndication, or white-labeling?
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-muted">
                We design custom multi-tier distribution arrangements for high-volume catalogs and creator studios.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <LiquidGlassButton
                variant="frost"
                size="default"
                onClick={scrollToCTA}
                className="pl-5 pr-2 py-1.5 gap-2.5"
              >
                <span>Book a Call</span>
                <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5 text-moonlight group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </LiquidGlassButton>

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
