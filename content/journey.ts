export type StackNode = {
  id: string;
  label: string;
};

export type JourneyStage = {
  id: string;
  chapter: string;
  arcLabel: string;
  title: string;
  subtitle?: string;
  period: string;
  descriptor: string;
  recruiterNote: string;
  nodes: StackNode[];
  /** Directed edges [fromId, toId] for SVG connectors */
  edges: [string, string][];
};

/**
 * Career arc: college (2017–2021) → professional engineering from Jun 2021.
 * Narrative only—resume bullets and dates are canonical in experience.ts.
 */
export const journeyStages: JourneyStage[] = [
  {
    id: "college",
    chapter: "01",
    arcLabel: "Foundations",
    title: "Engineering school",
    subtitle: "B.Tech · Electronics & Communications",
    period: "2017 — 2021",
    descriptor:
      "Circuits and systems thinking first—then software, projects, and first interfaces. The base before any production role.",
    recruiterNote:
      "STEM discipline before enterprise delivery—intent and craft, not coursework alone.",
    nodes: [
      { id: "stem", label: "STEM foundations" },
      { id: "code", label: "Software craft" },
      { id: "interfaces", label: "First interfaces" },
    ],
    edges: [
      ["stem", "code"],
      ["code", "interfaces"],
    ],
  },
  {
    id: "first-ships",
    chapter: "02",
    arcLabel: "First production",
    title: "Enterprise delivery begins",
    subtitle: "Application Development Associate",
    period: "Jun 2021 — Nov 2022",
    descriptor:
      "Moved from experiments to reviewed releases—real client UI, APIs, and release discipline.",
    recruiterNote: "Career engineering starts here—see Experience for role highlights.",
    nodes: [
      { id: "users", label: "Users" },
      { id: "ui", label: "UI" },
      { id: "release", label: "Release" },
    ],
    edges: [
      ["users", "ui"],
      ["ui", "release"],
    ],
  },
  {
    id: "platform-depth",
    chapter: "03",
    arcLabel: "Platform depth",
    title: "UI at enterprise scale",
    subtitle: "Application Development Analyst",
    period: "Nov 2022 — 2024",
    descriptor:
      "Scope grew into shared libraries, dense dashboards, and quality bars across modules—not single-screen work.",
    recruiterNote: "Platform and reuse story—bullets in Experience.",
    nodes: [
      { id: "users", label: "Users" },
      { id: "ui", label: "UI" },
      { id: "shared-ui", label: "Shared UI" },
      { id: "dashboards", label: "Dashboards" },
      { id: "quality", label: "Quality" },
    ],
    edges: [
      ["users", "ui"],
      ["ui", "shared-ui"],
      ["ui", "dashboards"],
      ["ui", "quality"],
    ],
  },
  {
    id: "fullstack",
    chapter: "04",
    arcLabel: "Full stack",
    title: "Systems end to end",
    subtitle: "Application Development Analyst",
    period: "2024 — Present",
    descriptor:
      "Owns the full path—interface, services, data, and deployment—so features ship as coherent systems.",
    recruiterNote: "End-to-end delivery—current role details in Experience.",
    nodes: [
      { id: "users", label: "Users" },
      { id: "frontend", label: "Frontend" },
      { id: "api", label: "API" },
      { id: "logic", label: "Logic" },
      { id: "data", label: "Data" },
      { id: "cicd", label: "CI/CD" },
      { id: "deploy", label: "Deploy" },
    ],
    edges: [
      ["users", "frontend"],
      ["frontend", "api"],
      ["api", "logic"],
      ["logic", "data"],
      ["data", "cicd"],
      ["cicd", "deploy"],
    ],
  },
];

/** @deprecated Use journeyStages — kept for console / a11y */
export const journeyEras = journeyStages.map((s) => ({
  id: s.id,
  title: s.title,
  period: s.period,
  summary: s.descriptor,
  technologies: s.nodes.map((n) => n.label),
  milestone: s.recruiterNote,
}));

export const journeyIntro =
  "Four chapters—from engineering school to full-stack delivery. Watch the stack grow; dates and bullets live in Experience.";

export const JOURNEY_STAGE_COUNT = journeyStages.length;

/** Desktop journey uses GSAP ScrollTrigger pin; distance is viewport-based in the component */
export const JOURNEY_STAGE_SCROLL_VH = 85;
