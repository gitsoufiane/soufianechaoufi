"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const NotFoundScene = dynamic(() => import("./NotFoundScene"), {
  ssr: false,
  loading: () => null,
});

const staticStars = Array.from({ length: 50 }, (_, index) => ({
  width: ((index * 13) % 20) / 10 + 1,
  height: ((index * 17) % 20) / 10 + 1,
  top: `${(index * 37) % 100}%`,
  left: `${(index * 53) % 100}%`,
}));

const subscribeToClient = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const subscribeToReducedMotion = (callback: () => void) => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
};

const getReducedMotionSnapshot = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getReducedMotionServerSnapshot = () => true;

function StaticFallback() {
  return (
    <div
      className="fixed inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {staticStars.map((star, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white/60"
            style={star}
          />
        ))}
      </div>
    </div>
  );
}

export default function NotFoundSceneWrapper() {
  const mounted = useSyncExternalStore(
    subscribeToClient,
    getClientSnapshot,
    getServerSnapshot,
  );
  const prefersReducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (!mounted || prefersReducedMotion) {
    return <StaticFallback />;
  }

  return <NotFoundScene />;
}
