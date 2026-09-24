// Central content file. Swap for Sanity/Contentlayer fetchers once
// case studies and verified numbers are approved (see brief, section 6).

export type CaseStudy = {
  client: string;
  campaign: string;
  execution: string;
  results: string; // e.g. "4.2M views across 38 clips"
  logo?: string;
  clipUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    client: "PLACEHOLDER — pending approval",
    campaign: "Describe the campaign brief here",
    execution: "Describe clipping/distribution approach here",
    results: "Insert verified metric here",
  },
];

export type ProofLogo = {
  name: string;
  logoUrl?: string;
};

// Only populate once client confirms which logos can be publicly displayed.
export const proofLogos: ProofLogo[] = [];

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: "What does GetVeevz do?",
    answer:
      "You send us your long videos (podcasts, talks, or interviews), and we turn them into high-performing short clips. We handle everything: editing, posting across Instagram, YouTube Shorts, and TikTok, and tracking your views.",
  },
  {
    question: "What kind of videos can I provide?",
    answer:
      "Any long-form video you already have — like podcast episodes, keynote speeches, YouTube videos, founder interviews, or webinars.",
  },
  {
    question: "Which platforms do you post on?",
    answer:
      "We focus on the top three short-form video platforms: Instagram Reels, YouTube Shorts, and TikTok.",
  },
  {
    question: "Who edits the clips?",
    answer:
      "Our in-house team of video editors. They hand-craft every clip with engaging hooks, clear captions, and sound design to keep viewers watching.",
  },
  {
    question: "Where are the clips posted?",
    answer:
      "We post clips on your main social channels as well as across relevant community pages in your niche to get your videos in front of fresh audiences.",
  },
  {
    question: "How much of my time does this take?",
    answer:
      "Almost none. You just share your video links or files with us. Our team picks the best moments, edits the clips, and manages the posting schedule.",
  },
  {
    question: "How quickly do we get started?",
    answer:
      "Typically within 48 to 72 hours. Once we get access to your content, our editors create the first batch of clips and start rolling them out.",
  },
  {
    question: "How do I track performance?",
    answer:
      "You get a live dashboard that shows total views, watch time, and follower growth in real time, plus weekly summary reports.",
  },
];
