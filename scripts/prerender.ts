/**
 * After `vite build`, this spins up a throwaway local server for the built
 * dist/public folder, visits every real route in a headless browser (letting
 * React + useSEO fully render), and saves the resulting HTML back into
 * dist/public at the matching path. Crawlers that request e.g. /gallery/Freedom
 * then get real, populated HTML instead of the empty <div id="root"></div> shell.
 *
 * This does not change how the app renders or behaves for visitors — React
 * still takes over and re-renders on load exactly as before (main.tsx uses
 * createRoot, so it just replaces this static snapshot). It only changes
 * what a crawler sees before JavaScript runs.
 */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { mkdirSync, writeFileSync } from "fs";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { artworks, blogPosts } from "../client/src/data/artworks";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPublic = path.resolve(__dirname, "..", "dist", "public");
const PORT = 4173;

const routes = [
  "/",
  "/about",
  "/blog",
  ...blogPosts.map((p) => `/blog/${p.id}`),
  ...artworks.map((a) => `/gallery/${a.id}`),
  "/contact",
];

async function main() {
  // Serve the already-built files, with the same SPA fallback as production,
  // so client-side routing resolves correctly while we crawl each route.
  const app = express();
  app.use(express.static(distPublic));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(distPublic, "index.html"));
  });
  const server = app.listen(PORT);

  const browser = await puppeteer.launch(
    process.env.VERCEL
      ? {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      }
      : {
        headless: true,
      }
  );
  const page = await browser.newPage();

  for (const route of routes) {
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });
    // Small buffer so useSEO's useEffect has committed its title/meta updates.
    await new Promise((r) => setTimeout(r, 300));

    const html = await page.content();
    const outDir = route === "/" ? distPublic : path.join(distPublic, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, "index.html"), html);
    console.log(`Prerendered ${route}`);
  }

  await browser.close();
  server.close();
  console.log(`Done — ${routes.length} routes prerendered.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});