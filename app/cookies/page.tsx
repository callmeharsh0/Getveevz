"use client";

import React from "react";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { Cookie, Settings, Eye, Sliders, ShieldCheck, HelpCircle } from "lucide-react";

const SECTIONS = [
  { id: "what-are-cookies", title: "What Are Cookies" },
  { id: "cookies-we-use", title: "Categories of Cookies" },
  { id: "local-storage", title: "Local & Session Storage" },
  { id: "third-party", title: "Third-Party Technologies" },
  { id: "managing-cookies", title: "Managing Your Preferences" },
  { id: "updates", title: "Updates to This Policy" },
];

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="How GetVeevz utilizes cookies, session tokens, and local storage to optimize interface performance and user experience."
      description="Read the official GetVeevz Cookie Policy. Understand the technical cookies, preference storage, and analytical tools we implement across our web platforms."
      canonical="https://getveevz.com/cookie-policy"
      sections={SECTIONS}
    >
      {/* 01. What Are Cookies */}
      <section id="what-are-cookies" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Cookie className="w-4 h-4 text-[#0038E2]" />
          <span>01. What Are Cookies</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Understanding Cookies & Web Identifiers
        </h2>
        <p>
          Cookies are small alphanumeric text files placed onto your computer, smartphone, or tablet when you browse websites. They are widely used by modern web applications to enable essential site navigation, preserve active sessions, memorize user preferences (such as selected currency or volume states), and provide non-identifiable telemetry to improve page speed and user flow.
        </p>
        <p>
          This Cookie Policy explains how GetVeevz Inc. (&ldquo;GetVeevz&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) deploys cookies and similar browser storage technologies across <span className="font-mono text-white text-xs">getveevz.com</span>.
        </p>
      </section>

      {/* 02. Categories of Cookies */}
      <section id="cookies-we-use" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Sliders className="w-4 h-4 text-[#0038E2]" />
          <span>02. Categories of Cookies</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          How We Categorize Our Cookies
        </h2>
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-display font-semibold text-white text-base">
                1. Strictly Necessary Cookies (Essential)
              </h4>
              <span className="text-[10px] font-mono text-[#0038E2] uppercase font-semibold px-2 py-0.5 rounded bg-[#0038E2]/15">
                Always Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              These cookies and session tokens are strictly required for the core architectural functioning of our single-page application. They enable basic security headers, SSL routing, layout rendering, and form submission handshakes. Without these, the website cannot function properly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-display font-semibold text-white text-base">
                2. Functional & Preference Storage
              </h4>
              <span className="text-[10px] font-mono text-[#8BA3C6] uppercase font-semibold px-2 py-0.5 rounded bg-white/[0.08]">
                Functional
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              These allow our site to remember decisions you make while navigating, such as your selected currency view (USD, INR, or AED) on our pricing tables, or keeping your lead questionnaire answers intact if you browse our service architecture before submitting.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-display font-semibold text-white text-base">
                3. Analytical & Performance Telemetry
              </h4>
              <span className="text-[10px] font-mono text-[#8BA3C6] uppercase font-semibold px-2 py-0.5 rounded bg-white/[0.08]">
                Performance
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              We collect aggregated, anonymized metrics on page response times, video player interactions, bounce rates, and navigation paths. This data helps our engineering team optimize our GPU-accelerated canvas components and ensure rapid first-contentful-paint (FCP).
            </p>
          </div>
        </div>
      </section>

      {/* 03. Local & Session Storage */}
      <section id="local-storage" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Settings className="w-4 h-4 text-[#0038E2]" />
          <span>03. Local & Session Storage</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Client-Side Storage Keys
        </h2>
        <p>
          In addition to conventional HTTP cookies, our website utilizes HTML5 SessionStorage for enhanced single-page navigation:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono space-y-2">
          <div className="flex justify-between border-b border-white/[0.06] pb-1.5">
            <span className="text-[#8BA3C6]">getveevz_home_scroll_y</span>
            <span className="text-white/60">Stores window scroll position when switching between Home and Services</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-[#8BA3C6]">Expiration</span>
            <span className="text-white/60">Session only (cleared automatically upon tab closure)</span>
          </div>
        </div>
      </section>

      {/* 04. Third-Party Technologies */}
      <section id="third-party" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Eye className="w-4 h-4 text-[#0038E2]" />
          <span>04. Third-Party Technologies</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          External Service Providers & CDNs
        </h2>
        <p>
          Our application integrates with trusted third-party providers who may place limited cookies to serve high-performance web assets:
        </p>
        <ul className="space-y-2 list-disc list-inside text-white/75 text-sm">
          <li>
            <strong className="text-white font-medium">Google Fonts & Typography CDNs:</strong> Used for fast font delivery across devices.
          </li>
          <li>
            <strong className="text-white font-medium">Cloud Hosting (Vercel):</strong> Edge routing cookies for DDoS mitigation and geographically localized asset caching.
          </li>
          <li>
            <strong className="text-white font-medium">Social Video Embedding:</strong> Interactive video demonstrations may load platform players that manage their own playback cookies.
          </li>
        </ul>
      </section>

      {/* 05. Managing Your Preferences */}
      <section id="managing-cookies" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Sliders className="w-4 h-4 text-[#0038E2]" />
          <span>05. Managing Your Preferences</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          How to Disable or Clear Cookies
        </h2>
        <p>
          You have the right to accept or decline cookies at any time through your browser controls. Most web browsers allow you to view, manage, delete, and block cookies for a specific site or globally:
        </p>
        <ul className="space-y-2 list-disc list-inside text-white/75 text-sm">
          <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies</li>
          <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data</li>
          <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy & Security &rarr; Cookies and Site Data</li>
          <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions</li>
        </ul>
        <p className="text-xs text-white/60">
          * Note: If you choose to reject strictly necessary cookies, some interactive features (such as instant back-scroll navigation or currency switches) may not function as intended.
        </p>
      </section>

      {/* 06. Updates to This Policy */}
      <section id="updates" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <HelpCircle className="w-4 h-4 text-[#0038E2]" />
          <span>06. Updates to This Policy</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Periodic Policy Revisions
        </h2>
        <p>
          We may update this Cookie Policy from time to time to reflect modifications in our technology stack, browser privacy standards, or regulatory mandates. The date at the top of this document indicates when it was last revised.
        </p>
      </section>
    </LegalPageLayout>
  );
}
