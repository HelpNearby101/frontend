import type { ReactNode } from "react";
import { MapPinOff } from "lucide-react";
import type { Post } from "@/lib/types";
import { PostCard } from "./PostCard";
import { RightSidebar } from "./RightSidebar";
import { LocationSelect, SearchInput } from "./Navbar";

export function FeedList({ posts, empty = "Nothing here yet." }: { posts: Post[]; empty?: string }) {
  if (!posts.length)
    return (
      <div className="card-surface flex flex-col items-center gap-2 px-6 py-14 text-center text-sm text-muted-foreground">
        <MapPinOff className="h-6 w-6" /> {empty}
      </div>
    );
  return <div className="space-y-3">{posts.map((p) => <PostCard key={p.id} post={p} />)}</div>;
}

/** Center column + right sidebar wrapper used by feed-style pages */
export function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1">
        <div className="mb-3 flex gap-2 md:hidden">
          <SearchInput className="flex-1" />
          <LocationSelect />
        </div>
        {children}
      </div>
      <RightSidebar />
    </div>
  );
}
