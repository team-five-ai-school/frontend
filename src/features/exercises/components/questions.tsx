"use client";

import { useState } from "react";

import { ChoiceCards, type ChoiceMark } from "@/components/choice-cards";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { FileDropzone } from "@/features/onboarding/components/file-dropzone";
import type { AnswerResult, Exercise } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { AnswerFeedback } from "./answer-feedback";
import { Hint } from "./hint";

/**
 * Exercise components share one contract:
 *   exercise  — from GET /lessons/:id/exercises
 *   result    — AnswerResult from POST /exercises/:id/answers (null before checking)
 *   onSubmit  — the parent sends the answer; a wrong answer creates a Mistake on the backend
 *               and the parent calls mentor.reportMistake(...) (see docs/api-contracts.md → flow)
 */
type Common = {
  result: AnswerResult | null;
  submitting?: boolean;
  onRetry: () => void;
  onOpenMentor?: () => void;
  onNext?: () => void;
  /** Label of the «next» button (e.g. «Finish lesson» on the last step). */
  nextLabel?: string;
  /** Passed to AnswerFeedback: the element the mistake flies from. */
  feedbackRef?: React.Ref<HTMLDivElement>;
  className?: string;
};

type SingleExercise = Extract<Exercise, { kind: "single" }>;
type MultiExercise = Extract<Exercise, { kind: "multi" }>;
type FreeTextExercise = Extract<Exercise, { kind: "free_text" }>;
type FileExercise = Extract<Exercise, { kind: "file_task" }>;
type FillBlankExercise = Extract<Exercise, { kind: "fill_blank" }>;
type TrueFalseExercise = Extract<Exercise, { kind: "true_false" }>;

function ExerciseFrame({
  exercise,
  children,
  result,
  submitting,
  canSubmit,
  onSubmit,
  onRetry,
  onOpenMentor,
  onNext,
  nextLabel,
  feedbackRef,
  className,
}: Common & {
  exercise: Exercise;
  children: React.ReactNode;
  canSubmit: boolean;
  onSubmit: () => void;
}) {
  return (
    <form
      className={cn("flex flex-col gap-5", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit && !result) onSubmit();
      }}
    >
      <header className="flex flex-col gap-2">
        {exercise.title ? (
          <>
            <h3 className="text-lg font-bold">{exercise.title}</h3>
            <p className="text-muted-foreground">{exercise.prompt}</p>
          </>
        ) : (
          // Course content has no separate title: the question itself is the heading.
          <h3 className="text-lg font-bold text-balance">{exercise.prompt}</h3>
        )}
      </header>
      {children}
      {exercise.hint && !result && <Hint text={exercise.hint} />}
      {result ? (
        <AnswerFeedback
          ref={feedbackRef}
          verdict={result.verdict}
          feedback={result.feedback}
          sentToMentor={Boolean(result.mistakeId && onOpenMentor)}
          final={result.final}
          onOpenMentor={onOpenMentor}
          onRetry={onRetry}
          onNext={onNext}
          nextLabel={nextLabel}
        />
      ) : (
        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit}
          loading={submitting}
          className="w-full sm:w-auto sm:self-start"
        >
          {t("exercise.check")}
        </Button>
      )}
    </form>
  );
}

function marksFor(result: AnswerResult | null, selected: string[]) {
  if (!result?.correctOptionIds) return undefined;
  const marks: Record<string, ChoiceMark> = {};
  for (const id of selected) marks[id] = result.correctOptionIds.includes(id) ? "correct" : "incorrect";
  for (const id of result.correctOptionIds) if (!selected.includes(id)) marks[id] = "missed";
  return marks;
}

export function QuestionSingle({
  exercise,
  onSubmit,
  ...common
}: Common & { exercise: SingleExercise; onSubmit: (optionIds: string[]) => void }) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ExerciseFrame
      {...common}
      exercise={exercise}
      canSubmit={value.length === 1}
      onSubmit={() => onSubmit(value)}
      onRetry={() => {
        setValue([]);
        common.onRetry();
      }}
    >
      <ChoiceCards
        name={exercise.id}
        type="single"
        legend={t("exercise.chooseOne")}
        options={exercise.options}
        value={value}
        onChange={setValue}
        marks={marksFor(common.result, value)}
        disabled={Boolean(common.result) || common.submitting}
      />
    </ExerciseFrame>
  );
}

