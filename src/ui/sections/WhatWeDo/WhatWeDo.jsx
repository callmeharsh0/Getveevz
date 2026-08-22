import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Scissors, Share2, Layers, LineChart, ArrowUpRight } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const PILLARS = [
  {
    id: "clipping",
    num: "001",
    icon: Scissors,
    title: "Clipping",
    serif: "hooks.",
    description: "We dissect hours of raw footage to extract high-leverage moments tuned for algorithmic watch-time.",
    points: ["Hook Engineering", "9:16 Kinetic Type", "Retention Pacing", "Sonic Design"],
    accent: COLORS.sky,
  },
  {
    id: "distribution",
    num: "002",
    icon: Share2,
    title: "Distribution",
    serif: "everywhere.",
    description: "Clips syndicated across Shorts, Reels and TikTok at peak engagement windows — on autopilot.",
    points: ["Tri-Platform Sync", "Autonomous Accounts", "Metadata Tuning", "Native Formats"],
    accent: "#34D399",
  },
  {
    id: "campaign-management",
    num: "003",
    icon: Layers,
    title: "Fleet Ops",
    serif: "at scale.",
    description: "We deploy and operate 30–120 branded satellite channels that flood feeds without creator logins.",
    points: ["Channel Fleets", "Zero-Login Ops", "Narrative Waves", "Warmup Protocol"],
    accent: "#F59E0B",
  },
  {
    id: "tracking",
    num: "004",
    icon: LineChart,
    title: "Telemetry",
    serif: "always on.",
    description: "Live analytics track view floors, retention spikes and cross-channel winners to scale what works.",
    points: ["Analytics Hub", "View Floors", "Heatmaps", "Winner Scaling"],
    accent: "#8B5CF6",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["4%", "-12%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="what-we-do-section"
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
      {/* Ghost word */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "5%",
          left: "-2%",
          x: ghostX,
          fontFamily: FONTS.display,
          fontSize: "clamp(7rem, 17vw, 19rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="text-stroke-faint"
      >
        CAPABILITIES
      </motion.div>

      {/* Parallax blueprint grid */}
      <motion.div aria-hidden className="blueprint-grid" style={{ position: "absolute", inset: 0, y: gridY, maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 25%, transparent 75%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ maxWidth: 900, marginBottom: 90 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 003 ]</span>
            <span className="hairline" style={{ width: 72 }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>CORE CAPABILITIES</span>
          </motion.div>

          {/* Masked line-reveal headline */}
          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(2.6rem, 5.6vw, 4.8rem)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, color: COLORS.ice }}>
            {["Everything you need to turn", "content into distribution."].map((line, li) => (
              <span key={li} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "110%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: li * 0.1, duration: 1.1, ease: MOTION_EASE }}
                >
                  {li === 1 ? (
                    <>
                      content into{" "}
                      <em className="serif-accent" style={{ background: "linear-gradient(120deg,#38BDF8,#2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        distribution.
                      </em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Pipeline indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.35, duration: 0.9, ease: MOTION_EASE }}
            style={{ display: "inline-flex", alignItems: "center", gap: 14, marginTop: 36, fontFamily: FONTS.mono, fontSize: "0.7rem", letterSpacing: "0.24em", color: COLORS.textMuted }}
          >
            CONTENT → CLIPPING → DISTRIBUTION → TRACKING
          </motion.div>
        </div>

        {/* Asymmetric editorial rows — alternating, hairline-divided (not uniform cards) */}
        <div style={{ borderTop: "1px solid rgba(241,245,249,0.09)" }}>
          {PILLARS.map((card, i) => {
            const Icon = card.icon;
            const reversed = i % 2 === 1;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.06, duration: 1, ease: MOTION_EASE }}
                className="row-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto minmax(0,1fr) auto",
                  alignItems: "center",
                  gap: 56,
                  padding: "52px 24px",
                  borderBottom: "1px solid rgba(241,245,249,0.09)",
                  position: "relative",
                  transition: "background 0.4s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = `linear-gradient(90deg, transparent, ${card.accent}0d 45%, transparent)`)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Index + icon */}
                <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 130 }}>
                  <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: card.accent, letterSpacing: "0.22em" }}>{card.num}</span>
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      background: `${card.accent}12`,
                      border: `1px solid ${card.accent}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: card.accent,
                      boxShadow: `0 0 0 rgba(0,0,0,0)`,
                      transition: "box-shadow .35s ease",
                    }}
                  >
                    <Icon size={26} />
                  </motion.div>
                </div>

                {/* Title + copy */}
                <div>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)", fontWeight: 600, letterSpacing: "-0.02em", margin: "0 0 10px", color: COLORS.ice }}>
                    {card.title}{" "}
                    <em className="serif-accent" style={{ color: card.accent, fontSize: "1.05em" }}>
                      {card.serif}
                    </em>
                  </h3>
                  <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", color: COLORS.textMuted, lineHeight: 1.7, margin: 0, maxWidth: 560 }}>
                    {card.description}
                  </p>

                  {/* Points as inline mono chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                    {card.points.map((pt) => (
                      <span
                        key={pt}
                        style={{
                          fontFamily: FONTS.mono,
                          fontSize: "0.66rem",
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: COLORS.textMuted,
                          border: "1px solid rgba(241,245,249,0.12)",
                          padding: "6px 12px",
                          borderRadius: 999,
                          transition: "all 0.3s ease",
                        }}
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow affordance */}
                <motion.span
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 52, height: 52, borderRadius: "50%", border: "1px solid rgba(241,245,249,0.14)", color: COLORS.textMuted, transition: "all 0.35s ease" }}
                  className="row-arrow"
                >
                  <ArrowUpRight size={20} />
                </motion.span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        #what-we-do-section .row-hover:hover .row-arrow {
          background: #38BDF8;
          color: #050508 !important;
          border-color: #38BDF8 !important;
          box-shadow: 0 0 34px rgba(56,189,248,0.55);
          transform: translate(3px, -3px);
        }
        #what-we-do-section .row-hover:hover span[style*="border-radius: 999"] {
          border-color: rgba(56,189,248,0.35) !important;
          color: #F1F5F9 !important;
        }
      `}</style>
    </section>
  );
}