"use client";

import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { ReadmeView } from "@/components/ide/ide-editor/readme-view";
import { MarkdownView } from "@/components/ide/ide-editor/markdown-view";
import { CodeView } from "@/components/ide/ide-editor/code-view";
import { JsonView } from "@/components/ide/ide-editor/json-view";
import { TimelineView } from "@/components/ide/ide-editor/timeline-view";
import { StoryView } from "@/components/ide/ide-editor/story-view";
import { StackView } from "@/components/ide/ide-editor/stack-view";
import { DiagramView } from "@/components/ide/ide-editor/diagram-view";
import { ProjectView } from "@/components/ide/ide-editor/project-view";
import { ContactView, PdfView } from "@/components/ide/ide-editor/contact-view";
import { DemoView } from "@/components/ide/ide-editor/demo-view";

export function IdeEditorPane() {
  const { activeFile } = useIdeWorkspace();

  if (!activeFile) {
    return (
      <div className="flex flex-1 items-center justify-center font-mono text-sm text-muted">
        Open a file from the explorer
      </div>
    );
  }

  switch (activeFile.kind) {
    case "markdown":
      return activeFile.contentRef === "hero" ? <ReadmeView /> : <MarkdownView />;
    case "typescript":
      return <CodeView />;
    case "json":
      return <JsonView />;
    case "timeline":
      return <TimelineView />;
    case "story":
      return <StoryView />;
    case "stack":
      return <StackView file={activeFile} />;
    case "diagram":
      return <DiagramView file={activeFile} />;
    case "project":
      return <ProjectView file={activeFile} />;
    case "contact":
      return <ContactView />;
    case "pdf":
      return <PdfView />;
    case "demo":
      return <DemoView file={activeFile} />;
    default:
      return (
        <div className="flex flex-1 items-center justify-center font-mono text-sm text-muted">
          Unsupported file type
        </div>
      );
  }
}
