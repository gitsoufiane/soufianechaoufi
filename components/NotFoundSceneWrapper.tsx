"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NotFoundScene = dynamic(() => import("./NotFoundScene"), {
  ssr: false,
  loading: () => null,
});

function StaticFallback() {
  return (
    <div
      className="fixed inset-0"
      style={{
        background: "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
      }}
    >
      {/* Static star dots for reduced motion */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function NotFoundSceneWrapper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (!mounted) {
    return <StaticFallback />;
  }

  if (prefersReducedMotion) {
    return <StaticFallback />;
  }

  return <NotFoundScene />;
}
