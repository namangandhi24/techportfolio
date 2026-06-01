"use client";

import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { IdeSidebarExplorer } from "@/components/ide/ide-sidebar/ide-sidebar-explorer";
import { IdeSidebarSearch } from "@/components/ide/ide-sidebar/ide-sidebar-search";
import { IdeSidebarScm } from "@/components/ide/ide-sidebar/ide-sidebar-scm";
import { IdeSidebarRun } from "@/components/ide/ide-sidebar/ide-sidebar-run";
import { IdeSidebarExtensions } from "@/components/ide/ide-sidebar/ide-sidebar-extensions";
import { IdeSidebarProfile } from "@/components/ide/ide-sidebar/ide-sidebar-profile";
import { cn } from "@/lib/utils";

export function IdeSidebar() {
  const { activeView } = useIdeWorkspace();

  const content = {
    explorer: <IdeSidebarExplorer />,
    search: <IdeSidebarSearch />,
    scm: <IdeSidebarScm />,
    run: <IdeSidebarRun />,
    extensions: <IdeSidebarExtensions />,
    profile: <IdeSidebarProfile />,
  }[activeView];

  return (
    <aside
      className={cn("ide-sidebar h-full overflow-hidden")}
      aria-label={`${activeView} panel`}
    >
      {content}
    </aside>
  );
}
