"use client";

/**
 * Magnetic — wraps a child so it is gently pulled toward the cursor.
 * Also tags the wrapper `data-magnetic` so CustomCursor expands over it.
 * Disabled automatically for coarse pointers / reduced motion.
 */

import { useRef, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export default function Magnetic({ children, strength = 0.3, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  const enabled = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transition = "transform 0.12s linear";
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      data-magnetic
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
