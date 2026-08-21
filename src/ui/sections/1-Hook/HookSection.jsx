import { useEffect, useRef, useState } from "react";
import HookText from "../../common/HookText";
import { COLORS, FONTS } from "../../../utils/theme";

export default function HookSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hook-section" ref={ref} style={{ position: "relative", background: COLORS.obsidian, padding: "120px 24px", textAlign: "center" }}>
      <div
        style={{
          maxWidth: 780,
          margin: "0 auto",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 1s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <HookText
          text="Your content deserves more than a single post."
          style={{ fontSize: "clamp(28px, 4.5vw, 52px)", justifyContent: "center", display: "flex", flexWrap: "wrap", color: COLORS.ice }}
        />
        <p
          style={{
            fontFamily: FONTS.body,
            color: COLORS.textMuted,
            fontSize: 16,
            marginTop: 24,
            lineHeight: 1.5,
            maxWidth: 580,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          You already have the expertise. GetVeevz turns one piece of long-form content into a coordinated short-form distribution engine built to travel across every algorithmic feed.
        </p>
      </div>
    </section>
  );
}