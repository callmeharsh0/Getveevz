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
          background: COLORS.bg,
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 24px",
        }}
      >
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <h2 style={{ fontFamily: FONTS.display, color: COLORS.textMuted, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, margin: 0 }}>
            Your content isn't the problem.
          </h2>
          <h2 style={{ fontFamily: FONTS.display, color: COLORS.text, fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 600, margin: "8px 0 0", letterSpacing: -1 }}>
            Distribution <span style={{ color: COLORS.accent }}>is.</span>
          </h2>
        </div>
      </section>

      <DistributionFlow />
    </>
  );
}