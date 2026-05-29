"use client";

import { testimonials } from "@/content/testimonials";
import { Section } from "@/components/layout/section";
import { SectionReveal } from "@/components/motion/section-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      label="Testimonials"
      title="What collaborators say"
      description="Recommendations from collaborators at GLA University and E-Cell."
      className="!pb-16"
    >
      <SectionReveal>
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
          {testimonials.map((t) => (
            <GlowCard
              key={t.id}
              className="min-w-[min(100%,20rem)] flex-shrink-0 snap-start p-6 sm:min-w-[24rem]"
            >
              <blockquote>
                <p className="text-sm leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-4 border-t border-border pt-4">
                  <cite className="not-italic">
                    <span className="text-sm font-medium text-foreground">
                      {t.author}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {t.role} · {t.company}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </GlowCard>
          ))}
        </div>
      </SectionReveal>
    </Section>
  );
}
