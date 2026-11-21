import type { Metadata } from "next";
import Link from "next/link";

import { DemoOnboardingResult } from "@/features/design-system/components/demo-onboarding";

export const metadata: Metadata = { title: "Demo: onboarding result" };

export default function OnboardingResultDemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/design-system"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        ← Design system
      </Link>
      <DemoOnboardingResult />
    </div>
  );
}
