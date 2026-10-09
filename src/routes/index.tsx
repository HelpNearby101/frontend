import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { sortPosts, useBaseData, useFiltered } from "@/lib/use-data";
import type { FeedSort } from "@/lib/types";
import { FeedLayout, FeedList } from "@/components/Feed";
import { Avatar } from "@/components/primitives";
import { FeedTabs } from "@/components/FeedTabs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Find & Share — Your neighbourhood feed" },
      { name: "description", content: "Posts, recommendations, lost & found and events from people near you in Bangalore." },
      { property: "og:title", content: "Find & Share — Your neighbourhood feed" },
      { property: "og:description", content: "Posts, recommendations, lost & found and events from people near you." },
    ],
  }),
  component: Home,
});

function Home() {
  const [sort, setSort] = useState<FeedSort>("near");
  const { posts, me } = useBaseData();
  const { setCreateOpen, query } = useApp();
  const list = sortPosts(useFiltered(posts), sort);

  return (
    <FeedLayout>
      <button onClick={() => setCreateOpen(true)} className="card-surface mb-3 flex w-full items-center gap-3 p-3 text-left">
        <Avatar user={me} size={34} />
        <span className="flex-1 rounded-full bg-muted px-4 py-2.5 text-sm text-muted-foreground">What's happening around you?</span>
      </button>
      <div className="mb-3 flex items-center justify-between">
        <FeedTabs value={sort} onChange={setSort} />
        {query && <span className="text-xs text-muted-foreground">{list.length} results</span>}
      </div>
      <FeedList posts={list} empty="No posts match your search in this area." />
    </FeedLayout>
  );
}
