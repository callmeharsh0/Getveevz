import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONTS } from "../../../utils/theme";

const CLIENT_LOGOS = [
  { name: "Apex Media", symbol: "◆ APEX" },
  { name: "FounderPod", symbol: "● FOUNDERPOD" },
  { name: "ScaleVentures", symbol: "▲ SCALE VENTURES" },
  { name: "HyperGrowth", symbol: "✕ HYPERGROWTH" },
  { name: "OmniChannel", symbol: "✦ OMNI MEDIA" },
  { name: "Vortex Labs", symbol: "◈ VORTEX" },
  { name: "Catalyst TV", symbol: "◼ CATALYST" },
  { name: "Syndicate", symbol: "⬡ SYNDICATE" },
];

const STATS = [
  { value: 240, suffix: "M+", label: "Views Distributed", desc: "Aggregated organic reach across short-form platforms" },
  { value: 1800, suffix: "+", label: "Clips Syndicated", desc: "High-retention vertical edits distributed" },
  { value: 94.8, suffix: "%", label: "Average Watch Time", desc: "Optimized hook retention & algorithmic lift", isFloat: true },
  { value: 120, suffix: "+", label: "Managed Channels", desc: "Autonomous brand satellite fleet active daily" },
];

export default function ProofMarquee() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const start = performance.now();

    const frame = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        STATS.map((s) => {
          if (s.isFloat) {
            return +(s.value * eased).toFixed(1);
          }
          return Math.floor(s.value * eased);
        })
      );

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [inView]);

  return (
    <div
      id="proof-stats-bar"
      ref={sectionRef}
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "70px 24px 80px",
        overflow: "hidden",
        borderTop: `1px solid ${COLORS.borderSubtle}`,
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
      }}
    >
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: 200%;
          animation: marqueeScroll 28s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient Cobalt Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "280px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Eyebrow and Headline */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.body,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: COLORS.sky,
              marginBottom: 12,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.cobalt }} />
            DISTRIBUTION INFRASTRUCTURE
          </div>
          <h2
            style={{
              fontFamily: FONTS.sans,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              color: COLORS.ice,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Built to Distribute Content at Scale
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.95rem",
              color: COLORS.textMuted,
              marginTop: 10,
              maxWidth: 580,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Data-driven short-form distribution engine trusted by leading creators, podcasts, and executives.
          </p>
        </div>

        {/* LOGO MARQUEE STRIP */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "20px 0",
            marginBottom: 60,
            maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div className="marquee-track">
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
              <div
                key={i}
                style={{
                  flex: "0 0 auto",
                  padding: "0 40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: FONTS.sans,
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    color: "rgba(241, 245, 249, 0.45)",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLORS.sky;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(241, 245, 249, 0.45)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {logo.symbol}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ANIMATED STAT COUNTERS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              style={{
                background: "linear-gradient(145deg, rgba(17, 24, 39, 0.8) 0%, rgba(5, 5, 8, 0.9) 100%)",
                border: `1px solid ${COLORS.borderSubtle}`,
                borderRadius: 16,
                padding: "28px 24px",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 14px 35px -8px rgba(37, 99, 235, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.borderSubtle;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Shard decorative corner mark */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, transparent 50%, rgba(37, 99, 235, 0.3) 100%)",
                }}
              />

              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: "clamp(2.2rem, 3.5vw, 3rem)",
                  fontWeight: 800,
                  color: COLORS.ice,
                  lineHeight: 1.1,
                  display: "flex",
                  alignItems: "baseline",
                  gap: 2,
                }}
              >
                <span>{counts[i]}</span>
                <span
                  style={{
                    background: "linear-gradient(135deg, #2563EB, #38BDF8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontSize: "0.85em",
                  }}
                >
                  {stat.suffix}
                </span>
              </div>

              <div
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  color: COLORS.ice,
                  marginTop: 8,
                }}
              >
                {stat.label}
              </div>

              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "0.78rem",
                  color: COLORS.textMuted,
                  marginTop: 6,
                  lineHeight: 1.45,
                }}
              >
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
