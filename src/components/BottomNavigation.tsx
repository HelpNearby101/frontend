import { Link } from "@tanstack/react-router";
import { Bell, Home, Map, Plus, User } from "lucide-react";
import { useApp } from "@/lib/store";

const item = "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-muted-foreground";
const active = { className: "text-primary" };

export function BottomNavigation() {
  const { setCreateOpen } = useApp();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <Link to="/" className={item} activeProps={active} activeOptions={{ exact: true }}><Home className="h-5 w-5" />Home</Link>
      <Link to="/nearby" className={item} activeProps={active}><Map className="h-5 w-5" />Nearby</Link>
      <button onClick={() => setCreateOpen(true)} className={item} aria-label="Create post">
        <span className="-mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></span>
      </button>
      <Link to="/notifications" className={item} activeProps={active}><Bell className="h-5 w-5" />Alerts</Link>
      <Link to="/profile" className={item} activeProps={active}><User className="h-5 w-5" />Profile</Link>
    </nav>
  );
}
