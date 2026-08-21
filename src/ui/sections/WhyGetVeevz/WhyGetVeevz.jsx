import React, { useEffect, useRef, useState } from "react";
import { X, Check, ShieldCheck, Zap, Network, Gauge, Workflow } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

const COMPARISON_ROWS = [
  {
    feature: "Primary Deliverable",
    editor: "Individual .mp4 files sent via Google Drive",
    veevz: "End-to-end multi-platform distribution engine with guaranteed views",
  },
  {
    feature: "Account Management",
    editor: "You must manually upload, schedule, and write captions",
    veevz: "100% autonomous posting across 30–120 dedicated brand satellite channels",
  },
  {
    feature: "Algorithmic Strategy",
    editor: "Basic visual cuts without retention optimization",
    veevz: "Engineered 3-second hook variations & algorithmic retention tuning",
  },
  {
    feature: "Cross-Platform Scale",
    editor: "Single feed output (often limited to your own main account)",
    veevz: "Simultaneous syndication across YouTube Shorts, Instagram Reels, and TikTok",
  },
  {
    feature: "Performance Telemetry",
    editor: "No analytics or tracking provided",
    veevz: "Live cross-network tracking dashboard with view floor monitoring",
  },
  {
    feature: "Creator Time Investment",
    editor: "Requires 10–15 hours/week of review, feedback, and uploads",
    veevz: "Zero ongoing operational friction — just hand over raw files",
  },
];

const PILLARS = [
  {
    icon: Network,
    title: "Managed Clipping Fleet",
    desc: "A proprietary fleet of satellite accounts amplifying your best moments daily without putting your main login at risk.",
  },
  {
    icon: Workflow,
    title: "Structured Execution",
    desc: "A repeatable ingestion-to-distribution pipeline delivering reliable, high-velocity output every single month.",
  },
  {
    icon: Gauge,
    title: "Real-Time Telemetry",
    desc: "Real-time tracking of hook velocity, retention curves, and algorithmic lifts to optimize every campaign.",
  },
];

export default function WhyGetVeevz() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-getveevz-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "130px 24px",
        overflow: "hidden",
        borderTop: `1px solid ${COLORS.borderSubtle}`,
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 820,
            margin: "0 auto 60px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.body,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: COLORS.sky,
              marginBottom: 16,
              background: "rgba(37, 99, 235, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "6px 14px",
              borderRadius: 999,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.sky }} />
            DISTRIBUTION VS. EDITING
          </div>

          <h2
            style={{
              fontFamily: FONTS.sans,
              fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: COLORS.ice,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            You're Not Hiring Another Video Editor.
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.95rem",
              color: COLORS.textMuted,
              marginTop: 14,
            }}
          >
            Video editors give you video files. GetVeevz builds the distribution infrastructure that guarantees your content actually travels.
          </p>
        </div>

        {/* COMPARISON MATRIX TABLE */}
        <div
          style={{
            background: "linear-gradient(160deg, rgba(17, 24, 39, 0.8) 0%, rgba(5, 5, 8, 0.95) 100%)",
            border: `1px solid ${COLORS.borderAccent}`,
            borderRadius: 24,
            padding: "36px",
            boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7)",
            marginBottom: 50,
            overflowX: "auto",
          }}
        >
          <div style={{ minWidth: "680px" }}>
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.3fr 1.6fr",
                paddingBottom: 18,
                borderBottom: `1px solid ${COLORS.borderSubtle}`,
                marginBottom: 12,
              }}
            >
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", color: COLORS.textMuted, textTransform: "uppercase" }}>
                Capability
              </div>
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(241, 245, 249, 0.45)", textTransform: "uppercase" }}>
                Typical Video Editor / Agency
              </div>
              <div style={{ fontFamily: FONTS.sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", color: COLORS.sky, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                <Zap size={14} color={COLORS.sky} />
                GetVeevz Distribution Engine
              </div>
            </div>

            {/* Rows */}
            {COMPARISON_ROWS.map((row, idx) => (
              <div
                key={idx}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.3fr 1.6fr",
                  alignItems: "center",
                  padding: "18px 0",
                  borderBottom: idx < COMPARISON_ROWS.length - 1 ? `1px solid rgba(241, 245, 249, 0.06)` : "none",
                  transition: "background 0.25s ease",
                }}
              >
                {/* Feature Name */}
                <div style={{ fontFamily: FONTS.sans, fontSize: "0.9rem", fontWeight: 600, color: COLORS.ice }}>
                  {row.feature}
                </div>

                {/* Editor Column */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, paddingRight: 16 }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(239, 68, 68, 0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <X size={12} color="#EF4444" />
                  </div>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.82rem", color: "rgba(241, 245, 249, 0.55)", lineHeight: 1.45 }}>
                    {row.editor}
                  </span>
                </div>

                {/* GetVeevz Column */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    background: "rgba(37, 99, 235, 0.08)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    borderRadius: 10,
                    padding: "10px 14px",
                  }}
                >
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(56, 189, 248, 0.25)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Check size={12} color={COLORS.sky} />
                  </div>
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.84rem", color: COLORS.ice, fontWeight: 500, lineHeight: 1.45 }}>
                    {row.veevz}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                style={{
                  background: "rgba(17, 24, 39, 0.6)",
                  border: `1px solid ${COLORS.borderSubtle}`,
                  borderRadius: 18,
                  padding: "26px 22px",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = COLORS.borderSubtle;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "rgba(37, 99, 235, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.sky,
                    marginBottom: 16,
                  }}
                >
                  <Icon size={22} />
                </div>
                <div style={{ fontFamily: FONTS.sans, fontSize: "1.1rem", fontWeight: 700, color: COLORS.ice, marginBottom: 8 }}>
                  {p.title}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.textMuted, lineHeight: 1.55 }}>
                  {p.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
