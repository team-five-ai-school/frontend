---
id: ai-for-lawyers
title: AI for Legal Professionals
track: lawyers
level: beginner
description: Use AI to summarize, compare and draft legal documents faster, while protecting client confidentiality and verifying every output.
skills: [confidentiality, anonymization, document-analysis, source-verification, drafting, citation-checking]
certificate: AI for Legal Professionals
minutes_saved_per_week: 90
stage: role
tools: [any]
recommended_for: [lawyers]
pains: [documents, research, email]
prerequisites: [ai-assistants-101, safe-ai-at-work]
---

# AI for Legal Professionals

## Lesson 1: Confidentiality first

```yaml lesson
id: ai-for-lawyers-l1
duration_min: 5
skills: [confidentiality, anonymization]
goal: Decide what you may paste into an AI tool and anonymize a document before you prompt.
```

### Card: What stays out of the prompt

Depending on the tool, anything you paste may be stored, reviewed or used by the provider. Client names, privileged advice, case strategy and personal data are all covered by your confidentiality obligations. If you would not say it in a crowded lift, do not paste it into an unvetted tool.

### Card: Approved versus consumer tools

A **consumer** chatbot on a personal account is governed by terms you did not negotiate. A **firm-approved** tool has been reviewed, with contract terms on data use. Use only approved tools for client work. If unsure, ask IT or compliance before you paste.

### Card: Anonymize first

Replace identifying details with neutral labels. "Maria Keller owes Northwind Ltd 48,000 under the 2023 supply deal" becomes "Party A owes Party B an amount under a supply agreement." Remove names, account numbers and unusual facts that identify the matter. Keep a private key of your replacements.

### Exercise

```yaml exercise
id: ai-for-lawyers-l1-e1
type: single_select
skill: confidentiality
question: You want AI to tighten a client's draft settlement offer. What is the safest first step?
options:
  - "Paste it into your personal chatbot, since you will check the result."
  - "Use a firm-approved tool, or anonymize the text first if unsure."
  - "Paste only the second half so the tool never sees everything."
  - "Paste it into a free online editing tool."
answer: 1
explanation: The risk is where the data goes, not what you check afterwards. Approved tools and anonymization reduce it.
hint: Think about who controls the data once you press enter.
```

```yaml exercise
id: ai-for-lawyers-l1-e2
type: multi_select
skill: confidentiality
question: Select all that apply. Which items should you remove or replace before prompting an unvetted tool?
options:
  - "The client's name"
  - "A generic request such as 'make this clause shorter'"
  - "Bank account numbers"
  - "A rare detail that would let anyone identify the matter"
answers: [0, 2, 3]
explanation: Names, account numbers and distinctive facts can identify the client. A generic editing request does not.
hint: Ask whether a stranger could work out who the matter is about.
```

```yaml exercise
id: ai-for-lawyers-l1-e3
type: fill_blank
skill: anonymization
question: Pick the phrase that anonymizes this prompt properly.
prompt: "Summarize the dispute between ___ over late delivery under the supply agreement."
options:
  - "Maria Keller and Northwind Ltd"
  - "M. Keller and Northwind"
  - "Party A and Party B"
answer: 2
explanation: Initials and shortened names still identify people. Neutral labels do not.
hint: Which option could a stranger not trace back to a person?
```

```yaml exercise
id: ai-for-lawyers-l1-e4
type: true_false
skill: confidentiality
question: Swipe right if true, left if false.
cards:
  - statement: A tool being free and popular means it is safe for client matters.
    answer: false
    explanation: Popularity says nothing about data terms.
  - statement: Replacing the client's name with a label is enough if unusual facts stay in.
    answer: false
    explanation: Distinctive facts can still identify the matter.
  - statement: If you are unsure whether a tool is approved, you should ask before pasting.
    answer: true
    explanation: You cannot undo a paste, so check first.
hint: You cannot take a paste back.
```

