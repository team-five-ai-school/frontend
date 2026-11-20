"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ListTodoIcon } from "lucide-react";
import { cn } from "cn";

import { Checkbox } from "@/components/ui/checkbox";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

import { taskCache } from "../task-cache";
import { OPTIMISTIC_PREFIX, useToggleTask } from "../use-task-mutations";

export function TaskList() {
  // Data is already in the cache from <HydrationBoundary>, so this does not suspend on first render.
  const { data: tasks, isFetching } = useSuspenseQuery(taskCache.options());
  const toggleTask = useToggleTask();

  if (tasks.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ListTodoIcon />
          </EmptyMedia>
          <EmptyTitle>Задач поки немає</EmptyTitle>
          <EmptyDescription>Додайте першу задачу через форму вище.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <section aria-labelledby="tasks-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <h2 id="tasks-heading" className="text-base font-medium">
          Задачі
        </h2>
        <p className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums" aria-live="polite">
          {isFetching ? <Spinner className="size-3.5" aria-label="Оновлення" /> : null}
          Виконано {doneCount} / {tasks.length}
        </p>
      </div>
      <ul className="divide-y rounded-lg border">
        {tasks.map((task) => {
          const pending = task.id.startsWith(OPTIMISTIC_PREFIX);
          return (
            <li key={task.id} className={cn("flex items-center gap-3 px-4 py-3", pending && "opacity-60")}>
              <Checkbox
                id={`task-${task.id}`}
                checked={task.done}
                disabled={pending}
                onCheckedChange={(checked) => toggleTask.mutate({ id: task.id, done: checked === true })}
              />
              <Label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "min-w-0 flex-1 leading-snug font-normal break-words",
                  task.done && "text-muted-foreground line-through",
                )}
              >
                {task.title}
              </Label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Same shape as the real list, so nothing jumps when data arrives. */
export function TaskListSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Завантаження задач">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="divide-y rounded-lg border">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="size-4 rounded-[4px]" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}
