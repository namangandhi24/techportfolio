import { whatIBuild } from "@/content/what-i-build";
import { Section } from "@/components/layout/section";
import { SectionReveal, StaggerChildren, StaggerItem } from "@/components/motion/section-reveal";

export function WhatIBuild() {
  return (
    <Section
      id="build"
      label="About"
      title={whatIBuild.title}
      description="Personal, direct, and built for teams who care about shipping quality."
    >
      <SectionReveal>
        <StaggerChildren className="grid gap-8 md:grid-cols-2">
          {whatIBuild.blocks.map((block) => (
            <StaggerItem key={block.id}>
              <article className="border-l-2 border-accent/40 pl-6">
                <h3 className="text-lg font-semibold text-foreground">{block.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{block.body}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </SectionReveal>
    </Section>
  );
}
