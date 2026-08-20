import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Check, Zap, TrendingUp, Crown } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────── TIER DATA ────────────────────────────────── */
const TIERS = [
  {
    id: "spark",
    name: "Spark",
    Icon: Zap,
    monthlyPrice: 39,
    description: "For solo creators getting started",
    features: [
      "Up to 3 active campaigns",
      "Core analytics dashboard",
      "Email support",
      "20 GB media storage",
    ],
    popular: false,
    cta: "Get Started",
    accent: COLORS.accent,              // warm amber — site accent
    accentSoft: COLORS.accentSoft,
    borderAccent: COLORS.borderAccent,
  },
  {
    id: "momentum",
    name: "Momentum",
    Icon: TrendingUp,
    monthlyPrice: 119,
    description: "For teams scaling their reach",
    features: [
      "Unlimited campaigns",
      "Advanced audience insights",
      "Priority live support",
      "500 GB media storage",
      "Team collaboration tools",
    ],
    popular: true,
    cta: "Start Free Trial",
    accent: "#e8c77a",                  // golden — slightly warmer for differentiation
    accentSoft: "rgba(232,199,122,0.15)",
    borderAccent: "rgba(232,199,122,0.4)",
  },
  {
    id: "dominate",
    name: "Dominate",
    Icon: Crown,
    monthlyPrice: 299,
    description: "For agencies and enterprise brands",
    features: [
      "Everything in Momentum",
      "Dedicated strategist",
      "Custom API integrations",
      "White-glove onboarding",
      "SLA-backed uptime guarantee",
    ],
    popular: false,
    cta: "Get Started",
    accent: "#c8a882",                  // warm sand
    accentSoft: "rgba(200,168,130,0.12)",
    borderAccent: "rgba(200,168,130,0.35)",
  },
];

/* ─────────────────── ANIMATED PRICE (like StatsCounter) ─────── */
function AnimatedPrice({ target, trigger }) {
  const [value, setValue] = useState(target);
  const rafRef = useRef(null);
  const prevTarget = useRef(target);

  useEffect(() => {
    if (!trigger) return;
    if (prevTarget.current === target) return;
    const from = prevTarget.current;
    prevTarget.current = target;
    const startTime = performance.now();
    const duration = 550;

    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, trigger]);

  return <>{value}</>;
}

/* ─────────────────── MOUSE-PROXIMITY TILT (like DistributionFlow) */
function useTilt(strength = 8) {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-py * strength}deg) rotateY(${px * strength}deg) translateY(-6px)`;
  }, [strength]);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  }, []);

  return { ref, handleMove, handleLeave };
}

/* ─────────────────── BACKGROUND BLOBS (like BackgroundMotion) ── */
function PricingBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <style>{`
        @keyframes blobFloat1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(50px,-40px) scale(1.1); }
        }
        @keyframes blobFloat2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(-60px,50px) scale(1.06); }
        }
        @keyframes blobFloat3 {
          0%, 100% { transform: translate(0,0) scale(1); }
          33%       { transform: translate(30px,30px) scale(1.04); }
          66%       { transform: translate(-20px,-20px) scale(0.96); }
        }
        @keyframes lineSlide {
          from { transform: translateX(-50%) scaleX(0); }
          to   { transform: translateX(-50%) scaleX(1); }
        }
        @keyframes fadeCharIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,146,74,0.45); }
          50%       { box-shadow: 0 0 0 10px rgba(212,146,74,0); }
        }
        @keyframes shimmerSweep {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes featureReveal {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cardRise {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Amber top blob */}
      <div style={{
        position: "absolute", top: "5%", left: "12%",
        width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.accentSoft} 0%, transparent 70%)`,
        animation: "blobFloat1 26s ease-in-out infinite",
        filter: "blur(50px)",
      }} />
      {/* Cream mid-right blob */}
      <div style={{
        position: "absolute", top: "40%", right: "8%",
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(242,236,225,0.04) 0%, transparent 70%)",
        animation: "blobFloat2 32s ease-in-out infinite",
        filter: "blur(60px)",
      }} />
      {/* Subtle amber bottom blob */}
      <div style={{
        position: "absolute", bottom: "8%", left: "40%",
        width: 320, height: 320, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(212,146,74,0.05) 0%, transparent 70%)`,
        animation: "blobFloat3 20s ease-in-out infinite",
        filter: "blur(40px)",
      }} />
    </div>
  );
}

