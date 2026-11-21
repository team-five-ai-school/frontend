---
id: ai-for-hr
title: AI for HR Teams
track: hr
level: beginner
description: Use an AI assistant to write fairer job ads and interview questions, simplify onboarding and policy materials, and analyze employee feedback without exposing personal data.
skills: [inclusive-language, structured-interviews, policy-simplification, verification, data-privacy, theme-analysis, human-decision]
certificate: AI for HR Teams Essentials
minutes_saved_per_week: 90
---

# AI for HR Teams

## Lesson 1: Fairer job ads and interview questions

```yaml lesson
id: ai-for-hr-l1
duration_min: 5
skills: [inclusive-language, structured-interviews]
goal: Draft a job description and interview questions with AI, and check them for biased wording.
```

### Card: Start with the real job

Give the assistant the role, the actual daily duties and the true must-have skills. Separate must-haves from nice-to-haves. Long wish lists put off strong candidates who only apply when they match every line. Never paste personal details about current staff into the prompt.

### Card: Ask AI to flag biased wording

Ask: "Review this job ad for biased or exclusionary wording and suggest neutral alternatives." Phrases like "young and energetic", "rockstar" or "native speaker" can put off qualified people. AI misses some phrases and can add its own bias, so you decide which changes to accept.

### Card: Tie every question to a requirement

Ask every candidate the same core questions, each linked to one listed requirement. For "manages competing deadlines", ask for a past situation and request a scoring guide for strong and weak answers. AI drafts, your team checks the questions are relevant and allowed under local employment rules.

### Exercise

```yaml exercise
id: ai-for-hr-l1-e1
type: single_select
skill: inclusive-language
question: Which prompt is the best start for a new job description?
options:
  - "Write a job ad for a great sales person."
  - "Write a job ad for a sales coordinator. Daily duties: handle quotes, update the CRM. Must-have: 2 years of customer contact. Nice-to-have: CRM experience."
  - "Copy our old ad and make it sound exciting."
answer: 1
explanation: Real duties and a clear split between must-haves and nice-to-haves give a focused, honest ad.
hint: Which prompt gives the assistant facts it cannot guess?
```

```yaml exercise
id: ai-for-hr-l1-e2
type: multi_select
skill: inclusive-language
question: Select all that apply. Which phrases in a job ad deserve a bias check?
options:
  - "Young and energetic team"
  - "Native English speaker"
  - "Experience with budgeting"
  - "Uses CRM software daily"
answers: [0, 1]
explanation: Age-coded and native-speaker wording can exclude qualified people. Skills and tools relate directly to the work.
hint: Which phrases describe a person rather than a skill?
```

```yaml exercise
id: ai-for-hr-l1-e3
type: fill_blank
skill: structured-interviews
question: Pick the phrase that makes this prompt most effective.
prompt: "Write 5 interview questions for a customer support role. ___ Give a short scoring guide for each."
options:
  - "Make them tough."
  - "Tie each question to one requirement: handling upset customers, written clarity, teamwork."
  - "Ask about family plans to see if they will stay."
answer: 1
explanation: Questions linked to listed requirements are fair and comparable. Personal-life questions are risky and unrelated to the job.
hint: Good questions point back to the job's requirements.
```

```yaml exercise
id: ai-for-hr-l1-e4
type: true_false
skill: inclusive-language
question: Swipe right if true, left if false.
cards:
  - statement: If AI reviews an ad for bias, you can publish it without reading again.
    answer: false
    explanation: AI misses things and can add bias. A person reads the final text.
  - statement: Asking all candidates the same core questions makes comparison fairer.
    answer: true
    explanation: Consistency reduces the influence of first impressions.
  - statement: Must-have lists should include every skill you would like.
    answer: false
    explanation: Only list what the job truly requires, or you shrink your pool.
hint: Think about who makes the final call.
```

