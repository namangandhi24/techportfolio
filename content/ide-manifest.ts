import { projects, getProjectBySlug } from "@/content/projects";

export type IdeFileKind =
  | "markdown"
  | "typescript"
  | "json"
  | "diagram"
  | "project"
  | "pdf"
  | "story"
  | "timeline"
  | "stack"
  | "contact"
  | "demo";

export type IdeActivityView =
  | "explorer"
  | "search"
  | "scm"
  | "run"
  | "extensions"
  | "profile";

export type IdeFileEntry = {
  id: string;
  path: string;
  label: string;
  kind: IdeFileKind;
  contentRef: string;
  keywords?: string[];
};

export type IdeTreeNode =
  | { type: "folder"; id: string; name: string; children: IdeTreeNode[] }
  | { type: "file"; file: IdeFileEntry };

export const WORKSPACE_NAME = "NamanPortfolio.code-workspace";

const projectFiles: IdeFileEntry[] = projects.map((p) => ({
  id: `project-${p.slug}`,
  path: `projects/${p.slug}.tsx`,
  label: `${p.slug}.tsx`,
  kind: "project" as const,
  contentRef: `projects:${p.slug}`,
  keywords: [p.title, ...p.stack, p.role],
}));

export const ideFiles: IdeFileEntry[] = [
  {
    id: "readme",
    path: "README.md",
    label: "README.md",
    kind: "markdown",
    contentRef: "hero",
    keywords: ["intro", "metrics", "home", "naman"],
  },
  {
    id: "profile-md",
    path: "about/profile.md",
    label: "profile.md",
    kind: "markdown",
    contentRef: "profile",
    keywords: ["about", "bio", "photo"],
  },
  {
    id: "summary-ts",
    path: "about/summary.ts",
    label: "summary.ts",
    kind: "typescript",
    contentRef: "summary",
    keywords: ["typescript", "summary", "experience"],
  },
  {
    id: "principles-json",
    path: "about/engineering-principles.json",
    label: "engineering-principles.json",
    kind: "json",
    contentRef: "principles",
    keywords: ["principles", "values", "engineering"],
  },
  {
    id: "accenture-timeline",
    path: "experience/accenture.timeline",
    label: "accenture.timeline",
    kind: "timeline",
    contentRef: "experience",
    keywords: ["accenture", "career", "roles"],
  },
  {
    id: "growth-journey",
    path: "experience/growth-journey.story",
    label: "growth-journey.story",
    kind: "story",
    contentRef: "journey",
    keywords: ["journey", "growth", "career arc"],
  },
  {
    id: "frontend-stack",
    path: "skills/frontend.stack",
    label: "frontend.stack",
    kind: "stack",
    contentRef: "stack:frontend",
    keywords: ["angular", "react", "typescript", "frontend"],
  },
  {
    id: "backend-stack",
    path: "skills/backend.stack",
    label: "backend.stack",
    kind: "stack",
    contentRef: "stack:backend",
    keywords: ["node", "express", "rest", "backend", "api"],
  },
  {
    id: "platform-stack",
    path: "skills/platform.stack",
    label: "platform.stack",
    kind: "stack",
    contentRef: "stack:platform",
    keywords: ["azure", "devops", "ci/cd", "deployment"],
  },
  {
    id: "system-diagram",
    path: "architecture/system.diagram",
    label: "system.diagram",
    kind: "diagram",
    contentRef: "system-design",
    keywords: ["architecture", "system", "layers"],
  },
  {
    id: "platform-diagram",
    path: "architecture/platform.diagram",
    label: "platform.diagram",
    kind: "diagram",
    contentRef: "system-map",
    keywords: ["platform", "map", "stack"],
  },
  {
    id: "contact-info",
    path: "contact/info.md",
    label: "info.md",
    kind: "contact",
    contentRef: "contact",
    keywords: ["email", "linkedin", "contact"],
  },
  {
    id: "resume-pdf",
    path: "contact/resume.pdf",
    label: "resume.pdf",
    kind: "pdf",
    contentRef: "resume",
    keywords: ["resume", "cv", "download"],
  },
  ...projectFiles,
  {
    id: "demo-api-flow",
    path: "demos/api-flow.simulator",
    label: "api-flow.simulator",
    kind: "demo",
    contentRef: "demo:api-flow",
    keywords: ["api", "flow", "sandbox"],
  },
  {
    id: "demo-performance",
    path: "demos/performance.lab",
    label: "performance.lab",
    kind: "demo",
    contentRef: "demo:performance",
    keywords: ["react", "rendering", "performance"],
  },
  {
    id: "demo-architecture",
    path: "demos/architecture.explorer",
    label: "architecture.explorer",
    kind: "demo",
    contentRef: "demo:architecture",
    keywords: ["architecture", "explorer"],
  },
];

export const ideFileByPath = new Map(ideFiles.map((f) => [f.path, f]));
export const ideFileById = new Map(ideFiles.map((f) => [f.id, f]));

