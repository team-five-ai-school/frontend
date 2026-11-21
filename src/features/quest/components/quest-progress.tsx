"use client";

import { useQuery } from "@tanstack/react-query";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { toast } from "sonner";

import { progressQuery } from "@/features/courses/progress";
import type { LearningPlan, Lesson } from "@/lib/contracts";
import { t } from "@/lib/i18n";

import { courseQuest, planQuest, summarize, type Quest } from "../quest";
import { useQuestCelebration, type Celebration } from "../use-quest-celebration";
import { QuestBoard, QuestBoardSkeleton, stampIcon } from "./quest-board";
import { QuestPath } from "./quest-path";

/**
 * The unified progress module: scoreboard + trail + celebration of what is new since the last visit.
 * Works for any scope; use `PlanQuest` / `CourseQuest` below, or build a `Quest` yourself.
 */
export function QuestProgress({
  quest,
  guest = false,
  children,
}: {
  quest: Quest;
  /** Guests see the board but nothing is celebrated: their progress is not saved. */
  guest?: boolean;
  /** Rendered between the board and the trail (e.g. a sign-in hint). */
  children?: ReactNode;
}) {
  const summary = summarize(quest);
  useQuestCelebration(quest.id, guest ? null : summary, showCelebration);

  return (
    <div className="flex flex-col gap-8">
      <QuestBoard scope={quest.scope} summary={summary} />
      {children}
      <QuestPath steps={quest.steps} currentId={summary.current?.id ?? null} />
    </div>
  );
}

/** The whole learning plan. `progress` makes steps done as soon as their lesson is finished. */
export function PlanQuest({ plan, guest = false }: { plan: LearningPlan; guest?: boolean }) {
  const { data: progress, isPending } = useQuery(progressQuery);
  if (isPending && !guest) return <QuestBoardSkeleton />;
  return <QuestProgress quest={planQuest(plan, progress ?? null)} guest={guest} />;
}

/** One course: lessons in order, with the same ranks, XP and stamps as the plan. */
export function CourseQuest({ courseId, lessons }: { courseId: string; lessons: Lesson[] }) {
  const { data: progress, isPending } = useQuery(progressQuery);
  if (isPending) return <QuestBoardSkeleton />;
  const guest = progress === null;
  return (
    <QuestProgress quest={courseQuest(courseId, lessons, progress ?? null)} guest={guest}>
      {guest && (
        <p className="text-sm text-muted-foreground">
          <Link href="/register" className="font-medium text-foreground underline underline-offset-4">
            {t("quest.guestHint")}
          </Link>
        </p>
      )}
    </QuestProgress>
  );
}

function showCelebration({ xpGained, rankUp, stamps }: Celebration) {
  const lines = [
    rankUp && t("quest.celebrateRank", { rank: t(`quest.ranks.${rankUp}`) }),
    ...stamps.map((id) => t("quest.celebrateStamp", { title: t(`quest.stamps.${id}.title`) })),
  ].filter(Boolean);
  toast.custom(
    () => (
      <div
        role="status"
        className="flex w-full max-w-sm items-center gap-3 rounded-xl border bg-raised p-4 text-foreground shadow-raised sm:w-[22rem]"
      >
        <span className="flex size-11 shrink-0 animate-in items-center justify-center rounded-full bg-success-soft text-success-strong duration-300 zoom-in-50">
          <SparklesIcon className="size-5" aria-hidden />
        </span>
        <span className="flex min-w-0 flex-col">
          {xpGained > 0 && (
            <span className="numeral text-xl">{t("quest.celebrateXp", { xp: xpGained })}</span>
          )}
          {lines.map((line) => (
            <span key={line} className="font-medium">
              {line}
            </span>
          ))}
          {stamps.length > 0 && (
            <span className="mt-2 flex gap-2" aria-hidden>
              {stamps.map((id, i) => {
                const Icon = stampIcon[id];
                return (
                  <span
                    key={id}
                    style={{ animationDelay: `${200 + i * 150}ms` }}
                    className="flex size-10 -rotate-6 animate-in items-center justify-center rounded-full border-[3px] border-double border-success text-success-strong duration-500 fill-mode-backwards fade-in spin-in-12 zoom-in-150"
                  >
                    <Icon className="size-5" />
                  </span>
                );
              })}
            </span>
          )}
          {lines.length === 0 && (
            <span className="text-sm text-muted-foreground">{t("quest.celebrateKeep")}</span>
          )}
        </span>
      </div>
    ),
    { duration: 6000 },
  );
}
