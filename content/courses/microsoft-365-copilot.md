---
id: microsoft-365-copilot
title: Microsoft 365 Copilot at Work
track: general
level: beginner
description: Use Microsoft 365 Copilot to catch up on email and meetings, draft documents and presentations from your own files, and work with spreadsheet data, while checking every result.
skills: [thread-summarizing, source-grounded-drafting, audience-rewriting, formula-assistance, data-spot-checking, verification]
certificate: Microsoft 365 Copilot Essentials
minutes_saved_per_week: 75
stage: tools
tools: [microsoft-365]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [email, documents, data, meetings, content]
prerequisites: [ai-assistants-101]
---

# Microsoft 365 Copilot at Work

## Lesson 1: Outlook and Teams: catch up fast

```yaml lesson
id: microsoft-365-copilot-l1
duration_min: 5
skills: [thread-summarizing, verification]
goal: Summarize long email threads and chats, draft replies in your tone, and verify names, dates and commitments before acting.
```

### Card: What Copilot sees

Microsoft 365 Copilot works with your own mail, chats, meetings and files, within the access you already have. What you can use depends on your company's license and settings. Ask IT what is switched on.

### Card: Summarize with a purpose

After leave or a missed meeting, ask a specific question: "What was decided, what is open, and what is assigned to me?" This beats "summarize". Name the thread, chat or meeting so Copilot looks in the right place. Meeting summaries need the meeting to have been transcribed, which your organization controls.

### Card: Draft in your voice, then check

Ask for a reply and describe your tone: "short, friendly, no jargon". Give the decision you want to communicate. Before sending, compare names, dates and promises against the original messages. A reply can commit you to something you never agreed to.

### Exercise

```yaml exercise
id: microsoft-365-copilot-l1-e1
type: single_select
skill: thread-summarizing
question: You return from two weeks off and face a 60-message project thread. Which request is most useful?
options:
  - "Summarize this thread."
  - "List the decisions made, the questions still open, and anything assigned to me, with who said it."
  - "Tell me what matters."
answer: 1
explanation: A specific question gives you decisions, open items and your own tasks, with names you can check.
hint: Which request tells Copilot what you will do with the answer?
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l1-e2
type: multi_select
skill: verification
question: Select all that apply. Copilot drafted your reply to a client thread. What do you check before sending?
options:
  - The delivery date it mentions
  - Whether the tone matches how you write
  - Any promise made on your behalf
  - Whether the draft is longer than the original
answers: [0, 1, 2]
explanation: Dates, tone and promises can all be wrong. Length matters little next to commitments in your name.
hint: Think about what the client could hold you to.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l1-e3
type: fill_blank
skill: thread-summarizing
question: Pick the phrase that makes this catch-up request work.
prompt: "Summarize the Teams meeting I missed on Tuesday. ___ Quote the person who said it."
options:
  - "Make it interesting."
  - "List only decisions and action items with owners and due dates."
  - "Be brief."
answer: 1
explanation: Decisions, owners and dates are what you act on, and quotes let you verify them.
hint: Choose the instruction that names the output you need.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l1-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: A meeting summary can attribute a task to the wrong person.
    answer: true
    explanation: Summaries can mix up speakers. Check owners before you act.
  - statement: If Copilot summarizes a thread, you no longer need to read the last message.
    answer: false
    explanation: The latest message may change a decision. Read it yourself.
  - statement: Copilot can only use what you have access to.
    answer: true
    explanation: It works within your permissions, so ask IT what is enabled for you.
hint: Ask what could be lost when a long conversation is shortened.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l1-e5
type: single_select
skill: verification
question: The summary says "the budget was approved by Dana for 20 March". What is your best next step?
options:
  - Add it to your plan, since a summary is reliable.
  - Ask Copilot to confirm it is right.
  - Open the original message or recording and check who approved it and when.
answer: 2
explanation: Asking the same tool to confirm adds little. The source settles it.
hint: Where did the sentence originally come from?
```

### Practice

```yaml practice
id: microsoft-365-copilot-l1-practice
skill: thread-summarizing
instructions: Write the request you would give Copilot to catch you up on a thread or meeting, and say how you would verify the answer. Use made-up details.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a request asking Copilot to summarize a long email thread or a missed
  meeting related to this. Say what you want back (decisions, open questions,
  your tasks), and name one detail you would check in the original before acting.
default_context: You were away for a week and need to catch up on a long email thread about a client event with several open decisions.
rubric:
  - criterion: Names the source
    description: Says which thread, chat or meeting should be summarized.
  - criterion: Asks for a useful output
    description: Requests decisions, open questions, owners or deadlines instead of a general summary.
  - criterion: Plans a check
    description: Names a concrete detail to verify in the original before acting.
example_good_prompt: "Summarize the email thread 'Spring client event' from the last two weeks. List decisions made, open questions, and anything assigned to me, with who said it. I will check the venue date and the budget figure in the original messages before replying."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask for "a summary" with no goal. Ask what they will do with it.
  - Learners send drafted replies unchecked. Have them find every date and promise in the draft.
  - Learners assume Copilot sees everything. Remind them it depends on access and company settings.
key_points:
  - Ask for decisions, open items and your tasks.
  - Describe your tone when drafting replies.
  - Verify names, dates and commitments in the source.
follow_up_tasks:
  - Summarize one thread you know well and mark every fact the summary got wrong or left out.
```

