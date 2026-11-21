/**
 * gta6-meme-x-01 r3 — entrypoint.
 *
 * Copies meme.png (1080x1080 obituary) byte-for-byte to MAKEFUN_OUTPUT_DIR
 * (default /output), verifying size and SHA-256 before and after the copy.
 * Node 22, stdlib only. Every failure names the step that failed.
 */
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "meme.png");
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const DEST = join(OUT_DIR, "meme.png");
const EXPECTED = { width: 1080, height: 1080 } as const;

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function fail(step: string, err: unknown): never {
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`[meme-x] FAILED at step "${step}": ${detail}`);
  process.exit(1);
}

function sha256(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function pngSize(buf: Buffer): { width: number; height: number } {
  if (buf.length < 33 || !buf.subarray(0, 8).equals(PNG_MAGIC)) {
    throw new Error("meme.png is not a PNG file (bad 8-byte signature)");
  }
  if (buf.toString("ascii", 12, 16) !== "IHDR") {
    throw new Error("meme.png has no IHDR chunk at offset 12");
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function main(): void {
  // Step 1: read the source image next to this script.
  let sourceBytes: Buffer;
  try {
    sourceBytes = readFileSync(SOURCE);
  } catch (err) {
    fail("read meme.png", err);
  }

  // Step 2: validate it is a 1080x1080 PNG.
  let size: { width: number; height: number };
  try {
    size = pngSize(sourceBytes);
  } catch (err) {
    fail("validate PNG header", err);
  }
  if (size.width !== EXPECTED.width || size.height !== EXPECTED.height) {
    fail(
      "validate PNG dimensions",
      new Error(`meme.png must be 1080x1080, got ${size.width}x${size.height}`),
    );
  }
  const sourceHash = sha256(sourceBytes);
  console.log(
    `[meme-x] source OK: meme.png (${sourceBytes.length} bytes, ` +
      `${size.width}x${size.height}) sha256=${sourceHash}`,
  );

  // Step 3: create the output dir.
  try {
    mkdirSync(OUT_DIR, { recursive: true });
  } catch (err) {
    fail(`create output dir ${OUT_DIR}`, err);
  }

  // Step 4: copy byte-for-byte.
  try {
    copyFileSync(SOURCE, DEST);
  } catch (err) {
    fail(`copy meme.png to ${DEST}`, err);
  }

  // Step 5: re-read the output and verify byte count + SHA-256 match.
  let outBytes: Buffer;
  try {
    outBytes = readFileSync(DEST);
    const destStat = statSync(DEST);
    if (destStat.size !== sourceBytes.length) {
      throw new Error(`dest size ${destStat.size} != source size ${sourceBytes.length}`);
    }
  } catch (err) {
    fail("re-read output", err);
  }
  const outHash = sha256(outBytes);
  if (outHash !== sourceHash) {
    fail(
      "verify output hash",
      new Error(`output SHA-256 ${outHash} does not match source SHA-256 ${sourceHash}`),
    );
  }

  console.log(
    `[meme-x] OK: meme.png copied and verified ` +
      `(${outBytes.length} bytes, sha256 ${outHash}) -> ${DEST}`,
  );
}

main();
