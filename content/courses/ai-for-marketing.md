---
id: ai-for-marketing
title: AI for Marketers
track: marketing
level: beginner
description: Write briefs that produce testable copy, turn real customer feedback into themes, and turn campaign exports into next tests, while checking what the AI tells you.
skills: [brief-writing, copy-variation, data-grounding, theme-extraction, hypothesis-building, verification]
certificate: AI for Marketers Essentials
minutes_saved_per_week: 150
---

# AI for Marketers

## Lesson 1: Briefs and copy variations

```yaml lesson
id: ai-for-marketing-l1
duration_min: 5
skills: [brief-writing, copy-variation, verification]
goal: Write a short brief with voice, audience and channel, and ask for several variants to test.
```

### Card: Brief it like a freelancer

AI does not know your brand. Give it what you would give a new freelancer: who the audience is, the channel, the goal, your tone, and one sample of copy you like. Add words to avoid. Without this, you get generic text that fits any company.

### Card: Ask for variants, not one perfect text

Nobody can predict the winner. Ask for five subject lines, each with a different angle: price, urgency, curiosity, social proof, a plain benefit. Then pick two and A/B test them.

### Card: Cut the AI sound

Generic phrases like "elevate your journey" give the AI away. Say "no buzzwords, short sentences, mention one concrete detail". Then edit the draft yourself and check every claim, such as discounts and dates.

### Exercise

```yaml exercise
id: ai-for-marketing-l1-e1
type: single_select
skill: brief-writing
question: You need a newsletter subject line for a spring sale. Which request works best?
options:
  - "Write a great subject line for our sale."
  - "Write 5 subject lines for our spring sale email to existing customers. Friendly tone, under 45 characters, each with a different angle."
  - "Write the best possible subject line, make it viral."
answer: 1
explanation: It names the audience, channel, tone and length, and asks for several angles you can test.
hint: Which request leaves the AI the least to guess?
```

### Exercise

```yaml exercise
id: ai-for-marketing-l1-e2
type: multi_select
skill: brief-writing
question: Select all that apply. Which details belong in a copy brief?
options:
  - Who the audience is
  - Words and claims to avoid
  - Your private customer email list
  - A sample of copy in your brand voice
answers: [0, 1, 3]
explanation: Audience, limits and a voice sample shape the output. Customer lists are personal data and never belong in a public tool.
hint: Think about what is safe to paste into a public tool.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l1-e3
type: fill_blank
skill: copy-variation
question: Pick the phrase that makes this prompt most useful for testing.
prompt: "Write ad headlines for our meal-kit trial offer. ___ Keep each under 30 characters."
options:
  - "Make them all perfect."
  - "Give me 6, each using a different angle: price, speed, taste, convenience, guarantee, curiosity."
  - "Write one in the style of a famous brand."
answer: 1
explanation: Distinct angles give you real differences to test, not six rewrites of the same idea.
hint: A test needs options that differ from each other.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l1-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: AI may invent a discount or a feature your product does not have.
    answer: true
    explanation: It writes what sounds likely, so check every claim against your offer.
  - statement: A single polished AI draft is better than several variants.
    answer: false
    explanation: Variants let real audiences pick the winner instead of your guess.
  - statement: A sample of your past copy helps match your brand voice.
    answer: true
    explanation: AI copies examples well, which is faster than describing a tone in adjectives.
hint: Think about who decides what works, you or your audience.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l1-e5
type: single_select
skill: copy-variation
question: The draft says "Elevate your journey with our innovative solution." What is the best next prompt?
options:
  - "Make it more exciting."
  - "Rewrite it with no buzzwords, short sentences, and one concrete benefit: setup takes 10 minutes."
  - "Make it longer."
answer: 1
explanation: Banning buzzwords and requiring a concrete detail removes the generic tone.
hint: Vague feedback gets vague rewrites.
```

### Practice

```yaml practice
id: ai-for-marketing-l1-practice
skill: brief-writing
instructions: Write a brief that asks your AI tool for several copy variants for one real channel. Include audience, tone and limits.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that asks for 4 to 5 copy variants for one channel
  related to this pain. Include the audience, the channel, the tone, words to avoid,
  and what makes each variant different.
default_context: You are a marketing manager at a small online shop. You need subject lines for a weekend sale email to existing customers.
rubric:
  - criterion: Gives context
    description: Names the audience, the channel and the goal of the copy.
  - criterion: Asks for variants
    description: Requests several versions with different angles, not one.
  - criterion: Sets voice and limits
    description: States tone, length and words or claims to avoid.
example_good_prompt: Write 5 subject lines for a weekend sale email to existing customers of a small pet shop. Friendly, plain tone, under 45 characters, no exclamation marks or buzzwords. Each one uses a different angle (price, urgency, curiosity, social proof, benefit). Only mention the 20% discount that ends Sunday.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Asking for one perfect text. Steer toward several variants with different angles.
  - Leaving out the audience and channel. Ask who will read it and where.
  - Pasting customer names or emails into the prompt. Remind them to use anonymous descriptions.
key_points:
  - A brief has audience, channel, goal, tone and limits.
  - Variants with different angles are testable.
  - You check claims and edit before publishing.
follow_up_tasks:
  - Rewrite a weak one-line prompt into a full brief for a LinkedIn post.
  - Take one AI draft and list every claim that needs checking.
```

