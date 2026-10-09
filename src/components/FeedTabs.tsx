import { Clock, Flame, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FeedSort } from "@/lib/types";

const TABS: { id: FeedSort; label: string; icon: typeof MapPin }[] = [
  { id: "near", label: "Near You", icon: MapPin },
  { id: "latest", label: "Latest", icon: Clock },
  { id: "trending", label: "Trending", icon: Flame },
];

export function FeedTabs({ value, onChange }: { value: FeedSort; onChange: (s: FeedSort) => void }) {
  return (
    <div className="flex gap-1">
      {TABS.map((t) => (
        <button key={t.id} onClick={() => onChange(t.id)}
          className={cn("inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium", value === t.id ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
          <t.icon className="h-4 w-4" /> {t.label}
        </button>
      ))}
    </div>
  );
}

