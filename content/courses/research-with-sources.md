---
id: research-with-sources
title: Research with Sources
track: general
level: intermediate
description: Research a topic with AI, check every source it gives you and write a short brief where each claim can be traced to a real source.
skills: [source-checking, grounded-research, sourced-writing]
certificate: Sourced AI Research
minutes_saved_per_week: 45
stage: advanced
tools: [any]
recommended_for: [general, marketing, teachers, lawyers]
pains: [research, documents]
prerequisites: [ai-assistants-101]
---

# Research with Sources

## Lesson 1: Check the sources behind an AI answer

```yaml lesson
id: research-with-sources-l1
duration_min: 5
skills: [source-checking]
goal: Ask an AI search assistant for a sourced answer and confirm that each citation exists and supports the claim.
```

### Card: Ask for sources

AI search assistants look up web pages and link them in the answer. Ask a narrow question and request a source for every claim, like "What does the regulator say about data retention for small employers?"

### Card: Three ways a citation fails

The link may not exist. The page may not contain the claim. Or it says something close, such as another year or country. A link proves nothing until you open it.

### Card: Check in three steps

Open the link. Find the sentence the answer relies on. Compare numbers, dates and conditions word by word. Prefer the original source over a blog repeating it.

### Exercise

```yaml exercise
id: research-with-sources-l1-e1
type: single_select
skill: source-checking
question: An AI search answer says a survey found 62% of employees prefer hybrid work, with a link. What do you do first?
options:
  - "Trust it, because a link is attached."
  - "Open the link and find the 62% on the page."
  - "Ask the assistant if the number is correct."
  - "Check that the website looks professional."
answer: 1
explanation: Only the page itself shows whether the figure is there. Asking the assistant again is not a check.
hint: Where could you see the number with your own eyes?
```

### Exercise

```yaml exercise
id: research-with-sources-l1-e2
type: multi_select
skill: source-checking
question: Select all that apply. Which are ways a citation can fail?
options:
  - "The link leads to a page that does not exist."
  - "The page exists but never mentions the claim."
  - "The page covers a different year than the answer states."
  - "The link opens a page from a well-known organization."
answers: [0, 1, 2]
explanation: Missing pages, unsupported claims and mismatched details are common. A known publisher does not put the claim on the page.
hint: Think about what could differ between the answer and the page.
```

### Exercise

```yaml exercise
id: research-with-sources-l1-e3
type: fill_blank
skill: source-checking
question: Pick the phrase that makes this question most useful for research.
prompt: "What are the notice rules for ending a fixed-term lease in my country? ___"
options:
  - "Answer briefly."
  - "Give a link for each rule and say which page section it comes from."
  - "Be confident."
answer: 1
explanation: Asking for a link and location per rule gives you something specific to open and check.
hint: Which option gives you something you can verify?
```

### Exercise

```yaml exercise
id: research-with-sources-l1-e4
type: true_false
skill: source-checking
question: Swipe right if true, left if false.
cards:
  - statement: A citation can look real and still not support the claim.
    answer: true
    explanation: The page may say something different or nothing at all on the point.
  - statement: If the link opens, the claim is confirmed.
    answer: false
    explanation: You still need to find the supporting sentence on the page.
  - statement: An original source is better than a blog repeating it.
    answer: true
    explanation: Copies can add errors or leave out conditions.
  - statement: Asking "are you sure?" checks a source.
    answer: false
    explanation: It may repeat the mistake. Open the page.
hint: Ask whether you saw the evidence yourself.
```

### Exercise

```yaml exercise
id: research-with-sources-l1-e5
type: single_select
skill: source-checking
question: The answer says "the fee is 150 euros" and cites a page. The page says "up to 150 euros, depending on the size of the company." What is the problem?
options:
  - "None, the number matches."
  - "The answer dropped a condition the page states."
  - "The page is too short to be a source."
  - "The assistant should have linked two pages."
answer: 1
explanation: The number matches, but "up to" and the condition change the meaning. Compare conditions, not only numbers.
hint: Compare everything the page says with the answer.
```

