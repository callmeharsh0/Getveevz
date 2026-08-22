import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import ResultCard from "./ResultCard";
import HookText from "../../common/HookText";
import BackgroundMotion from "../../common/BackgroundMotion";
import { COLORS, FONTS } from "../../../utils/theme";
import { getCircularOffset, getCardTransform } from "../../../utils/carouselMath";
import { ChevronLeft, ChevronRight, Play, Pause, BarChart3, Globe, TrendingUp, Clock, ArrowRight } from "lucide-react";

const RESULTS = [
  {
    id: "r1",
    video: "/videos/result-1.mp4",
    poster: "/posters/result-1.jpg",
    views: 20000000,
    client: "Tech Executive Show",
    platform: "Reels",
    tag: "Case Study",
    metric: "12.3M views",
    duration: "3:42",
  },
  {
    id: "r2",
    video: "/videos/result-2.mp4",
    poster: "/posters/result-2.jpg",
    views: 15000000,
    client: "Fintech Leader",
    platform: "Shorts",
    tag: "Growth Campaign",
    metric: "8.9M views",
    duration: "2:18",
  },
  {
    id: "center",
    video: "/videos/result-hero.mp4",
    poster: "/posters/result-hero.jpg",
    views: 22000000,
    client: "Media Network",
    platform: "TikTok",
    tag: "Hero Result",
    metric: "15.8M views",
    duration: "4:15",
  },
  {
    id: "r3",
    video: "/videos/result-3.mp4",
    poster: "/posters/result-3.jpg",
    views: 12000000,
    client: "B2B SaaS Founder",
    platform: "TikTok",
    tag: "B2B Viral",
    metric: "6.4M views",
    duration: "1:52",
  },
  {
    id: "r4",
    video: "/videos/result-4.mp4",
    poster: "/posters/result-4.jpg",
    views: 9000000,
    client: "Venture Podcast",
    platform: "Reels",
    tag: "Audiovisual",
    metric: "5.2M views",
    duration: "2:45",
  },
  {
    id: "r5",
    video: "/videos/result-5.mp4",
    poster: "/posters/result-5.jpg",
    views: 7500000,
    client: "Enterprise Leader",
    platform: "Shorts",
    tag: "Enterprise",
    metric: "4.8M views",
    duration: "3:12",
  },
  {
    id: "r6",
    video: "/videos/result-6.mp4",
    poster: "/posters/result-6.jpg",
    views: 5000000,
    client: "Creator Network",
    platform: "TikTok",
    tag: "Network Reach",
    metric: "3.9M views",
    duration: "2:05",
  },
];

const VIEW_MODES = [
  { id: "views", label: "Views", icon: TrendingUp, color: COLORS.sky },
  { id: "duration", label: "Duration", icon: Clock, color: COLORS.textMuted },
  { id: "platform", label: "Platform", icon: Globe, color: "#8B5CF6" },
];

