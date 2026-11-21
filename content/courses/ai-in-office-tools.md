---
id: ai-in-office-tools
title: AI in Your Office Tools
track: general
level: beginner
description: Use the AI inside your email, documents, spreadsheets and slides to finish routine work faster, while checking the output and protecting company data.
skills: [ai-drafting, data-privacy, verification, spreadsheet-analysis, presentation-structuring, iteration]
certificate: AI in Office Tools Essentials
minutes_saved_per_week: 90
stage: tools
tools: [microsoft-365, google-workspace]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [email, documents, data, reporting]
prerequisites: [ai-assistants-101]
---

# AI in Your Office Tools

## Lesson 1: Email and documents with built-in AI

```yaml lesson
id: ai-in-office-tools-l1
duration_min: 5
skills: [ai-drafting, iteration, data-privacy, verification]
goal: Draft, reshape and summarize emails and documents with built-in AI, using only approved tools.
```

### Card: Draft from facts, not from nothing

If your company has turned them on, Microsoft 365 Copilot and Gemini in Google Workspace can draft inside your email and documents. Give them the facts: who reads it, what happened, what you need and by when. A reply to a late supplier needs the order number, missed date and new deadline.

### Card: Reshape and condense

Ask the AI to make a draft warmer, shorter or more formal, or to summarize a long thread into decisions, open questions and owners. Read the original for anything about money, deadlines or commitments.

### Card: Approved tools versus personal accounts

Company-approved tools usually run under your organization's data rules. A personal ChatGPT account does not. Never paste client details, contracts or staff data into a personal account. Unsure? Ask IT first.

### Exercise

```yaml exercise
id: ai-in-office-tools-l1-e1
type: single_select
skill: ai-drafting
question: Your supplier delivered late. Which request gives the built-in AI the best starting point for a reply?
options:
  - "Write a reply to this supplier."
  - "Write a firm, polite reply: order 4471 arrived 5 days late; I need delivery by Friday and a call this week."
  - "Make my email better."
answer: 1
explanation: The AI cannot know your facts. The problem, deadline and ask let it draft something close to ready.
hint: Look for the option with facts the AI could not guess.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l1-e2
type: multi_select
skill: verification
question: Select all that apply. AI summarized a 40-message thread. What do you check before acting?
options:
  - Dates and deadlines
  - Amounts and numbers
  - Whether the summary sounds confident
  - Who agreed to do what
answers: [0, 1, 3]
explanation: Summaries slip on dates, numbers and ownership. A confident tone proves nothing.
hint: Think about the details that cause real problems if wrong.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l1-e3
type: fill_blank
skill: iteration
question: Pick the phrase that best completes the follow-up request.
prompt: "Rewrite your draft for a senior client. ___ Keep every fact the same."
options:
  - "Make it good."
  - "Use a formal tone, under 120 words, no casual phrases."
  - "Change everything."
answer: 1
explanation: A good follow-up names the tone and length, and says what must stay unchanged.
hint: Pick the instruction you could measure when you read the result.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l1-e4
type: true_false
skill: data-privacy
question: Swipe right if true, left if false.
cards:
  - statement: A company-approved AI tool and a personal ChatGPT account follow the same data rules.
    answer: false
    explanation: Approved tools are set up under your organization's agreements. Personal accounts are not.
  - statement: If a document contains client details, ask which AI tool is approved before using it.
    answer: true
    explanation: Asking is cheap. A data leak is not.
  - statement: Replacing a client's name with "Client A" makes any contract safe to paste into any tool.
    answer: false
    explanation: Other details can still identify the client or be confidential. Use an approved tool or ask first.
hint: Ask who controls the data after you paste it.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l1-e5
type: single_select
skill: data-privacy
question: Your company has no approved AI tool yet. You need to summarize a client complaint email. What is the best move?
options:
  - Paste it into your personal AI account, since it is only a summary.
  - Remove the client's name only, then paste it.
  - Ask your manager or IT what is allowed, and summarize it yourself.
answer: 2
explanation: Names are only part of the risk. Complaint details can identify a client too, so check the rules first.
hint: When the rules are unclear, who should decide?
```

### Practice

```yaml practice
id: ai-in-office-tools-l1-practice
skill: ai-drafting
instructions: Write the request you would give your built-in AI to draft a message for a real situation at work. Use made-up details instead of real names.
task_template: >
  You work as {{role}} and use {{tool}}. One of your daily pains is {{pain}}.
  Write the request you would give the AI to draft a message about this. Include the
  reader, the key facts, the tone and the length. Add one line on what you would check before sending.
default_context: You are an office coordinator who must reply to a colleague who missed a deadline for a shared report.
rubric:
  - criterion: Gives the facts
    description: Names the situation, the reader and the specific details the draft needs.
  - criterion: Sets tone and length
    description: Asks for a tone and a length or structure.
  - criterion: Plans a check
    description: Says what will be verified before sending and avoids real confidential data.
example_good_prompt: "Draft a polite but firm email to a colleague who missed Tuesday's deadline for the shared sales report. Say I need it by noon Thursday, keep it under 100 words, no blame. Before sending I will check the dates and the tone."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners write vague requests like "write an email". Ask for the reader, facts and deadline.
  - Learners send AI summaries unchecked. Have them find one detail in the original thread.
  - Learners think a personal account is fine for a quick task. Ask who controls pasted data afterwards.
key_points:
  - Give facts, reader, tone and length.
  - Check dates, numbers and commitments yourself.
  - Use company-approved tools for work data.
follow_up_tasks:
  - Take a short email you wrote and ask AI for a formal and a friendly version. Note what changed in the facts.
```

