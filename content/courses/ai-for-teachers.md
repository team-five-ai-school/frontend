---
id: ai-for-teachers
title: AI for Teachers
track: teachers
level: beginner
description: Use an AI assistant to draft differentiated lesson plans, quizzes, rubrics and feedback comments faster, while keeping student data private and every decision in your hands.
skills: [lesson-planning, differentiation, prompt-structure, verification, rubric-design, student-privacy, feedback-drafting, academic-integrity]
certificate: AI for Teachers Essentials
minutes_saved_per_week: 120
stage: role
tools: [any]
recommended_for: [teachers]
pains: [planning, content, documents, customer-communication]
prerequisites: [ai-assistants-101]
---

# AI for Teachers

## Lesson 1: Lesson plans that fit every level

```yaml lesson
id: ai-for-teachers-l1
duration_min: 5
skills: [lesson-planning, differentiation, prompt-structure]
goal: Write a prompt that produces a usable lesson activity in three difficulty levels, then adapt it to your class.
```

### Card: Give the full picture

AI does not know your class, so "Make a fractions lesson" returns a generic plan. Tell it the goal, grade, time, materials and anything special about the group.

Example: "Grade 5 math, 45 minutes, goal: add fractions with unlike denominators, no printer, 4 students read below level."

### Card: Ask for versions

Ask for the same task at three levels: support, core and extension. Keep the learning goal identical, so every student works toward the same target.

You can also ask for sentence starters or a shorter reading text.

### Card: You adapt, AI drafts

Treat the output as a first draft. Check the timing, the content and whether the tasks suit your students. Ask for changes in a follow-up message instead of starting over.

### Exercise

```yaml exercise
id: ai-for-teachers-l1-e1
type: single_select
skill: prompt-structure
question: Which prompt will give you the most usable lesson draft?
options:
  - "Plan a good lesson about the water cycle."
  - "Grade 4 science, 40 minutes, goal: explain evaporation and condensation. 26 students, 3 new English learners. One hands-on activity."
  - "Plan a fun science lesson for children."
answer: 1
explanation: Goal, level, time and class needs let the AI tailor the draft instead of guessing.
hint: Look for the prompt that tells the AI about your actual classroom.
```

```yaml exercise
id: ai-for-teachers-l1-e2
type: multi_select
skill: differentiation
question: Select all that apply. Which details belong in a differentiation prompt?
options:
  - "The learning goal all students must reach"
  - "Names and grades of individual students"
  - "How many levels you want, such as support, core and extension"
  - "What kind of support the lower level needs, such as sentence starters"
answers: [0, 2, 3]
explanation: The goal, the levels and the type of support shape the versions. Student names add privacy risk and no value.
hint: Ask which detail the AI does not need to build the versions.
```

```yaml exercise
id: ai-for-teachers-l1-e3
type: fill_blank
skill: differentiation
question: Pick the phrase that completes the prompt best.
prompt: "Create a 20-minute group activity on persuasive writing for Grade 8. ___"
options:
  - "Make it easy for some students and hard for others."
  - "Give three versions, support, core and extension, with one goal: students support a claim with evidence."
  - "Change the task for every student."
answer: 1
explanation: Three named levels with one shared goal keep the versions comparable and the target fair.
hint: Good versions change the support, not the target.
```

```yaml exercise
id: ai-for-teachers-l1-e4
type: true_false
skill: lesson-planning
question: Swipe right if true, left if false.
cards:
  - statement: A plan from AI is ready to teach without changes.
    answer: false
    explanation: You know your students and your time. Always review and adjust.
  - statement: If the first draft misses the mark, you can ask for changes in a follow-up message.
    answer: true
    explanation: Follow-ups are the fastest way to refine a draft.
  - statement: AI can suggest an activity that takes more time than you have.
    answer: true
    explanation: Timing is a common weak spot, so check it against your period.
hint: Think about who knows your class best.
```

