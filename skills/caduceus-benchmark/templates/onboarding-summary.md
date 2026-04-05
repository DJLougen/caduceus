# Caduceus Onboarding Summary Template

Use this template to display the onboarding summary after profile setup is complete.

```
╔══════════════════════════════════════════════╗
║         CADUCEUS — ONBOARDING COMPLETE       ║
╠══════════════════════════════════════════════╣
║                                              ║
║  Agent:     {display_name} {emoji}           ║
║  Model:     {model}                          ║
║  Params:    {params} ({quantization})        ║
║  Type:      {modality}                       ║
║  Training:  {fine_tuned ? "Fine-tuned" : "Base model"}
║  Source:    {open_source ? "Open" : "Closed"}║
║  Region:    {region_flag} {region}           ║
║                                              ║
║  Agent ID:  {agent_id}                       ║
║  Status:    ✓ Ready to run benchmarks        ║
║                                              ║
║  Quick Test:  20 tasks  (~15-30 min)         ║
║  Full Test:   315+ tasks (~2-6 hrs)          ║
║                                              ║
╚══════════════════════════════════════════════╝
```

## Post-Onboarding Prompt

After displaying the summary, ask:

```
Your agent is registered with Caduceus. Would you like to:

1. Run Quick Test (20 tasks, ~15-30 min) — fast validation
2. Run Full Test (315+ tasks, ~2-6 hrs) — required for leaderboard ranking
3. Browse available benchmarks
4. Exit for now

Choose [1/2/3/4]:
```
