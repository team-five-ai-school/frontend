# Course file format

One course = one Markdown file in `content/courses/<course-id>.md`. Human-readable Markdown for theory, fenced `yaml` blocks for everything a program must read exactly (exercises, practice, mentor notes). Frontend and backend parse the same files.

Language: **English**. Audience: office workers without a technical background.

## Lesson budget

Lessons are short and dense. A lesson takes **4–6 minutes**.

| Part         | Rule                                                                                  |
| ------------ | ------------------------------------------------------------------------------------- |
| Theory cards | 3–4 cards, **max 70 words each**, one idea per card, one concrete example per lesson  |
| Exercises    | 5–6 per lesson, **all 4 types at least once**, each tests something a card taught     |
| Practice     | exactly 1, personalized from the user's onboarding answers                            |
| Mentor notes | exactly 1 block                                                                       |
| Total        | **350–450 words** of learner-facing text (cards + questions + options + explanations) |

## File structure

````markdown
---
id: ai-assistants-101 # kebab-case, unique, = file name
title: AI Assistants 101
track: general # general | marketing | hr | teachers | lawyers | small-business
level: beginner # beginner | intermediate
description: One sentence on what the learner can do after the course.
skills: [prompt-structure, verification, iteration] # kebab-case skill tags used in the journal
certificate: AI Assistants Essentials # name printed on the course certificate
minutes_saved_per_week: 60 # estimated routine time saved after the course, used for the before/after metric
---

# AI Assistants 101

## Lesson 1: Short, concrete lesson title

```yaml lesson
id: ai-assistants-101-l1 # <course-id>-l<n>
duration_min: 5
skills: [prompt-structure] # subset of the course skills
goal: One sentence, starting with a verb, of what the learner can do after this lesson.
```

### Card: Card title

Markdown text, max 70 words. Short paragraphs, **bold** sparingly, lists allowed. No images.

### Card: Another card

...

### Exercise

```yaml exercise
id: ai-assistants-101-l1-e1 # <lesson-id>-e<n>
type: single_select
skill: prompt-structure
question: Which prompt gives the assistant the most useful context?
options:
  - "Write an email."
  - "Write a 3-sentence email to a client who missed a payment. Polite, firm, include the due date."
  - "Email please, make it good."
answer: 1 # zero-based index of the correct option
explanation: Shown after answering. Why the answer is right, in 1–2 sentences.
hint: Mentor hint shown on request. Points in the right direction, never names the answer.
```

### Practice

```yaml practice
id: ai-assistants-101-l1-practice
skill: prompt-structure
instructions: What the learner does, in 1–2 sentences.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt that ...
default_context: Fallback used when the user's profile has no matching pain (a realistic office scenario).
rubric:
  - criterion: Gives context
    description: States who the audience is and what the situation is.
  - criterion: Specifies the output
    description: Asks for a format, length or structure.
  - criterion: Sets constraints
    description: Tone, things to avoid, or facts to include.
example_good_prompt: A strong answer for this task, used by the grader as a reference.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Mistake learners make in this lesson, and how to steer them.
key_points:
  - The 2–3 ideas the mentor should reinforce.
follow_up_tasks:
  - Extra mini-task the mentor can give when the learner got exercises wrong.
```

## Lesson 2: ...
````

## Exercise types

Exactly these four. Field names are fixed.

### `single_select`

One correct option out of 3–4.

```yaml exercise
id: ...
type: single_select
skill: ...
question: ...
options: [..., ..., ...]
answer: 2
explanation: ...
hint: ...
```

### `multi_select`

Two or more correct options out of 4–5. The question says "Select all that apply".

```yaml exercise
id: ...
type: multi_select
skill: ...
question: Select all that apply. ...
options: [..., ..., ..., ...]
answers: [0, 2] # zero-based indexes, at least 2
explanation: ...
hint: ...
```

### `fill_blank`

A prompt with exactly one gap `___`. The learner picks the phrase that makes the prompt work best.

```yaml exercise
id: ...
type: fill_blank
skill: ...
question: Pick the phrase that makes this prompt most effective.
prompt: "Summarize the attached report for my manager. ___ Use plain language."
options:
  - "Make it nice."
  - "Keep it under 5 bullet points, lead with the decision she needs to make."
  - "Use AI."
answer: 1
explanation: ...
hint: ...
```

### `true_false`

A deck of 3–5 swipeable statements. Each card has its own answer and explanation.

```yaml exercise
id: ...
type: true_false
skill: ...
question: Swipe right if true, left if false.
cards:
  - statement: AI assistants can state wrong facts with full confidence.
    answer: true
    explanation: This is called a hallucination; always check facts that matter.
  - statement: ...
    answer: false
    explanation: ...
hint: ...
```

## Personalization placeholders (practice)

`task_template` may use only these placeholders, filled from the onboarding profile:

| Placeholder | Example value                                               |
| ----------- | ----------------------------------------------------------- |
| `{{role}}`  | HR manager                                                  |
| `{{pain}}`  | answering the same candidate questions every day            |
| `{{tool}}`  | ChatGPT (the AI tool the user said they use or plan to use) |

## Content rules

- **Accurate and durable.** Name tools generically (ChatGPT, Claude, Gemini, Microsoft 365 Copilot, Gemini in Google Workspace). Do not state version numbers, prices, limits or release dates: they go stale.
- **Safety by default.** Every course teaches checking AI output and not pasting confidential or personal data into public tools. Lawyers: AI drafts and summarizes, the lawyer decides; never present AI output as legal advice. HR: bias and candidate privacy. Teachers: student privacy and academic integrity. Small business: AI helps organize numbers, it does not give financial advice.
- **Concrete over abstract.** Every card is about a real office task. No history of AI, no hype, no filler ("revolutionary", "game-changer", "unlock").
- **Exercises test understanding, not trivia.** Wrong options are plausible mistakes a real person makes, not jokes.
- **Plain language.** Short sentences, second person ("you"), no em-dash chains.
