#!/usr/bin/env node
/**
 * PUMPBALL // RENDER HISTORY
 *
 * data/draws.json is the single source of truth.
 * This script renders it into the marked blocks in the README and docs:
 *
 *   <!-- TRANSPARENCY:START --> ... <!-- TRANSPARENCY:END -->
 *   <!-- DRAW_HISTORY:START --> ... <!-- DRAW_HISTORY:END -->
 *
 * Usage:
 *   node scripts/render-history.mjs           write changes
 *   node scripts/render-history.mjs --check   exit 1 if anything is out of date
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");
const CHECK = process.argv.includes("--check");

const data = JSON.parse(read("data/draws.json"));

// ---------------------------------------------------------------- validation
const errors = [];
if (data.network !== "solana") errors.push('network must be "solana"');
if (!data.token) errors.push("token block missing");
if (!Array.isArray(data.draws)) errors.push("draws must be an array");
const ids = new Set();
for (const d of data.draws ?? []) {
  if (!Number.isInteger(d.id) || d.id < 1) errors.push(`invalid draw id: ${d.id}`);
  if (ids.has(d.id)) errors.push(`duplicate draw id: #${d.id}`);
  ids.add(d.id);
  if (d.status === "drawn" && (!d.winner || !d.tx)) {
    errors.push(`draw #${d.id} is marked drawn but has no winner/tx`);
  }
}
if (errors.length) {
  console.error("data/draws.json is invalid:\n - " + errors.join("\n - "));
  process.exit(1);
}

// ---------------------------------------------------------------- renderers
const tba = (v) => (v === null || v === undefined || v === "" ? "TBA" : v);
const short = (a) => (a.length > 12 ? `${a.slice(0, 4)}…${a.slice(-4)}` : a);
const pad = (n) => String(n).padStart(3, "0");

function historyTable() {
  const rows = data.draws.map((d) => {
    const winner = d.winner ? `\`${short(d.winner)}\`` : "TBA";
    const tx = d.tx ? `[view](https://solscan.io/tx/${d.tx})` : "TBA";
    return `| #${pad(d.id)} | ${tba(d.prize)} | ${winner} | ${tx} |`;
  });
  return [
    "| Draw | Prize | Winner | TX  |",
    "| ---- | ----: | ------ | --- |",
    ...rows,
  ].join("\n");
}

function transparencyTable(historyLink) {
  const ca = data.token.contractAddress;
  const pw = data.token.prizeWallet;
  const hasTx = data.draws.some((d) => d.tx);
  return [
    "| Item | Value |",
    "| :--- | :--- |",
    `| **Contract Address** | \`CA: ${tba(ca)}\` |`,
    `| **Prize Wallet** | \`${tba(pw)}\` |`,
    `| **Draw History** | [see draw history](${historyLink}) |`,
    `| **Winner Transactions** | ${hasTx ? `[see draw history](${historyLink})` : "`TBA`"} |`,
  ].join("\n");
}

// ---------------------------------------------------------------- targets
const targets = [
  { file: "README.md", link: "#draw-history", blocks: ["TRANSPARENCY", "DRAW_HISTORY"] },
  { file: "docs/TRANSPARENCY.md", link: "./DRAW_HISTORY.md", blocks: ["TRANSPARENCY"] },
  { file: "docs/DRAW_HISTORY.md", link: "./DRAW_HISTORY.md", blocks: ["DRAW_HISTORY"] },
];

function replaceBlock(text, name, content) {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(text)) return { text, found: false };
  return { text: text.replace(re, (_, a, b) => `${a}\n${content}\n${b}`), found: true };
}

let stale = 0;
for (const t of targets) {
  const before = read(t.file);
  let after = before;
  for (const name of t.blocks) {
    const content = name === "TRANSPARENCY" ? transparencyTable(t.link) : historyTable();
    const res = replaceBlock(after, name, content);
    if (!res.found) {
      console.error(`! ${t.file}: missing <!-- ${name}:START/END --> markers`);
      process.exit(1);
    }
    after = res.text;
  }
  if (after !== before) {
    stale++;
    if (CHECK) {
      console.error(`x ${t.file} is out of date. Run: npm run history`);
    } else {
      writeFileSync(resolve(root, t.file), after);
      console.log(`+ updated ${t.file}`);
    }
  } else {
    console.log(`= ${t.file} up to date`);
  }
}

if (CHECK && stale) process.exit(1);
