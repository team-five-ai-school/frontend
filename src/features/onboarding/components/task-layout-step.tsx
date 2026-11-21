"use client";

import { useObject } from "@ai-sdk/react";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { handlerLabel, formatHours } from "@/features/chaos-map/chaos-meta";
import { DescribedTasks } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { describeUrl } from "../onboarding-api";
import { handlerFor } from "../to-chaos-map";

/**
 * «AI розкладає твій день»: streams tasks from the free text as the backend parses them (useObject over
 * a growing JSON document). If the model fails, the backend streams the role template instead; if the
 * request itself fails, we continue anyway: complete() falls back to the template. No failure copy.
 */
export function TaskLayoutStep({
  sessionId,
  freeText,
  onDone,
  className,
}: {
  sessionId: string;
  freeText: string;
  onDone: () => void;
  className?: string;
}) {
  const { object, submit, isLoading, error } = useObject({
    api: describeUrl(sessionId),
    schema: DescribedTasks,
  });

  // Submit once per mount (Strict Mode runs effects twice in development).
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return;
    sent.current = true;
    submit({ freeText });
  }, [submit, freeText]);

  const tasks = (object?.tasks ?? []).filter((task) => task?.title);
  const finished = !isLoading && (object?.source !== undefined || error !== undefined);

  return (
    <section className={cn("flex flex-col gap-6", className)} aria-busy={isLoading}>
      <div className="flex max-w-prose flex-col gap-2">
        <h2 className="text-2xl font-bold text-balance">{t("onboarding.layoutTitle")}</h2>
        <p className="text-muted-foreground">{t("onboarding.layoutLead")}</p>
      </div>

      <ol className="flex flex-col" aria-live="polite">
        {tasks.map((task, i) => (
          <li
            key={`${i}-${task?.title}`}
            className="flex animate-in flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-input py-3 duration-200 fade-in slide-in-from-bottom-1"
          >
            <span className="min-w-0 font-medium break-words">{task?.title}</span>
            <span className="flex gap-3 text-sm text-muted-foreground tabular-nums">
              {task?.hoursPerWeek !== undefined && (
                <span>{t("onboarding.layoutTaskHours", { hours: formatHours(task.hoursPerWeek) })}</span>
              )}
              {task?.aiCapability && <span>{handlerLabel[handlerFor[task.aiCapability]]}</span>}
            </span>
          </li>
        ))}
        {isLoading &&
          Array.from({ length: Math.max(1, 3 - tasks.length) }, (_, i) => (
            <li
              key={`skeleton-${i}`}
              className="flex items-center justify-between gap-4 border-t border-input py-3"
            >
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-24" />
            </li>
          ))}
      </ol>

      <div>
        <Button
          size="lg"
          onClick={onDone}
          disabled={!finished}
          loading={!finished}
          className="w-full sm:w-auto"
        >
          {t("onboarding.layoutContinue")}
        </Button>
      </div>
    </section>
  );
}
