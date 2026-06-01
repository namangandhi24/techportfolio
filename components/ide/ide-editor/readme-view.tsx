"use client";

import Link from "next/link";
import { heroPortrait } from "@/content/hero-visual";
import { heroMetrics } from "@/content/proof";
import { site } from "@/content/site";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";

export function ReadmeView() {
  const { openFile } = useIdeWorkspace();

  return (
    <IdeEditorChrome lineCount={28}>
      <div className="max-w-2xl space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroPortrait.src}
            alt={heroPortrait.alt}
            className="h-32 w-32 shrink-0 rounded-xl object-cover"
          />
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{site.name}</h1>
            <p className="text-sm font-medium text-[var(--ide-accent)]">{site.role}</p>
            <p className="mt-2 text-muted">{site.headline}</p>
            <p className="mt-1 text-sm text-muted">{site.subheadline}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {heroMetrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-[var(--ide-border)] p-3">
              <p className="text-lg font-semibold text-foreground">{m.value}</p>
              <p className="text-[11px] text-muted">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => openFile("projects/portfolio.tsx")}
            className="cursor-pointer rounded bg-[var(--ide-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Open projects
          </button>
          <button
            type="button"
            onClick={() => openFile("contact/info.md")}
            className="rounded border border-[var(--ide-border)] px-4 py-2 text-sm cursor-pointer hover:bg-[var(--ide-tab-inactive)]"
          >
            Contact
          </button>
          <Link
            href={site.resumeUrl}
            target="_blank"
            rel="noopener"
            className="rounded border border-[var(--ide-border)] px-4 py-2 text-sm cursor-pointer hover:bg-[var(--ide-tab-inactive)]"
          >
            Download resume
          </Link>
        </div>
      </div>
    </IdeEditorChrome>
  );
}
