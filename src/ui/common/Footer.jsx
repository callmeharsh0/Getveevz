import React from "react";
import { ArrowUp, Mail, Calendar } from "lucide-react";
import { COLORS, FONTS } from "../../utils/theme";

export default function Footer({ navLinks = [] }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        background: "#030305",
        borderTop: `1px solid ${COLORS.borderSubtle}`,
        padding: "60px 24px 40px",
        color: COLORS.ice,
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 36,
            paddingBottom: 44,
            borderBottom: `1px solid rgba(241, 245, 249, 0.08)`,
          }}
        >
          {/* Brand Identity */}
          <div style={{ maxWidth: 360 }}>
            <div
              onClick={scrollToTop}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                marginBottom: 16,
              }}
            >
              <img
                src="/logo.png"
                alt="GetVeevz Logo"
                style={{ width: 34, height: 34, objectFit: "contain" }}
              />
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: COLORS.ice,
                }}
              >
                GetVeevz
              </span>
            </div>

            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "0.86rem",
                color: COLORS.textMuted,
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              The short-form content distribution engine. Turning long-form media into high-scale reach across YouTube Shorts, Instagram Reels, and TikTok.
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.sky,
                marginBottom: 18,
              }}
            >
              Navigation
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(130px, 1fr))",
                gap: "10px 24px",
              }}
            >
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontFamily: FONTS.body,
                    fontSize: "0.82rem",
                    color: "rgba(241, 245, 249, 0.65)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.sky)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(241, 245, 249, 0.65)")}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Direct CTA */}
          <div style={{ maxWidth: 280 }}>
            <div
              style={{
                fontFamily: FONTS.sans,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.sky,
                marginBottom: 18,
              }}
            >
              Direct Connect
            </div>
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: "0.84rem",
                color: COLORS.textMuted,
                lineHeight: 1.5,
                marginBottom: 16,
              }}
            >
              Ready to scale your content distribution?
            </p>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #2563EB, #38BDF8)",
                color: "#FFFFFF",
                padding: "10px 20px",
                borderRadius: 8,
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "opacity 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Calendar size={14} />
              <span>Book Strategy Call</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright + Back to top */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 28,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.75rem",
              color: "rgba(241, 245, 249, 0.4)",
            }}
          >
            © {new Date().getFullYear()} GetVeevz Inc. All rights reserved. Content Distribution Engine.
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(17, 24, 39, 0.6)",
              border: `1px solid ${COLORS.borderSubtle}`,
              borderRadius: 8,
              padding: "6px 14px",
              fontFamily: FONTS.body,
              fontSize: "0.75rem",
              color: COLORS.ice,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.sky;
              e.currentTarget.style.color = COLORS.sky;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.borderSubtle;
              e.currentTarget.style.color = COLORS.ice;
            }}
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
