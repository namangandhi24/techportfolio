"use client";

import type { HeroArtifact } from "@/content/hero-visual";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

type ArtifactPillProps = {
  artifact: HeroArtifact;
  className?: string;
  style?: React.CSSProperties;
  innerRef?: (el: HTMLDivElement | null) => void;
};

export function ArtifactPill({ artifact, className, style, innerRef }: ArtifactPillProps) {
  return (
    <div
      ref={innerRef}
      className={cn(
        "engineering-pill engineering-pill--icon pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 border-border/80 bg-card/95 text-accent shadow-md backdrop-blur-sm",
        className,
      )}
      style={style}
      aria-hidden
    >
      <BrandLogo brand={artifact.brand} artifactId={artifact.id} />
      <span className="sr-only">{artifact.label}</span>
    </div>
  );
}
