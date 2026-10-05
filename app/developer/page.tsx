"use client";

import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers,
  Globe,
  Zap,
  Mail,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import HeadSEO from "@/components/seo/HeadSEO";
import { openSmartEmail } from "@/lib/email";

const DEVELOPER_EMAIL = "harshofficial654@gmail.com";

const TECH_STACK = [
  { name: "React 18", category: "Core" },
  { name: "TypeScript", category: "Core" },
  { name: "Vite", category: "Build Tool" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "CSS Design Tokens", category: "Styling" },
  { name: "GSAP ScrollTrigger", category: "Animation" },
  { name: "Motion (Framer)", category: "Interaction" },
  { name: "Lenis Smooth Scroll", category: "Motion" },
  { name: "Three.js", category: "3D Graphics" },
  { name: "Globe.gl", category: "Visualization" },
  { name: "D3.js / Geo", category: "Math & Projection" },
  { name: "Lucide React", category: "UI Icons" },
  { name: "Radix UI Primitives", category: "Accessible UI" },
];

const ARCHITECTURES = [
  {
    icon: Layers,
    title: "Component-Driven SPA Architecture",
    description:
      "Modular React component hierarchy with client-side routing, route-level code splitting, and zero reload latency.",
    badge: "Architecture",
    colSpan: "md:col-span-7",
    stat: "Zero-Latency",
    statDesc: "Route transitions",
  },
  {
    icon: Globe,
    title: "Interactive 3D WebGL Globe",
    description:
      "Hardware-accelerated Three.js canvas pipeline rendering real-time global distribution nodes with 60 FPS orbit physics.",
    badge: "3D Graphics",
    colSpan: "md:col-span-5",
    stat: "60 FPS",
    statDesc: "Canvas rendering",
  },
  {
    icon: Cpu,
    title: "Multi-Currency Economic Engine",
    description:
      "Dynamic state-driven currency engine calculating synchronized pricing across USD, INR (in Lakhs), and AED across all retainers and blitzes.",
    badge: "State Engine",
    colSpan: "md:col-span-4",
    stat: "3 Currencies",
    statDesc: "Synchronized live",
  },
  {
    icon: Zap,
    title: "Interactive Intake Qualification Funnel",
    description:
      "Dual-track client questionnaire wizard with real-time field validation, dynamic budget selectors, and automated payload synthesis.",
    badge: "Conversion",
    colSpan: "md:col-span-4",
    stat: "Dual-Track",
    statDesc: "Intake wizard",
  },
  {
    icon: Sparkles,
    title: "GPU-Accelerated Motion Pipeline",
    description:
      "Precision GSAP ScrollTriggers paired with Framer Motion gesture physics and Lenis smooth momentum scrolling.",
    badge: "Motion",
    colSpan: "md:col-span-4",
    stat: "< 0.8s",
    statDesc: "Fluid hydration",
  },
  {
    icon: ShieldCheck,
    title: "Performance & Structured Data SEO",
    description:
      "Sub-second TTFB, optimized Core Web Vitals, semantic HTML5 hierarchy, and comprehensive Google Rich Results JSON-LD schema integration.",
    badge: "Infrastructure",
    colSpan: "md:col-span-12",
    stat: "100%",
    statDesc: "Clean structured data",
  },
];

