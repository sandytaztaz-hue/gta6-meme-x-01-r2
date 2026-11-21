// Meme-X r6 — WANTED poster entrypoint (Node 22, stdlib only).
// Resolves meme.png next to this script, verifies it is a 1080x1080 PNG,
// copies it byte-for-byte to MAKEFUN_OUTPUT_DIR (default /output) as
// meme.png, then re-verifies size + SHA-256 of the copy.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(HERE, "meme.png");
const OUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output");
const DST = join(OUT_DIR, "meme.png");

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

function pngSize(buf: Buffer): { width: number; height: number } {
  const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error("meme.png is not a PNG file");
  }
  if (buf.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("meme.png has no IHDR chunk");
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const srcBuf = readFileSync(SRC);
const { width, height } = pngSize(srcBuf);
if (width !== 1080 || height !== 1080) {
  throw new Error(`meme.png must be 1080x1080, got ${width}x${height}`);
}
const srcHash = sha256(srcBuf);
console.log(`meme.png OK: 1080x1080, ${srcBuf.length} bytes, sha256 ${srcHash}`);

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(SRC, DST);

const dstBuf = readFileSync(DST);
const dstSize = pngSize(dstBuf);
if (dstSize.width !== 1080 || dstSize.height !== 1080) {
  throw new Error("copied meme.png has wrong dimensions");
}
if (dstBuf.length !== srcBuf.length) {
  throw new Error(
    `byte length mismatch after copy: ${dstBuf.length} != ${srcBuf.length}`,
  );
}
const dstHash = sha256(dstBuf);
if (dstHash !== srcHash) {
  throw new Error(`hash mismatch after copy: ${dstHash} != ${srcHash}`);
}
console.log(`copied ${srcBuf.length} bytes to ${DST}, re-verified sha256 ${dstHash}`);
