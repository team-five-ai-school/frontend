---
id: safe-ai-at-work
title: Safe AI at Work
track: general
level: beginner
description: Decide what you can paste into an AI tool, remove identifying details before you prompt, and follow clear rules for responsible AI use at work.
skills: [data-classification, anonymization, responsible-use]
certificate: Safe AI Use at Work
minutes_saved_per_week: 15
stage: foundation
tools: [any]
recommended_for: [general, marketing, hr, teachers, lawyers, small-business]
pains: [documents, data, email]
prerequisites: []
---

# Safe AI at Work

## Lesson 1: Know what you are pasting and where

```yaml lesson
id: safe-ai-at-work-l1
duration_min: 5
skills: [data-classification]
goal: Sort your work information into four categories and decide which tool, if any, may receive it.
```

### Card: Personal tool or company tool

A free personal AI account and a company-provided tool can look identical. Behind the screen, settings and contracts differ: what is stored, who can read it, and whether it helps train the service. You cannot see this in the chat window. Use the tools your company approves for work.

### Card: Four kinds of information

**Public:** already published, such as your website copy. **Internal:** meant for staff, such as a meeting agenda. **Confidential:** harmful if leaked, such as pricing, contracts or financials. **Personal data:** anything about an identifiable person, such as names, addresses or performance reviews. The higher the risk, the fewer tools may receive it.

### Card: A real example

A customer complaint names the customer and quotes their address. That is personal data. Do not paste it into a personal tool. In an approved tool, paste it only if your rules allow that category. If unsure, ask before you paste.

### Exercise

```yaml exercise
id: safe-ai-at-work-l1-e1
type: single_select
skill: data-classification
question: What is the most important difference between a personal AI account and a company-approved tool?
options:
  - "The approved tool always gives better answers."
  - "Storage and contracts can differ, even if the screen looks the same."
  - "Personal accounts are less accurate, which is the main risk."
  - "There is no difference if you delete the chat afterwards."
answer: 1
explanation: Storage and use depend on the settings and agreements behind the tool, not on the screen.
hint: Think about what you can see in the chat window and what you cannot.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l1-e2
type: multi_select
skill: data-classification
question: Select all that apply. Which of these are personal data?
options:
  - "A customer's home address in an email."
  - "An employee's performance review."
  - "Your company's published opening hours."
  - "A student's grades with their name."
answers: [0, 1, 3]
explanation: Each of these is about an identifiable person. Published opening hours describe the company, not a person.
hint: Ask whether the information is about a specific person you could name.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l1-e3
type: true_false
skill: data-classification
question: Swipe right if true, left if false.
cards:
  - statement: If a tool looks professional, it is safe for confidential documents.
    answer: false
    explanation: Appearance says nothing about contracts or settings. Rely on your company's approval.
  - statement: Internal information, such as a staff agenda, should stay out of personal AI accounts.
    answer: true
    explanation: Internal means meant for staff only, so it should not leave approved channels.
  - statement: Information that is already public carries little risk in an AI tool.
    answer: true
    explanation: Public means anyone can already read it. Your own rules still come first.
hint: Separate how a tool looks from what the company has agreed with it.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l1-e4
type: fill_blank
skill: data-classification
question: Pick the phrase that makes this habit safe.
prompt: "Before I paste a document into an AI tool, I ___"
options:
  - "check that the chat history is turned on."
  - "check what kind of information it contains and whether my company allows it in this tool."
  - "check that it is shorter than a page."
answer: 1
explanation: The information category and the tool's approval decide what is allowed.
hint: Which check depends on the information and the tool, not on the format?
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l1-e5
type: single_select
skill: data-classification
question: Draft salary bands that only the leadership team has seen are which category?
options:
  - "Public"
  - "Internal, so any tool is fine"
  - "Confidential"
  - "No category, because there are no names"
answer: 2
explanation: Leaked salary plans could harm the company and staff. Missing names do not make information harmless.
hint: Ask who would be affected if this document leaked.
```

### Practice

```yaml practice
id: safe-ai-at-work-l1-practice
skill: data-classification
instructions: List three kinds of information from your work and sort each into a category, then say which you would never paste into a personal tool.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Name three pieces of information you handle while dealing with this pain. Sort each into public, internal, confidential or personal data.
  Then say which one you would never paste into a personal tool, and what you would check before using {{tool}} for the others.
default_context: You are an office coordinator who handles customer emails, a staff rota and the company's price list.
rubric:
  - criterion: Sorts correctly
    description: Each item is placed in a sensible category with a short reason.
  - criterion: Spots the riskiest items
    description: Personal or confidential items are identified as not suitable for a personal tool.
  - criterion: Names a real check
    description: Mentions company rules, approved tools or asking a responsible person before pasting.
example_good_prompt: "1) The published price page is public. 2) The staff rota is internal. 3) A customer email with an address is personal data. I would never paste the email into a personal tool. Before using any tool I would check our company rules and whether it is approved for that category."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners judge a tool by how professional it looks. Ask what their company has approved.
  - Learners treat text without names as harmless. Ask who could be harmed if it leaked.
key_points:
  - Settings and contracts differ between personal and approved tools.
  - Use four categories: public, internal, confidential, personal data.
  - When unsure, ask before pasting.
follow_up_tasks:
  - Pick five documents from your last week and label each with a category.
```