export function getIdeFile(path: string): IdeFileEntry | undefined {
  return ideFileByPath.get(path);
}

function folder(id: string, name: string, children: IdeTreeNode[]): IdeTreeNode {
  return { type: "folder", id, name, children };
}

function file(entry: IdeFileEntry): IdeTreeNode {
  return { type: "file", file: entry };
}

export const ideFileTree: IdeTreeNode[] = [
  file(ideFiles[0]!),
  folder("about", "About", [
    file(ideFiles[1]!),
    file(ideFiles[2]!),
    file(ideFiles[3]!),
  ]),
  folder("experience", "Experience", [
    file(ideFiles[4]!),
    file(ideFiles[5]!),
  ]),
  folder("projects", "Projects", projectFiles.map(file)),
  folder("skills", "Skills", [
    file(ideFiles[6]!),
    file(ideFiles[7]!),
    file(ideFiles[8]!),
  ]),
  folder("architecture", "Architecture", [
    file(ideFiles[9]!),
    file(ideFiles[10]!),
  ]),
  folder("contact", "Contact", [
    file(ideFiles[11]!),
    file(ideFiles[12]!),
  ]),
  folder("demos", "Demos", [
    file(ideFiles[ideFiles.length - 3]!),
    file(ideFiles[ideFiles.length - 2]!),
    file(ideFiles[ideFiles.length - 1]!),
  ]),
];

export const DEFAULT_FILE_PATH = "README.md";

const FILE_DISPLAY_LABELS: Record<string, string> = {
  "README.md": "Overview",
  "about/profile.md": "About me",
  "about/summary.ts": "Professional summary",
  "about/engineering-principles.json": "Engineering principles",
  "experience/accenture.timeline": "Accenture experience",
  "experience/growth-journey.story": "Career journey",
  "skills/frontend.stack": "Frontend stack",
  "skills/backend.stack": "Backend stack",
  "skills/platform.stack": "Platform & delivery",
  "architecture/system.diagram": "System architecture",
  "architecture/platform.diagram": "Platform map",
  "contact/info.md": "Contact",
  "contact/resume.pdf": "Resume",
  "demos/api-flow.simulator": "API flow demo",
  "demos/performance.lab": "Performance lab",
  "demos/architecture.explorer": "Architecture explorer",
};

const FILE_SUBTITLES: Record<string, string> = {
  "README.md": "Introduction, key metrics, and how to explore this portfolio",
  "about/profile.md": "Background, education, and what I focus on",
  "about/summary.ts": "Role, tenure, and stack at a glance",
  "about/engineering-principles.json": "Values that guide how I build software",
  "experience/accenture.timeline": "Roles, highlights, and technologies at Accenture",
  "experience/growth-journey.story": "How my scope grew from school to full-stack delivery",
  "skills/frontend.stack": "UI frameworks and frontend craft",
  "skills/backend.stack": "APIs, services, and integration patterns",
  "skills/platform.stack": "CI/CD, Azure DevOps, and release discipline",
  "architecture/system.diagram": "How I think about layered system design",
  "architecture/platform.diagram": "End-to-end platform stack map",
  "contact/info.md": "Email, links, and availability",
  "contact/resume.pdf": "Download the latest PDF resume",
};

export const runDebugDemos = [
  {
    id: "api-flow",
    label: "API Flow Simulator",
    path: "demos/api-flow.simulator",
    description: "Trace request/response paths through a REST API layer.",
  },
  {
    id: "performance",
    label: "React Rendering Lab",
    path: "demos/performance.lab",
    description: "Compare render discipline and re-render patterns.",
  },
  {
    id: "architecture",
    label: "Architecture Explorer",
    path: "demos/architecture.explorer",
    description: "Walk through layered system architecture interactively.",
  },
] as const;

export function getFileDisplayLabel(path: string): string {
  if (FILE_DISPLAY_LABELS[path]) return FILE_DISPLAY_LABELS[path]!;
  const file = getIdeFile(path);
  if (!file) return path;
  if (file.kind === "project") {
    const slug = file.contentRef.replace("projects:", "");
    return getProjectBySlug(slug)?.title ?? file.label;
  }
  return file.label;
}

export function getFileSubtitle(path: string): string | undefined {
  if (FILE_SUBTITLES[path]) return FILE_SUBTITLES[path];
  const file = getIdeFile(path);
  if (!file) return undefined;
  if (file.kind === "project") {
    const slug = file.contentRef.replace("projects:", "");
    return getProjectBySlug(slug)?.outcome;
  }
  if (file.kind === "demo") {
    return runDebugDemos.find((d) => d.path === path)?.description;
  }
  return undefined;
}

export function searchIdeFiles(query: string): IdeFileEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return ideFiles;
  return ideFiles.filter(
    (f) =>
      f.path.toLowerCase().includes(q) ||
      f.label.toLowerCase().includes(q) ||
      getFileDisplayLabel(f.path).toLowerCase().includes(q) ||
      f.keywords?.some((k) => k.toLowerCase().includes(q)),
  );
}
