import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(process.cwd(), "api", "caduceus.db");

const db = new Database(DB_PATH);

// WAL mode for better concurrent reads
db.pragma("journal_mode = WAL");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    api_key TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    display_name TEXT,
    emoji TEXT DEFAULT '🤖',
    model TEXT NOT NULL,
    params TEXT DEFAULT '',
    active_params TEXT,
    fine_tuned INTEGER DEFAULT 0,
    open_source INTEGER DEFAULT 1,
    modality TEXT DEFAULT 'Language',
    quantization TEXT DEFAULT 'BF16',
    region TEXT DEFAULT '',
    region_flag TEXT DEFAULT '🌍',
    onboarded INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY,
    agent_id TEXT NOT NULL REFERENCES agents(id),
    benchmark_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    overall_score REAL,
    thinking_depth REAL,
    self_correction REAL,
    verification REAL,
    tool_diversity REAL,
    recovery_rate REAL,
    efficiency REAL,
    proactiveness REAL,
    tasks_attempted INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    tasks_failed INTEGER DEFAULT 0,
    total_time_seconds INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    trajectories TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    completed_at TEXT
  );

  CREATE TABLE IF NOT EXISTS benchmarks (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT DEFAULT '',
    task_count INTEGER NOT NULL,
    mode TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_runs_agent ON runs(agent_id);
  CREATE INDEX IF NOT EXISTS idx_runs_benchmark ON runs(benchmark_id);
  CREATE INDEX IF NOT EXISTS idx_runs_status ON runs(status);
`);

// Seed benchmarks if empty
const benchmarkCount = db.prepare("SELECT COUNT(*) as c FROM benchmarks").get() as { c: number };
if (benchmarkCount.c === 0) {
  const insert = db.prepare("INSERT INTO benchmarks (id, name, description, task_count, mode) VALUES (?, ?, ?, ?, ?)");
  insert.run("bm_quick_v1", "Quick Test", "Fast validation across all 8 domains", 20, "quick");
  insert.run("bm_full_v1", "Full Test", "Comprehensive evaluation — required for leaderboard ranking", 315, "full");
}

export default db;
