"use client";

import { useState } from "react";
import { getFileDisplayLabel, ideFileTree, type IdeTreeNode } from "@/content/ide-manifest";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";
import { cn } from "@/lib/utils";

function TreeNode({ node, depth = 0 }: { node: IdeTreeNode; depth?: number }) {
  const { openFile, activeFile } = useIdeWorkspace();
  const [expanded, setExpanded] = useState(true);

  if (node.type === "file") {
    const isActive = activeFile?.path === node.file.path;
    return (
      <button
        type="button"
        role="treeitem"
        aria-selected={isActive}
        className={cn(
          "flex w-full truncate cursor-pointer py-1.5 pr-3 text-left text-sm hover:bg-[var(--ide-tab-inactive)]",
          isActive && "bg-[var(--ide-tab-inactive)] font-medium text-[var(--ide-accent)]",
        )}
        style={{ paddingLeft: `${depth * 14 + 12}px` }}
        onClick={() => openFile(node.file.path)}
      >
        {getFileDisplayLabel(node.file.path)}
      </button>
    );
  }

  return (
    <div role="group">
      <button
        type="button"
        role="treeitem"
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center gap-1 py-1.5 pr-3 text-left text-sm font-medium text-foreground hover:bg-[var(--ide-tab-inactive)]"
        style={{ paddingLeft: `${depth * 14 + 8}px` }}
        onClick={() => setExpanded((e) => !e)}
      >
        <span className="w-3 text-xs text-muted">{expanded ? "▾" : "▸"}</span>
        {node.name}
      </button>
      {expanded ? (
        <div role="group">
          {node.children.map((child) => (
            <TreeNode key={child.type === "folder" ? child.id : child.file.id} node={child} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function IdeSidebarExplorer() {
  return (
    <div className="flex h-full flex-col">
      <p className="px-3 py-2 text-xs text-muted">Pick a section to read</p>
      <div role="tree" aria-label="Portfolio sections" className="flex-1 overflow-y-auto pb-4">
        {ideFileTree.map((node) => (
          <TreeNode key={node.type === "folder" ? node.id : node.file.id} node={node} />
        ))}
      </div>
    </div>
  );
}
