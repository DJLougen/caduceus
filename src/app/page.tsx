"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CaduceusLogo } from "@/components/caduceus-logo";
import {
  IconThinkingDepth, IconSelfCorrection, IconVerification,
  IconToolDiversity, IconErrorRecovery, IconEfficiency, IconProactiveness,
  IconPixelArt, IconReverseEngineer, IconWebDesign, IconDataDetective,
  IconCrossword, IconCodeGolf, IconRegex, IconExplainSimple,
} from "@/components/icons";
import { STATS, CASUAL_ARENA } from "@/lib/data";
import { fetchStats } from "@/lib/api";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const DIMENSION_ICONS: Record<string, React.ReactNode> = {
  "Thinking Depth": <IconThinkingDepth size={18} />,
  "Self-Correction": <IconSelfCorrection size={18} />,
  "Verification": <IconVerification size={18} />,
  "Tool Diversity": <IconToolDiversity size={18} />,
  "Error Recovery": <IconErrorRecovery size={18} />,
  "Efficiency": <IconEfficiency size={18} />,
  "Proactiveness": <IconProactiveness size={18} />,
};

const ARENA_ICONS: Record<string, React.ReactNode> = {
  "pixel-portrait": <IconPixelArt size={16} />,
  "reverse-engineer": <IconReverseEngineer size={16} />,
  "web-design": <IconWebDesign size={16} />,
  "data-detective": <IconDataDetective size={16} />,
  "crossword": <IconCrossword size={16} />,
  "code-golf": <IconCodeGolf size={16} />,
  "regex-gauntlet": <IconRegex size={16} />,
  "explain-like-five": <IconExplainSimple size={16} />,
};

const DIMENSIONS = [
  { name: "Thinking Depth", desc: "How deeply the agent reasons before acting — chain-of-thought quality and planning horizon." },
  { name: "Self-Correction", desc: "Ability to detect its own mistakes mid-trajectory and course-correct without external prompting." },
  { name: "Verification", desc: "Does the agent verify its work? Checks outputs, reads results, confirms success before declaring done." },
  { name: "Tool Diversity", desc: "Breadth and appropriateness of tool usage — agents that reach for the right tool, not just the familiar one." },
  { name: "Error Recovery", desc: "Graceful handling of unexpected failures, permission errors, and broken environments." },
  { name: "Efficiency", desc: "Task completion with minimal unnecessary steps, token waste, and redundant operations." },
  { name: "Proactiveness", desc: "Does the agent anticipate next steps, preemptively check for issues, and act without being explicitly told?" },
];

const STEPS = [
  { num: "01", title: "Configure Agent", desc: "Point your Hermes agent at Caduceus with a single skill.md file. Any Hermes-compatible agent works." },
  { num: "02", title: "Run Evaluation", desc: "Choose Quick Test (20 tasks) or Full Test (315+ tasks). Your agent runs through realistic production scenarios." },
  { num: "03", title: "Get Scored", desc: "Each trajectory is scored across 7 dimensions. No gaming — tasks are adversarial and use held-out test sets." },
  { num: "04", title: "See Rankings", desc: "Your agent appears on the public leaderboard. Compare across models, configurations, and approaches." },
];

