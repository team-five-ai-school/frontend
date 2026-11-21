import { connection } from "next/server";

import { demo } from "@/features/tasks/data";
import { sortTasks } from "@/features/tasks/task-cache";

/**
 * DEMO stand-in for the backend's `GET /tasks`, used only when API_URL is not set.
 * When API_URL is set, src/proxy.ts forwards `/api/backend/*` to the real backend before this
 * handler runs. Delete this file together with the tasks example.
 *
 * `await connection()` keeps it per-request: a prerendered response would be stale right after a
 * mutation and the client refetch would undo the user's change.
 */
export async function GET() {
  await connection();
  return Response.json(sortTasks(demo.list()));
}
