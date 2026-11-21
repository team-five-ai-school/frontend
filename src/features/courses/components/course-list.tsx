"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, ClockIcon } from "lucide-react";
import Link from "next/link";

import { Progress as ProgressBar } from "@/components/ui/progress";
import type { Course } from "@/lib/contracts";
import { t } from "@/lib/i18n";

import { progressQuery } from "../progress";

/** Course cards; progress is merged in on the client from GET /me/progress. */
export function CourseList({ courses }: { courses: Course[] }) {
  const { data: progress } = useQuery(progressQuery);
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {courses.map((course) => {
        const p = progress?.courses[course.id];
        const percent = p?.progressPercent ?? 0;
        return (
          <li key={course.id}>
            <Link
              href={`/courses/${course.id}`}
              className="flex h-full flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-balance">{course.title}</h2>
                {p?.status === "completed" && (
                  <CheckCircle2Icon
                    className="size-5 shrink-0 text-success-strong"
                    aria-label={t("course.completed")}
                  />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{course.summary}</p>
              <p className="mt-auto flex items-center gap-3 text-sm text-muted-foreground tabular-nums">
                <span>{t("course.lessonsCount", { count: course.lessonCount })}</span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="size-3.5" aria-hidden />
                  {t("course.duration", { minutes: course.durationMinutes })}
                </span>
              </p>
              {percent > 0 && (
                <div className="flex items-center gap-3">
                  <ProgressBar
                    value={percent}
                    className="h-1.5"
                    aria-label={t("course.progress", { percent })}
                  />
                  <span className="text-xs text-muted-foreground tabular-nums">{percent}%</span>
                </div>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
