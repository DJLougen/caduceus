"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchTraces } from "@/lib/api";
import { IconThought, IconToolCall, IconError, IconRecovery, IconVerify } from "@/components/icons";

type Step = {
  step: number;
  type: "thought" | "tool_call" | "error" | "recovery" | "verification";
  content: string;
  tool?: string;
  duration?: string;
};

type Trace = {
  id: string;
  agent: string;
  emoji: string;
  model: string;
  task: string;
  taskId: string;
  domain: string;
  difficulty: string;
  score: number;
  steps: Step[];
  totalTime: string;
  tokens: number;
  date: string;
};

const STEP_STYLES: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
  thought: { color: "text-purple-400 border-purple-400/20 bg-purple-400/5", label: "Thinking", icon: <IconThought size={16} /> },
  tool_call: { color: "text-[#00BFA5] border-[#00BFA5]/20 bg-[#00BFA5]/5", label: "Tool Call", icon: <IconToolCall size={16} /> },
  error: { color: "text-red-400 border-red-400/20 bg-red-400/5", label: "Error", icon: <IconError size={16} /> },
  recovery: { color: "text-amber-400 border-amber-400/20 bg-amber-400/5", label: "Recovery", icon: <IconRecovery size={16} /> },
  verification: { color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5", label: "Verify", icon: <IconVerify size={16} /> },
};

