import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const CLIENT_LOGOS = [
  { symbol: "◆ APEX", color: "#EF4444" },
  { symbol: "● FOUNDERPOD", color: "#EC4899" },
  { symbol: "▲ SCALE VENTURES", color: "#F59E0B" },
  { symbol: "✕ HYPERGROWTH", color: "#10B981" },
  { symbol: "✦ OMNI MEDIA", color: "#06B6D4" },
  { symbol: "◈ VORTEX", color: "#8B5CF6" },
  { symbol: "◼ CATALYST", color: "#F97316" },
  { symbol: "⬡ SYNDICATE", color: "#6366F1" },
];

const STATS = [
  { value: 240, suffix: "M+", label: "Views Distributed", color: COLORS.sky },
  { value: 1800, suffix: "+", label: "Clips Syndicated", color: "#34D399" },
  { value: 94.8, suffix: "%", label: "Avg. Watch Time", isFloat: true, color: COLORS.ice },
  { value: 120, suffix: "+", label: "Managed Channels", color: "#8B5CF6" },
];

function useCountUp(target, trigger, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, trigger, duration]);
  return val;
}

export default function ProofMarquee() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proof-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: COLORS.obsidian,
        borderTop: "1px solid rgba(56,189,248,0.08)",
        overflow: "hidden",
      }}
    >
      {/* ===== Client marquee band ===== */}
      <div style={{ padding: "44px 0", borderBottom: "1px solid rgba(241,245,249,0.07)" }}>
        <div className="marquee-track" style={{ gap: 72 }}>
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <span
              key={i}
              style={{
                fontFamily: FONTS.mono,
                fontSize: "0.82rem",
                fontWeight: 500,
                letterSpacing: "0.3em",
                whiteSpace: "nowrap",
                color: inView ? logo.color : COLORS.textMuted,
                opacity: 0.55,
                transition: `color 1s ease ${i * 0.12}s, opacity 1s ease`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = 1;
                e.currentTarget.style.filter = `drop-shadow(0 0 12px ${logo.color})`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = 0.55;
                e.currentTarget.style.filter = "none";
              }}
            >
              {logo.symbol}
            </span>
          ))}
        </div>
      </div>

      {/* ===== Giant count-up numbers — full-bleed editorial rows ===== */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "110px 48px 130px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: MOTION_EASE }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 70 }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 006 ]</span>
          <span className="hairline" style={{ width: 72 }} />
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>SCALE IN NUMBERS</span>
        </motion.div>

        {/* Oversized number grid — 2x2 but asymmetric type scale */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: 96, rowGap: 90 }}>
          {STATS.map((s, i) => (
            <StatNumber key={s.label} stat={s} index={i} trigger={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatNumber({ stat, index, trigger }) {
  const val = useCountUp(stat.value, trigger, 2000 + index * 200);
  const display = stat.isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 1, ease: MOTION_EASE }}
      className="glow-border"
      style={{
        position: "relative",
        borderRadius: 20,
        padding: index % 3 === 0 ? "56px 40px" : "36px 40px",
        background: `linear-gradient(${index % 2 ? "200deg" : "160deg"}, ${stat.color}06 0%, transparent 65%)`,
        border: "1px solid rgba(241,245,249,0.07)",
        cursor: "default",
        transition: "border-color 0.4s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${stat.color}55`;
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = `0 24px 60px -18px ${stat.color}30, 0 0 44px ${stat.color}14`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(241,245,249,0.07)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Oversized display figure */}
      <span
        style={{
          display: "block",
          fontFamily: FONTS.display,
          fontSize: index % 3 === 0 ? "clamp(4.5rem, 9vw, 8rem)" : "clamp(3.5rem, 7vw, 6rem)",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 0.95,
          background: `linear-gradient(120deg, ${COLORS.ice} 20%, ${stat.color} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          marginBottom: 14,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {display}
        <span style={{ fontSize: "0.45em", letterSpacing: "-0.01em" }}>{stat.suffix}</span>
      </span>
      <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", letterSpacing: "0.26em", textTransform: "uppercase", color: COLORS.textMuted }}>
        {String(index + 1).padStart(3, "0")} — {stat.label}
      </span>
    </motion.div>
  );
}