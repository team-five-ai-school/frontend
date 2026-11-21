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
  { id: "accountant", title: "Бухгалтер", description: "Первинка, таблиці, листування з контрагентами" },
  { id: "sales_manager", title: "Менеджер з продажу", description: "Клієнти, листи, комерційні пропозиції" },
  { id: "business_owner", title: "Власник малого бізнесу", description: "Усе потроху і завжди бракує часу" },
  { id: "office_manager", title: "Офіс-менеджер", description: "Пошта, зустрічі, документи, закупівлі" },
  { id: "teacher", title: "Вчитель", description: "Плани уроків, перевірка робіт, звʼязок з батьками" },
  { id: "other", title: "Інше", description: "Розкажи своїми словами" },
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    kind: "multi",
    text: "Що з цього ти робиш щотижня?",
    hint: "Обери все, що впізнаєш",
    options: [
      { id: "o1", label: "Відповідаю на однакові листи", chaosType: "communication" },
      { id: "o2", label: "Переношу дані з документів у таблиці", chaosType: "data" },
      { id: "o3", label: "Пишу звіти й протоколи", chaosType: "documents" },
      { id: "o4", label: "Узгоджую зустрічі", chaosType: "scheduling" },
      { id: "o5", label: "Шукаю потрібний файл чи лист", chaosType: "search" },
    ],
  },
  {
    id: "q2",
    kind: "single",
    text: "Скільки часу щодня йде на пошту й месенджери?",
    options: [
      { id: "a1", label: "До 30 хвилин" },
      { id: "a2", label: "Від 30 хвилин до 2 годин", description: "Найчастіша відповідь" },
      { id: "a3", label: "Більше 2 годин" },
    ],
  },
];

