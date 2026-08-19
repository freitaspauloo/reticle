import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const W = 480;
const H = 480;
const FFMPEG =
  process.env.FFMPEG_PATH ??
  "C:\\Users\\Paulo Freitas\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe";
const OUT_DIR = path.join(process.cwd(), "public");

const BAYER = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];

function mix(a, b, t) {
  const u = Math.min(1, Math.max(0, t));
  return [
    a[0] + (b[0] - a[0]) * u,
    a[1] + (b[1] - a[1]) * u,
    a[2] + (b[2] - a[2]) * u,
  ];
}

function blob(x, y, cx, cy, r) {
  const d = Math.hypot(x - cx, y - cy);
  return Math.max(0, 1 - d / r) ** 1.35;
}

function quantize(v, levels, threshold) {
  const n = levels - 1;
  const q = v / 255 + (threshold - 0.5) * (0.92 / n);
  const i = Math.max(0, Math.min(n, Math.round(q * n)));
  return (i / n) * 255;
}

function render(name, sample) {
  const buf = Buffer.alloc(W * H * 3);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const [r, g, b] = sample(x / (W - 1), y / (H - 1));
      const t = (BAYER[y & 7][x & 7] + 0.5) / 64;
      const o = (y * W + x) * 3;
      buf[o] = quantize(r, 7, t);
      buf[o + 1] = quantize(g, 7, t);
      buf[o + 2] = quantize(b, 7, t);
    }
  }
  const raw = path.join(OUT_DIR, `${name}.rgb`);
  const png = path.join(OUT_DIR, `${name}.png`);
  fs.writeFileSync(raw, buf);
  const res = spawnSync(
    FFMPEG,
    ["-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", `${W}x${H}`, "-i", raw, png],
    { stdio: "ignore" },
  );
  fs.unlinkSync(raw);
  if (res.status !== 0) throw new Error(`ffmpeg failed for ${name}`);
  console.log(png);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const ice = [148, 184, 204];
const lilac = [92, 88, 148];
const mint = [112, 176, 172];
const paper = [236, 240, 242];
const slate = [36, 48, 72];

render("dither-card-1", (u, v) => {
  let c = mix(ice, lilac, v * 0.55 + u * 0.12);
  c = mix(c, mint, blob(u, v, 0.2, 0.3, 0.5) * 0.55);
  c = mix(c, paper, blob(u, v, 0.58, 0.2, 0.38) * 0.7);
  c = mix(c, slate, blob(u, v, 0.88, 0.86, 0.55) * 0.65);
  c = mix(c, lilac, blob(u, v, 0.78, 0.7, 0.42) * 0.35);
  return c;
});

const navy = [8, 28, 36];
const teal = [18, 92, 96];
const foam = [186, 224, 214];
const copper = [196, 122, 72];

render("dither-card-2", (u, v) => {
  let c = mix(navy, teal, 0.35 + v * 0.4);
  c = mix(c, foam, blob(u, v, 0.72, 0.22, 0.48) ** 0.85);
  c = mix(c, copper, blob(u, v, 0.28, 0.72, 0.4) * 0.55);
  c = mix(c, paper, blob(u, v, 0.58, 0.12, 0.28) * 0.5);
  return c;
});

const magenta = [214, 0, 191];
const orchid = [156, 64, 180];
const peach = [244, 176, 168];
const ink = [42, 8, 48];

render("dither-card-3", (u, v) => {
  let c = mix(orchid, magenta, 0.25 + (1 - v) * 0.35);
  c = mix(c, peach, blob(u, v, 0.3, 0.2, 0.5) * 0.75);
  c = mix(c, ink, blob(u, v, 0.88, 0.82, 0.55) * 0.55);
  c = mix(c, paper, blob(u, v, 0.55, 0.42, 0.32) * 0.4);
  return c;
});
