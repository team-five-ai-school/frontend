import { JetBrains_Mono, Onest } from "next/font/google";

/**
 * Self-hosted by next/font: no layout shift, no request to Google at runtime.
 * Both families include Cyrillic. To change the type, swap the family here;
 * globals.css maps these variables to Tailwind's font-sans / font-heading / font-mono.
 */
export const fontSans = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});
