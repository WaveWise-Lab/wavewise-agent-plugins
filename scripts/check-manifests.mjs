#!/usr/bin/env node
// The Claude and Codex manifests describe one plugin: same name,
// same version, and one MCP server at WaveWise's public https endpoint.
import { readFileSync } from 'node:fs';

const read = (path) => JSON.parse(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));
const claude = read('plugins/wavewise/.claude-plugin/plugin.json');
const codex = read('plugins/wavewise/.codex-plugin/plugin.json');
const mcp = read('plugins/wavewise/.mcp.json');
const claudeMarket = read('.claude-plugin/marketplace.json');
const codexMarket = read('.agents/plugins/marketplace.json');

const problems = [];
const expect = (ok, message) => ok || problems.push(message);

expect(claude.name === 'wavewise' && codex.name === 'wavewise', 'both manifests are named wavewise');
expect(claude.version === codex.version, `versions differ: ${claude.version} vs ${codex.version}`);
const servers = Object.entries(mcp.mcpServers ?? {});
expect(servers.length === 1, '.mcp.json declares exactly one server');
for (const [name, server] of servers) {
  expect(name === 'wavewise', 'the server is called wavewise');
  expect(server.type === 'http', 'the server is remote (type http)');
  expect(server.url === 'https://mcp.wavewiseintelligence.com/mcp', `unexpected MCP URL ${server.url}`);
  expect(!('headers' in server) && !('oauth' in server), 'no headers or client credentials in the plugin');
}
expect(claudeMarket.plugins?.some((p) => p.name === 'wavewise' && p.source === './plugins/wavewise'), 'Claude marketplace lists ./plugins/wavewise');
expect(codexMarket.plugins?.some((p) => p.name === 'wavewise' && p.source?.path === './plugins/wavewise'), 'Codex marketplace lists ./plugins/wavewise');

if (problems.length > 0) {
  for (const problem of problems) console.error(`check-manifests: ${problem}`);
  process.exit(1);
}
console.log('check-manifests: ok');
