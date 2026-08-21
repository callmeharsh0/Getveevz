import React, { useState, useEffect, useRef } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { COLORS, FONTS } from "../../../utils/theme";

const FAQ_ITEMS = [
  {
    q: "What exactly does GetVeevz do?",
    a: "GetVeevz turns the long-form content you are already creating into large-scale short-form distribution across Instagram, YouTube Shorts, and TikTok. We handle the entire lifecycle end-to-end: high-retention clipping, campaign coordination, dedicated channel fleet distribution, and real-time performance tracking.",
  },
  {
    q: "What type of content can we use?",
    a: "We work with any existing video or audio recordings: podcasts, conference talks, webinars, YouTube videos, executive interviews, live streams, customer AMAs, and product demos. If you have 30 to 60+ minutes of raw video, we can transform it into dozens of high-leverage distribution assets.",
  },
  {
    q: "Which platforms do you work with?",
    a: "We syndicate natively across the three dominant algorithmic short-form ecosystems: YouTube Shorts, Instagram Reels, and TikTok. We format and optimize video pacing, aspect ratios, sound beds, and metadata specifically for each platform's algorithm.",
  },
  {
    q: "Who creates the clips?",
    a: "Our in-house team of viral retention strategists, editors, and hook engineers reviews your raw footage. We identify high-impact moments, extract retention hooks, craft kinetic typography, and engineer dynamic pacing designed specifically to capture algorithmic attention.",
  },
  {
    q: "Where are the clips posted?",
    a: "Clips are published across your primary verified brand channels as well as our managed network of 30 to 120 dedicated brand satellite accounts. This multi-channel fleet strategy floods platform feeds and dramatically increases discovery without requiring you to share sensitive master account logins.",
  },
  {
    q: "How does the campaign work?",
    a: "The workflow is simple and turnkey: you share raw footage with our team via cloud drive; we analyze and extract high-retention clips; we schedule synchronized daily publishing waves across our distribution network; and we track engagement telemetry to double down on winning formats.",
  },
  {
    q: "How long does onboarding take?",
    a: "Onboarding typically takes less than 72 hours. Once we receive your brand guidelines and initial content archives, our team sets up channel infrastructure, prepares the first batch of clips, and initiates the initial warmup phase.",
  },
  {
    q: "How much does it cost?",
    a: "Our plans are structured transparently based on content volume and distribution fleet scale (e.g. 30, 60, or 120 managed channels). We offer flexible monthly retainer tiers suited for solo founders, high-volume shows, and enterprise brands looking for full-scale distribution.",
  },
  {
    q: "What results can we expect?",
    a: "While algorithmic performance varies by niche and audience interest, our multi-channel syndication model is engineered to maximize exposure velocity and organic reach. Clients typically see substantial increases in total cross-platform impressions, subscriber growth, and inbound profile visits as the distribution fleet builds algorithmic momentum.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
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

  const toggle = (idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq-section"
      ref={sectionRef}
      style={{
        position: "relative",
        background: `linear-gradient(180deg, ${COLORS.obsidian} 0%, ${COLORS.midnight} 60%, ${COLORS.obsidian} 100%)`,
        padding: "130px 24px",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "400px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(56, 189, 248, 0.03) 50%, transparent 75%)",
          filter: "blur(90px)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 60,
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
            <HelpCircle size={13} color={COLORS.sky} />
            CLARITY & TRANSPARENCY
          </div>

          <h2
            style={{
              fontFamily: FONTS.sans,
              fontSize: "clamp(2.3rem, 5vw, 3.6rem)",
              fontWeight: 700,
              color: COLORS.ice,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Frequently Asked Questions
          </h2>
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.95rem",
              color: COLORS.textMuted,
              marginTop: 14,
            }}
          >
            Everything you need to know about the GetVeevz content distribution engine.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                style={{
                  background: isOpen
                    ? "linear-gradient(145deg, rgba(23, 37, 84, 0.35) 0%, rgba(17, 24, 39, 0.85) 100%)"
                    : "rgba(17, 24, 39, 0.6)",
                  border: isOpen ? "1px solid rgba(56, 189, 248, 0.35)" : `1px solid ${COLORS.borderSubtle}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
                  boxShadow: isOpen ? "0 10px 30px rgba(37, 99, 235, 0.2)" : "none",
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "22px 24px",
                    background: "none",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "1.05rem",
                      fontWeight: 600,
                      color: isOpen ? COLORS.sky : COLORS.ice,
                      lineHeight: 1.4,
                      transition: "color 0.25s ease",
                    }}
                  >
                    {item.q}
                  </span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isOpen ? "rgba(56, 189, 248, 0.2)" : "rgba(241, 245, 249, 0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isOpen ? COLORS.sky : COLORS.ice,
                      flexShrink: 0,
                      transition: "all 0.25s ease",
                    }}
                  >
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: "0 24px 22px",
                      fontFamily: FONTS.body,
                      fontSize: "0.9rem",
                      color: COLORS.textMuted,
                      lineHeight: 1.65,
                      animation: "fadeIn 0.3s ease",
                    }}
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