## Lesson 2: Anonymize before you prompt

```yaml lesson
id: safe-ai-at-work-l2
duration_min: 5
skills: [anonymization]
goal: Rewrite a text so an AI tool can help without receiving details that identify a person or client.
```

### Card: Replace the details

You rarely need real details to get help with wording. Replace names with placeholders like [Client]. Remove IDs and account numbers. Swap exact amounts for [Amount] or a range. Turn dates into "last month". Then add the real details back.

### Card: Names are not the only clue

A combination of facts can point to one person without a name. "The only part-time designer in the Northside office who joined last spring" identifies someone. So do a rare job title or a unique event. Look for details only one person or client could match.

### Card: A before and after

Before: "Maria Lopez, account 48213, owes 2,300 and missed the 3 March deadline."

After: "A long-standing client owes [Amount] and missed a recent deadline. Draft a polite reminder."

The task is unchanged. Read your version as a stranger would. Could you guess who it is about? If yes, remove more.

### Exercise

```yaml exercise
id: safe-ai-at-work-l2-e1
type: single_select
skill: anonymization
question: Which version is the safest to paste into a personal AI tool?
options:
  - "Draft a reminder to Maria Lopez about invoice 48213."
  - "Draft a reminder to M. L. about her late invoice."
  - "Draft a reminder to a client about a late invoice. Use [Name] and [Amount]."
  - "Draft a reminder to the client in apartment 5 about invoice 48213."
answer: 2
explanation: Only the third removes the name and number and keeps placeholders.
hint: Check each option for a name, a number or a place.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l2-e2
type: multi_select
skill: anonymization
question: Select all that apply. Which details could still identify someone after the name is removed?
options:
  - "Their exact job title in a very small team."
  - "A unique event only they attended."
  - "A general label such as 'a client'."
  - "Their employee ID."
answers: [0, 1, 3]
explanation: Rare titles, unique events and IDs point to one person. A general word like client does not.
hint: Think about which details only one person could match.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l2-e3
type: fill_blank
skill: anonymization
question: Pick the phrase that makes the prompt safe and still useful.
prompt: "Summarize this complaint and suggest a reply. ___"
options:
  - "The customer is John Reid from Dock Street."
  - "The customer is [Customer]; the order was [Order] and the amount was [Amount]."
  - "The customer is the regular who always orders the oak table on Fridays."
answer: 1
explanation: Placeholders keep the task, not the identity.
hint: Which option gives the tool the task but not the person?
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l2-e4
type: true_false
skill: anonymization
question: Swipe right if true, left if false.
cards:
  - statement: Removing the name is always enough to anonymize a text.
    answer: false
    explanation: Combinations of details can still point to one person or client.
  - statement: You can add the real details back after the AI gives you a draft.
    answer: true
    explanation: Placeholders let you fill in names and numbers yourself.
  - statement: Rounding an exact amount can reduce what a text reveals.
    answer: true
    explanation: Exact amounts can be matched to a record. A range is harder to match.
hint: Ask whether the detail changes the help you want or only reveals who is involved.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l2-e5
type: single_select
skill: anonymization
question: After anonymizing, what is a good final check?
options:
  - "Ask the AI whether it can identify the person."
  - "Read the text as a stranger and see if you could guess who it is about."
  - "Check that every placeholder uses the same brackets."
  - "Check that the text is short."
answer: 1
explanation: A stranger test catches combinations of details.
hint: Whose view matters when judging if someone is identifiable?
```

### Practice

```yaml practice
id: safe-ai-at-work-l2-practice
skill: anonymization
instructions: Rewrite a realistic work message so it can be pasted safely, then write the prompt you would send.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Invent a short realistic message or note related to this pain that contains a name, an amount, a date and one unique detail.
  Show the anonymized version, then write the prompt you would send to {{tool}}.
default_context: A manager asks you to reply to a client named Sam Parker, account 77120, who disputes a 1,450 charge from 12 May after a unique on-site visit.
rubric:
  - criterion: Removes direct identifiers
    description: Names, IDs, exact amounts and exact dates are replaced with placeholders or general wording.
  - criterion: Removes unique details
    description: Details that only one person or client could match are removed or generalized.
  - criterion: Keeps the task useful
    description: The final prompt still states what the tool should produce, such as tone and length.
example_good_prompt: "A client disputes a recent charge of [Amount] after a service visit. Write a calm reply of under 100 words that acknowledges the concern, explains that we will review the details and asks for [Information needed]. I will add names and figures myself."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners delete only the name. Ask which other details point to the same person.
  - Learners make the prompt too vague to be useful. Show how to keep the task and drop the identity.
key_points:
  - Replace names, IDs, amounts and dates with placeholders.
  - Unique combinations of facts can still identify someone.
  - Read the result as a stranger would.
follow_up_tasks:
  - Anonymize a real email from your inbox and ask a colleague to guess who it is about.
```

