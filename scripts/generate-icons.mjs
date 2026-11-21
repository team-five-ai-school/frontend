#!/usr/bin/env node
/**
 * Generates PWA icons from one SVG mark.
 *   npm run icons
 * Edit MARK (or point SOURCE at your own square SVG) when the brand is ready.
 */
import { mkdir, writeFile } from "node:fs/promises";

import sharp from "sharp";

const BG = "#0a0a0a";
const FG = "#fafafa";
const mark = (padding) => {
  const inner = 512 - padding * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <text x="256" y="${256 + inner * 0.2}" font-family="Helvetica, Arial, sans-serif" font-size="${inner * 0.62}"
        font-weight="700" fill="${FG}" text-anchor="middle">5</text>
</svg>`;
};

const outputs = [
  // "any" icons: rounded corners are applied by the OS where needed.
  { file: "public/icons/icon-192.png", size: 192, padding: 48 },
  { file: "public/icons/icon-512.png", size: 512, padding: 48 },
  // "maskable": content kept inside the central safe zone (Android crops to circle/squircle).
  { file: "public/icons/maskable-512.png", size: 512, padding: 110 },
  // iOS home screen icon (app/apple-icon.png file convention).
  { file: "src/app/apple-icon.png", size: 180, padding: 48 },
];

await mkdir("public/icons", { recursive: true });
for (const { file, size, padding } of outputs) {
  const png = await sharp(Buffer.from(mark(padding)))
    .resize(size, size)
    .png()
    .toBuffer();
  await writeFile(file, png);
  console.log(`${file} (${size}×${size})`);
}
