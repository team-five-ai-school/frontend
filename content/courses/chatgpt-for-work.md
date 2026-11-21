---
id: chatgpt-for-work
title: ChatGPT for Work
track: general
level: beginner
description: Use ChatGPT with your own files, keep your context saved and build a reusable assistant for a task you repeat every week.
skills: [grounded-answers, context-setup, reusable-assistants, verification]
certificate: ChatGPT Work Essentials
minutes_saved_per_week: 90
stage: tools
tools: [chatgpt]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [documents, research, content, repetitive-tasks]
prerequisites: [ai-assistants-101]
---

# ChatGPT for Work

## Lesson 1: Ask questions about your own files

```yaml lesson
id: chatgpt-for-work-l1
duration_min: 5
skills: [grounded-answers, verification]
goal: Ask ChatGPT questions about a document or spreadsheet, get quotes as evidence and check them before you reuse the answer.
```

### Card: Give it the source

ChatGPT can read a document or spreadsheet you add to the conversation, so it works from your file, not from memory. Typical uses: summarize a policy, compare two contracts, find the slowest month in a sales sheet. File support depends on your account and company setup.

### Card: Ask for quotes

A summary can hide mistakes. Ask: "Answer only from this file. Quote the sentence you rely on. If the file does not say, tell me." Now each claim has evidence you can find, and gaps are named instead of guessed.

### Card: Check, then reuse

Open the quoted passage and read it in context. For spreadsheets, spot-check a total by hand. Also check what you upload: contracts, student records and candidate files may be off limits. Data handling differs by account and company, so follow your rules.

### Exercise

```yaml exercise
id: chatgpt-for-work-l1-e1
type: single_select
skill: grounded-answers
question: You uploaded a supplier contract. Which question gives you an answer you can verify fastest?
options:
  - "What are the main risks here?"
  - "What is the notice period for ending it? Quote the clause you used."
  - "Is this contract fair to us?"
  - "Summarize everything important."
answer: 1
explanation: A specific question plus a quote lets you confirm the clause in seconds. The others ask for judgment with nothing to check.
hint: Which question leaves you something to look up in the file?
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l1-e2
type: fill_blank
skill: grounded-answers
question: Pick the phrase that keeps the answer tied to your file.
prompt: "Which employees on the attached rota work over 40 hours in week 3? ___"
options:
  - "Add what you know about labor rules too."
  - "Use only the file, quote the rows, and say so if data is missing."
  - "Give your best guess if you are unsure."
answer: 1
explanation: Limiting the source and asking for the rows makes errors easy to spot.
hint: Which option limits where the answer may come from?
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l1-e3
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: An answer based on your uploaded file is certainly correct.
    answer: false
    explanation: It can still misread a table or skip a clause.
  - statement: Asking for a quote makes a wrong answer easier to catch.
    answer: true
    explanation: You can compare the quote with the original document.
  - statement: You can skip checking totals because the file is your own data.
    answer: false
    explanation: Calculations can go wrong. Recompute a few by hand.
hint: Think about who is responsible for the result.
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l1-e4
type: multi_select
skill: verification
question: Select all that apply. Which steps make an upload safer?
options:
  - "Check that your company allows this kind of file in this tool."
  - "Remove personal details the task does not need."
  - "Upload it first and check the rules later."
  - "Use your company-approved account, not a personal one."
answers: [0, 1, 3]
explanation: Permission, minimal data and the approved account come before the upload.
hint: Which steps happen before the file leaves your computer?
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l1-e5
type: single_select
skill: verification
question: ChatGPT quotes a refund deadline from an uploaded policy. What do you do before telling a customer?
options:
  - "Send it, since it has a quote."
  - "Ask ChatGPT to confirm it again."
  - "Find the quoted sentence and read it in context."
  - "Remove the quote and keep the deadline."
answer: 2
explanation: A quote points to the evidence. Reading the original confirms it.
hint: Imagine the customer disputes the deadline and you are asked to show where it comes from.
```

### Practice

```yaml practice
id: chatgpt-for-work-l1-practice
skill: grounded-answers
instructions: Write a prompt that asks about a file you could upload, requires quotes and tells the assistant what to do when the file lacks the answer.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Describe a document or spreadsheet related to this pain that your company would allow you to upload to {{tool}}.
  Write a prompt that asks one specific question about it, requires quoted evidence and says what to do if the answer is missing.
  Add one line on how you would check the result.
default_context: You are an office manager who needs the cancellation terms from a supplier contract.
rubric:
  - criterion: Names the source
    description: The prompt says which file to use and limits the answer to it.
  - criterion: Requires evidence
    description: The prompt asks for quotes or the rows used, and a clear answer when the file does not say.
  - criterion: Plans a check
    description: The learner says how they would verify the answer and keeps private data out.
example_good_prompt: Using only the attached supplier contract, tell me the notice period for cancelling and any early-exit fee. Quote the clause for each. If the contract does not say, answer "not stated". I will read each quoted clause in the original before I reply to the supplier.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Asking for a general summary and trusting it. Steer toward a specific question with a quote.
  - Uploading files without checking company rules. Ask what their policy says and what could be removed.
key_points:
  - Ground the answer in the file and ask for the passage used.
  - Read the quote in the original before reuse.
  - Upload only what your company allows.
follow_up_tasks:
  - Take one page from a real document and write three questions that each require a quote.
```