### Practice

```yaml practice
id: research-with-sources-l1-practice
skill: source-checking
instructions: Write a research question for an AI search assistant, then describe how you would check two of its citations.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a narrow question for {{tool}} (or another AI search assistant) about a topic related to this pain, and ask for a source per claim.
  Then describe how you would check two citations in its answer: what you would open and what you would compare.
default_context: You are an office manager who needs to know how long a company must keep invoices and wants a sourced answer.
rubric:
  - criterion: Narrow question
    description: The question names the topic, place or time frame instead of asking for a general overview.
  - criterion: Requests sources
    description: The prompt asks for a link or reference for each claim.
  - criterion: Plans real checks
    description: The learner opens the source, finds the sentence and compares numbers, dates or conditions.
example_good_prompt: "What is the minimum period a small company in Germany must keep invoices? Give each rule with a link to an official page and the section it comes from. Afterwards I will open two links, find the sentence about the period and compare the number of years and who the rule applies to."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners treat a link as proof. Ask them to point to the sentence on the page.
  - Learners check only numbers. Ask about dates, places and conditions too.
key_points:
  - A citation can be missing, unsupported or slightly different.
  - Open the source and compare word by word.
  - Prefer the original source.
follow_up_tasks:
  - Take one sourced AI answer and mark each claim as confirmed, changed or not found.
```

## Lesson 2: Work from your own documents

```yaml lesson
id: research-with-sources-l2
duration_min: 5
skills: [grounded-research]
goal: Ask an AI tool to answer only from documents you provide, with quotes and page references, and name what it cannot see.
```

### Card: Answers from your files

Source-grounded notebooks and chat assistants with file upload can answer from documents you give them, such as a contract, a policy or a set of reports. The answer should come from your files, not from memory.

### Card: Ask for quotes and pages

Add rules to your question: "Use only the uploaded files. Quote the exact sentence and give the page. If the files do not say, answer 'not in the documents.'" Then compare each quote with the page.

### Card: Know the blind spots

The tool sees only what you uploaded. Scanned pages, images, tables and charts may be read badly or skipped. Long files may be used only in part. Upload confidential files only if your company approves the tool.

### Exercise

```yaml exercise
id: research-with-sources-l2-e1
type: single_select
skill: grounded-research
question: You upload three vendor contracts and ask about the notice period. Which instruction best limits invention?
options:
  - "Tell me the usual notice period for vendors."
  - "Use only these files. Quote the clause and page. If it is missing, say so."
  - "Summarize everything you know about contracts."
  - "Answer in one word."
answer: 1
explanation: It restricts the answer to your files, asks for evidence and gives a safe way to say "not found."
hint: What should the tool do if the clause is missing?
```

### Exercise

```yaml exercise
id: research-with-sources-l2-e2
type: multi_select
skill: grounded-research
question: Select all that apply. What may a grounded tool miss in your uploads?
options:
  - "Text inside scanned images."
  - "Numbers in complex tables."
  - "A document you forgot to upload."
  - "Plain text paragraphs in a readable file."
answers: [0, 1, 2]
explanation: Scans, tables and missing files are common blind spots. Plain readable text is usually fine, but still check quotes.
hint: Think about what is hard to read or absent.
```

### Exercise

```yaml exercise
id: research-with-sources-l2-e3
type: fill_blank
skill: grounded-research
question: Pick the phrase that makes this prompt safest.
prompt: "Which deadlines are in the attached grant guidelines? ___"
options:
  - "Add typical deadlines if they are missing."
  - "List each deadline with an exact quote and page. If none is stated, write 'not in the documents.'"
  - "Give me a short and friendly answer."
answer: 1
explanation: Quotes and pages let you verify, and the fallback phrase stops the tool from guessing.
hint: What should happen when the guidelines say nothing?
```

### Exercise

