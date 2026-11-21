---
id: gemini-in-google-workspace
title: Gemini in Google Workspace
track: general
level: beginner
description: Use Gemini inside Gmail, Docs, Sheets, Slides and Drive to draft, summarize, analyze and build first versions faster, then check every result against your sources.
skills: [voice-drafting, thread-summarizing, fact-checking, sheet-cleanup, formula-explaining, result-spot-checking, deck-building, source-referencing]
certificate: Gemini in Google Workspace Essentials
minutes_saved_per_week: 75
stage: tools
tools: [google-workspace]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [email, documents, data, content]
prerequisites: [ai-assistants-101]
---

# Gemini in Google Workspace

## Lesson 1: Gmail and Docs: write, summarize, rewrite

```yaml lesson
id: gemini-in-google-workspace-l1
duration_min: 5
skills: [voice-drafting, thread-summarizing, fact-checking]
goal: Draft replies in your own voice, summarize long threads and documents, and rewrite text for a new reader while checking facts and commitments.
```

### Card: Availability and your voice

Gemini works inside your mail and documents, but availability depends on your account type and organization settings. If you have it, it drafts from a short instruction. Follow company data rules for what you let it read. To sound like you, give a sample: "Match the tone of my last email to this client: friendly, short, no exclamation marks."

### Card: Summarize, then rewrite

Ask for a long thread as decisions, open questions and owners. Ask for a document rewritten for another reader, such as a plain-language parent version. Say what must stay unchanged, like dates and amounts.

### Card: Check what you will be held to

A summary can drop a condition or give a promise to the wrong person. Before you act, confirm dates, amounts and commitments in the original. If it says "Maria will send the contract Friday", check that Maria said it.

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l1-e1
type: single_select
skill: voice-drafting
question: You want Gemini to reply to a client in your usual style. Which request works best?
options:
  - "Reply to this email."
  - "Reply to this email. Match the tone of my earlier message below: warm, three sentences, no jargon. Confirm the meeting is Thursday at 10."
  - "Write a better reply than I would."
answer: 1
explanation: A tone sample and facts to confirm keep the draft yours and correct.
hint: What does Gemini need to know that it cannot guess?
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l1-e2
type: multi_select
skill: fact-checking
question: Select all that apply. Which statements about a thread summary are true?
options:
  - It can drop a condition attached to a decision
  - It can treat an early proposal as final after a later message changed it
  - It can attribute a task to the wrong person
  - It only leaves out small talk, so decisions are always safe
answers: [0, 1, 2]
explanation: Compression loses conditions, changes and owners. Decisions are not safe by default.
hint: Think about what gets lost when many messages become a few lines.
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l1-e3
type: fill_blank
skill: thread-summarizing
question: Pick the phrase that makes this summary request most useful.
prompt: "Summarize this thread for me. ___ Quote the sentence each item comes from."
options:
  - "Make it short."
  - "List decisions made, questions still open, and the owner and date for each action."
  - "Tell me what matters."
answer: 1
explanation: Named categories and quotes let you verify each item.
hint: Choose the request that gives the output a shape you could check.
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l1-e4
type: true_false
skill: fact-checking
question: Swipe right if true, left if false.
cards:
  - statement: Which Gemini features you can use depends on your account type and organization settings.
    answer: true
    explanation: Admins control features, so colleagues may differ.
  - statement: A confident, well-organized summary does not need checking against the original.
    answer: false
    explanation: Summaries can swap names or dates and read smoothly.
  - statement: When you rewrite a document for a new reader, you should say which facts must not change.
    answer: true
    explanation: Rewrites can shift numbers.
hint: Ask whether sounding right is the same as being right.
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l1-e5
type: single_select
skill: fact-checking
question: A drafted reply says "we will refund you within 5 days", but you never agreed to that. What do you do?
options:
  - Send it, since the AI read the thread and probably saw a reason.
  - Remove the promise or confirm it with your team before sending.
  - Soften it to "soon".
answer: 1
explanation: You are committing. Keep only promises you made or approved.
hint: Who is responsible for what the email promises?
```

### Practice

```yaml practice
id: gemini-in-google-workspace-l1-practice
skill: voice-drafting
instructions: Write the request you would give Gemini to reply to a message or rewrite a document, with made-up details only.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a request asking Gemini to draft a reply or rewrite a text connected to this pain.
  Include the reader, the facts to keep, a note on your voice, and a length limit.
  Add one line on what you would verify before sending.
default_context: A long email thread with a client about a delayed project needs a short reply that confirms a new date and keeps a friendly tone.
rubric:
  - criterion: Gives facts and reader
    description: Names who reads it and the specific facts the draft must contain or keep.
  - criterion: Guides voice and length
    description: Describes the tone, offers a style sample or limits the length.
  - criterion: Plans a check
    description: Says which dates, amounts or commitments will be confirmed in the original.
example_good_prompt: "Reply to the client's last message. Match the warm, brief tone of my earlier email below. Confirm the new delivery date of 14 March, apologize once, no promises about compensation, under 90 words. Before sending I will check the date and that I made no new commitments."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask for a reply with no facts. Ask what the reader needs to learn from the message.
  - Learners send summaries unchecked. Have them find one deadline in the original thread.
  - Learners let a draft make promises. Ask who approved each commitment.
