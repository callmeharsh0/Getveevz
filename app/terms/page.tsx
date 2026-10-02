"use client";

import React from "react";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { FileText, Award, Layers, Scale, DollarSign, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";

const SECTIONS = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "services-scope", title: "Scope of Distribution Services" },
  { id: "intellectual-property", title: "IP & Licensing Rights" },
  { id: "client-obligations", title: "Client Responsibilities" },
  { id: "performance-disclaimers", title: "Algorithmic & View Disclaimers" },
  { id: "payments-billing", title: "Retainer Schedules & Invoicing" },
  { id: "term-cancellation", title: "Term, Renewal & Termination" },
  { id: "liability-indemnity", title: "Liability & Indemnification" },
  { id: "governing-law", title: "Dispute Resolution & Jurisdiction" },
];

export default function TermsConditionsPage() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="The operational terms, intellectual property rules, and service commitments governing engagements with GetVeevz."
      description="Review the GetVeevz Terms & Conditions. Details our video distribution frameworks, retainer milestones, IP licensing, view metrics disclaimers, and billing standards."
      canonical="https://getveevz.com/terms-and-conditions"
      sections={SECTIONS}
    >
      {/* 01. Acceptance of Terms */}
      <section id="acceptance" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <FileText className="w-4 h-4 text-[#0038E2]" />
          <span>01. Acceptance of Terms</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Contractual Agreement
        </h2>
        <p>
          These Terms and Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you, whether personally or on behalf of an entity (&ldquo;Client&rdquo;, &ldquo;you&rdquo;), and GetVeevz Inc. (&ldquo;GetVeevz&rdquo;, &ldquo;Agency&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
        </p>
        <p>
          By submitting an intake questionnaire, executing an Insertion Order (IO), booking a distribution package, or engaging GetVeevz for content clipping, distribution, or seeding services, you expressly agree to be bound by these Terms. If you do not agree to all provisions contained herein, you must immediately refrain from utilizing our services.
        </p>
      </section>

      {/* 02. Scope of Distribution Services */}
      <section id="services-scope" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Layers className="w-4 h-4 text-[#0038E2]" />
          <span>02. Scope of Distribution Services</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Agency Frameworks & Engagement Models
        </h2>
        <p>
          GetVeevz delivers high-performance organic and native video distribution through structured models outlined in our service schedules:
        </p>
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-display font-semibold text-white text-base mb-1">
              A. 3-Month Test-to-Scale Retainer
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Consists of Month 1 CPM-based hook testing and mass clipping filtering, followed by Months 2 and 3 dedicated retainers for top-performing clippers and proven niche theme accounts. Fixed clip outputs, editing standards, and weekly reporting cadences apply.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-display font-semibold text-white text-base mb-1">
              B. High-Volume PR & 24-Hour Seeding Campaigns
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Immediate narrative distribution across pre-established mega-accounts (ranging from 1M to 10M+ collective follower footprints) executed within 24 hours of brief and asset signoff. Pricing is determined on a fixed cost-per-post basis.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <h4 className="font-display font-semibold text-white text-base mb-1">
              C. Creative Repurposing & Editorial Hook Engineering
            </h4>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Extraction of high-retention moments from long-form podcasts, CEO talks, keynotes, webinars, and live streams into platform-optimized 9:16 vertical cuts with synchronized kinetic typography and pacing.
            </p>
          </div>
        </div>
      </section>

      {/* 03. IP & Licensing Rights */}
      <section id="intellectual-property" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Award className="w-4 h-4 text-[#0038E2]" />
          <span>03. IP & Licensing Rights</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Asset Ownership & Distribution License
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="font-display font-semibold text-white text-base">
              Client Retains 100% Brand Ownership
            </h4>
            <p className="text-xs text-white/70">
              The Client retains all right, title, and interest, including all worldwide copyright, trademark, and intellectual property rights in and to the raw master footage, brand logos, trade names, and narrative content supplied to GetVeevz.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <h4 className="font-display font-semibold text-white text-base">
              Limited Agency Distribution License
            </h4>
            <p className="text-xs text-white/70">
              Client grants GetVeevz, its affiliated clippers, and designated distribution channels a worldwide, non-exclusive, royalty-free license to edit, transcribe, format, clip, display, and publicly transmit the content solely for the execution of agreed campaigns.
            </p>
          </div>
        </div>
      </section>

      {/* 04. Client Responsibilities */}
      <section id="client-obligations" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#0038E2]" />
          <span>04. Client Responsibilities</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Content Representations & Warranties
        </h2>
        <p>The Client represents, warrants, and covenants that:</p>
        <ul className="space-y-2 list-disc list-inside text-white/75 text-sm sm:text-base">
          <li>
            It possesses all necessary licenses, releases, permissions, and rights to authorize GetVeevz to process and distribute the provided audio-visual media.
          </li>
          <li>
            No content provided contains defamatory, obscene, fraudulent, copyright-infringing, or unlawful material violating applicable state, federal, or international laws.
          </li>
          <li>
            It will provide timely review of narrative briefs, editorial concepts, and strategic talking points to avoid distribution bottlenecks.
          </li>
        </ul>
      </section>

      {/* 05. Algorithmic & View Disclaimers */}
      <section id="performance-disclaimers" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <AlertCircle className="w-4 h-4 text-[#0038E2]" />
          <span>05. Algorithmic & View Disclaimers</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Platform Autonomy & Organic Variance
        </h2>
        <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-l-[#0038E2] border border-white/[0.06] text-xs sm:text-sm text-white/85 leading-relaxed">
          <strong className="text-white font-medium block mb-1">Important Performance Notice:</strong>
          Third-party platforms (including TikTok/ByteDance, Meta/Instagram, YouTube/Google, and X) operate proprietary, non-public recommendation algorithms that fluctuate dynamically. While GetVeevz guarantees operational deliverables (such as clip volume, publishing frequency, hook engineering, account placements, and quality benchmarks), organic view projections represent data-backed estimates based on historical reach and cannot constitute an absolute financial or legal guarantee.
        </div>
        <p className="text-sm text-white/75">
          For CPM-based campaigns where a minimum view volume is contracted, GetVeevz agrees to keep distribution active across network channels until the agreed view milestones are met or appropriate make-good arrangements are implemented.
        </p>
      </section>

      {/* 06. Retainer Schedules & Invoicing */}
      <section id="payments-billing" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <DollarSign className="w-4 h-4 text-[#0038E2]" />
          <span>06. Retainer Schedules & Invoicing</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Payment Terms & Currency Billing
        </h2>
        <ul className="space-y-2.5 list-disc list-inside text-white/75 text-sm sm:text-base">
          <li>
            <strong className="text-white font-medium">Upfront Milestone Payments:</strong> Fixed monthly retainers and surge campaign fees are billed upfront in advance of each active 30-day billing cycle or prior to 24-hour seeding launches.
          </li>
          <li>
            <strong className="text-white font-medium">Multi-Currency Denominations:</strong> Rates are supported in USD, INR, and AED as delineated in your custom proposal or checkout schedule.
          </li>
          <li>
            <strong className="text-white font-medium">Payment Timelines:</strong> Invoices are due upon receipt or within 5 business days unless alternative terms are specified in writing. Unpaid balances may pause active clipping queues.
          </li>
        </ul>
      </section>

      {/* 07. Term, Renewal & Termination */}
      <section id="term-cancellation" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Scale className="w-4 h-4 text-[#0038E2]" />
          <span>07. Term, Renewal & Termination</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Engagement Duration & Contract Renewal
        </h2>
        <p>
          Retainer agreements govern for an initial three (3) month term unless otherwise agreed. Upon completion of Month 3, engagements transition to month-to-month renewals unless either party provides thirty (30) days written notice prior to the end of the current term.
        </p>
        <p>
          Either party may terminate immediately for cause upon written notice if the other party breaches a material obligation and fails to cure such breach within fourteen (14) calendar days.
        </p>
      </section>

      {/* 08. Liability & Indemnification */}
      <section id="liability-indemnity" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <ShieldAlert className="w-4 h-4 text-[#0038E2]" />
          <span>08. Liability & Indemnification</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Limitation of Liability & Mutual Protection
        </h2>
        <p>
          To the maximum extent permitted by applicable law, neither GetVeevz nor the Client shall be liable for indirect, incidental, consequential, special, or punitive damages, including loss of profits or business interruption.
        </p>
        <p>
          The aggregate liability of GetVeevz arising out of or related to these Terms, whether in contract, tort, or otherwise, shall not exceed the total fees paid by Client to GetVeevz under the applicable insertion order in the three (3) months preceding the claim.
        </p>
      </section>

      {/* 09. Dispute Resolution & Jurisdiction */}
      <section id="governing-law" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Scale className="w-4 h-4 text-[#0038E2]" />
          <span>09. Dispute Resolution & Jurisdiction</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Governing Law & Executive Resolution
        </h2>
        <p>
          These Terms and any dispute or controversy arising out of or in connection with them shall be governed by and construed in accordance with the laws of Delaware, United States, without regard to conflict of laws principles.
        </p>
        <p>
          In the event of any dispute, the parties agree to first attempt informal executive negotiation for thirty (30) days prior to initiating formal arbitration or judicial proceedings.
        </p>
      </section>
    </LegalPageLayout>
  );
}
