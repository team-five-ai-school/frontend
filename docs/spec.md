# Product spec

The single source of truth for **what** we build. Read this before working on any feature. Related docs:

| Doc                                | What it covers                                         |
| ---------------------------------- | ------------------------------------------------------ |
| `docs/roadmap.md`                  | Hybrid AI + code roadmap: algorithm, schemas, fallback |
| `content/FORMAT.md`                | Course file format, exercise types, roadmap fields     |
| `content/courses/*.md`             | 14 courses × 3 lessons (the actual content)            |
| `content/onboarding.json`          | Onboarding questions, roles, tools, pains, quiz        |
| `evals/README.md` + `evals/*.json` | Test sets for every AI component and how to score them |
| `AGENTS.md`                        | How to write the code (stack, caching, UI rules)       |

## Demo today (scope until code freeze 17:50)

Everything below this section is the full product. **Today we build only this path**, end to end and deployed:

| Keep (live demo)                                                                                                          | Stub                                                                    | Later (say "next" in the pitch)                                                   |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Short onboarding: role, office suite, AI tool, chaos map sliders, free text                                               | User = anonymous session id in a cookie (no signup/login)               | Accounts and auth, paywall logic (paywall is a static screen), placement quiz     |
| Roadmap reveal: code builds the plan, AI writes a personal "why" per step                                                 | Progress screen: static before/after from the chaos map                 | Journal-based replanning, progress AI summary, refresh sessions, re-run chaos map |
| **One full lesson** (`ai-assistants-101-l2`): cards, exercises checked on the server                                      | Other lessons shown in the roadmap but locked                           | Streaks, certificates, full course catalog screens, PWA install step              |
| **Mentor** reacts to a wrong answer and answers questions (streamed)                                                      | Practice task: `default_context` or simple placeholder fill, no AI call | AI-personalized practice task                                                     |
| **Practice + grader**: learner prompt → model output (streamed) → scores per criterion with quotes and an improved prompt |                                                                         |                                                                                   |
| `ai_calls` log (tokens, cost, latency) for unit economics and evals                                                       |                                                                         |                                                                                   |

**Backend for the demo: 4 endpoints and 2 tables** (`sessions`, `ai_calls`):

```
POST /onboarding                     → { profile, roadmap }            (roadmap by code + AI "why", see docs/roadmap.md)
GET  /lessons/{id}                   → lesson without answers
POST /lessons/{id}/exercises/{exId}  → check answer (see "Exercise answers" below)
POST /lessons/{id}/mentor            → streamed hint
POST /lessons/{id}/practice          → streamed output, then grade
```

Course content comes from `content/courses.json` (`npm run courses:build`); the backend (Node + Fastify, TypeScript) loads that JSON instead of parsing Markdown.

**AI is essential where the demo shows it:** the mentor and the grader. The roadmap is honest: code builds the plan, AI explains it in the person's own words.

## Product in one paragraph

A subscription web app (optional PWA) that teaches office workers to use AI in their daily work. A short onboarding maps the person's routines ("chaos map"), AI builds a personal roadmap from a fixed course catalog, lessons are short and interactive, and a **lesson mentor** (the main AI feature) helps during every lesson and turns mistakes into extra practice. After each lesson AI writes a journal entry; the progress screen and the roadmap update from the journal.

**Audience:** marketing, HR, teachers, lawyers, small-business owners, plus any office worker (`general`). UI language: English.

## Features

### 1. Onboarding

> **Update (skills-based onboarding):** the live flow is now `/onboarding` → role (accountant, sales manager,
> café/salon owner) → 6–8 quiz questions → optional free text → «AI розкладає твій день» (streamed tasks) →
> chaos map → `/plan`. A skill taxonomy links work tasks to lessons; plan items without a lesson are slots,
> filled when a lesson with that skill is published. Contracts: backend `docs/api-contracts.md`. The steps
> below describe the earlier course-based design and will be reconciled with it.

Steps (data in `content/onboarding.json`):

