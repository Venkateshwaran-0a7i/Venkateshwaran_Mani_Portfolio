/**
 * PulseDivider.tsx — animated red→white→green heartbeat divider line.
 *
 * Matches the signature motif from the README header.
 * The animation is pure CSS — no JS involved — so it degrades gracefully
 * under prefers-reduced-motion (the animation is suppressed globally in CSS).
 */
export default function PulseDivider() {
  return (
    <div className="pulse-divider" role="separator" aria-hidden="true" />
  );
}
