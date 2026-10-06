/**
 * CameraRig.tsx — reads scroll progress from the shared mutable object
 * and smoothly moves the camera along the CatmullRom spline.
 *
 * Architecture notes:
 * - Reads scrollState.progress (plain object) — never React state.
 * - Uses a pre-allocated THREE.Vector3 `_pos` to avoid GC pressure per frame.
 * - Lerp factor 0.05 gives a smooth ~20-frame follow lag.
 */
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./scrollState";
import { CAMERA_CURVE } from "./config";

// Pre-allocated scratch vector — avoid new Vector3() every frame
const _pos = new THREE.Vector3();

export default function CameraRig() {
  useFrame((state) => {
    // Clamp to [0, 1] so curve.getPoint() never throws
    const t = Math.max(0, Math.min(1, scrollState.progress));
    CAMERA_CURVE.getPoint(t, _pos);
    state.camera.position.lerp(_pos, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  // CameraRig renders nothing — it's a pure side-effect component
  return null;
}
