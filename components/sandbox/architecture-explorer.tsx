"use client";

import { useState } from "react";
import { explorerLayers } from "@/content/sandbox";
import { cn } from "@/lib/utils";

export function ArchitectureExplorer() {
  const [activeId, setActiveId] = useState(explorerLayers[0]?.id ?? "frontend");
  const active = explorerLayers.find((l) => l.id === activeId) ?? explorerLayers[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <ul className="flex flex-wrap gap-2 lg:flex-col">
        {explorerLayers.map((layer) => (
          <li key={layer.id}>
            <button
              type="button"
              onClick={() => setActiveId(layer.id)}
              className={cn(
                "w-full cursor-pointer rounded-lg border px-4 py-2.5 text-left text-sm font-medium transition-all duration-200",
                activeId === layer.id
                  ? "border-accent/50 bg-card ring-2 ring-accent/15"
                  : "border-border bg-background hover:border-accent/25",
              )}
            >
              {layer.label}
            </button>
          </li>
        ))}
      </ul>
      {active ? (
        <div className="rounded-xl border border-border bg-background p-5">
          <h3 className="text-lg font-semibold text-foreground">{active.label}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{active.decision}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {active.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
