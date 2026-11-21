"use client";

import * as React from "react";

import { useIsDesktop } from "@/hooks/use-media-query";
import type { MentorContext, MentorMessage, Mistake } from "@/lib/contracts";
import { motion, prefersReducedMotion } from "@/lib/design-tokens";

/**
 * Mentor state for one screen. The transport talks to the backend (see docs/api-contracts.md):
 *   ask    → POST /mentor/messages
 *   review → the review the backend produced for a mistake (GET /mentor/mistakes/:id/review or SSE event)
 * Demo pages pass a mock transport.
 */
export type MentorTransport = {
  ask: (text: string, context: MentorContext) => Promise<MentorMessage>;
  review: (mistake: Mistake) => Promise<MentorMessage>;
};

type PendingItem = { id: string; retry: () => void; error: boolean };

type MentorState = {
  messages: MentorMessage[];
  pending: PendingItem | null;
  open: boolean;
  unread: number;
  context: MentorContext;
  setOpen: (open: boolean) => void;
  openMentor: (context?: Partial<MentorContext>) => void;
  ask: (text: string) => void;
  /** Exercise → mistake → Mentor. `origin` is the element the mistake visually flies from. */
  reportMistake: (mistake: Mistake, origin?: HTMLElement | null) => void;
  /** Mark an extra task as done/skipped in the thread. */
  setExtraTaskStatus: (taskId: string, status: "done" | "skipped") => void;
};

const MentorCtx = React.createContext<MentorState | null>(null);

export function useMentor() {
  const ctx = React.useContext(MentorCtx);
  if (!ctx) throw new Error("useMentor must be used inside <MentorProvider>");
  return ctx;
}

function userMessage(text: string): MentorMessage {
  return {
    id: crypto.randomUUID(),
    role: "user",
    createdAt: new Date().toISOString(),
    status: "complete",
    blocks: [{ type: "text", text }],
    mistake: null,
    extraTasks: [],
    suggestions: [],
  };
}

export function MentorProvider({
  transport,
  initialMessages = [],
  defaultContext,
  children,
}: {
  transport: MentorTransport;
  initialMessages?: MentorMessage[];
  defaultContext: MentorContext;
  children: React.ReactNode;
}) {
  const [messages, setMessages] = React.useState<MentorMessage[]>(initialMessages);
  const [pending, setPending] = React.useState<PendingItem | null>(null);
  const [open, setOpenState] = React.useState(false);
  const [unread, setUnread] = React.useState(0);
  const [context, setContext] = React.useState<MentorContext>(defaultContext);
  const isDesktop = useIsDesktop();
  const visible = open || isDesktop;

  const receive = (message: MentorMessage) => {
    setMessages((list) => [...list, message]);
    if (!visible) setUnread((n) => n + 1);
  };

  const run = (request: () => Promise<MentorMessage>) => {
    const id = crypto.randomUUID();
    const attempt = () => {
      setPending({ id, retry: attempt, error: false });
      request()
        .then((message) => {
          setPending(null);
          receive(message);
        })
        .catch(() => setPending({ id, retry: attempt, error: true }));
    };
    attempt();
  };

  const setOpen = (next: boolean) => {
    setOpenState(next);
    if (next) setUnread(0);
  };

  const value: MentorState = {
    messages,
    pending,
    open,
    unread,
    context,
    setOpen,
    openMentor: (ctx) => {
      if (ctx) setContext((c) => ({ ...c, ...ctx }));
      setOpen(true);
      // Desktop: the panel is always visible, move focus to the composer instead.
      document.getElementById("mentor-composer")?.focus();
    },
    ask: (text) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;
      setMessages((list) => [...list, userMessage(trimmed)]);
      run(() => transport.ask(trimmed, context));
    },
    reportMistake: (mistake, origin) => {
      flyToMentor(origin);
      setContext({ source: "mistake", lessonId: mistake.lessonId, exerciseId: mistake.exerciseId });
      run(() => transport.review(mistake));
    },
    setExtraTaskStatus: (taskId, status) =>
      setMessages((list) =>
        list.map((m) => ({
          ...m,
          extraTasks: m.extraTasks.map((x) => (x.id === taskId ? { ...x, status } : x)),
        })),
      ),
  };

  return <MentorCtx.Provider value={value}>{children}</MentorCtx.Provider>;
}

/**
 * Visual hand-off: a small "mistake" token flies from the exercise to the visible Mentor target
 * (side panel on desktop, the global Mentor button on phones), which then pulses once.
 * Skipped under prefers-reduced-motion; the panel/badge update still communicates the hand-off.
 */
function flyToMentor(origin?: HTMLElement | null) {
  const target = [...document.querySelectorAll<HTMLElement>("[data-mentor-target]")].find(
    (el) => el.getClientRects().length > 0, // visible (works for position: fixed too)
  );
  if (!target) return;
  const pulse = () => {
    target.dataset.pulse = "true";
    setTimeout(() => delete target.dataset.pulse, 1700);
  };
  if (!origin || prefersReducedMotion()) {
    pulse();
    return;
  }
  const from = origin.getBoundingClientRect();
  const to = target.getBoundingClientRect();
  const token = document.createElement("div");
  token.setAttribute("aria-hidden", "true");
  token.className =
    "pointer-events-none fixed z-(--z-toast) rounded-lg border border-needs-you/50 bg-needs-you-soft shadow-raised";
  Object.assign(token.style, {
    left: `${from.left}px`,
    top: `${from.top}px`,
    width: `${from.width}px`,
    height: `${from.height}px`,
  });
  document.body.appendChild(token);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + Math.min(to.height, 80) / 2 - (from.top + from.height / 2);
  const animation = token.animate(
    [
      { transform: "translate(0, 0) scale(1)", opacity: 0.95 },
      { transform: `translate(${dx * 0.6}px, ${dy * 0.6 - 40}px) scale(0.5)`, opacity: 0.9, offset: 0.6 },
      { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0 },
    ],
    { duration: motion.duration.chaos, easing: motion.easing.standard },
  );
  animation.onfinish = () => {
    token.remove();
    pulse();
  };
}
