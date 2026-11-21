// Meme-X r7 — Leonida National Bank statement (animated GIF + PNG first frame).
// Node 22 stdlib only. Copies the meme files next to this script byte-for-byte
// into MAKEFUN_OUTPUT_DIR (default /output) and re-verifies them there.
// The GIF is the animated deliverable; the PNG is its first frame, which is the
// complete final statement — the kit/X rules require the judged first picture
// to be PNG, JPEG or WebP (a GIF-only post is refused), so both ship together.
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const FILES = [
  {
    name: "meme.gif",
    sha256: "14718bdb2096b0147572ef41b5053b775bf86b5a7259fa812de10a874a3eb3b7",
    size: 338756,
  },
  {
    name: "meme.png",
    sha256: "fe034f648a67a36798212067d17091e33fd2f7aac4c511d0edd3fe33cd89cac6",
    size: 234124,
  },
];

function sha256(path: string): string {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

// Stricter validation: check magic bytes and the 1080x1080 dimensions parsed
// straight from each file's own header, before trusting the hash.
function checkImage(path: string): void {
  const buf = readFileSync(path);
  if (path.endsWith(".png")) {
    const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    if (!buf.subarray(0, 8).equals(pngMagic)) throw new Error(`${path}: bad PNG magic`);
    if (buf.toString("ascii", 12, 16) !== "IHDR") throw new Error(`${path}: bad PNG IHDR`);
    const w = buf.readUInt32BE(16);
    const h = buf.readUInt32BE(20);
    if (w !== 1080 || h !== 1080) throw new Error(`${path}: PNG is ${w}x${h}, want 1080x1080`);
  } else {
    const header = buf.toString("ascii", 0, 6);
    if (header !== "GIF89a" && header !== "GIF87a") {
      throw new Error(`${path}: bad GIF magic (${header})`);
    }
    const w = buf.readUInt16LE(6);
    const h = buf.readUInt16LE(8);
    if (w !== 1080 || h !== 1080) throw new Error(`${path}: GIF is ${w}x${h}, want 1080x1080`);
  }
}

mkdirSync(OUT, { recursive: true });

for (const file of FILES) {
  const src = join(HERE, file.name);
  if (!existsSync(src)) throw new Error(`missing source file: ${src}`);
  const size = statSync(src).size;
  if (size === 0) throw new Error(`empty source file: ${src}`);
  if (size !== file.size) {
    throw new Error(`${file.name}: size ${size}, expected ${file.size}`);
  }
  checkImage(src);
  const before = sha256(src);
  if (before !== file.sha256) {
    throw new Error(`${file.name}: SHA-256 mismatch (got ${before})`);
  }
  const dest = join(OUT, file.name);
  copyFileSync(src, dest);
  const after = sha256(dest);
  if (after !== file.sha256) {
    throw new Error(`${file.name}: copy verification failed (got ${after})`);
  }
  console.log(`${file.name}: ${size} bytes, sha256 ${after} -> ${dest} OK`);
}
console.log("done: meme.gif + meme.png copied and verified");