```yaml exercise
id: ai-for-lawyers-l1-e5
type: single_select
skill: confidentiality
question: Your firm has no approved tool yet and you must summarize a privileged memo. What do you do?
options:
  - "Use a consumer tool with chat history off."
  - "Summarize it manually or ask compliance."
  - "Paste it with the names removed only."
  - "Split it into five parts and paste each separately."
answer: 1
explanation: Privileged content needs an approved channel. Settings or splitting the text do not fix the exposure.
hint: Ask whether any option actually fixes where the text goes.
```

### Practice

```yaml practice
id: ai-for-lawyers-l1-practice
skill: anonymization
instructions: Rewrite a short, realistic work scenario as an anonymized prompt you could safely send to an AI tool.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Describe a realistic example of that task in 3-4 sentences, then rewrite it as a
  prompt for {{tool}} with all identifying details replaced by neutral labels.
  Add one sentence saying which details you removed and why.
default_context: A lawyer must ask AI to simplify a paragraph from a client's employment dispute letter that names the client, the employer and a salary figure.
rubric:
  - criterion: Removes identifiers
    description: Names, places, numbers and unusual facts are replaced by neutral labels.
  - criterion: Keeps the task usable
    description: The anonymized prompt still contains enough context for a useful answer.
  - criterion: Explains the choices
    description: States which details were removed and links them to confidentiality obligations.
example_good_prompt: "Simplify this paragraph for a non-lawyer. Employee A claims Employer B ended the contract without the notice the agreement requires. Keep a neutral tone and a maximum of 80 words. (Removed: names, salary, dates and the employer's industry, because they could identify the client.)"
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners think removing only the name is enough. Show how dates, amounts and unusual facts still identify a matter.
  - Learners treat settings such as chat history as a substitute for approval. Steer them to approved tools and compliance.
key_points:
  - Your confidentiality obligations apply to every tool you paste into.
  - Use approved tools for client work and anonymize when unsure.
  - Keep a private key so you can restore details afterwards.
follow_up_tasks:
  - Take a paragraph from a past matter and list every detail that could identify the client.
```

## Lesson 2: Summarizing and comparing documents

```yaml lesson
id: ai-for-lawyers-l2
duration_min: 5
skills: [document-analysis, source-verification]
goal: Get a structured summary or comparison from AI and check each point against the source text.
```

### Card: Summaries with structure

Do not ask "summarize this contract". Say who the summary is for and what to cover: parties, term, payment, termination, liability and unusual clauses. Ask for a table or bullet list.

### Card: Compare two versions

Give the tool both versions, anonymized, and ask for a table of every change: clause number, old wording, new wording, and who it favors. Ask it to flag small changes that alter meaning, such as "may" replaced by "shall". Then read those clauses yourself.

### Card: Make it quote its sources

AI can misread a clause or describe one that is not there. Add: "For each point, quote the exact sentence you rely on and give the clause number." A missing or mismatched quote is your warning.

### Exercise

```yaml exercise
id: ai-for-lawyers-l2-e1
type: single_select
skill: document-analysis
question: Which prompt is most likely to give you a useful contract summary?
options:
  - "Summarize this contract."
  - "Summarize this anonymized services agreement for a partner. Cover term, payment, termination and liability in a table."
  - "Tell me if this contract is good."
  - "Rewrite this contract in simpler words."
answer: 1
explanation: Audience, topics and format give the tool clear boundaries. Asking whether a contract is good asks for a judgment that is yours.
hint: Look for the prompt that names the audience and the sections.
```

```yaml exercise
id: ai-for-lawyers-l2-e2
type: fill_blank
skill: source-verification
question: Pick the phrase that makes this prompt easiest to verify.
prompt: "List the main termination rights in the attached agreement. ___"
options:
  - "Be brief."
  - "For each right, quote the exact sentence and give the clause number."
  - "Only include the important ones."
answer: 1
explanation: Quotes and clause numbers let you spot invented or misread text.
hint: What would let you check each point in seconds?
```

