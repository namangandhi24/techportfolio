"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { usePortfolioMode } from "@/hooks/use-portfolio-mode";
import { ModePickerModal } from "@/components/portfolio/mode-picker-modal";
import { useHydrated } from "@/hooks/use-hydrated";

const ClassicShell = dynamic(
  () => import("@/components/portfolio/classic-shell").then((m) => m.ClassicShell),
  {
    ssr: false,
    loading: () => <PortfolioLoader label="Loading portfolio…" />,
  },
);

const IdeShell = dynamic(
  () => import("@/components/ide/ide-shell").then((m) => m.IdeShell),
  {
    ssr: false,
    loading: () => <PortfolioLoader label="Loading workspace…" />,
  },
);

function PortfolioLoader({ label }: { label: string }) {
  return (
    <div className="flex h-screen items-center justify-center bg-[var(--ide-bg,var(--background))] text-sm text-muted">
      {label}
    </div>
  );
}

function useBodyScrollPolicy(mode: "classic" | "workspace" | null) {
  useEffect(() => {
    if (mode === "workspace") {
      document.documentElement.classList.add("portfolio-workspace-mode");
      document.documentElement.classList.remove("portfolio-classic-mode");
      document.body.classList.add("overflow-hidden", "h-dvh");
    } else if (mode === "classic") {
      document.documentElement.classList.add("portfolio-classic-mode");
      document.documentElement.classList.remove("portfolio-workspace-mode");
      document.body.classList.remove("overflow-hidden", "h-dvh");
    } else {
      document.documentElement.classList.remove("portfolio-workspace-mode", "portfolio-classic-mode");
      document.body.classList.remove("overflow-hidden", "h-dvh");
    }
    return () => {
      document.documentElement.classList.remove("portfolio-workspace-mode", "portfolio-classic-mode");
      document.body.classList.remove("overflow-hidden", "h-dvh");
    };
  }, [mode]);
}

export function PortfolioRoot() {
  const hydrated = useHydrated();
  const { mode, hasChosenMode, isReady, setMode } = usePortfolioMode();

  useBodyScrollPolicy(hasChosenMode ? mode : null);

  if (!hydrated || !isReady) {
    return <PortfolioLoader label="Loading…" />;
  }

  if (!hasChosenMode || !mode) {
    return <ModePickerModal onSelect={setMode} />;
  }

  if (mode === "classic") {
    return <ClassicShell key="classic" />;
  }

  return <IdeShell key="workspace" />;
}
