"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { errorMessage, unwrap } from "@/lib/action-result";

import { addTaskAction, toggleTaskAction } from "./actions";
import { taskCache, type Task } from "./task-cache";

export const OPTIMISTIC_PREFIX = "optimistic-";

const replaceTask = (tasks: Task[] = [], id: string, next: Task) =>
  tasks.map((task) => (task.id === id ? next : task));

/**
 * Optimistic update pattern:
 * 1. onMutate  → cancel in-flight fetches, snapshot, write the expected result
 * 2. onSuccess → replace the optimistic value with the server's response
 * 3. onError   → roll back to the snapshot and tell the user
 * 4. onSettled → refetch in the background to pick up changes from other users
 */
export function useAddTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { title: string }) => unwrap(await addTaskAction(input)),
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
      return { previous, optimisticId: optimistic.id };
    },
    onSuccess: (task, _input, context) => {
      queryClient.setQueryData<Task[]>(taskCache.key, (old) => replaceTask(old, context.optimisticId, task));
    },
    onError: (error, _input, context) => {
      queryClient.setQueryData(taskCache.key, context?.previous);
      toast.error("Couldn't add the task", { description: errorMessage(error) });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskCache.key }),
  });
}

export function useToggleTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: { id: string; done: boolean }) => unwrap(await toggleTaskAction(input)),
    onMutate: async ({ id, done }) => {
      await queryClient.cancelQueries({ queryKey: taskCache.key });
      const previous = queryClient.getQueryData<Task[]>(taskCache.key);
      queryClient.setQueryData<Task[]>(taskCache.key, (old = []) =>
        old.map((task) => (task.id === id ? { ...task, done } : task)),
      );
      return { previous };
    },
    onSuccess: (task) => {
      queryClient.setQueryData<Task[]>(taskCache.key, (old) => replaceTask(old, task.id, task));
    },
    onError: (error, _input, context) => {
      queryClient.setQueryData(taskCache.key, context?.previous);
      toast.error("Couldn't update the task", { description: errorMessage(error) });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: taskCache.key }),
  });
}
