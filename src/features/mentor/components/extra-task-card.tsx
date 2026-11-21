import { CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ExtraTask } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Extra practice from the Mentor: a tear-off sheet (dashed edge). One clear action. */
export function ExtraTaskCard({
  task,
  onStart,
  onSkip,
  className,
}: {
  task: ExtraTask;
  onStart?: () => void;
  onSkip?: () => void;
  className?: string;
}) {
  const done = task.status === "done";
  const skipped = task.status === "skipped";
  return (
    <section
      aria-label={t("mentor.extraTask.label")}
      className={cn(
        "flex flex-col gap-3 rounded-lg border-2 border-dashed border-input bg-card p-4",
        done && "border-solid border-border",
        className,
      )}
    >
      <p className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm text-muted-foreground">
        <span className={cn("font-medium", done && "text-success-strong")}>
          {done && <CheckIcon className="mr-1 inline size-4 -translate-y-px" aria-hidden />}
          {done ? t("mentor.extraTask.done") : t("mentor.extraTask.label")}
        </span>
        <span className="tabular-nums">
          {t("mentor.extraTask.minutes", { minutes: task.estimatedMinutes })}
        </span>
      </p>
      <div className="flex flex-col gap-1">
        <h4 className={cn("font-bold", done && "font-medium text-muted-foreground")}>{task.title}</h4>
        {!done && <p className="text-muted-foreground">{task.description}</p>}
      </div>
      {!done && (
        <div className="flex flex-wrap gap-2">
          <Button onClick={onStart}>{t("mentor.extraTask.start")}</Button>
          {!skipped && (
            <Button variant="ghost" onClick={onSkip}>
              {t("mentor.extraTask.skip")}
            </Button>
          )}
        </div>
      )}
    </section>
  );
}
