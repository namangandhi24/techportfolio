import Link from "next/link";
import { site } from "@/content/site";
import { WorkLayoutHeaderActions } from "@/components/portfolio/work-layout-header-actions";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--ide-bg)] text-foreground">
      <header className="sticky top-0 z-50 flex h-11 items-center justify-between gap-3 border-b border-[var(--ide-border)] bg-[var(--ide-sidebar)]/95 px-4 backdrop-blur-sm">
        <Link
          href="/"
          className="truncate font-semibold text-foreground hover:text-[var(--ide-accent)]"
        >
          {site.name}
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/"
            className="hidden text-sm text-muted hover:text-foreground sm:inline"
          >
            Back to portfolio
          </Link>
          <Link
            href={site.resumeUrl}
            target="_blank"
            rel="noopener"
            className="rounded-md bg-[var(--ide-accent)] px-3 py-1.5 text-sm text-white hover:opacity-90"
          >
            Resume
          </Link>
          <WorkLayoutHeaderActions />
        </div>
      </header>
      {children}
    </div>
  );
}
