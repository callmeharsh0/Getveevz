"use client";

import React from "react";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { Shield, Lock, Eye, FileText, Database, UserCheck, Bell } from "lucide-react";

const SECTIONS = [
  { id: "intro", title: "Introduction & Scope" },
  { id: "information-collected", title: "Information We Collect" },
  { id: "use-of-information", title: "How We Use Data" },
  { id: "content-confidentiality", title: "Video & Clipper Confidentiality" },
  { id: "data-sharing", title: "Third-Party Disclosures" },
  { id: "retention-security", title: "Storage & Security" },
  { id: "your-rights", title: "GDPR & Privacy Rights" },
  { id: "contact", title: "Contact & Legal Inquiries" },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="How GetVeevz collects, safeguards, and processes client information, campaign assets, and distribution data."
      description="Read the official GetVeevz Privacy Policy. Learn about our strict content confidentiality, clippers network security, data collection, and GDPR compliance."
      canonical="https://getveevz.com/privacy-policy"
      sections={SECTIONS}
    >
      {/* 01. Introduction & Scope */}
      <section id="intro" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Shield className="w-4 h-4 text-[#0038E2]" />
          <span>01. Introduction & Scope</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Commitment to Client Privacy & Asset Integrity
        </h2>
        <p>
          GetVeevz Inc. (&ldquo;GetVeevz&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates a premier short-form video distribution and performance clipping agency accessible at{" "}
          <span className="text-white font-mono text-xs">getveevz.com</span>. We engineer high-velocity distribution across TikTok, Instagram Reels, YouTube Shorts, and proprietary niche theme networks.
        </p>
        <p>
          This Privacy Policy details the protocols we follow regarding the collection, processing, protection, and retention of personal identification information, technical telemetry, and proprietary media assets shared by clients, brands, executives, creators, and website visitors.
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-l-[#0038E2] border border-white/[0.06] text-xs sm:text-sm text-white/85">
          <strong className="text-white font-medium">Core Principle:</strong> We treat your raw video assets, strategic distribution narratives, and audience data with strict confidentiality. We never sell, rent, or lease your content to third-party data brokers or AI model trainers without explicit written consent.
        </div>
      </section>

      {/* 02. Information We Collect */}
      <section id="information-collected" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Database className="w-4 h-4 text-[#0038E2]" />
          <span>02. Information We Collect</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Categories of Information Collected
        </h2>
        <p>
          Depending on your level of engagement with our agency, we collect and process the following categories of information:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="font-display font-semibold text-white text-base">
              A. Client Intake & Lead Information
            </h4>
            <p className="text-xs text-white/70">
              When you submit our intake questionnaire, book a strategy call, or communicate via email, we collect your full name, company name, corporate email address, WhatsApp/phone number, executive role, and social media/website URLs.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="font-display font-semibold text-white text-base">
              B. Campaign Assets & Raw Media
            </h4>
            <p className="text-xs text-white/70">
              Video files, audio stems, transcripts, keynote recordings, brand guidelines, typography assets, logos, and narrative briefs provided by you for the creation of short-form clips and seeding pushes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="font-display font-semibold text-white text-base">
              C. Campaign Performance Analytics
            </h4>
            <p className="text-xs text-white/70">
              Public performance indicators generated by distributed clips, including view counts, retention curves, click-through signals, comment velocity, and follower growth trends across platform endpoints.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="font-display font-semibold text-white text-base">
              D. Technical & Telemetry Data
            </h4>
            <p className="text-xs text-white/70">
              Browser specifications, IP addresses, operating system metadata, referral URLs, time zones, device screen resolutions, and navigation interactions while reviewing our website.
            </p>
          </div>
        </div>
      </section>

      {/* 03. How We Use Data */}
      <section id="use-of-information" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Eye className="w-4 h-4 text-[#0038E2]" />
          <span>03. How We Use Data</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Purpose and Lawful Basis of Processing
        </h2>
        <p>
          We utilize your data strictly in accordance with contractual necessity, legitimate business interests, and applicable international privacy frameworks for:
        </p>
        <ul className="space-y-2.5 list-disc list-inside text-white/75 text-sm sm:text-base">
          <li>
            <strong className="text-white font-medium">Delivering Distribution Services:</strong> Deploying our creator pools, executing hook discovery experiments, managing 24-hour seeding runs, and distributing content across verified accounts.
          </li>
          <li>
            <strong className="text-white font-medium">Performance Projections:</strong> Analyzing your niche positioning, historical engagement baselines, and producing algorithmic reach estimates.
          </li>
          <li>
            <strong className="text-white font-medium">Contractual Operations & Billing:</strong> Processing retainer milestone invoices, campaign budget allocations, and performance verification logs.
          </li>
          <li>
            <strong className="text-white font-medium">Security & Fraud Prevention:</strong> Protecting our creator roster, verifying client legitimacy, and enforcing anti-spam and intellectual property compliance.
          </li>
        </ul>
      </section>

      {/* 04. Video & Clipper Confidentiality */}
      <section id="content-confidentiality" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Lock className="w-4 h-4 text-[#0038E2]" />
          <span>04. Video & Clipper Confidentiality</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Creator Network Protocols & NDA Standards
        </h2>
        <p>
          GetVeevz coordinates a vetted network of video clippers, editors, and theme-page operators. To ensure complete asset safety:
        </p>
        <div className="space-y-3">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h5 className="font-display font-semibold text-white text-sm mb-1">
              Strict Non-Disclosure Agreements (NDAs)
            </h5>
            <p className="text-xs text-white/70">
              All clippers and editors participating in our network operate under legally binding NDAs. Unreleased footage, strategic talking points, and raw brand materials are protected from unauthorized leaks.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h5 className="font-display font-semibold text-white text-sm mb-1">
              Zero Unauthorized Monetization
            </h5>
            <p className="text-xs text-white/70">
              Clippers are prohibited from running unauthorized affiliate links, unauthorized secondary sponsorships, or distributing content outside agreed parameters.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h5 className="font-display font-semibold text-white text-sm mb-1">
              Sanitized Asset Vaults
            </h5>
            <p className="text-xs text-white/70">
              Only clippers actively allocated to your brand receive watermarked or project-scoped footage through secure access tokens that are revoked upon campaign conclusion.
            </p>
          </div>
        </div>
      </section>

      {/* 05. Third-Party Disclosures */}
      <section id="data-sharing" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <FileText className="w-4 h-4 text-[#0038E2]" />
          <span>05. Third-Party Disclosures</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          When and How We Share Information
        </h2>
        <p>
          We do not sell client data. We only disclose information under the following limited conditions:
        </p>
        <ul className="space-y-2 list-disc list-inside text-white/75 text-sm">
          <li>
            <strong className="text-white font-medium">Service Providers:</strong> Cloud infrastructure (e.g. AWS, Vercel, Supabase), secure file transfer systems, and communication endpoints operating under strict data processing agreements.
          </li>
          <li>
            <strong className="text-white font-medium">Distribution Networks:</strong> Public social platforms (TikTok, Meta/Instagram, YouTube, X) receive the finalized video clips that you authorize us to publish.
          </li>
          <li>
            <strong className="text-white font-medium">Legal Compliance:</strong> When mandated by court order, statutory subpoena, or regulatory enforcement to protect legal rights and prevent fraud.
          </li>
        </ul>
      </section>

      {/* 06. Storage & Security */}
      <section id="retention-security" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Lock className="w-4 h-4 text-[#0038E2]" />
          <span>06. Storage & Security</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Encryption, Access Controls & Data Retention
        </h2>
        <p>
          We implement technical, administrative, and physical safeguards designed to prevent unauthorized access, loss, or alteration of your content:
        </p>
        <ul className="space-y-2 list-disc list-inside text-white/75 text-sm">
          <li>
            <strong className="text-white font-medium">In-Transit & At-Rest Encryption:</strong> All client intake submissions, emails, and data transfers utilize TLS 1.3 encryption and AES-256 bit encrypted vault storage.
          </li>
          <li>
            <strong className="text-white font-medium">Access Principle of Least Privilege:</strong> Only agency account managers and lead content strategists directly assigned to your account have administrative file access.
          </li>
          <li>
            <strong className="text-white font-medium">Retention Timelines:</strong> Raw footage is archived for the duration of the active retainer plus 90 days for archival revisions, after which clients may request complete digital purging.
          </li>
        </ul>
      </section>

      {/* 07. GDPR & Privacy Rights */}
      <section id="your-rights" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <UserCheck className="w-4 h-4 text-[#0038E2]" />
          <span>07. GDPR & Privacy Rights</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Your Rights Under GDPR, CCPA & Global Laws
        </h2>
        <p>
          Regardless of your jurisdiction, GetVeevz affords all clients and site visitors comprehensive privacy rights:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <strong className="text-white block mb-0.5">Right of Access</strong>
            <span>Request a complete copy of all personal records and media metadata associated with your account.</span>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <strong className="text-white block mb-0.5">Right of Erasure (Right to be Forgotten)</strong>
            <span>Request the irrevocable deletion of your lead information, contact logs, and archived assets.</span>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <strong className="text-white block mb-0.5">Right to Rectification</strong>
            <span>Update or correct inaccurate contact, corporate, or billing information at any time.</span>
          </div>
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
            <strong className="text-white block mb-0.5">Right to Data Portability</strong>
            <span>Export performance analytics and campaign metrics in machine-readable JSON/CSV formats.</span>
          </div>
        </div>
      </section>

      {/* 08. Contact & Legal Inquiries */}
      <section id="contact" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Bell className="w-4 h-4 text-[#0038E2]" />
          <span>08. Contact & Legal Inquiries</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Data Protection Officer Contact
        </h2>
        <p>
          To exercise your privacy rights, file a data access inquiry, or request asset deletion, please contact our privacy compliance desk:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono space-y-1 text-white/80">
          <div><strong className="text-white">GetVeevz Inc.</strong> — Legal & Data Privacy Division</div>
          <div>Email: <a href="mailto:team@getveevz.com" className="text-[#0038E2] hover:underline">team@getveevz.com</a></div>
          <div>Official Website: <a href="https://getveevz.com" className="text-white/60 hover:underline">https://getveevz.com</a></div>
          <div className="text-white/40 pt-1">Response Commitment: Within 24-48 business hours</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
