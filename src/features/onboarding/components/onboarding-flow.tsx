"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { RotateCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ErrorState } from "@/components/state-views";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { ApiError } from "@/lib/api-error";
import { firstLesson, RoleId, type QuizAnswer, type Role } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

import { onboardingApi, onboardingKeys, type SessionWithResult } from "../onboarding-api";
import { onboardingSessionStore } from "../session-storage";
import { toAssessment } from "../to-chaos-map";
import { DescribeStep } from "./describe-step";
import { OnboardingResult } from "./onboarding-result";
import { QuizStep } from "./quiz-step";
import { RolePicker } from "./role-picker";
import { TaskLayoutStep } from "./task-layout-step";

type Step =
  | { kind: "boot" }
  | { kind: "role" }
  | { kind: "quiz"; index: number }
  | { kind: "describe" }
  | { kind: "layout"; freeText: string }
  | { kind: "completing" }
  | { kind: "result"; session: SessionWithResult };

/**
 * Onboarding: role → quiz → optional free text → "AI is laying out your day" (stream) → chaos map + hours.
 * The session id lives in localStorage, so a reload resumes at the right step.
 */
export function OnboardingFlow() {
  const router = useRouter();
  // Guest or signed in: GET /me/plan answers 401 for guests (same query as the plan page).
  const me = useQuery({
    queryKey: onboardingKeys.myPlan,
    queryFn: onboardingApi.myPlan,
    retry: (count, error) => !(error instanceof ApiError && error.status === 401) && count < 2,
  });
  const guest = me.error instanceof ApiError && me.error.status === 401;
  const [step, setStep] = useState<Step>({ kind: "boot" });
  const [session, setSession] = useState<SessionWithResult | null>(null);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [role, setRole] = useState<RoleId | null>(null);
  const lastSave = useRef<Promise<unknown>>(Promise.resolve());

  const roles = useQuery({
    queryKey: onboardingKeys.roles,
    queryFn: onboardingApi.roles,
    staleTime: 5 * 60_000,
  });

  const reset = () => {
    onboardingSessionStore.clear();
    setSession(null);
    setAnswers([]);
    setRole(null);
    setStep({ kind: "role" });
  };

  const complete = useMutation({
    mutationFn: async (id: string) => {
      await lastSave.current.catch(() => undefined);
      await onboardingApi.complete(id);
      // Re-read the session: it carries tasks, chaos map and plan in one shape (same as after a reload).
      return onboardingApi.session(id);
    },
    onSuccess: (s) => {
      setSession(s);
      setStep({ kind: "result", session: s });
    },
  });

  /** Puts the flow at the right step for a session (fresh or restored). */
  const resume = (s: SessionWithResult) => {
    setSession(s);
    setAnswers(s.answers);
    setRole(RoleId.safeParse(s.role.slug).data ?? null);
    if (s.status === "claimed") return router.push("/plan");
    if (s.status === "completed" && s.chaosMap) return setStep({ kind: "result", session: s });
    if (s.status === "described") {
      setStep({ kind: "completing" });
      return complete.mutate(s.sessionId);
    }
    const answered = new Set(s.answers.map((a) => a.questionId));
    const next = s.quiz.findIndex((q) => !answered.has(q.id));
    setStep(next === -1 ? { kind: "describe" } : { kind: "quiz", index: next });
  };

  // Restore once on mount. localStorage is browser-only, so this cannot run during render.
  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    const id = onboardingSessionStore.get();
    // Async on purpose: state is set from the promise, never synchronously in the effect.
    Promise.resolve(id ? onboardingApi.session(id) : null)
      .then((s) => (s ? resume(s) : setStep({ kind: "role" })))
      .catch(() => reset());
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once
  }, []);

  const createSession = useMutation({
    mutationFn: onboardingApi.createSession,
    onSuccess: (s) => {
      onboardingSessionStore.set(s.sessionId);
      resume(s);
    },
  });

  const saveAnswer = (questionId: string, optionIds: string[]) => {
    if (!session) return;
    const next = [...answers.filter((a) => a.questionId !== questionId), { questionId, optionIds }];
    setAnswers(next);
    lastSave.current = onboardingApi.saveAnswers(session.sessionId, next).catch(() => undefined);
  };

  const finishWithoutText = () => {
    if (!session) return;
    setStep({ kind: "completing" });
    complete.mutate(session.sessionId);
  };

  const roleOptions: Role[] = (roles.data ?? []).flatMap((r) => {
    const id = RoleId.safeParse(r.slug);
    return id.success ? [{ id: id.data, title: r.title, description: r.description }] : [];
  });

  const canRestart = session && step.kind !== "result" && step.kind !== "completing";

  return (
    <div className="flex flex-col gap-8">
      {canRestart && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcwIcon data-icon="inline-start" aria-hidden />
            {t("onboarding.introRestart")}
          </Button>
        </div>
      )}

      {step.kind === "boot" && <FlowSkeleton />}

      {step.kind === "role" && (
        <div className="flex flex-col gap-6">
          <div className="flex max-w-prose flex-col gap-2">
            <h1 className="text-3xl font-bold text-balance sm:text-4xl">{t("onboarding.introTitle")}</h1>
            <p className="text-lg text-muted-foreground">{t("onboarding.introLead")}</p>
          </div>
          {roles.isPending ? (
            <FlowSkeleton />
          ) : roles.isError ? (
            <ErrorState onRetry={() => roles.refetch()} retrying={roles.isFetching} />
          ) : (
            <RolePicker roles={roleOptions} value={role} onChange={setRole} />
          )}
          {createSession.isError && <ErrorState compact />}
          <div>
            <Button
              size="lg"
              className="w-full sm:w-auto"
              disabled={!role}
              loading={createSession.isPending}
              onClick={() => role && createSession.mutate(role)}
            >
              {t("onboarding.introStart")}
            </Button>
          </div>
        </div>
      )}

      {step.kind === "quiz" && session && (
        <QuizStep
          key={session.quiz[step.index]!.id}
          question={session.quiz[step.index]!}
          step={step.index + 1}
          total={session.quiz.length}
          value={answers.find((a) => a.questionId === session.quiz[step.index]!.id)?.optionIds ?? []}
          onChange={(optionIds) => saveAnswer(session.quiz[step.index]!.id, optionIds)}
          onNext={() =>
            setStep(
              step.index + 1 < session.quiz.length
                ? { kind: "quiz", index: step.index + 1 }
                : { kind: "describe" },
            )
          }
          onBack={step.index > 0 ? () => setStep({ kind: "quiz", index: step.index - 1 }) : undefined}
        />
      )}

      {step.kind === "describe" && session && (
        <DescribeStep
          onSubmit={(freeText) => setStep({ kind: "layout", freeText })}
          onSkip={finishWithoutText}
          onBack={() => setStep({ kind: "quiz", index: session.quiz.length - 1 })}
        />
      )}

      {step.kind === "layout" && session && (
        <TaskLayoutStep sessionId={session.sessionId} freeText={step.freeText} onDone={finishWithoutText} />
      )}

      {step.kind === "completing" &&
        (complete.isError ? (
          <ErrorState
            onRetry={() => session && complete.mutate(session.sessionId)}
            retrying={complete.isPending}
          />
        ) : (
          <div className="flex items-center gap-3 py-16 text-muted-foreground" role="status">
            <Spinner />
            {t("onboarding.completing")}
          </div>
        ))}

      {step.kind === "result" && step.session.chaosMap && (
        <OnboardingResult
          result={toAssessment(
            step.session.role.slug,
            step.session.chaosMap,
            step.session.tasks,
            step.session.plan,
          )}
          roleTitle={step.session.role.title}
          shareUrl={siteConfig.url}
          onStart={() => {
            // Straight into the first lesson of the plan; the plan page if no lesson is ready yet.
            const lesson = firstLesson(step.session.plan);
            router.push(lesson ? `/lessons/${lesson.lessonSlug}` : "/plan");
          }}
          // Guests: offer an account first. After sign-up they land on /plan, which links this onboarding.
          onSave={guest ? () => router.push("/register") : undefined}
        />
      )}
    </div>
  );
}

function FlowSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" aria-hidden>
      {Array.from({ length: 4 }, (_, i) => (
        <Skeleton key={i} className="h-20 rounded-xl" />
      ))}
    </div>
  );
}
