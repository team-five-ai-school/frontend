import { HydrationBoundary } from "@tanstack/react-query";
import { InfoIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AddTaskForm } from "@/features/tasks/components/add-task-form";
import { TaskFilter } from "@/features/tasks/components/task-filter";
import { TaskList, TaskListSkeleton } from "@/features/tasks/components/task-list";
import { getTasks } from "@/features/tasks/data";
import { taskCache, taskFilterSchema } from "@/features/tasks/task-cache";
import { dehydrate } from "@/lib/query/hydrate";

export const metadata: Metadata = {
  title: "Example: tasks",
  description: "Reference: server cache + TanStack Query + optimistic updates.",
};

/**
 * Reference pattern (copy it, then delete this route):
 * 1. Server reads cached data (`"use cache"` + cacheTag).
 * 2. Data is handed to TanStack Query via <HydrationBoundary>: no loading spinner on first paint.
 * 3. Client mutates through Server Actions with optimistic updates; actions call updateTag.
 * 4. Filter state lives in `searchParams`, read inside <Suspense> (it is request-time data).
 */
export default function TasksExamplePage({ searchParams }: PageProps<"/examples/tasks">) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Tasks</h1>
        <p className="max-w-prose text-muted-foreground">
          Reference example: data is cached on the server, hydrated into TanStack Query, and changes show up
          instantly thanks to optimistic updates.
        </p>
      </header>

      <Alert>
        <InfoIcon />
        <AlertTitle>Demo data lives in server memory</AlertTitle>
        <AlertDescription>
          It resets on every deploy and is not shared between serverless instances, so on Vercel tasks may
          appear or disappear. Swap <code className="font-mono text-xs">src/features/tasks/data.ts</code> for
          your API.
        </AlertDescription>
      </Alert>

      <AddTaskForm />

      <Suspense fallback={<TaskListSkeleton />}>
        <TasksData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function TasksData({ searchParams }: Pick<PageProps<"/examples/tasks">, "searchParams">) {
  const filter = taskFilterSchema.parse((await searchParams).status);
  const tasks = await getTasks();
  const state = await dehydrate([{ queryKey: taskCache.key, data: tasks }], {
    tags: [taskCache.tag],
  });

  return (
    <HydrationBoundary state={state}>
      <div className="flex flex-col gap-4">
        <TaskFilter current={filter} />
        <TaskList filter={filter} />
      </div>
    </HydrationBoundary>
  );
}
