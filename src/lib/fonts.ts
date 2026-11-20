import { JetBrains_Mono, Onest } from "next/font/google";

/**
 * Self-hosted by next/font: no layout shift, no request to Google at runtime.
 * Add subsets (e.g. "cyrillic") only if the UI needs them: each one adds font weight.
 * To change the type, swap the family here;
 * globals.css maps these variables to Tailwind's font-sans / font-heading / font-mono.
 */
export const fontSans = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
