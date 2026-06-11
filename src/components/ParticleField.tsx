'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

function Galaxy() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 4000;
    const arr = new Float32Array(count * 3);
    const branches = 4;
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 5;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = radius * 0.8;
      const randomX = (Math.random() - 0.5) * 0.6 * (1 - radius / 6);
      const randomY = (Math.random() - 0.5) * 0.3 * (1 - radius / 6);
      const randomZ = (Math.random() - 0.5) * 0.6 * (1 - radius / 6);
      arr[i * 3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      arr[i * 3 + 1] = randomY;
      arr[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <points ref={ref} position={[0, -1.2, -4]} rotation={[0.6, 0, 0.15]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#c084fc"
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ParallaxGroup({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ pointer }) => {
    if (ref.current) {
      ref.current.rotation.y += (pointer.x * 0.2 - ref.current.rotation.y) * 0.05;
      ref.current.rotation.x += (-pointer.y * 0.15 - ref.current.rotation.x) * 0.05;
    }
  });

  return <group ref={ref}>{children}</group>;
}

export default function ParticleField() {
  return (
    <ParallaxGroup>
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={1} />
      <Galaxy />
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh position={[3, 1, -3]}>
          <torusKnotGeometry args={[0.9, 0.25, 120, 24]} />
          <meshBasicMaterial wireframe color="#a855f7" transparent opacity={0.12} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[-3.5, -1.5, -4]}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshBasicMaterial wireframe color="#ec4899" transparent opacity={0.1} />
        </mesh>
      </Float>
    </ParallaxGroup>
  );
}
