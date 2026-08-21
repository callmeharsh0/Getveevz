import { useEffect, useRef, useState } from "react";
import DistributionFlow from "./DistributionFlow";
import { COLORS, FONTS } from "../../../utils/theme";

export default function ProblemSolutionSection() {
  const statementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="problem-solution-section"
        ref={statementRef}
        style={{
          background: COLORS.obsidian,
          minHeight: "65vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
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
            THE DISTRIBUTION GAP
          </div>

          <h2
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textMuted,
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 500,
              margin: 0,
            }}
          >
            You're already creating the content.
          </h2>
          <h2
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.ice,
              fontSize: "clamp(34px, 5.5vw, 62px)",
              fontWeight: 800,
              margin: "12px 0 20px",
              letterSpacing: -1,
              lineHeight: 1.15,
            }}
          >
            Why Isn't It Being Distributed <span style={{ background: "linear-gradient(135deg, #2563EB, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Everywhere?</span>
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              color: COLORS.textMuted,
              fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
              maxWidth: 680,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Most creators and teams have hours of world-class video sitting in archives. The bottleneck isn't content quality — it's the lack of an autonomous short-form syndication operation.
          </p>
        </div>
      </section>

      <DistributionFlow />
    </>
  );
}