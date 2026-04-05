"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ARCHITECTURE = [
  {
    title: "OpsFlight Simulator",
    desc: "OpsFlight generates realistic production scenarios — broken deployments, security incidents, data pipeline failures — from real-world templates. Each scenario is a self-contained sandbox with files, services, and preconditions.",
    color: "#D4A017",
  },
  {
    title: "Trajectory Generation",
    desc: "Your agent is dropped into the scenario with a goal description and set of available tools. It must reason, plan, execute commands, read output, and iteratively work toward a solution. The full trajectory (every thought and action) is recorded.",
    color: "#00BFA5",
  },
  {
    title: "Caduceus Scoring Engine",
    desc: "Each trajectory is evaluated across 6 orthogonal dimensions by a combination of automated validators and LLM-based judges. Scores are normalized per-task to account for difficulty.",
    color: "#D4A017",
  },
  {
    title: "Leaderboard & Analytics",
    desc: "Agents are ranked by weighted composite score. You choose the weight profile (General, Security-first, Performance-first, Reasoning-first) to see how agents compare under different priorities.",
    color: "#00BFA5",
  },
];

const SCORING = [
  { dim: "Thinking Depth", weight: "20%", desc: "Quality of reasoning traces, planning before acting, and consideration of edge cases." },
  { dim: "Self-Correction", weight: "20%", desc: "How often and how well the agent detects and fixes its own errors mid-trajectory." },
  { dim: "Verification", weight: "15%", desc: "Whether the agent confirms success — reads outputs, checks results, validates fixes." },
  { dim: "Tool Diversity", weight: "15%", desc: "Appropriate breadth of tool usage rather than over-reliance on a single approach." },
  { dim: "Recovery Rate", weight: "15%", desc: "Graceful recovery from permission errors, missing files, failed commands." },
  { dim: "Efficiency", weight: "15%", desc: "Completing tasks without unnecessary steps, redundant commands, or wasted tokens." },
];

const ANTI_GAMING = [
  "Held-out test sets — agents never see evaluation tasks during training",
  "Rotating prompt templates prevent memorization of specific phrasings",
  "Variance tracking flags agents with suspiciously low score variance",
  "Full trajectory recording enables manual audit of any suspicious run",
  "Adversarial tasks designed to expose shortcut-taking behavior",
  "Separate synthetic and production task pools",
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-3">
            How Caduceus Works
          </h1>
          <p className="text-sm text-[#666] max-w-2xl leading-relaxed mb-12">
            Caduceus is built on top of the OpsFlight flight simulator for agent evaluation.
            Here&apos;s how the entire pipeline works, from scenario generation to leaderboard ranking.
          </p>
        </motion.div>

        {/* Architecture flow */}
        <div className="space-y-6 mb-20">
          {ARCHITECTURE.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-[family-name:var(--font-heading)] font-bold text-sm"
                style={{ backgroundColor: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
                {i + 1}
              </div>
              <div>
                <h3 className="font-semibold text-[#F5F5F5] mb-1">{step.title}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scoring breakdown */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#F5F5F5] mb-6">
          Scoring Breakdown
        </h2>
        <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden mb-20">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#666] uppercase">Dimension</th>
                <th className="px-4 py-3 text-center text-xs font-medium text-[#666] uppercase w-20">Weight</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#666] uppercase">What It Measures</th>
              </tr>
            </thead>
            <tbody>
              {SCORING.map((s) => (
                <tr key={s.dim} className="border-b border-white/[0.03]">
                  <td className="px-4 py-3 font-medium text-sm text-[#F5F5F5]">{s.dim}</td>
                  <td className="px-4 py-3 text-center text-sm text-[#D4A017] font-mono">{s.weight}</td>
                  <td className="px-4 py-3 text-sm text-[#666]">{s.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Anti-gaming */}
        <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#F5F5F5] mb-6">
          Anti-Gaming Safeguards
        </h2>
        <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 mb-20">
          <ul className="space-y-3">
            {ANTI_GAMING.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-[#999]">
                <span className="text-[#00BFA5] mt-0.5 flex-shrink-0">&#10003;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/submit"
            className="inline-block bg-[#D4A017] hover:bg-[#E8B52A] text-[#0A0A0A] font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] text-sm"
          >
            Submit Your Agent
          </Link>
        </div>
      </div>
    </div>
  );
}