key_points:
  - Give a tone sample, the reader and the facts.
  - Ask for summaries in decisions, questions and owners.
  - Verify dates, amounts and commitments in the original.
follow_up_tasks:
  - Summarize one real thread you know well and find one detail the summary got wrong or left out.
```

## Lesson 2: Sheets: organize, explain, analyze

```yaml lesson
id: gemini-in-google-workspace-l2
duration_min: 5
skills: [sheet-cleanup, formula-explaining, result-spot-checking]
goal: Organize messy data, get formulas explained or written, run a quick analysis and spot-check the results.
```

### Card: Organize messy data

Gemini can turn a rough list into a clean table or standardize names and dates. Describe one problem: "Column B has dates in three formats." Work in a copy.

### Card: Formulas explained or written

Ask what an inherited formula does, step by step. Or describe the goal: "Add up column D where column B says Paid and column C is March." Name columns and conditions, then test on rows you can calculate by hand.

### Card: Analyze, then spot-check

Ask for trends or outliers. The answer may skip rows, misread a column or count twice. Compare the row count, recalculate one total, and check the highest and lowest values. Keep personal data such as salaries or grades in approved tools.

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l2-e1
type: single_select
skill: formula-explaining
question: You inherit a sheet with a long formula you did not write. What is the best first request?
options:
  - "Rewrite this formula to make it shorter."
  - "Explain this formula step by step, say what each column holds, and suggest two rows to test it on."
  - "Fix any errors in this formula."
answer: 1
explanation: Understanding comes before changing. A step-by-step explanation lets you test the logic.
hint: What would you want to know before touching a formula you did not write?
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l2-e2
type: multi_select
skill: result-spot-checking
question: Select all that apply. Gemini says Marketing spent 12,400 across 45 rows. Which checks are useful?
options:
  - Count the Marketing rows and compare with 45
  - Filter to Marketing and add up the amounts yourself
  - Accept it, since the sheet is open in front of the AI
  - Scan the largest and smallest amounts for typos such as an extra zero
answers: [0, 1, 3]
explanation: Quick checks reveal skipped rows and typos.
hint: Pick the checks that only need the sheet and a minute.
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l2-e3
type: fill_blank
skill: sheet-cleanup
question: Pick the phrase that makes this cleanup request work.
prompt: "Column A holds customer names typed in different ways. ___ Leave all other columns untouched."
options:
  - "Tidy it up."
  - "Suggest a formula that writes each name as First Last with no extra spaces, and list the entries it cannot handle."
  - "Make the names look nicer."
answer: 1
explanation: A target format plus a list of exceptions shows what needs manual work.
hint: What would you want to know after Gemini has finished?
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l2-e4
type: true_false
skill: result-spot-checking
question: Swipe right if true, left if false.
cards:
  - statement: Asking Gemini to fix one named problem at a time is easier to review than "clean this sheet".
    answer: true
    explanation: Small, specific changes are easier to check.
  - statement: A student gradebook with names is fine to analyze in any AI tool you find online.
    answer: false
    explanation: Student data belongs in tools your school approves.
  - statement: If the AI's total differs from your own, the AI is probably right.
    answer: false
    explanation: Investigate the difference. Either of you may have skipped or misread rows.
hint: Think about what you can check and what stays private.
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l2-e5
type: single_select
skill: result-spot-checking
question: Gemini says column A holds 12 duplicate customers and offers to remove them. What do you do first?
options:
  - Let it remove them, since it counted them.
  - Ask it to list them, then check a few in a copy of the sheet.
  - Remove them all and compare later.
answer: 1
explanation: Similar entries are not always duplicates. A listed sample in a copy lets you check first.
hint: What can you undo if the AI misjudged?
```

### Practice

```yaml practice
id: gemini-in-google-workspace-l2-practice
skill: formula-explaining
instructions: Write a request asking Gemini for a formula, a cleanup or a quick analysis for a table from your work, and say how you will check it. Use made-up data.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a request for Gemini about a spreadsheet related to this pain, or a made-up one that fits your work. Describe the columns,
  say what result you want back, and explain how you would spot-check it.
default_context: A training sign-up sheet has columns for name, team, course and date. Names are typed inconsistently, and you need the number of sign-ups per course.
rubric:
  - criterion: Describes the data
    description: Names the columns and what each one holds.
  - criterion: States the result wanted
    description: Says exactly which formula, cleanup or analysis is needed.
  - criterion: Includes a spot-check
    description: Names a concrete check such as recalculating one total or comparing row counts.
example_good_prompt: "My sheet has A name, B team, C course, D date. Names in column A are typed in different ways. Suggest a formula that writes each as First Last and list the entries it cannot handle. Then count sign-ups per course. I will filter one course and count by hand."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners describe the goal but not the columns. Ask what each column contains.
  - Learners accept totals unchecked. Have them recalculate one figure by hand.
  - Learners use real personal data. Point them to approved tools or made-up data.
key_points:
  - Name columns, conditions and the result you want.
  - Work on a copy.
  - Spot-check counts, one total and the extremes.
follow_up_tasks:
  - Ask Gemini to explain one formula from your own sheet, then reproduce its result on two rows by hand.
```

