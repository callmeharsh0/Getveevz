import { useEffect, useRef } from "react";
import HookText from "../../common/HookText";
import { motion, useScroll, useTransform } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";
import { ArrowUpRight } from "lucide-react";

const STATS = [
  { value: "240M+", label: "Total Views Distributed", trend: "+480%", color: COLORS.sky },
  { value: "1,800+", label: "Clips Syndicated", trend: "+320%", color: "#34D399" },
  { value: "94.8%", label: "Avg. Hook Retention", trend: "TOP 1%", color: "#F59E0B" },
  { value: "120+", label: "Managed Channels", trend: "LIVE", color: "#8B5CF6" },
];

export default function HookSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const statLine = useTransform(scrollYProgress, [0.15, 0.55], ["scaleY(0)", "scaleY(1)"]);

  return (
    <section
      id="hook-section"
      ref={ref}
      className="noise-overlay"
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "170px 48px",
        overflow: "hidden",
        isolation: "isolate",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      {/* Parallax ghost word */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "8%",
          right: "-4%",
          x: ghostX,
          fontFamily: FONTS.display,
          fontSize: "clamp(7rem, 18vw, 20rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="text-stroke-faint"
      >
        THESIS
      </motion.div>

      {/* Cursor-agnostic cobalt bloom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "10%",
          width: 800,
          height: 800,
          background: `radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Index marker row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: MOTION_EASE }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 44 }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 002 ]</span>
          <span className="hairline" style={{ width: 72 }} />
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>EDITORIAL THESIS</span>
        </motion.div>

        {/* Headline — masked line reveal with serif accent + interactive word glow (HookText) */}
        <div style={{ overflow: "hidden", marginBottom: 40 }}>
          <motion.div
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: MOTION_EASE }}
          >
            <HookText
              text="Your content deserves more than a single post."
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(2.6rem, 5.6vw, 5.2rem)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.04,
                justifyContent: "flex-start",
                display: "flex",
                flexWrap: "wrap",
                color: COLORS.ice,
                maxWidth: 1100,
              }}
            />
          </motion.div>
        </div>

        {/* Sub row — editorial two-column: copy left, link right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto",
            gap: 56,
            alignItems: "end",
            marginTop: 24,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.25, duration: 1, ease: MOTION_EASE }}
            style={{
              fontFamily: FONTS.body,
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              color: COLORS.textMuted,
              lineHeight: 1.75,
              maxWidth: 560,
              margin: 0,
            }}
          >
            You already have the expertise. GetVeevz turns{" "}
            <em className="serif-accent" style={{ color: COLORS.ice }}>one piece</em>{" "}
            of long-form content into a coordinated short-form distribution engine built to travel across every algorithmic feed.
          </motion.p>

          <motion.a
            href="#what-we-do-section"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("what-we-do-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="glow-border"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.35, duration: 1, ease: MOTION_EASE }}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: FONTS.sans,
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: COLORS.obsidian,
              background: COLORS.sky,
              padding: "18px 30px",
              borderRadius: 999,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFFFF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.sky)}
            whileTap={{ scale: 0.97 }}
          >
            Explore the engine
            <ArrowUpRight size={17} />
          </motion.a>
        </div>

        {/* Stat strip — full-width hairline table rows, not cards */}
        <motion.div
          style={{
            marginTop: 100,
            borderTop: "1px solid rgba(241,245,249,0.08)",
            transformOrigin: "top",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.25 + i * 0.09, duration: 0.9, ease: MOTION_EASE }}
              className="glow-border"
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr auto auto",
                alignItems: "center",
                gap: 32,
                padding: "26px 20px",
                borderBottom: "1px solid rgba(241,245,249,0.08)",
                cursor: "default",
                position: "relative",
                transition: "background 0.35s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(37,99,235,0.05)";
                const v = e.currentTarget.querySelector(".stat-value");
                if (v) v.style.color = s.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                const v = e.currentTarget.querySelector(".stat-value");
                if (v) v.style.color = COLORS.ice;
              }}
            >
              <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.2em" }}>
                {String(i + 1).padStart(3, "0")}
              </span>
              <span
                className="stat-value"
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  color: COLORS.ice,
                  lineHeight: 1,
                  transition: "color 0.35s ease",
                }}
              >
                {s.value}
              </span>
              <span style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.textMuted }}>{s.label}</span>
              <span
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: s.color,
                  border: `1px solid ${s.color}45`,
                  padding: "5px 12px",
                  borderRadius: 999,
                }}
              >
                {s.trend}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}