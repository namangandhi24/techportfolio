"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { ModeSwitcher } from "@/components/portfolio/mode-switcher";
import { AppearanceMenu } from "@/components/ui/appearance-menu";

type IdeTitleBarProps = {
  onQuickOpen: () => void;
};

export function IdeTitleBar({ onQuickOpen }: IdeTitleBarProps) {
  return (
    <header className="flex h-11 shrink-0 items-center justify-between gap-3 border-b border-[var(--ide-border)] bg-[var(--ide-sidebar)] px-4">
      <div className="flex min-w-0 items-baseline gap-2">
        <span className="truncate font-semibold text-foreground">{site.name}</span>
        <span className="hidden truncate text-sm text-muted sm:inline">{site.role}</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={onQuickOpen}
          className="rounded-md border border-[var(--ide-border)] px-3 py-1.5 text-sm text-foreground cursor-pointer hover:bg-[var(--ide-tab-inactive)]"
        >
          Search
          <kbd className="ml-1.5 hidden text-[11px] text-muted sm:inline">⌘K</kbd>
        </button>
        <Link
          href={site.resumeUrl}
          target="_blank"
          rel="noopener"
          className="rounded-md bg-[var(--ide-accent)] px-3 py-1.5 text-sm text-white hover:opacity-90"
        >
          Resume
        </Link>
        <ModeSwitcher />
        <AppearanceMenu />
      </div>
    </header>
  );
}
