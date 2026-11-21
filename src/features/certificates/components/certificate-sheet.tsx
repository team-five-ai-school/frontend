import type { IssuedCertificate } from "@/lib/contracts";
import { formatDate, t } from "@/lib/i18n";

const GRID = {
  backgroundImage:
    "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
  backgroundSize: "3cqw 3cqw",
};

/**
 * The certificate itself ("squared paper": ballpoint border on the app's grid, green stamp).
 * Sizes use container units (cqw), so it scales from a card preview to a full page without media queries.
 * The disclaimer lives inside the sheet on purpose: whatever is rendered from it (page, image, PDF) carries it.
 */
export function CertificateSheet({
  certificate,
  verifyUrl,
}: {
  certificate: Pick<IssuedCertificate, "holderName" | "certificateName" | "courseTitle" | "issuedAt">;
  verifyUrl: string;
}) {
  return (
    <div className="@container w-full">
      <div
        id="certificate"
        className="flex aspect-[1.414/1] w-full flex-col border-ballpoint bg-paper shadow-paper"
        style={{ ...GRID, borderWidth: "0.5cqw", borderStyle: "solid", padding: "4cqw" }}
      >
        <div className="flex h-full flex-col justify-between bg-paper/80" style={{ padding: "2.4cqw" }}>
          <p className="font-medium tracking-[0.3em] text-ballpoint uppercase" style={{ fontSize: "1.4cqw" }}>
            {t("certificate.ofCompletion")}
          </p>
          <div>
            <p className="text-muted-foreground" style={{ fontSize: "1.6cqw" }}>
              {t("certificate.awarded")}
            </p>
            <p
              className="border-b-ballpoint font-semibold text-foreground"
              style={{
                fontSize: "5.4cqw",
                lineHeight: 1.15,
                borderBottomWidth: "0.25cqw",
                paddingBottom: "0.6cqw",
              }}
            >
              {certificate.holderName}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "1.6cqw", marginTop: "2cqw" }}>
              {t("certificate.forCompleting")}
            </p>
            <p className="font-semibold text-foreground" style={{ fontSize: "3.4cqw", lineHeight: 1.2 }}>
              {certificate.certificateName}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "1.6cqw" }}>
              {certificate.courseTitle}
            </p>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div className="text-muted-foreground" style={{ fontSize: "1.2cqw" }}>
              <p>{t("certificate.issued", { date: formatDate(certificate.issuedAt) })}</p>
              <p className="break-all">{verifyUrl}</p>
              <p style={{ marginTop: "0.6cqw" }}>{t("certificate.disclaimer")}</p>
            </div>
            <span
              className="grid shrink-0 -rotate-12 place-items-center rounded-full border-double border-success text-center font-bold tracking-wider text-success uppercase"
              style={{ width: "9cqw", height: "9cqw", fontSize: "1.2cqw", borderWidth: "0.5cqw" }}
            >
              {t("certificate.stamp")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
