"use client";

import React from "react";
import { cn } from "@/lib/utils";

// Types
export interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface DockIcon {
  src: string;
  alt: string;
  onClick?: () => void;
}

export interface LiquidGlassButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  className?: string;
  variant?: "dark" | "light" | "frost" | "accent";
  size?: "sm" | "default" | "lg";
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  "data-reveal"?: boolean | string;
  ariaLabel?: string;
}

// SVG Filter Component (Always in the DOM for GPU displacement and refraction)
export const GlassFilter: React.FC = () => (
  <svg
    aria-hidden="true"
    className="pointer-events-none absolute w-0 h-0 overflow-hidden opacity-0"
    style={{ position: "absolute", width: 0, height: 0 }}
  >
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1.2"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="120"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

// Glass Effect Wrapper Component
export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
  onClick,
}) => {
  const glassStyle = {
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.08)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.8)",
    ...style,
  };

  const content = (
    <div
      className={cn(
        "relative flex font-semibold overflow-hidden cursor-pointer transition-all duration-500",
        className
      )}
      style={glassStyle}
      onClick={onClick}
    >
      {/* Glass Distortion Layer */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      {/* Glass Tint Layer */}
      <div
        className="absolute inset-0 z-10 rounded-inherit pointer-events-none"
        style={{ background: "rgba(255, 255, 255, 0.22)" }}
      />
      {/* Specular Inner Edge Shadow */}
      <div
        className="absolute inset-0 z-20 rounded-inherit overflow-hidden pointer-events-none"
        style={{
          boxShadow:
            "inset 1.5px 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.35)",
        }}
      />

      {/* Content */}
      <div className="relative z-30 flex items-center justify-center w-full">{children}</div>
    </div>
  );

  return href ? (
    <a href={href} target={target} rel="noopener noreferrer" className="block">
      {content}
    </a>
  ) : (
    content
  );
};

