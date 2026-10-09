import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { compact, type Community } from "@/lib/types";

export function CommunityMark({ community, size = 32 }: { community: Community; size?: number }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-lg bg-primary-soft font-display font-bold text-primary" style={{ width: size, height: size, fontSize: size * 0.42 }}>
      {community.name[0]}
    </span>
  );
}

export function JoinButton({ id, className }: { id: string; className?: string }) {
  const { joined, toggleJoin } = useApp();
  const on = joined.has(id);
  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleJoin(id); }}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
        on ? "border bg-card text-foreground hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90",
        className,
      )}
    >
      {on ? "Joined" : "Join"}
    </button>
  );
}

export function CommunityCard({ community, compactRow = false }: { community: Community; compactRow?: boolean }) {
  return (
    <Link to="/c/$slug" params={{ slug: community.id }} className={cn("flex items-center gap-3 rounded-lg", compactRow ? "py-1.5" : "card-surface p-4 hover:border-foreground/15")}>
      <CommunityMark community={community} size={compactRow ? 32 : 44} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{community.name} Community</div>
        <div className="text-xs text-muted-foreground">{compact(community.members)} members{!compactRow && ` · ${community.area}`}</div>
        {!compactRow && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{community.description}</p>}
      </div>
      <JoinButton id={community.id} />
    </Link>
  );
}
