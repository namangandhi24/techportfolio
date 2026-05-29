import { createHighlighter } from "shiki";

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null;

export async function highlightCode(
  code: string,
  lang = "typescript",
): Promise<string> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: ["typescript", "javascript", "tsx"],
    });
  }

  const highlighter = await highlighterPromise;
  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
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
