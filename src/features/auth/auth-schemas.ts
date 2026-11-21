import { z } from "zod";

import { isoDateTime, skillLevelSchema } from "@/lib/schemas";

/** Mirrors the backend `PublicUser` (GET /auth/me, POST /auth/login, POST /auth/register). */
export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.enum(["learner", "admin"]),
  level: skillLevelSchema.nullable(),
  onboardingCompletedAt: isoDateTime.nullable(),
  createdAt: isoDateTime,
});
export type User = z.infer<typeof userSchema>;

export const authResponseSchema = z.object({ token: z.string(), user: userSchema });

// Form schemas: validated in the browser for instant feedback and again in the Server Action.

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(100, "Use 100 characters or fewer"),
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Use at least 8 characters").max(128, "Use 128 characters or fewer"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

/**
 * Where to send a user after login / sign-up.
 * TODO: point to the real page once it exists (e.g. onboarding until `user.onboardingCompletedAt` is set).
 */
export const AFTER_AUTH_PATH = "/";
