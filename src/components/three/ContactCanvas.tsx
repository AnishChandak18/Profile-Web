import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

export interface ContactMouse {
  nx: number; // -1 to 1 (left to right)
  ny: number; // -1 to 1 (bottom to top, Three.js convention)
}

const N = 80;
const MAX_PAIRS = (N * (N - 1)) / 2; // 3160
const CONNECT_SQ = 0.81;   // sqrt = 0.9 world units
const ATTRACT_DIST = 1.1;
const REPEL_DIST = 0.45;

function Scene({ mouseRef }: { mouseRef: React.RefObject<ContactMouse> }) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const prevLi = useRef(0);

  const positions = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 2] = 0;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 0.005;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
    }
    return arr;
  }, []);

  // Pre-allocate line buffer: 2 vertices × 3 floats × MAX_PAIRS
  const linePositions = useMemo(() => new Float32Array(MAX_PAIRS * 6), []);

  useFrame(({ size }) => {
    if (!pointsRef.current || !linesRef.current) return;

    const aspect = size.width / size.height;
    const mx = (mouseRef.current?.nx ?? 0) * aspect * 3.5;
    const my = (mouseRef.current?.ny ?? 0) * 2.25;

    const posAttr = pointsRef.current.geometry.attributes.position;
    const pos = posAttr.array as Float32Array;

    // Update particle positions
    for (let i = 0; i < N; i++) {
      const ix = i * 3, iy = i * 3 + 1;
      pos[ix] += velocities[ix];
      pos[iy] += velocities[iy];

      // Soft boundary
      if (Math.abs(pos[ix]) > 3.8) velocities[ix] *= -0.95;
      if (Math.abs(pos[iy]) > 2.5) velocities[iy] *= -0.95;

      // Cursor influence: attract far, repel close
      const dx = pos[ix] - mx;
      const dy = pos[iy] - my;
      const d = Math.hypot(dx, dy);
      if (d < ATTRACT_DIST && d > 0.01) {
        const s = d < REPEL_DIST
          ? (REPEL_DIST - d) / REPEL_DIST * 0.022   // repel
          : -(ATTRACT_DIST - d) / ATTRACT_DIST * 0.005; // attract
        pos[ix] += (dx / d) * s;
        pos[iy] += (dy / d) * s;
      }
    }
    posAttr.needsUpdate = true;

    // Build line segments (squared-distance check avoids sqrt)
    const lineAttr = linesRef.current.geometry.attributes.position;
    const lArr = lineAttr.array as Float32Array;
    let li = 0;

    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        if (dx * dx + dy * dy < CONNECT_SQ) {
          lArr[li++] = pos[i * 3];     lArr[li++] = pos[i * 3 + 1]; lArr[li++] = 0;
          lArr[li++] = pos[j * 3];     lArr[li++] = pos[j * 3 + 1]; lArr[li++] = 0;
        }
      }
    }

    // Zero out stale tail from previous frame
    const prev = prevLi.current;
    for (let k = li; k < prev; k++) lArr[k] = 0;
    prevLi.current = li;

    lineAttr.needsUpdate = true;
    linesRef.current.geometry.setDrawRange(0, li / 3);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#6366f1"
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.55}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#22d3ee" transparent opacity={0.18} />
      </lineSegments>
    </>
  );
}

const ContactCanvas: React.FC<{ mouseRef: React.RefObject<ContactMouse> }> = ({ mouseRef }) => {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Scene mouseRef={mouseRef} />
    </Canvas>
  );
};

export default ContactCanvas;
