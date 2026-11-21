---
id: automate-your-routine
title: Automate Your Routine
track: general
level: intermediate
description: Turn your best prompts into reusable templates, build a custom assistant for one recurring task and connect AI to a simple no-code flow with a human check.
skills: [prompt-templates, custom-assistants, workflow-automation, human-review]
certificate: AI Routine Automation
minutes_saved_per_week: 90
stage: advanced
tools: [any]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [repetitive-tasks, email, reporting]
prerequisites: [ai-assistants-101]
---

# Automate Your Routine

## Lesson 1: Turn good prompts into a template library

```yaml lesson
id: automate-your-routine-l1
duration_min: 5
skills: [prompt-templates]
goal: Turn a prompt that worked into a reusable template and keep it in an organized library.
```

### Card: From one prompt to a template

When a prompt works, do not leave it in your chat history. Replace the parts that change each time with placeholders in square brackets, such as [Client] or [Deadline]. Keep the parts that made it work: tone, structure and length.

Example: "Write an email to [Client] asking for [Document] by [Date]. Friendly, under 90 words, end with one next step."

### Card: Build a small library

Keep templates in one place you open daily, such as a notes app or a shared document. Group them by task: Email, Reports, Meetings. Give each a clear name and a one-line note on when to use it. If you cannot find a template in ten seconds, you will stop using it.

### Card: Improve it with use

After each use, notice what you fixed by hand. If you shorten the answer every time, add the length to the template. If a rule was ignored, state it more plainly. Date each change and keep the best version.

### Exercise

```yaml exercise
id: automate-your-routine-l1-e1
type: single_select
skill: prompt-templates
question: Which part of a working prompt should become a placeholder?
options:
  - "The tone and length that made the result good."
  - "The client name and deadline, which change every time."
  - "Every word, so the template fits any task."
  - "The instruction to keep the answer short."
answer: 1
explanation: Placeholders hold what changes. The instructions that made the prompt work stay fixed.
hint: Ask what is different each time you use the prompt.
```

### Exercise

```yaml exercise
id: automate-your-routine-l1-e2
type: multi_select
skill: prompt-templates
question: Select all that apply. What helps a template library stay useful?
options:
  - "Grouping templates by task."
  - "A one-line note on when to use each one."
  - "The date you last improved it."
  - "Real client details left in from the last use."
answers: [0, 1, 2]
explanation: Grouping, notes and dates make templates easy to find and trust. Real client details do not belong in a saved template.
hint: Think about finding and trusting a template months later.
```

### Exercise

```yaml exercise
id: automate-your-routine-l1-e3
type: fill_blank
skill: prompt-templates
question: Pick the phrase that makes this template reusable.
prompt: "Summarize [Meeting notes] for [Manager]. ___"
options:
  - "Make it good."
  - "Give 3 bullets, then one line on open decisions."
  - "Use last week's notes as a guide."
answer: 1
explanation: A fixed format gives consistent results every time. The other options are vague or tied to one week.
hint: Choose what you want every single time you run it.
```

### Exercise

```yaml exercise
id: automate-your-routine-l1-e4
type: true_false
skill: prompt-templates
question: Swipe right if true, left if false.
cards:
  - statement: A template swaps only what changes and keeps the instructions that worked.
    answer: true
    explanation: That is what makes the result consistent.
  - statement: Once a template works, you should never change it.
    answer: false
    explanation: Needs shift, so review templates and improve them.
  - statement: If you fix the same thing by hand every time, add it to the template.
    answer: true
    explanation: Repeated fixes show an instruction is missing.
hint: Ask what a repeated fix tells you.
```

### Exercise

```yaml exercise
id: automate-your-routine-l1-e5
type: single_select
skill: prompt-templates
question: Your weekly report template always gives long summaries, and you trim them each week. What is the best step?
options:
  - "Keep trimming by hand."
  - "Add a limit such as 5 bullets to the template."
  - "Delete the template and write a new prompt each week."
  - "Ask for a longer summary and cut it later."
answer: 1
explanation: Moving your repeated fix into the template saves the work every week.
hint: Where could the fix live so you do it only once?
```

