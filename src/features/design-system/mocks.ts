/**
 * Mock data in the shape of the proposed contracts (src/lib/contracts, docs/api-contracts.md).
 * Used by /design-system and the demo pages only.
 */
import type {
  AssessmentResult,
  Certificate,
  ChaosMapData,
  Course,
  Exercise,
  ExtraTask,
  Kpi,
  Lesson,
  MentorMessage,
  Mistake,
  QuizQuestion,
  Role,
  RoadmapNode,
  RoutineTimeEntry,
  Streak,
  StreakDay,
  TeamHeatmapData,
  Tool,
  Track,
} from "@/lib/contracts";

export const roles: Role[] = [
  {
    id: "accountant",
    title: "Accountant",
    description: "Invoices, spreadsheets, correspondence with vendors",
  },
  { id: "sales_manager", title: "Sales manager", description: "Clients, emails, proposals" },
  {
    id: "small_business_owner",
    title: "Small business owner",
    description: "A bit of everything and never enough time",
  },
  { id: "office_manager", title: "Office manager", description: "Mail, meetings, documents, purchasing" },
  { id: "teacher", title: "Teacher", description: "Lesson plans, grading, contact with parents" },
  { id: "other", title: "Other", description: "Tell us in your own words" },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    kind: "multi",
    text: "Which of these do you do every week?",
    hint: "Pick everything you recognize",
    options: [
      { id: "o1", label: "I reply to the same emails", chaosType: "repetitive_replies" },
      { id: "o2", label: "I copy data from documents into spreadsheets", chaosType: "manual_transfer" },
      { id: "o3", label: "I write reports and meeting minutes", chaosType: "reports" },
      { id: "o4", label: "I schedule meetings", chaosType: "status_tracking" },
      { id: "o5", label: "I look for a file or an email", chaosType: "scattered_channels" },
    ],
  },
  {
    id: "q2",
    kind: "single",
    text: "How much time a day goes to email and messengers?",
    options: [
      { id: "a1", label: "Up to 30 minutes" },
      { id: "a2", label: "30 minutes to 2 hours", description: "Most common answer" },
      { id: "a3", label: "More than 2 hours" },
    ],
  },
];

export const chaosMap: ChaosMapData = {
  flows: [
    {
      id: "f1",
      title: "Emails and messages",
      chaosType: "repetitive_replies",
      aiSharePercent: 70,
      hoursNow: 6,
      hoursWithAi: 1.8,
      lessonId: "l1",
      lessonTitle: "Replies to routine emails",
    },
    {
      id: "f2",
      title: "Documents and reports",
      chaosType: "reports",
      aiSharePercent: 65,
      hoursNow: 6.5,
      hoursWithAi: 2.3,
      lessonId: "l2",
      lessonTitle: "Meeting minutes in 5 minutes",
    },
    {
      id: "f3",
      title: "Spreadsheets and data",
      chaosType: "manual_transfer",
      aiSharePercent: 75,
      hoursNow: 6,
      hoursWithAi: 1.5,
      lessonId: "l3",
      lessonTitle: "Invoice data into a spreadsheet",
    },
    {
      id: "f4",
      title: "Scheduling",
      chaosType: "status_tracking",
      aiSharePercent: 45,
      hoursNow: 3.5,
      hoursWithAi: 1.9,
      lessonId: null,
      lessonTitle: null,
    },
  ],
  tasks: [
    {
      id: "t1",
      title: "Reply to routine customer emails",
      chaosType: "repetitive_replies",
      hoursPerWeek: 3,
      handler: "ai",
      flowId: "f1",
    },
    {
      id: "t2",
      title: "Sort incoming mail",
      chaosType: "repetitive_replies",
      hoursPerWeek: 2,
      handler: "ai",
      flowId: "f1",
    },
    {
      id: "t3",
      title: "Approve non-standard requests",
      chaosType: "repetitive_replies",
      hoursPerWeek: 1,
      handler: "you",
      flowId: "f1",
    },
    {
      id: "t4",
      title: "Prepare the weekly report",
      chaosType: "reports",
      hoursPerWeek: 3,
      handler: "shared",
      flowId: "f2",
    },
    {
      id: "t5",
      title: "Write meeting minutes",
      chaosType: "reports",
      hoursPerWeek: 2,
      handler: "ai",
      flowId: "f2",
    },
    {
      id: "t6",
      title: "Draft internal memos",
      chaosType: "reports",
      hoursPerWeek: 1.5,
      handler: "ai",
      flowId: "f2",
    },
    {
      id: "t7",
      title: "Copy invoice data into a spreadsheet",
      chaosType: "manual_transfer",
      hoursPerWeek: 4,
      handler: "ai",
      flowId: "f3",
    },
    {
      id: "t8",
      title: "Cross-check order lists",
      chaosType: "manual_transfer",
      hoursPerWeek: 2,
      handler: "shared",
      flowId: "f3",
    },
    {
      id: "t9",
      title: "Agree on meeting times",
      chaosType: "status_tracking",
      hoursPerWeek: 2,
      handler: "ai",
      flowId: "f4",
    },
    {
      id: "t10",
      title: "Decide what to do first",
      chaosType: "status_tracking",
      hoursPerWeek: 1.5,
      handler: "you",
      flowId: "f4",
    },
  ],
  totals: { hoursNow: 22, hoursWithAi: 7.5 },
};

