"use client";

import { useEffect, useState } from "react";
import { IdeActivityBar } from "@/components/ide/ide-activity-bar";
import { IdeLayoutPanels } from "@/components/ide/ide-layout-panels";
import { IdeQuickOpen, useIdeQuickOpen } from "@/components/ide/ide-quick-open";
import { IdeStatusBar } from "@/components/ide/ide-status-bar";
import { IdeTitleBar } from "@/components/ide/ide-title-bar";
import { IdeWorkspaceProvider, useIdeWorkspace } from "@/hooks/use-ide-workspace";

function IdeShellInner() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useIdeWorkspace();
  const { open, setOpen } = useIdeQuickOpen();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="ide-shell flex h-screen h-dvh flex-col overflow-hidden">
      <a
        href="#ide-editor-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--ide-accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <IdeTitleBar onQuickOpen={() => setOpen(true)} />
      <div className="flex min-h-0 flex-1">
        <IdeActivityBar />
        <div className="relative flex min-h-0 min-w-0 flex-1">
          <IdeLayoutPanels
            isMobile={isMobile}
            showMobileSidebar={isMobile && mobileSidebarOpen}
            onCloseMobileSidebar={() => setMobileSidebarOpen(false)}
          />
        </div>
      </div>
      <IdeStatusBar />
      <IdeQuickOpen open={open} onOpenChange={setOpen} />
    </div>
  );
}

export function IdeShell() {
  return (
    <IdeWorkspaceProvider>
      <IdeShellInner />
    </IdeWorkspaceProvider>
  );
}
