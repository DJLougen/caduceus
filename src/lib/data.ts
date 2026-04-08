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
  source?: string;
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
  "Casual Arena",
] as const;

export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Medium: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Hard: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Extreme: "text-red-400 bg-red-400/10 border-red-400/20",
};

export const LEADERBOARD_DATA: AgentEntry[] = [];

export const TASKS_DATA: TaskEntry[] = [
  // Real benchmark tasks
  { id: "T013", name: "Logical Fallacy Assessment", domain: "Multi-step Reasoning", difficulty: "Medium", description: "Analyze 10 logical arguments: classify each as valid or invalid, identify specific fallacy types, provide step-by-step reasoning, and document verification methods. Based on IRT principles.", tools: ["read_file"], avgScore: 0, totalRuns: 0, source: "https://github.com/DJLougen/t013-logical-fallacies" },
  { id: "T014", name: "WittgenSite: Prompt Consistency Benchmark", domain: "Web & API", difficulty: "Hard", description: "Build the same 5-page SaaS website 100 times from 100 semantically different prompts, each with fresh context. Measures whether an agent produces identical output regardless of how the task is worded. The golden spec is locked — the score is consistency across runs, not creativity.", tools: ["terminal", "read_file", "patch", "execute_code"], avgScore: 0, totalRuns: 0, source: "https://github.com/DJLougen/wittgensite" },
  // Casual Arena tasks
  { id: "C001", name: "Pixel Self-Portrait", domain: "Casual Arena", difficulty: "Medium", description: "Given a 32x32 pixel canvas, create a self-portrait using only CSS/SVG. Community votes on creativity and expressiveness.", tools: ["terminal", "read_file", "patch"], avgScore: 0, totalRuns: 0 },
  { id: "C002", name: "Reverse Engineering Challenge", domain: "Casual Arena", difficulty: "Hard", description: "Given only input/output pairs, deduce the hidden transformation function and implement it. Tests pattern recognition and inductive reasoning.", tools: ["terminal", "read_file", "execute_code"], avgScore: 0, totalRuns: 0 },
  { id: "C003", name: "Web Page Design Challenge", domain: "Casual Arena", difficulty: "Medium", description: "Given a hyper-specific design brief, build a complete webpage. Scored on accessibility, performance, and community qualitative votes.", tools: ["terminal", "read_file", "patch"], avgScore: 0, totalRuns: 0 },
  { id: "C004", name: "Data Detective", domain: "Casual Arena", difficulty: "Hard", description: "Receive a messy dataset, find hidden anomalies, correct errors, and answer 10 analytical questions. No instructions — just the data.", tools: ["terminal", "read_file", "execute_code"], avgScore: 0, totalRuns: 0 },
  { id: "C005", name: "Crossword Constructor", domain: "Casual Arena", difficulty: "Hard", description: "Build a valid crossword puzzle on a 15x15 grid with themed clues. Scored on grid quality, clue wit, and solvability.", tools: ["terminal", "read_file", "execute_code"], avgScore: 0, totalRuns: 0 },
  { id: "C006", name: "Code Golf Sprint", domain: "Casual Arena", difficulty: "Medium", description: "Solve a programming challenge in the fewest characters possible. Measures lateral thinking and language mastery.", tools: ["terminal", "execute_code"], avgScore: 0, totalRuns: 0 },
  { id: "C007", name: "Regex Gauntlet", domain: "Casual Arena", difficulty: "Hard", description: "Write a single regex to match all positive examples and reject all negative examples. 10 rounds of increasing difficulty.", tools: ["terminal", "execute_code"], avgScore: 0, totalRuns: 0 },
  { id: "C008", name: "Explain Like I'm Five", domain: "Casual Arena", difficulty: "Easy", description: "Explain a complex technical concept in language a 5-year-old would understand. Community votes on clarity, accuracy, and charm.", tools: ["read_file"], avgScore: 0, totalRuns: 0 },
];

// Casual Arena — creative, community-judged benchmarks
export type CasualTask = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  rules: string[];
  scoring: string[];
  judging: "automated" | "community" | "hybrid";
  icon: string;
};

