"use client";

import React from "react";

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  category: string;
  metric: string;
}

export const CLIENT_LOGOS: ClientItem[] = [
  {
    id: "slay-point",
    name: "Slay Point",
    logo: "/assets/icons/slay%20point.jpg",
    category: "Creators",
    metric: "45M+ Monthly Views",
  },
  {
    id: "think-school",
    name: "Think School",
    logo: "/assets/icons/thinkschool.png",
    category: "Creators & Media",
    metric: "3.8x Retention Lift",
  },
  {
    id: "be10x",
    name: "Be10x",
    logo: "/assets/icons/be10x.png",
    category: "AI & EdTech",
    metric: "12M+ Organic Views",
  },
  {
    id: "nxtwave",
    name: "NxtWave",
    logo: "/assets/icons/nxtwave.jpg",
    category: "Tech Careers",
    metric: "+320% Inbound Leads",
  },
  {
    id: "nillons",
    name: "Nilon's",
    logo: "/assets/icons/nilon_s.png",
    category: "Consumer Brands",
    metric: "18M+ Campaign Reach",
  },
  {
    id: "whisperflow",
    name: "WhisperFlow",
    logo: "/assets/icons/whisperflow.jpg",
    category: "AI & SaaS",
    metric: "+450% Demo Growth",
  },
  {
    id: "nyne",
    name: "Nyne",
    logo: "/assets/icons/nyne.jpg",
    category: "Media & Lifestyle",
    metric: "5.4M+ Impressions",
  },
];

/**
 * Nested Doppelrand (Double-Bezel) Logo Vessel
 * Machined concentric radii with micro-inset specular illumination.
 */
function LogoVessel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative shrink-0 w-11 h-11 rounded-[0.875rem] p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.4)]">
      <div className="w-full h-full rounded-[calc(0.875rem-1px)] bg-white/95 p-1.5 flex items-center justify-center overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] select-none"
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (src.includes("%20")) {
              target.src = src.replace(/%20/g, " ");
            }
          }}
        />
      </div>
    </div>
  );
}

export default function ClientLogosMarquee() {
  // Quadruple arrays to ensure uninterrupted continuous velocity across ultra-wide monitors
  const row1 = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const row2 = [
    ...CLIENT_LOGOS.slice(3),
    ...CLIENT_LOGOS.slice(0, 3),
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
  ];

  return (
    <section
      id="clients"
      className="relative w-full py-20 sm:py-28 lg:py-32 bg-gradient-to-b from-[#090e14] via-[#04070d] to-[#02050a] overflow-hidden select-none"
    >
      {/* ── Top Atmospheric Fade (seamless dissolve from DistributionFlow #090e14) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-40 bg-gradient-to-b from-[#090e14] via-[#090e14]/75 to-transparent z-10"
      />

      {/* ── Bottom Atmospheric Fade (dissolves cleanly into next section) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-40 bg-gradient-to-t from-[#02050a] via-[#02050a]/75 to-transparent z-10"
      />

      {/* ── Spatial Radial Illumination ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[380px] bg-gradient-to-r from-frost/10 via-[#0038E2]/15 to-transparent blur-[160px] rounded-full"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-1/4 w-[400px] h-[250px] bg-frost/5 blur-[130px] rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Title (Kinetic Typography & Controlled Tension) ── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-display text-2xl sm:text-3xl md:text-[2.65rem] font-medium tracking-[-0.03em] leading-tight text-[#F0ECDD]">
            Trusted by High-Output{" "}
            <span className="relative inline-block text-frost font-semibold">
              Creators & Founders
              {/* Subtle specular underglow */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-2 -bottom-1 h-3 bg-frost/20 blur-md rounded-full -z-10"
              />
            </span>
          </h2>
        </div>

        {/* ── Marquee Row 1 (Velocity: Westward) ── */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
          <div className="flex gap-4 sm:gap-6 py-2.5 w-max animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {row1.map((client, idx) => (
              <div
                key={`${client.id}-r1-${idx}`}
                className="group relative p-[1.5px] rounded-[1.25rem] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent ring-1 ring-white/[0.08] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.7)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:from-frost/40 hover:via-white/[0.12] hover:ring-frost/30 shrink-0 cursor-default"
              >
                {/* Inner Bezel Core */}
                <div className="rounded-[calc(1.25rem-1.5px)] bg-gradient-to-b from-[#131b28]/95 via-[#0b1019]/95 to-[#070b12] px-4 py-3 flex items-center gap-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <LogoVessel src={client.logo} alt={client.name} />
                  <div>
                    <h3 className="font-display text-[13px] sm:text-sm font-semibold tracking-[-0.01em] text-[#F0ECDD] group-hover:text-frost transition-colors duration-300">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-frost/80 shadow-[0_0_8px_rgba(139,163,197,0.8)]" />
                      <span className="text-[11px] font-mono tracking-tight text-[#8BA3C5]/90">
                        {client.metric}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Marquee Row 2 (Velocity: Eastward) ── */}
        <div className="relative w-full overflow-hidden mt-3 sm:mt-5 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
          <div className="flex gap-4 sm:gap-6 py-2.5 w-max animate-[marquee-reverse_36s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {row2.map((client, idx) => (
              <div
                key={`${client.id}-r2-${idx}`}
                className="group relative p-[1.5px] rounded-[1.25rem] bg-gradient-to-b from-white/[0.10] via-white/[0.03] to-transparent ring-1 ring-white/[0.06] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.7)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:from-frost/40 hover:via-white/[0.12] hover:ring-frost/30 shrink-0 cursor-default"
              >
                {/* Inner Bezel Core */}
                <div className="rounded-[calc(1.25rem-1.5px)] bg-gradient-to-b from-[#101724]/90 via-[#090d16]/95 to-[#060910] px-4 py-3 flex items-center gap-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <LogoVessel src={client.logo} alt={client.name} />
                  <div>
                    <h3 className="font-display text-[13px] sm:text-sm font-semibold tracking-[-0.01em] text-[#F0ECDD] group-hover:text-frost transition-colors duration-300">
                      {client.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      <span className="text-[11px] font-mono tracking-tight text-frost/90 font-medium">
                        {client.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GPU-Accelerated Fluid Keyframe Interpolation */}
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marquee-reverse {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}
