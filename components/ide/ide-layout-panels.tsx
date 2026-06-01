"use client";

import { IdeEditorPane } from "@/components/ide/ide-editor-pane";
import { IdeSectionHeader } from "@/components/ide/ide-section-header";
import { IdeSidebar } from "@/components/ide/ide-sidebar/ide-sidebar";
import { IdeTabBar } from "@/components/ide/ide-tab-bar";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { cn } from "@/lib/utils";

function MainContent() {
  return (
    <div className="ide-editor flex h-full min-h-0 flex-col">
      <IdeTabBar />
      <IdeSectionHeader />
      <main
        id="ide-editor-main"
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
        tabIndex={-1}
      >
        <IdeEditorPane />
      </main>
    </div>
  );
}

type IdeLayoutPanelsProps = {
  isMobile: boolean;
  showMobileSidebar: boolean;
  onCloseMobileSidebar: () => void;
};

export function IdeLayoutPanels({
  isMobile,
  showMobileSidebar,
  onCloseMobileSidebar,
}: IdeLayoutPanelsProps) {
  const { sidebarOpen } = useIdeWorkspace();

  if (isMobile) {
    return (
      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col">
        {showMobileSidebar ? (
          <button
            type="button"
            className="ide-mobile-overlay fixed inset-0 z-30"
            aria-label="Close navigation"
            onClick={onCloseMobileSidebar}
          />
        ) : null}
        {showMobileSidebar ? (
          <aside className="ide-sidebar ide-mobile-drawer fixed inset-y-0 left-[var(--ide-nav-width)] z-40 w-[min(300px,85vw)] overflow-auto">
            <IdeSidebar />
          </aside>
        ) : null}
        <MainContent />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      {sidebarOpen ? (
        <aside
          className={cn(
            "ide-sidebar ide-sidebar-resizable shrink-0 overflow-auto border-r border-[var(--ide-border)]",
          )}
        >
          <IdeSidebar />
        </aside>
      ) : null}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <MainContent />
      </div>
    </div>
  );
}