export const assessment: AssessmentResult = {
  id: "as1",
  roleId: "office_manager",
  aiSharePercent: 66,
  chaosMap,
  recommendedCourseIds: ["c1", "c2"],
};

export const tracks: Track[] = [
  { id: "tr1", title: "Correspondence", chaosType: "repetitive_replies" },
  { id: "tr2", title: "Documents", chaosType: "reports" },
  { id: "tr3", title: "Spreadsheets", chaosType: "manual_transfer" },
  { id: "tr4", title: "Scheduling", chaosType: "status_tracking" },
];

export const tools: Tool[] = [
  { id: "chatgpt", name: "ChatGPT" },
  { id: "claude", name: "Claude" },
  { id: "gemini", name: "Gemini" },
  { id: "sheets", name: "Google Sheets" },
  { id: "excel", name: "Excel" },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: "Inbox under control",
    summary: "Template replies, inbox sorting and short summaries of long threads.",
    trackId: "tr1",
    toolIds: ["chatgpt", "claude"],
    level: "beginner",
    roleIds: ["general"],
    lessonCount: 4,
    durationMinutes: 55,
    status: "in_progress",
    progressPercent: 50,
    hoursSavedEstimate: 4,
  },
  {
    id: "c2",
    title: "Spreadsheets that fill themselves",
    summary: "How to move data from a photo of an invoice into a spreadsheet and check the result.",
    trackId: "tr3",
    toolIds: ["gemini", "sheets"],
    level: "beginner",
    roleIds: ["general"],
    lessonCount: 5,
    durationMinutes: 70,
    status: "available",
    progressPercent: 0,
    hoursSavedEstimate: 4.5,
  },
  {
    id: "c3",
    title: "Minutes and reports",
    summary: "From meeting notes to clean minutes and a weekly report from a template.",
    trackId: "tr2",
    toolIds: ["claude", "excel"],
    level: "beginner",
    roleIds: ["general"],
    lessonCount: 3,
    durationMinutes: 40,
    status: "completed",
    progressPercent: 100,
    hoursSavedEstimate: 3,
  },
  {
    id: "c4",
    title: "Calendar without back-and-forth",
    summary: "Scheduling meetings and planning the week with an assistant.",
    trackId: "tr4",
    toolIds: ["gemini"],
    level: "beginner",
    roleIds: ["general"],
    lessonCount: 3,
    durationMinutes: 35,
    status: "locked",
    progressPercent: 0,
    hoursSavedEstimate: 1.5,
  },
];

export const lessons: Lesson[] = [
  {
    id: "l1",
    courseId: "c1",
    title: "Replies to routine emails",
    summary: "A prompt template that writes in your style.",
    order: 1,
    durationMinutes: 12,
    status: "completed",
    flowId: "f1",
  },
  {
    id: "l1b",
    courseId: "c1",
    title: "Context in a prompt",
    summary: "Why AI answers in generalities and how to fix it.",
    order: 2,
    durationMinutes: 15,
    status: "in_progress",
    flowId: "f1",
  },
  {
    id: "l1c",
    courseId: "c1",
    title: "Summary of a long thread",
    summary: "The key points of 30 emails in a minute.",
    order: 3,
    durationMinutes: 14,
    status: "available",
    flowId: "f1",
  },
  {
    id: "l1d",
    courseId: "c1",
    title: "Sorting your inbox",
    summary: "Rules that file your mail into folders.",
    order: 4,
    durationMinutes: 14,
    status: "locked",
    flowId: "f1",
  },
];

