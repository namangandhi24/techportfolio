"use client";

import { runDebugDemos } from "@/content/ide-manifest";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { cn } from "@/lib/utils";

export function IdeSidebarRun() {
  const { openFile, activeFile } = useIdeWorkspace();

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-2 text-xs font-medium text-muted">Interactive demos</div>
      <p className="px-3 pb-2 text-[11px] text-muted">See how I think about architecture and performance</p>
      <ul className="flex-1 overflow-y-auto pb-4">
        {runDebugDemos.map((demo) => {
          const isActive = activeFile?.path === demo.path;
          return (
            <li key={demo.id}>
              <button
                type="button"
                className={cn(
                  "flex w-full cursor-pointer flex-col items-start px-3 py-2 text-left hover:bg-[var(--ide-tab-inactive)]",
                  isActive && "bg-[var(--ide-tab-inactive)]",
                )}
                onClick={() => openFile(demo.path)}
              >
                <span className="font-mono text-[12px] text-[var(--ide-accent)]">▶ {demo.label}</span>
                <span className="text-[11px] text-muted">{demo.description}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
