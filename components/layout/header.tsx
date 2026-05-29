"use client";

import { useEffect, useState } from "react";
import { navigation, site } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPaletteHint } from "@/components/ui/command-palette";
import { MobileNav } from "@/components/layout/mobile-nav";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((n) => n.sectionId);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300",
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="container-wide flex h-16 items-center justify-between">
          <a
            href="#"
            className="font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            {site.name}
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "link-hover rounded-md px-3 py-2 text-sm no-underline transition-colors",
                  activeSection === item.sectionId
                    ? "bg-accent-muted font-medium text-foreground"
                    : "text-muted hover:bg-accent-muted hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CommandPaletteHint />
            <a
              href="#contact"
              className="hidden rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              Get in touch
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
