# Caduceus Task Format

## Task Structure

Each Caduceus task is a JSON document describing a self-contained scenario:

```json
{
  "id": "T001",
  "name": "Debug Segfault in C++ Service",
  "domain": "Software Engineering",
  "difficulty": "Hard",
  "description": "Identify and fix a use-after-free bug in a multi-threaded C++ microservice using only terminal tools.",
  "tools_available": ["terminal", "read_file", "patch", "process"],
  "environment": {
    "files": [
      { "path": "/app/src/main.cpp", "content": "..." },
      { "path": "/app/Makefile", "content": "..." },
      { "path": "/app/logs/crash.log", "content": "..." }
    ],
    "services": [
      { "name": "app-server", "port": 8080, "status": "crashed" }
    ],
    "preconditions": [
      "The service was running for 3 hours before crashing",
      "The crash is reproducible under concurrent requests"
    ]
  },
  "success_criteria": [
    "The use-after-free bug is correctly identified",
    "A fix is applied that prevents the crash",
    "The service restarts and handles concurrent requests without crashing",
    "The fix does not introduce new issues"
  ],
  "par_steps": 12,
}
```

## Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique task identifier (T001-T999) |
| `name` | string | Human-readable task name |
| `domain` | string | One of the 8 benchmark domains |
| `difficulty` | string | Easy, Medium, Hard, or Extreme |
| `description` | string | What the agent needs to accomplish |
| `tools_available` | string[] | Which tools the agent can use for this task |
| `environment` | object | Files, services, and preconditions that define the sandbox |
| `success_criteria` | string[] | What must be true for the task to be scored as complete |
| `par_steps` | number | Expected number of steps for a competent agent (used for Efficiency scoring) |

## Domains

| Domain | Description | Example Tasks |
|--------|-------------|---------------|
| Software Engineering | Code debugging, refactoring, feature implementation | Fix segfaults, resolve merge conflicts, implement APIs |
| DevOps & Infrastructure | Deployment, CI/CD, container orchestration | Rolling deployments, Docker debugging, Kubernetes |
| Security & Adversarial | Vulnerability assessment, hardening, incident response | SQL injection audit, encrypted backup recovery |
| Data Science & ML | Model training, data processing, evaluation | Train classifiers, optimize hyperparameters |
| System Administration | Server configuration, process management | Nginx setup, kernel module building |
| Web & API | HTTP services, authentication, rate limiting | JWT auth flows, REST API implementation |
| Database & Storage | Query optimization, schema design, migrations | PostgreSQL tuning, index optimization |
| Multi-step Reasoning | Cross-service debugging, incident triage | Production incident response across 3+ services |

## Difficulty Calibration

| Level | Typical Steps | Error Ambiguity | Services Involved |
|-------|--------------|-----------------|-------------------|
| Easy | 3-6 | Clear error messages | 1 |
| Medium | 6-15 | Some ambiguity | 1-2 |
| Hard | 15-30 | Misleading errors, red herrings | 2-3 |
| Extreme | 30-60+ | Cascading failures, adversarial conditions | 3+ |

## Par Steps

Each task has a `par_steps` count — the expected number of tool calls for a competent agent to complete the task. This is analogous to "par" in golf:

- **Under par**: Fewer steps than expected → high Efficiency score
- **At par**: Expected number of steps → baseline Efficiency
- **Over par**: More steps than expected → lower Efficiency, investigate why

Par is calibrated by running tasks with multiple frontier models and taking the median step count.
