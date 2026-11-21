import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";

import { api, ApiError } from "@/lib/api";
import { env } from "@/lib/env";

import { sortTasks, taskCache, taskSchema, type Task } from "./task-cache";

/**
 * Server-side data access for tasks.
 *
 * With API_URL set, everything goes to the real backend (`/tasks` endpoints).
 * Without it, a DEMO in-memory store is used so the template runs with no backend. The demo store
 * resets on every deploy and is not shared between serverless instances.
 *
 * Copy this shape for new features: cached, tagged reads + plain write functions.
 */
const useBackend = Boolean(env.API_URL);

/** Cached until a mutation calls `updateTag(taskCache.tag)`; backend data also refreshes every few minutes. */
export async function getTasks(): Promise<Task[]> {
  "use cache";
  if (useBackend) cacheLife("minutes");
  else cacheLife("max");
  cacheTag(taskCache.tag);
  return sortTasks(useBackend ? await api("/tasks", z.array(taskSchema)) : demo.list());
}

/** Tagged with both the list tag and the item tag, so either invalidates it. */
export async function getTask(id: string): Promise<Task | null> {
  "use cache";
  if (useBackend) cacheLife("minutes");
  else cacheLife("max");
  cacheTag(taskCache.tag, taskCache.itemTag(id));
  if (!useBackend) return demo.get(id);
  return notFoundAsNull(api(`/tasks/${encodeURIComponent(id)}`, taskSchema));
}

export async function insertTask(title: string): Promise<Task> {
  if (!useBackend) return demo.insert(title);
  return api("/tasks", taskSchema, { method: "POST", body: { title } });
}

export async function updateTaskDone(id: string, done: boolean): Promise<Task | null> {
  if (!useBackend) return demo.setDone(id, done);
  return notFoundAsNull(
    api(`/tasks/${encodeURIComponent(id)}`, taskSchema, { method: "PATCH", body: { done } }),
  );
}

async function notFoundAsNull<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/* ---------- Demo store (used only when API_URL is not set) ---------- */

const store = globalThis as unknown as { __tasks?: Task[] };
store.__tasks ??= [
  { id: "1", title: "Read the problem statement", done: true, createdAt: "2026-01-01T09:00:00.000Z" },
  {
    id: "2",
    title: "Run /impeccable init with a product brief",
    done: false,
    createdAt: "2026-01-01T09:05:00.000Z",
  },
  {
    id: "3",
    title: "Build the first screen from shadcn components",
    done: false,
    createdAt: "2026-01-01T09:10:00.000Z",
  },
];
const tasks = () => store.__tasks!;

export const demo = {
  list: () => [...tasks()],
  get: (id: string) => tasks().find((task) => task.id === id) ?? null,
  insert: (title: string): Task => {
    const task: Task = { id: crypto.randomUUID(), title, done: false, createdAt: new Date().toISOString() };
    tasks().push(task);
    return task;
  },
  setDone: (id: string, done: boolean): Task | null => {
    const task = tasks().find((t) => t.id === id);
    if (!task) return null;
    task.done = done;
    return { ...task };
  },
};
