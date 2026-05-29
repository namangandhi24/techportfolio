"use client";

import { principles } from "@/content/principles";
import { Section } from "@/components/layout/section";
import { SectionReveal, StaggerChildren, StaggerItem } from "@/components/motion/section-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export function EngineeringPrinciples() {
  return (
    <Section
      id="principles"
      label="Principles"
      title="Engineering principles"
      description="Values that shape how I build—scannable in seconds, before the deeper story."
    >
      <SectionReveal>
        <StaggerChildren className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <StaggerItem key={item.id}>
              <GlowCard className="h-full p-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </GlowCard>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionReveal>
    </Section>
  );
}
