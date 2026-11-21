"use client";

import { FlameIcon } from "lucide-react";
import { toast } from "sonner";

import { t } from "@/lib/i18n";

/** Quiet milestone notification. No confetti: a small card in the toast stack. */
export function MilestoneToastContent({ days, message }: { days: number; message?: string }) {
  return (
    <div
      role="status"
      className="flex w-full max-w-sm items-center gap-3 rounded-xl border bg-raised p-4 text-foreground shadow-raised sm:w-[22rem]"
    >
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-streak-soft text-streak-strong">
        <FlameIcon className="size-5" aria-hidden />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-medium">{message ?? t("streak.milestone", { count: days })}</span>
        <span className="text-sm text-muted-foreground">{t("streak.best", { count: days })}</span>
      </span>
    </div>
  );
}

export function showMilestoneToast(days: number, message?: string) {
  toast.custom(() => <MilestoneToastContent days={days} message={message} />, { duration: 5000 });
}
