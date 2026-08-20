import React, { useState } from "react";

/**
 * SECTION 6 — The Multiplier Engine
 * -------------------------------------------------------------
 * Creative, High-Tech Editorial Architecture:
 * - Interactive 3-Stage Multiplier Core (Raw Input ➔ 30x Processing Core ➔ Fleet Output)
 * - Kinetic audio waveform visualizers, dynamic retention score telemetry
 * - Floating branded sub-page fleet badges & tri-platform syndication nodes
 * - Supports synchronized Dark Mode & Light Mode
 */

export default function MultiplierEngine({ isDark = false }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Retention Extraction",
      badge: "HOOK ENGINE",
      badgeBg: isDark ? "rgba(99, 102, 241, 0.15)" : "#EEF2FF",
      badgeColor: isDark ? "#A5B4FC" : "#4338CA",
      badgeBorder: isDark ? "rgba(99, 102, 241, 0.35)" : "#C7D2FE",
      stat: "94.8% Watch Time",
      description:
        "High-retention hooks, kinetic typography, dynamic pacing, and sonic sound design tailored for algorithmic amplification.",
      visualType: "waveform",
    },
    {
      number: "02",
      title: "Dedicated Page Fleet",
      badge: "FLEET INFRASTRUCTURE",
      badgeBg: isDark ? "rgba(244, 63, 94, 0.15)" : "#FFF1F2",
      badgeColor: isDark ? "#FDA4AF" : "#E11D48",
      badgeBorder: isDark ? "rgba(244, 63, 94, 0.35)" : "#FECDD3",
      stat: "30–120 Channels",
      description:
        "30 to 120 branded sub-pages managed, verified, and posted daily 100% autonomously by our in-house distribution fleet.",
      visualType: "fleet",
    },
    {
      number: "03",
      title: "Tri-Platform Syndication",
      badge: "ALGORITHMIC DISPATCH",
      badgeBg: isDark ? "rgba(34, 197, 94, 0.15)" : "#F0FDF4",
      badgeColor: isDark ? "#86EFAC" : "#15803D",
      badgeBorder: isDark ? "rgba(34, 197, 94, 0.35)" : "#BBF7D0",
      stat: "Shorts · Reels · TikTok",
      description:
        "Synchronized multi-channel publishing timed to algorithmic peaks across YouTube Shorts, Instagram Reels, and TikTok.",
      visualType: "platforms",
    },
  ];

  const verticals = [
    {
      icon: "👑",
      tag: "FOUNDERS & EXECS",
      multiplier: "30x Authority",
      tagColor: isDark ? "#93C5FD" : "#4A6BFF",
      tagBg: isDark ? "rgba(59, 130, 246, 0.15)" : "#EEF2FF",
      title: "Personal Brands",
      desc: "Turn keynotes and talks into daily industry authority without lifting a finger.",
    },
    {
      icon: "🎙️",
      tag: "PODCASTS & SHOWS",
      multiplier: "20+ Hooks / Ep",
      tagColor: isDark ? "#FDA4AF" : "#E11D48",
      tagBg: isDark ? "rgba(244, 63, 94, 0.15)" : "#FFF1F2",
      title: "Long-Form Shows",
      desc: "Dissect 60-min episodes into 20+ viral retention hooks for exponential discovery.",
    },
    {
      icon: "⚡",
      tag: "BRANDS & SAAS",
      multiplier: "Zero Ad Spend",
      tagColor: isDark ? "#C084FC" : "#7C3AED",
      tagBg: isDark ? "rgba(168, 85, 247, 0.15)" : "#F5F3FF",
      title: "Brands & SaaS",
      desc: "Harvest creator reviews and high-trust organic content into inbound customer pipeline.",
    },
  ];

  // Pure Seamless Paper Grain Texture
  const paperNoiseSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><filter id="paperGrain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.5 0"/></filter><rect width="100%" height="100%" filter="url(%23paperGrain)" opacity="0.6"/></svg>`;

  const lightBg = "linear-gradient(180deg, #6B8FFF 0%, #82A4FF 40%, #A4C3FF 70%, #C8DBFF 88%, #FED5CC 96%, #FDE8D0 100%)";
  const darkBg = "linear-gradient(180deg, #0A0A0E 0%, #0F172A 35%, #111827 70%, #1A1528 90%, #2A170A 100%)";

  return (
    <section
      id="multiplier-engine-section"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: isDark ? darkBg : lightBg,
        color: "#FFFFFF",
        padding: "54px 24px 50px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
        transition: "background 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <style>{`
        @keyframes waveBar {
          0%, 100% { height: 6px; }
          50% { height: 28px; }
        }
        @keyframes pulseGlowCore {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(255, 110, 0, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 35px rgba(255, 110, 0, 0.6); }
        }
      `}</style>

      {/* ── CRISP SEAMLESS PAPER FIBER GRAIN ──────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${paperNoiseSvg}")`,
          backgroundRepeat: "repeat",
          mixBlendMode: isDark ? "screen" : "overlay",
          pointerEvents: "none",
          zIndex: 1,
          opacity: isDark ? 0.45 : 0.85,
          transition: "opacity 0.45s ease",
        }}
      />

      {/* ── AMBIENT FLOATING BLURS ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "-50px",
          left: "-60px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: isDark ? "rgba(74, 107, 255, 0.12)" : "rgba(255, 255, 255, 0.22)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "-50px",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background: isDark ? "rgba(255, 110, 0, 0.14)" : "rgba(219, 234, 254, 0.3)",
          filter: "blur(65px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── SUBTLE BOTTOM EMBER GLOW ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "100px",
          background: isDark
            ? "linear-gradient(to top, rgba(255, 110, 0, 0.35) 0%, rgba(255, 110, 0, 0.08) 60%, transparent 100%)"
            : "linear-gradient(to top, rgba(255, 126, 103, 0.22) 0%, rgba(255, 126, 103, 0.06) 60%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── MAIN CONTAINER ──────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1140, width: "100%", margin: "0 auto" }}>
        
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.18)" : "rgba(255, 255, 255, 0.65)"}`,
              padding: "4px 14px",
              borderRadius: 999,
              marginBottom: 10,
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6E00" }} />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              The Multiplier Engine
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(1.9rem, 3.6vw, 2.9rem)",
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              margin: "0 auto 8px",
              maxWidth: 860,
              textShadow: "0 2px 12px rgba(0, 0, 0, 0.25)",
            }}
          >
            One single conversation.{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: isDark ? "#A78BFA" : "#3B1270", fontWeight: 600, position: "relative", zIndex: 10 }}>An autonomous fleet.</span>
              <svg
                viewBox="0 0 100 15"
                preserveAspectRatio="none"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "14px",
                  bottom: "-3px",
                  left: 0,
                  color: isDark ? "#A78BFA" : "#3B1270",
                  opacity: 0.85,
                  zIndex: 0,
                }}
              >
                <path
                  d="M 2 12 C 20 5, 35 14, 60 7 C 75 2, 88 11, 98 8"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(0.86rem, 1.15vw, 1rem)",
              color: isDark ? "#94A3B8" : "rgba(255, 255, 255, 0.95)",
              maxWidth: 660,
              margin: "0 auto",
              lineHeight: 1.5,
              fontWeight: 300,
            }}
          >
            Sit down once. We engineer a high-velocity 30 to 120 channel distribution network that reaches tens of millions monthly.
          </p>
        </div>

        {/* ── KINETIC MULTIPLIER INTERACTIVE HUB BANNER ─────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
            background: isDark ? "rgba(17, 24, 39, 0.88)" : "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.95)"}`,
            borderRadius: 20,
            padding: "24px 28px",
            marginBottom: 20,
            boxShadow: isDark
              ? "0 20px 45px -10px rgba(0, 0, 0, 0.6), 0 0 30px rgba(255, 110, 0, 0.08)"
              : "0 20px 45px -10px rgba(74, 107, 255, 0.14), 0 4px 16px rgba(0, 0, 0, 0.04)",
            color: isDark ? "#F8FAFC" : "#0F172A",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.45s ease",
          }}
        >
          {/* Card Surface Paper Texture */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("${paperNoiseSvg}")`,
              mixBlendMode: isDark ? "screen" : "multiply",
              opacity: isDark ? 0.12 : 0.18,
              pointerEvents: "none",
            }}
          />

          {/* Left Column: What YOU do (Raw Recording Node) */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: isDark ? "rgba(244, 63, 94, 0.15)" : "#FFF1F2", border: `1px solid ${isDark ? "rgba(244, 63, 94, 0.35)" : "#FECDD3"}`, padding: "3px 12px", borderRadius: 999, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E11D48" }} />
                <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: isDark ? "#FDA4AF" : "#E11D48" }}>
                  YOUR SINGLE INPUT
                </span>
              </div>
              
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.38rem",
                  color: isDark ? "#FFFFFF" : "#0F172A",
                  margin: "0 0 6px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                60-Minute Studio Recording
              </h3>

              <p style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "0.84rem", lineHeight: 1.5, margin: "0 0 14px" }}>
                You speak, teach, or interview. Zero editing, zero reviewing endless drafts, zero account logins.
              </p>
            </div>

            {/* Kinetic Audio Waveform Bars Simulation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: isDark ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.04)",
                padding: "8px 14px",
                borderRadius: 10,
                border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                width: "fit-content",
              }}
            >
              <span style={{ fontSize: "0.72rem", color: isDark ? "#A1A1AA" : "#64748B", fontWeight: 600, marginRight: 6 }}>AUDIO CAPTURE</span>
              {[12, 22, 16, 26, 14, 20, 24, 18, 28, 15, 22, 12].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: `${h}px`,
                    borderRadius: 2,
                    background: i % 2 === 0 ? "#FF6E00" : "#4A6BFF",
                    animation: `waveBar 1.2s infinite ease-in-out ${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: What NEXUS does (Autonomous Fleet Array) */}
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: isDark ? "rgba(99, 102, 241, 0.15)" : "#EEF2FF", border: `1px solid ${isDark ? "rgba(99, 102, 241, 0.35)" : "#C7D2FE"}`, padding: "3px 12px", borderRadius: 999, marginBottom: 8 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4A6BFF" }} />
                <span style={{ fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: isDark ? "#A5B4FC" : "#4A6BFF" }}>
                  THE NEXUS MULTIPLIER OUTPUT
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.38rem",
                  color: isDark ? "#FFFFFF" : "#0F172A",
                  margin: "0 0 6px",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                30–120 Branded Channel Fleet
              </h3>

              <p style={{ color: isDark ? "#94A3B8" : "#64748B", fontSize: "0.84rem", lineHeight: 1.5, margin: "0 0 14px" }}>
                Autonomous daily distribution across Shorts, Reels, and TikTok backed by guaranteed monthly view floors.
              </p>
            </div>

            {/* Live Fleet Channel Array Mockup */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                alignItems: "center",
              }}
            >
              {["@brand.highlights", "@brand.clips", "@brand.insights", "@brand.shorts"].map((handle, idx) => (
                <div
                  key={handle}
                  style={{
                    background: isDark ? "rgba(255, 255, 255, 0.06)" : "#FFFFFF",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "#E2E8F0"}`,
                    padding: "4px 10px",
                    borderRadius: 8,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: isDark ? "#E2E8F0" : "#334155",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#22C55E" }} />
                  {handle}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3-STEP PIPELINE CARDS (CREATIVE TELEMETRY) ─────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {steps.map((step, idx) => (
            <div
              key={step.number}
              onMouseEnter={() => setActiveStep(idx)}
              style={{
                background: isDark ? "rgba(17, 24, 39, 0.88)" : "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(14px)",
                border: activeStep === idx
                  ? `1.5px solid ${isDark ? "#818CF8" : "#4A6BFF"}`
                  : `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.9)"}`,
                borderRadius: 18,
                padding: "20px 22px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: isDark
                  ? "0 14px 32px -8px rgba(0, 0, 0, 0.55)"
                  : "0 14px 32px -8px rgba(74, 107, 255, 0.08)",
                color: isDark ? "#F8FAFC" : "#0F172A",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                transform: activeStep === idx ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              {/* Card texture overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("${paperNoiseSvg}")`,
                  mixBlendMode: isDark ? "screen" : "multiply",
                  opacity: isDark ? 0.1 : 0.15,
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <span
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "1.7rem",
                      fontWeight: 600,
                      color: isDark ? "#818CF8" : "#4A6BFF",
                      lineHeight: 1,
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{
                      background: step.badgeBg,
                      color: step.badgeColor,
                      border: `1px solid ${step.badgeBorder}`,
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "3px 9px",
                      borderRadius: 999,
                    }}
                  >
                    {step.badge}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    color: isDark ? "#FDE68A" : "#D97706",
                    marginBottom: 4,
                    letterSpacing: "0.02em",
                  }}
                >
                  ✦ {step.stat}
                </div>

                <h4 style={{ fontFamily: "Georgia, serif", fontSize: "1.12rem", color: isDark ? "#FFFFFF" : "#0F172A", margin: "2px 0 6px", fontWeight: 600 }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: "0.82rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.48, margin: 0 }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3 CONTENT VERTICALS (HOLOGRAPHIC TILES) ─────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 16,
          }}
        >
          {verticals.map((v) => (
            <div
              key={v.tag}
              style={{
                background: isDark ? "rgba(17, 24, 39, 0.85)" : "rgba(255, 255, 255, 0.92)",
                backdropFilter: "blur(14px)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.85)"}`,
                borderRadius: 16,
                padding: "18px 20px",
                boxShadow: isDark ? "0 10px 25px -8px rgba(0, 0, 0, 0.4)" : "0 10px 25px -8px rgba(74, 107, 255, 0.06)",
                color: isDark ? "#F8FAFC" : "#0F172A",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              {/* Card texture overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("${paperNoiseSvg}")`,
                  mixBlendMode: isDark ? "screen" : "multiply",
                  opacity: isDark ? 0.08 : 0.12,
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span
                    style={{
                      background: v.tagBg,
                      color: v.tagColor,
                      fontSize: "0.62rem",
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      padding: "3px 9px",
                      borderRadius: 999,
                      display: "inline-block",
                    }}
                  >
                    {v.icon} {v.tag}
                  </span>

                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#FF6E00" }}>
                    {v.multiplier}
                  </span>
                </div>

                <h4 style={{ fontFamily: "Georgia, serif", fontSize: "1.04rem", color: isDark ? "#FFFFFF" : "#0F172A", margin: "0 0 4px", fontWeight: 600 }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.45, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
