"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useCountUp } from "@/hooks/use-count-up";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { formatHours } from "../chaos-meta";
import type { ChaosMode } from "./chaos-map";

/**
 * The big weekly-hours number next to the chaos map.
 * "Зараз": hours of routine (needs-you color). "З AI": hours left + hours freed.
 */
export function HoursMetric({
  hoursNow,
  hoursWithAi,
  mode,
  loading = false,
  className,
}: {
  hoursNow: number;
  hoursWithAi: number;
  mode: ChaosMode;
  loading?: boolean;
  className?: string;
}) {
  const target = mode === "ai" ? hoursWithAi : hoursNow;
  const shown = useCountUp(target);
  const saved = Math.max(0, hoursNow - hoursWithAi);

  if (loading) {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-5 w-48" />
      </div>
    );
  }

  const ai = mode === "ai";

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Before AI, crossed out with a ballpoint: the edit itself is the story. */}
      <p
        aria-hidden={!ai}
        className={cn(
          "numeral text-2xl text-muted-foreground transition-opacity duration-(--duration-slow)",
          ai ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="struck">{formatHours(hoursNow)}</span> {t("common.hoursShort")}
      </p>
      <p className="flex flex-wrap items-baseline gap-x-3">
        {/* Routine hours need the person: marker under the number; with AI the marker lifts off. */}
        <span
          className={cn(
            "highlight numeral text-5xl transition-[background-size,text-decoration-color] duration-(--duration-slow) ease-standard [--highlight-height:0.42em] sm:text-6xl dark:decoration-[0.07em] dark:underline-offset-[0.03em]",
            ai && "highlight-off",
          )}
        >
          {formatHours(Math.round(shown * 10) / 10)}
        </span>
        <span className="text-lg font-medium">{t("hours.perWeek")}</span>
      </p>
      <p className="text-muted-foreground">{ai ? t("hours.after") : t("hours.now")}</p>
      <p
        className={cn(
          "-rotate-2 self-start rounded-sm border-2 border-success-strong/80 px-2 py-0.5 font-semibold text-success-strong transition-opacity duration-(--duration-slow)",
          ai ? "opacity-100 delay-(--duration-chaos)" : "opacity-0",
        )}
        aria-hidden={!ai}
      >
        +{formatHours(saved)} {t("common.hoursShort")} {t("hours.saved")}
      </p>
    </div>
  );
}
