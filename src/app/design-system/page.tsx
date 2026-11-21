import Link from "next/link";

import { ChaosSection } from "@/features/design-system/components/chaos-section";
import { BaseSection } from "@/features/design-system/components/base-section";
import { TokensSection } from "@/features/design-system/components/tokens-section";
import { t } from "@/lib/i18n";

const toc = [
  { id: "tokens", label: "Tokens" },
  { id: "base", label: "Base" },
  { id: "chaos", label: "Chaos map" },
];

const demos = [
  { href: "/design-system/demo/onboarding-result", label: "Onboarding result" },
  { href: "/design-system/demo/lesson", label: "Lesson: mistake → Mentor" },
] as const;

export default function DesignSystemPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 sm:py-14">
      <header className="flex max-w-prose flex-col gap-3">
        <h1 className="text-4xl font-bold">{t("designSystem.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("designSystem.lead")}</p>
        <p className="text-muted-foreground">
          Documentation: <code className="font-mono text-sm">docs/DESIGN_SYSTEM.md</code>.
        </p>
      </header>

      <nav aria-label={t("designSystem.demos")} className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">{t("designSystem.demos")}</h2>
        <ul className="flex flex-wrap gap-2">
          {demos.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="inline-flex min-h-11 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/85"
              >
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Sections" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {toc.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="inline-flex min-h-11 items-center rounded-lg border border-input px-4 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <TokensSection />
      <BaseSection />
      <ChaosSection />
    </div>
  );
}