```yaml exercise
id: ai-for-teachers-l1-e5
type: single_select
skill: lesson-planning
question: The support version of an AI activity is far too easy. What do you do?
options:
  - "Use it as it is, since the AI wrote it for that level."
  - "Ask the AI to raise the difficulty slightly, keep the sentence starters, then review it."
  - "Delete everything and write the whole plan alone."
answer: 1
explanation: A targeted follow-up fixes the gap quickly, and your review keeps quality in your hands.
hint: Iterating beats both blind trust and starting over.
```

### Practice

```yaml practice
id: ai-for-teachers-l1-practice
skill: differentiation
instructions: Write a prompt that asks {{tool}} for one activity in three levels for a topic you really teach.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that creates one classroom activity in support, core and extension versions.
  Include the learning goal, grade level, time available and what the support version should offer.
default_context: A Grade 6 teacher needs a 30-minute activity on main idea in a short article for a mixed-level class of 24.
rubric:
  - criterion: Gives class context
    description: States grade, subject, time and any relevant group needs without naming students.
  - criterion: Sets a shared goal
    description: Names one clear learning goal that all versions aim at.
  - criterion: Specifies the versions
    description: Asks for support, core and extension and says what the support level should include.
example_good_prompt: "Grade 6 English, 30 minutes, 24 students. Goal: students identify the main idea of a short article and support it with two details. Create one activity in three versions: support with sentence starters and a graphic organizer, core, and extension with an unfamiliar text. Keep the goal identical. Add a 2-minute check at the end."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners write one-line prompts without grade, time or goal. Ask what the AI would have to guess.
  - Learners paste student names or details. Remind them to describe needs generally.
key_points:
  - Context in, usable draft out.
  - Same goal, different support.
  - You review and adapt every plan.
follow_up_tasks:
  - Rewrite the prompt "Make a history lesson" with goal, grade, time and one group need.
```

## Lesson 2: Quizzes, rubrics and exit tickets

```yaml lesson
id: ai-for-teachers-l2
duration_min: 5
skills: [rubric-design, verification, prompt-structure]
goal: Generate quiz questions and a rubric aligned to one objective, and check every answer yourself.
```

### Card: Start from the objective

Quality questions test one objective. Give the AI the objective, grade, question types and number, plus what students have covered. Ask for a mix, such as recall, application and one short explanation.

Example: "Objective: calculate the area of rectangles. Grade 4. Five questions, last one a word problem."

### Card: Rubrics and exit tickets

Ask for a rubric with three or four criteria and clear level descriptions in student-friendly words. For an exit ticket, ask for two or three quick questions that show whether students reached the objective today.

### Card: Check every key

AI makes factual and math mistakes and states them confidently. It can give a wrong answer key, two correct options or an ambiguous question. Solve each question yourself before students see it. Also check the wording against what you actually taught.

### Exercise

```yaml exercise
id: ai-for-teachers-l2-e1
type: single_select
skill: prompt-structure
question: Which request gives you a quiz aligned to your lesson?
options:
  - "Write a quiz about fractions."
  - "Objective: compare fractions with unlike denominators. Grade 5. Six multiple-choice questions, plus one question asking students to explain their reasoning."
  - "Write a hard fractions test with an answer key."
answer: 1
explanation: A clear objective, grade and question mix keep the quiz focused on what you taught.
hint: Look for the objective and the question types.
```

```yaml exercise
id: ai-for-teachers-l2-e2
type: multi_select
skill: verification
question: Select all that apply. What should you check in an AI-generated answer key?
options:
  - "That every calculation is correct"
  - "That only one option is truly correct in each multiple-choice question"
  - "That the quiz looks long enough"
  - "That the content matches what you actually taught"
answers: [0, 1, 3]
explanation: Wrong math, double-correct options and off-topic content are the common errors. Length is your choice.
hint: Think about what could be wrong, not how the quiz looks.
```

