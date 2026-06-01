"use client";

import { useEffect, useRef } from "react";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  activeSection: string;
};

export function MobileNav({ open, onClose, activeSection }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable?.[0]?.focus();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer bg-background/80 backdrop-blur-sm"
        aria-label="Close menu"
        onClick={onClose}
      />
      <nav
        ref={panelRef}
        className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-8 flex items-center justify-between">
          <span className="font-mono text-xs text-muted uppercase tracking-widest">
            Navigate
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg border border-border px-3 py-1.5 text-sm text-muted hover:text-foreground"
          >
            Close
          </button>
        </div>
        <ul className="flex flex-col gap-1">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={onClose}
                className={cn(
                  "block rounded-lg px-4 py-3 text-base transition-colors",
                  activeSection === item.sectionId
                    ? "bg-accent-muted font-medium text-foreground"
                    : "text-muted hover:bg-accent-muted/50 hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-8 font-mono text-[10px] text-muted">
          Press <kbd className="rounded border border-border px-1">Esc</kbd> to close
        </p>
      </nav>
    </div>
  );
}
