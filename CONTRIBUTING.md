# CONTRIBUTING

PUMPBALL is a README-first project. Most useful contributions are small.

## Good first contributions

- Fix a typo or unclear sentence in the docs
- Report a fake contract address or impersonator (see [SECURITY.md](./SECURITY.md))
- Improve an SVG animation in `assets/`
- Tighten the draw demo in `scripts/`

## Ground rules

1. **Never invent data.** No made-up addresses, stats, dates, prizes or winners. If it is unknown, it is `TBA`.
2. **No promises.** Do not add wording that guarantees returns, prizes or outcomes.
3. **Keep it clean.** Short sentences. Green, black, white. See [BRAND.md](./docs/BRAND.md).
4. **Data lives in one place.** Edit [`data/draws.json`](./data/draws.json), then run `npm run history`. Do not hand-edit the generated blocks between the `START` / `END` markers.

## Workflow

```bash
git clone https://github.com/<your-org>/pumpball.git
cd pumpball
npm run draw:demo:fast     # sanity check
npm run history:check      # must pass before opening a PR
```

Open a pull request using the template. CI runs `history:check` and the demo.

## Assets

The SVGs in `assets/` are hand-authored and self-contained. Keep them that way: no external fonts, images or scripts. GitHub will not load them. Validate with `xmllint --noout assets/*.svg`.
