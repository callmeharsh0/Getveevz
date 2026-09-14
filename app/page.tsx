import Hero from "@/components/sections/Hero";
import { ParallaxFloatingDemo } from "@/components/ui/parallax-floating-demo";
import DistributionFlow from "@/components/sections/DistributionFlow-standalone";
import CapabilitiesFlywheel from "@/components/sections/CapabilitiesFlywheel";
import Agencies from "@/components/sections/Agencies";
import ReelsFilmstrip from "@/components/sections/ReelsFilmstrip";
import WhyUs from "@/components/sections/WhyUs";
import Pricing from "@/components/sections/Pricing";
import Pricing2 from "@/components/sections/Pricing2";
import AudienceRepurpose from "@/components/sections/AudienceRepurpose";
import WeHandleItAll from "@/components/sections/WeHandleItAll";
import LiveAnalytics from "@/components/sections/LiveAnalytics";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import ClientTestimonials from "@/components/sections/ClientTestimonials";

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
      <AudienceRepurpose />
      <WeHandleItAll />
      <ClientTestimonials />
      <WhyUs />
      <Pricing />
      <Pricing2 />
      <LiveAnalytics />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
