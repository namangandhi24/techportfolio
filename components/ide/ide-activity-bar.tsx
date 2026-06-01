"use client";

import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import type { IdeActivityView } from "@/content/ide-manifest";
import { cn } from "@/lib/utils";

const views: { id: IdeActivityView; label: string; short: string }[] = [
  { id: "explorer", label: "Browse portfolio", short: "Browse" },
  { id: "search", label: "Search content", short: "Search" },
  { id: "scm", label: "Career progression", short: "Career" },
  { id: "run", label: "Interactive demos", short: "Demos" },
  { id: "extensions", label: "Skills & certifications", short: "Skills" },
  { id: "profile", label: "About & contact", short: "About" },
];

export function IdeActivityBar() {
  const { activeView, setActiveView, setMobileSidebarOpen } = useIdeWorkspace();

  return (
    <nav
      className="ide-activity-bar flex w-[var(--ide-nav-width)] shrink-0 flex-col gap-0.5 border-r border-[var(--ide-border)] py-2"
      aria-label="Portfolio navigation"
    >
      {views.map((view) => (
        <button
          key={view.id}
          type="button"
          title={view.label}
          aria-label={view.label}
          aria-current={activeView === view.id ? "page" : undefined}
          onClick={() => {
            setActiveView(view.id);
            setMobileSidebarOpen(true);
          }}
          className={cn(
            "mx-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-left text-sm transition-colors",
            activeView === view.id
              ? "bg-[var(--ide-tab-inactive)] font-medium text-[var(--ide-accent)]"
              : "text-muted hover:bg-[var(--ide-tab-inactive)] hover:text-foreground",
          )}
        >
          <NavIcon view={view.id} active={activeView === view.id} />
          <span className="truncate">{view.short}</span>
        </button>
      ))}
    </nav>
  );
}

function NavIcon({ view, active }: { view: IdeActivityView; active: boolean }) {
  const className = cn("h-4 w-4 shrink-0", active ? "text-[var(--ide-accent)]" : "text-muted");
  switch (view) {
    case "explorer":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 5h7l2 2h9v12H4V5z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "search":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "scm":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 18V6M8 18V10M12 18V4M16 18v-6M20 18V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "run":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
        </svg>
      );
    case "extensions":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2l2 5h5l-4 3 1.5 5L12 12 7.5 15 9 10 5 7h5L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "profile":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
}
