import type { LearningPlan, Lesson, Progress } from "@/lib/contracts";

/**
 * One progress model for every scope: a course (its lessons) and the whole learning plan (its items).
 * Adapters turn backend data into `QuestStep[]`; `summarize` derives XP, rank, checkpoints and stamps by code,
 * so the plan and a course look, count and celebrate the same way.
 */

export type QuestScope = "plan" | "course";

/**
 * done: finished · active: has answers, not finished · open: can be started · locked: opens after the previous
 * step (UI guide only) · soon: planned, the lesson is not published yet.
 */
export type QuestStepState = "done" | "active" | "open" | "locked" | "soon";

export type QuestStep = {
  id: string;
  title: string;
  /** Shown under the title: a lesson name for a plan step, a summary for a course lesson. */
  subtitle: string | null;
  /** Longer "why" text (AI rationale on the plan). */
  note: string | null;
  href: string | null;
  state: QuestStepState;
  xp: number;
  hoursSaved: number;
  minutes: number | null;
};

export type Quest = { id: string; scope: QuestScope; steps: QuestStep[] };

/* ───────── XP and ranks ───────── */

const LESSON_XP = 100;
/** A plan step is worth more when it frees more time: +10 XP per hour saved per week. */
const xpForPlanStep = (hours: number) => LESSON_XP + Math.round(hours * 10);

export const RANKS = ["rookie", "explorer", "practitioner", "automator", "master"] as const;
export type RankId = (typeof RANKS)[number];
/** Share of the quest's XP needed for each rank (same index as RANKS). */
const RANK_AT = [0, 0.25, 0.5, 0.75, 1] as const;

export const STAMPS = ["first_step", "streak_three", "halfway", "time_saver", "finisher"] as const;
export type StampId = (typeof STAMPS)[number];

export type Stamp = { id: StampId; earned: boolean };

export type QuestSummary = {
  done: number;
  total: number;
  percent: number;
  xp: number;
  xpTotal: number;
  rank: { id: RankId; index: number; xpFrom: number; xpTo: number | null; next: RankId | null };
  hoursSaved: number;
  hoursSavedTotal: number;
  minutesLeft: number;
  /** The step to do now: the first active one, else the first open one. */
  current: QuestStep | null;
  stamps: Stamp[];
};

/** Time-saver stamp (plan only): 3 h a week freed, or all the hours the plan can free if it is smaller. */
const TIME_SAVER_HOURS = 3;

export function summarize(quest: Quest): QuestSummary {
  const { steps } = quest;
  const doneSteps = steps.filter((s) => s.state === "done");
  const done = doneSteps.length;
  const total = steps.length;
  const percent = total ? Math.round((done / total) * 100) : 0;
  const xp = sum(doneSteps.map((s) => s.xp));
  const xpTotal = sum(steps.map((s) => s.xp));

  const ratio = xpTotal ? xp / xpTotal : 0;
  let index = 0;
  RANK_AT.forEach((at, i) => {
    if (ratio >= at && (at < 1 || done === total)) index = i;
  });
  const next = index < RANKS.length - 1 ? RANKS[index + 1] : null;
  const rank = {
    id: RANKS[index],
    index,
    xpFrom: Math.round(RANK_AT[index] * xpTotal),
    xpTo: next ? Math.round(RANK_AT[index + 1] * xpTotal) : null,
    next,
  };

  const hoursSaved = sum(doneSteps.map((s) => s.hoursSaved));
  const hoursSavedTotal = sum(steps.map((s) => s.hoursSaved));
  const minutesLeft = sum(steps.filter((s) => s.state !== "done").map((s) => s.minutes ?? 0));
  const current = steps.find((s) => s.state === "active") ?? steps.find((s) => s.state === "open") ?? null;

  const leadingDone = steps.findIndex((s) => s.state !== "done");
  const inARow = leadingDone === -1 ? total : leadingDone;
  const earned: Record<StampId, boolean> = {
    first_step: done >= 1,
    streak_three: total >= 3 && inARow >= 3,
    halfway: total > 0 && done * 2 >= total,
    time_saver: done > 0 && hoursSavedTotal > 0 && hoursSaved >= Math.min(TIME_SAVER_HOURS, hoursSavedTotal),
    finisher: total > 0 && done === total,
  };
  // On a course "time saver" would duplicate "halfway": the plan is where hours are counted.
  const stampIds = quest.scope === "plan" ? STAMPS : STAMPS.filter((id) => id !== "time_saver");
  const stamps = stampIds
    .filter((id) => id !== "streak_three" || total >= 3)
    .map((id) => ({ id, earned: earned[id] }));

  return {
    done,
    total,
    percent,
    xp,
    xpTotal,
    rank,
    hoursSaved,
    hoursSavedTotal,
    minutesLeft,
    current,
    stamps,
  };
}

const sum = (values: number[]) => values.reduce((a, b) => a + b, 0);

/* ───────── Adapters ───────── */

/** The learning plan. A step also counts as done when /me/progress has its lesson, so the plan never lags. */
export function planQuest(plan: LearningPlan, progress: Progress | null): Quest {
  const completed = new Set(progress?.completedLessonIds ?? []);
  const started = new Set(progress?.startedLessonIds ?? []);
  const steps = plan.items
    .toSorted((a, b) => a.order - b.order)
    .map((item): QuestStep => {
      const slug = item.lessonSlug;
      const state: QuestStepState =
        item.status === "done" || (slug && completed.has(slug))
          ? "done"
          : item.status === "in_progress" || (slug && started.has(slug))
            ? "active"
            : item.status === "slot" || !slug
              ? "soon"
              : "open";
      return {
        id: item.id,
        title: item.skillTitle,
        subtitle: item.lessonTitle,
        note: item.rationale,
        href: slug ? `/lessons/${slug}` : null,
        state,
        xp: xpForPlanStep(item.estimatedHoursSaved),
        hoursSaved: item.estimatedHoursSaved,
        minutes: null,
      };
    });
  return { id: `plan:${plan.id}`, scope: "plan", steps };
}

/**
 * A course. Lessons open in order: the first unfinished lesson and any lesson right after a finished one are
 * open, the rest are locked (a UI guide only; the backend serves every lesson). A guest sees lesson 1 open.
 */
export function courseQuest(courseId: string, lessons: Lesson[], progress: Progress | null): Quest {
  const completed = new Set(progress?.completedLessonIds ?? []);
  const started = new Set(progress?.startedLessonIds ?? []);
  const ordered = lessons.toSorted((a, b) => a.order - b.order);
  const firstOpen = ordered.findIndex((l) => !completed.has(l.id));
  const steps = ordered.map((lesson, i): QuestStep => {
    const prevDone = i > 0 && completed.has(ordered[i - 1].id);
    const state: QuestStepState = completed.has(lesson.id)
      ? "done"
      : started.has(lesson.id)
        ? "active"
        : i === firstOpen || prevDone
          ? "open"
          : "locked";
    return {
      id: lesson.id,
      title: lesson.title,
      subtitle: lesson.summary,
      note: null,
      href: `/lessons/${lesson.id}`,
      state,
      xp: LESSON_XP,
      hoursSaved: 0,
      minutes: lesson.durationMinutes,
    };
  });
  return { id: `course:${courseId}`, scope: "course", steps };
}
