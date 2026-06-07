"use client";

import Link from "next/link";
import { portfolioModes, type PortfolioMode } from "@/content/portfolio-modes";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type ModePickerModalProps = {
  onSelect: (mode: PortfolioMode) => void;
};

function ModeIcon({ mode }: { mode: PortfolioMode }) {
  if (mode === "classic") {
    return (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="6" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="4" width="10" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 8h6M13 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ModePickerModal({ onSelect }: ModePickerModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mode-picker-title"
    >
      <div className="w-full max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        <h1 id="mode-picker-title" className="font-display text-2xl font-semibold tracking-tight text-foreground">
          How would you like to explore?
        </h1>
        <p className="mt-2 text-muted">
          Choose a view for {site.name}&apos;s portfolio. You can switch anytime from the header.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {portfolioModes.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={cn(
                "group flex cursor-pointer flex-col items-start rounded-xl border border-border bg-background p-5 text-left",
                "motion-safe:transition-all motion-safe:hover:border-[var(--ide-accent)] motion-safe:hover:shadow-[0_8px_30px_-12px_color-mix(in_srgb,var(--ide-accent)_40%,transparent)]",
              )}
            >
              <span className="rounded-lg bg-[var(--accent-muted)] p-2.5 text-[var(--ide-accent)]">
                <ModeIcon mode={item.id} />
              </span>
              <span className="mt-4 text-lg font-semibold text-foreground">{item.label}</span>
              <span className="mt-1 text-sm leading-relaxed text-muted">{item.description}</span>
              <span className="mt-3 text-xs text-muted-foreground">{item.hint}</span>
              <span className="mt-4 text-sm font-medium text-[var(--ide-accent)] group-hover:underline">
                Continue →
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          <Link href={site.resumeUrl} target="_blank" rel="noopener" className="text-[var(--ide-accent)] hover:underline">
            Download resume PDF
          </Link>
        </p>
      </div>
    </div>
  );
}
