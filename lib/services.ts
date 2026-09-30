// Central services content file adhering strictly to client pricing and distribution models:
// 1. Long-Term: 3-Month Campaign (Month 1 CPM testing -> Months 2-3 Retainer)
// 2. Long-Term: Straight Retainer (Fixed deliverables for consistent-view brands)
// 3. Short-Term: CPM Campaign (Mass fan-page clipping & Agency-owned theme pages)
// 4. Short-Term: Seeding ($12K-$100K+ 24-hr blast, fixed cost per post on 1M-10M+ pages)

import { Globe, Rocket, Layers, type LucideIcon } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  tagline: string;
  shortDesc: string;
  longDesc: string;
  icon: LucideIcon;
  color: string;
  models: {
    name: string;
    subtitle: string;
    overview: string;
    highlights: string[];
    details: { phase?: string; heading: string; text: string }[];
  }[];
  features: { title: string; desc: string }[];
  benefits: string[];
  processSteps: { step: string; title: string; desc: string }[];
  faq: { question: string; answer: string }[];
  ctaHref: string;
};

export const services: Service[] = [
  {
    slug: "long-term-distribution",
    title: "Long-Term Distribution Models",
    tagline: "Sustainable, repeatable clipping engines built for compounding reach",
    shortDesc: "Two long-term engagement paths: a 3-month test-and-scale campaign, or a straight fixed retainer for established brands.",
    longDesc:
      "Our long-term models are designed to turn raw video into a dependable, compounding distribution machine. Depending on your current reach, you can start with a 3-month test-to-scale campaign (Month 1 CPM testing, Months 2–3 retainer for winners) or jump directly into a fixed monthly retainer with guaranteed clip output and quality standards.",
    icon: Globe,
    color: "text-[#0038E2]",
    models: [
      {
        name: "CPM to Retainer Transition",
        subtitle: "Custom view target (minimum 10M views) to filter winning pages, transitioning into a fixed retainer",
        overview: "Best when we want to identify what works first, then scale only the strongest pages.",
        highlights: [
          "Month 1: 500–1,000 clippers deployed on CPM basis ($3 / 1K views)",
          "Custom view volume targets (minimum 10 Million views requirement)",
          "Data-driven filtering for winning pages, hooks, formats, and angles",
          "Months 2–3: Top 10–30 pages moved to fixed monthly retainer",
          "Guaranteed consistent output and distribution from proven pages",
          "Option to renew, optimize, and scale further after 3 months",
        ],
        details: [
          {
            phase: "Month 1",
            heading: "CPM-Based Mass Clipping & Filtering ($3 / 1K Views)",
            text: "We run a large-scale clipping campaign with roughly 500–1,000 clippers posting across platforms. This is run on a CPM basis at $3 per 1,000 views (₹250 / 1K views) based on your custom view target (minimum 10M views). The objective is not only volume, but filtering: identifying the pages, formats, hooks, and content angles that consistently perform best.",
          },
          {
            phase: "Months 2–3",
            heading: "Retainer for the Best Pages",
            text: "Once the strongest pages are identified, we shortlist the top 10–30 pages and move them to a fixed monthly retainer. At that point, it makes more sense to pay for consistent output and distribution from proven pages rather than continue betting purely on views. We run those selected pages for the next two months and, if the system performs well, renew and scale further.",
          },
        ],
      },
      {
        name: "Normal Clipping (Straight Retainer)",
        subtitle: "For clients who already get consistent views — 36L & 72L monthly tiers",
        overview: "This is for clients who are already getting consistent views and do not need a large testing phase.",
        highlights: [
          "Fixed monthly retainer: 36L (Tier 1) & 72L (Tier 2)",
          "Tier 1: ₹36L / month ($36,000 USD • 132,000 AED / month)",
          "Tier 2: ₹72L / month ($72,000 USD • 264,000 AED / month)",
          "Set number of clips and designated posting frequency",
          "Dedicated page network with strict quality standards",
          "Zero reliance on view volatility — pure dependable execution",
        ],
        details: [
          {
            heading: "Defined Monthly Deliverables & Standards (36L & 72L)",
            text: "Instead of pricing around views, we work on a fixed monthly retainer with defined deliverables: a set number of clips, pages, posting frequency, and quality standards. Tier 1 is priced at ₹36 Lakhs ($36,000 USD / 132,000 AED) and Tier 2 at ₹72 Lakhs ($72,000 USD / 264,000 AED). The focus is on reliable distribution, quality, and building a sustainable clipping system.",
          },
        ],
      },
    ],
    features: [
      {
        title: "Month 1 CPM Testing ($3/1K)",
        desc: "500–1,000 clippers deployed across platforms at $3 per 1,000 views (min 10M views) to test hooks, angles, and pages.",
      },
      {
        title: "Retainer for Winners",
        desc: "Shortlist the top 10–30 performing pages and lock them into a fixed monthly retainer for months 2 and 3.",
      },
      {
        title: "Straight Retainer (36L & 72L)",
        desc: "Skip testing if you already have consistent views: work on a fixed retainer (₹36L & ₹72L • $36K/$72K • 132K/264K AED) with set clips, pages, and frequency.",
      },
      {
        title: "Sustainable System",
        desc: "Pay for consistent, high-quality output and distribution from proven pages rather than continuous view-betting.",
      },
    ],
    benefits: [
      "500–1,000 clippers for large-scale Month 1 testing",
      "Performance-linked CPM pricing ($3 per 1K views • ₹250 / 1K)",
      "Target view inquiry with minimum 10 Million views requirement",
      "Systematic filtering of top hooks, formats, and angles",
      "Shortlist top 10–30 performing pages for monthly retainers",
      "Predictable, guaranteed output and distribution for Months 2–3",
      "Straight normal clipping retainer (36L & 72L tiers • USD & AED supported)",
      "Defined clip count, posting schedule, and strict quality control",
      "Renew, optimize, and scale month after month",
    ],
    processSteps: [
      {
        step: "01",
        title: "Strategy & Audience Alignment",
        desc: "Determine whether your brand requires a 3-month test-and-scale campaign (min 10M views) or an immediate straight retainer (36L/72L).",
      },
      {
        step: "02",
        title: "Month 1 Mass CPM Deployment",
        desc: "If starting with the 3-month model, deploy 500–1,000 clippers at $3 CPM across platforms to discover winning hooks.",
      },
      {
        step: "03",
        title: "Top 10–30 Page Shortlisting",
        desc: "Analyze 30-day analytics and isolate the top 10–30 accounts that generated the strongest retention and reach.",
      },
      {
        step: "04",
        title: "Retainer Transition (Months 2–3)",
        desc: "Contract the winning pages on fixed monthly retainers with defined posting frequency and clip quotas.",
      },
      {
        step: "05",
        title: "Compounding Growth & Scaling",
        desc: "Review 90-day milestone performance, renew retainer contracts, and scale the distribution network further.",
      },
    ],
    faq: [
      {
        question: "How does the CPM to retainer transition work?",
        answer:
          "Month 1 is run on a CPM basis ($3 per 1K views • ₹250 / 1K) with 500–1,000 clippers to filter winning hooks, formats, and pages based on your chosen view volume (minimum 10M views). In Months 2 and 3, we move the top 10–30 performing pages into a fixed monthly retainer for reliable, consistent output.",
      },
      {
        question: "What is the CPM rate and minimum view requirement?",
        answer:
          "Month 1 mass clipping is structured at $3 per 1,000 views (₹250 / 1K views). We ask you how many views you want, with a minimum requirement of 10 Million views.",
      },
      {
        question: "Who should choose the Normal Clipping Straight Retainer?",
        answer:
          "The straight retainer is built for clients who already get consistent views and do not need a testing phase. We offer 36L (Tier 1: ₹36L / $36K USD / 132K AED) and 72L (Tier 2: ₹72L / $72K USD / 264K AED) monthly tiers with defined clip volume, posting frequency, and strict quality standards.",
      },
      {
        question: "What happens after Month 3?",
        answer:
          "If the system performs well and delivers strong ROI, we renew the retainer contracts for your proven pages and can scale the system with additional posting channels.",
      },
    ],
    ctaHref: "mailto:team@getveevz.com?subject=Long-Term%20Distribution%20Model%20Inquiry",
  },
  {
    slug: "short-term-campaign",
    title: "Short-Term Campaign Models",
    tagline: "Concentrated, high-impact distribution for launches, events & narrative surges",
    shortDesc: "Targeted short-term campaigns: CPM-based distribution (fan pages & niche theme pages) or 24-hour seeding through 1M–10M+ accounts.",
    longDesc:
      "Built for immediate impact, product launches, events, and narrative pushes. We offer two clear short-term formats: CPM-based campaigns ($3 / 1K views with a minimum 10M views requirement via mass fan-page clipping or agency-owned theme pages) and immediate high-volume seeding across established accounts starting at ₹6L ($7,200 USD • ~26,500 AED) up to ₹85L+ ($100K+) completed in 24 hours.",
    icon: Rocket,
    color: "text-frost",
    models: [
      {
        name: "CPM-Based Campaign",
        subtitle: "Built for a defined view target — minimum 10 million views requirement",
        overview: "This is built for a defined view target over a concentrated period: tell us how many views you want (min 10M views).",
        highlights: [
          "Format A: Mass fan-page clipping across platforms ($3 / 1K views)",
          "Format B: Agency-owned theme pages in Tech, AI, Business, Education, News",
          "Custom view volume: we ask how many views you want (min. 10M views)",
          "70% native niche content + your content distributed naturally",
          "Pay strictly based on agreed CPM and delivered views",
          "Pages remain in agency network for repeatable future pushes",
        ],
        details: [
          {
            phase: "Format A",
            heading: "Mass Fan-Page Clipping ($3 / 1K Views)",
            text: "A large number of clippers post your content across fan pages and platforms, working toward your agreed view target (min. 10M views) on a CPM basis of $3 per 1,000 views (₹250 / 1K views). This is the fastest way to drive broad distribution and test which content performs at scale.",
          },
          {
            phase: "Format B",
            heading: "Agency-Owned Theme-Page Campaign",
            text: "For more targeted CPM-based distribution, we run your content through theme pages that we already own and operate in your specific niche—such as tech, AI, business, education, or news. These pages are built to feel native to their audience: around 70% of the content is relevant niche content, including clips from recognised people and topics in that space, while your content is distributed naturally within that ecosystem. You pay based on $3/1K CPM and views delivered (min. 10M views). Ideal for product launches, events, or announcements. Once the agreed budget is used, the campaign ends, but the pages remain in our network for future pushes under a new CPM budget.",
          },
        ],
      },
      {
        name: "Seeding Campaign",
        subtitle: "Immediate, high-volume distribution starting at ₹6L ($7,200 USD • ~26,500 AED)",
        overview: "Seeding is for immediate, high-volume distribution through established theme pages completed within 24 hours.",
        highlights: [
          "Starting price: ₹6 Lakhs INR ($7,200 USD • ~26,500 AED)",
          "Distribution through existing pages in AI, tech, business, news & updates",
          "Page tiers ranging from targeted niche pages to 1M, 5M, 10M+ followers",
          "Turnaround within 24 hours of brief and narrative approval",
          "Budget scales from ₹6L ($7,200) up to ₹85L+ ($100,000+) for a single day",
          "Fixed cost per post — we handle page inventory, placements & execution",
        ],
        details: [
          {
            heading: "24-Hour High-Volume Execution",
            text: "We distribute your content or narrative through existing pages in relevant niches—such as AI, tech, business, news, and updates. These can range from smaller targeted pages to pages with 1M, 5M, or 10M+ followers. You provide the brief and the narrative you want spread; we handle the page inventory, placements, and execution. Distribution can be completed within 24 hours.",
          },
          {
            heading: "Budget Parameters & Economics (Starting at ₹6L / $7.2K)",
            text: "The starting seeding budget is ₹6 Lakhs ($7,200 USD / ~26,500 AED), and it can scale to ₹85L+ ($100,000+) for single-day high-volume surges, depending on the reach and inventory required. Every page has its transparent fixed cost per post.",
          },
        ],
      },
    ],
    features: [
      {
        title: "Mass Fan-Page CPM ($3/1K)",
        desc: "Large pool of clippers working toward your chosen view target (min 10M views) at $3 per 1,000 views.",
      },
      {
        title: "Agency-Owned Theme Pages",
        desc: "Targeted distribution in tech, AI, business, education, or news where 70% is native niche content.",
      },
      {
        title: "24-Hour Seeding",
        desc: "Immediate distribution through established pages with up to 1M, 5M, or 10M+ followers.",
      },
      {
        title: "₹6L to ₹85L+ ($7.2K to $100K+) Scale",
        desc: "Fixed cost per post for seeding placements, starting at ₹6 Lakhs ($7,200 / 26.5K AED) up to ₹85L+ ($100,000+) for a single day.",
      },
    ],
    benefits: [
      "Targeted view-based delivery on an agreed CPM budget ($3/1K views)",
      "Minimum 10 Million views target (we ask how many views you want)",
      "Access to agency-owned theme pages (AI, Tech, Business, Education, News)",
      "70/30 native content ratio ensures high audience receptivity",
      "Re-activatable campaign infrastructure for ongoing product pushes",
      "Immediate seeding execution completed within 24 hours",
      "Placements on mega-accounts ranging from 1M to 10M+ followers",
      "Transparent fixed cost per post pricing for seeding",
      "Starting at ₹6L ($7.2K USD • 26.5K AED) up to ₹85L+ ($100,000+) blitz",
    ],
    processSteps: [
      {
        step: "01",
        title: "Brief & Model Selection",
        desc: "Determine your goal: CPM view target (min 10M views at $3/1K) or high-impact 24-hour seeding (starting at ₹6L).",
      },
      {
        step: "02",
        title: "Narrative & Asset Packaging",
        desc: "Review your content and craft hooks and framing that integrate naturally into the target audience ecosystem.",
      },
      {
        step: "03",
        title: "Inventory & Account Allocation",
        desc: "Assign clippers or secure fixed placements across niche theme accounts and 1M–10M+ follower properties.",
      },
      {
        step: "04",
        title: "24-Hour Blitz Deployment",
        desc: "Coordinated distribution goes live across TikTok, Instagram Reels, and YouTube Shorts simultaneously.",
      },
      {
        step: "05",
        title: "Telemetry & Performance Wrap",
        desc: "Deliver transparent view and placement reports upon budget completion; reactivate anytime under a new budget.",
      },
    ],
    faq: [
      {
        question: "What is the difference between fan-page clipping and theme-page campaigns?",
        answer:
          "Fan-page clipping deploys a large pool of clippers across open fan accounts to maximize volume at $3 CPM (minimum 10M views). Theme-page campaigns distribute through accounts we already own and operate in niches like AI, tech, and business, where 70% of the feed is native niche content.",
      },
      {
        question: "How fast can a seeding campaign go live?",
        answer:
          "Once you provide the narrative and creative brief, our team handles all account inventory, placement agreements, and publishing within 24 hours.",
      },
      {
        question: "What is the budget range for seeding?",
        answer:
          "The starting seeding budget is ₹6 Lakhs ($7,200 USD • ~26,500 AED), and it can scale to ₹85L+ ($100,000+) for a single day depending on how much reach and account inventory you require. Every page has its transparent fixed cost per post.",
      },
      {
        question: "What happens after a short-term campaign ends?",
        answer:
          "Once your agreed CPM budget or seeding placements are delivered, the push concludes. Because the theme pages remain part of our agency network, you can run another push anytime under a new budget.",
      },
    ],
    ctaHref: "mailto:team@getveevz.com?subject=Short-Term%20Campaign%20Model%20Inquiry",
  },
  {
    slug: "end-to-end-marketing",
    title: "End-to-End Marketing",
    tagline: "Full-stack content production and omnichannel distribution",
    shortDesc: "Complete hands-off execution: we script, shoot, edit, and distribute high-converting content across all social platforms.",
    longDesc:
      "Built for executive personal brands, product launches, and high-growth companies that need omnipresent reach without internal overhead. We handle the entire pipeline from ideation, studio production, and micro-editing to multi-platform distribution across LinkedIn, X, Instagram, YouTube, and TikTok.",
    icon: Layers,
    color: "text-[#0038E2]",
    models: [
      {
        name: "Full-Stack Production & Distribution",
        subtitle: "In-house creative studio paired with algorithmic distribution network",
        overview: "Everything handled for you end-to-end with zero operational overhead on your team.",
        highlights: [
          "Scripting, recording direction, and cinema-grade editing in-house",
          "Omnichannel syndication across LinkedIn, X, IG Reels, YouTube, and TikTok",
          "Custom hooks, b-roll graphics, sound design, and caption systems",
          "Ideal for venture-backed founders, enterprise leaders, and major launches",
          "Dedicated creative director, editor pod, and distribution manager",
        ],
        details: [
          {
            phase: "Phase 1",
            heading: "Creative Strategy & High-Leverage Scripting",
            text: "We distill your core insights, product thesis, and narrative into high-converting video concepts. Minimal filming time required from you or your team.",
          },
          {
            phase: "Phase 2",
            heading: "Studio Post-Production & Vertical Refinement",
            text: "Our editing bay transforms raw recordings into arresting vertical short-form assets complete with sound engineering, kinetic typography, and motion graphics.",
          },
          {
            phase: "Phase 3",
            heading: "Omnichannel Algorithmic Syndication",
            text: "Content is scheduled and distributed across your owned channels and our extended network, driving compounded reach, authority, and inbound opportunities.",
          },
        ],
      },
    ],
    features: [
      {
        title: "Hands-Off Content Pipeline",
        desc: "We research, script, edit, and publish your content so you focus entirely on your core business.",
      },
      {
        title: "Omnichannel Distribution",
        desc: "Simultaneous distribution across LinkedIn, X, Instagram, YouTube, and Facebook for cross-platform authority.",
      },
      {
        title: "Executive Personal Branding",
        desc: "Designed specifically to establish founders and executives as industry category leaders.",
      },
      {
        title: "Performance Analytics & Iteration",
        desc: "Continuous monthly optimization based on view retention, inbound deal flow, and audience growth.",
      },
    ],
    benefits: [
      "Zero internal production or distribution overhead",
      "Studio-grade sound, color, pacing, and motion graphics",
      "Omnipresence across all Tier-1 social platforms",
      "Rapid turnaround time from recording to live publication",
      "Dedicated account strategist and video production pod",
      "Direct inbound pipeline generation from executive visibility",
    ],
    processSteps: [
      {
        step: "01",
        title: "Brand Voice & Strategy Blueprint",
        desc: "We analyze your audience, category positioning, and narrative goals to define your bespoke content pillars.",
      },
      {
        step: "02",
        title: "Low-Friction Filming Session",
        desc: "A streamlined 60-90 minute monthly recording session produces a month's worth of core assets.",
      },
      {
        step: "03",
        title: "Production & Polish",
        desc: "Our editing team cuts, color grades, and animates assets optimized for platform-specific retention.",
      },
      {
        step: "04",
        title: "Omnichannel Distribution",
        desc: "Content is scheduled, tagged, and distributed across all major networks with active comment and community monitoring.",
      },
      {
        step: "05",
        title: "Insights & Strategy Refinement",
        desc: "Monthly performance reviews identify top-converting formats to systematically double down on ROI.",
      },
    ],
    faq: [
      {
        question: "How much time is required from the founder or executive?",
        answer:
          "Just 60 to 90 minutes per month. Our team prepares all prompts, research, and questions in advance, making the recording session effortless and ultra-efficient.",
      },
      {
        question: "Which platforms are covered under End-to-End Marketing?",
        answer:
          "We distribute natively to LinkedIn, X (Twitter), Instagram Reels, YouTube Shorts & Long-Form, TikTok, and Facebook.",
      },
      {
        question: "Can this service support product launches?",
        answer:
          "Yes. We specialize in coordinated narrative surges where video teasers, founder breakdowns, and demo clips drop synchronously across all channels for maximum launch day impact.",
      },
      {
        question: "Who owns the created video assets?",
        answer:
          "You own 100% of all scripts, raw footage, edited videos, and thumbnail assets created during our engagement.",
      },
    ],
    ctaHref: "mailto:team@getveevz.com?subject=End-to-End%20Marketing%20Inquiry",
  },
];

/**
 * Normalizes slug lookups with alias support (e.g. short-term-campaigns -> short-term-campaign)
 */
export function getServiceBySlug(slug: string): Service | undefined {
  if (slug === "short-term-campaigns") return services.find((s) => s.slug === "short-term-campaign");
  return services.find((s) => s.slug === slug);
}

