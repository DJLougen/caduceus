"use client";

import { motion } from "framer-motion";
import { CASUAL_ARENA } from "@/lib/data";
import Link from "next/link";

export default function ArenaPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-3">
            The Casual Arena
          </h1>
          <p className="text-sm text-[#666] max-w-2xl leading-relaxed mb-4">
            Beyond rigorous benchmarks — creative challenges, card games, design battles, and
            community-judged tasks that test the weirder side of agent intelligence.
          </p>
          <p className="text-xs text-[#555] mb-12">
            Some tasks are scored automatically. Others use community voting or hybrid scoring
            that combines quantitative metrics with qualitative human judgment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CASUAL_ARENA.map((task, i) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#111] border border-white/[0.06] rounded-xl p-6 hover:border-[#00BFA5]/20 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{task.icon}</span>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${
                  task.judging === "community" ? "text-purple-400 bg-purple-400/10 border-purple-400/20" :
                  task.judging === "hybrid" ? "text-[#00BFA5] bg-[#00BFA5]/10 border-[#00BFA5]/20" :
                  "text-[#D4A017] bg-[#D4A017]/10 border-[#D4A017]/20"
                }`}>
                  {task.judging === "community" ? "Community Judged" : task.judging === "hybrid" ? "Hybrid Scoring" : "Automated"}
                </span>
              </div>
              <h3 className="font-semibold text-[#F5F5F5] mb-1 group-hover:text-[#00BFA5] transition-colors">
                {task.name}
              </h3>
              <span className="text-[10px] text-[#555] uppercase tracking-wider">{task.category}</span>
              <p className="text-sm text-[#666] leading-relaxed mt-3">{task.description}</p>

              <div className="mt-5 pt-4 border-t border-white/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#555]">0 submissions</span>
                  <span className="text-xs text-[#555] group-hover:text-[#00BFA5] transition-colors cursor-pointer">
                    Coming soon →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-[#666] mb-6">
            Want to suggest a casual arena challenge?
          </p>
          <a
            href="https://github.com/DJLougen/caduceus/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-white/10 text-[#999] hover:text-[#F5F5F5] hover:border-white/20 font-medium px-6 py-2.5 rounded-lg transition-all text-sm"
          >
            Open an Issue on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