## Lesson 2: Word and PowerPoint: draft, rewrite, present

```yaml lesson
id: microsoft-365-copilot-l2
duration_min: 5
skills: [source-grounded-drafting, audience-rewriting, verification]
goal: Draft from your own files, rewrite for an audience, turn a document into a presentation outline, and take ownership of the final version.
```

### Card: Draft from your own files

Point Copilot at the files that hold the facts: last year's report, a policy, meeting notes. Ask it to use only those sources and to mark gaps. Copilot only reads files you can open, but what you share can reveal their content to people who cannot.

### Card: Rewrite for the reader

One document often needs several versions. Ask for the same content rewritten for a manager, a client or a new colleague, with a length limit. Say what must stay unchanged, such as figures, names and deadlines.

### Card: From document to outline

Ask for an outline before slides: audience, one key message, five or six sections. Fix the structure, then ask for slides. Copilot's draft is a starting point. You own the final version, so read every slide aloud once.

### Exercise

```yaml exercise
id: microsoft-365-copilot-l2-e1
type: single_select
skill: source-grounded-drafting
question: You need a project status report. Which request keeps the draft closest to the facts?
options:
  - "Write a status report on our project."
  - "Draft a status report using only the attached plan and meeting notes. Mark missing information as [gap]."
  - "Write an impressive status report."
answer: 1
explanation: Limiting the sources and marking gaps keeps invented details visible.
hint: Think about how you could tell what Copilot made up.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l2-e2
type: multi_select
skill: verification
question: Select all that apply. Copilot drafted a team update from files in several folders. What do you check before sending?
options:
  - Whether it quotes details from files some recipients cannot open
  - Whether it includes confidential items, such as salaries or client data
  - Whether every figure matches its source file
  - Whether Copilot used files you cannot open
answers: [0, 1, 2]
explanation: Copilot only uses files you can open, but your update can pass their content on.
hint: Who will read the update, and what can they already see?
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l2-e3
type: fill_blank
skill: audience-rewriting
question: Pick the phrase that best completes this request.
prompt: "Rewrite this process document for a colleague on their first day. ___ Keep every step and deadline unchanged."
options:
  - "Make it friendly."
  - "Explain each abbreviation and give the steps as a numbered list, one sentence each."
  - "Make it simpler."
answer: 1
explanation: Concrete rewrite instructions fit the reader. Fixed steps and deadlines keep the facts safe.
hint: Look for the option you could count when you read the result.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l2-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: A draft from Copilot is ready to send as soon as it looks well written.
    answer: false
    explanation: Fluent text can still contain wrong figures or claims. Check it against your sources.
  - statement: It is easier to fix a presentation's structure after Copilot has made all the slides.
    answer: false
    explanation: Changing an outline is cheap. Reworking finished slides is not.
  - statement: If your name is on the document, you are responsible for what it says.
    answer: true
    explanation: The tool drafts, you decide. Responsibility stays with you.
hint: Think about who answers questions about the document later.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l2-e5
type: single_select
skill: verification
question: Copilot's slide says "Training completion reached 94%", but your source file says 84%. What do you do?
options:
  - Keep it, since Copilot read your files.
  - Correct it from the file, then check the other figures on that slide too.
  - Ask Copilot whether it is sure.
answer: 1
explanation: One wrong figure suggests others. Fix it from the source and check the rest.
hint: What is the source of this number?
```

### Practice

```yaml practice
id: microsoft-365-copilot-l2-practice
skill: source-grounded-drafting
instructions: Write the request you would give Copilot to draft a document or presentation outline from your own files. Use made-up file names and details.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a request asking Copilot to draft a document, or turn a document into a
  presentation outline, related to this. Name the source files, the audience,
  the length, and what Copilot should do about missing facts.
default_context: You must turn a 12-page process document into a one-page guide for new starters, using only what the document says.
rubric:
  - criterion: Names the sources
    description: Says which files or notes the draft must be based on.
  - criterion: Defines audience and format
    description: States who reads it and asks for a length, outline or structure.
  - criterion: Controls invention
    description: Tells Copilot to use only the sources and mark gaps, and says what you will check.
example_good_prompt: "Using only the file 'Onboarding process', draft a one-page guide for new starters. Plain language, numbered steps, keep every deadline as written, and mark anything unclear as [gap]. I will check each deadline against the document."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask for a full deck at once. Steer them to an outline first.
  - Learners skip naming the source files. Ask where the facts should come from.
  - Learners polish the style and skip fact-checking. Have them trace two claims to the source.
key_points:
  - Draft from named sources and mark gaps.
  - Say who reads it and what must stay unchanged.
  - You own the final version.
follow_up_tasks:
  - Rewrite one paragraph for two readers and compare which facts each version put first.
```

