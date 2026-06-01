"use client";

import { cn } from "@/lib/utils";

type ContentPanelProps = {
  children: React.ReactNode;
  className?: string;
};

/** Scrollable content area — no faux line numbers or editor chrome */
export function ContentPanel({ children, className }: ContentPanelProps) {
  return (
    <div className={cn("min-h-0 flex-1 overflow-auto px-6 py-5", className)}>
      {children}
    </div>
  );
}

/** @deprecated Use ContentPanel */
export function IdeEditorChrome({
  children,
  className,
}: {
  lineCount?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return <ContentPanel className={className}>{children}</ContentPanel>;
}
