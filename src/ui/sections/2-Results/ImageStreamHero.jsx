"use client";

import * as React from "react";

// Local utility helper
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 * ─────────────────────────────────────────────────────────────── */

const PATH = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.8,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir, name, p) {
  const steps = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export function ImageStreamHero({
  images = [],
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className,
  ...props
}) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", width: "100%", height: "100%", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          position: "absolute",
          inset: 0,
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          pointerEvents: "none",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "absolute overflow-hidden")}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: `${axis}%`,
                    width: `${p.cardWidth}cqw`,
                    height: `${p.cardHeight}cqw`,
                    marginLeft: `${-p.cardWidth / 2}cqw`,
                    marginTop: `${-p.cardHeight / 2}cqw`,
                    borderRadius: `${p.cardRadius}cqw`,
                    animation: `${name} ${speed}s linear infinite`,
                    animationDelay: `${-(i * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.12)",
                    background: "#18181B",
                  }}
                >
                  {img?.src ? (
                    <img
                      src={img.src}
                      alt={img.alt ?? ""}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      draggable={false}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background: `linear-gradient(135deg, ${
                          ["#FF6E00", "#4A6BFF", "#7C3AED", "#E11D48", "#059669", "#D97706"][i % 6]
                        } 0%, #0F172A 100%)`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "8px",
                        boxSizing: "border-box",
                        color: "#FFFFFF",
                      }}
                    >
                      <span style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.08em" }}>
                        {img?.title || `VIRAL CLIP // 0${(i % 9) + 1}`}
                      </span>
                      <span style={{ fontSize: "0.45rem", color: "#FDE68A", fontWeight: 700 }}>
                        {img?.views || `${((i + 1) * 3.4).toFixed(1)}M VIEWS`}
                      </span>
                    </div>
                  )}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

/**
 * ResultsStreamSection (Alternative 3D Perspective Result Corridor Page)
 */
export default function ResultsStreamSection() {
  const sampleImages = [
    {
      src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
      title: "FOUNDER KEYNOTE // 24M VIEWS",
      views: "24.2M VIEWS",
    },
    {
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      title: "PODCAST BREAKTHROUGH",
      views: "18.6M VIEWS",
    },
    {
      src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
      title: "SAAS PRODUCT LAUNCH",
      views: "15.9M VIEWS",
    },
    {
      src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80",
      title: "VIRAL REEL HOOK",
      views: "31.4M VIEWS",
    },
    {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
      title: "TRI-PLATFORM SYNDICATION",
      views: "22.0M VIEWS",
    },
    {
      src: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
      title: "AUTHORITY INTERVIEW",
      views: "12.8M VIEWS",
    },
  ];

  return (
    <section
      id="results-stream-section-v2"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#09090C",
        color: "#FFFFFF",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 24px",
        boxSizing: "border-box",
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255, 110, 0, 0.14) 0%, rgba(74, 107, 255, 0.08) 50%, transparent 75%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── 3D IMAGE STREAM CORRIDOR ──────────────────────────── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <ImageStreamHero
          images={sampleImages}
          cards={10}
          speed={16}
          axis={52}
          className="w-full h-full"
        />
      </div>

      {/* ── FOREGROUND CONTENT OVERLAY ────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: 920,
          margin: "0 auto",
          pointerEvents: "auto",
        }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            padding: "5px 16px",
            borderRadius: 999,
            marginBottom: 16,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF6E00" }} />
          <span
            style={{
              fontSize: "0.68rem",
              fontWeight: 800,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#FFFFFF",
            }}
          >
            3D Stream Telemetry // 02
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(2.4rem, 5.2vw, 4.5rem)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            margin: "0 auto 14px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.7)",
          }}
        >
          Over <span style={{ color: "#FF6E00" }}>160,000,000+</span> organic views engineered.
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
            color: "#A1A1AA",
            maxWidth: 620,
            margin: "0 auto 28px",
            lineHeight: 1.6,
            fontWeight: 300,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
          }}
        >
          An infinite corridor of high-retention distribution. Every piece of content is engineered to capture watch time and scale authority.
        </p>

        {/* Stats Pill Strip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "12px 24px",
            background: "rgba(18, 18, 22, 0.75)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: 16,
            padding: "14px 28px",
            boxShadow: "0 14px 35px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FFFFFF" }}>160M+</div>
            <div style={{ fontSize: "0.64rem", color: "#A1A1AA", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Total Views
            </div>
          </div>

          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.12)" }} />

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#FF6E00" }}>120+</div>
            <div style={{ fontSize: "0.64rem", color: "#A1A1AA", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Active Pages
            </div>
          </div>

          <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.12)" }} />

          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 800, color: "#22C55E" }}>100%</div>
            <div style={{ fontSize: "0.64rem", color: "#A1A1AA", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Floor Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
