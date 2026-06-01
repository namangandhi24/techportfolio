"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  isPortfolioMode,
  PORTFOLIO_MODE_STORAGE_KEY,
  type PortfolioMode,
} from "@/content/portfolio-modes";

type PortfolioModeContextValue = {
  mode: PortfolioMode | null;
  hasChosenMode: boolean;
  isReady: boolean;
  setMode: (mode: PortfolioMode) => void;
  clearMode: () => void;
};

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null);

function readMode(): PortfolioMode | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(PORTFOLIO_MODE_STORAGE_KEY);
  return isPortfolioMode(saved) ? saved : null;
}

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setModeState(readMode());
    setIsReady(true);
  }, []);

  const setMode = useCallback((next: PortfolioMode) => {
    setModeState(next);
    localStorage.setItem(PORTFOLIO_MODE_STORAGE_KEY, next);
    window.scrollTo(0, 0);
  }, []);

  const clearMode = useCallback(() => {
    localStorage.removeItem(PORTFOLIO_MODE_STORAGE_KEY);
    setModeState(null);
  }, []);

  return (
    <PortfolioModeContext.Provider
      value={{
        mode,
        hasChosenMode: mode != null,
        isReady,
        setMode,
        clearMode,
      }}
    >
      {children}
    </PortfolioModeContext.Provider>
  );
}

export function usePortfolioMode(): PortfolioModeContextValue {
  const ctx = useContext(PortfolioModeContext);
  if (!ctx) {
    throw new Error("usePortfolioMode must be used within PortfolioModeProvider");
  }
  return ctx;
}
