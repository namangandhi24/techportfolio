"use client";

import { useCallback, useRef } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

export function usePointerGlow<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (reduced) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--glow-x", `${x}px`);
      el.style.setProperty("--glow-y", `${y}px`);
    },
    [reduced],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "50%");
  }, []);

  return { ref, onPointerMove, onPointerLeave, enabled: !reduced };
}
