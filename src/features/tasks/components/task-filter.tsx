import Link from "next/link";

import { cn } from "@/lib/utils";

import type { TaskFilter as Filter } from "../task-cache";

const filters: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "done", label: "Done" },
];

/** Filter state lives in the URL (`?status=`), so it survives reloads and can be shared. */
export function TaskFilter({ current }: { current: Filter }) {
  return (
    <nav aria-label="Filter tasks" className="flex gap-1 rounded-lg bg-muted p-1 text-sm">
      {filters.map((filter) => (
        <Link
          key={filter.value}
          href={filter.value === "all" ? "/examples/tasks" : `/examples/tasks?status=${filter.value}`}
          aria-current={filter.value === current ? "page" : undefined}
          scroll={false}
          className={cn(
            "rounded-md px-3 py-1 text-muted-foreground transition-colors hover:text-foreground",
            filter.value === current && "bg-background text-foreground shadow-sm",
          )}
        >
          {filter.label}
        </Link>
      ))}
    </nav>
  );
}
