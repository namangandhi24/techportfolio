"use client";

import { AppShell } from "@/components/layout/app-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ContactBento } from "@/components/sections/contact-bento";
import { EngineeringImpact } from "@/components/sections/engineering-impact";
import { EngineeringPrinciples } from "@/components/sections/engineering-principles";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { InteractiveSystemMap } from "@/components/sections/interactive-system-map";
import { Testimonials } from "@/components/sections/testimonials";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { Work } from "@/components/sections/work";
import { EngineeringSandbox } from "@/components/sandbox/engineering-sandbox";

export function ClassicShell() {
  return (
    <AppShell>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Work />
        <Experience />
        <EngineeringImpact />
        <Testimonials />
        <WhatIBuild />
        <EngineeringPrinciples />
        <InteractiveSystemMap />
        <EngineeringSandbox />
        <ContactBento />
      </main>
      <Footer />
    </AppShell>
  );
}
