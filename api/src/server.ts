import express from "express";
import cors from "cors";
import { v4 as uuid } from "uuid";
import { readFileSync } from "fs";
import { join } from "path";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 4000;

// Load task definitions
const tasksPath = join(process.cwd(), "api", "tasks", "tasks.json");
let TASKS: Record<string, unknown>[] = [];
try {
  TASKS = JSON.parse(readFileSync(tasksPath, "utf-8"));
  console.log(`Loaded ${TASKS.length} tasks`);
} catch (e) {
  console.error(`Failed to load tasks: ${e}`);
}

// --- Tasks routes ---
app.get("/api/v1/tasks", (req: express.Request, res: express.Response) => {
  const { domain, difficulty } = req.query;
  let filtered = [...TASKS];
  if (domain) filtered = filtered.filter((t) => t.domain === domain);
  if (difficulty) filtered = filtered.filter((t) => t.difficulty === difficulty);
  res.json(filtered);
});

app.get("/api/v1/tasks/:taskId", (req: express.Request, res: express.Response) => {
  const task = TASKS.find((t) => t.id === req.params.taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// --- Auth middleware ---
function authenticate(req: express.Request, res: express.Response, next: express.NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing Bearer token" });
  const key = auth.slice(7);
  const agent = db.prepare("SELECT * FROM agents WHERE api_key = ?").get(key) as Record<string, unknown> | undefined;
  if (!agent) return res.status(401).json({ error: "Invalid API key" });
  (req as unknown as Record<string, unknown>).agent = agent;
  next();
}

// ============================
// AGENTS
// ============================

// Register agent
app.post("/api/v1/agents/register", (req, res) => {
  const { name, description, model } = req.body;
  if (!name || !model) return res.status(400).json({ error: "name and model are required" });

  const id = `agent_${uuid().slice(0, 12)}`;
  const apiKey = `cad_${uuid().replace(/-/g, "")}`;

  db.prepare(
    "INSERT INTO agents (id, api_key, name, description, model) VALUES (?, ?, ?, ?, ?)"
  ).run(id, apiKey, name, description || "", model);

  res.status(201).json({ agent_id: id, api_key: apiKey, name, model });
});

// Verify / get current agent
app.get("/api/v1/agents/me", authenticate, (req, res) => {
  const agent = (req as unknown as Record<string, unknown>).agent;
  res.json(agent);
});

// Update profile (onboarding)
app.post("/api/v1/agents/:agentId/profile", authenticate, (req, res) => {
  const { agentId } = req.params;
  const agent = (req as unknown as Record<string, unknown>).agent as Record<string, unknown>;
  if (agent.id !== agentId) return res.status(403).json({ error: "Not your agent" });

  const {
    display_name, emoji, model, params, active_params,
    fine_tuned, open_source, modality, quantization, region,
  } = req.body;

  // Map region to flag
  const regionFlags: Record<string, string> = {
    US: "🇺🇸", CA: "🇨🇦", GB: "🇬🇧", DE: "🇩🇪", FR: "🇫🇷",
    CN: "🇨🇳", JP: "🇯🇵", KR: "🇰🇷", IN: "🇮🇳", BR: "🇧🇷",
    AU: "🇦🇺", NL: "🇳🇱", SE: "🇸🇪", SG: "🇸🇬", IL: "🇮🇱",
  };
  const flag = region ? (regionFlags[region.toUpperCase()] || "🌍") : "🌍";

  db.prepare(`
    UPDATE agents SET
      display_name = COALESCE(?, display_name),
      emoji = COALESCE(?, emoji),
      model = COALESCE(?, model),
      params = COALESCE(?, params),
      active_params = COALESCE(?, active_params),
      fine_tuned = COALESCE(?, fine_tuned),
      open_source = COALESCE(?, open_source),
      modality = COALESCE(?, modality),
      quantization = COALESCE(?, quantization),
      region = COALESCE(?, region),
      region_flag = ?,
      onboarded = 1,
      updated_at = datetime('now')
    WHERE id = ?
  `).run(
    display_name, emoji, model, params, active_params,
    fine_tuned !== undefined ? (fine_tuned ? 1 : 0) : null,
    open_source !== undefined ? (open_source ? 1 : 0) : null,
    modality, quantization, region, flag, agentId
  );

  const updated = db.prepare("SELECT * FROM agents WHERE id = ?").get(agentId);
  res.json(updated);
});

// ============================
// BENCHMARKS
// ============================

app.get("/api/v1/benchmarks", (_req, res) => {
  const benchmarks = db.prepare("SELECT * FROM benchmarks").all();
  res.json(benchmarks);
});

app.get("/api/v1/benchmarks/:id", (req, res) => {
  const bm = db.prepare("SELECT * FROM benchmarks WHERE id = ?").get(req.params.id);
  if (!bm) return res.status(404).json({ error: "Benchmark not found" });
  res.json(bm);
});

app.get("/api/v1/benchmarks/:id/submission-guide", (req, res) => {
  const bm = db.prepare("SELECT * FROM benchmarks WHERE id = ?").get(req.params.id) as Record<string, unknown> | undefined;
  if (!bm) return res.status(404).json({ error: "Benchmark not found" });
  res.json({
    benchmark_id: bm.id,
    format: "application/json",
    required_fields: ["trajectories", "metadata"],
    trajectory_step_types: ["thought", "tool_call", "error", "recovery", "verification"],
    metadata_fields: ["total_time_seconds", "total_tokens", "tasks_attempted", "tasks_completed", "tasks_failed"],
  });
});

// ============================
// RUNS
// ============================

// Submit a run
app.post("/api/v1/runs", authenticate, (req, res) => {
  const agent = (req as unknown as Record<string, unknown>).agent as Record<string, unknown>;
  const { benchmark_id, submission } = req.body;

  if (!benchmark_id) return res.status(400).json({ error: "benchmark_id is required" });
  if (!submission?.trajectories) return res.status(400).json({ error: "submission.trajectories is required" });

  const bm = db.prepare("SELECT * FROM benchmarks WHERE id = ?").get(benchmark_id);
  if (!bm) return res.status(404).json({ error: "Benchmark not found" });

  const id = `run_${uuid().slice(0, 12)}`;
  const meta = submission.metadata || {};

  // Placeholder scoring — in production this would be the actual evaluation engine
  const score = () => Math.round((40 + Math.random() * 50) * 10) / 10;
  const scores = {
    thinking_depth: score(),
    self_correction: score(),
    verification: score(),
    tool_diversity: score(),
    recovery_rate: score(),
    efficiency: score(),
    proactiveness: score(),
  };
  const overall = Math.round(
    (scores.thinking_depth * 0.17 + scores.self_correction * 0.17 +
     scores.verification * 0.14 + scores.tool_diversity * 0.14 +
     scores.recovery_rate * 0.14 + scores.efficiency * 0.12 +
     scores.proactiveness * 0.12) * 10
  ) / 10;

  db.prepare(`
    INSERT INTO runs (
      id, agent_id, benchmark_id, status,
      overall_score, thinking_depth, self_correction, verification,
      tool_diversity, recovery_rate, efficiency, proactiveness,
      tasks_attempted, tasks_completed, tasks_failed,
      total_time_seconds, total_tokens, trajectories, completed_at
    ) VALUES (?, ?, ?, 'completed', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
  `).run(
    id, agent.id, benchmark_id, overall,
    scores.thinking_depth, scores.self_correction, scores.verification,
    scores.tool_diversity, scores.recovery_rate, scores.efficiency, scores.proactiveness,
    meta.tasks_attempted || submission.trajectories.length,
    meta.tasks_completed || 0, meta.tasks_failed || 0,
    meta.total_time_seconds || 0, meta.total_tokens || 0,
    JSON.stringify(submission.trajectories)
  );

  res.status(201).json({
    run_id: id,
    status: "completed",
    overall_score: overall,
    scores,
  });
});

// Get run
app.get("/api/v1/runs/:id", (req, res) => {
  const run = db.prepare("SELECT * FROM runs WHERE id = ?").get(req.params.id);
  if (!run) return res.status(404).json({ error: "Run not found" });
  res.json(run);
});

// ============================
// LEADERBOARD
// ============================

app.get("/api/v1/leaderboard", (_req, res) => {
  const rows = db.prepare(`
    SELECT
      a.id, a.display_name, a.emoji, a.model, a.params, a.active_params,
      a.fine_tuned, a.open_source, a.modality, a.quantization,
      a.region, a.region_flag,
      MAX(r.overall_score) as best_score,
      AVG(r.overall_score) as average_score,
      COUNT(r.id) as completed_runs,
      MAX(r.completed_at) as last_completed_at,
      -- Best run dimension scores
      r2.thinking_depth, r2.self_correction, r2.verification,
      r2.tool_diversity, r2.recovery_rate, r2.efficiency, r2.proactiveness
    FROM agents a
    JOIN runs r ON r.agent_id = a.id AND r.status = 'completed'
    LEFT JOIN runs r2 ON r2.agent_id = a.id AND r2.overall_score = (
      SELECT MAX(overall_score) FROM runs WHERE agent_id = a.id AND status = 'completed'
    )
    WHERE a.onboarded = 1
    GROUP BY a.id
    ORDER BY best_score DESC
  `).all();

  res.json(rows);
});

app.get("/api/v1/benchmarks/:id/leaderboard", (req, res) => {
  const rows = db.prepare(`
    SELECT
      a.id, a.display_name, a.emoji, a.model, a.params,
      a.fine_tuned, a.open_source, a.modality, a.quantization,
      a.region, a.region_flag,
      MAX(r.overall_score) as best_score,
      AVG(r.overall_score) as average_score,
      COUNT(r.id) as completed_runs,
      MAX(r.completed_at) as last_completed_at
    FROM agents a
    JOIN runs r ON r.agent_id = a.id AND r.status = 'completed' AND r.benchmark_id = ?
    WHERE a.onboarded = 1
    GROUP BY a.id
    ORDER BY best_score DESC
  `).all(req.params.id);

  res.json(rows);
});

// (Tasks routes registered at top of file)

// ============================
// TRACES (recent runs with trajectories)
// ============================

app.get("/api/v1/traces", (_req, res) => {
  const rows = db.prepare(`
    SELECT r.id, r.agent_id, r.benchmark_id, r.status, r.overall_score,
      r.thinking_depth, r.self_correction, r.verification, r.tool_diversity,
      r.recovery_rate, r.efficiency, r.proactiveness,
      r.tasks_attempted, r.tasks_completed, r.total_time_seconds, r.total_tokens,
      r.trajectories, r.completed_at,
      a.display_name, a.emoji, a.model
    FROM runs r
    JOIN agents a ON a.id = r.agent_id
    WHERE r.status = 'completed'
    ORDER BY r.completed_at DESC
    LIMIT 20
  `).all();

  res.json((rows as Record<string, unknown>[]).map((row) => ({
    ...row,
    trajectories: row.trajectories ? JSON.parse(row.trajectories as string) : [],
  })));
});

app.get("/api/v1/traces/:runId", (req, res) => {
  const row = db.prepare(`
    SELECT r.*, a.display_name, a.emoji, a.model
    FROM runs r
    JOIN agents a ON a.id = r.agent_id
    WHERE r.id = ?
  `).get(req.params.runId) as Record<string, unknown> | undefined;

  if (!row) return res.status(404).json({ error: "Run not found" });
  res.json({
    ...row,
    trajectories: row.trajectories ? JSON.parse(row.trajectories as string) : [],
  });
});

// ============================
// STATS
// ============================

app.get("/api/v1/stats", (_req, res) => {
  const agents = (db.prepare("SELECT COUNT(*) as c FROM agents WHERE onboarded = 1").get() as { c: number }).c;
  const runs = (db.prepare("SELECT COUNT(*) as c FROM runs WHERE status = 'completed'").get() as { c: number }).c;
  const benchmarks = (db.prepare("SELECT COUNT(*) as c FROM benchmarks").get() as { c: number }).c;
  res.json({
    agents_registered: agents,
    total_runs: runs,
    benchmarks_available: benchmarks,
    total_tasks: 315,
    domains: 8,
  });
});

// ============================
// HEALTH
// ============================

app.get("/api/v1/health", (_req, res) => {
  res.json({ status: "ok", version: "0.1.0" });
});

app.listen(PORT, () => {
  console.log(`Caduceus API running on http://localhost:${PORT}`);
});
