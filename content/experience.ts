export type ExperienceEntry = {
  id: string;
  period: string;
  stage: string;
  role: string;
  company: string;
  technologies: string[];
  highlights: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "exp-accenture-analyst",
    period: "Nov 2022 — Present",
    stage: "Full-stack delivery",
    role: "Application Development Analyst",
    company: "Accenture",
    technologies: ["Angular", "React", "TypeScript", "Node.js", "REST", "Azure DevOps"],
    highlights: [
      "Contributed to architecture and delivery of a scalable enterprise web platform spanning multiple account and operations modules.",
      "Built reusable UI through a shared component library; structured dashboard modules with maintainable state and efficient rendering.",
      "Integrated assistant-driven workflows into account management experiences; led a documentation POC to standardize UI reuse across squads.",
      "Tightened design-to-development handoff to reduce drift and speed delivery on cross-functional releases.",
    ],
  },
  {
    id: "exp-accenture-associate",
    period: "Jun 2021 — Nov 2022",
    stage: "Enterprise foundations",
    role: "Application Development Associate",
    company: "Accenture",
    technologies: ["JavaScript", "TypeScript", "HTML", "CSS", "REST"],
    highlights: [
      "Shipped responsive executive microsites and multi-brand hospitality web experiences under tight timelines.",
      "Delivered reusable frontend modules inside CMS-driven templates with accessibility and cross-browser discipline.",
      "Partnered with product and QA on roadmap features, release stability, and iterative performance fixes.",
    ],
  },
];

export const journeyIntro =
  "Professional engineering since 2021—associate to analyst, from first production releases to platform and full-stack ownership.";
