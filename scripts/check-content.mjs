#!/usr/bin/env node
// Content guard for a repository that will be public.
// Fails on anything that looks like a credential, a WaveWise token, or a
// personal address. The plugin carries workflow steps and a public URL only.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SKIP = new Set(['.git', 'node_modules', '.codex-validator']);
const RULES = [
  ['WaveWise token', /\b(wwmcp|wwat|wwrt)_[A-Za-z0-9_-]{8,}/u],
  ['bearer value', /Bearer\s+(?!\$|<|\{)[A-Za-z0-9._~+/-]{16,}/u],
  ['private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/u],
  ['cloud or API key', /\b(AKIA[0-9A-Z]{16}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|xox[abp]-[A-Za-z0-9-]{10,})\b/u],
  // Only role addresses on WaveWise's own domain may appear.
  ['personal email', /\b[A-Za-z0-9._%+-]+@(?!wavewiseintelligence\.com\b|example\.(com|org|test)\b)[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/u],
  ['phone number', /(?<![\w.])\+?\d[\d -]{9,}\d(?![\w.])/u],
];

const files = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
})(ROOT);

let failures = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  text.split('\n').forEach((line, index) => {
    for (const [label, pattern] of RULES)
      if (pattern.test(line)) {
        failures += 1;
        console.error(`${relative(ROOT, file)}:${index + 1}: ${label}`);
      }
  });
}
if (failures > 0) {
  console.error(`check-content: ${failures} finding(s)`);
  process.exit(1);
}
console.log(`check-content: ${files.length} files clean`);
