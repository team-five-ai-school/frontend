"use client";

import { LightbulbIcon } from "lucide-react";
import { useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Hidden by default so the person tries first. */
export function Hint({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <Button
        variant="ghost"
        size="sm"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <LightbulbIcon data-icon="inline-start" aria-hidden />
        {open ? t("exercise.hideHint") : t("exercise.showHint")}
      </Button>
      <p
        id={id}
        hidden={!open}
        className="animate-in rounded-lg bg-info-soft px-4 py-3 text-info-strong duration-(--duration-base) fade-in-0"
      >
        {text}
      </p>
    </div>
  );
}
