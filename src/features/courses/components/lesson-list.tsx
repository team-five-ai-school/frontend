"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, CircleIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { Lesson } from "@/lib/contracts";
import { t } from "@/lib/i18n";

import { progressQuery } from "../progress";

export function LessonList({ lessons }: { lessons: Lesson[] }) {
  const { data: progress } = useQuery(progressQuery);
  const done = new Set(progress?.completedLessonIds ?? []);
  return (
    <ol className="flex flex-col divide-y rounded-xl border bg-card">
      {lessons.map((lesson) => {
        const completed = done.has(lesson.id);
        return (
          <li key={lesson.id} className="flex items-center gap-4 p-4">
            {completed ? (
              <CheckCircle2Icon
                className="size-5 shrink-0 text-success-strong"
                aria-label={t("course.completed")}
              />
            ) : (
              <CircleIcon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            )}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="text-xs text-muted-foreground tabular-nums">
                {lesson.order} · {t("course.duration", { minutes: lesson.durationMinutes })}
              </span>
              <span className="font-semibold">{lesson.title}</span>
              <span className="text-sm text-muted-foreground">{lesson.summary}</span>
            </div>
            <Button asChild variant={completed ? "outline" : "default"} size="sm">
              <Link href={`/lessons/${lesson.id}`}>
                {completed ? t("course.reviewLesson") : t("course.startLesson")}
              </Link>
            </Button>
          </li>
        );
      })}
    </ol>
  );
}
