/**
 * Proposed API contracts (frontend side). The backend does not have these entities yet;
 * The backend repo's docs/api-contracts.md describes the onboarding endpoints (section "Onboarding API" below).
 * Product component props are derived from these types. Keep both files in sync.
 *
 * Conventions: ids are strings (uuid on the backend), dates are ISO 8601 strings, durations are minutes,
 * weekly time is hours (number, may be fractional).
 */
import { z } from "zod";

/* ───────── Shared enums ───────── */

/**
 * Kinds of routine "chaos". Same keys on the chaos map, in skills (backend `skills.chaos_type`), courses and
 * on the B2B heatmap.
 */
export const ChaosType = z.enum([
  "scattered_channels",
  "manual_transfer",
  "repetitive_replies",
  "reports",
  "status_tracking",
]);
export type ChaosType = z.infer<typeof ChaosType>;

/** Who does a task: the two product color roles + a shared state (AI prepares, the person decides). */
export const Handler = z.enum(["ai", "you", "shared"]);
export type Handler = z.infer<typeof Handler>;

export const RoleId = z.enum([
  "accountant",
  "sales_manager",
  "small_business_owner",
  "office_manager",
  "teacher",
  "other",
]);
export type RoleId = z.infer<typeof RoleId>;

/* ───────── User & roles ───────── */

export const Role = z.object({ id: RoleId, title: z.string(), description: z.string() });
export type Role = z.infer<typeof Role>;

export const UserProfile = z.object({
  id: z.string(),
  displayName: z.string(),
  roleId: RoleId,
  plan: z.enum(["free", "b2c", "b2b_seat"]),
  companyId: z.string().nullable(),
});
export type UserProfile = z.infer<typeof UserProfile>;

/* ───────── Onboarding ───────── */

export const QuizOption = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  chaosType: ChaosType.optional(),
});
export type QuizOption = z.infer<typeof QuizOption>;

export const QuizQuestion = z.object({
  id: z.string(),
  kind: z.enum(["single", "multi"]),
  text: z.string(),
  hint: z.string().optional(),
  options: z.array(QuizOption).min(2),
});
export type QuizQuestion = z.infer<typeof QuizQuestion>;

export const QuizAnswer = z.object({ questionId: z.string(), optionIds: z.array(z.string()) });
export type QuizAnswer = z.infer<typeof QuizAnswer>;

/* ───────── Chaos map ───────── */

export const ChaosTask = z.object({
  id: z.string(),
  title: z.string(),
  chaosType: ChaosType,
  hoursPerWeek: z.number().nonnegative(),
  /** Who does it once the person has learned the flow. In "now" mode every task needs the person. */
  handler: Handler,
  flowId: z.string(),
});
export type ChaosTask = z.infer<typeof ChaosTask>;

export const ChaosFlow = z.object({
  id: z.string(),
  title: z.string(),
  chaosType: ChaosType,
  aiSharePercent: z.number().min(0).max(100),
  hoursNow: z.number().nonnegative(),
  hoursWithAi: z.number().nonnegative(),
  /** Each flow is a lesson or a course on the person's real tasks. */
  lessonId: z.string().nullable(),
  lessonTitle: z.string().nullable(),
});
export type ChaosFlow = z.infer<typeof ChaosFlow>;

export const ChaosMapData = z.object({
  tasks: z.array(ChaosTask),
  flows: z.array(ChaosFlow),
  totals: z.object({ hoursNow: z.number(), hoursWithAi: z.number() }),
});
export type ChaosMapData = z.infer<typeof ChaosMapData>;

export const AssessmentResult = z.object({
  id: z.string(),
  roleId: RoleId,
  aiSharePercent: z.number().min(0).max(100),
  chaosMap: ChaosMapData,
  recommendedCourseIds: z.array(z.string()),
});
export type AssessmentResult = z.infer<typeof AssessmentResult>;

/* ───────── Learning ───────── */

export const NodeStatus = z.enum(["locked", "available", "in_progress", "completed"]);
export type NodeStatus = z.infer<typeof NodeStatus>;

export const Track = z.object({ id: z.string(), title: z.string(), chaosType: ChaosType });
export type Track = z.infer<typeof Track>;

export const Tool = z.object({ id: z.string(), name: z.string() });
export type Tool = z.infer<typeof Tool>;

export const CourseLevel = z.enum(["beginner", "intermediate", "advanced"]);
export type CourseLevel = z.infer<typeof CourseLevel>;

