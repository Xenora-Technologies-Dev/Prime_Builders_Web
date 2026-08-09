"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { ArchitecturalScene } from "@/components/3d/ArchitecturalScene";

interface CameraRigProps {
  reducedMotion: boolean;
  scrollProgress: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

function CameraRig({ reducedMotion, scrollProgress, mouse }: CameraRigProps) {
  const { camera } = useThree();
  const lookAt = useMemo(() => new THREE.Vector3(0.15, 1.8, 0), []);

  useFrame(() => {
    const p = scrollProgress;

    // Cinematic path: start wide on tower → move in → reveal secondary massing
    const baseX = THREE.MathUtils.lerp(5.8, 3.4, p);
    const baseY = THREE.MathUtils.lerp(3.2, 2.35, p);
    const baseZ = THREE.MathUtils.lerp(9.4, 5.6, p);

    const parallaxX = reducedMotion ? 0 : mouse.current.x * 0.35;
    const parallaxY = reducedMotion ? 0 : mouse.current.y * 0.2;

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      baseX + parallaxX,
      0.06,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      baseY + parallaxY,
      0.06,
    );
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, baseZ, 0.06);

    lookAt.set(
      0.1 + (reducedMotion ? 0 : mouse.current.x * 0.12),
      THREE.MathUtils.lerp(2.2, 2.6, p),
      0.3,
    );
    camera.lookAt(lookAt);
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={[5.8, 3.2, 9.4]}
      fov={34}
      near={0.1}
      far={80}
    />
  );
}

interface HeroCanvasProps {
  reducedMotion?: boolean;
  scrollProgress?: number;
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
}

const defaultMouse = { current: { x: 0, y: 0 } };

export function HeroCanvas({
  reducedMotion = false,
  scrollProgress = 0,
  mouse = defaultMouse,
}: HeroCanvasProps) {
  const goldIntensity = Math.min(1, Math.max(0, (scrollProgress - 0.15) * 1.6));

  return (
    <div className="relative h-full w-full" data-cursor="VIEW">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 62% 48%, rgba(198,146,46,0.22) 0%, transparent 58%), radial-gradient(ellipse 50% 45% at 70% 60%, rgba(27,92,163,0.45) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 55% 30%, rgba(217,180,90,0.08) 0%, transparent 60%)",
        }}
      />
      <Canvas
        className="h-full w-full"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows={!reducedMotion}
        camera={{ position: [5.8, 3.2, 9.4], fov: 34 }}
        style={{ background: "transparent" }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <CameraRig
            reducedMotion={reducedMotion}
            scrollProgress={scrollProgress}
            mouse={mouse}
          />
          <ArchitecturalScene
            reducedMotion={reducedMotion}
            scrollProgress={scrollProgress}
            goldIntensity={goldIntensity}
          />
          <Environment preset="city" environmentIntensity={0.7} />
        </Suspense>
      </Canvas>
    </div>
  );
}
