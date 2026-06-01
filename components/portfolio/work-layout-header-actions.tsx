"use client";

import { ModeSwitcher } from "@/components/portfolio/mode-switcher";
import { AppearanceMenu } from "@/components/ui/appearance-menu";

export function WorkLayoutHeaderActions() {
  return (
    <>
      <ModeSwitcher />
      <AppearanceMenu />
    </>
  );
}
