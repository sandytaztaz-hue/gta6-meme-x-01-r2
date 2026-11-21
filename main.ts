// Meme-X r8 fix1 — OCEAN DRIVE MOTORS vehicle return receipt (animated GIF + PNG).
// Stdlib-only copy program: verifies meme.gif + meme.png (magic bytes,
// dimensions, size, SHA-256) and copies them byte-for-byte to
// MAKEFUN_OUTPUT_DIR (default /output), then re-verifies the copies.
import { createHash } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const FILES = ["meme.gif", "meme.png"] as const;

// Expected bytes for the r8 fix1 render (ghost shifted right, badge clean,
// stronger magenta band). Regenerate with `sha256sum meme.gif meme.png`
// after any re-render and update these two lines.
const EXPECTED: Record<string, { sha256: string; size: number }> = {
  "meme.gif": {
    sha256: "d76a9c4302c1da9418bfae102c55dfdbae4dc2c84144c29f0de9329cc87d6726",
    size: 776301,
  },
  "meme.png": {
    sha256: "699086269a447f2b93e805a5219c7c56603c1f9f90c15b4df191c6923366eb52",
    size: 204167,
  },
};

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

function checkGif(buf: Buffer): string {
  const magic = buf.subarray(0, 6).toString("ascii");
  if (magic !== "GIF89a" && magic !== "GIF87a") throw new Error(`bad GIF magic: ${magic}`);
  const w = buf.readUInt16LE(6);
  const h = buf.readUInt16LE(8);
  if (w !== 1080 || h !== 1080) throw new Error(`bad GIF size: ${w}x${h}`);
  return `${w}x${h}`;
}

function checkPng(buf: Buffer): string {
  const magic = buf.subarray(0, 8);
  const want = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!magic.equals(want)) throw new Error("bad PNG magic");
  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  if (w !== 1080 || h !== 1080) throw new Error(`bad PNG size: ${w}x${h}`);
  return `${w}x${h}`;
}

mkdirSync(OUT, { recursive: true });

const seenDims = new Set<string>();
let totalBytes = 0;

for (const name of FILES) {
  const src = join(HERE, name);
  if (!existsSync(src)) throw new Error(`missing ${src}`);
  const buf = readFileSync(src);
  const size = statSync(src).size;
  if (size === 0) throw new Error(`${name} is empty`);
  const dims = name.endsWith(".gif") ? checkGif(buf) : checkPng(buf);
  seenDims.add(dims);
  totalBytes += size;
  const digest = sha256(buf);
  const want = EXPECTED[name];
  if (digest !== want.sha256) {
    throw new Error(`${name} sha256 mismatch: got ${digest}, want ${want.sha256}`);
  }
  if (size !== want.size) {
    throw new Error(`${name} size mismatch: got ${size}, want ${want.size}`);
  }
  const dest = join(OUT, name);
  copyFileSync(src, dest);
  const copied = readFileSync(dest);
  if (sha256(copied) !== digest) throw new Error(`${name} copy mismatch`);
  console.log(`ok ${name} ${dims} ${size} bytes sha256=${digest}`);
}
if (seenDims.size !== 1) throw new Error(`dimension mismatch: ${[...seenDims].join(", ")}`);
const wantTotal = Object.values(EXPECTED).reduce((s, e) => s + e.size, 0);
if (totalBytes !== wantTotal) {
  throw new Error(`total bytes mismatch: got ${totalBytes}, want ${wantTotal}`);
}
console.log(`done: ${FILES.length} files, ${totalBytes} bytes copied to ${OUT}`);
