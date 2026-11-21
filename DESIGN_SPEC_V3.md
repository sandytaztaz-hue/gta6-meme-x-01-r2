# DESIGN SPEC — Meme-X v3: LEONIDA MUTUAL insurance claim (r11 revision)

## Goal
Sand REJECTED wedding v2 as ugly ("Jelek bro", 05:59 WIT Nov 22). New order: revise like
the top 1–5 — study what makes them interesting, their content, make it funny and detailed.
DO NOT submit wedding v2 (meme-wedding-v2.png) — it is dead. Deadline Nov 23 23:00 WIT.
Sand posts on X himself and must approve before any resubmit. Day cap resets 09:00 WIT.

## TOP-5-FIRST — studied live 06:0x WIT Nov 22 (renders read, judge values live)
All 12W/0D/0L clean sheets. Judge = pairwise on: make.fun ghost/logo FIRST, humour, GTA6
fit, selling make.fun, caption, originality, clean image.
- #1 miku39-lab 90.38% — LEONIDA RENT-A-CAR return receipt. 5 line-item gags, stamp
  "13 YEARS LATE", checkboxes, TOTAL DUE $2,026. Ghost big in magenta footer.
- #2 witty-kestrel-54 90.38% — VICE CITY FUNERAL HOME obituary "GTA V finally died."
  Illustration panel (coffin, gator in suit, ghost with PAID stamp), struck-through delays.
- #3 cogaich 90.17% — LEONIDA MART receipt. 8 game-cover strip, skyline illustration,
  "NOW SERVING #2013", "PAID IN FULL" stamp. Billing handled by make.fun.
- #4 irvan-motion 90.17% — LEONIDA TIMES obituary. Ghost in oval portrait, "Died 1 day
  before GTA VI", 4,810 days, pool gator, "Expected to respawn at Vice City General."
- #5 ryukein19 89.75% — STEAM invoice. Itemised $0.00s + game $79.99, "charged in youth",
  "family photos, deleted", 99% progress bar, "non-returnable" wait.

## Winning pattern (all 5)
1. Clean DOCUMENT format, instantly recognisable — the format IS the joke vehicle.
2. DENSITY: 6–10 DISTINCT gags; every line item is a joke. Never one gag restated.
3. The 13-year wait in MULTIPLE angles (dates, delays, day counts, age, youth).
4. Specific numbers as jokes: 4,810 days, 214 GB, 99%, $2,026, #2013, $79.99.
5. Delays as struck-through / waived items (Fall 2025, May 2026).
6. Ghost worked INTO the design (footer, portrait, centre circle) + pitch in the
   document's own voice. Never a pasted sticker.
7. A stamp/seal element. 8. Strong colour blocking (dark header + magenta footer).
9. Clean, readable at small size; one visual anchor.

## Why wedding v2 failed (read the render myself)
Elegant but STATIC and flat: big empty ivory space, thin serif text, top half is just
names. "FINALLY!" stamp is CLIPPED at the right edge (runs off canvas). Ghost sits in a
black circle like a sticker. Magenta footer has dead space on the right. No illustration,
no visual energy, no density — reads as a plain text document, not a meme. The format's
decorum caps the joke count. Sand: "jelek".

## v3 concept — FRESH document type: AUTO INSURANCE CLAIM
**LEONIDA MUTUAL — AUTO CLAIM FORM, "CLAIM APPROVED".** Nobody in the top 10 uses a
claim form (top 10 = 2 receipts, funeral bill, obituary, Steam invoice, library overdue,
hurricane alert, certificate of release, birth announcement, newspaper front page).
The pitch writes itself: the SETTLEMENT is paid by the agent's bounty. Insurance-native
jokes no receipt can do: "pre-existing condition", "acts of Rockstar", "deductible: 13
years of patience", "adjuster still waiting". Structure mirrors #5's proven $0.00s +
one real price — all CONTENT is new.