export const Course = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  trackId: z.string(),
  toolIds: z.array(z.string()),
  level: CourseLevel,
  /** Onboarding role ids (content/onboarding.json `roles[].id`) the course is meant for. */
  roleIds: z.array(z.string()),
  lessonCount: z.number().int(),
  durationMinutes: z.number().int(),
  status: NodeStatus,
  progressPercent: z.number().min(0).max(100),
  hoursSavedEstimate: z.number().nonnegative(),
});
export type Course = z.infer<typeof Course>;

export const Lesson = z.object({
  id: z.string(),
  courseId: z.string(),
  title: z.string(),
  summary: z.string(),
  order: z.number().int(),
  durationMinutes: z.number().int(),
  status: NodeStatus,
  /** The chaos-map flow this lesson automates, if any. */
  flowId: z.string().nullable(),
});
export type Lesson = z.infer<typeof Lesson>;

export const RoadmapNode = z.object({
  id: z.string(),
  lessonId: z.string(),
  title: z.string(),
  status: NodeStatus,
  hoursSavedEstimate: z.number().nonnegative(),
  /** For locked nodes: title of the lesson that unlocks this one. */
  unlockAfterTitle: z.string().nullable(),
});
export type RoadmapNode = z.infer<typeof RoadmapNode>;

/* ───────── Exercises ───────── */

const ExerciseBase = z.object({
  id: z.string(),
  lessonId: z.string(),
  title: z.string(),
  prompt: z.string(),
  hint: z.string().nullable(),
});
const ChoiceOption = z.object({ id: z.string(), label: z.string() });

export const Exercise = z.discriminatedUnion("kind", [
  ExerciseBase.extend({ kind: z.literal("single"), options: z.array(ChoiceOption) }),
  ExerciseBase.extend({ kind: z.literal("multi"), options: z.array(ChoiceOption) }),
  ExerciseBase.extend({ kind: z.literal("free_text"), maxLength: z.number().int() }),
  ExerciseBase.extend({
    kind: z.literal("file_task"),
    accept: z.array(z.string()),
    sampleFileName: z.string().nullable(),
  }),
  /** Pick the phrase that fills the `___` gap in `template`. Same option-id shape as single. */
  ExerciseBase.extend({
    kind: z.literal("fill_blank"),
    template: z.string(),
    options: z.array(ChoiceOption),
  }),
  /** A deck of statements answered true/false one by one, checked together. */
  ExerciseBase.extend({
    kind: z.literal("true_false"),
    cards: z.array(z.object({ id: z.string(), statement: z.string() })),
  }),
]);
export type Exercise = z.infer<typeof Exercise>;
export type ChoiceOption = z.infer<typeof ChoiceOption>;

export const Verdict = z.enum(["correct", "incorrect", "partial"]);
export type Verdict = z.infer<typeof Verdict>;

export const AnswerResult = z.object({
  exerciseId: z.string(),
  verdict: Verdict,
  feedback: z.string(),
  correctOptionIds: z.array(z.string()).nullable(),
  /** Set when verdict !== "correct": the mistake is already queued for the Mentor. */
  mistakeId: z.string().nullable(),
  /** Backend attempt flow (docs/spec.md → Exercise answers). Optional so mocks without them still parse. */
  attempt: z.number().int().optional(),
  /** true once the answer is revealed: correct, or the 2nd+ attempt. Then the learner moves on. */
  final: z.boolean().optional(),
  /** true_false only, after the result is final: per-card correctness and explanations. */
  cardResults: z.array(z.boolean()).nullable().optional(),
  cardExplanations: z.array(z.string()).nullable().optional(),
});
export type AnswerResult = z.infer<typeof AnswerResult>;

/* ───────── Lesson player ───────── */

export const LessonStep = z.discriminatedUnion("type", [
  z.object({ type: z.literal("card"), id: z.string(), title: z.string(), body: z.string() }),
  z.object({ type: z.literal("exercise"), id: z.string(), exercise: Exercise }),
]);
export type LessonStep = z.infer<typeof LessonStep>;

/** GET /lessons/:lessonId */
export const LessonDetail = z.object({
  lesson: Lesson,
  courseId: z.string(),
  courseTitle: z.string(),
  nextLessonId: z.string().nullable(),
  steps: z.array(LessonStep),
});
export type LessonDetail = z.infer<typeof LessonDetail>;

