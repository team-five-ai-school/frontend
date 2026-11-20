import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

// Placeholder home page. Replace it once the hackathon task is known.
const nextSteps = [
  { file: "src/lib/site.ts", text: "Product name, description, routes" },
  { file: "/impeccable init", text: "Product brief → PRODUCT.md and DESIGN.md for agents" },
  { file: "src/app/globals.css", text: "Brand colors (shadcn theme tokens)" },
  { file: "src/app/examples/tasks", text: "Reference for data and mutations; delete when no longer needed" },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-4 py-16 sm:px-6 sm:py-24">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{siteConfig.name}</h1>
        <p className="max-w-prose text-lg text-muted-foreground">
          The template is ready. Once the task is announced, start with the steps below.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link href="/examples/tasks">
              Open the example
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <a href={siteConfig.repo} target="_blank" rel="noreferrer">
              Repository
            </a>
          </Button>
        </div>
      </section>

      <section aria-labelledby="next-steps" className="flex flex-col gap-3">
        <h2 id="next-steps" className="text-sm font-medium text-muted-foreground">
          Where to start
        </h2>
        <ol className="flex flex-col gap-3">
          {nextSteps.map((step, index) => (
            <li key={step.file} className="flex gap-3">
              <span className="w-4 shrink-0 text-right text-muted-foreground tabular-nums">{index + 1}.</span>
              <span className="flex flex-col items-start gap-1">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{step.file}</code>
                <span className="text-sm text-muted-foreground">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