```yaml exercise
id: research-with-sources-l2-e4
type: true_false
skill: grounded-research
question: Swipe right if true, left if false.
cards:
  - statement: A tool that answers from your files can still misquote them.
    answer: true
    explanation: Always compare the quote with the original page.
  - statement: If the answer is "not in the documents," the topic is not covered anywhere.
    answer: false
    explanation: It only means your uploaded files do not cover it.
  - statement: Asking for page references makes checking faster.
    answer: true
    explanation: You can jump straight to the passage.
  - statement: You can upload any client file to any tool.
    answer: false
    explanation: Use only tools your organization approves for confidential material.
hint: Think about what the tool knows and what it does not.
```

### Exercise

```yaml exercise
id: research-with-sources-l2-e5
type: single_select
skill: grounded-research
question: The tool quotes "payment within 30 days" and cites page 4. Page 4 says "payment within 14 days." What do you conclude?
options:
  - "Page 4 is probably a typo."
  - "The quote is wrong, so do not use the answer."
  - "Both numbers are acceptable."
  - "The tool is right because it read the whole file."
answer: 1
explanation: A quote that does not match the page cannot be relied on. Check the other claims from the same answer too.
hint: What does the original page say?
```

### Practice

```yaml practice
id: research-with-sources-l2-practice
skill: grounded-research
instructions: Write a prompt that limits the tool to your documents, asks for quotes and pages, and says what to do when the answer is missing.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Imagine you uploaded two or three documents related to this pain into {{tool}}.
  Write a prompt that asks one question using only those documents, requires exact quotes and page references, and says what to answer if the documents do not say.
  Then name one thing the tool might not see.
default_context: You are a teacher who uploaded the school's assessment policy and the exam schedule and wants to know the rules for retaking a test.
rubric:
  - criterion: Limits the source
    description: The prompt says to use only the provided documents.
  - criterion: Asks for evidence
    description: The prompt requires exact quotes and page references.
  - criterion: Handles gaps
    description: The prompt gives a fallback answer and the learner names a blind spot, such as scans or tables.
example_good_prompt: "Use only the two uploaded documents. What are the rules for retaking a failed test? Quote each rule exactly and give the document and page. If the documents do not say, write 'not in the documents.' I know it may skip the tables in the exam schedule, so I will check those myself."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners assume grounded means always correct. Ask them to compare one quote with the page.
  - Learners forget the fallback. Ask what the tool should say when the files are silent.
key_points:
  - Limit the answer to your files.
  - Ask for quotes and pages.
  - Know what the tool cannot see.
follow_up_tasks:
  - Upload one short document and check three quotes against the original.
```

## Lesson 3: Turn facts into a sourced brief

```yaml lesson
id: research-with-sources-l3
duration_min: 6
skills: [sourced-writing]
goal: Separate facts from AI interpretation, handle sources that disagree and write a brief where every claim has a source.
```

### Card: Facts and interpretation

A fact comes from a source: "The report states turnover rose 8%." Interpretation is the AI's reading: "This suggests customers are happier." Ask the assistant to label each statement as fact with source, or interpretation. Keep interpretation only if you agree and mark it as yours.

### Card: When sources disagree

Two sources give different numbers. Do not let the assistant average them. Ask it to list both, with date, author and method. Often one is newer, covers a different group or measures something else. If you cannot tell, report the range and say so.

### Card: The sourced brief

Write a short brief: one-sentence conclusion, three to five claims, each followed by its source. Delete any claim you could not verify. Ask the assistant to flag sentences without a source, then check them yourself.

### Exercise

```yaml exercise
id: research-with-sources-l3-e1
type: single_select
skill: sourced-writing
question: Which sentence is an interpretation, not a fact?
options:
  - "The survey covered 400 teachers."
  - "Absence rose from 4% to 6%, according to the HR report."
  - "The rise shows that morale is falling."
  - "The report was published in spring."
answer: 2
explanation: The report gives the numbers. The cause is a reading that the report does not state.
hint: Which sentence goes beyond what a source reports?
```

