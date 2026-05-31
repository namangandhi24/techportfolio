"use client";

import { heroArtifacts } from "@/content/hero-visual";
import { ArtifactPill } from "@/components/hero/artifact-pill";

export function StaticArtifactRing() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {heroArtifacts.map((artifact) => (
        <ArtifactPill
          key={artifact.id}
          artifact={artifact}
          style={{ left: `${artifact.restX}%`, top: `${artifact.restY}%` }}
        />
      ))}
    </div>
  );
}
