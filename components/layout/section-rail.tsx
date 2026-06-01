"use client";

import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";

type SectionRailProps = {
  activeSection: string;
};

export function SectionRail({ activeSection }: SectionRailProps) {
  return (
    <aside
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-3">
        {navigation.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="group flex cursor-pointer items-center justify-end gap-2"
              aria-current={activeSection === item.sectionId ? "true" : undefined}
            >
              <span
                className={cn(
                  "max-w-0 overflow-hidden font-mono text-[10px] whitespace-nowrap text-muted opacity-0 transition-all duration-200 group-hover:max-w-[8rem] group-hover:opacity-100",
                  activeSection === item.sectionId && "max-w-[8rem] opacity-100 text-foreground",
                )}
              >
                {item.label}
              </span>
              <span
                className={cn(
                  "block h-2 w-2 rounded-full border border-border bg-background transition-colors",
                  activeSection === item.sectionId &&
                    "border-accent bg-accent scale-125",
                )}
              />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
