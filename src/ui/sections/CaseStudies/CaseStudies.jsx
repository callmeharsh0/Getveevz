import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Eye, Play, Sparkles, CheckCircle, ArrowUpRight } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

const CASE_STUDIES = [
  {
    id: "tech-founder",
    tabLabel: "B2B Tech Founder",
    client: "Series B Enterprise SaaS Founder",
    category: "Personal Brand & Inbound Pipeline",
    campaign: "Keynote & Podcast Repurposing Engine",
    views: "28.4M",
    growth: "+480%",
    channels: "35 Managed Channels",
    timeline: "90-Day Sprint",
    execution: [
      "Extracted 42 high-retention clips from 4 conference keynotes and 2 podcasts",
      "Created 35 autonomous brand satellite channels across YouTube Shorts, Reels, and TikTok",
      "Synchronized daily publishing at peak B2B algorithmic windows",
      "Real-time hook iteration boosting retention past the 80% completion mark",
    ],
    results: [
      { label: "Total Views Generated", value: "28.4M+", change: "+480%" },
      { label: "Profile Inbound Visits", value: "142,000+", change: "+310%" },
      { label: "High-Ticket Enterprise Leads", value: "84 DMs / Inquiries", change: "Zero Ad Spend" },
      { label: "Average 3s Hook Retention", value: "96.4%", change: "Top 1% Benchmark" },
    ],
    highlightQuote: "GetVeevz built an entire media engine out of talks I had already delivered. We generated over 28M views without recording a single extra minute.",
  },
  {
    id: "media-network",
    tabLabel: "Top 50 Business Podcast",
    client: "Weekly Long-Form Video Podcast",
    category: "Media Syndication Network",
    campaign: "Omni-Channel Fleet Dominance",
    views: "54.2M",
    growth: "+620%",
    channels: "60 Managed Channels",
    timeline: "6-Month Scale",
    execution: [
      "Processed 24 two-hour episodes into 210 viral short-form micro-hooks",
      "Managed 60 sub-pages segmenting episodes by guest, industry, and topic",
      "Designed dynamic sonic audio beds and branded typography templates",
      "Coordinated surge posting during live episode drops",
    ],
    results: [
      { label: "Total Views Distributed", value: "54.2M+", change: "+620%" },
      { label: "Podcast Subscriber Lift", value: "+38,500", change: "+140%" },
      { label: "Brand Sponsorship Value", value: "2.8x Increase", change: "Verified" },
      { label: "Top Single Clip Views", value: "8.9M", change: "TikTok & Shorts" },
    ],
    highlightQuote: "Our podcast was great, but our reach was stuck on Spotify. GetVeevz turned our long-form archive into a 50M+ view distribution machine.",
  },
  {
    id: "fintech-brand",
    tabLabel: "Fintech & Wealth Platform",
    client: "Consumer WealthTech App",
    category: "Organic Customer Acquisition",
    campaign: "Educational Authority & Social Proof",
    views: "36.8M",
    growth: "+390%",
    channels: "45 Managed Channels",
    timeline: "90-Day Sprint",
    execution: [
      "Turned founder AMAs, product webinars, and market reviews into bite-sized actionable insights",
      "Deployed 45 dedicated finance/wealth niche satellite accounts",
      "Conducted daily hook A/B testing on algorithmic click-through velocity",
      "Optimized CTAs driving direct app store searches and bio traffic",
    ],
    results: [
      { label: "Organic Impressions", value: "36.8M+", change: "+390%" },
      { label: "App Installs Attributed", value: "24,800+", change: "$0 CAC" },
      { label: "Organic Search Volume", value: "+215%", change: "Brand Lift" },
      { label: "Daily Active View Floor", value: "400k+ Views/Day", change: "Consistent" },
    ],
    highlightQuote: "Rather than spending $100k/month on paid Meta ads, GetVeevz's organic distribution fleet lowered our customer acquisition cost to near zero.",
  },
];

