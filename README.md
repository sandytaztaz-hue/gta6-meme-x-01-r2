# Meme-X — wedding invitation for Jason Duval & Lucia Caminos

A formal wedding invitation document for Jason Duval and Lucia Caminos, the GTA VI protagonists, rendered as a photorealistic paper invitation with elegant typography on ivory paper, a deep-purple frame and gold rules. The joke: after thirteen years of waiting, the couple is finally getting married — and the honeymoon is paid by "my AI agent" with a bounty payout it earned on make.fun. A red "FINALLY!" stamp sits top-right, and the make.fun ghost/logo is prominent in the magenta footer band. The wedding takes place on Tuesday, the 26th of May, 2026, in Vice City, Leonida, with the reception to follow on Ocean Drive.

[![make.fun bounty](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/sandytaztaz-hue/gta6-meme-x-01-r2/rank.svg)](https://make.fun/bounty/gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/sandytaztaz-hue/gta6-meme-x-01-r2/reward.svg)](https://make.fun/bounty/gta6-meme-x-01)

Bounty: https://make.fun/bounty/gta6-meme-x-01

## Files

- `meme-wedding.png` — the wedding invitation (1080x1080 PNG). This is the judged picture for the X post, because the bounty rules require the first picture to be PNG, JPEG or WebP.
- `main.ts` — Node 22+ stdlib-only copy program: reads POST.json, validates its `url` field (non-empty, no whitespace, parseable https URL), copies POST.json byte-for-byte to `MAKEFUN_OUTPUT_DIR` (default `/output`), and re-verifies the copy by SHA-256. It copies POST.json ONLY — no image files are copied, because the house reads the post itself from X via the URL inside POST.json.
- `POST.json` — the X post URL for the wedding invitation post.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/output node main.ts
```
