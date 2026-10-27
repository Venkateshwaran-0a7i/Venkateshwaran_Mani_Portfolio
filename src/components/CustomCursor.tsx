"use client";

/**
 * CustomCursor — lerp-following ring + instant dot.
 * - Expands over [data-magnetic], links, buttons and form fields.
 * - Completely disabled on touch / coarse-pointer devices (never mounted
 *   into the DOM flow, native cursor is untouched).
 * - Positions are written straight to element.style.transform (no React
 *   state per frame, no filters).
 */

import { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  "[data-magnetic], a[href], button, [role='button'], input, textarea, select, label";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const html = document.documentElement;
    html.classList.add("has-cursor");

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let seen = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!seen) {
        seen = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        ring.classList.add("is-on");
        dot.classList.add("is-on");
      }
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;

      const t = e.target as Element | null;
      ring.classList.toggle("is-hover", !!t?.closest?.(HOVER_SELECTOR));
    };
    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => {
      ring.classList.remove("is-on");
      dot.classList.remove("is-on");
      seen = false;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      ringPos.x += (pos.x - ringPos.x) * 0.16;
      ringPos.y += (pos.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x.toFixed(1)}px, ${ringPos.y.toFixed(1)}px, 0)`;
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    html.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      html.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
