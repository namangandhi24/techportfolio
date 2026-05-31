"use client";

/* eslint-disable react-hooks/refs -- render-count demo intentionally tracks renders via ref */
import { memo, useRef, useState } from "react";
import { performanceLabCopy } from "@/content/sandbox";

function ListItem({ label }: { label: string }) {
  const renders = useRef(0);
  renders.current += 1;

  return (
    <li className="cursor-default select-none rounded-md bg-accent-muted px-2.5 py-1 text-xs text-foreground">
      {label}
      <span className="ml-1.5 font-mono text-[10px] text-muted-foreground">×{renders.current}</span>
    </li>
  );
}

const MemoItem = memo(ListItem);

function HeavyList({ optimized }: { optimized: boolean }) {
  const items = ["Auth module", "Dashboard", "Settings", "Reports", "Users"];
  const Item = optimized ? MemoItem : ListItem;

  return (
    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Sample nav modules">
      {items.map((item) => (
        <Item key={item} label={item} />
      ))}
    </ul>
  );
}

export function PerformanceLab() {
  const [optimized, setOptimized] = useState(false);
  const [parentRenders, setParentRenders] = useState(0);

  return (
    <div className="rounded-xl border border-border bg-background p-6">
      <h3 className="font-semibold text-foreground">{performanceLabCopy.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {performanceLabCopy.description}
      </p>
      <p className="mt-2 text-sm text-muted">
        {optimized ? performanceLabCopy.optimized : performanceLabCopy.unoptimized}
      </p>
      <p className="mt-3 font-mono text-xs text-muted">
        Parent renders: {parentRenders}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setParentRenders((n) => n + 1)}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90"
        >
          Trigger parent re-render
        </button>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm">
          <input
            type="checkbox"
            checked={optimized}
            onChange={(e) => setOptimized(e.target.checked)}
            className="rounded border-border"
          />
          Optimized (memoized items)
        </label>
      </div>
      <HeavyList optimized={optimized} />
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
        {performanceLabCopy.hint}
      </p>
    </div>
  );
}
