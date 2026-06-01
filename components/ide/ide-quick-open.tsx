"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import {
  getFileDisplayLabel,
  ideFiles,
  searchIdeFiles,
} from "@/content/ide-manifest";
import { site } from "@/content/site";
import { useIdeWorkspace } from "@/hooks/use-ide-workspace";

type IdeQuickOpenProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function IdeQuickOpen({ open, onOpenChange }: IdeQuickOpenProps) {
  const [query, setQuery] = useState("");
  const { openFile, setActiveView, toggleSidebar } = useIdeWorkspace();
  const { setTheme, resolvedTheme, theme } = useTheme();

  const files = useMemo(() => searchIdeFiles(query), [query]);

  const runFile = useCallback(
    (path: string) => {
      onOpenChange(false);
      setQuery("");
      openFile(path);
    },
    [onOpenChange, openFile],
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-background/60 p-4 pt-[12vh] backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0 cursor-pointer"
        aria-label="Close search"
        onClick={() => onOpenChange(false)}
      />
      <Command
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-xl border border-[var(--ide-border)] bg-[var(--ide-editor)] shadow-2xl"
        shouldFilter={false}
      >
        <Command.Input
          value={query}
          onValueChange={setQuery}
          placeholder="Search projects, skills, experience..."
          className="w-full border-b border-[var(--ide-border)] bg-transparent px-4 py-3 text-sm outline-none"
        />
        <Command.List className="max-h-[50vh] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            No results.
          </Command.Empty>
          <Command.Group heading="Sections" className="text-[11px] text-muted">
            {files.slice(0, 12).map((file) => (
              <Command.Item
                key={file.id}
                value={file.path}
                onSelect={() => runFile(file.path)}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
              >
                <span>{getFileDisplayLabel(file.path)}</span>
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Actions" className="text-[11px] text-muted">
            <Command.Item
              onSelect={() => {
                onOpenChange(false);
                setActiveView("profile");
              }}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
            >
              Open contact &amp; about
            </Command.Item>
            <Command.Item
              onSelect={() => {
                onOpenChange(false);
                setActiveView("run");
              }}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
            >
              View interactive demos
            </Command.Item>
            <Command.Item
              onSelect={() => {
                onOpenChange(false);
                toggleSidebar();
              }}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
            >
              Toggle navigation panel
            </Command.Item>
            <Command.Item
              onSelect={() => {
                onOpenChange(false);
                const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";
                setTheme(isDark ? "light" : "dark");
              }}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
            >
              Toggle theme
            </Command.Item>
            <Command.Item
              onSelect={() => {
                onOpenChange(false);
                void navigator.clipboard.writeText(site.email);
              }}
              className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
            >
              Copy email
            </Command.Item>
          </Command.Group>
          {!query ? (
            <Command.Group heading="Start here" className="text-[11px] text-muted">
              {ideFiles.slice(0, 5).map((file) => (
                <Command.Item
                  key={file.id}
                  onSelect={() => runFile(file.path)}
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm aria-selected:bg-[var(--ide-tab-inactive)]"
                >
                  {getFileDisplayLabel(file.path)}
                </Command.Item>
              ))}
            </Command.Group>
          ) : null}
        </Command.List>
      </Command>
    </div>
  );
}

export function useIdeQuickOpen() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen };
}
