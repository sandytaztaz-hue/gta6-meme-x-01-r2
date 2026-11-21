// Meme-X — the program's only job is to deliver POST.json to the output dir.
// RULES.txt: "Your program, main.ts at the root (Node 22), copies POST.json
// from the repository to /output; that is all it has to do."
// The house reads the post itself from X via the URL inside POST.json, so no
// image files are copied here.
import { createHash } from "node:crypto";
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TAG = "[meme-x]";
const SRC_NAME = "POST.json";

const repoDir = dirname(fileURLToPath(import.meta.url));
const source = join(repoDir, SRC_NAME);

function abort(stage: string, problem: unknown): never {
  const why = problem instanceof Error ? problem.message : String(problem);
  console.error(`${TAG} FAILED during "${stage}": ${why}`);
  process.exit(1);
}

function digest(bytes: Buffer): string {
  return createHash("sha256").update(bytes).digest("hex");
}

// 1. Load the source bytes.
let original: Buffer;
try {
  original = readFileSync(source);
} catch (err) {
  abort(`read ${SRC_NAME}`, err);
}

// 2. Parse it and check the url field: a usable, non-empty https link.
let doc: unknown;
try {
  doc = JSON.parse(original.toString("utf8"));
} catch (err) {
  abort(`parse ${SRC_NAME}`, err);
}
if (typeof doc !== "object" || doc === null || Array.isArray(doc)) {
  abort(`validate ${SRC_NAME}`, new Error("top level must be a JSON object"));
}
const { url } = doc as { url?: unknown };
if (typeof url !== "string" || url.trim().length === 0) {
  abort(`validate ${SRC_NAME}`, new Error('"url" must be a non-empty string'));
}
if (/\s/.test(url)) {
  abort(`validate ${SRC_NAME}`, new Error('"url" must not contain whitespace'));
}
let target: URL;
try {
  target = new URL(url.trim());
} catch {
  abort(`validate ${SRC_NAME}`, new Error(`"url" is not a parseable URL: ${url}`));
}
if (target.protocol !== "https:") {
  abort(`validate ${SRC_NAME}`, new Error(`"url" must be https, got ${target.protocol}`));
}
if (target.hostname.length === 0) {
  abort(`validate ${SRC_NAME}`, new Error('"url" must include a hostname'));
}

const sourceDigest = digest(original);

// 3. Make sure the output directory exists.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
try {
  mkdirSync(outDir, { recursive: true });
} catch (err) {
  abort(`create output dir ${outDir}`, err);
}

// 4. Copy byte-for-byte.
const dest = join(outDir, SRC_NAME);
try {
  copyFileSync(source, dest);
} catch (err) {
  abort(`copy ${SRC_NAME} to ${dest}`, err);
}

// 5. Read the copy back and confirm it is identical.
let copied: Buffer;
try {
  copied = readFileSync(dest);
} catch (err) {
  abort(`re-read ${dest}`, err);
}
const copiedDigest = digest(copied);
if (copied.length !== original.length) {
  abort(
    "verify copied file",
    new Error(
      `size mismatch: output ${copied.length} bytes != source ${original.length} bytes`,
    ),
  );
}
if (copiedDigest !== sourceDigest) {
  abort(
    "verify copied file",
    new Error(
      `hash mismatch: output ${copiedDigest} != source ${sourceDigest}`,
    ),
  );
}

console.log(
  `${TAG} OK: ${SRC_NAME} copied and hash-verified ` +
    `(${original.length} bytes, sha256 ${sourceDigest}) ` +
    `for ${url.trim()} -> ${dest}`,
);
