import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calendar, HandHelping, Search, Star, Tag } from "lucide-react";
import { useBaseData } from "@/lib/use-data";
import { TRENDING_TOPICS } from "@/lib/mock-data";
import { MapCanvas } from "./MapPreview";
import { SectionCard } from "./primitives";
import { CommunityCard } from "./CommunityCard";

const icons = { "lost-found": Search, recommendation: Star, event: Calendar, deal: Tag, help: HandHelping } as const;

export function RightSidebar() {
  const { posts, communities } = useBaseData();
  const popular = [...communities].sort((a, b) => b.members - a.members).slice(0, 3);
  return (
    <aside className="hidden w-80 shrink-0 space-y-4 xl:block">
      <section className="card-surface overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <h3 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">Nearby</h3>
          <span className="text-xs text-muted-foreground">{posts.length} posts within 7 km</span>
        </div>
        <Link to="/nearby"><MapCanvas posts={posts} className="h-44" showLabels={false} /></Link>
        <Link to="/nearby" className="flex items-center justify-center gap-1 border-t py-2.5 text-sm font-semibold text-primary hover:bg-muted">
          View Full Map <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
      <SectionCard title="Trending Nearby">
        <ul className="space-y-0.5">
          {TRENDING_TOPICS.map((t) => {
            const Icon = icons[t.type];
            return (
              <li key={t.type}>
                <Link to="/trending" search={{ type: t.type }} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted"><Icon className="h-4 w-4 text-primary" /></span>
                  <span className="flex-1 text-sm font-medium">{t.label}</span>
                  <span className="text-xs text-muted-foreground">{t.count} posts</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </SectionCard>
      <SectionCard title="Popular Communities" action={<Link to="/communities" className="text-xs font-semibold text-primary">See all</Link>}>
        <div className="space-y-1">{popular.map((c) => <CommunityCard key={c.id} community={c} compactRow />)}</div>
      </SectionCard>
      <p className="px-2 text-xs text-muted-foreground">Find & Share · What's happening around you?</p>
    </aside>
  );
}
