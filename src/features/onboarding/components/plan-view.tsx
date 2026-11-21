"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { EmptyState, ErrorState } from "@/components/state-views";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { PlanCertificateSection } from "@/features/certificates/components/plan-certificate";
import { PlanQuest } from "@/features/quest/components/quest-progress";
import { ApiError } from "@/lib/api-error";
import type { LearningPlan } from "@/lib/contracts";
import { t } from "@/lib/i18n";

import { onboardingApi, onboardingKeys } from "../onboarding-api";
import { onboardingSessionStore, useStoredSessionId } from "../session-storage";

/**
 * The learning plan. Signed in: GET /me/plan (and a finished anonymous onboarding from this browser is
 * claimed first). Anonymous: the plan of the onboarding session in localStorage, with an offer to save it.
 */
export function PlanView() {
  const queryClient = useQueryClient();
  const router = useRouter();
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
      router.refresh(); // the header drops its "Take the onboarding" link
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
      <PlanQuest plan={plan} guest={anonymous} />
      {!anonymous && <PlanCertificateSection />}
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
