import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { CertificateSheet } from "@/features/certificates/components/certificate-sheet";
import { DownloadButton } from "@/features/certificates/components/download-button";
import { CopyLinkButton } from "@/features/certificates/components/copy-link-button";
import { getCertificate } from "@/features/certificates/data";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: t("certificate.title") };

/** Public Verification link: no login. The unguessable id is the access control. */
export default function CertificatePage({ params }: PageProps<"/certificates/[id]">) {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-10 sm:px-6 sm:py-14">
      <Suspense fallback={<Skeleton className="aspect-[1.414/1] w-full rounded-lg" />}>
        <Certificate params={params} />
      </Suspense>
    </div>
  );
}

async function Certificate({ params }: Pick<PageProps<"/certificates/[id]">, "params">) {
  const { id } = await params;
  const certificate = await getCertificate(id);
  if (!certificate) notFound();
  const url = `${siteConfig.url}/certificates/${certificate.id}`;
  return (
    <>
      <CertificateSheet certificate={certificate} verifyUrl={url} />
      <div className="flex flex-wrap gap-2">
        <DownloadButton filename={`certificate-${certificate.courseId}`} />
        <CopyLinkButton url={url} />
      </div>
    </>
  );
}
