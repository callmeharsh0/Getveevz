import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Calendar } from "lucide-react";
import { COLORS, FONTS, MOTION_EASE } from "../../../utils/theme";
import PixelSnow from "../../common/PixelSnow.jsx";

const CYCLE_WORDS = ["Short-Form", "Viral", "Platform-Native", "Algorithmic"];

const TICKER = [
  "240M+ VIEWS", "38 CHANNELS", "96.8% RETENTION", "SHORTS · REELS · TIKTOK",
  "NO AD SPEND", "72-HR ONBOARDING", "1800+ CLIPS SYNDICATED", "ZERO CREATOR EFFORT",
];

// ── Aurora + Particles + Scan line — ReactBits Aurora inspired ──────
function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Aurora orbs — large drifting radial blobs ──────────────
    const ORBS = [
      { cx: 0.3,  cy: 0.35, r: 380, r2: 56,  g2: 189, b2: 248,  speed: 0.00022, phase: 0.0,  amp: 0.18 },
      { cx: 0.65, cy: 0.42, r: 300, r2: 37,  g2: 99,  b2: 235,  speed: 0.00018, phase: 1.1,  amp: 0.14 },
      { cx: 0.50, cy: 0.22, r: 260, r2: 147, g2: 197, b2: 253,  speed: 0.00030, phase: 2.4,  amp: 0.12 },
      { cx: 0.78, cy: 0.70, r: 200, r2: 29,  g2: 78,  b2: 216,  speed: 0.00014, phase: 3.8,  amp: 0.20 },
    ];

    // ── Micro-particles — tiny drifting dots ──────────────
    const PCOLS = [[56,189,248],[37,99,235],[147,197,253]];
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.3 + 0.3,
      a: Math.random() * 0.5 + 0.07,
      dx: (Math.random() - 0.5) * 0.00025,
      dy: (Math.random() - 0.5) * 0.00025,
      col: PCOLS[Math.floor(Math.random() * PCOLS.length)],
    }));

    // ── Scan line ──────────────
    let scanY = -80, scanActive = false, scanTick = 0;

    const draw = (ts) => {
      raf = requestAnimationFrame(draw);
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // ── 1. Aurora orbs ──
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ORBS.forEach((o) => {
        const px = (o.cx + Math.cos(ts * o.speed + o.phase) * o.amp) * W;
        const py = (o.cy + Math.sin(ts * o.speed * 1.3 + o.phase + 1) * o.amp * 0.7) * H;
        const alpha = 0.08 + Math.sin(ts * o.speed * 0.7 + o.phase) * 0.04;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, o.r);
        grad.addColorStop(0.0, `rgba(${o.r2},${o.g2},${o.b2},${alpha})`);
        grad.addColorStop(0.4, `rgba(${o.r2},${o.g2},${o.b2},${alpha * 0.5})`);
        grad.addColorStop(1.0, `rgba(${o.r2},${o.g2},${o.b2},0)`);

        ctx.beginPath();
        ctx.arc(px, py, o.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      ctx.restore();

      // ── 2. Micro-particles ──
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col[0]},${p.col[1]},${p.col[2]},${p.a})`;
        ctx.fill();
        p.x = (p.x + p.dx * W + 1) % 1;
        p.y = (p.y + p.dy * H + 1) % 1;
      });

      // ── 3. Horizontal scan sweep ──
      scanTick++;
      if (!scanActive && scanTick > 280) { scanActive = true; scanY = -80; }
      if (scanActive) {
        scanY += 3.2;
        const sg = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50);
        sg.addColorStop(0,   "rgba(56,189,248,0)");
        sg.addColorStop(0.5, "rgba(56,189,248,0.09)");
        sg.addColorStop(1,   "rgba(56,189,248,0)");
        ctx.fillStyle = sg;
        ctx.fillRect(0, scanY - 50, W, 100);
        if (scanY > H + 80) { scanActive = false; scanTick = 0; }
      }
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Hero() {
  const ref = useRef(null);
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Cycle words
  useEffect(() => {
    const iv = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWordIdx((i) => (i + 1) % CYCLE_WORDS.length); setVisible(true); }, 340);
    }, 2400);
    return () => clearInterval(iv);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100dvh",
        background: "#050508",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Pixel Snow Background (ReactBits) ── */}
      <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, opacity: 0.85 }}>
        <PixelSnow
          color="#5b81e9"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
        />
      </div>

      {/* ── Aurora + Particle field + Scan line ── */}
      <HeroCanvas />

      {/* ── Deep cobalt radial glow ── */}
      <div aria-hidden style={{
        position: "absolute",
        top: "42%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1100, height: 700,
        background: "radial-gradient(ellipse, rgba(37,99,235,0.28) 0%, rgba(56,189,248,0.07) 40%, transparent 70%)",
        filter: "blur(100px)",
        pointerEvents: "none",
      }} />

      {/* ── Blueprint grid ── */}
      <div aria-hidden className="blueprint-grid" style={{
        position: "absolute", inset: 0,
        maskImage: "radial-gradient(ellipse 65% 55% at 50% 42%, black 15%, transparent 78%)",
        opacity: 0.5,
        pointerEvents: "none",
      }} />

      {/* ── Orbital ring decorations ── */}
      <div aria-hidden className="spin-slow" style={{
        position: "absolute", top: "50%", left: "50%",
        marginTop: -380, marginLeft: -380,
        width: 760, height: 760,
        borderRadius: "50%",
        border: "1px dashed rgba(56,189,248,0.1)",
        pointerEvents: "none",
      }}>
        <div style={{ position: "absolute", top: "18%", right: -4, width: 8, height: 8, borderRadius: "50%", background: "#38BDF8", boxShadow: "0 0 12px #38BDF8" }} />
      </div>
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        marginTop: -500, marginLeft: -500,
        width: 1000, height: 1000,
        borderRadius: "50%",
        border: "1px solid rgba(37,99,235,0.06)",
        pointerEvents: "none",
      }} />

      {/* ══ MAIN CENTERED CONTENT ══ */}
      <motion.div
        style={{ y, opacity: opacityOut, flex: 1 }}
        className="noise-overlay"
      >
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "190px 48px 110px",
          position: "relative",
          zIndex: 2,
          maxWidth: 1100,
          margin: "0 auto",
        }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: MOTION_EASE }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              marginBottom: 44,
              fontFamily: FONTS.mono, fontSize: "0.65rem",
              letterSpacing: "0.32em", color: "#38BDF8", textTransform: "uppercase",
            }}
          >
            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg, transparent, #38BDF8)", display: "inline-block" }} />
            Content Distribution Agency · Est. 2024
            <span style={{ width: 28, height: 1, background: "linear-gradient(90deg, #38BDF8, transparent)", display: "inline-block" }} />
          </motion.div>

          {/* ── GIANT HEADLINE ── */}
          <h1 style={{
            fontFamily: FONTS.display,
            fontWeight: 600,
            lineHeight: 0.97,
            letterSpacing: "-0.045em",
            margin: "0 0 36px",
            fontSize: "clamp(3.6rem, 9vw, 9.5rem)",
            color: COLORS.ice,
          }}>
            {["Turn Long-Form", null, "Distribution"].map((line, li) => (
              <span key={li} style={{ display: "block", overflow: "hidden" }}>
                <motion.span
                  style={{ display: "block" }}
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.1 + li * 0.1, duration: 1.2, ease: MOTION_EASE }}
                >
                  {li === 1 ? (
                    <>
                      Into{" "}
                      {/* Animated cycling word with underline */}
                      <span style={{ position: "relative", display: "inline-block" }}>
                        <span style={{
                          background: "linear-gradient(120deg, #93C5FD 0%, #38BDF8 50%, #2563EB 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          transition: "opacity 0.3s ease, transform 0.35s ease",
                          opacity: visible ? 1 : 0,
                          display: "inline-block",
                          transform: visible ? "translateY(0)" : "translateY(10px)",
                        }}>
                          {CYCLE_WORDS[wordIdx]}
                        </span>
                        {/* Underline accent */}
                        <motion.span
                          layoutId="word-underline"
                          style={{
                            position: "absolute", bottom: 6, left: 0, right: 0,
                            height: 3, borderRadius: 2,
                            background: "linear-gradient(90deg, #38BDF8, #2563EB)",
                            boxShadow: "0 0 16px rgba(56,189,248,0.7)",
                          }}
                        />
                      </span>
                    </>
                  ) : line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.72, duration: 1 }}
            style={{
              fontFamily: FONTS.body, fontSize: "clamp(0.92rem, 1.15vw, 1.02rem)",
              color: "rgba(241,245,249,0.45)", lineHeight: 1.75,
              maxWidth: 460, margin: "0 0 52px",
            }}
          >
            We clip, package and syndicate your existing content across Shorts, Reels and TikTok — across 30–120 satellite channels, on autopilot.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.88, duration: 0.9, ease: MOTION_EASE }}
            style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}
          >
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontFamily: FONTS.mono, fontSize: "0.7rem", fontWeight: 700,
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#050508", background: "#38BDF8",
                padding: "20px 36px", borderRadius: 999, textDecoration: "none",
                boxShadow: "0 0 40px rgba(56,189,248,0.35)",
                transition: "background 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 0 60px rgba(56,189,248,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#38BDF8";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(56,189,248,0.35)";
              }}
            >
              <Calendar size={14} />
              Book a Strategy Call
              <ArrowUpRight size={14} />
            </a>

            <span style={{
              fontFamily: FONTS.mono, fontSize: "0.58rem",
              color: "rgba(241,245,249,0.25)", letterSpacing: "0.22em",
            }}>
              240M+ VIEWS · 38 CHANNELS · NO AD SPEND
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* ══ BOTTOM MARQUEE ══ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          position: "relative", zIndex: 2,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "16px 0",
        }}
      >
        <div className="marquee-track" style={{ gap: 0 }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{
                fontFamily: FONTS.mono, fontSize: "0.62rem", letterSpacing: "0.28em",
                color: "rgba(241,245,249,0.22)", whiteSpace: "nowrap", padding: "0 36px",
              }}>
                {t}
              </span>
              <span style={{ color: "rgba(56,189,248,0.3)", fontSize: "0.45rem" }}>◆</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
