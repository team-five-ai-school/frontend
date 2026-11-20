import { connection } from "next/server";

import { getTasks } from "@/features/tasks/data";

/**
 * Client-side refetches from TanStack Query hit this handler.
 *
 * `await connection()` makes it run per request. Without it, Cache Components prerenders the
 * handler as a static response that is served stale right after a mutation, so a refetch would
 * undo the user's change. getTasks() itself is still cached by tag, so this stays cheap.
 */
export async function GET() {
  await connection();
  return Response.json(await getTasks());
}
