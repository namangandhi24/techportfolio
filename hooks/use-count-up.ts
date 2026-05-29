"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";

function parseMetricValue(value: string): { num: number; prefix: string; suffix: string } {
  const match = value.match(/^([^0-9<]*)(<?\s*)([0-9.]+)(.*)$/);
  if (!match) return { num: 0, prefix: "", suffix: value };
  const prefix = `${match[1] ?? ""}${match[2] ?? ""}`;
  return {
    prefix,
    num: parseFloat(match[3] ?? "0"),
    suffix: match[4] ?? "",
  };
}

type UseCountUpOptions = {
  enabled?: boolean;
};

export function useCountUp(displayValue: string, options: UseCountUpOptions = {}) {
  const { enabled = true } = options;
  const reduced = useReducedMotion();
  const { num, prefix, suffix } = parseMetricValue(displayValue);
  const [current, setCurrent] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  const shouldAnimate = enabled && /\d/.test(displayValue) && !reduced;

  useEffect(() => {
    if (!shouldAnimate) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 1200;
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - progress) ** 3;
          setCurrent(num * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, shouldAnimate]);

  if (!enabled || !/\d/.test(displayValue) || reduced) {
    return { ref, text: displayValue };
  }

  const rounded = Number.isInteger(num) ? Math.round(current) : current.toFixed(1);
  const text = `${prefix}${rounded}${suffix}`;

  return { ref, text };
}
