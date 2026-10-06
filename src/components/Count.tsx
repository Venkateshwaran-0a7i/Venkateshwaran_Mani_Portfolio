/**
 * Count.tsx — count-up animation triggered when the element enters the viewport.
 *
 * Architecture notes:
 * - Uses IntersectionObserver, not a scroll event listener.
 * - setInterval is cleared immediately when the target is reached.
 * - Observer is disconnected after triggering (count-up fires once only).
 * - Respects prefers-reduced-motion by jumping straight to the final value.
 */
import { useEffect, useRef, useState } from "react";

interface CountProps {
  to: number;
  suffix: string;
  /** Aria label for screen readers to read the final value immediately. */
  label: string;
}

export default function Count({ to, suffix, label }: CountProps) {
  const [value, setValue] = useState(0);
  const elRef = useRef<HTMLSpanElement>(null!);
  const reduced = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    // Reduced motion: jump to final value immediately, no animation
    if (reduced.current) {
      setValue(to);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect(); // fire once

        let current = 0;
        const step = Math.max(1, to / 40);
        const id = setInterval(() => {
          current += step;
          if (current >= to) {
            current = to;
            clearInterval(id);
          }
          setValue(Math.round(current));
        }, 25);
      },
      { threshold: 0.5 }
    );

    if (elRef.current) io.observe(elRef.current);

    return () => {
      io.disconnect();
    };
  }, [to]);

  return (
    <span
      ref={elRef}
      aria-label={`${to}${suffix} ${label}`}
      aria-live="polite"
    >
      {value}
      {suffix}
    </span>
  );
}
