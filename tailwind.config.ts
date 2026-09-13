import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
      },
      colors: {
        background: "var(--bg)",
        surface: "var(--surface)",
        border: "rgba(139, 163, 197, 0.16)",
        foreground: "var(--text-primary)",
        muted: "var(--text-muted)",
        accent: "var(--accent)",
        accentMuted: "rgba(73, 91, 125, 0.6)",
        frost: "var(--frost-blue)",
        steel: "var(--steel)",
        storm: "var(--surface)",
        oxford: "var(--bg)",
        moonlight: "var(--text-primary)",
      },
      fontFamily: {
        sans: ["var(--font-display)", "'Space Grotesk'", "sans-serif"],
        display: ["var(--font-display)", "'Space Grotesk'", "sans-serif"],
        body: ["var(--font-body)", "'Space Grotesk'", "sans-serif"],
        agency: ["'Space Grotesk'", "sans-serif"],
        serif: ["'Space Grotesk'", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