export function QuestionMulti({
  exercise,
  onSubmit,
  ...common
}: Common & { exercise: MultiExercise; onSubmit: (optionIds: string[]) => void }) {
  const [value, setValue] = useState<string[]>([]);
  return (
    <ExerciseFrame
      {...common}
      exercise={exercise}
      canSubmit={value.length > 0}
      onSubmit={() => onSubmit(value)}
      onRetry={() => {
        setValue([]);
        common.onRetry();
      }}
    >
      <ChoiceCards
        name={exercise.id}
        type="multi"
        legend={t("exercise.chooseMany")}
        options={exercise.options}
        value={value}
        onChange={setValue}
        marks={marksFor(common.result, value)}
        disabled={Boolean(common.result) || common.submitting}
      />
    </ExerciseFrame>
  );
}

export function QuestionFreeText({
  exercise,
  onSubmit,
  ...common
}: Common & { exercise: FreeTextExercise; onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const id = `${exercise.id}-text`;
  return (
    <ExerciseFrame
      {...common}
      exercise={exercise}
      canSubmit={text.trim().length > 0}
      onSubmit={() => onSubmit(text)}
      onRetry={common.onRetry}
    >
      <Field>
        <FieldLabel htmlFor={id} className="sr-only">
          {exercise.title}
        </FieldLabel>
        <Textarea
          id={id}
          value={text}
          maxLength={exercise.maxLength}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("exercise.freeTextPlaceholder")}
          readOnly={Boolean(common.result)}
          className="min-h-32"
        />
        <FieldDescription className="text-right tabular-nums">
          {t("exercise.charCount", { count: text.length, max: exercise.maxLength })}
        </FieldDescription>
      </Field>
    </ExerciseFrame>
  );
}

export function TaskWithFile({
  exercise,
  onSubmit,
  ...common
}: Common & { exercise: FileExercise; onSubmit: (file: File) => void }) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <ExerciseFrame
      {...common}
      exercise={exercise}
      canSubmit={Boolean(file)}
      onSubmit={() => file && onSubmit(file)}
      onRetry={common.onRetry}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{t("exercise.uploadOwn")}</p>
        <FileDropzone
          value={file}
          onChange={setFile}
          accept={exercise.accept}
          disabled={Boolean(common.result)}
        />
      </div>
    </ExerciseFrame>
  );
}

/** Pick the phrase that fills the `___` gap. Same option-id answer as single choice. */
export function QuestionFillBlank({
  exercise,
  onSubmit,
  ...common
}: Common & { exercise: FillBlankExercise; onSubmit: (optionIds: string[]) => void }) {
  const [value, setValue] = useState<string[]>([]);
  const [before, after = ""] = exercise.template.split("___");
  const chosen = exercise.options.find((o) => o.id === value[0])?.label;
  return (
    <ExerciseFrame
      {...common}
      exercise={exercise}
      canSubmit={value.length === 1}
      onSubmit={() => onSubmit(value)}
      onRetry={() => {
        setValue([]);
        common.onRetry();
      }}
    >
      <p className="rounded-lg border bg-card p-4 font-mono text-sm leading-relaxed">
        {before}
        <span
          className={cn(
            "mx-1 inline-block min-w-24 rounded border-b-2 border-dashed px-1.5 font-sans",
            chosen ? "border-primary bg-primary/10" : "border-muted-foreground/50 text-muted-foreground",
          )}
        >
          {chosen ?? "\u00a0___\u00a0"}
        </span>
        {after}
      </p>
      <ChoiceCards
        name={exercise.id}
        type="single"
        legend={t("player.fillTheGap")}
        options={exercise.options}
        value={value}
        onChange={setValue}
        marks={marksFor(common.result, value)}
        disabled={Boolean(common.result) || common.submitting}
      />
    </ExerciseFrame>
  );
}

