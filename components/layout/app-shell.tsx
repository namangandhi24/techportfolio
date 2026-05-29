"use client";

import { navigation } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { CommandPalette } from "@/components/ui/command-palette";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SectionRail } from "@/components/layout/section-rail";
import { PageSpotlight } from "@/components/layout/page-spotlight";
import { BackToTop } from "@/components/ui/back-to-top";

const sectionIds = navigation.map((n) => n.sectionId);

export function AppShell({ children }: { children: React.ReactNode }) {
  const activeSection = useActiveSection(sectionIds);

  return (
    <>
      <PageSpotlight />
      <ScrollProgress />
      <CommandPalette />
      <SectionRail activeSection={activeSection} />
      <BackToTop />
      {children}
    </>
  );
}
