import type { z } from "zod";

import { ApiError } from "@/lib/api-error";

/**
 * Typed fetch for the backend, used in the BROWSER (TanStack Query `queryFn`, client-only mutations).
 *
 *   const tasks = await apiClient("/tasks", z.array(taskSchema));
 *
 * Requests go to our own domain, `/api/backend/<path>`, and src/proxy.ts forwards them to API_URL:
 * - no CORS, no backend URL in client code;
 * - the auth cookie is turned into `Authorization: Bearer <token>` by the proxy, so client code never
 *   touches the token;
 * - the forward happens in the routing layer, without running a server function.
 */
export const API_PROXY_PREFIX = "/api/backend";

type ApiClientOptions = Omit<RequestInit, "body"> & { body?: unknown };

export async function apiClient<T>(
  path: string,
  schema: z.ZodType<T>,
  options: ApiClientOptions = {},
): Promise<T> {
  const { body, headers, ...init } = options;
  const res = await fetch(`${API_PROXY_PREFIX}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(body !== undefined && { "Content-Type": "application/json" }),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (!res.ok) throw new ApiError(res.status, `${init.method ?? "GET"} ${path} failed with ${res.status}`);
  if (res.status === 204) return schema.parse(undefined);
  return schema.parse(await res.json());
}
