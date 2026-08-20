import { useRef, useCallback } from "react";
import { COLORS } from "../../utils/theme";

export default function NavArrow({ direction, onClick, side }) {
  const btnRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `translateY(-50%) translate(${px * 8}px, ${py * 8}px) scale(1.08)`;
    el.style.background = "rgba(212,146,74,0.12)";
    el.style.borderColor = COLORS.borderAccent;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    el.style.transform = "translateY(-50%) translate(0,0) scale(1)";
    el.style.background = "rgba(242,236,225,0.06)";
    el.style.borderColor = "rgba(242,236,225,0.15)";
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={direction === "next" ? "Next result" : "Previous result"}
      style={{
        position: "absolute",
        top: "50%",
        [side]: 8,
        transform: "translateY(-50%)",
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(242,236,225,0.06)",
        border: "1px solid rgba(242,236,225,0.15)",
        color: "#f2ece1",
        fontSize: 18,
        cursor: "pointer",
        zIndex: 10,
        backdropFilter: "blur(4px)",
        transition: "transform 0.25s ease, background 0.25s ease, border-color 0.25s ease",
      }}
    >
      {direction === "next" ? "→" : "←"}
    </button>
  );
}