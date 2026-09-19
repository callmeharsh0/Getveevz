"use client";

import React, { useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  iframeRef?: React.RefObject<HTMLIFrameElement>;
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
  iframeRef,
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
        background: "#000000",
        pointerEvents: "auto",
        ...style,
      }}
    >
      {/* Subtle edge vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, transparent 14%, transparent 86%, rgba(0, 0, 0, 0.85) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 22%, transparent 80%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />
      <iframe
        ref={iframeRef}
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
          background: "#000000",
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
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handlePrev = () => {
    try {
      if (iframeRef.current?.contentWindow) {
        (iframeRef.current.contentWindow as any).prevReel?.();
        iframeRef.current.contentWindow.postMessage("filmstrip:prev", "*");
      }
    } catch {
      iframeRef.current?.contentWindow?.postMessage("filmstrip:prev", "*");
    }
  };

  const handleNext = () => {
    try {
      if (iframeRef.current?.contentWindow) {
        (iframeRef.current.contentWindow as any).nextReel?.();
        iframeRef.current.contentWindow.postMessage("filmstrip:next", "*");
      }
    } catch {
      iframeRef.current?.contentWindow?.postMessage("filmstrip:next", "*");
    }
  };

  // Keyboard navigation when filmstrip is in viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName || "";
      if (["INPUT", "TEXTAREA"].includes(activeTag)) return;

      const el = document.getElementById("character-filmstrip");
      if (el) {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          if (e.key === "ArrowLeft") {
            handlePrev();
          } else if (e.key === "ArrowRight") {
            handleNext();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="character-filmstrip"
      className="relative w-full overflow-hidden bg-[#000000] border-b border-border"
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
          iframeRef={iframeRef}
        />

        {/* Soft top gradient fade — seamlessly dissolves from CapabilitiesFlywheel (#090e14) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-44 md:h-52 z-10"
          style={{
            background:
              "linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.85) 30%, rgba(0, 0, 0, 0.4) 65%, transparent 100%)",
          }}
        />

        {/* Text overlay — positioned at the top, blends into the carousel */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col items-center justify-start pt-10 sm:pt-14 md:pt-16 px-6"
        >
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-[#8BA3C5]">
            The work, in numbers
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white">
            Real reels. Real reach.
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* AESTHETIC ARROW NAVIGATION BUTTONS                                        */}
        {/* ========================================================================= */}

        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous reel"
          className="group absolute left-4 sm:left-8 md:left-12 lg:left-14 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#080b14]/75 hover:bg-white text-frost hover:text-black border border-white/15 hover:border-white backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
          <span className="sr-only">Previous reel</span>
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next reel"
          className="group absolute right-4 sm:right-8 md:right-12 lg:right-14 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#080b14]/75 hover:bg-white text-frost hover:text-black border border-white/15 hover:border-white backdrop-blur-xl shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-pointer"
        >
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
          <span className="sr-only">Next reel</span>
        </button>

        {/* Bottom subtle interaction hint pill */}
        <div className="pointer-events-none absolute bottom-6 sm:bottom-8 inset-x-0 z-20 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080b14]/60 border border-white/10 backdrop-blur-md text-[10px] sm:text-xs font-mono text-muted/80 tracking-wider">
            <span>Use arrows or drag to explore reels</span>
          </div>
        </div>
      </div>
    </section>
  );
}