1. Role.
2. Office suite and AI tool they use.
3. AI experience level and goals.
4. **Chaos map**: hours per week for 10 routines (each routine = one pain id), plus optional free text "what eats your time".
5. Placement quiz (3 questions; 3/3 lets the roadmap skip the basics).
6. **Roadmap reveal**: the personal plan with a "why" per step and the expected hours saved per week.
7. Paywall.
8. Optional "add to home screen" (`<InstallAppCard />`), always skippable.

The chaos map hours are the **"before"** for the time-saved metric.

### 2. Roadmap and progress

- Roadmap = ordered courses in 4 stages: foundation → tools → role → advanced. Built and updated by the hybrid flow in `docs/roadmap.md`.
- Progress screen: roadmap with current position, skill levels, streak, certificates, journal timeline, and an **AI summary** of progress.
- **Before / after**: after finishing a course the person re-rates the hours for the pains that course covers. The app shows hours saved per week (before − after), summed across courses.

### 3. Courses and lessons

- Fixed catalog: 14 courses × 3 lessons (`content/courses`). Foundation, tool-specific (Microsoft 365 Copilot, Gemini in Google Workspace, ChatGPT), role-specific, advanced.
- A lesson takes 4–6 minutes: 3–4 theory cards, 5–6 exercises, a personalized practice, a summary.
- Courses are unlocked by `prerequisites`.

### 4. Exercises (4 types)

`single_select`, `multi_select`, `fill_blank` (pick the phrase that fixes a prompt), `true_false` (swipe cards). Checked **by code on the server**; the client gets lessons from `content/courses.public.json` (no answers, explanations, hints or mentor notes).

**Exercise answers (attempt flow):**

1. Learner submits. Wrong on the **first** attempt → server returns `{ correct: false, attempt: 1 }` only (no explanation, no correct answer); the mentor is triggered automatically with the learner's answer.
2. Second attempt, or any correct answer → `{ correct, attempt, explanation }`; after a second wrong attempt also `correct_answer`.
3. `true_false`: the learner answers each card; the server checks per card and returns per-card `correct`, with each card's explanation after that card is answered correctly or twice.

### 5. AI mentor (main AI feature)

A side panel (bottom sheet on mobile) inside every lesson.

- Knows: the lesson content, the current block, the learner's answers so far, their profile (role, pains, tools) and the recent journal.
- Gives hints that point toward the answer without stating it; explains a card again in other words; stays on the lesson topic; declines legal, medical or financial advice and requests to process real personal data.
- **Mistakes go to the mentor automatically**: after a wrong first attempt the frontend calls the mentor with `{ block_id, learner_answer }` and no message; the mentor explains what to look at (without the answer) and may offer one follow-up mini-task from `mentor.follow_up_tasks`, adapted to the person's role.
- Uses the lesson's `mentor` block (`common_mistakes`, `key_points`, `follow_up_tasks`) as grounding.

### 6. Personalized practice

At the end of each lesson: the lesson's `task_template` is filled with `{{role}}`, `{{pain}}`, `{{tool}}` from the profile (AI picks the best-fitting pain; falls back to `default_context`). The learner writes a prompt, the model runs it (streamed) so the learner sees the result, and the **grader scores the prompt** per rubric criterion (0 missing, 1 partly, 2 fully), quoting the parts of the prompt it relies on, and returns an improved prompt. The model output is shown to the learner but is **not** a grader input: grading stays deterministic and matches `evals/practice-grading.json`.

Placeholders are filled from `content/onboarding.json`: `{{role}}` ← role `noun`, `{{pain}}` ← the top pain's `phrase`, `{{tool}}` ← AI tool `phrase` (or the office suite's AI if the person uses none).

### 7. Lesson summary and journal

After the practice: AI reads exercise results and the practice grade, writes recommendations that reference the learner's actual mistakes, and saves a **journal entry**: lesson, scores per skill, strengths, weak spots, recommendations. Skill levels are computed **by code** from journal scores; AI only writes the text.

### 8. Gamification and certificates

