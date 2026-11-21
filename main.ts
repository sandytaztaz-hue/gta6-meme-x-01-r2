import { createHash } from 'node:crypto';
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(scriptDir, 'POST.json');

function fail(step: string, err: unknown): never {
  const detail = err instanceof Error ? err.message : String(err);
  console.error(`[meme-x] FAILED at step "${step}": ${detail}`);
  process.exit(1);
}

function sha256(bytes: Buffer): string {
  return createHash('sha256').update(bytes).digest('hex');
}

function main(): void {
  // Step 1: read POST.json next to this script.
  let sourceBytes: Buffer;
  try {
    sourceBytes = readFileSync(sourcePath);
  } catch (err) {
    fail('read POST.json', err);
  }

  // Step 2: parse + validate the url field.
  let post: unknown;
  try {
    post = JSON.parse(sourceBytes.toString('utf8'));
  } catch (err) {
    fail('parse POST.json', err);
  }

  if (typeof post !== 'object' || post === null || !('url' in post)) {
    fail('validate POST.json', new Error('missing required "url" field'));
  }
  const url = (post as { url: unknown }).url;
  if (typeof url !== 'string' || url.trim() === '') {
    fail('validate POST.json', new Error('"url" must be a non-empty string'));
  }
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch (err) {
    fail('validate POST.json', new Error(`"url" is not a valid URL: ${url}`));
  }
  if (parsed.protocol !== 'https:') {
    fail('validate POST.json', new Error(`"url" must use https, got ${parsed.protocol}`));
  }
  if (!parsed.hostname) {
    fail('validate POST.json', new Error('"url" must have a non-empty hostname'));
  }

  // Step 3: hash the source bytes.
  const sourceHash = sha256(sourceBytes);

  // Step 4: resolve + create the output dir.
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
  try {
    mkdirSync(outDir, { recursive: true });
  } catch (err) {
    fail(`create output dir ${outDir}`, err);
  }

  // Step 5: copy POST.json byte-for-byte.
  const outPath = join(outDir, 'POST.json');
  try {
    copyFileSync(sourcePath, outPath);
  } catch (err) {
    fail(`copy POST.json to ${outPath}`, err);
  }

  // Step 6: re-read the output and verify the hash matches.
  let outBytes: Buffer;
  try {
    outBytes = readFileSync(outPath);
  } catch (err) {
    fail(`re-read output ${outPath}`, err);
  }
  const outHash = sha256(outBytes);
  if (outHash !== sourceHash) {
    fail(
      'verify output hash',
      new Error(`output SHA-256 ${outHash} does not match source SHA-256 ${sourceHash}`),
    );
  }

  console.log(
    `[meme-x] OK: POST.json copied and hash-verified (${sourceBytes.length} bytes, ` +
      `sha256 ${sourceHash}) for ${url} -> ${outPath}`,
  );
}

main();
