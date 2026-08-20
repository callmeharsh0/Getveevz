import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { COLORS } from "../../../utils/theme";

export default function PortalTransition() {
  const wrapperRef = useRef(null);
  const frameRef = useRef(null);
  const labelRef = useRef(null);

  useGSAP(
    () => {
      gsap.set(frameRef.current, { width: 220, height: 340, borderRadius: 20, opacity: 1 });
      gsap.set(labelRef.current, { opacity: 1 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "+=140%",
            scrub: 1,
            pin: true,
          },
        })
        .to(labelRef.current, { opacity: 0, duration: 0.15 }, 0)
        .to(frameRef.current, { width: "100vw", height: "100vh", borderRadius: 0, duration: 1, ease: "power2.inOut" }, 0.1)
        .to(frameRef.current, { opacity: 0, duration: 0.2 }, 0.85);
    },
    { scope: wrapperRef }
  );

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        ref={frameRef}
        style={{ position: "relative", overflow: "hidden", border: `1px solid ${COLORS.borderAccent}`, boxShadow: "0 0 100px rgba(212,146,74,0.15)" }}
      >
        <video
          src="/videos/portal-vertical.mp4"
          poster="/posters/portal-vertical.jpg"
          autoPlay
          muted
          loop
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div
        ref={labelRef}
        style={{ position: "absolute", bottom: "8%", fontFamily: "'Inter', sans-serif", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", color: COLORS.textMuted }}
      >
        Scroll to enter
      </div>
    </div>
  );
}