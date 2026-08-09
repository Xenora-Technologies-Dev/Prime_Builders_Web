"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import * as THREE from "three";
import { SITE_COLORS } from "@/lib/theme";

/** Progress ranges shared with UI stages */
export const BUILD_PHASE = {
  foundation: [0, 0.14],
  structure: [0.14, 0.3],
  floors: [0.3, 0.68],
  finishing: [0.68, 0.86],
  handover: [0.86, 1],
} as const;

const FLOOR_COUNT = 12;
const FLOOR_H = 0.38;
const SLAB_H = 0.07;
const TOWER_W = 1.9;
const TOWER_D = 1.55;

function phaseLocal(progress: number, start: number, end: number) {
  return THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1);
}

function Foundation({ progress }: { progress: number }) {
  const pit = useRef<THREE.Mesh>(null);
  const pad = useRef<THREE.Mesh>(null);
  const local = phaseLocal(progress, 0, 0.14);

  useFrame(() => {
    if (pit.current) {
      pit.current.scale.set(
        THREE.MathUtils.lerp(0.2, 1, local),
        1,
        THREE.MathUtils.lerp(0.2, 1, local),
      );
      pit.current.visible = local > 0.02;
    }
    if (pad.current) {
      const t = phaseLocal(progress, 0.05, 0.14);
      pad.current.scale.setScalar(Math.max(0.01, t));
      pad.current.visible = t > 0.02;
    }
  });

  return (
    <group>
      <mesh ref={pit} position={[0, -0.08, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.16, 2.8]} />
        <meshStandardMaterial color="#2a3340" metalness={0.2} roughness={0.85} />
      </mesh>
      <mesh ref={pad} position={[0, 0.04, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.12, 2.15]} />
        <meshStandardMaterial color="#1a2433" metalness={0.35} roughness={0.55} />
      </mesh>
      {/* Footings */}
      {[
        [-0.85, -0.7],
        [0.85, -0.7],
        [-0.85, 0.7],
        [0.85, 0.7],
      ].map(([x, z], i) => {
        const t = phaseLocal(progress, 0.02 + i * 0.02, 0.12);
        return (
          <mesh
            key={i}
            position={[x, 0.02, z]}
            scale={[t, t, t]}
            visible={t > 0.05}
          >
            <boxGeometry args={[0.35, 0.18, 0.35]} />
            <meshStandardMaterial color="#3d4654" roughness={0.7} />
          </mesh>
        );
      })}
    </group>
  );
}

function CoreColumns({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null);
  const maxH = FLOOR_COUNT * FLOOR_H + 0.4;
  const local = phaseLocal(progress, 0.14, 0.3);

  useFrame(() => {
    if (!group.current) return;
    const h = Math.max(0.01, local * maxH);
    group.current.scale.y = h / maxH;
    group.current.visible = local > 0.02;
  });

  const posts: [number, number][] = [
    [-TOWER_W / 2 + 0.08, -TOWER_D / 2 + 0.08],
    [TOWER_W / 2 - 0.08, -TOWER_D / 2 + 0.08],
    [-TOWER_W / 2 + 0.08, TOWER_D / 2 - 0.08],
    [TOWER_W / 2 - 0.08, TOWER_D / 2 - 0.08],
    [0, 0],
  ];

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      {posts.map(([x, z], i) => (
        <mesh key={i} position={[x, maxH / 2, z]} castShadow>
          <boxGeometry args={[i === 4 ? 0.22 : 0.12, maxH, i === 4 ? 0.22 : 0.12]} />
          <meshStandardMaterial
            color={SITE_COLORS.steel}
            metalness={0.92}
            roughness={0.22}
          />
        </mesh>
      ))}
    </group>
  );
}

