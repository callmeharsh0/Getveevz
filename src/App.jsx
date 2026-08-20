import { useEffect, useRef, useState } from "react";
import "./utils/gsapSetup";
import Chrome from "./ui/common/Chrome.jsx";
import BackgroundMotion from "./ui/common/BackgroundMotion.jsx";
import BookACall from "./ui/sections/10-BookACall/BookACall.jsx";
import ParallaxFloatingSection from "./ui/sections/ParallaxFloating/ParallaxFloatingSection.jsx";
import ResultsSection from "./ui/sections/2-Results/ResultsSection.jsx";
import ResultsStreamSection from "./ui/sections/2-Results/ImageStreamHero.jsx";
import HookSection from "./ui/sections/1-Hook/HookSection.jsx";
import PortalTransition from "./ui/sections/4-PortalTransition/PortalTransition.jsx";
import ProblemSolutionSection from "./ui/sections/3-ProblemSolution/ProblemSolutionSection.jsx";
import EditorialHeroSection from "./ui/sections/5-EditorialHero/EditorialHeroSection.jsx";
import MultiplierEngine from "./ui/sections/6-MultiplierEngine/MultiplierEngine.jsx";
import SpecificationMatrix from "./ui/sections/7-SpecificationMatrix/SpecificationMatrix.jsx";
import OnboardingSection from "./ui/sections/8-Onboarding/OnboardingSection.jsx";
import PricingSection from "./ui/sections/9-Pricing/PricingSection.jsx";
import { COLORS, FONTS } from "./utils/theme";

/**
 * IntroHero — static replacement for the former 3D intro scene.
 * Keeps the brand mark + tagline from the original intro beat
 * ("NEXUSMEDIA / Distribution at scale") so the persistent Chrome
 * header and "scroll to enter" hint have a coherent landing surface.
 */
function IntroHero() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
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
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 24px",
        overflow: "hidden",
      }}
    >
      <BackgroundMotion />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1.2s ease, transform 1.2s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <h1
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            margin: 0,
            fontWeight: 300,
            letterSpacing: "0.35em",
            lineHeight: 1.1,
            color: COLORS.text,
            textIndent: "0.35em",
          }}
        >
          NEXUSMEDIA
        </h1>
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
            opacity: 0.7,
            marginTop: "1.2rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontWeight: 300,
            color: COLORS.text,
          }}
        >
          Distribution at scale
        </p>
      </div>
    </section>
  );
}

export default function App() {
  // Shared Dark Mode State for Editorial Hero, Multiplier Engine, and Specification Matrix
  const [isDark, setIsDark] = useState(false);

  return (
    <>
      <Chrome />

      {/* ── STATIC INTRO (replaces the 3D hero) ───────────────── */}
      <IntroHero />

      <BookACall />
      <ParallaxFloatingSection />

      {/* ── 2A: ORIGINAL RESULTS CAROUSEL SECTION ──────────────── */}
      <ResultsSection />

      {/* ── 2B: NEW 3D PERSPECTIVE CORRIDOR RESULTS SECTION ───── */}
      <ResultsStreamSection />

      <HookSection />
      <PortalTransition />
      <ProblemSolutionSection />

      {/* ── 5: EDITORIAL HERO STATEMENT COVER (CONTROLS DARK MODE) ── */}
      <EditorialHeroSection isDark={isDark} setIsDark={setIsDark} />

      {/* ── 6: MULTIPLIER ENGINE BREAKDOWN (SYNCS WITH DARK MODE) ──── */}
      <MultiplierEngine isDark={isDark} />

      {/* ── 7: SPECIFICATION MATRIX (SYNCS WITH DARK MODE) ─────────── */}
      <SpecificationMatrix isDark={isDark} />

      {/* ── 8: ONBOARDING ROADMAP ─────────────────────────────────── */}
      <OnboardingSection />

      {/* ── 9: PRICING PACKAGES ───────────────────────────────────── */}
      <PricingSection />
    </>
  );
}