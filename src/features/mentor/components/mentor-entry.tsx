"use client";

import { MessageCircleQuestionIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { MentorContext } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { useMentor } from "../mentor-context";
import { MentorAvatar } from "./mentor-message";

/**
 * Ways into the Mentor:
 *  - global:   floating button (phones/tablets), shows unread replies; target of the mistake hand-off
 *  - lesson:   «Запитати про цей урок»
 *  - exercise: «Не розумію завдання»
 */
export function MentorEntry({
  variant,
  context,
  className,
}: {
  variant: "global" | "lesson" | "exercise";
  context?: Partial<MentorContext>;
  className?: string;
}) {
  const { openMentor, unread, pending } = useMentor();

  if (variant === "global") {
    return (
      <button
        type="button"
        data-mentor-target
        onClick={() => openMentor(context)}
        aria-label={unread ? `${t("mentor.open")}: ${unread}` : t("mentor.open")}
        className={cn(
          "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-(--z-mentor) inline-flex min-h-13 items-center gap-2 rounded-full border bg-raised py-2 pr-5 pl-2 font-medium shadow-raised lg:hidden",
          "transition-transform duration-(--duration-fast) focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:outline-none active:scale-95",
          "data-[pulse=true]:animate-soft-pulse",
          className,
        )}
      >
        <span className="relative">
          <MentorAvatar />
          {(unread > 0 || pending) && (
            <span
              aria-hidden
              className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-needs-you px-1 text-sm leading-5 font-bold text-needs-you-foreground tabular-nums"
            >
              {unread > 0 ? unread : "…"}
            </span>
          )}
        </span>
        {t("mentor.name")}
      </button>
    );
  }

  return (
    <Button
      variant={variant === "lesson" ? "outline" : "ghost"}
      size={variant === "lesson" ? "default" : "sm"}
      onClick={() => openMentor(context)}
      className={className}
    >
      <MessageCircleQuestionIcon data-icon="inline-start" aria-hidden />
      {variant === "lesson" ? t("mentor.askInLesson") : t("mentor.askInExercise")}
    </Button>
  );
}