## Lesson 2: Audience research from real data

```yaml lesson
id: ai-for-marketing-l2
duration_min: 5
skills: [data-grounding, theme-extraction, verification]
goal: Turn customer reviews or survey answers into themes and personas, and check them against the source.
```

### Card: Use your data, not its imagination

Ask AI to invent your customer and you get a stereotype. Instead, paste real material: reviews, survey answers, support tickets. Say "use only the text below". Now it summarizes your customers rather than guessing about them.

### Card: Themes with evidence

Ask for the top themes, how many comments mention each, and two short quotes per theme. Quotes let you check the source. Example: 40 reviews of a running shoe might show "runs small" and "great for wide feet".

### Card: Clean data first

Remove names, emails and order numbers before pasting into a public tool. Then spot-check: search your data for a quote and count a theme yourself. Treat personas as a hypothesis to test, not a fact.

### Exercise

```yaml exercise
id: ai-for-marketing-l2-e1
type: single_select
skill: data-grounding
question: You want a persona for your yoga app. What is the most reliable approach?
options:
  - "Ask: describe our typical customer."
  - "Paste 50 anonymized survey answers and ask for a persona using only that text, with quotes."
  - "Ask for the persona of the average yoga fan in your country."
answer: 1
explanation: Grounding the answer in your own data keeps the persona tied to real customers.
hint: Where does the information about your customers actually live?
```

### Exercise

```yaml exercise
id: ai-for-marketing-l2-e2
type: multi_select
skill: theme-extraction
question: Select all that apply. What should you ask for to make themes easy to check?
options:
  - A count of comments for each theme
  - Two short quotes per theme
  - A short summary that leaves out the details
  - A note on comments that fit no theme
answers: [0, 1, 3]
explanation: Counts, quotes and leftovers let you verify the summary and spot what it ignored. A summary without details cannot be checked.
hint: Pick what lets you go back to the source.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l2-e3
type: fill_blank
skill: data-grounding
question: Pick the phrase that keeps the AI honest.
prompt: "Below are 60 customer reviews. Find the 5 most common complaints. ___ Reviews: ..."
options:
  - "Fill any gaps with what customers usually say."
  - "Use only these reviews, quote one for each complaint, and say if there is too little evidence."
  - "Write the complaints in a positive, persuasive tone."
answer: 1
explanation: Restricting it to the text and asking for quotes reduces invented findings.
hint: You want the answer limited to what is on the page.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l2-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: It is fine to paste a spreadsheet with customer names and emails into a public AI tool.
    answer: false
    explanation: Remove personal data first, or use a tool your company has approved.
  - statement: A theme the AI reports should be spot-checked against the source.
    answer: true
    explanation: Search for a quote and count a few mentions yourself.
  - statement: A persona from 10 survey answers proves what all customers want.
    answer: false
    explanation: A small sample gives a hypothesis. Test it with more data.
hint: Ask yourself how you would prove each claim to your boss.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l2-e5
type: single_select
skill: theme-extraction
question: The AI says "most customers love the packaging", but you see only a few mentions in the reviews. What do you do?
options:
  - "Keep it. The AI read all the reviews."
  - "Ask it for the exact quotes and the count, then fix the claim to match."
  - "Delete the theme and ask for a new one."
answer: 1
explanation: Asking for evidence shows whether the claim holds, and you correct it to match the data.
hint: Evidence first, then decide.
```

### Practice

```yaml practice
id: ai-for-marketing-l2-practice
skill: data-grounding
instructions: Write a prompt that asks AI to find themes in customer feedback, using only the data you provide and showing evidence.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that analyzes a set of customer feedback (reviews, survey
  answers or tickets) related to this pain. Say what data you will paste, what to
  produce, and how the AI should show evidence.
default_context: You are a marketing specialist at a software company. You have 80 anonymized support tickets and want the top reasons new users get stuck.
rubric:
  - criterion: Grounds in data
    description: Tells the AI to use only the pasted feedback and not invent customers.
  - criterion: Asks for evidence
    description: Requests counts or quotes for each theme.
  - criterion: Protects privacy
    description: Mentions removing names, emails or other personal data first.
example_good_prompt: Below are 80 support tickets from new users with names and emails removed. Use only this text. Find the top 5 reasons users get stuck during setup. For each, give the number of tickets, two short quotes, and one question we could ask in a survey. List tickets that fit no theme. If evidence is thin, say so.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Asking for a persona with no data. Ask what real material they can paste.
  - Accepting themes without counts or quotes. Have them request evidence.
  - Pasting raw data with names or emails. Show how to anonymize first.
key_points:
  - AI summarizes your data. It does not know your customers.
  - Quotes and counts make themes checkable.
  - Personas are hypotheses until tested.
follow_up_tasks:
  - Take five reviews, ask for themes with quotes, and verify each quote exists.
  - Rewrite "describe our customer" as a data-grounded prompt.
```

