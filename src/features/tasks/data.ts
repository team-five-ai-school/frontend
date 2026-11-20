import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { taskCache, type Task } from "./task-cache";

/**
 * DEMO STORE: in-memory, resets on restart and is not shared between serverless instances.
 * Replace these functions with real API / DB calls; keep the `"use cache"` + tag pattern.
 */
const store = globalThis as unknown as { __tasks?: Task[] };
store.__tasks ??= [
  { id: "1", title: "Прочитати умову завдання", done: true, createdAt: "2026-01-01T09:00:00.000Z" },
  {
    id: "2",
    title: "Запустити /impeccable init з описом продукту",
    done: false,
    createdAt: "2026-01-01T09:05:00.000Z",
  },
  {
    id: "3",
    title: "Зібрати перший екран із shadcn-компонентів",
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

export async function updateTaskDone(id: string, done: boolean): Promise<Task> {
  const task = tasks().find((t) => t.id === id);
  if (!task) throw new Error("Задачу не знайдено");
  task.done = done;
  return { ...task };
}
