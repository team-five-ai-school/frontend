---
id: ai-for-small-business
title: AI for Small Business Owners
track: small-business
level: beginner
description: Use an AI assistant to answer customers, plan marketing and make sense of your sales numbers, while checking every result yourself.
skills: [customer-replies, brand-voice, promise-safety, local-marketing, content-planning, data-cleaning, number-checking, privacy]
certificate: AI for Small Business Essentials
minutes_saved_per_week: 150
---

# AI for Small Business Owners

## Lesson 1: Answer customers fast, in your own voice

```yaml lesson
id: ai-for-small-business-l1
duration_min: 5
skills: [customer-replies, brand-voice, promise-safety, privacy]
goal: Draft customer replies and an FAQ with AI that sound like you and promise only what you can deliver.
```

### Card: Give the facts, get a draft

AI writes a good reply when you hand it the facts. Paste the customer's message, say what happened and name what you can offer. Example: a cake arrived late. Tell the AI "we were 40 minutes late, I can refund the delivery fee." Ask for a short, warm reply. Remove names and phone numbers first.

### Card: Keep your own voice

Paste two or three of your past replies and say "write like this." Add rules: "friendly, no corporate phrases, first name only." For a negative review, ask for a calm reply that thanks the person, owns the real problem and offers to talk offline.

### Card: You own every promise

AI tends to agree and please, so it may invent refunds, deadlines or policies. Before sending, read the draft for anything you have not agreed to. Delete it or fix it. Then turn your repeated questions into an FAQ: paste ten real questions and your true answers, and ask for a tidy list.

### Exercise

```yaml exercise
id: ai-for-small-business-l1-e1
type: single_select
skill: customer-replies
question: A customer complains that her order arrived damaged. What do you give the AI to get a useful reply?
options:
  - "Only the complaint, and ask it to fix things."
  - "The complaint, what happened, and what you are willing to offer."
  - "A request for the most generous reply possible."
answer: 1
explanation: The AI cannot know what you will offer. Facts and limits let it draft something you can send.
hint: Think about what the AI cannot know about your shop.
```

### Exercise

```yaml exercise
id: ai-for-small-business-l1-e2
type: true_false
skill: promise-safety
question: Swipe right if true, left if false.
cards:
  - statement: If the AI writes "full refund within 24 hours," it is safe to send as is.
    answer: false
    explanation: The AI invents policies. Only send what you have decided.
  - statement: A draft reply should be read before it goes out.
    answer: true
    explanation: You are responsible for every word that carries your business name.
  - statement: You can paste a customer's full name and address into any AI tool.
    answer: false
    explanation: Remove personal details first. Write "the customer" instead.
hint: Who is responsible once the message is sent?
```

### Exercise

```yaml exercise
id: ai-for-small-business-l1-e3
type: fill_blank
skill: brand-voice
question: Pick the phrase that keeps the reply sounding like you.
prompt: "Reply to this review. ___ Thank the guest and offer to talk by phone."
options:
  - "Be professional."
  - "Here are two of my past replies. Match their warm, casual tone."
  - "Sound like a big company."
answer: 1
explanation: Real examples teach tone better than a single word like professional.
hint: Show, do not just tell.
```

### Exercise

```yaml exercise
id: ai-for-small-business-l1-e4
type: multi_select
skill: customer-replies
question: Select all that apply. Which steps help with a negative review?
options:
  - "Ask for a calm tone that owns the real problem."
  - "Let the AI argue that the customer is wrong."
  - "Offer to continue the conversation privately."
  - "Include the reviewer's order details in your prompt."
answers: [0, 2]
explanation: A calm, honest reply that moves offline protects your reputation. Arguing and sharing details do not.
hint: Picture a future customer reading your public reply.
```

### Exercise

