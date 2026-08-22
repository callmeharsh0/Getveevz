export const COLORS = {
  // Brand Dark & Blue Theme Tokens
  obsidian: "#050508",       // Primary background
  midnight: "#111827",       // Secondary background / cards / sections
  cobalt: "#2563EB",         // Primary brand blue — CTAs, highlights, links
  sky: "#38BDF8",            // Accent blue — glows, gradients, hover states
  ice: "#F1F5F9",            // Primary text on dark backgrounds

  // Semantic mappings
  bg: "#050508",
  bgSoft: "#111827",
  surface: "#111827",
  surfaceLight: "#1F2937",
  text: "#F1F5F9",
  textMuted: "rgba(241, 245, 249, 0.65)",
  accent: "#2563EB",
  accentSky: "#38BDF8",
  accentSoft: "rgba(37, 99, 235, 0.2)",
  borderSubtle: "rgba(241, 245, 249, 0.1)",
  borderAccent: "rgba(37, 99, 235, 0.4)",
  gradientBrand: "linear-gradient(135deg, #2563EB, #38BDF8)",
  gradientGlow: "radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(56, 189, 248, 0.06) 50%, transparent 70%)",
};

export const FONTS = {
  display: "var(--font-display)",
  sans: "var(--font-sans)",
  body: "var(--font-sans)",
  serifAccent: "var(--font-serif-accent)",
  mono: "var(--font-mono)",
};

export const EASE = {
  premium: "power3.out",
  settle: "back.out(1.2)",
  smooth: "power2.inOut",
};

export const MOTION_EASE = [0.16, 1, 0.3, 1]; // expo-out — the awwwards standard
