import { consoleStats } from "@/content/proof";
import { profile } from "@/content/profile";

export type TerminalCommandAction =
  | { type: "help" }
  | { type: "clear" }
  | { type: "open-file"; path: string }
  | { type: "open-view"; view: "explorer" | "scm" | "run" | "extensions" | "profile" }
  | { type: "open-url"; url: string }
  | { type: "output"; lines: string[] };

export const terminalBootLines = [
  "> loading portfolio...",
  `> experience: ${consoleStats[0]?.value ?? "4+ years"}`,
  `> production_releases: ${consoleStats[1]?.value ?? "50+"}`,
  "> accessibility_score: AA",
  `> current_role: ${profile.currentRole}`,
];

export const terminalHelpLines = [
  "Available commands:",
  "  help              — show this message",
  "  about             — open profile",
  "  skills            — open skills folder",
  "  architecture      — open system diagram",
  "  open projects     — open projects folder",
  "  open experience   — open experience timeline",
  "  open resume       — download resume",
  "  contact           — open contact info",
  "  clear             — clear terminal output",
];

export function parseTerminalInput(input: string): TerminalCommandAction {
  const cmd = input.trim().toLowerCase();

  switch (cmd) {
    case "help":
      return { type: "help" };
    case "clear":
      return { type: "clear" };
    case "about":
      return { type: "open-file", path: "about/profile.md" };
    case "skills":
      return { type: "open-file", path: "skills/frontend.stack" };
    case "architecture":
      return { type: "open-file", path: "architecture/system.diagram" };
    case "open projects":
      return { type: "open-file", path: "projects/portfolio.tsx" };
    case "open experience":
      return { type: "open-file", path: "experience/accenture.timeline" };
    case "open resume":
      return { type: "open-url", url: "/resume.pdf" };
    case "contact":
      return { type: "open-file", path: "contact/info.md" };
    default:
      if (cmd.startsWith("open ")) {
        const path = input.trim().slice(5);
        return { type: "open-file", path };
      }
      return {
        type: "output",
        lines: [`command not found: ${input.trim()}`, 'Type "help" for available commands.'],
      };
  }
}