```yaml exercise
id: ai-for-teachers-l2-e3
type: fill_blank
skill: rubric-design
question: Pick the phrase that makes this rubric prompt work best.
prompt: "Create a rubric for a Grade 7 paragraph on a historical event. ___"
options:
  - "Make it fair."
  - "Use four criteria, claim, evidence, organization and grammar, with three levels each, in words a 12-year-old understands."
  - "Add as many criteria as possible."
answer: 1
explanation: Named criteria, levels and reading level make the rubric usable for both you and students.
hint: A good rubric names criteria and describes levels.
```

```yaml exercise
id: ai-for-teachers-l2-e4
type: true_false
skill: verification
question: Swipe right if true, left if false.
cards:
  - statement: If AI gives an answer key, you can trust the math.
    answer: false
    explanation: AI makes arithmetic and factual errors, so solve each item yourself.
  - statement: An exit ticket should show whether students reached today's objective.
    answer: true
    explanation: Two or three targeted questions give you quick evidence.
  - statement: You should paste real student quiz results into a public AI tool to find patterns.
    answer: false
    explanation: Results can identify students. Use anonymized or summarized data only.
hint: Ask what can go wrong if you skip checking.
```

```yaml exercise
id: ai-for-teachers-l2-e5
type: single_select
skill: verification
question: You solve question 4 and get 36, but the AI key says 32. What do you do?
options:
  - "Keep the key, the AI is probably right."
  - "Recheck your work, then correct the key if you are right, and review the other items too."
  - "Remove the key and give students no answers."
answer: 1
explanation: One mistake suggests there may be others, so confirm yourself and review the rest.
hint: One error is a signal about the rest.
```

### Practice

```yaml practice
id: ai-for-teachers-l2-practice
skill: rubric-design
instructions: Write a prompt that asks {{tool}} for an exit ticket and a short rubric for one lesson objective.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} that creates a 3-question exit ticket and a 3-criterion rubric for one learning objective.
  Say how you will check the answer key.
default_context: A Grade 8 science teacher needs an exit ticket and a short rubric on explaining cause and effect in a lab report.
rubric:
  - criterion: States the objective
    description: Names one clear learning objective and the grade level.
  - criterion: Specifies the output
    description: Asks for a number of questions, a rubric with criteria and levels, and a reading level.
  - criterion: Plans verification
    description: Mentions solving or checking the answer key yourself.
example_good_prompt: "Grade 8 science. Objective: students explain cause and effect in a lab result. Create a 3-question exit ticket, one recall, one application and one short explanation, and a rubric with three criteria and three levels in student-friendly words. Give an answer key; I will verify it myself before use."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners skip the objective and ask for a quiz on a topic. Ask which skill the quiz should measure.
  - Learners trust the answer key. Have them solve two items and compare.
key_points:
  - One objective per quiz.
  - Rubrics need criteria and level descriptions.
  - You verify every answer key.
follow_up_tasks:
  - Ask for five math questions, solve them yourself and note any errors in the key.
```

## Lesson 3: Feedback on student work, and integrity

```yaml lesson
id: ai-for-teachers-l3
duration_min: 6
skills: [feedback-drafting, student-privacy, academic-integrity]
goal: Draft rubric-based feedback from anonymized work and talk with students about AI use fairly.
```

### Card: Remove names first

Student work is personal data. Before using a public AI tool, remove names, IDs, photos and details that identify a child. Replace them with "Student A". Follow your school's policy on which tools you may use at all.

### Card: Comments against your rubric

Paste your rubric and the anonymized work. Ask for two strengths, one next step and a comment in plain, kind language, tied to the criteria. You read each comment, edit it and decide the grade yourself.

### Card: Talk about AI use

AI detectors are unreliable and can falsely accuse honest students. Instead, set clear rules for when AI is allowed, ask students to note how they used it, and ask them to explain their work in conversation.

### Exercise

