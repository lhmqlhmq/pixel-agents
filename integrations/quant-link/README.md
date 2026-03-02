# Quant Link (Plan A)

This repo (`pixel-agents`) stays as a VS Code extension.
Your quant dashboard stays in:

- `https://github.com/lhmqlhmq/quant_project_tracker`

To link both projects, share one JSON status file:

- `quant_project_tracker/data/status.json`

## Minimal bridge

Run this script to read quant status JSON and map it into agent-like states:

```bash
node scripts/quant-status-bridge.mjs ../quant_project_tracker/data/status.json
```

## Expected JSON shape

```json
{
  "metricsValues": [3, 12, 1.47, "58%"],
  "projects": [
    {"name":"QC Pipeline","stage":"MVP","progress":90,"owner":"Jason","updatedAt":"2026-03-02"}
  ]
}
```

## Next step (optional)

Wire this output into extension runtime (`src/agentManager.ts`) so project progress can drive pixel-agent animation states.
