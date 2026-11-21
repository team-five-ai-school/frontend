import type {
  AiCapability,
  ApiChaosMap,
  ApiWorkTask,
  AssessmentResult,
  ChaosMapData,
  Handler,
  LearningPlan,
  RoleId,
} from "@/lib/contracts";
import { RoleId as RoleIdSchema } from "@/lib/contracts";

/** Backend capability → design-system handler (who does the task once the person has learned the flow). */
export const handlerFor: Record<AiCapability, Handler> = { auto: "ai", assist: "shared", human: "you" };

/**
 * Backend chaos map (lanes + totals, computed by code) → props of <ChaosMap>.
 * Skill lanes become flows; tasks AI cannot do become decisions ("you"), which the map shows next to the
 * person instead of in a lane. Lesson titles come from the plan item of the same skill.
 */
export function toChaosMapData(
  map: ApiChaosMap,
  tasks: ApiWorkTask[],
  plan: LearningPlan | null,
): ChaosMapData {
  const lessonBySkill = new Map((plan?.items ?? []).map((i) => [i.skillSlug, i]));
  const skillLanes = map.lanes.filter((l) => l.kind === "skill" && l.skillSlug && l.chaosType);
  return {
    tasks: tasks.map((task) => ({
      id: task.id,
      title: task.title,
      chaosType: task.chaosType,
      hoursPerWeek: task.hoursPerWeek,
      handler: handlerFor[task.aiCapability],
      flowId: task.skillSlug,
    })),
    flows: skillLanes.map((lane) => {
      const item = lessonBySkill.get(lane.skillSlug!);
      return {
        id: lane.skillSlug!,
        title: lane.title,
        chaosType: lane.chaosType!,
        aiSharePercent: lane.aiSharePercent,
        hoursNow: lane.hoursTotal,
        hoursWithAi: round1(lane.hoursTotal - lane.hoursAiCan),
        lessonId: item?.lessonId ?? null,
        lessonTitle: item?.lessonTitle ?? null,
      };
    }),
    totals: { hoursNow: map.totals.hoursTotal, hoursWithAi: map.totals.hoursHuman },
  };
}

export function toAssessment(
  roleSlug: string,
  map: ApiChaosMap,
  tasks: ApiWorkTask[],
  plan: LearningPlan | null,
): AssessmentResult {
  const parsed = RoleIdSchema.safeParse(roleSlug);
  return {
    id: map.id,
    roleId: (parsed.success ? parsed.data : "other") satisfies RoleId,
    aiSharePercent: map.totals.aiSharePercent,
    chaosMap: toChaosMapData(map, tasks, plan),
    recommendedCourseIds: [],
  };
}

const round1 = (n: number) => Math.round(n * 10) / 10;
