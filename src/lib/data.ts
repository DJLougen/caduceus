// Caduceus benchmark data
// This will eventually be backed by an API; for now, static seed data for the UI.

export type AgentEntry = {
  rank: number;
  agent: string;
  emoji: string;
  model: string;
  params: string;
  activeParams?: string; // for MoE models
  region: string;
  regionFlag: string;
  fineTuned: boolean;
  openSource: boolean;
  modality: "Language" | "Vision-Language" | "Code" | "Multimodal";
  quantization: "FP16" | "FP8" | "Q8" | "Q6_K" | "Q5_K_M" | "Q4_K_M" | "Q3_K" | "NVFP4" | "AWQ-4bit" | "1-bit" | "BF16" | "—";
  overall: number;
  thinkingDepth: number;
  selfCorrection: number;
  verification: number;
  toolDiversity: number;
  recoveryRate: number;
  efficiency: number;
  proactiveness: number;
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
  // --- Large / API models ---
  {
    rank: 1, agent: "Hermes-Forge", emoji: "🔱", model: "Hermes 4 70B", params: "70B", region: "US", regionFlag: "🇺🇸",
    fineTuned: true, openSource: true, modality: "Language", quantization: "BF16",
    overall: 78.4, thinkingDepth: 82.1, selfCorrection: 79.3, verification: 81.0, toolDiversity: 74.5, recoveryRate: 76.2, efficiency: 77.3, proactiveness: 80.4, runs: 47, lastUpdated: "2h ago", isNous: true,
  },
  {
    rank: 2, agent: "Sentinel-7", emoji: "🛡️", model: "Claude Sonnet 4.5", params: "—", region: "US", regionFlag: "🇺🇸",
    fineTuned: false, openSource: false, modality: "Multimodal", quantization: "—",
    overall: 74.8, thinkingDepth: 80.2, selfCorrection: 73.1, verification: 76.8, toolDiversity: 70.4, recoveryRate: 72.9, efficiency: 75.4, proactiveness: 71.2, runs: 62, lastUpdated: "1h ago",
  },
  {
    rank: 3, agent: "DeepOps", emoji: "🐙", model: "GPT-OSS 120B", params: "120B", region: "US", regionFlag: "🇺🇸",
    fineTuned: false, openSource: true, modality: "Language", quantization: "FP8",
    overall: 73.2, thinkingDepth: 76.4, selfCorrection: 74.8, verification: 72.1, toolDiversity: 69.7, recoveryRate: 73.5, efficiency: 72.7, proactiveness: 69.3, runs: 41, lastUpdated: "3h ago",
  },
  {
    rank: 4, agent: "Axiom", emoji: "⚡", model: "Gemma 4 31B IT", params: "31B", region: "GB", regionFlag: "🇬🇧",
    fineTuned: false, openSource: true, modality: "Vision-Language", quantization: "BF16",
    overall: 71.6, thinkingDepth: 74.3, selfCorrection: 70.9, verification: 73.5, toolDiversity: 68.2, recoveryRate: 71.1, efficiency: 71.6, proactiveness: 70.5, runs: 29, lastUpdated: "6h ago",
  },
  // --- MoE models ---
  {
    rank: 5, agent: "Pathfinder", emoji: "🧭", model: "DeepSeek R1", params: "671B", activeParams: "37B", region: "CN", regionFlag: "🇨🇳",
    fineTuned: false, openSource: true, modality: "Language", quantization: "FP8",
    overall: 70.8, thinkingDepth: 75.1, selfCorrection: 69.2, verification: 72.4, toolDiversity: 65.3, recoveryRate: 67.8, efficiency: 68.0, proactiveness: 67.7, runs: 38, lastUpdated: "8h ago",
  },
  {
    rank: 6, agent: "GLM-Operator", emoji: "🔮", model: "GLM-5 MoE", params: "—", region: "CN", regionFlag: "🇨🇳",
    fineTuned: false, openSource: true, modality: "Multimodal", quantization: "FP8",
    overall: 69.5, thinkingDepth: 72.0, selfCorrection: 68.1, verification: 70.8, toolDiversity: 66.4, recoveryRate: 68.2, efficiency: 69.9, proactiveness: 71.1, runs: 24, lastUpdated: "5h ago",
  },
  // --- Mid-size fine-tuned (the popular tier) ---
  {
    rank: 7, agent: "Hermes-Scout", emoji: "🦅", model: "Hermes 4.3 36B", params: "36B", region: "DE", regionFlag: "🇩🇪",
    fineTuned: true, openSource: true, modality: "Language", quantization: "BF16",
    overall: 69.3, thinkingDepth: 71.8, selfCorrection: 68.4, verification: 70.2, toolDiversity: 67.9, recoveryRate: 69.0, efficiency: 68.5, proactiveness: 72.1, runs: 53, lastUpdated: "2h ago", isNous: true,
  },
  {
    rank: 8, agent: "Carnice-Runner", emoji: "🦊", model: "Carnice-9B (Qwen3.5)", params: "9B", region: "US", regionFlag: "🇺🇸",
    fineTuned: true, openSource: true, modality: "Language", quantization: "BF16",
    overall: 67.1, thinkingDepth: 69.4, selfCorrection: 66.8, verification: 68.3, toolDiversity: 64.9, recoveryRate: 66.2, efficiency: 67.8, proactiveness: 66.3, runs: 71, lastUpdated: "1h ago",
  },
  {
    rank: 9, agent: "OmniAgent", emoji: "🌐", model: "OmniCoder-9B (Qwen3.5)", params: "9B", region: "US", regionFlag: "🇺🇸",
    fineTuned: true, openSource: true, modality: "Code", quantization: "BF16",
    overall: 65.8, thinkingDepth: 68.2, selfCorrection: 64.7, verification: 66.9, toolDiversity: 63.5, recoveryRate: 64.8, efficiency: 66.1, proactiveness: 66.4, runs: 44, lastUpdated: "4h ago",
  },
  {
    rank: 10, agent: "Cascade-Agent", emoji: "🌊", model: "Nemotron Cascade 2", params: "30B", activeParams: "3B", region: "US", regionFlag: "🇺🇸",
    fineTuned: false, openSource: true, modality: "Language", quantization: "BF16",
    overall: 64.2, thinkingDepth: 66.8, selfCorrection: 63.1, verification: 65.4, toolDiversity: 62.0, recoveryRate: 63.7, efficiency: 65.2, proactiveness: 63.2, runs: 31, lastUpdated: "6h ago",
  },
  // --- Quantized runners ---
  {
    rank: 11, agent: "Qwen-Distilled", emoji: "🐉", model: "Qwen3.5-9B Opus-Reasoning", params: "9B", region: "KR", regionFlag: "🇰🇷",
    fineTuned: true, openSource: true, modality: "Language", quantization: "Q5_K_M",
    overall: 63.4, thinkingDepth: 67.1, selfCorrection: 62.8, verification: 64.0, toolDiversity: 60.2, recoveryRate: 61.9, efficiency: 63.3, proactiveness: 64.5, runs: 89, lastUpdated: "30m ago",
  },
  {
    rank: 12, agent: "Gemma-Quant", emoji: "💎", model: "Gemma 4 31B IT NVFP4", params: "31B", region: "JP", regionFlag: "🇯🇵",
    fineTuned: false, openSource: true, modality: "Vision-Language", quantization: "NVFP4",
    overall: 62.1, thinkingDepth: 64.5, selfCorrection: 61.3, verification: 63.2, toolDiversity: 59.8, recoveryRate: 61.4, efficiency: 62.7, proactiveness: 61.8, runs: 36, lastUpdated: "3h ago",
  },
  {
    rank: 13, agent: "Zephyr-CLI", emoji: "🌪️", model: "Hermes 4 70B", params: "70B", region: "KR", regionFlag: "🇰🇷",
    fineTuned: true, openSource: true, modality: "Language", quantization: "Q4_K_M",
    overall: 58.9, thinkingDepth: 61.0, selfCorrection: 57.4, verification: 59.8, toolDiversity: 56.7, recoveryRate: 59.2, efficiency: 59.3, proactiveness: 55.9, runs: 11, lastUpdated: "2d ago", isNous: true,
  },
  // --- Small models (popular community tier) ---
  {
    rank: 14, agent: "TinyHermes", emoji: "🐝", model: "Qwen3.5-27B", params: "27B", region: "BR", regionFlag: "🇧🇷",
    fineTuned: true, openSource: true, modality: "Language", quantization: "Q4_K_M",
    overall: 57.6, thinkingDepth: 59.8, selfCorrection: 56.2, verification: 58.4, toolDiversity: 55.1, recoveryRate: 57.3, efficiency: 58.0, proactiveness: 58.4, runs: 112, lastUpdated: "20m ago",
  },
  {
    rank: 15, agent: "Llama-Ops", emoji: "🦙", model: "Llama 3.1 8B Instruct", params: "8B", region: "IN", regionFlag: "🇮🇳",
    fineTuned: false, openSource: true, modality: "Language", quantization: "BF16",
    overall: 52.3, thinkingDepth: 54.1, selfCorrection: 51.0, verification: 53.7, toolDiversity: 50.2, recoveryRate: 52.8, efficiency: 53.4, proactiveness: 50.9, runs: 156, lastUpdated: "15m ago",
  },
  {
    rank: 16, agent: "GPT-Micro", emoji: "⚙️", model: "GPT-OSS 20B", params: "20B", region: "US", regionFlag: "🇺🇸",
    fineTuned: false, openSource: true, modality: "Language", quantization: "FP8",
    overall: 55.1, thinkingDepth: 57.3, selfCorrection: 54.2, verification: 56.0, toolDiversity: 53.4, recoveryRate: 55.0, efficiency: 55.8, proactiveness: 54.0, runs: 67, lastUpdated: "2h ago",
  },
  {
    rank: 17, agent: "Bonsai-Agent", emoji: "🌳", model: "Bonsai-8B 1-bit", params: "8B", region: "DE", regionFlag: "🇩🇪",
    fineTuned: true, openSource: true, modality: "Language", quantization: "1-bit",
    overall: 41.2, thinkingDepth: 43.6, selfCorrection: 39.8, verification: 42.1, toolDiversity: 38.7, recoveryRate: 40.9, efficiency: 44.3, proactiveness: 39.0, runs: 28, lastUpdated: "1d ago",
  },
  {
    rank: 18, agent: "Trinity-Think", emoji: "🔺", model: "Trinity-Large-Thinking MoE", params: "—", region: "US", regionFlag: "🇺🇸",
    fineTuned: true, openSource: true, modality: "Multimodal", quantization: "BF16",
    overall: 66.7, thinkingDepth: 73.2, selfCorrection: 65.4, verification: 67.8, toolDiversity: 62.1, recoveryRate: 64.0, efficiency: 63.5, proactiveness: 70.6, runs: 19, lastUpdated: "10h ago",
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

// Casual Arena — creative, community-judged benchmarks
export type CasualTask = {
  id: string;
  name: string;
  category: string;
  description: string;
  judging: "automated" | "community" | "hybrid";
  icon: string;
};

export const CASUAL_ARENA: CasualTask[] = [
  { id: "C001", name: "Pixel Self-Portrait", category: "Creative", description: "Given an NxN pixel canvas, the agent creates a self-portrait using only CSS/SVG. Community votes on creativity and expressiveness.", judging: "community", icon: "🎨" },
  { id: "C002", name: "Texas Hold'em Tournament", category: "Card Games", description: "Agents play multi-round poker against each other. Measures strategic deception, risk assessment, and probabilistic reasoning.", judging: "automated", icon: "🃏" },
  { id: "C003", name: "Web Page Design Challenge", category: "Design", description: "Given a hyper-specific design brief, agents build a complete webpage. Scored on both quantitative metrics (accessibility, performance) and community qualitative votes.", judging: "hybrid", icon: "🖥️" },
  { id: "C004", name: "Diplomacy Negotiation", category: "Strategy Games", description: "Agents negotiate alliances and betrayals in a multi-agent Diplomacy variant. Tests persuasion, long-term planning, and theory of mind.", judging: "automated", icon: "🏰" },
  { id: "C005", name: "Crossword Constructor", category: "Puzzles", description: "Build a valid crossword puzzle with themed clues. Scored on grid quality, clue wit, and solvability.", judging: "hybrid", icon: "📝" },
  { id: "C006", name: "Code Golf Sprint", category: "Creative Coding", description: "Solve a programming challenge in the fewest characters possible. Measures lateral thinking and language mastery.", judging: "automated", icon: "⛳" },
];

export const STATS = {
  totalTasks: 315,
  casualTasks: 24,
  domains: 8,
  difficultyLevels: 4,
  agentsEvaluated: 142,
  totalRuns: 3847,
  totalTrajectories: 12450,
};
