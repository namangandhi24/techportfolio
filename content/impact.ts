export type ImpactBlock = {
  id: string;
  title: string;
  evidence: string;
  context: string;
};

/** Work-specific outcomes—hero owns headline metrics (tenure, releases, LCP, AA) */
export const impactBlocks: ImpactBlock[] = [
  {
    id: "documentation-poc",
    title: "UI documentation POC",
    evidence: "Squad-wide reuse",
    context:
      "Led a documentation proof of concept so teams could adopt shared primitives faster—fewer one-off screens and clearer handoffs.",
  },
  {
    id: "assistant-workflows",
    title: "Assistant-driven workflows",
    evidence: "Account management UX",
    context:
      "Integrated assistant-guided flows into account management modules—complex operations surfaced as guided steps instead of dense forms.",
  },
  {
    id: "multi-brand",
    title: "Multi-brand delivery",
    evidence: "Executive & hospitality sites",
    context:
      "Shipped responsive executive microsites and multi-brand hospitality experiences under tight timelines with CMS-driven templates.",
  },
  {
    id: "handoff",
    title: "Design–dev handoff",
    evidence: "Less drift, faster releases",
    context:
      "Tightened specification and review rituals with design and product so cross-functional releases shipped with fewer rework cycles.",
  },
  {
    id: "platform-modules",
    title: "Platform modules",
    evidence: "Account & operations UI",
    context:
      "Contributed to a large-scale account and operations platform—structured dashboards, shared state patterns, and maintainable module boundaries.",
  },
  {
    id: "shared-ui",
    title: "Shared UI library",
    evidence: "Enterprise primitives",
    context:
      "Built and extended a centralized component library so squads shipped consistent, accessible patterns instead of rebuilding controls.",
  },
];

export { consoleStats } from "@/content/proof";
