---
id: ai-assistants-101
title: AI Assistants 101
track: general
level: beginner
description: Use an AI assistant for everyday office tasks, write clear prompts, refine the results and check them before you rely on them.
skills: [ai-limits, prompt-structure, iteration, verification]
certificate: AI Assistants Essentials
minutes_saved_per_week: 60
---

# AI Assistants 101

## Lesson 1: Know what to trust and what to check

```yaml lesson
id: ai-assistants-101-l1
duration_min: 5
skills: [ai-limits]
goal: Decide which AI answers you can use as they are and which facts you must check first.
```

### Card: What assistants do well

ChatGPT, Claude and Gemini are strong with language. They draft emails, summarize documents, change the tone of a text and suggest report structures. Given text to work with, they usually produce a solid first draft.

### Card: Where they fail

An assistant predicts likely words. It can state a wrong date, a fake source or an invented policy with full confidence. This is called a **hallucination**. Even when it searches the web, it can misread what it finds. Its knowledge can also be out of date.

### Card: Check what matters

Ask: what happens if this is wrong? A friendly tone is low risk. A deadline, figure or legal reference in a client email is high risk, so check it at the source. Do not paste confidential or personal data into a personal or public AI tool. Use only tools your company approves.

### Exercise

```yaml exercise
id: ai-assistants-101-l1-e1
type: single_select
skill: ai-limits
question: An assistant gives a precise market growth figure for your client report. What do you do?
options:
  - "Use it, because a precise number sounds reliable."
  - "Ask the assistant if it is sure, and use it if it says yes."
  - "Find the figure in the original source first."
  - "Round the number so a small error will not matter."
answer: 2
explanation: Assistants sound certain even when wrong. Asking again is not a check.
hint: Where would a trustworthy number be published?
```

### Exercise

```yaml exercise
id: ai-assistants-101-l1-e2
type: multi_select
skill: ai-limits
question: Select all that apply. Which tasks suit an assistant as a first draft?
options:
  - "Rewriting a rough update more politely."
  - "Summarizing meeting notes you paste in."
  - "Stating the current legal deadline for a filing."
  - "Suggesting an outline for a training guide."
answers: [0, 1, 3]
explanation: These tasks use text you provide or structure, and you can judge the result yourself. A legal deadline is a fact you must verify.
hint: Look for tasks where you can judge the result yourself.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l1-e3
type: true_false
skill: ai-limits
question: Swipe right if true, left if false.
cards:
  - statement: An assistant can invent a source that does not exist.
    answer: true
    explanation: Fake references are a common hallucination. Open every source it cites.
  - statement: A confident tone means the answer is correct.
    answer: false
    explanation: The tone is the same whether it is right or wrong.
  - statement: An assistant's knowledge can be out of date.
    answer: true
    explanation: It may miss recent changes, so check anything time-sensitive.
hint: Ask whether the claim would still hold if the assistant were guessing.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l1-e4
type: single_select
skill: ai-limits
question: Which line in an AI-written client email needs your check most?
options:
  - "Thank you for your patience."
  - "Your contract renews on 14 March at the agreed rate."
  - "Please let me know if you have questions."
  - "I look forward to your reply."
answer: 1
explanation: A date and a rate are facts with consequences. The other lines are polite phrases.
hint: Which line could cause a problem if wrong?
```

### Exercise

```yaml exercise
id: ai-assistants-101-l1-e5
type: fill_blank
skill: ai-limits
question: Pick the phrase that makes this prompt safest.
prompt: "Draft a reminder to a customer about an overdue invoice. ___"
options:
  - "Here is their full name, address and account number."
  - "Use the placeholders [Name] and [Amount]; I will fill them in."
  - "Look up what they owe in your records."
answer: 1
explanation: Placeholders keep personal data out of the tool. You add the real details yourself.
hint: What can you leave out of the prompt and add later?
```

### Practice

```yaml practice
id: ai-assistants-101-l1-practice
skill: ai-limits
instructions: Ask your assistant to help with a real task, then list which parts of its answer you would check and why.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that asks for a first draft of a text related to this pain, without any confidential data.
  Then name two facts or claims in a likely answer that you would verify, and where you would check each one.
default_context: You are an office coordinator who must write a short update for a client about a delayed delivery.
rubric:
  - criterion: Asks for a draft
    description: The prompt requests a clear draft or summary, not final facts.
  - criterion: Protects data
    description: The prompt uses placeholders or general wording instead of private details.
  - criterion: Names checks
    description: The learner lists specific claims to verify and a real source for each.
example_good_prompt: Draft a short, polite update to a client about a delayed delivery. Use [Client] and [New date] as placeholders. Afterwards I will check the new date with our logistics team and the refund terms against the signed contract.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners trust a precise number or citation. Steer them to ask where it would be confirmed.
  - Learners paste real names or figures. Show placeholders and ask what their company allows.
key_points:
  - Assistants predict text, so they can sound sure and be wrong.
  - Check anything where an error has consequences.
  - Keep confidential data out of public tools.
follow_up_tasks:
  - Take a short AI-written paragraph and mark every fact that needs a source.
```