## Lesson 2: Spreadsheets with AI

```yaml lesson
id: ai-in-office-tools-l2
duration_min: 5
skills: [spreadsheet-analysis, verification, data-privacy]
goal: Get formulas explained or written, clean messy data and analyze an export, then spot-check the results.
```

### Card: Explain and write formulas

Paste a formula you inherited and ask the AI to explain it step by step. Or describe what you want: "Sum column C where column A says North and column B is March." Say what each column holds, and test the formula on rows you can calculate by hand.

### Card: Clean messy data

Exports often have mixed date formats, extra spaces and names written three ways. Ask the AI how to fix one problem at a time, in a copy of your sheet. Never clean your only version.

### Card: Analyze, then spot-check

Ask for trends, outliers or a summary of an export. The AI can miscount or skip rows without warning. Check the row count, recalculate one total and look at the biggest and smallest values. Do not share names, salaries or other personal data with a tool that is not approved.

### Exercise

```yaml exercise
id: ai-in-office-tools-l2-e1
type: single_select
skill: spreadsheet-analysis
question: Which request is most likely to produce a working formula?
options:
  - "Make a formula for my sales."
  - "In column D, sum the amounts in column C only where column A is North and column B is March."
  - "Calculate everything in my sheet."
answer: 1
explanation: Naming the columns and conditions removes guesswork.
hint: The AI cannot see your intent, only your words.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l2-e2
type: multi_select
skill: verification
question: Select all that apply. The AI gives a total for 500 rows. Which checks make sense?
options:
  - Compare the row count in the answer with the sheet
  - Recalculate the total with a simple sum yourself
  - Trust it, because it is a calculation
  - Check the largest and smallest values for oddities
answers: [0, 1, 3]
explanation: Quick manual checks catch skipped rows and misread numbers.
hint: Which checks take two minutes and use only the sheet?
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l2-e3
type: fill_blank
skill: spreadsheet-analysis
question: Pick the phrase that makes this cleaning request work.
prompt: "Column B holds dates typed in different formats. ___ Do not change any other column."
options:
  - "Fix it."
  - "Give me a formula that converts them all to day/month/year, and list any cells it cannot convert."
  - "Make the dates pretty."
answer: 1
explanation: One clear format and a list of failures make problems visible.
hint: Good requests also expose what could not be fixed.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l2-e4
type: true_false
skill: data-privacy
question: Swipe right if true, left if false.
cards:
  - statement: An HR export with names and salaries should not go into an unapproved AI tool.
    answer: true
    explanation: Personal data should stay in approved systems. Use an approved tool, or remove identifying data and ask first.
  - statement: It is wise to clean your only copy of a dataset directly.
    answer: false
    explanation: Work on a copy so you can compare and undo.
  - statement: AI can explain a formula you did not write.
    answer: true
    explanation: This is a safe, useful task. Still test the formula on a few rows.
hint: Think about what you could not get back.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l2-e5
type: single_select
skill: verification
question: AI says your top-selling region is West, but you remember East being higher. What do you do?
options:
  - Accept it, since the AI looked at all the data.
  - Filter the sheet by region, sum each one yourself and compare.
  - Ask the AI again until it says East.
answer: 1
explanation: Your own check settles it. Re-asking until you hear what you expect proves nothing.
hint: Which option uses evidence from the sheet?
```

### Practice

```yaml practice
id: ai-in-office-tools-l2-practice
skill: spreadsheet-analysis
instructions: Write the request you would give an AI assistant about a spreadsheet from your work, and describe how you would check the answer.
task_template: >
  You work as {{role}} and use {{tool}}. One of your daily pains is {{pain}}.
  Write a request asking the AI for a formula, a data cleanup or a quick analysis related
  to a spreadsheet you use. Describe the columns, say what you want back, and
  explain how you would spot-check the result. Use made-up data only.
default_context: You have a monthly expenses export with columns for date, department, supplier and amount, and you need totals per department.
rubric:
  - criterion: Describes the data
    description: Names the columns and what they contain.
  - criterion: States the outcome
    description: Says exactly what result or format is wanted.
  - criterion: Includes a spot-check
    description: Names a concrete check, such as recalculating one total or comparing row counts.
example_good_prompt: "My sheet has columns A date, B department, C supplier, D amount. Write a formula that totals D for each department, and list any rows where the amount is empty. I will check by filtering one department and adding it up myself."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners do not describe columns. Ask what each one holds.
  - Learners accept totals unchecked. Have them recalculate one number by hand.
  - Learners upload real personal data. Remind them to use approved tools or leave the data out.
key_points:
  - Describe the columns and the goal.
  - Work on a copy of your data.
  - Always spot-check totals and counts.
follow_up_tasks:
  - Ask AI to explain a formula from your own sheet, then rebuild its result on two rows by hand.
```

