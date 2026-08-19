import { spawn } from "node:child_process";
import { once } from "node:events";
import path from "node:path";
import os from "node:os";
import puppeteer from "puppeteer-core";

const FPS = 60;
const DURATION = 12;
const FRAMES = Math.round(FPS * DURATION);
const WIDTH = 1920;
const HEIGHT = 1080;
const URL = process.env.HERO_URL ?? "http://127.0.0.1:5173/";
const OUT =
  process.env.HERO_OUT ??
  path.join(os.homedir(), "Downloads", "Reticle-hero-60fps.mp4");
const CHROME =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const FFMPEG =
  process.env.FFMPEG_PATH ??
  "C:\\Users\\Paulo Freitas\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe";

async function write(stream, data) {
  if (!stream.write(data)) await once(stream, "drain");
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: [
    "--hide-scrollbars",
    "--disable-font-subpixel-positioning",
    `--window-size=${WIDTH},${HEIGHT}`,
    "--force-device-scale-factor=1",
  ],
  defaultViewport: { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1 },
});

const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle0", timeout: 30000 });
await page.evaluate(() => document.fonts.ready);
await page.waitForSelector(".orb-canvas");
await page.waitForFunction(() => Boolean(window.__reticleHero), { timeout: 10000 });
await page.evaluate(() => window.__reticleHero.pause());

const ff = spawn(
  FFMPEG,
  [
    "-y",
    "-f",
    "image2pipe",
    "-vcodec",
    "png",
    "-framerate",
    String(FPS),
    "-i",
    "pipe:0",
    "-c:v",
    "libx264",
    "-preset",
    "slow",
    "-crf",
    "14",
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "high",
    "-movflags",
    "+faststart",
    "-an",
    OUT,
  ],
  { stdio: ["pipe", "inherit", "inherit"] },
);

const ffDone = once(ff, "close");

for (let i = 0; i < FRAMES; i++) {
  const seconds = i / FPS;
  await page.evaluate((t) => window.__reticleHero.seek(t), seconds);
  const png = await page.screenshot({ type: "png", captureBeyondViewport: false });
  await write(ff.stdin, png);
  if (i % 60 === 0 || i === FRAMES - 1) {
    console.log(`frame ${i + 1}/${FRAMES}`);
  }
}

ff.stdin.end();
const [code] = await ffDone;
await browser.close();

if (code !== 0) {
  throw new Error(`ffmpeg exited ${code}`);
}

console.log(`wrote ${OUT}`);
console.log(`${FRAMES} frames, ${FPS} fps, ${DURATION}s`);
