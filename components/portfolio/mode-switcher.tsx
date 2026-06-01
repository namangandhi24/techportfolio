"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { portfolioModes, type PortfolioMode } from "@/content/portfolio-modes";
import { usePortfolioMode } from "@/hooks/use-portfolio-mode";
import { cn } from "@/lib/utils";

function ModeIconSmall({ mode, className }: { mode: PortfolioMode; className?: string }) {
  const cls = cn("h-4 w-4", className);
  if (mode === "classic") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="5" y="4" width="14" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9h8M8 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="5" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="5" width="11" height="14" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function ModeSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { mode, setMode } = usePortfolioMode();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [open]);

  const activeMode = mode ?? "workspace";

  const switchTo = (next: PortfolioMode) => {
    setMode(next);
    setOpen(false);
    if (pathname !== "/") {
      router.push("/");
    } else if (next === "workspace") {
      window.history.replaceState(null, "", "/");
    }
  };

  const other = portfolioModes.find((m) => m.id !== activeMode)!;
  const current = portfolioModes.find((m) => m.id === activeMode)!;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Switch portfolio view"
        aria-expanded={open}
        title={`Viewing: ${current.label}`}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[var(--ide-border)] text-muted hover:bg-[var(--ide-tab-inactive)] hover:text-foreground"
      >
        <ModeIconSmall mode={activeMode} />
      </button>

      {open ? (
        <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-[var(--ide-border)] bg-[var(--ide-editor)] p-2 shadow-xl">
          <p className="px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-muted">
            Portfolio view
          </p>
          <p className="px-2 pb-2 text-xs text-muted">Currently: {current.label}</p>
          <button
            type="button"
            className="flex w-full cursor-pointer items-start gap-3 rounded-md px-2 py-2 text-left text-sm hover:bg-[var(--ide-tab-inactive)]"
            onClick={() => switchTo(other.id)}
          >
            <ModeIconSmall mode={other.id} className="mt-0.5 shrink-0 text-[var(--ide-accent)]" />
            <span>
              <span className="font-medium text-foreground">Switch to {other.label}</span>
              <span className="mt-0.5 block text-xs text-muted">{other.description}</span>
            </span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
