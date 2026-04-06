"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LEADERBOARD_DATA, type AgentEntry } from "@/lib/data";
import { fetchLeaderboard } from "@/lib/api";

type SortKey = keyof AgentEntry;
type SortDir = "asc" | "desc";

const FILTERS = ["All", "Fine-tuned Only", "Base Only", "Quantized Only"] as const;
const WEIGHT_PROFILES = ["General", "Security-first", "Performance-first", "Reasoning-first"] as const;
const SIZE_FILTERS = ["All Sizes", "≤9B", "10–35B", "36–72B", "72B+"] as const;
const MODALITY_FILTERS = ["All Types", "Language", "Vision-Language", "Code", "Multimodal"] as const;
const SOURCE_FILTERS = ["All", "Open Source", "Closed Source"] as const;

const WEIGHT_MAPS: Record<string, Record<string, number>> = {
  General:            { thinkingDepth: 0.17, selfCorrection: 0.17, verification: 0.14, toolDiversity: 0.14, recoveryRate: 0.14, efficiency: 0.12, proactiveness: 0.12 },
  "Security-first":   { thinkingDepth: 0.10, selfCorrection: 0.10, verification: 0.25, toolDiversity: 0.10, recoveryRate: 0.25, efficiency: 0.10, proactiveness: 0.10 },
  "Performance-first":{ thinkingDepth: 0.20, selfCorrection: 0.10, verification: 0.10, toolDiversity: 0.10, recoveryRate: 0.10, efficiency: 0.25, proactiveness: 0.15 },
  "Reasoning-first":  { thinkingDepth: 0.25, selfCorrection: 0.20, verification: 0.10, toolDiversity: 0.10, recoveryRate: 0.10, efficiency: 0.05, proactiveness: 0.20 },
};

function computeWeighted(agent: AgentEntry, profile: string): number {
  const w = WEIGHT_MAPS[profile] || WEIGHT_MAPS.General;
  return (
    agent.thinkingDepth * w.thinkingDepth +
    agent.selfCorrection * w.selfCorrection +
    agent.verification * w.verification +
    agent.toolDiversity * w.toolDiversity +
    agent.recoveryRate * w.recoveryRate +
    agent.efficiency * w.efficiency +
    agent.proactiveness * w.proactiveness
  );
}

function parseParamNum(params: string): number {
  if (params === "—") return -1;
  const match = params.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : -1;
}

const SCORE_COLS: { key: SortKey; label: string; short: string }[] = [
  { key: "overall", label: "Overall", short: "OVR" },
  { key: "thinkingDepth", label: "Thinking Depth", short: "THK" },
  { key: "selfCorrection", label: "Self-Correction", short: "COR" },
  { key: "verification", label: "Verification", short: "VER" },
  { key: "toolDiversity", label: "Tool Diversity", short: "TDV" },
  { key: "recoveryRate", label: "Recovery Rate", short: "REC" },
  { key: "efficiency", label: "Efficiency", short: "EFF" },
  { key: "proactiveness", label: "Proactiveness", short: "PRO" },
];

function ScoreCell({ value, isOverall = false }: { value: number; isOverall?: boolean }) {
  const color =
    value >= 75 ? "text-emerald-400" :
    value >= 60 ? "text-[#D4A017]" :
    value >= 45 ? "text-amber-400" :
    "text-orange-400";

  return (
    <td className={`px-2 py-3 text-right tabular-nums ${isOverall ? "font-semibold text-base" : "text-sm"} ${color}`}>
      {value.toFixed(1)}%
      {isOverall && (
        <div className="w-full bg-white/[0.04] rounded-full h-1 mt-1.5">
          <div className="h-1 rounded-full bg-gradient-to-r from-[#D4A017] to-[#00BFA5]" style={{ width: `${value}%` }} />
        </div>
      )}
    </td>
  );
}

function QuantBadge({ q }: { q: string }) {
  if (q === "—") return null;
  const color =
    q === "BF16" || q === "FP16" ? "text-emerald-400/70 border-emerald-400/15 bg-emerald-400/5" :
    q === "FP8" ? "text-sky-400/70 border-sky-400/15 bg-sky-400/5" :
    q.includes("Q5") || q.includes("Q6") || q.includes("Q8") ? "text-amber-400/70 border-amber-400/15 bg-amber-400/5" :
    q.includes("Q4") || q === "AWQ-4bit" || q === "NVFP4" ? "text-orange-400/70 border-orange-400/15 bg-orange-400/5" :
    "text-red-400/70 border-red-400/15 bg-red-400/5";
  return <span className={`text-[9px] font-mono px-1 py-0.5 rounded border ${color}`}>{q}</span>;
}

