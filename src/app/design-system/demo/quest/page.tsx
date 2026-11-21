import type { Metadata } from "next";
import Link from "next/link";

import { DemoQuest } from "@/features/design-system/components/demo-quest";

export const metadata: Metadata = { title: "Demo: progress quest" };

export default function QuestDemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <Link
        href="/design-system"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        ← Design system
      </Link>
      <DemoQuest />
    </div>
  );
}
