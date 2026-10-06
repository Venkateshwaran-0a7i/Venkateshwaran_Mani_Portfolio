/** scrollState.ts — shared mutable scroll progress object.
 *
 * This is intentionally NOT React state. Writing to React state inside
 * ScrollTrigger callbacks would trigger re-renders every frame, which would
 * be catastrophic for performance. The camera rig reads this plain object
 * inside useFrame(), which runs off the React lifecycle.
 */
export const scrollState = { progress: 0 };
