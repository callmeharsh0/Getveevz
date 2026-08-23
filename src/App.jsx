import { useState } from "react";
import "./utils/gsapSetup";
import Chrome from "./ui/common/Chrome.jsx";
import SplashCursor from "./ui/common/SplashCursor.jsx";

// ── CORE JOURNEY (conversion-focused, in order) ──
import Hero from "./ui/sections/Hero/Hero.jsx";
import ProofMarquee from "./ui/sections/Proof/ProofMarquee.jsx";
import ProblemSolutionSection from "./ui/sections/3-ProblemSolution/ProblemSolutionSection.jsx";
import WhatWeDo from "./ui/sections/WhatWeDo/WhatWeDo.jsx";
import HowItWorks from "./ui/sections/HowItWorks/HowItWorks.jsx";
import CaseStudies from "./ui/sections/CaseStudies/CaseStudies.jsx";
import WhyGetVeevz from "./ui/sections/WhyGetVeevz/WhyGetVeevz.jsx";
import PricingSection from "./ui/sections/9-Pricing/PricingSection.jsx";
import FAQ from "./ui/sections/FAQ/FAQ.jsx";
import FinalCTA from "./ui/sections/FinalCTA/FinalCTA.jsx";

// ── SHOWCASE (extra visual showpieces — after conversion funnel) ──
import ResultsStreamSection from "./ui/sections/2-Results/ImageStreamHero.jsx";
import ParallaxFloatingSection from "./ui/sections/ParallaxFloating/ParallaxFloatingSection.jsx";
import EditorialHeroSection from "./ui/sections/5-EditorialHero/EditorialHeroSection.jsx";

// ── COMMON ──
import Footer from "./ui/common/Footer.jsx";

const NAV_LINKS = [
  { name: "Hero", id: "top" },
  { name: "Proof", id: "proof-section" },
  { name: "The Problem", id: "problem-solution-section" },
  { name: "What We Do", id: "what-we-do-section" },
  { name: "How It Works", id: "how-it-works-section" },
  { name: "Case Studies", id: "case-studies-section" },
  { name: "Why GetVeevz", id: "why-getveevz-section" },
  { name: "Pricing", id: "pricing-section" },
  { name: "FAQ", id: "faq-section" },
  { name: "Book Call", id: "final-cta-section" },
];

export default function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <>
      {/* ── SPLASH CURSOR (Fluid simulation) ── */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR="#38BDF8"
      />

      {/* ── PERSISTENT NAVIGATION ── */}
      <Chrome />

      {/* ══════════ CORE CONVERSION JOURNEY ══════════ */}

      {/* 01 · HERO */}
      <Hero />

      {/* 02 · PROOF — logos + numbers */}
      <ProofMarquee />

      {/* 03 · PROBLEM → SOLUTION — the reel burst */}
      <ProblemSolutionSection />

      {/* 04 · WHAT WE DO — 4 capabilities with visual demos */}
      <WhatWeDo />

      {/* 05 · HOW IT WORKS — 4-phase timeline + terminal */}
      <HowItWorks />

      {/* 06 · CASE STUDIES — magazine spread */}
      <CaseStudies />

      {/* 07 · WHY GETVEEVZ — comparison table */}
      <WhyGetVeevz />

      {/* 08 · PRICING */}
      <PricingSection />

      {/* 09 · FAQ */}
      <FAQ />

      {/* 10 · FINAL CTA */}
      <FinalCTA />

      {/* ══════════ VISUAL SHOWCASE (extra, post-funnel) ══════════ */}

      {/* 3D Reel Corridor — visual showpiece */}
      <ResultsStreamSection />

      {/* Mouse-reactive parallax gallery */}
      <ParallaxFloatingSection />

      {/* Editorial statement page */}
      <EditorialHeroSection isDark={isDark} setIsDark={setIsDark} />

      {/* ── FOOTER ── */}
      <Footer navLinks={NAV_LINKS} />
    </>
  );
}