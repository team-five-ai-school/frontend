"use client";

import { CircleCheckIcon, CircleDotIcon, CornerDownRightIcon, RotateCcwIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import type { Verdict } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const config: Record<Verdict, { title: string; body: string; icon: typeof CircleCheckIcon; tone: string }> = {
  correct: {
    title: t("exercise.correct"),
    body: t("exercise.correctBody"),
    icon: CircleCheckIcon,
    tone: "text-success-strong",
  },
  incorrect: {
    title: t("exercise.incorrect"),
    body: t("exercise.incorrectBody"),
    icon: CornerDownRightIcon,
    tone: "highlight",
  },
  partial: {
    title: t("exercise.partial"),
    body: t("exercise.partialBody"),
    icon: CircleDotIcon,
    tone: "highlight",
  },
};

/**
 * Result of a checked answer. A wrong answer is not a red alarm: it says the mistake already went
 * to the Mentor and offers to look at it together. `ref` marks the element the mistake "flies" from.
 */
export function AnswerFeedback({
  verdict,
  feedback,
  sentToMentor = false,
  final = false,
  onOpenMentor,
  onRetry,
  onNext,
  nextLabel,
  ref,
  className,
}: {
  verdict: Verdict;
  feedback?: string;
  sentToMentor?: boolean;
  /** The answer is revealed (2nd+ attempt): offer Next instead of Try again. */
  final?: boolean;
  onOpenMentor?: () => void;
  onRetry?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: string;
}) {
  const { title, body, icon: Icon, tone } = config[verdict];
  const local = useRef<HTMLDivElement>(null);

  // The result often renders below the fold on small screens: bring it into view once.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    local.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, []);

  return (
    <div
      ref={(node) => {
        local.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      role="status"
      className={cn(
        "flex animate-in flex-col gap-3 rounded-lg border bg-card p-4 duration-(--duration-base) fade-in-0",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="font-bold">
            <span className={tone}>{title}</span>
          </p>
          <p className="text-foreground">{feedback ?? body}</p>
          {sentToMentor && <p className="text-sm text-muted-foreground">{t("exercise.sentToMentor")}</p>}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 pl-8">
        {verdict !== "correct" && onOpenMentor && (
          <Button onClick={onOpenMentor}>{t("exercise.openMentor")}</Button>
        )}
        {verdict !== "correct" && !final && onRetry && (
          <Button variant="outline" onClick={onRetry}>
            <RotateCcwIcon data-icon="inline-start" aria-hidden />
            {t("exercise.tryAgain")}
          </Button>
        )}
        {(verdict === "correct" || final) && onNext && (
          <Button onClick={onNext}>{nextLabel ?? t("exercise.next")}</Button>
        )}
      </div>
    </div>
  );
}
