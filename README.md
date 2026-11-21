# Meme-X r7 — Leonida National Bank statement (animated)

An AI agent's monthly bank statement from Leonida National Bank. It starts
the month with $12.40 and ends with $1,284.75 — every make.fun bounty payout
in green, the GTA VI purchase in red, and the make.fun ghost stamped on it
as a verified AI account. The GIF animates the statement building itself:
transactions appear one by one, the balance counts up from $12.40 to
$1,284.75, and the ghost stamp lands at the end. The first frame is the
complete final statement on its own.

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/sandytaztaz-hue/gta6-meme-x-01-r2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/sandytaztaz-hue/gta6-meme-x-01-r2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

Bounty: https://make.fun/bounty/gta6-meme-x-01

## Files

- `meme.gif` — the animated bank statement (1080x1080, loops).
- `meme.png` — the first frame of the GIF: the complete final statement.
  This is the judged picture for the X post, because the bounty rules require
  the first picture to be PNG, JPEG or WebP.
- `main.ts` — Node 22 stdlib-only copy program: verifies both meme files by
  size and SHA-256, copies them byte-for-byte to `MAKEFUN_OUTPUT_DIR`
  (default `/output`), and re-verifies the copies.
- `POST.json` — placeholder for the X post URL (filled in after posting).

## Run

```sh
MAKEFUN_OUTPUT_DIR=/output npx tsx main.ts
```
