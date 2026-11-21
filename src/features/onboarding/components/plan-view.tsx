"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { EmptyState, ErrorState } from "@/components/state-views";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatHours } from "@/features/chaos-map/chaos-meta";
import { ApiError } from "@/lib/api-error";
import type { LearningPlan, PlanItem } from "@/lib/contracts";
import { t } from "@/lib/i18n";

import { onboardingApi, onboardingKeys } from "../onboarding-api";
import { onboardingSessionStore, useStoredSessionId } from "../session-storage";

/**
 * The learning plan. Signed in: GET /me/plan (and a finished anonymous onboarding from this browser is
 * claimed first). Anonymous: the plan of the onboarding session in localStorage, with an offer to save it.
 */
export function PlanView() {
  const queryClient = useQueryClient();
  const storedId = useStoredSessionId();

  const me = useQuery({
    queryKey: onboardingKeys.myPlan,
    queryFn: onboardingApi.myPlan,
    retry: (count, error) => !(error instanceof ApiError && error.status === 401) && count < 2,
  });
  const anonymous = me.error instanceof ApiError && me.error.status === 401;

  const stored = useQuery({
    queryKey: onboardingKeys.session(storedId ?? ""),
    queryFn: () => onboardingApi.session(storedId!),
    enabled: Boolean(storedId),
    retry: false,
  });

  const { mutate: claim, isPending: claiming } = useMutation({
    mutationFn: onboardingApi.claim,
    onSuccess: () => {
      onboardingSessionStore.clear();
      toast.success(t("plan.saved"));
      return queryClient.invalidateQueries({ queryKey: onboardingKeys.myPlan });
    },
  });

  // Signed in + a finished onboarding from this browser → link it to the account once.
  const claimed = useRef(false);
  const claimable = me.isSuccess && stored.data?.status === "completed";
  useEffect(() => {
    if (!claimable || claimed.current || !stored.data) return;
    claimed.current = true;
    claim(stored.data.sessionId);
  }, [claimable, stored.data, claim]);

  const waitingForStored = storedId === undefined || (Boolean(storedId) && stored.isPending);
  if (me.isPending || (anonymous && waitingForStored) || claiming) return <PlanSkeleton />;
  if (me.isError && !anonymous) return <ErrorState onRetry={() => me.refetch()} retrying={me.isFetching} />;

  const plan: LearningPlan | null = anonymous ? (stored.data?.plan ?? null) : (me.data ?? null);
  if (!plan || plan.items.length === 0) {
    return (
      <EmptyState
        title={t("plan.emptyTitle")}
        description={t("plan.emptyDescription")}
        action={
          <Button asChild>
            <Link href="/onboarding">{t("plan.emptyAction")}</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ol className="flex flex-col">
        {plan.items.map((item) => (
          <PlanRow key={item.id} item={item} />
        ))}
      </ol>
      {anonymous && (
        <section className="flex max-w-prose flex-col items-start gap-3 border-t pt-6">
          <p className="text-muted-foreground">{t("plan.signInHint")}</p>
          <Button asChild size="lg">
            <Link href="/register">{t("plan.signIn")}</Link>
          </Button>
        </section>
      )}
    </div>
  );
}

const statusLabel: Record<PlanItem["status"], string> = {
  slot: t("plan.slot"),
  ready: t("plan.ready"),
  in_progress: t("plan.inProgress"),
  done: t("plan.done"),
};
const statusVariant = { slot: "outline", ready: "ai", in_progress: "info", done: "success" } as const;

function PlanRow({ item }: { item: PlanItem }) {
  return (
    <li className="flex gap-4 border-t border-input py-4">
      <span className="w-6 shrink-0 text-right text-lg font-medium text-muted-foreground tabular-nums">
        {item.order}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h2 className="min-w-0 text-lg font-medium break-words">{item.skillTitle}</h2>
          <Badge variant={statusVariant[item.status]}>{statusLabel[item.status]}</Badge>
        </div>
        {item.lessonTitle && (
          <p className="text-muted-foreground">{t("plan.lesson", { title: item.lessonTitle })}</p>
        )}
        {item.rationale && <p className="max-w-prose text-muted-foreground">{item.rationale}</p>}
        <p className="text-sm text-muted-foreground tabular-nums">
          {t("plan.hoursSaved", { hours: formatHours(item.estimatedHoursSaved) })}
        </p>
      </div>
    </li>
  );
}

function PlanSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex gap-4 border-t border-input py-4">
          <Skeleton className="h-6 w-6" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
