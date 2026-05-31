export type SystemMapLayer = {
  id: string;
  label: string;
  shortLabel: string;
  technologies: string[];
  description: string;
};

export const systemMapLayers: SystemMapLayer[] = [
  {
    id: "user",
    label: "Users",
    shortLabel: "Users",
    technologies: ["Responsive UI", "Accessibility"],
    description: "Business workflows translated into intuitive, WCAG-aware experiences.",
  },
  {
    id: "frontend",
    label: "Frontend",
    shortLabel: "UI",
    technologies: ["React", "Angular", "TypeScript"],
    description: "SPAs with design tokens, routing, and performance budgets.",
  },
  {
    id: "api",
    label: "API",
    shortLabel: "API",
    technologies: ["Node.js", "Express", "REST"],
    description: "Stable contracts, validation, and predictable error shapes.",
  },
  {
    id: "logic",
    label: "Business Logic",
    shortLabel: "Logic",
    technologies: ["Auth middleware", "Domain rules"],
    description: "Secure integrations and server-side business rules.",
  },
  {
    id: "data",
    label: "Database",
    shortLabel: "Data",
    technologies: ["SQL", "Data integrity"],
    description: "Models and queries built for enterprise data workflows.",
  },
  {
    id: "deploy",
    label: "Deployment",
    shortLabel: "Deploy",
    technologies: ["Azure DevOps", "CI/CD"],
    description: "Automated pipelines with quality gates and environment promotion.",
  },
];
