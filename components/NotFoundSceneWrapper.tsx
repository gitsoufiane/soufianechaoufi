"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const NotFoundScene = dynamic(() => import("./NotFoundScene"), {
  ssr: false,
  loading: () => null,
});

function StaticFallback({ isDark }: { isDark: boolean }) {
  return (
    <div
      className="fixed inset-0"
      style={{
        background: isDark
          ? "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)"
          : "radial-gradient(ellipse at center, #f8fafc 0%, #e2e8f0 100%)",
      }}
    >
      {/* Static star dots for reduced motion */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${isDark ? "bg-white/60" : "bg-slate-400/60"}`}
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
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

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
    return <StaticFallback isDark={true} />;
  }

  if (prefersReducedMotion) {
    return <StaticFallback isDark={isDark} />;
  }

  return <NotFoundScene isDark={isDark} />;
}
