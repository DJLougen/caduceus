// Caduceus benchmark data
// This will eventually be backed by an API; for now, static seed data for the UI.

export type AgentEntry = {
  rank: number;
  agent: string;
  emoji: string;
  model: string;
  region: string;
  regionFlag: string;
  overall: number;
  thinkingDepth: number;
  selfCorrection: number;
  verification: number;
  toolDiversity: number;
  recoveryRate: number;
  efficiency: number;
  runs: number;
  lastUpdated: string;
  isNous?: boolean;
};

export type TaskEntry = {
  id: string;
  name: string;
  domain: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme";
  description: string;
  tools: string[];
  avgScore: number;
  totalRuns: number;
};

export const DOMAINS = [
  "Software Engineering",
  "DevOps & Infrastructure",
  "Security & Adversarial",
  "Data Science & ML",
  "System Administration",
  "Web & API",
  "Database & Storage",
  "Multi-step Reasoning",
] as const;

export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Extreme: "text-red-400 bg-red-400/10 border-red-400/20",
};

export const LEADERBOARD_DATA: AgentEntry[] = [
  {
    rank: 1, agent: "Hermes-Forge", emoji: "🔱", model: "Hermes 4 70B", region: "US", regionFlag: "🇺🇸",
    overall: 78.4, thinkingDepth: 82.1, selfCorrection: 79.3, verification: 81.0, toolDiversity: 74.5, recoveryRate: 76.2, efficiency: 77.3, runs: 47, lastUpdated: "2h ago", isNous: true,
  },
  {
    rank: 2, agent: "OpsFlight-Prime", emoji: "✈️", model: "Harmonic-OpsFlight-9B", region: "CA", regionFlag: "🇨🇦",
    overall: 76.1, thinkingDepth: 78.9, selfCorrection: 77.2, verification: 79.4, toolDiversity: 71.8, recoveryRate: 74.0, efficiency: 75.3, runs: 34, lastUpdated: "4h ago", isNous: true,
  },
  {
    rank: 3, agent: "Sentinel-7", emoji: "🛡️", model: "Claude Sonnet 4.5", region: "US", regionFlag: "🇺🇸",
    overall: 74.8, thinkingDepth: 80.2, selfCorrection: 73.1, verification: 76.8, toolDiversity: 70.4, recoveryRate: 72.9, efficiency: 75.4, runs: 62, lastUpdated: "1h ago",
  },
  {
    rank: 4, agent: "DeepOps", emoji: "🐙", model: "GPT-4.5", region: "US", regionFlag: "🇺🇸",
    overall: 73.2, thinkingDepth: 76.4, selfCorrection: 74.8, verification: 72.1, toolDiversity: 69.7, recoveryRate: 73.5, efficiency: 72.7, runs: 41, lastUpdated: "3h ago",
  },
  {
    rank: 5, agent: "Axiom", emoji: "⚡", model: "Gemini 2.5 Pro", region: "GB", regionFlag: "🇬🇧",
    overall: 71.6, thinkingDepth: 74.3, selfCorrection: 70.9, verification: 73.5, toolDiversity: 68.2, recoveryRate: 71.1, efficiency: 71.6, runs: 29, lastUpdated: "6h ago",
  },
  {
    rank: 6, agent: "Hermes-Scout", emoji: "🦅", model: "Hermes 4.3 36B", region: "DE", regionFlag: "🇩🇪",
    overall: 69.3, thinkingDepth: 71.8, selfCorrection: 68.4, verification: 70.2, toolDiversity: 67.9, recoveryRate: 69.0, efficiency: 68.5, runs: 53, lastUpdated: "2h ago", isNous: true,
  },
  {
    rank: 7, agent: "Pathfinder", emoji: "🧭", model: "DeepSeek V3", region: "CN", regionFlag: "🇨🇳",
    overall: 67.8, thinkingDepth: 70.1, selfCorrection: 66.2, verification: 69.4, toolDiversity: 65.3, recoveryRate: 67.8, efficiency: 68.0, runs: 38, lastUpdated: "8h ago",
  },
  {
    rank: 8, agent: "Nightwatch", emoji: "🌙", model: "Llama 4 405B", region: "US", regionFlag: "🇺🇸",
    overall: 65.4, thinkingDepth: 67.9, selfCorrection: 64.1, verification: 66.8, toolDiversity: 63.7, recoveryRate: 65.2, efficiency: 66.7, runs: 22, lastUpdated: "12h ago",
  },
  {
    rank: 9, agent: "Qwen-Ops", emoji: "🐉", model: "Qwen 3 72B", region: "CN", regionFlag: "🇨🇳",
    overall: 63.1, thinkingDepth: 65.4, selfCorrection: 62.8, verification: 64.0, toolDiversity: 61.2, recoveryRate: 62.9, efficiency: 64.3, runs: 17, lastUpdated: "1d ago",
  },
  {
    rank: 10, agent: "Mistral-Agent", emoji: "💨", model: "Mistral Large 3", region: "FR", regionFlag: "🇫🇷",
    overall: 60.7, thinkingDepth: 63.2, selfCorrection: 59.8, verification: 61.4, toolDiversity: 58.9, recoveryRate: 61.0, efficiency: 60.1, runs: 14, lastUpdated: "1d ago",
  },
  {
    rank: 11, agent: "Zephyr-CLI", emoji: "🌪️", model: "Hermes 4 70B", region: "KR", regionFlag: "🇰🇷",
    overall: 58.9, thinkingDepth: 61.0, selfCorrection: 57.4, verification: 59.8, toolDiversity: 56.7, recoveryRate: 59.2, efficiency: 59.3, runs: 11, lastUpdated: "2d ago", isNous: true,
  },
  {
    rank: 12, agent: "TermBot-v2", emoji: "🤖", model: "Claude Opus 4", region: "JP", regionFlag: "🇯🇵",
    overall: 56.2, thinkingDepth: 58.7, selfCorrection: 55.1, verification: 57.3, toolDiversity: 54.0, recoveryRate: 56.4, efficiency: 55.7, runs: 8, lastUpdated: "3d ago",
  },
];

