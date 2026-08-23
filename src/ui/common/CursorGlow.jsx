import { useEffect, useRef, useCallback } from "react";

/**
 * CursorGlow — Solid Blue Comet Ribbon Trail
 * ─────────────────────────────────────────────
 * • Solid, vivid blue luminous comet tail
 * • 48 trail points — dual-pass render (outer glow + solid core)
 * • Wave frequency gives subtle organic fluid motion
 * • Comet head is a bright blue flare at cursor tip
 * • Fades out 1.5s after movement stops, smoothly draining trail
 * • 100% blue palette: #2563EB -> #38BDF8 -> #93C5FD
 */

const TRAIL_LEN = 48;
const IDLE_TIMEOUT = 1500;

export default function CursorGlow() {
  const canvasRef = useRef(null);
  const glowRef = useRef(null);
  const pointsRef = useRef([]);
  const visibleRef = useRef(false);
  const idleTimer = useRef(null);
  const rafRef = useRef(null);

  const show = useCallback(() => {
    if (!visibleRef.current) {
      visibleRef.current = true;
      if (glowRef.current) glowRef.current.style.opacity = "1";
    }
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      visibleRef.current = false;
      if (glowRef.current) glowRef.current.style.opacity = "0";
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY });
      if (pointsRef.current.length > TRAIL_LEN) pointsRef.current.shift();
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
      show();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = (ts) => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;
      if (pts.length < 3) return;

      // ── PASS 1: OUTER GLOW (Soft luminous aura) ──
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        const wave = Math.sin(i * 0.35 + ts * 0.003) * (1 - t) * 9;
        const ox = Math.cos(angle) * wave;
        const oy = Math.sin(angle) * wave;

        const prevWave = Math.sin((i - 1) * 0.35 + ts * 0.003) * (1 - (i - 1) / pts.length) * 9;
        const prevOx = Math.cos(angle) * prevWave;
        const prevOy = Math.sin(angle) * prevWave;

        const x1 = pts[i - 1].x + prevOx;
        const y1 = pts[i - 1].y + prevOy;
        const x2 = pts[i].x + ox;
        const y2 = pts[i].y + oy;

        // Outer glow stroke
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${t * 0.35})`;
        ctx.lineWidth = 4 + t * 10;
        ctx.stroke();
      }

      // ── PASS 2: SOLID CORE (Vivid electric blue ribbon) ──
      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;
        const dx = pts[i].x - pts[i - 1].x;
        const dy = pts[i].y - pts[i - 1].y;
        const angle = Math.atan2(dy, dx) + Math.PI / 2;
        const wave = Math.sin(i * 0.35 + ts * 0.003) * (1 - t) * 9;
        const ox = Math.cos(angle) * wave;
        const oy = Math.sin(angle) * wave;

        const prevWave = Math.sin((i - 1) * 0.35 + ts * 0.003) * (1 - (i - 1) / pts.length) * 9;
        const prevOx = Math.cos(angle) * prevWave;
        const prevOy = Math.sin(angle) * prevWave;

        const x1 = pts[i - 1].x + prevOx;
        const y1 = pts[i - 1].y + prevOy;
        const x2 = pts[i].x + ox;
        const y2 = pts[i].y + oy;

        // Solid blue transition: Cobalt (#2563EB) -> Sky (#38BDF8) -> Ice (#93C5FD)
        const r = Math.round(37 + t * (147 - 37));
        const g = Math.round(99 + t * (197 - 99));
        const b = Math.round(235 + t * (253 - 235));
        const alpha = 0.35 + t * 0.65; // Solid high opacity throughout

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = 1.8 + t * 4.5;
        ctx.stroke();
      }
      ctx.restore();

      // ── PASS 3: COMET HEAD FLARE ──
      const head = pts[pts.length - 1];
      if (head) {
        const headGlow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 20);
        headGlow.addColorStop(0.0, "rgba(224, 242, 254, 1.0)");
        headGlow.addColorStop(0.3, "rgba(56, 189, 248, 0.85)");
        headGlow.addColorStop(0.7, "rgba(37, 99, 235, 0.35)");
        headGlow.addColorStop(1.0, "rgba(37, 99, 235, 0)");

        ctx.beginPath();
        ctx.arc(head.x, head.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
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
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      />
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.16) 0%, rgba(37, 99, 235, 0.08) 35%, transparent 70%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 1.2s ease, transform 0.06s linear",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
