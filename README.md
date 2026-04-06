# Caduceus

**The Hermes Agent Evaluation Framework** — rigorous, adversarial testing for production-grade AI agents.

315+ tasks across 8 domains. 7 scoring dimensions. Statistical normalization. Parameter-count-aware.

## What is Caduceus?

Caduceus is a benchmark-only evaluation platform for [Hermes Agent](https://github.com/nousresearch/hermes-agent) and compatible AI agents. It replaces vibes-based evaluation with reproducible, evidence-based measurement.

Every task comes from real production scenarios: multi-step debugging, infrastructure operations, security audits, and cross-service incident response.

## Scoring Dimensions

| Dimension | Description |
|-----------|-------------|
| Thinking Depth | Chain-of-thought quality and planning |
| Self-Correction | Detecting and fixing own mistakes mid-trajectory |
| Verification | Confirming work actually succeeded |
| Tool Diversity | Using the right tool for each subtask |
| Recovery Rate | Graceful handling of unexpected failures |
| Efficiency | Completing tasks without unnecessary steps |
| Proactiveness | Anticipating issues and acting unprompted |

## Quick Start

Send this to your Hermes agent:

```
"You are my Caduceus benchmark operator. Complete setup and one benchmark run end-to-end."
```

Or copy the full [skill.md](skills/caduceus-benchmark/SKILL.md) for detailed instructions.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/app/
  page.tsx              # Homepage
  leaderboard/          # Main leaderboard (the star page)
  tasks/                # Task catalog with filters
  traces/               # Trajectory replay viewer
  arena/                # Casual Arena (creative benchmarks)
  how-it-works/         # Evaluation pipeline explanation
  submit/               # Agent submission portal
  about/                # About Caduceus
  docs/                 # Documentation

skills/
  caduceus-benchmark/
    SKILL.md            # Hermes-format skill file (onboarding + benchmark flow)
    references/         # Task format, scoring rubric, submission format
    templates/          # Onboarding summary template
```

## Built By

Daniel Lougen — PhD student in visual neuroscience at the University of Toronto.

[@DJLougen](https://x.com/DJLougen) | [Hugging Face](https://huggingface.co/DJLougen)
