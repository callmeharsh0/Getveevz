import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const FAQS = [
  { q: "What do you actually do?",          a: "We clip your long-form content and syndicate it across YouTube Shorts, Instagram Reels, and TikTok — through 30–120 brand satellite channels. You hand us the files. We handle everything else." },
  { q: "What content do you need?",         a: "Podcasts, keynotes, webinars, interviews — anything 30 minutes or longer. Any format, any platform." },
  { q: "Who posts the clips?",              a: "We do. Our team manages dedicated brand satellite accounts. You never need to log in or upload anything." },
  { q: "How fast do you onboard?",          a: "72 hours from first call to first clips live. That's our standard." },
  { q: "What results should we expect?",    a: "Most clients see 10–50M+ views in the first 90 days. Results vary by niche — but the fleet distribution model is built to compound." },
  { q: "No ad spend required?",             a: "Correct. This is 100% organic distribution. Algorithmic reach, not paid placement." },
  { q: "Is there a contract?",              a: "Monthly retainer. No long-term lock-in. Cancel anytime — though most clients stay for the compounding." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq-section"
      style={{
        /* Slightly different dark — a hint of navy */
        background: "#080e1f",
        padding: "140px 48px",
        overflow: "hidden",
      }}
    >
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 80,
        alignItems: "start",
      }}>
        {/* Left — sticky label */}
        <div style={{ position: "sticky", top: 120 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: MOTION_EASE }}
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: COLORS.ice,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Common
            <br />
            <span style={{ color: "#38BDF8" }}>questions.</span>
          </motion.h2>
        </div>

        {/* Right — accordion list */}
        <div>
          {FAQS.map((item, i) => (
            <div
              key={i}
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "28px 0",
                  gap: 24,
                }}
              >
                <span style={{
                  fontFamily: FONTS.body,
                  fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                  fontWeight: 500,
                  color: open === i ? COLORS.ice : "rgba(241,245,249,0.6)",
                  lineHeight: 1.4,
                  transition: "color 0.3s ease",
                  textAlign: "left",
                }}>
                  {item.q}
                </span>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                  border: `1px solid ${open === i ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.12)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: open === i ? "#38BDF8" : "rgba(241,245,249,0.35)",
                  fontSize: "1.2rem", lineHeight: 1,
                  transition: "all 0.3s ease",
                }}>
                  {open === i ? "−" : "+"}
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      fontFamily: FONTS.body,
                      fontSize: "0.9rem",
                      color: "rgba(241,245,249,0.45)",
                      lineHeight: 1.75,
                      margin: 0,
                      paddingBottom: 28,
                      maxWidth: 560,
                    }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
