import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Calendar, ShieldCheck, CheckCircle } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isBtnHovered, setIsBtnHovered] = useState(false);

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

  return (
    <section
      id="final-cta-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: `radial-gradient(ellipse 90% 70% at 50% 50%, #0c162d 0%, ${COLORS.obsidian} 100%)`,
        padding: "150px 24px 130px",
        overflow: "hidden",
        textAlign: "center",
        borderTop: `1px solid ${COLORS.borderAccent}`,
      }}
    >
      <style>{`
        @keyframes pulseShardGlow {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            filter: drop-shadow(0 0 35px rgba(37, 99, 235, 0.45));
          }
          50% {
            transform: scale(1.04) rotate(2deg);
            filter: drop-shadow(0 0 65px rgba(56, 189, 248, 0.7));
          }
        }
        @keyframes floatRings {
          0%, 100% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.08) rotate(180deg); opacity: 0.6; }
        }
      `}</style>

      {/* Atmospheric Multi-Layer Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "850px",
          height: "550px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(56, 189, 248, 0.08) 45%, transparent 75%)",
          filter: "blur(70px)",
          pointerEvents: "none",
        }}
      />

      {/* Animated Concentric Shard Rings */}
      <div
        style={{
          position: "absolute",
          top: "45%",
          left: "50%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          border: "1px dashed rgba(56, 189, 248, 0.18)",
          pointerEvents: "none",
          animation: "floatRings 24s linear infinite",
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Animated Brand Logo Shard Emblem */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #111827, #050508)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            marginBottom: 36,
            boxShadow: "0 12px 40px rgba(37, 99, 235, 0.4)",
            animation: "pulseShardGlow 6s ease-in-out infinite",
            position: "relative",
          }}
        >
          <img
            src="/logo.png"
            alt="GetVeevz Shard Logo"
            style={{ width: 64, height: 64, objectFit: "contain" }}
          />
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: FONTS.body,
            fontSize: "0.75rem",
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: COLORS.sky,
            marginBottom: 20,
            background: "rgba(37, 99, 235, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            padding: "6px 16px",
            borderRadius: 999,
          }}
        >
          <Sparkles size={14} color={COLORS.sky} />
          READY TO DISTRIBUTE AT SCALE
        </div>

        {/* Headline */}
        <h2
          style={{
            fontFamily: FONTS.sans,
            fontSize: "clamp(2.6rem, 5.8vw, 4.5rem)",
            fontWeight: 800,
            color: COLORS.ice,
            letterSpacing: "-0.035em",
            lineHeight: 1.08,
            margin: "0 auto 20px",
            maxWidth: 820,
          }}
        >
          You Already Have the Content. <br />
          <span
            style={{
              background: "linear-gradient(135deg, #38BDF8 0%, #2563EB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Now Build the Distribution Behind It.
          </span>
        </h2>

        {/* Subheadline */}
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
            color: COLORS.textMuted,
            maxWidth: 620,
            margin: "0 auto 42px",
            lineHeight: 1.6,
          }}
        >
          Let's see what we can build around your existing content. Schedule a 1-on-1 distribution architecture call with our leadership team.
        </p>

        {/* CTA BUTTON */}
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsBtnHovered(true)}
            onMouseLeave={() => setIsBtnHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontFamily: FONTS.sans,
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
              padding: "18px 38px",
              borderRadius: 14,
              textDecoration: "none",
              boxShadow: isBtnHovered
                ? "0 18px 45px rgba(56, 189, 248, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3)"
                : "0 10px 30px rgba(37, 99, 235, 0.4)",
              transform: isBtnHovered ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
              transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <Calendar size={18} />
            <span>Book a Strategy Call</span>
            <ArrowRight size={18} style={{ transform: isBtnHovered ? "translateX(4px)" : "none", transition: "transform 0.25s ease" }} />
          </a>
        </div>

        {/* Confidence assurances */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "24px 32px",
            flexWrap: "wrap",
            fontFamily: FONTS.body,
            fontSize: "0.82rem",
            color: "rgba(241, 245, 249, 0.6)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={15} color={COLORS.sky} />
            <span>Custom Distribution Roadmap</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={15} color={COLORS.sky} />
            <span>No Obligation or Agency Lock-In</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={15} color={COLORS.sky} />
            <span>72-Hour Onboarding Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
