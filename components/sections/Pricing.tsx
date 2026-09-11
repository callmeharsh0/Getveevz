"use client";

import React, { useState } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail } from "lucide-react";

type Currency = "USD" | "INR";

interface PlanSpec {
  label: string;
  value: string;
}

interface PlanTier {
  id: string;
  name: string;
  price: Record<Currency, string>;
  period: string;
  subtitle?: string;
  ctaText: string;
  specs: PlanSpec[];
}

const plans: PlanTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: { USD: "$8K", INR: "₹6.8L" },
    period: "Onwards",
    subtitle: "PR Campaign",
    ctaText: "Get Started",
    specs: [
      { label: "Pages", value: "Depends on niche" },
      { label: "Platforms", value: "YT + IG + FB + TikTok" },
      { label: "Reports", value: "Yes" },
      { label: "Quality", value: "10/10" },
    ],
  },
  {
    id: "authority",
    name: "Authority",
    price: { USD: "$40K", INR: "₹34L" },
    period: "/ 3 months",
    ctaText: "Guaranteed views!",
    specs: [
      { label: "Pages", value: "30" },
      { label: "Platforms", value: "YT + IG + FB + TikTok" },
      { label: "Weekly Reports", value: "Yes" },
      { label: "Quality", value: "10/10" },
    ],
  },
  {
    id: "dominance",
    name: "Dominance",
    price: { USD: "$80K", INR: "₹68L" },
    period: "/ 3 months",
    ctaText: "Guaranteed views!",
    specs: [
      { label: "Pages", value: "60" },
      { label: "Platforms", value: "YT + IG + FB + TikTok" },
      { label: "Weekly Reports", value: "Yes" },
      { label: "Quality", value: "10/10" },
    ],
  },
];

export default function Pricing() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [currency, setCurrency] = useState<Currency>("USD");

  const scrollToCTA = () => {
    const el = document.getElementById("cta") || document.querySelector("footer");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={ref} className="px-6 py-28 bg-background">
      <div className="mx-auto max-w-content">
        {/* ── Header ── */}
        <div data-reveal className="text-center">
          <span className="inline-block font-mono text-xs tracking-eyebrow uppercase text-muted">
            Pricing
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-5xl tracking-tight">
            Pick your
            <span className="font-serif italic text-frost"> velocity.</span>
          </h2>
        </div>

        {/* ── Currency Toggle ── */}
        <div data-reveal className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
            {(["USD", "INR"] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                  currency === c
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted hover:text-foreground"
                )}
              >
                {c === "USD" ? "USD ($)" : "INR (₹)"}
              </button>
            ))}
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div data-reveal className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="group relative bg-background flex flex-col justify-between p-8 transition-colors duration-300 hover:bg-surface/60"
            >
              {/* Plan Name + Subtitle */}
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight">
                  {plan.name}
                </h3>
                {plan.subtitle && (
                  <span className="mt-1 inline-block text-xs font-mono tracking-eyebrow uppercase text-muted">
                    {plan.subtitle}
                  </span>
                )}

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-2">
                  <span
                    key={currency}
                    className="font-display text-4xl md:text-5xl font-semibold tracking-tight"
                  >
                    {plan.price[currency]}
                  </span>
                  <span className="text-sm text-muted">{plan.period}</span>
                </div>

                {/* Specs */}
                <dl className="mt-8 space-y-3">
                  {plan.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-center justify-between text-sm border-b border-border/50 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="font-medium">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={scrollToCTA}
                className="mt-8 w-full inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium transition-all duration-200 hover:bg-foreground hover:text-background hover:border-foreground group-hover:border-muted active:scale-[0.98]"
              >
                <span>{plan.ctaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          ))}
        </div>

        {/* ── Contact Strip ── */}
        <div
          data-reveal
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-surface/40 px-8 py-5"
        >
          <p className="text-sm text-muted text-center sm:text-left">
            Need custom volume or multi-channel scale?{" "}
            <span className="text-foreground font-medium">Let&apos;s talk.</span>
          </p>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={scrollToCTA}
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-medium tracking-wide transition-all duration-200 hover:bg-frost hover:text-background active:scale-[0.98]"
            >
              Book a Call
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="mailto:contact@getveevz.com?subject=GetVeevz%20Distribution%20Inquiry"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-medium text-muted transition-all duration-200 hover:text-foreground hover:border-foreground active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
