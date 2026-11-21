"use client";

import { useState } from "react";

import { SegmentedControl } from "@/components/segmented-control";
import { Button } from "@/components/ui/button";
import { QuestProgress } from "@/features/quest/components/quest-progress";
import type { Quest, QuestStep, QuestStepState } from "@/features/quest/quest";

const planSteps: Omit<QuestStep, "state">[] = [
  ["Answer client emails with AI", "Lesson: Reply templates in 2 minutes", 3.5],
  ["Collect data from scattered chats", "Lesson: One inbox for every channel", 2],
  ["Weekly report without copy-paste", "Lesson: A report from a table in one prompt", 2.5],
  ["Track task statuses", "Lesson: A status board that updates itself", 1.5],
  ["Move data between systems", null, 1],
].map(([title, subtitle, hours], i) => ({
  id: `p${i}`,
  title: title as string,
  subtitle: subtitle as string | null,
  note: i === 0 ? "You spend the most time here, so this step frees up the most hours." : null,
  href: subtitle ? "/design-system/demo/lesson" : null,
  xp: 100 + Math.round((hours as number) * 10),
  hoursSaved: hours as number,
  minutes: null,
}));

const courseSteps: Omit<QuestStep, "state">[] = [
  "What an AI assistant can do",
  "Your first good prompt",
  "Fix a weak prompt",
  "Check AI output",
  "Build your own template",
  "Wrap-up practice",
].map((title, i) => ({
  id: `c${i}`,
  title,
  subtitle: "A short lesson with cards and exercises checked on the server.",
  note: null,
  href: "/design-system/demo/lesson",
  xp: 100,
  hoursSaved: 0,
  minutes: 8 + i,
}));

/** States for `done` finished steps: plan steps without a lesson stay "soon", a course locks what follows. */
function withProgress(steps: Omit<QuestStep, "state">[], done: number, scope: Quest["scope"]): QuestStep[] {
  return steps.map((step, i) => {
    let state: QuestStepState =
      i < done ? "done" : i === done ? "open" : scope === "plan" ? "open" : "locked";
    if (scope === "plan" && !step.href) state = "soon";
    return { ...step, state };
  });
}

/** Demo of the unified progress module: same component for the plan and a course; step through to see rewards. */
export function DemoQuest() {
  const [scope, setScope] = useState<Quest["scope"]>("plan");
  const [done, setDone] = useState({ plan: 1, course: 2 });
  const steps = scope === "plan" ? planSteps : courseSteps;
  const max = scope === "plan" ? planSteps.filter((s) => s.href).length : courseSteps.length;
  const quest: Quest = { id: `demo:${scope}`, scope, steps: withProgress(steps, done[scope], scope) };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <SegmentedControl
          label="Scope"
          value={scope}
          onValueChange={setScope}
          options={[
            { value: "plan", label: "My plan" },
            { value: "course", label: "Course" },
          ]}
        />
        <Button
          variant="outline"
          disabled={done[scope] >= max}
          onClick={() => setDone((d) => ({ ...d, [scope]: Math.min(max, d[scope] + 1) }))}
        >
          Finish next step
        </Button>
        <Button variant="ghost" onClick={() => setDone((d) => ({ ...d, [scope]: 0 }))}>
          Reset
        </Button>
      </div>
      <QuestProgress key={scope} quest={quest} />
    </div>
  );
}
