import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import puppeteer from "puppeteer-core";

const WIDTH = 1920;
const HEIGHT = 1080;
const SCALE = 2;
const BASE = process.env.EXPORT_URL ?? "http://127.0.0.1:5173";
const OUT_DIR =
  process.env.EXPORT_OUT ??
  path.join(os.homedir(), "Downloads", "reticle-pages");
const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const PAGES = [
  { slug: "orb", path: "/", wait: ".orb-canvas", stage: true },
  { slug: "feature-cards", path: "/feature-cards", wait: ".feat-root", stage: true },
  { slug: "insights", path: "/insights", wait: ".ins-root", stage: true },
  { slug: "magenta-landscape", path: "/magenta-landscape", wait: ".gc" },
  { slug: "browser-frame", path: "/browser-frame", wait: ".fl" },
  { slug: "feature-rail", path: "/feature-rail", wait: ".features-sec" },
  { slug: "blueprint", path: "/blueprint", wait: ".ch" },
  { slug: "spaceman-moon", path: "/spaceman-moon", wait: ".nudge" },
  { slug: "light-rays", path: "/light-rays", wait: ".ae" },
  { slug: "prompt-bar", path: "/prompt-bar", wait: ".ic" },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(async () => {
    const images = [...document.images];
    await Promise.all(
      images.map((img) =>
        img.complete
          ? null
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );

    const videos = [...document.querySelectorAll("video")];
    await Promise.all(
      videos.map((video) => {
        if (video.readyState >= 2) return null;
        return new Promise((resolve) => {
          video.addEventListener("loadeddata", resolve, { once: true });
          video.addEventListener("error", resolve, { once: true });
        });
      }),
    );
  });

  await delay(2800);

  await page.evaluate(() => {
    for (const video of document.querySelectorAll("video")) {
      try {
        video.pause();
        if (video.duration && Number.isFinite(video.duration)) {
          video.currentTime = Math.min(1.2, video.duration * 0.15);
        }
      } catch {
        /* ignore */
      }
    }
  });

  await delay(400);
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--hide-scrollbars",
    "--disable-font-subpixel-positioning",
    `--window-size=${WIDTH},${HEIGHT}`,
    `--force-device-scale-factor=${SCALE}`,
  ],
  defaultViewport: { width: WIDTH, height: HEIGHT, deviceScaleFactor: SCALE },
});

await fs.mkdir(OUT_DIR, { recursive: true });

const page = await browser.newPage();
const results = [];

for (const entry of PAGES) {
  const url = `${BASE}${entry.path}`;
  const file = path.join(OUT_DIR, `${entry.slug}.png`);
  console.log(`capturing ${entry.slug} ← ${url}`);

  await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
  await page.waitForSelector(entry.wait, { timeout: 20000 });
  await settle(page);

  await page.screenshot({
    path: file,
    type: "png",
    fullPage: !entry.stage,
    captureBeyondViewport: !entry.stage,
  });

  const stat = await fs.stat(file);
  results.push({ slug: entry.slug, file, bytes: stat.size });
  console.log(`  wrote ${file} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
}

await browser.close();

console.log("");
console.log(`exported ${results.length} pages to ${OUT_DIR}`);
for (const result of results) {
  console.log(`- ${result.slug}.png`);
}
