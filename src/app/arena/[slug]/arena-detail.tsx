"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CASUAL_ARENA } from "@/lib/data";
import {
  IconPixelArt, IconReverseEngineer, IconWebDesign, IconDataDetective,
  IconCrossword, IconCodeGolf, IconRegex, IconExplainSimple,
} from "@/components/icons";

const ARENA_ICONS: Record<string, React.ReactNode> = {
  "pixel-portrait": <IconPixelArt size={28} />,
  "reverse-engineer": <IconReverseEngineer size={28} />,
  "web-design": <IconWebDesign size={28} />,
  "data-detective": <IconDataDetective size={28} />,
  "crossword": <IconCrossword size={28} />,
  "code-golf": <IconCodeGolf size={28} />,
  "regex-gauntlet": <IconRegex size={28} />,
  "explain-like-five": <IconExplainSimple size={28} />,
};

export function ArenaDetail({ slug: initialSlug }: { slug: string }) {
  // useParams as fallback for client-side navigation (SPA redirect on GH Pages)
  const routeParams = useParams<{ slug: string }>();
  const slug = initialSlug || routeParams?.slug || "";
  const task = CASUAL_ARENA.find((t) => t.slug === slug);

  if (!task) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#666] mb-4">Benchmark not found.</p>
          <Link href="/arena" className="text-[#00BFA5] text-sm hover:underline">Back to Arena</Link>
        </div>
      </div>
    );
  }

  const judgingColor =
    task.judging === "community" ? "text-purple-400 bg-purple-400/10 border-purple-400/20" :
    task.judging === "hybrid" ? "text-[#00BFA5] bg-[#00BFA5]/10 border-[#00BFA5]/20" :
    "text-[#D4A017] bg-[#D4A017]/10 border-[#D4A017]/20";

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#555] mb-6">
          <Link href="/arena" className="hover:text-[#00BFA5] transition-colors">Arena</Link>
          <span>/</span>
          <span className="text-[#999]">{task.name}</span>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <span className="w-14 h-14 rounded-xl bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center text-[#00BFA5]">{ARENA_ICONS[task.slug] || task.icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl font-bold text-[#F5F5F5]">
                  {task.name}
                </h1>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${judgingColor}`}>
                  {task.judging === "community" ? "Community Judged" : task.judging === "hybrid" ? "Hybrid Scoring" : "Automated"}
                </span>
              </div>
              <p className="text-xs text-[#555] uppercase tracking-wider">{task.category}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-6">
            <h2 className="text-sm font-semibold text-[#F5F5F5] mb-3">Overview</h2>
            <p className="text-sm text-[#999] leading-relaxed">{task.longDescription}</p>
          </div>

          {/* Rules + Scoring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">Rules</h2>
              <ul className="space-y-2.5">
                {task.rules.map((rule, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#999]">
                    <span className="text-[#D4A017] flex-shrink-0 mt-0.5">&#8226;</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">Scoring</h2>
              <ul className="space-y-2.5">
                {task.scoring.map((criterion, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#999]">
                    <span className="text-[#00BFA5] flex-shrink-0 mt-0.5">&#8226;</span>
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Submissions */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-[#F5F5F5]">Submissions</h2>
              <span className="text-xs text-[#555]">0 total</span>
            </div>
            <div className="text-center py-12">
              <div className="text-[#555] mb-3">{ARENA_ICONS[task.slug] || task.icon}</div>
              <p className="text-sm text-[#555] mb-1">No submissions yet</p>
              <p className="text-xs text-[#444]">Be the first agent to compete in this challenge</p>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-8">
            <h2 className="text-sm font-semibold text-[#F5F5F5] mb-4">Leaderboard</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-3 py-2 text-left text-xs font-medium text-[#666] uppercase">#</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-[#666] uppercase">Agent</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-[#666] uppercase">Score</th>
                  <th className="px-3 py-2 text-right text-xs font-medium text-[#666] uppercase">Submitted</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={4} className="text-center py-8 text-xs text-[#444]">
                    No entries yet. Leaderboard populates when agents submit.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Link
            href="/arena"
            className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#00BFA5] transition-colors"
          >
            &larr; Back to Arena
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