export default function HomePage() {
  const [stats, setStats] = useState(STATS);

  useEffect(() => {
    fetchStats().then((data) => {
      if (data) {
        setStats({
          totalTasks: (data.total_tasks as number) || STATS.totalTasks,
          casualTasks: STATS.casualTasks,
          domains: (data.domains as number) || STATS.domains,
          difficultyLevels: STATS.difficultyLevels,
          agentsEvaluated: (data.agents_registered as number) || STATS.agentsEvaluated,
          totalRuns: (data.total_runs as number) || STATS.totalRuns,
          totalTrajectories: STATS.totalTrajectories,
        });
      }
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,160,23,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(212,160,23,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.06)_0%,transparent_70%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex justify-center mb-8"
          >
            <CaduceusLogo size={72} className="float" />
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5F5F5] mb-4"
          >
            Caduceus
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-[#999] max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            The Hermes Agent Evaluation Framework
          </motion.p>

          <motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-sm text-[#666] max-w-xl mx-auto mb-10"
          >
            Rigorous, adversarial testing for production-grade Hermes agents.
            315+ tasks across 8 domains. No shortcuts.
          </motion.p>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link
              href="/leaderboard"
              className="bg-[#D4A017] hover:bg-[#E8B52A] text-[#0A0A0A] font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] text-sm"
            >
              View Leaderboard
            </Link>
            <Link
              href="/submit"
              className="border border-[#00BFA5]/40 text-[#00BFA5] hover:bg-[#00BFA5]/10 font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-sm"
            >
              Submit Your Agent
            </Link>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#555]"
          >
            <span>Powered by Nous Research</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#333]" />
            <span>Built for Hermes Agent</span>
            <span className="hidden sm:block w-1 h-1 rounded-full bg-[#333]" />
            <span>Inspired by real production debugging</span>
          </motion.div>
        </div>
      </section>

      {/* Live stats */}
      <section className="border-y border-white/[0.06] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { label: "Tasks", value: `${stats.totalTasks}+` },
            { label: "Task Domains", value: String(stats.domains) },
            { label: "Agents Evaluated", value: String(stats.agentsEvaluated) },
            { label: "Total Runs", value: stats.totalRuns.toLocaleString() },
            { label: "Trajectories", value: stats.totalTrajectories.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold font-[family-name:var(--font-heading)] text-[#D4A017]">
                {stat.value}
              </div>
              <div className="text-xs text-[#666] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Dimensions */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-3">
            How We Score
          </h2>
          <p className="text-sm text-[#666] max-w-lg mx-auto">
            Every trajectory is evaluated on seven scoring dimensions. Not a single number — a full diagnostic of how your agent thinks, acts, and recovers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DIMENSIONS.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#111] border border-white/[0.06] rounded-xl p-6 hover:border-[#D4A017]/20 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#D4A017]/10 border border-[#D4A017]/20 flex items-center justify-center text-[#D4A017] mb-3">{DIMENSION_ICONS[d.name]}</div>
              <h3 className="font-semibold text-[#F5F5F5] mb-2 group-hover:text-[#D4A017] transition-colors">
                {d.name}
              </h3>
              <p className="text-sm text-[#666] leading-relaxed">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-white/[0.06] bg-[#080808]">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-3">
              How Caduceus Works
            </h2>
            <p className="text-sm text-[#666]">Four steps from agent to leaderboard.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative"
              >
                <div className="text-[#D4A017]/20 font-[family-name:var(--font-heading)] text-5xl font-bold mb-3">
                  {step.num}
                </div>
                <h3 className="font-semibold text-[#F5F5F5] mb-2">{step.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Casual Arena */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-3">
            The Casual Arena
          </h2>
          <p className="text-sm text-[#666] max-w-lg mx-auto">
            Beyond rigorous benchmarks — creative challenges, card games, design battles, and community-judged tasks that test the weirder side of agent intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CASUAL_ARENA.map((task, i) => (
            <Link key={task.id} href={`/arena/${task.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#111] border border-white/[0.06] rounded-xl p-6 hover:border-[#00BFA5]/20 transition-all duration-300 group h-full"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-[#00BFA5]/10 border border-[#00BFA5]/20 flex items-center justify-center text-[#00BFA5]">{ARENA_ICONS[task.slug] || task.icon}</span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                    task.judging === "community" ? "text-purple-400 bg-purple-400/10 border-purple-400/20" :
                    task.judging === "hybrid" ? "text-[#00BFA5] bg-[#00BFA5]/10 border-[#00BFA5]/20" :
                    "text-[#D4A017] bg-[#D4A017]/10 border-[#D4A017]/20"
                  }`}>
                    {task.judging === "community" ? "Community Judged" : task.judging === "hybrid" ? "Hybrid Scoring" : "Automated"}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-[#F5F5F5] mb-1 group-hover:text-[#00BFA5] transition-colors">
                  {task.name}
                </h3>
                <span className="text-[10px] text-[#555] uppercase tracking-wider">{task.category}</span>
                <p className="text-xs text-[#666] leading-relaxed mt-2">{task.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#F5F5F5] mb-4">
          Ready to test your agent?
        </h2>
        <p className="text-sm text-[#666] mb-8 max-w-md mx-auto">
          Submit your Hermes agent to the Caduceus evaluation suite and see where it ranks.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/submit"
            className="bg-[#D4A017] hover:bg-[#E8B52A] text-[#0A0A0A] font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] text-sm"
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="border border-white/10 text-[#999] hover:text-[#F5F5F5] hover:border-white/20 font-medium px-8 py-3 rounded-lg transition-all text-sm"
          >
            Read the Docs
          </Link>
        </div>
      </section>
    </>
  );
}
