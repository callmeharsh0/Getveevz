"use client";

import React from "react";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import {
  User,
  Clock,
  ShieldCheck,
  Mail,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Globe2,
  AlertCircle,
  Scale,
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy & Terms"
      subtitle="A clear, globally compliant disclosure of how GetVeevz handles contact inquiries and governs website usage."
      description="We collect your name, email, and phone number solely to respond to your enquiry based on your consent. We never sell or share your data. Retained for 12 months with immediate deletion on request. Contact our Grievance Officer at team@getveevz.com."
      canonical="https://getveevz.com/privacy-policy"
      sections={[
        { id: "core-notice", title: "Notice of Collection" },
        { id: "collection-purpose", title: "Data & Purpose" },
        { id: "global-rights", title: "Global Privacy Rights" },
        { id: "security-transfers", title: "Security & Retention" },
        { id: "terms", title: "Website Terms of Use" },
        { id: "grievance", title: "Grievance Officer" },
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
                Statutory Notice of Collection
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#495B7D] bg-white border border-[#111111]/10 px-2.5 py-1 rounded-full font-medium">
                DPDPA 2023 · GDPR (EU/UK) · CCPA/CPRA · PIPEDA
              </span>
            </div>
            <p className="font-display font-medium text-base xs:text-lg sm:text-xl lg:text-2xl text-[#111111] leading-snug sm:leading-snug tracking-tight">
              &ldquo;We collect your name, email, and phone number solely to respond to your enquiry based on your consent. We never sell, rent, or share your personal data with third parties. Data is retained for up to 12 months, and you may request its immediate deletion at any time. For questions, data requests, or statutory grievance redressal, contact our Grievance Officer at team@getveevz.com.&rdquo;
            </p>
          </div>
        </section>

        {/* 02. Breakdown Bento Grid (Balanced 2x2 on Desktop) */}
        <section id="collection-purpose" className="scroll-mt-28 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>01. Data Collection &amp; Lawful Processing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <User className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                Data Collected
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                Only basic identifiers (name, email address, phone number, and message text) that you voluntarily supply via contact forms or direct email. No sensitive personal data, payment info, or background trackers are ever collected.
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                Sole Purpose &amp; Basis
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                Processed strictly under your consent and legitimate interests (GDPR Art. 6(1)(a)/(f) &amp; India DPDPA Sec. 5/6) to evaluate and answer your specific inquiry. Data is never repurposed for marketing lists or third-party ad targeting.
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                Zero Data Selling (CCPA/CPRA)
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                We never sell, rent, trade, or share personal data with third parties, data brokers, or marketing networks for cross-context behavioral ads (California Civil Code § 1798.120). There is zero commercial monetization of your data.
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-[#0038E2]/10 border border-[#0038E2]/20 flex items-center justify-center text-[#0038E2]">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base">
                12-Month Retention Cycle
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                Data is retained for a maximum of 12 months after your latest communication to maintain context, after which it is purged automatically. You hold the right to request immediate erasure at any point.
              </p>
            </div>
          </div>
        </section>

        {/* 03. Global Rights Bento Cards */}
        <section id="global-rights" className="scroll-mt-28 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <Globe2 className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>02. Your Statutory Privacy Rights Worldwide</span>
          </div>

          <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
            Whether you reside in India (DPDPA 2023), the European Union / United Kingdom (GDPR), the United States (CCPA/CPRA), Canada (PIPEDA), or Australia (Privacy Act), you are guaranteed universal data rights:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#F8F6F2] sm:bg-white border border-[#111111]/10 shadow-2xs space-y-1">
              <span className="text-[11px] font-mono text-[#0038E2] font-semibold uppercase">Right to Access / Know</span>
              <p className="text-xs text-[#495B7D] leading-relaxed">
                Request confirmation of whether we hold your contact information and receive a structured copy.
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#F8F6F2] sm:bg-white border border-[#111111]/10 shadow-2xs space-y-1">
              <span className="text-[11px] font-mono text-[#0038E2] font-semibold uppercase">Right to Erasure</span>
              <p className="text-xs text-[#495B7D] leading-relaxed">
                Request the immediate, permanent deletion of your contact records from our active inboxes at any time.
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#F8F6F2] sm:bg-white border border-[#111111]/10 shadow-2xs space-y-1">
              <span className="text-[11px] font-mono text-[#0038E2] font-semibold uppercase">Right to Rectification</span>
              <p className="text-xs text-[#495B7D] leading-relaxed">
                Request instant correction of any outdated or inaccurate email address, phone number, or name.
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#F8F6F2] sm:bg-white border border-[#111111]/10 shadow-2xs space-y-1">
              <span className="text-[11px] font-mono text-[#0038E2] font-semibold uppercase">Right to Withdraw Consent</span>
              <p className="text-xs text-[#495B7D] leading-relaxed">
                Revoke your consent for future communication at any moment with immediate effect and zero penalty.
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#F8F6F2] sm:bg-white border border-[#111111]/10 shadow-2xs space-y-1">
              <span className="text-[11px] font-mono text-[#0038E2] font-semibold uppercase">Non-Discrimination (CCPA)</span>
              <p className="text-xs text-[#495B7D] leading-relaxed">
                We will never deny communication, alter responsiveness, or penalize you for exercising any privacy right.
              </p>
            </div>

            <div className="p-4 rounded-xl sm:rounded-2xl bg-[#F8F6F2] sm:bg-white border border-[#111111]/10 shadow-2xs space-y-1">
              <span className="text-[11px] font-mono text-[#0038E2] font-semibold uppercase">No Automated Profiling</span>
              <p className="text-xs text-[#495B7D] leading-relaxed">
                We perform no automated decision-making or behavioral profiling on your personal information (GDPR Art. 22).
              </p>
            </div>
          </div>
        </section>

        {/* 04. Security, International Transfers & Minors */}
        <section id="security-transfers" className="scroll-mt-28 space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <Lock className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>03. Data Security, Infrastructure &amp; Minors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2">
              <h5 className="font-display font-semibold text-[#111111] text-sm sm:text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#0038E2] shrink-0" />
                <span>Security &amp; Encryption</span>
              </h5>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                All inquiries submitted across our site are transmitted via TLS 1.3 / HTTPS encryption and stored on secure cloud hosting infrastructure with strict access controls restricted to authorized personnel. Technical routing adheres to Standard Contractual Clauses (SCCs).
              </p>
            </div>

            <div className="p-4 xs:p-5 sm:p-6 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-2">
              <h5 className="font-display font-semibold text-[#111111] text-sm sm:text-base flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#0038E2] shrink-0" />
                <span>Protection of Minors</span>
              </h5>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                This website is intended exclusively for business professionals and adults aged 18 and older. We do not knowingly solicit or collect personal information from individuals under 18 (or under 16 in applicable jurisdictions). Any unintentionally collected data will be deleted immediately upon notice.
              </p>
            </div>
          </div>
        </section>

        {/* 05. Website Terms of Use (Consolidated & Clean) */}
        <section id="terms" className="scroll-mt-28 space-y-3.5 sm:space-y-4 pt-4 border-t border-[#111111]/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <Scale className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>04. Website Terms of Use</span>
          </div>

          <div className="p-5 xs:p-6 sm:p-7 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 space-y-4">
            <div>
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base mb-1.5">
                Acceptable Use &amp; Intellectual Property
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                By accessing this website, you agree not to engage in automated data scraping, malicious penetration testing, injection attacks, or reverse engineering of the site&rsquo;s codebase. All original website copy, graphics, branding, and design elements are the intellectual property of GetVeevz Inc. and are protected by international copyright laws.
              </p>
            </div>

            <div className="pt-3 border-t border-[#111111]/10">
              <h4 className="font-display font-semibold text-[#111111] text-sm sm:text-base mb-1.5">
                Informational Disclaimer
              </h4>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                The content provided on this website is for general informational purposes only. While we endeavor to keep the website reliable and available, access is provided &ldquo;as is&rdquo; without warranties of uninterrupted uptime or error-free transmission.
              </p>
            </div>
          </div>
        </section>

        {/* 06. Grievance Officer & Statutory Redressal Block */}
        <section id="grievance" className="scroll-mt-28 space-y-3.5 sm:space-y-4 pt-4 border-t border-[#111111]/10">
          <div className="flex items-center gap-2 text-xs font-mono text-[#0038E2] uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#0038E2] shrink-0" />
            <span>05. Grievance Officer &amp; Redressal Mechanism</span>
          </div>

          <div className="p-5 xs:p-6 sm:p-7 rounded-2xl bg-[#F8F6F2] border border-[#111111]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 shadow-2xs">
            <div className="space-y-1.5 max-w-xl">
              <div className="text-[10px] sm:text-[11px] font-mono text-[#0038E2] uppercase tracking-wider font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0038E2] shrink-0" />
                <span>Designated Grievance &amp; Data Protection Officer (DPDPA 2023)</span>
              </div>
              <div className="font-display font-medium text-base sm:text-lg text-[#111111]">
                Grievance &amp; Data Protection Officer
              </div>
              <p className="text-xs sm:text-sm text-[#495B7D] leading-relaxed">
                GetVeevz Inc. · Official Contact for Data Requests, Erasure &amp; Compliance Inquiries. Response committed within 24–48 business hours.
              </p>
              <p className="text-[10px] sm:text-[11px] font-mono text-[#495B7D]/80 pt-1 leading-relaxed">
                Statutory escalation: If you are unsatisfied with our redressal, you retain the statutory right to lodge a complaint with your supervisory authority: Data Protection Board of India, EU/UK Data Protection Authorities, or the California Privacy Protection Agency.
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