export const chaosMap: ChaosMapData = {
  flows: [
    {
      id: "f1",
      title: "Листи й повідомлення",
      chaosType: "communication",
      aiSharePercent: 70,
      hoursNow: 6,
      hoursWithAi: 1.8,
      lessonId: "l1",
      lessonTitle: "Відповіді на типові листи",
    },
    {
      id: "f2",
      title: "Документи й звіти",
      chaosType: "documents",
      aiSharePercent: 65,
      hoursNow: 6.5,
      hoursWithAi: 2.3,
      lessonId: "l2",
      lessonTitle: "Протокол зустрічі за 5 хвилин",
    },
    {
      id: "f3",
      title: "Таблиці й дані",
      chaosType: "data",
      aiSharePercent: 75,
      hoursNow: 6,
      hoursWithAi: 1.5,
      lessonId: "l3",
      lessonTitle: "Дані з накладних у таблицю",
    },
    {
      id: "f4",
      title: "Планування",
      chaosType: "scheduling",
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
      title: "Відповідати на типові листи клієнтів",
      chaosType: "communication",
      hoursPerWeek: 3,
      handler: "ai",
      flowId: "f1",
    },
    {
      id: "t2",
      title: "Розбирати вхідну пошту",
      chaosType: "communication",
      hoursPerWeek: 2,
      handler: "ai",
      flowId: "f1",
    },
    {
      id: "t3",
      title: "Погоджувати нестандартні запити",
      chaosType: "communication",
      hoursPerWeek: 1,
      handler: "you",
      flowId: "f1",
    },
    {
      id: "t4",
      title: "Готувати тижневий звіт",
      chaosType: "documents",
      hoursPerWeek: 3,
      handler: "shared",
      flowId: "f2",
    },
    {
      id: "t5",
      title: "Складати протоколи зустрічей",
      chaosType: "documents",
      hoursPerWeek: 2,
      handler: "ai",
      flowId: "f2",
    },
    {
      id: "t6",
      title: "Оформлювати службові записки",
      chaosType: "documents",
      hoursPerWeek: 1.5,
      handler: "ai",
      flowId: "f2",
    },
    {
      id: "t7",
      title: "Переносити дані з накладних у таблицю",
      chaosType: "data",
      hoursPerWeek: 4,
      handler: "ai",
      flowId: "f3",
    },
    {
      id: "t8",
      title: "Звіряти списки замовлень",
      chaosType: "data",
      hoursPerWeek: 2,
      handler: "shared",
      flowId: "f3",
    },
    {
      id: "t9",
      title: "Узгоджувати час зустрічей",
      chaosType: "scheduling",
      hoursPerWeek: 2,
      handler: "ai",
      flowId: "f4",
    },
    {
      id: "t10",
      title: "Вирішувати, що робити першим",
      chaosType: "scheduling",
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
  { id: "tr1", title: "Листування", chaosType: "communication" },
  { id: "tr2", title: "Документи", chaosType: "documents" },
  { id: "tr3", title: "Таблиці", chaosType: "data" },
  { id: "tr4", title: "Планування", chaosType: "scheduling" },
];

export const tools: Tool[] = [
  { id: "chatgpt", name: "ChatGPT" },
  { id: "claude", name: "Claude" },
  { id: "gemini", name: "Gemini" },
  { id: "sheets", name: "Google Таблиці" },
  { id: "excel", name: "Excel" },
];

export const courses: Course[] = [
  {
    id: "c1",
    title: "Пошта без завалів",
    summary: "Типові відповіді, сортування вхідних і короткі підсумки довгих листувань.",
    trackId: "tr1",
    toolIds: ["chatgpt", "claude"],
    lessonCount: 4,
    durationMinutes: 55,
    status: "in_progress",
    progressPercent: 50,
    hoursSavedEstimate: 4,
  },
  {
    id: "c2",
    title: "Таблиці, які заповнюються самі",
    summary: "Як перенести дані з фото накладної в таблицю і перевірити результат.",
    trackId: "tr3",
    toolIds: ["gemini", "sheets"],
    lessonCount: 5,
    durationMinutes: 70,
    status: "available",
    progressPercent: 0,
    hoursSavedEstimate: 4.5,
  },
  {
    id: "c3",
    title: "Протоколи та звіти",
    summary: "Із нотаток зустрічі в акуратний протокол і тижневий звіт за шаблоном.",
    trackId: "tr2",
    toolIds: ["claude", "excel"],
    lessonCount: 3,
    durationMinutes: 40,
    status: "completed",
    progressPercent: 100,
    hoursSavedEstimate: 3,
  },
  {
    id: "c4",
    title: "Календар без переписок",
    summary: "Узгодження зустрічей і плану тижня з помічником.",
    trackId: "tr4",
    toolIds: ["gemini"],
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
    title: "Відповіді на типові листи",
    summary: "Шаблон промпту, який пише у твоєму стилі.",
    order: 1,
    durationMinutes: 12,
    status: "completed",
    flowId: "f1",
  },
  {
    id: "l1b",
    courseId: "c1",
    title: "Контекст у промпті",
    summary: "Чому AI відповідає загально і як це виправити.",
    order: 2,
    durationMinutes: 15,
    status: "in_progress",
    flowId: "f1",
  },
  {
    id: "l1c",
    courseId: "c1",
    title: "Підсумок довгого листування",
    summary: "Головне з 30 листів за хвилину.",
    order: 3,
    durationMinutes: 14,
    status: "available",
    flowId: "f1",
  },
  {
    id: "l1d",
    courseId: "c1",
    title: "Сортування вхідних",
    summary: "Правила, які розкладають пошту по папках.",
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
    title: "Відповіді на типові листи",
    status: "completed",
    hoursSavedEstimate: 2,
    unlockAfterTitle: null,
  },
  {
    id: "n2",
    lessonId: "l1b",
    title: "Контекст у промпті",
    status: "in_progress",
    hoursSavedEstimate: 1,
    unlockAfterTitle: null,
  },
  {
    id: "n3",
    lessonId: "l1c",
    title: "Підсумок довгого листування",
    status: "available",
    hoursSavedEstimate: 1,
    unlockAfterTitle: null,
  },
  {
    id: "n4",
    lessonId: "l2",
    title: "Протокол зустрічі за 5 хвилин",
    status: "locked",
    hoursSavedEstimate: 1.5,
    unlockAfterTitle: "Підсумок довгого листування",
  },
  {
    id: "n5",
    lessonId: "l3",
    title: "Дані з накладних у таблицю",
    status: "locked",
    hoursSavedEstimate: 3,
    unlockAfterTitle: "Протокол зустрічі за 5 хвилин",
  },
];

export const exerciseSingle: Extract<Exercise, { kind: "single" }> = {
  id: "e1",
  kind: "single",
  lessonId: "l1b",
  title: "Який промпт дасть кращу відповідь клієнту?",
  prompt:
    "Клієнт питає, коли буде готове його замовлення. Обери промпт, з яким AI напише точну й теплу відповідь.",
  hint: "Подумай, що AI має знати про ситуацію, щоб не вигадувати.",
  options: [
    { id: "a", label: "Напиши відповідь клієнту про замовлення" },
    { id: "b", label: "Відповідай ввічливо і коротко" },
    {
      id: "c",
      label:
        "Ти офіс-менеджер. Клієнт питає про замовлення №214. Воно буде готове в четвер. Напиши теплу відповідь на 3 речення",
    },
  ],
};

export const exerciseMulti: Extract<Exercise, { kind: "multi" }> = {
  id: "e2",
  kind: "multi",
  lessonId: "l1b",
  title: "Що варто додати в промпт?",
  prompt: "Обери все, що допоможе AI написати точний підсумок листування.",
  hint: "Корисне те, чого AI не може знати сам.",
  options: [
    { id: "a", label: "Для кого підсумок і навіщо" },
    { id: "b", label: "Бажана довжина" },
    { id: "c", label: "Прохання «будь розумним»" },
    { id: "d", label: "Що вважати головним" },
  ],
};

export const exerciseFree: Extract<Exercise, { kind: "free_text" }> = {
  id: "e3",
  kind: "free_text",
  lessonId: "l1b",
  title: "Напиши свій промпт",
  prompt: "Напиши промпт для відповіді на найчастіший лист, який ти отримуєш.",
  hint: "Роль, ситуація, що потрібно, формат відповіді.",
  maxLength: 600,
};

export const exerciseFile: Extract<Exercise, { kind: "file_task" }> = {
  id: "e4",
  kind: "file_task",
  lessonId: "l3",
  title: "Перенеси накладну в таблицю",
  prompt:
    "Сфотографуй або завантаж скриншот однієї своєї накладної. Попроси AI витягти з неї позиції і кількість.",
  hint: "Перевір, що всі рядки видно на фото.",
  accept: ["image/png", "image/jpeg"],
  sampleFileName: "накладна-приклад.jpg",
};

export const mistake: Mistake = {
  id: "m1",
  exerciseId: "e1",
  exerciseTitle: "Який промпт дасть кращу відповідь клієнту?",
  lessonId: "l1b",
  createdAt: "2026-11-21T10:24:00Z",
  what: "Обрано промпт без деталей замовлення.",
  why: "AI не знає номера замовлення і дати. Без них він або відповість загально, або вигадає дату.",
  how: "Дай AI ==роль, факти і формат==: «Ти офіс-менеджер. Замовлення №214 буде готове в четвер. Напиши теплу відповідь на 3 речення».",
};

export const extraTasks: ExtraTask[] = [
  {
    id: "x1",
    mistakeId: "m1",
    title: "Додай факти в промпт",
    description: "Тобі дадуть розмитий промпт. Допиши в нього 2 факти, яких бракує AI.",
    estimatedMinutes: 3,
    status: "pending",
    exerciseId: "e5",
  },
  {
    id: "x2",
    mistakeId: "m1",
    title: "Знайди, чого бракує",
    description: "Три промпти, один з них без контексту. Обери його.",
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
    blocks: [{ type: "text", text: "Чому AI іноді вигадує дати у відповідях?" }],
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
        text: "AI заповнює прогалини ==найімовірнішим варіантом==. Якщо дати немає в промпті, він її «припускає».",
      },
      {
        type: "steps",
        items: [
          "Дай ==факти==: номер, дату, імʼя.",
          "Попроси не вигадувати: «якщо чогось не знаєш, запитай».",
          "Перечитай відповідь перед відправкою.",
        ],
      },
      {
        type: "prompt",
        text: "Ти офіс-менеджер. Замовлення №214 буде готове в четвер, 27 листопада. Напиши клієнту теплу відповідь на 3 речення. Якщо чогось не знаєш, не вигадуй.",
      },
    ],
    mistake: null,
    extraTasks: [],
    suggestions: ["А як попросити коротше?", "Покажи ще приклад", "Як перевірити відповідь?"],
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
      text: "Нічого страшного, це найчастіша помилка на старті. Допоможе одне: ==дай AI факти, яких він не знає==.",
    },
    {
      type: "example",
      title: "Було → стало",
      text: "«Напиши відповідь про замовлення» → «Ти офіс-менеджер. Замовлення №214 буде готове в четвер. Напиши теплу відповідь на 3 речення».",
    },
  ],
  mistake,
  extraTasks: [{ ...extraTasks[0] }],
  suggestions: ["Чому роль у промпті важлива?", "Дай ще одне тренування"],
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
  { id: "rt1", label: "Типові листи", chaosType: "communication", minutesBefore: 180, minutesAfter: 50 },
  { id: "rt2", label: "Звіти й протоколи", chaosType: "documents", minutesBefore: 300, minutesAfter: 120 },
  { id: "rt3", label: "Дані з накладних", chaosType: "data", minutesBefore: 240, minutesAfter: null },
];

