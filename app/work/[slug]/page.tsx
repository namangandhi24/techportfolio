import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectWorkspaceUrl } from "@/lib/project-urls";
import { TechLogoLabel } from "@/components/ui/brand-logo";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects
    .filter((p) => p.caseStudy)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: `${project.title} — Case Study`,
    description: project.outcome,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project?.caseStudy) {
    notFound();
  }

  const { caseStudy } = project;

  const detailSections = [
    { title: "Challenge", body: project.challenge },
    { title: "Solution", body: project.solution },
    { title: "Architecture", body: project.architecture },
    { title: "Technical decisions", items: project.technicalDecisions },
    { title: "Performance results", items: project.performanceResults },
    { title: "Business impact", items: project.businessImpact },
  ] as const;

  return (
    <article className="pb-16 pt-8">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href={projectWorkspaceUrl(slug)}
          className="inline-flex items-center gap-2 text-sm text-[var(--ide-accent)] hover:underline"
        >
          ← Back to project preview
        </Link>

        <header className="workspace-section mt-8 border-l-4 border-[var(--ide-accent)] pl-5">
          <p className="text-xs font-medium uppercase tracking-wide text-[var(--ide-accent)]">
            Case study
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">{project.outcome}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.role} · {caseStudy.timeline}
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--ide-border)] bg-[var(--ide-tab-inactive)]/40 px-2.5 py-1 text-sm"
            >
              <TechLogoLabel name={tech} />
            </span>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Overview</h2>
          <p className="mt-3 leading-relaxed text-muted">{caseStudy.overview}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Results at a glance</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {caseStudy.metrics.map((m) => (
              <div
                key={m.label}
                className="workspace-card rounded-lg border border-[var(--ide-border)] bg-[var(--ide-tab-inactive)]/30 p-4"
              >
                <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                  {m.label}
                </dt>
                <dd className="mt-1 text-lg font-semibold text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-10 space-y-8">
          {detailSections.map((block) => (
            <section key={block.title}>
              <h2 className="text-lg font-semibold text-foreground">{block.title}</h2>
              {"items" in block ? (
                <ul className="mt-3 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                      <span className="text-[var(--ide-accent)]" aria-hidden>
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-muted">{block.body}</p>
              )}
            </section>
          ))}
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">Lessons learned</h2>
          <ul className="mt-4 space-y-3">
            {caseStudy.lessons.map((lesson) => (
              <li
                key={lesson}
                className="flex gap-3 text-sm leading-relaxed text-muted"
              >
                <span className="text-[var(--ide-accent)]" aria-hidden>
                  •
                </span>
                {lesson}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-14 flex flex-wrap gap-3 border-t border-[var(--ide-border)] pt-8">
          <Link
            href={projectWorkspaceUrl(slug)}
            className="rounded-md border border-[var(--ide-border)] px-4 py-2 text-sm font-medium hover:bg-[var(--ide-tab-inactive)]"
          >
            ← Workspace preview
          </Link>
          <Link
            href={`mailto:${site.email}`}
            className="rounded-md bg-[var(--ide-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Get in touch
          </Link>
        </footer>
      </div>
    </article>
  );
}
