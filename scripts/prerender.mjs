import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(distDir)) {
  console.error("Dist directory not found! Run `vite build` first.");
  process.exit(1);
}

const templatePath = path.join(distDir, "index.html");
const templateHtml = fs.readFileSync(templatePath, "utf-8");

const routes = [
  {
    path: "/",
    title: "GetVeevz — Short-Form Video Distribution & Clipping Agency",
    description:
      "GetVeevz turns long-form podcasts, interviews, and keynotes into a compounding short-form distribution engine across TikTok, Instagram Reels, and YouTube Shorts.",
    keywords:
      "short-form video distribution, podcast clipping agency, content repurposing, reels distribution, tiktok agency, youtube shorts distribution",
    canonical: "https://getveevz.com/",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://getveevz.com/#organization",
        name: "GetVeevz",
        url: "https://getveevz.com",
        logo: "https://getveevz.com/assets/Logo.png",
        description:
          "GetVeevz turns long-form podcasts, interviews, and keynotes into coordinated short-form distribution across TikTok, Instagram Reels, and YouTube Shorts.",
        email: "team@getveevz.com",
        sameAs: [
          "https://x.com",
          "https://www.linkedin.com/in/aryankole/",
          "https://youtube.com",
          "https://www.instagram.com/aryan_kole/"
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: "team@getveevz.com"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://getveevz.com/#website",
        url: "https://getveevz.com",
        name: "GetVeevz",
        description: "Short-Form Video Distribution & Clipping Agency",
        publisher: {
          "@id": "https://getveevz.com/#organization"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "@id": "https://getveevz.com/#service",
        name: "GetVeevz Video Distribution",
        url: "https://getveevz.com",
        provider: {
          "@id": "https://getveevz.com/#organization"
        },
        serviceType: "Short-Form Video Distribution & Podcast Clipping",
        areaServed: "Global",
        priceRange: "$$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Distribution Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Long-Term Distribution Models",
                url: "https://getveevz.com/services/long-term-distribution"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Short-Term Campaign Distribution",
                url: "https://getveevz.com/services/short-term-campaign"
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "End-to-End Social Media Marketing",
                url: "https://getveevz.com/services/end-to-end-marketing"
              }
            }
          ]
        }
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Main Navigation">
          <a href="/"><strong>GetVeevz</strong></a>
          <ul>
            <li><a href="/#results">Results</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/#pricing">Pricing</a></li>
            <li><a href="/#questionnaire">Book Strategy Call</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section id="hero">
          <p>Short-Form Video Distribution &amp; Clipping Engine</p>
          <h1>Turn Long-Form Videos into Compounding Short-Form Reach</h1>
          <p>GetVeevz turns long-form podcasts, interviews, and keynotes into a compounding short-form distribution engine across TikTok, Instagram Reels, and YouTube Shorts.</p>
          <div>
            <a href="/#questionnaire">Book Strategy Call</a>
            <a href="/services">Explore Architecture</a>
          </div>
        </section>
        <section id="metrics">
          <h2>Proven Distribution Scale</h2>
          <ul>
            <li><strong>10M+</strong> Monthly Organic Views Delivered</li>
            <li><strong>500–1,000</strong> Active Clipper Network</li>
            <li><strong>3 Platforms</strong> Coordinated Distribution across TikTok, Reels &amp; YouTube Shorts</li>
            <li><strong>100% Done-For-You</strong> Zero Operational Friction</li>
          </ul>
        </section>
        <section id="services-overview">
          <h2>Three Distribution Engines</h2>
          <article>
            <h3><a href="/services/long-term-distribution">Long-Term Distribution Models</a></h3>
            <p>Sustainable, repeatable clipping engines built for compounding reach. 3-Month Test-to-Scale ($1/1K CPM) or fixed monthly retainers ($36K &amp; $72K tiers).</p>
          </article>
          <article>
            <h3><a href="/services/short-term-campaign">Short-Term Campaign Models</a></h3>
            <p>Concentrated, high-impact distribution for launches, events &amp; narrative surges. CPM-based campaign ($3/1K views, min 10M views) or 24-hour high-volume seeding ($8K to $100K+).</p>
          </article>
          <article>
            <h3><a href="/services/end-to-end-marketing">End-to-End Marketing</a></h3>
            <p>We create your videos and post them across all platforms. Scriptwriting, editing, and publishing across LinkedIn, X, Instagram, YouTube, and TikTok.</p>
          </article>
        </section>
        <section id="pricing">
          <h2>Transparent Distribution Pricing</h2>
          <ul>
            <li><strong>Month 1 Testing:</strong> $1 per 1,000 views across 500–1,000 clippers</li>
            <li><strong>3-Month Normal Retainer (Tier 1):</strong> $36,000 total for 90 days</li>
            <li><strong>3-Month Normal Retainer (Tier 2):</strong> $72,000 total for 90 days</li>
            <li><strong>High-Volume Seeding:</strong> Starting at $8,000 up to $100,000+ for single-day blitzes</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. All rights reserved.</p>
        <ul>
          <li><a href="/services">Services</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/cookies">Cookie Policy</a></li>
          <li><a href="/developerid">Developer Verification</a></li>
        </ul>
      </footer>
    `
  },
  {
    path: "/services",
    title: "Distribution Architecture & Services — GetVeevz",
    description:
      "Explore GetVeevz distribution models: 3-month test-to-scale clipping retainers, straight monthly retainers, and high-impact short-term surge seeding campaigns.",
    keywords:
      "video distribution services, podcast clipping retainer, tiktok seeding campaign, done for you video marketing",
    canonical: "https://getveevz.com/services",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getveevz.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://getveevz.com/services"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Distribution Architecture & Services — GetVeevz",
        url: "https://getveevz.com/services",
        description:
          "Explore GetVeevz distribution models: 3-month test-to-scale clipping retainers, straight monthly retainers, and high-impact short-term surge seeding campaigns.",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Long-Term Distribution Models",
              url: "https://getveevz.com/services/long-term-distribution"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Short-Term Campaign Models",
              url: "https://getveevz.com/services/short-term-campaign"
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "End-to-End Marketing",
              url: "https://getveevz.com/services/end-to-end-marketing"
            }
          ]
        }
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><strong>Services</strong></li>
          </ol>
        </nav>
      </header>
      <main>
        <h1>Three Specialized Engines. Zero Vanity Friction.</h1>
        <p>Whether you need ongoing monthly video distribution, an immediate high-impact campaign, or complete end-to-end video creation and posting, we help you get your brand in front of millions of viewers.</p>
        <section>
          <h2>01 / Long-Term Distribution Models</h2>
          <p>Two long-term engagement paths: a 3-month test-and-scale campaign ($1/1K CPM Month 1, retainer for top 10–30 winning pages Months 2–3), or a straight fixed retainer for established brands ($36K &amp; $72K tiers).</p>
          <a href="/services/long-term-distribution">View Breakdown →</a>
        </section>
        <section>
          <h2>02 / Short-Term Campaign Models</h2>
          <p>Concentrated, high-impact distribution for launches, events &amp; narrative surges. CPM-based campaign ($3/1K views, min 10M views) or 24-hour high-volume seeding across 1M–10M+ accounts starting at $8,000.</p>
          <a href="/services/short-term-campaign">View Breakdown →</a>
        </section>
        <section>
          <h2>03 / End-to-End Marketing</h2>
          <p>Complete hands-off execution: we write scripts, edit clips, and publish them directly to LinkedIn, X, Instagram, YouTube, and TikTok.</p>
          <a href="/services/end-to-end-marketing">View Breakdown →</a>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. <a href="/">Back to Home</a></p>
      </footer>
    `
  },
  {
    path: "/services/long-term-distribution",
    title: "Long-Term Distribution Models — GetVeevz",
    description:
      "Two long-term video distribution paths: 3-month test-and-scale clipping campaigns ($1/1K CPM) or fixed monthly retainers with guaranteed output ($36K & $72K tiers).",
    keywords:
      "long-term video distribution, podcast clipping retainer, clipping agency retainer, organic shorts distribution",
    canonical: "https://getveevz.com/services/long-term-distribution",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getveevz.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://getveevz.com/services"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Long-Term Distribution Models",
            item: "https://getveevz.com/services/long-term-distribution"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Long-Term Distribution Models",
        serviceType: "Short-Form Video Distribution & Clipping",
        provider: {
          "@type": "Organization",
          name: "GetVeevz",
          url: "https://getveevz.com"
        },
        description:
          "Two long-term engagement paths: a 3-month test-and-scale campaign, or a straight fixed retainer for established brands.",
        url: "https://getveevz.com/services/long-term-distribution"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does the CPM to retainer transition work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Month 1 is run on a CPM basis at $1 per 1K views. Roughly 500–1,000 clippers test different hooks, formats, and angles. In Months 2 and 3, we move the top 10–30 performing pages into a fixed monthly retainer for reliable, consistent output."
            }
          },
          {
            "@type": "Question",
            name: "What is the CPM rate for the transition model?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Month 1 testing is structured at $1 per 1,000 views. For brands that require a defined view volume, our Short-Term CPM campaign is available at $3 per 1,000 views with a 10 Million views minimum."
            }
          },
          {
            "@type": "Question",
            name: "Who should choose the Normal Clipping 3-Month Retainer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The 3-month straight retainer is built for clients who already get consistent views and do not need a testing phase. We offer Tier 1 at $36K total for 3 months and Tier 2 at $72K total for 3 months with defined clip volume, posting frequency, and strict quality standards."
            }
          },
          {
            "@type": "Question",
            name: "What happens after Month 3?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "If the system performs well and delivers strong ROI, we renew the retainer contracts for your proven pages and can scale the system with additional posting channels."
            }
          }
        ]
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><strong>Long-Term Distribution Models</strong></li>
          </ol>
        </nav>
      </header>
      <main>
        <h1>Long-Term Distribution Models</h1>
        <p>Sustainable, repeatable clipping engines built for compounding reach across TikTok, Reels, and Shorts.</p>
        <section>
          <h2>Model 01: CPM to Retainer Transition (3-Month Plan)</h2>
          <p>Month 1 testing at $1/1K views with 500–1,000 clippers to filter winning hooks and pages. Months 2 &amp; 3 transition top 10–30 performing accounts onto a fixed monthly retainer.</p>
        </section>
        <section>
          <h2>Model 02: Normal Clipping (3-Month Retainer Plan)</h2>
          <p>For brands with established consistency: 3-month fixed retainer commitments across Tier 1 ($36,000 total) and Tier 2 ($72,000 total).</p>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt><strong>How does the CPM to retainer transition work?</strong></dt>
            <dd>Month 1 is run on a CPM basis at $1 per 1K views with 500–1,000 clippers. In Months 2 and 3, the top 10–30 performing pages move into a fixed monthly retainer.</dd>
            <dt><strong>What is the CPM rate?</strong></dt>
            <dd>Month 1 testing is structured at $1 per 1,000 views.</dd>
            <dt><strong>Who should choose the Normal Clipping Retainer?</strong></dt>
            <dd>Clients who already get consistent views and want dependable execution across our $36K &amp; $72K 3-month tiers.</dd>
          </dl>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. <a href="/services">Back to Services</a></p>
      </footer>
    `
  },
  {
    path: "/services/short-term-campaign",
    aliases: ["/services/short-term-campaigns"],
    title: "Short-Term Campaign Models — GetVeevz",
    description:
      "High-impact video campaigns: $3/1K CPM distribution (min 10M views) or rapid 24-hour seeding through 1M–10M+ follower properties starting at $8,000.",
    keywords:
      "video seeding campaign, viral video distribution, cpm campaign, launch video seeding, theme page distribution",
    canonical: "https://getveevz.com/services/short-term-campaign",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getveevz.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://getveevz.com/services"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Short-Term Campaign Models",
            item: "https://getveevz.com/services/short-term-campaign"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Short-Term Campaign Models",
        serviceType: "Short-Form Video Distribution & Seeding",
        provider: {
          "@type": "Organization",
          name: "GetVeevz",
          url: "https://getveevz.com"
        },
        description:
          "Targeted short-term campaigns: CPM-based distribution or 24-hour seeding through 1M–10M+ accounts.",
        url: "https://getveevz.com/services/short-term-campaign"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the difference between fan-page clipping and theme-page campaigns?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Fan-page clipping deploys a large pool of clippers across open fan accounts to maximize volume at $3 CPM (minimum 10M views). Theme-page campaigns distribute through accounts we already own and operate in niches like AI, tech, and business, where 70% of the feed is native niche content."
            }
          },
          {
            "@type": "Question",
            name: "How fast can a seeding campaign go live?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Once you provide the narrative and creative brief, our team handles all account inventory, placement agreements, and publishing within 24 hours."
            }
          },
          {
            "@type": "Question",
            name: "What is the budget range for seeding?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The starting seeding budget is $8,000 USD, and it can scale to $100,000+ for a single day depending on how much reach and account inventory you require. Every page has its transparent fixed cost per post."
            }
          }
        ]
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><strong>Short-Term Campaign Models</strong></li>
          </ol>
        </nav>
      </header>
      <main>
        <h1>Short-Term Campaign Models</h1>
        <p>Concentrated, high-impact distribution for launches, events &amp; narrative surges.</p>
        <section>
          <h2>Model 03: CPM-Based Campaign ($3 / 1K Views)</h2>
          <p>Built for a defined view target (min 10M views). Executed across mass fan-page clipping or agency-owned theme pages in Tech, AI, Business, Education, and News.</p>
        </section>
        <section>
          <h2>Model 04: Seeding Campaign (Starting at $8,000)</h2>
          <p>Immediate, high-volume distribution through established accounts (1M, 5M, 10M+ followers) completed within 24 hours. Scales up to $100,000+ single-day blitzes.</p>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt><strong>How fast can a seeding campaign go live?</strong></dt>
            <dd>Publishing begins within 24 hours of brief and narrative approval.</dd>
            <dt><strong>What is the minimum budget?</strong></dt>
            <dd>Seeding starts at $8,000 USD. CPM campaigns have a 10M views minimum at $3/1K ($30,000).</dd>
          </dl>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. <a href="/services">Back to Services</a></p>
      </footer>
    `
  },
  {
    path: "/services/end-to-end-marketing",
    title: "End-to-End Marketing — GetVeevz",
    description:
      "Done-for-you video creation, editing, and publishing across LinkedIn, X, Instagram Reels, YouTube Shorts, and TikTok. Only 60–90 minutes required per month.",
    keywords:
      "done for you video marketing, executive branding short-form, social media video management, b2b video production",
    canonical: "https://getveevz.com/services/end-to-end-marketing",
    ogType: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getveevz.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://getveevz.com/services"
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "End-to-End Marketing",
            item: "https://getveevz.com/services/end-to-end-marketing"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "End-to-End Marketing",
        serviceType: "Video Production & Multi-Platform Publishing",
        provider: {
          "@type": "Organization",
          name: "GetVeevz",
          url: "https://getveevz.com"
        },
        description:
          "Complete hands-off execution: we write scripts, edit videos, and publish them across all social media platforms.",
        url: "https://getveevz.com/services/end-to-end-marketing"
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How much time is required from me or my team?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Just 60 to 90 minutes per month. We prepare all prompts and scripts in advance, making your recording session quick and effortless."
            }
          },
          {
            "@type": "Question",
            name: "Which platforms do you post to?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We post directly to LinkedIn, X (Twitter), Instagram Reels, YouTube Shorts, TikTok, and Facebook."
            }
          },
          {
            "@type": "Question",
            name: "Who owns the finished video assets?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You own 100% of all scripts, raw footage, and finished videos created during our work together."
            }
          }
        ]
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><strong>End-to-End Marketing</strong></li>
          </ol>
        </nav>
      </header>
      <main>
        <h1>End-to-End Marketing</h1>
        <p>We create your videos and post them across all platforms with 100% done-for-you execution.</p>
        <section>
          <h2>Complete Video Creation &amp; Posting</h2>
          <ul>
            <li>Content Ideas &amp; Scriptwriting tailored to your niche</li>
            <li>Fast, High-Quality Video Editing with custom subtitles &amp; sound design</li>
            <li>Automated Posting across LinkedIn, X, Instagram, YouTube, and TikTok</li>
            <li>Client requires only 60–90 minutes of recording per month</li>
            <li>Full IP Ownership of all raw and edited assets</li>
          </ul>
        </section>
        <section>
          <h2>Frequently Asked Questions</h2>
          <dl>
            <dt><strong>How much time is required from me?</strong></dt>
            <dd>60 to 90 minutes per month for a single guided recording session.</dd>
            <dt><strong>Which platforms do you support?</strong></dt>
            <dd>LinkedIn, X (Twitter), Instagram Reels, YouTube Shorts, and TikTok.</dd>
          </dl>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. <a href="/services">Back to Services</a></p>
      </footer>
    `
  },
  {
    path: "/privacy",
    aliases: ["/privacy-policy"],
    title: "Privacy Policy & Terms — GetVeevz",
    description:
      "Statutory privacy disclosure, data processing policies, and website terms of use under DPDPA 2023, GDPR, CCPA/CPRA, and PIPEDA.",
    keywords: "privacy policy, getveevz privacy, terms of use, dpdpa compliance, gdpr",
    canonical: "https://getveevz.com/privacy",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getveevz.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Privacy Policy",
            item: "https://getveevz.com/privacy"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Privacy Policy & Terms — GetVeevz",
        description: "Official privacy disclosure and governance terms for GetVeevz Inc.",
        url: "https://getveevz.com/privacy"
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><strong>Privacy Policy &amp; Terms</strong></li>
          </ol>
        </nav>
      </header>
      <main>
        <h1>Privacy Policy &amp; Terms of Use</h1>
        <p>Statutory Notice: We collect name, email, and phone number solely to answer inquiries based on consent. We never sell, rent, or trade your data. Retained for 12 months with immediate deletion upon request.</p>
        <section>
          <h2>Designated Grievance &amp; Data Protection Officer</h2>
          <p>GetVeevz Inc. · Official Contact: <a href="mailto:team@getveevz.com">team@getveevz.com</a></p>
        </section>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. <a href="/">Back to Home</a></p>
      </footer>
    `
  },
  {
    path: "/cookies",
    aliases: ["/cookie-policy"],
    title: "Cookie Policy — GetVeevz",
    description:
      "Zero advertising or tracking cookies. Strictly necessary session storage breakdown under EU ePrivacy Directive and UK PECR.",
    keywords: "cookie policy, eprivacy compliance, getveevz cookies",
    canonical: "https://getveevz.com/cookies",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://getveevz.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Cookie Policy",
            item: "https://getveevz.com/cookies"
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Cookie Policy — GetVeevz",
        description: "Statutory Cookie & Browser Storage Policy for GetVeevz Inc.",
        url: "https://getveevz.com/cookies"
      }
    ],
    bodyHtml: `
      <header>
        <nav aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Home</a></li>
            <li><strong>Cookie Policy</strong></li>
          </ol>
        </nav>
      </header>
      <main>
        <h1>Cookie &amp; Storage Policy</h1>
        <p>Zero advertising or marketing trackers. GetVeevz utilizes only strictly necessary temporary session storage to preserve your scroll position and UI preferences, exempt from consent banners under EU ePrivacy Directive 2002/58/EC and UK PECR.</p>
      </main>
      <footer>
        <p>&copy; 2026 GetVeevz Inc. <a href="/">Back to Home</a></p>
      </footer>
    `
  },
  {
    path: "/developerid",
    title: "Developer: Harsh Paigude | GetVeevz",
    description:
      "Architecture, tech stack, and engineering breakdown of GetVeevz.com, developed by Harsh Paigude.",
    keywords: "harsh paigude, getveevz developer, react three.js engineer",
    canonical: "https://getveevz.com/developerid",
    ogType: "profile",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        name: "Developer: Harsh Paigude | GetVeevz",
        url: "https://getveevz.com/developerid"
      }
    ],
    bodyHtml: `
      <header>
        <nav><a href="/">Back to GetVeevz</a></nav>
      </header>
      <main>
        <h1>Harsh Paigude — Architect &amp; Lead Developer</h1>
        <p>Architect &amp; Lead Developer of GetVeevz.com. Built with React 18, TypeScript, Vite, Tailwind CSS, GSAP, and Three.js.</p>
        <p>Contact: <a href="mailto:harshofficial654@gmail.com">harshofficial654@gmail.com</a></p>
      </main>
      <footer>
        <p>GetVeevz.com • Engineering Breakdown</p>
      </footer>
    `
  }
];

