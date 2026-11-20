import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

/**
 * Cache contract shared by server and client.
 * - `key`  → TanStack Query key (browser cache)
 * - `tag`  → Next.js cache tags (server cache, invalidated with updateTag)
 * Keep this file free of `server-only` / `"use client"` imports so both sides can use it.
 */
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  done: z.boolean(),
  createdAt: z.iso.datetime(),
});

export type Task = z.infer<typeof taskSchema>;

export const newTaskSchema = z.object({
  title: z.string().trim().min(1, "Enter a task title").max(120, "Use 120 characters or fewer"),
});

/** List filter, read from the `?status=` search param. Invalid values fall back to "all". */
export const taskFilterSchema = z.enum(["all", "open", "done"]).catch("all");
export type TaskFilter = z.infer<typeof taskFilterSchema>;

async function fetchTasks(): Promise<Task[]> {
  const res = await fetch("/api/tasks");
  if (!res.ok) throw new Error(`Failed to load tasks (${res.status})`);
  return z.array(taskSchema).parse(await res.json());
}

export const taskCache = {
  key: ["tasks"] as const,
  tag: "tasks",
  itemTag: (id: string) => `task:${id}`,
  options: () =>
    queryOptions({
      queryKey: taskCache.key,
      queryFn: fetchTasks,
      staleTime: 30_000,
    }),
};
