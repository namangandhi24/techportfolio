export const systemDesignLayers = [
  {
    id: "user",
    label: "Users",
    shortLabel: "Users",
    description: "Accessible interfaces, responsive layouts, performance budgets.",
    responsibility: "Translate business needs into intuitive flows with WCAG-aware UI and fast perceived load.",
    techExamples: ["Responsive layouts", "Core Web Vitals", "Design tokens"],
  },
  {
    id: "frontend",
    label: "Frontend",
    shortLabel: "UI",
    description: "React / Angular SPAs, design systems, state, routing, error boundaries.",
    responsibility: "Ship modular components, predictable state, and route-level performance optimizations.",
    techExamples: ["Angular", "React", "TypeScript", "Lazy loading"],
  },
  {
    id: "api",
    label: "API layer",
    shortLabel: "API",
    description: "REST contracts, validation, versioning, consistent error shapes.",
    responsibility: "Define stable contracts between UI and services with clear validation and errors.",
    techExamples: ["REST", "OpenAPI-style contracts", "Error handling"],
  },
  {
    id: "logic",
    label: "Business logic",
    shortLabel: "Logic",
    description: "Node.js services, auth middleware, domain rules, integrations.",
    responsibility: "Implement domain rules, auth middleware, and third-party integrations securely.",
    techExamples: ["Node.js", "Express", "Auth middleware"],
  },
  {
    id: "data",
    label: "Data",
    shortLabel: "Data",
    description: "SQL / document stores, migrations, query patterns, data integrity.",
    responsibility: "Model data for integrity, migrations, and query performance at scale.",
    techExamples: ["SQL", "MongoDB", "Migrations"],
  },
  {
    id: "deploy",
    label: "Deployment",
    shortLabel: "Deploy",
    description: "Azure DevOps CI/CD, environments, quality gates, rollbacks.",
    responsibility: "Automate builds, environment promotion, and rollback-safe releases.",
    techExamples: ["Azure DevOps", "CI/CD", "Quality gates"],
  },
] as const;

export type SystemLayer = (typeof systemDesignLayers)[number];

export const systemFlows = [
  {
    title: "Request lifecycle",
    steps: ["Client", "API gateway", "Service", "Database", "Response"],
  },
  {
    title: "Authentication",
    steps: ["Sign-in UI", "Token / session", "Protected routes", "API authorization"],
  },
] as const;
