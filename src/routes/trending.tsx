import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { sortPosts, useBaseData, useFiltered } from "@/lib/use-data";
import { POST_TYPES, type PostType } from "@/lib/types";
import { FeedLayout, FeedList } from "@/components/Feed";

export const Route = createFileRoute("/trending")({
  validateSearch: (s: Record<string, unknown>): { type?: PostType } =>
    POST_TYPES.some((t) => t.value === s["type"]) ? { type: s["type"] as PostType } : {},
  head: () => ({
    meta: [
      { title: "Trending nearby — Find & Share" },
      { name: "description", content: "The most talked-about local posts across Bangalore neighbourhoods right now." },
      { property: "og:title", content: "Trending nearby — Find & Share" },
      { property: "og:description", content: "The most talked-about local posts right now." },
    ],
  }),
  component: Trending,
});

const chip = "rounded-full border px-3 py-1.5 text-xs font-medium";

function Trending() {
  const { type } = Route.useSearch();
  const { posts } = useBaseData();
  const list = sortPosts(useFiltered(posts), "trending").filter((p) => !type || p.type === type);
  return (
    <FeedLayout>
      <h1 className="text-2xl font-bold">Trending nearby</h1>
      <p className="mb-4 text-sm text-muted-foreground">What your neighbours are talking about today.</p>
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Link to="/trending" search={{}} className={cn(chip, !type ? "border-primary bg-primary-soft text-primary" : "bg-card text-muted-foreground")}>All</Link>
        {POST_TYPES.map((t) => (
          <Link key={t.value} to="/trending" search={{ type: t.value }} className={cn(chip, type === t.value ? "border-primary bg-primary-soft text-primary" : "bg-card text-muted-foreground hover:text-foreground")}>{t.label}</Link>
        ))}
      </div>
      <FeedList posts={list} empty="Nothing trending in this category yet." />
    </FeedLayout>
  );
}
