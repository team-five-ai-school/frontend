"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { newTaskSchema } from "../task-cache";
import { useAddTask } from "../use-task-mutations";

export function AddTaskForm() {
  const [error, setError] = useState<string>();
  const addTask = useAddTask();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = newTaskSchema.safeParse({ title: new FormData(form).get("title") });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message);
      return;
    }

    setError(undefined);
    addTask.mutate(parsed.data);
    form.reset(); // optimistic: the task is already in the list
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field data-invalid={error ? true : undefined}>
        <FieldLabel htmlFor="task-title">Нова задача</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="task-title"
            name="title"
            placeholder="Напр.: зверстати онбординг"
            autoComplete="off"
            maxLength={120}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "task-title-error" : undefined}
            onChange={() => error && setError(undefined)}
          />
          <Button type="submit">
            <PlusIcon data-icon="inline-start" />
            Додати
          </Button>
        </div>
        {error ? <FieldError id="task-title-error">{error}</FieldError> : null}
      </Field>
    </form>
  );
}
