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
import Questionnaire from "@/components/sections/Questionnaire";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="results" className="relative w-full overflow-hidden bg-[#090e14]">
        <ParallaxFloatingDemo />
      </section>
      <DistributionFlow />
      <ClientLogosMarquee />
      <CapabilitiesFlywheel />
      <ReelsFilmstrip />
      <Agencies />
      <WeHandleItAll />
      <Pricing />
      <LiveAnalytics />
      <Questionnaire />
      <FinalCTA />
    </main>
  );
}