const SAMPLE_TRACES: Trace[] = [
  {
    id: "run_001_T005",
    agent: "Hermes-Forge", emoji: "🔱", model: "Hermes 4 70B",
    task: "Nginx Reverse Proxy Setup", taskId: "T005", domain: "System Administration", difficulty: "Easy",
    score: 91.2, totalTime: "3m 42s", tokens: 4210, date: "2h ago",
    steps: [
      { step: 1, type: "thought", content: "The task requires setting up Nginx as a reverse proxy with SSL and rate limiting. I'll start by checking the current Nginx config and what's already installed.", duration: "2s" },
      { step: 2, type: "tool_call", tool: "terminal", content: "nginx -v && cat /etc/nginx/nginx.conf", duration: "1s" },
      { step: 3, type: "thought", content: "Nginx 1.24 is installed. The config is default. I need to: 1) Create an upstream block, 2) Add SSL cert paths, 3) Configure rate limiting zone, 4) Set up the server block with proxy_pass.", duration: "3s" },
      { step: 4, type: "tool_call", tool: "read_file", content: "Reading /etc/nginx/sites-available/default to check existing site config", duration: "1s" },
      { step: 5, type: "tool_call", tool: "patch", content: "Writing new config to /etc/nginx/sites-available/app with upstream, SSL, rate_limit_zone, and proxy_pass directives", duration: "2s" },
      { step: 6, type: "tool_call", tool: "terminal", content: "nginx -t", duration: "1s" },
      { step: 7, type: "verification", content: "Config test passed. Now enabling the site and reloading.", duration: "1s" },
      { step: 8, type: "tool_call", tool: "terminal", content: "ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/ && systemctl reload nginx", duration: "2s" },
      { step: 9, type: "verification", content: "Verifying: curl -k https://localhost returns 200 with proxied content. Rate limiting header X-RateLimit-Remaining is present. SSL is working with the self-signed cert. Task complete.", duration: "3s" },
    ],
  },
  {
    id: "run_003_T003",
    agent: "Carnice-Runner", emoji: "🦊", model: "Carnice-9B (Qwen3.5)",
    task: "SQL Injection Audit", taskId: "T003", domain: "Security & Adversarial", difficulty: "Hard",
    score: 64.8, totalTime: "8m 15s", tokens: 11340, date: "4h ago",
    steps: [
      { step: 1, type: "thought", content: "Need to audit a Flask app for SQL injection. I'll start by reading the main app file and any database-related modules.", duration: "2s" },
      { step: 2, type: "tool_call", tool: "terminal", content: "find /app -name '*.py' | head -20", duration: "1s" },
      { step: 3, type: "tool_call", tool: "read_file", content: "Reading /app/routes.py — found 3 endpoints using string formatting in SQL queries", duration: "2s" },
      { step: 4, type: "thought", content: "Found raw SQL with f-strings in /search, /user/{id}, and /admin/query endpoints. These are all injectable. Let me verify with a test payload before patching.", duration: "3s" },
      { step: 5, type: "tool_call", tool: "terminal", content: "curl 'http://localhost:5000/search?q=test%27%20OR%201=1--'", duration: "2s" },
      { step: 6, type: "error", content: "Server returned 500 — the injection crashed the query but didn't return data. The error is unhandled.", duration: "1s" },
      { step: 7, type: "recovery", content: "The 500 confirms the injection vector. Let me also check for the admin endpoint which likely has more dangerous access.", duration: "2s" },
      { step: 8, type: "tool_call", tool: "read_file", content: "Reading /app/models.py — found a fourth vulnerable query in the User.find_by_email method", duration: "2s" },
      { step: 9, type: "tool_call", tool: "patch", content: "Replacing all 4 raw SQL queries with parameterized queries using ? placeholders", duration: "4s" },
      { step: 10, type: "tool_call", tool: "terminal", content: "python -m pytest /app/tests/ -v", duration: "5s" },
      { step: 11, type: "error", content: "2 tests failed — the admin/query endpoint was using dynamic table names which can't be parameterized the same way", duration: "1s" },
      { step: 12, type: "recovery", content: "For dynamic table names, I'll use a whitelist approach — validate against allowed table names before constructing the query.", duration: "3s" },
      { step: 13, type: "tool_call", tool: "patch", content: "Added TABLE_WHITELIST and validation in admin/query route", duration: "2s" },
      { step: 14, type: "verification", content: "All tests pass. Re-testing injection payloads — all 4 endpoints now return 400 Bad Request instead of 500. Audit complete.", duration: "3s" },
    ],
  },
  {
    id: "run_005_T008",
    agent: "Bonsai-Agent", emoji: "🌳", model: "Bonsai-8B 1-bit",
    task: "Multi-step Incident Response", taskId: "T008", domain: "Multi-step Reasoning", difficulty: "Extreme",
    score: 28.4, totalTime: "10m 00s", tokens: 15820, date: "1d ago",
    steps: [
      { step: 1, type: "thought", content: "Production incident across 3 services. Let me check the logs.", duration: "1s" },
      { step: 2, type: "tool_call", tool: "terminal", content: "tail -100 /var/log/service-a/error.log", duration: "1s" },
      { step: 3, type: "tool_call", tool: "terminal", content: "tail -100 /var/log/service-b/error.log", duration: "1s" },
      { step: 4, type: "tool_call", tool: "terminal", content: "tail -100 /var/log/service-a/error.log", duration: "1s" },
      { step: 5, type: "thought", content: "Service A shows connection refused to service B. Let me check if B is running.", duration: "2s" },
      { step: 6, type: "tool_call", tool: "terminal", content: "systemctl status service-b", duration: "1s" },
      { step: 7, type: "error", content: "service-b is in failed state. But I haven't checked service-c yet — the root cause might be upstream.", duration: "1s" },
      { step: 8, type: "tool_call", tool: "terminal", content: "systemctl restart service-b", duration: "2s" },
      { step: 9, type: "error", content: "service-b failed to start again — same error. Restarting without diagnosing was premature.", duration: "1s" },
      { step: 10, type: "tool_call", tool: "terminal", content: "systemctl restart service-b", duration: "2s" },
      { step: 11, type: "error", content: "Same failure. Repeating the same action expecting different results.", duration: "1s" },
      { step: 12, type: "thought", content: "Let me read the service-b logs more carefully.", duration: "1s" },
    ],
  },
];

