import { useRef, useEffect, useCallback } from "react";
import { COLORS, FONTS } from "../../utils/theme";

export default function HookText({ text, style = {} }) {
  const containerRef = useRef(null);
  const charRefs = useRef([]);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const chars = text.split("");

  const updateHighlights = useCallback(() => {
    const { x, y } = mouseRef.current;
    charRefs.current.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(cx - x, cy - y);
      const radius = 70;
      const intensity = Math.max(0, 1 - dist / radius);
      el.style.opacity = 0.45 + intensity * 0.55;
      el.style.color = intensity > 0.15 ? COLORS.accent : COLORS.text;
      el.style.transform = `translateY(${-intensity * 4}px)`;
    });
    rafRef.current = null;
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) rafRef.current = requestAnimationFrame(updateHighlights);
    },
    [updateHighlights]
  );

  const handleMouseLeave = useCallback(() => {
    charRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = 1;
      el.style.color = COLORS.text;
      el.style.transform = "translateY(0)";
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  charRefs.current = [];

  return (
    <h2
      ref={containerRef}
      style={{
        fontFamily: FONTS.display,
        color: COLORS.text,
        fontWeight: 500,
        letterSpacing: -1,
        margin: 0,
        cursor: "default",
        ...style,
      }}
    >
      {chars.map((ch, i) => (
        <span
          key={i}
          ref={(el) => (charRefs.current[i] = el)}
          style={{
            display: "inline-block",
            transition: "color 0.2s ease, opacity 0.2s ease, transform 0.2s ease",
            whiteSpace: ch === " " ? "pre" : "normal",
          }}
        >
          {ch}
        </span>
      ))}
    </h2>
  );
}