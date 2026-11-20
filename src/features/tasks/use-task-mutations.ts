"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addTaskAction, toggleTaskAction } from "./actions";
import { taskCache, type Task } from "./task-cache";

export const OPTIMISTIC_PREFIX = "optimistic-";

/**
 * Optimistic update pattern:
 * 1. onMutate  → cancel in-flight fetches, snapshot, write the expected result
 * 2. onError   → roll back to the snapshot and tell the user
 * 3. onSettled → refetch so the client matches the server
 */
export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { title: string }) => addTaskAction(input),
    onMutate: async ({ title }) => {
      await queryClient.cancelQueries({ queryKey: taskCache.key });
      const previous = queryClient.getQueryData<Task[]>(taskCache.key);
      const optimistic: Task = {
        id: `${OPTIMISTIC_PREFIX}${crypto.randomUUID()}`,
        title,
        done: false,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData<Task[]>(taskCache.key, (old = []) => [optimistic, ...old]);
      return { previous };
    },
    onError: (error, _input, context) => {
      queryClient.setQueryData(taskCache.key, context?.previous);
      toast.error("Не вдалося додати задачу", { description: error.message });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskCache.key }),
  });
}

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { id: string; done: boolean }) => toggleTaskAction(input),
    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: taskCache.key });
      const previous = queryClient.getQueryData<Task[]>(taskCache.key);
      queryClient.setQueryData<Task[]>(taskCache.key, (old = []) =>
        old.map((task) => (task.id === id ? { ...task, done } : task)),
      );
      return { previous };
    },
    onError: (error, _input, context) => {
      queryClient.setQueryData(taskCache.key, context?.previous);
      toast.error("Не вдалося оновити задачу", { description: error.message });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskCache.key }),
  });
}
