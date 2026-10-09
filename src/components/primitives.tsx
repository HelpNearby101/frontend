import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { User } from "@/lib/types";

const tones = { 1: "bg-avatar-1", 2: "bg-avatar-2", 3: "bg-avatar-3", 4: "bg-avatar-4", 5: "bg-avatar-5" } as const;

export function Avatar({ user, size = 28, className }: { user: User; size?: number; className?: string }) {
  const initials = user.displayName.split(" ").map((s) => s[0]).slice(0, 2).join("");
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-primary-foreground", tones[user.avatarTone], className)}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function Logo({ withText = true }: { withText?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <path d="M14 2C8.8 2 4.6 6.1 4.6 11.3 4.6 18 14 26 14 26s9.4-8 9.4-14.7C23.4 6.1 19.2 2 14 2z" className="fill-primary" />
        <g className="stroke-primary-foreground" strokeWidth="1.4" fill="none">
          <path d="M10.5 11.5 17 8.2M10.5 11.5 17 14.8" />
        </g>
        <g className="fill-primary-foreground">
          <circle cx="10.2" cy="11.5" r="2" />
          <circle cx="17.3" cy="8" r="1.8" />
          <circle cx="17.3" cy="15" r="1.8" />
        </g>
      </svg>
      {withText && <span className="font-display text-[17px] font-bold tracking-tight">Find <span className="text-primary">&</span> Share</span>}
    </span>
  );
}

export function LocationBadge({ place, distanceKm, className }: { place: string; distanceKm?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs text-muted-foreground", className)}>
      <MapPin className="h-3.5 w-3.5 text-primary" />
      <span className="truncate">{place}</span>
      {distanceKm !== undefined && <span className="shrink-0">· {distanceKm < 0.5 ? "here" : `${distanceKm} km away`}</span>}
    </span>
  );
}

export function TypeTag({ children }: { children: ReactNode }) {
  return <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary">{children}</span>;
}

export function useDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", h);
    document.addEventListener("keydown", k);
    return () => {
      document.removeEventListener("mousedown", h);
      document.removeEventListener("keydown", k);
    };
  }, [open]);
  return { open, setOpen, ref };
}

export function Menu({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("absolute right-0 z-50 mt-2 min-w-48 rounded-xl border bg-popover p-1.5 shadow-pop animate-in fade-in zoom-in-95", className)}>{children}</div>;
}

export function MenuItem({ children, onClick, className }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-muted", className)}>
      {children}
    </button>
  );
}

export function SectionCard({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="card-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}
