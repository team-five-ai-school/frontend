"use client";

import { z } from "zod";

import { apiClient } from "@/lib/api-client";
import { ApiError } from "@/lib/api-error";
import { MentorMessage, type LessonDetail, type MentorBlock } from "@/lib/contracts";

import { localMentor } from "./local-mentor";
import type { MentorTransport } from "./mentor-context";

/**
 * Mentor API contract (agreed for the backend AI module):
 *
 *   POST /mentor/mistakes/:mistakeId/review          (no body)
 *     The server loads the stored attempt by id + user, so the answer can't be forged.
 *     Never fails on a model error: falls back to a hint-based message. 404 if the mistake isn't the user's.
 *   POST /mentor/messages  { text (1..2000), context: MentorContext, history: { role, text (≤1000) }[] (≤6) }
 *     503 on model failure (the panel shows Retry), 429 with Retry-After when rate-limited.
 *   Both → 200 MentorMessage (src/lib/contracts). No streaming.
 *
 * Answer guard (server): until the learner has a correct answer or a 2nd attempt on an exercise, the model
 * gets the question, options, the learner's answer and the hint, never correctOptionIds or the explanation.
 *
 * Until the endpoints are deployed (404 / 501 / network error), answers come from `localMentor`, built
 * from the lesson cards with no AI call.
 */

const TIMEOUT_MS = 25_000;
const HISTORY = 6;

type Turn = { role: "user" | "mentor"; text: string };

function flatten(blocks: MentorBlock[]) {
  return blocks
    .map((b) => (b.type === "steps" ? b.items.join("; ") : b.text))
    .join("\n")
    .slice(0, 1000);
}

/** The endpoint isn't there yet (or the backend is unreachable): answer locally instead of erroring. */
function notAvailable(error: unknown) {
  if (error instanceof ApiError) return error.status === 404 || error.status === 501;
  return error instanceof TypeError; // fetch network failure
}

export function createMentorTransport(detail: LessonDetail): MentorTransport {
  const local = localMentor(detail);
  const history: Turn[] = [];
  const remember = (turn: Turn) => {
    history.push(turn);
    if (history.length > HISTORY) history.shift();
  };

  return {
    async review(mistake) {
      try {
        return await apiClient(`/mentor/mistakes/${encodeURIComponent(mistake.id)}/review`, MentorMessage, {
          method: "POST",
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
      } catch (error) {
        if (notAvailable(error)) return local.review(mistake);
        throw error;
      }
    },

    async ask(text, context) {
      const body = { text: text.slice(0, 2000), context, history: [...history] };
      let reply: z.infer<typeof MentorMessage>;
      try {
        reply = await apiClient("/mentor/messages", MentorMessage, {
          method: "POST",
          body,
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
      } catch (error) {
        if (!notAvailable(error)) throw error;
        reply = local.ask(text);
      }
      remember({ role: "user", text: body.text });
      remember({ role: "mentor", text: flatten(reply.blocks) });
      return reply;
    },
  };
}
