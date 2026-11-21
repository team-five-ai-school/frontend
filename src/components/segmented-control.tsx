"use client";

import { RadioGroup as RadioGroupPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export type SegmentedOption<T extends string> = {
  value: T;
  label: string;
  icon?: React.ReactNode;
};

/**
 * Two to four mutually exclusive views (e.g. "Зараз" / "З AI" on the chaos map).
 * A radio group under the hood: arrow keys move the selection, one tab stop.
 */
export function SegmentedControl<T extends string>({
  value,
  onValueChange,
  options,
  label,
  fullWidth = false,
  className,
}: {
  value: T;
  onValueChange: (value: T) => void;
  options: readonly SegmentedOption<T>[];
  /** Accessible name of the group. */
  label: string;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <RadioGroupPrimitive.Root
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      aria-label={label}
      orientation="horizontal"
      className={cn(
        "inline-grid auto-cols-fr grid-flow-col gap-1 rounded-xl border border-foreground/15 bg-foreground/5 p-1",
        fullWidth && "grid w-full",
        className,
      )}
    >
      {options.map((option) => (
        <RadioGroupPrimitive.Item
          key={option.value}
          value={option.value}
          className={cn(
            "inline-flex min-h-11 min-w-0 items-center justify-center gap-2 rounded-lg px-4 text-base font-medium text-muted-foreground",
            "transition-colors duration-(--duration-fast) ease-standard hover:text-foreground",
            "focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
            "data-[state=checked]:bg-card data-[state=checked]:text-foreground data-[state=checked]:shadow-paper data-[state=checked]:ring-1 data-[state=checked]:ring-foreground/10",
            "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0",
          )}
        >
          {option.icon}
          <span className="truncate">{option.label}</span>
        </RadioGroupPrimitive.Item>
      ))}
    </RadioGroupPrimitive.Root>
  );
}
