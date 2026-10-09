import { cn } from "@/lib/utils";
import type { Post } from "@/lib/types";

/** Stylised neighbourhood map rendered as SVG with clickable pins. */
export function MapCanvas({
  posts,
  selectedId,
  onSelect,
  className,
  showLabels = true,
}: {
  posts: Post[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
  className?: string;
  showLabels?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-map-land", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M-5 72 C 20 66, 30 78, 46 74 S 70 62, 105 70 L105 80 C 72 72, 60 84, 44 84 S 18 76, -5 82Z" className="fill-map-water" />
        <ellipse cx="50" cy="69" rx="5" ry="3" className="fill-map-water" />
        <rect x="64" y="14" width="14" height="12" rx="2" className="fill-map-park" />
        <rect x="20" y="30" width="10" height="14" rx="2" className="fill-map-park" />
        <circle cx="80" cy="58" r="6" className="fill-map-park" />
        <g className="stroke-map-road" strokeLinecap="round" fill="none">
          <path d="M0 40 L100 34" strokeWidth="2.2" />
          <path d="M40 0 L52 100" strokeWidth="2.2" />
          <path d="M0 20 L100 52" strokeWidth="1.2" />
          <path d="M70 0 L62 100" strokeWidth="1.2" />
          <path d="M0 60 L100 88" strokeWidth="1.2" />
          <path d="M18 0 L28 100" strokeWidth="0.8" />
          <path d="M86 0 L92 100" strokeWidth="0.8" />
          <path d="M0 10 L100 16" strokeWidth="0.8" />
        </g>
      </svg>
      {showLabels && (
        <>
          <span className="absolute left-[60%] top-[8%] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">Indiranagar</span>
          <span className="absolute left-[30%] top-[48%] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">Koramangala</span>
          <span className="absolute left-[56%] top-[92%] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">HSR Layout</span>
          <span className="absolute left-[80%] top-[28%] text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">Whitefield</span>
        </>
      )}
      {/* "you are here" */}
      <span className="absolute left-[54%] top-[42%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-full bg-primary pin-pulse" />
        <span className="relative block h-3 w-3 rounded-full border-2 border-card bg-primary" />
      </span>
      {posts.map((p) => {
        const active = p.id === selectedId;
        return (
          <button
            key={p.id}
            onClick={() => onSelect?.(p.id)}
            aria-label={p.title}
            className="absolute -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
            style={{ left: `${p.mapX}%`, top: `${p.mapY}%`, zIndex: active ? 20 : 10 }}
          >
            <svg width={active ? 30 : 22} height={active ? 38 : 28} viewBox="0 0 22 28">
              <path d="M11 1C5.5 1 1.5 5 1.5 10.2 1.5 17 11 27 11 27s9.5-10 9.5-16.8C20.5 5 16.5 1 11 1z" className={active ? "fill-foreground" : "fill-primary"} />
              <circle cx="11" cy="10.5" r="3.6" className="fill-card" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