### Practice

```yaml practice
id: automate-your-routine-l1-practice
skill: prompt-templates
instructions: Turn one prompt for a real recurring task into a template with placeholders and give it a library entry.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a reusable prompt template for {{tool}} for this task. Use at least three placeholders in square brackets,
  fixed instructions for format and tone, and no private data.
  Add a library entry: a name, when to use it, and one improvement you would make after the first use.
default_context: You are an office coordinator who sends a weekly status email to clients about their open requests.
rubric:
  - criterion: Uses placeholders well
    description: Changing details are placeholders and the instructions that make it work stay fixed.
  - criterion: Fixes the output
    description: The template states format, length or tone so results are consistent.
  - criterion: Library entry
    description: Gives a clear name, a use note and a realistic improvement idea, without private data.
example_good_prompt: "Template: Write a status email to [Client] about [Request]. Current status: [Status]. Next step and date: [Next step]. Friendly, under 100 words, one clear next step. Library entry: Weekly client status, use every Friday, after first use I would add a subject line rule."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Making everything a placeholder. Ask which instructions made the prompt work and keep those fixed.
  - Leaving real names in the saved template. Show how to replace them with placeholders.
key_points:
  - A template keeps what worked and swaps only what changes.
  - Organize by task and add a use note so you can find it fast.
  - Improve a template after each use.
follow_up_tasks:
  - Take your last good prompt, mark what changes each time, and rewrite it with placeholders.
```

## Lesson 2: Build a custom assistant for one recurring task

```yaml lesson
id: automate-your-routine-l2
duration_min: 5
skills: [custom-assistants]
goal: Set up a custom assistant with instructions and reference documents, and test it on real past cases.
```

### Card: One assistant, one task

A custom assistant is a saved setup: your instructions plus your reference documents. Tools use different names, but the idea is the same. It works best for one narrow, repeated task, such as answering parent questions about homework policy. "Help with everything" gives uneven results.

### Card: What goes in

Instructions say who it helps, what it does, the format, and what it must not do. Add a rule for gaps: "If the documents do not cover it, say so." Documents are your policy, FAQ or sample good answers. Upload only what your company allows, and keep them current.

### Card: Test before you trust it

Collect 5 to 10 real past cases, including one tricky one. Run each and compare with what you actually sent. Where it is wrong, fix the instructions or documents and run again. Only then use it on live work, and still read every answer.

### Exercise

```yaml exercise
id: automate-your-routine-l2-e1
type: single_select
skill: custom-assistants
question: Which task suits a custom assistant best?
options:
  - "Answering the same questions about your return policy every week."
  - "Helping with anything your team might ask."
  - "Writing a one-time farewell speech."
  - "Deciding which candidate to hire."
answer: 0
explanation: A narrow, repeated task with a clear source document gives consistent results.
hint: Look for a task that repeats and has a written source.
```

### Exercise

```yaml exercise
id: automate-your-routine-l2-e2
type: multi_select
skill: custom-assistants
question: Select all that apply. What belongs in a custom assistant's setup?
options:
  - "A rule to say when the answer is not in the documents."
  - "Your current policy document."
  - "The format you want for answers."
  - "Old policy versions beside the current one."
answers: [0, 1, 2]
explanation: Clear rules, current sources and a format shape good answers. Old versions can conflict.
hint: Choose what guides answers without adding risk.
```

### Exercise

```yaml exercise
id: automate-your-routine-l2-e3
type: fill_blank
skill: custom-assistants
question: Pick the instruction that makes this assistant safest.
prompt: "You answer candidate questions for our HR team. Use only the attached process guide. ___"
options:
  - "If the guide does not cover the question, say so and suggest contacting HR."
  - "If unsure, give your best guess so the candidate is not left waiting."
  - "Add helpful details from general knowledge."
answer: 0
explanation: A gap rule stops the assistant from inventing answers about your process.
hint: What should happen when the guide has no answer?
```

