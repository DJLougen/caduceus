# Caduceus Submission Format

## Trajectory Format

Each task produces a trajectory — the full sequence of thoughts and actions the agent took. Trajectories are the raw material for scoring.

```json
{
  "task_id": "T001",
  "started_at": "2026-04-05T14:30:00Z",
  "completed_at": "2026-04-05T14:38:42Z",
  "status": "completed",
  "steps": [
    {
      "step": 1,
      "type": "thought",
      "content": "The crash log shows a segfault at 0x7fff... in thread 3. Let me read the source file to understand the memory management pattern.",
      "timestamp": "2026-04-05T14:30:02Z"
    },
    {
      "step": 2,
      "type": "tool_call",
      "tool": "read_file",
      "input": { "path": "/app/src/main.cpp" },
      "output": "...",
      "timestamp": "2026-04-05T14:30:05Z"
    },
    {
      "step": 3,
      "type": "thought",
      "content": "I see the issue — the shared_ptr is being accessed after the owning thread releases it. The fix is to use a mutex or change ownership semantics.",
      "timestamp": "2026-04-05T14:30:15Z"
    }
  ],
  "result": {
    "success": true,
    "success_criteria_met": [true, true, true, true],
    "tokens_used": 8542,
    "total_steps": 14,
    "par_steps": 12
  }
}
```

## Full Submission Payload

A benchmark run submission wraps all trajectories:

```json
{
  "benchmark_id": "bm_quick_v1",
  "submission": {
    "trajectories": [
      { "task_id": "T001", "steps": [...], "result": {...} },
      { "task_id": "T005", "steps": [...], "result": {...} },
      { "task_id": "T009", "steps": [...], "result": {...} }
    ],
    "metadata": {
      "agent_version": "1.0.0",
      "total_time_seconds": 1847,
      "total_tokens": 152340,
      "tasks_attempted": 20,
      "tasks_completed": 16,
      "tasks_failed": 4,
      "environment": {
        "backend": "docker",
        "gpu": "none",
        "ram_gb": 16
      }
    }
  }
}
```

## Step Types

| Type | Description |
|------|-------------|
| `thought` | Agent's internal reasoning (chain-of-thought) |
| `tool_call` | A tool invocation with input and output |
| `error` | An error the agent encountered |
| `recovery` | Agent's response to an error (shows self-correction) |
| `verification` | Agent checking its own work |

## Metadata Fields

| Field | Required | Description |
|-------|----------|-------------|
| `agent_version` | No | Version string for the agent configuration |
| `total_time_seconds` | Yes | Wall-clock time for the full benchmark run |
| `total_tokens` | Yes | Total input + output tokens consumed |
| `tasks_attempted` | Yes | Number of tasks the agent started |
| `tasks_completed` | Yes | Number of tasks completed successfully |
| `tasks_failed` | Yes | Number of tasks that failed or timed out |
| `environment.backend` | No | Execution backend (local, docker, ssh, modal, etc.) |
| `environment.gpu` | No | GPU used, if any |
| `environment.ram_gb` | No | Available RAM |

## Validation Rules

Submissions are validated before scoring:

1. All `task_id` values must match tasks in the selected benchmark
2. Each trajectory must have at least 1 step
3. `total_time_seconds` must be positive
4. `tasks_attempted` must equal the number of trajectories
5. `tasks_completed + tasks_failed` must equal `tasks_attempted`
6. Step timestamps must be monotonically increasing
7. File size must not exceed 10MB
