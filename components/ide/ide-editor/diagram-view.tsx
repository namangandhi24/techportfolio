"use client";

import { useState } from "react";
import { systemDesignLayers } from "@/content/system-design";
import { systemMapLayers } from "@/content/system-map";
import { SystemFlowRail } from "@/components/ui/system-flow-rail";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";
import type { IdeFileEntry } from "@/content/ide-manifest";

type DiagramViewProps = {
  file: IdeFileEntry;
};

export function DiagramView({ file }: DiagramViewProps) {
  const layers = file.contentRef === "system-map" ? systemMapLayers : systemDesignLayers;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = layers[activeIndex];

  const steps = layers.map((l) => ({
    id: l.id,
    label: l.label,
    shortLabel: "shortLabel" in l && l.shortLabel ? l.shortLabel : l.label,
  }));

  return (
    <IdeEditorChrome lineCount={24}>
      <div className="max-w-3xl space-y-4">
        <h1 className="text-xl font-semibold">
          {file.contentRef === "system-map" ? "Platform Stack Map" : "System Architecture"}
        </h1>
        <SystemFlowRail
          steps={steps}
          activeIndex={activeIndex}
          onStepChange={setActiveIndex}
        />
        {active ? (
          <div className="rounded-lg border border-[var(--ide-border)] p-4">
            <h2 className="font-semibold">{active.label}</h2>
            <p className="mt-2 text-sm text-muted">{active.description}</p>
            {"responsibility" in active ? (
              <p className="mt-2 text-sm">{active.responsibility}</p>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {("techExamples" in active ? active.techExamples : active.technologies).map(
                (t: string) => (
                  <span
                    key={t}
                    className="rounded bg-[var(--ide-tab-inactive)] px-2 py-0.5 font-mono text-[11px]"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>
        ) : null}
      </div>
    </IdeEditorChrome>
  );
}
