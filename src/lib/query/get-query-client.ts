import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR/hydration, a non-zero staleTime avoids an immediate refetch on the client.
        staleTime: 60 * 1000,
        // Fail fast in the UI; one retry covers flaky networks.
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/**
 * New client per server render (no data leaks between requests),
 * one shared client in the browser (cache survives navigations).
 */
export function getQueryClient() {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