/* ─────────────────── BILLING TOGGLE ───────────────────────────── */
function BillingToggle({ yearly, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      justifyContent: "center", marginBottom: 64,
    }}>
      <span
        onClick={() => onChange(false)}
        style={{
          fontFamily: FONTS.body,
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: !yearly ? COLORS.text : COLORS.textMuted,
          fontWeight: !yearly ? 500 : 300,
          cursor: "pointer",
          transition: "color 0.3s ease",
          userSelect: "none",
        }}
      >
        Monthly
      </span>

      {/* Track */}
      <button
        onClick={() => onChange(!yearly)}
        aria-label="Toggle billing period"
        style={{
          position: "relative",
          width: 48, height: 26,
          borderRadius: 13,
          background: yearly
            ? `linear-gradient(135deg, ${COLORS.accent}, #c87c30)`
            : COLORS.borderSubtle.replace("0.08", "0.15"),
          border: `1px solid ${yearly ? COLORS.borderAccent : COLORS.borderSubtle}`,
          cursor: "pointer",
          padding: 0, flexShrink: 0,
          transition: "background 0.4s ease, border-color 0.4s ease",
          boxShadow: yearly ? `0 0 14px ${COLORS.accentSoft}` : "none",
        }}
      >
        <span style={{
          position: "absolute",
          top: 3, left: yearly ? 25 : 3,
          width: 18, height: 18, borderRadius: "50%",
          background: COLORS.text,
          transition: "left 0.35s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
        }} />
      </button>

      <span
        onClick={() => onChange(true)}
        style={{
          fontFamily: FONTS.body,
          fontSize: "0.85rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: yearly ? COLORS.text : COLORS.textMuted,
          fontWeight: yearly ? 500 : 300,
          cursor: "pointer",
          transition: "color 0.3s ease",
          display: "flex", alignItems: "center", gap: 10,
          userSelect: "none",
        }}
      >
        Yearly
        <span style={{
          fontSize: "0.62rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
          color: COLORS.accent,
          background: COLORS.accentSoft,
          border: `1px solid ${COLORS.borderAccent}`,
          padding: "3px 10px",
          borderRadius: 20,
          whiteSpace: "nowrap",
          animation: yearly ? "badgePulse 2.5s ease infinite" : "none",
        }}>
          Save 15%
        </span>
      </span>
    </div>
  );
}

