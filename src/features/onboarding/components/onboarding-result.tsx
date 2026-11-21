"use client";

import { useState } from "react";

import { SegmentedControl } from "@/components/segmented-control";
import { Button } from "@/components/ui/button";
import { ChaosMap, type ChaosMode } from "@/features/chaos-map/components/chaos-map";
import { HoursMetric } from "@/features/chaos-map/components/hours-metric";
import { ShareCard } from "@/features/chaos-map/components/share-card";
import type { AssessmentResult } from "@/lib/contracts";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Onboarding result: headline, chaos map with the "Now / With AI" switch, weekly hours, share card, one CTA.
 * The mode switch drives both the map and the hours number.
 */
export function OnboardingResult({
  result,
  roleTitle,
  shareUrl,
  onStart,
  className,
}: {
  result: AssessmentResult;
  roleTitle: string;
  shareUrl: string;
  onStart: () => void;
  className?: string;
}) {
  const [mode, setMode] = useState<ChaosMode>("now");
  const { chaosMap } = result;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {/* The verdict and the number share one row: the number is the hero, not a sidebar stat. */}
      <header className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div className="flex max-w-prose flex-col gap-3">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {t("onboarding.resultTitle", { percent: result.aiSharePercent })}
          </h1>
          <p className="text-lg text-muted-foreground">{t("onboarding.resultLead")}</p>
        </div>
        <HoursMetric
          hoursNow={chaosMap.totals.hoursNow}
          hoursWithAi={chaosMap.totals.hoursWithAi}
          mode={mode}
        />
      </header>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <SegmentedControl
            label={t("chaosMap.modeLabel")}
            value={mode}
            onValueChange={setMode}
            options={[
              { value: "now", label: t("chaosMap.now") },
              { value: "ai", label: t("chaosMap.withAi") },
            ]}
          />
          <Legend />
        </div>
        <ChaosMap data={chaosMap} mode={mode} onModeChange={setMode} showModeSwitch={false} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onStart} className="w-full sm:w-auto">
          {t("onboarding.resultCta")}
        </Button>
      </div>

      <section aria-labelledby="share-title" className="flex max-w-xl flex-col gap-3 border-t pt-8">
        <h2 id="share-title" className="text-lg font-medium">
          {t("onboarding.resultSecondary")}
        </h2>
        <ShareCard percent={result.aiSharePercent} roleTitle={roleTitle} shareUrl={shareUrl} />
      </section>
    </div>
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <li>
        <span className="highlight font-medium">{t("roles.needsYou")}</span>
      </li>
      <li className="flex items-center gap-2 text-muted-foreground">
        <span className="h-4 w-6 rounded-xs border border-ai/50 hatch" aria-hidden /> {t("roles.ai")}
      </li>
    </ul>
  );
}
