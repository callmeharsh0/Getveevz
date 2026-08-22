import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import StatsCounter, { formatCompactNumber } from "./StatsCounter";
import { COLORS, FONTS } from "../../../utils/theme";
import { Clock, TrendingUp, Globe, Video, Smartphone, Music, TrendingUp as TrendingIcon } from "lucide-react";

export default function ResultCard({ data, transformStyle, isActive, countTrigger, onClick, isPlaying, viewMode }) {
  const tiltRef = useRef(null);
  const videoLayerRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const { x, scale, opacity, blur, z, tier } = transformStyle;
  const tiltStrength = tier === "large" ? 12 : tier === "medium" ? 8 : 4;

  const handleMouseMove = useCallback(
    (e) => {
      const el = tiltRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(1000px) rotateX(${-py * tiltStrength}deg) rotateY(${px * tiltStrength}deg) translateZ(20px)`;
      if (videoLayerRef.current) videoLayerRef.current.style.transform = `translate(${-px * 12}px, ${-py * 12}px) scale(1.1)`;
      if (glowRef.current) {
        glowRef.current.style.opacity = 1;
        glowRef.current.style.background = `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(56,189,248,0.3), transparent 60%)`;
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

  const width = 250;
  const height = 400;

  // Platform-specific icons and colors
  const platformConfig = {
    Reels: { icon: Video, color: "#EF4444", bg: "rgba(239, 68, 68, 0.15)" },
    Shorts: { icon: Smartphone, color: "#FF6E00", bg: "rgba(255, 110, 0, 0.15)" },
    TikTok: { icon: Music, color: COLORS.sky, bg: "rgba(56, 189, 248, 0.15)" },
  };

  const platform = platformConfig[data.platform] || platformConfig.Reels;

  return (
    <motion.div
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
      animate={{
        x: x,
        scale: scale,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        z: z,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
    >
      <motion.div
              ref={tiltRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setIsHovered(true)}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20,
          overflow: "hidden",
          position: "relative",
          background: COLORS.surface,
          border: isActive ? `1px solid ${COLORS.sky}` : `1px solid ${COLORS.borderSubtle}`,
          boxShadow: isActive
            ? "0 34px 80px rgba(37,99,235,0.4)"
            : isHovered
            ? "0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(37,99,235,0.2)"
            : "0 14px 34px rgba(0,0,0,0.5)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1), border 0.4s ease, box-shadow 0.4s ease",
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          boxShadow: isActive
            ? "0 40px 90px rgba(37,99,235,0.5)"
            : "0 30px 70px rgba(0,0,0,0.7), 0 0 40px rgba(37,99,235,0.3)",
          borderColor: COLORS.sky,
        }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          ref={videoLayerRef}
          style={{ width: "110%", height: "110%", margin: "-5%", transition: "transform 0.35s ease-out" }}
        >
          <video
            src={data.video}
            poster={data.poster}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </motion.div>

        <motion.div
          ref={glowRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.3) 50%, transparent 75%)",
          }}
        />

        {/* Platform badge at top */}
        <motion.div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            background: platform.bg,
            border: `1px solid ${platform.color}40`,
            borderRadius: 8,
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <platform.icon size={12} color={platform.color} />
          <span
            style={{
              fontFamily: FONTS.sans,
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: platform.color,
            }}
          >
            {data.platform}
          </span>
        </motion.div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 15px #10B981",
              zIndex: 2,
            }}
            animate={{ scale: [1, 1.3, 1], boxShadow: ["0 0 15px #10B981", "0 0 25px #10B981", "0 0 15px #10B981"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Bottom Content */}
        <motion.div
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 20,
            fontFamily: FONTS.body,
            zIndex: 2,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {isActive ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatsCounter
                target={data.views}
                trigger={countTrigger}
                style={{ fontSize: 36, fontWeight: 800, display: "block", lineHeight: 1.1, color: COLORS.ice }}
              />
              <motion.div
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  marginTop: 8,
                  letterSpacing: 0.3,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span>{data.client}</span>
                <span style={{ color: "rgba(241,245,249,0.3)" }}>·</span>
                <span>{data.platform}</span>
              </motion.div>
              {data.tag && (
                <motion.div
                  style={{
                    fontSize: 10,
                    color: COLORS.sky,
                    marginTop: 10,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "4px 10px",
                    background: "rgba(56, 189, 248, 0.15)",
                    border: "1px solid rgba(56, 189, 248, 0.3)",
                    borderRadius: 6,
                  }}
                >
                  <TrendingIcon size={10} color={COLORS.sky} />
                  {data.tag}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.span
              style={{
                fontFamily: FONTS.sans,
                color: COLORS.text,
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              {formatCompactNumber(data.views)}+
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}