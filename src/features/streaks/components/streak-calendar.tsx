import { CheckIcon, SnowflakeIcon } from "lucide-react";

import type { StreakDay } from "@/lib/contracts";
import { formatDate, t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

const stateLabel: Record<StreakDay["state"], string> = {
  active: t("streak.active"),
  inactive: t("streak.inactive"),
  frozen: t("streak.frozen"),
  today: t("streak.today"),
  future: "",
};

/** 4 weeks × 7 days. Each state has its own shape/icon, not only color. */
export function StreakCalendar({
  days,
  best,
  className,
}: {
  /** 28 days, oldest first, starting on a Monday (see Streak contract). */
  days: StreakDay[];
  best: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-medium">{t("streak.calendarTitle")}</h3>
        <span className="text-sm text-muted-foreground">{t("streak.best", { count: best })}</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5" aria-hidden>
        {weekdays.map((d) => (
          <span key={d} className="text-center text-sm text-subtle-foreground">
            {d}
          </span>
        ))}
      </div>
      <ol className="grid grid-cols-7 gap-1.5">
        {days.map((day) => (
          <li
            key={day.date}
            aria-label={
              day.state === "future"
                ? undefined
                : `${formatDate(day.date, { day: "numeric", month: "long" })}: ${stateLabel[day.state]}`
            }
            aria-hidden={day.state === "future" || undefined}
            className={cn(
              "flex aspect-square max-h-11 items-center justify-center rounded-md text-sm",
              day.state === "active" && "bg-streak text-primary-foreground",
              day.state === "inactive" && "bg-muted",
              day.state === "frozen" && "border border-dashed border-input bg-card text-muted-foreground",
              day.state === "today" && "border-2 border-foreground",
              day.state === "future" && "border border-dashed",
            )}
          >
            {day.state === "active" && <CheckIcon className="size-4" aria-hidden />}
            {day.state === "frozen" && <SnowflakeIcon className="size-4" aria-hidden />}
          </li>
        ))}
      </ol>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground" aria-hidden>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-streak" /> {t("streak.active")}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm border border-dashed border-input" /> {t("streak.frozen")}
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3 rounded-sm bg-muted" /> {t("streak.inactive")}
        </li>
      </ul>
    </div>
  );
}
