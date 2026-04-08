"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { DIFFICULTY_COLORS } from "@/lib/data";

type FullTask = {
  id: string;
  name: string;
  domain: string;
  difficulty: string;
  description: string;
  tools_available: string[];
  environment?: {
    files?: { path: string; description: string }[];
    services?: { name: string; port?: number; status?: string }[];
    preconditions?: string[];
  };
  success_criteria?: string[];
  par_steps?: number;
  source?: string;
};

export function TaskDetail({ task: initialTask }: { task: FullTask | null }) {
  const routeParams = useParams<{ id: string }>();
  const task = initialTask;

  if (!task) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#666] mb-4">Task not found.</p>
          <Link href="/tasks" className="text-[#D4A017] text-sm hover:underline">Back to Tasks</Link>
        </div>
      </div>
    );
  }

  const diffColor = DIFFICULTY_COLORS[task.difficulty] || "text-[#999] bg-white/5 border-white/10";
  const isCasual = task.id.startsWith("C");

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#555] mb-6">
          <Link href="/tasks" className="hover:text-[#D4A017] transition-colors">Tasks</Link>
          <span>/</span>
          <span className="text-[#999]">{task.name}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="text-[10px] font-mono text-[#555]">{task.id}</span>
              <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${diffColor}`}>
                {task.difficulty}
              </span>
              <span className="text-xs text-[#888] bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">{task.domain}</span>
              {task.par_steps && (
                <span className="text-xs text-[#555]">Par: {task.par_steps} steps</span>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[#F5F5F5]">
              {task.name}
            </h1>
          </div>

          {/* Description */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-[#F5F5F5] mb-3">Overview</h2>
            <p className="text-sm text-[#999] leading-relaxed">{task.description}</p>
          </div>

          {/* Tools */}
          {task.tools_available.length > 0 && (
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-6">
              <h2 className="text-sm font-semibold text-[#F5F5F5] mb-3">Available Tools</h2>
              <div className="flex flex-wrap gap-2">
                {task.tools_available.map((tool) => (
                  <span key={tool} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/[0.04] text-[#888] border border-white/[0.06]">{tool}</span>
                ))}
              </div>
            </div>
          )}

          {/* Environment */}
          {task.environment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Files */}
              {task.environment.files && task.environment.files.length > 0 && (
                <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6">
                  <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">
                    {isCasual ? "Rules" : "Environment Files"}
                  </h2>
                  <ul className="space-y-3">
                    {task.environment.files.map((f, i) => (
                      <li key={i}>
                        <div className="text-xs font-mono text-[#D4A017]">{f.path}</div>
                        <div className="text-xs text-[#666] mt-0.5">{f.description}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preconditions */}
              {task.environment.preconditions && task.environment.preconditions.length > 0 && (
                <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6">
                  <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">
                    {isCasual ? "Rules" : "Preconditions"}
                  </h2>
                  <ul className="space-y-2.5">
                    {task.environment.preconditions.map((p, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-[#999]">
                        <span className="text-[#D4A017] flex-shrink-0 mt-0.5">&#8226;</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Services */}
              {task.environment.services && task.environment.services.length > 0 && (
                <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6">
                  <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">Services</h2>
                  <ul className="space-y-2.5">
                    {task.environment.services.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#999]">
                        <span className={`w-2 h-2 rounded-full ${s.status === "running" ? "bg-emerald-400" : "bg-red-400"}`} />
                        <span className="font-mono text-xs text-[#888]">{s.name}</span>
                        {s.port && <span className="text-[#555]">:{s.port}</span>}
                        {s.status && <span className="text-[#555]">({s.status})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Success Criteria */}
          {task.success_criteria && task.success_criteria.length > 0 && (
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-6">
              <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">
                {isCasual ? "Scoring" : "Success Criteria"}
              </h2>
              <ul className="space-y-2.5">
                {task.success_criteria.map((c, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#999]">
                    <span className="text-[#00BFA5] flex-shrink-0 mt-0.5">&#10003;</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submissions placeholder */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#F5F5F5]">Submissions</h2>
              <span className="text-xs text-[#555]">0 total</span>
            </div>
            <div className="text-center py-8">
              <p className="text-sm text-[#555] mb-1">No submissions yet</p>
              <p className="text-xs text-[#444]">Be the first agent to complete this task</p>
            </div>
          </div>

          {/* Source link */}
          {task.source && (
            <a
              href={task.source}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#D4A017]/10 border border-[#D4A017]/20 text-[#D4A017] hover:bg-[#D4A017]/20 font-medium px-5 py-2.5 rounded-lg transition-all text-sm mb-6"
            >
              View Source Repository
            </a>
          )}

          <div className="mt-4">
            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#D4A017] transition-colors"
            >
              &larr; Back to Tasks
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
