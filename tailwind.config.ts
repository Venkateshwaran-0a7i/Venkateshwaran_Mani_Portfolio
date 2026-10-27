import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#030303",
        surface: "#090909",
        accent: "#c40024",
        bright: "#e0002a",
        neon: "#ff3b5c",
        ink: "#f5f5f5",
        ok: "#18e08a",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "Impact", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.7)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        blink: { "50%": { opacity: "0" } },
      },
      animation: {
        "pulse-ring": "pulseRing 2.2s cubic-bezier(0.2,0.6,0.3,1) infinite",
        blink: "blink 1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