/**
 * A deck of statements: answer each with True/False (buttons, arrow keys or a horizontal swipe),
 * then review and check all together. Per-card results arrive only when the result is final.
 */
export function QuestionTrueFalse({
  exercise,
  onSubmit,
  ...common
}: Common & { exercise: TrueFalseExercise; onSubmit: (cardAnswers: boolean[]) => void }) {
  const total = exercise.cards.length;
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => exercise.cards.map(() => null));
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState<number | null>(null);
  const reviewing = index >= total;
  const locked = Boolean(common.result) || common.submitting;

  function answer(value: boolean) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? value : a)));
    setIndex((i) => i + 1);
    setDragX(null);
  }

  const card = exercise.cards[index];
  const results = common.result?.cardResults ?? null;
  const explanations = common.result?.cardExplanations ?? null;

  return (
    <ExerciseFrame
      {...common}
      // Per-card explanations are shown under each statement; don't repeat them in the summary.
      result={
        common.result && explanations
          ? { ...common.result, feedback: t("player.cardsExplained") }
          : common.result
      }
      exercise={exercise}
      canSubmit={answers.every((a) => a !== null)}
      onSubmit={() => onSubmit(answers as boolean[])}
      onRetry={() => {
        setAnswers(exercise.cards.map(() => null));
        setIndex(0);
        common.onRetry();
      }}
    >
      {!reviewing && card ? (
        // Arrow keys work while focus is anywhere in the deck (card or True/False buttons).
        <div
          className="flex flex-col gap-3"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") answer(true);
            if (e.key === "ArrowLeft") answer(false);
          }}
        >
          <p className="text-sm text-muted-foreground tabular-nums">
            {t("player.cardOf", { current: index + 1, total })}
          </p>
          <div
            role="group"
            aria-label={t("player.swipeHint")}
            tabIndex={0}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              setDragX(0);
              (e.currentTarget as HTMLElement).dataset.startX = String(e.clientX);
            }}
            onPointerMove={(e) => {
              const start = Number((e.currentTarget as HTMLElement).dataset.startX);
              if (dragX !== null) setDragX(e.clientX - start);
            }}
            onPointerUp={() => {
              if (dragX !== null && Math.abs(dragX) > 80) answer(dragX > 0);
              else setDragX(null);
            }}
            style={{ transform: dragX ? `translateX(${dragX}px) rotate(${dragX / 30}deg)` : undefined }}
            className="flex min-h-36 cursor-grab touch-pan-y items-center justify-center rounded-xl border bg-card p-6 text-center text-lg font-medium shadow-sm transition-transform select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:cursor-grabbing motion-reduce:transition-none"
          >
            {card.statement}
          </div>
          <p className="text-xs text-muted-foreground">{t("player.swipeHint")}</p>
          <div className="grid grid-cols-2 gap-2">
            <Button type="button" variant="outline" size="lg" onClick={() => answer(false)}>
              {t("player.falseLabel")}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => answer(true)}>
              {t("player.trueLabel")}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {!locked && <p className="text-sm text-muted-foreground">{t("player.reviewAnswers")}</p>}
          <ul className="flex flex-col gap-2">
            {exercise.cards.map((c, i) => {
              const ok = results?.[i];
              return (
                <li
                  key={c.id}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg border p-3",
                    ok === true && "border-success-strong/50",
                    ok === false && "border-destructive/50",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="min-w-0">{c.statement}</span>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={locked}
                      aria-label={`${t("player.yourAnswer")}: ${answers[i] ? t("player.trueLabel") : t("player.falseLabel")}`}
                      onClick={() => setAnswers((prev) => prev.map((a, j) => (j === i ? !a : a)))}
                    >
                      {answers[i] ? t("player.trueLabel") : t("player.falseLabel")}
                    </Button>
                  </div>
                  {explanations?.[i] && <p className="text-sm text-muted-foreground">{explanations[i]}</p>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </ExerciseFrame>
  );
}