/** GET /courses/:courseId */
export const CourseDetail = z.object({ course: Course, lessons: z.array(Lesson) });
export type CourseDetail = z.infer<typeof CourseDetail>;

/** GET /me/progress */
export const Progress = z.object({
  completedLessonIds: z.array(z.string()),
  /** Lessons with at least one answer that are not completed yet. */
  startedLessonIds: z.array(z.string()),
  courses: z.record(z.string(), z.object({ progressPercent: z.number(), status: NodeStatus })),
});
export type Progress = z.infer<typeof Progress>;

/** POST /lessons/:lessonId/complete */
export const LessonCompletion = z.object({
  correctFirstTry: z.number().int(),
  total: z.number().int(),
  nextLessonId: z.string().nullable(),
});
export type LessonCompletion = z.infer<typeof LessonCompletion>;

/* ───────── Mentor ───────── */

export const MentorBlock = z.discriminatedUnion("type", [
  z.object({ type: z.literal("text"), text: z.string() }),
  z.object({ type: z.literal("steps"), items: z.array(z.string()) }),
  z.object({ type: z.literal("example"), title: z.string().nullable(), text: z.string() }),
  z.object({ type: z.literal("prompt"), text: z.string() }),
]);
export type MentorBlock = z.infer<typeof MentorBlock>;

export const Mistake = z.object({
  id: z.string(),
  exerciseId: z.string(),
  exerciseTitle: z.string(),
  lessonId: z.string(),
  createdAt: z.string(),
  what: z.string(),
  why: z.string(),
  how: z.string(),
});
export type Mistake = z.infer<typeof Mistake>;

export const ExtraTask = z.object({
  id: z.string(),
  mistakeId: z.string(),
  title: z.string(),
  description: z.string(),
  estimatedMinutes: z.number().int(),
  status: z.enum(["pending", "done", "skipped"]),
  exerciseId: z.string(),
});
export type ExtraTask = z.infer<typeof ExtraTask>;

export const MentorMessage = z.object({
  id: z.string(),
  role: z.enum(["mentor", "user"]),
  createdAt: z.string(),
  status: z.enum(["complete", "pending", "error"]),
  blocks: z.array(MentorBlock),
  /** Present on a mentor review of a mistake. */
  mistake: Mistake.nullable(),
  extraTasks: z.array(ExtraTask),
  suggestions: z.array(z.string()),
});
export type MentorMessage = z.infer<typeof MentorMessage>;

export const MentorContext = z.object({
  source: z.enum(["global", "lesson", "exercise", "mistake"]),
  lessonId: z.string().nullable(),
  exerciseId: z.string().nullable(),
});
export type MentorContext = z.infer<typeof MentorContext>;

/* ───────── Progress, streaks, routine time ───────── */

export const StreakDay = z.object({
  date: z.string(),
  state: z.enum(["active", "inactive", "frozen", "today", "future"]),
});
export type StreakDay = z.infer<typeof StreakDay>;

export const Streak = z.object({
  current: z.number().int(),
  best: z.number().int(),
  todayDone: z.boolean(),
  /** Last 28 days, oldest first, starting on a Monday. */
  days: z.array(StreakDay),
});
export type Streak = z.infer<typeof Streak>;

export const RoutineTimeEntry = z.object({
  id: z.string(),
  label: z.string(),
  chaosType: ChaosType,
  minutesBefore: z.number().int().nonnegative(),
  minutesAfter: z.number().int().nonnegative().nullable(),
});
export type RoutineTimeEntry = z.infer<typeof RoutineTimeEntry>;

/* ───────── Certificate ───────── */

export const Certificate = z.object({
  id: z.string(),
  verificationCode: z.string(),
  holderName: z.string(),
  courseTitle: z.string(),
  issuedAt: z.string(),
  hoursSavedPerWeek: z.number().nullable(),
  verifyUrl: z.string(),
});
export type Certificate = z.infer<typeof Certificate>;

/* ───────── B2B (aggregated only, no personal data) ───────── */

export const TeamHeatmapData = z.object({
  /** Departments with fewer people than this are hidden (cells are null). */
  minGroupSize: z.number().int(),
  chaosTypes: z.array(ChaosType),
  departments: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      headcount: z.number().int(),
      /** Average weekly hours per person, same order as chaosTypes; null = hidden for privacy. */
      hours: z.array(z.number().nullable()),
    }),
  ),
});
export type TeamHeatmapData = z.infer<typeof TeamHeatmapData>;