### Exercise

```yaml exercise
id: automate-your-routine-l2-e4
type: true_false
skill: custom-assistants
question: Swipe right if true, left if false.
cards:
  - statement: Testing on real past cases shows weak spots before anyone outside sees them.
    answer: true
    explanation: You can compare its answers with what you actually sent.
  - statement: If the first three tests look fine, you can stop testing.
    answer: false
    explanation: Include a tricky case, because that is where assistants usually fail.
  - statement: An outdated document can make the assistant give outdated answers.
    answer: true
    explanation: It relies on what you give it, so update documents when policies change.
hint: Think about where mistakes would first appear.
```

### Exercise

```yaml exercise
id: automate-your-routine-l2-e5
type: single_select
skill: custom-assistants
question: In testing, your assistant invents a refund rule that is not in your policy. What is the best fix?
options:
  - "Ignore it, because it was only one error."
  - "Add an instruction to use only the policy, then run the test again."
  - "Switch tools and hope for better."
  - "Stop testing and use it carefully."
answer: 1
explanation: Fix the instructions, then re-run the same case to confirm the problem is gone.
hint: What would stop it from going beyond the policy?
```

### Practice

```yaml practice
id: automate-your-routine-l2-practice
skill: custom-assistants
instructions: Design a custom assistant for one recurring task and plan how to test it on real past cases.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Design a custom assistant for {{tool}} or a similar tool for one recurring task related to this pain.
  Write its instructions, list which reference documents you would give it, and describe how you would test it on real past cases.
  Do not include confidential data.
default_context: You are a school administrator who answers parents' questions about absences and homework policy every week.
rubric:
  - criterion: Narrow task and instructions
    description: Names one task and gives clear instructions on audience, format and limits.
  - criterion: Sources and gap rule
    description: Lists suitable reference documents and tells the assistant what to do when the answer is missing.
  - criterion: Test plan
    description: Plans to test on several real past cases, including a tricky one, and to check answers before use.
example_good_prompt: "Task: answer parents' questions about absences. Instructions: You help parents of our school. Use only the attached attendance policy and FAQ. Answer in under 80 words, politely. If the documents do not cover it, say so and suggest contacting the office. Never discuss other students. Test: run 8 past parent emails, including one unusual case, compare with my sent replies, fix the instructions, then re-run."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Building one assistant for many tasks. Help the learner pick one narrow task.
  - Skipping the gap rule. Ask what the assistant should do when the documents are silent.
key_points:
  - Instructions plus reference documents define the assistant.
  - Test on real past cases, including a tricky one.
  - Keep documents current and still read every answer.
follow_up_tasks:
  - Pick three past cases and write what a correct answer would look like for each.
```

## Lesson 3: Chain AI into a simple no-code flow

```yaml lesson
id: automate-your-routine-l3
duration_min: 5
skills: [workflow-automation, human-review]
goal: Design a small flow with a trigger, an AI step and an action, with a human check before anything reaches people.
```

### Card: Trigger, AI step, action

No-code tools like Zapier, Make or Power Automate connect apps without programming. A flow has three parts. The **trigger** starts it. The **AI step** processes text. The **action** does something with the result.

Example: a new form response arrives (trigger), AI summarizes it (AI step), the summary is saved to a notes page (action).

### Card: Keep a human check

Before anything reaches customers, students or candidates, the flow should stop for you. Send the AI output to a draft folder or an approval step, then review and send it yourself. A wrong message that goes out automatically cannot be taken back.

### Card: Start small and low-risk

Pick one flow where a mistake costs little, such as summaries sent only to you. Test it with sample data, then watch it for a week before adding steps. Check which data the tool shares with which app, and use only tools your company approves.

### Exercise

