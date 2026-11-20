#!/usr/bin/env node
/**
 * Prepare source images for the web.
 *
 *   npm run images              # assets/images → public/images
 *   npm run images -- --width 1600
 *
 * - PNG / JPG / JPEG / WEBP / AVIF → .avif + .webp (resized down to --width, default 2400px)
 * - SVG → minified with SVGO (keeps viewBox so it scales)
 *
 * You usually do NOT need this for <Image>: next/image already serves AVIF/WebP on the fly.
 * Use it for images that bypass next/image (CSS backgrounds, OG images, emails, heavy originals in git).
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

import sharp from "sharp";
import { optimize } from "svgo";

const { values } = parseArgs({
  options: {
    in: { type: "string", default: "assets/images" },
    out: { type: "string", default: "public/images" },
    width: { type: "string", default: "2400" },
  },
});

const inputDir = path.resolve(values.in);
const outputDir = path.resolve(values.out);
const maxWidth = Number(values.width);
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function processRaster(file, outBase) {
  const image = sharp(file).rotate().resize({ width: maxWidth, withoutEnlargement: true });
  const [avif, webp] = await Promise.all([
    image.clone().avif({ quality: 55, effort: 6 }).toBuffer(),
    image.clone().webp({ quality: 75 }).toBuffer(),
  ]);
  await Promise.all([writeFile(`${outBase}.avif`, avif), writeFile(`${outBase}.webp`, webp)]);
  return `avif ${kb(avif.length)}, webp ${kb(webp.length)}`;
}

async function processSvg(file, outBase) {
  const { data } = optimize(await readFile(file, "utf8"), {
    multipass: true,
    plugins: [{ name: "preset-default", params: { overrides: { removeViewBox: false } } }],
  });
  await writeFile(`${outBase}.svg`, data);
  return `svg ${kb(Buffer.byteLength(data))}`;
}

try {
  await stat(inputDir);
} catch {
  console.error(`No input folder: ${path.relative(process.cwd(), inputDir)}. Put source images there first.`);
  process.exit(1);
}

let count = 0;
for await (const file of walk(inputDir)) {
  const ext = path.extname(file).toLowerCase();
  if (!RASTER.has(ext) && ext !== ".svg") continue;

  const rel = path.relative(inputDir, file);
  const outBase = path.join(outputDir, rel.slice(0, -ext.length));
  await mkdir(path.dirname(outBase), { recursive: true });

  const before = (await stat(file)).size;
  const result = ext === ".svg" ? await processSvg(file, outBase) : await processRaster(file, outBase);
  console.log(`${rel} (${kb(before)}) → ${result}`);
  count++;
}

console.log(
  count ? `Done: ${count} file(s) → ${path.relative(process.cwd(), outputDir)}` : "No images found.",
);
