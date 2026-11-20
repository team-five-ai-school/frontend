import { HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";

import { AddTaskForm } from "@/features/tasks/components/add-task-form";
import { TaskList, TaskListSkeleton } from "@/features/tasks/components/task-list";
import { getTasks } from "@/features/tasks/data";
import { taskCache } from "@/features/tasks/task-cache";
import { dehydrate } from "@/lib/query/hydrate";

export const metadata: Metadata = {
  title: "Приклад: задачі",
  description: "Референс: серверний кеш + TanStack Query + оптимістичні оновлення.",
};

/**
 * Reference pattern (copy it, then delete this route):
 * 1. Server reads cached data (`"use cache"` + cacheTag) → part of the static shell.
 * 2. Data is handed to TanStack Query via <HydrationBoundary> → no loading spinner on first paint.
 * 3. Client mutates through Server Actions with optimistic updates; actions call updateTag.
 */
export default function TasksExamplePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Задачі</h1>
        <p className="max-w-prose text-muted-foreground">
          Референсний приклад: дані кешуються на сервері, гідратуються в TanStack Query, а зміни з’являються
          одразу завдяки оптимістичним оновленням.
        </p>
      </header>

      <AddTaskForm />

      <Suspense fallback={<TaskListSkeleton />}>
        <TasksData />
      </Suspense>
    </div>
  );
}

async function TasksData() {
  const tasks = await getTasks();
  const state = await dehydrate([{ queryKey: taskCache.key, data: tasks }], {
    tags: [taskCache.tag],
  });

  return (
    <HydrationBoundary state={state}>
      <TaskList />
    </HydrationBoundary>
  );
}
