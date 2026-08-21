import { useRef, useCallback } from "react";
import StatsCounter, { formatCompactNumber } from "./StatsCounter";
import { COLORS, FONTS } from "../../../utils/theme";

export default function ResultCard({ data, transformStyle, isActive, countTrigger, onClick }) {
  const tiltRef = useRef(null);
  const videoLayerRef = useRef(null);
  const glowRef = useRef(null);

  const { x, scale, opacity, blur, z, tier } = transformStyle;
  const tiltStrength = tier === "large" ? 10 : tier === "medium" ? 6 : 3;

  const handleMouseMove = useCallback(
    (e) => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(1000px) rotateX(${-py * tiltStrength}deg) rotateY(${px * tiltStrength}deg) translateZ(18px)`;
      if (videoLayerRef.current) videoLayerRef.current.style.transform = `translate(${-px * 10}px, ${-py * 10}px) scale(1.08)`;
      if (glowRef.current) {
        glowRef.current.style.opacity = 1;
        glowRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(56,189,248,0.25), transparent 60%)`;
      }
    },
    [tiltStrength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = tiltRef.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    if (videoLayerRef.current) videoLayerRef.current.style.transform = "translate(0,0) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = 0;
  }, []);

  const width = 230;
  const height = 380;

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width,
        height,
        marginLeft: -width / 2,
        marginTop: -height / 2,
        transform: `translateX(${x}px) scale(${scale})`,
        opacity,
        filter: `blur(${blur}px)`,
        zIndex: z,
        cursor: "pointer",
        transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease, filter 0.6s ease",
        willChange: "transform, opacity, filter",
      }}
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          background: COLORS.surface,
          border: isActive ? `1px solid ${COLORS.sky}` : `1px solid ${COLORS.borderSubtle}`,
          boxShadow: isActive ? "0 34px 80px rgba(37,99,235,0.4)" : "0 14px 34px rgba(0,0,0,0.5)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), border 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div ref={videoLayerRef} style={{ width: "110%", height: "110%", margin: "-5%", transition: "transform 0.35s ease-out" }}>
          <video
            src={data.video}
            poster={data.poster}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        <div ref={glowRef} style={{ position: "absolute", inset: 0, opacity: 0, transition: "opacity 0.3s ease", pointerEvents: "none" }} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,5,8,0.92) 0%, rgba(5,5,8,0.2) 50%, transparent 75%)",
          }}
        />

        <div style={{ position: "absolute", left: 18, right: 18, bottom: 16, fontFamily: FONTS.body }}>
          {isActive ? (
            <>
              <StatsCounter
                target={data.views}
                trigger={countTrigger}
                style={{ fontSize: 32, fontWeight: 700, display: "block", lineHeight: 1.1, color: COLORS.ice }}
              />
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5, letterSpacing: 0.3 }}>
                {data.client} · {data.platform}
              </div>
              {data.tag && (
                <div style={{ fontSize: 10, color: COLORS.sky, marginTop: 6, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>
                  {data.tag}
                </div>
              )}
            </>
          ) : (
            <span style={{ fontFamily: FONTS.sans, color: COLORS.text, fontSize: 20, fontWeight: 700 }}>
              {formatCompactNumber(data.views)}+
            </span>
          )}
        </div>
      </div>
    </div>
  );
}