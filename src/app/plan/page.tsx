import type { Metadata } from "next";

import { PlanView } from "@/features/onboarding/components/plan-view";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Your learning plan" };

export default function PlanPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-12">
      <header className="flex max-w-prose flex-col gap-2">
        <h1 className="text-3xl font-bold text-balance sm:text-4xl">{t("plan.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("plan.lead")}</p>
      </header>
      <PlanView />
    </div>
  );
}
