"use client";

import { KeyboardIcon, MicIcon, MicOffIcon, RotateCcwIcon, SquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type VoiceState = "idle" | "recording" | "processing" | "error" | "denied";

/**
 * «60 секунд голосом». Controlled: the parent owns the recorder (MediaRecorder) and passes the state.
 * Always offers a text fallback, so nobody is stuck without a microphone.
 */
export function VoiceInputButton({
  state,
  seconds = 0,
  maxSeconds = 60,
  onStart,
  onStop,
  onFallback,
  className,
}: {
  state: VoiceState;
  seconds?: number;
  maxSeconds?: number;
  onStart: () => void;
  onStop: () => void;
  onFallback: () => void;
  className?: string;
}) {
  const recording = state === "recording";
  const busy = state === "processing";
  const failed = state === "error" || state === "denied";

  const label = recording
    ? t("onboarding.voiceRecording")
    : busy
      ? t("onboarding.voiceProcessing")
      : state === "denied"
        ? t("onboarding.voiceDenied")
        : state === "error"
          ? t("onboarding.voiceError")
          : t("onboarding.voiceStart");

  return (
    <div className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <button
        type="button"
        onClick={recording ? onStop : onStart}
        disabled={busy || state === "denied"}
        aria-pressed={recording}
        aria-label={label}
        className={cn(
          "relative flex size-24 items-center justify-center rounded-full transition-colors duration-(--duration-base)",
          "focus-visible:ring-4 focus-visible:ring-ring/60 focus-visible:outline-none disabled:cursor-not-allowed",
          recording
            ? "animate-soft-pulse bg-needs-you text-needs-you-foreground"
            : failed
              ? "bg-muted text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/85",
        )}
      >
        {busy ? (
          <Spinner className="size-8" aria-hidden role={undefined} />
        ) : recording ? (
          <SquareIcon className="size-7 fill-current" aria-hidden />
        ) : state === "denied" ? (
          <MicOffIcon className="size-8" aria-hidden />
        ) : (
          <MicIcon className="size-8" aria-hidden />
        )}
      </button>

      {/* Visual progress of the 60 seconds. */}
      {recording && (
        <div className="flex w-48 flex-col gap-1.5" aria-hidden>
          <div className="h-1.5 overflow-hidden rounded-full bg-progress-track">
            <div
              className="h-full bg-needs-you transition-[width] duration-1000 ease-linear"
              style={{ width: `${(seconds / maxSeconds) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1" aria-live="polite">
        <p className={cn("font-medium", failed && "text-destructive-strong")}>{label}</p>
        <p className="text-sm text-muted-foreground tabular-nums">
          {recording
            ? t("onboarding.voiceSeconds", { seconds })
            : state === "idle"
              ? t("onboarding.voiceHint")
              : null}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {state === "error" && (
          <Button variant="outline" onClick={onStart}>
            <RotateCcwIcon data-icon="inline-start" aria-hidden />
            {t("common.retry")}
          </Button>
        )}
        {!recording && !busy && (
          <Button variant={failed ? "default" : "ghost"} onClick={onFallback}>
            <KeyboardIcon data-icon="inline-start" aria-hidden />
            {t("onboarding.voiceFallback")}
          </Button>
        )}
      </div>
    </div>
  );
}
