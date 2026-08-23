import { useEffect, useRef, useCallback } from "react";

/**
 * CursorGlow — Comet trail cursor effect
 * ─────────────────────────────────────────────
 * • A wavy, tapered comet tail follows the cursor
 * • 55 trail points — drawn as a smooth bezier path
 * • Perpendicular sine oscillation = wavy motion
 * • Comet "head" is a bright blue glow at cursor tip
 * • Fades out 1.4s after movement stops
 * • All blue: ice (#93C5FD) → sky (#38BDF8) → cobalt (#2563EB)
 */

const TRAIL_LEN   = 55;    // longer trail = more comet-like
const IDLE_TIMEOUT = 1500; // ms before fade-out

export default function CursorGlow() {
  const canvasRef  = useRef(null);
  const glowRef    = useRef(null);
  const pointsRef  = useRef([]);            // { x, y }
  const visibleRef = useRef(false);
  const idleTimer  = useRef(null);
  const rafRef     = useRef(null);
  const timeRef    = useRef(0);

  const show = useCallback(() => {
    if (!visibleRef.current) {
      visibleRef.current = true;
      if (glowRef.current) glowRef.current.style.opacity = "1";
    }
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      visibleRef.current = false;
      if (glowRef.current) glowRef.current.style.opacity = "0";
      // Drain the points so trail vanishes
      const drain = () => {
        if (pointsRef.current.length > 0) {
          pointsRef.current.shift();
          requestAnimationFrame(drain);
        }
      };
      drain();
    }, IDLE_TIMEOUT);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY });
      if (pointsRef.current.length > TRAIL_LEN) pointsRef.current.shift();
      // Move the big soft glow div
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${e.clientX - 220}px, ${e.clientY - 220}px)`;
      }
      show();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // ── Animation loop ──────────────────────────────────────────
    const loop = (ts) => {
      rafRef.current = requestAnimationFrame(loop);
      timeRef.current = ts;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;
      if (pts.length < 3) return;

      // ── 1. DRAW COMET TAIL as tapered wavy path ──
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;          // 0 = oldest tail, 1 = head
        const tSq = t * t;                 // quadratic — sharper falloff at tail

        // Perpendicular sine wave offset (wavy)
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        const wave = Math.sin(i * 0.38 + ts * 0.0028) * (1 - t) * 14;
        const ox = Math.cos(angle) * wave;
        const oy = Math.sin(angle) * wave;

        const x1 = pts[i - 1].x + Math.cos(angle) * Math.sin((i - 1) * 0.38 + ts * 0.0028) * (1 - (i - 1) / pts.length) * 14;
        const y1 = pts[i - 1].y + Math.sin(angle) * Math.sin((i - 1) * 0.38 + ts * 0.0028) * (1 - (i - 1) / pts.length) * 14;
        const x2 = pts[i].x + ox;
        const y2 = pts[i].y + oy;

        // Color: cobalt(tail) → sky → ice(head)  — all BLUE, no red/orange
        // #2563EB = (37,99,235)   #38BDF8 = (56,189,248)   #93C5FD = (147,197,253)
        const r = Math.round(37  + t * (147 - 37));    // 37 → 147
        const g = Math.round(99  + t * (197 - 99));    // 99 → 197
        const b = Math.round(235 + t * (253 - 235));   // 235 → 253
        const alpha = tSq * 0.85;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = t * 5;             // 0 at tail, 5px at head
        ctx.stroke();
      }
      ctx.restore();

      // ── 2. COMET HEAD — bright core glow ──
      const head = pts[pts.length - 1];
      if (head) {
        // Inner bright point
        const headGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22);
        headGrad.addColorStop(0.0, "rgba(200,235,255, 0.95)");
        headGrad.addColorStop(0.25, "rgba(147,197,253, 0.7)");
        headGrad.addColorStop(0.6, "rgba(56,189,248, 0.25)");
        headGrad.addColorStop(1.0, "rgba(56,189,248, 0)");
        ctx.beginPath();
        ctx.arc(head.x, head.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = headGrad;
        ctx.fill();

        // Tiny bright core
        ctx.beginPath();
        ctx.arc(head.x, head.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220,240,255,0.95)";
        ctx.fill();
      }
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimer.current);
    };
  }, [show]);

  return (
    <>
      {/* Canvas — comet trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />

      {/* Large soft glow div — follows cursor with slight lag */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 440, height: 440,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.13) 0%, rgba(37,99,235,0.08) 40%, rgba(29,78,216,0.03) 65%, transparent 80%)",
          filter: "blur(32px)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 1.2s ease, transform 0.08s linear",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
