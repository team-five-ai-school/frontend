import { motion, typography } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

import { PreviewSection, SubHeading } from "./preview-kit";

// Class names are listed literally so Tailwind can see them.
const roleSwatches = [
  {
    name: "needs-you",
    note: "Needs you: decisions and tasks that stay with the person",
    solid: "bg-needs-you text-needs-you-foreground",
    soft: "bg-needs-you-soft text-needs-you-strong",
  },
  {
    name: "ai",
    note: "AI does it: automated parts of the work",
    solid: "hatch text-ai-strong",
    soft: "bg-ai-soft text-ai-strong",
  },
];

const statusSwatches = [
  {
    name: "success",
    solid: "bg-success text-success-foreground",
    soft: "bg-success-soft text-success-strong",
  },
  {
    name: "warning",
    solid: "bg-warning text-warning-foreground",
    soft: "bg-warning-soft text-warning-strong",
  },
  {
    name: "destructive",
    solid: "bg-destructive text-destructive-foreground",
    soft: "bg-destructive-soft text-destructive-strong",
  },
  { name: "info", solid: "bg-info text-info-foreground", soft: "bg-info-soft text-info-strong" },
  { name: "streak", solid: "bg-streak text-primary-foreground", soft: "bg-streak-soft text-streak-strong" },
  {
    name: "progress",
    solid: "bg-progress text-success-foreground",
    soft: "bg-progress-track text-foreground",
  },
];

const surfaces = [
  { name: "background", cls: "bg-background" },
  { name: "card", cls: "bg-card" },
  { name: "raised (popover)", cls: "bg-raised shadow-raised" },
  { name: "muted", cls: "bg-muted" },
];

const textTokens = [
  { name: "foreground", cls: "text-foreground", note: "primary" },
  { name: "muted-foreground", cls: "text-muted-foreground", note: "secondary" },
  { name: "subtle-foreground", cls: "text-subtle-foreground", note: "muted" },
];

const typeScale = [
  { name: "numeral, text-6xl", cls: "text-6xl numeral", size: typography.size.numeral },
  { name: "display, text-4xl", cls: "text-4xl font-bold", size: typography.size.display },
  { name: "title, text-2xl", cls: "text-2xl font-bold", size: typography.size.title },
  { name: "lead, text-lg", cls: "text-lg font-medium", size: typography.size.lead },
  { name: "body, text-base", cls: "text-base", size: typography.size.body },
  { name: "caption, text-sm", cls: "text-sm", size: typography.size.caption },
];

const spacing = [1, 2, 3, 4, 6, 8, 12, 16];
const spacingCls: Record<number, string> = {
  1: "w-1",
  2: "w-2",
  3: "w-3",
  4: "w-4",
  6: "w-6",
  8: "w-8",
  12: "w-12",
  16: "w-16",
};
const radii = [
  { name: "sm", cls: "rounded-sm" },
  { name: "md", cls: "rounded-md" },
  { name: "lg", cls: "rounded-lg" },
  { name: "xl", cls: "rounded-xl" },
  { name: "full", cls: "rounded-full" },
];

function Swatch({ cls, label, sub }: { cls: string; label: string; sub?: string }) {
  return (
    <div className={cn("flex min-h-20 flex-col justify-end rounded-lg p-3", cls)}>
      <span className="text-sm font-medium">{label}</span>
      {sub && <span className="text-sm opacity-90">{sub}</span>}
    </div>
  );
}

export function TokensSection() {
  return (
    <PreviewSection
      id="tokens"
      title="Tokens"
      description="Single source of truth: CSS variables in globals.css (light and dark theme), Tailwind utilities and the TS export in src/lib/design-tokens.ts."
    >
      <div className="flex flex-col gap-4">
        <SubHeading>Color roles</SubHeading>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {roleSwatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <Swatch cls={s.solid} label={s.name} sub="solid" />
                <Swatch cls={s.soft} label={`${s.name}-soft`} sub="+ strong" />
              </div>
              <p className="text-sm text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SubHeading>Status, progress, streak</SubHeading>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {statusSwatches.map((s) => (
            <div key={s.name} className="flex flex-col gap-2">
              <Swatch cls={s.solid} label={s.name} />
              <Swatch cls={s.soft} label="soft" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <SubHeading>Surfaces</SubHeading>
          <div className="grid grid-cols-2 gap-2">
            {surfaces.map((s) => (
              <Swatch key={s.name} cls={cn("border text-foreground", s.cls)} label={s.name} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <SubHeading>Text and borders</SubHeading>
          <ul className="flex flex-col gap-2">
            {textTokens.map((s) => (
              <li
                key={s.name}
                className={cn("flex items-baseline justify-between gap-4 border-b pb-2", s.cls)}
              >
                <span>Plain, clear text</span>
                <span className="text-sm">{s.name}</span>
              </li>
            ))}
            <li className="flex items-center gap-3 pt-2 text-sm text-muted-foreground">
              <span className="size-8 rounded-md border" /> border
              <span className="size-8 rounded-md border-2 border-border-strong" /> border-strong
              <span className="size-8 rounded-md ring-3 ring-focus" /> focus
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <SubHeading>Typography: Geologica (SHRP axis in headings and numbers), modular scale 1.25</SubHeading>
        <ul className="flex flex-col gap-4">
          {typeScale.map((s) => (
            <li
              key={s.name}
              className="flex flex-col gap-1 border-b pb-4 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <span className="w-48 shrink-0 text-sm text-subtle-foreground">
                {s.name}, {s.size}
              </span>
              <span className={cn("min-w-0 break-words", s.cls)}>The quick brown fox counts the hours</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <SubHeading>Spacing (4px)</SubHeading>
          <ul className="flex flex-col gap-2">
            {spacing.map((n) => (
              <li key={n} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className={cn("h-4 rounded-sm bg-ai", spacingCls[n])} />
                {n}: {n * 4}px
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <SubHeading>Radii</SubHeading>
          <div className="flex flex-wrap gap-3">
            {radii.map((r) => (
              <div key={r.name} className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                <span className={cn("size-14 border-2 border-border-strong bg-muted", r.cls)} />
                {r.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <SubHeading>Motion</SubHeading>
          <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
            {Object.entries(motion.duration).map(([k, ms]) => (
              <li key={k}>
                --duration-{k}: {ms}ms
              </li>
            ))}
            {Object.keys(motion.easing).map((k) => (
              <li key={k}>ease-{k}</li>
            ))}
            <li className="pt-2 font-sans">Everything is disabled under prefers-reduced-motion.</li>
          </ul>
        </div>
      </div>
    </PreviewSection>
  );
}
