import "server-only";

import type { z } from "zod";

import { ApiError } from "@/lib/api-error";
import { env } from "@/lib/env";

export { ApiError };

/**
 * Typed fetch for the backend, used on the SERVER: cached data functions (`"use cache"`),
 * Server Components, Server Actions and Route Handlers. In the browser use `apiClient` instead.
 *
 *   const tasks = await api("/tasks", z.array(taskSchema));
 *   const me = await api("/users/me", userSchema, { token: await getSessionToken() });
 *   const task = await api("/tasks", taskSchema, { method: "POST", body: { title } });
 *
 * - Responses are validated with Zod, so a backend change fails loudly here, not deep in the UI.
 * - Auth: pass the user's token explicitly (getSessionToken() from @/lib/session).
 *   Never read cookies inside a `"use cache"` function: cached functions cannot access request data.
 */
type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown; token?: string };

export async function api<T>(path: string, schema: z.ZodType<T>, options: ApiOptions = {}): Promise<T> {
  if (!env.API_URL) throw new Error("API_URL is not set. Add it to .env.local and the Vercel project env.");

  const { body, token, headers, ...init } = options;
  const res = await fetch(`${env.API_URL.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(env.API_KEY && { "X-Api-Key": env.API_KEY }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) throw new ApiError(res.status, `${init.method ?? "GET"} ${path} failed with ${res.status}`);
  if (res.status === 204) return schema.parse(undefined);
  return schema.parse(await res.json());
}
