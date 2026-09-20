# SECURITY

## Impersonation and fake addresses

Crypto projects get copied. Assume there are lookalikes.

- The **only** official contract address is the one in the [README](./README.md) and [docs/TRANSPARENCY.md](./docs/TRANSPARENCY.md). Right now it is `TBA`.
- The **only** official prize wallet is the one listed in those same places.
- Nobody from PUMPBALL will DM you first, ask for your seed phrase or private key, or ask you to connect a wallet to a claim link.

If you see a fake token, fake site or fake account, open an issue using the **Report an impersonator** template.

## Reporting a vulnerability

This repo contains docs, SVGs and two small Node scripts with no dependencies. If you find something that could hurt users (for example a malicious link, a tampered address, or a script problem), report it privately:

- Use GitHub's **Report a vulnerability** button in the Security tab, or
- Contact: `TBA`

Please do not open a public issue for anything that exposes users to loss before it is fixed.

## Never commit

Private keys, seed phrases, keypair files or `.env` files. `.gitignore` covers the common ones, but it is not a safety net.
