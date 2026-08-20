import { useState, useEffect, useRef } from "react";

/**
 * Chrome Component
 * ----------------
 * - SOUND button top-left with Web Audio Synthwave Music Engine & Equalizer Visualizer
 * - Interactive hover & click SFX
 * - Centered NEXUSMEDIA wordmark (click to scroll to top)
 * - 3-Line MENU button opening full navigation drawer with dedicated buttons for every scroll section
 * - "scroll to enter" indicator bottom-center (intro only).
 */
export default function Chrome({ progress }) {
  const [soundOn, setSoundOn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);

  // Track real page scroll so the persistent header can react without a
  // 3D scroll-progress prop.
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade the scroll-to-enter hint out as soon as the user starts scrolling
  const introHintOpacity = Math.max(1 - (progress ?? 0) / 0.08 - scrollY / 600, 0);

  // Play subtle hover UI blip
  const playHoverFx = () => {
    if (!soundOn || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) { }
  };

  // Play satisfying sub-bass click
  const playClickFx = () => {
    if (!soundOn || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) { }
  };

  // The Weeknd-style Synthwave Song Sequencer
  useEffect(() => {
    if (soundOn) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioCtx();
        audioCtxRef.current = ctx;

        let step = 0;
        const bpm = 124;
        const stepTime = 60 / bpm / 4; // 16th notes

        // Synth notes (Bass: A1, F1, G1, E1 | Lead: E4, G4, A4, C5, D5, E5)
        const bassNotes = [55, 55, 55, 55, 43.65, 43.65, 43.65, 43.65, 49, 49, 49, 49, 41.2, 41.2, 41.2, 41.2];
        const leadNotes = [329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 523.25, 440.00];

        const playSynthStep = () => {
          if (!audioCtxRef.current) return;
          const now = ctx.currentTime;

          // 1. Synthwave Pumping Bassline (16th notes)
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

          // 2. Catchy Retro Lead Arpeggio (every 2nd step)
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

          // 3. Sub Kick Drum Pulse (beats 1, 5, 9, 13)
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

  const labelStyle = {
    fontFamily: "'Inter', system-ui, sans-serif",
    fontSize: "0.7rem",
    fontWeight: 400,
    letterSpacing: "0.18em",
    color: "#f2ece1",
    textTransform: "uppercase",
  };

  // Smooth scroll handler for all sections
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

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Section List for Menu Buttons
  const SECTIONS = [
    { num: "01", name: "Introduction", desc: "Brand Intro & Overview", id: "top" },
    { num: "02", name: "Our Results (Deep Dive)", desc: "22M+ Reach Proof & Carousel Breakdown", id: "results-section", highlight: true },
    { num: "03", name: "The Hook & System", desc: "One piece of content turned into a distribution engine", id: "hook-section" },
    { num: "04", name: "Problem & Solution", desc: "Why content alone isn't enough & how distribution wins", id: "problem-solution-section" },
    { num: "05", name: "Pricing & Packages", desc: "Spark, Momentum & Dominate tiers", id: "pricing-section" },
    { num: "06", name: "Book a Strategy Call", desc: "Schedule a 1-on-1 strategy call with our team", id: "book-a-call-section" },
  ];

  return (
    <>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10 }}>
        {/* ── TOP BAR ───────────────────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "1.8rem",
            left: "2.2rem",
            right: "2.2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* SOUND button — top-left with equalizer */}
          <button
            onClick={() => {
              playClickFx();
              setSoundOn((s) => !s);
            }}
            onMouseEnter={playHoverFx}
            style={{
              ...labelStyle,
              background: "none",
              border: "none",
              borderBottom: soundOn ? "1px solid #d4924a" : "1px solid rgba(242,236,225,0.4)",
              paddingBottom: "3px",
              cursor: "pointer",
              pointerEvents: "auto",
              transition: "all 0.3s ease",
              color: soundOn ? "#d4924a" : "#f2ece1",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>Sound</span>
            {soundOn ? (
              <span style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "10px" }}>
                <span style={{ width: 2, height: "10px", background: "#d4924a", animation: "equalizer 0.8s ease-in-out infinite" }} />
                <span style={{ width: 2, height: "6px", background: "#d4924a", animation: "equalizer 0.6s ease-in-out infinite 0.2s" }} />
                <span style={{ width: 2, height: "8px", background: "#d4924a", animation: "equalizer 0.9s ease-in-out infinite 0.4s" }} />
              </span>
            ) : (
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "rgba(242,236,225,0.4)",
                  display: "inline-block",
                }}
              />
            )}
          </button>

          {/* NEXUSMEDIA centered wordmark */}
          <span
            onClick={() => scrollToSection("top")}
            onMouseEnter={playHoverFx}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 300,
              letterSpacing: "0.35em",
              color: "#f2ece1",
              textTransform: "uppercase",
              opacity: 0.9,
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            nexusmedia
          </span>

          {/* RIGHT: 3-LINE MENU BUTTON */}
          <div style={{ display: "flex", alignItems: "center", pointerEvents: "auto" }}>
            <button
              onClick={() => {
                playClickFx();
                setMenuOpen((o) => !o);
              }}
              onMouseEnter={playHoverFx}
              style={{
                ...labelStyle,
                background: "none",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                cursor: "pointer",
                transition: "opacity 0.3s ease",
                padding: "4px 6px",
              }}
            >
              Menu
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span style={{ width: 19, height: 1.5, background: "#f2ece1", display: "block" }} />
                <span style={{ width: 19, height: 1.5, background: "#f2ece1", display: "block" }} />
                <span style={{ width: 19, height: 1.5, background: "#f2ece1", display: "block" }} />
              </span>
            </button>
          </div>
        </div>

        {/* ── SCROLL-TO-ENTER INDICATOR ─────────────────────────── */}
        <div
          style={{
            position: "absolute",
            bottom: "2.5rem",
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.7rem",
            opacity: introHintOpacity,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Animated circle with arrow */}
          <div
            onClick={() => scrollToSection("results-section")}
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: "1px solid rgba(242,236,225,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f2ece1",
              fontSize: "0.9rem",
              animation: "bounceDown 2s ease-in-out infinite",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            ↓
          </div>
          <span
            style={{
              ...labelStyle,
              fontSize: "0.6rem",
              opacity: 0.65,
              letterSpacing: "0.25em",
            }}
          >
            Scroll to enter
          </span>
        </div>
      </div>

      {/* ── FULL SCREEN NAVIGATION DRAWER WITH BUTTONS FOR EVERY SCROLL ── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10, 8, 7, 0.8)",
            backdropFilter: "blur(24px)",
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
              background: "linear-gradient(165deg, #14110e 0%, #0a0807 100%)",
              borderLeft: "1px solid rgba(212,146,74,0.3)",
              padding: "2.5rem 2.2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "-24px 0 70px rgba(0,0,0,0.85)",
              overflowY: "auto",
              animation: "slideInRight 0.35s cubic-bezier(0.22,1,0.36,1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <span
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "#d4924a",
                    fontWeight: 600,
                  }}
                >
                  Explore Sections
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "#f2ece1",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,146,74,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
                >
                  ✕
                </button>
              </div>

              {/* ⚡ SECTION BUTTONS (ONE FOR EVERY SCROLL) */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    style={{
                      background: sec.highlight
                        ? "linear-gradient(135deg, rgba(212,146,74,0.22) 0%, rgba(212,146,74,0.08) 100%)"
                        : "rgba(255,255,255,0.03)",
                      border: sec.highlight
                        ? "1px solid rgba(212,146,74,0.55)"
                        : "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "12px",
                      padding: "14px 18px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                      boxShadow: sec.highlight ? "0 4px 20px rgba(212,146,74,0.15)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = sec.highlight
                        ? "linear-gradient(135deg, rgba(212,146,74,0.35) 0%, rgba(212,146,74,0.18) 100%)"
                        : "rgba(212,146,74,0.14)";
                      e.currentTarget.style.borderColor = "#e8c77a";
                      e.currentTarget.style.transform = "translateX(6px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = sec.highlight
                        ? "linear-gradient(135deg, rgba(212,146,74,0.22) 0%, rgba(212,146,74,0.08) 100%)"
                        : "rgba(255,255,255,0.03)";
                      e.currentTarget.style.borderColor = sec.highlight
                        ? "1px solid rgba(212,146,74,0.55)"
                        : "rgba(255,255,255,0.08)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <span
                          style={{
                            fontFamily: "'Inter', system-ui, sans-serif",
                            fontSize: "0.65rem",
                            color: "#d4924a",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                          }}
                        >
                          {sec.num}
                        </span>
                        <span
                          style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: "1.25rem",
                            color: "#f2ece1",
                            fontWeight: 500,
                          }}
                        >
                          {sec.name}
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: "0.72rem",
                          color: "rgba(242,236,225,0.55)",
                          lineHeight: 1.35,
                        }}
                      >
                        {sec.desc}
                      </div>
                    </div>
                    <span style={{ color: "#e8c77a", fontSize: "1.1rem", opacity: 0.8, marginLeft: "12px" }}>→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.2rem", marginTop: "1.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(242,236,225,0.35)" }}>
                NexusMedia
              </span>
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
