"use client";

import { CheckIcon, Share2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Shareable result card («AI can do 38% of my work»). The visual itself is the bar split into the two roles.
 * Share uses the Web Share API, falls back to copying the link.
 */
export function ShareCard({
  percent,
  roleTitle,
  shareUrl,
  className,
}: {
  percent: number;
  roleTitle: string;
  shareUrl: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const headline = t("share.headline", { percent });

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: headline, text: `${headline}. ${t("share.sub")}`, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // The user closed the share sheet: nothing to do.
    }
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <figure
        aria-label={`${headline}. ${roleTitle}`}
        className="flex w-full flex-col gap-5 sheet p-6 sm:p-8"
      >
        <span className="text-sm text-muted-foreground">{roleTitle}</span>
        <p className="flex flex-col gap-1">
          <span className="numeral text-6xl">{percent}%</span>
          <span className="text-lg">{t("share.caption")}</span>
        </p>
        {/* Ten paper strips: pencil hatching = AI can do it, marker = still needs the person. */}
        <div className="grid grid-cols-10 gap-1.5" aria-hidden>
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={cn(
                "h-10 rounded-xs border",
                i < Math.round(percent / 10) ? "border-ai/50 hatch" : "border-foreground/20 bg-marker",
              )}
            />
          ))}
        </div>
        <figcaption className="text-muted-foreground">{t("share.sub")}</figcaption>
      </figure>
      <Button variant="outline" onClick={share} className="self-start">
        {copied ? (
          <CheckIcon data-icon="inline-start" aria-hidden />
        ) : (
          <Share2Icon data-icon="inline-start" aria-hidden />
        )}
        {copied ? t("common.copied") : t("share.shareAction")}
      </Button>
    </div>
  );
}
