"use client";

import { ImageUpIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";

import { IconButton } from "@/components/icon-button";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const MB = 1024 * 1024;

/**
 * Photo or screenshot upload (onboarding, file tasks). Drag-and-drop on desktop,
 * the native picker (camera/gallery) on phones. Validates type and size on the client;
 * the server validates again.
 */
export function FileDropzone({
  value,
  onChange,
  accept = ["image/png", "image/jpeg"],
  maxSizeMb = 10,
  uploadProgress,
  error: externalError,
  disabled = false,
  className,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
  accept?: string[];
  maxSizeMb?: number;
  /** 0–100 while uploading; undefined when idle. */
  uploadProgress?: number;
  error?: string;
  disabled?: boolean;
  className?: string;
}) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const error = externalError ?? localError;
  const preview = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);
  useEffect(() => () => void (preview && URL.revokeObjectURL(preview)), [preview]);

  function pick(file: File | undefined) {
    if (!file) return;
    if (!accept.includes(file.type)) return setLocalError(t("onboarding.fileWrongType"));
    if (file.size > maxSizeMb * MB) return setLocalError(t("onboarding.fileTooBig"));
    setLocalError(null);
    onChange(file);
  }

  if (value && preview) {
    const uploading = uploadProgress !== undefined && uploadProgress < 100;
    return (
      <div className={cn("flex items-center gap-3 rounded-xl border bg-card p-3", className)}>
        <Image
          src={preview}
          alt=""
          width={56}
          height={56}
          unoptimized
          className="size-14 shrink-0 rounded-lg object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <span className="truncate font-medium">{value.name}</span>
          {uploading ? (
            <>
              <Progress value={uploadProgress} aria-label={t("onboarding.fileUploading")} />
              <span className="text-sm text-muted-foreground">{t("onboarding.fileUploading")}</span>
            </>
          ) : (
            <span className="text-sm text-muted-foreground tabular-nums">
              {new Intl.NumberFormat("uk", { maximumFractionDigits: 1 }).format(value.size / MB)} МБ
            </span>
          )}
        </div>
        {!disabled && (
          <IconButton label={t("onboarding.fileRemove")} onClick={() => onChange(null)}>
            <XIcon aria-hidden />
          </IconButton>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!disabled) pick(e.dataTransfer.files[0]);
        }}
        className={cn(
          "flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border-strong/60 bg-card px-4 py-8 text-center transition-colors duration-(--duration-fast)",
          dragging && "border-primary bg-muted",
          error && "border-destructive",
          disabled && "opacity-60",
        )}
      >
        <ImageUpIcon className="size-8 text-muted-foreground" aria-hidden />
        <div className="flex flex-col gap-1">
          <p className="font-medium">{dragging ? t("onboarding.fileDrop") : t("onboarding.fileTitle")}</p>
          <p className="max-w-sm text-sm text-muted-foreground">{t("onboarding.fileHint")}</p>
        </div>
        <input
          id={inputId}
          type="file"
          accept={accept.join(",")}
          disabled={disabled}
          className="peer sr-only"
          aria-describedby={error ? `${inputId}-error` : undefined}
          onChange={(e) => pick(e.target.files?.[0])}
        />
        <Button asChild variant="outline" disabled={disabled}>
          <label
            htmlFor={inputId}
            className="cursor-pointer peer-focus-visible:ring-3 peer-focus-visible:ring-ring/60"
          >
            {t("onboarding.fileChoose")}
          </label>
        </Button>
      </div>
      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-sm text-destructive-strong">
          {error}
        </p>
      )}
    </div>
  );
}
