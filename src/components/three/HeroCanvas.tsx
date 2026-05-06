import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';

interface OrbProps {
  position: [number, number, number];
  color: string;
  scale: number;
  floatSpeed: number;
  floatAmplitude: number;
  rotationSpeed: number;
  phaseOffset: number;
}

const Orb: React.FC<OrbProps> = ({
  position,
  color,
  scale,
  floatSpeed,
  floatAmplitude,
  rotationSpeed,
  phaseOffset,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const origin = useRef(new THREE.Vector3(...position));

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y =
      origin.current.y + Math.sin(t * floatSpeed + phaseOffset) * floatAmplitude;
    meshRef.current.position.x =
      origin.current.x + Math.cos(t * floatSpeed * 0.6 + phaseOffset) * floatAmplitude * 0.4;
    meshRef.current.rotation.x = t * rotationSpeed;
    meshRef.current.rotation.y = t * rotationSpeed * 0.7;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={0.15}
        roughness={0.05}
        metalness={0.2}
        transmission={0.6}
        thickness={0.5}
        envMapIntensity={0}
      />
    </mesh>
  );
};

const Ring: React.FC<{
  position: [number, number, number];
  color: string;
  scale: number;
  speed: number;
  phaseOffset: number;
}> = ({ position, color, scale, speed, phaseOffset }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * speed + phaseOffset;
    meshRef.current.rotation.y = t * speed * 0.6;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.018, 16, 120]} />
      <meshBasicMaterial color={color} transparent opacity={0.1} />
    </mesh>
  );
};

const CameraRig: React.FC = () => {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    target.current.set(mouse.x * 0.8, mouse.y * 0.4, 8);
    camera.position.lerp(target.current, 0.035);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

const Scene: React.FC = () => (
  <>
    <CameraRig />

    {/* Lighting */}
    <ambientLight intensity={0.5} color="#0d0d2b" />
    <pointLight position={[8, 8, 6]} intensity={2.5} color="#818CF8" />
    <pointLight position={[-8, -6, -4]} intensity={2} color="#22D3EE" />
    <pointLight position={[2, 6, -8]} intensity={1.2} color="#8B5CF6" />
    <pointLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />

    {/* Large orbs */}
    <Orb position={[-3.5, 1.5, -2]} color="#6366F1" scale={1.9} floatSpeed={0.6} floatAmplitude={0.35} rotationSpeed={0.15} phaseOffset={0} />
    <Orb position={[3.5, -1, -3]} color="#22D3EE" scale={1.5} floatSpeed={0.8} floatAmplitude={0.28} rotationSpeed={0.2} phaseOffset={2.1} />
    <Orb position={[0.5, 2.5, -4.5]} color="#8B5CF6" scale={1.2} floatSpeed={0.5} floatAmplitude={0.4} rotationSpeed={0.12} phaseOffset={4.2} />

    {/* Small accent orbs */}
    <Orb position={[4.8, 2.2, -1]} color="#EC4899" scale={0.65} floatSpeed={1.2} floatAmplitude={0.5} rotationSpeed={0.35} phaseOffset={1.0} />
    <Orb position={[-4.2, -2.5, -2]} color="#6366F1" scale={0.85} floatSpeed={0.9} floatAmplitude={0.4} rotationSpeed={0.25} phaseOffset={3.1} />
    <Orb position={[2.2, -3.2, -1.5]} color="#22D3EE" scale={0.55} floatSpeed={1.4} floatAmplitude={0.55} rotationSpeed={0.4} phaseOffset={5.2} />

    {/* Decorative rings */}
    <Ring position={[-3.5, 1.5, -2]} color="#818CF8" scale={2.8} speed={0.2} phaseOffset={0} />
    <Ring position={[3.5, -1, -3]} color="#22D3EE" scale={2.2} speed={0.25} phaseOffset={1.5} />
    <Ring position={[0.5, 2.5, -4.5]} color="#8B5CF6" scale={1.8} speed={0.18} phaseOffset={3.0} />
  </>
);

const HeroCanvas: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
