"use client";

import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Mail, ArrowUpRight, Clock } from "lucide-react";
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
  showFooterCta?: boolean;
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
  showFooterCta = false,
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
    <main className="relative w-full min-h-screen bg-white text-[#111111] font-sans overflow-hidden selection:bg-[#0038E2]/25 selection:text-[#0038E2]">
      <HeadSEO
        title={`${title} — GetVeevz`}
        description={description}
        canonical={canonical}
        jsonLd={jsonLd}
      />

      {/* Atmospheric Ambient Glows — matching CapabilitiesFlywheel */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-1/4 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#0038E2]/[0.035] blur-[150px] rounded-full -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#8BA3C5]/[0.07] blur-[140px] rounded-full -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(0,56,226,0.025),transparent_70%)] -z-10"
      />

      <div className="relative max-w-5xl mx-auto px-4 xs:px-5 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-10">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F8F6F2] border border-[#111111]/12 hover:border-[#0038E2]/40 text-xs font-mono text-[#555555] hover:text-[#111111] transition-all duration-300 ease-gentle cursor-pointer active:scale-95 shadow-xs shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5 stroke-[2] transition-transform duration-300 ease-gentle group-hover:-translate-x-0.5 text-[#0038E2]" />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#555555] shrink-0">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#0038E2]" />
              <span>Updated: {lastUpdated}</span>
            </span>
            <span className="text-[#111111]/20">·</span>
            <span className="px-2 py-0.5 rounded-md bg-[#0038E2]/10 border border-[#0038E2]/20 text-[#0038E2] font-semibold">{version}</span>
          </div>
        </div>

        {/* Header Block */}
        <header className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono tracking-wider text-[#0038E2] bg-[#0038E2]/10 border border-[#0038E2]/20 uppercase font-semibold mb-3 sm:mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0038E2]" />
            <span>Governance &amp; Legal Policy</span>
          </div>

          <h1 className="font-display font-medium text-2xl xs:text-3xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight leading-[1.12] mb-3 sm:mb-4">
            {title}
          </h1>

          <p className="text-sm xs:text-base sm:text-lg text-[#495B7D] font-normal leading-relaxed max-w-3xl">
            {subtitle}
          </p>

          {/* Quick Jump Pills if sections provided */}
          {sections && sections.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#111111]/10">
              <div className="text-[10px] sm:text-[11px] font-mono text-[#0038E2] uppercase tracking-wider font-semibold mb-2.5 sm:mb-3">
                Quick Navigation
              </div>
              <div className="flex flex-wrap gap-2">
                {sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className="px-3 py-1 rounded-full bg-[#F8F6F2] hover:bg-white border border-[#111111]/10 hover:border-[#0038E2]/40 text-xs font-mono text-[#555555] hover:text-[#111111] transition-all duration-200 cursor-pointer text-left shadow-2xs hover:shadow-xs active:scale-95 whitespace-nowrap shrink-0"
                  >
                    <span className="text-[#0038E2] mr-1.5 font-semibold">0{idx + 1}.</span>
                    <span>{sec.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Document Body Card — matching Flywheel Showcase container */}
        <div
          ref={contentRef}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-white border border-[#111111]/12 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] p-4 xs:p-6 sm:p-10 lg:p-12 overflow-hidden space-y-8 sm:space-y-12 text-[#495B7D] leading-relaxed text-sm sm:text-base"
        >
          <div
            aria-hidden="true"
            className="absolute -top-12 -right-12 w-64 h-64 bg-[#0038E2]/[0.06] blur-[90px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 space-y-8 sm:space-y-12">
            {children}
          </div>

          {/* Optional bottom contact block if explicitly requested */}
          {showFooterCta && (
            <div className="pt-8 border-t border-[#111111]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#F8F6F2] -mx-4 xs:-mx-6 sm:-mx-10 lg:-mx-12 -mb-4 xs:-mb-6 sm:-mb-10 lg:-mb-12 p-5 sm:p-8 border-b border-[#111111]/10 relative z-10">
              <div>
                <h3 className="font-display font-medium text-lg sm:text-xl text-[#111111] tracking-tight mb-1">
                  Questions or compliance notices?
                </h3>
                <p className="text-xs sm:text-sm text-[#495B7D]">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-[#111111] hover:bg-[#0038E2] text-white font-display font-semibold text-xs sm:text-sm transition-all duration-300 ease-gentle hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer shrink-0"
              >
                <Mail className="w-3.5 h-3.5 text-[#8BA3C5]" />
                <span>Contact Legal Team</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
