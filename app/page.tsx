import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AppShell } from "@/components/layout/app-shell";
import { Hero } from "@/components/sections/hero";
import { EngineeringPrinciples } from "@/components/sections/engineering-principles";
import { EngineeringJourney } from "@/components/journey/engineering-journey";
import { InteractiveSystemMap } from "@/components/sections/interactive-system-map";
import { Work } from "@/components/sections/work";
import { EngineeringSandbox } from "@/components/sandbox/engineering-sandbox";
import { WhatIBuild } from "@/components/sections/what-i-build";
import { Experience } from "@/components/sections/experience";
import { EngineeringImpact } from "@/components/sections/engineering-impact";
import { Testimonials } from "@/components/sections/testimonials";
import { ContactBento } from "@/components/sections/contact-bento";

export default function Home() {
  return (
    <AppShell>
      <a
        href="#principles"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <EngineeringPrinciples />
        <EngineeringJourney />
        <InteractiveSystemMap />
        <Work />
        <EngineeringSandbox />
        <WhatIBuild />
        <Experience />
        <EngineeringImpact />
        <Testimonials />
        <ContactBento />
      </main>
      <Footer />
    </AppShell>
  );
}
