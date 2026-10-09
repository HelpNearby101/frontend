import { communities, posts } from "@/lib/mock-data";
import type { Community, Post, PostType } from "@/lib/types";
import { API, http, mock } from "./config";

export type NewPostInput = Omit<Post, "id" | "minutesAgo" | "score" | "commentCount" | "mapX" | "mapY" | "distanceKm">;

export const postService = {
  getPosts(): Promise<Post[]> {
    return API.post ? http(API.post, "/posts") : mock(posts);
  },
  getPost(id: string): Promise<Post | null> {
    return API.post ? http(API.post, `/posts/${id}`) : mock(posts.find((p) => p.id === id) ?? null);
  },
  getPostsByType(type: PostType): Promise<Post[]> {
    return API.post ? http(API.post, `/posts?type=${type}`) : mock(posts.filter((p) => p.type === type));
  },
  getCommunities(): Promise<Community[]> {
    return API.post ? http(API.post, "/communities") : mock(communities);
  },
  getCommunity(id: string): Promise<Community | null> {
    return API.post ? http(API.post, `/communities/${id}`) : mock(communities.find((c) => c.id === id) ?? null);
  },
  createPost(input: NewPostInput): Promise<Post> {
    if (API.post) return http(API.post, "/posts", { method: "POST", body: JSON.stringify(input) });
    return mock({
      ...input,
      id: `new-${Math.random().toString(36).slice(2, 8)}`,
      minutesAgo: 0,
      score: 1,
      commentCount: 0,
      distanceKm: 0.1,
      mapX: 30 + Math.round(Math.random() * 40),
      mapY: 30 + Math.round(Math.random() * 40),
    });
  },
};
