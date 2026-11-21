import "server-only";

import { z } from "zod";

/**
 * Server-only environment variables, validated once at startup.
 * Add every new variable here (and to .env.example) instead of reading process.env directly.
 * Values are optional so the template builds before a backend exists; make them required
 * (drop `.optional()`) as soon as the app depends on them.
 */
const schema = z.object({
  /** Base URL of the backend API, e.g. https://api.example.com */
  API_URL: z.url().optional(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(`Invalid environment variables:\n${z.prettifyError(parsed.error)}`);
}

export const env = parsed.data;
