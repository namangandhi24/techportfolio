"use client";

import { usePointerGlow } from "@/hooks/use-pointer-glow";
import { cn } from "@/lib/utils";

type GlowCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export function GlowCard({ children, className, ...props }: GlowCardProps) {
  const { ref, onPointerMove, onPointerLeave } = usePointerGlow<HTMLDivElement>();

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("premium-card", className)}
      {...props}
    >
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
