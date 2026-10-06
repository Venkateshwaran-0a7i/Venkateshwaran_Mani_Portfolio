/**
 * Particles.tsx — spherical particle field around the neural core.
 *
 * Architecture notes:
 * - Positions generated ONCE in useMemo into a Float32Array — never recreated.
 * - Animation via useFrame() ref mutation only — no setState.
 * - BufferGeometry and PointsMaterial disposed on unmount.
 * - count prop lets the parent switch between full (2500) and lite (900) modes.
 */
import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PARTICLE_RADIUS_INNER, PARTICLE_RADIUS_OUTER } from "./config";

interface ParticlesProps {
  count: number;
}

export default function Particles({ count }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const geoRef = useRef<THREE.BufferGeometry>(null!);
  const matRef = useRef<THREE.PointsMaterial>(null!);

  // Generate positions once using spherical coordinates for a natural distribution
  const positions = useMemo<Float32Array>(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r =
        PARTICLE_RADIUS_INNER +
        Math.random() * (PARTICLE_RADIUS_OUTER - PARTICLE_RADIUS_INNER);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1); // uniform on sphere surface
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useEffect(() => {
    // Dispose GPU resources on unmount
    return () => {
      geoRef.current?.dispose();
      matRef.current?.dispose();
    };
  }, []);

  // Slow rotation — no state writes
  useFrame((_, dt) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += dt * 0.02;
    pointsRef.current.rotation.x += dt * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
