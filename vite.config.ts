import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Base path for GitHub Pages — must match the repo name
  base: "/Venkateshwaran_Mani_Portfolio/",

  build: {
    // Warn if any chunk exceeds 500 KB
    chunkSizeWarningLimit: 500,

    rollupOptions: {
      output: {
        // Split vendor code into separate chunks for better caching
        manualChunks(id: string) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }
          if (
            id.includes("node_modules/three") ||
            id.includes("node_modules/@react-three")
          ) {
            return "three-vendor";
          }
          if (id.includes("node_modules/gsap") || id.includes("node_modules/lenis")) {
            return "gsap-lenis";
          }
        },
      },
    },
  },

  // Optimise dependencies
  optimizeDeps: {
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
});