export default function ResultsSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [hasEntered, setHasEntered] = useState(false);
  const [countTrigger, setCountTrigger] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [viewMode, setViewMode] = useState("views");

  // Scroll-driven animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          setTimeout(() => setCountTrigger(true), 500);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % RESULTS.length);
    setIsPlaying(false);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + RESULTS.length) % RESULTS.length);
    setIsPlaying(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "ArrowRight") {
      goNext();
    } else if (e.key === "ArrowLeft") {
      goPrev();
    } else if (e.key === " ") {
      e.preventDefault();
      setIsPlaying((p) => !p);
    }
  }, [goNext, goPrev]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % RESULTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      id="results-section"
      ref={sectionRef}
      className="noise-overlay"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100dvh",
        background: COLORS.obsidian,
        padding: "120px 24px 100px",
        overflow: "hidden",
        isolation: "isolate",
        borderTop: "1px solid rgba(56,189,248,0.08)",
      }}
    >
      {/* Ambient 3D Particle Glow - parallax */}
      <motion.div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(circle at 20% 30%, rgba(37, 99, 235, 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.08) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 1,
        }}
        y={useTransform(scrollYProgress, [0, 1], [0, -80])}
      />

      {/* Datetime Overlay Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 1px, rgba(255,255,255,0.01) 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.3,
          zIndex: 1,
        }}
      />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 100 }}>
        {/* View Mode Selector */}
        <motion.div
          style={{
            display: "inline-flex",
            gap: 4,
            background: "rgba(17, 24, 39, 0.6)",
            backdropFilter: "blur(12px)",
            borderRadius: 999,
            padding: "6px",
            marginBottom: 24,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {VIEW_MODES.map((mode) => (
            <motion.button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                background: viewMode === mode.id ? `${mode.color}15` : "none",
                border: `1px solid ${viewMode === mode.id ? mode.color : COLORS.borderSubtle}`,
                borderRadius: 999,
                padding: "8px 16px",
                color: viewMode === mode.id ? mode.color : COLORS.textMuted,
                fontFamily: FONTS.body,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "all 0.25s ease",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <mode.icon size={14} />
              {mode.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{
              fontFamily: FONTS.body,
              fontSize: "0.8rem",
              letterSpacing: "0.25em",
              color: COLORS.sky,
              textTransform: "uppercase",
              marginBottom: 20,
              opacity: 0.8,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <BarChart3 size={16} style={{ verticalAlign: "middle" }} />
            VERIFIED DISTRIBUTION TELEMETRY
          </motion.div>

          <motion.div
            style={{
              fontSize: "clamp(2.8rem, 4.5vw, 3.8rem)",
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap",
              color: COLORS.ice,
              marginBottom: 18,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <HookText
              text="Proof that our distribution system works."
              style={{
                fontSize: "clamp(2.8rem, 4.5vw, 3.8rem)",
                justifyContent: "center",
                display: "flex",
                flexWrap: "wrap",
                color: COLORS.ice,
              }}
            />
          </motion.div>

          <motion.p
            style={{
              fontFamily: FONTS.body,
              color: COLORS.textMuted,
              fontSize: "1rem",
              marginTop: 12,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Long-form content engineered into high-retention short-form multi-platform reach. Every clip
            optimized for algorithmic distribution.
          </motion.p>
        </motion.div>

        {/* Active Index Indicator */}
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 32,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {RESULTS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => { setActiveIndex(i); setIsPlaying(false); }}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: i === activeIndex ? COLORS.sky : "rgba(17, 24, 39, 0.6)",
                border: `1px solid ${i === activeIndex ? COLORS.sky : COLORS.borderSubtle}`,
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: i === activeIndex ? 1 : 0.6,
              }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: i === activeIndex ? 1.2 : 1 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Carousel Container with Enhanced 3D Depth */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          height: "min(65vh, 680px)",
          maxWidth: 1200,
          margin: "0 auto",
          perspective: 2000,
          transformStyle: "preserve-3d",
        }}
      >
        {RESULTS.map((item, i) => {
          const offset = getCircularOffset(i, activeIndex, RESULTS.length);
          if (Math.abs(offset) > 2.5) return null;
          const transformStyle = getCardTransform(offset);
          return (
            <ResultCard
              key={item.id}
              data={item}
              transformStyle={transformStyle}
              isActive={offset === 0}
              countTrigger={countTrigger}
              onClick={() => { setActiveIndex(i); setIsPlaying(false); }}
              isPlaying={isPlaying}
              viewMode={viewMode}
            />
          );
        })}

        {/* Enhanced Navigation Arrows */}
        <motion.button
          onClick={goPrev}
          style={{
            position: "absolute",
            left: 24,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${COLORS.borderSubtle}`,
            color: COLORS.ice,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
          whileHover={{ scale: 1.1, borderColor: COLORS.sky, background: "rgba(17, 24, 39, 0.95)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={24} />
        </motion.button>

        <motion.button
          onClick={goNext}
          style={{
            position: "absolute",
            right: 24,
            top: "50%",
            transform: "translateY(-50%)",
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(17, 24, 39, 0.8)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${COLORS.borderSubtle}`,
            color: COLORS.ice,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
          whileHover={{ scale: 1.1, borderColor: COLORS.sky, background: "rgba(17, 24, 39, 0.95)" }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={24} />
        </motion.button>

        {/* Play/Pause Toggle */}
        <motion.button
          onClick={() => setIsPlaying((p) => !p)}
          style={{
            position: "absolute",
            bottom: 24,
            right: 24,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(37, 99, 235, 0.25), rgba(56, 189, 248, 0.15))",
            border: "1px solid rgba(56, 189, 248, 0.3)",
            color: COLORS.sky,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 25px rgba(37, 99, 235, 0.2)",
            zIndex: 10,
          }}
          whileHover={{ scale: 1.1, boxShadow: "0 12px 35px rgba(37, 99, 235, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: isPlaying ? 20 : 0, repeat: Infinity, ease: "linear" }}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </motion.button>
      </motion.div>

      {/* Stats Grid Overlay */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          gap: 40,
          justifyContent: "center",
          padding: "24px",
          background: "linear-gradient(180deg, transparent 0%, rgba(5, 5, 8, 0.8) 100%)",
          marginBottom: -40,
          zIndex: 1,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {[
          { label: "Active Campaigns", value: RESULTS.length, icon: BarChart3, color: COLORS.sky },
          { label: "Total Impressions", value: `${Math.round(RESULTS.reduce((sum, r) => sum + r.views, 0) / 1e6)}M+`, icon: TrendingUp, color: "#34D399" },
          { label: "Platform Hours", value: "120+", icon: Globe, color: "#F59E0B" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.body,
              color: COLORS.textMuted,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
          >
            <motion.div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                fontWeight: 700,
                fontSize: "1.8rem",
                color: COLORS.ice,
              }}
            >
              <stat.icon size={20} color={stat.color} />
              <span>{stat.value}</span>
            </motion.div>
            <motion.div
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}