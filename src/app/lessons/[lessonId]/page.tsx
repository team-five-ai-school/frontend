import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { LessonPlayer } from "@/features/courses/components/lesson-player";
import { getLessonDetail } from "@/features/courses/data";
import { getSessionToken } from "@/lib/session";

export async function generateMetadata({ params }: PageProps<"/lessons/[lessonId]">): Promise<Metadata> {
  const data = await getLessonDetail((await params).lessonId);
  return { title: data?.lesson.title ?? "Lesson not found" };
}

export default function LessonPage({ params }: PageProps<"/lessons/[lessonId]">) {
  return (
    <Suspense fallback={<PlayerSkeleton />}>
      <Lesson params={params} />
    </Suspense>
  );
}

async function Lesson({ params }: Pick<PageProps<"/lessons/[lessonId]">, "params">) {
  const [detail, token] = await Promise.all([getLessonDetail((await params).lessonId), getSessionToken()]);
  if (!detail) notFound();
  return <LessonPlayer key={detail.lesson.id} detail={detail} loggedIn={Boolean(token)} />;
}

function PlayerSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12" aria-busy="true">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-9 w-3/4" />
      <Skeleton className="h-1.5 w-full" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
