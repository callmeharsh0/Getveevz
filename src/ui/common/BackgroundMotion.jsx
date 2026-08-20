export default function BackgroundMotion() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0, pointerEvents: "none" }}>
      <style>{`
        @keyframes floatSlow1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.08); }
        }
        @keyframes floatSlow2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(1.05); }
        }
      `}</style>
      <div
        style={{
          position: "absolute", top: "10%", left: "8%", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,146,74,0.08) 0%, transparent 70%)",
          animation: "floatSlow1 22s ease-in-out infinite", filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute", bottom: "5%", right: "10%", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(242,236,225,0.05) 0%, transparent 70%)",
          animation: "floatSlow2 28s ease-in-out infinite", filter: "blur(50px)",
        }}
      />
    </div>
  );
}