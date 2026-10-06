/**
 * Core.tsx — pulsing wireframe "neural core" with pointer parallax.
 *
 * Architecture notes:
 * - Uses useFrame() for all animation — never setState inside.
 * - Reads pointerState (plain mutable object) for parallax — no event listeners here.
 * - Geometries are re-used across the two icosahedron shells.
 * - On unmount, geometries and materials are disposed to free GPU memory.
 */
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pointerState } from "./pointerState";
import { PULSE_FREQUENCY } from "./config";

export default function Core() {
  const group = useRef<THREE.Group>(null!);

  // Cache geometry and material refs for disposal on unmount
  const outerGeo = useRef(new THREE.IcosahedronGeometry(1.6, 2));
  const innerGeo = useRef(new THREE.IcosahedronGeometry(1.6, 1));
  const sphereGeo = useRef(new THREE.SphereGeometry(1.6, 24, 24));
  const outerMat = useRef(
    new THREE.MeshBasicMaterial({
      color: "#22c55e",
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    })
  );
  const innerMat = useRef(
    new THREE.MeshBasicMaterial({
      color: "#ef4444",
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    })
  );
  const sphereMat = useRef(
    new THREE.MeshBasicMaterial({ color: "#ffffff" })
  );

  useEffect(() => {
    // Dispose GPU resources on unmount
    return () => {
      outerGeo.current.dispose();
      innerGeo.current.dispose();
      sphereGeo.current.dispose();
      outerMat.current.dispose();
      innerMat.current.dispose();
      sphereMat.current.dispose();
    };
  }, []);

  useFrame((state, dt) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Slow Y-axis rotation + gentle X wobble
    group.current.rotation.y += dt * 0.15;
    group.current.rotation.x = Math.sin(t * 0.3) * 0.15;

    // Heartbeat scale pulse: PULSE_FREQUENCY rad/s ≈ 0.35 Hz
    const pulse = 1 + Math.sin(t * PULSE_FREQUENCY) * 0.04;
    group.current.scale.setScalar(pulse);

    // Pointer parallax — smooth lerp toward pointer position
    // pointerState is written in App.tsx via a global mousemove listener
    group.current.position.x +=
      (pointerState.x * 0.6 - group.current.position.x) * Math.min(1, dt * 3);
    group.current.position.y +=
      (pointerState.y * 0.4 - group.current.position.y) * Math.min(1, dt * 3);
  });

  return (
    <group ref={group}>
      {/* Outer shell — green wireframe icosahedron, detail 2 */}
      <mesh geometry={outerGeo.current} material={outerMat.current} />

      {/* Inner shell — red wireframe icosahedron, detail 1, 70% scale */}
      <mesh
        geometry={innerGeo.current}
        material={innerMat.current}
        scale={0.7}
      />

      {/* Solid white sphere — the "core" */}
      <mesh geometry={sphereGeo.current} material={sphereMat.current} scale={0.25} />
    </group>
  );
}