## Lesson 2: Set your context once

```yaml lesson
id: chatgpt-for-work-l2
duration_min: 5
skills: [context-setup]
goal: Save your role, audience and style so you stop repeating them, and organize recurring work into separate spaces.
```

### Card: Stop repeating yourself

A new conversation often starts without your background, so you retype "I am an HR manager, write for employees, keep it short" again and again. ChatGPT can store standing instructions about you and how you want answers. Write them once: role, usual reader, tone, formats you like. Availability varies by account and company setup.

### Card: Keep a space per area

Mixed topics confuse answers. ChatGPT may offer projects, which group related chats, files and instructions in one place. Keep one per recurring area, such as "Monthly reports" or "Recruiting". Everything in it shares the same background, so you add only what is new. Availability varies.

### Card: Keep it short and safe

Instructions apply to every chat, so use only what is always true. Avoid client names, salaries or other confidential details. Put area-specific rules in that area's project. Review the text now and then, because your work changes.

### Exercise

```yaml exercise
id: chatgpt-for-work-l2-e1
type: single_select
skill: context-setup
question: Which line belongs in your standing instructions?
options:
  - "Write emails to our customer Mrs Keller about her invoice."
  - "I am a marketing lead. Write in plain, friendly English, under 120 words."
  - "The Q3 budget is 48,000."
  - "Remember this week's meeting agenda."
answer: 1
explanation: Role, style and length are always true. The others are one-off or contain details that do not belong everywhere.
hint: Choose what is true for almost every task you do.
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l2-e2
type: multi_select
skill: context-setup
question: Select all that apply. Which are good reasons to create a separate project?
options:
  - "You write a weekly newsletter with the same style each time."
  - "You handle parent emails and want shared tone rules."
  - "You want to ask one unrelated question."
  - "You review contracts and want related files together."
answers: [0, 1, 3]
explanation: Projects fit recurring work with shared files or tone. A one-off question needs none.
hint: Think about work you come back to again and again.
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l2-e3
type: fill_blank
skill: context-setup
question: Pick the phrase that makes these standing instructions useful.
prompt: "I teach Year 8 science. ___ Never include student names."
options:
  - "Make my lessons great."
  - "Write for 13-year-olds in short sentences and ask before adding a topic."
  - "Always give long, detailed answers."
answer: 1
explanation: It states reader, style and a working rule. Vague wishes change little.
hint: Which option changes what the answer looks like?
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l2-e4
type: true_false
skill: context-setup
question: Swipe right if true, left if false.
cards:
  - statement: Saved instructions mean you can skip checking answers.
    answer: false
    explanation: Context improves style and fit. It does not make facts correct.
  - statement: Rules for one client belong in that client's project, not in general instructions.
    answer: true
    explanation: General instructions apply everywhere, so keep them to what is always true.
  - statement: Standing instructions are a good place for client data.
    answer: false
    explanation: Keep sensitive information out. Instructions shape every chat.
  - statement: Review your instructions when your role changes.
    answer: true
    explanation: Outdated instructions quietly shape answers.
hint: Ask whether it is always true and safe to store.
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l2-e5
type: single_select
skill: context-setup
question: Recruiting answers keep sounding like your marketing work. What fixes this best?
options:
  - "Add recruiting rules to your general instructions."
  - "Explain the difference at the start of every chat."
  - "Keep recruiting in its own project with its own instructions and files."
  - "Tell it to ignore marketing in each chat."
answer: 2
explanation: A dedicated space keeps background separate without bloating the general text.
hint: Which option separates the two areas?
```

### Practice

```yaml practice
id: chatgpt-for-work-l2-practice
skill: context-setup
instructions: Write standing instructions about yourself, then name one project you would create and what it would hold.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write short standing instructions for {{tool}}: your role, your usual reader, tone, preferred format and one rule.
  Then name one project for work related to this pain and say what instructions or files it would hold.
  Include no confidential data.
default_context: You are an office coordinator who writes weekly updates to staff and monthly updates to clients.
rubric:
  - criterion: Always-true context
    description: The instructions state role, reader, tone and format without one-off details.
  - criterion: Focused project
    description: The project covers one recurring area and says what it holds.
  - criterion: Safe content
    description: No confidential or personal data appears in the instructions.
example_good_prompt: "Instructions: I am an office coordinator. My readers are busy staff and clients. Write in plain English, friendly and brief, with a short bulleted summary first. Ask me before adding facts. Project: Client monthly updates, holding the update template, the tone rules for clients and last month's approved update."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Stuffing instructions with case details. Ask whether each line is true every time.
  - Putting confidential data in instructions. Suggest placeholders instead.
key_points:
  - Write role, reader and style once.
  - One project per recurring area of work.
  - Context improves fit, not accuracy.
follow_up_tasks:
  - Sort ten facts about your work into always-true, project-only or never-store.
```

