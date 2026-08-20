import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { COLORS, FONTS } from "../../../utils/theme";

const OUTPUTS = [
  { id: "hook", label: "Hook — 0:42", solution: "Hook Extraction", desc: "Identifies a strong moment from the long-form content.", x: -300, y: -190 },
  { id: "reaction", label: "Reaction", solution: "Short-Form Optimization", desc: "Reformats the content for short-form platforms.", x: 300, y: -190 },
  { id: "insight", label: "Key Insight", solution: "Distribution", desc: "Positions the content for wider reach.", x: -300, y: 0 },
  { id: "bts", label: "Behind the Scenes", solution: "Repurposing", desc: "Extends the story across formats.", x: 300, y: 0 },
  { id: "quote", label: "Quote Card", solution: "Optimization", desc: "Tunes pacing and hooks for retention.", x: -300, y: 190 },
  { id: "highlight", label: "Highlight", solution: "Amplification", desc: "Feeds the platform algorithm consistently.", x: 300, y: 190 },
];

const PROBLEM_LABELS = [
  { text: "Low Reach", x: -260, y: -70 },
  { text: "Lost Moments", x: 260, y: -70 },
  { text: "Limited Distribution", x: 0, y: 150 },
];

const FLOW_STEPS = ["EXTRACT", "OPTIMIZE", "REPURPOSE", "DISTRIBUTE"];

