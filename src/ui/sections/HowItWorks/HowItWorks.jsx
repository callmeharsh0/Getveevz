import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { UploadCloud, Cpu, Radio, BarChart3, ArrowUpRight } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const STEPS = [
  {
    num: "01",
    title: "Give us your content",
    serif: "raw.",
    icon: UploadCloud,
    tag: "RAW INGESTION",
    description: "A simple link or drive folder is all we need — episodes, keynotes, webinars, any format, any length.",
    deliverables: ["Any format or length", "Auto transcription & indexing", "Secure cloud ingestion"],
    console: ["$ ingest --source=drive://master-library", "▸ Episode_48_RawMaster.mov (01:14:22) ✓", "▸ Keynote_SF_2026.mp4 (00:46:15) ✓", "▸ 3 files ready — pipeline armed."],
    accent: COLORS.sky,
  },
  {
    num: "02",
    title: "We build the campaign",
    serif: "engineered.",
    icon: Cpu,
    tag: "HOOK ENGINEERING",
    description: "High-retention moments extracted, kinetic 9:16 cuts crafted, hooks written platform-native, fleet spun up.",
    deliverables: ["20–60+ engineered assets", "Sound design & typography", "Fleet branding & warmup"],
    console: ["$ extract --hooks --kinetic-cuts", "▸ HOOK_01 'The $10M Distribution Secret' 0:34", "▸ HOOK_02 'Why 99% of Content Dies' 0:48", "▸ 34 high-retention cuts generated ✓"],
    accent: "#F59E0B",
  },
  {
    num: "03",
    title: "Clips go live",
    serif: "everywhere.",
    icon: Radio,
    tag: "TRI-PLATFORM DISPATCH",
    description: "Coordinated publishing waves hit Shorts, Reels and TikTok across your brand + satellite channels at peak windows.",
    deliverables: ["Daily publishing waves", "Engagement optimization", "Zero creator management"],
    console: ["$ dispatch --all-platforms --peak-windows", "▸ YT Shorts: 4 posts scheduled", "▸ IG Reels: 6 posts scheduled", "▸ TikTok: 8 posts scheduled — LIVE on 30+ channels"],
    accent: "#34D399",
  },
  {
    num: "04",
    title: "Track & optimize",
    serif: "compounding.",
    icon: BarChart3,
    tag: "SCALE TELEMETRY",
    description: "Watch time, drop-offs and algorithmic triggers analyzed to double down on viral angles and scale winners.",
    deliverables: ["Real-time view analytics", "Hook iteration loops", "Monthly scale reports"],
    console: ["$ telemetry --live --aggregate", "▸ Total reach: 18.4M views / 30d", "▸ Top clip: 4.8M views 🔥", "▸ Optimization loop: 3.4x reach velocity"],
    accent: "#8B5CF6",
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["-6%", "10%"]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cur = STEPS[activeStep];

  // Auto-advance
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActiveStep((s) => (s + 1) % STEPS.length), 5000);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <section
      id="how-it-works-section"
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
      {/* Ghost word drifting opposite direction */}
      <motion.div aria-hidden className="text-stroke-faint" style={{ position: "absolute", bottom: "2%", left: "-2%", x: ghostX, fontFamily: FONTS.display, fontSize: "clamp(7rem, 16vw, 18rem)", fontWeight: 700, letterSpacing: "-0.04em", whiteSpace: "nowrap", pointerEvents: "none", zIndex: 0 }}>
        PIPELINE
      </motion.div>

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: 90 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 004 ]</span>
            <span className="hairline" style={{ width: 72 }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>TURNKEY EXECUTION</span>
          </motion.div>

          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(2.6rem, 5.6vw, 4.8rem)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, color: COLORS.ice, maxWidth: 1000 }}>
            {["From content to distribution,", "without the operation."].map((line, li) => (
              <span key={li} style={{ display: "block", overflow: "hidden" }}>
                <motion.span style={{ display: "block" }} initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: li * 0.1, duration: 1.1, ease: MOTION_EASE }}>
                  {li === 1 ? (
                    <>
                      without{" "}
                      <em className="serif-accent" style={{ background: "linear-gradient(120deg,#38BDF8,#2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        the operation.
                      </em>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>
        </div>

        {/* ============ DIFFERENT STYLE: horizontal timeline rail with progress line ============ */}
        <div style={{ borderTop: "1px solid rgba(241,245,249,0.09)", paddingTop: 40 }}>
          {/* Step rail */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 0, marginBottom: 64 }}>
            {STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    padding: "0 24px 28px",
                    textAlign: "left",
                    cursor: "pointer",
                    position: "relative",
                    borderBottom: `2px solid ${isActive ? step.accent : "rgba(241,245,249,0.08)"}`,
                    transition: "border-color 0.4s ease",
                  }}
                >
                  <span style={{ display: "block", fontFamily: FONTS.mono, fontSize: "0.66rem", color: isActive ? step.accent : COLORS.textMuted, letterSpacing: "0.22em", marginBottom: 12 }}>
                    PHASE {step.num}
                  </span>
                  <span style={{ display: "block", fontFamily: FONTS.sans, fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)", fontWeight: 600, color: isActive ? COLORS.ice : COLORS.textMuted, transition: "color 0.35s ease" }}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail pane — split editorial: copy left, terminal right */}
          <motion.div key={cur.num} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: MOTION_EASE }} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 72, alignItems: "start" }}>
            {/* Left copy */}
            <div>
              <h3 style={{ fontFamily: FONTS.display, fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "0 0 14px", color: COLORS.ice }}>
                {cur.title}{" "}
                <em className="serif-accent" style={{ color: cur.accent, fontSize: "1.05em" }}>
                  {cur.serif}
                </em>
              </h3>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.98rem", color: COLORS.textMuted, lineHeight: 1.75, margin: "0 0 32px", maxWidth: 480 }}>
                {cur.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 480 }}>
                {cur.deliverables.map((d, di) => (
                  <div key={di} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 4px", borderBottom: "1px solid rgba(241,245,249,0.07)" }}>
                    <span style={{ fontFamily: FONTS.body, fontSize: "0.86rem", color: "rgba(241,245,249,0.85)" }}>{d}</span>
                    <ArrowUpRight size={15} color={cur.accent} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right — terminal window */}
            <div
              className="glow-border"
              style={{
                borderRadius: 16,
                background: "linear-gradient(170deg, #0a0a10 0%, #050508 100%)",
                border: `1px solid ${cur.accent}30`,
                overflow: "hidden",
                boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${cur.accent}12`,
              }}
            >
              {/* Titlebar */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: "1px solid rgba(241,245,249,0.07)", background: "rgba(17,24,39,0.6)" }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#EF4444" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#F59E0B" }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#34D399" }} />
                <span style={{ marginLeft: 12, fontFamily: FONTS.mono, fontSize: "0.68rem", letterSpacing: "0.16em", color: cur.accent }}>{cur.tag}</span>
              </div>
              {/* Body */}
              <div style={{ padding: "26px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
                {cur.console.map((line, li) => (
                  <motion.div
                    key={li}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + li * 0.18, duration: 0.5 }}
                    style={{ fontFamily: FONTS.mono, fontSize: "0.78rem", lineHeight: 1.55, color: line.startsWith("$") ? COLORS.ice : cur.accent, whiteSpace: "pre-wrap" }}
                  >
                    {line}
                  </motion.div>
                ))}
                {/* Blinking caret */}
                <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.1, repeat: Infinity }} style={{ width: 8, height: 16, background: cur.accent, boxShadow: `0 0 12px ${cur.accent}` }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}