export const roadmap: RoadmapNode[] = [
  {
    id: "n1",
    lessonId: "l1",
    title: "Replies to routine emails",
    status: "completed",
    hoursSavedEstimate: 2,
    unlockAfterTitle: null,
  },
  {
    id: "n2",
    lessonId: "l1b",
    title: "Context in a prompt",
    status: "in_progress",
    hoursSavedEstimate: 1,
    unlockAfterTitle: null,
  },
  {
    id: "n3",
    lessonId: "l1c",
    title: "Summary of a long thread",
    status: "available",
    hoursSavedEstimate: 1,
    unlockAfterTitle: null,
  },
  {
    id: "n4",
    lessonId: "l2",
    title: "Meeting minutes in 5 minutes",
    status: "locked",
    hoursSavedEstimate: 1.5,
    unlockAfterTitle: "Summary of a long thread",
  },
  {
    id: "n5",
    lessonId: "l3",
    title: "Invoice data into a spreadsheet",
    status: "locked",
    hoursSavedEstimate: 3,
    unlockAfterTitle: "Meeting minutes in 5 minutes",
  },
];

export const exerciseSingle: Extract<Exercise, { kind: "single" }> = {
  id: "e1",
  kind: "single",
  lessonId: "l1b",
  title: "Which prompt gives the customer a better reply?",
  prompt:
    "A customer asks when their order will be ready. Pick the prompt that gets AI to write an accurate, warm reply.",
  hint: "Think about what AI needs to know about the situation so it doesn't make things up.",
  options: [
    { id: "a", label: "Write a reply to the customer about the order" },
    { id: "b", label: "Reply politely and briefly" },
    {
      id: "c",
      label:
        "You are an office manager. The customer asks about order #214. It will be ready on Thursday. Write a warm reply in 3 sentences",
    },
  ],
};

export const exerciseMulti: Extract<Exercise, { kind: "multi" }> = {
  id: "e2",
  kind: "multi",
  lessonId: "l1b",
  title: "What should you add to the prompt?",
  prompt: "Pick everything that helps AI write an accurate summary of the thread.",
  hint: "Useful details are the ones AI can't know on its own.",
  options: [
    { id: "a", label: "Who the summary is for and why" },
    { id: "b", label: "Preferred length" },
    { id: "c", label: "A request to “be smart”" },
    { id: "d", label: "What counts as important" },
  ],
};

export const exerciseFree: Extract<Exercise, { kind: "free_text" }> = {
  id: "e3",
  kind: "free_text",
  lessonId: "l1b",
  title: "Write your own prompt",
  prompt: "Write a prompt for replying to the email you get most often.",
  hint: "Role, situation, what you need, reply format.",
  maxLength: 600,
};

export const exerciseFile: Extract<Exercise, { kind: "file_task" }> = {
  id: "e4",
  kind: "file_task",
  lessonId: "l3",
  title: "Move an invoice into a spreadsheet",
  prompt:
    "Take a photo or upload a screenshot of one of your invoices. Ask AI to extract the items and quantities.",
  hint: "Check that all rows are visible in the photo.",
  accept: ["image/png", "image/jpeg"],
  sampleFileName: "invoice-sample.jpg",
};

export const mistake: Mistake = {
  id: "m1",
  exerciseId: "e1",
  exerciseTitle: "Which prompt gives the customer a better reply?",
  lessonId: "l1b",
  createdAt: "2026-11-21T10:24:00Z",
  what: "You picked the prompt without the order details.",
  why: "AI doesn't know the order number or the date. Without them it either answers in generalities or invents a date.",
  how: "Give AI a ==role, facts and format==: “You are an office manager. Order #214 will be ready on Thursday. Write a warm reply in 3 sentences.”",
};

export const extraTasks: ExtraTask[] = [
  {
    id: "x1",
    mistakeId: "m1",
    title: "Add facts to the prompt",
    description: "You get a vague prompt. Add the 2 facts AI is missing.",
    estimatedMinutes: 3,
    status: "pending",
    exerciseId: "e5",
  },
  {
    id: "x2",
    mistakeId: "m1",
    title: "Find what's missing",
    description: "Three prompts, one without context. Pick it.",
    estimatedMinutes: 2,
    status: "done",
    exerciseId: "e6",
  },
];