- **Streak**: a day counts when the person finishes a lesson or a refresh session.
- **Certificate** per completed course (name from the course `certificate` field), non-accredited, issued automatically on completion. Shareable public link by unguessable ID; renders the learner's current name. Design: "squared paper" (prototype variant B). Downloadable as PDF. Prototype findings: (1) the browser's own print (`window.print()`) is unreliable: it prints the app header, spills onto a second page and the page restyles while the print dialog is open, so it is not the download method. (2) Server-side headless Chromium (`page.pdf()` with `@page` A4 landscape and the sheet fixed to 297x210 mm) gives a one-page PDF with selectable text in about 1 s; it needs a Chromium binary on the server and the app chrome hidden (best a dedicated chromeless render route). (3) A PNG of just the certificate element (Chromium screenshot at 2x, ~100 KB) also renders cleanly and suits sharing. Not yet tried: `@react-pdf/renderer`, client-side `html-to-image`, `next/og`. The PDF is rendered on demand from live data and never stored. The not-accredited disclaimer must live inside the certificate sheet, because the PDF shows only the sheet. **Decision (built):** the download is generated in the browser from the on-screen certificate (`html-to-image` + `jspdf`, JPEG inside a one-page A4 landscape PDF, ~300 KB). It needs no server Chromium (works on Vercel), has no print dialog, and always matches what is on screen in light and dark mode. Trade-off: the PDF holds an image, so its text is not selectable. Not in scope for now: stage certificates and a final whole-path certificate (a Mentor-made personal course does not exist yet; prototype variant F2 is kept as a future design).
- Certificate implementation notes (current backend, verified in code): Course content and lesson progress come from the content files, so a course is identified by its text id (e.g. `ai-assistants-101`), not a UUID. Lesson completion is stored in `lesson_completions` (`course_id` text). Course completion is currently computed on read in `GET /progress` (all its lessons done) and no event is emitted. The natural hook for issuing a certificate is `POST /lessons/:lessonId/complete`, right after the completion row is saved. Issuing must be idempotent. A separate, draft-only DB catalog (`courses`/`lessons` tables with UUIDs) also exists for plan slots; certificates should not reference it.

### 9. Retention after the first roadmap

- Replan from the journal (weak skills, uncovered pains) → next stage.
- Re-run the chaos map → show "before → after" and build the next roadmap.
- Daily 3-minute **refresh** sessions from exercises the person got wrong.
- Weekly practice on the person's own real task.
- New courses added regularly.
- After the first roadmap: offer the annual plan with a 3-month plan preview.

### Not in scope

Push notifications, offline mode, team accounts, native apps, user-generated courses.

## AI components

| Component         | Input → output                                                         | Model calls           | Eval                                            |
| ----------------- | ---------------------------------------------------------------------- | --------------------- | ----------------------------------------------- |
| Pain extraction   | chaos map + free text → pains with hours (JSON)                        | 1 per onboarding      | `evals/pain-extraction.json`                    |
| Roadmap planner   | profile + candidate courses → ordered steps with why (JSON, validated) | 1–2 per onboarding    | `evals/roadmap-personas.json`                   |
| Roadmap replanner | roadmap + journal → updated steps (JSON, validated)                    | 1 per lesson          | `evals/roadmap-personas.json`                   |
| Practice task     | lesson template + profile → personalized task                          | 1 per lesson (cached) | rubric-checked by judge                         |
| Practice run      | learner's prompt → model output (streamed)                             | 1 per attempt         | n/a                                             |
| Practice grader   | task + prompt + rubric → scores, quotes, improved prompt (JSON)        | 1 per attempt         | `evals/practice-grading.json`                   |
| Mentor            | lesson context + question/mistake → hint or explanation (streamed)     | 0–3 per lesson        | `evals/mentor.json`                             |
| Lesson summary    | exercise results + grade → journal entry (JSON)                        | 1 per lesson          | recommendations cite real mistakes (code check) |
| Progress summary  | skill levels + journal → short text                                    | 1 per journal entry   | text agrees with numbers (judge)                |

Rules for every component:

- **Structured output** (JSON schema) wherever code consumes the result; validate, retry once, then fall back.
- **Grounding**: lesson content and course data are passed in; the model never invents courses, exercises or answers.
- **Log every call**: component, model, input/output tokens, cost, latency. These numbers feed unit economics (cost per user) and the Architecture/Evals slides.
- Backend owns all prompts and model calls; the frontend never talks to a model provider directly.

## API contract (backend)

Browser calls go through the frontend proxy `/api/backend/*` (see `AGENTS.md` → Backend). Demo: an anonymous session id in an httpOnly cookie. Later: accounts with JWT in an httpOnly cookie.

```
POST /onboarding                    { role, office_suite, ai_tool, ai_level, goals, chaos_map, chaos_text, placement_quiz_correct }
                                    → { profile, roadmap }
GET  /roadmap                       → latest roadmap version
POST /roadmap/replan                → new roadmap version (also called internally after /lessons/{id}/complete)

GET  /courses                       → catalog with lock state and progress
GET  /courses/{id}                  → course with lessons and progress
GET  /lessons/{id}                  → cards and exercises WITHOUT answers
POST /lessons/{id}/exercises/{exId} { answer } → { correct, attempt, explanation?, correct_answer? }   (see Exercise answers)
POST /lessons/{id}/mentor           { block_id, learner_answer?, message? } → streamed text   (no message = proactive help after a mistake)
GET  /lessons/{id}/practice         → personalized task (cached per user)
POST /lessons/{id}/practice         { prompt } → streamed model output, then { scores, quotes, feedback, improved_prompt, passed }   (prompt max 2,000 chars)
POST /lessons/{id}/complete         → { journal_entry, progress, roadmap }

GET  /me/progress                   → skills, streak, certificates, hours saved, AI summary
GET  /me/journal                    → journal entries
POST /me/chaos-map                  { chaos_map } → updated before/after
GET  /me/refresh                    → today's refresh exercises
GET  /certificates/{id}             → public certificate data
```

## Security and safety (what we can claim)

| Done in the MVP                                                                                                  | Next (say so if asked)                                                  |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Model keys only on the backend; the browser talks to our domain through the proxy                                | Accounts, roles, per-user data isolation                                |
| Answers checked on the server; the app ships lessons without answers (`courses.public.json`)                     | Moving course content to a private repo or CMS                          |
| Practice and mentor input capped (2,000 chars) and rate-limited per session                                      | Abuse detection, per-account quotas                                     |
| Simple personal-data filter (emails, phone numbers, card-like numbers) before any model call; mentor refuses PII | Proper PII detection, data-processing agreement with the model provider |
| Mentor and grader prompts resist "ignore your instructions" (covered by eval cases)                              | Red-team set                                                            |

Course Markdown, including answers, is in a public repo: say that content is open by design for the hackathon and would move to a private CMS.

## Data model

`users` (profile: role, suite, ai_tool, level, goals) · `chaos_maps` (versioned, hours per pain) · `roadmaps` (versioned steps, source) · `courses` / `lessons` (loaded from `content/courses/*.md`) · `exercise_attempts` · `practice_attempts` (prompt, output, scores) · `journal_entries` · `skill_levels` · `streaks` · `certificates` · `ai_calls` (component, tokens, cost, latency).

## Screens

| Route                | Screen                                                                |
| -------------------- | --------------------------------------------------------------------- |
| `/onboarding`        | steps 1–8 above                                                       |
| `/`                  | continue lesson, today's refresh, streak, next roadmap step           |
| `/roadmap`           | stages and courses with "why", lock state, hours saved                |
| `/courses/[id]`      | lessons of a course                                                   |
| `/lessons/[id]`      | lesson player: cards, exercises, practice, summary; mentor panel      |
| `/progress`          | skills, streak, certificates, before/after hours, AI summary, journal |
| `/certificates/[id]` | shareable certificate                                                 |

## Pitch artefacts this feeds

- **Architecture slide**: browser → Next.js (Vercel) → `/api/backend` proxy → Fastify (Node, Railway) → model + Postgres; hybrid roadmap diagram from `docs/roadmap.md`.
- **Evals slide**: numbers from `evals/results/`.
- **Unit economics slide**: cost per user from the `ai_calls` log.