export const certificate: Certificate = {
  id: "cert1",
  verificationCode: "AIW-7Q4K-2M9X",
  holderName: "Олена Коваль",
  courseTitle: "Пошта без завалів",
  issuedAt: "2026-11-21T12:00:00Z",
  hoursSavedPerWeek: 4,
  verifyUrl: "https://example.com/verify/AIW-7Q4K-2M9X",
};

export const teamHeatmap: TeamHeatmapData = {
  minGroupSize: 5,
  chaosTypes: ["communication", "documents", "data", "scheduling", "search"],
  departments: [
    { id: "d1", name: "Продажі", headcount: 18, hours: [7.5, 3, 2, 2.5, 1.5] },
    { id: "d2", name: "Бухгалтерія", headcount: 9, hours: [3, 4.5, 8, 1, 2] },
    { id: "d3", name: "Офіс і адміністрування", headcount: 6, hours: [5, 4, 2.5, 4.5, 3] },
    { id: "d4", name: "Логістика", headcount: 12, hours: [2.5, 2, 6.5, 3.5, 1] },
    { id: "d5", name: "Дизайн", headcount: 3, hours: [null, null, null, null, null] },
  ],
};

export const kpis: Kpi[] = [
  { id: "seats", value: 48, unit: "count", trend: { direction: "up", value: 6, unit: "count" } },
  { id: "hoursSaved", value: 212, unit: "hours", trend: { direction: "up", value: 18, unit: "percent" } },
  { id: "completion", value: 64, unit: "percent", trend: { direction: "down", value: 3, unit: "percent" } },
  { id: "roi", value: 3.4, unit: "ratio", trend: null },
];
