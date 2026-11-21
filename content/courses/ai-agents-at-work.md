---
id: ai-agents-at-work
title: AI Agents at Work
track: general
level: advanced
description: Hand multi-step work to an AI agent with clear goals and limits, then supervise it and approve the result before anything leaves your hands.
skills: [agent-basics, task-delegation, access-boundaries, agent-review]
certificate: AI Agents Practitioner
minutes_saved_per_week: 90
stage: advanced
tools: [any]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [repetitive-tasks, research, reporting]
prerequisites: [automate-your-routine]
---

# AI Agents at Work

## Lesson 1: From chat to agents

```yaml lesson
id: ai-agents-at-work-l1
duration_min: 5
skills: [agent-basics]
goal: Explain what an AI agent does and pick tasks that suit one.
```

### Card: Chat answers, agents act

In a chat, you ask and the assistant replies once. An **agent** works toward a goal. It plans steps, uses tools such as web browsing, your files or workplace apps, checks what it finds and continues until it thinks the goal is met. Unlike a fixed flow, it chooses its own steps; you describe the outcome.

### Card: A concrete example

Goal: "Collect last month's competitor price changes from their public pages and put them in a table." The agent opens each page, compares them with your file and builds the table. In chat, you would copy every page by hand.

### Card: Which tasks suit an agent

Good fits have many steps, clear inputs and a result you can check: research, recurring reports, data gathering. Poor fits need personal judgment, handle sensitive decisions or cannot be undone. Agents can misread pages, so you stay responsible for the result.

### Exercise

```yaml exercise
id: ai-agents-at-work-l1-e1
type: single_select
skill: agent-basics
question: What mainly separates an agent from a normal chat reply?
options:
  - "It plans several steps and uses tools to work toward a goal."
  - "It is always correct because it checks itself."
  - "It answers faster than a chat assistant."
  - "It needs no instructions from you."
answer: 0
explanation: An agent acts across steps with tools. It still makes mistakes and needs a clear goal.
hint: What happens between your request and its result?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l1-e2
type: multi_select
skill: agent-basics
question: Select all that apply. Which tasks suit an agent?
options:
  - "Gathering public pricing from ten websites into a table."
  - "Compiling the weekly sales report from the same sources each Monday."
  - "Deciding which employee gets a promotion."
  - "Finding and listing public sources on a new regulation."
answers: [0, 1, 3]
explanation: These have many steps and a result you can check. A promotion is a sensitive judgment that stays with you.
hint: Look for tasks with checkable results, not personal decisions.
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l1-e3
type: true_false
skill: agent-basics
question: Swipe right if true, left if false.
cards:
  - statement: An agent can use tools such as browsing or files.
    answer: true
    explanation: Tools are what let it act beyond writing text.
  - statement: If an agent finishes, the result is verified.
    answer: false
    explanation: Finishing only means it believes it is done. You still check.
  - statement: A task you cannot undo is a poor first task for an agent.
    answer: true
    explanation: Mistakes cost more when nothing can be reversed.
hint: Ask what happens if the agent is wrong.
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l1-e4
type: fill_blank
skill: agent-basics
question: Pick the phrase that turns this chat request into an agent goal.
prompt: "Research our three main competitors. ___"
options:
  - "Tell me what you know about them."
  - "Open their public pricing pages and list each plan and price in a table, with the page link."
  - "Be thorough."
answer: 1
explanation: It names the sources, the result and the format, so you can check each row.
hint: Which option describes work in outside sources, not memory?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l1-e5
type: single_select
skill: agent-basics
question: Which task is the best first one to give an agent?
options:
  - "Sending a refund decision to a customer."
  - "Collecting this week's public job postings from three sites into a list."
  - "Deleting old files from the shared drive."
  - "Choosing which supplier to sign with."
answer: 1
explanation: It is repeatable, reads public data and the result is easy to review. The others act or decide.
hint: Prefer reading and collecting over sending, deleting or deciding.
```

### Practice

```yaml practice
id: ai-agents-at-work-l1-practice
skill: agent-basics
instructions: Choose one repeating task from your work that suits an agent and one that does not, and explain why.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Name one task related to this pain that suits an agent in {{tool}} or a workplace agent, and one that does not.
  For each, say what steps are involved, what the agent would use and what could go wrong.
default_context: You are an office manager who prepares a weekly summary of supplier updates from several public websites.
rubric:
  - criterion: Picks a suitable task
    description: The task has several steps, clear inputs and a result that can be checked.
  - criterion: Names an unsuitable task
    description: The second task involves sensitive judgment or cannot be undone, and the learner says why.
  - criterion: Sees the risks
    description: The learner names a realistic error and how they would notice it.
example_good_prompt: "Suits an agent: each Monday, open our five suppliers' public news pages and list new announcements with links. Steps: visit, read, summarize; it needs browsing. Risk: it may miss or misread a page, so I spot-check two links. Does not suit: deciding which supplier to drop, because that is a judgment with business consequences."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners think an agent is just a smarter chat. Ask what tools it would use and what steps it would take.
  - Learners pick high-stakes first tasks. Steer them to reading and collecting tasks.
key_points:
  - An agent plans steps and uses tools toward a goal.
  - Good tasks are multi-step, repeatable and checkable.
  - You stay responsible for the result.
follow_up_tasks:
  - List three tasks from last week and mark each as suited, unsuited or unsure for an agent.
```

