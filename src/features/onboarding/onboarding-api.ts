import { z } from "zod";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import {
  ApiChaosMap,
  ApiRole,
  LearningPlan,
  OnboardingCompletion,
  OnboardingSession,
  type QuizAnswer,
} from "@/lib/contracts";

/**
 * Browser calls for the onboarding (anonymous until claimed). They go through /api/backend (src/proxy.ts),
 * which adds the auth cookie as a bearer token, so `claim` and `/me/*` work without touching the token.
 */
const SessionWithResult = OnboardingSession.extend({
  chaosMap: ApiChaosMap.nullable(),
  plan: LearningPlan.nullable(),
});
export type SessionWithResult = z.infer<typeof SessionWithResult>;

export const onboardingApi = {
  roles: () => apiClient("/onboarding/roles", z.array(ApiRole)),
  createSession: (role: string) =>
    apiClient("/onboarding/sessions", SessionWithResult, { method: "POST", body: { role } }),
  session: (id: string) => apiClient(`/onboarding/sessions/${id}`, SessionWithResult),
  saveAnswers: (id: string, answers: QuizAnswer[]) =>
    apiClient(`/onboarding/sessions/${id}/answers`, SessionWithResult, {
      method: "PATCH",
      body: { answers },
    }),
  complete: (id: string) =>
    apiClient(`/onboarding/sessions/${id}/complete`, OnboardingCompletion, { method: "POST" }),
  claim: (id: string) => apiClient(`/onboarding/sessions/${id}/claim`, SessionWithResult, { method: "POST" }),
  /** null = signed in but no plan yet; throws ApiError(401) when not signed in. */
  myPlan: async () => {
    try {
      return await apiClient("/me/plan", LearningPlan);
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) return null;
      throw error;
    }
  },
};

/** The describe endpoint streams text; useObject posts to it directly through the proxy. */
export const describeUrl = (sessionId: string) => `/api/backend/onboarding/sessions/${sessionId}/describe`;

export const onboardingKeys = {
  roles: ["onboarding", "roles"] as const,
  session: (id: string) => ["onboarding", "session", id] as const,
  myPlan: ["me", "plan"] as const,
};
