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
        background: isFilmstrip ? "#d8c9ad" : "#121212",
        pointerEvents: "auto",
        ...style,
      }}
    >
      <iframe
        title="Interactive character filmstrip"
        src="/character-filmstrip.html"
        style={{
          position: "absolute",
          inset: 0,
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
      <div className="w-full h-[540px] sm:h-[620px] md:h-[720px] lg:h-[780px] relative">
        <CharacterFilmstrip
          speed={1.0}
          scale={1.0}
          opacity={1.0}
          hue={0}
          saturation={1.0}
          brightness={1.0}
        />
      </div>
    </section>
  );
}
