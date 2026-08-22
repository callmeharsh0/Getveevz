import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";

const ASSURANCES = ["CUSTOM DISTRIBUTION ROADMAP", "NO AGENCY LOCK-IN", "72-HOUR ONBOARDING"];

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // Closing line scales up like a finale
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1.02]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setInView(true), { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="final-cta-section"
      ref={sectionRef}
      className="noise-overlay"
      style={{
        position: "relative",
        background: COLORS.obsidian,
        padding: "190px 48px 150px",
        overflow: "hidden",
        textAlign: "center",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      {/* Finale bloom — strongest of the page */}
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.06, 1], opacity: inView ? [0.6, 0.9, 0.6] : 0.4 }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "42%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1100,
          height: 700,
          background: `radial-gradient(ellipse, rgba(37,99,235,0.22) 0%, rgba(56,189,248,0.07) 45%, transparent 75%)`,
          filter: "blur(110px)",
          pointerEvents: "none",
        }}
      />

      {/* Orbital ring */}
      <div aria-hidden className="spin-slow" style={{ position: "absolute", top: "18%", left: "50%", marginLeft: -340, width: 680, height: 680, borderRadius: "50%", border: "1px dashed rgba(56,189,248,0.13)", pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: -5, left: "50%", width: 9, height: 9, borderRadius: "50%", background: COLORS.sky, boxShadow: "0 0 16px #38BDF8" }} />
      </div>

      <motion.div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2, scale }}>
        {/* Index marker */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: MOTION_EASE }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 40 }}
        >
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.7rem", color: COLORS.sky, letterSpacing: "0.2em" }}>[ 008 ]</span>
          <span className="hairline" style={{ width: 56 }} />
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.68rem", color: COLORS.textMuted, letterSpacing: "0.28em" }}>FINAL TRANSMISSION</span>
        </motion.div>

        {/* Big closing statement */}
        <h2 style={{ fontFamily: FONTS.display, fontSize: "clamp(3rem, 7vw, 6.4rem)", fontWeight: 600, lineHeight: 1.02, letterSpacing: "-0.035em", margin: "0 0 28px", color: COLORS.ice }}>
          {["Your content is ready.", ""].map((_, li) => (
            <span key={li} style={{ display: "block", overflow: "hidden" }}>
              <motion.span
                style={{ display: "block" }}
                initial={{ y: "112%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: li * 0.12, duration: 1.15, ease: MOTION_EASE }}
              >
                {li === 0 ? (
                  "Your content is ready."
                ) : (
                  <>
                    We build{" "}
                    <em className="serif-accent" style={{ background: "linear-gradient(120deg,#38BDF8,#2563EB)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontSize: "1.05em" }}>
                      the reach.
                    </em>
                  </>
                )}
              </motion.span>
            </span>
          ))}
        </h2>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.9 }}
          style={{ fontFamily: FONTS.body, fontSize: "clamp(0.95rem, 1.25vw, 1.12rem)", color: COLORS.textMuted, maxWidth: 560, margin: "0 auto 52px", lineHeight: 1.75 }}
        >
          Book a 1-on-1 distribution architecture call with our leadership team and see what we can build around your existing archive.
        </motion.p>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.55, duration: 0.9, ease: MOTION_EASE }}>
          <motion.a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-border"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              fontFamily: FONTS.sans,
              fontSize: "0.86rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              textDecoration: "none",
              color: "#FFFFFF",
              background: `linear-gradient(120deg, ${COLORS.cobalt} 0%, ${COLORS.sky} 100%)`,
              padding: "24px 46px",
              borderRadius: 999,
              boxShadow: `0 20px 60px -10px rgba(37,99,235,0.55)`,
            }}
          >
            <Calendar size={17} />
            Book a strategy call
            <ArrowUpRight size={17} />
          </motion.a>
        </motion.div>

        {/* Assurances — mono ticker-style row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75, duration: 1 }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 44,
            flexWrap: "wrap",
            marginTop: 64,
            paddingTop: 32,
            borderTop: "1px solid rgba(241,245,249,0.07)",
          }}
        >
          {ASSURANCES.map((a, i) => (
            <motion.span
              key={a}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.85 + i * 0.1, duration: 0.7 }}
              style={{
                fontFamily: FONTS.mono,
                fontSize: "0.66rem",
                letterSpacing: "0.24em",
                color: COLORS.textMuted,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: i === 0 ? COLORS.sky : i === 1 ? "#34D399" : "#F59E0B", boxShadow: `0 0 8px currentColor` }} />
              {a}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}