function BuildingFloor({
  index,
  progress,
}: {
  index: number;
  progress: number;
}) {
  const group = useRef<THREE.Group>(null);
  const start = 0.3 + (index / FLOOR_COUNT) * 0.38;
  const end = start + 0.38 / FLOOR_COUNT;
  const local = phaseLocal(progress, start, end);
  const y = 0.16 + index * FLOOR_H + FLOOR_H / 2;

  useFrame(() => {
    if (!group.current) return;
    const rise = THREE.MathUtils.lerp(-FLOOR_H * 1.2, 0, local);
    group.current.position.y = y + rise;
    group.current.scale.set(
      THREE.MathUtils.lerp(0.7, 1, local),
      Math.max(0.02, local),
      THREE.MathUtils.lerp(0.7, 1, local),
    );
    group.current.visible = local > 0.04;
  });

  const glassOpacity = 0.35 + phaseLocal(progress, 0.68, 0.86) * 0.45;

  return (
    <group ref={group} position={[0, y, 0]}>
      {/* Floor slab */}
      <mesh position={[0, -FLOOR_H / 2 + SLAB_H / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[TOWER_W + 0.08, SLAB_H, TOWER_D + 0.08]} />
        <meshStandardMaterial color="#4a5564" metalness={0.4} roughness={0.45} />
      </mesh>

      {/* Exterior walls / mass */}
      <mesh castShadow>
        <boxGeometry args={[TOWER_W, FLOOR_H - SLAB_H, TOWER_D]} />
        <meshPhysicalMaterial
          color="#0a355f"
          metalness={0.45}
          roughness={0.32}
          clearcoat={0.2}
        />
      </mesh>

      {/* Window band — front */}
      <mesh position={[0, 0.02, TOWER_D / 2 + 0.01]}>
        <planeGeometry args={[TOWER_W * 0.82, FLOOR_H * 0.55]} />
        <meshPhysicalMaterial
          color="#9ec5e8"
          metalness={0.2}
          roughness={0.15}
          transparent
          opacity={glassOpacity}
          emissive="#c9dff5"
          emissiveIntensity={0.15 + phaseLocal(progress, 0.86, 1) * 0.35}
        />
      </mesh>

      {/* Window band — side */}
      <mesh position={[TOWER_W / 2 + 0.01, 0.02, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[TOWER_D * 0.7, FLOOR_H * 0.55]} />
        <meshPhysicalMaterial
          color="#8eb6dc"
          metalness={0.25}
          roughness={0.18}
          transparent
          opacity={glassOpacity * 0.9}
        />
      </mesh>

      {/* Gold slab edge */}
      <mesh position={[0, FLOOR_H / 2 - 0.01, 0]}>
        <boxGeometry args={[TOWER_W + 0.1, 0.018, TOWER_D + 0.1]} />
        <meshStandardMaterial
          color={SITE_COLORS.gold500}
          metalness={0.9}
          roughness={0.18}
          emissive={SITE_COLORS.gold500}
          emissiveIntensity={0.12 + local * 0.25}
        />
      </mesh>
    </group>
  );
}

function PodiumWings({ progress }: { progress: number }) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const local = phaseLocal(progress, 0.68, 0.82);

  useFrame(() => {
    if (left.current) {
      left.current.scale.y = Math.max(0.01, local);
      left.current.visible = local > 0.05;
      left.current.position.y = 0.55 * local;
    }
    if (right.current) {
      right.current.scale.y = Math.max(0.01, local);
      right.current.visible = local > 0.05;
      right.current.position.y = 0.42 * local;
    }
  });

  return (
    <>
      <group ref={left} position={[-1.7, 0.55, 0.25]}>
        <mesh castShadow>
          <boxGeometry args={[1.1, 1.1, 1.2]} />
          <meshPhysicalMaterial color="#0c3a68" metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.1, 0.61]}>
          <planeGeometry args={[0.85, 0.55]} />
          <meshPhysicalMaterial
            color="#a8cce8"
            transparent
            opacity={0.55}
            metalness={0.2}
            roughness={0.2}
          />
        </mesh>
      </group>
      <group ref={right} position={[1.65, 0.42, 0.35]}>
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.85, 1.05]} />
          <meshPhysicalMaterial color="#0a3058" metalness={0.5} roughness={0.32} />
        </mesh>
      </group>
    </>
  );
}

