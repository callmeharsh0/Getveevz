import { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Check, ArrowUpRight, Zap, TrendingUp, Crown } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const TIERS = [
  {
    id: "spark",
    name: "Spark",
    serif: "ignite",
    Icon: Zap,
    monthlyPrice: 39,
    description: "For solo creators getting started with short-form.",
    features: ["3 Active Campaigns", "Core Analytics Hub", "Email Support", "20GB Media Storage"],
    popular: false,
    cta: "Launch Spark",
    accent: COLORS.sky,
  },
  {
    id: "momentum",
    name: "Momentum",
    serif: "compound",
    Icon: TrendingUp,
    monthlyPrice: 119,
    description: "For teams scaling rapid reach and authority.",
    features: ["Unlimited Campaigns", "Advanced Insights", "Priority Support", "500GB Storage", "Team Collaboration"],
    popular: true,
    cta: "Scale Momentum",
    accent: COLORS.cobalt,
  },
  {
    id: "dominate",
    name: "Dominate",
    serif: "flood feeds",
    Icon: Crown,
    monthlyPrice: 299,
    description: "For agencies and enterprise distribution fleets.",
    features: ["All Momentum Features", "Dedicated Strategist", "Custom API Integrations", "White-glove Onboarding", "SLA Guarantee"],
    popular: false,
    cta: "Dominate Market",
    accent: "#60A5FA",
  },
];

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const sectionRef = useRef(null);

  return (
    <section
      id="pricing-section"
      ref={sectionRef}
      className="noise-overlay"
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "170px 48px",
        overflow: "hidden",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      {/* Central bloom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 900,
          height: 700,
          background: `radial-gradient(ellipse, rgba(37,99,235,0.14) 0%, rgba(56,189,248,0.04) 45%, transparent 72%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header — centered this time for variety */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 32 }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 007 ]</span>
            <span className="hairline" style={{ width: 56 }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>INVESTMENT TIERS</span>
          </motion.div>

          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(2.6rem, 5vw, 4.4rem)", fontWeight: 600, lineHeight: 1.05, letterSpacing: "-0.03em", margin: "0 0 36px", color: COLORS.ice }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block" }} initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.1, ease: MOTION_EASE }}>
                Pick your{" "}
                <em className="serif-accent" style={{ background: "linear-gradient(120deg,#38BDF8,#2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  velocity.
                </em>
              </motion.span>
            </span>
          </h2>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 14, fontFamily: FONTS.mono, fontSize: "0.72rem", letterSpacing: "0.18em" }}
          >
            <span style={{ color: yearly ? COLORS.textMuted : COLORS.ice }}>MONTHLY</span>
            <button
              onClick={() => setYearly(!yearly)}
              style={{
                width: 58,
                height: 30,
                borderRadius: 999,
                border: `1px solid ${yearly ? COLORS.cobalt : COLORS.borderSubtle}`,
                background: yearly ? "rgba(37,99,235,0.25)" : "rgba(17,24,39,0.7)",
                cursor: "pointer",
                position: "relative",
                padding: 0,
              }}
            >
              <motion.span
                animate={{ x: yearly ? 27 : 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                style={{ position: "absolute", top: 3, left: 0, width: 22, height: 22, borderRadius: "50%", background: COLORS.sky, boxShadow: `0 0 14px ${COLORS.sky}90` }}
              />
            </button>
            <span style={{ color: yearly ? COLORS.ice : COLORS.textMuted }}>YEARLY</span>
            <span style={{ color: "#34D399", fontSize: "0.66rem", border: "1px solid rgba(52,211,153,0.4)", padding: "3px 10px", borderRadius: 999 }}>−20%</span>
          </motion.div>
        </div>

        {/* Pricing — three columns but deliberately offset vertically */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28, alignItems: "start", maxWidth: 1180, margin: "0 auto" }}>
          {TIERS.map((tier, i) => {
            const price = tier.popular && !yearly ? tier.monthlyPrice : Math.round(tier.monthlyPrice * (yearly ? 0.8 : 1));
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.12, duration: 1, ease: MOTION_EASE }}
                whileHover={{ y: -10 }}
                className="glow-border"
                style={{
                  position: "relative",
                  borderRadius: 22,
                  padding: "42px 34px",
                  background: `linear-gradient(${tier.popular ? "170deg, rgba(37,99,235,0.13) 0%, rgba(5,5,8,0.98) 55%" : "170deg, rgba(17,24,39,0.65) 0%, rgba(5,5,8,0.95) 100%"})`,
                  border: `1px solid ${tier.popular ? `${tier.accent}70` : "rgba(241,245,249,0.09)"}`,
                  boxShadow: tier.popular ? `0 40px 90px -20px rgba(37,99,235,0.35)` : "none",
                  marginTop: i === 1 ? 0 : 44,
                  transition: "border-color .35s ease, box-shadow .35s ease",
                }}
              >
                {/* Popular flag */}
                {tier.popular && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    style={{
                      position: "absolute",
                      top: -14,
                      right: 28,
                      fontFamily: FONTS.mono,
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.22em",
                      color: "#FFFFFF",
                      background: `linear-gradient(120deg, ${tier.accent}, #38BDF8)`,
                      padding: "7px 16px",
                      borderRadius: 999,
                      boxShadow: `0 8px 26px rgba(37,99,235,0.5)`,
                    }}
                  >
                    MOST DEPLOYED
                  </motion.span>
                )}

                <tier.Icon size={24} color={tier.accent} />

                <h3 style={{ fontFamily: FONTS.display, fontSize: "1.9rem", fontWeight: 600, letterSpacing: "-0.02em", margin: "22px 0 4px", color: COLORS.ice }}>
                  {tier.name}{" "}
                  <em className="serif-accent" style={{ color: tier.accent, fontSize: "0.92em" }}>{tier.serif}</em>
                </h3>
                <p style={{ fontFamily: FONTS.body, fontSize: "0.86rem", color: COLORS.textMuted, lineHeight: 1.6, margin: "0 0 28px", minHeight: 44 }}>
                  {tier.description}
                </p>

                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 30 }}>
                  <span style={{ fontFamily: FONTS.display, fontSize: "3.4rem", fontWeight: 600, letterSpacing: "-0.03em", color: COLORS.ice, lineHeight: 1 }}>
                    ${price}
                  </span>
                  <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", letterSpacing: "0.16em", color: COLORS.textMuted }}>/MO</span>
                </div>

                <div style={{ borderTop: "1px solid rgba(241,245,249,0.08)", paddingTop: 24, display: "flex", flexDirection: "column", gap: 13, marginBottom: 34 }}>
                  {tier.features.map((f) => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 18, height: 18, borderRadius: "50%", background: `${tier.accent}18`, flexShrink: 0 }}>
                        <Check size={11} color={tier.accent} />
                      </span>
                      <span style={{ fontFamily: FONTS.body, fontSize: "0.86rem", color: "rgba(241,245,249,0.85)" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glow-border"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    fontFamily: FONTS.sans,
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    padding: "16px 24px",
                    borderRadius: 999,
                    background: tier.popular ? `linear-gradient(120deg, ${tier.accent}, #38BDF8)` : "transparent",
                    border: tier.popular ? "none" : `1px solid ${tier.accent}45`,
                    color: tier.popular ? "#FFFFFF" : tier.accent,
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!tier.popular) e.currentTarget.style.background = `${tier.accent}14`;
                    else e.currentTarget.style.boxShadow = `0 12px 40px rgba(37,99,235,0.55)`;
                  }}
                  onMouseLeave={(e) => {
                    if (!tier.popular) e.currentTarget.style.background = "transparent";
                    else e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {tier.cta}
                  <ArrowUpRight size={15} />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}