# Personal roadmap: hybrid AI + code

**AI writes the plan, code guarantees it is valid.** The model understands the person (free text, priorities, explanations); code owns the rules (which courses exist, prerequisites, stage order). If the model returns something invalid, code repairs it or falls back to a deterministic plan, so the user always gets a working roadmap.

Lives in the **backend**: `POST /roadmap` (after onboarding) and `POST /roadmap/replan` (after each journal entry). Inputs come from `content/onboarding.json` answers; courses come from the frontmatter of `content/courses/*.md` (see `content/FORMAT.md` → Roadmap).

```
onboarding answers
   │
   ▼
1. AI    pain extraction ───────► profile: pains with hours/week, level, goals
   │
   ▼
2. CODE  candidate courses ─────► allowed course ids for this person
   │
   ▼
3. AI    plan ──────────────────► ordered steps with "why", focus lessons, expected minutes saved
   │                               (structured output, course_id restricted to candidates)
   ▼
4. CODE  validate ──────────────► ok → save │ invalid → 1 retry with errors → fallback plan
   │
   ▼
5. AI    replan after each journal entry (same validation)
```

## 1. Pain extraction (AI)

Input: `role`, `chaos_map` (hours per pain from the sliders), `chaos_text` (optional free text).

Output (JSON, validated):

```json
{ "pains": ["reporting", "email"], "hours_per_week": { "reporting": 4, "email": 6 } }
```

- Pain ids must be from `content/onboarding.json` → `chaos_map.routines[].pain`. Drop anything else.
- Final profile pains = slider pains with hours > 0, plus pains found in the text (use the model's hours estimate, default 2). Rank by hours, highest first; break ties by the order of `chaos_map.routines` in onboarding.json.
- Eval: `evals/pain-extraction.json`.

## 2. Candidate courses (code)

Read all course frontmatter. Candidates:

| Stage        | Rule                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `foundation` | `ai-assistants-101` and `safe-ai-at-work`. Mark `ai-assistants-101` as **skippable** if `placement_quiz_correct` is 3.                                                                                                                                                                                                                                                                                                                                  |
| `tools`      | `microsoft-365-copilot` if the office suite is Microsoft 365; `gemini-in-google-workspace` if Google Workspace; `chatgpt-for-work` if the AI tool is ChatGPT. If none of these applies (suite "other" and AI tool other than ChatGPT, including "none"), use `chatgpt-for-work` so the tools stage is never empty. Other AI tools (Claude, Gemini, Copilot) do not add a course on their own. `ai-in-office-tools` is never a candidate (catalog only). |
| `role`       | stage `role` courses whose `recommended_for` contains the role. Role `general` has no role course.                                                                                                                                                                                                                                                                                                                                                      |
| `advanced`   | all stage `advanced` courses whose `recommended_for` contains the role (or `general`).                                                                                                                                                                                                                                                                                                                                                                  |

**Order inside a stage:** foundation = `ai-assistants-101`, then `safe-ai-at-work`; tools = suite course, then `chatgpt-for-work`.

Also compute for each candidate: `pain_overlap` = sum of the person's hours for pains in the course's `pains`.

## 3. Plan (AI)

Prompt the model with: the profile (role, tools, level, goals, ranked pains with hours, the person's own words), the candidate list (id, title, stage, description, pains, prerequisites, `pain_overlap`, lessons with titles and goals), and these rules:

- Foundation first, then tools, then role, then advanced.
- Keep every foundation, tools and role candidate (skippable `ai-assistants-101` may be dropped).
- Order advanced courses by `pain_overlap`, highest first (prerequisites always before the course that needs them). Drop an advanced course only if its `pain_overlap` is 0. Always keep at least one: if every advanced course has 0 overlap, keep `automate-your-routine`. If `automate-your-routine` is dropped, `ai-agents-at-work` is dropped too (it is a prerequisite).
- `why`: one sentence, max 200 characters, that refers to what **this** person said (a routine, the hours, their role or tool). No generic text.
- `focus_lessons`: 1–3 lesson ids from that course that match their pains best.
- `expected_minutes_saved_per_week`: a realistic estimate for this person.

Structured output (JSON schema; `course_id` is an enum of candidate ids):

```json
{
  "steps": [
    {
      "course_id": "automate-your-routine",
      "why": "Your Friday report takes about 4 hours; this course shows you how to automate collecting it.",
      "focus_lessons": ["automate-your-routine-l3"],
      "expected_minutes_saved_per_week": 90
    }
  ],
  "first_week_goal": "Finish AI Assistants 101 and draft your next client email with AI in under 10 minutes."
}
```

## 4. Validate (code)

A plan is valid when:

1. Every `course_id` is a candidate; no duplicates.
2. Every course's `prerequisites` are completed or appear earlier in `steps`.
3. Stages never go backwards (foundation → tools → role → advanced).
4. All non-skippable foundation, tools and role candidates are present.
5. Every `focus_lessons` id belongs to its course.
6. `expected_minutes_saved_per_week` is clamped to `0 … course.minutes_saved_per_week`, and to the person's hours in the course's pains × 60 (if that is 0, cap at 30 minutes instead).

If invalid: call the model **once more**, passing the list of violations. Still invalid → **fallback plan**: candidates in stage order, advanced sorted by `pain_overlap` (prerequisites first), `focus_lessons` = first lesson, `why` from a template ("Covers your {pain} routine, about {hours} h a week."). Save `source: "ai" | "ai-retry" | "fallback"` with the roadmap and log it; the fallback rate is a metric for the Evals slide.

## 5. Replan (AI, after each journal entry)

Input: current roadmap, completed courses and lessons, the latest journal entries (scores, weak skills, recommendations), and the updated chaos map if the person re-ran it.

The model may:

- insert a **refresh** step: `{ "type": "refresh", "lesson_ids": [...], "why": "..." }` (a 3-minute review of exercises the person got wrong);
- reorder the remaining courses;
- after the last course, propose the next stage: remaining advanced courses, or a new roadmap built from the updated chaos map.

The same validation applies (refresh steps may only reference completed lessons). This is what keeps people learning after the first roadmap: see `docs/spec.md` → Retention.

## Storage

`roadmaps`: `user_id`, `version` (increments on each replan), `steps` (JSON), `first_week_goal`, `source`, `created_at`. The frontend always shows the latest version.

## Evals

`evals/roadmap-personas.json`: 15 personas with expectations. Checks are listed in `evals/README.md`. Report on the slide: "15/15 valid plans, N/15 covered top pains in the first 5 courses, fallback used X times".
