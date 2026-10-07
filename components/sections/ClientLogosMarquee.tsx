"use client";

import React from "react";
import { cn } from "@/lib/utils";

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
    id: "tai-lopez",
    name: "Tai Lopez",
    logo: "/assets/icons/tailopez.jpg",
    category: "Entrepreneurs",
    metric: "50M+ Campaign Views",
  },
  {
    id: "traders-paradise",
    name: "Trader's Paradise",
    logo: "/assets/icons/traderspardise.png",
    category: "Finance & Trading",
    metric: "14M+ Total Impressions",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logo: "/assets/icons/anthropic.jpg",
    category: "AI & Frontier Labs",
    metric: "Global AI Narrative",
  },
  {
    id: "emergent",
    name: "Emergent",
    logo: "/assets/icons/emergent.jpg",
    category: "Media & Networks",
    metric: "28M+ Campaign Views",
  },
  {
    id: "tim-draper",
    name: "Tim Draper",
    logo: "/assets/icons/tim%20draper.jpg",
    category: "Venture Capital",
    metric: "15M+ Global Views",
  },
  {
    id: "ambani",
    name: "Ambani",
    logo: "/assets/icons/ambani.jpg",
    category: "Businessman",
    metric: "100M+ Campaign Reach",
  },
];

interface LogoStyleConfig {
  bg: string;
  imgClass: string;
}

const LOGO_CONFIGS: Record<string, LogoStyleConfig> = {
  "traders-paradise": {
    bg: "bg-black",
    imgClass: "object-cover scale-[1.18] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
  },
  "slay-point": {
    bg: "bg-[#F9FC65]",
    imgClass: "object-cover scale-[1.04]",
  },
  "think-school": {
    bg: "bg-[#060606]",
    imgClass: "object-cover scale-[1.18] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]",
  },
  be10x: {
    bg: "bg-white",
    imgClass: "object-contain scale-[1.08] p-1",
  },
  nxtwave: {
    bg: "bg-white",
    imgClass: "object-cover scale-[1.22]",
  },
  nillons: {
    bg: "bg-white",
    imgClass: "object-contain scale-[1.18] p-0.5",
  },
  "tai-lopez": {
    bg: "bg-[#151922]",
    imgClass: "object-cover object-[center_15%] scale-[1.15]",
  },
  anthropic: {
    bg: "bg-[#D7785C]",
    imgClass: "object-contain scale-[1.1] p-0.5",
  },
  emergent: {
    bg: "bg-black",
    imgClass: "object-cover scale-[1.06]",
  },
  "tim-draper": {
    bg: "bg-[#1c2230]",
    imgClass: "object-cover object-[center_16%] scale-[1.3]",
  },
  ambani: {
    bg: "bg-black",
    imgClass: "object-cover object-[center_12%] scale-100",
  },
};

function LogoVessel({ src, alt, id }: { src: string; alt: string; id?: string }) {
  const config = (id && LOGO_CONFIGS[id]) || {
    bg: "bg-black",
    imgClass: "object-cover",
  };

  return (
    <div className="relative shrink-0 w-11 h-11 rounded-[0.875rem] p-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.4)]">
      <div
        className={cn(
          "w-full h-full rounded-[calc(0.875rem-1px)] flex items-center justify-center overflow-hidden p-0",
          config.bg
        )}
      >
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full select-none", config.imgClass)}
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
  const row1 = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];
  const row2 = [
    ...CLIENT_LOGOS.slice(6),
    ...CLIENT_LOGOS.slice(0, 6),
    ...CLIENT_LOGOS,
    ...CLIENT_LOGOS,
  ];

  return (
    <section
      id="clients"
      className="relative w-full pt-3 sm:pt-4 lg:pt-6 pb-6 sm:pb-8 lg:pb-10 bg-[#090e14] overflow-hidden select-none z-20 isolate"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-8 sm:h-10 bg-gradient-to-b from-[#090e14] to-transparent z-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-10 sm:h-14 bg-gradient-to-t from-[#090e14] to-transparent z-10"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-display text-2xl sm:text-3xl md:text-[2.65rem] font-medium tracking-[-0.03em] leading-tight text-[#F0ECDD]">
            Trusted by High-Output{" "}
            <span className="relative inline-block text-frost font-semibold">
              Creators & Founders
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-2 -bottom-1 h-3 bg-frost/20 blur-md rounded-full -z-10"
              />
            </span>
          </h2>
        </div>

        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
          <div className="flex gap-4 sm:gap-6 py-2.5 w-max animate-[marquee_18s_linear_infinite] md:animate-[marquee_32s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {row1.map((client, idx) => (
              <div
                key={`${client.id}-r1-${idx}`}
                className="group relative p-[1.5px] rounded-[1.25rem] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-transparent ring-1 ring-white/[0.08] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.7)] transition-all duration-500 ease-gentle hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:from-frost/40 hover:via-white/[0.12] hover:ring-frost/30 shrink-0 cursor-default"
              >
                <div className="rounded-[calc(1.25rem-1.5px)] bg-gradient-to-b from-[#131b28]/95 via-[#0b1019]/95 to-[#070b12] px-4 py-3 flex items-center gap-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                  <LogoVessel src={client.logo} alt={client.name} id={client.id} />
                  <h3 className="font-display text-[13px] sm:text-sm font-semibold tracking-[-0.01em] text-[#F0ECDD] group-hover:text-frost transition-colors duration-300 pr-1">
                    {client.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden mt-3 sm:mt-5 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
          <div className="flex gap-4 sm:gap-6 py-2.5 w-max animate-[marquee-reverse_20s_linear_infinite] md:animate-[marquee-reverse_36s_linear_infinite] hover:[animation-play-state:paused] will-change-transform">
            {row2.map((client, idx) => (
              <div
                key={`${client.id}-r2-${idx}`}
                className="group relative p-[1.5px] rounded-[1.25rem] bg-gradient-to-b from-white/[0.10] via-white/[0.03] to-transparent ring-1 ring-white/[0.06] shadow-[0_8px_30px_-6px_rgba(0,0,0,0.7)] transition-all duration-500 ease-gentle hover:scale-[1.02] active:scale-[0.98] hover:-translate-y-0.5 hover:from-frost/40 hover:via-white/[0.12] hover:ring-frost/30 shrink-0 cursor-default"
              >
                <div className="rounded-[calc(1.25rem-1.5px)] bg-gradient-to-b from-[#101724]/90 via-[#090d16]/95 to-[#060910] px-4 py-3 flex items-center gap-3.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
                  <LogoVessel src={client.logo} alt={client.name} id={client.id} />
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
