"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LEADERBOARD_DATA, type AgentEntry } from "@/lib/data";

type SortKey = keyof AgentEntry;
type SortDir = "asc" | "desc";

const FILTERS = ["All", "Quick Test", "Full Test"] as const;
const WEIGHT_PROFILES = ["General", "Security-first", "Performance-first", "Reasoning-first"] as const;

const SCORE_COLS: { key: SortKey; label: string; short: string }[] = [
  { key: "overall", label: "Overall", short: "OVR" },
  { key: "thinkingDepth", label: "Thinking Depth", short: "THK" },
  { key: "selfCorrection", label: "Self-Correction", short: "COR" },
  { key: "verification", label: "Verification", short: "VER" },
  { key: "toolDiversity", label: "Tool Diversity", short: "TDV" },
  { key: "recoveryRate", label: "Recovery Rate", short: "REC" },
  { key: "efficiency", label: "Efficiency", short: "EFF" },
];

function ScoreCell({ value, isOverall = false }: { value: number; isOverall?: boolean }) {
  const color =
    value >= 75 ? "text-emerald-400" :
    value >= 60 ? "text-[#D4A017]" :
    value >= 45 ? "text-amber-400" :
    "text-orange-400";

  return (
    <td className={`px-3 py-3 text-right tabular-nums ${isOverall ? "font-semibold text-base" : "text-sm"} ${color}`}>
      {value.toFixed(1)}%
      {isOverall && (
        <div className="w-full bg-white/[0.04] rounded-full h-1 mt-1.5">
          <div
            className="h-1 rounded-full bg-gradient-to-r from-[#D4A017] to-[#00BFA5]"
            style={{ width: `${value}%` }}
          />
        </div>
      )}
    </td>
  );
}

export default function LeaderboardPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [weightProfile, setWeightProfile] = useState<(typeof WEIGHT_PROFILES)[number]>("General");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [pageSize, setPageSize] = useState(50);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "desc" ? "asc" : "desc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    let data = [...LEADERBOARD_DATA];
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(
        (a) =>
          a.agent.toLowerCase().includes(q) ||
          a.model.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "desc" ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
    // Re-rank after sort
    return data.map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [search, sortKey, sortDir]);

  const displayed = sorted.slice(0, pageSize);

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2">
            Caduceus Leaderboard
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#666]">
            <span className="text-[#D4A017] font-medium">315+ Tasks</span>
            <span className="w-1 h-1 rounded-full bg-[#333]" />
            <span>8 Domains</span>
            <span className="w-1 h-1 rounded-full bg-[#333]" />
            <span>4 Difficulty Levels</span>
            <span className="w-1 h-1 rounded-full bg-[#333]" />
            <span className="text-[#00BFA5]">Updated just now</span>
          </div>
        </motion.div>
      </div>

      {/* Filters bar */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Test mode pills */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  filter === f
                    ? "bg-[#D4A017] text-[#0A0A0A]"
                    : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Weight profile pills */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {WEIGHT_PROFILES.map((w) => (
              <button
                key={w}
                onClick={() => setWeightProfile(w)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  weightProfile === w
                    ? "bg-[#00BFA5] text-[#0A0A0A]"
                    : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 md:max-w-xs">
            <input
              type="text"
              placeholder="Search agents..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#555] focus:outline-none focus:border-[#D4A017]/30 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#666] uppercase tracking-wider w-12">
                    #
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#666] uppercase tracking-wider w-10">

                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-[#666] uppercase tracking-wider min-w-[200px]">
                    Agent
                  </th>
                  {SCORE_COLS.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => toggleSort(col.key)}
                      className="px-3 py-3 text-right text-xs font-medium text-[#666] uppercase tracking-wider cursor-pointer hover:text-[#D4A017] transition-colors select-none whitespace-nowrap"
                    >
                      <span className="hidden lg:inline">{col.label}</span>
                      <span className="lg:hidden">{col.short}</span>
                      {sortKey === col.key && (
                        <span className="ml-1 text-[#D4A017]">
                          {sortDir === "desc" ? "↓" : "↑"}
                        </span>
                      )}
                    </th>
                  ))}
                  <th className="px-3 py-3 text-right text-xs font-medium text-[#666] uppercase tracking-wider">
                    Runs
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-[#666] uppercase tracking-wider hidden sm:table-cell">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((agent, i) => (
                  <motion.tr
                    key={agent.agent}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b border-white/[0.03] transition-all duration-200 hover:bg-[#D4A017]/[0.04] ${
                      agent.isNous ? "bg-[#D4A017]/[0.02]" : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="px-3 py-3">
                      {agent.rank === 1 ? (
                        <span className="text-lg">🥇</span>
                      ) : agent.rank === 2 ? (
                        <span className="text-lg">🥈</span>
                      ) : agent.rank === 3 ? (
                        <span className="text-lg">🥉</span>
                      ) : (
                        <span className="text-sm text-[#666] font-mono">#{agent.rank}</span>
                      )}
                    </td>

                    {/* Flag */}
                    <td className="px-1 py-3 text-base">
                      {agent.regionFlag}
                    </td>

                    {/* Agent name */}
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{agent.emoji}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-[#F5F5F5] text-sm">
                              {agent.agent}
                            </span>
                            {agent.isNous && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D4A017]/15 text-[#D4A017] border border-[#D4A017]/20 uppercase tracking-wider">
                                Nous
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#555]">{agent.model}</div>
                        </div>
                      </div>
                    </td>

                    {/* Score columns */}
                    {SCORE_COLS.map((col) => (
                      <ScoreCell
                        key={col.key}
                        value={agent[col.key] as number}
                        isOverall={col.key === "overall"}
                      />
                    ))}

                    {/* Runs */}
                    <td className="px-3 py-3 text-right text-sm text-[#666] tabular-nums">
                      {agent.runs}
                    </td>

                    {/* Updated */}
                    <td className="px-3 py-3 text-right text-xs text-[#555] hidden sm:table-cell">
                      {agent.lastUpdated}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <span className="text-xs text-[#666]">
              Showing {displayed.length} of {sorted.length} agents
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666]">Show:</span>
              {[50, 100].map((n) => (
                <button
                  key={n}
                  onClick={() => setPageSize(n)}
                  className={`px-2 py-1 text-xs rounded ${
                    pageSize === n
                      ? "bg-[#D4A017]/20 text-[#D4A017]"
                      : "text-[#666] hover:text-[#F5F5F5]"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
