"use client";

import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { AnswerResult, LessonCompletion, Progress } from "@/lib/contracts";

/** The learner's progress, or null when not logged in. One query key for every screen. */
export const progressQuery = queryOptions({
  queryKey: ["progress"] as const,
  queryFn: async () => {
    try {
      return await apiClient("/me/progress", Progress);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) return null;
      throw error;
    }
  },
  staleTime: 30_000,
});

export type AnswerInput = { optionIds?: string[]; cardAnswers?: boolean[] };

/** Checks an answer on the server (attempt flow and mistakes live there). */
export function useCheckAnswer(lessonId: string) {
  return useMutation({
    mutationFn: ({ exerciseId, answer }: { exerciseId: string; answer: AnswerInput }) =>
      apiClient(
        `/lessons/${encodeURIComponent(lessonId)}/exercises/${encodeURIComponent(exerciseId)}/answer`,
        AnswerResult,
        {
          method: "POST",
          body: answer,
        },
      ),
  });
}

/** Marks the lesson complete (score computed on the server) and refreshes progress. */
export function useCompleteLesson(lessonId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiClient(`/lessons/${encodeURIComponent(lessonId)}/complete`, LessonCompletion, {
        method: "POST",
        body: {},
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: progressQuery.queryKey }),
  });
}
