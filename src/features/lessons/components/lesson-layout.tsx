"use client";

import { ArrowLeftIcon, CheckIcon, ClockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Lesson } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const lessonSteps = ["theory", "example", "exercise", "mentor"] as const;
export type LessonStep = (typeof lessonSteps)[number];

/**
 * Lesson page frame: theory → example → exercise → Mentor.
 * The Mentor panel (`mentor`) sits on the right on desktop; on phones it is a bottom sheet,
 * so `mentor` is rendered after the content and hides itself below lg.
 */
export function LessonLayout({
  courseTitle,
  lesson,
  step,
  onStepChange,
  completedSteps = [],
  mentor,
  children,
  className,
}: {
  courseTitle: string;
  lesson: Pick<Lesson, "title" | "durationMinutes">;
  step: LessonStep;
  onStepChange: (step: LessonStep) => void;
  completedSteps?: LessonStep[];
  mentor?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const index = lessonSteps.indexOf(step);
  const prev = lessonSteps[index - 1];
  const next = lessonSteps[index + 1];

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] xl:grid-cols-[minmax(0,1fr)_26rem]",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{courseTitle}</p>
          <h1 className="text-2xl font-bold sm:text-4xl">{lesson.title}</h1>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ClockIcon className="size-4" aria-hidden />
            {t("course.duration", { minutes: lesson.durationMinutes })}
          </p>
        </header>

        <nav aria-label={t("lesson.stepNav")}>
          <ol className="grid grid-cols-4 gap-2">
            {lessonSteps.map((s, i) => {
              const current = s === step;
              const done = completedSteps.includes(s);
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => onStepChange(s)}
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex min-h-11 w-full flex-col items-start gap-1.5 rounded-md pt-1 text-left text-sm focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none",
                      current ? "font-bold text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-1.5 w-full rounded-full transition-colors duration-(--duration-base)",
                        current
                          ? "bg-primary"
                          : done || i < lessonSteps.indexOf(step)
                            ? "bg-progress"
                            : "bg-progress-track",
                      )}
                    />
                    <span className="flex items-center gap-1">
                      {done && <CheckIcon className="size-3.5 text-success-strong" aria-hidden />}
                      {t(`lesson.steps.${s}`)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="flex min-w-0 flex-col gap-6 sheet p-5 sm:p-7">{children}</div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t pt-6">
          {prev ? (
            <Button variant="ghost" onClick={() => onStepChange(prev)}>
              <ArrowLeftIcon data-icon="inline-start" aria-hidden />
              {t(`lesson.steps.${prev}`)}
            </Button>
          ) : (
            <span />
          )}
          {next ? (
            <Button onClick={() => onStepChange(next)}>
              {t("lesson.nextStep")}: {t(`lesson.steps.${next}`)}
            </Button>
          ) : (
            <Button>{t("lesson.finish")}</Button>
          )}
        </footer>
      </div>

      {mentor}
    </div>
  );
}
