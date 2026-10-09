import { comments, notifications } from "@/lib/mock-data";
import type { Comment, Notification } from "@/lib/types";
import { API, http, mock } from "./config";

export type VoteDir = 1 | -1 | 0;

export const interactionService = {
  getComments(postId: string): Promise<Comment[]> {
    return API.interaction
      ? http(API.interaction, `/posts/${postId}/comments`)
      : mock(comments.filter((c) => c.postId === postId));
  },
  getNotifications(): Promise<Notification[]> {
    return API.interaction ? http(API.interaction, "/notifications") : mock(notifications);
  },
  addComment(input: Pick<Comment, "postId" | "authorId" | "parentId" | "body">): Promise<Comment> {
    if (API.interaction)
      return http(API.interaction, `/posts/${input.postId}/comments`, { method: "POST", body: JSON.stringify(input) });
    return mock({ ...input, id: `c-${Math.random().toString(36).slice(2, 8)}`, minutesAgo: 0, score: 1 }, 60);
  },
  vote(targetId: string, dir: VoteDir): Promise<void> {
    if (API.interaction)
      return http(API.interaction, `/votes`, { method: "POST", body: JSON.stringify({ targetId, dir }) });
    return mock(undefined, 0);
  },
  setSaved(postId: string, saved: boolean): Promise<void> {
    if (API.interaction)
      return http(API.interaction, `/saved/${postId}`, { method: saved ? "PUT" : "DELETE" });
    return mock(undefined, 0);
  },
  setMembership(communityId: string, joined: boolean): Promise<void> {
    if (API.interaction)
      return http(API.interaction, `/communities/${communityId}/members`, { method: joined ? "PUT" : "DELETE" });
    return mock(undefined, 0);
  },
};
