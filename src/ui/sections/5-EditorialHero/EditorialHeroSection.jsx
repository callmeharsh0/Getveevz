import React, { useState } from "react";
import { COLORS } from "../../../utils/theme";

/**
 * SECTION 5 — Editorial Hero (Untold-Style Statement Page)
 * -------------------------------------------------------------
 * Dynamic Statement:
 * "we [1-HR RAW] scale [PORTAL DOODLE]"
 * "your voice"
 * "( [30-120 FLEET POLAROID STACK] ) everywhere"
 * 
 * Meaning: "We scale your voice everywhere."
 * - Rebranded to GetVeevz Cobalt/Sky/Midnight design
 */

export default function EditorialHeroSection({ isDark: parentIsDark, setIsDark: parentSetIsDark }) {
  const [isHovered, setIsHovered] = useState(false);
  const [localIsDark, setLocalIsDark] = useState(true);

  const isDark = parentIsDark !== undefined ? parentIsDark : localIsDark;
  const toggleTheme = () => {
    if (parentSetIsDark) {
      parentSetIsDark(!isDark);
    } else {
      setLocalIsDark(!isDark);
    }
  };

  // High-Definition Paper Texture
  const paperNoiseSvg = `data:image/svg+xml;utf8,<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg"><filter id="paperGrain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0.33 0.33 0.33 0 0  0 0 0 0.5 0"/></filter><rect width="100%" height="100%" filter="url(%23paperGrain)" opacity="0.45"/></svg>`;

  const scrollToNext = () => {
    const el = document.getElementById("multiplier-engine-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic Theme Colors in Cobalt / Sky / Midnight System
  const theme = {
    bg: isDark ? "#050508" : "#0f172a",
    text: "#F1F5F9",
    muted: "#94A3B8",
    footnote: "#CBD5E1",
    parenthesis: "#E2E8F0",
    accent: "#38BDF8",
    doorStroke: "#E2E8F0",
    figureStroke: "#F1F5F9",
    figureFill: isDark ? "#050508" : "#0f172a",
    rulerLine: "rgba(255, 255, 255, 0.03)",
    blendMode: "screen",
    grainOpacity: 0.28,
  };

  return (
    <section
      id="editorial-hero-section"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: theme.bg,
        color: theme.text,
        padding: "50px 48px 45px",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
        transition: "background 0.45s cubic-bezier(0.22, 1, 0.36, 1), color 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <style>{`
        @keyframes pulseAsterisk {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.15) rotate(12deg); }
        }
        @keyframes floatPolaroid {
          0%, 100% { transform: rotate(-2deg) translateY(0px); }
          50% { transform: rotate(-2deg) translateY(-6px); }
        }
      `}</style>

      {/* ── CRISP SEAMLESS PAPER FIBER GRAIN ──────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${paperNoiseSvg}")`,
          backgroundRepeat: "repeat",
          mixBlendMode: theme.blendMode,
          pointerEvents: "none",
          zIndex: 1,
          opacity: theme.grainOpacity,
          transition: "opacity 0.45s ease",
        }}
      />

      {/* ── AMBIENT MIDNIGHT & COBALT GLOW ───────────── */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "30%",
          width: "550px",
          height: "550px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(56, 189, 248, 0.05) 50%, transparent 80%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── FAINT PAPER HORIZONTAL RULER SKETCH LINES ─────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(to bottom, transparent 96%, ${theme.rulerLine} 100%)`,
          backgroundSize: "100% 48px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── MAIN CONTENT WRAPPER ──────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: 1380,
          width: "100%",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        {/* ── TOP HEADER ROW: EYEBROW + THEME INDICATOR ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: 24,
          }}
        >
          {/* Eyebrow Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: COLORS.sky,
              transition: "color 0.3s ease",
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.sky }} />
            CONTENT MULTIPLICATION ENGINE // GETVEEVZ
          </div>

          {/* ── LUXURY DARK MODE TOGGLE BUTTON ──────────────────── */}
          <button
            onClick={toggleTheme}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(37, 99, 235, 0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              borderRadius: 999,
              padding: "6px 14px 6px 8px",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(37, 99, 235, 0.2)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.borderColor = COLORS.sky;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.35)";
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "0.76rem",
                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.5)",
              }}
            >
              ⚡
            </div>

            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: COLORS.ice,
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              ENGINE ACTIVE
            </span>
          </button>
        </div>

        {/* LINE 1: "we [1-HR RAW] scale [PORTAL DOODLE]" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(3.8rem, 8.8vw, 8.8rem)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
            color: theme.text,
            marginBottom: "0px",
            transition: "color 0.45s ease",
          }}
        >
          <span>we</span>

          {/* ── INLINE FLOATING 1-HR RAW CARD WITH BLUE ASTERISK ── */}
          <div
            style={{
              display: "inline-flex",
              position: "relative",
              width: "clamp(130px, 16vw, 240px)",
              height: "clamp(68px, 8.5vw, 126px)",
              borderRadius: 14,
              overflow: "hidden",
              background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
              boxShadow: "0 18px 40px -8px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(56, 189, 248, 0.35)",
              verticalAlign: "middle",
              margin: "0 clamp(12px, 1.8vw, 24px)",
              cursor: "pointer",
              transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
              transform: isHovered ? "scale(1.04) rotate(0deg)" : "rotate(-1deg)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Luminous Cobalt / Sky particle glow */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 35% 35%, #38BDF8 0%, #2563EB 50%, #1E1B4B 90%)",
                opacity: 0.92,
                mixBlendMode: "screen",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)",
              }}
            />

            {/* Glowing Sky Asterisk Badge */}
            <span
              style={{
                position: "absolute",
                top: "clamp(6px, 1vw, 12px)",
                left: "clamp(8px, 1.2vw, 16px)",
                fontSize: "clamp(1.4rem, 2.2vw, 2.4rem)",
                color: "#38BDF8",
                fontWeight: 900,
                lineHeight: 1,
                textShadow: "0 0 16px rgba(56, 189, 248, 0.9)",
                animation: "pulseAsterisk 3s infinite",
              }}
            >
              *
            </span>

            {/* Live 1-Hr Input Mockup Badge */}
            <div
              style={{
                position: "absolute",
                bottom: 8,
                left: 12,
                right: 12,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: "#FFFFFF",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              <span>🎙️ 1-HR RAW</span>
              <span style={{ color: "#7DD3FC" }}>00:59:40</span>
            </div>
          </div>

          <span>scale</span>

          {/* ── VIRAL PORTAL ILLUSTRATION IN COBALT ── */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "clamp(60px, 7vw, 100px)",
              height: "clamp(80px, 9.5vw, 140px)",
              position: "relative",
              verticalAlign: "middle",
              marginLeft: "clamp(12px, 1.8vw, 24px)",
            }}
          >
            <svg viewBox="0 0 70 100" width="100%" height="100%" fill="none">
              <path d="M48 10L50 6L52 10L56 12L52 14L50 18L48 14L44 12L48 10Z" fill={theme.doorStroke} />
              <circle cx="38" cy="14" r="1.5" fill="#38BDF8" />
              <circle cx="58" cy="20" r="1.2" fill="#38BDF8" />

              <rect x="8" y="18" width="52" height="78" rx="2" stroke={theme.doorStroke} strokeWidth="2" strokeDasharray="3 3" />
              <path d="M8 18L42 28V90L8 96V18Z" fill="#2563EB" fillOpacity="0.85" stroke={theme.doorStroke} strokeWidth="2.4" />

              <circle cx="28" cy="46" r="5" stroke={theme.figureStroke} strokeWidth="2.2" fill={theme.figureFill} />
              <path d="M28 51V68" stroke={theme.figureStroke} strokeWidth="2.2" strokeLinecap="round" />
              <path d="M20 58L28 54L36 58" stroke={theme.figureStroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 80L28 68L34 80" stroke={theme.figureStroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* LINE 2: "your voice" */}
        <div
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(3.8rem, 8.8vw, 8.8rem)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.045em",
            color: theme.text,
            margin: "0 0 0 16%",
            transition: "color 0.45s ease",
          }}
        >
          your voice
        </div>

        {/* LINE 3: "( [TILTED POLAROID CARD STACK] ) everywhere" + FOOTNOTE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: "20px 48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "nowrap",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(3.8rem, 8.8vw, 8.8rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.045em",
              color: theme.text,
              transition: "color 0.45s ease",
            }}
          >
            {/* Opening Parenthesis */}
            <span style={{ fontSize: "1.05em", fontWeight: 300, color: theme.parenthesis, marginRight: -2 }}>(</span>

            {/* ── TILTED POLAROID CARD STACK ────────── */}
            <div
              style={{
                position: "relative",
                width: "clamp(100px, 12vw, 160px)",
                height: "clamp(115px, 13.5vw, 180px)",
                margin: "0 clamp(10px, 1.5vw, 20px)",
                display: "inline-block",
                verticalAlign: "middle",
              }}
            >
              {/* Back Polaroid: 30-120 Pages */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#111827",
                  borderRadius: 10,
                  border: "1px solid rgba(56, 189, 248, 0.25)",
                  boxShadow: "0 10px 24px rgba(0, 0, 0, 0.4)",
                  transform: "rotate(-12deg) translate(-10px, 6px)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px",
                  zIndex: 1,
                }}
              >
                <div style={{ flex: 1, background: "rgba(37, 99, 235, 0.2)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 800, color: "#38BDF8" }}>30–120</span>
                </div>
                <div style={{ fontSize: "0.48rem", fontWeight: 700, color: "#94A3B8", marginTop: 4, textAlign: "center" }}>FLEET</div>
              </div>

              {/* Middle Polaroid: Multi-Million Views */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, #2563EB, #38BDF8)",
                  borderRadius: 10,
                  boxShadow: "0 14px 30px rgba(37, 99, 235, 0.45)",
                  transform: "rotate(6deg) translate(8px, -4px)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px",
                  zIndex: 2,
                  color: "#FFFFFF",
                }}
              >
                <div style={{ flex: 1, background: "rgba(0,0,0,0.2)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "0.62rem", fontWeight: 800 }}>40M+</span>
                </div>
                <div style={{ fontSize: "0.48rem", fontWeight: 700, marginTop: 4, textAlign: "center" }}>VIEWS</div>
              </div>

              {/* Front Main Polaroid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#050508",
                  borderRadius: 10,
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  boxShadow: "0 18px 40px rgba(0, 0, 0, 0.6)",
                  transform: "rotate(-2deg)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "8px",
                  zIndex: 3,
                  cursor: "pointer",
                  animation: "floatPolaroid 5s ease-in-out infinite",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    background: "linear-gradient(135deg, #0c162d 0%, #1e293b 50%, #2563EB 100%)",
                    borderRadius: 6,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: 6,
                  }}
                >
                  <div style={{ display: "flex", gap: 4, opacity: 0.95 }}>
                    <div style={{ width: 14, height: 32, borderRadius: "8px 8px 0 0", background: "#050508" }} />
                    <div style={{ width: 18, height: 42, borderRadius: "9px 9px 0 0", background: "#050508" }} />
                    <div style={{ width: 15, height: 36, borderRadius: "8px 8px 0 0", background: "#050508" }} />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.5rem",
                    fontWeight: 800,
                    color: "#38BDF8",
                    marginTop: 4,
                    textAlign: "center",
                    letterSpacing: "0.08em",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  FLEET SYNDICATION
                </div>
              </div>
            </div>

            {/* Closing Parenthesis */}
            <span style={{ fontSize: "1.05em", fontWeight: 300, color: theme.parenthesis, marginLeft: -2 }}>(</span>

            <span>everywhere</span>
          </div>

          {/* ── RIGHT-SIDE PROJECT-SPECIFIC FOOTNOTE ─────────────── */}
          <div
            style={{
              maxWidth: 380,
              fontSize: "clamp(0.82rem, 0.98vw, 0.92rem)",
              lineHeight: 1.6,
              color: theme.footnote,
              fontFamily: "'Outfit', 'Inter', sans-serif",
              fontWeight: 400,
              borderLeft: "2px solid #38BDF8",
              paddingLeft: 14,
              transition: "color 0.45s ease",
            }}
          >
            <span style={{ color: "#38BDF8", fontWeight: 700, marginRight: 6 }}>(*)</span>
            You record for 60 minutes. GetVeevz extracts the highest-impact moments, manages 30 to 120 dedicated brand satellite channels, and orchestrates large-scale cross-platform distribution.
          </div>
        </div>

        {/* ── BOTTOM CONTROLS ─────────────── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: 48,
          }}
        >
          {/* Cobalt Pill Button */}
          <button
            onClick={scrollToNext}
            style={{
              background: "linear-gradient(135deg, #2563EB, #38BDF8)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              padding: "13px 26px",
              fontSize: "0.78rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 8px 22px rgba(37, 99, 235, 0.45)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 12px 28px rgba(56, 189, 248, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(37, 99, 235, 0.45)";
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FFFFFF" }} />
            EXPLORE THE MULTIPLIER ENGINE
          </button>

          {/* Minimalist Center Target Indicator */}
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              border: "1.5px solid rgba(56, 189, 248, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#38BDF8" }} />
          </div>

          {/* Right-aligned Vertical "SCROLL TO DISCOVER" */}
          <div
            onClick={scrollToNext}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: COLORS.sky,
              cursor: "pointer",
              transition: "color 0.3s ease",
            }}
          >
            <span>SCROLL TO DISCOVER</span>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "1.5px solid #38BDF8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                color: "#38BDF8",
              }}
            >
              ↓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