### Exercise

```yaml exercise
id: research-with-sources-l3-e2
type: multi_select
skill: sourced-writing
question: Select all that apply. Two sources give different market sizes. What should you ask?
options:
  - "Which source is newer?"
  - "Do they measure the same group or definition?"
  - "What method did each one use?"
  - "Which number is easier to remember?"
answers: [0, 1, 2]
explanation: Date, scope and method explain most differences. Memorability has nothing to do with accuracy.
hint: What could explain two honest numbers differing?
```

### Exercise

```yaml exercise
id: research-with-sources-l3-e3
type: fill_blank
skill: sourced-writing
question: Pick the phrase that makes this prompt most useful.
prompt: "Here are my notes and two sources. Draft a brief for my manager. ___"
options:
  - "Make it sound convincing."
  - "Put the source after every claim and label any sentence that is your interpretation."
  - "Add extra statistics to strengthen it."
answer: 1
explanation: It keeps each claim traceable and separates the facts from the assistant's reading.
hint: Which option protects you from unsupported claims?
```

### Exercise

```yaml exercise
id: research-with-sources-l3-e4
type: true_false
skill: sourced-writing
question: Swipe right if true, left if false.
cards:
  - statement: When two sources disagree, you should report both and explain the difference.
    answer: true
    explanation: Hiding a conflict makes your brief look more certain than the evidence is.
  - statement: A claim you could not verify can stay if it sounds reasonable.
    answer: false
    explanation: Remove it or mark it clearly as unverified.
  - statement: Asking the assistant to flag unsourced sentences helps your review.
    answer: true
    explanation: It shows where to look first, but you still verify.
  - statement: An average of two conflicting figures is a safe compromise.
    answer: false
    explanation: The average matches neither source and may be wrong for both.
hint: Ask whether a reader could trace each claim.
```

### Exercise

```yaml exercise
id: research-with-sources-l3-e5
type: single_select
skill: sourced-writing
question: Your draft brief has a strong sentence with no source. What is the best step?
options:
  - "Keep it, because the tone fits the brief."
  - "Find a source for it, or delete it."
  - "Cite the AI assistant as the source."
  - "Move it to the end where it is less noticeable."
answer: 1
explanation: Every claim needs a source you have checked. Otherwise it should not be in the brief.
hint: What must a reader be able to do with each claim?
```

### Practice

```yaml practice
id: research-with-sources-l3-practice
skill: sourced-writing
instructions: Write a prompt that turns your sources into a short brief with a source for every claim, and explain how you would handle a conflict.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  You have collected two or three sources on a topic related to this pain and they partly disagree.
  Write a prompt for {{tool}} that produces a short brief with one conclusion and several claims, each with its source, and separates facts from interpretation.
  Then say how you would handle the disagreement and what you would check before sharing it.
default_context: You are a marketing coordinator who must brief your manager on the size of a local market, but two reports give different figures.
rubric:
  - criterion: Source for every claim
    description: The prompt requires a source after each claim and a flag on any unsourced sentence.
  - criterion: Separates fact and interpretation
    description: The prompt asks the assistant to label interpretation separately from facts.
  - criterion: Handles disagreement
    description: The learner compares date, scope or method of the sources and plans to verify before sharing.
example_good_prompt: "Using only the two reports I pasted, write a brief for my manager: one-sentence conclusion, then four claims, each followed by its source. Label anything that is your interpretation. Where the reports give different market sizes, show both with year and method instead of choosing. Flag any sentence without a source. I will check each claim against the reports before sending."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners blend interpretation into facts. Ask which sentence the source actually states.
  - Learners smooth over conflicts. Ask what differs in date, group or method.
key_points:
  - Label facts and interpretation.
  - Show disagreement instead of hiding it.
  - Remove claims you cannot source.
follow_up_tasks:
  - Take a paragraph from an AI summary and mark each sentence as fact, interpretation or unsourced.
```
