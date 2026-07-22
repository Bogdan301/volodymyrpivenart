/**
 * Batch-optimizes every image in client/public/images/.
 *
 * - Resizes anything wider than MAX_WIDTH down to MAX_WIDTH (keeps aspect ratio).
 *   Images already smaller than that are left at their original size.
 * - Re-encodes everything as .webp at WEBP_QUALITY, replacing/creating the
 *   .webp file with the SAME base filename as the source — so none of your
 *   existing code references (which already point to /images/name.webp) need
 *   to change at all.
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

const MAX_WIDTH = 2000; // no image on the site is ever displayed larger than this
const WEBP_QUALITY = 80; // 0-100, 80 is a strong quality/size balance for photos

const SOURCE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG", ".webp", ".WEBP"];

async function run() {
  const files = fs.readdirSync(IMAGES_DIR);

  // Group files by base name (without extension) so we process each unique
  // image once, preferring the highest-quality source available.
  const baseNames = new Map();
  for (const file of files) {
    const ext = path.extname(file);
    if (!SOURCE_EXTENSIONS.includes(ext)) continue;
    const base = file.slice(0, -ext.length);
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
    const outputPath = path.join(IMAGES_DIR, `${base}.webp`);

    const beforeSize = fs.statSync(sourcePath).size;
    totalBefore += beforeSize;

    try {
      const image = sharp(sourcePath);
      const metadata = await image.metadata();

      let pipeline = image;
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH });
      }

      await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outputPath + ".tmp");

      // Replace atomically so a failed run never leaves a half-written file
      fs.renameSync(outputPath + ".tmp", outputPath);

      const afterSize = fs.statSync(outputPath).size;
      totalAfter += afterSize;
      processed++;

      console.log(
        `${base}: ${(beforeSize / 1024 / 1024).toFixed(2)}MB -> ${(afterSize / 1024 / 1024).toFixed(2)}MB`
      );
    } catch (err) {
      console.error(`Failed to process ${source}:`, err.message);
    }
  }

  console.log(`\nDone. Processed ${processed} images.`);
  console.log(
    `Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`
  );
}

run().catch(console.error);