export const mentorThread: MentorMessage[] = [
  {
    id: "mm1",
    role: "user",
    createdAt: "2026-11-21T10:20:00Z",
    status: "complete",
    blocks: [{ type: "text", text: "Why does AI sometimes invent dates in replies?" }],
    mistake: null,
    extraTasks: [],
    suggestions: [],
  },
  {
    id: "mm2",
    role: "mentor",
    createdAt: "2026-11-21T10:20:05Z",
    status: "complete",
    blocks: [
      {
        type: "text",
        text: "AI fills gaps with the ==most likely option==. If the date isn't in the prompt, it “assumes” one.",
      },
      {
        type: "steps",
        items: [
          "Give ==facts==: number, date, name.",
          "Ask it not to invent: “if you don't know something, ask.”",
          "Reread the reply before sending.",
        ],
      },
      {
        type: "prompt",
        text: "You are an office manager. Order #214 will be ready on Thursday, November 27. Write the customer a warm reply in 3 sentences. If you don't know something, don't make it up.",
      },
    ],
    mistake: null,
    extraTasks: [],
    suggestions: ["How do I ask for a shorter one?", "Show another example", "How do I check the reply?"],
  },
];

export const mentorReview: MentorMessage = {
  id: "mm3",
  role: "mentor",
  createdAt: "2026-11-21T10:24:05Z",
  status: "complete",
  blocks: [
    {
      type: "text",
      text: "No worries, this is the most common mistake at the start. One thing helps: ==give AI the facts it doesn't know==.",
    },
    {
      type: "example",
      title: "Before → after",
      text: "“Write a reply about the order” → “You are an office manager. Order #214 will be ready on Thursday. Write a warm reply in 3 sentences.”",
    },
  ],
  mistake,
  extraTasks: [{ ...extraTasks[0] }],
  suggestions: ["Why does the role in a prompt matter?", "Give me another practice task"],
};

function buildDays(): StreakDay[] {
  // 4 weeks from Monday 2026-10-26; today is Saturday 2026-11-21 (index 26).
  const pattern = "aaiaaaa" + "aafiaaa" + "aaaaaaa" + "aaaaa" + "t" + "u";
  return [...pattern].map((c, i) => {
    const d = new Date(Date.UTC(2026, 9, 26 + i));
    const state = { a: "active", i: "inactive", f: "frozen", t: "today", u: "future" }[
      c
    ] as StreakDay["state"];
    return { date: d.toISOString().slice(0, 10), state };
  });
}

export const streak: Streak = { current: 12, best: 15, todayDone: false, days: buildDays() };

export const routineEntries: RoutineTimeEntry[] = [
  {
    id: "rt1",
    label: "Routine emails",
    chaosType: "repetitive_replies",
    minutesBefore: 180,
    minutesAfter: 50,
  },
  { id: "rt2", label: "Reports and minutes", chaosType: "reports", minutesBefore: 300, minutesAfter: 120 },
  { id: "rt3", label: "Invoice data", chaosType: "manual_transfer", minutesBefore: 240, minutesAfter: null },
];

export const certificate: Certificate = {
  id: "cert1",
  verificationCode: "AIW-7Q4K-2M9X",
  holderName: "Emma Clark",
  courseTitle: "Inbox under control",
  issuedAt: "2026-11-21T12:00:00Z",
  hoursSavedPerWeek: 4,
  verifyUrl: "https://example.com/verify/AIW-7Q4K-2M9X",
};

export const teamHeatmap: TeamHeatmapData = {
  minGroupSize: 5,
  chaosTypes: ["repetitive_replies", "reports", "manual_transfer", "status_tracking", "scattered_channels"],
  departments: [
    { id: "d1", name: "Sales", headcount: 18, hours: [7.5, 3, 2, 2.5, 1.5] },
    { id: "d2", name: "Accounting", headcount: 9, hours: [3, 4.5, 8, 1, 2] },
    { id: "d3", name: "Office and admin", headcount: 6, hours: [5, 4, 2.5, 4.5, 3] },
    { id: "d4", name: "Logistics", headcount: 12, hours: [2.5, 2, 6.5, 3.5, 1] },
    { id: "d5", name: "Design", headcount: 3, hours: [null, null, null, null, null] },
  ],
};

export const kpis: Kpi[] = [
  { id: "seats", value: 48, unit: "count", trend: { direction: "up", value: 6, unit: "count" } },
  { id: "hoursSaved", value: 212, unit: "hours", trend: { direction: "up", value: 18, unit: "percent" } },
  { id: "completion", value: 64, unit: "percent", trend: { direction: "down", value: 3, unit: "percent" } },
  { id: "roi", value: 3.4, unit: "ratio", trend: null },
];
