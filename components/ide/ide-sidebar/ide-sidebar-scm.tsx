"use client";

import { useState } from "react";
import { careerVersions } from "@/content/career-versions";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { cn } from "@/lib/utils";

export function IdeSidebarScm() {
  const { openFile } = useIdeWorkspace();
  const [expanded, setExpanded] = useState<string | null>("v4");

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-2 text-xs font-medium text-muted">Career progression</div>
      <p className="px-3 pb-2 text-[11px] text-muted">How my scope grew over four chapters</p>
      <div className="flex-1 overflow-y-auto pb-4">
        {careerVersions.map((v) => (
          <div key={v.id} className="border-b border-[var(--ide-border)]/50">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left font-mono text-[12px] hover:bg-[var(--ide-tab-inactive)]"
              aria-expanded={expanded === v.id}
              onClick={() => setExpanded(expanded === v.id ? null : v.id)}
            >
              <span className="text-[10px] text-muted">{expanded === v.id ? "▼" : "▶"}</span>
              <span className="text-[var(--ide-accent)]">{v.version}</span>
              <span className="truncate">{v.title}</span>
            </button>
            {expanded === v.id ? (
              <div className="space-y-2 px-3 pb-3 text-[11px] text-muted">
                <p className="text-foreground">{v.tagline}</p>
                <p>{v.period}</p>
                <ul className="list-inside list-disc space-y-0.5">
                  {v.responsibilities.slice(0, 2).map((r) => (
                    <li key={r.slice(0, 40)}>{r}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1">
                  {v.skillsGained.slice(0, 4).map((s) => (
                    <span key={s} className={cn("rounded bg-[var(--ide-tab-inactive)] px-1.5 py-0.5 font-mono text-[10px]")}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 w-full cursor-pointer px-3 py-2 text-left font-mono text-[12px] text-[var(--ide-accent)] hover:bg-[var(--ide-tab-inactive)]"
          onClick={() => openFile("experience/growth-journey.story")}
        >
          Open growth-journey.story →
        </button>
      </div>
    </div>
  );
}
