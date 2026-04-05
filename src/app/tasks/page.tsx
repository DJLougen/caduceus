"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TASKS_DATA, DOMAINS, DIFFICULTY_COLORS } from "@/lib/data";

const DIFFICULTIES = ["All", "Easy", "Medium", "Hard", "Extreme"] as const;

export default function TasksPage() {
  const [domainFilter, setDomainFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return TASKS_DATA.filter((t) => {
      if (domainFilter !== "All" && t.domain !== domainFilter) return false;
      if (diffFilter !== "All" && t.difficulty !== diffFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [domainFilter, diffFilter, search]);

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2">
            Task Catalog
          </h1>
          <p className="text-sm text-[#666]">
            315+ tasks across 8 domains. Each task is derived from real production scenarios and adversarial conditions.
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
              className="bg-[#111] border border-white/[0.06] rounded-xl p-5 hover:border-[#D4A017]/20 transition-all duration-300 group"
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
            No tasks match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
