"use client";

import { useQuery } from "@tanstack/react-query";
import { CheckCircle2Icon, ClockIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CourseLevel, type Course } from "@/lib/contracts";
import { t, tp } from "@/lib/i18n";

import { progressQuery } from "../progress";
import { CourseCover } from "./course-cover";

/** Role ids from content/onboarding.json; "general" courses are listed for every role, so it has no chip. */
const roles = ["marketing", "hr", "teachers", "lawyers", "small-business"] as const;
type Role = (typeof roles)[number];
const levels = CourseLevel.options;

const isRole = (v: string | null): v is Role => roles.includes(v as Role);
const isLevel = (v: string | null): v is CourseLevel => levels.includes(v as CourseLevel);

/**
 * Course cards with filters. Filters live in the URL (?role=hr&level=beginner), so a filtered view can
 * be shared and survives a reload. Progress is merged in on the client from GET /me/progress.
 */
export function CourseList({ courses }: { courses: Course[] }) {
  const { data: progress } = useQuery(progressQuery);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const role = isRole(searchParams.get("role")) ? (searchParams.get("role") as Role) : null;
  const level = isLevel(searchParams.get("level")) ? (searchParams.get("level") as CourseLevel) : null;

  function setFilter(key: "role" | "level", value: string | null) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    router.replace((query ? `${pathname}?${query}` : pathname) as Route, { scroll: false });
  }

  const visible = courses.filter(
    (course) => (!role || course.roleIds.includes(role)) && (!level || course.level === level),
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap md:items-center md:justify-between">
        <FilterGroup
          label={t("course.filterRole")}
          value={role}
          allLabel={t("course.anyRole")}
          options={roles.map((r) => ({ value: r, label: t(`course.roles.${r}`) }))}
          onChange={(v) => setFilter("role", v)}
        />
        <FilterGroup
          label={t("course.filterLevel")}
          value={level}
          allLabel={t("course.anyLevel")}
          options={levels.map((l) => ({ value: l, label: t(`course.levels.${l}`) }))}
          onChange={(v) => setFilter("level", v)}
        />
      </div>

      <p className="text-sm text-muted-foreground tabular-nums" aria-live="polite">
        {tp("course.found", visible.length)}
      </p>

      {visible.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>{t("course.emptyFilter")}</EmptyTitle>
            <EmptyDescription>
              <Button variant="outline" onClick={() => router.replace(pathname as Route, { scroll: false })}>
                {t("course.resetFilter")}
              </Button>
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => {
            const p = progress?.courses[course.id];
            const percent = p?.progressPercent ?? 0;
            return (
              <li key={course.id} className="min-w-0">
                <Link
                  href={`/courses/${course.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-colors hover:border-foreground/30 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <CourseCover courseId={course.id} className="border-b" />
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-lg font-bold text-balance">{course.title}</h2>
                      {p?.status === "completed" && (
                        <CheckCircle2Icon
                          className="size-5 shrink-0 text-success-strong"
                          aria-label={t("course.completed")}
                        />
                      )}
                    </div>
                    <p className="line-clamp-3 text-sm text-muted-foreground">{course.summary}</p>
                    <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground tabular-nums">
                      <span>{t(`course.levels.${course.level}`)}</span>
                      <span>{t("course.lessonsCount", { count: course.lessonCount })}</span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="size-3.5" aria-hidden />
                        {t("course.duration", { minutes: course.durationMinutes })}
                      </span>
                    </p>
                    {percent > 0 && (
                      <div className="flex items-center gap-3">
                        <ProgressBar
                          value={percent}
                          className="h-1.5"
                          aria-label={t("course.progress", { percent })}
                        />
                        <span className="text-xs text-muted-foreground tabular-nums">{percent}%</span>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const chip =
  "data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground";

/**
 * One filter, two presentations: chips from `md` up, a compact select on phones
 * (chips would overflow or wrap into a tall block there).
 */
function FilterGroup({
  label,
  value,
  allLabel,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  allLabel: string;
  options: { value: string; label: string }[];
  onChange: (value: string | null) => void;
}) {
  const current = value ?? "all";
  const pick = (v: string) => onChange(v && v !== "all" ? v : null);
  return (
    <>
      <Select value={current} onValueChange={pick}>
        <SelectTrigger aria-label={label} className="w-full min-w-0 md:hidden">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{allLabel}</SelectItem>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ToggleGroup
        type="single"
        variant="outline"
        size="sm"
        aria-label={label}
        value={current}
        // Radix sends "" when the active item is clicked again: treat it as "all".
        onValueChange={pick}
        className="hidden flex-wrap md:flex"
      >
        <ToggleGroupItem value="all" className={chip}>
          {allLabel}
        </ToggleGroupItem>
        {options.map((o) => (
          <ToggleGroupItem key={o.value} value={o.value} className={chip}>
            {o.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </>
  );
}