## Gags (9 distinct, none restates another)
1. Date of loss Sep 17, 2013 → reported Nov 19, 2026 (13 years to file a claim).
2. Loss of use — 4,811 days without GTA VI.
3. Childhood, one (1) — consumed while waiting.
4. Storage cleared — family photos deleted, 214 GB.
5. Download stuck at 99% — adjuster still waiting.
6. Two delays — Fall 2025, May 2026 — "acts of Rockstar", not covered.
7. Alligator damage — back seat (occupant, not cleaning — different angle from #1).
8. Deductible — 13 years of patience.
9. "The 13-year wait is a pre-existing condition." (adjuster note — insurance-native)
+ Passengers Jason, Lucia & one alligator (meta line). Settlement $79.99 = the game.

## Format
- 1080 x 1080 px square PNG.
- Output file: /home/hatch/workspace/makefun/gta6-meme-x-01-r2/meme-claim-v3.png
  (FRESH filename — do NOT overwrite wedding files).
- Render with Python + PIL (Image, ImageDraw, ImageFont). NO AI image generation for the
  document — AI text garbles and this entry lives or dies on perfect text.
- Composite the REAL make.fun ghost from the PNG file (do not draw or AI-generate it).

## Palette (exact RGB)
- Navy header: (16, 28, 54)
- Paper: ivory (250, 246, 236)
- Ink: near-black (32, 32, 44)
- Label gray: (110, 110, 125)
- Gold rule: (176, 141, 60)
- Magenta band: (222, 0, 130)
- Stamp red: (200, 16, 46)
- White: (255, 255, 255)
- Box fill: white (255, 255, 255); box border navy 2px

## Fonts (all in /usr/share/fonts/truetype/liberation/)
- LiberationSans-Bold.ttf — headers, totals, stamp, footer line 1
- LiberationSans-Regular.ttf — body, table rows, footer line 2
- LiberationSans-Italic.ttf — adjuster note
- Helper: fit_font(text, path, start_size, max_width) shrinks until
  draw.textlength(text, font) <= max_width.

## Layout (1080x1080, top to bottom)
1. Header band (navy, y 0–148, full width).
   - Ghost badge: white circle ring at x 36–132, y 26–122; real ghost pasted whole
     inside (~84 px). Ghost is white on transparent — reads on navy.
   - "LEONIDA MUTUAL" (Sans Bold ~54 px, white) x 150, y ~34.
   - "AUTO INSURANCE · CLAIM FORM" (Sans Regular ~23 px, letter-spaced, #B9C4DC)
     x 150, y ~98.
   - Right-aligned: "CLAIM NO. VI-000013" (Sans Bold ~26 px, white) y ~36;
     "FILED NOV 19, 2026" (Sans Regular ~22 px, #B9C4DC) y ~70. Right edge x 1044.
2. Meta section (y 168–300), two columns, label (gray ~19 px small caps) over value
   (ink Sans Bold ~28 px). Left col x 48; right col x 580.
   - POLICYHOLDER / One patient gamer | POLICY NO. / GTA-VI-000013
   - VEHICLE / 2013 sedan — parked since 2013 | DATE OF LOSS / Sep 17, 2013
   - LOCATION / Ocean Drive, Vice City, Leonida | DATE REPORTED / Nov 19, 2026
   Row height ~52 px (value glyphs need the clearance — 42 px overlapped in v3 draft 1).
   Thin gold rule under the section.
3. Incident box (white fill, navy 2 px border, x 48–1032, y ~318–412).
   - Label "DESCRIPTION OF INCIDENT" (Sans Bold ~21 px, navy) inside top.
   - Text (Sans Regular ~25 px, ink, 2 lines): "Vehicle left parked in Los Santos in
     2013. Returned to Vice City 13 years later. Driver still waiting — passengers
     Jason, Lucia & one alligator still in the back seat."
   - Third line (Sans Italic ~24 px, magenta): "No injuries — except one childhood."
4. Stamp: "CLAIM APPROVED" (Sans Bold ~40 px, stamp red, rotated about -10°),
   top-right of the incident box (x ~670–1031, y ~316–466). Incident text is wrapped
   NARROW (580 px) so its lines end by x ~644, clear of the stamp; the stamp's
   bottom clears the table title (y 484). Draw text on a separate RGBA layer,
   rotate, composite. Add a thin double border rect around the stamp text (stamp look).
5. Damages table (y ~430–790).
   - Title "ITEMISED DAMAGES" (Sans Bold ~24 px, navy) left; "AMOUNT" right.
   - 8 rows, ~36 px each, dotted leaders between description and amount:
     Loss of use — 4,811 days without GTA VI — $0.00
     Childhood, one (1) — consumed while waiting — $0.00
     Storage cleared — family photos deleted, 214 GB — $0.00
     Download stuck at 99% — adjuster still waiting — $0.00
     Two delays — Fall 2025, May 2026 (acts of Rockstar) — $0.00
     Alligator damage — back seat — $0.00
     Deductible — 13 years of patience — $0.00
     Grand Theft Auto VI — standard edition, finally — $79.99
   - Total row (top rule, Sans Bold ~30 px): "TOTAL SETTLEMENT" — "$79.99".
6. Adjuster note (Sans Italic ~19 px, gray-ink, y ~816): "Adjuster notes: claimant
   outlived two delays and one gator. The 13-year wait is a pre-existing condition."
   fit_font so it fits one line within x 48–1032.
7. Footer band (magenta, y 842–1080, full width, 238 px tall).
   - Ghost: the REAL make.fun ghost, WHOLE with star badge, ~208 px tall, pasted
     with alpha mask, left side (x ~50–275), vertically centered. NO text overlaps it.
   - Footer text (white, left-aligned starting x ~300):
     Line 1 (Sans Bold ~36 px): "SETTLEMENT PAID BY MY AI AGENT"
     Line 2 (Sans Regular ~27 px): "with a bounty payout it earned on"
     Line 3: white pill (rounded rect ~200x58 px) with magenta Sans Bold ~34 px
     text "make.fun" centered inside.
     Line 4 (Sans Regular ~19 px, white 85%): "Play code: makefun-pipeline-lilac-walrus"
     Use fit_font so no line runs past x ~1030. Clear gap between ghost and text.

## Text (exact — check every word for spelling)
- "LEONIDA MUTUAL" / "AUTO INSURANCE · CLAIM FORM"
- "CLAIM NO. VI-000013" / "FILED NOV 19, 2026"
- "POLICYHOLDER" / "One patient gamer" / "POLICY NO." / "GTA-VI-000013"
- "VEHICLE" / "2013 sedan — parked since 2013" / "DATE OF LOSS" / "Sep 17, 2013"
- "LOCATION" / "Ocean Drive, Vice City, Leonida" / "DATE REPORTED" / "Nov 19, 2026"
- "DESCRIPTION OF INCIDENT"
- "Vehicle left parked in Los Santos in 2013. Returned to Vice City 13 years later.
  Driver still waiting — passengers Jason, Lucia & one alligator still in the back seat."
- "No injuries — except one childhood."
- "CLAIM APPROVED" (stamp)
- "ITEMISED DAMAGES" / "AMOUNT"
- "Loss of use — 4,810 days without GTA VI" / "Childhood, one (1) — consumed while waiting"
- "Storage cleared — family photos deleted, 214 GB" / "Download stuck at 99% — adjuster still waiting"
- "Two delays — Fall 2025, May 2026 (acts of Rockstar)" / "Alligator damage — back seat"
- "Deductible — 13 years of patience" / "Grand Theft Auto VI — standard edition, finally"
- "TOTAL SETTLEMENT" / "$79.99" / "$0.00"
- "Adjuster notes: claimant outlived two delays and one gator. The 13-year wait is a pre-existing condition."
- "SETTLEMENT PAID BY MY AI AGENT" / "with a bounty payout it earned on" / "make.fun"
- "Play code: makefun-pipeline-lilac-walrus"

## Caption draft for Sand's X post (short, readable — he posts it)
Option A: "Filed a claim for 13 years of waiting. My AI agent paid the settlement with
its make.fun bounty. makefun-pipeline-lilac-walrus @makefunai"
Option B: "My car was parked in Los Santos since 2013. Filed the claim — my AI agent
paid it with its make.fun bounty. makefun-pipeline-lilac-walrus @makefunai"

## Verification checklist (before reporting — read the rendered PNG yourself)
- [ ] Image is 1080x1080 PNG at .../meme-claim-v3.png.
- [ ] Every word spelled correctly (read the image, don't trust the code).
- [ ] 9 distinct gags visible; none restates another; no wedding content.
- [ ] No text overlaps; clear gaps; stamp does not cover any text.
- [ ] Ghost is whole with star badge, prominent, no text overlapping it.
- [ ] Footer has ghost + "SETTLEMENT PAID BY MY AI AGENT" + make.fun pill + play code.
- [ ] Dates read Sep 17, 2013 → Nov 19, 2026; "4,811 days" correct (Sep 17 2013 →
      Nov 19 2026 = 4,811 days, verified with `date`).
- [ ] Layout looks like a real insurance claim form (clean, dense, not cluttered).
- [ ] Reads clearly at 512px (the size the judge's preview shows).

## Do NOT
- Do NOT submit anything, do not commit, do not push. Report the finished render.
- Do NOT use AI image generation for the document (text garbles).
- Do NOT AI-generate or redraw the make.fun ghost — use the real PNG file.
- Do NOT reuse any wedding text, image, or layout.
- Do NOT copy #1's "$2,026" total or #5's "non-returnable" footer line.
- Do NOT put the stamp over any text or over the ghost.
