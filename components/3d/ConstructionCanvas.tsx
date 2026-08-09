"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { ConstructionBuildScene } from "@/components/3d/ConstructionBuildScene";

function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    target.set(
      THREE.MathUtils.lerp(4.2, 3.2, progress),
      THREE.MathUtils.lerp(2.4, 3.6, progress),
      THREE.MathUtils.lerp(6.2, 5.0, progress),
    );
    camera.position.lerp(target, 0.08);
    look.set(0, 0.8 + progress * 1.4, 0);
    camera.lookAt(look);
  });

  return (
    <PerspectiveCamera makeDefault position={[4.2, 2.4, 6.2]} fov={36} />
  );
}

interface ConstructionCanvasProps {
  progress: number;
  reducedMotion?: boolean;
}

export function ConstructionCanvas({
  progress,
  reducedMotion = false,
}: ConstructionCanvasProps) {
  return (
    <div className="relative h-full w-full">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(198,146,46,0.12) 0%, transparent 65%)",
        }}
      />
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [4.2, 2.4, 6.2], fov: 36 }}
        style={{ background: "transparent" }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <CameraRig progress={progress} />
          <ConstructionBuildScene
            progress={progress}
            reducedMotion={reducedMotion}
          />
          <ContactShadows
            position={[0, -1.58, 0]}
            opacity={0.35}
            scale={12}
            blur={2.5}
            far={6}
          />
          <Environment preset="city" environmentIntensity={0.45} />
        </Suspense>
      </Canvas>
    </div>
  );
}
