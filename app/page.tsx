import Hero from "@/components/sections/Hero";
import { ParallaxFloatingDemo } from "@/components/ui/parallax-floating-demo";
import DistributionFlow from "@/components/sections/DistributionFlow-standalone";
import CapabilitiesFlywheel from "@/components/sections/CapabilitiesFlywheel";
import Agencies from "@/components/sections/Agencies";
import ReelsFilmstrip from "@/components/sections/ReelsFilmstrip";
import WeHandleItAll from "@/components/sections/WeHandleItAll";
import Pricing from "@/components/sections/Pricing";
import LiveAnalytics from "@/components/sections/LiveAnalytics";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="results" className="relative w-full overflow-hidden bg-[#090e14]">
        <ParallaxFloatingDemo />
      </section>
      <DistributionFlow />
      <CapabilitiesFlywheel />
      <Agencies />
      <ReelsFilmstrip />
      <WeHandleItAll />
      <Pricing />
      <LiveAnalytics />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