```yaml exercise
id: ai-for-lawyers-l2-e3
type: multi_select
skill: document-analysis
question: Select all that apply. What should a good comparison of two contract versions include?
options:
  - "Clause number for each change"
  - "Old and new wording side by side"
  - "A verdict that the new version is safe to sign"
  - "A flag for small changes that could alter meaning"
answers: [0, 1, 3]
explanation: Locating changes and exposing subtle shifts supports your review. Whether to sign is your judgment.
hint: Ask which option replaces your review with the tool's verdict.
```

```yaml exercise
id: ai-for-lawyers-l2-e4
type: true_false
skill: source-verification
question: Swipe right if true, left if false.
cards:
  - statement: If an AI summary sounds confident, you can skip reading the clauses it cites.
    answer: false
    explanation: Confidence is not accuracy. Always check the cited clause.
  - statement: A quote that cannot be found in the document is a sign the AI may have invented it.
    answer: true
    explanation: Search the original for the quoted words. If they are missing, do not rely on that point.
  - statement: An issue-spotting list from AI replaces your own review.
    answer: false
    explanation: It points you to clauses, but you read and judge them.
hint: Ask who is responsible for the final review.
```

```yaml exercise
id: ai-for-lawyers-l2-e5
type: single_select
skill: source-verification
question: The AI says the notice period is 30 days, but its quote is not in the contract. What do you do?
options:
  - "Trust the summary, since the rest matched."
  - "Search the contract yourself, correct the point and check the others."
  - "Ask again and use the better-sounding answer."
  - "Delete the notice period from your notes."
answer: 1
explanation: A false quote shows the tool can be wrong, so check the source and review the other points.
hint: One error lowers your trust in the other points.
```

### Practice

```yaml practice
id: ai-for-lawyers-l2-practice
skill: source-verification
instructions: Write a prompt that asks AI to summarize or compare a document and forces it to quote its sources.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} asking for an anonymized document summary or
  comparison. Say who it is for, which points to cover, the output format, and
  how the tool must show the source text for each point.
default_context: A paralegal must compare two versions of an anonymized supply agreement and tell the supervising lawyer which clauses changed.
rubric:
  - criterion: Defines audience and scope
    description: Names who the summary is for and which clauses or topics to cover.
  - criterion: Specifies the format
    description: Asks for a table, list or other structure.
  - criterion: Requires quotes
    description: Asks for exact quotes and clause numbers for every point.
example_good_prompt: "Compare the two anonymized versions of this supply agreement for a supervising lawyer. Give a table with clause number, old wording, new wording and who it favors. Flag small wording changes that alter meaning. For each row, quote the exact sentence from each version. Do not say whether to sign."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask whether a contract is good or safe. Redirect them to ask for facts and clause locations, not conclusions.
  - Learners read only the summary. Have them open two cited clauses and compare.
key_points:
  - Name the audience, topics and format.
  - Ask for exact quotes and clause numbers on every point.
  - AI points you to clauses; you read them and decide.
follow_up_tasks:
  - Ask AI to summarize a short anonymized clause and check every quote against the original.
```

## Lesson 3: Drafting first versions

```yaml lesson
id: ai-for-lawyers-l3
duration_min: 5
skills: [drafting, citation-checking]
goal: Produce a first draft with AI and check every legal statement and citation before it goes out.
```

### Card: Good first drafts

AI is fast at letters, standard clauses and checklists. Give it the purpose, reader, tone, facts and length. Mark gaps with "[to confirm]" rather than letting it guess. You get a structure to edit, not a finished document.

### Card: Invented authorities

AI can invent case names, citations, quotations and legal rules that look completely real. Look up every authority in a trusted source, open it, and confirm it says what the draft claims. If you cannot find it, delete it.

### Card: You decide and sign

AI output is not legal advice. It does not know your jurisdiction, your client's goals or recent changes in the law. You review, correct and take responsibility for what goes out under your name. Ask the tool to list its assumptions, then check them.

### Exercise

```yaml exercise
id: ai-for-lawyers-l3-e1
type: single_select
skill: drafting
question: Which request is best for a first-draft letter?
options:
  - "Write a demand letter."
  - "Draft a polite but firm payment reminder to Party B, 150 words, citing the invoice due date. Mark missing facts as [to confirm]."
  - "Write a letter that will win."
  - "Write whatever you think the law requires."
answer: 1
explanation: Purpose, reader, tone, length and a rule for gaps produce an editable draft. The other requests invite guesses.
hint: Look for purpose, tone, length and missing-facts handling.
```