## Lesson 3: Excel: formulas and data

```yaml lesson
id: microsoft-365-copilot-l3
duration_min: 5
skills: [formula-assistance, data-spot-checking, verification]
goal: Get formulas explained or written, analyze a table and spot trends, then spot-check the results against the data.
```

### Card: Formulas in plain words

Ask Copilot to explain an inherited formula step by step. Or describe what you need: "Total the amounts in column C where column A is North and column B is March." Naming columns and conditions gives a formula you can test on rows you can calculate by hand.

### Card: Analyze a table

Copilot can summarize a table and point out trends and unusual values. Keep your data in a clear table with headers. Ask a specific question: "Which three products grew fastest from January to June?" Work on a copy for changes.

### Card: Spot-check the answer

Analysis can skip rows or misread a column. Check the row count, recalculate one total yourself and look at the highest and lowest values. For personal data such as salaries, follow your company's rules.

### Exercise

```yaml exercise
id: microsoft-365-copilot-l3-e1
type: single_select
skill: data-spot-checking
question: Copilot misreads your order list, which has blank rows, merged headers and typed subtotals. What is the best first step?
options:
  - Ask the same question with more words.
  - Tidy it into one plain table with a single header row.
  - Delete the rows that look unusual.
answer: 1
explanation: A clear table gives Copilot less to misread. Unchecked deletions can remove real data.
hint: What makes a table easy for anyone to read?
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l3-e2
type: multi_select
skill: data-spot-checking
question: Select all that apply. Copilot says the North region total is 48,200 from 90 rows. Which checks make sense?
options:
  - Count the North rows in your table and compare with 90
  - Filter to North and add up the amounts yourself
  - Look at the largest and smallest North amounts for an extra zero
  - Accept it, since Copilot works from your own workbook
answers: [0, 1, 2]
explanation: Quick checks catch skipped rows and misread columns.
hint: Which checks use only your own sheet?
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l3-e3
type: fill_blank
skill: formula-assistance
question: Pick the phrase that best completes this request.
prompt: "Explain the formula in cell E2. ___ Then show me how to test it on two rows."
options:
  - "Make it simple."
  - "Go through it step by step and say what each part refers to."
  - "Fix it."
answer: 1
explanation: A step-by-step explanation lets you judge whether the logic matches your intent.
hint: What do you need before you can judge a formula?
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l3-e4
type: true_false
skill: data-spot-checking
question: Swipe right if true, left if false.
cards:
  - statement: A trend Copilot reports should be confirmed against the numbers in your table.
    answer: true
    explanation: A trend is a claim about the data. You can check it.
  - statement: Blank cells and mixed formats in a table never affect an analysis.
    answer: false
    explanation: Messy data can lead to skipped or miscounted rows. Tidy it first.
  - statement: If a formula returns a number, it must be correct.
    answer: false
    explanation: A formula can run and still answer the wrong question. Test it on rows you know.
hint: Think about what a number proves by itself.
```

### Exercise

```yaml exercise
id: microsoft-365-copilot-l3-e5
type: single_select
skill: formula-assistance
question: Copilot added a column with a new formula, and the totals look believable. What is the safest next step?
options:
  - Send the sheet, since the totals look believable.
  - Test it on two or three rows you can calculate by hand.
  - Ask Copilot whether it is sure.
answer: 1
explanation: Believable is not correct. A hand calculation shows whether the formula answers your question.
hint: Which option gives you evidence instead of reassurance?
```

### Practice

```yaml practice
id: microsoft-365-copilot-l3-practice
skill: data-spot-checking
instructions: Write the request you would give Copilot about a table from your work, and describe how you would check the answer. Use made-up data only.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a request asking Copilot for a formula, an explanation or a trend
  analysis for a table related to this, or a made-up table that fits your work. Describe the columns, say what result
  you want, and name a concrete spot-check.
default_context: You have a table of monthly orders with columns for date, region, product and amount, and you need totals per region and the fastest-growing product.
rubric:
  - criterion: Describes the data
    description: Names the columns and what each one contains.
  - criterion: States the result wanted
    description: Says exactly which formula, total or trend is needed.
  - criterion: Includes a spot-check
    description: Names a concrete check such as a row count, a manual total or the highest and lowest values.
example_good_prompt: "My table has columns: A date, B region, C product, D amount. Give me a formula for total amount per region, and tell me which product grew fastest from January to June. I will check by filtering one region and adding it up, and by comparing the row count."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners do not describe columns or conditions. Ask what each column holds.
  - Learners accept totals and trends unchecked. Have them recalculate one number.
  - Learners analyze messy tables without tidying. Suggest fixing headers and blanks first.
key_points:
  - Describe columns, conditions and the result you want.
  - Ask for explanations of formulas you inherit.
  - Spot-check counts, one total and extremes.
follow_up_tasks:
  - Ask Copilot to explain one formula from your own sheet, then rebuild its result on two rows by hand.
```
