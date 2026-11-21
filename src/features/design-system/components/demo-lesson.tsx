"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { Field, FieldLabel } from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { QuestionSingle } from "@/features/exercises/components/questions";
import { LessonLayout, type LessonStep } from "@/features/lessons/components/lesson-layout";
import { MentorEntry } from "@/features/mentor/components/mentor-entry";
import { PromptBlock } from "@/features/mentor/components/mentor-message";
import { MentorPanel } from "@/features/mentor/components/mentor-panel";
import { MentorProvider, useMentor, type MentorTransport } from "@/features/mentor/mentor-context";
import type { AnswerResult, MentorMessage } from "@/lib/contracts";

import { courses, exerciseSingle, lessons, mentorReview, mentorThread, mistake } from "../mocks";

const CORRECT = "c";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Demo: lesson with an exercise; a wrong answer flows to the Mentor, who reviews it and assigns extra practice. */
export function DemoLesson() {
  const failRef = useRef(false);
  const [simulateFailure, setSimulateFailure] = useState(false);

  const transport: MentorTransport = {
    ask: async (text) => {
      await wait(1400);
      if (failRef.current) throw new Error("demo failure");
      return answerFor(text);
    },
    review: async () => {
      await wait(1600);
      if (failRef.current) throw new Error("demo failure");
      return { ...mentorReview, id: crypto.randomUUID() };
    },
  };

  return (
    <MentorProvider
      transport={transport}
      initialMessages={mentorThread}
      defaultContext={{ source: "lesson", lessonId: "l1b", exerciseId: null }}
    >
      <Field orientation="horizontal" className="w-auto self-start rounded-xl border border-dashed px-4 py-2">
        <Switch
          id="demo-fail"
          checked={simulateFailure}
          onCheckedChange={(v) => {
            failRef.current = v;
            setSimulateFailure(v);
          }}
        />
        <FieldLabel htmlFor="demo-fail">Demo: Mentor does not respond</FieldLabel>
      </Field>
      <LessonContent />
      <MentorEntry variant="global" />
    </MentorProvider>
  );
}

function LessonContent() {
  const [step, setStep] = useState<LessonStep>("exercise");
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const mentor = useMentor();
  const lesson = lessons.find((l) => l.id === "l1b")!;
  const course = courses.find((c) => c.id === lesson.courseId)!;

  async function check(optionIds: string[]) {
    setSubmitting(true);
    await wait(500);
    const correct = optionIds[0] === CORRECT;
    setSubmitting(false);
    setResult({
      exerciseId: exerciseSingle.id,
      verdict: correct ? "correct" : "incorrect",
      feedback: correct
        ? "Exactly: role, facts and format. AI won't have to invent anything."
        : "In this prompt, AI doesn't know the order number or the date.",
      correctOptionIds: [CORRECT],
      mistakeId: correct ? null : mistake.id,
    });
    if (!correct) {
      // Next frame: the feedback block exists, so the mistake can fly from it to the Mentor.
      requestAnimationFrame(() => mentor.reportMistake(mistake, feedbackRef.current));
    }
  }

  return (
    <LessonLayout
      courseTitle={course.title}
      lesson={lesson}
      step={step}
      completedSteps={["theory", "example"]}
      onStepChange={(s) => {
        if (s === "mentor") mentor.openMentor({ source: "lesson" });
        setStep(s);
      }}
      mentor={
        <MentorPanel
          starterSuggestions={["What is context in a prompt?", "Show an example"]}
          onExtraTaskStart={() => toast("The extra task opens here")}
        />
      }
    >
      {step === "theory" && (
        <section className="flex max-w-prose flex-col gap-4">
          <p>
            AI can&apos;t see your email, spreadsheets or agreements. All it knows about the situation is the
            text of your prompt. So the answer is only as accurate as the task description.
          </p>
          <p>
            A good prompt has three parts: who is writing (role), what is known (facts), what is needed
            (format).
          </p>
          <MentorEntry variant="lesson" className="self-start" />
        </section>
      )}
      {step === "example" && (
        <section className="flex max-w-prose flex-col gap-4">
          <p>Compare two prompts for the same reply to a customer.</p>
          <PromptBlock text="Write a reply to the customer about the order." />
          <PromptBlock text="You are an office manager. The customer asks about order #214. It will be ready on Thursday. Write a warm reply in 3 sentences." />
        </section>
      )}
      {step === "exercise" && (
        <section className="flex max-w-prose flex-col gap-4">
          <QuestionSingle
            exercise={exerciseSingle}
            result={result}
            submitting={submitting}
            onSubmit={check}
            onRetry={() => setResult(null)}
            onOpenMentor={() => mentor.openMentor({ source: "mistake", exerciseId: exerciseSingle.id })}
            onNext={() => setStep("mentor")}
            feedbackRef={feedbackRef}
          />
          {!result && (
            <MentorEntry
              variant="exercise"
              context={{ source: "exercise", exerciseId: exerciseSingle.id }}
              className="self-start"
            />
          )}
        </section>
      )}
      {step === "mentor" && (
        <section className="flex max-w-prose flex-col gap-3">
          <p>
            The Mentor knows which step you are on and sees your mistakes in exercises. Ask it anything about
            the lesson.
          </p>
          <p className="text-muted-foreground lg:hidden">The Mentor opens from the bottom of the screen.</p>
        </section>
      )}
    </LessonLayout>
  );
}

function answerFor(text: string): MentorMessage {
  return {
    id: crypto.randomUUID(),
    role: "mentor",
    createdAt: new Date().toISOString(),
    status: "complete",
    blocks: [
      {
        type: "text",
        text: `Good question: "${text}". In short: give AI the facts it can't know on its own.`,
      },
      {
        type: "steps",
        items: [
          "Who is writing and to whom.",
          "What is known: numbers, dates, names.",
          "What result you need and how long.",
        ],
      },
    ],
    mistake: null,
    extraTasks: [],
    suggestions: ["Show another example", "How do I check an AI answer?"],
  };
}
