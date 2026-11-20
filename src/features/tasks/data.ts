import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { taskCache, type Task } from "./task-cache";

/**
 * DEMO STORE: in-memory. It resets on every deploy/restart and is NOT shared between
 * serverless instances, so on Vercel tasks can appear and disappear between requests.
 * Replace these functions with real API calls (see src/lib/api.ts); keep the
 * `"use cache"` + `cacheTag` pattern and the function signatures.
 */
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

/** Cached until a mutation calls `updateTag(taskCache.tag)`. */
export async function getTasks(): Promise<Task[]> {
  "use cache";
  cacheLife("max");
  cacheTag(taskCache.tag);
  return [...tasks()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Tagged with both the list tag and the item tag, so either invalidates it. */
export async function getTask(id: string): Promise<Task | null> {
  "use cache";
  cacheLife("max");
  cacheTag(taskCache.tag, taskCache.itemTag(id));
  return tasks().find((task) => task.id === id) ?? null;
}

export async function insertTask(title: string): Promise<Task> {
  const task: Task = {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: new Date().toISOString(),
  };
  tasks().push(task);
  return task;
}

export async function updateTaskDone(id: string, done: boolean): Promise<Task | null> {
  const task = tasks().find((t) => t.id === id);
  if (!task) return null;
  task.done = done;
  return { ...task };
}
