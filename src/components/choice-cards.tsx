"use client";

import { CheckIcon, XIcon } from "lucide-react";

import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ChoiceCardOption = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

/** After checking an answer: how each option is marked. Never color-only: each mark has an icon. */
export type ChoiceMark = "correct" | "incorrect" | "missed";

/**
 * Large tappable answer cards (quiz, exercises, role picker).
 * Native radio/checkbox inputs underneath: keyboard, screen readers and forms work out of the box.
 */
export function ChoiceCards({
  name,
  type,
  options,
  value,
  onChange,
  marks,
  disabled = false,
  legend,
  hideLegend = false,
  columns = 1,
  className,
}: {
  name: string;
  type: "single" | "multi";
  options: readonly ChoiceCardOption[];
  value: string[];
  onChange: (value: string[]) => void;
  marks?: Partial<Record<string, ChoiceMark>>;
  disabled?: boolean;
  legend: string;
  hideLegend?: boolean;
  columns?: 1 | 2;
  className?: string;
}) {
  const toggle = (id: string) => {
    if (type === "single") return onChange([id]);
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };

  return (
    <fieldset className={cn("flex min-w-0 flex-col gap-3", className)} disabled={disabled}>
      <legend className={cn("mb-3 font-medium", hideLegend && "sr-only")}>{legend}</legend>
      <div className={cn("grid grid-cols-1 gap-2", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => {
          const checked = value.includes(option.id);
          const mark = marks?.[option.id];
          return (
            <label
              key={option.id}
              className={cn(
                "relative flex min-h-14 cursor-pointer items-start gap-3 rounded-lg border border-foreground/20 bg-card px-4 py-3 shadow-paper transition-[border-color,background-color,translate] duration-(--duration-fast)",
                "hover:-translate-y-px hover:border-foreground/50 has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/60",
                checked && "border-primary bg-accent",
                mark === "correct" && "border-success bg-success-soft",
                mark === "incorrect" && "border-destructive/60 bg-destructive-soft",
                mark === "missed" && "border-dashed border-success",
                disabled && "cursor-default hover:border-border",
                disabled && !mark && !checked && "opacity-60",
              )}
            >
              <input
                type={type === "single" ? "radio" : "checkbox"}
                name={name}
                value={option.id}
                checked={checked}
                onChange={() => toggle(option.id)}
                className="peer sr-only"
              />
              <Indicator type={type} checked={checked} mark={mark} />
              {option.icon && (
                <span className="mt-0.5 shrink-0 text-muted-foreground [&_svg]:size-5">{option.icon}</span>
              )}
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="break-words">{option.label}</span>
                {option.description && (
                  <span className="text-sm text-muted-foreground">{option.description}</span>
                )}
              </span>
              {mark && <span className="sr-only">{t(`exercise.mark.${mark}`)}</span>}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Indicator({
  type,
  checked,
  mark,
}: {
  type: "single" | "multi";
  checked: boolean;
  mark?: ChoiceMark;
}) {
  const shape = type === "single" ? "rounded-full" : "rounded-md";
  if (mark === "correct" || mark === "missed")
    return (
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center bg-success text-success-foreground",
          shape,
        )}
      >
        <CheckIcon className="size-4" aria-hidden />
      </span>
    );
  if (mark === "incorrect")
    return (
      <span
        className={cn(
          "mt-0.5 flex size-6 shrink-0 items-center justify-center bg-destructive text-destructive-foreground",
          shape,
        )}
      >
        <XIcon className="size-4" aria-hidden />
      </span>
    );
  return (
    <span
      aria-hidden
      className={cn(
        "mt-0.5 flex size-6 shrink-0 items-center justify-center border-2 border-border-strong",
        shape,
        checked && "border-primary bg-primary text-primary-foreground",
      )}
    >
      {checked &&
        (type === "single" ? (
          <span className="size-2.5 rounded-full bg-current" />
        ) : (
          <CheckIcon className="size-4" />
        ))}
    </span>
  );
}
