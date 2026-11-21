import type { Mistake } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { Marked } from "./mentor-message";

/**
 * Mistake review as a paper note: what went wrong, why, how to do it right.
 * No alarm colors: a mistake is part of learning. The fix is where the marker goes.
 */
export function MistakeCard({ mistake, className }: { mistake: Mistake; className?: string }) {
  const rows = [
    { label: t("mentor.mistake.what"), text: mistake.what },
    { label: t("mentor.mistake.why"), text: mistake.why },
    { label: t("mentor.mistake.how"), text: mistake.how, marked: true },
  ];
  return (
    <section
      aria-label={t("mentor.mistake.label")}
      className={cn("flex flex-col rounded-lg border bg-card px-4 pt-3 pb-1", className)}
    >
      <header className="flex flex-col pb-3">
        <p className="font-bold">{t("mentor.mistake.label")}</p>
        <p className="text-sm text-muted-foreground">
          {t("mentor.mistake.from", { title: mistake.exerciseTitle })}
        </p>
      </header>
      <dl className="flex flex-col">
        {rows.map(({ label, text, marked }) => (
          <div key={label} className="flex flex-col gap-0.5 border-t py-3">
            <dt className="text-sm text-muted-foreground">{label}</dt>
            <dd className="break-words">
              {marked && !text.includes("==") ? (
                <mark className="highlight bg-transparent">{text}</mark>
              ) : (
                <Marked text={text} />
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
