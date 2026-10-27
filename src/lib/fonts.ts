/**
 * Self-hosted fonts via next/font/local — no Google Fonts network at build time.
 * CSS variable names are unchanged so globals.css / Tailwind keep working.
 */
import localFont from "next/font/local";

export const oswald = localFont({
  src: [
    { path: "../fonts/oswald/oswald-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/oswald/oswald-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/oswald/oswald-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/oswald/oswald-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-oswald",
  display: "swap",
  preload: true,
});

export const syne = localFont({
  src: [
    { path: "../fonts/syne/syne-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/syne/syne-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/syne/syne-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/syne/syne-latin-800-normal.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-syne",
  display: "swap",
  preload: true,
});

export const space = localFont({
  src: [
    { path: "../fonts/space-grotesk/space-grotesk-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "../fonts/space-grotesk/space-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/space-grotesk/space-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/space-grotesk/space-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "../fonts/space-grotesk/space-grotesk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-space",
  display: "swap",
  preload: true,
});

export const mono = localFont({
  src: [
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});
