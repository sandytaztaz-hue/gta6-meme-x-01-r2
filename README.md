# Meme-X r8 — OCEAN DRIVE MOTORS vehicle return receipt (animated)

A rental car return receipt for one night only: a 2026 Comet S2 Cabrio in
hot pink, picked up at Leonida Intl Airport on the evening of Nov 20, 2026
and returned to Ocean Drive the next morning after launch night — with a
$755 chaos bill (wrong-city GPS, police-chase scratches, glitter cleaning,
tolls on every bridge) paid by the driver's AI agent, funded by its
make.fun bounty wins. The GIF animates the receipt printing line by line:
the stamp lands, the line items appear one by one, the total counts up to
$755, and the make.fun ghost appears. The first frame is the complete
final receipt on its own.

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/sandytaztaz-hue/gta6-meme-x-01-r2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/sandytaztaz-hue/gta6-meme-x-01-r2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

Bounty: https://make.fun/bounty/gta6-meme-x-01

## Files

- `meme.gif` — the animated receipt (1080x1080, 20 frames, ~8.4s, loops).
- `meme.png` — the first frame of the GIF: the complete final receipt.
  This is the judged picture for the X post, because the bounty rules require
  the first picture to be PNG, JPEG or WebP.
- `main.ts` — Node 22+ stdlib-only copy program: verifies both meme files by
  magic bytes, dimensions and size, copies them byte-for-byte to
  `MAKEFUN_OUTPUT_DIR` (default `/output`), and re-verifies the copies
  by SHA-256.
- `POST.json` — placeholder for the X post URL (filled in after posting).

## Run

```sh
MAKEFUN_OUTPUT_DIR=/output node main.ts
```
