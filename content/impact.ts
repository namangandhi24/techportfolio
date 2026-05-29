export type ImpactBlock = {
  id: string;
  title: string;
  evidence: string;
  context: string;
};

export const impactBlocks: ImpactBlock[] = [
  {
    id: "releases",
    title: "Production releases",
    evidence: "50+ shipped releases",
    context:
      "Contributed to enterprise web modules released through structured Azure DevOps pipelines with code review and quality gates.",
  },
  {
    id: "apps",
    title: "Enterprise platforms",
    evidence: "Multi-module web platform",
    context:
      "Contributed to architecture and upgrades of a large-scale account and operations platform with structured dashboards and account workflows.",
  },
  {
    id: "components",
    title: "Reusable UI patterns",
    evidence: "Centralized component library",
    context:
      "Shipped enterprise-grade shared UI primitives and a documentation POC so squads could reuse patterns instead of rebuilding screens.",
  },
  {
    id: "cicd",
    title: "CI/CD discipline",
    evidence: "Azure DevOps pipelines",
    context:
      "Integrated frontend builds with environment promotion, traceable releases, and rollback-safe deployment practices.",
  },
  {
    id: "a11y",
    title: "Accessibility",
    evidence: "WCAG 2.2 AA target",
    context:
      "Semantic structure, keyboard paths, and contrast discipline on every interface—not retrofitted at the end.",
  },
  {
    id: "perf",
    title: "Performance",
    evidence: "LCP target < 2s on this site",
    context:
      "Bundle discipline, static generation, and client islands only where interaction requires it—portfolio build target documented openly.",
  },
];

export const consoleStats = [
  { label: "Accenture tenure", value: "4+ years" },
  { label: "Production releases", value: "50+" },
  { label: "Primary stack", value: "Angular · React · Node" },
  { label: "Delivery", value: "Azure DevOps CI/CD" },
] as const;
