export function EngineeringArtifactIcon({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const props = {
    className: className ?? "h-[18px] w-[18px]",
    "aria-hidden": true as const,
  };

  switch (id) {
    case "browser":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 9h18M7 13h4" strokeLinecap="round" />
        </svg>
      );
    case "components":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <rect x="4" y="4" width="8" height="6" rx="1" />
          <rect x="12" y="10" width="8" height="6" rx="1" />
          <path d="M12 7H8v3M12 13h4v3" strokeLinecap="round" />
        </svg>
      );
    case "api":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <path d="M8 8l-3 3 3 3M16 8l3 3-3 3M14 6l-4 12" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "database":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v8c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4" />
        </svg>
      );
    case "deployment":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <path d="M7 14c0-2 2.2-4 5-4s5 2 5 4-2 4-5 6-5-6-2-4Z" />
          <path d="M12 4v4M9 6h6" strokeLinecap="round" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
          <path
            d="M12 3c-3.5 0-5.2 1.7-5.2 4v2h5.2V8H8.5c-.5 0-.8.3-.8.8V11h7.5c2.8 0 4.5 1.4 4.5 4v1.2c0 2.8-2 4.8-5.5 4.8H10v-2h5.5c1.8 0 2.8-.9 2.8-2.2V15c0-1.3-1-2-2.8-2H7.5V9.5C7.5 6.5 9.5 5 12 5s4.5 1.5 4.5 4.5V11h2V9.5C18.5 5.5 16 3 12 3Z"
            fill="#3776AB"
          />
          <circle cx="9.5" cy="6.5" r="1" fill="#FFD43B" />
          <circle cx="14.5" cy="17.5" r="1" fill="#FFD43B" />
        </svg>
      );
    case "java":
      return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
          <path
            d="M8.5 18c3 2.5 7.5 2.5 10.5 0-.8.7-2.5 1.2-4.5 1.2s-3.7-.5-6-1.2Z"
            fill="#5382A1"
          />
          <path
            d="M12 4c-2.5 2-4 4.5-3.5 7 .3 1.8 1.5 3 3.5 3.5M12 4c2.5 2 4 4.5 3.5 7-.3 1.8-1.5 3-3.5 3.5"
            stroke="#E76F00"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M12 8v8" stroke="#5382A1" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "cicd":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
          <circle cx="7" cy="12" r="3" />
          <circle cx="17" cy="7" r="3" />
          <circle cx="17" cy="17" r="3" />
          <path d="M10 11l4-2M10 13l4 2" strokeLinecap="round" />
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
