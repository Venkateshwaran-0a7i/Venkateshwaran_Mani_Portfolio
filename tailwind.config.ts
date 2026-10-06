import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#2563eb",
          foreground: "#ffffff",
          dark: "#1d4ed8",
          light: "#3b82f6",
        },
        secondary: {
          DEFAULT: "#0f172a",
          foreground: "#f8fafc",
        },
        accent: {
          DEFAULT: "#38bdf8",
          purple: "#a855f7",
          cyan: "#06b6d4",
          emerald: "#10b981",
        },
        dark: {
          bg: "#090d16",
          card: "rgba(15, 23, 42, 0.75)",
          border: "rgba(255, 255, 255, 0.1)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-outfit)", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8), 0 0 30px rgba(168, 85, 247, 0.6)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(168, 85, 247, 0.15) 50%, rgba(6, 182, 212, 0.15) 100%)",
        "card-glass": "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
      }
    },
  },
  plugins: [],
};

export default config;
