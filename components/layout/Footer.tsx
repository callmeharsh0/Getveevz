"use client";

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowUp, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { openSmartEmail, getSmartEmailLinkProps } from "@/lib/email";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Distribution", href: "/#distribution" },
  { label: "Services", href: "/services" },
  { label: "Long-Term Retainer", href: "/services/long-term-distribution" },
  { label: "Short-Term Blitz", href: "/services/short-term-campaign" },
  { label: "End-to-End", href: "/services/end-to-end-marketing" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Results", href: "/#results" },
];

const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://x.com",
    label: "Follow GetVeevz on X",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aryankole/",
    label: "Connect on LinkedIn",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0-.01-3.3 1.65 1.65 0 0 0 .01 3.3m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    label: "Subscribe on YouTube",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aryan_kole/",
    label: "Follow on Instagram",
    icon: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/#${targetId}`);
      }
      return;
    }

    navigate(href);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("team@getveevz.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="site-footer"
      className="relative w-full bg-[#050608] text-white pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-24 bg-gradient-to-b from-[#0038E2]/15 via-transparent to-transparent blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
      />

      <div className="relative mx-auto max-w-6xl rounded-[2.25rem] p-1.5 sm:p-2 bg-white/[0.03] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        <div className="rounded-[calc(2.25rem-0.375rem)] bg-[#090A0D]/90 border border-white/[0.05] p-6 sm:p-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 sm:pb-10 border-b border-white/[0.06]">

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-xl cursor-pointer"
                  aria-label="GetVeevz Home"
                >
                  <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden bg-white/10 border border-white/20 shadow-[0_0_20px_rgba(0,56,226,0.25)] transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:border-[#0038E2]">
                    <img
                      src="/assets/Logo.png"
                      alt="GetVeevz Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-display font-semibold text-xl sm:text-2xl text-white tracking-tight">
                    GetVeevz
                  </span>
                </Link>
              </div>

              <p className="text-xs sm:text-sm text-white/55 font-light max-w-md leading-relaxed">
                Distribute your content, grow your audience, analyse performance
              </p>

              <div className="pt-1 flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/20 text-xs font-mono text-white/70 hover:text-white transition-all duration-300 ease-gentle active:scale-[0.98] cursor-pointer"
                  title="Click to copy contact email"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>team@getveevz.com</span>
                  {copied ? (
                    <Check className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-white/40 group-hover:text-white/70 transition-colors" />
                  )}
                </button>
                {copied && (
                  <span className="text-[10px] font-mono text-emerald-400 animate-fade-up">
                    Copied
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 self-start lg:self-auto">
              <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-2 sm:gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="px-3.5 py-1.5 rounded-full bg-transparent hover:bg-white/[0.06] border border-transparent hover:border-white/[0.1] text-xs sm:text-sm text-white/70 hover:text-white font-medium transition-all duration-300 ease-gentle cursor-pointer active:scale-95"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <a
                {...getSmartEmailLinkProps({ subject: "GetVeevz Strategy Call Booking" })}
                onClick={(e) => {
                  e.preventDefault();
                  openSmartEmail({ subject: "GetVeevz Strategy Call Booking" });
                }}
                className="group relative inline-flex items-center gap-3 rounded-full bg-[#F8F6F2] hover:bg-white text-[#111111] pl-5 pr-2 py-2 font-display font-semibold text-xs sm:text-sm transition-all duration-300 ease-gentle hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(248,246,242,0.15)] cursor-pointer shrink-0"
              >
                <span>Book Strategy Call</span>
                <div className="w-7 h-7 rounded-full bg-[#111111] text-[#F8F6F2] group-hover:bg-[#0038E2] group-hover:text-white flex items-center justify-center transition-all duration-300 ease-gentle group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-xs">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>
            </div>

          </div>

          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-white/45">

            <div className="flex items-center gap-2.5 text-center sm:text-left flex-wrap justify-center sm:justify-start">
              <span>© {new Date().getFullYear()} GetVeevz Inc.</span>
              <span className="text-white/20">·</span>
              <span className="text-white/50">
                Designed & Developed by Harsh Paigude under Devora
              </span>
            </div>

            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-white/[0.03] hover:bg-white/[0.09] border border-white/[0.08] hover:border-white/25 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 ease-gentle hover:scale-105 active:scale-95 shadow-2xs"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-end">
              <button
                type="button"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-[11px] text-white/60 hover:text-white transition-all duration-300 ease-gentle cursor-pointer active:scale-95"
                aria-label="Scroll back to top"
              >
                <span>Top</span>
                <ArrowUp className="w-3 h-3 stroke-[2] transition-transform duration-300 ease-gentle group-hover:-translate-y-0.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