## Lesson 2: Delegate a task well

```yaml lesson
id: ai-agents-at-work-l2
duration_min: 5
skills: [task-delegation, access-boundaries]
goal: Write a delegation brief with a goal, inputs, boundaries and a definition of done.
```

### Card: Four parts of a brief

Treat an agent like a new colleague. Give it a **goal** (the outcome and why), **inputs** (files, links, data to use), **boundaries** (what it may and may not do) and **done** (what the result looks like). Vague goals make an agent guess.

### Card: Boundaries and access

Give access only to what the task needs. A research task needs public web pages, not your inbox. Say what is off limits: "Read only. Do not send, edit, buy or delete anything. If you need something else, stop and ask me." Keep confidential data out unless your company approves the tool.

### Card: Example brief

"Goal: compare three competitor plans for Friday's pricing meeting. Inputs: our price list file, three public pricing pages. Boundaries: public pages only, read only, no sign-ups. Done: one table with plan, price and page link, plus a list of anything you could not verify."

### Exercise

```yaml exercise
id: ai-agents-at-work-l2-e1
type: single_select
skill: task-delegation
question: Which brief is best for an agent?
options:
  - "Look into our competitors."
  - "Goal: list three competitors' plans for Friday's meeting. Use these public pages only. Done: a table with prices and links."
  - "Do whatever you need to find their prices."
  - "Research competitors and email the team when ready."
answer: 1
explanation: It gives a goal, inputs, a boundary and a clear end result. The others leave steps or access open.
hint: Which option covers all four parts?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l2-e2
type: multi_select
skill: access-boundaries
question: Select all that apply. Which boundaries make sense for a research agent?
options:
  - "Use public web pages only."
  - "Read only: do not send, buy or delete anything."
  - "Ask me before using any other source."
  - "Full access to my email so it has context."
answers: [0, 1, 2]
explanation: Limited access and a duty to ask reduce harm if the agent errs. Email access is not needed for this task.
hint: Which options reduce what the agent can touch?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l2-e3
type: fill_blank
skill: task-delegation
question: Pick the phrase that defines "done" best.
prompt: "Prepare the weekly sales summary from the attached export. ___"
options:
  - "Finish when it looks good."
  - "Done means one page: total sales, top three products and any week-on-week drop above 10 percent."
  - "Make it complete."
answer: 1
explanation: A concrete result lets the agent stop at the right point and lets you check it quickly.
hint: Which result could you check quickly?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l2-e4
type: true_false
skill: access-boundaries
question: Swipe right if true, left if false.
cards:
  - statement: Give the agent broad access now so you do not need to adjust it later.
    answer: false
    explanation: Broad access increases the damage a mistake can cause.
  - statement: Telling the agent to stop and ask when unsure is a useful boundary.
    answer: true
    explanation: It prevents guesses on unclear steps.
  - statement: Personal data can go to any agent tool without a check.
    answer: false
    explanation: Use only tools your company approves for that data.
hint: Ask what is the smallest access that still finishes the task.
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l2-e5
type: single_select
skill: access-boundaries
question: You want an agent to gather candidate questions from a public forum. Which access is right?
options:
  - "Read-only web browsing."
  - "Browsing plus access to the applicant tracking system."
  - "Browsing plus permission to post replies."
  - "Browsing plus access to the whole shared drive."
answer: 0
explanation: Gathering needs only reading. Extra access adds risk and exposes candidate data.
hint: Compare each option with what the task actually requires.
```

### Practice

```yaml practice
id: ai-agents-at-work-l2-practice
skill: task-delegation
instructions: Write a delegation brief with goal, inputs, boundaries and definition of done for one real task.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a brief for an agent in {{tool}} or a workplace agent that handles one task related to this pain.
  Include the goal, the inputs, what it may and may not access or do, and what done looks like. Use no confidential data.
default_context: You are an office manager who needs a table of three suppliers' public delivery terms before Friday.
rubric:
  - criterion: Clear goal and inputs
    description: States the outcome, the purpose and which sources or files to use.
  - criterion: Boundaries and minimal access
    description: Says what is allowed and forbidden, limits access to what the task needs and asks it to stop when unsure.
  - criterion: Checkable done
    description: Describes the result's format and what to flag as unverified.
example_good_prompt: "Goal: compare delivery terms of suppliers A, B and C for Friday's review. Inputs: their public terms pages. Boundaries: public pages only, read only, no sign-ups or emails; stop and ask if a page needs login. Done: one table with supplier, delivery time, cost and link, plus a list of anything unclear."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Briefs with a goal but no boundaries. Ask what the agent must never do.
  - Granting wide access for convenience. Ask what the task truly needs.
key_points:
  - Goal, inputs, boundaries, done.
  - Minimal access for the task.
  - Tell the agent to stop and ask when unsure.
follow_up_tasks:
  - Rewrite the request "handle my weekly report" as a four-part brief.
```

