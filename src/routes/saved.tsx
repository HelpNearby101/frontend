import { createFileRoute } from "@tanstack/react-router";
import { useApp } from "@/lib/store";
import { useBaseData } from "@/lib/use-data";
import { FeedLayout, FeedList } from "@/components/Feed";

export const Route = createFileRoute("/saved")({
  head: () => ({
    meta: [
      { title: "Saved posts — Find & Share" },
      { name: "description", content: "Local posts and places you've saved for later." },
      { property: "og:title", content: "Saved posts — Find & Share" },
      { property: "og:description", content: "Local posts and places you've saved for later." },
    ],
  }),
  component: Saved,
});

function Saved() {
  const { saved } = useApp();
  const { posts } = useBaseData();
  return (
    <FeedLayout>
      <h1 className="mb-4 text-2xl font-bold">Saved</h1>
      <FeedList posts={posts.filter((p) => saved.has(p.id))} empty="Tap Save on any post to keep it here." />
    </FeedLayout>
  );
}
