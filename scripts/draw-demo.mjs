#!/usr/bin/env node
/**
 * PUMPBALL // DRAW DEMO
 *
 * A terminal toy that shows what a draw *feels* like.
 *
 *  - Uses FAKE wallets ("DEMO...") generated on the spot.
 *  - Picks one with Node's crypto RNG.
 *  - This is NOT the official draw mechanism. The real method is TBA,
 *    see docs/DRAW_RULES.md.
 *
 * Usage:
 *   node scripts/draw-demo.mjs [--entries 64] [--fast] [--no-color]
 */
import { randomInt } from "node:crypto";
import { setTimeout as sleep } from "node:timers/promises";

const argv = process.argv.slice(2);
const has = (name) => argv.includes(`--${name}`);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};

if (has("help") || has("h")) {
  console.log(`PUMPBALL // DRAW DEMO

  --entries <n>   number of fake wallets (2-100000, default 64)
  --fast          skip animations
  --no-color      plain output
  --help          this message

Demo only. Not the official draw.`);
  process.exit(0);
}

const ENTRIES = Math.max(2, Math.min(100000, Number(opt("entries", 64)) || 64));
const FAST = has("fast") || !process.stdout.isTTY;
const COLOR = process.stdout.isTTY && !has("no-color") && !process.env.NO_COLOR;

const paint = (code) => (s) => (COLOR ? `\x1b[${code}m${s}\x1b[0m` : s);
const green = paint("92");
const dim = paint("2");
const bold = paint("1");
const white = paint("97");
const yellow = paint("93");
const wait = (ms) => (FAST ? Promise.resolve() : sleep(ms));

const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const fakeWallet = () =>
  "DEMO" + Array.from({ length: 8 }, () => BASE58[randomInt(BASE58.length)]).join("");

const WORDMARK = `
██████╗ ██╗   ██╗███╗   ███╗██████╗ ██████╗  █████╗ ██╗     ██╗
██╔══██╗██║   ██║████╗ ████║██╔══██╗██╔══██╗██╔══██╗██║     ██║
██████╔╝██║   ██║██╔████╔██║██████╔╝██████╔╝███████║██║     ██║
██╔═══╝ ██║   ██║██║╚██╔╝██║██╔═══╝ ██╔══██╗██╔══██║██║     ██║
██║     ╚██████╔╝██║ ╚═╝ ██║██║     ██████╔╝██║  ██║███████╗███████╗
╚═╝      ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝`;

async function step(label, ms = 350) {
  process.stdout.write(`  ${green(">")} ${label} `);
  const dots = Math.max(3, 26 - label.length);
  for (let i = 0; i < dots; i++) {
    process.stdout.write(dim("."));
    await wait(ms / dots);
  }
  console.log(` ${green("ok")}`);
}

async function main() {
  console.log(green(WORDMARK));
  console.log();
  console.log(`  ${bold("PUMPBALL // DRAW DEMO")}`);
  console.log();
  console.log(`  ${dim("MODE       ")} ${yellow("DEMO")} ${dim("(fake wallets, not the official draw)")}`);
  console.log(`  ${dim("NETWORK    ")} SOLANA`);
  console.log(`  ${dim("SOURCE     ")} PUMP.FUN`);
  console.log(`  ${dim("ENTRIES    ")} ${ENTRIES}`);
  console.log();

  const wallets = new Set();
  while (wallets.size < ENTRIES) wallets.add(fakeWallet());
  const list = [...wallets];

  await step("loading entries");
  await step("sealing pool");
  await step("warming the machine");

  console.log();
  process.stdout.write(`  ${green(">")} spinning the ball\n\n`);

  // suspense: cycle through random wallets
  const frames = FAST ? 0 : 28;
  for (let i = 0; i < frames; i++) {
    const w = list[randomInt(list.length)];
    process.stdout.write(`\r     ${dim("[")} ${white(w)} ${dim("]")}   `);
    await sleep(40 + i * i * 0.6);
  }

  const index = randomInt(list.length);
  const winner = list[index];
  if (frames) process.stdout.write("\r" + " ".repeat(48) + "\r");

  console.log(`  ${green(">")} ball dropped\n`);
  console.log(`  ${dim("WINNER  ")} ${bold(green(winner))}  ${dim(`(entry #${index + 1} of ${ENTRIES})`)}`);
  console.log(`  ${dim("TX      ")} n/a ${dim("(demo)")}`);
  console.log();
  console.log(dim("  This was a simulation with fake wallets. No funds moved."));
  console.log(dim("  Official draw rules: docs/DRAW_RULES.md (TBA)."));
  console.log();
  console.log(`  ${green("> waiting for the next draw_")}`);
}

main();
