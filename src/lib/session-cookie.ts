/**
 * Name of the httpOnly cookie that holds the backend auth token (JWT).
 * Kept in its own dependency-free file so both src/proxy.ts and src/lib/session.ts can import it.
 */
export const SESSION_COOKIE = "session";
