"use client";

import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { cn } from "@/lib/utils";

export function IdeTabBar() {
  const { openTabs, activeTabId, setActiveTab, closeTab } = useIdeWorkspace();

  return (
    <div
      role="tablist"
      aria-label="Open sections"
      className="flex shrink-0 overflow-x-auto border-b border-[var(--ide-border)] bg-[var(--ide-tab-inactive)] scrollbar-none"
    >
      {openTabs.map((tab) => (
        <div
          key={tab.id}
          role="tab"
          aria-selected={tab.id === activeTabId}
          tabIndex={tab.id === activeTabId ? 0 : -1}
          className={cn(
            "group flex max-w-[200px] shrink-0 items-center gap-2 border-r border-[var(--ide-border)] px-3 py-2 text-sm",
            tab.id === activeTabId
              ? "bg-[var(--ide-editor)] font-medium text-foreground"
              : "text-muted hover:bg-[var(--ide-editor)]/50 hover:text-foreground",
          )}
        >
          <button
            type="button"
            className="min-w-0 flex-1 cursor-pointer truncate text-left"
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
          <button
            type="button"
            aria-label={`Close ${tab.label}`}
            className="cursor-pointer rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-[var(--ide-border)]"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
