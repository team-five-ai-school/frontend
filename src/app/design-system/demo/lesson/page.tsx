import type { Metadata } from "next";
import Link from "next/link";

import { DemoLesson } from "@/features/design-system/components/demo-lesson";

export const metadata: Metadata = { title: "Демо: урок і Ментор" };

export default function LessonDemoPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 pb-28 sm:px-6 sm:py-12 lg:pb-12">
      <Link
        href="/design-system"
        className="text-sm text-muted-foreground underline-offset-4 hover:underline"
      >
        ← Дизайн-система
      </Link>
      <DemoLesson />
    </div>
  );
}
