import { useState, useEffect, useRef, useCallback } from "react";
import ResultCard from "./ResultCard";
import NavArrow from "../../common/NavArrow";
import HookText from "../../common/HookText";
import BackgroundMotion from "../../common/BackgroundMotion";
import { COLORS, FONTS } from "../../../utils/theme";
import { getCircularOffset, getCardTransform } from "../../../utils/carouselMath";

const RESULTS = [
  { id: "r1", video: "/videos/result-1.mp4", poster: "/posters/result-1.jpg", views: 20000000, client: "Client B", platform: "Reels", tag: "Case Study" },
  { id: "r2", video: "/videos/result-2.mp4", poster: "/posters/result-2.jpg", views: 15000000, client: "Client C", platform: "Shorts" },
  { id: "center", video: "/videos/result-hero.mp4", poster: "/posters/result-hero.jpg", views: 22000000, client: "Client A", platform: "TikTok", tag: "Hero Result" },
  { id: "r3", video: "/videos/result-3.mp4", poster: "/posters/result-3.jpg", views: 12000000, client: "Client D", platform: "TikTok" },
  { id: "r4", video: "/videos/result-4.mp4", poster: "/posters/result-4.jpg", views: 9000000, client: "Client E", platform: "Reels" },
  { id: "r5", video: "/videos/result-5.mp4", poster: "/posters/result-5.jpg", views: 7500000, client: "Client F", platform: "Shorts" },
  { id: "r6", video: "/videos/result-6.mp4", poster: "/posters/result-6.jpg", views: 5000000, client: "Client G", platform: "TikTok" },
];

export default function ResultsSection() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(2);
  const [hasEntered, setHasEntered] = useState(false);
  const [countTrigger, setCountTrigger] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          setTimeout(() => setCountTrigger(true), 300);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % RESULTS.length), []);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + RESULTS.length) % RESULTS.length), []);

  return (
    <section
      id="results-section"
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.bgSoft} 100%)`,
        padding: "100px 24px",
        overflow: "hidden",
      }}
    >
      <BackgroundMotion />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", marginBottom: 90 }}>
        <div
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div style={{ fontFamily: FONTS.body, fontSize: 12, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", marginBottom: 14 }}>
            Our Results
          </div>
          <HookText
            text="Proof that it actually works."
            style={{ fontSize: "clamp(34px, 5.5vw, 62px)", justifyContent: "center", display: "flex", flexWrap: "wrap" }}
          />
          <p style={{ fontFamily: FONTS.body, color: COLORS.textMuted, fontSize: 16, marginTop: 18 }}>
            Content is only valuable when it reaches people.
          </p>
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 2, width: "100%", height: 560, maxWidth: 1200, margin: "0 auto" }}>
        {RESULTS.map((item, i) => {
          const offset = getCircularOffset(i, activeIndex, RESULTS.length);
          if (Math.abs(offset) > 2) return null;
          const transformStyle = getCardTransform(offset);
          return (
            <ResultCard
              key={item.id}
              data={item}
              transformStyle={transformStyle}
              isActive={offset === 0}
              countTrigger={countTrigger}
              onClick={() => setActiveIndex(i)}
            />
          );
        })}

        <NavArrow direction="prev" side="left" onClick={goPrev} />
        <NavArrow direction="next" side="right" onClick={goNext} />
      </div>
    </section>
  );
}