import { systemDesignLayers } from "@/content/system-design";

export type SandboxTab = "explorer" | "api-flow" | "performance";

export const sandboxTabs: { id: SandboxTab; label: string; short: string }[] = [
  { id: "explorer", label: "Architecture Explorer", short: "Architecture" },
  { id: "api-flow", label: "API Flow", short: "API Flow" },
  { id: "performance", label: "Performance Lab", short: "Performance" },
];

export const explorerLayers = systemDesignLayers.map((layer) => ({
  id: layer.id,
  label: layer.label,
  decision:
    layer.id === "frontend"
      ? "Angular for enterprise modules; React for greenfield features—chosen per client stack and team velocity."
      : layer.id === "deploy"
        ? "Azure DevOps pipelines with quality gates match Accenture delivery standards and audit requirements."
        : layer.responsibility,
  tech: layer.techExamples,
}));

export const apiFlowSteps = systemDesignLayers.map((l) => ({
  id: l.id,
  label: l.shortLabel,
}));

export const performanceLabCopy = {
  title: "Render discipline",
  unoptimized: "List re-renders on every parent update.",
  optimized: "Memoized list items—fewer wasted renders.",
} as const;
