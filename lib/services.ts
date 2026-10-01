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
        name: "CPM to Retainer Transition (3-Month Plan)",
        subtitle: "3-month structured roadmap: Month 1 testing at $1/1K views to filter winning pages, transitioning into a fixed retainer for Months 2 & 3",
        overview: "Best when we want to identify what works first, then scale only the strongest pages.",
        highlights: [
          "Month 1: 500–1,000 clippers deployed on CPM basis ($1 / 1K views)",
          "Performance testing phase for rapid hook discovery & page filtering",
          "Data-driven filtering for winning pages, hooks, formats, and angles",
          "Months 2–3: Top 10–30 pages moved to fixed monthly retainer",
          "Guaranteed consistent output and distribution from proven pages",
          "Option to renew, optimize, and scale further after 3 months",
        ],
        details: [
          {
            phase: "Month 1",
            heading: "CPM-Based Mass Clipping & Filtering ($1 / 1K Views)",
            text: "We run a large-scale clipping campaign with roughly 500–1,000 clippers posting across platforms. This is run on a CPM basis at $1 per 1,000 views (₹85 / 1K views). The objective is not only volume, but filtering: identifying the pages, formats, hooks, and content angles that consistently perform best.",
          },
          {
            phase: "Months 2–3",
            heading: "Retainer for the Best Pages",
            text: "Once the strongest pages are identified, we shortlist the top 10–30 pages and move them to a fixed monthly retainer. At that point, it makes more sense to pay for consistent output and distribution from proven pages rather than continue betting purely on views. We run those selected pages for the next two months and, if the system performs well, renew and scale further.",
          },
        ],
      },
      {
        name: "Normal Clipping (3-Month Retainer Plan)",
        subtitle: "For clients who already get consistent views — 3-month commitment on 36L & 72L tiers",
        overview: "This is for clients who are already getting consistent views and want a dependable 3-month retainer without needing a testing phase.",
        highlights: [
          "3-Month fixed retainer commitment: 36L (Tier 1) & 72L (Tier 2)",
          "Tier 1: $36,000 USD (₹36L • 132,000 AED) for 3 Months ($12K / mo)",
          "Tier 2: $72,000 USD (₹72L • 264,000 AED) for 3 Months ($24K / mo)",
          "Set number of clips and designated posting frequency over 90 days",
          "Dedicated page network with strict quality standards",
          "Zero reliance on view volatility — pure dependable execution",
        ],
        details: [
          {
            heading: "Defined Monthly Deliverables & Standards (36L & 72L)",
            text: "Instead of pricing around views, we work on a fixed 3-month retainer with defined deliverables: a set number of clips, pages, posting frequency, and quality standards. Tier 1 is priced at $36,000 USD (₹36 Lakhs / 132,000 AED) total for 3 months ($12,000/mo equivalent) and Tier 2 at $72,000 USD (₹72 Lakhs / 264,000 AED) total for 3 months ($24,000/mo equivalent). The focus is on reliable distribution, quality, and building a sustainable clipping system.",
          },
        ],
      },
    ],
    features: [
      {
        title: "Month 1 CPM Testing ($1/1K)",
        desc: "500–1,000 clippers deployed across platforms at $1 per 1,000 views to test hooks, angles, and pages.",
      },
      {
        title: "Retainer for Winners",
        desc: "Shortlist the top 10–30 performing pages and lock them into a fixed monthly retainer for months 2 and 3.",
      },
      {
        title: "3-Month Straight Retainer (36L & 72L)",
        desc: "Skip testing if you already have consistent views: work on a 3-month fixed retainer ($36K & $72K • ₹36L & ₹72L • 132K/264K AED total for 3 months, $12K/$24K per month equivalent) with set clips, pages, and frequency.",
      },
      {
        title: "Sustainable System",
        desc: "Pay for consistent, high-quality output and distribution from proven pages rather than continuous view-betting.",
      },
    ],
    benefits: [
      "500–1,000 clippers for large-scale Month 1 testing",
      "Performance-linked CPM pricing ($1 per 1K views • ₹85 / 1K)",
      "Testing phase to discover winning angles and high-performing formats",
      "Systematic filtering of top hooks, formats, and angles",
      "Shortlist top 10–30 performing pages for monthly retainers",
      "Predictable, guaranteed output and distribution for Months 2–3",
      "3-Month normal clipping retainer plan (36L & 72L tiers • USD & AED supported)",
      "Defined clip count, posting schedule, and strict quality control",
      "Renew, optimize, and scale month after month",
    ],
    processSteps: [
      {
        step: "01",
        title: "Strategy & Audience Alignment",
        desc: "Determine whether your brand requires a 3-month test-and-scale campaign ($1/1K CPM) or an immediate 3-month straight retainer (36L/72L).",
      },
      {
        step: "02",
        title: "Month 1 Mass CPM Deployment",
        desc: "If starting with the 3-month model, deploy 500–1,000 clippers at $1 CPM across platforms to discover winning hooks.",
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
          "Month 1 is run on a CPM basis at $1 per 1K views (₹85 / 1K views). Roughly 500–1,000 clippers test different hooks, formats, and angles. In Months 2 and 3, we move the top 10–30 performing pages into a fixed monthly retainer for reliable, consistent output.",
      },
      {
        question: "What is the CPM rate for the transition model?",
        answer:
          "Month 1 testing is structured at $1 per 1,000 views (₹85 / 1K views). For brands that require a defined view volume, our Short-Term CPM campaign is available at $3 per 1,000 views with a 10 Million views minimum.",
      },
      {
        question: "Who should choose the Normal Clipping 3-Month Retainer?",
        answer:
          "The 3-month straight retainer is built for clients who already get consistent views and do not need a testing phase. We offer Tier 1 at $36K USD (₹36L / 132K AED) total for 3 months ($12K / mo equivalent) and Tier 2 at $72K USD (₹72L / 264K AED) total for 3 months ($24K / mo equivalent) with defined clip volume, posting frequency, and strict quality standards.",
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
    tagline: "We create your videos and post them across all platforms",
    shortDesc: "Complete hands-off execution: we write the scripts, edit the videos, and post them across all social media platforms.",
    longDesc:
      "Built for founders, product launches, and growing brands who want a strong social media presence without spending their own time on it. We do everything for you — from video ideas and scripts to professional editing and posting across LinkedIn, X, Instagram, YouTube, and TikTok.",
    icon: Layers,
    color: "text-[#0038E2]",
    models: [
      {
        name: "Complete Video Creation & Posting",
        subtitle: "We create your content in-house and post it directly to your social accounts",
        overview: "Everything handled for you from start to finish with zero effort needed from your team.",
        highlights: [
          "We write scripts, guide your filming, and handle all editing in-house",
          "Regular posting across LinkedIn, X, Instagram Reels, YouTube Shorts, and TikTok",
          "Engaging hooks, clean subtitles, sound design, and motion graphics",
          "Great for founders, executive branding, and product launches",
          "Dedicated video editor and account manager for your brand",
        ],
        details: [
          {
            phase: "Step 1",
            heading: "Content Ideas & Easy Scriptwriting",
            text: "We turn your expertise and company news into engaging video scripts. You only need to spend 60 to 90 minutes a month recording.",
          },
          {
            phase: "Step 2",
            heading: "Fast, High-Quality Video Editing",
            text: "Our editing team turns your raw recordings into clean, engaging short-form videos complete with subtitles, music, and visual graphics.",
          },
          {
            phase: "Step 3",
            heading: "Posting Across All Your Platforms",
            text: "We schedule and post your videos directly to LinkedIn, X, Instagram, YouTube, and TikTok to grow your audience and bring in new opportunities.",
          },
        ],
      },
    ],
    features: [
      {
        title: "Hands-Off Process",
        desc: "We handle research, scripting, editing, and posting so you can stay focused on your business.",
      },
      {
        title: "Multi-Platform Posting",
        desc: "We publish your videos across LinkedIn, X, Instagram, YouTube, and Facebook to reach more people.",
      },
      {
        title: "Founder & Brand Visibility",
        desc: "Built to establish founders as category leaders and build awareness around products.",
      },
      {
        title: "Tracking & Improvement",
        desc: "We check view retention and engagement each month to continually improve what works.",
      },
    ],
    benefits: [
      "Zero time wasted on video editing or posting",
      "Clean captions, great sound, and modern editing on every clip",
      "Consistent presence across every major social platform",
      "Quick turnaround time from your recording to live publication",
      "Dedicated video editor and manager assigned to your brand",
      "Direct inbound leads and followers from regular posting",
    ],
    processSteps: [
      {
        step: "01",
        title: "Strategy & Content Plan",
        desc: "We learn about your brand and audience to decide what topics and formats will work best.",
      },
      {
        step: "02",
        title: "Quick Monthly Recording",
        desc: "A single 60–90 minute recording session gives us enough video material for the entire month.",
      },
      {
        step: "03",
        title: "Editing & Polish",
        desc: "Our editors cut, caption, color-grade, and polish your clips for maximum watch time.",
      },
      {
        step: "04",
        title: "Posting & Scheduling",
        desc: "We schedule and publish your videos across all your accounts at optimal times.",
      },
      {
        step: "05",
        title: "Monthly Review",
        desc: "We review the numbers each month to double down on your top-performing content formats.",
      },
    ],
    faq: [
      {
        question: "How much time is required from me or my team?",
        answer:
          "Just 60 to 90 minutes per month. We prepare all prompts and scripts in advance, making your recording session quick and effortless.",
      },
      {
        question: "Which platforms do you post to?",
        answer:
          "We post directly to LinkedIn, X (Twitter), Instagram Reels, YouTube Shorts, TikTok, and Facebook.",
      },
      {
        question: "Can this help with product launches?",
        answer:
          "Yes. We create coordinated teaser clips, founder explainers, and demo videos timed to launch together on all your platforms.",
      },
      {
        question: "Who owns the finished video assets?",
        answer:
          "You own 100% of all scripts, raw footage, and finished videos created during our work together.",
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

