import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}
