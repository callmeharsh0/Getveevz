import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const CASE_STUDIES = [
  {
    id: "tech-founder",
    tabLabel: "B2B TECH FOUNDER",
    metric: "28.4M+",
    metricLabel: "views generated",
    client: "Series B Enterprise SaaS Founder",
    category: "Personal Brand & Inbound Pipeline",
    campaign: "Keynote & Podcast Repurposing Engine",
    timeline: "90-DAY SPRINT",
    growth: "+480%",
    execution: [
      "Extracted 42 high-retention clips from 4 keynotes and 2 podcasts",
      "Deployed 35 autonomous satellite channels across Shorts, Reels & TikTok",
      "Synchronized daily publishing at peak B2B algorithmic windows",
      "Real-time hook iteration past the 80% completion mark",
    ],
    results: [
      { label: "Total Views Generated", value: "28.4M+", change: "+480%" },
      { label: "Profile Inbound Visits", value: "142,000+", change: "+310%" },
      { label: "High-Ticket Leads", value: "84 DMs", change: "$0 AD SPEND" },
      { label: "Avg. 3s Hook Retention", value: "96.4%", change: "TOP 1%" },
    ],
    quote: "GetVeevz built an entire media engine out of talks I had already delivered. Over 28M views without recording a single extra minute.",
    accent: COLORS.sky,
  },
  {
    id: "media-network",
    tabLabel: "TOP 50 PODCAST",
    metric: "54.2M+",
    metricLabel: "views distributed",
    client: "Weekly Long-Form Video Podcast",
    category: "Media Syndication Network",
    campaign: "Omni-Channel Fleet Dominance",
    timeline: "6-MONTH SCALE",
    growth: "+620%",
    execution: [
      "Processed 24 two-hour episodes into 210 viral micro-hooks",
      "Managed 60 sub-pages segmented by guest, industry & topic",
      "Dynamic sonic beds and branded typography templates",
      "Coordinated surge posting during live episode drops",
    ],
    results: [
      { label: "Total Views Distributed", value: "54.2M+", change: "+620%" },
      { label: "Subscriber Lift", value: "+38,500", change: "+140%" },
      { label: "Sponsorship Value", value: "2.8x", change: "VERIFIED" },
      { label: "Top Single Clip", value: "8.9M", change: "TIKTOK & SHORTS" },
    ],
    quote: "Our podcast was great, but our reach was stuck on Spotify. GetVeevz turned our archive into a 50M+ view distribution machine.",
    accent: "#34D399",
  },
  {
    id: "fintech-brand",
    tabLabel: "FINTECH PLATFORM",
    metric: "36.8M+",
    metricLabel: "organic impressions",
    client: "Consumer WealthTech App",
    category: "Organic Customer Acquisition",
    campaign: "Educational Authority & Social Proof",
    timeline: "90-DAY SPRINT",
    growth: "+390%",
    execution: [
      "Turned AMAs, webinars and market reviews into actionable micro-insights",
      "Deployed 45 dedicated finance-niche satellite accounts",
      "Daily hook A/B testing on click-through velocity",
      "CTAs driving direct app-store searches and bio traffic",
    ],
    results: [
      { label: "Organic Impressions", value: "36.8M+", change: "+390%" },
      { label: "Organic Search Volume", value: "+215%", change: "BRAND LIFT" },
      { label: "Daily View Floor", value: "400k+/day", change: "CONSISTENT" },
      { label: "Installs Attributed", value: "24,800+", change: "$0 CAC" },
    ],
    quote: "Rather than spending $100k/month on paid ads, GetVeevz's organic fleet lowered our customer acquisition cost to near zero.",
    accent: "#F59E0B",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bigNumY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.12 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cur = CASE_STUDIES[activeTab];

  return (
    <section
      id="case-studies-section"
      ref={sectionRef}
      className="noise-overlay"
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "170px 48px",
        overflow: "hidden",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      {/* Massive scroll-parallax metric number as backdrop — different device per section */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          right: "-3%",
          y: bigNumY,
          fontFamily: FONTS.display,
          fontSize: "clamp(10rem, 26vw, 30rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
          color: cur.accent,
          opacity: 0.06,
          pointerEvents: "none",
          zIndex: 0,
          transition: "color 0.5s ease",
          whiteSpace: "nowrap",
        }}
      >
        {cur.metric}
      </motion.div>

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header */}
        <div style={{ marginBottom: 70 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}
          >
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 005 ]</span>
            <span className="hairline" style={{ width: 72 }} />
            <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>PROOF OF WORK</span>
          </motion.div>

          <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(2.6rem, 5.6vw, 4.8rem)", fontWeight: 600, lineHeight: 1.04, letterSpacing: "-0.03em", margin: 0, color: COLORS.ice }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span style={{ display: "block" }} initial={{ y: "110%" }} whileInView={{ y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.1, ease: MOTION_EASE }}>
                Receipts,{" "}
                <em className="serif-accent" style={{ background: "linear-gradient(120deg,#38BDF8,#2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  not promises.
                </em>
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Tab switcher — mono underline tabs */}
        <div style={{ display: "flex", gap: 40, borderBottom: "1px solid rgba(241,245,249,0.09)", marginBottom: 0, flexWrap: "wrap" }}>
          {CASE_STUDIES.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => setActiveTab(i)}
              style={{
                background: "none",
                border: "none",
                padding: "18px 4px",
                cursor: "pointer",
                position: "relative",
                fontFamily: FONTS.mono,
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                color: activeTab === i ? cs.accent : COLORS.textMuted,
                transition: "color 0.35s ease",
                whiteSpace: "nowrap",
              }}
            >
              {cs.tabLabel}
              {activeTab === i && (
                <motion.span
                  layoutId="case-tab-underline"
                  style={{ position: "absolute", left: 0, right: 0, bottom: -1, height: 2, background: cs.accent, boxShadow: `0 0 14px ${cs.accent}` }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Case detail — magazine spread layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.65, ease: MOTION_EASE }}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
              gap: 72,
              padding: "64px 0 24px",
            }}
          >
            {/* Left column — narrative */}
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 18, marginBottom: 22, flexWrap: "wrap" }}>
                <span style={{ fontFamily: FONTS.display, fontSize: "clamp(3.2rem, 6vw, 5rem)", fontWeight: 600, letterSpacing: "-0.04em", color: cur.accent, lineHeight: 1 }}>
                  {cur.metric}
                </span>
                <span style={{ fontFamily: FONTS.serifAccent, fontStyle: "italic", fontSize: "1.25rem", color: COLORS.textMuted }}>{cur.metricLabel}</span>
              </div>

              <p style={{ fontFamily: FONTS.sans, fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.ice, margin: "0 0 8px" }}>
                {cur.client}
              </p>
              <p style={{ fontFamily: FONTS.body, fontSize: "0.9rem", color: COLORS.textMuted, margin: "0 0 30px" }}>
                {cur.category} · {cur.campaign} · {cur.timeline}
              </p>

              <div className="hairline" style={{ marginBottom: 28 }} />

              <div style={{ fontFamily: FONTS.mono, fontSize: "0.66rem", letterSpacing: "0.24em", color: cur.accent, marginBottom: 18 }}>
                EXECUTION LOG
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {cur.execution.map((ex, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: MOTION_EASE }}
                    style={{ display: "flex", gap: 16, padding: "11px 0", borderBottom: "1px solid rgba(241,245,249,0.06)" }}
                  >
                    <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: cur.accent, paddingTop: 2 }}>▸</span>
                    <span style={{ fontFamily: FONTS.body, fontSize: "0.88rem", color: "rgba(241,245,249,0.85)", lineHeight: 1.6 }}>{ex}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right column — results table + quote */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 44 }}>
              <div style={{ border: `1px solid ${cur.accent}30`, borderRadius: 20, padding: "34px 30px", background: `linear-gradient(165deg, ${cur.accent}08 0%, transparent 60%)` }}>
                <div style={{ fontFamily: FONTS.mono, fontSize: "0.66rem", letterSpacing: "0.24em", color: cur.accent, marginBottom: 20 }}>
                  RESULTS
                </div>
                {cur.results.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.55, ease: MOTION_EASE }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto auto 1fr auto",
                      alignItems: "center",
                      gap: 18,
                      padding: "13px 0",
                      borderBottom: i < cur.results.length - 1 ? "1px solid rgba(241,245,249,0.07)" : "none",
                    }}
                  >
                    <span style={{ fontFamily: FONTS.display, fontSize: "1.45rem", fontWeight: 600, letterSpacing: "-0.02em", color: COLORS.ice }}>{r.value}</span>
                    <span style={{ fontFamily: FONTS.body, fontSize: "0.82rem", color: COLORS.textMuted, gridColumn: "span 2" }}>{r.label}</span>
                    <span style={{ fontFamily: FONTS.mono, fontSize: "0.62rem", letterSpacing: "0.14em", color: cur.accent, whiteSpace: "nowrap" }}>{r.change}</span>
                  </motion.div>
                ))}
              </div>

              <blockquote style={{ margin: 0, position: "relative", paddingLeft: 26 }}>
                <span style={{ position: "absolute", left: 0, top: 4, bottom: 4, width: 3, borderRadius: 2, background: `linear-gradient(180deg, ${cur.accent}, transparent)`, boxShadow: `0 0 16px ${cur.accent}80` }} />
                <p style={{ fontFamily: FONTS.serifAccent, fontStyle: "italic", fontSize: "1.3rem", lineHeight: 1.5, color: COLORS.ice, margin: 0 }}>
                  "{cur.quote}"
                </p>
              </blockquote>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}