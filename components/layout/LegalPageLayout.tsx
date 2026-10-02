"use client";

import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail, ArrowUpRight, Clock, FileText } from "lucide-react";
import HeadSEO from "@/components/seo/HeadSEO";
import { getSmartEmailLinkProps, openSmartEmail } from "@/lib/email";
import { useScrollReveal } from "@/lib/useScrollReveal";

export interface LegalSection {
  id: string;
  title: string;
}

export interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  canonical: string;
  lastUpdated?: string;
  version?: string;
  sections?: LegalSection[];
  children: ReactNode;
}

export default function LegalPageLayout({
  title,
  subtitle,
  description,
  canonical,
  lastUpdated = "October 2026",
  version = "v2.4",
  sections,
  children,
}: LegalPageLayoutProps) {
  const contentRef = useScrollReveal<HTMLDivElement>();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://getveevz.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": title,
          "item": canonical,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${title} — GetVeevz`,
      "description": description,
      "url": canonical,
      "publisher": {
        "@type": "Organization",
        "name": "GetVeevz",
        "logo": "https://getveevz.com/assets/Logo.png",
      },
    },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="relative w-full min-h-screen bg-[#07080B] text-[#F3EFEA] font-sans overflow-hidden selection:bg-[#0038E2]/30 selection:text-white">
      <HeadSEO
        title={`${title} — GetVeevz Distribution`}
        description={description}
        canonical={canonical}
        jsonLd={jsonLd}
      />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-[#0038E2]/[0.07] blur-[160px] rounded-full -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#8BA3C5]/[0.05] blur-[150px] rounded-full -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.025] mix-blend-screen bg-[radial-gradient(#F8F6F2_1px,transparent_1px)] [background-size:24px_24px] -z-10"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-20 sm:pb-28">
        {/* Navigation & Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 sm:mb-12">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-xs font-mono text-white/70 hover:text-white transition-all duration-300 ease-gentle cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 ease-gentle group-hover:-translate-x-0.5" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-mono text-white/45">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#0038E2]" />
              <span>Updated: {lastUpdated}</span>
            </span>
            <span className="text-white/20">·</span>
            <span className="text-white/60 font-semibold">{version}</span>
          </div>
        </div>

        {/* Header Block */}
        <header className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0038E2]/15 border border-[#0038E2]/35 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8BA3C6] font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0038E2]" />
            <span>Governance & Legal Policy</span>
          </div>

          <h1 className="font-display font-medium text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12] mb-4">
            {title}
          </h1>

          <p className="text-base sm:text-lg text-white/65 font-light leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          {/* Quick Jump Pills if sections provided */}
          {sections && sections.length > 0 && (
            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <div className="text-[11px] font-mono text-[#8BA3C6] uppercase tracking-wider mb-3">
                Quick Navigation
              </div>
              <div className="flex flex-wrap gap-2">
                {sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className="px-3 py-1 rounded-lg bg-white/[0.03] hover:bg-[#0038E2]/20 border border-white/[0.08] hover:border-[#0038E2]/40 text-xs font-mono text-white/70 hover:text-white transition-all duration-200 cursor-pointer text-left"
                  >
                    <span className="text-[#0038E2] mr-1.5 font-semibold">0{idx + 1}.</span>
                    <span>{sec.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Document Body Card */}
        <div
          ref={contentRef}
          className="rounded-[2.25rem] p-1.5 sm:p-2 bg-white/[0.03] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.5)] backdrop-blur-xl"
        >
          <div className="rounded-[calc(2.25rem-0.375rem)] bg-[#0C0D11]/95 border border-white/[0.05] p-6 sm:p-12 lg:p-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] space-y-10 sm:space-y-14 text-white/80 leading-relaxed text-sm sm:text-base font-light">
            {children}

            {/* Questions / Contact Box at the bottom */}
            <div className="pt-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white/[0.02] -mx-6 sm:-mx-12 lg:-mx-14 -mb-6 sm:-mb-12 lg:-mb-14 p-6 sm:p-10 rounded-b-[calc(2.25rem-0.375rem)] border-b border-white/[0.04]">
              <div>
                <h3 className="font-display font-medium text-lg sm:text-xl text-white tracking-tight mb-1">
                  Questions or compliance notices?
                </h3>
                <p className="text-xs sm:text-sm text-white/60 font-light">
                  Our operations team responds to official notices within 24 business hours.
                </p>
              </div>

              <a
                {...getSmartEmailLinkProps({
                  subject: `Legal Inquiry: ${title}`,
                  body: `Hi GetVeevz Legal Team,\n\nI have a question regarding the ${title}:\n\n`,
                })}
                onClick={(e) => {
                  e.preventDefault();
                  openSmartEmail({
                    subject: `Legal Inquiry: ${title}`,
                    body: `Hi GetVeevz Legal Team,\n\nI have a question regarding the ${title}:\n\n`,
                  });
                }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#F8F6F2] hover:bg-white text-[#111111] font-display font-semibold text-xs sm:text-sm transition-all duration-300 ease-gentle hover:scale-[1.02] active:scale-[0.98] shadow-sm cursor-pointer shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-[#0038E2]" />
                <span>Contact Legal Team</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
