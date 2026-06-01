import type { BundledTheme } from "shiki";

export type EditorThemeId = "dark-plus" | "light-plus" | "cursor-dark" | "one-dark-pro";

export type EditorThemePreset = {
  id: EditorThemeId;
  label: string;
  description: string;
  colorScheme: "light" | "dark";
  shikiTheme: BundledTheme;
  preview: { bg: string; fg: string; accent: string };
  vars: Record<string, string>;
};

export const EDITOR_THEME_STORAGE_KEY = "portfolio-editor-theme";

export const editorThemePresets: EditorThemePreset[] = [
  {
    id: "dark-plus",
    label: "Dark+",
    description: "VS Code default dark",
    colorScheme: "dark",
    shikiTheme: "github-dark",
    preview: { bg: "#1e1e1e", fg: "#d4d4d4", accent: "#007acc" },
    vars: {
      "--background": "#1e1e1e",
      "--foreground": "#cccccc",
      "--muted": "#9d9d9d",
      "--muted-foreground": "#858585",
      "--border": "#3c3c3c",
      "--card": "#252526",
      "--card-foreground": "#cccccc",
      "--accent": "#007acc",
      "--accent-secondary": "#3794ff",
      "--accent-muted": "rgba(0, 122, 204, 0.18)",
      "--accent-secondary-muted": "rgba(55, 148, 255, 0.14)",
      "--accent-foreground": "#ffffff",
      "--ring": "#007acc",
      "--code-panel-bg": "#1e1e1e",
      "--code-panel-fg": "#d4d4d4",
      "--code-panel-border": "#3c3c3c",
      "--ide-bg": "#1e1e1e",
      "--ide-sidebar": "#252526",
      "--ide-editor": "#1e1e1e",
      "--ide-tab-active": "#1e1e1e",
      "--ide-tab-inactive": "#2d2d2d",
      "--ide-border": "#3c3c3c",
      "--ide-accent": "#007acc",
      "--ide-activity-bar": "#333333",
      "--ide-status-bar": "#007acc",
      "--ide-status-fg": "#ffffff",
      "--syntax-keyword": "#569cd6",
      "--syntax-string": "#ce9178",
      "--syntax-comment": "#6a9955",
    },
  },
  {
    id: "light-plus",
    label: "Light+",
    description: "VS Code default light",
    colorScheme: "light",
    shikiTheme: "github-light",
    preview: { bg: "#ffffff", fg: "#333333", accent: "#0078d4" },
    vars: {
      "--background": "#ffffff",
      "--foreground": "#333333",
      "--muted": "#616161",
      "--muted-foreground": "#6e6e6e",
      "--border": "#e5e5e5",
      "--card": "#f8f8f8",
      "--card-foreground": "#333333",
      "--accent": "#0078d4",
      "--accent-secondary": "#005a9e",
      "--accent-muted": "rgba(0, 120, 212, 0.12)",
      "--accent-secondary-muted": "rgba(0, 90, 158, 0.1)",
      "--accent-foreground": "#ffffff",
      "--ring": "#0078d4",
      "--code-panel-bg": "#f6f8fa",
      "--code-panel-fg": "#24292f",
      "--code-panel-border": "#d0d7de",
      "--ide-bg": "#f3f3f3",
      "--ide-sidebar": "#ececec",
      "--ide-editor": "#ffffff",
      "--ide-tab-active": "#ffffff",
      "--ide-tab-inactive": "#ececec",
      "--ide-border": "#e5e5e5",
      "--ide-accent": "#0078d4",
      "--ide-activity-bar": "#f0f0f0",
      "--ide-status-bar": "#0078d4",
      "--ide-status-fg": "#ffffff",
      "--syntax-keyword": "#0000ff",
      "--syntax-string": "#a31515",
      "--syntax-comment": "#008000",
    },
  },
  {
    id: "cursor-dark",
    label: "Cursor Dark",
    description: "Neutral dark with soft contrast",
    colorScheme: "dark",
    shikiTheme: "github-dark",
    preview: { bg: "#141414", fg: "#e4e4e7", accent: "#a78bfa" },
    vars: {
      "--background": "#141414",
      "--foreground": "#e4e4e7",
      "--muted": "#a1a1aa",
      "--muted-foreground": "#71717a",
      "--border": "#27272a",
      "--card": "#1a1a1a",
      "--card-foreground": "#e4e4e7",
      "--accent": "#a78bfa",
      "--accent-secondary": "#818cf8",
      "--accent-muted": "rgba(167, 139, 250, 0.16)",
      "--accent-secondary-muted": "rgba(129, 140, 248, 0.12)",
      "--accent-foreground": "#141414",
      "--ring": "#a78bfa",
      "--code-panel-bg": "#141414",
      "--code-panel-fg": "#e4e4e7",
      "--code-panel-border": "#3f3f46",
      "--ide-bg": "#141414",
      "--ide-sidebar": "#1a1a1a",
      "--ide-editor": "#141414",
      "--ide-tab-active": "#141414",
      "--ide-tab-inactive": "#222222",
      "--ide-border": "#27272a",
      "--ide-accent": "#a78bfa",
      "--ide-activity-bar": "#1a1a1a",
      "--ide-status-bar": "#7c3aed",
      "--ide-status-fg": "#ffffff",
      "--syntax-keyword": "#c792ea",
      "--syntax-string": "#c3e88d",
      "--syntax-comment": "#676e95",
    },
  },
  {
    id: "one-dark-pro",
    label: "One Dark Pro",
    description: "Popular warm dark theme",
    colorScheme: "dark",
    shikiTheme: "one-dark-pro",
    preview: { bg: "#282c34", fg: "#abb2bf", accent: "#61afef" },
    vars: {
      "--background": "#282c34",
      "--foreground": "#abb2bf",
      "--muted": "#7f848e",
      "--muted-foreground": "#5c6370",
      "--border": "#3e4451",
      "--card": "#21252b",
      "--card-foreground": "#abb2bf",
      "--accent": "#61afef",
      "--accent-secondary": "#c678dd",
      "--accent-muted": "rgba(97, 175, 239, 0.16)",
      "--accent-secondary-muted": "rgba(198, 120, 221, 0.12)",
      "--accent-foreground": "#282c34",
      "--ring": "#61afef",
      "--code-panel-bg": "#282c34",
      "--code-panel-fg": "#abb2bf",
      "--code-panel-border": "#3e4451",
      "--ide-bg": "#282c34",
      "--ide-sidebar": "#21252b",
      "--ide-editor": "#282c34",
      "--ide-tab-active": "#282c34",
      "--ide-tab-inactive": "#2c313a",
      "--ide-border": "#3e4451",
      "--ide-accent": "#61afef",
      "--ide-activity-bar": "#21252b",
      "--ide-status-bar": "#528bff",
      "--ide-status-fg": "#ffffff",
      "--syntax-keyword": "#c678dd",
      "--syntax-string": "#98c379",
      "--syntax-comment": "#5c6370",
    },
  },
];

export const defaultEditorThemeId: EditorThemeId = "dark-plus";

export function getEditorThemePreset(id: EditorThemeId): EditorThemePreset {
  return editorThemePresets.find((p) => p.id === id) ?? editorThemePresets[0]!;
}

export function isEditorThemeId(value: string | null): value is EditorThemeId {
  return editorThemePresets.some((p) => p.id === value);
}
