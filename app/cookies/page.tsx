"use client";

import React from "react";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { Cookie, Settings, Eye, Mail, ShieldCheck, CheckCircle2, Lock } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="A clear, globally compliant disclosure regarding cookies and browser storage on GetVeevz."
      description="We do not use advertising or tracking cookies. We only use minimal temporary session storage to preserve your navigation position and UI preferences. Fully compliant with EU ePrivacy Directive and UK PECR."
      canonical="https://getveevz.com/cookie-policy"
      sections={[
        { id: "core-notice", title: "Notice of Storage" },
        { id: "storage-breakdown", title: "Storage Breakdown" },
        { id: "legal-basis", title: "ePrivacy Exemption" },
        { id: "browser-controls", title: "Browser Management" },
        { id: "grievance", title: "Grievance Contact" },
      ]}
    >
      <div className="space-y-8 sm:space-y-12">
        {/* 01. Core Watertight Notice Statement Card */}
        <section id="core-notice" className="scroll-mt-28 space-y-3 sm:space-y-4">
          <div className="p-5 xs:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0038E2]/[0.035] border-l-4 border-l-[#0038E2] border border-[#0038E2]/20 relative overflow-hidden shadow-xs">
            <div
              aria-hidden="true"
              className="absolute -top-8 -right-8 w-48 h-48 bg-[#0038E2]/[0.08] blur-[60px] rounded-full pointer-events-none"
            />
            <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-wider text-[#0038E2] bg-[#0038E2]/10 border border-[#0038E2]/20 px-2.5 sm:px-3 py-1 rounded-full uppercase font-semibold">
                Cookie &amp; Storage Notice
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#495B7D] bg-white border border-[#111111]/10 px-2.5 py-1 rounded-full font-medium">
                EU ePrivacy Directive · UK PECR · DPDPA · CCPA
              </span>
            </div>
            <p className="font-display font-medium text-base xs:text-lg sm:text-xl lg:text-2xl text-[#111111] leading-snug sm:leading-snug tracking-tight">
              &ldquo;We do not use advertising, marketing, or tracking cookies. We only use minimal, strictly necessary temporary session storage to preserve your navigation position and user interface preferences across pages. Under EU ePrivacy Directive 2002/58/EC and UK PECR, strictly necessary storage does not require consent. For queries, contact our Grievance Officer at team@getveevz.com.&rdquo;
            </p>
          </div>
        </section>

        {/* 02. Breakdown Bento Grid (Flywheel Palette) */}
        <section id="storage-breakdown" className="scroll-mt-28 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <Cookie className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>01. Browser Storage Breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <Cookie className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                Zero Ad Trackers
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                Zero third-party advertising cookies, zero Meta/TikTok tracking pixels, and zero cross-site behavioral tracking tools. Your browsing history is never tracked or profiled.
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <Settings className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                Essential Session Storage
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                Session storage key (<code className="text-[#0038E2] font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#111111]/10 break-all sm:break-normal inline-block">getveevz_home_scroll_y</code>) temporarily saves your vertical scroll position to restore your view smoothly. It is automatically cleared when you close your browser tab.
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <Eye className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                UI Preference Storage
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                Local storage is only used to remember harmless user preferences (such as selected currency selector <code className="text-[#0038E2] font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-[#111111]/10 inline-block">$ / ₹ / £</code>) so you don&rsquo;t have to re-select it upon reload.
              </p>
            </div>
          </div>
        </section>

        {/* 03. Statutory Exemption Disclosure */}
        <section id="legal-basis" className="scroll-mt-28 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>02. Legal Basis &amp; Consent Exemption</span>
          </div>

          <div className="p-5 xs:p-6 sm:p-7 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-3">
            <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
              Why GetVeevz Does Not Require an Intrusive Cookie Banner
            </h4>
            <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
              Under <strong>Article 5(3) of the EU ePrivacy Directive (Directive 2002/58/EC)</strong> and <strong>Regulation 6 of the UK Privacy and Electronic Communications Regulations (PECR)</strong>, storage of information or access to information stored in a user&rsquo;s terminal equipment is strictly permitted without prior consent if:
            </p>
            <ul className="text-xs sm:text-sm text-[#495B7D] list-disc list-inside space-y-1.5 pl-1 leading-relaxed">
              <li>It is strictly necessary for transmitting communications over an electronic network.</li>
              <li>It is strictly necessary for providing an information society service explicitly requested by the subscriber or user (e.g. maintaining your scroll state and currency display).</li>
            </ul>
            <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed pt-1">
              Because GetVeevz uses zero non-essential marketing, tracking, or profiling cookies, no cookie consent banner is legally required under European, British, or international data protection laws.
            </p>
          </div>
        </section>

        {/* 04. Browser Management Guide */}
        <section id="browser-controls" className="scroll-mt-28 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <Lock className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>03. How to Manage or Clear Browser Storage</span>
          </div>

          <div className="p-5 xs:p-6 sm:p-7 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-3">
            <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
              You have complete control over your browser&rsquo;s storage. You can inspect, block, or clear cookies and session/local storage at any time through your browser settings:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-[#111111]/10 space-y-1 shadow-2xs">
                <span className="font-display font-semibold text-[#111111] block">Google Chrome</span>
                <span className="text-[#495B7D] text-[11px] leading-relaxed block">Settings &gt; Privacy and Security &gt; Third-party cookies</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#111111]/10 space-y-1 shadow-2xs">
                <span className="font-display font-semibold text-[#111111] block">Apple Safari</span>
                <span className="text-[#495B7D] text-[11px] leading-relaxed block">Preferences &gt; Privacy &gt; Block all cookies / Manage Data</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#111111]/10 space-y-1 shadow-2xs">
                <span className="font-display font-semibold text-[#111111] block">Mozilla Firefox</span>
                <span className="text-[#495B7D] text-[11px] leading-relaxed block">Settings &gt; Privacy &amp; Security &gt; Cookies and Site Data</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-[#111111]/10 space-y-1 shadow-2xs">
                <span className="font-display font-semibold text-[#111111] block">Microsoft Edge</span>
                <span className="text-[#495B7D] text-[11px] leading-relaxed block">Settings &gt; Cookies and Site Permissions &gt; Manage</span>
              </div>
            </div>
          </div>
        </section>

        {/* 05. Grievance Officer & Contact Block */}
        <section id="grievance" className="scroll-mt-28 space-y-3.5 sm:space-y-4 pt-4 border-t border-[#111111]/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>04. Grievance Officer &amp; Redressal Contact</span>
          </div>

          <div className="p-5 xs:p-6 sm:p-7 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 shadow-2xs">
            <div className="space-y-1.5 max-w-xl">
              <div className="text-[10px] sm:text-[11px] font-mono text-[#0038E2] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0038E2] shrink-0" />
                <span>Grievance &amp; Privacy Officer</span>
              </div>
              <div className="font-display font-medium text-base sm:text-lg text-[#111111]">
                Grievance &amp; Privacy Officer
              </div>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                GetVeevz Inc. · Official Contact for Cookie &amp; Storage Redressal. Response committed within 24–48 business hours.
              </p>
            </div>

            <a
              href="mailto:team@getveevz.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#F3EFEA] border border-[#111111]/12 hover:border-[#0038E2]/40 text-xs font-mono text-[#111111] transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
            >
              <Mail className="w-3.5 h-3.5 text-[#0038E2]" />
              <span>team@getveevz.com</span>
            </a>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
