import React from "react";
import { motion } from "motion/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../utils/theme";

export default function Footer({ navLinks = [] }) {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        background: "#030305",
        borderTop: "1px solid rgba(56,189,248,0.08)",
        padding: "110px 48px 44px",
        overflow: "hidden",
      }}
    >
      {/* Giant wordmark — awwwards signature footer move */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: MOTION_EASE }}
        className="text-stroke"
        style={{
          fontFamily: FONTS.display,
          fontSize: "clamp(5rem, 17vw, 20rem)",
          fontWeight: 700,
          letterSpacing: "-0.05em",
          lineHeight: 0.9,
          textAlign: "center",
          whiteSpace: "nowrap",
          userSelect: "none",
          marginBottom: -40,
          pointerEvents: "none",
        }}
      >
        GETVEEVZ
      </motion.div>

      <div style={{ maxWidth: 1440, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Nav grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) auto auto",
            gap: 72,
            alignItems: "start",
            paddingBottom: 56,
            borderBottom: "1px solid rgba(241,245,249,0.08)",
          }}
        >
          {/* Brand blurb */}
          <div style={{ maxWidth: 380 }}>
            <div onClick={scrollToTop} style={{ display: "inline-flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 18 }}>
              <img src="/logo.png" alt="GetVeevz" style={{ width: 32, height: 32, objectFit: "contain" }} />
              <span style={{ fontFamily: FONTS.display, fontSize: "1.3rem", fontWeight: 600, letterSpacing: "-0.02em", color: COLORS.ice }}>
                GetVeevz
              </span>
            </div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.86rem", color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>
              The short-form distribution engine. Turning long-form media into high-scale reach across Shorts, Reels and TikTok.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <div style={{ fontFamily: FONTS.mono, fontSize: "0.64rem", letterSpacing: "0.26em", color: COLORS.sky, marginBottom: 20 }}>SITEMAP</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontFamily: FONTS.body,
                    fontSize: "0.84rem",
                    color: "rgba(241,245,249,0.6)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = COLORS.sky;
                    e.currentTarget.style.transform = "translateX(5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(241,245,249,0.6)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* CTA block */}
          <div style={{ maxWidth: 260 }}>
            <div style={{ fontFamily: FONTS.mono, fontSize: "0.64rem", letterSpacing: "0.26em", color: COLORS.sky, marginBottom: 20 }}>DIRECT CONNECT</div>
            <p style={{ fontFamily: FONTS.body, fontSize: "0.84rem", color: COLORS.textMuted, lineHeight: 1.6, margin: "0 0 18px" }}>
              Ready to scale your distribution?
            </p>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: `linear-gradient(120deg, ${COLORS.cobalt}, ${COLORS.sky})`,
                color: "#FFFFFF",
                padding: "13px 22px",
                borderRadius: 999,
                fontSize: "0.74rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Book strategy call
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 30, flexWrap: "wrap", gap: 16 }}>
          <span style={{ fontFamily: FONTS.mono, fontSize: "0.66rem", letterSpacing: "0.14em", color: "rgba(241,245,249,0.35)" }}>
            © {new Date().getFullYear()} GETVEEVZ INC. — CONTENT DISTRIBUTION ENGINE
          </span>

          <button
            onClick={scrollToTop}
            className="glow-border"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(17,24,39,0.6)",
              border: "1px solid rgba(241,245,249,0.1)",
              borderRadius: 999,
              padding: "10px 18px",
              fontFamily: FONTS.mono,
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: COLORS.ice,
              cursor: "pointer",
              transition: "border-color .3s ease, box-shadow .3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${COLORS.sky}70`;
              e.currentTarget.style.boxShadow = `0 0 26px rgba(56,189,248,0.28)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(241,245,249,0.1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            BACK TO TOP
            <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: COLORS.sky, alignItems: "center", justifyContent: "center" }}>
              <ArrowUp size={12} color="#050508" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}