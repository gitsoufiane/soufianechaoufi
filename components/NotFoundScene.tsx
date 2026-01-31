"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface SceneProps {
  isDark: boolean;
}

function Scene({ isDark }: SceneProps) {
  const starsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <>
      <Stars
        ref={starsRef}
        radius={100}
        depth={80}
        count={5000}
        factor={isDark ? 6 : 4}
        saturation={0}
        fade
        speed={1.5}
      />
    </>
  );
}

interface NotFoundSceneProps {
  isDark?: boolean;
}

export default function NotFoundScene({ isDark = true }: NotFoundSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <color attach="background" args={[isDark ? "#000000" : "#f8fafc"]} />
      <Scene isDark={isDark} />
    </Canvas>
  );
}
