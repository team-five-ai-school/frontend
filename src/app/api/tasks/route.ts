import { getTasks } from "@/features/tasks/data";

// Client-side refetches from TanStack Query hit this handler.
// getTasks() is cached by tag, so this stays cheap until a mutation calls updateTag.
export async function GET() {
  return Response.json(await getTasks());
}
