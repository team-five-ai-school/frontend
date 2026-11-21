"use client";

import { CheckIcon, LinkIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { t } from "@/lib/i18n";

export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      {copied ? <CheckIcon aria-hidden /> : <LinkIcon aria-hidden />}
      {copied ? t("certificate.linkCopied") : t("certificate.copyLink")}
    </Button>
  );
}
