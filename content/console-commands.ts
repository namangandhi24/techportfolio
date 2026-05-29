import { navigation, site } from "@/content/site";
import { projects } from "@/content/projects";
import { consoleStats } from "@/content/impact";
import type { SandboxTab } from "@/content/sandbox";

export type ConsoleCommand = {
  id: string;
  group: string;
  label: string;
  keywords?: string;
  action: "navigate" | "theme" | "copy-email" | "link" | "sandbox" | "stats";
  href?: string;
  sectionId?: string;
  sandboxTab?: SandboxTab;
};

export function buildConsoleCommands(): ConsoleCommand[] {
  const nav: ConsoleCommand[] = navigation.map((n) => ({
    id: `nav-${n.sectionId}`,
    group: "Navigate",
    label: `Go to ${n.label}`,
    keywords: n.label,
    action: "navigate",
    sectionId: n.sectionId,
    href: n.href,
  }));

  const caseStudies: ConsoleCommand[] = projects
    .filter((p) => p.href)
    .map((p) => ({
      id: `case-${p.slug}`,
      group: "Case studies",
      label: `Open ${p.title}`,
      keywords: p.slug,
      action: "link",
      href: p.href!,
    }));

  const sandbox: ConsoleCommand[] = [
    {
      id: "sandbox-explorer",
      group: "Sandbox",
      label: "Architecture Explorer",
      action: "sandbox",
      sandboxTab: "explorer",
      href: "#sandbox",
    },
    {
      id: "sandbox-api",
      group: "Sandbox",
      label: "API Flow Simulator",
      action: "sandbox",
      sandboxTab: "api-flow",
      href: "#sandbox",
    },
    {
      id: "sandbox-perf",
      group: "Sandbox",
      label: "Performance Lab",
      action: "sandbox",
      sandboxTab: "performance",
      href: "#sandbox",
    },
  ];

  const stats: ConsoleCommand[] = consoleStats.map((s) => ({
    id: `stat-${s.label}`,
    group: "Engineering stats",
    label: `${s.label}: ${s.value}`,
    action: "stats",
  }));

  const links: ConsoleCommand[] = [
    {
      id: "email",
      group: "Links",
      label: "Copy email",
      keywords: "contact mail",
      action: "copy-email",
    },
    {
      id: "github",
      group: "Links",
      label: "Open GitHub",
      action: "link",
      href: site.githubUrl,
    },
    {
      id: "linkedin",
      group: "Links",
      label: "Open LinkedIn",
      action: "link",
      href: site.linkedinUrl,
    },
    {
      id: "resume",
      group: "Links",
      label: "Download resume",
      action: "link",
      href: site.resumeUrl,
    },
  ];

  return [
    ...nav,
    ...caseStudies,
    ...sandbox,
    ...stats,
    {
      id: "theme",
      group: "Actions",
      label: "Toggle theme",
      keywords: "dark light",
      action: "theme",
    },
    ...links,
  ];
}
