"use client";

import { journeyIntro, journeyStages } from "@/content/journey";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";
import { cn } from "@/lib/utils";

export function StoryView() {
  const { openFile } = useIdeWorkspace();

  return (
    <IdeEditorChrome lineCount={40}>
      <div className="max-w-3xl space-y-6">
        <p className="text-muted">{journeyIntro}</p>
        <div className="relative space-y-8 border-l-2 border-[var(--ide-accent)] pl-6">
          {journeyStages.map((stage, i) => (
            <div key={stage.id} className="relative">
              <span
                className={cn(
                  "absolute -left-[calc(1.5rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-[var(--ide-accent)]",
                )}
                aria-hidden
              />
              <p className="font-mono text-[11px] text-muted">
                Chapter {stage.chapter} · {stage.arcLabel}
              </p>
              <h2 className="text-lg font-semibold">{stage.title}</h2>
              {stage.subtitle ? (
                <p className="font-mono text-[12px] text-[var(--ide-accent)]">{stage.subtitle}</p>
              ) : null}
              <p className="text-sm text-muted">{stage.descriptor}</p>
              <p className="mt-1 font-mono text-[11px] text-muted">{stage.period}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {stage.nodes.map((node) => (
                  <span
                    key={node.id}
                    className="rounded border border-[var(--ide-border)] px-2 py-1 font-mono text-[11px]"
                  >
                    {node.label}
                  </span>
                ))}
              </div>
              {i === journeyStages.length - 1 ? (
                <button
                  type="button"
                  onClick={() => openFile("experience/accenture.timeline")}
                  className="mt-3 font-mono text-[12px] text-[var(--ide-accent)] hover:underline"
                >
                  View full timeline →
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </IdeEditorChrome>
  );
}
