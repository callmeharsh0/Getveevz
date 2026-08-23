import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const CLIENT_LOGOS = [
  { symbol: "THINKSCHOOL",      color: "rgba(241,245,249,0.5)" },
  { symbol: "GROWTHSCHOOL",     color: "rgba(241,245,249,0.5)" },
  { symbol: "RANVEER ALLAHBADIA", color: "rgba(241,245,249,0.5)" },
  { symbol: "RACHITROO",        color: "rgba(241,245,249,0.5)" },
  { symbol: "TAI LOPEZ",        color: "rgba(241,245,249,0.5)" },
  { symbol: "WISPR FLOW",       color: "rgba(241,245,249,0.5)" },
  { symbol: "FOUNDR",           color: "rgba(241,245,249,0.5)" },
  { symbol: "HYPERGROWTH",      color: "rgba(241,245,249,0.5)" },
];

const STATS = [
  { value: 240,   suffix: "M+",  label: "Views",    color: "#38BDF8" },
  { value: 1800,  suffix: "+",   label: "Clips",    color: "#60A5FA" },
  { value: 94.8,  suffix: "%",   label: "Retention", isFloat: true, color: "#93C5FD" },
  { value: 120,   suffix: "+",   label: "Channels", color: "#2563EB" },
];

function useCountUp(target, trigger, duration = 2000) {
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

function StatItem({ stat, index, trigger }) {
  const val = useCountUp(stat.value, trigger, 2200 + index * 150);
  const display = stat.isFloat ? val.toFixed(1) : Math.round(val).toLocaleString();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 1, ease: MOTION_EASE }}
      style={{ textAlign: "center" }}
    >
      {/* Giant number */}
      <div style={{
        fontFamily: FONTS.display,
        fontSize: "clamp(4rem, 9vw, 8.5rem)",
        fontWeight: 600,
        lineHeight: 0.9,
        letterSpacing: "-0.04em",
        color: stat.color,
        marginBottom: 12,
        fontVariantNumeric: "tabular-nums",
      }}>
        {display}<span style={{ fontSize: "0.4em" }}>{stat.suffix}</span>
      </div>
      {/* Short label */}
      <div style={{
        fontFamily: FONTS.mono,
        fontSize: "0.65rem",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "rgba(241,245,249,0.35)",
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function ProofMarquee() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="proof-section"
      ref={sectionRef}
      style={{
        position: "relative",
        /* Pure black — contrast against Hero */
        background: "#000000",
        overflow: "hidden",
      }}
    >
      {/* ── GIANT NUMBERS — full bleed, center-aligned, nothing else ── */}
      <div style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "120px 48px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0,
      }}>
        {STATS.map((stat, i) => (
          <div key={stat.label} style={{
            borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
            padding: "0 40px",
          }}>
            <StatItem stat={stat} index={i} trigger={inView} />
          </div>
        ))}
      </div>

      {/* ── CLIENT MARQUEE — ultra slim strip ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 0",
      }}>
        <div className="marquee-track" style={{ gap: 64 }}>
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <span
              key={i}
              style={{
                fontFamily: FONTS.mono,
                fontSize: "0.72rem",
                fontWeight: 400,
                letterSpacing: "0.35em",
                whiteSpace: "nowrap",
                color: logo.color,
                textTransform: "uppercase",
              }}
            >
              {logo.symbol}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}