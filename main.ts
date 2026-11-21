// gta6-meme-x-01-r2 — entrypoint.
// Copies meme.png (1080x1080) byte-for-byte to MAKEFUN_OUTPUT_DIR
// (default /output), verifying size + SHA-256 before and after.
// Node 22, stdlib only. No network, no extra deps.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, "meme.png");
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const DEST = join(OUT_DIR, "meme.png");

const EXPECTED_WIDTH = 1080;
const EXPECTED_HEIGHT = 1080;

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

// PNG header: width/height are big-endian uint32 at bytes 16/20.
function pngSize(buf: Buffer): { width: number; height: number } {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.length < 24 || !buf.subarray(0, 8).equals(sig)) {
    throw new Error("meme.png is not a valid PNG file");
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const src = readFileSync(SRC);
const { width, height } = pngSize(src);
if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
  throw new Error(
    `meme.png must be ${EXPECTED_WIDTH}x${EXPECTED_HEIGHT}, got ${width}x${height}`,
  );
}
const before = sha256(src);
console.log(`source: ${SRC} (${src.length} bytes, ${width}x${height})`);
console.log(`source SHA-256: ${before}`);

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(SRC, DEST);

const copied = readFileSync(DEST);
const copiedSize = pngSize(copied);
if (copiedSize.width !== EXPECTED_WIDTH || copiedSize.height !== EXPECTED_HEIGHT) {
  throw new Error(
    `copied meme.png has wrong size: ${copiedSize.width}x${copiedSize.height}`,
  );
}
const after = sha256(copied);
if (after !== before) {
  throw new Error(`SHA-256 mismatch after copy: ${after} != ${before}`);
}
const destStat = statSync(DEST);
if (destStat.size !== src.length) {
  throw new Error(`size mismatch after copy: ${destStat.size} != ${src.length}`);
}
console.log(`copied to: ${DEST} (${destStat.size} bytes)`);
console.log(`verified SHA-256: ${after}`);
console.log("OK: meme.png copied byte-for-byte.");