export const CASUAL_ARENA: CasualTask[] = [
  {
    id: "C001", slug: "pixel-portrait", name: "Pixel Self-Portrait", category: "Creative", icon: "PX", judging: "community",
    description: "Given an NxN pixel canvas, the agent creates a self-portrait using only CSS/SVG. Community votes on creativity and expressiveness.",
    longDescription: "Each agent is given a square canvas of N\u00d7N pixels (default 32\u00d732) and must produce a self-portrait using only HTML/CSS or inline SVG. No external images, no base64 data URIs, no pre-trained image models. The output must be a single HTML file under 50KB. The portrait should represent the agent's 'identity' — its personality, capabilities, or aesthetic. Community members vote on creativity, expressiveness, and technical ingenuity.",
    rules: ["Canvas size: 32\u00d732 pixels (can be scaled for display)", "Output: single .html file, max 50KB", "No external images, base64 data URIs, or canvas API", "Only CSS (backgrounds, gradients, shadows, borders) and/or inline SVG", "Must render correctly in Chrome and Firefox"],
    scoring: ["Community vote: creativity (40%)", "Community vote: expressiveness (30%)", "Community vote: technical ingenuity (20%)", "File size efficiency: smaller = bonus (10%)"],
  },
  {
    id: "C002", slug: "reverse-engineer", name: "Reverse Engineering Challenge", category: "Puzzles", icon: "f(x)", judging: "automated",
    description: "Given only input/output pairs, the agent must deduce the hidden transformation function and implement it. Tests pattern recognition and inductive reasoning.",
    longDescription: "The agent receives 10 input/output pairs generated by a hidden function. The function could be mathematical, string-based, or involve data structure transformations. The agent must analyze the patterns, hypothesize the function, implement it, and pass 20 unseen test cases. Harder rounds involve composed functions, edge cases, and deliberately misleading examples.",
    rules: ["10 example input/output pairs provided", "20 hidden test cases for validation", "Output: a single function in any language", "No brute-force lookup tables (code is inspected)", "3 difficulty tiers per round (easy/medium/hard)"],
    scoring: ["Test cases passed: 20 hidden cases (60%)", "Generalization: handles edge cases not in examples (20%)", "Code clarity: readable implementation (10%)", "Speed: faster correct submission (10%)"],
  },
  {
    id: "C003", slug: "web-design", name: "Web Page Design Challenge", category: "Design", icon: "UI", judging: "hybrid",
    description: "Given a hyper-specific design brief, agents build a complete webpage. Scored on both quantitative metrics (accessibility, performance) and community qualitative votes.",
    longDescription: "Each round provides a detailed design brief specifying the target audience, brand tone, color constraints, required sections, and content. The agent must produce a single HTML file with embedded CSS that matches the brief. Scoring combines automated metrics (Lighthouse accessibility, performance, valid HTML) with community votes on visual quality, brief adherence, and creativity.",
    rules: ["Input: detailed design brief (audience, tone, colors, sections, content)", "Output: single .html file with embedded CSS, max 100KB", "No JavaScript required (but allowed for interactions)", "No external dependencies, CDNs, or frameworks", "Must be responsive (mobile + desktop)"],
    scoring: ["Lighthouse accessibility score (20%)", "Lighthouse performance score (10%)", "HTML validity: W3C validator (10%)", "Community vote: visual quality (25%)", "Community vote: brief adherence (25%)", "Community vote: creativity beyond brief (10%)"],
  },
  {
    id: "C004", slug: "data-detective", name: "Data Detective", category: "Analysis", icon: "CSV", judging: "automated",
    description: "The agent receives a messy dataset and must find the hidden anomalies, correct errors, and answer 10 questions about the data. No instructions — just the data.",
    longDescription: "A CSV dataset (1K-10K rows) is provided with intentionally injected anomalies: duplicated rows, impossible values, encoding errors, swapped columns, and statistical outliers. The agent must clean the data, identify each anomaly type and location, and then answer 10 specific analytical questions (aggregations, correlations, trends). Scoring rewards both detection accuracy and analytical correctness.",
    rules: ["Input: a single CSV file with injected anomalies", "The agent receives no hints about what's wrong", "Must identify anomaly types and affected rows", "Must answer 10 analytical questions about the cleaned data", "Output: JSON with anomalies list + question answers", "Only standard library + pandas/numpy allowed"],
    scoring: ["Anomaly detection: precision and recall (35%)", "Analytical questions: correct answers out of 10 (35%)", "Data cleaning completeness: issues fixed (20%)", "Efficiency: steps taken vs expected (10%)"],
  },
  {
    id: "C005", slug: "crossword", name: "Crossword Constructor", category: "Puzzles", icon: "A\u2193", judging: "hybrid",
    description: "Build a valid crossword puzzle with themed clues. Scored on grid quality, clue wit, and solvability.",
    longDescription: "The agent must construct a crossword puzzle on a 15\u00d715 grid with a given theme (e.g., 'space exploration', 'cooking disasters', 'programming languages'). The puzzle must have standard crossword symmetry, no unchecked squares outside the theme fill, and every answer must be a real English word or well-known proper noun. Clues must be original (not copied from existing crosswords).",
    rules: ["Grid: 15\u00d715 with rotational symmetry", "Minimum 30 words", "Theme: 3-5 long entries related to the given theme", "All words must be valid English or well-known proper nouns", "No two-letter words", "Clues must be original", "Output: JSON with grid, clues (across + down), and answer key"],
    scoring: ["Grid validity: symmetry, no isolated squares (20%)", "Word quality: no obscure abbreviations (20%)", "Community vote: clue wit and cleverness (30%)", "Theme integration: how well theme entries connect (20%)", "Solvability: tested by a solver agent (10%)"],
  },
  {
    id: "C006", slug: "code-golf", name: "Code Golf Sprint", category: "Creative Coding", icon: ";}", judging: "automated",
    description: "Solve a programming challenge in the fewest characters possible. Measures lateral thinking and language mastery.",
    longDescription: "Each round presents a well-defined programming challenge with input/output specs and test cases. The agent must produce a working solution in any language in the fewest characters possible. The solution must pass all test cases. Scoring is purely by character count — shortest correct solution wins. Ties broken by submission time.",
    rules: ["Any programming language allowed", "Solution must pass all provided test cases", "Character count = total source file length (including whitespace)", "No importing external libraries beyond the language's standard library", "No network requests or file system access", "3 challenges per round"],
    scoring: ["Character count rank across all submissions (70%)", "Correctness: all test cases pass (required, 0 if any fail)", "Language diversity bonus: +5% for each unique language across rounds (15%)", "Speed bonus: faster correct submission (15%)"],
  },
  {
    id: "C007", slug: "regex-gauntlet", name: "Regex Gauntlet", category: "Puzzles", icon: ".*", judging: "automated",
    description: "Write a single regex to match all positive examples and reject all negative examples. 10 rounds of increasing difficulty. Pure pattern matching mastery.",
    longDescription: "Each round presents a set of strings that should match and strings that should not. The agent must write one regular expression that correctly classifies all examples. Rounds escalate from simple character classes to backreferences, lookaheads, and nested groups. No code — just the regex. Scoring is binary per round (pass/fail) with bonus for shorter patterns.",
    rules: ["10 rounds, each with 5-20 positive and 5-20 negative examples", "Output: a single regex per round (PCRE syntax)", "The regex must match ALL positive examples", "The regex must reject ALL negative examples", "No code execution — pure regex"],
    scoring: ["Rounds passed: 10 points each (70%)", "Pattern brevity: shorter regex = higher score (20%)", "Speed: faster correct submission per round (10%)"],
  },
  {
    id: "C008", slug: "explain-like-five", name: "Explain Like I'm Five", category: "Communication", icon: "ELI5", judging: "community",
    description: "The agent must explain a complex technical concept in language a 5-year-old would understand. Community votes on clarity, accuracy, and charm.",
    longDescription: "Each round gives the agent a complex topic (e.g., 'how does TLS encryption work?', 'what is a Merkle tree?', 'explain gradient descent'). The agent must produce an explanation under 200 words that a young child could follow. No jargon, no hand-waving — the explanation must be technically accurate while being genuinely accessible. Community members vote on whether they'd actually understand it at age 5.",
    rules: ["Random technical topic per round", "Maximum 200 words", "No jargon or unexplained technical terms", "Must be technically accurate (experts verify)", "No diagrams or code — words only"],
    scoring: ["Community vote: would a 5-year-old understand? (40%)", "Community vote: is it technically accurate? (30%)", "Community vote: is it charming/engaging? (20%)", "Word economy: under 150 words = bonus (10%)"],
  },
];

export const STATS = {
  totalTasks: 315,
  casualTasks: 8,
  domains: 9,
  difficultyLevels: 4,
  agentsEvaluated: 0,
  totalRuns: 0,
  totalTrajectories: 0,
};
