import Hero from "@/components/sections/Hero";
import { ParallaxFloatingDemo } from "@/components/ui/parallax-floating-demo";
import DistributionFlow from "@/components/sections/DistributionFlow-standalone";
import CapabilitiesCommandCenter from "@/components/sections/CapabilitiesCommandCenter";
import CapabilitiesBento from "@/components/sections/CapabilitiesBento";
import CapabilitiesAccordion from "@/components/sections/CapabilitiesAccordion";
import CapabilitiesFlywheel from "@/components/sections/CapabilitiesFlywheel";
import Agencies from "@/components/sections/Agencies";
import Proof from "@/components/sections/Proof";
import Problem from "@/components/sections/Problem";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowItWorks from "@/components/sections/HowItWorks";
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
      <section id="results" className="relative w-full overflow-hidden bg-[#02122F]">
        <ParallaxFloatingDemo />
      </section>
      <DistributionFlow />
      {/* 4 CONCEPTS FOR USER REVIEW: Everything You Need to Turn Content Into Distribution */}
      <CapabilitiesCommandCenter />
      <CapabilitiesBento />
      <CapabilitiesAccordion />
      <CapabilitiesFlywheel />
      <Agencies />
      <ReelsFilmstrip />
      <Proof />
      <AudienceRepurpose />
      <Problem />
      <WhatWeDo />
      <HowItWorks />
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
