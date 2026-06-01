"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  DEFAULT_FILE_PATH,
  getFileDisplayLabel,
  getIdeFile,
  type IdeActivityView,
  type IdeFileEntry,
} from "@/content/ide-manifest";

export type IdeTab = {
  id: string;
  path: string;
  label: string;
  dirty?: boolean;
};

type IdeWorkspaceState = {
  activeView: IdeActivityView;
  openTabs: IdeTab[];
  activeTabId: string | null;
  sidebarOpen: boolean;
  searchQuery: string;
  mobileSidebarOpen: boolean;
  setActiveView: (view: IdeActivityView) => void;
  openFile: (path: string) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  toggleSidebar: () => void;
  setSearchQuery: (q: string) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  activeFile: IdeFileEntry | null;
};

const IdeWorkspaceContext = createContext<IdeWorkspaceState | null>(null);

const VALID_VIEWS: IdeActivityView[] = [
  "explorer",
  "search",
  "scm",
  "run",
  "extensions",
  "profile",
];

function isIdeActivityView(value: string | null): value is IdeActivityView {
  return value != null && VALID_VIEWS.includes(value as IdeActivityView);
}

function tabFromPath(path: string): IdeTab | null {
  const file = getIdeFile(path);
  if (!file) return null;
  return {
    id: file.id,
    path: file.path,
    label: getFileDisplayLabel(file.path),
  };
}

function readInitialTab(searchParams: URLSearchParams): IdeTab {
  const fileParam = searchParams.get("file") ?? DEFAULT_FILE_PATH;
  return tabFromPath(fileParam) ?? tabFromPath(DEFAULT_FILE_PATH)!;
}

function readInitialView(searchParams: URLSearchParams): IdeActivityView {
  const viewParam = searchParams.get("view");
  return isIdeActivityView(viewParam) ? viewParam : "explorer";
}

function applyUrlToState(
  search: string,
  setView: (v: IdeActivityView) => void,
  setTabs: React.Dispatch<React.SetStateAction<IdeTab[]>>,
  setActiveId: (id: string) => void,
) {
  const sp = new URLSearchParams(search);
  const fileParam = sp.get("file") ?? DEFAULT_FILE_PATH;
  const viewParam = sp.get("view");
  const nextView = isIdeActivityView(viewParam) ? viewParam : "explorer";
  const nextTab = tabFromPath(fileParam) ?? tabFromPath(DEFAULT_FILE_PATH)!;

  setView(nextView);
  setTabs((prev) => (prev.some((t) => t.id === nextTab.id) ? prev : [...prev, nextTab]));
  setActiveId(nextTab.id);
}

export function IdeWorkspaceProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();

  const [activeView, setActiveViewState] = useState<IdeActivityView>(() =>
    readInitialView(searchParams),
  );
  const [openTabs, setOpenTabs] = useState<IdeTab[]>(() => [readInitialTab(searchParams)]);
  const [activeTabId, setActiveTabId] = useState<string>(() => readInitialTab(searchParams).id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const activeTabPath = useMemo(() => {
    const tab = openTabs.find((t) => t.id === activeTabId);
    return tab?.path ?? DEFAULT_FILE_PATH;
  }, [openTabs, activeTabId]);

  // Sync state → URL without triggering Next.js searchParams re-render loops
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("file", activeTabPath);
    params.set("view", activeView);
    const next = `/?${params.toString()}`;
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== next) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [activeTabPath, activeView]);

  // Browser back / forward only
  useEffect(() => {
    const onPopState = () => {
      applyUrlToState(window.location.search, setActiveViewState, setOpenTabs, setActiveTabId);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const setActiveView = useCallback((view: IdeActivityView) => {
    setActiveViewState(view);
    setSidebarOpen(true);
    setMobileSidebarOpen(true);
  }, []);

  const openFile = useCallback((path: string) => {
    const tab = tabFromPath(path);
    if (!tab) return;

    setOpenTabs((prev) => (prev.some((t) => t.id === tab.id) ? prev : [...prev, tab]));
    setActiveTabId(tab.id);
    setActiveViewState("explorer");
    setSidebarOpen(true);
    setMobileSidebarOpen(false);
  }, []);

  const closeTab = useCallback(
    (tabId: string) => {
      setOpenTabs((prev) => {
        const closedIndex = prev.findIndex((t) => t.id === tabId);
        if (closedIndex === -1) return prev;

        const next = prev.filter((t) => t.id !== tabId);
        const resolved = next.length === 0 ? [tabFromPath(DEFAULT_FILE_PATH)!] : next;

        if (activeTabId === tabId) {
          const newActive =
            resolved[Math.min(closedIndex, resolved.length - 1)] ?? resolved[0]!;
          queueMicrotask(() => setActiveTabId(newActive.id));
        }

        return resolved;
      });
    },
    [activeTabId],
  );

  const setActiveTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  const activeFile = useMemo(() => {
    const tab = openTabs.find((t) => t.id === activeTabId);
    return tab ? (getIdeFile(tab.path) ?? null) : null;
  }, [activeTabId, openTabs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggleSidebar]);

  const value = useMemo<IdeWorkspaceState>(
    () => ({
      activeView,
      openTabs,
      activeTabId,
      sidebarOpen,
      searchQuery,
      mobileSidebarOpen,
      setActiveView,
      openFile,
      closeTab,
      setActiveTab,
      toggleSidebar,
      setSearchQuery,
      setMobileSidebarOpen,
      activeFile,
    }),
    [
      activeView,
      openTabs,
      activeTabId,
      sidebarOpen,
      searchQuery,
      mobileSidebarOpen,
      setActiveView,
      openFile,
      closeTab,
      setActiveTab,
      toggleSidebar,
      activeFile,
    ],
  );

  return (
    <IdeWorkspaceContext.Provider value={value}>{children}</IdeWorkspaceContext.Provider>
  );
}

export function useIdeWorkspace(): IdeWorkspaceState {
  const ctx = useContext(IdeWorkspaceContext);
  if (!ctx) throw new Error("useIdeWorkspace must be used within IdeWorkspaceProvider");
  return ctx;
}
