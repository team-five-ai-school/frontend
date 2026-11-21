"use client";

import {
  FootprintsIcon,
  HourglassIcon,
  MilestoneIcon,
  TrophyIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { formatHours } from "@/features/chaos-map/chaos-meta";
import { useCountUp } from "@/hooks/use-count-up";
import { t, tp } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { QuestScope, QuestSummary, Stamp, StampId } from "../quest";

/** The scoreboard: completion ring, rank with an XP bar to the next one, the scope's key number, stamps. */
export function QuestBoard({ scope, summary }: { scope: QuestScope; summary: QuestSummary }) {
  const { rank } = summary;
  const xp = Math.round(useCountUp(summary.xp));
  const toNext = rank.xpTo === null ? null : rank.xpTo - summary.xp;
  const rankPercent =
    rank.xpTo === null ? 100 : ((summary.xp - rank.xpFrom) / Math.max(1, rank.xpTo - rank.xpFrom)) * 100;
  const earnedCount = summary.stamps.filter((s) => s.earned).length;

  return (
    <section
      aria-label={t(scope === "plan" ? "quest.planTitle" : "quest.courseTitle")}
      className="flex flex-col gap-6 sheet p-4 sm:p-6"
    >
      <div className="flex items-center gap-4 sm:gap-6">
        <ProgressRing percent={summary.percent} done={summary.done} total={summary.total} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="text-sm text-muted-foreground">{t("quest.rank")}</span>
          <span className="text-2xl font-bold text-balance sm:text-3xl">{t(`quest.ranks.${rank.id}`)}</span>
          <ProgressBar
            value={rankPercent}
            className="h-2"
            aria-label={
              rank.next
                ? t("quest.toNextRank", { xp: toNext ?? 0, rank: t(`quest.ranks.${rank.next}`) })
                : t("quest.topRank")
            }
          />
          <span className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-sm text-muted-foreground tabular-nums">
            <span className="font-medium text-foreground">
              {t("quest.xpOf", { xp, total: summary.xpTotal })}
            </span>
            <span>
              {rank.next
                ? t("quest.toNextRank", { xp: toNext ?? 0, rank: t(`quest.ranks.${rank.next}`) })
                : t("quest.topRank")}
            </span>
          </span>
        </div>
      </div>

      {scope === "plan" && summary.hoursSavedTotal > 0 && (
        <p className="text-sm text-muted-foreground tabular-nums">
          {t("quest.hoursFreed", {
            hours: formatHours(summary.hoursSaved),
            total: formatHours(summary.hoursSavedTotal),
          })}
        </p>
      )}
      {scope === "course" && summary.minutesLeft > 0 && (
        <p className="text-sm text-muted-foreground tabular-nums">
          {t("quest.minutesLeft", { minutes: summary.minutesLeft })}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-medium">{t("quest.stampsTitle")}</h2>
          <span className="text-sm text-muted-foreground tabular-nums">
            {t("quest.stampsCount", { count: earnedCount, total: summary.stamps.length })}
          </span>
        </div>
        <ul className="flex flex-wrap gap-2 sm:gap-3">
          {summary.stamps.map((stamp, i) => (
            <li key={stamp.id}>
              <StampBadge
                stamp={stamp}

                tilt={tilts[i % tilts.length]}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Ring ───────── */

const R = 42;
const C = 2 * Math.PI * R;

function ProgressRing({ percent, done, total }: { percent: number; done: number; total: number }) {
  const shown = Math.round(useCountUp(percent));
  const complete = total > 0 && done === total;
  return (
    <div
      role="img"
      aria-label={t("quest.ringLabel", { done, total })}
      className="relative size-24 shrink-0 sm:size-28"
    >
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={R} fill="none" strokeWidth="8" className="stroke-progress-track" />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - shown / 100)}
          className={cn(complete ? "stroke-success" : "stroke-primary")}
        />
      </svg>
      <span className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden>
        <span className="numeral text-xl sm:text-2xl">{shown}%</span>
        <span className="text-xs text-muted-foreground tabular-nums">
          {done}/{total} {tp("quest.steps", total)}
        </span>
      </span>
    </div>
  );
}

/* ───────── Stamps ───────── */

export const stampIcon: Record<StampId, LucideIcon> = {
  first_step: FootprintsIcon,
  streak_three: ZapIcon,
  halfway: MilestoneIcon,
  time_saver: HourglassIcon,
  finisher: TrophyIcon,
};
/** A rubber stamp is never put on perfectly straight. */
const tilts = ["-rotate-6", "rotate-3", "-rotate-2", "rotate-6", "-rotate-3"];

function StampBadge({ stamp, tilt }: { stamp: Stamp; tilt: string }) {
  const Icon = stampIcon[stamp.id];
  const title = t(`quest.stamps.${stamp.id}.title`);
  return (
    <Popover>
      <PopoverTrigger
        aria-label={`${title}: ${stamp.earned ? t("quest.earned") : t("quest.notEarned")}`}
        className={cn(
          "flex size-12 items-center justify-center rounded-full transition-transform duration-200 hover:scale-105 focus-visible:scale-105 sm:size-14",
          stamp.earned
            ? cn("border-[3px] border-double border-success text-success-strong", tilt)
            : "border-2 border-dashed border-input text-subtle-foreground",
        )}
      >
        <Icon className="size-5 sm:size-6" aria-hidden />
      </PopoverTrigger>
      <PopoverContent className="flex w-64 flex-col gap-1">
        <span className="font-medium">{title}</span>
        <span className="text-sm text-muted-foreground">{t(`quest.stamps.${stamp.id}.hint`)}</span>
        <span
          className={cn(
            "text-sm font-medium",
            stamp.earned ? "text-success-strong" : "text-muted-foreground",
          )}
        >
          {stamp.earned ? t("quest.earned") : t("quest.notEarned")}
        </span>
      </PopoverContent>
    </Popover>
  );
}

export function QuestBoardSkeleton() {
  return (
    <div className="flex flex-col gap-6 sheet p-4 sm:p-6" aria-hidden>
      <div className="flex items-center gap-4 sm:gap-6">
        <Skeleton className="size-24 rounded-full sm:size-28" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-2 w-full" />
        </div>
      </div>
      <div className="flex gap-3">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="size-12 rounded-full sm:size-14" />
        ))}
      </div>
    </div>
  );
}
