"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/content/projects";
import type { Project } from "@/content/projects";
import { Section } from "@/components/layout/section";
import { SectionReveal } from "@/components/motion/section-reveal";
import { Badge } from "@/components/ui/badge";
import { GlowCard } from "@/components/ui/glow-card";
import { useHydrated } from "@/hooks/use-hydrated";
import { useReducedMotion } from "@/components/motion/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Work() {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const others = projects.filter((p) => p.id !== featured?.id);

  return (
    <Section
      id="work"
      label="Work"
      title="Featured work"
      description="Case studies with architecture, decisions, and measurable outcomes."
    >
      <SectionReveal>
        <div className="space-y-4">
          {featured ? <ProjectCaseCard project={featured} defaultOpen /> : null}
          {others.map((project) => (
            <ProjectCaseCard key={project.id} project={project} />
          ))}
        </div>
      </SectionReveal>
    </Section>
  );
}

function ProjectCaseCard({
  project,
  defaultOpen = false,
}: {
  project: Project;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const hydrated = useHydrated();
  const reduced = useReducedMotion();
  const motionReady = hydrated && !reduced;
  const statusLabel =
    project.status === "live" ? "Live" : project.status === "planned" ? "Planned" : "Coming soon";

  const sections = [
    { key: "Challenge", value: project.challenge },
    { key: "Solution", value: project.solution },
    { key: "Architecture", value: project.architecture },
    {
      key: "Technical decisions",
      value: project.technicalDecisions,
      list: true,
    },
    {
      key: "Performance",
      value: project.performanceResults,
      list: true,
    },
    {
      key: "Business impact",
      value: project.businessImpact,
      list: true,
    },
  ] as const;

  return (
    <GlowCard className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full flex-col gap-2 p-6 text-left md:flex-row md:items-start md:justify-between cursor-pointer"
        aria-expanded={open}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <Badge
              className={
                project.status === "live" ? "border-accent/40 text-accent" : undefined
              }
            >
              {statusLabel}
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted">{project.outcome}</p>
          <p className="mt-1 text-xs text-muted-foreground">{project.role}</p>
        </div>
        <span className="shrink-0 text-sm text-accent">{open ? "Collapse" : "Expand"}</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={motionReady ? { height: 0, opacity: 0 } : false}
            animate={{ height: "auto", opacity: 1 }}
            exit={motionReady ? { height: 0, opacity: 0 } : undefined}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="overflow-hidden border-t border-border"
          >
            <div className="space-y-6 p-6 pt-4">
              {sections.map((section) => (
                <div key={section.key}>
                  <h4 className="text-xs font-medium tracking-wide text-accent uppercase">
                    {section.key}
                  </h4>
                  {"list" in section && section.list ? (
                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {(section.value as string[]).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-accent-secondary">—</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {section.value as string}
                    </p>
                  )}
                </div>
              ))}
              <ul className="flex flex-wrap gap-2 border-t border-border pt-4">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {project.status === "live" && project.href ? (
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={project.href}
                    className={cn(
                      "inline-flex text-sm font-medium text-accent hover:underline",
                    )}
                  >
                    Read full case study →
                  </Link>
                  {project.liveUrl ? (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex text-sm font-medium text-muted-foreground hover:text-accent hover:underline",
                      )}
                    >
                      Visit live site ↗
                    </Link>
                  ) : null}
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GlowCard>
  );
}
