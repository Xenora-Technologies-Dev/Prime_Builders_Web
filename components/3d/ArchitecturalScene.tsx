"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Grid } from "@react-three/drei";
import * as THREE from "three";
import { SITE_COLORS } from "@/lib/theme";
import { PrimePlusLogo3D } from "@/components/3d/PrimePlusLogo3D";

function WindowGrid({
  width,
  height,
  depth,
  cols = 4,
  rows = 10,
}: {
  width: number;
  height: number;
  depth: number;
  cols?: number;
  rows?: number;
}) {
  const lights = useMemo(() => {
    const items: { x: number; y: number; lit: boolean }[] = [];
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        items.push({
          x: -width / 2 + ((c + 0.5) / cols) * width,
          y: -height / 2 + ((r + 0.5) / rows) * height,
          lit: Math.random() > 0.55,
        });
      }
    }
    return items;
  }, [width, height, cols, rows]);

  return (
    <group position={[0, 0, depth / 2 + 0.01]}>
      {lights.map((w, i) =>
        w.lit ? (
          <mesh key={i} position={[w.x, w.y, 0]}>
            <planeGeometry args={[width / cols - 0.08, height / rows - 0.1]} />
            <meshStandardMaterial
              color="#f0d9a0"
              emissive="#e8c878"
              emissiveIntensity={0.55}
              transparent
              opacity={0.75}
            />
          </mesh>
        ) : null,
      )}
    </group>
  );
}

function Tower({
  position,
  size,
  accent = false,
}: {
  position: [number, number, number];
  size: [number, number, number];
  accent?: boolean;
}) {
  const [w, h, d] = size;
  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshPhysicalMaterial
          color={accent ? "#0d3a68" : "#0a2f56"}
          metalness={0.62}
          roughness={0.22}
          clearcoat={0.35}
          clearcoatRoughness={0.3}
          envMapIntensity={1.15}
        />
      </mesh>
      <WindowGrid width={w * 0.88} height={h * 0.88} depth={d} cols={3} rows={Math.max(6, Math.floor(h * 2.2))} />
      {[
        [w / 2, h / 2, d / 2],
        [-w / 2, h / 2, d / 2],
        [w / 2, h / 2, -d / 2],
        [-w / 2, h / 2, -d / 2],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <boxGeometry args={[0.04, h, 0.04]} />
          <meshStandardMaterial color={SITE_COLORS.steel} metalness={0.95} roughness={0.18} />
        </mesh>
      ))}
    </group>
  );
}

function Platforms() {
  return (
    <>
      <mesh position={[0, 0.04, 0.4]} receiveShadow>
        <boxGeometry args={[11, 0.08, 7]} />
        <meshStandardMaterial color="#071d36" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[2.8, 0.12, 2.2]} receiveShadow>
        <boxGeometry args={[3.2, 0.08, 1.8]} />
        <meshStandardMaterial color="#0a2748" metalness={0.55} roughness={0.35} />
      </mesh>
    </>
  );
}

function FloatingShards({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
    group.current.position.y = 2.2 + progress * 0.4;
  });

  return (
    <group ref={group}>
      {[
        [3.8, 1.2, -1.5],
        [-3.2, 2.4, -0.8],
        [2.2, 3.6, 1.8],
        [-2.6, 0.9, 2.2],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0.4, 0.2 * i, 0.1]}>
          <boxGeometry args={[0.35, 0.08, 0.55]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? SITE_COLORS.gold500 : SITE_COLORS.steel}
            metalness={0.9}
            roughness={0.2}
            emissive={i % 2 === 0 ? SITE_COLORS.gold500 : "#000000"}
            emissiveIntensity={i % 2 === 0 ? 0.25 : 0}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ count = 70 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color={SITE_COLORS.gold400}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface ArchitecturalSceneProps {
  reducedMotion?: boolean;
  scrollProgress?: number;
  goldIntensity?: number;
}

export function ArchitecturalScene({
  reducedMotion = false,
  scrollProgress = 0,
  goldIntensity = 0.35,
}: ArchitecturalSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const goldLight = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    if (!reducedMotion) {
      const t = state.clock.elapsedTime;
      groupRef.current.rotation.y =
        Math.sin(t * 0.06) * 0.06 + scrollProgress * 0.18;
      groupRef.current.position.y = Math.sin(t * 0.28) * 0.04;
    }
    if (goldLight.current) {
      goldLight.current.intensity = 1.2 + goldIntensity * 2.4;
    }
  });

  // Reveal secondary towers as scroll progresses
  const secondaryScale = 0.85 + scrollProgress * 0.15;

  return (
    <group ref={groupRef}>
      <fog attach="fog" args={["#0a1f3a", 12, 32]} />

      <ambientLight intensity={0.7} color="#c5d6eb" />
      <hemisphereLight args={["#e8f0fa", "#041A35", 0.75]} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.85}
        color="#fff6e4"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 4, -4]} intensity={0.55} color="#8eb4e0" />
      <spotLight
        ref={goldLight}
        position={[-4, 10, 4]}
        angle={0.55}
        penumbra={0.6}
        intensity={1.6}
        color={SITE_COLORS.gold400}
        castShadow
      />
      <pointLight position={[0, 7.2, 0]} intensity={0.7 + goldIntensity} color={SITE_COLORS.gold500} />
      <pointLight position={[4, 3, 5]} intensity={0.8} color="#9ec0e8" />

      <Grid
        position={[0, 0, 0]}
        args={[28, 28]}
        cellSize={0.55}
        cellThickness={0.45}
        cellColor="#1d4a78"
        sectionSize={2.75}
        sectionThickness={0.9}
        sectionColor="#C6922E"
        fadeDistance={20}
        fadeStrength={1.15}
        infiniteGrid
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial
          color="#062038"
          metalness={0.4}
          roughness={0.55}
          transparent
          opacity={0.9}
        />
      </mesh>

      <Float speed={0.28} rotationIntensity={0.025} floatIntensity={0.08}>
        <group position={[0.15, 0.15, 0]}>
          <Platforms />
          {/* Official mark reconstructed in 3D — focal element */}
          <PrimePlusLogo3D
            position={[0.1, 0.35, 0.4]}
            scale={1.05}
            reducedMotion={reducedMotion}
          />

          <group scale={[secondaryScale, secondaryScale, secondaryScale]}>
            <Tower position={[-3.2, 0, 0.4]} size={[1.05, 3.6, 1.05]} />
            <Tower position={[3.35, 0, 0.2]} size={[1.25, 2.9, 1.1]} />
            <Tower position={[-2.2, 0, 2.1]} size={[1.4, 2.1, 0.85]} />
            <Tower position={[2.4, 0, 2.2]} size={[0.9, 1.8, 0.9]} />
          </group>
        </group>
      </Float>

      {!reducedMotion && (
        <>
          <FloatingShards progress={scrollProgress} />
          <Particles count={64} />
        </>
      )}
    </group>
  );
}
