import { ArrowLeftIcon, CheckCircle2Icon, CircleIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { getTask } from "@/features/tasks/data";

/**
 * Reference pattern for a dynamic route under Cache Components:
 * - `params` is request-time data → read it inside <Suspense>, never at the top of the page.
 * - Data comes from a cached, tagged function (getTask), so repeat visits are cheap and
 *   mutations that call updateTag(...) refresh it.
 * - Missing data → notFound() renders the nearest not-found.tsx.
 * - generateMetadata may read params because the page body defers to request time as well.
 */
export async function generateMetadata({ params }: PageProps<"/examples/tasks/[id]">): Promise<Metadata> {
  const task = await getTask((await params).id);
  return { title: task ? task.title : "Task not found" };
}

// Deterministic on the server, so it never causes a hydration mismatch.
const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "UTC",
});

export default function TaskPage({ params }: PageProps<"/examples/tasks/[id]">) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/examples/tasks"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        All tasks
      </Link>
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskDetail params={params} />
      </Suspense>
    </div>
  );
}

async function TaskDetail({ params }: Pick<PageProps<"/examples/tasks/[id]">, "params">) {
  const task = await getTask((await params).id);
  if (!task) notFound();

  return (
    <article className="flex flex-col gap-4">
      <Badge variant={task.done ? "secondary" : "outline"} className="w-fit">
        {task.done ? <CheckCircle2Icon /> : <CircleIcon />}
        {task.done ? "Done" : "Open"}
      </Badge>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{task.title}</h1>
      <p className="text-sm text-muted-foreground">
        Created <time dateTime={task.createdAt}>{dateFormat.format(new Date(task.createdAt))} UTC</time>
      </p>
    </article>
  );
}

function TaskDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-busy="true" aria-label="Loading task">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-40" />
    </div>
  );
}