## Lesson 2: Write a prompt that gets a usable draft

```yaml lesson
id: ai-assistants-101-l2
duration_min: 5
skills: [prompt-structure]
goal: Write a prompt with role, context, task, format and constraints.
```

### Card: Five parts of a prompt

A strong prompt answers five questions. **Role:** who should the assistant act as? **Context:** what is the situation and who reads it? **Task:** what exactly should it do? **Format:** what should the result look like? **Constraints:** what tone, length or facts apply?

### Card: Example

Weak: "Write an email about the late report."

Better: "You are a project manager. A colleague's report is two days late and the client meeting is Friday. Write an email asking for it by Thursday noon. Keep it under 80 words, friendly but clear. No blame."

### Card: Why it works

The assistant cannot read your mind. Every missing detail becomes a guess, and guesses sound generic. You do not need all five parts every time. Add the ones that change the result, and always state the format and any facts it must use.

### Exercise

```yaml exercise
id: ai-assistants-101-l2-e1
type: single_select
skill: prompt-structure
question: Which prompt is most likely to give a usable result?
options:
  - "Write a message to the team about the new schedule."
  - "Write a good message about the schedule, make it professional."
  - "Write a 4-sentence message to my team about the new Monday 9:00 stand-up. Friendly tone, ask them to confirm by Friday."
  - "Team message, schedule, short."
answer: 2
explanation: It names the audience, task, length, tone and the action required. The others leave the assistant to guess.
hint: Count how many details each prompt gives.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l2-e2
type: multi_select
skill: prompt-structure
question: Select all that apply. Which are parts of a well-built prompt?
options:
  - "Role"
  - "Context"
  - "Output format"
  - "Real names and personal details of everyone involved"
answers: [0, 1, 2]
explanation: Role, context and format shape the answer. Personal details are not needed and should stay out of the prompt.
hint: Choose what shapes the answer without adding risk.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l2-e3
type: fill_blank
skill: prompt-structure
question: Pick the phrase that adds a useful output format.
prompt: "Summarize these meeting notes for my manager. ___ Use plain language."
options:
  - "Make it great."
  - "Give 3 bullet points, then one line on decisions we still need."
  - "Do it quickly."
answer: 1
explanation: It tells the assistant the structure and length, so the summary is easy to scan.
hint: Which option describes what the result looks like?
```

### Exercise

```yaml exercise
id: ai-assistants-101-l2-e4
type: true_false
skill: prompt-structure
question: Swipe right if true, left if false.
cards:
  - statement: Telling the assistant who will read the text helps it choose the right tone.
    answer: true
    explanation: Audience is context. A note to a client reads differently from one to a teammate.
  - statement: A longer prompt is always a better prompt.
    answer: false
    explanation: Only details that change the result help. Padding adds noise.
  - statement: Asking for a specific length helps you get a usable draft.
    answer: true
    explanation: A length limit stops long, vague answers.
  - statement: If you skip the facts, the assistant will use your real data.
    answer: false
    explanation: It cannot see your files unless you provide the content, so it will guess.
hint: Ask whether the detail gives the assistant something to work with.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l2-e5
type: single_select
skill: prompt-structure
question: Which constraint best protects a customer email from errors?
options:
  - "Use these details only: refund of the amount below, 5 working days. Do not promise anything else."
  - "Be accurate."
  - "Sound smart."
  - "Add more details to make it convincing."
answer: 0
explanation: Giving the facts and limiting what it may add keeps invented promises out of your email.
hint: Look for the option that limits what the assistant may invent.
```

### Practice

```yaml practice
id: ai-assistants-101-l2-practice
skill: prompt-structure
instructions: Write one prompt for a real task that includes role, context, task, format and constraints.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that helps with this, using role, context, task, output format and at least one constraint.
  Do not include confidential data.
default_context: You are an office manager who must write a message asking staff to submit expense reports by month end.
rubric:
  - criterion: Sets role and context
    description: States who the assistant is, the situation and the reader.
  - criterion: Specifies the output
    description: Asks for a format, length or structure.
  - criterion: Sets constraints
    description: Gives tone, facts to include or things to avoid, without private data.
example_good_prompt: You are an office manager. Staff must submit expense reports by 30 June. Write a friendly email of 80 words or fewer, with a clear subject line, that explains the deadline and where to send reports. Use [Name] as a placeholder. Do not mention penalties.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Prompts that say only "write an email". Ask who reads it and what they should do.
  - Skipping the format. Ask what the result should look like.
key_points:
  - Role, context, task, format and constraints remove guesswork.
  - Always state the facts it must use.
  - Keep personal data out.
follow_up_tasks:
  - Rewrite the weak prompt "summarize this report" using all five parts.
```

