import Link from "next/link";
import { CaduceusLogo } from "@/components/caduceus-logo";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <CaduceusLogo size={48} className="mx-auto mb-6" />
        <h1 className="font-[family-name:var(--font-heading)] text-6xl font-bold text-[#D4A017] mb-4">404</h1>
        <p className="text-[#666] mb-8">This path leads nowhere. The staff points elsewhere.</p>
        <Link
          href="/"
          className="bg-[#D4A017] hover:bg-[#E8B52A] text-[#0A0A0A] font-semibold px-6 py-2.5 rounded-lg transition-all duration-200 text-sm"
        >
          Back to Caduceus
        </Link>
      </div>
    </div>
  );
}
