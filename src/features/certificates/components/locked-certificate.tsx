import { LockIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Progress } from "@/components/ui/progress";
import { t } from "@/lib/i18n";

/**
 * Placeholder for a certificate that is not earned yet: the real sheet, blurred and greyed out (so the
 * learner sees what they will get), with a progress card on top.
 */
export function LockedCertificate({
  preview,
  done,
  total,
  progressLabel,
}: {
  preview: ReactNode;
  done: number;
  total: number;
  progressLabel: string;
}) {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none blur-[3px] saturate-0 select-none">
        {preview}
      </div>
      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="flex w-full max-w-72 flex-col gap-3 rounded-lg border bg-card p-5 shadow-lifted">
          <p className="flex items-center gap-2 font-semibold">
            <LockIcon className="size-4" aria-hidden />
            {t("certificate.lockedTitle")}
          </p>
          <Progress value={total ? (done / total) * 100 : 0} aria-label={progressLabel} />
          <p className="text-sm text-muted-foreground">{progressLabel}</p>
        </div>
      </div>
    </div>
  );
}
