import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/content/projects";
import { site } from "@/content/site";
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

  const blocks = [
    { title: "Challenge", body: project.challenge },
    { title: "Solution", body: project.solution },
    { title: "Architecture", body: project.architecture },
    { title: "Technical decisions", items: project.technicalDecisions },
    { title: "Performance results", items: project.performanceResults },
    { title: "Business impact", items: project.businessImpact },
  ] as const;

  return (
    <article className="min-h-screen pt-24 pb-20">
      <div className="container-wide max-w-3xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
        >
          ← Back to work
        </Link>

        <header className="mt-8">
          <p className="text-xs font-medium tracking-wide text-accent uppercase">
            Case study
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{project.outcome}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.role} · {caseStudy.timeline}
          </p>
        </header>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p className="mt-4 leading-relaxed text-muted">{caseStudy.overview}</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {caseStudy.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <dt className="text-[10px] font-medium tracking-wide text-accent uppercase">
                  {m.label}
                </dt>
                <dd className="mt-2 text-lg font-semibold text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-12 space-y-10">
          {blocks.map((block) => (
            <section key={block.title}>
              <h2 className="text-lg font-semibold text-foreground">{block.title}</h2>
              {"items" in block ? (
                <ul className="mt-3 space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted">
                      <span className="text-accent-secondary">—</span>
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

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-foreground">Lessons learned</h2>
          <ul className="mt-4 space-y-3">
            {caseStudy.lessons.map((lesson) => (
              <li
                key={lesson}
                className="flex gap-3 text-sm leading-relaxed text-muted"
              >
                <span className="text-accent-secondary" aria-hidden>
                  —
                </span>
                {lesson}
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-16 flex flex-wrap gap-4 border-t border-border pt-8">
          <Link
            href="/#contact"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90"
          >
            Get in touch
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background"
          >
            {site.email}
          </a>
        </footer>
      </div>
    </article>
  );
}
