import "server-only";

import { cookies } from "next/headers";

import { SESSION_COOKIE } from "@/lib/session-cookie";

/**
 * Auth token storage: an httpOnly cookie on our own domain.
 * - JavaScript in the browser cannot read it (safe from XSS), but the browser sends it with every
 *   request to our domain, so `/api/backend/*` calls get `Authorization: Bearer <token>` added by
 *   src/proxy.ts automatically.
 * - Server code reads it with getSessionToken() and passes it to `api(..., { token })`.
 *
 * Typical login Server Action:
 *   const { token } = await api("/auth/login", loginResponseSchema, { method: "POST", body: credentials });
 *   await setSessionToken(token);
 */
export async function setSessionToken(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: maxAgeSeconds,
  });
}

export async function clearSession() {
  (await cookies()).delete(SESSION_COOKIE);
}

/** Request-time data: call it inside a component wrapped in <Suspense>, a Server Action or a Route Handler. */
export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}
