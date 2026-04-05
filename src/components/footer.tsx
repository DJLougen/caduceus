import Link from "next/link";
import { CaduceusLogo } from "./caduceus-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <CaduceusLogo size={24} />
              <span className="font-[family-name:var(--font-heading)] font-bold text-[#F5F5F5]">CADUCEUS</span>
            </div>
            <p className="text-sm text-[#666] leading-relaxed">
              The Hermes Agent Evaluation Framework. Rigorous, adversarial testing for production-grade agents.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/leaderboard" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">Leaderboard</Link></li>
              <li><Link href="/tasks" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">Task Catalog</Link></li>
              <li><Link href="/submit" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">Submit Results</Link></li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Learn</h4>
            <ul className="space-y-2">
              <li><Link href="/how-it-works" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">How It Works</Link></li>
              <li><Link href="/docs" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">Documentation</Link></li>
              <li><Link href="/about" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">About</Link></li>
            </ul>
          </div>

          {/* External */}
          <div>
            <h4 className="text-xs font-semibold text-[#999] uppercase tracking-wider mb-3">Links</h4>
            <ul className="space-y-2">
              <li><a href="https://github.com/nousresearch/hermes-agent" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">GitHub</a></li>
              <li><a href="https://x.com/DJLougen" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">X / Twitter</a></li>
              <li><a href="https://huggingface.co/DJLougen" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">Hugging Face</a></li>
              <li><a href="https://nousresearch.com" target="_blank" rel="noopener noreferrer" className="text-sm text-[#666] hover:text-[#D4A017] transition-colors">Nous Research</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#555]">
            Built by Daniel Lougen while pursuing PhD in visual neuroscience at UofT
          </p>
          <p className="text-xs text-[#555]">
            &copy; {new Date().getFullYear()} Caduceus. Powered by Nous Research.
          </p>
        </div>
      </div>
    </footer>
  );
}
