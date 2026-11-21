"use client";

import { ArrowLeftIcon } from "lucide-react";

import { ChoiceCards } from "@/components/choice-cards";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { QuizQuestion } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** One question of the «Скільки твоєї роботи вже вміє AI?» quiz, with step progress. */
export function QuizStep({
  question,
  step,
  total,
  value,
  onChange,
  onNext,
  onBack,
  className,
}: {
  question: QuizQuestion;
  /** 1-based. */
  step: number;
  total: number;
  value: string[];
  onChange: (optionIds: string[]) => void;
  onNext: () => void;
  onBack?: () => void;
  className?: string;
}) {
  const stepLabel = t("onboarding.stepOf", { current: step, total });
  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (value.length) onNext();
      }}
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground tabular-nums">{stepLabel}</p>
        <Progress value={(step / total) * 100} aria-label={stepLabel} />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{question.text}</h2>
        {(question.hint || question.kind === "multi") && (
          <p className="text-muted-foreground">{question.hint ?? t("onboarding.multiHint")}</p>
        )}
      </div>
      <ChoiceCards
        name={question.id}
        type={question.kind}
        legend={question.text}
        hideLegend
        options={question.options}
        value={value}
        onChange={onChange}
      />
      <div className="flex items-center justify-between gap-3">
        {onBack ? (
          <Button type="button" variant="ghost" onClick={onBack}>
            <ArrowLeftIcon data-icon="inline-start" aria-hidden />
            {t("common.back")}
          </Button>
        ) : (
          <span />
        )}
        <Button type="submit" size="lg" disabled={value.length === 0}>
          {t("common.next")}
        </Button>
      </div>
    </form>
  );
}