```yaml exercise
id: ai-for-hr-l1-e5
type: single_select
skill: structured-interviews
question: AI suggests asking candidates how many children they have. What do you do?
options:
  - "Keep it, it helps plan schedules."
  - "Remove it and keep only questions about job requirements."
  - "Ask it only of candidates who seem to be parents."
answer: 1
explanation: Family questions are often restricted by local employment rules and invite bias. You are responsible for what you ask, not the tool.
hint: Does the question measure ability to do the job?
```

### Practice

```yaml practice
id: ai-for-hr-l1-practice
skill: inclusive-language
instructions: Write a prompt that asks your AI tool to draft a job ad or interview questions and to flag biased wording.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Using {{tool}}, write a prompt for a job description or a set of interview
  questions for a role on your team (pick one connected to this pain if you can). Include the real duties, must-haves, and
  a request to flag biased or exclusionary wording.
default_context: You are an HR generalist who must hire a customer support agent and the old job ad is vague and full of buzzwords.
rubric:
  - criterion: Describes the role
    description: Gives real duties and separates must-have from nice-to-have skills.
  - criterion: Requests a bias check
    description: Asks the AI to flag biased or exclusionary wording and suggest alternatives.
  - criterion: Ties to requirements
    description: Asks for structured questions or content linked to listed requirements, with no personal data about real people.
example_good_prompt: "Draft a job ad for a customer support agent. Duties: answer tickets, escalate billing issues. Must-have: clear writing, 1 year of customer contact. Nice-to-have: helpdesk tool experience. Then review your draft for biased or exclusionary wording and suggest neutral alternatives. Finally write 5 structured interview questions, each tied to one must-have, with a scoring guide."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners ask for "exciting" ads and get buzzwords. Steer them to real duties and must-haves.
  - Learners trust the bias check blindly. Remind them AI can miss wording and add its own bias.
  - Learners paste real employee details into prompts. Tell them to use roles, not names.
key_points:
  - Describe the real job and separate must-haves from nice-to-haves.
  - AI flags biased wording, a person decides.
  - Same questions for every candidate, each tied to a requirement.
follow_up_tasks:
  - Rewrite a sentence from an old job ad that sounds age- or culture-coded, then ask AI to review your version.
```

## Lesson 2: Onboarding and policy materials

```yaml lesson
id: ai-for-hr-l2
duration_min: 5
skills: [policy-simplification, verification]
goal: Turn a policy into an FAQ or checklist with AI and verify it against the original.
```

### Card: Handbook to FAQ

Paste one policy section and ask: "Write 6 FAQs for new hires. Use only this text. If the text does not answer a question, say 'not covered'." The last sentence matters: it stops the assistant from filling gaps with invented rules. Use a company-approved tool for internal documents.

### Card: Checklists and plain language

Ask for a first-week checklist by day, or a simpler version of a dense policy at a plain reading level. Add: "Keep all dates, amounts and obligations exactly as written." Simpler wording should never change the rule underneath it.

### Card: Check every answer

AI can soften a rule, drop an exception or invent a number. Compare each answer with the original: deadlines, eligibility, amounts, exceptions. Then ask the policy owner to approve it before sharing. An FAQ that sounds clear but is wrong creates more work than none.

### Exercise

```yaml exercise
id: ai-for-hr-l2-e1
type: single_select
skill: policy-simplification
question: Which instruction best keeps an AI-written FAQ accurate?
options:
  - "Write a friendly FAQ about our leave policy."
  - "Write an FAQ using only the text below. If something is not covered, say 'not covered'."
  - "Write an FAQ and add anything new hires usually wonder about."
answer: 1
explanation: Limiting the source and allowing "not covered" stops the assistant from inventing rules.
hint: Which prompt limits what the assistant may use?
```

```yaml exercise
id: ai-for-hr-l2-e2
type: multi_select
skill: verification
question: Select all that apply. What should you compare against the original policy?
options:
  - "Deadlines and notice periods"
  - "Who is eligible"
  - "How friendly the tone sounds"
  - "Exceptions and amounts"
answers: [0, 1, 3]
explanation: Details that change what employees must or may do are where simplified text goes wrong. Tone is a style choice.
hint: Focus on facts that affect people's actions.
```

