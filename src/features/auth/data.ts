import "server-only";

import { api, ApiError } from "@/lib/api";
import { getSessionToken } from "@/lib/session";

import { userSchema, type User } from "./auth-schemas";

/**
 * The logged-in user, or null. Reads the session cookie, so it is request-time data:
 * call it inside <Suspense>, a Server Action or a Route Handler. Not cached on the server
 * (per-user data; see AGENTS.md → Backend, env and auth).
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = await getSessionToken();
  if (!token) return null;
  try {
    return await api("/auth/me", userSchema, { token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return null;
    throw error;
  }
}
