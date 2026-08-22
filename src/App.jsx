import { useState } from "react";
import "./utils/gsapSetup";
import Chrome from "./ui/common/Chrome.jsx";
import Hero from "./ui/sections/Hero/Hero.jsx";
import ProofMarquee from "./ui/sections/Proof/ProofMarquee.jsx";
import BookACall from "./ui/sections/10-BookACall/BookACall.jsx";
import ParallaxFloatingSection from "./ui/sections/ParallaxFloating/ParallaxFloatingSection.jsx";
import ResultsSection from "./ui/sections/2-Results/ResultsSection.jsx";
import ResultsStreamSection from "./ui/sections/2-Results/ImageStreamHero.jsx";
import HookSection from "./ui/sections/1-Hook/HookSection.jsx";
import PortalTransition from "./ui/sections/4-PortalTransition/PortalTransition.jsx";
import ProblemSolutionSection from "./ui/sections/3-ProblemSolution/ProblemSolutionSection.jsx";
import WhatWeDo from "./ui/sections/WhatWeDo/WhatWeDo.jsx";
import HowItWorks from "./ui/sections/HowItWorks/HowItWorks.jsx";
import CaseStudies from "./ui/sections/CaseStudies/CaseStudies.jsx";
import EditorialHeroSection from "./ui/sections/5-EditorialHero/EditorialHeroSection.jsx";
import OnboardingSection from "./ui/sections/8-Onboarding/OnboardingSection.jsx";
import WhyGetVeevz from "./ui/sections/WhyGetVeevz/WhyGetVeevz.jsx";
import PricingSection from "./ui/sections/9-Pricing/PricingSection.jsx";
import FAQ from "./ui/sections/FAQ/FAQ.jsx";
import FinalCTA from "./ui/sections/FinalCTA/FinalCTA.jsx";
import Footer from "./ui/common/Footer.jsx";

const NAV_LINKS = [
  { name: "Hero", id: "top" },
  { name: "Proof", id: "results-section" },
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
  // Shared Dark Mode State for Editorial Hero
  const [isDark, setIsDark] = useState(true);

  return (
    <>
      {/* ── PERSISTENT CHROME NAVIGATION & SOUND SYNTH ── */}
      <Chrome />

      {/* ── 1. HERO ── */}
      <Hero />

      {/* ── 2. PROOF (MARQUEE & STATS) ── */}
      <ProofMarquee />

      {/* ── PRESERVED SECTIONS: BOOK CALL & PARALLAX FLOATING ── */}
      <BookACall />
      <ParallaxFloatingSection />

      {/* ── PRESERVED RESULTS CAROUSEL & 3D CORRIDOR ── */}
      <ResultsSection />
      <ResultsStreamSection />

      {/* ── PRESERVED HOOK & PORTAL TRANSITION ── */}
      <HookSection />
      <PortalTransition />

      {/* ── 3. THE PROBLEM ── */}
      <ProblemSolutionSection />

      {/* ── 4. WHAT WE DO ── */}
      <WhatWeDo />

      {/* ── 5. HOW IT WORKS ── */}
      <HowItWorks />

      {/* ── 6. CASE STUDIES ── */}
      <CaseStudies />

      {/* ── 7. EDITORIAL HERO STATEMENT ── */}
      <EditorialHeroSection isDark={isDark} setIsDark={setIsDark} />

      {/* ── 8. ONBOARDING ROADMAP ── */}
      <OnboardingSection />

      {/* ── 9. WHY GETVEEVZ ── */}
      <WhyGetVeevz />

      {/* ── 10. PRICING PACKAGES ── */}
      <PricingSection />

      {/* ── 11. FAQ ACCORDION ── */}
      <FAQ />

      {/* ── 12. FINAL CTA ── */}
      <FinalCTA />

      {/* ── 13. FOOTER ── */}
      <Footer navLinks={NAV_LINKS} />
    </>
  );
}