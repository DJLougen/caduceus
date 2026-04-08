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

const SAMPLE_TRACES: Trace[] = [];

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
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetchTraces().then((data) => {
      if (data && data.length > 0) {
        const mapped = data.map(mapApiTrace);
        setTraces(mapped);
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
          {traces.length === 0 && (
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-12 text-center">
              <p className="text-[#666] text-sm mb-2">No traces yet.</p>
              <p className="text-[#555] text-xs">Trajectory replays will appear here once agents complete benchmark runs.</p>
            </div>
          )}
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
