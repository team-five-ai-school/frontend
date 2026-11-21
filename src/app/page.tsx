import { ArrowRightIcon, CheckIcon, LockIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

/**
 * Landing for guests. Logged-in users never see it: src/proxy.ts redirects `/` to their plan.
 * Static: no data fetching, so it renders instantly. Facts here (counts, lesson length, segments)
 * must match content/courses.json and content/onboarding.json.
 */

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name}: shift your routine work to AI` },
};

const steps = [
  {
    title: "Map your week",
    text: "Pick your role and the routines that eat your hours. It takes about 3 minutes.",
  },
  {
    title: "Get your plan",
    text: "Lessons are matched to your work, so you start with what saves you time first.",
  },
  {
    title: "Learn by doing",
    text: "Each lesson is about 5 minutes: a few cards, then exercises. When you slip, the Mentor explains why and gives you a practice task.",
  },
  {
    title: "See your progress",
    text: "After every lesson you get a short review: what went well, what to practise and your next step.",
  },
];

const roles = [
  { role: "Marketing", work: "Briefs, campaign copy, and reports from customer feedback." },
  { role: "HR and recruiting", work: "Fairer job ads, onboarding materials, survey analysis." },
  { role: "Teachers", work: "Lesson plans, worksheets, feedback on student work." },
  { role: "Legal", work: "Summaries, comparisons and first drafts, with client confidentiality in mind." },
  { role: "Small business owners", work: "Customer replies, marketing, making sense of your numbers." },
  {
    role: "Other office roles",
    work: "Email, documents, meetings and the AI in Microsoft 365 or Google Workspace.",
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-10 sm:gap-24 sm:px-6 sm:py-16">
      <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-balance sm:text-5xl">Shift your routine work to AI</h1>
          <p className="max-w-prose text-lg text-pretty text-muted-foreground">
            Short, practical courses for office teams. Tell us where your week goes, get a plan built around
            your job, and learn in 5-minute lessons with an AI mentor at your side.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="lg">
              <Link href="/onboarding">
                Get started
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">Log in</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground tabular-nums">
            14 courses · 42 lessons · about 5 minutes each
          </p>
        </div>
        <LessonPreview />
      </section>

      <section aria-labelledby="how-heading" className="flex flex-col gap-6">
        <h2 id="how-heading" className="text-2xl font-bold sm:text-3xl">
          How it works
        </h2>
        <ol className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full border font-bold tabular-nums"
              >
                {i + 1}
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="roles-heading" className="flex flex-col gap-6">
        <div className="flex max-w-prose flex-col gap-2">
          <h2 id="roles-heading" className="text-2xl font-bold sm:text-3xl">
            Made for your job
          </h2>
          <p className="text-muted-foreground">
            Courses for the basics everyone needs, plus tracks with examples from your own work.
          </p>
        </div>
        <dl className="grid grid-cols-1 divide-y rounded-xl border bg-card sm:grid-cols-2 sm:divide-y-0">
          {roles.map((r, i) => (
            <div
              key={r.role}
              className={`flex flex-col gap-1 p-5 ${i < roles.length - 2 ? "sm:border-b" : ""} ${i % 2 === 0 ? "sm:border-r" : ""}`}
            >
              <dt className="font-bold">{r.role}</dt>
              <dd className="text-muted-foreground">{r.work}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col items-start gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold sm:text-2xl">Start with a 3-minute look at your week</h2>
          <p className="text-muted-foreground">
            You will see where AI can save you time before your first lesson.
          </p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href="/onboarding">
            Get started
            <ArrowRightIcon data-icon="inline-end" aria-hidden />
          </Link>
        </Button>
      </section>
    </div>
  );
}

/** A still of the real product: a course's lessons with their states. Decorative, so hidden from screen readers. */
function LessonPreview() {
  const lessons = [
    { title: "Know what to trust and what to check", state: "done" },
    { title: "Write a prompt that gets a usable draft", state: "next" },
    { title: "Improve the answer instead of starting over", state: "locked" },
  ] as const;
  return (
    <div aria-hidden className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-paper">
      <div className="flex items-baseline justify-between gap-3 px-1">
        <p className="font-bold">AI Assistants 101</p>
        <p className="text-xs text-muted-foreground tabular-nums">3 lessons · 15 min</p>
      </div>
      {lessons.map((l, i) => (
        <div
          key={l.title}
          className={`flex items-start justify-between gap-3 rounded-lg border p-3 ${l.state === "next" ? "border-primary/50" : ""} ${l.state === "locked" ? "opacity-60" : ""}`}
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="text-xs text-muted-foreground">Lesson {i + 1} · 5 min</span>
            <span className="text-sm font-semibold">{l.title}</span>
          </div>
          {l.state === "done" && (
            <Badge variant="success" className="shrink-0">
              <CheckIcon data-icon="inline-start" />
              Completed
            </Badge>
          )}
          {l.state === "next" && (
            <Badge className="shrink-0">
              <ArrowRightIcon data-icon="inline-start" />
              Up next
            </Badge>
          )}
          {l.state === "locked" && (
            <Badge variant="outline" className="shrink-0">
              <LockIcon data-icon="inline-start" />
              Locked
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
