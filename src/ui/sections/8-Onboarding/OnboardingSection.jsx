import { OnboardingDialog } from "@/ui/common/onboarding-dialog";
import { COLORS, FONTS } from "../../../utils/theme";

export default function OnboardingSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "80vh",
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgSoft} 50%, ${COLORS.bg} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 1.5rem",
        textAlign: "center",
        borderTop: `1px solid ${COLORS.borderSubtle}`,
        borderBottom: `1px solid ${COLORS.borderSubtle}`,
        overflow: "hidden",
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "650px",
          height: "450px",
          background: "radial-gradient(circle, rgba(212, 146, 74, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header text */}
      <div style={{ maxWidth: "720px", marginBottom: "3rem", position: "relative", zIndex: 2 }}>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "0.7rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: COLORS.accent,
            marginBottom: "1rem",
          }}
        >
          Interactive Walkthrough
        </p>

        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 300,
            color: COLORS.text,
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Client Onbaording{" "}
          <span style={{ fontStyle: "italic", color: "#e8a463" }}>content distribution</span>
        </h2>

        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
            fontWeight: 300,
            color: COLORS.textMuted,
            lineHeight: 1.6,
            marginTop: "1.2rem",
          }}
        >
          Explore each step of our end-to-end media engine directly below.
        </p>
      </div>

      {/* Inline Onboarding Carousel Card Container */}
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "480px", margin: "0 auto" }}>
        <OnboardingDialog isModal={false} />
      </div>
    </section>
  );
}
