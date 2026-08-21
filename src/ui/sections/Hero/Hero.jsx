import { useState, useRef, useEffect } from "react";
import { ArrowRight, Calendar, Play, Radio, TrendingUp, Sparkles, Share2, Video, Smartphone } from "lucide-react";
import BackgroundMotion from "../../common/BackgroundMotion";
import { COLORS, FONTS } from "../../../utils/theme";

export default function Hero() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);
  const [activePlatform, setActivePlatform] = useState("all");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: `radial-gradient(ellipse 90% 70% at 50% 30%, #0d1a36 0%, ${COLORS.obsidian} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "130px 24px 80px",
        overflow: "hidden",
      }}
    >
      <BackgroundMotion />

      {/* Shard Radial Mesh Glow in Hero Background */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "600px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.22) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1200,
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Eyebrow Pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(17, 24, 39, 0.8)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            padding: "8px 18px",
            borderRadius: 999,
            marginBottom: 26,
            boxShadow: "0 4px 20px rgba(37, 99, 235, 0.25)",
          }}
        >
          <img src="/logo.png" alt="GetVeevz" style={{ width: 18, height: 18, objectFit: "contain" }} />
          <span
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: COLORS.sky,
            }}
          >
            THE CONTENT DISTRIBUTION ENGINE
          </span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: FONTS.sans,
            fontSize: "clamp(2.6rem, 5.8vw, 5.2rem)",
            margin: "0 auto 20px",
            fontWeight: 800,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            color: COLORS.ice,
            maxWidth: 1050,
          }}
        >
          Turn Your Long-Form Content Into a{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Short-Form Distribution Engine
          </span>
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
            opacity: 0.85,
            margin: "0 auto 38px",
            maxWidth: 760,
            lineHeight: 1.6,
            fontWeight: 400,
            color: COLORS.textMuted,
          }}
        >
          GetVeevz turns the content you're already creating into coordinated short-form distribution across Instagram, YouTube Shorts and TikTok.
        </p>

        {/* CTAs Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 60,
          }}
        >
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: FONTS.sans,
              fontSize: "0.92rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
              padding: "16px 34px",
              borderRadius: 12,
              textDecoration: "none",
              boxShadow: "0 12px 35px rgba(37, 99, 235, 0.45)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 18px 45px rgba(56, 189, 248, 0.55)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 12px 35px rgba(37, 99, 235, 0.45)";
            }}
          >
            <Calendar size={18} />
            <span>Book a Strategy Call</span>
            <ArrowRight size={18} />
          </a>

          <a
            href="#what-we-do-section"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("what-we-do-section")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.sans,
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: COLORS.ice,
              background: "rgba(17, 24, 39, 0.7)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "15px 28px",
              borderRadius: 12,
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.sky;
              e.currentTarget.style.background = "rgba(17, 24, 39, 0.95)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.25)";
              e.currentTarget.style.background = "rgba(17, 24, 39, 0.7)";
            }}
          >
            <span>See How It Works</span>
            <span>↓</span>
          </a>
        </div>

        {/* ── HIGH-TECH ANIMATED DISTRIBUTION ENGINE COMPOSITE MOCKUP ── */}
        <div
          style={{
            position: "relative",
            maxWidth: 1040,
            margin: "0 auto",
            background: "linear-gradient(165deg, rgba(17, 24, 39, 0.8) 0%, rgba(5, 5, 8, 0.95) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            borderRadius: 24,
            padding: "24px 28px 32px",
            boxShadow: "0 30px 90px rgba(0, 0, 0, 0.8), 0 0 40px rgba(37, 99, 235, 0.2)",
          }}
        >
          {/* Top Engine Telemetry Bar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 18,
              borderBottom: "1px solid rgba(241, 245, 249, 0.08)",
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B981" }} />
              </div>
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: COLORS.sky,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                LIVE DISTRIBUTION DISPATCH // TRI-PLATFORM ACTIVE
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  color: "#34D399",
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: "0.72rem",
                  fontWeight: 700,
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite" }} />
                38 Channels Syndicating
              </span>
            </div>
          </div>

          {/* 3 Short-Form Platform Streams */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            {/* Stream 1: YouTube Shorts */}
            <div
              style={{
                background: "rgba(5, 5, 8, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                borderRadius: 16,
                padding: "18px",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(239, 68, 68, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EF4444" }}>
                    <Video size={15} />
                  </div>
                  <span style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", fontWeight: 700, color: COLORS.ice }}>YouTube Shorts</span>
                </div>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>+840k Today</span>
              </div>

              <div
                style={{
                  height: 140,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 12,
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", color: COLORS.sky, fontWeight: 700 }}>
                    HOOK 01: 96.8% RETENTION
                  </span>
                  <Play size={14} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                    "The $50M Strategy No One Talked About..."
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                    4.2M views · 18 dedicated sub-channels
                  </div>
                </div>
              </div>
            </div>

            {/* Stream 2: Instagram Reels */}
            <div
              style={{
                background: "rgba(5, 5, 8, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                borderRadius: 16,
                padding: "18px",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(236, 72, 153, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#EC4899" }}>
                    <Smartphone size={15} />
                  </div>
                  <span style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", fontWeight: 700, color: COLORS.ice }}>Instagram Reels</span>
                </div>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>+1.2M Today</span>
              </div>

              <div
                style={{
                  height: 140,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 12,
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", color: "#EC4899", fontWeight: 700 }}>
                    VIRAL SPIKE: 142k SHARES
                  </span>
                  <Share2 size={14} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                    "How We Reached 100k Users In 14 Days"
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                    6.8M views · 24 dedicated sub-channels
                  </div>
                </div>
              </div>
            </div>

            {/* Stream 3: TikTok Network */}
            <div
              style={{
                background: "rgba(5, 5, 8, 0.75)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                borderRadius: 16,
                padding: "18px",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: "rgba(56, 189, 248, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.sky }}>
                    <Radio size={15} />
                  </div>
                  <span style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", fontWeight: 700, color: COLORS.ice }}>TikTok Network</span>
                </div>
                <span style={{ fontFamily: FONTS.body, fontSize: "0.72rem", color: "#34D399", fontWeight: 700 }}>+2.4M Today</span>
              </div>

              <div
                style={{
                  height: 140,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #0c162d 0%, #0f172a 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 12,
                  position: "relative",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: 4, fontSize: "0.65rem", color: COLORS.sky, fontWeight: 700 }}>
                    FLEET SYNDICATION
                  </span>
                  <TrendingUp size={14} color="#FFFFFF" />
                </div>
                <div>
                  <div style={{ fontFamily: FONTS.sans, fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>
                    "Why Building In Public Works Every Time"
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: 2 }}>
                    9.1M views · 35 dedicated sub-channels
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
