"use server";

import { updateTag } from "next/cache";
import { z } from "zod";

import { insertTask, updateTaskDone } from "./data";
import { newTaskSchema, taskCache, type Task } from "./task-cache";

// Server Actions are public endpoints: always validate input on the server.

export async function addTaskAction(input: unknown): Promise<Task> {
  const { title } = newTaskSchema.parse(input);
  const task = await insertTask(title);
  updateTag(taskCache.tag); // next cached read returns fresh data
  return task;
}

const toggleSchema = z.object({ id: z.string(), done: z.boolean() });

export async function toggleTaskAction(input: unknown): Promise<Task> {
  const { id, done } = toggleSchema.parse(input);
  const task = await updateTaskDone(id, done);
  updateTag(taskCache.tag);
  return task;
}
