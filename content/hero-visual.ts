export type HeroOrbitNode = {
  id: string;
  label: string;
  /** 0–100, relative to branding canvas */
  x: number;
  y: number;
  zone: "frontend" | "backend" | "engineering" | "delivery";
  depth: number;
  floatOffset: number;
};

/** Curated ecosystem — text labels only, no logo assets */
export const heroOrbitNodes: HeroOrbitNode[] = [
  { id: "react", label: "React", x: 8, y: 18, zone: "frontend", depth: 0.35, floatOffset: 0 },
  { id: "angular", label: "Angular", x: 4, y: 42, zone: "frontend", depth: 0.28, floatOffset: 0.6 },
  { id: "typescript", label: "TypeScript", x: 14, y: 68, zone: "frontend", depth: 0.4, floatOffset: 1.1 },
  { id: "node", label: "Node.js", x: 88, y: 16, zone: "backend", depth: 0.32, floatOffset: 0.3 },
  { id: "apis", label: "APIs", x: 92, y: 38, zone: "backend", depth: 0.38, floatOffset: 0.9 },
  { id: "express", label: "Express", x: 84, y: 62, zone: "backend", depth: 0.3, floatOffset: 1.4 },
  { id: "a11y", label: "Accessibility", x: 22, y: 8, zone: "engineering", depth: 0.22, floatOffset: 0.5 },
  { id: "perf", label: "Performance", x: 72, y: 6, zone: "engineering", depth: 0.25, floatOffset: 1.0 },
  { id: "arch", label: "Architecture", x: 50, y: 4, zone: "engineering", depth: 0.2, floatOffset: 1.6 },
  { id: "azure", label: "Azure DevOps", x: 18, y: 88, zone: "delivery", depth: 0.34, floatOffset: 0.2 },
  { id: "cicd", label: "CI/CD", x: 50, y: 92, zone: "delivery", depth: 0.26, floatOffset: 0.8 },
  { id: "deploy", label: "Deployment", x: 78, y: 86, zone: "delivery", depth: 0.36, floatOffset: 1.3 },
];

export const heroPortrait = {
  src: process.env.NEXT_PUBLIC_PORTRAIT_URL ?? "/portrait.jpg",
  alt: "Naman Gandhi — Full Stack Engineer",
} as const;
