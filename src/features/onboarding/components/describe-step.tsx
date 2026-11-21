"use client";

import { MicIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const FREE_TEXT_MAX = 2000;

/** Optional free-text step: "Describe a typical workday". Empty text means skip. Voice is a disabled stub for now. */
export function DescribeStep({
  defaultValue = "",
  onSubmit,
  onSkip,
  onBack,
  className,
}: {
  defaultValue?: string;
  onSubmit: (freeText: string) => void;
  onSkip: () => void;
  onBack?: () => void;
  className?: string;
}) {
  const [text, setText] = useState(defaultValue);
  const trimmed = text.trim();

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        if (trimmed) onSubmit(trimmed);
        else onSkip();
      }}
    >
      <div className="flex max-w-prose flex-col gap-2">
        <h2 className="text-2xl font-bold text-balance">{t("onboarding.describeTitle")}</h2>
        <p className="text-muted-foreground">{t("onboarding.describeLead")}</p>
      </div>

      <Field>
        <FieldLabel htmlFor="free-text">{t("onboarding.describeLabel")}</FieldLabel>
        <Textarea
          id="free-text"
          name="freeText"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={FREE_TEXT_MAX}
          placeholder={t("onboarding.describePlaceholder")}
          className="min-h-40"
          aria-describedby="free-text-count"
        />
        <FieldDescription id="free-text-count" className="text-right tabular-nums">
          {t("onboarding.describeCounter", { count: text.length, max: FREE_TEXT_MAX })}
        </FieldDescription>
      </Field>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {onBack && (
            <Button type="button" variant="ghost" onClick={onBack}>
              {t("common.back")}
            </Button>
          )}
          <Button type="button" variant="outline" disabled aria-disabled>
            <MicIcon data-icon="inline-start" aria-hidden />
            {t("onboarding.voiceSoon")}
          </Button>
        </div>
        <div className="flex flex-col-reverse gap-2 sm:flex-row">
          <Button type="button" variant="ghost" onClick={onSkip}>
            {t("onboarding.describeSkip")}
          </Button>
          <Button type="submit" size="lg" disabled={!trimmed}>
            {t("onboarding.describeSubmit")}
          </Button>
        </div>
      </div>
    </form>
  );
}
