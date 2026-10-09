import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowBigDown, ArrowBigUp, Bookmark, EyeOff, Flag, Link2, MessageSquare, MoreHorizontal, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { compact, type Post } from "@/lib/types";
import { Menu, MenuItem, useDropdown } from "./primitives";

export function VotePill({ id, score, vertical = false }: { id: string; score: number; vertical?: boolean }) {
  const { votes, vote } = useApp();
  const v = votes[id] ?? 0;
  return (
    <div className={cn("inline-flex items-center rounded-full bg-muted", vertical && "flex-col py-1")} onClick={(e) => e.stopPropagation()}>
      <button aria-label="Upvote" onClick={() => vote(id, 1)} className={cn("rounded-full p-1.5 hover:bg-primary-soft hover:text-primary", v === 1 && "text-primary")}>
        <ArrowBigUp className={cn("h-[18px] w-[18px]", v === 1 && "fill-current")} />
      </button>
      <span className={cn("min-w-6 text-center text-xs font-semibold tabular-nums", v === 1 && "text-primary", v === -1 && "text-muted-foreground")}>{compact(score + v)}</span>
      <button aria-label="Downvote" onClick={() => vote(id, -1)} className={cn("rounded-full p-1.5 hover:bg-accent", v === -1 && "text-foreground")}>
        <ArrowBigDown className={cn("h-[18px] w-[18px]", v === -1 && "fill-current")} />
      </button>
    </div>
  );
}

const pill = "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground";

export function PostActions({ post, commentCount }: { post: Post; commentCount?: number }) {
  const { saved, toggleSave } = useApp();
  const [copied, setCopied] = useState(false);
  const more = useDropdown();
  const isSaved = saved.has(post.id);

  const share = async () => {
    const url = `${window.location.origin}/post/${post.id}`;
    try {
      if (navigator.share) await navigator.share({ title: post.title, url });
      else await navigator.clipboard.writeText(url);
    } catch { /* dismissed */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex flex-wrap items-center gap-1" onClick={(e) => e.stopPropagation()}>
      <VotePill id={post.id} score={post.score} />
      <Link to="/post/$id" params={{ id: post.id }} className={pill}>
        <MessageSquare className="h-4 w-4" /> {commentCount ?? post.commentCount}
      </Link>
      <button onClick={share} className={pill}>
        <Share2 className="h-4 w-4" /> {copied ? "Link copied" : "Share"}
      </button>
      <button onClick={() => toggleSave(post.id)} className={cn(pill, isSaved && "text-primary")}>
        <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} /> {isSaved ? "Saved" : "Save"}
      </button>
      <div className="relative ml-auto" ref={more.ref}>
        <button aria-label="More" onClick={() => more.setOpen(!more.open)} className={pill}>
          <MoreHorizontal className="h-4 w-4" />
        </button>
        {more.open && (
          <Menu>
            <MenuItem onClick={() => { navigator.clipboard?.writeText(`${window.location.origin}/post/${post.id}`); more.setOpen(false); }}><Link2 className="h-4 w-4" /> Copy link</MenuItem>
            <MenuItem onClick={() => more.setOpen(false)}><EyeOff className="h-4 w-4" /> Hide post</MenuItem>
            <MenuItem onClick={() => more.setOpen(false)} className="text-destructive"><Flag className="h-4 w-4" /> Report</MenuItem>
          </Menu>
        )}
      </div>
    </div>
  );
}
