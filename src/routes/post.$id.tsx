import { useMemo } from "react";
import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { commentsQuery } from "@/lib/queries";
import { useApp } from "@/lib/store";
import { useBaseData } from "@/lib/use-data";
import { timeAgo, typeLabel } from "@/lib/types";
import { interactionService } from "@/services/interactionService";
import { Avatar, LocationBadge, TypeTag } from "@/components/primitives";
import { PostActions } from "@/components/PostActions";
import { Comment, CommentBox } from "@/components/Comment";
import { CommunityMark } from "@/components/CommunityCard";
import { RightSidebar } from "@/components/RightSidebar";
import { posts as seed } from "@/lib/mock-data";

export const Route = createFileRoute("/post/$id")({
  loader: ({ params, context }) => {
    void context.queryClient.prefetchQuery(commentsQuery(params.id));
    const p = seed.find((x) => x.id === params.id);
    if (!p && !params.id.startsWith("new-")) throw notFound();
    return { title: p?.title ?? "New post", body: p?.body ?? "" };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Post not found — Find & Share" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.title} — Find & Share`;
    const d = loaderData.body.slice(0, 155) || "A local post on Find & Share.";
    return { meta: [{ title: t }, { name: "description", content: d }, { property: "og:title", content: t }, { property: "og:description", content: d }] };
  },
  notFoundComponent: () => (
    <div className="py-20 text-center"><h1 className="text-xl font-semibold">Post not found</h1><Link to="/" className="mt-3 inline-block text-sm font-semibold text-primary">Back to feed</Link></div>
  ),
  component: PostDetails,
});

function PostDetails() {
  const { id } = Route.useParams();
  const router = useRouter();
  const { posts, userById, communityById, me } = useBaseData();
  const { newComments, addComment } = useApp();
  const { data: base = [] } = useQuery(commentsQuery(id));
  const post = posts.find((p) => p.id === id);
  const all = useMemo(() => [...base, ...newComments.filter((c) => c.postId === id)], [base, newComments, id]);

  if (!post) return <div className="py-20 text-center text-sm text-muted-foreground">This post is no longer available.</div>;
  const author = userById(post.authorId);
  const community = communityById(post.communityId);

  const submit = async (parentId: string | null, body: string) => {
    const c = await interactionService.addComment({ postId: id, authorId: me.id, parentId, body });
    addComment(c);
  };

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1">
        <button onClick={() => router.history.back()} className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back</button>
        <article className="card-surface p-5">
          <header className="flex items-center gap-3">
            {community && <CommunityMark community={community} size={40} />}
            <div className="min-w-0 flex-1 text-sm">
              {community && <Link to="/c/$slug" params={{ slug: community.id }} className="font-semibold hover:underline">{community.name} Community</Link>}
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Avatar user={author} size={16} /> @{author.username} · {timeAgo(post.minutesAgo)}
              </div>
            </div>
            <TypeTag>{typeLabel(post.type)}</TypeTag>
          </header>
          <h1 className="mt-4 text-2xl font-bold leading-tight">{post.title}</h1>
          <LocationBadge className="mt-2" place={post.place} distanceKm={post.distanceKm} />
          {post.body && <p className="mt-4 whitespace-pre-line leading-relaxed">{post.body}</p>}
          {post.image && <img src={post.image} alt="" width={1024} height={640} className="mt-4 w-full rounded-xl object-cover" />}
          <div className="mt-4 border-t pt-3"><PostActions post={post} commentCount={all.length} /></div>
        </article>

        <section className="card-surface mt-3 p-5">
          <h2 className="mb-3 text-base font-semibold">Comments <span className="text-muted-foreground">({all.length})</span></h2>
          <CommentBox onSubmit={(b) => submit(null, b)} />
          <div className="mt-6 space-y-5">
            {all.filter((c) => !c.parentId).map((c) => <Comment key={c.id} comment={c} all={all} onReply={(pid, b) => submit(pid, b)} />)}
            {!all.length && <p className="text-sm text-muted-foreground">No comments yet. Be the first neighbour to reply.</p>}
          </div>
        </section>
      </div>
      <RightSidebar />
    </div>
  );
}
