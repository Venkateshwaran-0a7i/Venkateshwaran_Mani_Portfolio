/**
 * Scene.tsx — R3F Canvas wrapper with bloom effects and lite-mode support.
 *
 * This component is lazy-loaded from App.tsx so the HTML sections paint
 * before any 3D code is parsed or executed.
 *
 * Architecture notes:
 * - `lite` prop disables bloom, reduces dpr, and lowers particle count.
 * - Canvas has `pointerEvents: none` so HTML sections remain clickable.
 * - `eventSource={document.body}` + `eventPrefix="client"` lets R3F still
 *   track pointer position for the Core parallax even with pointerEvents off.
 * - `frameloop="demand"` is intentionally NOT used: the camera lerps continuously.
 */
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Core from "./Core";
import Particles from "./Particles";
import CameraRig from "./CameraRig";
import { PARTICLE_COUNT_FULL, PARTICLE_COUNT_LITE, BLOOM_INTENSITY, BLOOM_LUMINANCE_THRESHOLD } from "./config";

interface SceneProps {
  lite: boolean;
}

export default function Scene({ lite }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={lite ? 1 : [1, 1.75]}
      gl={{
        antialias: !lite,
        powerPreference: "high-performance",
        // Preserve the drawing buffer so a context-loss handler can capture it
        preserveDrawingBuffer: false,
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
      // Route pointer events from the document body so Core parallax works
      // even though pointerEvents is "none" on the canvas itself
      eventSource={document.body as HTMLElement}
      eventPrefix="client"
      aria-hidden="true"
    >
      {/* Scene background — matches --bg token */}
      <color attach="background" args={["#050505"]} />

      {/* Fog gives depth and hides particles at the edge of the frustum */}
      <fog attach="fog" args={["#050505", 8, 28]} />

      <Core />
      <Particles count={lite ? PARTICLE_COUNT_LITE : PARTICLE_COUNT_FULL} />
      <CameraRig />

      {/* Bloom is expensive — skip in lite mode */}
      {!lite && (
        <EffectComposer>
          <Bloom
            intensity={BLOOM_INTENSITY}
            luminanceThreshold={BLOOM_LUMINANCE_THRESHOLD}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
