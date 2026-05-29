export function SystemFlowIcon({ id, className }: { id: string; className?: string }) {
  const props = { className: className ?? "h-4 w-4", "aria-hidden": true as const };

  switch (id) {
    case "user":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <circle cx="12" cy="8" r="3.5" />
          <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" strokeLinecap="round" />
        </svg>
      );
    case "frontend":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <path d="M4 9h16M9 9v10" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <path d="M8 8l-3 3 3 3M16 8l3 3-3 3M14 6l-4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "logic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <path
            d="M12 4v4M12 16v4M6 12H4M20 12h-2M7.8 7.8l1.4-1.4M14.8 14.8l1.4-1.4M16.2 7.8l-1.4-1.4M9.2 14.8l-1.4-1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "data":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" />
        </svg>
      );
    case "deploy":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <path d="M12 3v12M8 11l4 4 4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}
