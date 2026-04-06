import { use } from "react";
import { CASUAL_ARENA } from "@/lib/data";
import { ArenaDetail } from "./arena-detail";

export function generateStaticParams() {
  return CASUAL_ARENA.map((t) => ({ slug: t.slug }));
}

export default function ArenaBenchmarkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <ArenaDetail slug={slug} />;
}
