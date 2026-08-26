import Hero from "@/components/sections/Hero";
import Proof from "@/components/sections/Proof";
import Problem from "@/components/sections/Problem";
import WhatWeDo from "@/components/sections/WhatWeDo";
import HowItWorks from "@/components/sections/HowItWorks";
import ReelsFilmstrip from "@/components/sections/ReelsFilmstrip";
import WhyUs from "@/components/sections/WhyUs";
import Agencies from "@/components/sections/Agencies";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Proof />
      <Problem />
      <WhatWeDo />
      <HowItWorks />
      <ReelsFilmstrip />
      <WhyUs />
      <Agencies />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
