/**
 * Batch-optimizes every image in client/public/images/.
 *
 * For each source image, generates TWO output files:
 *   1. name.webp        — full size, for the lightbox / detail view (MAX_WIDTH_FULL)
 *   2. name-thumb.webp   — small size, for gallery grid cards (MAX_WIDTH_THUMB)
 *
 * This matters because grid cards only display at a few hundred pixels wide —
 * loading the full-size image for every card on a page (12-16 at once when
 * paginating) is by far the biggest cause of slow page-switch loading.
 *
 * - Original .jpg/.jpeg/.png files are left untouched on disk (not deleted),
 *   in case you ever want to re-run this with different settings later.
 *
 * Usage: node scripts/optimize-images.js
 * Re-run this any time you add new paintings to client/public/images/.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.resolve(__dirname, "..", "client", "public", "images");

const MAX_WIDTH_FULL = 2000; // full/lightbox version
const MAX_WIDTH_THUMB = 1000; // grid card version — cards are never displayed wider than this
const WEBP_QUALITY_FULL = 80;
const WEBP_QUALITY_THUMB = 75;

const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG", ".webp", ".WEBP"];

async function encode(sourcePath, outputPath, maxWidth, quality) {
  const image = sharp(sourcePath);
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth });
  }

  await pipeline.webp({ quality }).toFile(outputPath + ".tmp");
  fs.renameSync(outputPath + ".tmp", outputPath);
  return fs.statSync(outputPath).size;
}

async function run() {
  const files = fs.readdirSync(IMAGES_DIR);

  // Group files by base name (without extension), ignoring any existing
  // -thumb files so they don't get treated as separate source images.
  const baseNames = new Map();
  for (const file of files) {
    const ext = path.extname(file);
    if (!SOURCE_EXTENSIONS.includes(ext)) continue;
    const base = file.slice(0, -ext.length);
    if (base.endsWith("-thumb")) continue;
    if (!baseNames.has(base)) baseNames.set(base, []);
    baseNames.get(base).push(file);
  }

  let processed = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  for (const [base, variants] of baseNames) {
    // Prefer a non-webp original as the source (higher quality to resize from);
    // fall back to the existing webp if that's all there is.
    const source =
      variants.find((f) => !f.toLowerCase().endsWith(".webp")) || variants[0];

    const sourcePath = path.join(IMAGES_DIR, source);
    const fullOutputPath = path.join(IMAGES_DIR, `${base}.webp`);
    const thumbOutputPath = path.join(IMAGES_DIR, `${base}-thumb.webp`);

    const beforeSize = fs.statSync(sourcePath).size;
    totalBefore += beforeSize;

    try {
      const fullSize = await encode(sourcePath, fullOutputPath, MAX_WIDTH_FULL, WEBP_QUALITY_FULL);
      const thumbSize = await encode(sourcePath, thumbOutputPath, MAX_WIDTH_THUMB, WEBP_QUALITY_THUMB);

      totalAfter += fullSize + thumbSize;
      processed++;

      console.log(
        `${base}: source ${(beforeSize / 1024 / 1024).toFixed(2)}MB -> full ${(fullSize / 1024).toFixed(0)}KB, thumb ${(thumbSize / 1024).toFixed(0)}KB`
      );
    } catch (err) {
      console.error(`Failed to process ${source}:`, err.message);
    }
  }

  console.log(`\nDone. Processed ${processed} images (full + thumb each).`);
  console.log(
    `Total source: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> Total output: ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
}

run().catch(console.error);