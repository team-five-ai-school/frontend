"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronRightIcon, ListTodoIcon } from "lucide-react";
import Link from "next/link";

import { Checkbox } from "@/components/ui/checkbox";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

import { taskCache, type TaskFilter } from "../task-cache";
import { OPTIMISTIC_PREFIX, useToggleTask } from "../use-task-mutations";

const emptyCopy: Record<TaskFilter, { title: string; description: string }> = {
  all: { title: "No tasks yet", description: "Add your first task with the form above." },
  open: { title: "Nothing left to do", description: "Every task is done." },
  done: { title: "Nothing done yet", description: "Tick a task to mark it as done." },
};

export function TaskList({ filter }: { filter: TaskFilter }) {
  // Data is already in the cache from <HydrationBoundary>, so this does not suspend on first render.
  const { data: tasks, isFetching } = useSuspenseQuery(taskCache.options());
  const toggleTask = useToggleTask();

  const visible = tasks.filter((task) =>
    filter === "all" ? true : filter === "done" ? task.done : !task.done,
  );
  const doneCount = tasks.filter((task) => task.done).length;

  return (
    <section aria-labelledby="tasks-heading" className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <h2 id="tasks-heading" className="text-base font-medium">
          Tasks
        </h2>
        <p className="flex items-center gap-2 text-sm text-muted-foreground tabular-nums" aria-live="polite">
          {isFetching ? <Spinner className="size-3.5" aria-label="Refreshing" /> : null}
          {doneCount} of {tasks.length} done
        </p>
      </div>

      {visible.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListTodoIcon />
            </EmptyMedia>
            <EmptyTitle>{emptyCopy[filter].title}</EmptyTitle>
            <EmptyDescription>{emptyCopy[filter].description}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="divide-y rounded-lg border">
          {visible.map((task) => {
            const pending = task.id.startsWith(OPTIMISTIC_PREFIX);
            return (
              <li
                key={task.id}
                className={cn("flex items-center gap-3 py-1 pr-1 pl-4", pending && "opacity-60")}
              >
                <Checkbox
                  id={`task-${task.id}`}
                  checked={task.done}
                  disabled={pending}
                  onCheckedChange={(checked) => toggleTask.mutate({ id: task.id, done: checked === true })}
                />
                <Label
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "min-w-0 flex-1 py-2 leading-snug font-normal break-words",
                    task.done && "text-muted-foreground line-through",
                  )}
                >
                  {task.title}
                </Label>
                {pending ? null : (
                  <Link
                    href={`/examples/tasks/${task.id}`}
                    aria-label={`Open “${task.title}”`}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ChevronRightIcon className="size-4" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

/** Same shape as the real list, so nothing jumps when data arrives. */
export function TaskListSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-busy="true" aria-label="Loading tasks">
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
