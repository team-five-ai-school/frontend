import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CourseList } from "@/features/courses/components/course-list";
import { getCourses } from "@/features/courses/data";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold sm:text-4xl">{t("course.catalogTitle")}</h1>
        <p className="max-w-prose text-muted-foreground">{t("course.catalogDescription")}</p>
      </header>
      <Suspense fallback={<GridSkeleton />}>
        <Courses />
      </Suspense>
    </div>
  );
}

async function Courses() {
  await connection(); // content comes from the backend at request time (cached), never at build time
  return <CourseList courses={await getCourses()} />;
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-busy="true">
      {Array.from({ length: 6 }, (_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
  );
}
