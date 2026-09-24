import { lazy, Suspense } from "react";
import Hero from "@/components/sections/Hero";
import { ParallaxFloatingDemo } from "@/components/ui/parallax-floating-demo";
import DistributionFlow from "@/components/sections/DistributionFlow-standalone";
import ClientLogosMarquee from "@/components/sections/ClientLogosMarquee";
import CapabilitiesFlywheel from "@/components/sections/CapabilitiesFlywheel";
import ReelsFilmstrip from "@/components/sections/ReelsFilmstrip";
import Agencies from "@/components/sections/Agencies";
import WeHandleItAll from "@/components/sections/WeHandleItAll";
import Pricing from "@/components/sections/Pricing";
import LiveAnalytics from "@/components/sections/LiveAnalytics";

const Questionnaire = lazy(() => import("@/components/sections/Questionnaire"));
const FinalCTA = lazy(() => import("@/components/sections/FinalCTA"));

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="results" className="relative w-full overflow-hidden bg-[#090e14]">
        <ParallaxFloatingDemo />
      </section>
      <ClientLogosMarquee />
      <DistributionFlow />
      <CapabilitiesFlywheel />
      <ReelsFilmstrip />
      <Agencies />
      <WeHandleItAll />
      <Pricing />
      <LiveAnalytics />
      <Suspense fallback={null}>
        <Questionnaire />
        <FinalCTA />
      </Suspense>
    </main>
  );
}

