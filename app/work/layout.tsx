import Link from "next/link";
import { site } from "@/content/site";

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-semibold tracking-tight text-foreground hover:opacity-80"
          >
            {site.name}
          </Link>
          <Link
            href="/#work"
            className="text-sm text-muted hover:text-foreground"
          >
            All projects
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
