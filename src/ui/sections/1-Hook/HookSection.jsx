import { useEffect, useRef, useState } from "react";
import HookText from "../../common/HookText";
import { COLORS, FONTS } from "../../../utils/theme";

export default function HookSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

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
    <section id="hook-section" ref={ref} style={{ position: "relative", background: COLORS.bg, padding: "120px 24px", textAlign: "center" }}>
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
          text="Your content deserves more than just a view."
          style={{ fontSize: "clamp(28px, 4.5vw, 52px)", justifyContent: "center", display: "flex", flexWrap: "wrap" }}
        />
        <p
          style={{
            fontFamily: FONTS.body,
            color: COLORS.textMuted,
            fontSize: 16,
            marginTop: 24,
            lineHeight: 1.4,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          You already have the story. We turn one piece of content into a
          distribution system built to travel further.
        </p>
      </div>
    </section>
  );
}