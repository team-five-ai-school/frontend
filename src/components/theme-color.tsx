"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

// Keep in sync with --background in globals.css (light / dark).
const colors = { light: "#eceee8", dark: "#0f1220" } as const;

/**
 * The <meta name="theme-color"> tags from `viewport` follow the OS setting.
 * When the user picks a theme in the app, point them at that theme instead
 * (browser UI and mobile status bar then match the page).
 */
export function ThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = colors[resolvedTheme];
    });
  }, [resolvedTheme]);

  return null;
}