function RoofCrown({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const topY = 0.16 + FLOOR_COUNT * FLOOR_H + 0.12;
  const local = phaseLocal(progress, 0.82, 0.92);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.visible = local > 0.05;
    ref.current.scale.setScalar(Math.max(0.01, local));
    ref.current.position.y = topY + (1 - local) * 0.4;
  });

  return (
    <group ref={ref} position={[0, topY, 0]}>
      <mesh>
        <boxGeometry args={[TOWER_W * 0.55, 0.16, TOWER_D * 0.55]} />
        <meshStandardMaterial
          color={SITE_COLORS.gold500}
          metalness={0.95}
          roughness={0.12}
          emissive={SITE_COLORS.gold500}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 0.32, 0]}>
        <coneGeometry args={[0.11, 0.5, 4]} />
        <meshStandardMaterial
          color={SITE_COLORS.gold400}
          metalness={1}
          roughness={0.08}
          emissive={SITE_COLORS.gold500}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function HandoverGlow({ progress }: { progress: number }) {
  const light = useRef<THREE.PointLight>(null);
  const local = phaseLocal(progress, 0.86, 1);

  useFrame(() => {
    if (!light.current) return;
    light.current.intensity = local * 1.8;
    light.current.visible = local > 0.05;
  });

  return (
    <pointLight
      ref={light}
      position={[0, 3.2, 2.2]}
      color={SITE_COLORS.gold400}
      distance={10}
    />
  );
}

function Crane({ progress }: { progress: number }) {
  const ref = useRef<THREE.Group>(null);
  const floorProgress = phaseLocal(progress, 0.3, 0.68);
  const built =
    0.16 + Math.floor(floorProgress * FLOOR_COUNT) * FLOOR_H + 1.2;

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.visible = progress > 0.12 && progress < 0.88;
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      Math.max(1.4, built),
      0.07,
    );
    ref.current.rotation.y = state.clock.elapsedTime * 0.12;
  });

  return (
    <group ref={ref} position={[1.55, 1.4, -0.1]}>
      <mesh>
        <cylinderGeometry args={[0.045, 0.055, 2.8, 8]} />
        <meshStandardMaterial color={SITE_COLORS.steel} metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0.65, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[1.4, 0.06, 0.06]} />
        <meshStandardMaterial
          color={SITE_COLORS.gold500}
          metalness={0.9}
          roughness={0.2}
          emissive={SITE_COLORS.gold500}
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

interface ConstructionBuildSceneProps {
  progress: number;
  reducedMotion?: boolean;
}

export function ConstructionBuildScene({
  progress,
  reducedMotion = false,
}: ConstructionBuildSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const floors = useMemo(
    () => Array.from({ length: FLOOR_COUNT }, (_, i) => i),
    [],
  );
  const p = reducedMotion ? 1 : progress;

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y =
      -0.42 + p * 0.48 + Math.sin(state.clock.elapsedTime * 0.18) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, -1.85, 0]}>
      <ambientLight intensity={0.9} color="#e4edf7" />
      <hemisphereLight args={["#f7f6f2", "#b8a88a", 0.6]} />
      <directionalLight
        position={[6, 10, 5]}
        intensity={1.75}
        color="#fff6e6"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[-4, 7, 3]}
        angle={0.5}
        penumbra={0.55}
        intensity={1.2 + p * 0.8}
        color={SITE_COLORS.gold400}
      />

      <Grid
        position={[0, 0, 0]}
        args={[18, 18]}
        cellSize={0.4}
        cellThickness={0.45}
        cellColor="#9aa8b8"
        sectionSize={2}
        sectionThickness={1}
        sectionColor="#C6922E"
        fadeDistance={13}
        fadeStrength={1.15}
        infiniteGrid
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} receiveShadow>
        <circleGeometry args={[5, 48]} />
        <meshStandardMaterial
          color="#ebe8e1"
          metalness={0.1}
          roughness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <Foundation progress={p} />
      <CoreColumns progress={p} />
      {floors.map((i) => (
        <BuildingFloor key={i} index={i} progress={p} />
      ))}
      <PodiumWings progress={p} />
      <RoofCrown progress={p} />
      <HandoverGlow progress={p} />
      {!reducedMotion && <Crane progress={p} />}
    </group>
  );
}
