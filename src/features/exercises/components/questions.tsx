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
  /** Passed to AnswerFeedback: the element the mistake flies from. */
  feedbackRef?: React.Ref<HTMLDivElement>;
  className?: string;
};

type SingleExercise = Extract<Exercise, { kind: "single" }>;
type MultiExercise = Extract<Exercise, { kind: "multi" }>;
type FreeTextExercise = Extract<Exercise, { kind: "free_text" }>;
type FileExercise = Extract<Exercise, { kind: "file_task" }>;

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
        <h3 className="text-lg font-bold">{exercise.title}</h3>
        <p className="text-muted-foreground">{exercise.prompt}</p>
      </header>
      {children}
      {exercise.hint && !result && <Hint text={exercise.hint} />}
      {result ? (
        <AnswerFeedback
          ref={feedbackRef}
          verdict={result.verdict}
          feedback={result.feedback}
          sentToMentor={Boolean(result.mistakeId)}
          onOpenMentor={onOpenMentor}
          onRetry={onRetry}
          onNext={onNext}
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
