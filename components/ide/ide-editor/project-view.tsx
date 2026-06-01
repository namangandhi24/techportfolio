"use client";

import Link from "next/link";
import { getProjectBySlug } from "@/content/projects";
import { projectCaseStudyUrl } from "@/lib/project-urls";
import { TechLogoLabel } from "@/components/ui/brand-logo";
import { ContentPanel } from "@/components/ide/ide-line-gutter";
import type { IdeFileEntry } from "@/content/ide-manifest";

type ProjectViewProps = {
  file: IdeFileEntry;
};

/** In-workspace teaser — full narrative lives on /work/[slug] */
export function ProjectView({ file }: ProjectViewProps) {
  const slug = file.contentRef.replace("projects:", "");
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <ContentPanel>
        <p className="text-muted">Project not found.</p>
      </ContentPanel>
    );
  }

  const highlights = project.businessImpact.slice(0, 3);

  return (
    <ContentPanel>
      <div className="max-w-2xl space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-[var(--ide-accent)]">{project.role}</p>
          </div>
          <Link
            href={projectCaseStudyUrl(project.slug)}
            className="shrink-0 rounded-md bg-[var(--ide-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Read full case study →
          </Link>
        </div>

        <p className="text-base leading-relaxed text-muted">{project.outcome}</p>

        {project.caseStudy?.metrics ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {project.caseStudy.metrics.map((m) => (
              <div
                key={m.label}
                className="workspace-card rounded-lg border border-[var(--ide-border)] bg-[var(--ide-tab-inactive)]/40 p-3"
              >
                <p className="text-base font-semibold text-foreground">{m.value}</p>
                <p className="text-xs text-muted">{m.label}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div>
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted">Stack</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-[var(--ide-border)] bg-[var(--ide-editor)] px-2.5 py-1 text-sm"
              >
                <TechLogoLabel name={s} />
              </span>
            ))}
          </div>
        </div>

        {highlights.length > 0 ? (
          <div>
            <h2 className="text-xs font-medium uppercase tracking-wide text-muted">
              Impact highlights
            </h2>
            <ul className="mt-2 space-y-2">
              {highlights.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="text-[var(--ide-accent)]" aria-hidden>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="rounded-lg border border-dashed border-[var(--ide-border)] px-4 py-3 text-sm text-muted">
          Challenge, architecture, technical decisions, and lessons are on the{" "}
          <Link
            href={projectCaseStudyUrl(project.slug)}
            className="font-medium text-[var(--ide-accent)] hover:underline"
          >
            full case study page
          </Link>
          .
        </p>
      </div>
    </ContentPanel>
  );
}
