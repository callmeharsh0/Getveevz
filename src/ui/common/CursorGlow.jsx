import { useEffect, useRef, useCallback } from "react";

/**
 * CursorGlow — Ethereal Solar Ray & Gaseous Light Trail
 * ────────────────────────────────────────────────────
 * • Transparent gaseous light rays / solar plasma wisps
 * • Uses 'screen' / 'lighter' additive blending for genuine optical lighting
 * • 5 layered harmonic ray filaments that fan out and billow like solar flares
 * • Expanding soft translucent gas puffs (nebula mist) that dissipate gently
 * • Solar ray sunburst corona at the cursor tip
 * • Fades out softly on idle
 */

const TRAIL_LEN = 38;
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
        glowRef.current.style.transform = `translate(${e.clientX - 220}px, ${e.clientY - 220}px)`;
      }
      show();
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const loop = (ts) => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = pointsRef.current;
      if (pts.length < 3) return;

      ctx.save();
      // Additive screen blending for pure transparent luminous light & gas
      ctx.globalCompositeOperation = "screen";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const len = pts.length;

      // ── 1. VOLUMETRIC GASEOUS PUFFS (Nebula mist along the trail) ──
      for (let i = 2; i < len; i += 2) {
        const t = i / len;
        const p = pts[i];
        const prev = pts[i - 1];

        const dx = p.x - prev.x;
        const dy = p.y - prev.y;
        const speed = Math.min(Math.hypot(dx, dy), 40);

        // Gas puff expands as it ages (lower t = older = wider & softer)
        const radius = (1 - t) * (18 + speed * 0.6) + t * 8;
        const alpha = t * 0.16;

        const puff = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        puff.addColorStop(0.0, `rgba(147, 197, 253, ${alpha * 0.85})`);
        puff.addColorStop(0.4, `rgba(56, 189, 248, ${alpha * 0.5})`);
        puff.addColorStop(0.8, `rgba(37, 99, 235, ${alpha * 0.2})`);
        puff.addColorStop(1.0, `rgba(37, 99, 235, 0.0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = puff;
        ctx.fill();
      }

      // ── 2. ETHEREAL SOLAR RAY FILAMENTS (Fanning wavy light streams) ──
      // We render 5 distinct transparent light rays with harmonic wave dispersion
      const FILAMENTS = [
        { freq: 0.32, amp: 14, speed: 0.0032, width: 6, alpha: 0.28, r: 56, g: 189, b: 248 },
        { freq: 0.45, amp: -11, speed: 0.0028, width: 8, alpha: 0.22, r: 96, g: 165, b: 250 },
        { freq: 0.24, amp: 18, speed: 0.0040, width: 12, alpha: 0.16, r: 37, g: 99, b: 235 },
        { freq: 0.58, amp: -16, speed: 0.0035, width: 4, alpha: 0.35, r: 147, g: 197, b: 253 },
        { freq: 0.18, amp: 8, speed: 0.0022, width: 16, alpha: 0.12, r: 29, g: 78, b: 216 },
      ];

      FILAMENTS.forEach((f) => {
        for (let i = 1; i < len; i++) {
          const t = i / len;
          const p1 = pts[i - 1];
          const p2 = pts[i];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const angle = Math.atan2(dy, dx) + Math.PI / 2;

          const wave1 = Math.sin((i - 1) * f.freq + ts * f.speed) * (1 - (i - 1) / len) * f.amp;
          const wave2 = Math.sin(i * f.freq + ts * f.speed) * (1 - t) * f.amp;

          const x1 = p1.x + Math.cos(angle) * wave1;
          const y1 = p1.y + Math.sin(angle) * wave1;
          const x2 = p2.x + Math.cos(angle) * wave2;
          const y2 = p2.y + Math.sin(angle) * wave2;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${f.r}, ${f.g}, ${f.b}, ${t * f.alpha})`;
          ctx.lineWidth = f.width * t;
          ctx.stroke();
        }
      });

      // ── 3. SOLAR RAY SUNBURST CORONA (Cursor Head) ──
      const head = pts[len - 1];
      if (head) {
        // Soft fanning solar rays around cursor
        const numRays = 8;
        const rayLen = 26;
        for (let r = 0; r < numRays; r++) {
          const rayAngle = (r / numRays) * Math.PI * 2 + ts * 0.0015;
          const rayX = head.x + Math.cos(rayAngle) * rayLen;
          const rayY = head.y + Math.sin(rayAngle) * rayLen;

          const rayGrad = ctx.createLinearGradient(head.x, head.y, rayX, rayY);
          rayGrad.addColorStop(0.0, "rgba(224, 242, 254, 0.45)");
          rayGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.2)");
          rayGrad.addColorStop(1.0, "rgba(37, 99, 235, 0.0)");

          ctx.beginPath();
          ctx.moveTo(head.x, head.y);
          ctx.lineTo(rayX, rayY);
          ctx.strokeStyle = rayGrad;
          ctx.lineWidth = 3;
          ctx.stroke();
        }

        // Soft gaseous solar center
        const sunGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 28);
        sunGrad.addColorStop(0.0, "rgba(255, 255, 255, 0.7)");
        sunGrad.addColorStop(0.2, "rgba(147, 197, 253, 0.45)");
        sunGrad.addColorStop(0.6, "rgba(56, 189, 248, 0.15)");
        sunGrad.addColorStop(1.0, "rgba(37, 99, 235, 0.0)");

        ctx.beginPath();
        ctx.arc(head.x, head.y, 28, 0, Math.PI * 2);
        ctx.fillStyle = sunGrad;
        ctx.fill();

        // Soft core point
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
      }

      ctx.restore();
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
          width: 440,
          height: 440,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(37, 99, 235, 0.05) 40%, transparent 70%)",
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
