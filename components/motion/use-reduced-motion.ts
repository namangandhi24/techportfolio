"use client";

import { useSyncExternalStore } from "react";
import { useHydrated } from "@/hooks/use-hydrated";

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  const hydrated = useHydrated();
  const prefersReduced = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return hydrated && prefersReduced;
}
