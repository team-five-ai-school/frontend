"use client";

import { ArrowLeftIcon, PartyPopperIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress as ProgressBar } from "@/components/ui/progress";
import {
  QuestionFillBlank,
  QuestionMulti,
  QuestionSingle,
  QuestionTrueFalse,
} from "@/features/exercises/components/questions";
import type { AnswerResult, LessonDetail, LessonStep } from "@/lib/contracts";
import { ApiError } from "@/lib/api-error";
import { t } from "@/lib/i18n";

import { useCheckAnswer, useCompleteLesson, type AnswerInput } from "../progress";

/**
 * Steps through a lesson: theory cards and exercises one by one, then completes it.
 * AI features plug in here later:
 *   - Mentor: pass `onOpenMentor` to the exercise components and render a panel; a wrong answer's
 *     `result.mistakeId` is the mistake to send to the mentor.
 *   - Practice: add a final step after the last block (see docs/spec.md → Personalized practice).
 */
export function LessonPlayer({ detail, loggedIn }: { detail: LessonDetail; loggedIn: boolean }) {
  const { lesson, steps, courseId, courseTitle } = detail;
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Record<string, AnswerResult>>({});
  const check = useCheckAnswer(lesson.id);
  const complete = useCompleteLesson(lesson.id);
  const [needsLogin, setNeedsLogin] = useState(!loggedIn);

  const step = steps[index];
  const finished = index >= steps.length;
  const percent = steps.length ? Math.round((Math.min(index, steps.length) / steps.length) * 100) : 100;

  function next() {
    const nextIndex = index + 1;
    setIndex(nextIndex);
    if (nextIndex >= steps.length && loggedIn) complete.mutate();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit(exerciseId: string, answer: AnswerInput) {
    check.mutate(
      { exerciseId, answer },
      {
        onSuccess: (result) => setResults((r) => ({ ...r, [exerciseId]: result })),
        onError: (error) => {
          if (error instanceof ApiError && error.status === 401) setNeedsLogin(true);
          else toast.error(t("player.answerFailed"));
        },
      },
    );
  }

  function retry(exerciseId: string) {
    setResults((prev) => {
      const next = { ...prev };
      delete next[exerciseId];
      return next;
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex flex-col gap-3">
        <Link
          href={`/courses/${courseId}`}
          className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" aria-hidden />
          {courseTitle}
        </Link>
        <h1 className="text-2xl font-bold text-balance sm:text-3xl">{lesson.title}</h1>
        <div className="flex items-center gap-3">
          <ProgressBar
            value={percent}
            className="h-1.5"
            aria-label={t("player.stepOf", { current: index + 1, total: steps.length })}
          />
          <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
            {finished
              ? `${steps.length}/${steps.length}`
              : t("player.stepOf", { current: index + 1, total: steps.length })}
          </span>
        </div>
      </header>

      {/* Guests read the cards; exercises are checked on the server, so they need an account. */}
      {needsLogin && !finished && step?.type !== "exercise" && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card p-4 text-sm">
          <span>{t("player.loginToSave")}</span>
          <Button asChild size="sm">
            <Link href="/login">{t("player.login")}</Link>
          </Button>
        </div>
      )}

      {finished ? (
        <Completion
          detail={detail}
          pending={complete.isPending}
          failed={complete.isError}
          onRetry={() => complete.mutate()}
          score={complete.data ?? null}
          loggedIn={loggedIn}
        />
      ) : step?.type === "exercise" && needsLogin ? (
        <LoginGate />
      ) : step ? (
        <StepView
          key={step.id}
          step={step}
          result={step.type === "exercise" ? (results[step.id] ?? null) : null}
          submitting={check.isPending}
          onSubmit={submit}
          onRetry={retry}
          onNext={next}
        />
      ) : null}
    </div>
  );
}

function StepView({
  step,
  result,
  submitting,
  onSubmit,
  onRetry,
  onNext,
}: {
  step: LessonStep;
  result: AnswerResult | null;
  submitting: boolean;
  onSubmit: (exerciseId: string, answer: AnswerInput) => void;
  onRetry: (exerciseId: string) => void;
  onNext: () => void;
}) {
  if (step.type === "card") {
    return (
      <article className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 rounded-xl border bg-card p-6">
          <h2 className="text-xl font-bold">{step.title}</h2>
          <div className="flex flex-col gap-3 leading-relaxed [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5">
            <ReactMarkdown>{step.body}</ReactMarkdown>
          </div>
        </div>
        <Button className="w-fit self-end" onClick={onNext}>
          {t("player.continue")}
        </Button>
      </article>
    );
  }

  const { exercise } = step;
  const common = { result, submitting, onRetry: () => onRetry(exercise.id), onNext };
  switch (exercise.kind) {
    case "single":
      return (
        <QuestionSingle
          {...common}
          exercise={exercise}
          onSubmit={(optionIds) => onSubmit(exercise.id, { optionIds })}
        />
      );
    case "multi":
      return (
        <QuestionMulti
          {...common}
          exercise={exercise}
          onSubmit={(optionIds) => onSubmit(exercise.id, { optionIds })}
        />
      );
    case "fill_blank":
      return (
        <QuestionFillBlank
          {...common}
          exercise={exercise}
          onSubmit={(optionIds) => onSubmit(exercise.id, { optionIds })}
        />
      );
    case "true_false":
      return (
        <QuestionTrueFalse
          {...common}
          exercise={exercise}
          onSubmit={(cardAnswers) => onSubmit(exercise.id, { cardAnswers })}
        />
      );
    default:
      return null;
  }
}

function Completion({
  detail,
  pending,
  failed,
  onRetry,
  score,
  loggedIn,
}: {
  detail: LessonDetail;
  pending: boolean;
  failed: boolean;
  onRetry: () => void;
  score: { correctFirstTry: number; total: number } | null;
  loggedIn: boolean;
}) {
  return (
    <section className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6">
      <PartyPopperIcon className="size-8 text-primary" aria-hidden />
      <h2 className="text-2xl font-bold">{t("player.completeTitle")}</h2>
      {loggedIn &&
        (failed ? (
          <div className="flex flex-wrap items-center gap-3" role="alert">
            <p className="text-muted-foreground">{t("player.saveFailed")}</p>
            <Button size="sm" variant="outline" onClick={onRetry}>
              {t("common.retry")}
            </Button>
          </div>
        ) : (
          <p className="text-muted-foreground tabular-nums" aria-live="polite">
            {pending || !score
              ? t("player.saving")
              : t("player.completeScore", { correct: score.correctFirstTry, total: score.total })}
          </p>
        ))}
      <div className="flex flex-wrap gap-2">
        {detail.nextLessonId && (
          <Button asChild>
            <Link href={`/lessons/${detail.nextLessonId}`}>{t("player.nextLesson")}</Link>
          </Button>
        )}
        <Button asChild variant="outline">
          <Link href={`/courses/${detail.courseId}`}>{t("player.backToCourse")}</Link>
        </Button>
      </div>
    </section>
  );
}

/** Shown instead of an exercise to a guest: answers are checked and saved on the server. */
function LoginGate() {
  return (
    <section className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6">
      <h2 className="text-xl font-bold">{t("player.loginGateTitle")}</h2>
      <p className="text-muted-foreground">{t("player.loginToSave")}</p>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href="/register">{t("player.signUp")}</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">{t("player.login")}</Link>
        </Button>
      </div>
    </section>
  );
}
