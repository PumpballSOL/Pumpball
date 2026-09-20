# DRAW RULES

> **Status: DRAFT.** Every parameter below is `TBA`. Nothing here is a commitment until it is filled in and published in [TRANSPARENCY.md](./TRANSPARENCY.md).

## Parameters

| Parameter | Value | Notes |
| :--- | :--- | :--- |
| Draw schedule | `TBA` | Drawings are predetermined. Exact schedule not yet published. |
| Eligibility | `TBA` | What counts as an "eligible" PUMPBALL holder. |
| Excluded wallets | `TBA` | For example, protocol-owned or system wallets. |
| Entry snapshot | `TBA` | How and when eligibility is determined. |
| Winner selection | `TBA` | Method used to pick one wallet. |
| Prize | `TBA` | Composition of the prize pool at draw time. |
| Payout | `TBA` | How the prize is sent, and whether a claim window applies. |
| Publication | `TBA` | Where results are posted. |

## Principles

These are the intentions this project is built around. They are goals, not guarantees.

1. **Simple.** One ball, one wallet, one winner.
2. **Public.** Addresses, results and transactions are published so anyone can check them.
3. **Verifiable.** Claims should be checkable on-chain. See [VERIFY.md](./VERIFY.md).
4. **No invented numbers.** Unknown values stay `TBA` until they are real.
5. **Changes are visible.** Rule changes are made in this repo, in the open, via commit history.

## Not the official mechanism

[`scripts/draw-demo.mjs`](../scripts/draw-demo.mjs) is a terminal toy that picks a fake wallet with Node's crypto RNG. It exists so the repo has something to run. It is **not** the official draw mechanism and says nothing about how the real one will work.
