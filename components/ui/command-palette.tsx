"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { buildConsoleCommands, type ConsoleCommand } from "@/content/console-commands";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();
  const commands = useMemo(() => buildConsoleCommands(), []);

  const run = useCallback((cmd: ConsoleCommand) => {
    setOpen(false);
    switch (cmd.action) {
      case "navigate":
        if (cmd.href) {
          document.querySelector(cmd.href)?.scrollIntoView({ behavior: "smooth" });
        }
        break;
      case "theme": {
        const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";
        setTheme(isDark ? "light" : "dark");
        break;
      }
      case "copy-email":
        void navigator.clipboard.writeText(site.email);
        break;
      case "link":
        if (cmd.href?.startsWith("/")) {
          window.location.href = cmd.href;
        } else if (cmd.href) {
          window.open(cmd.href, "_blank", "noopener");
        }
        break;
      case "sandbox": {
        const demo = cmd.sandboxTab ?? "explorer";
        window.location.hash = `sandbox?demo=${demo}`;
        document.querySelector("#sandbox")?.scrollIntoView({ behavior: "smooth" });
        break;
      }
      case "stats":
        document.querySelector("#impact")?.scrollIntoView({ behavior: "smooth" });
        break;
    }
  }, [theme, resolvedTheme, setTheme]);

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

  const groups = useMemo(() => {
    const map = new Map<string, ConsoleCommand[]>();
    for (const cmd of commands) {
      const list = map.get(cmd.group) ?? [];
      list.push(cmd);
      map.set(cmd.group, list);
    }
    return [...map.entries()];
  }, [commands]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-background/60 p-4 pt-[12vh] backdrop-blur-sm">
      <button
        type="button"
        className="absolute inset-0"
        aria-label="Close developer console"
        onClick={() => setOpen(false)}
      />
      <Command
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card font-mono shadow-2xl"
        label="Developer console"
      >
        <div className="border-b border-border px-4 py-2 text-[10px] tracking-widest text-muted uppercase">
          Developer console
        </div>
        <Command.Input
          placeholder="> search commands…"
          className="w-full border-b border-border bg-transparent px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted"
        />
        <Command.List className="max-h-80 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            No commands found.
          </Command.Empty>
          {groups.map(([group, items]) => (
            <Command.Group
              key={group}
              heading={group}
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted uppercase"
            >
              {items.map((item) => (
                <Command.Item
                  key={item.id}
                  value={`${item.label} ${item.keywords ?? ""}`}
                  onSelect={() => run(item)}
                  className={cn(
                    "cursor-pointer rounded-lg px-3 py-2 text-sm text-foreground",
                    "aria-selected:bg-card aria-selected:ring-1 aria-selected:ring-accent/30",
                  )}
                >
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>
        <div className="border-t border-border px-4 py-2 text-[10px] text-muted">
          <kbd className="rounded border border-border px-1">⌘</kbd>
          <kbd className="ml-0.5 rounded border border-border px-1">K</kbd>
          <span className="ml-2 font-sans">Developer console</span>
        </div>
      </Command>
    </div>
  );
}

export function CommandPaletteHint() {
  return (
    <span className="hidden text-[10px] text-muted lg:inline">
      <kbd className="rounded border border-border px-1 font-mono">⌘K</kbd>
      <span className="ml-1 font-sans">console</span>
    </span>
  );
}
