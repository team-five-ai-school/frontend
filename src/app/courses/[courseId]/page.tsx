import { ArrowLeftIcon, ClockIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { LessonList } from "@/features/courses/components/lesson-list";
import { getCourse } from "@/features/courses/data";
import { t } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/courses/[courseId]">): Promise<Metadata> {
  const data = await getCourse((await params).courseId);
  return { title: data?.course.title ?? "Course not found" };
}

export default function CoursePage({ params }: PageProps<"/courses/[courseId]">) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/courses"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
        {t("course.catalogTitle")}
      </Link>
      <Suspense fallback={<Skeleton className="h-96 rounded-xl" />}>
        <CourseContent params={params} />
      </Suspense>
    </div>
  );
}

async function CourseContent({ params }: Pick<PageProps<"/courses/[courseId]">, "params">) {
  const data = await getCourse((await params).courseId);
  if (!data) notFound();
  const { course, lessons } = data;
  return (
    <>
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-balance sm:text-4xl">{course.title}</h1>
        <p className="max-w-prose text-muted-foreground">{course.summary}</p>
        <p className="flex items-center gap-3 text-sm text-muted-foreground tabular-nums">
          <span>{t("course.lessonsCount", { count: course.lessonCount })}</span>
          <span className="flex items-center gap-1">
            <ClockIcon className="size-3.5" aria-hidden />
            {t("course.duration", { minutes: course.durationMinutes })}
          </span>
        </p>
      </header>
      <section className="flex flex-col gap-3" aria-labelledby="lessons-heading">
        <h2 id="lessons-heading" className="text-lg font-bold">
          {t("course.lessonsTitle")}
        </h2>
        <LessonList lessons={lessons} />
      </section>
    </>
  );
}