/* ─────────────────── PRICING CARD ─────────────────────────────── */
function PricingCard({ tier, yearly, cardTrigger, index }) {
  const [hovered, setHovered] = useState(false);
  const { ref: tiltRef, handleMove, handleLeave } = useTilt(6);

  const rawPrice = yearly
    ? Math.round(tier.monthlyPrice * 12 * 0.85 / 12)
    : tier.monthlyPrice;

  const onEnter = useCallback(() => setHovered(true), []);
  const onLeave = useCallback((e) => { setHovered(false); handleLeave(e); }, [handleLeave]);

  const isLit = hovered || tier.popular;

  return (
    <div
      style={{
        flex: "1 1 300px",
        maxWidth: 370,
        animation: cardTrigger ? `cardRise 0.7s ${index * 130}ms cubic-bezier(0.22,1,0.36,1) both` : "none",
        opacity: cardTrigger ? undefined : 0,
      }}
    >
      <div
        ref={tiltRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onMouseMove={handleMove}
        style={{
          position: "relative",
          height: "100%",
          borderRadius: 14,
          background: isLit
            ? `linear-gradient(160deg, ${COLORS.surface} 0%, ${COLORS.surfaceLight} 100%)`
            : COLORS.surface,
          border: `1px solid ${isLit ? tier.borderAccent : COLORS.borderSubtle}`,
          boxShadow: tier.popular
            ? `0 0 0 1px ${tier.accentSoft}, 0 28px 70px rgba(0,0,0,0.55), 0 0 40px ${tier.accentSoft}`
            : isLit
              ? `0 20px 50px rgba(0,0,0,0.5), 0 0 24px ${tier.accentSoft}`
              : "0 4px 20px rgba(0,0,0,0.35)",
          padding: tier.popular ? "44px 30px 36px" : "36px 28px",
          transition: [
            "border-color 0.4s ease",
            "box-shadow 0.4s ease",
            "background 0.4s ease",
            "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          ].join(", "),
          cursor: "default",
          transform: tier.popular && !hovered ? "translateY(-10px)" : undefined,
        }}
      >
        {/* Inner top glow on hover */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 14,
          background: `radial-gradient(ellipse at top, ${tier.accentSoft} 0%, transparent 55%)`,
          opacity: isLit ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none",
        }} />

        {/* Most Popular badge */}
        {tier.popular && (
          <div style={{
            position: "absolute", top: -14, left: "50%",
            transform: "translateX(-50%)",
            background: `linear-gradient(135deg, ${tier.accent}, #c87c30)`,
            color: COLORS.bg,
            fontFamily: FONTS.body,
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "5px 18px",
            borderRadius: 20,
            whiteSpace: "nowrap",
            boxShadow: `0 4px 20px ${tier.accentSoft}`,
            animation: "badgePulse 3s ease infinite",
            zIndex: 10,
          }}>
            Most Popular
          </div>
        )}

        {/* Icon + name */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginBottom: 10, position: "relative",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9,
            background: isLit ? tier.accentSoft : "rgba(242,236,225,0.04)",
            border: `1px solid ${isLit ? tier.borderAccent : COLORS.borderSubtle}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.4s ease, border-color 0.4s ease",
            flexShrink: 0,
          }}>
            <tier.Icon
              size={16}
              strokeWidth={1.8}
              color={isLit ? tier.accent : COLORS.textMuted}
              style={{ transition: "color 0.4s ease" }}
            />
          </div>

          <h3 style={{
            fontFamily: FONTS.display,
            fontSize: "1.7rem",
            fontWeight: 500,
            color: isLit ? tier.accent : COLORS.text,
            margin: 0,
            letterSpacing: "0.02em",
            transition: "color 0.35s ease",
          }}>
            {tier.name}
          </h3>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: FONTS.body,
          fontSize: "0.82rem",
          color: COLORS.textMuted,
          margin: "0 0 22px",
          lineHeight: 1.6,
          letterSpacing: "0.02em",
          position: "relative",
        }}>
          {tier.description}
        </p>

        {/* Price */}
        <div style={{
          display: "flex", alignItems: "baseline", gap: 3,
          marginBottom: 22, position: "relative",
        }}>
          <span style={{
            fontFamily: FONTS.display,
            fontSize: "3.4rem",
            fontWeight: 600,
            color: isLit ? tier.accent : COLORS.text,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            transition: "color 0.35s ease",
          }}>
            $<AnimatedPrice target={rawPrice} trigger={true} />
          </span>
          <span style={{
            fontFamily: FONTS.body, fontSize: "0.8rem",
            color: COLORS.textMuted, marginLeft: 2,
            letterSpacing: "0.08em",
          }}>
            /mo
          </span>
          {yearly && (
            <span style={{
              fontFamily: FONTS.body,
              fontSize: "0.65rem", fontWeight: 500,
              color: tier.accent,
              background: tier.accentSoft,
              border: `1px solid ${tier.borderAccent}`,
              padding: "2px 8px", borderRadius: 10, marginLeft: 8,
            }}>
              yearly
            </span>
          )}
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${isLit ? tier.borderAccent : COLORS.borderSubtle}, transparent)`,
          marginBottom: 20,
          transition: "background 0.4s ease",
          position: "relative",
        }} />

        {/* Features */}
        <ul style={{
          listStyle: "none", margin: "0 0 28px", padding: 0,
          display: "flex", flexDirection: "column", gap: 12,
          position: "relative",
        }}>
          {tier.features.map((feat, i) => (
            <li
              key={feat}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                fontFamily: FONTS.body,
                fontSize: "0.82rem",
                color: COLORS.text,
                lineHeight: 1.5,
                animation: isLit ? `featureReveal 0.3s ${i * 55}ms both ease` : "none",
              }}
            >
              <span style={{
                flexShrink: 0,
                width: 18, height: 18, borderRadius: "50%",
                border: `1.5px solid ${isLit ? tier.accent : COLORS.borderSubtle.replace("0.08", "0.2")}`,
                background: isLit ? tier.accentSoft : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginTop: 1,
                transition: "border-color 0.35s ease, background 0.35s ease",
                boxShadow: isLit ? `0 0 5px ${tier.accentSoft}` : "none",
              }}>
                <Check
                  size={9} strokeWidth={2.8}
                  color={isLit ? tier.accent : COLORS.textMuted}
                />
              </span>
              {feat}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <CardButton tier={tier} popular={tier.popular} />
      </div>
    </div>
  );
}

/* ─────────────────── CARD BUTTON ──────────────────────────────── */
function CardButton({ tier, popular }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        width: "100%",
        padding: "0.9rem 1.5rem",
        borderRadius: 0,
        border: popular
          ? "none"
          : `1px solid ${hovered ? tier.borderAccent : COLORS.borderSubtle}`,
        background: popular
          ? hovered
            ? `linear-gradient(135deg, #e8a463, #c87c30)`
            : `linear-gradient(135deg, ${COLORS.accent}, #c87c30)`
          : hovered
            ? COLORS.surfaceLight
            : "transparent",
        color: popular ? COLORS.bg : hovered ? COLORS.text : COLORS.textMuted,
        fontFamily: FONTS.body,
        fontSize: "0.72rem",
        fontWeight: 400,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: popular && hovered
          ? `0 10px 30px ${COLORS.accentSoft}`
          : "none",
      }}
    >
      {/* shimmer only on popular */}
      {popular && (
        <span style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
          backgroundSize: "200% 100%",
          animation: hovered ? "shimmerSweep 0.7s ease forwards" : "none",
          pointerEvents: "none",
        }} />
      )}
      {tier.cta}
    </button>
  );
}