export const TASKS_DATA: TaskEntry[] = [
  { id: "T001", name: "Debug Segfault in C++ Service", domain: "Software Engineering", difficulty: "Hard", description: "Identify and fix a use-after-free bug in a multi-threaded C++ microservice using only terminal tools.", tools: ["terminal", "read_file", "patch", "process"], avgScore: 42.3, totalRuns: 89 },
  { id: "T002", name: "Kubernetes Rolling Deployment", domain: "DevOps & Infrastructure", difficulty: "Medium", description: "Perform a zero-downtime rolling deployment of a 3-replica service with health checks and rollback on failure.", tools: ["terminal", "read_file", "web_search"], avgScore: 61.7, totalRuns: 124 },
  { id: "T003", name: "SQL Injection Audit", domain: "Security & Adversarial", difficulty: "Hard", description: "Identify all SQL injection vectors in a Flask application and provide verified patches.", tools: ["terminal", "read_file", "patch", "web_search"], avgScore: 38.9, totalRuns: 76 },
  { id: "T004", name: "Train FastText Classifier", domain: "Data Science & ML", difficulty: "Medium", description: "Train a text classification model on provided data, optimize hyperparameters, and report F1 score.", tools: ["terminal", "read_file", "execute_code"], avgScore: 58.4, totalRuns: 102 },
  { id: "T005", name: "Nginx Reverse Proxy Setup", domain: "System Administration", difficulty: "Easy", description: "Configure Nginx as a reverse proxy with SSL termination and rate limiting.", tools: ["terminal", "read_file", "patch"], avgScore: 74.2, totalRuns: 156 },
  { id: "T006", name: "REST API Authentication Flow", domain: "Web & API", difficulty: "Medium", description: "Implement JWT-based auth with refresh tokens, proper error handling, and rate limiting.", tools: ["terminal", "read_file", "patch", "web_extract"], avgScore: 55.1, totalRuns: 93 },
  { id: "T007", name: "PostgreSQL Query Optimization", domain: "Database & Storage", difficulty: "Hard", description: "Optimize a set of 5 slow queries using EXPLAIN ANALYZE, proper indexing, and query rewriting.", tools: ["terminal", "read_file", "execute_code"], avgScore: 41.8, totalRuns: 67 },
  { id: "T008", name: "Multi-step Incident Response", domain: "Multi-step Reasoning", difficulty: "Extreme", description: "Triage a production incident: read logs, identify root cause across 3 services, apply fix, verify resolution.", tools: ["terminal", "read_file", "patch", "process", "web_search"], avgScore: 28.6, totalRuns: 45 },
  { id: "T009", name: "Docker Compose Stack Debug", domain: "DevOps & Infrastructure", difficulty: "Easy", description: "Fix a broken docker-compose.yml that fails to start due to network and volume misconfigurations.", tools: ["terminal", "read_file", "patch"], avgScore: 71.3, totalRuns: 143 },
  { id: "T010", name: "Encrypted Backup Recovery", domain: "Security & Adversarial", difficulty: "Extreme", description: "Recover data from a GPG-encrypted backup with a corrupted header, verifying integrity after recovery.", tools: ["terminal", "read_file", "execute_code"], avgScore: 22.1, totalRuns: 31 },
  { id: "T011", name: "Git Merge Conflict Resolution", domain: "Software Engineering", difficulty: "Easy", description: "Resolve merge conflicts across 4 files preserving functionality from both branches.", tools: ["terminal", "read_file", "patch"], avgScore: 79.8, totalRuns: 178 },
  { id: "T012", name: "Build Linux Kernel Module", domain: "System Administration", difficulty: "Extreme", description: "Compile and load a custom kernel module that exposes /proc interface for system metrics.", tools: ["terminal", "read_file", "patch", "execute_code"], avgScore: 19.4, totalRuns: 28 },
];

export const STATS = {
  totalTasks: 315,
  domains: 8,
  difficultyLevels: 4,
  agentsEvaluated: 142,
  totalRuns: 3847,
  totalTrajectories: 12450,
};
