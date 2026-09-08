"use client";

import React from "react";

export interface CharacterCarouselProps {
  variant?: "filmstrip" | "wave";
  speed?: number;
  scale?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CharacterCarousel({
  variant = "filmstrip",
  speed = 1,
  scale = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  className = "",
  style,
}: CharacterCarouselProps) {
  const isFilmstrip = variant === "filmstrip";
  const clampedOpacity = Math.min(1, Math.max(0.05, opacity));
  const clampedHue = Math.min(180, Math.max(-180, hue));
  const clampedSaturation = Math.min(2, Math.max(0, saturation));
  const clampedBrightness = Math.min(1.65, Math.max(0.35, brightness));

  return (
    <div
      className={`relative w-full h-full min-w-0 min-h-0 overflow-hidden ${className}`}
      style={{
        background: isFilmstrip
          ? [
              "linear-gradient(90deg, rgba(80, 58, 31, 0.08) 1px, transparent 1px) 50% 0 / 25% 100%",
              "repeating-linear-gradient(0deg, transparent 0, transparent 109px, rgba(72, 52, 30, 0.13) 110px, transparent 111px)",
              "#d8c9ad",
            ].join(", ")
          : "#121212",
        pointerEvents: "auto",
        ...style,
      }}
    >
      {/* Paper grain overlay */}
      {isFilmstrip && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            opacity: 0.27,
            mixBlendMode: "multiply",
            background: [
              "repeating-radial-gradient(circle at 12% 18%, rgba(71, 51, 30, 0.17) 0 0.5px, transparent 0.7px 4px)",
              "repeating-radial-gradient(circle at 78% 71%, rgba(255, 255, 255, 0.35) 0 0.5px, transparent 0.8px 5px)",
            ].join(", "),
          }}
        />
      )}
      {/* Edge vignette — continuous across wrapper + iframe */}
      {isFilmstrip && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(90deg, rgba(84, 58, 29, 0.19), transparent 14%, transparent 86%, rgba(84, 58, 29, 0.19))",
          }}
        />
      )}
      <iframe
        title="Interactive character filmstrip"
        src="/character-filmstrip.html"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "block",
          width: "100%",
          height: "100%",
          border: 0,
          background: isFilmstrip ? "#d8c9ad" : "#121212",
          opacity: clampedOpacity,
          filter: `hue-rotate(${clampedHue}deg) saturate(${clampedSaturation}) brightness(${clampedBrightness})`,
        }}
      />
    </div>
  );
}

export function CharacterFilmstrip(props: Omit<CharacterCarouselProps, "variant">) {
  return <CharacterCarousel {...props} variant="filmstrip" />;
}

export default function ReelsFilmstrip() {
  return (
    <section
      id="character-filmstrip"
      className="relative w-full overflow-hidden bg-[#d8c9ad]"
    >
      <div className="w-full h-[640px] sm:h-[720px] md:h-[820px] lg:h-[880px] relative">
        {/* Carousel fills the entire section */}
        <CharacterFilmstrip
          speed={1.0}
          scale={1.0}
          opacity={1.0}
          hue={0}
          saturation={1.0}
          brightness={1.0}
        />

        {/* Text overlay — positioned at the top, blends into the carousel */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-start pt-10 sm:pt-14 md:pt-16 px-6"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#4A4A4A]/80">
            The work, in numbers
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1A1A1A]">
            Real reels. Real reach.
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#4A4A4A]/90 leading-relaxed text-center max-w-lg">
            A snapshot of what we&apos;ve shipped this quarter — clipping, distribution and
            <br className="hidden sm:inline" /> PR, compounding into one audience.
          </p>
        </div>
      </div>
    </section>
  );
}