export default function DeveloperPage() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        containerRef.current,
        { opacity: 0, y: 32, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9 }
      )
        .fromTo(
          headerRef.current ? headerRef.current.children : [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.5"
        )
        .fromTo(
          bentoRef.current ? bentoRef.current.children : [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleEnquire = () => {
    openSmartEmail({
      to: DEVELOPER_EMAIL,
      subject: "Developer Enquiry — Harsh Paigude (GetVeevz)",
      body: `Hi Harsh,\n\nI was exploring GetVeevz.com and wanted to enquire regarding web development and technical architecture.\n\nProject details:\n- Timeline:\n- Scope / Requirements:\n\nLooking forward to speaking with you!`,
    });
  };

  return (
    <main className="overflow-x-hidden w-full max-w-full min-h-[100dvh] bg-[#050508] text-[#F3F4F6] relative flex flex-col justify-between selection:bg-[#0038E2] selection:text-white">
      <HeadSEO
        title="Developer: Harsh Paigude | GetVeevz"
        description="Architecture, tech stack, and engineering breakdown of GetVeevz.com, developed by Harsh Paigude."
        canonical="https://getveevz.com/developerid"
      />

      {/* Atmospheric lighting backdrop */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[580px] bg-[#0038E2]/12 blur-[170px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[650px] h-[480px] bg-[#4D7CFF]/06 blur-[150px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Top Floating Island Navigation */}
      <header className="max-w-5xl w-full mx-auto px-4 sm:px-6 pt-8 sm:pt-14">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 backdrop-blur-xl text-xs sm:text-sm font-medium text-white/70 hover:text-white transition-all duration-300 ease-gentle active:scale-95 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 ease-gentle group-hover:-translate-x-0.5 text-white/60 group-hover:text-white" strokeWidth={1.75} />
          <span>Back to GetVeevz</span>
        </Link>
      </header>

      {/* Main Hardware Container — Double-Bezel Architecture */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20 my-auto">
        <div
          ref={containerRef}
          className="p-1.5 sm:p-2.5 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.08] ring-1 ring-white/[0.04] shadow-[0_40px_100px_rgba(0,0,0,0.8),0_10px_30px_rgba(0,0,0,0.5)] relative"
        >
          {/* Inner Core: Concentric Machined Container */}
          <div className="rounded-[calc(2.5rem-0.625rem)] bg-[#090A0E]/95 border border-white/[0.04] p-6 sm:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] relative overflow-hidden">
            {/* Ambient internal kinetic radial aura */}
            <div className="absolute -top-28 -right-28 w-96 h-96 bg-[#0038E2]/14 blur-3xl pointer-events-none rounded-full" />
            <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-[#4D7CFF]/07 blur-3xl pointer-events-none rounded-full" />

            {/* Box Header: Attention Component */}
            <div
              ref={headerRef}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 pb-10 border-b border-white/[0.07] relative z-10"
            >
              <div className="space-y-3.5 max-w-2xl">
                {/* Eyebrow Micro-Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0038E2]/15 border border-[#0038E2]/35 text-[#4D7CFF] text-[10px] font-mono font-medium tracking-[0.2em] uppercase shadow-[0_0_16px_rgba(0,56,226,0.25)]">
                  <Terminal className="w-3 h-3 text-[#4D7CFF]" strokeWidth={1.25} />
                  <span>Developer</span>
                </div>

                {/* Primary Name Headline */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.05]">
                  Harsh Paigude
                </h1>

                {/* Scoped Site Context */}
                <p className="text-sm sm:text-base text-white/60 font-sans max-w-lg leading-relaxed">
                  Architect &amp; Lead Developer of{" "}
                  <span className="text-white font-medium">GetVeevz.com</span>
                </p>
              </div>

              {/* Action Buttons: Button-in-Button Architecture */}
              <div className="flex flex-wrap sm:flex-col items-stretch gap-2.5 sm:min-w-[195px]">
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="group inline-flex items-center justify-between gap-3 pl-6 pr-2 py-2 rounded-full bg-[#0038E2] hover:bg-[#002bb5] text-white font-medium text-sm transition-all duration-500 ease-gentle shadow-[0_0_28px_rgba(0,56,226,0.4)] hover:shadow-[0_0_40px_rgba(0,56,226,0.65)] active:scale-[0.98] cursor-pointer"
                >
                  <span className="tracking-tight">Know more</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 border border-white/20 flex items-center justify-center transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="group inline-flex items-center justify-between gap-2.5 pl-4 pr-2 py-1.5 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/20 text-white/75 hover:text-white text-xs font-mono transition-all duration-300 ease-gentle active:scale-[0.98] cursor-pointer"
                >
                  <span className="truncate max-w-[125px]">
                    {copied ? (
                      <span className="text-emerald-400">Copied to Clipboard</span>
                    ) : (
                      "Copy Email"
                    )}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-white/50 group-hover:text-white/80 transition-colors" strokeWidth={1.25} />
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Interest Section: Tech Stack for this Website */}
            <section className="pt-9 pb-9 border-b border-white/[0.07] relative z-10">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-white/50">
                  <Code2 className="w-3.5 h-3.5 text-[#4D7CFF]" strokeWidth={1.25} />
                  <span>Tech Stack for this Website</span>
                </div>
                <span className="text-[11px] font-mono text-white/40">
                  13 Native Modules
                </span>
              </div>

              {/* Hardware Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5">
                {TECH_STACK.map((item) => (
                  <div
                    key={item.name}
                    className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.025] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#0038E2]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 ease-gentle text-xs hover:-translate-y-0.5"
                  >
                    <span className="text-white/95 font-medium tracking-tight">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-white/40 border-l border-white/10 pl-2">
                      {item.category}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Desire Section: The Gapless Bento Grid */}
            <section className="pt-9 relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-white/50">
                  <Cpu className="w-3.5 h-3.5 text-[#4D7CFF]" strokeWidth={1.25} />
                  <span>Architectures &amp; Technologies Used For This Website</span>
                </div>
                <span className="text-[11px] font-mono text-white/40">
                  Site Engineering
                </span>
              </div>

              {/* Mathematically interlocking Bento Grid with Double-Bezel Cards */}
              <div
                ref={bentoRef}
                className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 grid-flow-dense"
              >
                {ARCHITECTURES.map((arch) => {
                  const Icon = arch.icon;
                  return (
                    <div
                      key={arch.title}
                      className={`p-1 rounded-2xl bg-white/[0.025] border border-white/[0.07] ring-1 ring-white/[0.02] hover:border-[#0038E2]/40 hover:shadow-[0_8px_30px_rgba(0,56,226,0.12)] transition-all duration-500 ease-gentle group ${arch.colSpan}`}
                    >
                      <div className="rounded-[calc(1rem-0.0625rem)] bg-[#0C0D12]/85 p-5 sm:p-6 h-full flex flex-col justify-between shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-8 h-8 rounded-lg bg-[#0038E2]/15 border border-[#0038E2]/30 flex items-center justify-center text-[#4D7CFF] group-hover:scale-105 group-hover:bg-[#0038E2]/25 transition-all duration-500 ease-gentle">
                              <Icon className="w-4 h-4 text-[#4D7CFF]" strokeWidth={1.25} />
                            </div>
                            <span className="text-[10px] font-mono text-white/35 uppercase tracking-[0.15em]">
                              {arch.badge}
                            </span>
                          </div>

                          <h3 className="text-sm font-medium text-white mb-2 tracking-tight group-hover:text-[#4D7CFF] transition-colors duration-300">
                            {arch.title}
                          </h3>
                          <p className="text-xs text-white/60 leading-relaxed font-sans font-light mb-4">
                            {arch.description}
                          </p>
                        </div>

                        {/* Subtle Metric Badge */}
                        <div className="pt-3.5 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono">
                          <span className="text-white/40">{arch.statDesc}</span>
                          <span className="text-[#4D7CFF] font-medium">{arch.stat}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Action Section: Direct Contact & Action Bar */}
            <div className="mt-10 pt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-5 bg-white/[0.015] -mx-6 sm:-mx-10 lg:-mx-12 -mb-6 sm:-mb-10 lg:-mb-12 p-6 sm:px-10 lg:px-12 rounded-b-[calc(2.5rem-0.625rem)] relative z-10">
              <div className="flex items-center gap-3 text-xs text-white/65">
                <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5 text-[#4D7CFF]" strokeWidth={1.25} />
                </div>
                <span>
                  Direct developer contact:{" "}
                  <a
                    href={`mailto:${DEVELOPER_EMAIL}`}
                    className="text-white hover:text-[#4D7CFF] font-mono font-medium transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#4D7CFF]"
                  >
                    {DEVELOPER_EMAIL}
                  </a>
                </span>
              </div>

              <button
                type="button"
                onClick={handleEnquire}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 pl-6 pr-2 py-2 rounded-full bg-white hover:bg-white/95 text-black font-medium text-xs sm:text-sm transition-all duration-500 ease-gentle active:scale-[0.98] cursor-pointer shadow-[0_10px_25px_rgba(255,255,255,0.1)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.18)]"
              >
                <span>Enquire with Developer</span>
                <div className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center transition-transform duration-500 ease-gentle group-hover:scale-105 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Systemic Baseline */}
      <footer className="max-w-5xl w-full mx-auto px-4 sm:px-6 pb-8 text-center text-[11px] text-white/30 font-mono tracking-wide">
        GetVeevz.com • Built with React 18, TypeScript &amp; Three.js
      </footer>
    </main>
  );
}
