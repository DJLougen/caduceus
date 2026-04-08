"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TASKS_DATA, DOMAINS, DIFFICULTY_COLORS, CASUAL_ARENA, type TaskEntry } from "@/lib/data";
import { fetchTasks } from "@/lib/api";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard", "Extreme"] as const;

// Map casual task IDs to their slugs for linking
const CASUAL_SLUG_MAP: Record<string, string> = Object.fromEntries(
  CASUAL_ARENA.map((t) => [t.id, t.slug])
);

function TaskModal({ task, onClose }: { task: TaskEntry; onClose: () => void }) {
  const casualSlug = CASUAL_SLUG_MAP[task.id];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#111] border border-white/[0.08] rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-[10px] font-mono text-[#555]">{task.id}</span>
            <h3 className="font-semibold text-lg text-[#F5F5F5] mt-1">{task.name}</h3>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-[#F5F5F5] transition-colors text-xl">&times;</button>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[task.difficulty]}`}>
            {task.difficulty}
          </span>
          <span className="text-xs text-[#888] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">{task.domain}</span>
        </div>

        <p className="text-sm text-[#999] leading-relaxed mb-5">{task.description}</p>

        {task.tools.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-medium text-[#888] uppercase tracking-wider mb-2">Tools</h4>
            <div className="flex flex-wrap gap-1.5">
              {task.tools.map((tool) => (
                <span key={tool} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-[#888] border border-white/[0.06]">{tool}</span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-[#555] mb-5">
          <span>Avg Score: <span className="text-[#D4A017]">{task.avgScore > 0 ? `${task.avgScore}%` : "—"}</span></span>
          <span>{task.totalRuns > 0 ? `${task.totalRuns} runs` : "No runs yet"}</span>
        </div>

        <div className="flex flex-col gap-2">
          {task.source && (
            <a
              href={task.source}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#D4A017] hover:bg-[#D4A017]/20 font-medium py-2.5 rounded-lg transition-all text-sm"
            >
              Go to Task
            </a>
          )}
          {casualSlug && (
            <Link
              href={`/arena/${casualSlug}`}
              className="block w-full text-center bg-[#00BFA5]/10 border border-[#00BFA5]/20 text-[#00BFA5] hover:bg-[#00BFA5]/20 font-medium py-2.5 rounded-lg transition-all text-sm"
            >
              View Full Challenge Details
            </Link>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function mapApiTask(t: Record<string, unknown>): TaskEntry {
  return {
    id: t.id as string,
    name: t.name as string,
    domain: t.domain as string,
    difficulty: t.difficulty as TaskEntry["difficulty"],
    description: t.description as string,
    tools: (t.tools_available as string[]) || [],
    avgScore: (t.avg_score as number) || 0,
    totalRuns: (t.total_runs as number) || 0,
  };
}

export default function TasksPage() {
  const [liveTasks, setLiveTasks] = useState<TaskEntry[] | null>(null);
  const [domainFilter, setDomainFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<TaskEntry | null>(null);

  useEffect(() => {
    fetchTasks().then((data) => {
      if (data && data.length > 0) setLiveTasks(data.map(mapApiTask));
    });
  }, []);

  const allTasks = liveTasks || TASKS_DATA;

  const filtered = useMemo(() => {
    return allTasks.filter((t) => {
      if (domainFilter !== "All" && t.domain !== domainFilter) return false;
      if (diffFilter !== "All" && t.difficulty !== diffFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [allTasks, domainFilter, diffFilter, search]);

  return (
    <div className="min-h-screen pt-20">
      <AnimatePresence>
        {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2">
            Task Catalog
          </h1>
          <p className="text-sm text-[#666]">
            Browse tasks across 9 domains. Each task is derived from real production scenarios and adversarial conditions.
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          {/* Domain */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setDomainFilter("All")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                domainFilter === "All" ? "bg-[#D4A017] text-[#0A0A0A]" : "text-[#999] hover:text-[#F5F5F5] bg-[#111] border border-white/[0.06]"
              }`}
            >
              All Domains
            </button>
            {DOMAINS.map((d) => (
              <button
                key={d}
                onClick={() => setDomainFilter(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  domainFilter === d ? "bg-[#D4A017] text-[#0A0A0A]" : "text-[#999] hover:text-[#F5F5F5] bg-[#111] border border-white/[0.06]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  diffFilter === d ? "bg-[#00BFA5] text-[#0A0A0A]" : "text-[#999] hover:text-[#F5F5F5]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#555] focus:outline-none focus:border-[#D4A017]/30 transition-colors w-full lg:max-w-xs"
          />
        </div>
      </div>

      {/* Task cards */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setSelectedTask(task)}
              className="bg-[#111] border border-white/[0.06] rounded-xl p-5 hover:border-[#D4A017]/20 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-mono text-[#555]">{task.id}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${DIFFICULTY_COLORS[task.difficulty]}`}>
                  {task.difficulty}
                </span>
              </div>
              <h3 className="font-semibold text-sm text-[#F5F5F5] mb-2 group-hover:text-[#D4A017] transition-colors">
                {task.name}
              </h3>
              <p className="text-xs text-[#666] leading-relaxed mb-4">{task.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {task.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-[#888] border border-white/[0.06]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-[#555]">
                <span>{task.domain}</span>
                <div className="flex items-center gap-3">
                  <span>Avg: <span className="text-[#D4A017]">{task.avgScore}%</span></span>
                  <span>{task.totalRuns} runs</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#555]">
            <p className="mb-1">No tasks loaded.</p>
            <p className="text-xs text-[#444]">Tasks will appear here when the API is online, or adjust your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
