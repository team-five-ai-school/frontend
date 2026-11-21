import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";

import { api, ApiError } from "@/lib/api";
import { Course, CourseDetail, LessonDetail } from "@/lib/contracts";

/**
 * Course content from the backend (public, the same for every user), cached by tag.
 * Per-user progress is NOT here: it comes from GET /me/progress on the client (./progress.ts).
 * Call these inside <Suspense> after `await connection()` or reading params, so the build never needs the backend.
 */
export async function getCourses() {
  "use cache";
  cacheLife("hours");
  cacheTag("courses");
  return api("/courses", z.array(Course));
}

export async function getCourse(courseId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("courses");
  return notFoundAsNull(api(`/courses/${encodeURIComponent(courseId)}`, CourseDetail));
}

export async function getLessonDetail(lessonId: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("courses");
  return notFoundAsNull(api(`/lessons/${encodeURIComponent(lessonId)}`, LessonDetail));
}

async function notFoundAsNull<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
