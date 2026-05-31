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
  description:
    "Interactive React demo—shows when memoization prevents child components from re-rendering.",
  unoptimized: "Each tag’s × count rises on every parent re-render.",
  optimized: "Memoized tags keep their × count—only the parent counter moves.",
  hint: "Tags are labels, not buttons. Use “Trigger parent re-render” to see the difference.",
} as const;
