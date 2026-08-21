import { useRef, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { COLORS, FONTS } from "../../../utils/theme";

const OUTPUTS = [
  { id: "hook", label: "Hook — 0:42", solution: "Algorithmic Hook", desc: "Extracts peak high-retention opening moment.", x: -300, y: -190 },
  { id: "reaction", label: "Reels Cut", solution: "Shorts & Reels Format", desc: "Re-engineered for vertical 9:16 watch time.", x: 300, y: -190 },
  { id: "insight", label: "Key Insight", solution: "Multi-Fleet Dispatch", desc: "Syndicated across 30+ brand satellite channels.", x: -300, y: 0 },
  { id: "bts", label: "TikTok Edit", solution: "Algorithmic Pacing", desc: "Kinetic captions and sonic audio design.", x: 300, y: 0 },
  { id: "quote", label: "Authority Clip", solution: "Retention Tuning", desc: "Engineered to keep viewers through the end.", x: -300, y: 190 },
  { id: "highlight", label: "Viral Cut", solution: "Continuous Feed Feed", desc: "Automated distribution loops to flood feeds.", x: 300, y: 190 },
];

const PROBLEM_LABELS = [
  { text: "Archive Stagnation", x: -310, y: -70 },
  { text: "Lost Audience Reach", x: 310, y: -70 },
  { text: "Single Feed Bottleneck", x: 0, y: 150 },
];

const FLOW_STEPS = ["CONTENT", "CLIPPING", "DISTRIBUTION", "TRACKING"];

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
    if (inner) {
      inner.style.transform = "translateY(-6px) scale(1.05)";
      inner.style.borderColor = COLORS.sky;
      inner.style.boxShadow = "0 14px 35px rgba(37,99,235,0.45)";
    }
    if (label) label.style.color = COLORS.sky;
  }, []);

  const handlePieceLeave = useCallback((id) => {
    const inner = pieceRefs.current[id]?.querySelector(".piece-inner");
    const label = labelRefs.current[id];
    if (inner) {
      inner.style.transform = "translateY(0) scale(1)";
      inner.style.borderColor = COLORS.borderAccent;
      inner.style.boxShadow = "0 12px 28px rgba(0,0,0,0.4)";
    }
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

      tl.to(contentGroupRef.current, { x: 80, scale: 0.86, duration: 0.12, ease: "power2.out" }, 0.88);
      tl.to(finalLineRef.current, { opacity: 1, x: 0, duration: 0.1, ease: "power2.out" }, 0.9);
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%", height: "100vh", background: COLORS.obsidian, overflow: "hidden", padding: "0 24px", boxSizing: "border-box" }}>
      {/* Dynamic Cobalt Mesh Glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "500px",
          background: "radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(56, 189, 248, 0.04) 50%, transparent 75%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <div
        ref={finalLineRef}
        style={{
          position: "absolute",
          left: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 360,
          textAlign: "left",
          fontFamily: FONTS.sans,
          color: COLORS.ice,
          fontSize: "clamp(26px, 3.2vw, 42px)",
          fontWeight: 800,
          lineHeight: 1.2,
          zIndex: 10,
        }}
      >
        ONE PIECE OF CONTENT.
        <br />
        <span style={{ background: "linear-gradient(135deg, #2563EB, #38BDF8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          INFINITE REACH.
        </span>
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
              color: COLORS.sky,
              border: `1px solid rgba(56, 189, 248, 0.3)`,
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(17, 24, 39, 0.8)",
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
            border: `1px solid ${COLORS.sky}`,
            boxShadow: "0 24px 60px rgba(37, 99, 235, 0.35)",
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
                  transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <span style={{ fontFamily: FONTS.body, fontSize: 11, color: COLORS.sky, letterSpacing: 0.3, fontWeight: 600 }}>{item.label}</span>
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
                <div style={{ fontSize: 13, color: COLORS.ice, fontWeight: 600, transition: "color 0.3s ease" }}>{item.solution}</div>
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
              style={{ fontFamily: FONTS.sans, fontSize: 12, letterSpacing: 2, color: COLORS.sky, textTransform: "uppercase", fontWeight: 700 }}
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