"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-16">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold text-[#F5F5F5] mb-8">
            About Caduceus
          </h1>

          <div className="prose prose-invert max-w-none space-y-6 text-sm text-[#999] leading-relaxed">
            <p>
              <strong className="text-[#F5F5F5]">Caduceus</strong> is the Hermes Agent Evaluation Framework — a rigorous,
              adversarial benchmarking platform for production-grade AI agents. Named after the staff carried by Hermes,
              the Greek god of cunning, commerce, and communication, Caduceus tests whether agents can actually do the work
              they claim to handle.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#F5F5F5] mt-10 mb-3">
              Why We Built This
            </h2>
            <p>
              Demos lie. An agent that looks impressive in a 30-second screen recording often falls apart
              when faced with real-world complexity: ambiguous error messages, missing files, permission
              errors, cascading failures across services. We built Caduceus to replace vibes-based evaluation
              with reproducible, evidence-based measurement.
            </p>
            <p>
              Every task in Caduceus comes from real production scenarios — multi-step debugging, operations,
              security, and infrastructure tasks that actually determine whether an agent is production-ready.
              These aren&apos;t toy problems.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#F5F5F5] mt-10 mb-3">
              Connection to Hermes Agent
            </h2>
            <p>
              Caduceus is the native evaluation framework for <strong className="text-[#D4A017]">Hermes Agent</strong>,
              the open-source, self-improving agent framework by Nous Research. While any Hermes-compatible agent
              can be evaluated, Caduceus is purpose-built to test the capabilities that matter for Hermes deployments:
              tool use, self-correction, proactive behavior, and multi-step reasoning.
            </p>
            <p>
              The pipeline: realistic scenarios are generated → agents produce trajectories → Caduceus evaluates
              and ranks them across 7 dimensions. This creates a tight feedback loop: better benchmarks lead to
              better training data, which leads to better agents.
            </p>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#F5F5F5] mt-10 mb-3">
              Roadmap
            </h2>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-[#D4A017] font-mono text-xs mt-0.5">Phase 1</span>
                <span>Core evaluation engine with 7 scoring dimensions and public leaderboard</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#00BFA5] font-mono text-xs mt-0.5">Phase 2</span>
                <span>Security-focused benchmarks and adversarial failure analysis</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#666] font-mono text-xs mt-0.5">Phase 3</span>
                <span>Performance trend reporting and agent lifecycle tracking</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#666] font-mono text-xs mt-0.5">Phase 4</span>
                <span>Live arena — real-time head-to-head evaluation on shared tasks</span>
              </li>
            </ul>

            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#F5F5F5] mt-10 mb-3">
              Built By
            </h2>
            <p>
              Caduceus is built by <strong className="text-[#F5F5F5]">Daniel Lougen</strong>,
              a PhD student in visual neuroscience at the University of Toronto.
              The project connects AI agent evaluation with insights from how biological systems
              process information and recover from errors.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href="https://x.com/DJLougen" target="_blank" rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-[#888] border border-white/[0.06] hover:border-[#D4A017]/30 hover:text-[#D4A017] transition-all">
                X / Twitter
              </a>
              <a href="https://github.com/nousresearch/hermes-agent" target="_blank" rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-[#888] border border-white/[0.06] hover:border-[#D4A017]/30 hover:text-[#D4A017] transition-all">
                GitHub
              </a>
              <a href="https://huggingface.co/DJLougen" target="_blank" rel="noopener noreferrer"
                className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] text-[#888] border border-white/[0.06] hover:border-[#D4A017]/30 hover:text-[#D4A017] transition-all">
                Hugging Face
              </a>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/leaderboard"
              className="inline-block bg-[#D4A017] hover:bg-[#E8B52A] text-[#0A0A0A] font-semibold px-8 py-3 rounded-lg transition-all duration-200 hover:shadow-[0_0_30px_rgba(212,160,23,0.3)] text-sm"
            >
              View the Leaderboard
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
