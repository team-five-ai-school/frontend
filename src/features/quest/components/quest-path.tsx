"use client";

import { ArrowRightIcon, CheckIcon, ChevronDownIcon, HourglassIcon, LockIcon, PlayIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatHours } from "@/features/chaos-map/chaos-meta";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import type { QuestStep } from "../quest";

/**
 * The route as a trail of checkpoints. A finished stretch is drawn solid, the rest dashed.
 * Every checkpoint opens in place to show why it matters, what it is worth and the action; the current one is open.
 */
export function QuestPath({ steps, currentId }: { steps: QuestStep[]; currentId: string | null }) {
  const [openId, setOpenId] = useState<string | null>(currentId);
  // When the current step moves on (a step got finished), open the new one.
  const [shownCurrent, setShownCurrent] = useState(currentId);
  if (shownCurrent !== currentId) {
    setShownCurrent(currentId);
    setOpenId(currentId);
  }

  return (
    <ol aria-label={t("quest.pathLabel")} className="flex flex-col">
      {steps.map((step, i) => (
        <PathStep
          key={step.id}
          step={step}
          number={i + 1}
          last={i === steps.length - 1}
          current={step.id === currentId}
          open={openId === step.id}
          onToggle={() => setOpenId((id) => (id === step.id ? null : step.id))}
        />
      ))}
    </ol>
  );
}

function PathStep({
  step,
  number,
  last,
  current,
  open,
  onToggle,
}: {
  step: QuestStep;
  number: number;
  last: boolean;
  current: boolean;
  open: boolean;
  onToggle: () => void;
}) {
  const done = step.state === "done";
  const muted = step.state === "locked" || step.state === "soon";
  const panelId = `quest-step-${step.id}`;

  return (
    <li className="relative flex gap-4">
      {/* Trail: the segment to the next checkpoint. Solid once this step is done. */}
      {!last && (
        <span
          aria-hidden
          className={cn(
            "absolute top-14 bottom-0 left-7 -translate-x-1/2 border-l-2",
            done ? "border-success" : "border-dashed border-input",
          )}
        />
      )}
      <div className="relative z-10 flex w-14 shrink-0 justify-center pt-1">
        <Checkpoint state={step.state} number={number} current={current} />
      </div>

      <div className={cn("flex min-w-0 flex-1 flex-col pb-6", muted && "text-muted-foreground")}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="-mx-2 flex min-h-14 items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-muted/60"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
              {current && (
                <span className="rounded-full bg-needs-you px-2 py-0.5 font-medium text-needs-you-foreground">
                  {t("quest.now")}
                </span>
              )}
              <span>{t(`quest.state.${step.state}`)}</span>
            </span>
            <span className="text-lg font-medium break-words">{step.title}</span>
          </span>
          <span
            className={cn(
              "mt-1 shrink-0 rounded-full px-2 py-0.5 text-sm font-medium tabular-nums",
              done ? "bg-success-soft text-success-strong" : "bg-muted text-muted-foreground",
            )}
          >
            {t("quest.stepXp", { xp: step.xp })}
          </span>
          <ChevronDownIcon
            aria-hidden
            className={cn("mt-1.5 size-4 shrink-0 transition-transform duration-200", open && "rotate-180")}
          />
        </button>

        <div id={panelId} hidden={!open} className="flex flex-col gap-2 pt-1">
          {step.subtitle && <p className="max-w-prose text-muted-foreground">{step.subtitle}</p>}
          {step.note && <p className="max-w-prose text-muted-foreground">{step.note}</p>}
          <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground tabular-nums">
            {step.hoursSaved > 0 && (
              <span>{t("quest.stepHours", { hours: formatHours(step.hoursSaved) })}</span>
            )}
            {step.minutes !== null && <span>{t("quest.stepMinutes", { minutes: step.minutes })}</span>}
          </p>
          <StepAction step={step} primary={current} />
        </div>
      </div>
    </li>
  );
}

function StepAction({ step, primary }: { step: QuestStep; primary: boolean }) {
  if (!step.href || step.state === "locked" || step.state === "soon") return null;
  const label =
    step.state === "done"
      ? t("quest.review")
      : step.state === "active"
        ? t("quest.continue")
        : t("quest.start");
  return (
    <Button asChild size="lg" variant={primary ? "default" : "outline"} className="mt-1 w-full sm:w-fit">
      <Link href={step.href as Route}>
        {label}
        <ArrowRightIcon data-icon="inline-end" aria-hidden />
      </Link>
    </Button>
  );
}

/** Each state has its own shape and icon, not only a color. */
function Checkpoint({
  state,
  number,
  current,
}: {
  state: QuestStep["state"];
  number: number;
  current: boolean;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-12 items-center justify-center rounded-full text-lg font-bold tabular-nums",
        state === "done" && "bg-success text-success-foreground",
        state === "active" && "bg-primary text-primary-foreground",
        state === "open" && "border-2 border-primary bg-card text-primary",
        state === "locked" && "bg-muted text-subtle-foreground",
        state === "soon" && "border-2 border-dashed border-input bg-card text-subtle-foreground",
        current && "animate-soft-pulse",
      )}
    >
      {state === "done" ? (
        <CheckIcon className="size-6" />
      ) : state === "active" ? (
        <PlayIcon className="size-5 fill-current" />
      ) : state === "locked" ? (
        <LockIcon className="size-5" />
      ) : state === "soon" ? (
        <HourglassIcon className="size-5" />
      ) : (
        number
      )}
    </span>
  );
}
