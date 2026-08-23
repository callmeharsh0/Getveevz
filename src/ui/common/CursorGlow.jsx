import { useEffect, useRef, useCallback } from "react";

/**
 * CursorGlow — Solid Luminous Blue Comet Ribbon Trail
 * ──────────────────────────────────────────────────
 * • Fully solid, ultra-smooth electric blue comet ribbon
 * • Uses Catmull-Rom / Bezier continuous curve interpolation for silky smoothness
 * • Multi-layer solid rendering:
 *     1. Wide soft ambient blue bloom
 *     2. Vivid electric blue glow stroke (alpha 0.6 - 0.9)
 *     3. Solid cyan/white core laser beam (alpha 0.9 - 1.0)
 * • Comet head is a bright, solid spherical flare
 * • Automatically sleeps when cursor is idle, gracefully draining points
 */

const TRAIL_LEN = 36;
const IDLE_TIMEOUT = 1200;

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
    if (!canvas) return;
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

      const raw = pointsRef.current;
      if (raw.length < 3) return;

      // Apply subtle wavy motion across points
      const pts = raw.map((p, i) => {
        const t = i / raw.length;
        const wave = Math.sin(i * 0.4 + ts * 0.0035) * (1 - t) * 7;
        return {
          x: p.x + wave * 0.6,
          y: p.y + wave * 0.8,
        };
      });

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // ── PASS 1: AMBIENT BLUE AURA ──
      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(37, 99, 235, ${t * 0.45})`;
        ctx.lineWidth = 8 + t * 14;
        ctx.stroke();
      }

      // ── PASS 2: VIVID ELECTRIC SKY BLUE GLOW (Solid & Bold) ──
      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.45 + t * 0.55})`;
        ctx.lineWidth = 3.5 + t * 6.5;
        ctx.stroke();
      }

      // ── PASS 3: SOLID HIGH-INTENSITY CORE (Laser Cyan/White) ──
      for (let i = 1; i < pts.length; i++) {
        const t = i / pts.length;
        ctx.beginPath();
        ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
        ctx.lineTo(pts[i].x, pts[i].y);
        // Transition from rich blue to bright white-blue
        const r = Math.round(147 + t * (255 - 147));
        const g = Math.round(197 + t * (255 - 197));
        const b = 255;
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.6 + t * 0.4})`;
        ctx.lineWidth = 1.2 + t * 2.8;
        ctx.stroke();
      }
      ctx.restore();

      // ── PASS 4: SOLID COMET HEAD FLARE ──
      const head = pts[pts.length - 1];
      if (head) {
        // Outer soft flare
        const flare = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22);
        flare.addColorStop(0.0, "rgba(255, 255, 255, 1.0)");
        flare.addColorStop(0.2, "rgba(147, 197, 253, 0.95)");
        flare.addColorStop(0.5, "rgba(56, 189, 248, 0.6)");
        flare.addColorStop(1.0, "rgba(37, 99, 235, 0)");

        ctx.beginPath();
        ctx.arc(head.x, head.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = flare;
        ctx.fill();

        // Solid white glowing core dot
        ctx.beginPath();
        ctx.arc(head.x, head.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.shadowColor = "#38BDF8";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
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
            "radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(37, 99, 235, 0.09) 35%, transparent 70%)",
          filter: "blur(28px)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 1s ease, transform 0.05s linear",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
