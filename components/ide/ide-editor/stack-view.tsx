"use client";

import { systemMapLayers } from "@/content/system-map";
import { proof } from "@/content/proof";
import { TechLogoLabel } from "@/components/ui/brand-logo";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";
import type { IdeFileEntry } from "@/content/ide-manifest";

const stackGroups: Record<string, { title: string; items: string[] }> = {
  "stack:frontend": {
    title: "Frontend Stack",
    items: ["Angular", "React", "TypeScript", "JavaScript", "HTML/CSS", "Design Systems"],
  },
  "stack:backend": {
    title: "Backend Stack",
    items: ["Node.js", "Express", "REST APIs", "Auth middleware", "Validation"],
  },
  "stack:platform": {
    title: "Platform & Delivery",
    items: ["Azure DevOps", "CI/CD", "Environment promotion", "Quality gates"],
  },
};

type StackViewProps = {
  file: IdeFileEntry;
};

export function StackView({ file }: StackViewProps) {
  const group = stackGroups[file.contentRef] ?? {
    title: "Tech Stack",
    items: [...proof.primaryStack],
  };

  return (
    <IdeEditorChrome lineCount={20}>
      <div className="max-w-xl space-y-4">
        <h1 className="text-xl font-semibold">{group.title}</h1>
        <ul className="space-y-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="flex items-center gap-3 rounded-lg border border-[var(--ide-border)] px-4 py-3 font-mono text-[13px]"
            >
              <span className="text-green-400">●</span>
              <TechLogoLabel name={item} />
            </li>
          ))}
        </ul>
        {file.contentRef === "stack:frontend" ? (
          <p className="text-sm text-muted">
            Also see system map layers:{" "}
            {systemMapLayers.map((l) => l.shortLabel).join(" → ")}
          </p>
        ) : null}
      </div>
    </IdeEditorChrome>
  );
}