```yaml exercise
id: ai-for-small-business-l1-e5
type: single_select
skill: customer-replies
question: You want an FAQ page. What is the best input?
options:
  - "Ask AI to guess common questions."
  - "Ten real customer questions plus your true answers."
  - "Your competitor's FAQ, copied."
answer: 1
explanation: Real questions and your true answers make an FAQ that is accurate for your business.
hint: Where do your true answers live?
```

### Practice

```yaml practice
id: ai-for-small-business-l1-practice
skill: customer-replies
instructions: Write a prompt that gets a draft reply to a difficult customer message, in your voice and without invented promises.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Using {{tool}}, write a prompt that drafts a reply to an unhappy customer message
  related to this. Include the facts, what you can offer, your tone, and what the AI must not promise.
default_context: You run a small cafe. A customer says her birthday cake order was 40 minutes late and wants her money back. You can refund the delivery fee only.
rubric:
  - criterion: Gives facts
    description: States what happened and the customer's message, without personal data.
  - criterion: Sets limits
    description: Names what can be offered and tells the AI not to promise anything else.
  - criterion: Keeps the voice
    description: Asks for a specific tone or includes a sample of the owner's writing.
example_good_prompt: "Reply to this customer message (name removed). Facts: our cake arrived 40 minutes late. I can refund the delivery fee only, nothing more. Tone: warm, plain, like my past replies below. Do not promise a full refund or a free order. Keep it under 80 words."
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Learners paste the full complaint with names; remind them to anonymize first.
  - Learners send the draft unread; have them mark every promise in it.
key_points:
  - Give facts and limits, the AI supplies wording.
  - Examples of your past replies carry your voice.
  - You are responsible for every promise.
follow_up_tasks:
  - Take a real review and write a prompt with three facts and one thing the AI must not promise.
```

## Lesson 2: Marketing on a budget

```yaml lesson
id: ai-for-small-business-l2
duration_min: 5
skills: [local-marketing, content-planning, brand-voice, promise-safety]
goal: Create social posts, product descriptions and a one-week content plan that fit your local customers and make only true claims.
```

### Card: Say who you are talking to

"Write a post for my bakery" gives a generic result. Add your town, your customers and the offer. Example: "Post for parents near Elm Street. Friday only, buy two croissants, get a third. Friendly, two sentences." Ask for three versions and pick the one that sounds like you.

### Card: Describe real products

Give the AI your facts: materials, size, what makes the item different. Ask for a short description for a shop page. Then check each claim. If the AI writes "organic" or "handmade in small batches" and it is not true, remove it.

### Card: Plan one week at a time

Tell the AI your days open, your slowest day and one goal. Ask for a table: day, post idea, photo to take. Then do the work in batches. A plan you can finish beats a perfect plan you skip.

### Exercise

```yaml exercise
id: ai-for-small-business-l2-e1
type: fill_blank
skill: local-marketing
question: Pick the phrase that makes this post request work best.
prompt: "Write an Instagram post for my hair salon. ___ Two sentences, friendly tone."
options:
  - "Make it go viral."
  - "Our customers are locals in a small town. Offer: 15 percent off cuts on Tuesdays, our slowest day."
  - "Use lots of trendy words."
answer: 1
explanation: Audience, place and a concrete offer turn a generic post into one that fits your business.
hint: What does the AI not know about your customers?
```

### Exercise

```yaml exercise
id: ai-for-small-business-l2-e2
type: true_false
skill: local-marketing
question: Swipe right if true, left if false.
cards:
  - statement: AI can add features to a product description that you did not give it.
    answer: true
    explanation: It may invent materials or claims, so check every detail.
  - statement: Asking for three versions of a post helps you pick your best one.
    answer: true
    explanation: Comparing options is faster than rewriting one draft.
  - statement: A content plan should include as many posts per day as possible.
    answer: false
    explanation: A plan you can actually keep is more useful than a big one.
hint: Think about who verifies the facts.
```

### Exercise

