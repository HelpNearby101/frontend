import { createFileRoute } from "@tanstack/react-router";
import { useBaseData } from "@/lib/use-data";
import { CommunityCard } from "@/components/CommunityCard";

export const Route = createFileRoute("/communities")({
  head: () => ({
    meta: [
      { title: "Explore communities — Find & Share" },
      { name: "description", content: "Join neighbourhood communities across Bangalore — Indiranagar, Koramangala, HSR Layout and more." },
      { property: "og:title", content: "Explore communities — Find & Share" },
      { property: "og:description", content: "Join neighbourhood communities across Bangalore." },
    ],
  }),
  component: Communities,
});

function Communities() {
  const { communities } = useBaseData();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Explore communities</h1>
      <p className="mb-4 text-sm text-muted-foreground">Neighbourhoods near you in Bangalore.</p>
      <div className="grid gap-3 sm:grid-cols-2">{communities.map((c) => <CommunityCard key={c.id} community={c} />)}</div>
    </div>
  );
}
