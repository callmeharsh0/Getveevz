"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import HeadSEO from "@/components/seo/HeadSEO";

export default function NotFound() {
  return (
    <main className="relative w-full min-h-[90vh] bg-[#090E14] text-[#F3EFEA] flex items-center justify-center px-4 sm:px-6 py-24 sm:py-32 overflow-hidden selection:bg-[#0038E2]/30 selection:text-white">
      <HeadSEO
        title="404 — Page Not Found | GetVeevz"
        description="The page you are looking for does not exist or has been moved."
        canonical="https://getveevz.com/404"
      />

      {/* Atmospheric Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#0038E2]/15 via-transparent to-transparent blur-[140px] -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-screen bg-[radial-gradient(#F8F6F2_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        {/* Doppelrand Hardware Tray */}
        <div className="rounded-[2.25rem] p-1.5 sm:p-2 bg-white/[0.04] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
          <div className="rounded-[calc(2.25rem-0.375rem)] bg-[#0C0D10]/95 border border-white/[0.05] p-8 sm:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            
            {/* Eyebrow Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0038E2]/15 border border-[#0038E2]/30 text-[11px] font-mono uppercase tracking-[0.2em] text-[#8BA3C6] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0038E2] animate-pulse" />
              <span>Error 404 · Route Not Found</span>
            </div>

            <h1 className="font-display font-medium text-3xl sm:text-5xl text-white tracking-tight leading-[1.12] mb-4">
              Lost in Distribution.
            </h1>

            <p className="text-sm sm:text-base text-white/65 font-light leading-relaxed max-w-md mx-auto mb-8">
              The destination you are trying to reach does not exist or may have been repositioned in our content network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/">
                <GlassButton
                  size="default"
                  className="w-full sm:w-auto"
                  contentClassName="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold tracking-wide px-5 py-2.5"
                >
                  <Home className="w-4 h-4 text-frost" />
                  <span>Return to Home</span>
                </GlassButton>
              </Link>
              
              <Link to="/services">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-3.5 h-3.5 text-white/60" />
                  <span>Explore Services</span>
                </button>
              </Link>
            </div>

            {/* Quick Directory Anchor Shortcuts */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-center gap-4 text-xs font-mono text-white/50">
              <Link to="/#results" className="hover:text-white transition-colors">Results</Link>
              <span>·</span>
              <Link to="/#distribution" className="hover:text-white transition-colors">Distribution</Link>
              <span>·</span>
              <Link to="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
