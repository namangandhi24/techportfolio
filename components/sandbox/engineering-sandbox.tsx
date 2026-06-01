"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Section } from "@/components/layout/section";
import { SectionReveal } from "@/components/motion/section-reveal";
import { ArchitectureExplorer } from "@/components/sandbox/architecture-explorer";
import { sandboxTabs, type SandboxTab } from "@/content/sandbox";
import { cn } from "@/lib/utils";

const ApiFlowSimulator = dynamic(
  () =>
    import("@/components/sandbox/api-flow-simulator").then((m) => m.ApiFlowSimulator),
  { loading: () => <PanelSkeleton /> },
);

const PerformanceLab = dynamic(
  () =>
    import("@/components/sandbox/performance-lab").then((m) => m.PerformanceLab),
  { loading: () => <PanelSkeleton /> },
);

function PanelSkeleton() {
  return <div className="h-48 animate-pulse rounded-xl bg-border" />;
}

export function EngineeringSandbox() {
  const [tab, setTab] = useState<SandboxTab>("explorer");

  useEffect(() => {
    const parseHash = () => {
      const raw = window.location.hash.replace("#", "");
      const [, query] = raw.split("?");
      const demo = new URLSearchParams(query ?? "").get("demo") as SandboxTab | null;
      if (demo && sandboxTabs.some((t) => t.id === demo)) setTab(demo);
    };
    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  return (
    <Section
      id="sandbox"
      label="Sandbox"
      title="Engineering sandbox"
      description="Explore how I think about architecture—one focused demo at a time, under two minutes."
    >
      <SectionReveal>
        <div
          role="tablist"
          aria-label="Sandbox demos"
          className="mb-6 flex flex-wrap gap-2"
        >
          {sandboxTabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200",
                tab === t.id
                  ? "border-accent/50 bg-card text-foreground ring-2 ring-accent/15"
                  : "border-border bg-background text-muted hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          className="rounded-2xl border border-border bg-card p-6 md:p-8"
        >
          {tab === "explorer" ? <ArchitectureExplorer /> : null}
          {tab === "api-flow" ? <ApiFlowSimulator /> : null}
          {tab === "performance" ? <PerformanceLab /> : null}
        </div>
      </SectionReveal>
    </Section>
  );
}
