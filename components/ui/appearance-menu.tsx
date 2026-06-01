"use client";

import { useEffect, useRef, useState } from "react";
import { editorThemePresets, type EditorThemeId } from "@/content/editor-themes";
import { useEditorTheme } from "@/hooks/use-editor-theme";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export function AppearanceMenu({ className }: { className?: string }) {
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { presetId, setPresetId } = useEditorTheme();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onPointer);
    return () => window.removeEventListener("mousedown", onPointer);
  }, [open]);

  if (!hydrated) {
    return (
      <button
        type="button"
        aria-label="Appearance"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-[var(--ide-border)]",
          className,
        )}
      />
    );
  }

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        aria-label="Appearance settings"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-[var(--ide-border)] text-muted hover:bg-[var(--ide-tab-inactive)] hover:text-foreground"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3a9 9 0 1 0 8.5 11.8M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M3 12h2M19 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Appearance"
          className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-[var(--ide-border)] bg-[var(--ide-editor)] p-3 shadow-xl"
        >
          <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-muted">
            Color theme
          </p>
          <div className="grid grid-cols-2 gap-2">
            {editorThemePresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                aria-pressed={presetId === preset.id}
                onClick={() => setPresetId(preset.id as EditorThemeId)}
                className={cn(
                  "rounded-lg border p-2 text-left transition-colors cursor-pointer",
                  presetId === preset.id
                    ? "border-[var(--ide-accent)] ring-1 ring-[var(--ide-accent)]"
                    : "border-[var(--ide-border)] hover:border-[var(--ide-accent)]/50",
                )}
              >
                <div
                  className="mb-2 flex h-8 items-center gap-1 rounded px-2 font-mono text-[10px]"
                  style={{
                    backgroundColor: preset.preview.bg,
                    color: preset.preview.fg,
                  }}
                >
                  <span style={{ color: preset.preview.accent }}>fn</span>
                  <span>()</span>
                </div>
                <span className="block text-xs font-medium text-foreground">{preset.label}</span>
                <span className="block text-[10px] text-muted">{preset.description}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
