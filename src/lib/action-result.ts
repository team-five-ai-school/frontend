/**
 * Result type for Server Actions.
 *
 * In production, Next.js replaces the message of any error thrown from a Server Action with a
 * generic string. Expected failures (validation, "not found", permission) must therefore be
 * *returned*, not thrown, so the client can show a meaningful message.
 */
export type ActionResult<T> = { ok: true; data: T } | { ok: false; error: string };

export const ok = <T>(data: T): ActionResult<T> => ({ ok: true, data });
export const fail = (error: string): ActionResult<never> => ({ ok: false, error });

/** An expected failure returned by a Server Action. Its message is safe to show to users. */
export class ActionError extends Error {}

/** Client-side: turn a failed result into a thrown ActionError so TanStack Query's onError receives it. */
export function unwrap<T>(result: ActionResult<T>): T {
  if (!result.ok) throw new ActionError(result.error);
  return result.data;
}

/** User-facing message for any error: our own message for ActionError, a generic one otherwise. */
export function errorMessage(error: unknown, fallback = "Please try again.") {
  return error instanceof ActionError ? error.message : fallback;
}
