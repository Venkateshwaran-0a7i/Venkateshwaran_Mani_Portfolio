/** pointerState.ts — shared mutable pointer position for Core parallax.
 *
 * Same pattern as scrollState: a plain mutable object read inside useFrame()
 * so the Core component can react to pointer movement without React re-renders.
 */
export const pointerState = { x: 0, y: 0 };
