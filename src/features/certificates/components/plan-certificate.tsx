"use client";

import { useQuery } from "@tanstack/react-query";
import { ExternalLinkIcon } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

import { planCertificatesQuery } from "../queries";
import { CopyLinkButton } from "./copy-link-button";
import { DownloadButton } from "./download-button";
import { LockedCertificate } from "./locked-certificate";
import { PlanCertificateSheet } from "./plan-certificate-sheet";

/** The learner's final certificate, on the plan page. Shown once every plan item is done. */
export function PlanCertificateSection({ done, total }: { done: number; total: number }) {
  const { data, isPending } = useQuery(planCertificatesQuery);
  const certificate = data?.at(-1);

  return (
    <section className="flex flex-col gap-3" aria-labelledby="final-certificate-heading">
      <h2 id="final-certificate-heading" className="text-lg font-bold">
        {t("certificate.finalTitle")}
      </h2>
      {isPending ? (
        <Skeleton className="aspect-[1.414/1] w-full rounded-lg" />
      ) : certificate ? (
        <>
          <PlanCertificateSheet
            certificate={certificate}
            verifyUrl={`${siteConfig.url}/plan-certificates/${certificate.id}`}
          />
          <div className="flex flex-wrap gap-2">
            <Link href={`/plan-certificates/${certificate.id}` as Route} className={buttonVariants()}>
              <ExternalLinkIcon aria-hidden />
              {t("certificate.view")}
            </Link>
            <DownloadButton filename="certificate-learning-plan" />
            <CopyLinkButton url={`${siteConfig.url}/plan-certificates/${certificate.id}`} />
          </div>
        </>
      ) : (
        <LockedCertificate
          preview={
            <PlanCertificateSheet
              certificate={{
                holderName: t("certificate.sampleName"),
                title: t("certificate.samplePlanTitle"),
                skills: [],
                issuedAt: new Date().toISOString(),
              }}
              verifyUrl={t("certificate.sampleLink")}
            />
          }
          done={done}
          total={total}
          progressLabel={t("certificate.lockedPlan", { done, total })}
        />
      )}
    </section>
  );
}
