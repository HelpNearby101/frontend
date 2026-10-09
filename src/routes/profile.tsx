import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/store";
import { useBaseData } from "@/lib/use-data";
import { comments as seedComments } from "@/lib/mock-data";
import { timeAgo } from "@/lib/types";
import { FeedList } from "@/components/Feed";
import { Avatar } from "@/components/primitives";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your profile — Find & Share" },
      { name: "description", content: "Your posts, comments and saved places on Find & Share." },
      { property: "og:title", content: "Your profile — Find & Share" },
      { property: "og:description", content: "Your posts, comments and saved places." },
    ],
  }),
  component: Profile,
});

type Tab = "posts" | "comments" | "saved";

function Profile() {
  const { me, posts } = useBaseData();
  const { saved, joined, newComments } = useApp();
  const [tab, setTab] = useState<Tab>("posts");
  const myPosts = posts.filter((p) => p.authorId === me.id);
  const myComments = [...seedComments, ...newComments].filter((c) => c.authorId === me.id);
  const stats = [
    { label: "Posts", value: myPosts.length },
    { label: "Comments", value: myComments.length },
    { label: "Communities", value: joined.size },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <section className="card-surface p-6">
        <div className="flex flex-wrap items-start gap-5">
          <Avatar user={me} size={84} />
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold">{me.displayName}</h1>
            <div className="text-sm text-muted-foreground">@{me.username}</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4 text-primary" />{me.location}</span>
              <span className="inline-flex items-center gap-1"><CalendarDays className="h-4 w-4" />Joined {me.joined}</span>
            </div>
            <p className="mt-3 max-w-prose text-sm leading-relaxed">{me.bio}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 divide-x rounded-xl border">
          {stats.map((s) => (
            <div key={s.label} className="py-3 text-center">
              <div className="font-display text-xl font-bold">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <div className="my-4 flex gap-1 border-b">
        {(["posts", "comments", "saved"] as Tab[]).map((t) => (
          <button key={t} onClick={() => setTab(t)} className={cn("-mb-px border-b-2 px-4 py-2.5 text-sm font-medium capitalize", tab === t ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>{t}</button>
        ))}
      </div>
      {tab === "posts" && <FeedList posts={myPosts} empty="You haven't posted yet. Share something happening around you!" />}
      {tab === "saved" && <FeedList posts={posts.filter((p) => saved.has(p.id))} empty="No saved posts yet." />}
      {tab === "comments" && (
        <div className="space-y-2">
          {myComments.map((c) => {
            const p = posts.find((x) => x.id === c.postId);
            return (
              <Link key={c.id} to="/post/$id" params={{ id: c.postId }} className="card-surface block p-4 hover:border-foreground/15">
                <div className="text-xs text-muted-foreground">on <span className="font-medium text-foreground">{p?.title}</span> · {timeAgo(c.minutesAgo)}</div>
                <p className="mt-1 text-sm">{c.body}</p>
              </Link>
            );
          })}
          {!myComments.length && <p className="text-sm text-muted-foreground">No comments yet.</p>}
        </div>
      )}
    </div>
  );
}
