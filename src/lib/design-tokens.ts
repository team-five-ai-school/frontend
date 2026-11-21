/**
 * Design tokens for JS (charts, animations, inline SVG).
 * Mirrors src/app/globals.css: colors are CSS variable references, so they follow the active theme
 * automatically. Never hardcode color values in components; add a token in globals.css instead.
 * Docs: docs/DESIGN_SYSTEM.md.
 */

const v = (name: string) => `var(--${name})`;

/** Stationery palette (light theme hex). Use the role tokens below in code; these are for docs and exports. */
export const palette = {
  desk: "#ECEEE8",
  paper: "#FDFDFB",
  ink: "#171B2E",
  graphite: "#5F6577",
  pencil: "#8C92A3",
  line: "#D6D9D1",
  grid: "#C9D3E6",
  marker: "#FFE03D",
  ballpoint: "#2638C9",
  stamp: "#1D7A4C",
  correction: "#CF3426",
} as const;

export const color = {
  surface: {
    background: v("background"),
    card: v("card"),
    raised: v("popover"),
    sunken: v("muted"),
  },
  text: {
    primary: v("foreground"),
    secondary: v("muted-foreground"),
    subtle: v("subtle-foreground"),
  },
  border: { default: v("border"), strong: v("input") },
  /** The two product roles. needs-you = marker (text on it is ink), ai = pencil (use the `hatch` utility for fills). */
  role: {
    needsYou: {
      solid: v("needs-you"),
      on: v("needs-you-foreground"),
      soft: v("needs-you-soft"),
      strong: v("needs-you-strong"),
    },
    ai: { solid: v("ai"), on: v("ai-foreground"), soft: v("ai-soft"), strong: v("ai-strong") },
  },
  status: {
    success: {
      solid: v("success"),
      on: v("success-foreground"),
      soft: v("success-soft"),
      strong: v("success-strong"),
    },
    warning: {
      solid: v("warning"),
      on: v("warning-foreground"),
      soft: v("warning-soft"),
      strong: v("warning-strong"),
    },
    danger: {
      solid: v("destructive"),
      on: v("destructive-foreground"),
      soft: v("destructive-soft"),
      strong: v("destructive-strong"),
    },
    info: { solid: v("info"), on: v("info-foreground"), soft: v("info-soft"), strong: v("info-strong") },
  },
  progress: { fill: v("progress"), track: v("progress-track") },
  streak: { solid: v("streak"), soft: v("streak-soft"), strong: v("streak-strong") },
  focus: v("ring"),
} as const;

/** 1.25 modular scale on a 17px body. Tailwind: text-xs … text-6xl. */
export const typography = {
  family: { sans: v("font-sans"), mono: v("font-mono") },
  /** Big numbers: Geologica 800, SHRP 100, letter-spacing -0.045em, tabular figures (utility: `numeral`). */
  numeral: { weight: 800, letterSpacing: "-0.045em", sharpness: 100 },
  size: {
    micro: "0.8125rem",
    caption: "0.9375rem",
    body: "1.0625rem",
    lead: "1.25rem",
    subtitle: "1.5rem",
    title: "1.875rem",
    headline: "2.375rem",
    display: "3rem",
    hero: "4.5rem",
    numeral: "7rem",
  },
  weight: { regular: 400, medium: 500, semibold: 600, bold: 700, numeral: 800 },
} as const;

/** Tailwind's 4px spacing scale; these are the steps we use. */
export const space = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48, 16: 64 } as const;

/** Radius by hierarchy: strips & fields, buttons & nested blocks, screens & sheets. */
export const radius = { strip: "3px", block: "8px", sheet: "14px", full: "9999px" } as const;
export const shadow = { paper: v("shadow-paper-value"), lifted: v("shadow-lifted-value") } as const;
export const borderWidth = { hairline: 1, strong: 2 } as const;
export const zIndex = { sticky: 30, header: 40, mentor: 45, overlay: 50, toast: 60 } as const;
/** Tailwind defaults. Design and QA at 360, 768 and 1280. */
export const breakpoint = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;
/** Minimum touch target in px. */
export const targetMin = 44;

export const motion = {
  duration: { fast: 120, base: 200, slow: 320, chaos: 900 },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** For imperative animations (Web Animations API). CSS transitions are already handled globally. */
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
