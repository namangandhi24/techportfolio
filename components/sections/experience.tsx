import { experience, journeyIntro } from "@/content/experience";
import { Section } from "@/components/layout/section";
import {
  SectionReveal,
  StaggerChildren,
  StaggerItem,
} from "@/components/motion/section-reveal";
import { GlowCard } from "@/components/ui/glow-card";

export function Experience() {
  return (
    <Section
      id="experience"
      label="Career journey"
      title="Enterprise experience at Accenture"
      description={journeyIntro}
    >
      <SectionReveal>
        <StaggerChildren>
          <ol className="relative space-y-8 border-l border-border pl-8">
            {experience.map((entry) => (
              <StaggerItem key={entry.id}>
                <li className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[2.125rem] top-6 h-3.5 w-3.5 rounded-full border-2 border-accent bg-background"
                  />
                  <GlowCard className="relative z-10 isolate bg-card p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="font-mono text-xs tracking-widest text-accent-secondary uppercase">
                          {entry.stage}
                        </p>
                        <h3 className="mt-1 text-lg font-semibold text-foreground">
                          {entry.role}
                        </h3>
                        <p className="text-sm text-muted">{entry.company}</p>
                      </div>
                      <time className="shrink-0 font-mono text-xs text-muted-foreground">
                        {entry.period}
                      </time>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {entry.technologies.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-5 space-y-2 border-t border-border pt-4">
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-2 text-sm leading-relaxed text-muted"
                        >
                          <span className="text-accent" aria-hidden>
                            —
                          </span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </GlowCard>
                </li>
              </StaggerItem>
            ))}
          </ol>
        </StaggerChildren>
      </SectionReveal>
    </Section>
  );
}
