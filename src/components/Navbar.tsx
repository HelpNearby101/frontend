import { Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Bell, Bookmark, Check, ChevronDown, LogOut, MapPin, Plus, Search, Settings, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { useBaseData } from "@/lib/use-data";
import { notificationsQuery } from "@/lib/queries";
import { timeAgo } from "@/lib/types";
import { Avatar, Logo, Menu, MenuItem, useDropdown } from "./primitives";

export function SearchInput({ className }: { className?: string }) {
  const { query, setQuery } = useApp();
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search posts, places, communities..."
        className="h-10 w-full rounded-full border bg-muted/60 pl-10 pr-4 text-sm outline-none focus:border-primary/60 focus:bg-card placeholder:text-muted-foreground"
      />
    </div>
  );
}

export function LocationSelect() {
  const { area, setArea } = useApp();
  const { communities } = useBaseData();
  const dd = useDropdown();
  const label = area === "all" ? "Bangalore" : communities.find((c) => c.id === area)?.name;
  return (
    <div className="relative" ref={dd.ref}>
      <button onClick={() => dd.setOpen(!dd.open)} className="inline-flex h-10 items-center gap-1.5 rounded-full border bg-card px-3.5 text-sm font-medium hover:bg-muted">
        <MapPin className="h-4 w-4 text-primary" /> {label} <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>
      {dd.open && (
        <Menu className="left-0 right-auto">
          {[{ id: "all", name: "All of Bangalore" }, ...communities].map((c) => (
            <MenuItem key={c.id} onClick={() => { setArea(c.id); dd.setOpen(false); }}>
              <MapPin className="h-4 w-4 text-muted-foreground" /> <span className="flex-1">{c.name}</span>
              {area === c.id && <Check className="h-4 w-4 text-primary" />}
            </MenuItem>
          ))}
        </Menu>
      )}
    </div>
  );
}

function Notifications() {
  const { data } = useSuspenseQuery(notificationsQuery);
  const dd = useDropdown();
  const unread = data.filter((n) => n.unread).length;
  return (
    <div className="relative" ref={dd.ref}>
      <button aria-label="Notifications" onClick={() => dd.setOpen(!dd.open)} className="relative rounded-full p-2.5 hover:bg-muted">
        <Bell className="h-5 w-5" />
        {unread > 0 && <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{unread}</span>}
      </button>
      {dd.open && (
        <Menu className="w-80">
          <div className="px-2.5 py-2 text-sm font-semibold">Notifications</div>
          {data.map((n) => (
            <Link key={n.id} to="/post/$id" params={{ id: n.postId ?? "p1" }} onClick={() => dd.setOpen(false)} className="flex gap-2.5 rounded-lg px-2.5 py-2 hover:bg-muted">
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.unread ? "bg-primary" : "bg-transparent")} />
              <span className="text-sm">
                {n.text}
                <span className="block text-xs text-muted-foreground">{timeAgo(n.minutesAgo)}</span>
              </span>
            </Link>
          ))}
          <Link to="/notifications" onClick={() => dd.setOpen(false)} className="block rounded-lg px-2.5 py-2 text-center text-xs font-semibold text-primary hover:bg-muted">See all</Link>
        </Menu>
      )}
    </div>
  );
}

function ProfileMenu() {
  const { me } = useBaseData();
  const dd = useDropdown();
  return (
    <div className="relative" ref={dd.ref}>
      <button aria-label="Account" onClick={() => dd.setOpen(!dd.open)} className="flex items-center gap-1 rounded-full p-1 hover:bg-muted">
        <Avatar user={me} size={32} />
        <ChevronDown className="mr-1 hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
      </button>
      {dd.open && (
        <Menu>
          <div className="px-2.5 py-2">
            <div className="text-sm font-semibold">{me.displayName}</div>
            <div className="text-xs text-muted-foreground">@{me.username}</div>
          </div>
          <div className="my-1 h-px bg-border" />
          <Link to="/profile" onClick={() => dd.setOpen(false)}><MenuItem><UserIcon className="h-4 w-4" /> Profile</MenuItem></Link>
          <Link to="/saved" onClick={() => dd.setOpen(false)}><MenuItem><Bookmark className="h-4 w-4" /> Saved</MenuItem></Link>
          <MenuItem onClick={() => dd.setOpen(false)}><Settings className="h-4 w-4" /> Settings</MenuItem>
          <MenuItem onClick={() => dd.setOpen(false)}><LogOut className="h-4 w-4" /> Log out</MenuItem>
        </Menu>
      )}
    </div>
  );
}

export function Navbar() {
  const { setCreateOpen } = useApp();
  return (
    <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-3 px-4">
        <Link to="/" className="shrink-0"><Logo /></Link>
        <SearchInput className="mx-auto hidden w-full max-w-xl md:block" />
        <div className="ml-auto flex items-center gap-1.5 md:ml-0">
          <div className="hidden lg:block"><LocationSelect /></div>
          <button onClick={() => setCreateOpen(true)} className="hidden h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex">
            <Plus className="h-4 w-4" /> Create Post
          </button>
          <Notifications />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
