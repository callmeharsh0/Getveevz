import React from "react";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const ROWS = [
  { label: "What you get",       them: "Individual .mp4 files",            us: "End-to-end distribution engine" },
  { label: "Account management", them: "You upload manually",               us: "100% autonomous posting" },
  { label: "Platforms",          them: "Your main account only",            us: "30–120 satellite channels" },
  { label: "Analytics",          them: "None provided",                     us: "Live cross-network dashboard" },
  { label: "Creator time",       them: "10–15 hrs/week",                    us: "Zero ongoing friction" },
  { label: "Algorithmic hooks",  them: "Basic cuts",                        us: "Engineered retention tuning" },
];

export default function WhyGetVeevz() {
  return (
    <section
      id="why-getveevz-section"
      style={{
        /* Pure black — back to high contrast */
        background: "#000000",
        padding: "140px 48px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Heading — left aligned, no eyebrow */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: MOTION_EASE }}
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: COLORS.ice,
            margin: "0 0 64px",
          }}
        >
          Not a video editor.
          <br />
          <span style={{ color: "#38BDF8" }}>A distribution engine.</span>
        </motion.h2>

        {/* Table — slim rows, no outer border */}
        <div>
          {/* Header row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0,
            paddingBottom: 16,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 4,
          }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(241,245,249,0.25)", textTransform: "uppercase" }} />
            <div style={{ fontFamily: FONTS.mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: "rgba(241,245,249,0.25)", textTransform: "uppercase", paddingLeft: 24 }}>
              Typical Editor
            </div>
            <div style={{ fontFamily: FONTS.mono, fontSize: "0.6rem", letterSpacing: "0.3em", color: "#38BDF8", textTransform: "uppercase", paddingLeft: 24 }}>
              GetVeevz
            </div>
          </div>

          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: MOTION_EASE }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 0,
                padding: "22px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                alignItems: "center",
              }}
            >
              {/* Label */}
              <div style={{ fontFamily: FONTS.mono, fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(241,245,249,0.35)", textTransform: "uppercase" }}>
                {row.label}
              </div>

              {/* Them — grey, strikethrough feel */}
              <div style={{ paddingLeft: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <X size={12} color="rgba(241,245,249,0.2)" strokeWidth={2} />
                <span style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: "rgba(241,245,249,0.3)" }}>
                  {row.them}
                </span>
              </div>

              {/* Us — bright, emphasized */}
              <div style={{ paddingLeft: 24, display: "flex", alignItems: "center", gap: 10 }}>
                <Check size={12} color="#38BDF8" strokeWidth={2.5} />
                <span style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.ice, fontWeight: 500 }}>
                  {row.us}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