## Lesson 3: Improve the answer instead of starting over

```yaml lesson
id: ai-assistants-101-l3
duration_min: 5
skills: [iteration, verification]
goal: Refine an AI draft with follow-up prompts and ask it to critique its own answer.
```

### Card: Follow up, don't restart

The first answer is a draft. If something is off, say what to change. "Shorter, and lead with the deadline." The assistant keeps the conversation, so you keep what worked. Starting over throws away the context you built.

### Card: One change at a time

Name the problem, then the fix. "The tone is too formal. Rewrite it as if talking to a colleague I know well." Specific feedback works. "Make it better" does not, because the assistant has to guess what better means to you.

### Card: Ask for a critique

Ask: "Review your answer. What could be wrong, unclear or missing?" This often finds gaps. It is not proof. The assistant can miss its own mistakes, so you still check key facts. Stop when the draft meets your goal.

### Exercise

```yaml exercise
id: ai-assistants-101-l3-e1
type: single_select
skill: iteration
question: The assistant's summary is accurate but too long. What is the best next step?
options:
  - "Open a new chat and write the original prompt again."
  - "Reply: Cut this to 5 bullet points, keep the dates."
  - "Reply: Make it better."
  - "Write the summary yourself."
answer: 1
explanation: A specific follow-up keeps what is good and changes only the length and format.
hint: Pick the reply that names exactly what to change.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l3-e2
type: fill_blank
skill: verification
question: Pick the follow-up that asks for a useful self-check.
prompt: "Here is your draft of the client proposal. ___"
options:
  - "Are you sure?"
  - "List any claims that might be wrong or need a source, and anything missing for a first-time client."
  - "Rewrite the whole proposal from scratch."
answer: 1
explanation: A clear request for risks and gaps gives you a list of things to check.
hint: Which option asks for something concrete you can act on?
```

### Exercise

```yaml exercise
id: ai-assistants-101-l3-e3
type: multi_select
skill: iteration
question: Select all that apply. Which follow-ups are specific enough to improve a draft?
options:
  - "Make the opening shorter and mention the deadline first."
  - "Change the tone to friendly, but keep the figures."
  - "Do it again."
  - "Add one sentence thanking them for the quick reply."
answers: [0, 1, 3]
explanation: Each one names a change. "Do it again" gives no direction.
hint: Look for the replies that say what to change.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l3-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: If the assistant reviews its own answer and finds nothing wrong, you can skip checking.
    answer: false
    explanation: It can miss its own errors. Verify key facts yourself.
  - statement: You can keep a good draft and ask to change just one part.
    answer: true
    explanation: Follow-ups let you adjust a single part without losing the rest.
  - statement: Starting a fresh chat is always better than a follow-up.
    answer: false
    explanation: A fresh chat loses the context. Restart only if the conversation is off track.
  - statement: You should stop when the draft meets your goal.
    answer: true
    explanation: More rounds can make text worse or longer without helping.
hint: Think about what keeps the useful context and what still needs your judgment.
```

### Exercise

```yaml exercise
id: ai-assistants-101-l3-e5
type: single_select
skill: iteration
question: After three rounds your email is clear, polite and correct. What next?
options:
  - "Keep asking for small tweaks until it feels perfect."
  - "Check the facts, make final edits yourself and send it."
  - "Start again to compare."
  - "Ask the assistant to approve it."
answer: 1
explanation: When it meets the goal, stop. Your final check on facts and names is what makes it safe to send.
hint: Who is responsible for what goes out under your name?
```

### Practice

```yaml practice
id: ai-assistants-101-l3-practice
skill: iteration
instructions: Write two follow-up prompts that improve a first AI draft, and one that asks the assistant to critique it.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  {{tool}} gave you a first draft of a message about this pain. It is too long and too formal.
  Write two specific follow-up prompts to fix this, then one prompt asking the assistant to point out risks or gaps.
default_context: An assistant drafted a 300-word email to a client about a schedule change. It is too long and too formal.
rubric:
  - criterion: Specific follow-ups
    description: Each follow-up names a clear change such as length, tone or structure.
  - criterion: Keeps what works
    description: Follow-ups build on the draft and do not ask to restart.
  - criterion: Asks for a critique
    description: One prompt asks for risks, gaps or unsupported claims, and the learner plans to check facts.
example_good_prompt: "1) Cut this to 100 words and lead with the new date. 2) Make the tone friendly, like writing to a colleague, and keep the figures. 3) Review the draft: which claims could be wrong, and what would a client want to know that is missing? I will then check the figures myself."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Replies like "make it better". Ask what exactly should change.
  - Treating the self-critique as proof. Remind them to verify facts.
key_points:
  - Refine with specific follow-ups.
  - A self-critique finds gaps but does not replace checking.
  - Stop when the draft meets the goal.
follow_up_tasks:
  - Take one draft and improve it in two rounds, one change per round.
```
