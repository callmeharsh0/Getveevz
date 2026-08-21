import React, { useState, useEffect, useRef } from "react";
import { UploadCloud, Cpu, Radio, BarChart3, CheckCircle2, ChevronRight } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

const STEPS = [
  {
    num: "01",
    title: "Give Us Your Content",
    subtitle: "Zero filming extra sessions required",
    icon: UploadCloud,
    tag: "RAW INGESTION",
    description: "Provide your existing long-form video, podcast episodes, webinar recordings, keynotes, or executive interviews. A simple link or drive folder is all we need.",
    deliverables: ["Supports any video format or length", "Automatic audio transcription & indexing", "Secure enterprise cloud ingestion"],
    mockVisual: {
      header: "RAW INGESTION ENGINE",
      items: ["🎙️ Episode_48_RawMaster.mov (01:14:22)", "📹 Keynote_SanFrancisco_2026.mp4 (00:46:15)", "💻 Product_Masterclass_Recording.mkv (01:02:10)"],
      status: "Ingested & Processed: 3 Files Ready",
    },
  },
  {
    num: "02",
    title: "We Build the Campaign",
    subtitle: "Algorithmic Hook Engineering",
    icon: Cpu,
    tag: "PROCESSING CORE",
    description: "Our team extracts high-retention moments, crafts kinetic 9:16 vertical cuts, writes platform-native hooks, and sets up your dedicated channel distribution fleet.",
    deliverables: ["20–60+ engineered short-form assets", "Custom sound design & typography", "Channel fleet branding & warmup"],
    mockVisual: {
      header: "HOOK EXTRACTION & PACKAGING",
      items: ["⚡ Hook 1: 'The $10M Distribution Secret' (0:34)", "⚡ Hook 2: 'Why 99% of Content Dies' (0:48)", "⚡ Hook 3: 'How to 10x Inbound Flow' (0:42)"],
      status: "34 High-Retention Cuts Generated",
    },
  },
  {
    num: "03",
    title: "Clips Go Live",
    subtitle: "Synchronized Tri-Platform Flood",
    icon: Radio,
    tag: "DISTRIBUTION DISPATCH",
    description: "Your clips go live across YouTube Shorts, Instagram Reels, and TikTok via your main brand and dedicated satellite channels at peak engagement windows.",
    deliverables: ["Coordinated daily publishing waves", "Algorithmic engagement optimization", "Zero manual creator management"],
    mockVisual: {
      header: "MULTI-CHANNEL DISPATCH",
      items: ["🔴 YouTube Shorts: 4 Posts Scheduled Today", "🟣 Instagram Reels: 6 Posts Scheduled Today", "⚫ TikTok Network: 8 Posts Scheduled Today"],
      status: "Live Syndication Active (30+ Channels)",
    },
  },
  {
    num: "04",
    title: "Track & Optimize",
    subtitle: "Real-Time Telemetry & Scaling",
    icon: BarChart3,
    tag: "SCALE MATRIX",
    description: "We analyze watch time, retention drop-offs, and algorithmic triggers to double down on viral angles and guarantee your content hits the audience it deserves.",
    deliverables: ["Real-time aggregated view analytics", "Continuous hook iteration loops", "Monthly scale expansion reports"],
    mockVisual: {
      header: "LIVE PERFORMANCE TELEMETRY",
      items: ["📈 Total Reach: 18.4M Views (Last 30 Days)", "🔥 Top Performing Clip: 4.8M Views", "🎯 Retention Rate: 96.2% Avg 3-Second Hook"],
      status: "Optimization Loop: 3.4x Reach Velocity",
    },
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cur = STEPS[activeStep];

  return (
    <section
      id="how-it-works-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "120px 24px",
        overflow: "hidden",
        borderTop: `1px solid ${COLORS.borderSubtle}`,
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "750px",
          height: "450px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, rgba(56, 189, 248, 0.03) 60%, transparent 80%)",
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
            margin: "0 auto 70px",
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
            TURNKEY EXECUTION
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
            From Content to Distribution Without Building the Operation Yourself
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.95rem",
              color: COLORS.textMuted,
              marginTop: 14,
            }}
          >
            A high-velocity, 4-step pipeline that turns raw recordings into continuous omni-channel attention.
          </p>
        </div>

        {/* 4 Step Selectors Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
            marginBottom: 40,
          }}
        >
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === idx;

            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(idx)}
                style={{
                  background: isActive
                    ? "linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(17, 24, 39, 0.8) 100%)"
                    : "rgba(17, 24, 39, 0.6)",
                  border: isActive ? `1px solid ${COLORS.sky}` : `1px solid ${COLORS.borderSubtle}`,
                  borderRadius: 14,
                  padding: "18px 20px",
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: isActive ? "0 8px 25px rgba(37, 99, 235, 0.25)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                    e.currentTarget.style.background = "rgba(17, 24, 39, 0.9)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = COLORS.borderSubtle;
                    e.currentTarget.style.background = "rgba(17, 24, 39, 0.6)";
                  }
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: isActive ? COLORS.sky : "rgba(241, 245, 249, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? COLORS.obsidian : COLORS.ice,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: isActive ? COLORS.sky : "rgba(241, 245, 249, 0.4)",
                    }}
                  >
                    STEP {step.num}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "0.92rem",
                      fontWeight: 600,
                      color: COLORS.ice,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {step.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card + Interactive Visual Pane */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 28,
            background: "linear-gradient(160deg, rgba(17, 24, 39, 0.7) 0%, rgba(5, 5, 8, 0.9) 100%)",
            border: `1px solid ${COLORS.borderAccent}`,
            borderRadius: 24,
            padding: "40px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Left Details */}
          <div>
            <div
              style={{
                display: "inline-block",
                fontFamily: FONTS.sans,
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.sky,
                background: "rgba(37, 99, 235, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                padding: "4px 12px",
                borderRadius: 6,
                marginBottom: 16,
              }}
            >
              {cur.tag}
            </div>

            <h3
              style={{
                fontFamily: FONTS.sans,
                fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: COLORS.ice,
                margin: "0 0 6px",
              }}
            >
              {cur.title}
            </h3>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "0.92rem",
                fontWeight: 500,
                color: COLORS.sky,
                marginBottom: 18,
              }}
            >
              {cur.subtitle}
            </p>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "0.92rem",
                color: COLORS.textMuted,
                lineHeight: 1.65,
                marginBottom: 28,
              }}
            >
              {cur.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cur.deliverables.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <CheckCircle2 size={18} color={COLORS.sky} />
                  <span style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.ice }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Simulation Console */}
          <div
            style={{
              background: "rgba(5, 5, 8, 0.8)",
              border: `1px solid rgba(56, 189, 248, 0.25)`,
              borderRadius: 16,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "inset 0 0 25px rgba(37, 99, 235, 0.1)",
            }}
          >
            {/* Terminal Header */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 14,
                  borderBottom: `1px solid ${COLORS.borderSubtle}`,
                  marginBottom: 18,
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.body,
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: COLORS.sky,
                    textTransform: "uppercase",
                  }}
                >
                  {cur.mockVisual.header}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B" }} />
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
                </div>
              </div>

              {/* Items List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {cur.mockVisual.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(17, 24, 39, 0.6)",
                      border: `1px solid ${COLORS.borderSubtle}`,
                      borderRadius: 8,
                      padding: "12px 14px",
                      fontFamily: "monospace",
                      fontSize: "0.8rem",
                      color: COLORS.ice,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <ChevronRight size={14} color={COLORS.sky} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Footer */}
            <div
              style={{
                marginTop: 20,
                padding: "12px 16px",
                background: "rgba(37, 99, 235, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 10px #10B981" }} />
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: COLORS.sky,
                }}
              >
                {cur.mockVisual.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
