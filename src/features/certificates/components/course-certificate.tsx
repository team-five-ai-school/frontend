"use client";

import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { progressQuery } from "@/features/courses/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

import { certificatesQuery } from "../queries";
import { CertificateSheet } from "./certificate-sheet";
import { LockedCertificate } from "./locked-certificate";
import { DownloadButton } from "./download-button";
import { CopyLinkButton } from "./copy-link-button";

/** The learner's certificate for this course (shown once the course is completed), on the course page. */
export function CourseCertificate({
  courseId,
  lessonIds,
  title,
}: {
  courseId: string;
  lessonIds: string[];
  /** The course has no certificate name in its API shape yet, so the preview shows the course title. */
  title: string;
}) {
  const { data, isPending } = useQuery(certificatesQuery);
  const certificate = data?.find((c) => c.courseId === courseId);
  const { data: progress } = useQuery(progressQuery);
  const done = lessonIds.filter((id) => progress?.completedLessonIds.includes(id)).length;

  return (
    <section className="flex flex-col gap-3" aria-labelledby="certificate-heading">
      <h2 id="certificate-heading" className="text-lg font-bold">
        {t("certificate.title")}
      </h2>
      {isPending ? (
        <Skeleton className="aspect-[1.414/1] w-full rounded-lg" />
      ) : certificate ? (
        <>
          <CertificateSheet
            certificate={certificate}
            verifyUrl={`${siteConfig.url}/certificates/${certificate.id}`}
          />
          <div className="flex flex-wrap gap-2">
            <Link href={`/certificates/${certificate.id}` as Route} className={buttonVariants()}>
              <ExternalLinkIcon aria-hidden />
              {t("certificate.view")}
            </Link>
            <DownloadButton filename={`certificate-${certificate.courseId}`} />
            <CopyLinkButton url={`${siteConfig.url}/certificates/${certificate.id}`} />
          </div>
        </>
      ) : (
        <LockedCertificate
          preview={
            <CertificateSheet
              certificate={{
                holderName: t("certificate.sampleName"),
                certificateName: title,
                courseTitle: "",
                issuedAt: new Date().toISOString(),
              }}
              verifyUrl={t("certificate.sampleLink")}
            />
          }
          done={done}
          total={lessonIds.length}
          progressLabel={t("certificate.lockedLessons", { done, total: lessonIds.length })}
        />
      )}
    </section>
  );
}
