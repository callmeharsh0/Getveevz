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
import HeadSEO from "@/components/seo/HeadSEO";

const Questionnaire = lazy(() => import("@/components/sections/Questionnaire"));
const FinalCTA = lazy(() => import("@/components/sections/FinalCTA"));

const ROOT_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://getveevz.com/#organization",
    "name": "GetVeevz",
    "url": "https://getveevz.com",
    "logo": "https://getveevz.com/assets/Logo.png",
    "description":
      "GetVeevz turns long-form podcasts, interviews, and keynotes into coordinated short-form distribution across TikTok, Instagram Reels, and YouTube Shorts.",
    "email": "team@getveevz.com",
    "sameAs": [
      "https://x.com",
      "https://linkedin.com",
      "https://youtube.com",
      "https://instagram.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "email": "team@getveevz.com"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://getveevz.com/#website",
    "url": "https://getveevz.com",
    "name": "GetVeevz",
    "publisher": {
      "@id": "https://getveevz.com/#organization"
    }
  }
];

export default function Home() {
  return (
    <main>
      <HeadSEO
        title="GetVeevz — Short-Form Video Distribution & Clipping Agency"
        description="GetVeevz turns long-form podcasts, interviews, and keynotes into a compounding short-form distribution engine across TikTok, Instagram Reels, and YouTube Shorts."
        canonical="https://getveevz.com/"
        jsonLd={ROOT_JSON_LD}
      />
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

