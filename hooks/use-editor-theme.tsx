"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";
import {
  defaultEditorThemeId,
  EDITOR_THEME_STORAGE_KEY,
  getDefaultEditorThemeForScheme,
  getEditorThemePreset,
  isEditorThemeId,
  type EditorThemeId,
  type EditorThemePreset,
} from "@/content/editor-themes";

type EditorThemeContextValue = {
  presetId: EditorThemeId;
  preset: EditorThemePreset;
  setPresetId: (id: EditorThemeId) => void;
};

const EditorThemeContext = createContext<EditorThemeContextValue | null>(null);

function readSavedPresetId(): EditorThemeId | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem(EDITOR_THEME_STORAGE_KEY);
  return isEditorThemeId(saved) ? saved : null;
}

function resolvePresetId(resolvedTheme?: string): EditorThemeId {
  const saved = readSavedPresetId();
  if (saved) return saved;
  const scheme = resolvedTheme === "light" ? "light" : "dark";
  return getDefaultEditorThemeForScheme(scheme);
}

function applyPreset(preset: EditorThemePreset, setTheme: (t: string) => void) {
  const root = document.documentElement;
  root.dataset.editorTheme = preset.id;
  for (const [key, value] of Object.entries(preset.vars)) {
    root.style.setProperty(key, value);
  }
  setTheme(preset.colorScheme);
}

export function EditorThemeProvider({ children }: { children: ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [presetId, setPresetIdState] = useState<EditorThemeId>(defaultEditorThemeId);

  useEffect(() => {
    if (!resolvedTheme) return;
    const id = resolvePresetId(resolvedTheme);
    setPresetIdState(id);
    applyPreset(getEditorThemePreset(id), setTheme);
  }, [resolvedTheme, setTheme]);

  const setPresetId = useCallback(
    (id: EditorThemeId) => {
      setPresetIdState(id);
      localStorage.setItem(EDITOR_THEME_STORAGE_KEY, id);
      applyPreset(getEditorThemePreset(id), setTheme);
    },
    [setTheme],
  );

  const preset = getEditorThemePreset(presetId);

  return (
    <EditorThemeContext.Provider value={{ presetId, preset, setPresetId }}>
      {children}
    </EditorThemeContext.Provider>
  );
}

export function useEditorTheme(): EditorThemeContextValue {
  const ctx = useContext(EditorThemeContext);
  if (!ctx) {
    throw new Error("useEditorTheme must be used within EditorThemeProvider");
  }
  return ctx;
}