```yaml exercise
id: ai-for-small-business-l2-e3
type: single_select
skill: content-planning
question: What should you tell the AI to get a useful weekly plan?
options:
  - "Just: make me a plan."
  - "Your open days, slowest day, one goal and how much time you have."
  - "Your yearly revenue."
answer: 1
explanation: Real constraints make the plan something you can follow.
hint: A plan has to fit your week.
```

### Exercise

```yaml exercise
id: ai-for-small-business-l2-e4
type: multi_select
skill: local-marketing
question: Select all that apply. Which details make a post feel local?
options:
  - "A nearby street or neighborhood name."
  - "A seasonal event in your town."
  - "Generic phrases like best quality ever."
  - "A limited offer for your quietest day."
answers: [0, 1, 3]
explanation: Local details and specific offers feel real. Generic phrases could belong to anyone.
hint: Which details could only come from your business?
```

### Exercise

```yaml exercise
id: ai-for-small-business-l2-e5
type: single_select
skill: promise-safety
question: The AI describes your candles as "100 percent natural." You have not confirmed this. What do you do?
options:
  - "Post it, it sounds great."
  - "Remove or confirm the claim before posting."
  - "Ask the AI if it is sure."
answer: 1
explanation: The AI cannot verify your product. You must confirm claims before customers rely on them.
hint: Who actually knows what is in the candles?
```

### Practice

```yaml practice
id: ai-for-small-business-l2-practice
skill: local-marketing
instructions: Write a prompt that creates a week of social content for your business, tailored to local customers.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Using {{tool}}, write a prompt for a one-week content plan that helps with this.
  Include your customers, your location, one offer, and the format you want.
default_context: You own a small flower shop in a neighborhood with many young families. Tuesdays are slow. You can post three times a week.
rubric:
  - criterion: Describes the audience
    description: Names who the customers are and where they are.
  - criterion: Gives real constraints
    description: States posting days, time or the slow day and one offer.
  - criterion: Specifies the output
    description: Asks for a table or list with post ideas and the photo to take.
example_good_prompt: I own a flower shop in a neighborhood with many young families. Tuesdays are slow. Make a one-week plan with three posts as a table - day, post idea, photo to take. Include a Tuesday offer of 10 percent off bouquets. Friendly, short, no invented facts about our flowers.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Prompts that skip location and offer, producing generic posts.
  - Learners keep AI product claims they cannot confirm.
key_points:
  - Audience, place and offer make a post local.
  - Check every product claim.
  - Plan only what you can finish.
follow_up_tasks:
  - Rewrite a generic post prompt to include a street name, an offer and a tone.
```

## Lesson 3: Make sense of your numbers

```yaml lesson
id: ai-for-small-business-l3
duration_min: 6
skills: [data-cleaning, number-checking, privacy]
goal: Use AI to clean a sales export, compare supplier prices and spot trends, then check the totals yourself.
```

### Card: Clean the mess

Sales exports often have mixed date formats, duplicate rows and inconsistent product names. Paste a few sample rows, remove customer names, and ask the AI how to fix them in your spreadsheet. Ask for the formula or steps, not just the result, so you can repeat it next month.

### Card: Compare and spot trends

Give the AI supplier prices for the same items and ask for a side-by-side table. Or paste monthly sales and ask "what changed?" It can point out that Saturdays are your best day. Use it to organize and explain, not to decide prices or taxes.

### Card: Check the totals yourself

AI can make arithmetic errors and miss rows. Compare its totals with your spreadsheet's SUM. Spot check two or three numbers by hand. For taxes, pricing decisions or loans, ask your accountant.

### Exercise

```yaml exercise
id: ai-for-small-business-l3-e1
type: single_select
skill: data-cleaning
question: Your sales export has dates in three different formats. What is the best prompt?
options:
  - "Fix my data."
  - "Here are five sample rows. Explain how to convert all dates to one format in my spreadsheet."
  - "Here is my whole customer list, clean it."
answer: 1
explanation: Sample rows and a request for steps keeps data private and gives you a method you can reuse.
hint: You want a method, not just a one-time fix.
```

