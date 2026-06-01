"use client";

import dynamic from "next/dynamic";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";
import type { IdeFileEntry } from "@/content/ide-manifest";

const ApiFlowSimulator = dynamic(
  () => import("@/components/sandbox/api-flow-simulator").then((m) => m.ApiFlowSimulator),
  { loading: () => <DemoSkeleton /> },
);

const PerformanceLab = dynamic(
  () => import("@/components/sandbox/performance-lab").then((m) => m.PerformanceLab),
  { loading: () => <DemoSkeleton /> },
);

const ArchitectureExplorer = dynamic(
  () => import("@/components/sandbox/architecture-explorer").then((m) => m.ArchitectureExplorer),
  { loading: () => <DemoSkeleton /> },
);

function DemoSkeleton() {
  return <div className="h-48 animate-pulse rounded-lg bg-[var(--ide-tab-inactive)]" />;
}

type DemoViewProps = {
  file: IdeFileEntry;
};

export function DemoView({ file }: DemoViewProps) {
  const demo = file.contentRef.replace("demo:", "");

  return (
    <div className="min-h-0 flex-1 overflow-auto p-4">
      {demo === "api-flow" ? <ApiFlowSimulator /> : null}
      {demo === "performance" ? <PerformanceLab /> : null}
      {demo === "architecture" ? <ArchitectureExplorer /> : null}
    </div>
  );
}

export function DemoViewWithChrome({ file }: DemoViewProps) {
  if (file.kind === "demo") {
    return <DemoView file={file} />;
  }
  return (
    <IdeEditorChrome lineCount={10}>
      <DemoView file={file} />
    </IdeEditorChrome>
  );
}
