import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBaseData, useFiltered } from "@/lib/use-data";
import { timeAgo, typeLabel, type PostType } from "@/lib/types";
import { MapCanvas } from "@/components/MapPreview";
import { LocationBadge, TypeTag } from "@/components/primitives";
import { VotePill } from "@/components/PostActions";

export const Route = createFileRoute("/nearby")({
  head: () => ({
    meta: [
      { title: "Nearby map — Find & Share" },
      { name: "description", content: "Explore events, deals, recommendations and lost & found posts on a map of your area." },
      { property: "og:title", content: "Nearby map — Find & Share" },
      { property: "og:description", content: "Explore what's happening on a map of your area." },
    ],
  }),
  component: Nearby,
});

const FILTERS: { id: PostType | "all"; label: string }[] = [
  { id: "all", label: "All" }, { id: "event", label: "Events" }, { id: "lost-found", label: "Lost & Found" },
  { id: "recommendation", label: "Recommendations" }, { id: "deal", label: "Deals" }, { id: "help", label: "Help" },
];

function Nearby() {
  const { posts, communityById } = useBaseData();
  const [filter, setFilter] = useState<PostType | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);
  const visible = useFiltered(posts).filter((p) => filter === "all" || p.type === filter).sort((a, b) => a.distanceKm - b.distanceKm);
  const sel = visible.find((p) => p.id === selected);

  return (
    <div className="flex flex-col gap-4 lg:h-[calc(100vh-6.5rem)] lg:flex-row">
      <aside className="flex shrink-0 flex-col lg:w-72">
        <h1 className="text-2xl font-bold">Nearby</h1>
        <p className="mb-3 text-sm text-muted-foreground">{visible.length} posts around you</p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {FILTERS.map((f) => (
            <button key={f.id} onClick={() => { setFilter(f.id); setSelected(null); }}
              className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", filter === f.id ? "border-primary bg-primary-soft text-primary" : "bg-card text-muted-foreground hover:text-foreground")}>
              {f.label}
            </button>
          ))}
        </div>
        <ul className="hidden flex-1 space-y-1.5 overflow-y-auto pr-1 lg:block">
          {visible.map((p) => (
            <li key={p.id}>
              <button onClick={() => setSelected(p.id)} className={cn("w-full rounded-lg border p-3 text-left", selected === p.id ? "border-primary bg-primary-soft" : "bg-card hover:bg-muted")}>
                <div className="line-clamp-1 text-sm font-semibold">{p.title}</div>
                <LocationBadge className="mt-1" place={communityById(p.communityId)?.name ?? p.place} distanceKm={p.distanceKm} />
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <div className="relative min-h-[70vh] flex-1 overflow-hidden rounded-2xl border lg:min-h-0">
        <MapCanvas posts={visible} selectedId={selected} onSelect={setSelected} className="absolute inset-0" />
        {sel && (
          <div className="absolute inset-x-3 bottom-3 z-30 rounded-xl border bg-card p-4 shadow-pop animate-in fade-in slide-in-from-bottom-2 sm:left-auto sm:right-4 sm:w-96">
            <button onClick={() => setSelected(null)} aria-label="Close preview" className="absolute right-2 top-2 rounded-full p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TypeTag>{typeLabel(sel.type)}</TypeTag> {timeAgo(sel.minutesAgo)}
            </div>
            <h3 className="mt-2 pr-6 font-semibold leading-snug">{sel.title}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{sel.body}</p>
            <LocationBadge className="mt-2" place={sel.place} distanceKm={sel.distanceKm} />
            <div className="mt-3 flex items-center justify-between">
              <VotePill id={sel.id} score={sel.score} />
              <Link to="/post/$id" params={{ id: sel.id }} className="inline-flex items-center gap-1 text-sm font-semibold text-primary">Open post <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
