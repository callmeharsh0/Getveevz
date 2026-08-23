import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const PILLARS = [
  {
    num: "01",
    title: "Clipping",
    tagline: "We find the moment before you knew it existed.",
    detail: "Hours of raw footage turned into 20–60 high-retention hooks — engineered for 3-second scroll-stops, not just cuts.",
    stat: "60+ clips/month",
    accent: "#38BDF8",
  },
  {
    num: "02",
    title: "Distribution",
    tagline: "Three platforms. One upload from you. Zero manual work.",
    detail: "Coordinated publishing waves across YouTube Shorts, Instagram Reels and TikTok at peak algorithmic windows.",
    stat: "Tri-platform, daily",
    accent: "#60A5FA",
  },
  {
    num: "03",
    title: "Fleet Ops",
    tagline: "30 to 120 channels working for you, silently.",
    detail: "Branded satellite channel networks that flood feeds with your content without ever touching your main login.",
    stat: "30–120 channels",
    accent: "#93C5FD",
  },
  {
    num: "04",
    title: "Telemetry",
    tagline: "The numbers that actually matter, live.",
    detail: "View floors, retention heatmaps, hook iterations — we track what compounds and double down on winners.",
    stat: "Real-time analytics",
    accent: "#2563EB",
  },
];

function PillarRow({ p, isActive, onEnter, onLeave, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.9, ease: MOTION_EASE }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* ── TOP ROW: always visible ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "56px 1fr auto",
        alignItems: "center",
        gap: 32,
        padding: "36px 0",
        transition: "padding 0.4s ease",
      }}>
        {/* Number */}
        <span style={{
          fontFamily: FONTS.mono,
          fontSize: "0.62rem",
          letterSpacing: "0.25em",
          color: isActive ? p.accent : "rgba(241,245,249,0.18)",
          transition: "color 0.4s ease",
        }}>
          {p.num}
        </span>

        {/* Title + tagline */}
        <div>
          <span style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2rem, 4vw, 3.8rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: isActive ? COLORS.ice : "rgba(241,245,249,0.55)",
            transition: "color 0.4s ease",
            display: "block",
          }}>
            {p.title}
          </span>

          {/* Tagline — slides in below title on hover */}
          <AnimatePresence>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  display: "block",
                  overflow: "hidden",
                  fontFamily: FONTS.body,
                  fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                  color: "rgba(241,245,249,0.45)",
                  lineHeight: 1.6,
                  maxWidth: 520,
                }}
              >
                {p.tagline}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Right: stat pill — always visible, dims when inactive */}
        <span style={{
          fontFamily: FONTS.mono,
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: isActive ? p.accent : "rgba(241,245,249,0.2)",
          border: `1px solid ${isActive ? `${p.accent}50` : "rgba(255,255,255,0.08)"}`,
          padding: "8px 16px",
          borderRadius: 999,
          whiteSpace: "nowrap",
          transition: "all 0.4s ease",
        }}>
          {p.stat}
        </span>
      </div>

      {/* ── EXPANDED DETAIL ROW ── */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{
              paddingLeft: 88,
              paddingBottom: 32,
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}>
              {/* Blue accent bar */}
              <div style={{ width: 2, height: 40, background: p.accent, borderRadius: 2, flexShrink: 0 }} />
              <p style={{
                fontFamily: FONTS.body,
                fontSize: "0.88rem",
                color: "rgba(241,245,249,0.4)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 500,
              }}>
                {p.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const [active, setActive] = useState(null);

  return (
    <section
      id="what-we-do-section"
      style={{
        background: "#04091a",
        padding: "140px 0",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>

        {/* Heading */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 72,
          flexWrap: "wrap",
          gap: 24,
        }}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: COLORS.ice,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Four things we do.
            <br />
            <span style={{ color: "rgba(241,245,249,0.3)", fontSize: "0.6em", fontWeight: 400 }}>Hover each to learn more.</span>
          </motion.h2>
        </div>

        {/* Rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          {PILLARS.map((p, i) => (
            <PillarRow
              key={p.num}
              p={p}
              index={i}
              isActive={active === i}
              onEnter={() => setActive(i)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}