// Reusable Production Liquid Glass Button
export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  children,
  href,
  onClick,
  className = "",
  variant = "frost",
  size = "default",
  target,
  rel,
  disabled = false,
  type = "button",
  style = {},
  "data-reveal": dataReveal,
  ariaLabel,
}) => {
  // Size-specific styling
  const sizeStyles = {
    sm: "h-9 px-4 sm:px-5 py-1 text-xs tracking-tight rounded-full",
    default: "h-11 sm:h-12 px-6 sm:px-7 py-2 text-xs sm:text-sm tracking-tight rounded-full",
    lg: "h-13 sm:h-15 px-8 sm:px-10 py-3.5 text-sm sm:text-base tracking-normal rounded-full",
  };

  // Variant-specific styling
  const variantStyles = {
    // Dark Liquid Glass: For light backgrounds (e.g. Hero section)
    dark: {
      background: "#111111",
      textColor: "text-[#F0ECDD] group-hover:text-white",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22), 0 2px 6px rgba(0, 0, 0, 0.15)",
      innerBorder:
        "inset 1.5px 1.5px 1px 0 rgba(255, 255, 255, 0.45), inset -1px -1px 1px 0.5px rgba(0, 0, 0, 0.8)",
      glow: "group-hover:shadow-[0_0_24px_rgba(0,56,226,0.35),0_10px_30px_rgba(0,0,0,0.3)]",
    },
    // Frost Liquid Glass: Ultra-luxurious frosted glass for dark backgrounds
    frost: {
      background: "rgba(255, 255, 255, 0.14)",
      textColor: "text-[#F0ECDD] group-hover:text-white",
      boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(139, 163, 197, 0.15)",
      innerBorder:
        "inset 1.5px 1.5px 1px 0 rgba(255, 255, 255, 0.65), inset -1.5px -1.5px 1px 0.5px rgba(255, 255, 255, 0.25)",
      glow: "group-hover:shadow-[0_0_32px_rgba(139,163,197,0.35),0_12px_36px_rgba(0,0,0,0.5)]",
    },
    // Light Liquid Glass: Pure crystalline white glass
    light: {
      background: "rgba(255, 255, 255, 0.9)",
      textColor: "text-[#111111] group-hover:text-black",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12), 0 0 16px rgba(0, 0, 0, 0.04)",
      innerBorder:
        "inset 1.5px 1.5px 1px 0 rgba(255, 255, 255, 1), inset -1px -1px 1px 0.5px rgba(0, 0, 0, 0.1)",
      glow: "group-hover:shadow-[0_0_28px_rgba(0,56,226,0.2),0_10px_32px_rgba(0,0,0,0.15)]",
    },
    // Accent Liquid Glass: Electric royal blue liquid
    accent: {
      background: "rgba(0, 56, 226, 0.9)",
      textColor: "text-white",
      boxShadow: "0 8px 28px rgba(0, 56, 226, 0.35), 0 0 16px rgba(0, 56, 226, 0.2)",
      innerBorder:
        "inset 1.5px 1.5px 1px 0 rgba(255, 255, 255, 0.6), inset -1px -1px 1px 0.5px rgba(0, 0, 0, 0.3)",
      glow: "group-hover:shadow-[0_0_36px_rgba(0,56,226,0.55),0_12px_36px_rgba(0,56,226,0.3)]",
    },
  }[variant];

  const content = (
    <div
      className={cn(
        "group relative inline-flex items-center justify-center font-display font-semibold select-none cursor-pointer overflow-hidden transition-all duration-300 active:scale-[0.97]",
        sizeStyles[size],
        variantStyles.textColor,
        variantStyles.glow,
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      style={{
        backgroundColor: variantStyles.background,
        boxShadow: variantStyles.boxShadow,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
      data-reveal={dataReveal}
    >
      {/* 1. Liquid Glass Refraction Layer (GPU Displacement) */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-inherit pointer-events-none"
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />

      {/* 2. Glass Base Tint Layer */}
      <div
        className="absolute inset-0 z-10 rounded-inherit transition-all duration-300 pointer-events-none"
        style={{ backgroundColor: variantStyles.background }}
      />

      {/* 3. Specular Inner Edge Highlight & Sheen */}
      <div
        className="absolute inset-0 z-20 rounded-inherit pointer-events-none transition-opacity duration-300"
        style={{
          boxShadow: variantStyles.innerBorder,
        }}
      />

      {/* 4. Ambient Liquid Sweep Shine on Hover */}
      <div
        className="absolute -inset-full z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/15 to-transparent rotate-12 translate-x-[-50%] group-hover:translate-x-[50%] transition-transform duration-1000 ease-out"
      />

      {/* 5. Button Children / Label Content */}
      <div className="relative z-30 inline-flex items-center justify-center gap-2 whitespace-nowrap">
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        onClick={onClick}
        aria-label={ariaLabel}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="inline-block bg-transparent border-0 p-0 m-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0038E2] rounded-full"
    >
      {content}
    </button>
  );
};

// Backwards-compatible GlassButton wrapper
export const GlassButton: React.FC<LiquidGlassButtonProps> = (props) => {
  return <LiquidGlassButton {...props} />;
};

// Dock Component
export const GlassDock: React.FC<{ icons: DockIcon[]; href?: string }> = ({
  icons,
  href,
}) => (
  <GlassEffect
    href={href}
    className="rounded-3xl p-3 hover:p-4 hover:rounded-4xl"
  >
    <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
      {icons.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt={icon.alt}
          className="w-16 h-16 transition-all duration-700 hover:scale-110 cursor-pointer"
          style={{
            transformOrigin: "center center",
            transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
          }}
          onClick={icon.onClick}
        />
      ))}
    </div>
  </GlassEffect>
);

// Main Demo Component
export const Component = () => {
  const dockIcons: DockIcon[] = [
    {
      src: "https://cdn.21st.dev/assets/mirror/8d/8d2757d81dfac86570f4c8836c7406741afce9309493d7d32a5176dfb48604b6.png",
      alt: "Claude",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/a7/a7f5c3a20ee7e3979c200ae2de37dee2396d7b2eae8da7c5c294b1f308f8ebe3.png",
      alt: "Finder",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/06/06182c64d1993c122cceffea2e27a04c36a824f54b4a01163547b77f197f37bc.png",
      alt: "Chatgpt",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/b4/b4b6b0474a5074704d0f627855076899d0f1ab61685645103d3839d56297a93a.png",
      alt: "Maps",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/c2/c208bfbd8c5ceaf0d16c20f77f769600c3ee2c3084934bb74273f348948dc192.png",
      alt: "Safari",
    },
    {
      src: "https://cdn.21st.dev/assets/mirror/ce/ce6c5811b78662b15db06143f35dca896cd78790a05e2f652a921d0c18fbc166.png",
      alt: "Steam",
    },
  ];

  return (
    <div
      className="min-h-screen h-full flex items-center justify-center font-light relative overflow-hidden w-full"
      style={{
        background: `url("https://cdn.21st.dev/assets/mirror/17/171c1b4f04924b3d3783eb3181616526d023c11de774861827927a3a863094f9.jpg") center center`,
        animation: "moveBackground 60s linear infinite",
      }}
    >
      <GlassFilter />

      <div className="flex flex-col gap-6 items-center justify-center w-full">
        <GlassDock icons={dockIcons} href="https://x.com/notsurajgaud" />

        <LiquidGlassButton
          href="https://x.com/notsurajgaud"
          size="lg"
          variant="frost"
          className="rounded-3xl px-10 py-6"
        >
          <div className="text-xl text-white">
            <p>How can i help you today?</p>
          </div>
        </LiquidGlassButton>
      </div>
    </div>
  );
};

export default Component;
