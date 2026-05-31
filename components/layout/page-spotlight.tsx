"use client";

import { useEffect, useRef, useState } from "react";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

function canUseSpotlight() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function PageSpotlight() {
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const enabled = hydrated && !reduced && canUseSpotlight();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setActive(true);
      });
    };

    const onLeave = () => setActive(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{
        opacity: active ? 1 : 0,
        background: `radial-gradient(640px circle at ${position.x}px ${position.y}px, var(--spotlight), transparent 72%)`,
      }}
    />
  );
}
