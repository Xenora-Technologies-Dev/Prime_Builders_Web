"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { SITE_COLORS } from "@/lib/theme";

/**
 * Constructed 3D Prime Plus mark:
 * Navy "P" + gold/steel tower + sweeping bridge.
 * No white background panel — mark sits in the scene.
 */
export function PrimePlusLogo3D({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  reducedMotion = false,
}) {
  const group = useRef<THREE.Group>(null);

  const pGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Outer P (units roughly match logo proportions)
    const x0 = 0;
    const y0 = 0;
    const h = 4.2;
    const stem = 1.05;
    const bowlW = 2.35;
    const bowlTop = 4.2;
    const bowlBottom = 1.55;
    const thickness = 0.95;

    shape.moveTo(x0, y0);
    shape.lineTo(x0, h);
    shape.lineTo(x0 + stem + bowlW * 0.15, h);
    shape.absarc(
      x0 + stem + 0.55,
      (bowlTop + bowlBottom) / 2 + 0.35,
      1.35,
      Math.PI * 0.55,
      -Math.PI * 0.55,
      true,
    );
    shape.lineTo(x0 + stem, bowlBottom);
    shape.lineTo(x0 + stem, y0);
    shape.lineTo(x0, y0);

    // Counter (hole) of the P
    const hole = new THREE.Path();
    hole.absarc(
      x0 + stem + 0.55,
      (bowlTop + bowlBottom) / 2 + 0.35,
      0.62,
      0,
      Math.PI * 2,
      true,
    );
    shape.holes.push(hole);

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.center();
    // Stand upright: extrude is in Z, rotate so face is toward camera-ish
    geo.rotateY(Math.PI);
    geo.translate(0, h / 2 - 0.1, 0);
    return geo;
  }, []);

  useFrame((state) => {
    if (!group.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = Math.sin(t * 0.25) * 0.08;
    group.current.position.y = position[1] + Math.sin(t * 0.45) * 0.06;
  });

  const navyMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: SITE_COLORS.navy800,
        metalness: 0.45,
        roughness: 0.28,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        envMapIntensity: 1.1,
      }),
    [],
  );

  return (
    <group ref={group} position={position} scale={scale}>
      {/* Extruded navy P — no white plate behind */}
      <mesh geometry={pGeometry} material={navyMat} castShadow receiveShadow />

      {/* Tower inside the P (gold + steel facets) */}
      <group position={[0.15, 1.15, 0.15]}>
        {/* Steel left face */}
        <mesh position={[-0.12, 1.35, 0]} castShadow>
          <boxGeometry args={[0.22, 3.5, 0.38]} />
          <meshStandardMaterial
            color="#d8dde3"
            metalness={0.92}
            roughness={0.18}
          />
        </mesh>
        {/* Gold right face */}
        <mesh position={[0.12, 1.35, 0]} castShadow>
          <boxGeometry args={[0.22, 3.5, 0.38]} />
          <meshStandardMaterial
            color={SITE_COLORS.gold500}
            metalness={0.95}
            roughness={0.14}
            emissive={SITE_COLORS.gold500}
            emissiveIntensity={0.28}
          />
        </mesh>
        {/* Spire */}
        <mesh position={[0, 3.35, 0]}>
          <boxGeometry args={[0.14, 0.22, 0.14]} />
          <meshStandardMaterial
            color={SITE_COLORS.gold400}
            metalness={1}
            roughness={0.1}
            emissive={SITE_COLORS.gold500}
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[0, 3.75, 0]}>
          <coneGeometry args={[0.07, 0.55, 4]} />
          <meshStandardMaterial
            color={SITE_COLORS.gold400}
            metalness={1}
            roughness={0.08}
            emissive={SITE_COLORS.gold500}
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Sweeping bridge / roadway through the P */}
      <group position={[0.1, 1.55, 0.05]} rotation={[0, 0, -0.06]}>
        <mesh castShadow>
          <boxGeometry args={[4.6, 0.22, 0.7]} />
          <meshStandardMaterial
            color={SITE_COLORS.navy800}
            metalness={0.65}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <boxGeometry args={[4.6, 0.035, 0.74]} />
          <meshStandardMaterial
            color={SITE_COLORS.gold500}
            metalness={0.95}
            roughness={0.12}
            emissive={SITE_COLORS.gold500}
            emissiveIntensity={0.45}
          />
        </mesh>
        {/* Subtle deck lines */}
        <mesh position={[0, 0.05, 0.28]}>
          <boxGeometry args={[4.4, 0.01, 0.02]} />
          <meshStandardMaterial color="#e8eef5" metalness={0.4} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.55, 0]} castShadow>
          <boxGeometry args={[0.16, 0.9, 0.16]} />
          <meshStandardMaterial
            color={SITE_COLORS.steel}
            metalness={0.9}
            roughness={0.22}
          />
        </mesh>
      </group>

      {/* Wordmark — no white plate */}
      <group position={[0, -0.55, 0.55]}>
        <Text
          anchorX="center"
          anchorY="middle"
          fontSize={0.22}
          letterSpacing={0.08}
          color={SITE_COLORS.gold500}
          maxWidth={4.5}
          textAlign="center"
          font={undefined}
        >
          PRIME PLUS BUILDERS
        </Text>
        {/* Divider with twin ticks */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[2.4, 0.012, 0.012]} />
          <meshStandardMaterial
            color={SITE_COLORS.gold500}
            emissive={SITE_COLORS.gold500}
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh position={[-0.06, -0.22, 0]}>
          <boxGeometry args={[0.012, 0.08, 0.012]} />
          <meshStandardMaterial color={SITE_COLORS.gold500} />
        </mesh>
        <mesh position={[0.06, -0.22, 0]}>
          <boxGeometry args={[0.012, 0.08, 0.012]} />
          <meshStandardMaterial color={SITE_COLORS.gold500} />
        </mesh>
        <Text
          position={[0, -0.42, 0]}
          anchorX="center"
          anchorY="middle"
          fontSize={0.16}
          letterSpacing={0.1}
          color="#c5d2e4"
          maxWidth={4.5}
          textAlign="center"
        >
          AND DEVELOPERS PVT LTD
        </Text>
        <Text
          position={[0, -0.7, 0]}
          anchorX="center"
          anchorY="middle"
          fontSize={0.11}
          letterSpacing={0.14}
          color="#8fa0b5"
          maxWidth={4.5}
          textAlign="center"
        >
          CONSTRUCTION  ·  INTERIOR  ·  INFRASTRUCTURE
        </Text>
      </group>
    </group>
  );
}
