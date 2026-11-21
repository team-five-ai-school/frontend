import { cn } from "@/lib/utils";

/** Next questions the person can ask with one tap. Wraps on phones; never scrolls sideways. */
export function SuggestionChips({
  suggestions,
  onSelect,
  disabled = false,
  label,
  className,
}: {
  suggestions: string[];
  onSelect: (text: string) => void;
  disabled?: boolean;
  /** Accessible name of the group, e.g. «Можна запитати». */
  label: string;
  className?: string;
}) {
  if (suggestions.length === 0) return null;
  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {suggestions.map((s) => (
        <li key={s}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(s)}
            className="inline-flex min-h-11 items-center rounded-lg border border-input bg-card px-4 text-left text-sm font-medium transition-colors duration-(--duration-fast) hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            {s}
          </button>
        </li>
      ))}
    </ul>
  );
}
