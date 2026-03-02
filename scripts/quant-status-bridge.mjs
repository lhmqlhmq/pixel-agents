#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const input = process.argv[2] || '../quant_project_tracker/data/status.json';
const fullPath = path.resolve(process.cwd(), input);

if (!fs.existsSync(fullPath)) {
  console.error(`Status file not found: ${fullPath}`);
  process.exit(1);
}

const raw = fs.readFileSync(fullPath, 'utf-8');
const json = JSON.parse(raw);
const projects = Array.isArray(json.projects) ? json.projects : [];

function mapStageToState(stage, progress) {
  if (progress >= 100) return 'done';
  if (stage === 'Design') return 'reading';
  if (stage === 'Build' || stage === 'MVP') return 'typing';
  return 'idle';
}

const mapped = projects.map((p, idx) => ({
  agentId: `quant-${idx + 1}`,
  name: p.name,
  owner: p.owner,
  stage: p.stage,
  progress: p.progress,
  state: mapStageToState(p.stage, p.progress),
  updatedAt: p.updatedAt
}));

console.log(JSON.stringify({
  source: fullPath,
  count: mapped.length,
  agents: mapped
}, null, 2));
