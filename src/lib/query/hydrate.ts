import "server-only";

import {
  defaultShouldDehydrateQuery,
  QueryClient,
  type DehydratedState,
  type QueryKey,
} from "@tanstack/react-query";
import { cacheLife, cacheTag } from "next/cache";

/**
 * Prerender-safe replacement for TanStack's `dehydrate()`.
 *
 * With Cache Components, `dehydrate()` reads `Date.now()` during prerendering and fails.
 * Here the timestamp is cached with the same tags as the data, so when a mutation calls
 * `updateTag(...)`, data and timestamp advance together and <HydrationBoundary> overwrites
 * the client cache on the next navigation.
 *
 * Source: node_modules/next/dist/docs/01-app/02-guides/client-side-data-fetching/tanstack-query.md
 */
type HydratedQuery = { queryKey: QueryKey; data: unknown };

async function getHydrationUpdatedAt(tags: string[]) {
  "use cache";
  cacheTag(...tags);
  cacheLife("max");
  return Date.now();
}

export async function dehydrate(
  queries: HydratedQuery[],
  options: { tags: string[] },
): Promise<DehydratedState> {
  const updatedAt = await getHydrationUpdatedAt(options.tags);
  const queryClient = new QueryClient();

  for (const query of queries) {
    queryClient.setQueryData(query.queryKey, query.data, { updatedAt });
  }

  return {
    mutations: [],
    queries: queryClient
      .getQueryCache()
      .getAll()
      .filter((query) => defaultShouldDehydrateQuery(query))
      .map((query) => ({
        dehydratedAt: updatedAt,
        queryHash: query.queryHash,
        queryKey: query.queryKey,
        state: query.state,
        ...(query.meta ? { meta: query.meta } : {}),
      })),
  };
}
