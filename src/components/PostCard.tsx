import { Link, useNavigate } from "@tanstack/react-router";
import { useBaseData } from "@/lib/use-data";
import { timeAgo, typeLabel, type Post } from "@/lib/types";
import { Avatar, LocationBadge, TypeTag } from "./primitives";
import { PostActions } from "./PostActions";

export function PostCard({ post }: { post: Post }) {
  const navigate = useNavigate();
  const { userById, communityById } = useBaseData();
  const author = userById(post.authorId);
  const community = communityById(post.communityId);

  return (
    <article
      onClick={() => navigate({ to: "/post/$id", params: { id: post.id } })}
      className="card-surface cursor-pointer p-4 transition-colors hover:border-foreground/15"
    >
      <header className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
        <Avatar user={author} size={22} />
        {community && (
          <Link to="/c/$slug" params={{ slug: community.id }} onClick={(e) => e.stopPropagation()} className="font-semibold hover:underline">
            {community.name}
          </Link>
        )}
        <span className="text-muted-foreground">·</span>
        <span className="text-muted-foreground">@{author.username}</span>
        <span className="text-muted-foreground">· {timeAgo(post.minutesAgo)}</span>
        <span className="ml-auto"><TypeTag>{typeLabel(post.type)}</TypeTag></span>
      </header>
      <div className="mt-2.5 flex gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-[17px] font-semibold leading-snug">{post.title}</h2>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.body}</p>
          <LocationBadge className="mt-2" place={post.place} distanceKm={post.distanceKm} />
        </div>
        {post.image && (
          <img src={post.image} alt="" loading="lazy" width={1024} height={640} className="hidden h-24 w-36 shrink-0 rounded-lg object-cover sm:block" />
        )}
      </div>
      {post.image && <img src={post.image} alt="" loading="lazy" width={1024} height={640} className="mt-3 aspect-video w-full rounded-lg object-cover sm:hidden" />}
      <div className="mt-3">
        <PostActions post={post} />
      </div>
    </article>
  );
}
