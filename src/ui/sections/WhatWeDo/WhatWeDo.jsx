import React, { useEffect, useRef, useState } from "react";
import { Scissors, Share2, Layers, LineChart, ArrowRight } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

const PILLARS = [
  {
    id: "clipping",
    num: "01",
    icon: Scissors,
    title: "Clipping",
    tagline: "High-Retention Moment Extraction",
    description: "We dissect hours of raw footage to extract high-leverage hooks, optimized for algorithmic watch-time and retention.",
    points: ["Algorithmic Hook Engineering", "Dynamic 9:16 Kinetic Typography", "Retention Curve Pacing", "Sonic Sound Design"],
  },
  {
    id: "distribution",
    num: "02",
    icon: Share2,
    title: "Distribution",
    tagline: "Multi-Platform Syndication",
    description: "Your clips are syndicated across YouTube Shorts, Instagram Reels, and TikTok at peak algorithmic engagement windows.",
    points: ["Synchronized Tri-Platform Posting", "Autonomous Account Management", "Hashtag & Metadata Tuning", "Platform-Native Formatting"],
  },
  {
    id: "campaign-management",
    num: "03",
    icon: Layers,
    title: "Campaign Management",
    tagline: "Fleet Infrastructure & Execution",
    description: "We deploy and manage 30 to 120 dedicated brand satellite accounts to flood feeds without requiring creator logins.",
    points: ["30–120 Branded Channel Fleet", "Zero Creator Login Friction", "Coordinated Narrative Waves", "Algorithmic Warmup Protocol"],
  },
  {
    id: "tracking",
    num: "04",
    icon: LineChart,
    title: "Tracking",
    tagline: "Real-Time Telemetry & Optimization",
    description: "Live analytics monitor view volume, audience retention spikes, and cross-channel performance to continuously scale winners.",
    points: ["Cross-Platform Analytics Hub", "Real-Time View Floor Telemetry", "Audience Engagement Heatmaps", "Iterative Content Optimization"],
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="what-we-do-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: `linear-gradient(180deg, ${COLORS.obsidian} 0%, ${COLORS.midnight} 50%, ${COLORS.obsidian} 100%)`,
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      {/* Background Mesh Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: "550px",
          height: "550px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(56, 189, 248, 0.03) 50%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "5%",
          width: "450px",
          height: "450px",
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header Block */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 780,
            margin: "0 auto 70px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
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
            CORE CAPABILITIES
          </div>

          <h2
            style={{
              fontFamily: FONTS.sans,
              fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: COLORS.ice,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              margin: "0 0 18px",
            }}
          >
            Everything You Need to Turn Content Into Distribution
          </h2>

          {/* Core Flow Indicator */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px 14px",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "10px 20px",
              background: "rgba(17, 24, 39, 0.7)",
              border: `1px solid ${COLORS.borderSubtle}`,
              borderRadius: 30,
              marginTop: 6,
            }}
          >
            <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", fontWeight: 600, color: COLORS.ice }}>Content</span>
            <span style={{ color: COLORS.sky, fontSize: "0.75rem" }}>→</span>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", fontWeight: 600, color: COLORS.sky }}>Clipping</span>
            <span style={{ color: COLORS.sky, fontSize: "0.75rem" }}>→</span>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", fontWeight: 600, color: COLORS.cobalt }}>Distribution</span>
            <span style={{ color: COLORS.sky, fontSize: "0.75rem" }}>→</span>
            <span style={{ fontFamily: FONTS.body, fontSize: "0.78rem", fontWeight: 600, color: COLORS.ice }}>Tracking</span>
          </div>
        </div>

        {/* 4 CARDS GRID (STAGGERED ANIMATION) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {PILLARS.map((card, i) => {
            const Icon = card.icon;
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: isHovered
                    ? "linear-gradient(160deg, rgba(23, 37, 84, 0.45) 0%, rgba(17, 24, 39, 0.85) 100%)"
                    : "linear-gradient(160deg, rgba(17, 24, 39, 0.75) 0%, rgba(5, 5, 8, 0.9) 100%)",
                  border: isHovered ? `1px solid ${COLORS.sky}` : `1px solid ${COLORS.borderSubtle}`,
                  borderRadius: 20,
                  padding: "36px 28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: isHovered ? "0 20px 45px -10px rgba(37, 99, 235, 0.35)" : "none",
                  transform: isHovered ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                {/* Shard angular accent at top right */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 44,
                    height: 44,
                    background: isHovered
                      ? "linear-gradient(135deg, transparent 40%, #38BDF8 100%)"
                      : "linear-gradient(135deg, transparent 50%, rgba(37, 99, 235, 0.25) 100%)",
                    transition: "background 0.3s ease",
                  }}
                />

                <div>
                  {/* Top Row: Icon + Number */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        background: isHovered ? "linear-gradient(135deg, #2563EB, #38BDF8)" : "rgba(37, 99, 235, 0.15)",
                        border: `1px solid ${isHovered ? COLORS.sky : "rgba(56, 189, 248, 0.3)"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isHovered ? "#FFFFFF" : COLORS.sky,
                        boxShadow: isHovered ? "0 8px 20px rgba(56, 189, 248, 0.4)" : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon size={24} />
                    </div>

                    <span
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        color: isHovered ? COLORS.sky : "rgba(241, 245, 249, 0.3)",
                      }}
                    >
                      {card.num}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "1.45rem",
                      fontWeight: 700,
                      color: COLORS.ice,
                      letterSpacing: "-0.01em",
                      margin: "0 0 6px",
                    }}
                  >
                    {card.title}
                  </h3>

                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      color: COLORS.sky,
                      marginBottom: 14,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {card.tagline}
                  </div>

                  <p
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: "0.86rem",
                      color: COLORS.textMuted,
                      lineHeight: 1.6,
                      marginBottom: 24,
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Bullet points */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {card.points.map((pt, idx) => (
                      <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: isHovered ? COLORS.sky : COLORS.cobalt,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: FONTS.body,
                            fontSize: "0.78rem",
                            color: "rgba(241, 245, 249, 0.8)",
                            fontWeight: 400,
                          }}
                        >
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom interactive link */}
                <div
                  style={{
                    marginTop: 28,
                    paddingTop: 16,
                    borderTop: `1px solid ${COLORS.borderSubtle}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: isHovered ? COLORS.sky : "rgba(241, 245, 249, 0.5)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    fontFamily: FONTS.body,
                  }}
                >
                  <span>Explore Workflow</span>
                  <ArrowRight size={14} style={{ transform: isHovered ? "translateX(4px)" : "none", transition: "transform 0.25s ease" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
