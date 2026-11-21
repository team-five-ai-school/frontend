"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRightIcon, CheckIcon, LockIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import type { Lesson, Progress } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { progressQuery } from "../progress";

type LessonStatus = "completed" | "in_progress" | "next" | "locked";

/**
 * Lessons open in order: completed ones stay open for review; the first unfinished lesson and any lesson
 * right after a completed one are "next" (or "in progress" once they have answers); the rest are locked. A guest sees lesson 1 as next.
 * The lock is a UI guide only; the backend serves every lesson.
 */
export function lessonStatuses(lessons: Lesson[], progress: Progress | null): LessonStatus[] {
  const done = new Set(progress?.completedLessonIds ?? []);
  const started = new Set(progress?.startedLessonIds ?? []);
  const firstOpen = lessons.findIndex((l) => !done.has(l.id));
  return lessons.map((lesson, i) => {
    if (done.has(lesson.id)) return "completed";
    if (started.has(lesson.id)) return "in_progress";
    const prevDone = i > 0 && done.has(lessons[i - 1].id);
    return i === firstOpen || prevDone ? "next" : "locked";
  });
}

const badge: Record<
  LessonStatus,
  { label: string; icon: typeof CheckIcon; variant: "success" | "info" | "default" | "outline" }
> = {
  completed: { label: t("course.status.completed"), icon: CheckIcon, variant: "success" },
  in_progress: { label: t("course.status.inProgress"), icon: PlayIcon, variant: "info" },
  next: { label: t("course.status.next"), icon: ArrowRightIcon, variant: "default" },
  locked: { label: t("course.status.locked"), icon: LockIcon, variant: "outline" },
};

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  const { data: progress, isPending } = useQuery(progressQuery);
  // Until progress loads every lesson is open and unbadged, so nothing flickers from "locked" to "open".
  const statuses = isPending ? null : lessonStatuses(lessons, progress ?? null);

  return (
    <ol className="flex flex-col gap-3">
      {lessons.map((lesson, i) => {
        const status = statuses?.[i] ?? null;
        const locked = status === "locked";
        const body = (
          <>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-xs text-muted-foreground tabular-nums">
                {t("course.lessonNumber", { number: lesson.order })} ·{" "}
                {t("course.duration", { minutes: lesson.durationMinutes })}
              </span>
              <span className="font-semibold text-balance">{lesson.title}</span>
              <span className="text-sm text-muted-foreground">
                {locked ? t("course.lockedHint") : lesson.summary}
              </span>
            </div>
            {status && <StatusBadge status={status} />}
          </>
        );
        const shell = "flex items-start gap-4 rounded-xl border bg-card p-4 sm:items-center sm:p-5";
        return (
          <li key={lesson.id}>
            {locked ? (
              <div aria-disabled className={cn(shell, "text-muted-foreground opacity-70")}>
                {body}
              </div>
            ) : (
              <Link
                href={`/lessons/${lesson.id}`}
                className={cn(
                  shell,
                  "transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                  status === "next" && "border-primary/50",
                )}
              >
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StatusBadge({ status }: { status: LessonStatus }) {
  const { label, icon: Icon, variant } = badge[status];
  return (
    <Badge variant={variant} className="shrink-0">
      <Icon data-icon="inline-start" aria-hidden />
      {label}
    </Badge>
  );
}
