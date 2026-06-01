"use client";

import { searchIdeFiles } from "@/content/ide-manifest";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";

export function IdeSidebarSearch() {
  const { searchQuery, setSearchQuery, openFile } = useIdeWorkspace();
  const results = searchIdeFiles(searchQuery);

  return (
    <div className="flex h-full flex-col">
      <div className="px-3 py-2 text-xs font-medium text-muted">Search</div>
      <div className="px-3 pb-2">
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search files..."
          className="w-full rounded border border-[var(--ide-border)] bg-[var(--ide-editor)] px-2 py-1.5 font-mono text-[12px] outline-none focus:border-[var(--ide-accent)]"
          aria-label="Search workspace files"
        />
      </div>
      <ul className="flex-1 overflow-y-auto pb-4" role="listbox" aria-label="Search results">
        {results.map((file) => (
          <li key={file.id}>
            <button
              type="button"
              role="option"
              className="flex w-full cursor-pointer flex-col items-start px-3 py-1.5 text-left font-mono text-[12px] hover:bg-[var(--ide-tab-inactive)]"
              onClick={() => openFile(file.path)}
            >
              <span>{file.label}</span>
              <span className="text-[10px] text-muted">{file.path}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
