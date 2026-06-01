"use client";

import { experience, experienceIntro } from "@/content/experience";
import { TechLogoLabel } from "@/components/ui/brand-logo";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";

export function TimelineView() {
  return (
    <IdeEditorChrome lineCount={32}>
      <div className="max-w-2xl space-y-6">
        <p className="text-muted">{experienceIntro}</p>
        {experience.map((entry) => (
          <article
            key={entry.id}
            className="rounded-lg border border-[var(--ide-border)] p-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-semibold text-foreground">{entry.role}</h2>
              <span className="font-mono text-[11px] text-muted">{entry.period}</span>
            </div>
            <p className="font-mono text-[12px] text-[var(--ide-accent)]">
              {entry.company} · {entry.stage}
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-muted">
              {entry.highlights.map((h) => (
                <li key={h.slice(0, 50)}>{h}</li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap gap-2">
              {entry.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded bg-[var(--ide-tab-inactive)] px-2 py-0.5 font-mono text-[11px]"
                >
                  <TechLogoLabel name={t} />
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </IdeEditorChrome>
  );
}
