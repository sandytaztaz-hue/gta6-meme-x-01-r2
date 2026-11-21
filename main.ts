// Meme-X r5 — copy program (Node 22, stdlib only).
// Copies meme.png (next to this script) byte-for-byte into
// MAKEFUN_OUTPUT_DIR (default /output), verifying size + SHA-256
// before and after the copy.
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SRC_NAME = "meme.png";
const EXPECTED_WIDTH = 1080;
const EXPECTED_HEIGHT = 1080;

function sha256(buf: Buffer): string {
  return createHash("sha256").update(buf).digest("hex");
}

function pngSize(buf: Buffer): { width: number; height: number } {
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) {
    throw new Error("meme.png is not a PNG file");
  }
  // IHDR must be the first chunk: length 13 at offset 8, type "IHDR" at 12.
  if (buf.readUInt32BE(8) !== 13 || buf.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("meme.png has no IHDR chunk where expected");
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const src = join(scriptDir, SRC_NAME);
  if (!existsSync(src)) throw new Error(`missing ${src}`);
  const data = readFileSync(src);
  const { width, height } = pngSize(data);
  if (width !== EXPECTED_WIDTH || height !== EXPECTED_HEIGHT) {
    throw new Error(`meme.png is ${width}x${height}, expected 1080x1080`);
  }
  const before = sha256(data);

  const outDir = resolve(process.env.MAKEFUN_OUTPUT_DIR?.trim() || "/output");
  mkdirSync(outDir, { recursive: true });
  const dest = join(outDir, SRC_NAME);
  copyFileSync(src, dest);

  const copied = readFileSync(dest);
  const after = sha256(copied);
  if (after !== before) throw new Error("SHA-256 mismatch after copy");
  if (copied.length !== data.length) throw new Error("byte length mismatch after copy");

  console.log(`copied ${SRC_NAME} (${width}x${height}, ${data.length} bytes)`);
  console.log(`sha256: ${before}`);
  console.log(`-> ${dest}`);
}

main();