## Lesson 3: Supervise and review

```yaml lesson
id: ai-agents-at-work-l3
duration_min: 5
skills: [agent-review]
goal: Review an agent's steps and sources, approve risky actions yourself and tighten your instructions after a failure.
```

### Card: Check the steps, not just the result

Agents can misread a page, skip a source or fill a gap with a guess. Ask for a short log of what it did and open the sources behind key facts. The log can be wrong too. Spot-check a few rows. If the first steps look wrong, stop early instead of waiting for the final result.

### Card: You approve the irreversible

Require your approval before anything is **sent, paid or deleted**, or shared outside the company. Let the agent prepare drafts, orders or lists, then you review and press the button. Start small and widen only after it proves reliable.

### Card: Learn from failures

When a result is wrong, find the step where it went off. Was the goal unclear, the source weak or a boundary missing? Add that line to your brief, for example "Use only pages updated this year", and run again. A tighter brief is the fix, not more trust.

### Exercise

```yaml exercise
id: ai-agents-at-work-l3-e1
type: single_select
skill: agent-review
question: An agent's table lists a competitor price with no link. What do you do?
options:
  - "Use it, because the rest of the table looks fine."
  - "Ask for the source link and open it before using the number."
  - "Ask the agent if it is sure."
  - "Delete the row and say nothing."
answer: 1
explanation: A figure without a source cannot be checked. Asking if it is sure does not verify anything.
hint: Where could you confirm the number yourself?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l3-e2
type: multi_select
skill: agent-review
question: Select all that apply. Which actions should wait for your approval?
options:
  - "Sending a message to a client."
  - "Paying a supplier invoice."
  - "Deleting old files."
  - "Reading a public web page."
answers: [0, 1, 2]
explanation: Sending, paying and deleting are hard to undo. Reading a public page is low risk.
hint: Which actions are hard to reverse?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l3-e3
type: fill_blank
skill: agent-review
question: Pick the instruction that makes supervision easier.
prompt: "Collect the data and build the report. ___"
options:
  - "Work quietly and tell me when finished."
  - "List the steps you took and the source of each figure, and stop before sending anything."
  - "Send it to the team when ready."
answer: 1
explanation: A log and sources let you review, and stopping keeps the decision with you.
hint: Which option leaves you able to check and decide?
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l3-e4
type: true_false
skill: agent-review
question: Swipe right if true, left if false.
cards:
  - statement: After a failure, add the missing boundary or detail to your brief.
    answer: true
    explanation: A tighter brief prevents the same mistake.
  - statement: A good agent run means you can stop checking sources.
    answer: false
    explanation: Reliability can change with the task and sources, so keep spot-checking.
  - statement: You can widen the agent's tasks gradually as it proves reliable.
    answer: true
    explanation: Small steps limit the cost of early mistakes.
hint: Ask what you learn from each run.
```

### Exercise

```yaml exercise
id: ai-agents-at-work-l3-e5
type: single_select
skill: agent-review
question: An agent used an outdated page for its figures. What is the best fix?
options:
  - "Switch to a different agent tool."
  - "Rerun it unchanged and hope for better luck."
  - "Add to the brief: use only pages updated this year, and list the date of each source."
  - "Fix the figures yourself and leave the brief alone."
answer: 2
explanation: Naming the missing rule and asking for dates prevents the error and makes it visible next time.
hint: Which option changes the instructions?
```

### Practice

```yaml practice
id: ai-agents-at-work-l3-practice
skill: agent-review
instructions: Write a review plan for an agent run and a revised brief line after a failure.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  An agent in {{tool}} or a workplace agent will handle a task related to this pain.
  Write what you will check during and after the run, which actions need your approval,
  and one line you would add to the brief after the agent used a weak source.
default_context: You are an office manager. An agent compiled supplier delivery terms, and one figure came from an outdated page.
rubric:
  - criterion: Checks steps and sources
    description: Names specific checks such as the step log, source links or spot-checked rows.
  - criterion: Keeps approval
    description: Requires approval before sending, paying or deleting, and names which actions apply.
  - criterion: Tightens the brief
    description: Adds a concrete instruction that addresses the failure.
example_good_prompt: "I will ask for a step log and a link and date for every figure, and open three links myself. The agent must stop before sending anything; I approve all emails and orders. After the outdated page I add: use only official pages updated this year and flag any source older than 12 months."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Judging only the final result. Ask what the agent did to get there.
  - Letting the agent send or delete directly. Ask who presses the button.
key_points:
  - Check steps and sources, not only the output.
  - Approve anything sent, paid or deleted.
  - Fix failures by tightening the brief.
follow_up_tasks:
  - Take one past AI result and list which steps you would have wanted to see.
```
