import { CheckIcon } from "lucide-react";

import type { LessonReview } from "@/lib/contracts";
import { t } from "@/lib/i18n";

const skillName = (slug: string) => slug.replace(/-/g, " ");

/** The end-of-lesson review: summary, next steps tied to the learner's mistakes, and first-try results by skill. */
export function LessonReviewCard({ review }: { review: LessonReview }) {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="max-w-prose text-pretty">{review.summary}</p>

      {review.recommendations.length > 0 && (
        <section className="flex flex-col gap-2" aria-labelledby="review-next-steps">
          <h3 id="review-next-steps" className="font-bold">
            {t("player.nextSteps")}
          </h3>
          <ol className="flex list-decimal flex-col gap-1.5 pl-5">
            {review.recommendations.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </section>
      )}

      {review.skills.length > 0 && (
        <section className="flex flex-col gap-2" aria-labelledby="review-skills">
          <h3 id="review-skills" className="font-bold">
            {t("player.skillsTitle")}
          </h3>
          <ul className="flex flex-col divide-y rounded-lg border">
            {review.skills.map((s) => (
              <li key={s.skill} className="flex items-center justify-between gap-3 px-3 py-2">
                <span className="min-w-0 first-letter:uppercase">{skillName(s.skill)}</span>
                <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
                  {s.correct === s.total && <CheckIcon className="size-4 text-success-strong" aria-hidden />}
                  {s.correct}/{s.total}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
