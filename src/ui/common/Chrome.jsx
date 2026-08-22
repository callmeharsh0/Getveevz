import { useState, useEffect, useRef } from "react";
import { Calendar, Menu, X, ArrowRight } from "lucide-react";
import { COLORS, FONTS } from "../../utils/theme";

/**
 * Chrome Component
 * ----------------
 * - SOUND button top-left with Web Audio Synthwave Music Engine & Equalizer Visualizer (in Cobalt/Sky)
 * - Interactive hover & click SFX
 * - GetVeevz brand logo and wordmark (click to scroll to top)
 * - Persistent "Book a Strategy Call" CTA button top-right
 * - 3-Line MENU button opening full navigation drawer with dedicated buttons for every scroll section
 * - Active-section highlight state as user scrolls
 * - "scroll to enter" indicator bottom-center (intro only).
 */
export default function Chrome({ progress }) {
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Section List for Navigation & Drawer
  const SECTIONS = [
    { num: "01", name: "Hero", desc: "Turn Long-Form Into Distribution Engine", id: "top" },
    { num: "02", name: "Proof", desc: "240M+ Views & Verified Stream Proof", id: "results-section", highlight: true },
    { num: "03", name: "The Problem", desc: "The Content Distribution Gap", id: "problem-solution-section" },
    { num: "04", name: "What We Do", desc: "Clipping, Distribution, Fleet & Tracking", id: "what-we-do-section" },
    { num: "05", name: "How It Works", desc: "4-Step Turnkey Distribution Pipeline", id: "how-it-works-section" },
    { num: "06", name: "Case Studies", desc: "Client Breakdowns & Verified Metrics", id: "case-studies-section", highlight: true },
    { num: "07", name: "Why GetVeevz", desc: "Distribution Engine vs Video Editor", id: "why-getveevz-section" },
    { num: "08", name: "Pricing", desc: "Spark, Momentum & Dominate tiers", id: "pricing-section" },
    { num: "09", name: "FAQ", desc: "Common Questions & Operational Details", id: "faq-section" },
    { num: "10", name: "Final CTA", desc: "Book Your 1-on-1 Strategy Call", id: "final-cta-section", highlight: true },
  ];

  // Track real page scroll & active section
  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);

      // Detect active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const introHintOpacity = Math.max(1 - (progress ?? 0) / 0.08 - scrollY / 500, 0);

  // Play subtle hover UI blip
  const playHoverFx = () => {
    if (!soundOn || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {}
  };

  // Play sub click
  const playClickFx = () => {
    if (!soundOn || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  // Synthwave Engine
  useEffect(() => {
    if (soundOn) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        let step = 0;
        const bpm = 124;
        const stepTime = 60 / bpm / 4;

        const bassNotes = [55, 55, 55, 55, 43.65, 43.65, 43.65, 43.65, 49, 49, 49, 49, 41.2, 41.2, 41.2, 41.2];
        const leadNotes = [329.63, 392.0, 440.0, 523.25, 587.33, 659.25, 523.25, 440.0];

        const playSynthStep = () => {
          if (!audioCtxRef.current) return;
          const now = ctx.currentTime;

          const bassFreq = bassNotes[step % bassNotes.length];
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          bassOsc.type = "sawtooth";
          bassOsc.frequency.setValueAtTime(bassFreq, now);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450 + Math.sin(step * 0.5) * 150, now);

          bassGain.gain.setValueAtTime(0.14, now);
          bassGain.gain.exponentialRampToValueAtTime(0.01, now + stepTime * 0.9);

          bassOsc.connect(filter);
          filter.connect(bassGain);
          bassGain.connect(ctx.destination);

          bassOsc.start(now);
          bassOsc.stop(now + stepTime * 0.95);

          if (step % 2 === 0) {
            const leadFreq = leadNotes[(step / 2) % leadNotes.length];
            const leadOsc = ctx.createOscillator();
            const leadGain = ctx.createGain();

            leadOsc.type = "sine";
            leadOsc.frequency.setValueAtTime(leadFreq, now);

            leadGain.gain.setValueAtTime(0.08, now);
            leadGain.gain.exponentialRampToValueAtTime(0.001, now + stepTime * 1.5);

            leadOsc.connect(leadGain);
            leadGain.connect(ctx.destination);

            leadOsc.start(now);
            leadOsc.stop(now + stepTime * 1.5);
          }

          if (step % 4 === 0) {
            const kickOsc = ctx.createOscillator();
            const kickGain = ctx.createGain();
            kickOsc.type = "sine";
            kickOsc.frequency.setValueAtTime(130, now);
            kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.12);
            kickGain.gain.setValueAtTime(0.25, now);
            kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            kickOsc.connect(kickGain);
            kickGain.connect(ctx.destination);
            kickOsc.start(now);
            kickOsc.stop(now + 0.12);
          }

          step++;
        };

        timerRef.current = setInterval(playSynthStep, stepTime * 1000);
      } catch (err) {
        console.warn("Web Audio initialization:", err);
      }
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, [soundOn]);

  const scrollToSection = (id) => {
    playClickFx();
    setMenuOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isScrolled = scrollY > 40;

  return (
    <>
      {/* ── TOP STICKY NAVBAR ───────────────────────────────────────────── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          background: isScrolled
            ? "rgba(5, 5, 8, 0.85)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
          borderBottom: isScrolled
            ? "1px solid rgba(56, 189, 248, 0.15)"
            : "1px solid transparent",
          padding: isScrolled ? "14px 24px" : "24px 32px",
          transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1380,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* LEFT: BRAND LOGO + SOUND TOGGLE */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              onClick={() => scrollToSection("top")}
              onMouseEnter={playHoverFx}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              <img
                src="/logo.png"
                alt="GetVeevz Logo"
                style={{
                  width: 32,
                  height: 32,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 10px rgba(37, 99, 235, 0.5))",
                }}
              />
              <span
                style={{
                  fontFamily: FONTS.sans,
                  fontSize: "1.05rem",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: COLORS.ice,
                }}
              >
                GetVeevz
              </span>
            </div>

            {/* SOUND button */}
            <button
              onClick={() => {
                playClickFx();
                setSoundOn((s) => !s);
              }}
              onMouseEnter={playHoverFx}
              style={{
                fontFamily: FONTS.body,
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                background: soundOn ? "rgba(37, 99, 235, 0.15)" : "rgba(241, 245, 249, 0.05)",
                border: soundOn ? "1px solid #38BDF8" : "1px solid rgba(241, 245, 249, 0.15)",
                borderRadius: 20,
                padding: "4px 10px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                color: soundOn ? COLORS.sky : "rgba(241, 245, 249, 0.6)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span>Sound</span>
              {soundOn ? (
                <span style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "10px" }}>
                  <span style={{ width: 2, height: "10px", background: COLORS.sky, animation: "equalizer 0.8s ease-in-out infinite" }} />
                  <span style={{ width: 2, height: "6px", background: COLORS.sky, animation: "equalizer 0.6s ease-in-out infinite 0.2s" }} />
                  <span style={{ width: 2, height: "8px", background: COLORS.sky, animation: "equalizer 0.9s ease-in-out infinite 0.4s" }} />
                </span>
              ) : (
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    backgroundColor: "rgba(241, 245, 249, 0.4)",
                    display: "inline-block",
                  }}
                />
              )}
            </button>
          </div>

          {/* DESKTOP CENTER NAVIGATION LINKS (ACTIVE STATE HIGHLIGHT) */}
          <nav
            style={{
              display: "none",
              alignItems: "center",
              gap: "12px",
              background: "rgba(17, 24, 39, 0.4)",
              backdropFilter: "blur(12px)",
              padding: "6px 12px",
              borderRadius: 14,
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
            className="hidden md:flex"
          >
            {SECTIONS.slice(1, 7).map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  onMouseEnter={playHoverFx}
                  style={{
                    background: isActive ? "rgba(255, 255, 255, 0.08)" : "none",
                    border: "none",
                    borderRadius: 8,
                    fontFamily: FONTS.sans,
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: isActive ? COLORS.ice : "rgba(241, 245, 249, 0.6)",
                    cursor: "pointer",
                    padding: "6px 12px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {sec.name}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: MENU BUTTON ONLY */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* 3-LINE MENU DRAWER BUTTON */}
            <button
              onClick={() => {
                playClickFx();
                setMenuOpen((o) => !o);
              }}
              onMouseEnter={playHoverFx}
              style={{
                background: "rgba(17, 24, 39, 0.7)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                borderRadius: 10,
                padding: "8px 14px",
                color: COLORS.ice,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontFamily: FONTS.body,
                fontSize: "0.74rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.25s ease",
              }}
            >
              <span>Menu</span>
              <Menu size={16} color={COLORS.sky} />
            </button>
          </div>
        </div>
      </header>

      {/* ── SCROLL-TO-ENTER INDICATOR (INTRO ONLY) ─────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: "2.5rem",
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.7rem",
          opacity: introHintOpacity,
          pointerEvents: introHintOpacity > 0.1 ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          onClick={() => scrollToSection("results-section")}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            background: "rgba(17, 24, 39, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.sky,
            fontSize: "0.95rem",
            animation: "bounceDown 2s ease-in-out infinite",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)",
          }}
        >
          ↓
        </div>
        <span
          style={{
            fontFamily: FONTS.body,
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(241, 245, 249, 0.6)",
          }}
        >
          Scroll to explore
        </span>
      </div>

      {/* ── FULL SCREEN NAVIGATION DRAWER WITH EVERY SECTION BUTTON ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(5, 5, 8, 0.85)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            justifyContent: "flex-end",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "480px",
              height: "100%",
              background: "linear-gradient(165deg, #111827 0%, #050508 100%)",
              borderLeft: "1px solid rgba(56, 189, 248, 0.3)",
              padding: "2.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "-24px 0 70px rgba(0, 0, 0, 0.85)",
              overflowY: "auto",
              animation: "slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <img src="/logo.png" alt="GetVeevz Logo" style={{ width: 28, height: 28 }} />
                  <span
                    style={{
                      fontFamily: FONTS.sans,
                      fontSize: "0.85rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: COLORS.sky,
                      fontWeight: 700,
                    }}
                  >
                    Site Navigation
                  </span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: COLORS.ice,
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(37, 99, 235, 0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)")}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Section List Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(37, 99, 235, 0.35) 0%, rgba(56, 189, 248, 0.15) 100%)"
                          : sec.highlight
                          ? "rgba(37, 99, 235, 0.1)"
                          : "rgba(255, 255, 255, 0.02)",
                        border: isActive
                          ? "1px solid #38BDF8"
                          : sec.highlight
                          ? "1px solid rgba(56, 189, 248, 0.3)"
                          : "1px solid rgba(255, 255, 255, 0.06)",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        textAlign: "left",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        transition: "all 0.25s ease",
                        transform: isActive ? "translateX(4px)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(37, 99, 235, 0.25)";
                        e.currentTarget.style.borderColor = COLORS.sky;
                        e.currentTarget.style.transform = "translateX(6px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = isActive
                          ? "linear-gradient(135deg, rgba(37, 99, 235, 0.35) 0%, rgba(56, 189, 248, 0.15) 100%)"
                          : sec.highlight
                          ? "rgba(37, 99, 235, 0.1)"
                          : "rgba(255, 255, 255, 0.02)";
                        e.currentTarget.style.borderColor = isActive
                          ? "#38BDF8"
                          : sec.highlight
                          ? "1px solid rgba(56, 189, 248, 0.3)"
                          : "rgba(255, 255, 255, 0.06)";
                        e.currentTarget.style.transform = isActive ? "translateX(4px)" : "none";
                      }}
                    >
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                          <span
                            style={{
                              fontFamily: FONTS.body,
                              fontSize: "0.65rem",
                              color: COLORS.sky,
                              fontWeight: 700,
                            }}
                          >
                            {sec.num}
                          </span>
                          <span
                            style={{
                              fontFamily: FONTS.sans,
                              fontSize: "1.05rem",
                              color: COLORS.ice,
                              fontWeight: 600,
                            }}
                          >
                            {sec.name}
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: FONTS.body,
                            fontSize: "0.72rem",
                            color: COLORS.textMuted,
                          }}
                        >
                          {sec.desc}
                        </div>
                      </div>
                      <ArrowRight size={16} color={COLORS.sky} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer CTA */}
            <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: "1.5rem", marginTop: "1.5rem" }}>
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  background: "linear-gradient(135deg, #2563EB 0%, #38BDF8 100%)",
                  color: "#FFFFFF",
                  padding: "14px 20px",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
                }}
              >
                <Calendar size={16} />
                <span>Book a Strategy Call</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes equalizer {
          0%, 100% { height: 3px; }
          50% { height: 10px; }
        }
      `}</style>
    </>
  );
}
