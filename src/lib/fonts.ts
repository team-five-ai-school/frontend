import { Geologica, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted by next/font: no layout shift, no request to Google at runtime.
 * Geologica (variable, Cyrillic): one family for everything. Its SHRP (sharpness) axis is the
 * typographic signature: headings and numerals are sharpened in globals.css, body text stays soft.
 * JetBrains Mono is only for prompts and code the person copies, never for labels.
 */
export const fontSans = Geologica({
  subsets: ["latin", "cyrillic"],
  axes: ["SHRP"],
  variable: "--font-geologica",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
