"use client";

/**
 * LenisProvider — inertial smooth scrolling.
 *
 * Lenis drives the *window* scroll (no wrapper element, no overflow:hidden on
 * html/body), so `window.scrollY` stays truthful for the video scrubber.
 * Child components can pause it (modals, drawers) via `useLenis().stop()`.
 *
 * Uses the `lenis` package — the maintained successor of
 * `@studio-freight/lenis` (same API, same author).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";

interface LenisApi {
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
  stop: () => void;
  start: () => void;
}

const noop: LenisApi = {
  scrollTo: (target, offset = 0) => {
    if (typeof target === "number") {
      window.scrollTo({ top: target + offset });
    } else {
      const el =
        typeof target === "string"
          ? document.querySelector<HTMLElement>(target)
          : target;
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY + offset,
        });
      }
    }
  },
  // Without Lenis (reduced motion) native scrolling stays on; overlays are
  // fixed + overscroll-contained, so there is nothing to lock.
  stop: () => {},
  start: () => {},
};

const LenisContext = createContext<LenisApi>(noop);
export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // never hijack native touch scrolling on phones (keeps iOS momentum)
      syncTouch: false,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<LenisApi["scrollTo"]>((target, offset = 0) => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(target as never, { offset, duration: 1.4 });
    else noop.scrollTo(target, offset);
  }, []);
  const stop = useCallback(() => {
    if (lenisRef.current) lenisRef.current.stop();
    else noop.stop();
  }, []);
  const start = useCallback(() => {
    if (lenisRef.current) lenisRef.current.start();
    else noop.start();
  }, []);

  const api = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start]);

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
