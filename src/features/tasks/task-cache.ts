import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { apiClient } from "@/lib/api-client";

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
  // Accept "…Z", "…+00:00" and offset-less timestamps, whatever the backend serializes.
  createdAt: z.iso.datetime({ offset: true, local: true }),
});

export type Task = z.infer<typeof taskSchema>;

export const newTaskSchema = z.object({
  title: z.string().trim().min(1, "Enter a task title").max(120, "Use 120 characters or fewer"),
});

/** List filter, read from the `?status=` search param. Invalid values fall back to "all". */
export const taskFilterSchema = z.enum(["all", "open", "done"]).catch("all");
export type TaskFilter = z.infer<typeof taskFilterSchema>;

/** Newest first. Applied on the server and the client so the order never jumps after a refetch. */
export const sortTasks = (tasks: Task[]) =>
  [...tasks].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));

export const taskCache = {
  key: ["tasks"] as const,
  tag: "tasks",
  itemTag: (id: string) => `task:${id}`,
  options: () =>
    queryOptions({
      queryKey: taskCache.key,
      // Browser refetches go through the /api/backend proxy (see src/proxy.ts).
      queryFn: async () => sortTasks(await apiClient("/tasks", z.array(taskSchema))),
      staleTime: 30_000,
    }),
};
