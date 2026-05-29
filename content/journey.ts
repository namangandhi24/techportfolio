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
 * Stacks visualize how scope grew—not job titles alone.
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
      "STEM discipline and self-directed builds before enterprise delivery—shows intent, not just coursework.",
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
      "Joined Accenture and moved from experiments to reviewed releases—UI, APIs, and release discipline on real client work.",
    recruiterNote:
      "Clear inflection point: career engineering starts 2021, with production ownership from day one in consulting.",
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
      "Shared component libraries, dense dashboards, and quality bars—performance and accessibility on every delivery.",
    recruiterNote:
      "Evidence of senior-leaning frontend: reuse, documentation culture, and multi-module platform thinking.",
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
      "Owns the full path—interface, services, data, and deployment—so features ship as coherent systems, not isolated screens.",
    recruiterNote:
      "Full-stack credibility for teams that need one engineer to reason across the entire delivery surface.",
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
  "Four chapters—from engineering school (2017–2021) to enterprise platforms. Professional delivery starts 2021; scroll to watch the stack grow.";

export const JOURNEY_STAGE_COUNT = journeyStages.length;

/** Scroll track height per stage (vh) — natural scroll, no heavy pin */
export const JOURNEY_STAGE_SCROLL_VH = 85;
