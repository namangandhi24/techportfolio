"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgress() {
  const progress = useScrollProgress();

  if (progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  );
}
