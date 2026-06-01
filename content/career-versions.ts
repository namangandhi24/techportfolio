import { experience } from "@/content/experience";
import { journeyStages } from "@/content/journey";

export type CareerVersion = {
  id: string;
  version: string;
  title: string;
  period: string;
  tagline: string;
  responsibilities: string[];
  skillsGained: string[];
  projects: string[];
  achievements: string[];
};

export const careerVersions: CareerVersion[] = [
  {
    id: "v1",
    version: "v1.0",
    title: "Frontend Developer",
    period: "2017 — 2021",
    tagline: journeyStages[0]?.descriptor ?? "Engineering foundations and first interfaces.",
    responsibilities: [
      "Built software craft on STEM foundations at GLA University.",
      "Shipped first UI experiments and project interfaces.",
      "Developed discipline for structured problem-solving before production roles.",
    ],
    skillsGained: ["HTML/CSS", "JavaScript basics", "Software fundamentals", "UI prototyping"],
    projects: ["Academic projects", "First interfaces"],
    achievements: [
      "B.Tech in Electronics & Communications Engineering",
      "TEDxGLAU Curator Program (2020 — 2021)",
    ],
  },
  {
    id: "v2",
    version: "v2.0",
    title: "Enterprise Engineer",
    period: "Jun 2021 — Nov 2022",
    tagline: journeyStages[1]?.descriptor ?? "First production releases at Accenture.",
    responsibilities: experience[1]?.highlights ?? [],
    skillsGained: experience[1]?.technologies ?? [],
    projects: ["Executive microsites", "Hospitality web experiences", "CMS-driven templates"],
    achievements: [
      "Moved from experiments to reviewed production releases.",
      "Delivered responsive, accessible modules under tight timelines.",
    ],
  },
  {
    id: "v3",
    version: "v3.0",
    title: "Frontend Specialist",
    period: "Nov 2022 — 2024",
    tagline: journeyStages[2]?.descriptor ?? "Shared UI and platform modules at scale.",
    responsibilities: [
      "Built reusable UI through a shared component library.",
      "Structured dashboard modules with maintainable state.",
      "Led documentation POC for squad-wide UI reuse.",
    ],
    skillsGained: ["Angular", "React", "TypeScript", "Design systems", "State management"],
    projects: ["Enterprise Account Platform", "Shared component library"],
    achievements: [
      "Platform depth across multiple account and operations modules.",
      "Tightened design-to-development handoff.",
    ],
  },
  {
    id: "v4",
    version: "v4.0",
    title: "Full Stack Engineer",
    period: "2024 — Present",
    tagline: journeyStages[3]?.descriptor ?? "End-to-end systems delivery.",
    responsibilities: experience[0]?.highlights ?? [],
    skillsGained: [
      ...(experience[0]?.technologies ?? []),
      "System architecture",
      "CI/CD",
    ],
    projects: ["Enterprise Account Platform", "This Portfolio", "Assistant-driven workflows"],
    achievements: [
      "Owns interface, services, data, and deployment paths.",
      "50+ production releases with accessibility and performance discipline.",
    ],
  },
];