### Exercise

```yaml exercise
id: ai-for-small-business-l3-e2
type: true_false
skill: number-checking
question: Swipe right if true, left if false.
cards:
  - statement: AI totals are always correct because computers are good at math.
    answer: false
    explanation: AI assistants can make arithmetic errors, so compare with a spreadsheet SUM.
  - statement: Asking AI which supplier is cheapest for each item is a good use.
    answer: true
    explanation: Side-by-side comparison is organizing data. Still check the table against your price lists.
  - statement: AI can tell you exactly how much tax you owe.
    answer: false
    explanation: Tax decisions need your accountant and official rules.
hint: Who is responsible for your numbers?
```

### Exercise

```yaml exercise
id: ai-for-small-business-l3-e3
type: fill_blank
skill: data-cleaning
question: Pick the phrase that makes this request safe and useful.
prompt: "Here are 10 sample rows from my sales export. ___ Tell me how to remove duplicates."
options:
  - "I removed customer names and emails."
  - "The rows are real, so I kept customer names and emails to stay accurate."
  - "Please guess any values that are missing."
answer: 0
explanation: Remove personal details before pasting data into a public AI tool.
hint: What should never leave your shop in a prompt?
```

### Exercise

```yaml exercise
id: ai-for-small-business-l3-e4
type: multi_select
skill: number-checking
question: Select all that apply. How do you check AI output on your numbers?
options:
  - "Compare its total with the spreadsheet SUM."
  - "Recalculate two or three rows by hand."
  - "Trust it if it sounds confident."
  - "Look for rows it may have skipped."
answers: [0, 1, 3]
explanation: Confident tone proves nothing. Totals, spot checks and row counts catch mistakes.
hint: Which checks use your own data?
```

### Exercise

```yaml exercise
id: ai-for-small-business-l3-e5
type: single_select
skill: number-checking
question: The AI says you should raise prices by 12 percent to improve profit. What is the right response?
options:
  - "Raise prices right away."
  - "Treat it as an idea, check your costs and customers, and ask your accountant if unsure."
  - "Ask the AI to confirm, and raise prices if it agrees."
answer: 1
explanation: AI does not see your full costs or market. Decisions about money remain yours.
hint: Does the AI know your whole business?
```

### Practice

```yaml practice
id: ai-for-small-business-l3-practice
skill: data-cleaning
instructions: Write a prompt that asks AI to organize or compare your numbers and tells it how you will verify the result.
task_template: >
  You work as {{role}}. One of your daily pains is {{pain}}.
  Using {{tool}}, write a prompt that helps you organize numbers related to this.
  Describe the data, what you want back, and how you will check it. Do not include personal data.
default_context: You run an online store. Your monthly sales export has duplicate rows and dates in two formats, and you also have prices from two suppliers for the same ten items.
rubric:
  - criterion: Describes the data safely
    description: Explains the columns or gives sample rows without customer personal data.
  - criterion: Specifies the output
    description: Asks for steps, a formula or a table, such as a side-by-side price comparison.
  - criterion: Plans verification
    description: Says the owner will check totals, and asks for no financial or tax advice.
example_good_prompt: My sales export has columns date, product, quantity, price. Dates come in two formats and some rows are duplicated. Here are 5 sample rows with no customer data. Explain how to clean this in a spreadsheet and give a formula for the total. I will check the total with SUM. Do not give financial advice.
```

### Mentor notes

```yaml mentor
common_mistakes:
  - Pasting customer lists with personal data; steer toward sample rows.
  - Accepting AI totals without a check.
key_points:
  - Ask for steps and formulas you can reuse.
  - Remove personal data first.
  - AI organizes and explains; you verify, and an accountant advises.
follow_up_tasks:
  - Take ten rows of sales and compare the AI's total with your own SUM.
```
