"use client";

import { principles } from "@/content/principles";
import { IdeEditorChrome } from "@/components/ide/ide-line-gutter";

const jsonContent = JSON.stringify({ principles }, null, 2);

export function JsonView() {
  return (
    <IdeEditorChrome lineCount={jsonContent.split("\n").length}>
      <pre className="overflow-x-auto font-mono text-[13px] leading-6 text-foreground">
        {jsonContent}
      </pre>
    </IdeEditorChrome>
  );
}
