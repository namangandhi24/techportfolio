export type PortfolioMode = "classic" | "workspace";

export const PORTFOLIO_MODE_STORAGE_KEY = "portfolio-view-mode";

export type PortfolioModeConfig = {
  id: PortfolioMode;
  label: string;
  description: string;
  hint: string;
};

export const portfolioModes: PortfolioModeConfig[] = [
  {
    id: "classic",
    label: "Portfolio",
    description: "Scroll through experience, projects, and contact like a conventional site.",
    hint: "Best for recruiters who prefer a familiar layout",
  },
  {
    id: "workspace",
    label: "Workspace",
    description: "Explore career and projects as files, demos, and panels.",
    hint: "Best for hiring managers who want to see how you think",
  },
];

export function isPortfolioMode(value: string | null): value is PortfolioMode {
  return value === "classic" || value === "workspace";
}
