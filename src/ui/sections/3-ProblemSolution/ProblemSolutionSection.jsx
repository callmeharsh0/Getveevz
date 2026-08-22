import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import DistributionFlow from "./DistributionFlow";
import { COLORS, FONTS } from "../../../utils/theme";
import { Zap, Share2, Radio, BarChart3, ArrowRight, Sparkles, TrendingUp, Users, Cpu } from "lucide-react";

const FLOW_STEPS = [
  { label: "CONTENT", icon: Cpu, color: COLORS.sky },
  { label: "CLIPPING", icon: Zap, color: "#F59E0B" },
  { label: "DISTRIBUTION", icon: Share2, color: "#34D399" },
  { label: "TRACKING", icon: BarChart3, color: "#8B5CF6" },
];

const OUTPUTS = [
  { id: "hook", label: "Hook — 0:42", solution: "Algorithmic Hook", desc: "Extracts peak high-retention opening moment.", pos: { x: -300, y: -190 } },
  { id: "reaction", label: "Reels Cut", solution: "Shorts & Reels Format", desc: "Re-engineered for vertical 9:16 watch time.", pos: { x: 300, y: -190 } },
  { id: "insight", label: "Key Insight", solution: "Multi-Fleet Dispatch", desc: "Syndicated across 30+ brand satellite channels.", pos: { x: -300, y: 0 } },
  { id: "bts", label: "TikTok Edit", solution: "Algorithmic Pacing", desc: "Kinetic captions and sonic audio design.", pos: { x: 300, y: 0 } },
  { id: "quote", label: "Authority Clip", solution: "Retention Tuning", desc: "Engineered to keep viewers through the end.", pos: { x: -300, y: 190 } },
  { id: "highlight", label: "Viral Cut", solution: "Continuous Feed Loop", desc: "Automated distribution loops to flood feeds.", pos: { x: 300, y: 190 } },
];

const PROBLEM_LABELS = [
  { text: "Archive Stagnation", pos: { x: -310, y: -70 } },
  { text: "Lost Audience Reach", pos: { x: 310, y: -70 } },
  { text: "Single Feed Bottleneck", pos: { x: 0, y: 150 } },
];

export default function ProblemSolutionSection() {
  const statementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = statementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="problem-solution-section"
        ref={statementRef}
        style={{
          background: COLORS.obsidian,
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "400px",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
            textAlign: "left",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONTS.body,
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: COLORS.sky,
              marginBottom: 20,
              background: "rgba(37, 99, 235, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              padding: "6px 14px",
              borderRadius: 999,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.span
              style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.sky }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            THE DISTRIBUTION GAP
          </motion.div>

          <motion.h2
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.textMuted,
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 500,
              margin: "0 0 12px",
              lineHeight: 1.3,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            You're already creating the content.
          </motion.h2>

          <motion.h2
            style={{
              fontFamily: FONTS.sans,
              color: COLORS.ice,
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 800,
              margin: "0 0 24px",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            Why Isn't It Being Distributed{" "}
            <span style={{ background: "linear-gradient(135deg, #2563EB, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Everywhere?
            </span>
          </motion.h2>

          <motion.p
            style={{
              fontFamily: FONTS.body,
              color: COLORS.textMuted,
              fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
              maxWidth: 680,
              margin: 0,
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Most creators and teams have hours of world-class video sitting in archives. The bottleneck isn't content quality — it's the lack of an autonomous short-form syndication operation.
          </motion.p>
        </motion.div>
      </section>

      {/* Distribution Flow - Scroll-driven Motion */}
      <DistributionFlow />
    </>
  );
}