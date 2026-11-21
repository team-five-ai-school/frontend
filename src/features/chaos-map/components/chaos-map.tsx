"use client";

import { ListIcon, MapIcon } from "lucide-react";
import { useState } from "react";

import { SegmentedControl } from "@/components/segmented-control";
import { EmptyState } from "@/components/state-views";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { ChaosMapData } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { curve, jitter, layoutChaosMap, type Point } from "../chaos-layout";
import { formatHours } from "../chaos-meta";
import { ChaosFlowList } from "./chaos-flow-list";

export type ChaosMode = "now" | "ai";

type Vars = React.CSSProperties & Record<`--${string}`, string | number>;

/**
 * The person's weekly chaos. "Зараз": every task pulls at the person. "З AI": tasks sort into flows,
 * AI-handled work stays in its lane, only decisions reach the person.
 * Horizontal on wide containers, vertical on phones (container query, no JS measuring).
 * Has a text alternative (list of flows) one click away.
 */
export function ChaosMap({
  data,
  mode: modeProp,
  defaultMode = "now",
  onModeChange,
  showModeSwitch = true,
  className,
}: {
  data: ChaosMapData;
  mode?: ChaosMode;
  defaultMode?: ChaosMode;
  onModeChange?: (mode: ChaosMode) => void;
  /** Hide when the parent renders its own mode switch. The list toggle (text alternative) always stays. */
  showModeSwitch?: boolean;
  className?: string;
}) {
  const [innerMode, setInnerMode] = useState<ChaosMode>(defaultMode);
  const [view, setView] = useState<"map" | "list">("map");
  const mode = modeProp ?? innerMode;
  const setMode = (next: ChaosMode) => {
    setInnerMode(next);
    onModeChange?.(next);
  };

  if (data.tasks.length === 0) {
    return <EmptyState title={t("state.emptyTitle")} className={className} />;
  }

  const layout = layoutChaosMap(data);
  const ai = mode === "ai";
  const decisionsHours = data.tasks
    .filter((x) => x.handler === "you")
    .reduce((s, x) => s + x.hoursPerWeek, 0);
  const summary = ai
    ? t("chaosMap.summaryAi", { flows: data.flows.length, hours: formatHours(data.totals.hoursWithAi) })
    : t("chaosMap.summaryNow", { tasks: data.tasks.length, hours: formatHours(data.totals.hoursNow) });

  return (
    <div className={cn("@container flex flex-col gap-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {showModeSwitch ? (
          <SegmentedControl
            label={t("chaosMap.modeLabel")}
            value={mode}
            onValueChange={setMode}
            options={[
              { value: "now", label: t("chaosMap.now") },
              { value: "ai", label: t("chaosMap.withAi") },
            ]}
          />
        ) : (
          <span />
        )}
        <Button
          variant="ghost"
          onClick={() => setView(view === "map" ? "list" : "map")}
          aria-pressed={view === "list"}
        >
          {view === "map" ? (
            <ListIcon data-icon="inline-start" aria-hidden />
          ) : (
            <MapIcon data-icon="inline-start" aria-hidden />
          )}
          {view === "map" ? t("chaosMap.showList") : t("chaosMap.showMap")}
        </Button>
      </div>

      <p className="sr-only" aria-live="polite">
        {summary}
      </p>

      {view === "list" ? (
        <ChaosFlowList data={data} mode={mode} />
      ) : (
        <div
          role="img"
          aria-label={summary}
          data-mode={mode}
          style={{ "--chaos-h": `${layout.vHeight}px` } as Vars}
          className="relative h-(--chaos-h) w-full overflow-hidden rounded-2xl border squared shadow-paper @2xl:aspect-[16/11] @2xl:h-auto"
        >
          {/* Trays: one per flow, a row with a thin line on top (only in "З AI"). */}
          {layout.lanes.map((lane, i) => (
            <div
              key={lane.flow.id}
              aria-hidden
              style={
                {
                  "--top-v": `${lane.v.top}px`,
                  "--h-v": `${lane.v.height}px`,
                  "--top-h": `${lane.h.top}%`,
                  "--h-h": `${lane.h.height}%`,
                  "--left-h": `${lane.h.left}%`,
                  "--w-h": `${lane.h.width}%`,
                  transitionDelay: ai ? `${200 + i * 60}ms` : "0ms",
                } as Vars
              }
              className={cn(
                "absolute inset-x-3 top-(--top-v) h-(--h-v) border-t border-input transition-opacity duration-(--duration-slow) ease-standard",
                "@2xl:inset-x-auto @2xl:top-(--top-h) @2xl:left-(--left-h) @2xl:h-(--h-h) @2xl:w-(--w-h)",
                ai ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Tray label: flow on the left, how much of it AI takes on the right. */}
              <span className="absolute inset-x-0 top-2 flex items-baseline justify-between gap-3 text-sm @2xl:top-1">
                <span className="truncate font-medium text-muted-foreground">{lane.flow.title}</span>
                <span className="shrink-0 font-medium whitespace-nowrap tabular-nums">
                  {t("chaosMap.flowAiShare", { percent: lane.flow.aiSharePercent })}
                </span>
              </span>
            </div>
          ))}

          {/* Connectors: vertical and horizontal variants, "now" and "ai" layers cross-fade. */}
          <Connectors orientation="v" layout={layout} ai={ai} />
          <Connectors orientation="h" layout={layout} ai={ai} />

          {layout.decisionsLabel && (
            <span
              aria-hidden
              style={
                {
                  "--x-v": `${layout.decisionsLabel.v.x}%`,
                  "--y-v": `${layout.decisionsLabel.v.y}px`,
                  "--x-h": `${layout.decisionsLabel.h.x}%`,
                  "--y-h": `${layout.decisionsLabel.h.y}%`,
                } as Vars
              }
              className={cn(
                "absolute top-(--y-v) left-(--x-v) -translate-y-1/2 text-sm font-medium text-foreground",
                "@2xl:top-(--y-h) @2xl:left-(--x-h) @2xl:-translate-x-1/2",
                "transition-opacity delay-500 duration-(--duration-slow)",
                ai ? "opacity-100" : "opacity-0 delay-0",
              )}
            >
              {t("chaosMap.decisions")}
            </span>
          )}

          {/* Task chips. */}
          {layout.tasks.map(({ task, h, v }, i) => {
            const pos = ai ? { h: h.ai, v: v.ai } : { h: h.now, v: v.now };
            // Marker stays only on what still needs the person; AI-handled strips go quiet.
            const marked = !ai || task.handler !== "ai";
            return (
              <div
                key={task.id}
                aria-hidden
                style={
                  {
                    "--x-v": `${pos.v.x}%`,
                    "--y-v": `${pos.v.y}px`,
                    "--r-v": `${pos.v.rotate}deg`,
                    "--x-h": `${pos.h.x}%`,
                    "--y-h": `${pos.h.y}%`,
                    "--r-h": `${pos.h.rotate}deg`,
                    transitionDelay: `${i * 35}ms`,
                  } as Vars
                }
                className={cn(
                  "absolute top-(--y-v) left-(--x-v) flex w-[44%] -translate-x-1/2 -translate-y-1/2 rotate-(--r-v) flex-col gap-0.5 rounded-xs border px-2.5 py-1.5",
                  "@2xl:top-(--y-h) @2xl:left-(--x-h) @2xl:w-[16.5%] @2xl:rotate-(--r-h)",
                  "transition-[left,top,rotate,color,box-shadow,background-color] duration-(--duration-chaos) ease-standard",
                  // Slips lie loose on the paper in chaos; AI-handled ones get pencil-hatched once sorted.
                  marked
                    ? "bg-card text-foreground shadow-lifted"
                    : "border-ai/40 hatch text-ai-strong shadow-none",
                )}
              >
                <span className="line-clamp-2 text-sm leading-snug font-medium">
                  <span
                    className={cn(
                      "highlight transition-[background-size,text-decoration-color] duration-(--duration-slow) ease-standard",
                      marked ? "delay-(--duration-chaos)" : "highlight-off",
                    )}
                  >
                    {task.title}
                  </span>
                </span>
                <span className="text-sm leading-snug text-muted-foreground tabular-nums">
                  {ai && task.handler === "ai"
                    ? t("chaosMap.handledByAi")
                    : `${formatHours(task.hoursPerWeek)} ${t("common.hoursShort")}`}
                </span>
              </div>
            );
          })}

          {/* The person. */}
          <div
            aria-hidden
            style={
              {
                "--x-v": `${layout.person.v.x}%`,
                "--y-v": `${layout.person.v.y}px`,
                "--x-h": `${layout.person.h.x}%`,
                "--y-h": `${layout.person.h.y}%`,
              } as Vars
            }
            className="absolute top-(--y-v) left-(--x-v) flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 @2xl:top-(--y-h) @2xl:left-(--x-h)"
          >
            <span
              className={cn(
                "flex size-16 items-center justify-center rounded-full bg-mentor text-xl font-bold text-marker ring-4 ring-marker",
              )}
            >
              {t("chaosMap.you")}
            </span>
            <span className="max-w-24 rounded-xs bg-card px-1.5 text-center text-sm leading-tight font-medium tabular-nums">
              {formatHours(ai ? decisionsHours : data.totals.hoursNow)} {t("hours.perWeek")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Connectors({
  orientation,
  layout,
  ai,
}: {
  orientation: "h" | "v";
  layout: ReturnType<typeof layoutChaosMap>;
  ai: boolean;
}) {
  const person = layout.person[orientation];
  const viewH = orientation === "h" ? 100 : layout.vHeight;
  const to: Point =
    orientation === "h" ? { x: person.x - 3, y: person.y } : { x: person.x, y: person.y - 28 };

  return (
    <svg
      aria-hidden
      viewBox={`0 0 100 ${viewH}`}
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-0 size-full",
        orientation === "h" ? "hidden @2xl:block" : "@2xl:hidden",
      )}
    >
      <g
        className={cn(
          "fill-none stroke-muted-foreground transition-opacity duration-(--duration-slow)",
          ai ? "opacity-0" : "opacity-45",
        )}
      >
        {layout.tasks.map(({ task, ...g }) => (
          <path
            key={task.id}
            d={curve(g[orientation].now, to, jitter(`${task.id}b`))}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      <g
        className={cn(
          "fill-none stroke-foreground transition-opacity duration-(--duration-slow)",
          ai ? "opacity-80 delay-(--duration-chaos)" : "opacity-0",
        )}
      >
        {layout.tasks
          .filter((g) => g.isDecision)
          .map(({ task, ...g }) => (
            <path
              key={task.id}
              d={curve(g[orientation].ai, to, 0.15)}
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
          ))}
      </g>
    </svg>
  );
}

export function ChaosMapSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("@container flex flex-col gap-4", className)}>
      <Skeleton className="h-13 w-48 rounded-xl" />
      <Skeleton className="h-[34rem] w-full rounded-2xl @2xl:aspect-[16/10] @2xl:h-auto" />
    </div>
  );
}