## Lesson 3: Slides and Drive: first drafts and file search

```yaml lesson
id: gemini-in-google-workspace-l3
duration_min: 5
skills: [deck-building, source-referencing, fact-checking]
goal: Build a first presentation from your notes, find and summarize files across Drive, and keep track of the source files you rely on.
```

### Card: A first deck from your notes

Start with the audience and the one message they should leave with. Give Gemini your notes and ask for an outline first, then slides one section at a time. Tell it to use only your notes and mark gaps instead of inventing figures.

### Card: Find and summarize in Drive

Where your account allows it, Gemini can search files you can already open and summarize them: "What do our Q3 planning documents say about the training budget?" It may miss a file or pick an old version.

### Card: Reference your sources

Ask which files an answer used. Open them, find the passage, and keep the file names in your speaker notes. Before using a figure, confirm it in the file and check the file's date.

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l3-e1
type: single_select
skill: deck-building
question: You want Slides for a team briefing based on a planning document. What is the best first request?
options:
  - "Turn this document into a 20-slide deck."
  - "Suggest a five-section outline for a 15-minute team briefing from this document. Key message: the launch moves to May."
  - "Make slides that look great."
answer: 1
explanation: An outline lets you agree the structure while changes are cheap.
hint: What do you want to agree on before any content is written?
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l3-e2
type: multi_select
skill: source-referencing
question: Select all that apply. Gemini summarized your Drive files on the training budget. What should you do before quoting it?
options:
  - Ask which files it used
  - Open those files and find the passage
  - Check the date or version of each file
  - Trust it because it searched your own Drive
answers: [0, 1, 2]
explanation: Searching your Drive does not guarantee the newest version or a correct reading.
hint: Which actions let you trace a claim back to a document?
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l3-e3
type: fill_blank
skill: source-referencing
question: Pick the phrase that makes this Drive question most trustworthy.
prompt: "What do our planning documents say about the training budget? ___"
options:
  - "Be thorough."
  - "Name the file behind each point and tell me if documents disagree."
  - "Include everything you can find."
answer: 1
explanation: File names let you open the source, and disagreements show where you must decide.
hint: Which request lets you trace each point back?
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l3-e4
type: true_false
skill: source-referencing
question: Swipe right if true, left if false.
cards:
  - statement: A Drive summary can miss a relevant file or use an outdated one.
    answer: true
    explanation: Check dates and look for gaps.
  - statement: Asking Gemini to write [gap] where a figure is missing keeps unknowns visible.
    answer: true
    explanation: "A visible gap is easy to fix. An invented figure looks like a fact."
  - statement: Gemini can use any file in your organization to answer your question.
    answer: false
    explanation: It only uses files you can already open, and it may still miss some.
hint: Ask what Gemini can see, and what it might not tell you.
```

### Exercise

```yaml exercise
id: gemini-in-google-workspace-l3-e5
type: single_select
skill: fact-checking
question: A slide says "attendance rose 12%", but you cannot find that number in your notes or files. What now?
options:
  - Keep it, because it matches the trend you expected.
  - Remove it or find the source before presenting.
  - Rephrase it as "attendance rose significantly".
answer: 1
explanation: A claim with no source should not reach an audience. Softer wording still states an unsupported claim.
hint: Where would you point if someone asked for the source?
```

### Practice

```yaml practice
id: gemini-in-google-workspace-l3-practice
skill: deck-building
instructions: Write the request you would give Gemini to outline a short presentation from your notes, and name the files you would verify. Use made-up details.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a request that asks Gemini to turn rough notes into an outline for a short presentation about this topic.
  Include the audience, the key message, the number of sections and what Gemini should do about
  missing facts. Add a line on which source files you would open to verify the figures.
default_context: You must brief your team on a project change in 15 minutes, using rough notes and a planning document in your Drive.
rubric:
  - criterion: Names audience and message
    description: Says who will watch and what they should take away or decide.
  - criterion: Controls invention
    description: Tells the AI to use only the notes and to mark missing facts.
  - criterion: References sources
    description: Names the files or notes that will be checked before using any figure.
example_good_prompt: "Using only my pasted notes and the planning document, outline a 15-minute team briefing. Key message: the launch moves to May. Five sections, impact on each team first, mark missing facts as [gap]. Before presenting I will open the plan and confirm every date."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask for a full deck at once. Steer them to outline first, then sections.
  - Learners trust Drive summaries. Ask which file and which passage each claim came from.
  - Learners skip the audience. Ask what the reader should decide.
key_points:
  - Outline first, then slides, using only your notes.
  - Drive answers depend on your access and may use old files.
  - Name and open the sources behind every figure.
follow_up_tasks:
  - Ask Gemini to summarize one folder topic, then open two cited files and note anything it missed.
```
