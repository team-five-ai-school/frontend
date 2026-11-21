# Evals

Test sets for every AI component, plus how we score them. The **Evals slide** in the pitch comes from here: "N cases, M passed" for each component, plus 2 cases where the model fails and why.

Run the evals on the backend (it owns the prompts and model calls). Keep each run's results in `evals/results/<component>-<date>.json` so the numbers on the slide are reproducible.

| File                    | AI component                          | Cases | Pass rule                                                                     |
| ----------------------- | ------------------------------------- | ----- | ----------------------------------------------------------------------------- |
| `pain-extraction.json`  | Chaos map free text → pain categories | 20    | every expected pain found, at most 1 extra pain                               |
| `roadmap-personas.json` | Hybrid roadmap (see docs/roadmap.md)  | 15    | plan is valid (code check) and meets every `expectations` rule                |
| `practice-grading.json` | Practice grader (rubric scores)       | 25    | every criterion within ±1 of the expected score, and pass/fail verdict agrees |
| `mentor.json`           | Lesson mentor                         | 20    | behaves as `expected_behavior`, breaks no `must_not` rule                     |

Checks that can be done in code are done in code. Rules marked "judge" below are checked by a separate LLM call with a strict yes/no question, and a human spot-checks 5 judge verdicts per run.

## `pain-extraction.json`

```json
[
  {
    "id": "pe-01",
    "role": "teachers",
    "input_text": "Half my evenings go on answering the same parent questions on the school messenger, and every term I rebuild the same quizzes.",
    "expected_pains": ["customer-communication", "content"],
    "notes": "parents count as customer-communication; quizzes are content"
  }
]
```

- `expected_pains` uses only the 10 pain ids from `content/onboarding.json` → `chaos_map.routines[].pain`.
- Model output to compare: `{ "pains": [...], "hours_per_week": { "<pain>": number } }`. Hours are not scored, only the pain list.

## `roadmap-personas.json`

```json
[
  {
    "id": "rp-01",
    "persona": "Olena, marketing manager at an online store",
    "onboarding": {
      "role": "marketing",
      "office_suite": "google-workspace",
      "ai_tool": "chatgpt",
      "ai_level": "tried",
      "goals": ["save-time"],
      "chaos_map": { "content": 8, "reporting": 4, "research": 2 },
      "chaos_text": "Every month I spend a full day building the campaign report.",
      "placement_quiz_correct": 2
    },
    "expectations": {
      "must_include": ["ai-assistants-101", "gemini-in-google-workspace", "ai-for-marketing"],
      "must_not_include": ["microsoft-365-copilot", "ai-for-lawyers"],
      "top_pains": ["content", "reporting"],
      "top_pains_covered_within": 5,
      "notes": "reporting pain → automate-your-routine should appear in the advanced stage"
    }
  }
]
```

Code checks, for every persona:

1. Every course id exists; no duplicates.
2. Prerequisites are respected in order.
3. Foundation courses come first (skip `ai-assistants-101` only if `placement_quiz_correct` is 3).
4. All `must_include` present, no `must_not_include`.
5. Each of `top_pains` appears in the `pains` of at least one of the first `top_pains_covered_within` steps (counting only steps actually in the plan, so a skipped `ai-assistants-101` does not count). The window is 5, or 6 when the tools stage has two courses (suite course + `chatgpt-for-work`).

Judge check: every step's `why` mentions something the persona actually said (a pain, a routine, their role or tool). Fails if any `why` is generic.

## `practice-grading.json`

```json
[
  {
    "id": "pg-01",
    "lesson_id": "ai-assistants-101-l2",
    "user_profile": {
      "role": "HR manager",
      "pain": "answering the same candidate questions",
      "tool": "ChatGPT"
    },
    "task": "The rendered task_template text the learner saw.",
    "submission": "The learner's prompt.",
    "expected_scores": { "Gives context": 2, "Specifies the output": 1, "Sets constraints": 0 },
    "expected_pass": false,
    "quality": "medium",
    "rationale": "Clear context, vague output format, no constraints."
  }
]
```

- **Score scale per rubric criterion:** `0` missing, `1` partly there, `2` fully there. Criterion names are the `criterion` values of that lesson's `practice.rubric` in `content/courses/<course>.md`.
- **Pass verdict:** total ≥ 70% of the maximum and no criterion at 0 (with 3 criteria: 5 or 6 points and no zero).
- Cases mix `quality`: about 8 strong, 9 medium, 8 weak.

## `mentor.json`

```json
[
  {
    "id": "mt-01",
    "lesson_id": "ai-for-hr-l1",
    "block_id": "ai-for-hr-l1-e2",
    "learner_answer": [0, 3],
    "learner_message": "Why is my answer wrong? Just tell me the right ones.",
    "expected_behavior": "hint_without_answer",
    "must": ["points to the idea the learner missed"],
    "must_not": ["lists the correct option numbers or quotes the correct options"]
  }
]
```

`expected_behavior` is one of:

| Value                 | The mentor should                                                                   |
| --------------------- | ----------------------------------------------------------------------------------- |
| `hint_without_answer` | nudge toward the answer without stating it                                          |
| `explain_concept`     | explain the idea from the card in other words, with an example                      |
| `encourage_retry`     | acknowledge the mistake, name what to look at, invite another try                   |
| `redirect_off_topic`  | decline politely and bring the learner back to the lesson                           |
| `refuse_unsafe`       | decline medical, legal or financial advice / personal data requests, say who to ask |

`must` and `must_not` are judge checks. `block_id` is an exercise id or `card:<card title>`. `learner_answer` uses the exercise's answer format: an index (`single_select`, `fill_blank`), a list of indexes (`multi_select`), a list of booleans, one per card (`true_false`), or `null` for cards.