## Lesson 3: Set your own rules for AI at work

```yaml lesson
id: safe-ai-at-work-l3
duration_min: 5
skills: [responsible-use]
goal: Apply company rules, decide when to disclose AI use or avoid it, and respond properly when AI output causes a mistake.
```

### Card: Policy first

Your company's rules come before any tip you read. Follow the policy and use only approved tools, even when a personal tool is faster. If you cannot find a policy, ask your manager or IT team. No rule is not the same as permission.

### Card: Be open when it matters

Say when AI helped if it affects trust or decisions: client deliverables, assessed work, or anything your rules require. You need not announce every rewritten sentence. If asked, answer honestly. You remain responsible for what you send.

### Card: When not to use AI

Do not use AI when rules forbid it, when you cannot remove sensitive details, or to make a decision about a person, such as hiring or grading. A person with authority must decide.

### Card: When it goes wrong

If AI output caused a mistake, act quickly. Tell your manager or the affected person, and correct the error. Report accidentally shared sensitive data to whoever handles data at your company.

### Exercise

```yaml exercise
id: safe-ai-at-work-l3-e1
type: single_select
skill: responsible-use
question: Your company has no written AI policy. What should you do?
options:
  - "Assume it is allowed."
  - "Ask your manager or IT team what is allowed before you use AI for work data."
  - "Use a personal tool, since no rule forbids it."
  - "Wait and see."
answer: 1
explanation: A missing policy is not permission. Asking first protects everyone.
hint: Consider who can tell you what the company accepts.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l3-e2
type: multi_select
skill: responsible-use
question: Select all that apply. In which situations should you avoid AI or get approval first?
options:
  - "Rejecting a candidate based only on an AI summary."
  - "Rewriting a public blog post for tone."
  - "Your policy forbids AI for the client contract you are drafting."
  - "You cannot remove personal data from the text."
answers: [0, 2, 3]
explanation: Decisions about people, forbidden uses and unprotectable data rule AI out. A public post is low risk.
hint: Look for situations involving a person's outcome, a rule or data you cannot protect.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l3-e3
type: true_false
skill: responsible-use
question: Swipe right if true, left if false.
cards:
  - statement: You are responsible for AI-assisted work you send under your name.
    answer: true
    explanation: You are accountable, not the tool.
  - statement: You must announce every sentence an AI rephrased.
    answer: false
    explanation: Disclose when trust, decisions or rules require it.
  - statement: Fixing a data mistake quietly is better than reporting it.
    answer: false
    explanation: Early reporting lets the right people limit harm.
hint: Ask who is accountable and who needs to know.
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l3-e4
type: fill_blank
skill: responsible-use
question: Pick the best first step after you notice an AI-generated error in a sent report.
prompt: "I will ___"
options:
  - "wait to see if anyone notices."
  - "tell my manager and the recipient, send a correction and note what happened."
  - "delete the AI chat and say nothing."
answer: 1
explanation: Prompt disclosure and a correction reduce harm. Hiding the error makes it worse.
hint: Who needs to know, and how soon?
```

### Exercise

```yaml exercise
id: safe-ai-at-work-l3-e5
type: single_select
skill: responsible-use
question: A teacher uses AI to draft feedback comments. Which use is appropriate?
options:
  - "Let the AI decide each student's final grade."
  - "Use AI to suggest wording, then review the comments and decide the grade yourself."
  - "Paste each student's full name and record into a personal tool."
  - "Send the AI comments without reading them."
answer: 1
explanation: AI helps with wording; the teacher checks and decides. The others hand over a decision or expose data.
hint: Which option keeps the decision with a person and the data protected?
```

### Practice

```yaml practice
id: safe-ai-at-work-l3-practice
skill: responsible-use
instructions: Write a short personal AI rulebook for your work with at least four rules.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a personal rulebook of four to five rules for using {{tool}} safely for this part of your work.
  Cover company policy, disclosure, a situation where you would not use AI, and what you would do after a mistake.
default_context: You are an office administrator who starts using AI to draft emails and summarize documents.
rubric:
  - criterion: Follows policy
    description: At least one rule says to follow company policy or ask when unsure.
  - criterion: Covers disclosure and limits
    description: Includes when to say AI was used and a situation where AI is not used.
  - criterion: Plans for mistakes
    description: Names concrete steps after an error, such as telling the right person and correcting it.
example_good_prompt: "1) I follow my company's AI rules and ask my manager when something is unclear. 2) I say when AI helped on client work or when I am asked. 3) I never use AI for decisions about individual people. 4) I remove personal details before pasting. 5) If AI output causes a mistake, I tell my manager, correct it and note what happened."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners treat a missing policy as permission. Steer them to ask first.
  - Learners hide errors to avoid blame. Explain that early reporting limits harm.
key_points:
  - Company rules come first.
  - Disclose AI use when it affects trust or decisions.
  - People decide about people, and mistakes are reported early.
follow_up_tasks:
  - Find out who owns AI rules at your company and write down their name and contact.
```
