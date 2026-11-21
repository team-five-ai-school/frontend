"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";

import { ErrorState } from "@/components/state-views";
import { Button } from "@/components/ui/button";
import type { MentorBlock, MentorMessage as MentorMessageData } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { ExtraTaskCard } from "./extra-task-card";
import { MistakeCard } from "./mistake-card";

/** The Mentor's monogram. Human, calm; no robot, no sparkles. */
export function MentorAvatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full bg-mentor text-base font-bold text-marker dark:ring-1 dark:ring-border",
        className,
      )}
    >
      M
    </span>
  );
}

/**
 * Mentor text with highlighter marks: `==key words==` render as <mark> with the marker stroke.
 * The backend sends plain strings; the marks are part of the contract (docs/api-contracts.md).
 */
export function Marked({ text }: { text: string }) {
  const parts = text.split(/==(.+?)==/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="highlight bg-transparent">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** One message in the Mentor thread. The Mentor speaks in plain text, no bubble; the person's messages are paper slips. */
export function MentorMessage({
  message,
  onExtraTaskStart,
  onExtraTaskSkip,
}: {
  message: MentorMessageData;
  onExtraTaskStart?: (taskId: string) => void;
  onExtraTaskSkip?: (taskId: string) => void;
}) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-lg border bg-card px-4 py-2.5 break-words">
          {message.blocks.map((b) => (b.type === "text" ? b.text : "")).join("\n")}
        </p>
      </div>
    );
  }

  return (
    <article className="flex gap-3" aria-label={t("mentor.name")}>
      <MentorAvatar />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        {message.mistake && <MistakeCard mistake={message.mistake} />}
        {message.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
        {message.extraTasks.map((task) => (
          <ExtraTaskCard
            key={task.id}
            task={task}
            onStart={() => onExtraTaskStart?.(task.id)}
            onSkip={() => onExtraTaskSkip?.(task.id)}
          />
        ))}
      </div>
    </article>
  );
}

function Block({ block }: { block: MentorBlock }) {
  switch (block.type) {
    case "text":
      return (
        <p className="break-words">
          <Marked text={block.text} />
        </p>
      );
    case "steps":
      return (
        <ol className="flex flex-col gap-2" aria-label={t("mentor.stepsLabel")}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span aria-hidden className="w-5 shrink-0 pt-px text-right font-bold tabular-nums">
                {i + 1}
              </span>
              <span className="min-w-0">
                <Marked text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
    case "example":
      return (
        <figure className="flex flex-col gap-1 rounded-lg border bg-card px-4 py-3">
          <figcaption className="text-sm font-medium text-muted-foreground">
            {block.title ?? t("mentor.exampleLabel")}
          </figcaption>
          <p className="break-words">
            <Marked text={block.text} />
          </p>
        </figure>
      );
    case "prompt":
      return <PromptBlock text={block.text} />;
  }
}

/** A prompt the person can copy into their AI tool. */
export function PromptBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the text stays selectable.
    }
  }
  return (
    <figure className="flex flex-col overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-2 border-b py-1 pr-1 pl-4">
        <figcaption className="text-sm font-medium text-muted-foreground">
          {t("mentor.promptLabel")}
        </figcaption>
        <Button size="sm" variant="ghost" onClick={copy} aria-live="polite">
          {copied ? (
            <CheckIcon data-icon="inline-start" aria-hidden />
          ) : (
            <CopyIcon data-icon="inline-start" aria-hidden />
          )}
          {copied ? t("mentor.copied") : t("mentor.copyPrompt")}
        </Button>
      </div>
      <pre className="overflow-x-auto px-4 py-3 font-mono text-sm leading-relaxed break-words whitespace-pre-wrap select-all">
        {text}
      </pre>
    </figure>
  );
}

/** "Mentor is thinking" with three dots; static text under reduced motion (animation is disabled globally). */
export function MentorThinking() {
  return (
    <div className="flex items-center gap-3" role="status">
      <MentorAvatar />
      <span className="flex items-center gap-2 text-muted-foreground">
        {t("mentor.thinking")}
        <span aria-hidden className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-1.5 animate-mentor-dot rounded-full bg-current"
              style={{ animationDelay: `${i * 160}ms` }}
            />
          ))}
        </span>
      </span>
    </div>
  );
}

export function MentorError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex gap-3">
      <MentorAvatar className="opacity-60" />
      <ErrorState compact title={t("mentor.error")} onRetry={onRetry} className="flex-1" />
    </div>
  );
}
