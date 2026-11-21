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
        <FieldLabel htmlFor="demo-fail">Демо: Ментор не відповідає</FieldLabel>
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
        ? "Саме так: роль, факти і формат. AI нічого не доведеться вигадувати."
        : "У цьому промпті AI не знає номера замовлення і дати.",
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
          starterSuggestions={["Що таке контекст у промпті?", "Покажи приклад"]}
          onExtraTaskStart={() => toast("Тут відкриється додаткове завдання")}
        />
      }
    >
      {step === "theory" && (
        <section className="flex max-w-prose flex-col gap-4">
          <p>
            AI не бачить твоєї пошти, таблиць і домовленостей. Усе, що він знає про ситуацію, це текст твого
            промпту. Тому відповідь буде настільки точною, наскільки точно описано задачу.
          </p>
          <p>Добрий промпт має три частини: хто пише (роль), що відомо (факти), що потрібно (формат).</p>
          <MentorEntry variant="lesson" className="self-start" />
        </section>
      )}
      {step === "example" && (
        <section className="flex max-w-prose flex-col gap-4">
          <p>Порівняй два промпти для однієї і тієї ж відповіді клієнту.</p>
          <PromptBlock text="Напиши відповідь клієнту про замовлення." />
          <PromptBlock text="Ти офіс-менеджер. Клієнт питає про замовлення №214. Воно буде готове в четвер. Напиши теплу відповідь на 3 речення." />
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
            Ментор знає, на якому ти кроці, і бачить твої помилки у вправах. Запитай його про будь-що з уроку.
          </p>
          <p className="text-muted-foreground lg:hidden">Ментор відкривається знизу екрана.</p>
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
      { type: "text", text: `Добре питання: «${text}». Коротко: дай AI факти, яких він не може знати сам.` },
      {
        type: "steps",
        items: [
          "Хто пише і кому.",
          "Що відомо: номери, дати, імена.",
          "Який потрібен результат і якої довжини.",
        ],
      },
    ],
    mistake: null,
    extraTasks: [],
    suggestions: ["Покажи ще приклад", "Як перевірити відповідь AI?"],
  };
}
