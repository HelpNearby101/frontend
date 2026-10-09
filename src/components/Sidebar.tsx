import { Link } from "@tanstack/react-router";
import { Bookmark, Compass, Flame, Home, Map, PlusCircle } from "lucide-react";
import { useApp } from "@/lib/store";
import { useBaseData } from "@/lib/use-data";
import { Avatar } from "./primitives";
import { CommunityMark } from "./CommunityCard";

const item = "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground";
const active = { className: "bg-primary-soft text-primary hover:bg-primary-soft hover:text-primary" };

export function Sidebar() {
  const { setCreateOpen, joined } = useApp();
  const { communities, me } = useBaseData();
  const mine = communities.filter((c) => joined.has(c.id));

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col border-r py-4 pr-3 lg:flex">
      <nav className="space-y-0.5">
        <Link to="/" className={item} activeProps={active} activeOptions={{ exact: true }}><Home className="h-[18px] w-[18px]" /> Home</Link>
        <Link to="/nearby" className={item} activeProps={active}><Map className="h-[18px] w-[18px]" /> Nearby</Link>
        <Link to="/trending" className={item} activeProps={active}><Flame className="h-[18px] w-[18px]" /> Trending</Link>
        <Link to="/saved" className={item} activeProps={active}><Bookmark className="h-[18px] w-[18px]" /> Saved</Link>
        <button onClick={() => setCreateOpen(true)} className={`${item} w-full`}><PlusCircle className="h-[18px] w-[18px]" /> Create Post</button>
      </nav>
      <div className="my-4 h-px bg-border" />
      <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Your Communities</div>
      <nav className="space-y-0.5 overflow-y-auto">
        {mine.map((c) => (
          <Link key={c.id} to="/c/$slug" params={{ slug: c.id }} className={item} activeProps={active}>
            <CommunityMark community={c} size={22} /> {c.name}
          </Link>
        ))}
        <Link to="/communities" className={`${item} text-primary`}><Compass className="h-[18px] w-[18px]" /> Explore Communities</Link>
      </nav>
      <Link to="/profile" className="mt-auto flex items-center gap-3 rounded-xl border bg-card p-2.5 hover:bg-muted">
        <Avatar user={me} size={34} />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{me.displayName}</div>
          <div className="truncate text-xs text-muted-foreground">{me.location}</div>
        </div>
      </Link>
    </aside>
  );
}
