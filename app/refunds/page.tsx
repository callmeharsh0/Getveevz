"use client";

import React from "react";
import LegalPageLayout from "@/components/layout/LegalPageLayout";
import { RefreshCw, FileText, CheckCircle2, ShieldCheck, Mail } from "lucide-react";

const SECTIONS = [
  { id: "overview", title: "Custom Engagement Structure" },
  { id: "prior-agreements", title: "Pre-Agreed Terms" },
  { id: "campaign-nature", title: "Resource & Creator Allocation" },
  { id: "inquiries", title: "Direct Contact & Amendments" },
];

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      subtitle="Operational guidelines regarding campaign cancellations, retainer structures, and custom contractual agreements."
      description="Read the GetVeevz Refund & Cancellation Policy. All refund and cancellation terms are decided and mutually agreed upon prior to project kickoff."
      canonical="https://getveevz.com/refund-policy"
      sections={SECTIONS}
    >
      {/* 01. Overview */}
      <section id="overview" className="scroll-mt-28 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <RefreshCw className="w-4 h-4 text-[#0038E2]" />
          <span>01. Custom Engagement Structure</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Bespoke Distribution Services
        </h2>
        <p>
          At GetVeevz, every distribution sprint, long-term clipping retainer, and PR seeding campaign is custom-tailored to the client&apos;s brand, content volume, niche authority, and target reach goals.
        </p>
        <p>
          Because our services are customized on a client-by-client basis, we do not apply rigid, one-size-fits-all refund commitments or automated cancellation schedules.
        </p>
      </section>

      {/* 02. Pre-Agreed Terms */}
      <section id="prior-agreements" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <FileText className="w-4 h-4 text-[#0038E2]" />
          <span>02. Pre-Agreed Terms</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Terms Decided Prior to Project Kickoff
        </h2>
        <div className="p-4 rounded-xl bg-white/[0.03] border-l-2 border-l-[#0038E2] border border-white/[0.06] text-xs sm:text-sm text-white/85 leading-relaxed">
          <strong className="text-white font-medium block mb-1">Mutual Agreement Prior to Commencement:</strong>
          Any terms regarding refund eligibility, cancellation procedures, performance milestones, or campaign adjustments are decided, customized, and mutually agreed upon in writing between GetVeevz and the client prior to project kickoff, contract signing, or invoice fulfillment.
        </div>
        <p className="text-sm text-white/75">
          These stipulations will be clearly outlined in your individual client proposal, Insertion Order (IO), or service contract. Unless explicitly specified and agreed upon prior to kickoff, all campaign payments and allocations are final once distribution operations have begun.
        </p>
      </section>

      {/* 03. Resource & Creator Allocation */}
      <section id="campaign-nature" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#0038E2]" />
          <span>03. Resource & Creator Allocation</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Operational Allocations
        </h2>
        <p>
          Upon agreement and initial invoice settlement, our agency immediately commits resources:
        </p>
        <ul className="space-y-2 list-disc list-inside text-white/75 text-sm sm:text-base">
          <li>
            Assigning dedicated video editors and editorial hook writers.
          </li>
          <li>
            Locking publisher placement schedules and inventory on theme pages and mega-accounts.
          </li>
          <li>
            Provisioning creator network seats and tracking infrastructure.
          </li>
        </ul>
        <p className="text-sm text-white/75">
          Because these investments are secured in advance, any deviation, rescheduling, or termination is evaluated strictly according to the provisions settled prior to commencing the engagement.
        </p>
      </section>

      {/* 04. Inquiries & Amendments */}
      <section id="inquiries" className="scroll-mt-28 space-y-4 pt-6 border-t border-white/[0.06]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#8BA3C6] uppercase tracking-wider font-semibold">
          <Mail className="w-4 h-4 text-[#0038E2]" />
          <span>04. Direct Contact & Amendments</span>
        </div>
        <h2 className="font-display font-medium text-2xl sm:text-3xl text-white tracking-tight">
          Questions Regarding Your Agreement
        </h2>
        <p>
          If you have questions regarding your specific campaign terms or wish to discuss custom milestone parameters prior to onboarding, please contact your designated account executive or our operations team directly:
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono space-y-1.5 text-white/80">
          <div><strong className="text-white">GetVeevz Inc.</strong> — Client Operations & Legal</div>
          <div>Email: <a href="mailto:team@getveevz.com" className="text-[#0038E2] hover:underline">team@getveevz.com</a></div>
          <div>Response Commitment: Within 24 business hours</div>
        </div>
      </section>
    </LegalPageLayout>
  );
}
