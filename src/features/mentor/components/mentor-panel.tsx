"use client";

import { SendIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { IconButton } from "@/components/icon-button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useIsDesktop } from "@/hooks/use-media-query";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { useMentor } from "../mentor-context";
import { MentorAvatar, MentorError, MentorMessage, MentorThinking } from "./mentor-message";
import { SuggestionChips } from "./suggestion-chips";

/**
 * The Mentor. Desktop (≥1024px): a sticky side panel, always visible next to the lesson.
 * Phones/tablets: a bottom sheet opened from <MentorEntry>.
 */
export function MentorPanel({
  starterSuggestions = [],
  onExtraTaskStart,
  className,
}: {
  starterSuggestions?: string[];
  onExtraTaskStart?: (taskId: string) => void;
  className?: string;
}) {
  const { open, setOpen } = useMentor();
  const isDesktop = useIsDesktop();

  return (
    <>
      <aside
        aria-labelledby="mentor-panel-title"
        data-mentor-target
        className={cn(
          "sticky top-20 hidden h-[calc(100dvh-6rem)] min-h-[28rem] flex-col overflow-hidden sheet lg:flex",
          "data-[pulse=true]:animate-soft-pulse",
          className,
        )}
      >
        <PanelHeader titleId="mentor-panel-title" />
        <PanelBody
          composerId="mentor-composer"
          starterSuggestions={starterSuggestions}
          onExtraTaskStart={onExtraTaskStart}
        />
      </aside>

      {!isDesktop && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[88dvh] max-h-[88dvh]! bg-card">
            <DrawerHeader className="flex-row items-center gap-3 border-b text-left group-data-[vaul-drawer-direction=bottom]/drawer-content:text-left">
              <MentorAvatar />
              <div className="flex flex-col">
                <DrawerTitle className="text-lg">{t("mentor.title")}</DrawerTitle>
                <DrawerDescription className="text-sm">{t("mentor.subtitle")}</DrawerDescription>
              </div>
            </DrawerHeader>
            <PanelBody
              composerId="mentor-composer-sheet"
              starterSuggestions={starterSuggestions}
              onExtraTaskStart={onExtraTaskStart}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}

function PanelHeader({ titleId }: { titleId: string }) {
  return (
    <header className="flex items-center gap-3 border-b px-4 py-3">
      <MentorAvatar />
      <div className="flex min-w-0 flex-col">
        <h2 id={titleId} className="text-lg leading-tight font-bold">
          {t("mentor.title")}
        </h2>
        <p className="truncate text-sm text-muted-foreground">{t("mentor.subtitle")}</p>
      </div>
    </header>
  );
}

function PanelBody({
  composerId,
  starterSuggestions,
  onExtraTaskStart,
}: {
  composerId: string;
  starterSuggestions: string[];
  onExtraTaskStart?: (taskId: string) => void;
}) {
  const { messages, pending, ask, setExtraTaskStatus } = useMentor();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Bring the newest item into view: its top, so a long review (mistake card first) reads from the start.
  useEffect(() => {
    const el = scrollRef.current;
    const last = el?.querySelector("[role=log]")?.lastElementChild as HTMLElement | null | undefined;
    if (!el || !last) return;
    const top = last.offsetTop - el.offsetTop - 16;
    el.scrollTo({ top: Math.max(0, Math.min(top, el.scrollHeight)), behavior: "smooth" });
  }, [messages.length, pending]);

  const lastMentor = [...messages].reverse().find((m) => m.role === "mentor");
  // Don't offer a question the learner has already asked.
  const asked = new Set(
    messages
      .filter((m) => m.role === "user")
      .flatMap((m) => m.blocks.map((b) => ("text" in b ? b.text.trim() : ""))),
  );
  const suggestions = (messages.length === 0 ? starterSuggestions : (lastMentor?.suggestions ?? [])).filter(
    (s) => !asked.has(s.trim()),
  );

  return (
    <>
      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        {messages.length === 0 && !pending ? (
          <div className="flex flex-col gap-2 py-6 text-center">
            <p className="text-lg font-medium">{t("mentor.emptyTitle")}</p>
            <p className="text-muted-foreground">{t("mentor.emptyBody")}</p>
          </div>
        ) : (
          <div role="log" aria-label={t("mentor.title")} className="flex flex-col gap-6">
            {messages.map((m) => (
              <MentorMessage
                key={m.id}
                message={m}
                onExtraTaskStart={(id) => {
                  setExtraTaskStatus(id, "done");
                  onExtraTaskStart?.(id);
                }}
                onExtraTaskSkip={(id) => setExtraTaskStatus(id, "skipped")}
              />
            ))}
            {pending && !pending.error && <MentorThinking />}
            {pending?.error && <MentorError onRetry={pending.retry} />}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {(!pending || pending.error) && (
          <SuggestionChips label={t("mentor.suggestions")} suggestions={suggestions} onSelect={ask} />
        )}
        <Composer id={composerId} disabled={Boolean(pending && !pending.error)} onSend={ask} />
      </div>
    </>
  );
}

function Composer({
  id,
  disabled,
  onSend,
}: {
  id: string;
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const submit = () => {
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
  };
  return (
    <form
      className="flex items-end gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <label htmlFor={id} className="sr-only">
        {t("mentor.inputLabel")}
      </label>
      <textarea
        id={id}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder={t("mentor.inputPlaceholder")}
        className="field-sizing-content max-h-40 min-h-11 flex-1 resize-none rounded-md border border-input bg-card px-3 py-2.5 text-base outline-none placeholder:text-subtle-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <IconButton
        type="submit"
        label={t("mentor.send")}
        variant="default"
        tooltip={false}
        disabled={disabled || !text.trim()}
      >
        <SendIcon aria-hidden />
      </IconButton>
    </form>
  );
}
