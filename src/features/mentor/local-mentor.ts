import type { LessonDetail, LessonStep, MentorBlock, MentorMessage, Mistake } from "@/lib/contracts";

/**
 * Stand-in Mentor that answers from the lesson's own cards, with no AI call.
 * Used while the backend mentor endpoint is not deployed (see mentor-transport.ts).
 * It never sees correct answers: the lesson payload has none, and a review only repeats the hint
 * the server already returned for that attempt.
 */

type Card = Extract<LessonStep, { type: "card" }>;

const STOP = new Set(
  "a an and are as at be but by can do does for from how i in is it me my of on or so that the this to what when why with you your".split(
    " ",
  ),
);

function words(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 2 && !STOP.has(w));
}

/** The card that shares the most words with the question; the first card if nothing matches. */
function bestCard(cards: Card[], text: string): Card | undefined {
  const q = new Set(words(text));
  let best: Card | undefined;
  let score = 0;
  for (const card of cards) {
    const s = words(`${card.title} ${card.body}`).filter((w) => q.has(w)).length;
    if (s > score) {
      best = card;
      score = s;
    }
  }
  return best ?? cards[0];
}

/** Markdown bold → the Mentor's highlight syntax; drops other markdown noise. */
const plain = (md: string) => md.replace(/\*\*(.+?)\*\*/g, "==$1==").replace(/[#>`]/g, "");

function message(
  blocks: MentorBlock[],
  extra: Partial<Pick<MentorMessage, "mistake" | "suggestions">> = {},
): MentorMessage {
  return {
    id: crypto.randomUUID(),
    role: "mentor",
    createdAt: new Date().toISOString(),
    status: "complete",
    blocks,
    mistake: extra.mistake ?? null,
    extraTasks: [],
    suggestions: extra.suggestions ?? [],
  };
}

export function localMentor(detail: LessonDetail) {
  const cards = detail.steps.filter((s): s is Card => s.type === "card");

  return {
    review(mistake: Mistake): MentorMessage {
      const card = bestCard(cards, `${mistake.exerciseTitle} ${mistake.why}`);
      return message(
        [
          { type: "text", text: "Let's look at this one together. Don't worry, it's a common slip." },
          ...(card ? [{ type: "example" as const, title: card.title, text: plain(card.body) }] : []),
        ],
        {
          mistake: {
            ...mistake,
            how: mistake.how || (card ? `Re-read "${card.title}", then try the exercise again.` : ""),
          },
          suggestions: ["Explain this in other words", "What should I look at first?"],
        },
      );
    },

    ask(text: string): MentorMessage {
      const card = bestCard(cards, text);
      // Say plainly that this is not an AI answer, so a quote from the lesson isn't mistaken for one.
      return message(
        [
          {
            type: "text",
            text:
              "The AI Mentor isn't connected right now, so I can't answer in my own words yet." +
              (card ? " Here's the part of the lesson that looks closest to your question:" : ""),
          },
          ...(card ? [{ type: "example" as const, title: card.title, text: plain(card.body) }] : []),
        ],
        { suggestions: [] },
      );
    },
  };
}
