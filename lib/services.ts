// Central services content file. Each service maps to a detail page
// under /app/services/[slug]/page.tsx. Swap for Sanity/Contentlayer fetchers
// once detailed case studies and verified numbers are approved.

import { Globe, Rocket, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: LucideIcon;
  color: string;
  features: { title: string; desc: string }[];
  benefits: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faq: { question: string; answer: string }[];
  ctaHref: string;
};

export const services: Service[] = [
  {
    slug: "long-term-distribution",
    title: "Long-Term Distribution",
    shortDesc: "Build a sustainable, repeatable content distribution engine with ongoing monthly retainers.",
    longDesc:
      "Build a sustainable content distribution engine. A 3-month campaign or monthly retainer that starts with 500–1,000+ clippers for large-scale testing, identifies winning pages and hooks, then scales proven winners into fixed monthly retainers.",
    icon: Globe,
    color: "text-[#0038E2]",
    features: [
      {
        title: "Large-Scale Testing",
        desc: "Start with 500–1,000+ clippers for broad A/B testing of pages, hooks, formats, and content angles.",
      },
      {
        title: "CPM-Based Optimization",
        desc: "Performance-linked distribution at approximately $1–$3 / 1K views, optimized toward winning combinations.",
      },
      {
        title: "Retainer Transition",
        desc: "Top 10–30 performing pages move into fixed monthly retainers with defined clip volume and posting frequency.",
      },
      {
        title: "Proven Page Network",
        desc: "Access to a vetted network of agency-owned pages with established audiences across TikTok, IG Reels, and YT Shorts.",
      },
    ],
    benefits: [
      "500–1,000+ clippers for large-scale testing",
      "Identify winning pages, hooks, formats & content angles",
      "CPM-based testing at approximately $1–$3 / 1K views",
      "Shortlist top 10–30 performing pages for retainers",
      "Move proven pages into monthly retainers with defined volume & frequency",
      "Consistent quality and distribution standards",
      "Access to a proven page network across all platforms",
      "Built for consistent, repeatable distribution",
      "Renew and scale based on campaign performance",
    ],
    processSteps: [
      {
        step: "01",
        title: "Campaign Kickoff",
        desc: "3-month retainer or monthly engagement starts with 500–1,000+ clippers deployed for broad testing.",
      },
      {
        step: "02",
        title: "CPM-Based Testing",
        desc: "Distribute at $1–$3 / 1K views while tracking performance across pages, hooks, formats, and content angles.",
      },
      {
        step: "03",
        title: "Winner Identification",
        desc: "Analyze results and shortlist the top 10–30 performing pages.",
      },
      {
        step: "04",
        title: "Retainer Transition",
        desc: "Move proven pages into monthly retainers with defined clip volume, posting frequency, and quality standards.",
      },
      {
        step: "05",
        title: "Scale & Optimize",
        desc: "Renew retainers and scale the distribution engine based on ongoing performance data.",
      },
    ],
    faq: [
      {
        question: "How long is the initial commitment?",
        answer:
          "We recommend starting with at least 3 months. This gives our team enough time to test different hooks, find what resonates best with your audience, and build steady monthly growth.",
      },
      {
        question: "How many editors work on my content?",
        answer:
          "We assign a dedicated team of vetted short-form editors. They turn your long-form videos into engaging clips and test different angles and hooks across multiple pages.",
      },
      {
        question: "What does it cost per view?",
        answer:
          "Most campaigns average $1 to $3 for every 1,000 views during early testing. Over time, that cost goes down as we focus only on the channels bringing the best engagement.",
      },
      {
        question: "How do you pick which accounts keep posting?",
        answer:
          "We track which pages generate the most watch time and followers, then focus ongoing monthly budgets on the top 10 to 30 accounts that consistently deliver real results.",
      },
    ],
    ctaHref: "mailto:contact@getveevz.com?subject=Long-Term%20Distribution%20Inquiry",
  },
  {
    slug: "short-term-campaign",
    title: "Short-Term Campaign",
    shortDesc: "Concentrated, high-impact distribution for launches, announcements, and product campaigns.",
    longDesc:
      "Create a concentrated wave of attention, fast. We handle page inventory, placements, and execution for high-volume, short-duration campaigns — from $12K minimum to $100K+ in a single day. Ideal for launches, announcements, products, and campaigns that need rapid, massive reach across niche and mainstream audiences.",
    icon: Rocket,
    color: "text-frost",
    features: [
      {
        title: "Mass Fan-Page Clipping",
        desc: "CPM-based mass clipping deployed across agency-owned niche and theme pages.",
      },
      {
        title: "Audience-Niche Targeting",
        desc: "Content distributed natively within relevant audiences including AI, tech, business, education, and news.",
      },
      {
        title: "High-Volume Seeding",
        desc: "Seeding through established pages ranging from niche accounts to 1M–10M+ followers.",
      },
      {
        title: "Fixed-Cost Execution",
        desc: "Fixed cost per post for seeding placements — we handle page inventory, placements, and execution.",
      },
    ],
    benefits: [
      "CPM-based mass fan-page clipping",
      "Distribution across multiple platforms and pages",
      "Approximately $1–$3 / 1K views, depending on campaign",
      "Access to agency-owned niche/theme pages",
      "Targeted niches including AI, tech, business, education & news",
      "Content distributed natively within relevant audiences",
      "Pages ranging from niche accounts to 1M–10M+ followers",
      "Fixed cost per post for seeding placements",
      "Execution within 24 hours",
      "Minimum seeding budget of $12K",
      "Scale to $100K+ in a single day",
      "We handle page inventory, placements & execution",
      "Designed for high-volume, concentrated reach",
    ],
    processSteps: [
      {
        step: "01",
        title: "Campaign Planning",
        desc: "Define launch objectives, target niches, and budget ($12K minimum).",
      },
      {
        step: "02",
        title: "Content Clipping",
        desc: "Mass clipping of your content, formatted for each target platform and audience.",
      },
      {
        step: "03",
        title: "Page Assignment",
        desc: "Select and assign pages from niche accounts to 1M–10M+ follower properties.",
      },
      {
        step: "04",
        title: "Rapid Distribution",
        desc: "Execute fixed-cost seeding placements with 24-hour turnaround.",
      },
      {
        step: "05",
        title: "Performance Reporting",
        desc: "Track reach, engagement, and conversion — scale up to $100K+ if needed.",
      },
    ],
    faq: [
      {
        question: "What is the minimum budget?",
        answer:
          "Campaigns start at $12,000 for focused launches. We can also scale up to $100,000+ for large single-day product drops and major announcements.",
      },
      {
        question: "How fast can you launch?",
        answer:
          "Once you approve the clips, we can have videos going live across our accounts within 24 hours.",
      },
      {
        question: "What topics and industries do you work with?",
        answer:
          "We regularly cover AI, technology, business, finance, education, and news. We can also reach custom niche audiences upon request.",
      },
      {
        question: "What size accounts post the videos?",
        answer:
          "We post across a wide variety of accounts, from focused niche communities to large creator pages with 1M to 10M+ followers.",
      },
    ],
    ctaHref: "mailto:contact@getveevz.com?subject=Short-Term%20Campaign%20Inquiry",
  },
];
