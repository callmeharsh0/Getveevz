import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const CASES = [
  {
    label: "B2B Founder",
    views: "28.4M",
    growth: "+480%",
    client: "Series B SaaS Founder",
    result: "84 inbound leads. Zero ad spend.",
    quote: "28M views from talks I'd already given.",
    duration: "90 days",
  },
  {
    label: "Top 50 Podcast",
    views: "54.2M",
    growth: "+620%",
    client: "Weekly Video Podcast",
    result: "+38,500 subscribers in 6 months.",
    quote: "Our clips outlived every episode drop.",
    duration: "6 months",
  },
  {
    label: "Fintech Brand",
    views: "36.8M",
    growth: "+390%",
    client: "Fintech Platform",
    result: "3× inbound pipeline. 0 paid media.",
    quote: "Distribution became our biggest growth channel.",
    duration: "120 days",
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const cs = CASES[active];

  return (
    <section
      id="case-studies-section"
      style={{
        /* Slightly lighter dark — surface feel */
        background: "#0a0f1e",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Giant watermark metric — top-right */}
      <AnimatePresence mode="wait">
        <motion.div
          key={cs.views}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.05, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          aria-hidden
          style={{
            position: "absolute",
            right: "-2%",
            top: "10%",
            fontFamily: FONTS.display,
            fontSize: "clamp(10rem, 22vw, 26rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#38BDF8",
            lineHeight: 1,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {cs.views}
        </motion.div>
      </AnimatePresence>

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "120px 48px", width: "100%", boxSizing: "border-box", position: "relative", zIndex: 2 }}>

        {/* Tab selector — horizontal pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 80 }}>
          {CASES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                all: "unset",
                cursor: "pointer",
                fontFamily: FONTS.mono,
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: active === i ? "#050508" : "rgba(241,245,249,0.45)",
                background: active === i ? "#38BDF8" : "transparent",
                border: "1px solid",
                borderColor: active === i ? "#38BDF8" : "rgba(255,255,255,0.12)",
                padding: "10px 20px",
                borderRadius: 999,
                transition: "all 0.3s ease",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Content — 2 col */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: MOTION_EASE }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 100,
              alignItems: "center",
            }}
          >
            {/* Left — big metric + result sentence */}
            <div>
              <div style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(4rem, 8vw, 8rem)",
                fontWeight: 700,
                color: "#38BDF8",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                marginBottom: 24,
              }}>
                {cs.views}
                <span style={{ fontFamily: FONTS.mono, fontSize: "1.2rem", color: "rgba(241,245,249,0.35)", fontWeight: 400, letterSpacing: "0.1em", display: "block", marginTop: 12 }}>
                  VIEWS GENERATED
                </span>
              </div>

              {/* The result in one line */}
              <p style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                color: COLORS.ice,
                margin: "0 0 32px",
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
              }}>
                {cs.result}
              </p>

              {/* 2 meta badges */}
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ fontFamily: FONTS.mono, fontSize: "0.62rem", letterSpacing: "0.2em", color: "#38BDF8", border: "1px solid rgba(56,189,248,0.3)", padding: "7px 14px", borderRadius: 999 }}>
                  {cs.growth} GROWTH
                </span>
                <span style={{ fontFamily: FONTS.mono, fontSize: "0.62rem", letterSpacing: "0.2em", color: "rgba(241,245,249,0.45)", border: "1px solid rgba(255,255,255,0.1)", padding: "7px 14px", borderRadius: 999 }}>
                  {cs.duration}
                </span>
              </div>
            </div>

            {/* Right — client name + quote */}
            <div>
              <div style={{
                fontFamily: FONTS.mono,
                fontSize: "0.62rem",
                letterSpacing: "0.28em",
                color: "rgba(241,245,249,0.3)",
                textTransform: "uppercase",
                marginBottom: 24,
              }}>
                {cs.client}
              </div>

              {/* Quote — large italic */}
              <blockquote style={{
                fontFamily: FONTS.serifAccent || FONTS.body,
                fontStyle: "italic",
                fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
                color: "rgba(241,245,249,0.75)",
                lineHeight: 1.5,
                margin: 0,
                paddingLeft: 24,
                borderLeft: "2px solid #38BDF8",
              }}>
                "{cs.quote}"
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}