"use client";

import { getFileDisplayLabel, getFileSubtitle } from "@/content/ide-manifest";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";

export function IdeSectionHeader() {
  const { activeFile } = useIdeWorkspace();
  if (!activeFile) return null;

  const title = getFileDisplayLabel(activeFile.path);
  const subtitle = getFileSubtitle(activeFile.path);

  return (
    <div className="shrink-0 border-b border-[var(--ide-border)] bg-[var(--ide-tab-inactive)]/20 px-6 py-4">
      <div className="workspace-section max-w-2xl">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{title}</h1>
        {subtitle ? (
          <p className="mt-1 text-sm leading-relaxed text-muted">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
