export type Achievement = {
  id: string;
  label: string;
  detail?: string;
};

export const achievements: Achievement[] = [
  {
    id: "years",
    label: "4+ Years Experience",
    detail: "Accenture · Jun 2021 — Present",
  },
  {
    id: "releases",
    label: "50+ Production Releases",
    detail: "Platform modules, microsites, and product UI shipped to production",
  },
  {
    id: "enterprise",
    label: "Enterprise Platforms",
    detail: "Scalable web platform with shared UI and account workflows",
  },
  {
    id: "fullstack",
    label: "Full Stack Development",
    detail: "Angular, React, Node.js, REST, Azure DevOps",
  },
  {
    id: "performance",
    label: "Performance-Focused Engineering",
    detail: "Core Web Vitals and bundle discipline on every release",
  },
];
