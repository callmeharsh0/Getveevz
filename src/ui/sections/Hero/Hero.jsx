import { useRef } from "react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const TICKER_ITEMS = [
  "240M+ VIEWS DELIVERED", "38 CHANNELS SYNDICATING", "TRI-PLATFORM DISPATCH",
  "96.8% AVG RETENTION", "SHORT-FORM AT SCALE", "INFINITE FEED LOOPS",
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Magnetic cursor glow
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const glowX = useSpring(useTransform(mx, [0, 1], ["30%", "70%"]), { stiffness: 40, damping: 20 });
  const glowY = useSpring(useTransform(my, [0, 1], ["30%", "60%"]), { stiffness: 40, damping: 20 });

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
      className="noise-overlay"
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: COLORS.obsidian,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      {/* Cursor-tracking cobalt glow */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: glowX,
          top: glowY,
          width: 900,
          height: 900,
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle, rgba(37,99,235,0.16) 0%, rgba(56,189,248,0.05) 45%, transparent 72%)`,
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      {/* Blueprint grid */}
      <div aria-hidden className="blueprint-grid" style={{ position: "absolute", inset: 0, maskImage: "radial-gradient(ellipse 80% 70% at 50% 40%, black 30%, transparent 75%)", pointerEvents: "none" }} />

      {/* Giant outlined ghost word — parallax */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "4%",
          left: "-2%",
          x: ghostX,
          fontFamily: FONTS.display,
          fontSize: "clamp(9rem, 24vw, 26rem)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          zIndex: 0,
        }}
        className="text-stroke-faint"
      >
        DISTRIBUTION*
      </motion.div>

      {/* Orbital ring */}
      <div aria-hidden className="spin-slow" style={{ position: "absolute", top: "12%", right: "-12%", width: 640, height: 640, borderRadius: "50%", border: "1px dashed rgba(56,189,248,0.14)", pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: -5, left: "50%", width: 10, height: 10, borderRadius: "50%", background: COLORS.sky, boxShadow: "0 0 18px #38BDF8" }} />
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          y: contentY,
          opacity: fade,
          maxWidth: 1440,
          width: "100%",
          margin: "0 auto",
          padding: "170px 48px 0",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          alignItems: "end",
          gap: 64,
        }}
      >
        <div>
          {/* Index marker row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 001 ]</span>
            <span className="hairline" style={{ width: 72 }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>MEDIA AGENCY — EST. 2024</span>
          </motion.div>

          {/* Editorial headline with serif-italic accent */}
          <h1
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(3rem, 7.2vw, 7rem)",
              fontWeight: 600,
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
              margin: 0,
              color: COLORS.ice,
              textWrap: "balance",
            }}
          >
            {["We turn long-form", "into an"].map((line, li) => (
              <span key={li} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.15 + li * 0.1, duration: 1.1, ease: MOTION_EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block" }} initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.35, duration: 1.1, ease: MOTION_EASE }}>
                <span
                  style={{
                    background: "linear-gradient(120deg, #38BDF8 10%, #2563EB 90%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  infinite feed
                </span>{" "}
                <em className="serif-accent" style={{ color: COLORS.ice, fontSize: "0.92em" }}>loop.</em>
              </motion.span>
            </span>
          </h1>

          {/* Sub + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 1, ease: MOTION_EASE }}
            style={{ display: "flex", alignItems: "flex-end", gap: 48, marginTop: 44, flexWrap: "wrap" }}
          >
            <p style={{ fontFamily: FONTS.body, fontSize: "0.95rem", lineHeight: 1.75, color: COLORS.textMuted, maxWidth: 380, margin: 0 }}>
              GetVeevz is the distribution engine behind creators and brands — clipping, packaging and syndicating your archive across Reels, Shorts & TikTok on autopilot.
            </p>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border"
              style={{
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                fontFamily: FONTS.sans,
                fontSize: "0.82rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: COLORS.obsidian,
                background: COLORS.sky,
                padding: "20px 32px",
                borderRadius: 999,
                textDecoration: "none",
                overflow: "hidden",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.sky)}
            >
              <Calendar size={16} />
              Book a strategy call
              <ArrowUpRight size={17} />
            </a>
          </motion.div>
        </div>

        {/* Right rail — vertical telemetry */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 14,
            paddingBottom: 8,
          }}
        >
          {[["VIEWS / MO", "240M+"], ["CHANNELS", "38"], ["RETENTION", "96.8%"]].map(([k, v]) => (
            <div key={k} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FONTS.mono, fontSize: "0.62rem", color: COLORS.textMuted, letterSpacing: "0.22em" }}>{k}</div>
              <div style={{ fontFamily: FONTS.display, fontSize: "1.5rem", fontWeight: 600, color: COLORS.ice, letterSpacing: "-0.02em" }}>{v}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ============ BOTTOM MARQUEE TICKER ============ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 1 }}
        style={{ position: "relative", zIndex: 2, borderTop: "1px solid rgba(56,189,248,0.14)", marginTop: 80 }}
      >
        <div className="marquee-track" style={{ padding: "18px 0" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 28, paddingRight: 28 }}>
              <span style={{ fontFamily: FONTS.mono, fontSize: "0.72rem", letterSpacing: "0.26em", color: i % 2 ? COLORS.sky : COLORS.textMuted, whiteSpace: "nowrap" }}>
                {t}
              </span>
              <span style={{ color: "rgba(56,189,248,0.5)", fontSize: "0.8rem" }}>✳</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
