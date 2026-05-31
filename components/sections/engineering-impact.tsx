"use client";

import { impactBlocks } from "@/content/impact";
import { Section } from "@/components/layout/section";
import { SectionReveal, StaggerChildren, StaggerItem } from "@/components/motion/section-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export function EngineeringImpact() {
  return (
    <Section
      id="impact"
      label="Impact"
      title="Engineering impact"
      description="Scoped outcomes from client delivery—headline metrics are in the hero."
    >
      <SectionReveal>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {impactBlocks.map((block) => (
            <StaggerItem key={block.id}>
              <GlowCard className="flex h-full flex-col p-5">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {block.evidence}
                </p>
                <h3 className="mt-2 text-sm font-medium text-accent">{block.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {block.context}
                </p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionReveal>
    </Section>
  );
}
