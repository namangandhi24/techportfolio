"use client";

import { useCountUp } from "@/hooks/use-count-up";

export function MetricValue({ value }: { value: string }) {
  const { ref, text } = useCountUp(value);
  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
