import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#111009",
          soft: "#4a4740",
          muted: "#9a9590",
        },
        paper: "#faf9f7",
        terra: {
          DEFAULT: "#c4683a",
          light: "#e8855a",
          "2": "#e07848",
          pale: "#f5ede7",
        },
        sage: {
          DEFAULT: "#3d5244",
          light: "#f0f4f1",
        },
        dust: "#e8e2d8",
        rule: "#ede8e0",
        gray: "#6b6560",
        lgray: "#b0a898",
        green: "#2d7a4f",
        "green-bg": "#e8f5ee",
        amber: "#a07020",
        "amber-bg": "#fff5e0",
        red: "#a03020",
        "red-bg": "#fff0ee",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": [
          "clamp(48px, 7vw, 96px)",
          { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "900" },
        ],
        "display-lg": [
          "clamp(36px, 5vw, 64px)",
          { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "900" },
        ],
        "display-md": [
          "clamp(28px, 3.5vw, 44px)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease both",
        "fade-in": "fadeIn 0.5s ease both",
      },
    },
  },
  plugins: [],
};
export default config;
