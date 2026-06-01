import { createHighlighter, type BundledTheme } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

const THEMES: BundledTheme[] = ["github-dark", "github-light", "one-dark-pro"];

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: THEMES,
      langs: ["typescript", "javascript", "tsx", "json"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  lang = "typescript",
  theme: BundledTheme = "github-dark",
): Promise<string> {
  const highlighter = await getHighlighter();
  const resolvedTheme = THEMES.includes(theme) ? theme : "github-dark";
  return highlighter.codeToHtml(code, { lang, theme: resolvedTheme });
}

export const apiClientSample = `type ApiResponse<T> = {
  data: T;
  error?: { code: string; message: string };
};

async function fetchResource<T>(path: string): Promise<T> {
  const res = await fetch(path, { credentials: "include" });
  if (!res.ok) throw new Error(\`Request failed: \${res.status}\`);
  const json = (await res.json()) as ApiResponse<T>;
  if (json.error) throw new Error(json.error.message);
  return json.data;
}`;
