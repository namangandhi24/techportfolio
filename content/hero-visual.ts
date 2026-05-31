import type { BrandLogoId } from "@/content/brand-logos";

export type HeroArtifact = {
  id: string;
  /** Screen-reader only — icons are visual */
  label: string;
  /** Rest position 0–100 within hero visual area */
  restX: number;
  restY: number;
  /** When set, uses /public/logos/{brand}.svg with SVG fallback */
  brand?: BrandLogoId;
};

export const heroArtifacts: HeroArtifact[] = [
  { id: "browser", label: "Angular SPA", restX: 12, restY: 14, brand: "angular" },
  { id: "components", label: "React components", restX: 8, restY: 38, brand: "react" },
  { id: "api", label: "Node API", restX: 88, restY: 12, brand: "nodejs" },
  { id: "database", label: "MongoDB", restX: 90, restY: 36, brand: "mongodb" },
  { id: "deployment", label: "Azure deployment", restX: 78, restY: 78, brand: "azure" },
  { id: "python", label: "Python analytics", restX: 50, restY: 8, brand: "python" },
  { id: "java", label: "Java services", restX: 18, restY: 82, brand: "java" },
  { id: "cicd", label: "Azure DevOps CI/CD", restX: 50, restY: 88, brand: "azure-devops" },
];

export const heroPortrait = {
  src: process.env.NEXT_PUBLIC_PORTRAIT_URL ?? "/naman-hero.png",
  alt: "Naman Gandhi — Full Stack Engineer",
} as const;

/** @deprecated */
export type HeroOrbitNode = HeroArtifact;
/** @deprecated */
export const heroOrbitNodes = heroArtifacts;
