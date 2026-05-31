"use client";

import { useSyncExternalStore } from "react";

let hydrated = false;

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};
  if (!hydrated) {
    queueMicrotask(() => {
      hydrated = true;
      onStoreChange();
    });
  }
  return () => {};
}

function getSnapshot() {
  return hydrated;
}

function getServerSnapshot() {
  return false;
}

/**
 * False on the server and during React hydration; true after the first client tick.
 * Use before rendering browser-only UI or Framer Motion `initial` animations.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
