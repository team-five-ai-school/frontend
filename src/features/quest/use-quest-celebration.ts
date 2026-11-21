"use client";

import { useEffect, useEffectEvent } from "react";

import type { QuestSummary, RankId, StampId } from "./quest";

type Seen = { done: number; xp: number; rank: RankId; stamps: StampId[] };

const storageKey = (questId: string) => `quest:${questId}`;

function read(questId: string): Seen | null {
  try {
    const raw = window.localStorage.getItem(storageKey(questId));
    return raw ? (JSON.parse(raw) as Seen) : null;
  } catch {
    return null;
  }
}

function write(questId: string, seen: Seen) {
  try {
    window.localStorage.setItem(storageKey(questId), JSON.stringify(seen));
  } catch {
    // Private mode or blocked storage: no celebration next time, nothing breaks.
  }
}

export type Celebration = { xpGained: number; rankUp: RankId | null; stamps: StampId[] };

/**
 * Compares the quest with what this browser saw last time and calls `onCelebrate` with what is new since then
 * (XP, a new rank, new stamps). The first visit only records the state, so nothing is celebrated on load.
 * Per-browser only: a convenience, the real progress lives on the server. Pass `summary: null` to skip (guests).
 */
export function useQuestCelebration(
  questId: string,
  summary: QuestSummary | null,
  onCelebrate: (celebration: Celebration) => void,
) {
  const earned = summary?.stamps.filter((s) => s.earned).map((s) => s.id) ?? [];
  const signature = summary ? `${summary.done}|${summary.xp}|${summary.rank.id}|${earned.join(",")}` : null;

  const check = useEffectEvent(() => {
    if (!summary) return;
    const before = read(questId);
    const now: Seen = { done: summary.done, xp: summary.xp, rank: summary.rank.id, stamps: earned };
    write(questId, now);
    if (!before) return;
    const xpGained = Math.max(0, now.xp - before.xp);
    const rankUp = now.rank !== before.rank && xpGained > 0 ? now.rank : null;
    const stamps = now.stamps.filter((id) => !before.stamps.includes(id));
    if (xpGained > 0 || stamps.length > 0) onCelebrate({ xpGained, rankUp, stamps });
  });

  // `signature` changes exactly when something worth comparing changes.
  useEffect(() => {
    if (signature !== null) check();
  }, [questId, signature]);
}