// Agent detail modal
function AgentModal({ agent, onClose }: { agent: AgentEntry; onClose: () => void }) {
  const dims = [
    { label: "Thinking Depth", val: agent.thinkingDepth },
    { label: "Self-Correction", val: agent.selfCorrection },
    { label: "Verification", val: agent.verification },
    { label: "Tool Diversity", val: agent.toolDiversity },
    { label: "Recovery Rate", val: agent.recoveryRate },
    { label: "Efficiency", val: agent.efficiency },
    { label: "Proactiveness", val: agent.proactiveness },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[#111] border border-white/[0.08] rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{agent.emoji}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#F5F5F5]">{agent.agent}</h3>
                {agent.isNous && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#D4A017]/15 text-[#D4A017] border border-[#D4A017]/20 uppercase tracking-wider">Nous</span>}
              </div>
              <div className="text-xs text-[#555]">{agent.model} · {agent.params}{agent.activeParams ? ` (${agent.activeParams} active)` : ""}</div>
            </div>
          </div>
          <button onClick={onClose} className="text-[#555] hover:text-[#F5F5F5] transition-colors text-xl">&times;</button>
        </div>

        <div className="flex items-center gap-2 mb-5 text-xs">
          <span className="text-[#888]">{agent.regionFlag} {agent.region}</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className="text-[#888]">{agent.fineTuned ? "Fine-tuned" : "Base model"}</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className="text-[#888]">{agent.modality}</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className={agent.openSource ? "text-emerald-400/80" : "text-red-400/60"}>{agent.openSource ? "Open Source" : "Closed Source"}</span>
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <QuantBadge q={agent.quantization} />
          <span className="w-1 h-1 rounded-full bg-[#333]" />
          <span className="text-[#888]">{agent.runs} runs</span>
        </div>

        <div className="text-center mb-5">
          <div className="text-3xl font-bold font-[family-name:var(--font-heading)] text-[#D4A017]">{agent.overall.toFixed(1)}%</div>
          <div className="text-xs text-[#666]">Overall Score</div>
        </div>

        <div className="space-y-2">
          {dims.map((d) => (
            <div key={d.label} className="flex items-center gap-3">
              <span className="text-xs text-[#888] w-28 flex-shrink-0">{d.label}</span>
              <div className="flex-1 bg-white/[0.04] rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[#D4A017] to-[#00BFA5] transition-all"
                  style={{ width: `${d.val}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-[#999] w-12 text-right">{d.val.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function mapApiToAgent(row: Record<string, unknown>, rank: number): AgentEntry {
  return {
    rank,
    agent: (row.display_name as string) || (row.name as string) || "Unknown",
    emoji: (row.emoji as string) || "🤖",
    model: row.model as string,
    params: (row.params as string) || "—",
    activeParams: row.active_params as string | undefined,
    region: (row.region as string) || "",
    regionFlag: (row.region_flag as string) || "🌍",
    fineTuned: Boolean(row.fine_tuned),
    openSource: Boolean(row.open_source),
    modality: (row.modality as AgentEntry["modality"]) || "Language",
    quantization: (row.quantization as AgentEntry["quantization"]) || "—",
    overall: (row.best_score as number) || 0,
    thinkingDepth: (row.thinking_depth as number) || 0,
    selfCorrection: (row.self_correction as number) || 0,
    verification: (row.verification as number) || 0,
    toolDiversity: (row.tool_diversity as number) || 0,
    recoveryRate: (row.recovery_rate as number) || 0,
    efficiency: (row.efficiency as number) || 0,
    proactiveness: (row.proactiveness as number) || 0,
    runs: (row.completed_runs as number) || 0,
    lastUpdated: row.last_completed_at ? new Date(row.last_completed_at as string).toLocaleString() : "—",
    isNous: ((row.model as string) || "").toLowerCase().includes("hermes"),
  };
}

export default function LeaderboardPage() {
  const [liveData, setLiveData] = useState<AgentEntry[] | null>(null);
  const [apiStatus, setApiStatus] = useState<"loading" | "live" | "offline">("loading");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [weightProfile, setWeightProfile] = useState<(typeof WEIGHT_PROFILES)[number]>("General");
  const [sizeFilter, setSizeFilter] = useState<(typeof SIZE_FILTERS)[number]>("All Sizes");
  const [modalityFilter, setModalityFilter] = useState<(typeof MODALITY_FILTERS)[number]>("All Types");
  const [sourceFilter, setSourceFilter] = useState<(typeof SOURCE_FILTERS)[number]>("All");
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [pageSize, setPageSize] = useState(50);
  const [selectedAgent, setSelectedAgent] = useState<AgentEntry | null>(null);

  // Fetch live data from API, fallback to static
  useEffect(() => {
    fetchLeaderboard().then((rows) => {
      if (rows && rows.length > 0) {
        setLiveData(rows.map((r, i) => mapApiToAgent(r, i + 1)));
        setApiStatus("live");
      } else {
        setApiStatus("offline");
      }
    });
  }, []);

  const baseData = liveData || LEADERBOARD_DATA;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "desc" ? "asc" : "desc");
    else { setSortKey(key); setSortDir("desc"); }
  };

  const sorted = useMemo(() => {
    let data = baseData.map((a) => ({
      ...a,
      overall: weightProfile === "General" ? a.overall : Math.round(computeWeighted(a, weightProfile) * 10) / 10,
    }));

    // Fine-tuned / base / quantized filter
    if (filter === "Fine-tuned Only") data = data.filter((a) => a.fineTuned);
    if (filter === "Base Only") data = data.filter((a) => !a.fineTuned);
    if (filter === "Quantized Only") data = data.filter((a) => !["BF16", "FP16", "—"].includes(a.quantization));

    // Size filter
    if (sizeFilter !== "All Sizes") {
      data = data.filter((a) => {
        const p = parseParamNum(a.params);
        if (p < 0) return sizeFilter === "72B+"; // closed-source = big
        if (sizeFilter === "≤9B") return p <= 9;
        if (sizeFilter === "10–35B") return p >= 10 && p <= 35;
        if (sizeFilter === "36–72B") return p >= 36 && p <= 72;
        if (sizeFilter === "72B+") return p > 72;
        return true;
      });
    }

    // Modality filter
    if (modalityFilter !== "All Types") data = data.filter((a) => a.modality === modalityFilter);

    // Open/Closed source filter
    if (sourceFilter === "Open Source") data = data.filter((a) => a.openSource);
    if (sourceFilter === "Closed Source") data = data.filter((a) => !a.openSource);

    // Search
    if (search) {
      const q = search.toLowerCase();
      data = data.filter((a) => a.agent.toLowerCase().includes(q) || a.model.toLowerCase().includes(q));
    }

    // Sort
    data.sort((a, b) => {
      const aVal = a[sortKey]; const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") return sortDir === "desc" ? bVal - aVal : aVal - bVal;
      return 0;
    });

    return data.map((entry, i) => ({ ...entry, rank: i + 1 }));
  }, [baseData, search, sortKey, sortDir, filter, weightProfile, sizeFilter, modalityFilter, sourceFilter]);

  const displayed = sorted.slice(0, pageSize);

  return (
    <div className="min-h-screen pt-20">
      <AnimatePresence>
        {selectedAgent && <AgentModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />}
      </AnimatePresence>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-2">Caduceus Leaderboard</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#666]">
            <span className="text-[#D4A017] font-medium">315+ Tasks</span>
            <span className="w-1 h-1 rounded-full bg-[#333]" />
            <span>8 Domains</span>
            <span className="w-1 h-1 rounded-full bg-[#333]" />
            <span>4 Difficulty Levels</span>
            <span className="w-1 h-1 rounded-full bg-[#333]" />
            <span className={apiStatus === "live" ? "text-[#00BFA5]" : "text-[#666]"}>
              {apiStatus === "live" ? "● Live" : apiStatus === "loading" ? "◌ Loading..." : "○ Static data"} · {sorted.length} agents
            </span>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 pb-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 flex-wrap">
          {/* Fine-tune / base / quant */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {FILTERS.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${filter === f ? "bg-[#D4A017] text-[#0A0A0A]" : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"}`}
              >{f}</button>
            ))}
          </div>

          {/* Weight profile */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {WEIGHT_PROFILES.map((w) => (
              <button key={w} onClick={() => setWeightProfile(w)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${weightProfile === w ? "bg-[#00BFA5] text-[#0A0A0A]" : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"}`}
              >{w}</button>
            ))}
          </div>

          {/* Size filter */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {SIZE_FILTERS.map((s) => (
              <button key={s} onClick={() => setSizeFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${sizeFilter === s ? "bg-white/10 text-[#F5F5F5]" : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"}`}
              >{s}</button>
            ))}
          </div>

          {/* Modality filter */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {MODALITY_FILTERS.map((m) => (
              <button key={m} onClick={() => setModalityFilter(m)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${modalityFilter === m ? "bg-purple-500/20 text-purple-300" : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"}`}
              >{m}</button>
            ))}
          </div>

          {/* Open/Closed source */}
          <div className="flex items-center gap-1 bg-[#111] border border-white/[0.06] rounded-lg p-1">
            {SOURCE_FILTERS.map((s) => (
              <button key={s} onClick={() => setSourceFilter(s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${sourceFilter === s ? "bg-emerald-500/20 text-emerald-300" : "text-[#999] hover:text-[#F5F5F5] hover:bg-white/[0.04]"}`}
              >{s}</button>
            ))}
          </div>

          {/* Search */}
          <input type="text" placeholder="Search agents or models..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-[#F5F5F5] placeholder:text-[#555] focus:outline-none focus:border-[#D4A017]/30 transition-colors w-full lg:max-w-xs" />
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-2 py-3 text-left text-xs font-medium text-[#666] uppercase tracking-wider w-10">#</th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-[#666] uppercase tracking-wider w-8"></th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-[#666] uppercase tracking-wider min-w-[220px]">Agent</th>
                  {SCORE_COLS.map((col) => (
                    <th key={col.key} onClick={() => toggleSort(col.key)}
                      className="px-2 py-3 text-right text-xs font-medium text-[#666] uppercase tracking-wider cursor-pointer hover:text-[#D4A017] transition-colors select-none whitespace-nowrap">
                      <span className="hidden xl:inline">{col.label}</span>
                      <span className="xl:hidden">{col.short}</span>
                      {sortKey === col.key && <span className="ml-1 text-[#D4A017]">{sortDir === "desc" ? "↓" : "↑"}</span>}
                    </th>
                  ))}
                  <th className="px-2 py-3 text-right text-xs font-medium text-[#666] uppercase tracking-wider">Runs</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map((agent, i) => (
                  <motion.tr key={`${agent.agent}-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                    className={`border-b border-white/[0.03] transition-all duration-200 hover:bg-[#D4A017]/[0.04] cursor-pointer ${agent.isNous ? "bg-[#D4A017]/[0.02]" : ""}`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <td className="px-2 py-3">
                      {agent.rank === 1 ? <span className="text-lg">🥇</span> : agent.rank === 2 ? <span className="text-lg">🥈</span> : agent.rank === 3 ? <span className="text-lg">🥉</span> : <span className="text-sm text-[#666] font-mono">#{agent.rank}</span>}
                    </td>
                    <td className="px-1 py-3 text-base">{agent.regionFlag}</td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{agent.emoji}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-medium text-[#F5F5F5] text-sm">{agent.agent}</span>
                            {agent.isNous && <span className="text-[9px] font-bold px-1 py-0.5 rounded bg-[#D4A017]/15 text-[#D4A017] border border-[#D4A017]/20 uppercase tracking-wider">Nous</span>}
                            {agent.fineTuned && <span className="text-[9px] px-1 py-0.5 rounded bg-purple-400/10 text-purple-400/70 border border-purple-400/15">FT</span>}
                            {agent.modality !== "Language" && <span className={`text-[9px] px-1 py-0.5 rounded border ${agent.modality === "Vision-Language" ? "bg-sky-400/10 text-sky-400/70 border-sky-400/15" : agent.modality === "Code" ? "bg-emerald-400/10 text-emerald-400/70 border-emerald-400/15" : "bg-amber-400/10 text-amber-400/70 border-amber-400/15"}`}>{agent.modality === "Vision-Language" ? "VL" : agent.modality === "Code" ? "Code" : "MM"}</span>}
                            {!agent.openSource && <span className="text-[9px] px-1 py-0.5 rounded bg-red-400/10 text-red-400/60 border border-red-400/15">Closed</span>}
                          </div>
                          <div className="text-xs text-[#555] flex items-center gap-1.5 flex-wrap">
                            <span className="truncate max-w-[150px]">{agent.model}</span>
                            <span className="text-[#444]">·</span>
                            <span className="text-[#444]">{agent.params}{agent.activeParams ? ` (${agent.activeParams} act.)` : ""}</span>
                            <QuantBadge q={agent.quantization} />
                          </div>
                        </div>
                      </div>
                    </td>
                    {SCORE_COLS.map((col) => (
                      <ScoreCell key={col.key} value={agent[col.key] as number} isOverall={col.key === "overall"} />
                    ))}
                    <td className="px-2 py-3 text-right text-sm text-[#666] tabular-nums">{agent.runs}</td>
                  </motion.tr>
                ))}
                {displayed.length === 0 && (
                  <tr><td colSpan={11} className="text-center py-12 text-[#555]">No agents match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
            <span className="text-xs text-[#666]">Showing {displayed.length} of {sorted.length} agents</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#666]">Show:</span>
              {[25, 50, 100].map((n) => (
                <button key={n} onClick={() => setPageSize(n)}
                  className={`px-2 py-1 text-xs rounded ${pageSize === n ? "bg-[#D4A017]/20 text-[#D4A017]" : "text-[#666] hover:text-[#F5F5F5]"}`}
                >{n}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