export default function CaseStudies() {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cur = CASE_STUDIES[activeTab];

  return (
    <section
      id="case-studies-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: `linear-gradient(180deg, ${COLORS.obsidian} 0%, ${COLORS.midnight} 60%, ${COLORS.obsidian} 100%)`,
        padding: "130px 24px",
        overflow: "hidden",
      }}
    >
      {/* Cobalt glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "900px",
          height: "500px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Header Block */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 780,
            margin: "0 auto 60px",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.body,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: COLORS.sky,
              marginBottom: 16,
              background: "rgba(37, 99, 235, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "6px 14px",
              borderRadius: 999,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.sky }} />
            REAL DISTRIBUTION RESULTS
          </div>

          <h2
            style={{
              fontFamily: FONTS.sans,
              fontSize: "clamp(2.3rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: COLORS.ice,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            See What the Distribution Can Look Like
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.95rem",
              color: COLORS.textMuted,
              marginTop: 14,
            }}
          >
            Structured breakdowns of client content transformed into massive multi-channel reach.
          </p>
        </div>

        {/* Tab Switcher */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          {CASE_STUDIES.map((cs, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={cs.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  background: isActive ? "linear-gradient(135deg, #2563EB, #38BDF8)" : "rgba(17, 24, 39, 0.7)",
                  color: isActive ? "#FFFFFF" : COLORS.ice,
                  border: isActive ? "1px solid #38BDF8" : `1px solid ${COLORS.borderSubtle}`,
                  borderRadius: 30,
                  padding: "10px 22px",
                  fontFamily: FONTS.sans,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: isActive ? "0 8px 24px rgba(37, 99, 235, 0.35)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)";
                    e.currentTarget.style.background = "rgba(17, 24, 39, 0.9)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = COLORS.borderSubtle;
                    e.currentTarget.style.background = "rgba(17, 24, 39, 0.7)";
                  }
                }}
              >
                {cs.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Structured Case Study Card (Client → Campaign → Execution → Results) */}
        <div
          style={{
            background: "linear-gradient(165deg, rgba(17, 24, 39, 0.9) 0%, rgba(5, 5, 8, 0.95) 100%)",
            border: `1px solid ${COLORS.borderAccent}`,
            borderRadius: 24,
            padding: "44px 38px",
            boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shard corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 60,
              height: 60,
              background: "linear-gradient(135deg, transparent 50%, rgba(56, 189, 248, 0.35) 100%)",
            }}
          />

          {/* Top Info Banner: Client & Campaign */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 20,
              paddingBottom: 28,
              borderBottom: `1px solid ${COLORS.borderSubtle}`,
              marginBottom: 34,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: COLORS.sky,
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                {cur.category} // {cur.timeline}
              </div>
              <h3
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 700,
                  color: COLORS.ice,
                  margin: "0 0 6px",
                }}
              >
                {cur.client}
              </h3>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: "0.9rem",
                  color: COLORS.textMuted,
                }}
              >
                Campaign: <span style={{ color: COLORS.ice, fontWeight: 600 }}>{cur.campaign}</span>
              </div>
            </div>

            {/* Quick Badges */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div
                style={{
                  background: "rgba(37, 99, 235, 0.18)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  borderRadius: 12,
                  padding: "10px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: FONTS.sans, fontSize: "1.4rem", fontWeight: 800, color: COLORS.sky }}>
                  {cur.views}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.68rem", color: COLORS.ice, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Total Reach
                </div>
              </div>

              <div
                style={{
                  background: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.35)",
                  borderRadius: 12,
                  padding: "10px 18px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: FONTS.sans, fontSize: "1.4rem", fontWeight: 800, color: "#34D399" }}>
                  {cur.growth}
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: "0.68rem", color: COLORS.ice, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Reach Growth
                </div>
              </div>
            </div>
          </div>

          {/* Middle 2 Columns: Execution & Results */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 36,
              marginBottom: 34,
            }}
          >
            {/* Column 1: Execution Breakdown */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONTS.sans,
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: COLORS.ice,
                  marginBottom: 18,
                }}
              >
                <Sparkles size={18} color={COLORS.sky} />
                <span>Execution Protocol</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {cur.execution.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      background: "rgba(5, 5, 8, 0.6)",
                      border: `1px solid ${COLORS.borderSubtle}`,
                      borderRadius: 12,
                      padding: "14px 16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: COLORS.sky,
                        background: "rgba(37, 99, 235, 0.2)",
                        borderRadius: "50%",
                        width: 22,
                        height: 22,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontFamily: FONTS.body, fontSize: "0.85rem", color: COLORS.ice, lineHeight: 1.5 }}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Quantifiable Results */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: FONTS.sans,
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: COLORS.ice,
                  marginBottom: 18,
                }}
              >
                <TrendingUp size={18} color={COLORS.sky} />
                <span>Verified Deliverables & Lift</span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                {cur.results.map((res, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(5, 5, 8, 0.75)",
                      border: `1px solid rgba(56, 189, 248, 0.2)`,
                      borderRadius: 14,
                      padding: "18px 16px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: "0.72rem",
                        color: COLORS.textMuted,
                        marginBottom: 6,
                      }}
                    >
                      {res.label}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.sans,
                        fontSize: "1.35rem",
                        fontWeight: 800,
                        color: COLORS.ice,
                      }}
                    >
                      {res.value}
                    </div>
                    <div
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        color: COLORS.sky,
                        marginTop: 4,
                      }}
                    >
                      {res.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Highlight Quote */}
          <div
            style={{
              background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(17, 24, 39, 0.6) 100%)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              borderRadius: 16,
              padding: "20px 24px",
              fontFamily: FONTS.body,
              fontSize: "0.92rem",
              fontStyle: "italic",
              color: COLORS.ice,
              lineHeight: 1.6,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: "1.8rem", color: COLORS.sky, lineHeight: 1 }}>“</span>
            <span>{cur.highlightQuote}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