/* ─────────────────── MAIN EXPORT ──────────────────────────────── */
export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const [cardTrigger, setCardTrigger] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const h2Ref = useRef(null);
  const subtextRef = useRef(null);
  const toggleRef = useRef(null);
  const cardsRef = useRef(null);
  const ctaRef = useRef(null);
  const ctaInnerRef = useRef(null);
  const dividerRef = useRef(null);

  /* ── GSAP scroll-driven entrance ─────────────────────────────── */
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      },
    });

    // Eyebrow letter-spacing + fade
    tl.fromTo(eyebrowRef.current,
      { opacity: 0, letterSpacing: "0.8em" },
      { opacity: 1, letterSpacing: "0.35em", duration: 0.9, ease: "power3.out" },
      0
    );

    // Headline slides up word by word
    const words = h2Ref.current?.querySelectorAll("span") ?? [];
    tl.fromTo(words,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" },
      0.15
    );

    // Subtext fade
    tl.fromTo(subtextRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
      0.55
    );

    // Toggle slides in
    tl.fromTo(toggleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
      0.75
    );

    // Trigger card animations
    tl.call(() => setCardTrigger(true), [], 0.85);

    // Divider line
    tl.fromTo(dividerRef.current,
      { scaleX: 0, opacity: 0 },
      { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
      1.0
    );
  }, { scope: sectionRef });

  /* ── CTA section entrance ─────────────────────────────────────── */
  useGSAP(() => {
    gsap.fromTo(ctaInnerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 75%",
          once: true,
        },
      }
    );
  }, { scope: ctaRef });

  /* ── Split headline into <span> words ─────────────────────────── */
  const headline = "Plans Built for Every Stage of Growth";
  const words = headline.split(" ");

  return (
    <>
      {/* ════════ PAGE 7 — PRICING ════════ */}
      <section
        id="pricing-section"
        ref={sectionRef}
        style={{
          position: "relative",
          background: COLORS.bg,
          padding: "100px 24px 80px",
          overflow: "hidden",
        }}
      >
        <PricingBackground />

        {/* Thin top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 1, height: 100,
          background: `linear-gradient(to bottom, rgba(212,146,74,0.6), transparent)`,
          pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            textAlign: "center",
            maxWidth: 680,
            margin: "0 auto 16px",
            position: "relative", zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.65rem",
              fontWeight: 400,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: COLORS.accent,
              margin: "0 0 24px",
              opacity: 0,
            }}
          >
            Pricing &amp; Packages
          </p>

          {/* Headline — split into word spans for GSAP stagger */}
          <h2
            ref={h2Ref}
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 5vw, 3.8rem)",
              fontWeight: 400,
              color: COLORS.text,
              margin: "0 0 20px",
              lineHeight: 1.15,
              letterSpacing: "0.01em",
            }}
          >
            {words.map((w, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  marginRight: i < words.length - 1 ? "0.28em" : 0,
                  opacity: 0,
                }}
              >
                {w}
              </span>
            ))}
          </h2>

          {/* Subtext */}
          <p
            ref={subtextRef}
            style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(0.85rem, 1.4vw, 0.95rem)",
              color: COLORS.textMuted,
              lineHeight: 1.7,
              margin: "0 0 48px",
              letterSpacing: "0.02em",
              opacity: 0,
            }}
          >
            Transparent pricing, no hidden fees — scale up whenever you're ready.
          </p>
        </div>

        {/* ── Billing toggle ── */}
        <div ref={toggleRef} style={{ position: "relative", zIndex: 1, opacity: 0 }}>
          <BillingToggle yearly={yearly} onChange={setYearly} />
        </div>

        {/* ── Cards ── */}
        <div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: 24,
            maxWidth: 1120,
            margin: "0 auto",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            position: "relative", zIndex: 1,
          }}
        >
          {TIERS.map((tier, i) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              yearly={yearly}
              cardTrigger={cardTrigger}
              index={i}
            />
          ))}
        </div>

        {/* ── Divider note ── */}
        <div style={{ textAlign: "center", marginTop: 52, position: "relative", zIndex: 1 }}>
          <div
            ref={dividerRef}
            style={{
              width: 1,
              height: 60,
              background: `linear-gradient(to bottom, ${COLORS.borderAccent}, transparent)`,
              margin: "0 auto 20px",
              transformOrigin: "top",
              opacity: 0,
            }}
          />
          <p style={{
            fontFamily: FONTS.body,
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: COLORS.textMuted,
          }}>
            All plans include a 14-day free trial · No credit card required
          </p>
        </div>

        {/* A/B test note — preserved as dev comment:
            Three-tier vs single-offer: single variant needs simplified prop shape,
            full-width card, no popular highlight. Gate via VITE_SINGLE_OFFER=true. */}
      </section>

      {/* ════════ FINAL CTA ════════ */}
      <section
        ref={ctaRef}
        style={{
          position: "relative",
          background: COLORS.bgSoft,
          padding: "100px 24px",
          textAlign: "center",
          overflow: "hidden",
          borderTop: `1px solid ${COLORS.borderSubtle}`,
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700, height: 400, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${COLORS.accentSoft} 0%, transparent 70%)`,
          filter: "blur(40px)", pointerEvents: "none",
        }} />

        {/* Top line */}
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: 1, height: 90,
          background: `linear-gradient(to bottom, ${COLORS.accent}99, transparent)`,
        }} />

        <div ref={ctaInnerRef} style={{ position: "relative", opacity: 0 }}>
          <p style={{
            fontFamily: FONTS.body,
            fontSize: "0.65rem", fontWeight: 400,
            letterSpacing: "0.35em", textTransform: "uppercase",
            color: COLORS.accent, margin: "0 0 28px",
          }}>
            Get Started Today
          </p>

          <h2 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            fontWeight: 400,
            color: COLORS.text,
            margin: "0 auto 20px",
            lineHeight: 1.15,
            letterSpacing: "0.01em",
            maxWidth: 600,
          }}>
            Ready to grow with{" "}
            <span style={{ fontStyle: "italic", color: COLORS.accent }}>
              NexusMedia?
            </span>
          </h2>

          <p style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(0.85rem, 1.3vw, 0.95rem)",
            color: COLORS.textMuted,
            lineHeight: 1.75,
            margin: "0 auto 52px",
            maxWidth: 440,
            letterSpacing: "0.02em",
          }}>
            Join hundreds of creators and agencies already scaling their content
            with NexusMedia.
          </p>

          {/* Final CTA button */}
          <FinalCTAButton />

          <p style={{
            fontFamily: FONTS.body,
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
            color: COLORS.textMuted,
            marginTop: 22,
            marginBottom: 44,
          }}>
            No credit card required · Cancel anytime
          </p>

          {/* ── BACK TO TOP (FIRST PAGE) BUTTON ── */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 28px",
                borderRadius: "30px",
                background: "rgba(212, 146, 74, 0.08)",
                border: "1px solid rgba(212, 146, 74, 0.35)",
                color: "#e8c77a",
                fontFamily: FONTS.body,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(212,146,74,0.25), rgba(212,146,74,0.12))";
                e.currentTarget.style.borderColor = "#e8c77a";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(212, 146, 74, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(212, 146, 74, 0.08)";
                e.currentTarget.style.borderColor = "rgba(212, 146, 74, 0.35)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
              }}
            >
              <span style={{ fontSize: "0.95rem", lineHeight: 1 }}>↑</span>
              <span>Back to Top </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          position: "absolute",
          bottom: "2.5rem", left: "2.2rem", right: "2.2rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          opacity: 0.35,
        }}>
          <span style={{
            fontFamily: FONTS.body,
            fontSize: "0.58rem", fontWeight: 300,
            letterSpacing: "0.22em",
            color: COLORS.text,
            textTransform: "uppercase",
          }}>
            © 2025 NexusMedia
          </span>
          <span style={{
            fontFamily: FONTS.body,
            fontSize: "0.58rem", fontWeight: 300,
            letterSpacing: "0.22em",
            color: COLORS.text,
            textTransform: "uppercase",
          }}>
            Distribution at scale
          </span>
        </div>
      </section>
    </>
  );
}

/* ─────────────────── FINAL CTA BUTTON ─────────────────────────── */
function FinalCTAButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.8rem",
        fontFamily: FONTS.body,
        fontSize: "0.72rem",
        fontWeight: 400,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: COLORS.bg,
        background: `linear-gradient(135deg, ${COLORS.accent}, #c87c30)`,
        padding: "1.1rem 3rem",
        borderRadius: 0,
        textDecoration: "none",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 14px 40px ${COLORS.accentSoft}`
          : "none",
      }}
    >
      <span style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)",
        backgroundSize: "200% 100%",
        animation: hovered ? "shimmerSweep 0.75s ease forwards" : "none",
        pointerEvents: "none",
      }} />
      Start Your Free Trial
      <span style={{ fontSize: "1rem", lineHeight: 1 }}>→</span>
    </a>
  );
}
