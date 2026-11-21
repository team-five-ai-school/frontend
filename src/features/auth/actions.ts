"use server";

import { redirect } from "next/navigation";

import { fail, ok, type ActionResult } from "@/lib/action-result";
import { api, ApiError } from "@/lib/api";
import { env } from "@/lib/env";
import { clearSession, setSessionToken } from "@/lib/session";

import { authResponseSchema, loginSchema, registerSchema, type User } from "./auth-schemas";

// Server Actions are public endpoints: validate on the server, return expected failures.

export async function loginAction(input: unknown): Promise<ActionResult<User>> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the form");
  if (!env.API_URL) return fail("The backend is not configured (API_URL).");

  try {
    const { token, user } = await api("/auth/login", authResponseSchema, {
      method: "POST",
      body: parsed.data,
    });
    await setSessionToken(token);
    return ok(user);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) return fail("Wrong email or password");
    throw error;
  }
}

export async function registerAction(input: unknown): Promise<ActionResult<User>> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? "Check the form");
  if (!env.API_URL) return fail("The backend is not configured (API_URL).");

  try {
    const { token, user } = await api("/auth/register", authResponseSchema, {
      method: "POST",
      body: parsed.data,
    });
    await setSessionToken(token);
    return ok(user);
  } catch (error) {
    if (error instanceof ApiError && error.status === 409)
      return fail("An account with this email already exists");
    throw error;
  }
}

/** Use as `<form action={logoutAction}>`. */
export async function logoutAction() {
  await clearSession();
  redirect("/login");
}
