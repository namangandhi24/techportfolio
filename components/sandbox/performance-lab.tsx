"use client";

import { memo, useState } from "react";
import { performanceLabCopy } from "@/content/sandbox";

function ListItem({ label }: { label: string }) {
  return <li className="rounded border border-border px-2 py-1 text-sm">{label}</li>;
}

const MemoItem = memo(ListItem);

function HeavyList({ optimized }: { optimized: boolean }) {
  const items = ["Auth module", "Dashboard", "Settings", "Reports", "Users"];
  const Item = optimized ? MemoItem : ListItem;

  return (
    <ul className="mt-3 flex flex-wrap gap-2">
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
      <p className="mt-2 text-sm text-muted">
        {optimized
          ? performanceLabCopy.optimized
          : performanceLabCopy.unoptimized}
      </p>
      <p className="mt-3 font-mono text-xs text-muted">
        Parent renders: {parentRenders}
      </p>
      <button
        type="button"
        onClick={() => setParentRenders((n) => n + 1)}
        className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
      >
        Trigger parent re-render
      </button>
      <label className="mt-4 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={optimized}
          onChange={(e) => setOptimized(e.target.checked)}
          className="rounded border-border"
        />
        Optimized (memoized items)
      </label>
      <HeavyList optimized={optimized} />
    </div>
  );
}