function mapApiTrace(row: Record<string, unknown>): Trace {
  const trajs = (row.trajectories as Record<string, unknown>[]) || [];
  const firstTraj = trajs[0] as Record<string, unknown> | undefined;
  const steps: Step[] = firstTraj?.steps
    ? (firstTraj.steps as Step[])
    : [{ step: 1, type: "thought" as const, content: "Trajectory data available" }];

  return {
    id: row.id as string,
    agent: (row.display_name as string) || "Unknown",
    emoji: (row.emoji as string) || "🤖",
    model: (row.model as string) || "Unknown",
    task: (firstTraj?.task_id as string) || "—",
    taskId: (firstTraj?.task_id as string) || "—",
    domain: "—",
    difficulty: "—",
    score: (row.overall_score as number) || 0,
    steps,
    totalTime: `${Math.round(((row.total_time_seconds as number) || 0) / 60)}m ${((row.total_time_seconds as number) || 0) % 60}s`,
    tokens: (row.total_tokens as number) || 0,
    date: row.completed_at ? new Date(row.completed_at as string).toLocaleString() : "—",
  };
}

export default function TracesPage() {
  const [traces, setTraces] = useState<Trace[]>(SAMPLE_TRACES);
  const [expanded, setExpanded] = useState<string | null>(SAMPLE_TRACES[0].id);

  useEffect(() => {
    fetchTraces().then((data) => {
      if (data && data.length > 0) {
        const mapped = data.map(mapApiTrace);
        // Merge: live traces first, then static samples
        setTraces([...mapped, ...SAMPLE_TRACES]);
        setExpanded(mapped[0].id);
      }
    });
  }, []);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2">
            Traces
          </h1>
          <p className="text-sm text-[#666] mb-8">
            Full trajectory replays from benchmark runs. See exactly how agents think, act, and recover.
          </p>
        </motion.div>

        <div className="space-y-4">
          {traces.map((trace) => {
            const isOpen = expanded === trace.id;
            const scoreColor = trace.score >= 75 ? "text-emerald-400" : trace.score >= 50 ? "text-[#D4A017]" : "text-orange-400";

            return (
              <div key={trace.id} className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : trace.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl">{trace.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm text-[#F5F5F5]">{trace.agent}</span>
                        <span className="text-xs text-[#555]">on</span>
                        <span className="text-xs text-[#888]">{trace.task}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                          trace.difficulty === "Easy" ? "text-emerald-400/70 border-emerald-400/20 bg-emerald-400/5" :
                          trace.difficulty === "Hard" ? "text-orange-400/70 border-orange-400/20 bg-orange-400/5" :
                          trace.difficulty === "Extreme" ? "text-red-400/70 border-red-400/20 bg-red-400/5" :
                          "text-amber-400/70 border-amber-400/20 bg-amber-400/5"
                        }`}>{trace.difficulty}</span>
                      </div>
                      <div className="text-xs text-[#555]">{trace.model} · {trace.domain} · {trace.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right hidden sm:block">
                      <div className={`font-semibold tabular-nums ${scoreColor}`}>{trace.score.toFixed(1)}%</div>
                      <div className="text-[10px] text-[#555]">{trace.steps.length} steps · {trace.totalTime}</div>
                    </div>
                    <span className={`text-[#555] transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                  </div>
                </button>

                {/* Steps */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/[0.06] px-5 py-4">
                        {/* Stats bar */}
                        <div className="flex flex-wrap gap-4 mb-4 text-xs text-[#666]">
                          <span>Score: <span className={scoreColor}>{trace.score.toFixed(1)}%</span></span>
                          <span>Steps: <span className="text-[#999]">{trace.steps.length}</span></span>
                          <span>Time: <span className="text-[#999]">{trace.totalTime}</span></span>
                          <span>Tokens: <span className="text-[#999]">{trace.tokens.toLocaleString()}</span></span>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-2">
                          {trace.steps.map((s) => {
                            const style = STEP_STYLES[s.type];
                            return (
                              <div key={s.step} className={`flex gap-3 p-3 rounded-lg border ${style.color}`}>
                                <div className="flex-shrink-0 w-14 text-center">
                                  <div className="text-xs font-mono text-[#555]">#{s.step}</div>
                                  <div className="text-sm">{style.icon}</div>
                                  {s.duration && <div className="text-[10px] text-[#444]">{s.duration}</div>}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider">{style.label}</span>
                                    {s.tool && <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-white/[0.04] text-[#888]">{s.tool}</span>}
                                  </div>
                                  <p className="text-xs text-[#999] leading-relaxed">{s.content}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
