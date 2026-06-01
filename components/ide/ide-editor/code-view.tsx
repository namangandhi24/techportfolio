"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { profileAbout } from "@/content/proof";
import { useEditorTheme } from "@/hooks/use-editor-theme";
import { highlightCode } from "@/lib/shiki";
import { ContentPanel } from "@/components/ide/ide-line-gutter";
import { cn } from "@/lib/utils";

const summaryCode = `/** ${profile.currentRole} @ ${profile.currentCompany} */
export const profileSummary = {
  name: "Naman Gandhi",
  role: "Full Stack Engineer",
  tenure: "4.5+ years",
  focus: "${profileAbout()}",
  stack: ["Angular", "React", "TypeScript", "Node.js"],
  delivery: "Azure DevOps CI/CD",
} as const;

export type ProfileSummary = typeof profileSummary;`;

export function CodeView() {
  const [html, setHtml] = useState<string | null>(null);
  const { preset } = useEditorTheme();

  useEffect(() => {
    let cancelled = false;
    void highlightCode(summaryCode, "typescript", preset.shikiTheme).then((result) => {
      if (!cancelled) setHtml(result);
    });
    return () => {
      cancelled = true;
    };
  }, [preset.shikiTheme]);

  return (
    <ContentPanel
      className={cn(
        "code-panel rounded-lg border border-[var(--ide-border)] bg-[var(--code-panel-bg)] text-[var(--code-panel-fg)]",
      )}
    >
      {html ? (
        <div
          className="overflow-x-auto font-mono text-[13px] leading-6 [&_.shiki]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="font-mono text-[13px] leading-6 text-[var(--code-panel-fg)]">
          {summaryCode}
        </pre>
      )}
    </ContentPanel>
  );
}