```yaml exercise
id: ai-for-hr-l2-e3
type: fill_blank
skill: policy-simplification
question: Pick the phrase that makes this prompt most effective.
prompt: "Rewrite this expense policy in plain language for new hires. ___"
options:
  - "Make it as short as you can."
  - "Keep all limits, deadlines and approval steps exactly as written."
  - "Remove anything complicated."
answer: 1
explanation: Plain language should change the wording only, not the rules.
hint: What must stay identical after simplification?
```

```yaml exercise
id: ai-for-hr-l2-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: A clear, confident FAQ answer is probably correct.
    answer: false
    explanation: AI sounds confident even when it is wrong. Check against the source.
  - statement: The policy owner should approve AI-written materials before they go out.
    answer: true
    explanation: The owner knows the exceptions and local rules.
  - statement: Confidential internal documents can go into any free public chatbot.
    answer: false
    explanation: Use a company-approved tool and follow your data rules.
hint: Think about who is responsible for accuracy.
```

```yaml exercise
id: ai-for-hr-l2-e5
type: single_select
skill: verification
question: The AI's FAQ says employees get 10 days of notice, but you cannot find that number in the policy. What now?
options:
  - "Keep it, it sounds reasonable."
  - "Delete or correct it using the original policy, and re-check the other answers."
  - "Ask the AI to confirm and trust its reply."
answer: 1
explanation: An unsourced number is a likely invention, and the same tool may have invented others. Verify with the original.
hint: Which source is authoritative?
```

### Practice

```yaml practice
id: ai-for-hr-l2-practice
skill: policy-simplification
instructions: Write a prompt that turns a policy section into an FAQ or first-week checklist and keeps the answers faithful to the text.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Using {{tool}}, write a prompt that turns a policy section (assume you will
  paste it below your prompt) into a new-hire FAQ or checklist.
default_context: You are an HR coordinator and new hires keep asking the same questions about remote work and vacation rules.
rubric:
  - criterion: Limits the source
    description: Tells the AI to use only the pasted text and to say when something is not covered.
  - criterion: Protects key details
    description: Asks to keep dates, amounts and obligations unchanged.
  - criterion: Specifies the output
    description: Names the audience, format and length, such as 6 FAQs or a day-by-day checklist.
example_good_prompt: Below is our remote work policy. Write 6 FAQs for new hires in plain language. Use only this text, and answer "not covered" when it does not say. Keep all dates, limits and approval steps exactly as written. Then list which sentences of the policy each answer relies on so I can check them.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners skip the check because the FAQ reads well. Ask them to find each number in the original.
  - Learners allow the AI to "add common questions", which invites invented rules.
  - Learners paste confidential documents into unapproved tools.
key_points:
  - Limit the AI to your text and allow "not covered".
  - Simpler wording must not change the rule.
  - Verify against the original and get owner approval.
follow_up_tasks:
  - Take one AI-written FAQ answer and mark each fact with the policy sentence that supports it.
```

## Lesson 3: Employee feedback and survey analysis

```yaml lesson
id: ai-for-hr-l3
duration_min: 5
skills: [data-privacy, theme-analysis, human-decision]
goal: Analyze anonymized survey comments with AI and keep every decision about people with humans.
```

### Card: Remove personal data first

Before pasting comments into any AI tool, delete names, emails, job titles that identify one person, and team names for very small teams. Check that your tool is approved for employee data and follows local privacy rules. Anonymizing first is easier than undoing a leak.

### Card: Find themes, then actions

Ask: "Group these comments into themes with a rough count, add one anonymous quote each, and suggest two actions per theme." Treat counts as rough. Spot-check a sample of comments yourself, and look for important minority views the summary may flatten.

### Card: AI supports, people decide

AI can summarize feedback. It must not rank, score or screen employees or candidates on its own, or decide on pay, promotion or dismissal. Those decisions need a person who knows the context, can explain the reasoning, and follows local employment rules.

### Exercise

