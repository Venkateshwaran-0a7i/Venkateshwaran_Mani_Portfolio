/**
 * App.tsx — root component and scroll system orchestrator.
 *
 * Architecture notes:
 * 1. Lenis is initialised once in useEffect and destroyed on unmount.
 * 2. GSAP ScrollTrigger reads from Lenis via lenis.on("scroll").
 * 3. scrollState.progress is written inside the ScrollTrigger callback —
 *    NOT as React state, so no re-renders occur on scroll.
 * 4. pointerState is written from a global mousemove listener.
 * 5. The 3D scene is lazy-loaded so HTML paints first.
 * 6. prefers-reduced-motion and lite detection happen once at module level
 *    (not inside React state) since they don't change during the session.
 * 7. Reveal animations use IntersectionObserver added once after mount.
 */
import { useEffect, Suspense, lazy } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { SceneBoundary } from "./scene/SceneBoundary";
import { scrollState } from "./scene/scrollState";
import { pointerState } from "./scene/pointerState";
import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Work from "./sections/Work";
import Stack from "./sections/Stack";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger);

// ── Environment detection (read once, not React state) ─────────────────────

/** True when the user prefers no motion — skip all 3D and CSS animations. */
const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lite profile: narrow viewport OR low CPU core count.
 * In lite mode: 900 particles, dpr=1, no bloom postprocessing.
 */
const LITE_MODE =
  typeof window !== "undefined" &&
  (window.innerWidth < 800 || navigator.hardwareConcurrency <= 4);

// ── Lazy-loaded 3D scene ───────────────────────────────────────────────────

const Scene = lazy(() => import("./scene/Scene"));

// ── Reveal utility (IntersectionObserver on .reveal elements) ─────────────

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  return io;
}

// ── App ────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    // ── Pointer state (for Core parallax) ──────────────────────────────
    const handlePointer = (e: MouseEvent) => {
      // Normalise to [-1, 1]
      pointerState.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerState.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handlePointer, { passive: true });

    if (REDUCED_MOTION) {
      // No scroll system or scene — just init reveal
      const io = initReveal();
      return () => {
        window.removeEventListener("mousemove", handlePointer);
        io.disconnect();
      };
    }

    // ── Lenis smooth scroll ─────────────────────────────────────────────
    const lenis = new Lenis({ lerp: 0.1 });

    // Keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP ticker for frame-perfect sync
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ── ScrollTrigger: write scroll progress to shared mutable object ───
    const trigger = ScrollTrigger.create({
      trigger: "#root",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // This is the ONLY place scrollState is written.
        // No setState — no re-renders.
        scrollState.progress = self.progress;
      },
    });

    // ── Reveal animations ───────────────────────────────────────────────
    const io = initReveal();

    // ── Handle tab visibility (pause Lenis when tab hidden) ────────────
    const handleVisibility = () => {
      if (document.hidden) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // ── Handle resize (refresh ScrollTrigger for new page height) ──────
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointer);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      trigger.kill();
      lenis.destroy();
      io.disconnect();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      {/* Skip to content — visible on focus, for keyboard users */}
      <a href="#hero" className="skip-link">
        Skip to content
      </a>

      {/* 3D canvas — lazy loaded, error-bounded, hidden from AT */}
      {!REDUCED_MOTION && (
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene lite={LITE_MODE} />
          </Suspense>
        </SceneBoundary>
      )}

      {/* Static gradient when reduced-motion or if scene fails */}
      {REDUCED_MOTION && (
        <div className="scene-fallback" role="presentation" aria-hidden="true" />
      )}

      {/* Navigation */}
      <Nav />

      {/* Page content */}
      <main id="main-content" style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