```yaml exercise
id: ai-for-teachers-l3-e1
type: single_select
skill: student-privacy
question: What should you do before pasting an essay into a public AI tool?
options:
  - "Keep the name so the feedback feels personal."
  - "Remove the name and identifying details, and use a tool your school allows."
  - "Nothing, an essay is just schoolwork, not personal data."
answer: 1
explanation: Student work can identify a child. Anonymize it and follow school policy.
hint: Ask what could identify a child if the text is stored.
```

```yaml exercise
id: ai-for-teachers-l3-e2
type: multi_select
skill: feedback-drafting
question: Select all that apply. What belongs in a good feedback prompt?
options:
  - "Your rubric criteria"
  - "The student's full name and class"
  - "A request for strengths and one next step"
  - "A request to give the final grade"
answers: [0, 2]
explanation: Rubric and structure give useful comments. Names add risk, and the grade is your decision.
hint: Two options hand over data or decisions that belong to you.
```

```yaml exercise
id: ai-for-teachers-l3-e3
type: fill_blank
skill: academic-integrity
question: Pick the phrase that best completes your class AI policy.
prompt: "You may use AI to brainstorm ideas. ___"
options:
  - "Anything else counts as cheating, with no exceptions."
  - "Add a short note saying how you used it, and be ready to explain your work to me."
  - "I will run every essay through a detector."
answer: 1
explanation: Clear rules, disclosure and conversation are fairer than relying on detectors.
hint: The best policy is specific and keeps a human conversation.
```

```yaml exercise
id: ai-for-teachers-l3-e4
type: true_false
skill: academic-integrity
question: Swipe right if true, left if false.
cards:
  - statement: An AI detector score is enough proof that a student cheated.
    answer: false
    explanation: Detectors make errors, especially with some writing styles. Talk to the student.
  - statement: AI can draft comments, but the teacher decides the grade.
    answer: true
    explanation: Grading judgment and responsibility stay with you.
  - statement: Asking students to explain their work orally helps show their own understanding.
    answer: true
    explanation: A conversation reveals understanding better than a score.
hint: Who is accountable for a grade?
```

```yaml exercise
id: ai-for-teachers-l3-e5
type: single_select
skill: feedback-drafting
question: AI suggests the comment "Great job!" for a weak essay. What do you do?
options:
  - "Send it, it saves time."
  - "Rewrite it to match the rubric: name a real strength and one clear next step."
  - "Ask the AI to write a longer comment with more praise."
answer: 1
explanation: Feedback must reflect the actual work. You edit AI drafts to be accurate and specific.
hint: Compare the comment with what the student actually wrote.
```

### Practice

```yaml practice
id: ai-for-teachers-l3-practice
skill: feedback-drafting
instructions: Write a prompt that asks {{tool}} for rubric-based feedback on an anonymized student paragraph.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Write a prompt for {{tool}} to draft feedback on one anonymized piece of student work.
  Include your rubric, the structure of the comment and who makes the final grade.
default_context: A Grade 9 English teacher has 30 paragraph responses to comment on and a three-criterion rubric.
rubric:
  - criterion: Protects privacy
    description: Uses anonymized work, such as Student A, and no personal details.
  - criterion: Uses the rubric
    description: Ties comments to named criteria.
  - criterion: Keeps teacher control
    description: States the teacher edits comments and decides the grade.
example_good_prompt: Below is an anonymized paragraph by Student A and my rubric (claim, evidence, clarity). Draft feedback in kind, plain language, two strengths, one next step, tied to the criteria. Do not give a grade; I will review and decide.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners leave names or school details in pasted work. Have them anonymize first.
  - Learners ask AI for a grade. Redirect to comments only.
key_points:
  - Anonymize before you paste.
  - AI drafts comments, you decide the grade.
  - Use clear rules and conversation, not detectors.
follow_up_tasks:
  - Write three sentences for a class AI policy.
```
