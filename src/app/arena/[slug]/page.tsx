import { CASUAL_ARENA } from "@/lib/data";
import { ArenaDetail } from "./arena-detail";

export function generateStaticParams() {
  return CASUAL_ARENA.map((t) => ({ slug: t.slug }));
}

export default function ArenaBenchmarkPage({ params }: { params: { slug: string } }) {
  return <ArenaDetail slug={params.slug} />;
}
