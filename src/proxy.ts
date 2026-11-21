import { NextResponse, type NextRequest } from "next/server";

import { API_PROXY_PREFIX } from "@/lib/api-client";
import { SESSION_COOKIE } from "@/lib/session-cookie";

/**
 * 1. Home: a logged-in user's home is their plan, so `/` with a session cookie redirects to `/plan`
 *    before anything renders. Guests get the landing page. (An expired cookie lands on /plan, which
 *    handles signed-out users.)
 *
 * 2. Browser → backend proxy: `/api/backend/<path>` → `${API_URL}/<path>`.
 *
 * - Adds `Authorization: Bearer <token>` from the httpOnly session cookie. The token never reaches
 *   client code.
 * - Does NOT forward the user's cookies to the backend.
 * - Only ever forwards to the API_URL origin, so it cannot be abused to reach other hosts.
 * - Without API_URL it does nothing, and requests fall through to the local demo handlers in
 *   src/app/api/backend/ (so the template works before a backend exists).
 *
 * Reads process.env directly: keep this file small and free of heavy imports.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    if (!request.cookies.has(SESSION_COOKIE)) return NextResponse.next();
    return NextResponse.redirect(new URL("/plan", request.url));
  }

  const apiUrl = process.env.API_URL;
  if (!apiUrl) return NextResponse.next();

  const base = new URL(apiUrl);
  const path = request.nextUrl.pathname.slice(API_PROXY_PREFIX.length) || "/";
  const target = new URL(`${base.href.replace(/\/$/, "")}${path}${request.nextUrl.search}`);
  if (target.origin !== base.origin) return new NextResponse(null, { status: 400 });

  const headers = new Headers(request.headers);
  headers.delete("cookie");
  headers.delete("authorization");
  headers.delete("host");
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token) headers.set("authorization", `Bearer ${token}`);

  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  matcher: ["/", "/api/backend/:path*"],
};
