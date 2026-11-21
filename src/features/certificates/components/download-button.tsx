"use client";

import { DownloadIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

/**
 * Downloads the rendered certificate sheet (#certificate) as a one-page A4 landscape PDF.
 * Built in the browser from the live DOM, so it always shows the current name and needs no server.
 * The PDF contains an image of the sheet (text is not selectable).
 */
export function DownloadButton({ filename }: { filename: string }) {
  const [busy, setBusy] = useState(false);

  async function download() {
    const node = document.getElementById("certificate");
    if (!node) return;
    setBusy(true);
    try {
      const [{ toJpeg }, { jsPDF }] = await Promise.all([import("html-to-image"), import("jspdf")]);
      // JPEG keeps the file small (a PNG of the grid is ~14 MB); 2.5x is sharp enough for A4 print.
      const image = await toJpeg(node, { pixelRatio: 2.5, quality: 0.95, cacheBust: true });
      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
      pdf.addImage(image, "JPEG", 0, 0, 297, 210);
      pdf.save(`${filename}.pdf`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <Button variant="outline" onClick={download} disabled={busy}>
      {busy ? <Loader2Icon className="animate-spin" aria-hidden /> : <DownloadIcon aria-hidden />}
      {t("certificate.downloadPdf")}
    </Button>
  );
}
