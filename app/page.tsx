import Hero from "@/components/sections/Hero";
import { ParallaxFloatingDemo } from "@/components/ui/parallax-floating-demo";
import DistributionFlow from "@/components/sections/DistributionFlow-standalone";
import Agencies from "@/components/sections/Agencies";
import Proof from "@/components/sections/Proof";
import Problem from "@/components/sections/Problem";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowItWorks from "@/components/sections/HowItWorks";
import ReelsFilmstrip from "@/components/sections/ReelsFilmstrip";
import WhyUs from "@/components/sections/WhyUs";
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
      <Agencies />
      <ReelsFilmstrip />
      <Proof />
      <Problem />
      <WhatWeDo />
      <HowItWorks />
      <ClientTestimonials />
      <WhyUs />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