## Lesson 3: From notes to a presentation or report

```yaml lesson
id: ai-in-office-tools-l3
duration_min: 5
skills: [presentation-structuring, iteration, verification]
goal: Turn rough notes into a presentation or report by building an outline first, then content, then a version tuned for the audience.
```

### Card: Outline first

Do not ask for a full deck from a pile of notes. Paste the notes and ask for an outline: the audience, the one message they should leave with, and four to six sections. Change the outline until the structure is right.

### Card: Then slides or sections

Once the outline is right, ask for one part at a time. For slides, ask for a title that states the point and three short bullets. For a report, ask for a paragraph per section. Tell the AI to use only your notes and to mark any gap instead of inventing a number.

### Card: Tighten for the audience

Your manager wants decisions and costs. A client wants benefits. A team wants next steps. Ask for the content rewritten for one reader and a time limit, then check every number, name and claim against your notes.

### Exercise

```yaml exercise
id: ai-in-office-tools-l3-e1
type: single_select
skill: presentation-structuring
question: You have messy meeting notes and need a deck for your director. What is the best first request?
options:
  - "Make a 20-slide deck from these notes."
  - "Suggest an outline for a 10-minute update to my director: one key message, five sections."
  - "Make my notes look professional."
answer: 1
explanation: An outline lets you fix the structure while changes are still cheap.
hint: What is easiest to correct before any slides exist?
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l3-e2
type: multi_select
skill: verification
question: Select all that apply. AI turned your notes into slides. What do you check?
options:
  - Every number against your notes
  - Whether any claim appears that is not in your notes
  - Whether the slides look modern
  - Names and dates
answers: [0, 1, 3]
explanation: Slides can add invented facts or change figures. Looks can wait until the facts are right.
hint: Compare the output with your source, not with your taste.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l3-e3
type: fill_blank
skill: iteration
question: Pick the phrase that best tunes this section for its reader.
prompt: "Rewrite this section for the finance director. ___ Use only the figures in my notes."
options:
  - "Make it better."
  - "Lead with total cost and the decision needed, and cut it to three bullets."
  - "Add more detail."
answer: 1
explanation: The reader's priority and a size limit shape the rewrite. Restricting it to your figures prevents invention.
hint: A finance director cares about cost and decisions.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l3-e4
type: true_false
skill: presentation-structuring
question: Swipe right if true, left if false.
cards:
  - statement: Asking the AI to mark gaps is safer than letting it fill missing numbers.
    answer: true
    explanation: A marked gap is visible. An invented number looks like a fact.
  - statement: A slide title should state the point, not just the topic.
    answer: true
    explanation: 'A title like "Revenue grew 8% in Q2" tells the audience more than "Revenue".'
  - statement: Slides built from your notes need no checking if they look polished.
    answer: false
    explanation: Polish hides errors. Compare every figure and claim with your notes.
hint: Ask what a reader sees on the slide.
```

### Exercise

```yaml exercise
id: ai-in-office-tools-l3-e5
type: single_select
skill: iteration
question: The first outline buries the decision you need from your manager at the end. What next?
options:
  - Start over with a new chat.
  - Ask the AI to move the decision to the first section and shorten the background.
  - Keep it, since the AI chose that order for a reason.
answer: 1
explanation: Refining the outline beats starting over. You know what the audience needs.
hint: You are the expert on the audience.
```

### Practice

```yaml practice
id: ai-in-office-tools-l3-practice
skill: presentation-structuring
instructions: Write your outline request for a short presentation or report. Name the audience, the key message and what the AI should do about missing facts.
task_template: >
  You work as {{role}} and use {{tool}}. One of your daily pains is {{pain}}.
  Write a request that turns rough notes into an outline for a presentation or report on this topic.
  Include the audience, the key message, the number of sections and a limit on length. Add an instruction on
  what the AI should do about missing facts.
default_context: You must present a quarterly update from rough notes to your manager, who has 10 minutes and wants decisions and costs.
rubric:
  - criterion: Names the audience and message
    description: Says who the reader is and what they should take away.
  - criterion: Asks for structure and limits
    description: Requests an outline with sections and a length or time limit.
  - criterion: Controls invention
    description: Tells the AI to use only the supplied notes and mark gaps.
example_good_prompt: "Here are my notes (pasted below). Create an outline for a 10-minute update to my manager. The key message is that we need budget approval. Give five sections, put the decision first, use only my notes, and mark any missing figure as [gap]."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners request a whole deck at once. Steer them to outline first.
  - Learners let the AI add numbers. Teach "use only my notes, mark gaps".
  - Learners skip the audience. Ask who reads it and what they decide.
key_points:
  - Outline first, then content, then tighten.
  - Say who the audience is and the one key message.
  - Check every number against your notes.
follow_up_tasks:
  - Take one slide and ask for versions for a manager and a client. Note what each version put first.
```
