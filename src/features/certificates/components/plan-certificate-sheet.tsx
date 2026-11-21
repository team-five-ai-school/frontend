import type { PlanCertificate } from "@/lib/contracts";
import { formatDate, t } from "@/lib/i18n";

const GRID = {
  backgroundImage:
    "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
  backgroundSize: "3cqw 3cqw",
};

/**
 * The final certificate ("stamp hero"): squared paper like the course certificate, but centred, with a big
 * stamp and the plan's skills as one flat list. Container units (cqw) scale it from a card to a full page.
 * The disclaimer is inside the sheet so any image or PDF made from it carries it.
 */
export function PlanCertificateSheet({
  certificate,
  verifyUrl,
}: {
  certificate: Pick<PlanCertificate, "title" | "holderName" | "skills" | "issuedAt">;
  verifyUrl: string;
}) {
  return (
    <div className="@container w-full">
      <div
        id="certificate"
        className="flex aspect-[1.414/1] w-full flex-col border-ballpoint bg-paper text-center shadow-lifted"
        style={{ ...GRID, borderWidth: "0.5cqw", borderStyle: "solid", padding: "3.6cqw" }}
      >
        <div
          className="flex h-full flex-col items-center justify-between bg-paper/85"
          style={{ padding: "2cqw" }}
        >
          <p className="font-medium tracking-[0.4em] text-ballpoint uppercase" style={{ fontSize: "1.4cqw" }}>
            {t("certificate.ofCompletion")}
          </p>
          <span
            className="grid -rotate-12 place-items-center rounded-full border-double border-success text-center font-bold tracking-wider text-success uppercase"
            style={{ width: "13cqw", height: "13cqw", fontSize: "1.5cqw", borderWidth: "0.6cqw" }}
          >
            {t("certificate.planStamp")}
          </span>
          <div className="flex flex-col items-center" style={{ gap: "0.8cqw" }}>
            <p className="font-semibold text-foreground" style={{ fontSize: "5cqw", lineHeight: 1.1 }}>
              {certificate.holderName}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "1.8cqw" }}>
              {t("certificate.planFor")}
            </p>
            <p className="font-semibold text-foreground" style={{ fontSize: "2.8cqw", lineHeight: 1.2 }}>
              {certificate.title}
            </p>
            <p className="text-muted-foreground" style={{ fontSize: "1.3cqw", maxWidth: "80cqw" }}>
              {certificate.skills.join(" · ")}
            </p>
          </div>
          <div className="text-muted-foreground" style={{ fontSize: "1.1cqw" }}>
            <p>
              {t("certificate.issued", { date: formatDate(certificate.issuedAt) })} · {verifyUrl}
            </p>
            <p>{t("certificate.disclaimer")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
