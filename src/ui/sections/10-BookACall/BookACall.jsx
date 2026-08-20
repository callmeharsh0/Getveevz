import { useState, useEffect, useRef } from "react";

/**
 * BookACall
 * ---------
 * Full-screen CTA section that sits BELOW the 3D scroll experience.
 * When the user scrolls past the last scene, the sticky canvas unsticks
 * and this section scrolls into view with a staggered entrance animation.
 *
 * Matches the warm cinematic gallery aesthetic of the rest of the site.
 */
export default function BookACall() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="book-a-call-section"
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "80vh",
        background: "#0e0c0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* ── DECORATIVE TOP DIVIDER ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "1px",
          height: "120px",
          background:
            "linear-gradient(to bottom, transparent, rgba(212, 146, 74, 0.5), transparent)",
        }}
      />

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "720px",
          textAlign: "center",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(60px)",
          transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.65rem",
            fontWeight: 400,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "#d4924a",
            marginBottom: "2rem",
            opacity: isVisible ? 0.9 : 0,
            transition: "opacity 1s 0.2s ease",
          }}
        >
          Next Step
        </p>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 300,
            marginLeft: "auto",
            marginRight: "auto",
            color: "#f2ece1",
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Build Your Organic views Engine
          <br />
          <span style={{ fontStyle: "italic", color: "#e8a463" }}>
            With us
          </span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
            fontWeight: 300,
            color: "rgba(242, 236, 225, 0.55)",
            lineHeight: 1.7,
            marginTop: "2rem",
            maxWidth: "480px",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 1s 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 1s 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Whether it's clipping, PR seeding, or full-scale production —
          we handle everything you need to go viral.
        </p>

        {/* CTA Button */}
        <div
          style={{
            marginTop: "3.5rem",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition:
              "opacity 1s 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 1s 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.8rem",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#0e0c0a",
              background:
                "linear-gradient(135deg, #e8a463, #d4924a)",
              padding: "1.1rem 2.8rem",
              borderRadius: "0",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(232, 164, 99, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book a Call
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>→</span>
          </a>
        </div>

        {/* Secondary link */}
        <p
          style={{
            marginTop: "2rem",
            opacity: isVisible ? 1 : 0,
            transition: "opacity 1s 0.7s ease",
          }}
        >
          <a
            href="mailto:hello@nexusmedia.com"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 300,
              letterSpacing: "0.15em",
              color: "rgba(242, 236, 225, 0.4)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(242, 236, 225, 0.15)",
              paddingBottom: "2px",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(242, 236, 225, 0.8)";
              e.currentTarget.style.borderColor = "rgba(242, 236, 225, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(242, 236, 225, 0.4)";
              e.currentTarget.style.borderColor = "rgba(242, 236, 225, 0.15)";
            }}
          >
            or drop us an email
          </a>
        </p>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}

      {/* ── AMBIENT GLOW ────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212, 146, 74, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