export default function DistributionFlow() {
  const wrapperRef = useRef(null);
  const contentGroupRef = useRef(null);
  const sourceRef = useRef(null);
  const tiltRef = useRef(null);
  const pieceRefs = useRef({});
  const labelRefs = useRef({});
  const problemLabelRefs = useRef({});
  const flowStepRefs = useRef({});
  const finalLineRef = useRef(null);

  const handleSourceMouseMove = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateZ(12px)`;
  }, []);

  const handleSourceMouseLeave = useCallback(() => {
    const el = tiltRef.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
  }, []);

  const handlePieceEnter = useCallback((id) => {
    const inner = pieceRefs.current[id]?.querySelector(".piece-inner");
    const label = labelRefs.current[id];
    if (inner) inner.style.transform = "translateY(-6px) scale(1.05)";
    if (label) label.style.color = COLORS.accent;
  }, []);

  const handlePieceLeave = useCallback((id) => {
    const inner = pieceRefs.current[id]?.querySelector(".piece-inner");
    const label = labelRefs.current[id];
    if (inner) inner.style.transform = "translateY(0) scale(1)";
    if (label) label.style.color = COLORS.text;
  }, []);

  useGSAP(
    () => {
      gsap.set(sourceRef.current, { scale: 1, opacity: 1 });
      OUTPUTS.forEach((item) => {
        const el = pieceRefs.current[item.id];
        if (el) gsap.set(el, { scale: 0, opacity: 0, x: 0, y: 0 });
        const label = labelRefs.current[item.id];
        if (label) gsap.set(label, { opacity: 0 });
      });
      Object.values(problemLabelRefs.current).forEach((el) => el && gsap.set(el, { opacity: 0, y: 10 }));
      Object.values(flowStepRefs.current).forEach((el) => el && gsap.set(el, { opacity: 0, y: 12 }));
      gsap.set(finalLineRef.current, { opacity: 0, x: -24 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
        },
      });

      PROBLEM_LABELS.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.08 }, 0.02 + i * 0.03);
      });

      PROBLEM_LABELS.forEach((_, i) => {
        const el = problemLabelRefs.current[i];
        if (el) tl.to(el, { opacity: 0, y: -10, duration: 0.06 }, 0.16 + i * 0.02);
      });
      tl.to(sourceRef.current, { scale: 0.6, duration: 0.12, ease: "power2.inOut" }, 0.18);

      OUTPUTS.forEach((item, i) => {
        const el = pieceRefs.current[item.id];
        if (!el) return;
        tl.to(el, { x: item.x, y: item.y, scale: 1, opacity: 1, duration: 0.18, ease: "back.out(1.2)" }, 0.3 + i * 0.035);
      });

      OUTPUTS.forEach((item, i) => {
        const label = labelRefs.current[item.id];
        if (label) tl.to(label, { opacity: 1, duration: 0.08 }, 0.55 + i * 0.03);
      });

      FLOW_STEPS.forEach((_, i) => {
        const el = flowStepRefs.current[i];
        if (el) tl.to(el, { opacity: 1, y: 0, duration: 0.06 }, 0.78 + i * 0.045);
      });

      tl.to(contentGroupRef.current, { x: 140, scale: 0.86, duration: 0.12, ease: "power2.out" }, 0.88);
      tl.to(finalLineRef.current, { opacity: 1, x: 0, duration: 0.1, ease: "power2.out" }, 0.9);
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", height: "100vh", background: COLORS.bg, overflow: "hidden" }}>
      <div
        ref={finalLineRef}
        style={{
          position: "absolute",
          left: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 340,
          textAlign: "left",
          fontFamily: FONTS.display,
          color: COLORS.text,
          fontSize: "clamp(24px, 3vw, 38px)",
          fontWeight: 500,
          lineHeight: 1.3,
          zIndex: 10,
        }}
      >
        ONE PIECE OF CONTENT.
        <br />
        <span style={{ color: COLORS.accent }}>INFINITE REACH.</span>
      </div>

      <div ref={contentGroupRef} style={{ position: "absolute", top: "50%", left: "50%", width: 1000, height: 800, marginLeft: -500, marginTop: -400 }}>
        {PROBLEM_LABELS.map((p, i) => (
          <div
            key={p.text}
            ref={(el) => (problemLabelRefs.current[i] = el)}
            style={{
              position: "absolute",
              top: `calc(50% + ${p.y}px)`,
              left: `calc(50% + ${p.x}px)`,
              transform: "translate(-50%, -50%)",
              fontFamily: FONTS.body,
              fontSize: 13,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: COLORS.textMuted,
              border: `1px solid ${COLORS.borderSubtle}`,
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(242,236,225,0.03)",
              zIndex: 6,
              whiteSpace: "nowrap",
            }}
          >
            {p.text}
          </div>
        ))}

        <div
          ref={sourceRef}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 360,
            height: 203,
            marginLeft: -180,
            marginTop: -101,
            borderRadius: 14,
            overflow: "hidden",
            background: COLORS.surface,
            border: `1px solid ${COLORS.borderSubtle}`,
            boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
            zIndex: 5,
          }}
        >
          <div
            ref={tiltRef}
            onMouseMove={handleSourceMouseMove}
            onMouseLeave={handleSourceMouseLeave}
            style={{ width: "100%", height: "100%", transition: "transform 0.3s ease" }}
          >
            <video
              src="/videos/source-longform.mp4"
              poster="/posters/source-longform.jpg"
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {OUTPUTS.map((item) => {
          const isLeft = item.x < 0;
          return (
            <div
              key={item.id}
              ref={(el) => (pieceRefs.current[item.id] = el)}
              onMouseEnter={() => handlePieceEnter(item.id)}
              onMouseLeave={() => handlePieceLeave(item.id)}
              style={{ position: "absolute", top: "50%", left: "50%", width: 120, height: 168, marginLeft: -60, marginTop: -84, zIndex: 3 }}
            >
              <div
                className="piece-inner"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  background: COLORS.surface,
                  border: `1px solid ${COLORS.borderAccent}`,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 10,
                  boxShadow: "0 12px 28px rgba(0,0,0,0.4)",
                  transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.accent, letterSpacing: 0.3 }}>{item.label}</span>
              </div>

              <div
                ref={(el) => (labelRefs.current[item.id] = el)}
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  [isLeft ? "right" : "left"]: "100%",
                  [isLeft ? "marginRight" : "marginLeft"]: 16,
                  width: 160,
                  textAlign: isLeft ? "right" : "left",
                  fontFamily: FONTS.body,
                  pointerEvents: "none",
                }}
              >
                <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 500, transition: "color 0.3s ease" }}>{item.solution}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 3, lineHeight: 1.4 }}>{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", bottom: "6%", left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24, zIndex: 8, flexWrap: "wrap" }}>
        {FLOW_STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <span
              ref={(el) => (flowStepRefs.current[i] = el)}
              style={{ fontFamily: FONTS.body, fontSize: 12, letterSpacing: 2, color: COLORS.accent, textTransform: "uppercase", fontWeight: 600 }}
            >
              {step}
            </span>
            {i < FLOW_STEPS.length - 1 && <span style={{ color: COLORS.textMuted, fontSize: 12 }}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}