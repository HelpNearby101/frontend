import { useState } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { MapPin, Users } from "lucide-react";
import { communities as seed } from "@/lib/mock-data";
import { sortPosts, useBaseData } from "@/lib/use-data";
import { compact, type FeedSort } from "@/lib/types";
import { FeedList } from "@/components/Feed";
import { CommunityMark, JoinButton } from "@/components/CommunityCard";
import { SectionCard } from "@/components/primitives";
import { FeedTabs } from "@/components/FeedTabs";

export const Route = createFileRoute("/c/$slug")({
  loader: ({ params }) => {
    const c = seed.find((x) => x.id === params.slug);
    if (!c) throw notFound();
    return { name: c.name, description: c.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Community not found — Find & Share" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.name} Community — Find & Share`;
    return { meta: [{ title: t }, { name: "description", content: loaderData.description }, { property: "og:title", content: t }, { property: "og:description", content: loaderData.description }] };
  },
  component: CommunityPage,
});

function CommunityPage() {
  const { slug } = Route.useParams();
  const { posts, communityById } = useBaseData();
  const [sort, setSort] = useState<FeedSort>("latest");
  const c = communityById(slug)!;
  const list = sortPosts(posts.filter((p) => p.communityId === slug), sort);

  return (
    <div>
      <div className="card-surface mb-4 flex flex-wrap items-center gap-4 p-5">
        <CommunityMark community={c} size={60} />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold">{c.name} Community</h1>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{c.area}</span>
            <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{compact(c.members)} members</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />{c.online} online</span>
          </div>
        </div>
        <JoinButton id={c.id} className="px-5 py-2 text-sm" />
      </div>
      <div className="flex flex-col-reverse gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <div className="mb-3"><FeedTabs value={sort} onChange={setSort} /></div>
          <FeedList posts={list} empty="No posts in this community yet." />
        </div>
        <aside className="w-full shrink-0 space-y-4 xl:w-80">
          <SectionCard title="About"><p className="text-sm leading-relaxed">{c.description}</p></SectionCard>
          <SectionCard title="Community rules">
            <ol className="space-y-2.5">
              {c.rules.map((r, i) => (
                <li key={r} className="flex gap-3 text-sm"><span className="font-semibold text-primary">{i + 1}</span>{r}</li>
              ))}
            </ol>
          </SectionCard>
        </aside>
      </div>
    </div>
  );
}
