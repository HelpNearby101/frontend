import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { useBaseData } from "@/lib/use-data";
import { timeAgo, type Comment as C } from "@/lib/types";
import { Avatar } from "./primitives";
import { VotePill } from "./PostActions";

export function CommentBox({ onSubmit, placeholder = "Join the conversation...", autoFocus, onCancel }: { onSubmit: (body: string) => void; placeholder?: string; autoFocus?: boolean; onCancel?: () => void }) {
  const [body, setBody] = useState("");
  const [focused, setFocused] = useState(!!autoFocus);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (!body.trim()) return; onSubmit(body.trim()); setBody(""); }}
      className="rounded-xl border bg-card focus-within:border-primary/60"
    >
      <textarea
        value={body}
        autoFocus={autoFocus}
        onFocus={() => setFocused(true)}
        onChange={(e) => setBody(e.target.value)}
        placeholder={placeholder}
        rows={focused ? 3 : 1}
        className="block w-full resize-none bg-transparent px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
      />
      {focused && (
        <div className="flex justify-end gap-2 px-2 pb-2">
          <button type="button" onClick={() => { setFocused(false); setBody(""); onCancel?.(); }} className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">Cancel</button>
          <button disabled={!body.trim()} className="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground disabled:opacity-40">Comment</button>
        </div>
      )}
    </form>
  );
}

export function Comment({ comment, all, onReply }: { comment: C; all: C[]; onReply: (parentId: string, body: string) => void }) {
  const { userById } = useBaseData();
  const [replying, setReplying] = useState(false);
  const author = userById(comment.authorId);
  const replies = all.filter((c) => c.parentId === comment.id);

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <Avatar user={author} size={28} />
        {replies.length > 0 && <div className="mt-2 w-px flex-1 bg-border" />}
      </div>
      <div className="min-w-0 flex-1 pb-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold">@{author.username}</span>
          <span className="text-muted-foreground">· {timeAgo(comment.minutesAgo)}</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed">{comment.body}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <VotePill id={comment.id} score={comment.score} />
          <button onClick={() => setReplying((r) => !r)} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted">
            <MessageSquare className="h-3.5 w-3.5" /> Reply
          </button>
        </div>
        {replying && (
          <div className="mt-2">
            <CommentBox autoFocus placeholder={`Reply to @${author.username}...`} onCancel={() => setReplying(false)} onSubmit={(b) => { onReply(comment.id, b); setReplying(false); }} />
          </div>
        )}
        {replies.length > 0 && (
          <div className="mt-3 space-y-4">
            {replies.map((r) => <Comment key={r.id} comment={r} all={all} onReply={onReply} />)}
          </div>
        )}
      </div>
    </div>
  );
}