function buildPageHtml(route) {
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${route.title}</title>`);

  // Replace Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Keywords
  if (route.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content=".*?"\s*\/?>/s,
      `<meta name="keywords" content="${route.keywords}" />`
    );
  }

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace OpenGraph Title & Description & URL & Type
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/s,
    `<meta property="og:type" content="${route.ogType || "website"}" />`
  );

  // Replace Twitter Title & Description & URL
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:url"\s+content=".*?"\s*\/?>/s,
    `<meta name="twitter:url" content="${route.canonical}" />`
  );

  // Replace JSON-LD
  if (route.jsonLd) {
    const jsonLdStr = JSON.stringify(route.jsonLd, null, 2);
    html = html.replace(
      /<script\s+type="application\/ld\+json">.*?<\/script>/s,
      `<script type="application/ld+json">\n${jsonLdStr}\n    </script>`
    );
  }

  // Inject Semantic HTML inside <div id="root">
  const cleanBody = (route.bodyHtml || "").trim();
  html = html.replace(
    /<div\s+id="root">\s*<\/div>/,
    `<div id="root">${cleanBody}</div>`
  );

  return html;
}

let generatedCount = 0;

for (const route of routes) {
  const pageHtml = buildPageHtml(route);

  const targets = [];
  if (route.path === "/") {
    targets.push(path.join(distDir, "index.html"));
  } else {
    const routeRel = route.path.replace(/^\//, "");
    targets.push(path.join(distDir, `${routeRel}.html`));
    targets.push(path.join(distDir, routeRel, "index.html"));

    if (route.aliases) {
      for (const alias of route.aliases) {
        const aliasRel = alias.replace(/^\//, "");
        targets.push(path.join(distDir, `${aliasRel}.html`));
        targets.push(path.join(distDir, aliasRel, "index.html"));
      }
    }
  }

  for (const targetFile of targets) {
    const dir = path.dirname(targetFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(targetFile, pageHtml, "utf-8");
    generatedCount++;
    console.log(`[SSG] Generated: ${path.relative(distDir, targetFile)}`);
  }
}

console.log(`\nSuccessfully pre-rendered ${generatedCount} static HTML files!`);
