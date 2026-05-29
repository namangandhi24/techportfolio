"use client";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  label?: string;
  className?: string;
};

export function CopyButton({ text, label = "Copy email", className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "rounded-lg border border-border bg-background px-3 py-2 text-xs font-medium text-muted transition-all duration-200 hover:border-accent/30 hover:text-foreground",
        className,
      )}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
