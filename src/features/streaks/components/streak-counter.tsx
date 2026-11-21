import { FlameIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import type { Streak } from "@/lib/contracts";
import { t, tp } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Current streak. `compact` fits the header; the full variant explains what to do today.
 * The flame is filled only when today already counts, so the state is not color-only.
 */
export function StreakCounter({
  streak,
  compact = false,
  loading = false,
  className,
}: {
  streak: Pick<Streak, "current" | "best" | "todayDone">;
  compact?: boolean;
  loading?: boolean;
  className?: string;
}) {
  if (loading)
    return <Skeleton className={cn(compact ? "h-9 w-20 rounded-full" : "h-20 w-full", className)} />;

  const icon = (
    <FlameIcon
      aria-hidden
      className={cn(
        "size-5 shrink-0",
        streak.todayDone ? "fill-streak text-streak-strong" : "text-subtle-foreground",
      )}
    />
  );

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-medium tabular-nums",
          streak.todayDone ? "bg-streak-soft text-streak-strong" : "bg-muted text-muted-foreground",
          className,
        )}
        aria-label={tp("streak.days", streak.current)}
      >
        {icon}
        {streak.current}
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          streak.todayDone ? "bg-streak-soft" : "bg-muted",
        )}
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-lg font-bold tabular-nums">{tp("streak.days", streak.current)}</span>
        <span className="text-sm text-muted-foreground">
          {streak.todayDone ? t("streak.doneToday") : t("streak.keep")}
        </span>
      </div>
    </div>
  );
}
