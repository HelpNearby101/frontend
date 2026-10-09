import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { communitiesQuery, meQuery, postsQuery, usersQuery } from "./queries";
import { useApp } from "./store";
import type { FeedSort, Post } from "./types";

export function useBaseData() {
  const { data: basePosts } = useSuspenseQuery(postsQuery);
  const { data: communities } = useSuspenseQuery(communitiesQuery);
  const { data: users } = useSuspenseQuery(usersQuery);
  const { data: me } = useSuspenseQuery(meQuery);
  const { newPosts } = useApp();
  const posts = useMemo(() => [...newPosts, ...basePosts], [newPosts, basePosts]);
  const userById = (id: string) => users.find((u) => u.id === id) ?? me;
  const communityById = (id: string) => communities.find((c) => c.id === id);
  return { posts, communities, users, me, userById, communityById };
}

export function sortPosts(posts: Post[], sort: FeedSort) {
  const list = [...posts];
  if (sort === "near") list.sort((a, b) => a.distanceKm - b.distanceKm);
  if (sort === "latest") list.sort((a, b) => a.minutesAgo - b.minutesAgo);
  if (sort === "trending") list.sort((a, b) => b.score / (b.minutesAgo + 120) - a.score / (a.minutesAgo + 120));
  return list;
}

/** Applies the global search + location filters */
export function useFiltered(posts: Post[]) {
  const { query, area } = useApp();
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (area === "all" || p.communityId === area) &&
        (!q || `${p.title} ${p.body} ${p.place} ${p.communityId}`.toLowerCase().includes(q)),
    );
  }, [posts, query, area]);
}
