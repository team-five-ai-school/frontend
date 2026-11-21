"use client";

import { toast } from "sonner";

import { OnboardingResult } from "@/features/onboarding/components/onboarding-result";

import { assessment, roles } from "../mocks";

export function DemoOnboardingResult() {
  const role = roles.find((r) => r.id === assessment.roleId)!;
  return (
    <OnboardingResult
      result={assessment}
      roleTitle={role.title}
      shareUrl="https://team5-ai.vercel.app"
      onStart={() => toast.success("Тут відкриється перший урок")}
    />
  );
}
