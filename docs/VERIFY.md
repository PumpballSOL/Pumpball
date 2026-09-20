# VERIFY

Do not trust. Verify. This applies to this repo too.

## Before you buy

- [ ] Get the contract address from [TRANSPARENCY.md](./TRANSPARENCY.md) or the [README](../README.md).
- [ ] Compare it character by character against the token page you are about to trade on.
- [ ] Be suspicious of any lookalike token, ticker or logo. Copies are common.
- [ ] If the address here says `TBA`, there is no official address yet.

## Check the prize wallet

- [ ] Open the prize wallet in a Solana block explorer.
- [ ] Look at the balance and recent activity yourself.
- [ ] Confirm the address matches [`data/draws.json`](../data/draws.json).

## Check a draw

- [ ] Find the draw in [DRAW_HISTORY.md](./DRAW_HISTORY.md).
- [ ] Open the payout transaction in an explorer.
- [ ] Confirm the recipient matches the listed winner.
- [ ] Confirm the amount matches the listed prize.

## Check the repo

- [ ] Look at the commit history for [`data/draws.json`](../data/draws.json). Changes should be traceable.
- [ ] Run `npm run history:check`. It fails if the README and docs disagree with the data file.

## Red flags

- Anyone asking for your seed phrase or private key. Never share it.
- "Claim your PUMPBALL prize" links you did not go looking for.
- Addresses that only appear in a screenshot or a DM.
- Guaranteed returns or guaranteed prizes.
