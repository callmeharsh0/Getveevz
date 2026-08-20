import React, { useState } from "react";

/**
 * SECTION 7 — Radical Transparency & Deliverables Matrix
 * -------------------------------------------------------------
 * Creative, High-Tech Deliverables Architecture:
 * - 4 Telemetry Bento Tiles with interactive metrics, asset reel bars, and fleet badges
 * - Official Contractual Bond / Guarantee Shield banner
 * - Glassmorphic Package Tiers with capacity progress indicators & direct CTAs
 * - Supports synchronized Dark Mode & Light Mode
 */

export default function SpecificationMatrix({ isDark = false }) {
  const [selectedTier, setSelectedTier] = useState("AUTHORITY");

  const deliverables = [
    {
      id: "fleet",
      icon: "🌐",
      badge: "FLEET INFRASTRUCTURE",
      badgeBg: isDark ? "rgba(99, 102, 241, 0.15)" : "#EEF2FF",
      badgeColor: isDark ? "#A5B4FC" : "#4338CA",
      badgeBorder: isDark ? "rgba(99, 102, 241, 0.35)" : "#C7D2FE",
      metric: "30–120",
      unit: "Dedicated Branded Pages",
      title: "Autonomous Fleet",
      desc: "Custom-branded satellite channels created, verified, and run 100% autonomously by our team.",
      telemetry: ["Verified Channel Setup", "Daily Autonomous Posting", "Zero Creator Login"],
    },
    {
      id: "views",
      icon: "🛡️",
      badge: "CONTRACTUAL GUARANTEE",
      badgeBg: isDark ? "rgba(244, 63, 94, 0.15)" : "#FFF1F2",
      badgeColor: isDark ? "#FDA4AF" : "#E11D48",
      badgeBorder: isDark ? "rgba(244, 63, 94, 0.35)" : "#FECDD3",
      metric: "40M–160M+",
      unit: "Contractual View Floor",
      title: "Guaranteed Exposure",
      desc: "If view floor targets are not met within 30 days, we continue distributing for free until fulfilled.",
      telemetry: ["100% Risk-Free Clause", "Algorithmic Pacing", "Historical 80M+ Avg"],
    },
    {
      id: "assets",
      icon: "⚡",
      badge: "PRODUCTION PIPELINE",
      badgeBg: isDark ? "rgba(34, 197, 94, 0.15)" : "#F0FDF4",
      badgeColor: isDark ? "#86EFAC" : "#15803D",
      badgeBorder: isDark ? "rgba(34, 197, 94, 0.35)" : "#BBF7D0",
      metric: "60–240+",
      unit: "High-Retention 9:16 Cuts",
      title: "Engineered Assets",
      desc: "Sound-designed vertical edits with dynamic captions, pacing, and viral thumbnail hooks.",
      telemetry: ["Kinetic Typography", "Sonic Sound Design", "Hook Multiplier Split"],
    },
    {
      id: "syndication",
      icon: "📡",
      badge: "CROSS-NETWORK",
      badgeBg: isDark ? "rgba(168, 85, 247, 0.15)" : "#F5F3FF",
      badgeColor: isDark ? "#C084FC" : "#7C3AED",
      badgeBorder: isDark ? "rgba(168, 85, 247, 0.35)" : "#DDD6FE",
      metric: "3 Major",
      unit: "Algorithmic Platforms",
      title: "Tri-Syndication Hub",
      desc: "Synchronized daily posting scheduled to peak watch times across Shorts, Reels, and TikTok.",
      telemetry: ["YouTube Shorts", "Instagram Reels", "TikTok Network"],
    },
  ];

  const packages = [
    {
      tier: "GROWTH",
      price: "₹12L",
      period: "/ mo",
      fleet: "30 Dedicated Pages",
      views: "40,000,000 Views Floor",
      output: "60+ Produced Assets / mo",
      desc: "For emerging personal brands expanding reach.",
    },
    {
      tier: "AUTHORITY",
      price: "₹24L",
      period: "/ mo",
      fleet: "60 Dedicated Pages",
      views: "80,000,000 Views Floor",
      output: "120+ Produced Assets / mo",
      desc: "For established podcasters and category leaders.",
      highlight: true,
    },
    {
      tier: "DOMINANCE",
      price: "₹48L",
      period: "/ mo",
      fleet: "120 Dedicated Pages",
      views: "160,000,000 Views Floor",
      output: "240+ Produced Assets / mo",
      desc: "For top-tier founders requiring market saturation.",
    },
  ];

  // Pure Seamless Paper Grain Texture
  const paperNoiseSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><filter id="paperGrain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.5 0"/></filter><rect width="100%" height="100%" filter="url(%23paperGrain)" opacity="0.6"/></svg>`;

  const lightBg = "linear-gradient(180deg, #6B8FFF 0%, #82A4FF 40%, #A4C3FF 70%, #C8DBFF 88%, #FED5CC 96%, #FDE8D0 100%)";
  const darkBg = "linear-gradient(180deg, #0A0A0E 0%, #0F172A 35%, #111827 70%, #1A1528 90%, #2A170A 100%)";

  return (
    <section
      id="specification-deliverables-page-5"
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
          right: "-60px",
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
          left: "-50px",
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
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FDE68A" }} />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#FFFFFF",
              }}
            >
              The Specification Matrix
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
            Radical transparency.{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ color: isDark ? "#A78BFA" : "#3B1270", fontWeight: 600, position: "relative", zIndex: 10 }}>Exactly what you get.</span>
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
            No gatekept deliverables. Discovery calls are for timelines—not discovering what is included.
          </p>
        </div>

        {/* ── 4-TILE TELEMETRY BENTO DELIVERABLES GRID ─────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {deliverables.map((item) => (
            <div
              key={item.id}
              style={{
                background: isDark ? "rgba(17, 24, 39, 0.88)" : "rgba(255, 255, 255, 0.94)",
                backdropFilter: "blur(14px)",
                border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.9)"}`,
                borderRadius: 18,
                padding: "20px 20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: isDark ? "0 14px 32px -8px rgba(0, 0, 0, 0.5)" : "0 14px 32px -8px rgba(74, 107, 255, 0.08)",
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
                  opacity: isDark ? 0.1 : 0.12,
                  pointerEvents: "none",
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span
                    style={{
                      background: item.badgeBg,
                      color: item.badgeColor,
                      border: `1px solid ${item.badgeBorder}`,
                      fontSize: "0.58rem",
                      fontWeight: 800,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      padding: "3px 9px",
                      borderRadius: 999,
                    }}
                  >
                    {item.badge}
                  </span>

                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                </div>

                <div
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: isDark ? "#FFFFFF" : "#0F172A",
                    lineHeight: 1,
                    marginBottom: 2,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.metric}
                </div>

                <div style={{ fontSize: "0.76rem", fontWeight: 700, color: isDark ? "#93C5FD" : "#4A6BFF", marginBottom: 8 }}>
                  {item.unit}
                </div>

                <p style={{ fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B", lineHeight: 1.45, margin: "0 0 12px" }}>
                  {item.desc}
                </p>

                {/* Telemetry Feature Pills */}
                <div style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`, paddingTop: 10, display: "flex", flexDirection: "column", gap: 5 }}>
                  {item.telemetry.map((t) => (
                    <div key={t} style={{ fontSize: "0.72rem", color: isDark ? "#CBD5E1" : "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: "#22C55E", fontWeight: 800 }}>✓</span> {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── OFFICIAL PERFORMANCE FLOOR GUARANTEE BOND ─────────── */}
        <div
          style={{
            background: isDark ? "rgba(20, 15, 28, 0.94)" : "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(18px)",
            border: isDark ? "1.5px solid rgba(244, 63, 94, 0.45)" : "1.5px solid #FECDD3",
            borderRadius: 18,
            padding: "20px 26px",
            textAlign: "center",
            marginBottom: 20,
            boxShadow: isDark
              ? "0 16px 40px -8px rgba(0, 0, 0, 0.6), 0 0 25px rgba(244, 63, 94, 0.12)"
              : "0 16px 40px -8px rgba(74, 107, 255, 0.08)",
            color: isDark ? "#F8FAFC" : "#0F172A",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.45s ease",
          }}
        >
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
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: isDark ? "rgba(244, 63, 94, 0.15)" : "#FFF1F2", border: `1px solid ${isDark ? "rgba(244, 63, 94, 0.35)" : "#FECDD3"}`, padding: "3px 12px", borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E11D48" }} />
              <span style={{ fontSize: "0.64rem", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: isDark ? "#FDA4AF" : "#E11D48" }}>
                100% CONTRACTUAL PERFORMANCE FLOOR GUARANTEE
              </span>
            </div>

            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.2rem",
                color: isDark ? "#FFFFFF" : "#0F172A",
                margin: "0 auto 6px",
                maxWidth: 780,
                fontWeight: 400,
                lineHeight: 1.35,
              }}
            >
              If your contracted view floor is not fulfilled in 30 days, distribution continues{" "}
              <span style={{ fontStyle: "italic", color: isDark ? "#FDA4AF" : "#E11D48", fontWeight: 600 }}>at zero additional cost</span> until 100% delivered.
            </h3>
            <p style={{ fontSize: "0.8rem", color: isDark ? "#94A3B8" : "#64748B", margin: 0 }}>
              Conservative contractual minimums · Average client achieves 80M–150M+ views per month.
            </p>
          </div>
        </div>

        {/* ── PACKAGE REFERENCE TIERS ─────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {packages.map((pkg) => {
            const isSelected = selectedTier === pkg.tier;
            return (
              <div
                key={pkg.tier}
                onClick={() => setSelectedTier(pkg.tier)}
                style={{
                  background: pkg.highlight
                    ? isDark
                      ? "linear-gradient(180deg, #1E1B4B 0%, #0F172A 100%)"
                      : "linear-gradient(180deg, #FFFFFF 0%, #EEF2FF 100%)"
                    : isDark
                      ? "rgba(17, 24, 39, 0.85)"
                      : "rgba(255, 255, 255, 0.94)",
                  backdropFilter: "blur(14px)",
                  border: pkg.highlight
                    ? isDark
                      ? "2px solid #818CF8"
                      : "2px solid #4A6BFF"
                    : isDark
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid rgba(255, 255, 255, 0.85)",
                  borderRadius: 18,
                  padding: "22px 22px",
                  position: "relative",
                  boxShadow: pkg.highlight
                    ? isDark
                      ? "0 18px 40px -8px rgba(99, 102, 241, 0.35)"
                      : "0 18px 40px -8px rgba(74, 107, 255, 0.18)"
                    : isDark
                      ? "0 10px 25px -8px rgba(0, 0, 0, 0.4)"
                      : "0 10px 25px -8px rgba(74, 107, 255, 0.06)",
                  color: isDark ? "#F8FAFC" : "#0F172A",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
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
                  {pkg.highlight && (
                    <span
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: isDark ? "#6366F1" : "#4A6BFF",
                        color: "#FFFFFF",
                        fontSize: "0.6rem",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "3px 12px",
                        borderRadius: 999,
                        boxShadow: isDark ? "0 2px 10px rgba(99, 102, 241, 0.5)" : "0 2px 8px rgba(74, 107, 255, 0.35)",
                      }}
                    >
                      RECOMMENDED TIER
                    </span>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                    <span style={{ fontSize: "0.74rem", letterSpacing: "0.15em", textTransform: "uppercase", color: pkg.highlight ? (isDark ? "#A5B4FC" : "#4A6BFF") : (isDark ? "#94A3B8" : "#64748B"), fontWeight: 800 }}>
                      {pkg.tier}
                    </span>
                    <div>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", fontWeight: 700, color: isDark ? "#FFFFFF" : "#0F172A" }}>
                        {pkg.price}
                      </span>
                      <span style={{ fontSize: "0.76rem", color: isDark ? "#94A3B8" : "#64748B" }}>{pkg.period}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.78rem", color: isDark ? "#94A3B8" : "#64748B", margin: "0 0 12px" }}>
                    {pkg.desc}
                  </p>

                  <div style={{ borderTop: `1px solid ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(226, 232, 240, 0.9)"}`, paddingTop: 12, display: "flex", flexDirection: "column", gap: 7 }}>
                    <div style={{ fontSize: "0.8rem", color: isDark ? "#CBD5E1" : "#334155" }}>
                      <span style={{ color: isDark ? "#818CF8" : "#4A6BFF", marginRight: 6, fontWeight: 700 }}>✓</span> <strong>{pkg.fleet}</strong>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: isDark ? "#CBD5E1" : "#334155" }}>
                      <span style={{ color: isDark ? "#818CF8" : "#4A6BFF", marginRight: 6, fontWeight: 700 }}>✓</span> <strong>{pkg.views}</strong>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: isDark ? "#CBD5E1" : "#334155" }}>
                      <span style={{ color: isDark ? "#818CF8" : "#4A6BFF", marginRight: 6, fontWeight: 700 }}>✓</span> <strong>{pkg.output}</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
