import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { CopyLinkButton } from "@/features/certificates/components/copy-link-button";
import { DownloadButton } from "@/features/certificates/components/download-button";
import { PlanCertificateSheet } from "@/features/certificates/components/plan-certificate-sheet";
import { getPlanCertificate } from "@/features/certificates/data";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: t("certificate.finalTitle") };

/** Public Verification link for a final certificate: no login. The unguessable id is the access control. */
export default function PlanCertificatePage({ params }: PageProps<"/plan-certificates/[id]">) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <Suspense fallback={<Skeleton className="aspect-[1.414/1] w-full rounded-lg" />}>
        <PlanCertificateContent params={params} />
      </Suspense>
    </div>
  );
}

async function PlanCertificateContent({ params }: Pick<PageProps<"/plan-certificates/[id]">, "params">) {
  const { id } = await params;
  const certificate = await getPlanCertificate(id);
  if (!certificate) notFound();
  const url = `${siteConfig.url}/plan-certificates/${certificate.id}`;
  return (
    <>
      <PlanCertificateSheet certificate={certificate} verifyUrl={url} />
      <div className="flex flex-wrap gap-2">
        <DownloadButton filename="certificate-learning-plan" />
        <CopyLinkButton url={url} />
      </div>
    </>
  );
}
