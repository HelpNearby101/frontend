import { useRef, useState } from "react";
import { ImagePlus, MapPin, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { useBaseData } from "@/lib/use-data";
import { POST_TYPES, type PostType } from "@/lib/types";
import { postService } from "@/services/postService";

const field = "w-full rounded-lg border bg-card px-3 py-2.5 text-sm outline-none focus:border-primary/60 placeholder:text-muted-foreground";

export function CreatePostForm({ onDone }: { onDone: () => void }) {
  const { communities, me } = useBaseData();
  const { addPost } = useApp();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [communityId, setCommunityId] = useState(communities[0]?.id ?? "");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [place, setPlace] = useState("");
  const [type, setType] = useState<PostType>("discussion");
  const [image, setImage] = useState<string>();
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    const community = communities.find((c) => c.id === communityId);
    const post = await postService.createPost({
      title: title.trim(), body: body.trim(), image, type, communityId, authorId: me.id,
      place: place.trim() || community?.name || "Bangalore",
    });
    addPost(post);
    setBusy(false);
    onDone();
    navigate({ to: "/post/$id", params: { id: post.id } });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Community</span>
          <select value={communityId} onChange={(e) => setCommunityId(e.target.value)} className={field}>
            {communities.map((c) => <option key={c.id} value={c.id}>{c.name} Community</option>)}
          </select>
        </label>
        <label className="space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Location</span>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" />
            <input value={place} onChange={(e) => setPlace(e.target.value)} placeholder="e.g. 12th Main, Indiranagar" className={cn(field, "pl-9")} />
          </div>
        </label>
      </div>
      <div className="space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">Post type</span>
        <div className="flex flex-wrap gap-1.5">
          {POST_TYPES.map((t) => (
            <button type="button" key={t.value} onClick={() => setType(t.value)}
              className={cn("rounded-full border px-3 py-1.5 text-xs font-medium", type === t.value ? "border-primary bg-primary-soft text-primary" : "bg-card text-muted-foreground hover:text-foreground")}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" maxLength={200} required className={cn(field, "text-base font-medium")} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="What's happening? Add details your neighbours would find useful..." rows={5} className={cn(field, "resize-none")} />
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) setImage(URL.createObjectURL(f)); }} />
      {image ? (
        <div className="relative">
          <img src={image} alt="" className="max-h-56 w-full rounded-lg object-cover" />
          <button type="button" onClick={() => setImage(undefined)} aria-label="Remove image" className="absolute right-2 top-2 rounded-full bg-card p-1.5 shadow-pop"><X className="h-4 w-4" /></button>
        </div>
      ) : (
        <button type="button" onClick={() => fileRef.current?.click()} className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed py-5 text-sm text-muted-foreground hover:border-primary/60 hover:text-primary">
          <ImagePlus className="h-4 w-4" /> Add image
        </button>
      )}
      <div className="flex justify-end gap-2 border-t pt-4">
        <button type="button" onClick={onDone} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">Cancel</button>
        <button disabled={!title.trim() || busy} className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-40">
          {busy ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  );
}

export function CreatePostModal() {
  const { createOpen, setCreateOpen } = useApp();
  if (!createOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" onMouseDown={() => setCreateOpen(false)}>
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl border bg-card p-5 shadow-pop animate-in fade-in slide-in-from-bottom-4 sm:rounded-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Share something nearby</h2>
          <button onClick={() => setCreateOpen(false)} aria-label="Close" className="rounded-full p-1.5 hover:bg-muted"><X className="h-5 w-5" /></button>
        </div>
        <CreatePostForm onDone={() => setCreateOpen(false)} />
      </div>
    </div>
  );
}