```yaml exercise
id: ai-for-hr-l3-e1
type: single_select
skill: data-privacy
question: What do you do before pasting survey comments into an AI tool?
options:
  - "Paste them as they are, the tool will ignore names."
  - "Remove names, emails and identifying details, and use a tool approved for employee data."
  - "Keep names so the AI can group comments by person."
answer: 1
explanation: Personal data should be removed before sharing, and the tool should be approved by your organization.
hint: Think about what could identify a person.
```

```yaml exercise
id: ai-for-hr-l3-e2
type: multi_select
skill: theme-analysis
question: Select all that apply. Which steps make AI theme analysis more reliable?
options:
  - "Asking for rough counts and one anonymous quote per theme"
  - "Reading a sample of raw comments yourself"
  - "Trusting the top three themes without checking"
  - "Looking for minority views the summary might miss"
answers: [0, 1, 3]
explanation: Samples, quotes and minority checks catch summaries that flatten or distort feedback.
hint: Which steps keep a human close to the data?
```

```yaml exercise
id: ai-for-hr-l3-e3
type: fill_blank
skill: theme-analysis
question: Pick the phrase that makes this prompt most effective.
prompt: "Here are 80 anonymized comments about workload. ___"
options:
  - "Tell me who is unhappy."
  - "Group them into themes with rough counts, one anonymous quote each, and two suggested actions per theme."
  - "Summarize all of it in one sentence."
answer: 1
explanation: Themes, quotes and actions turn comments into something the team can discuss without exposing individuals.
hint: Aim for structure and no identification.
```

```yaml exercise
id: ai-for-hr-l3-e4
type: true_false
skill: human-decision
question: Swipe right if true, left if false.
cards:
  - statement: AI can rank candidates and you can invite the top five without review.
    answer: false
    explanation: Automatic ranking can repeat hidden bias and may break local rules. People review every candidate.
  - statement: AI can help summarize feedback that a manager then discusses with the team.
    answer: true
    explanation: Summaries support discussion, and people choose what to do.
  - statement: If AI suggests a performance rating, HR can use it as the final rating.
    answer: false
    explanation: Decisions about people need human judgment and explanation.
hint: Who is accountable for decisions about people?
```

```yaml exercise
id: ai-for-hr-l3-e5
type: single_select
skill: human-decision
question: A manager asks AI to rank team members by how negative their feedback is. What is the best response?
options:
  - "Run it and share the ranking."
  - "Decline, and use AI only to find themes in anonymized feedback."
  - "Run it but hide the names."
answer: 1
explanation: Ranking people from feedback is a decision about people. AI can support analysis of themes, not judge individuals.
hint: Is this analysis or judgment of a person?
```

### Practice

```yaml practice
id: ai-for-hr-l3-practice
skill: theme-analysis
instructions: Write a prompt that analyzes anonymized survey comments for themes and actions, with no judgment about individuals.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Using {{tool}}, write a prompt for analyzing anonymized employee survey
  comments (assume they follow your prompt). Mention what you removed first.
default_context: You are an HR business partner with 100 open-ended survey comments about workload and communication, and the leadership meeting is on Friday.
rubric:
  - criterion: Protects privacy
    description: States that names and identifying details were removed and does not ask to identify anyone.
  - criterion: Asks for useful structure
    description: Requests themes, rough counts, anonymous quotes and suggested actions.
  - criterion: Keeps humans in charge
    description: Asks for options to discuss and avoids ranking or judging individuals or teams.
example_good_prompt: The comments below are anonymized, with names and identifying details removed. Group them into themes with rough counts and one anonymous quote each. For each theme suggest two actions for the leadership team to discuss. Flag views held by only a few people. Do not try to identify anyone and do not rank people or teams.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners forget anonymizing and paste raw exports. Pause and ask what could identify someone.
  - Learners ask AI who is unhappy or which employee is weakest. Redirect to themes.
  - Learners accept counts as exact.
key_points:
  - Remove personal data before using AI.
  - Ask for themes, quotes and suggested actions, then check a sample.
  - AI supports decisions about people and never makes them.
follow_up_tasks:
  - Rewrite a prompt that asks for the "worst-performing" employee so it asks for themes instead.
```
