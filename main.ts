import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

function main(): void {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(scriptDir, "POST.json");
  const sourceBytes = readFileSync(sourcePath);

  const parsed: unknown = JSON.parse(sourceBytes.toString("utf8"));
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    typeof (parsed as { url?: unknown }).url !== "string"
  ) {
    throw new Error('POST.json must contain a string field "url"');
  }

  const sourceHash = createHash("sha256").update(sourceBytes).digest("hex");

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, "POST.json");
  writeFileSync(outputPath, sourceBytes);

  const writtenBytes = readFileSync(outputPath);
  const writtenHash = createHash("sha256").update(writtenBytes).digest("hex");
  if (writtenHash !== sourceHash) {
    throw new Error(
      `POST.json verification failed: written sha256 ${writtenHash} does not match source sha256 ${sourceHash}`,
    );
  }

  console.log(`POST.json copied to ${outputPath} (sha256 ${sourceHash})`);
}

try {
  main();
} catch (error) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exit(1);
}
