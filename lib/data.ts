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
    question: "What exactly does GetVeevz do?",
    answer:
      "We turn your existing long-form content into coordinated short-form distribution across Instagram, YouTube Shorts, and TikTok — handling clipping, campaign coordination, distribution, and tracking.",
  },
  {
    question: "What type of content can we use?",
    answer: "Podcasts, interviews, talks, and other long-form video you already produce.",
  },
  {
    question: "Which platforms do you work with?",
    answer: "Instagram, YouTube Shorts, and TikTok.",
  },
  {
    question: "Who creates the clips?",
    answer: "Our managed clipping network, coordinated through your campaign.",
  },
  {
    question: "Where are the clips posted?",
    answer: "Across a distribution network of short-form accounts matched to your campaign.",
  },
  {
    question: "How does the campaign work?",
    answer: "You provide the content, we build the campaign structure and requirements, clips go live, then we track and optimize.",
  },
  {
    question: "How long does onboarding take?",
    answer: "PLACEHOLDER — confirm timeline before publishing.",
  },
  {
    question: "How much does it cost?",
    answer: "PLACEHOLDER — confirm pricing approach before publishing.",
  },
  {
    question: "What results can we expect?",
    answer: "PLACEHOLDER — do not promise guaranteed results unless officially approved.",
  },
];