```yaml exercise
id: automate-your-routine-l3-e1
type: single_select
skill: workflow-automation
question: In this flow, what is the trigger? "A form is submitted, AI drafts a reply, the draft is saved to your Drafts folder."
options:
  - "AI drafts a reply."
  - "A form is submitted."
  - "The draft is saved."
  - "You read the draft."
answer: 1
explanation: The trigger is the event that starts the flow. The drafting is the AI step and saving is the action.
hint: Which event happens first and starts everything else?
```

### Exercise

```yaml exercise
id: automate-your-routine-l3-e2
type: single_select
skill: workflow-automation
question: Which is the best first flow to build?
options:
  - "Email a personalized offer to every new lead automatically."
  - "Summarize new form responses into a private page only you see."
  - "Reply to all parent emails automatically."
  - "Send weekly figures to clients with no review."
answer: 1
explanation: The output stays with you, so a mistake costs little while you learn.
hint: Look for the flow where an error reaches nobody.
```

### Exercise

```yaml exercise
id: automate-your-routine-l3-e3
type: multi_select
skill: human-review
question: Select all that apply. Which habits make a flow safer?
options:
  - "Sending AI output to a draft or approval step first."
  - "Testing with sample data before using real data."
  - "Checking which data is shared with which app."
  - "Turning on auto-send once it has worked twice."
answers: [0, 1, 2]
explanation: Review, testing and data awareness reduce risk. Two good runs do not prove a flow is reliable.
hint: Choose habits that catch problems before people see them.
```

### Exercise

```yaml exercise
id: automate-your-routine-l3-e4
type: fill_blank
skill: human-review
question: Pick the action that keeps a human in control.
prompt: "New feedback form arrives, AI writes a 3-bullet summary, then ___"
options:
  - "the summary is emailed to every customer."
  - "the summary is saved as a draft for you to review."
  - "the original form is deleted."
answer: 1
explanation: A draft waits for your review, so nothing reaches people without your check.
hint: Which step lets you look before anything goes out?
```

### Exercise

```yaml exercise
id: automate-your-routine-l3-e5
type: true_false
skill: workflow-automation
question: Swipe right if true, left if false.
cards:
  - statement: Every step in a flow needs to use AI.
    answer: false
    explanation: AI is one step. Triggers and actions are ordinary automation.
  - statement: A flow that emails customers should have a person approve each message.
    answer: true
    explanation: AI can be wrong, and sent messages cannot be undone.
  - statement: Start with your most important process to learn quickly.
    answer: false
    explanation: Start with a low-risk flow so mistakes stay small.
hint: Think about the cost of a mistake at each step.
```

### Practice

```yaml practice
id: automate-your-routine-l3-practice
skill: workflow-automation
instructions: Design one small, low-risk flow for a routine task, with a human check before anything reaches people.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Design a small no-code flow that could use {{tool}} or a similar AI tool for one step.
  Describe the trigger, the AI step with its instruction, and the action.
  Say where you review the result before it reaches anyone, and how you would test it first.
default_context: You are a small-business owner who receives customer inquiries through a web form and wants help with first replies.
rubric:
  - criterion: Complete flow
    description: Names a clear trigger, an AI step with an instruction and an action.
  - criterion: Human check
    description: Places a review or approval step before anything is sent to other people.
  - criterion: Small and safe
    description: Starts with a low-risk scope, plans a test with sample data and avoids confidential data.
example_good_prompt: "Trigger: a new inquiry arrives in the web form. AI step: summarize it in 3 bullets and draft a polite reply using only our FAQ. Action: save both as a draft in my inbox, never send. I review and send the reply myself. First I test with five made-up inquiries for a week."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Letting the flow send messages directly. Ask who reads the output before it goes out.
  - Starting with a big process. Help the learner shrink it to one low-risk flow.
key_points:
  - A flow is a trigger, an AI step and an action.
  - Keep a human check before anything reaches people.
  - Start small and test with sample data.
follow_up_tasks:
  - Write one routine task as trigger, AI step and action in three short lines.
```
