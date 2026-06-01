import { profile } from "@/content/profile";

/** Single source of truth for recruiter-facing facts and hero metrics */
export const proof = {
  tenureYears: "4.5+",
  tenureYearsLabel: "Years at Accenture",
  productionReleases: "50+",
  productionReleasesLabel: "Production releases",
  lcpTarget: "< 2s",
  lcpTargetLabel: "LCP target",
  accessibilityStandard: "AA",
  accessibilityLabel: "Accessibility standard",
  careerStartYear: 2021,
  primaryStack: [
    "Angular",
    "React",
    "TypeScript",
    "Node.js",
    "JavaScript",
    "Azure DevOps",
  ] as const,
  stackShort: "Angular · React · Node",
  delivery: "Azure DevOps CI/CD",
} as const;

export const heroMetrics = [
  { value: proof.tenureYears, label: proof.tenureYearsLabel },
  { value: proof.productionReleases, label: proof.productionReleasesLabel },
  { value: proof.lcpTarget, label: proof.lcpTargetLabel },
  { value: proof.accessibilityStandard, label: proof.accessibilityLabel },
] as const;

export const consoleStats = [
  { label: "Accenture tenure", value: `${proof.tenureYears} years` },
  { label: "Production releases", value: proof.productionReleases },
  { label: "Primary stack", value: proof.stackShort },
  { label: "Delivery", value: proof.delivery },
] as const;

export const techBadges = proof.primaryStack;

export function siteDescription(): string {
  return `${profile.currentRole} at ${profile.currentCompany} with ${proof.tenureYears} years building enterprise web applications. ${proof.stackShort}, REST APIs, and ${proof.delivery}.`;
}

export function profileAbout(): string {
  return `4.5+ years with Angular, React, and TypeScript—full-stack depth with frontend excellence at the core.`;
}