```yaml exercise
id: ai-for-lawyers-l3-e2
type: true_false
skill: citation-checking
question: Swipe right if true, left if false.
cards:
  - statement: AI can produce a convincing case citation for a case that does not exist.
    answer: true
    explanation: The tool generates plausible text, not verified sources.
  - statement: If a citation is formatted correctly, it is probably real.
    answer: false
    explanation: Formatting says nothing about existence. Look it up in a trusted source.
  - statement: You should open each cited authority and check that it supports the statement.
    answer: true
    explanation: A real case can be cited for something it does not say.
hint: Plausible does not mean real.
```

```yaml exercise
id: ai-for-lawyers-l3-e3
type: multi_select
skill: citation-checking
question: "Select all that apply. Before a draft with legal references goes to a client, you should:"
options:
  - "Look up each authority in a trusted source"
  - "Confirm each authority says what the draft claims"
  - "Keep any citation the AI repeats when asked if it is sure"
  - "Delete anything you cannot verify"
answers: [0, 1, 3]
explanation: Verification means finding and reading the source. Asking the AI is not verification.
hint: The tool cannot check its own work reliably.
```

```yaml exercise
id: ai-for-lawyers-l3-e4
type: fill_blank
skill: drafting
question: Pick the phrase that makes this drafting prompt safest.
prompt: "Draft a first-version confidentiality clause for an anonymized services agreement. ___"
options:
  - "Add case law to support it."
  - "Use standard wording, list your assumptions, and cite no cases or statutes."
  - "Make it as strong as possible."
answer: 1
explanation: Assumptions give you something to check, and banning citations removes the risk of invented authorities.
hint: Which option reduces what you must verify?
```

```yaml exercise
id: ai-for-lawyers-l3-e5
type: single_select
skill: drafting
question: A colleague says, "The AI wrote it, so it is the tool's advice, not mine." Best response?
options:
  - "Correct, as long as you note the tool was used."
  - "The lawyer who signs is responsible, so you must review and own every word."
  - "Correct for routine letters only."
  - "Only the legal citations are your responsibility."
answer: 1
explanation: AI output is never legal advice. The signing lawyer is responsible for the whole document.
hint: Who signs the letter?
```

### Practice

```yaml practice
id: ai-for-lawyers-l3-practice
skill: drafting
instructions: Write a drafting prompt that gets a usable first version and builds in verification.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} to draft a first version of a letter, clause or
  checklist for that task. Give purpose, reader, tone, length and anonymized facts,
  mark unknowns, and tell the tool how to handle citations and assumptions.
default_context: A legal assistant must draft a first-version reminder letter to a supplier who missed a delivery date, for a lawyer to review and sign.
rubric:
  - criterion: Clear brief
    description: States purpose, reader, tone and length, using anonymized facts.
  - criterion: Handles gaps
    description: Marks unknown facts for confirmation instead of letting the tool guess.
  - criterion: Controls risk
    description: Forbids invented citations or asks for assumptions to review, and notes that a lawyer will verify and sign.
example_good_prompt: "Draft a first-version letter from Party A to Party B reminding them of a missed delivery date under a supply agreement. Polite but firm, 150 words. Use [to confirm] for any missing dates or amounts. Do not cite cases or statutes. List your assumptions at the end. A lawyer will review and sign."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask AI to add case law to strengthen a draft. Explain that invented authorities are the biggest risk and show how to ban citations.
  - Learners treat the draft as final. Remind them that the signing lawyer owns every word.
key_points:
  - Give purpose, reader, tone and length, and mark unknown facts.
  - Verify every citation and legal statement in a trusted source.
  - AI output is never legal advice; the lawyer decides and signs.
follow_up_tasks:
  - Ask AI for a short clause with assumptions listed, then verify each assumption against your own knowledge or sources.
```