export const Kpi = z.object({
  id: z.enum(["seats", "hoursSaved", "completion", "roi"]),
  value: z.number(),
  unit: z.enum(["count", "hours", "percent", "ratio"]),
  trend: z
    .object({ direction: z.enum(["up", "down"]), value: z.number(), unit: z.enum(["percent", "count"]) })
    .nullable(),
});
export type Kpi = z.infer<typeof Kpi>;

/* ───────── Onboarding API (backend, see backend/docs/api-contracts.md) ───────── */

/** Share of a task AI can take over: auto (AI does it), assist (AI prepares, you check), human (needs you). */
export const AiCapability = z.enum(["auto", "assist", "human"]);
export type AiCapability = z.infer<typeof AiCapability>;

export const ApiRole = z.object({ slug: z.string(), title: z.string(), description: z.string() });
export type ApiRole = z.infer<typeof ApiRole>;

export const ApiWorkTask = z.object({
  id: z.string(),
  title: z.string(),
  skillSlug: z.string(),
  chaosType: ChaosType,
  hoursPerWeek: z.number(),
  aiCapability: AiCapability,
  source: z.enum(["template", "llm", "user"]),
});
export type ApiWorkTask = z.infer<typeof ApiWorkTask>;

export const OnboardingSession = z.object({
  sessionId: z.string(),
  role: ApiRole,
  quiz: z.array(QuizQuestion),
  answers: z.array(QuizAnswer),
  status: z.enum(["started", "described", "completed", "claimed"]),
  tasks: z.array(ApiWorkTask),
});
export type OnboardingSession = z.infer<typeof OnboardingSession>;

/** Streamed by POST /onboarding/sessions/:id/describe as a growing JSON document (useObject). */
export const DescribedTasks = z.object({
  tasks: z.array(
    z.object({
      title: z.string(),
      skillSlug: z.string(),
      hoursPerWeek: z.number(),
      aiCapability: AiCapability,
    }),
  ),
  source: z.enum(["llm", "template"]),
});
export type DescribedTasks = z.infer<typeof DescribedTasks>;

export const ApiChaosLane = z.object({
  id: z.string(),
  kind: z.enum(["skill", "human"]),
  skillSlug: z.string().nullable(),
  title: z.string(),
  chaosType: ChaosType.nullable(),
  taskIds: z.array(z.string()),
  hoursTotal: z.number(),
  hoursAiCan: z.number(),
  aiSharePercent: z.number(),
});
export const ApiChaosMap = z.object({
  id: z.string(),
  version: z.number().int(),
  lanes: z.array(ApiChaosLane),
  totals: z.object({
    hoursTotal: z.number(),
    hoursAiCan: z.number(),
    hoursHuman: z.number(),
    aiSharePercent: z.number(),
  }),
  createdAt: z.string(),
});
export type ApiChaosMap = z.infer<typeof ApiChaosMap>;

/** `slot` = the skill is planned but no lesson exists yet (lessonId null); filled when a lesson is published. */
export const PlanItemStatus = z.enum(["slot", "ready", "in_progress", "done"]);
export const PlanItem = z.object({
  id: z.string(),
  order: z.number().int(),
  skillSlug: z.string(),
  skillTitle: z.string(),
  lessonId: z.string().nullable(),
  lessonTitle: z.string().nullable(),
  /** Content lesson id: the lesson opens at /lessons/:lessonSlug. */
  lessonSlug: z.string().nullable(),
  status: PlanItemStatus,
  sourceTaskIds: z.array(z.string()),
  estimatedHoursSaved: z.number(),
  rationale: z.string().nullable(),
});
export type PlanItem = z.infer<typeof PlanItem>;
export const LearningPlan = z.object({
  id: z.string(),
  version: z.number().int(),
  status: z.enum(["active", "superseded"]),
  items: z.array(PlanItem),
  createdAt: z.string(),
});
export type LearningPlan = z.infer<typeof LearningPlan>;

export const OnboardingCompletion = z.object({
  tasks: z.array(ApiWorkTask),
  chaosMap: ApiChaosMap,
  plan: LearningPlan,
});
export type OnboardingCompletion = z.infer<typeof OnboardingCompletion>;

/** The first plan item with a lesson to open, if any. */
export const firstLesson = (plan: LearningPlan | null) =>
  plan?.items.find((item) => item.lessonSlug && (item.status === "ready" || item.status === "in_progress")) ??
  null;
