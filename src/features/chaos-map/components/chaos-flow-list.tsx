import type { ChaosMapData } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { chaosIcon, formatHours, handlerLabel } from "../chaos-meta";
import type { ChaosMode } from "./chaos-map";

/**
 * Text alternative to <ChaosMap>: the same data as trays (one per flow).
 * What still needs the person is highlighted with the marker, exactly as on the map.
 */
export function ChaosFlowList({ data, mode }: { data: ChaosMapData; mode: ChaosMode }) {
  const ai = mode === "ai";
  // Tasks whose flow is not on the map (e.g. a skill with decisions only) are listed as the person's decisions.
  const flowIds = new Set(data.flows.map((f) => f.id));
  const orphans = data.tasks.filter((task) => !flowIds.has(task.flowId));
  return (
    <ul className="flex flex-col">
      {data.flows.map((flow) => {
        const Icon = chaosIcon[flow.chaosType];
        const tasks = data.tasks.filter((task) => task.flowId === flow.id);
        return (
          <li key={flow.id} className="flex flex-col gap-3 border-t border-input pt-3 pb-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <Icon className="size-4 shrink-0 translate-y-0.5 text-muted-foreground" aria-hidden />
              <h3 className="min-w-0 flex-1 font-medium">{flow.title}</h3>
              <span className="text-sm text-muted-foreground tabular-nums">
                {formatHours(ai ? flow.hoursWithAi : flow.hoursNow)} {t("hours.perWeek")}
              </span>
            </div>
            <ul className="flex flex-col gap-2 pl-7">
              {tasks.map((task) => {
                const handler = ai ? task.handler : "you";
                return (
                  <li key={task.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                    <span className={cn("min-w-0", handler === "ai" && "text-muted-foreground")}>
                      <span className={cn(handler !== "ai" && "highlight")}>{task.title}</span>
                    </span>
                    <span className="text-sm text-muted-foreground">{handlerLabel[handler]}</span>
                  </li>
                );
              })}
            </ul>
            {ai && (
              <div className="flex flex-col gap-0.5 pl-7 text-sm text-muted-foreground">
                <span>{t("chaosMap.flowAiShare", { percent: flow.aiSharePercent })}</span>
                {flow.lessonTitle && <span>{t("chaosMap.flowLesson", { title: flow.lessonTitle })}</span>}
              </div>
            )}
          </li>
        );
      })}
      {orphans.length > 0 && (
        <li className="flex flex-col gap-3 border-t border-input pt-3 pb-6">
          <h3 className="font-medium">{t("chaosMap.decisions")}</h3>
          <ul className="flex flex-col gap-2 pl-7">
            {orphans.map((task) => (
              <li key={task.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="highlight min-w-0">{task.title}</span>
                <span className="text-sm text-muted-foreground">
                  {formatHours(task.hoursPerWeek)} {t("hours.perWeek")}
                </span>
              </li>
            ))}
          </ul>
        </li>
      )}
    </ul>
  );
}
