import { NextResponse, type NextRequest } from "next/server";

import { API_PROXY_PREFIX } from "@/lib/api-client";
import { SESSION_COOKIE } from "@/lib/session-cookie";

/**
 * Browser → backend proxy: `/api/backend/<path>` → `${API_URL}/<path>`.
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
  matcher: "/api/backend/:path*",
};
