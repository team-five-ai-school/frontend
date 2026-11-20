"use server";

import { updateTag } from "next/cache";
import { z } from "zod";

import { fail, ok, type ActionResult } from "@/lib/action-result";

import { insertTask, updateTaskDone } from "./data";
import { newTaskSchema, taskCache, type Task } from "./task-cache";

// Server Actions are public endpoints: always validate input on the server.
// Return expected failures with `fail(...)`; only unexpected errors should throw.

export async function addTaskAction(input: unknown): Promise<ActionResult<Task>> {
  const parsed = newTaskSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Invalid task");

  const task = await insertTask(parsed.data.title);
  updateTag(taskCache.tag); // the next cached read returns fresh data
  return ok(task);
}

const toggleSchema = z.object({ id: z.string(), done: z.boolean() });

export async function toggleTaskAction(input: unknown): Promise<ActionResult<Task>> {
  const parsed = toggleSchema.safeParse(input);
  if (!parsed.success) return fail("Invalid request");

  const task = await updateTaskDone(parsed.data.id, parsed.data.done);
  if (!task) return fail("This task no longer exists");

  updateTag(taskCache.tag);
  return ok(task);
}
