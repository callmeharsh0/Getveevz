import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, Cpu, Radio, BarChart3 } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const STEPS = [
  {
    num: "01",
    title: "Hand us your raw content",
    tag: "INGEST",
    icon: UploadCloud,
    lines: [
      { text: "A link or Drive folder.", dim: false },
      { text: "Any format. Any length.", dim: false },
      { text: "We take it from here.", dim: true },
    ],
    detail: "Episodes, keynotes, webinars — any format, any length. Auto-transcribed and indexed in 24 hrs.",
    accent: "#38BDF8",
    accentBg: "rgba(56,189,248,0.06)",
  },
  {
    num: "02",
    title: "We engineer the campaign",
    tag: "BUILD",
    icon: Cpu,
    lines: [
      { text: "Hooks extracted.", dim: false },
      { text: "9:16 cuts crafted.", dim: false },
      { text: "Fleet spun up.", dim: true },
    ],
    detail: "20–60 engineered assets per month: kinetic typography, sonic design, satellite channel infrastructure.",
    accent: "#60A5FA",
    accentBg: "rgba(96,165,250,0.06)",
  },
  {
    num: "03",
    title: "Clips go live everywhere",
    tag: "DISPATCH",
    icon: Radio,
    lines: [
      { text: "Shorts. Reels. TikTok.", dim: false },
      { text: "30+ channels, daily waves.", dim: false },
      { text: "Zero creator time needed.", dim: true },
    ],
    detail: "Coordinated publishing at peak algorithmic windows. No manual uploading, no account logins from you.",
    accent: "#93C5FD",
    accentBg: "rgba(147,197,253,0.06)",
  },
  {
    num: "04",
    title: "Scale what's working",
    tag: "TRACK",
    icon: BarChart3,
    lines: [
      { text: "Live view analytics.", dim: false },
      { text: "Winners doubled down.", dim: false },
      { text: "Reach compounds.", dim: true },
    ],
    detail: "Real-time dashboards track hook performance, view floors and retention spikes. We scale what wins.",
    accent: "#2563EB",
    accentBg: "rgba(37,99,235,0.06)",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  // Auto-advance every 4s
  useEffect(() => {
    const iv = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 4000);
    return () => clearInterval(iv);
  }, []);

  const step = STEPS[active];

  return (
    <section
      id="how-it-works-section"
      style={{
        background: "#060d1c",
        overflow: "hidden",
      }}
    >
      {/* ── TOP: Heading + Step Tabs ── */}
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "120px 48px 0" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: FONTS.mono, fontSize: "0.62rem",
            letterSpacing: "0.3em", color: "rgba(56,189,248,0.6)",
            textTransform: "uppercase", margin: "0 0 20px",
          }}
        >
          How it works
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: MOTION_EASE }}
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2.6rem, 5vw, 4.8rem)",
            fontWeight: 600, lineHeight: 1.0,
            letterSpacing: "-0.035em",
            color: COLORS.ice, margin: "0 0 80px",
          }}
        >
          Four steps.
          <br />
          <span style={{
            background: "linear-gradient(120deg, #38BDF8, #2563EB)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            That's the whole process.
          </span>
        </motion.h2>
      </div>

      {/* ── 4 TAB BUTTONS — full width ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = active === i;
          return (
            <button
              key={s.num}
              onClick={() => setActive(i)}
              style={{
                all: "unset",
                cursor: "pointer",
                padding: "32px 40px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                background: isActive ? s.accentBg : "transparent",
                position: "relative",
                transition: "background 0.4s ease",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {/* Active left border */}
              {isActive && (
                <motion.div
                  layoutId="tab-border"
                  style={{
                    position: "absolute",
                    left: 0, top: 0, bottom: 0,
                    width: 3,
                    background: `linear-gradient(180deg, ${s.accent}, rgba(37,99,235,0.3))`,
                    boxShadow: `0 0 20px ${s.accent}80`,
                  }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: isActive ? `${s.accent}18` : "rgba(255,255,255,0.04)",
                border: `1px solid ${isActive ? `${s.accent}40` : "rgba(255,255,255,0.08)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.4s ease",
              }}>
                <Icon size={16} color={isActive ? s.accent : "rgba(241,245,249,0.3)"} />
              </div>

              {/* Step tag */}
              <span style={{
                fontFamily: FONTS.mono,
                fontSize: "0.55rem",
                letterSpacing: "0.28em",
                color: isActive ? s.accent : "rgba(241,245,249,0.2)",
                textTransform: "uppercase",
                transition: "color 0.4s ease",
              }}>
                {s.num} — {s.tag}
              </span>

              {/* Title */}
              <span style={{
                fontFamily: FONTS.body,
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                fontWeight: 500,
                color: isActive ? COLORS.ice : "rgba(241,245,249,0.35)",
                lineHeight: 1.3,
                transition: "color 0.4s ease",
              }}>
                {s.title}
              </span>

              {/* Progress bar */}
              {isActive && (
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: 0, left: 0,
                    height: 2,
                    background: `linear-gradient(90deg, ${s.accent}, transparent)`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  key={active}
                  transition={{ duration: 4, ease: "linear" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── CONTENT PANEL ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.5, ease: MOTION_EASE }}
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "90px 48px 130px",
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 80,
            alignItems: "center",
          }}
        >
          {/* Left — 3 big lines */}
          <div>
            {step.lines.map((line, li) => (
              <motion.div
                key={li}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: li * 0.1, duration: 0.7, ease: MOTION_EASE }}
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  color: line.dim ? "rgba(241,245,249,0.18)" : COLORS.ice,
                  marginBottom: 4,
                }}
              >
                {line.text}
              </motion.div>
            ))}

            {/* Detail sentence */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              style={{
                fontFamily: FONTS.body,
                fontSize: "0.9rem",
                color: "rgba(241,245,249,0.35)",
                lineHeight: 1.7,
                margin: "28px 0 0",
                maxWidth: 400,
                borderLeft: `2px solid ${step.accent}`,
                paddingLeft: 18,
              }}
            >
              {step.detail}
            </motion.p>
          </div>

          {/* Right — Big ghost step number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: MOTION_EASE }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Glow circle behind number */}
            <div style={{
              position: "absolute",
              width: 260, height: 260,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${step.accent}18 0%, transparent 70%)`,
              filter: "blur(30px)",
            }} />
            {/* Number */}
            <span style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(10rem, 18vw, 18rem)",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.08em",
              color: step.accent,
              opacity: 0.15,
              userSelect: "none",
              position: "relative",
              zIndex: 2,
            }}>
              {step.num}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}