## Lesson 3: Campaign reporting

```yaml lesson
id: ai-for-marketing-l3
duration_min: 5
skills: [hypothesis-building, verification]
goal: Turn a metrics export into insights and next tests, and double-check the numbers the AI quotes.
```

### Card: Give context with the numbers

A raw export tells AI little. Add the goal, the period and what changed, such as a new landing page. Ask: "What stands out, and what might explain it?" Context turns a list of numbers into a useful read.

### Card: Ask for hypotheses and tests

A description repeats the table. Ask instead: "Give 3 hypotheses for why email B had lower clicks, and one test for each." Example: a hypothesis about an unclear button leads to a test of two button labels.

### Card: Recheck every number

AI can miscalculate, mix up columns or round badly. Recompute any figure you will present: totals, rates, changes. Remove customer data before pasting. Remember, an insight is a lead to test, not proof of cause.

### Exercise

```yaml exercise
id: ai-for-marketing-l3-e1
type: single_select
skill: hypothesis-building
question: Your paid social export shows clicks fell 20% last week. Which prompt gets the most useful answer?
options:
  - "Summarize this data."
  - "Goal: lead signups. Last week we changed the ad image. Suggest 3 hypotheses for the click drop and one test for each."
  - "Tell me why the campaign failed."
answer: 1
explanation: It gives context and asks for explanations you can test, not a description.
hint: Which prompt gives the AI more than the numbers to work with?
```

### Exercise

```yaml exercise
id: ai-for-marketing-l3-e2
type: multi_select
skill: verification
question: Select all that apply. Which numbers should you recompute before they go into a report?
options:
  - A conversion rate the AI calculated
  - A percent change between two weeks
  - A total spend figure in the summary
  - A general sentence like "email is a useful channel"
answers: [0, 1, 2]
explanation: Calculated figures can be wrong. Recompute any number your readers will rely on.
hint: Look for figures with a calculation behind them.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l3-e3
type: fill_blank
skill: hypothesis-building
question: Pick the phrase that turns a summary into a plan.
prompt: "Here is our email report for March. ___ Keep it to one paragraph and a table."
options:
  - "Describe every row."
  - "Suggest 3 hypotheses for the low open rate on Tuesday sends and a test for each."
  - "Say whether it was good or bad."
answer: 1
explanation: Hypotheses with tests give you next actions, not just a recap.
hint: You want ideas you can act on.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l3-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: If the AI explains why a metric dropped, you can treat it as the proven cause.
    answer: false
    explanation: Its explanation is a hypothesis. Only a test can confirm a cause.
  - statement: AI can make arithmetic mistakes on a spreadsheet export.
    answer: true
    explanation: Recompute key numbers in your spreadsheet before sharing them.
  - statement: Adding the campaign goal makes the analysis more relevant.
    answer: true
    explanation: The goal tells it which metrics matter most.
hint: Separate what the data shows from what explains it.
```

### Exercise

```yaml exercise
id: ai-for-marketing-l3-e5
type: single_select
skill: verification
question: The AI says your newsletter click rate was 4.8%, but your platform shows 3.9%. What now?
options:
  - "Use the AI figure. It looked at all the data."
  - "Trust the platform, then ask the AI to show how it calculated 4.8% to find the mismatch."
  - "Average the two numbers."
answer: 1
explanation: Your platform is the source. Asking for the calculation reveals the cause, such as a wrong denominator or a different definition of a click.
hint: Which number comes from the original source?
```

### Practice

```yaml practice
id: ai-for-marketing-l3-practice
skill: hypothesis-building
instructions: Write a prompt that gives AI a metrics export with context and asks for hypotheses and next tests, not just a summary.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that analyzes a campaign metrics export related to this pain.
  Include the goal, the period, what changed, and ask for hypotheses, tests and a way
  to double-check the numbers.
default_context: You are a marketing manager. Last month's email campaign had a lower click rate than the month before, and you must report to your director on Friday.
rubric:
  - criterion: Gives context
    description: States the goal, the period and what changed.
  - criterion: Asks for hypotheses and tests
    description: Requests explanations and next experiments, not only a description.
  - criterion: Plans verification
    description: Asks for calculations to be shown or says you will recheck key numbers.
example_good_prompt: The goal is more demo requests from email. Below is the export for March and April, with no subscriber data. In April we shortened the subject lines. Give 3 hypotheses for the lower click rate, one test for each, and the metrics I should watch. Show how you calculated each rate so I can check it.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Asking only for a summary. Push them to ask for hypotheses and tests.
  - Trusting calculated figures. Have them recompute one number in a spreadsheet.
  - Treating a hypothesis as the cause. Remind them to run a test.
key_points:
  - Give goal, period and changes with the data.
  - Ask for hypotheses and a test for each.
  - Recheck every number before sharing.
follow_up_tasks:
  - Take a small export and compare the AI's rate with your own calculation.
  - Turn one hypothesis into an A/B test with a clear success metric.
```