## Lesson 3: Build a reusable assistant for one task

```yaml lesson
id: chatgpt-for-work-l3
duration_min: 5
skills: [reusable-assistants, verification]
goal: Design and test a focused custom assistant for a task you repeat, using clear instructions and example inputs and outputs.
```

### Card: One task, one assistant

If you paste the same long prompt every week, consider a reusable assistant: instructions defined once, then applied to new inputs. Examples: turn raw meeting notes into a standard summary, or draft replies to common customer questions. Whether you can create or share one depends on your account and company setup.

### Card: Instructions and examples

Write what it does, who reads the result, the format and what it must never do. Add one or two example inputs with the output you want. Examples show style better than description. Include a rule for missing information: ask, do not invent.

### Card: Test before you trust

Run it on five realistic cases, with personal details removed, including a messy one and one with missing details. Compare each output with what you would write yourself, and fix the instructions where it fails. Keep it to one task.

### Exercise

```yaml exercise
id: chatgpt-for-work-l3-e1
type: single_select
skill: reusable-assistants
question: Which is the best scope for a reusable assistant?
options:
  - "Help with anything in the office."
  - "Turn raw weekly sales notes into our 5-line team summary."
  - "Handle HR, finance and marketing questions."
  - "Be smart and professional."
answer: 1
explanation: One clear task with a known input and output is easy to test. Broad assistants are inconsistent.
hint: Which one has a clear input and a clear output?
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l3-e2
type: multi_select
skill: reusable-assistants
question: Select all that apply. What belongs in the instructions of a customer-reply assistant?
options:
  - "The tone and maximum length of a reply."
  - "One example question with the reply you would approve."
  - "What to do when the customer's question is not covered."
  - "Real customer names and account numbers for reference."
answers: [0, 1, 2]
explanation: Tone, an example and a rule for gaps shape every reply. Customer data does not belong there.
hint: Choose what stays true for every customer.
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l3-e3
type: fill_blank
skill: reusable-assistants
question: Pick the rule that makes the assistant safer on incomplete input.
prompt: "You turn meeting notes into a summary with decisions and owners. ___"
options:
  - "Fill in any missing owners with the most likely person."
  - "If an owner or date is missing, write 'owner not stated' and list the gap at the end."
  - "Never mention what is missing."
answer: 1
explanation: Flagging gaps lets you fix them. Guessing creates errors that look finished.
hint: What should happen when a detail is not there?
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l3-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: Testing on one easy example is enough before sharing the assistant.
    answer: false
    explanation: Real inputs are messier. Try several.
  - statement: Example inputs and outputs help the assistant match your style.
    answer: true
    explanation: An example shows format and tone better than a description.
  - statement: Once the assistant works, its output needs no checking.
    answer: false
    explanation: It can still miss details. You remain responsible for what you send.
hint: Think about messy, real cases.
```

### Exercise

```yaml exercise
id: chatgpt-for-work-l3-e5
type: single_select
skill: reusable-assistants
question: Your assistant writes replies that are too long on two of five tests. What do you do?
options:
  - "Accept it, since three tests were fine."
  - "Add a length limit and an example to the instructions, then retest."
  - "Create a new assistant for each test."
  - "Tell colleagues to shorten every reply."
answer: 1
explanation: Fix the instructions, then rerun the same cases.
hint: Where does a repeated problem get fixed once?
```

### Practice

```yaml practice
id: chatgpt-for-work-l3-practice
skill: reusable-assistants
instructions: Design a focused assistant for one repeated task and plan how you would test it.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Design a reusable assistant in {{tool}} for one repeated task connected to this pain.
  Write its instructions: task, reader, format, one rule for missing information and one thing it must not do.
  Add one example input and output, and name two test cases you would run.
default_context: You are a team assistant who turns rough meeting notes into a short summary with decisions and next steps every week.
rubric:
  - criterion: Focused task
    description: The assistant has one clear task, reader and output format.
  - criterion: Clear rules and example
    description: Instructions include a missing-information rule, a limit and an example input and output.
  - criterion: Realistic testing
    description: The learner names test cases that include a messy or incomplete input.
example_good_prompt: "Task: turn rough meeting notes into a summary for the team. Format: three bullet decisions, then a table of next steps with owner and date. If an owner or date is missing, write 'not stated'. Do not add facts. Example: input 'Anna to send the offer Friday, budget agreed' gives decision 'Budget agreed' and next step 'Send offer, Anna, Friday'. Tests: one messy set of notes, one with no owners."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Building one assistant for many tasks. Ask them to pick the single most repeated one.
  - Testing only on a clean example. Ask for a messy, incomplete test case.
key_points:
  - One assistant, one task.
  - Instructions plus examples plus a rule for gaps.
  - Test on real cases and keep checking output.
follow_up_tasks:
  - Write instructions for an assistant that drafts a reply to the question you get most often.
```
