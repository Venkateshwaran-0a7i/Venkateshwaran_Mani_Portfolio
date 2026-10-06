/**
 * config.ts — all scene constants in one place.
 * Adjust camera waypoints, particle counts or bloom here without touching components.
 */
import * as THREE from "three";

// ─── Scene constants ────────────────────────────────────────────────────────

/** Full-quality particle count (desktop / high-end GPU). */
export const PARTICLE_COUNT_FULL = 2500;

/** Lite-mode particle count (narrow viewport or low CPU). */
export const PARTICLE_COUNT_LITE = 900;

/** Bloom effect intensity — keep ≤ 1.2 so text stays readable. */
export const BLOOM_INTENSITY = 0.9;

/** Minimum luminance for bloom to activate. */
export const BLOOM_LUMINANCE_THRESHOLD = 0.1;

/**
 * Heartbeat pulse frequency in radians per second.
 * 2.2 rad/s ≈ 0.35 Hz — a calm resting heart.
 */
export const PULSE_FREQUENCY = 2.2;

/**
 * Camera waypoints — one Vector3 per section in order:
 * Hero → About → Work → Stack → Experience → Contact
 *
 * Units are Three.js world-space units.
 * Adjust z to zoom in/out; x/y to orbit the core.
 */
export const WAYPOINTS: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 7),       // Hero — front-on
  new THREE.Vector3(-3, 1, 5.5),    // About — slight left drift
  new THREE.Vector3(3, -1, 6),      // Work — right side
  new THREE.Vector3(0, 2.5, 5),     // Stack — above
  new THREE.Vector3(-2, -2, 6),     // Experience — low left
  new THREE.Vector3(0, 0, 9),       // Contact — pull back
];

/**
 * CatmullRom spline through all waypoints.
 * CameraRig reads this each frame — constructed once, not per-render.
 */
export const CAMERA_CURVE = new THREE.CatmullRomCurve3(WAYPOINTS, false, "catmullrom", 0.5);

/** Particle spawn radii (inner/outer shell). */
export const PARTICLE_RADIUS_INNER = 6;
export const PARTICLE_RADIUS_OUTER = 20;

/** Section IDs — must match the `id` props on each <section>. */
export const SECTION_IDS = [
  "hero",
  "about",
  "work",
  "stack",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];
