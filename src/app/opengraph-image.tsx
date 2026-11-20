import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

// Link preview for Slack / Telegram / X. Generated at build time.
// Note: the built-in font has no Cyrillic; load a font file if the copy is in Ukrainian.
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 80,
        background: "#0a0a0a",
        color: "#fafafa",
      }}
    >
      <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>{siteConfig.name}</div>
      <div style={{ fontSize: 36, marginTop: 16, color: "#a1a1a1" }}>{siteConfig.description}</div>
    </div>,
    size,
  );
}
