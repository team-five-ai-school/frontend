import "server-only";

import type { z } from "zod";

import { env } from "@/lib/env";

/**
 * Typed fetch for the backend API. Server-only: use it from cached data functions
 * (`"use cache"`), Server Components, Server Actions and Route Handlers. Never from the client.
 *
 *   const user = await api("/users/me", userSchema, { token });
 *   const created = await api("/tasks", taskSchema, { method: "POST", body: { title } });
 *
 * - Responses are validated with Zod, so a backend change fails loudly here, not deep in the UI.
 * - Auth: pass a user token explicitly (read it from an httpOnly cookie in the caller).
 *   Do not read cookies() in this file: cached functions cannot access request data.
 */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

type ApiOptions = Omit<RequestInit, "body"> & { body?: unknown; token?: string };

export async function api<T>(path: string, schema: z.ZodType<T>, options: ApiOptions = {}): Promise<T> {
  if (!env.API_URL) throw new Error("API_URL is not set. Add it to .env.local and Vercel env.");

  const { body, token, headers, ...init } = options;
  const res = await fetch(new URL(path, env.API_URL), {
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
