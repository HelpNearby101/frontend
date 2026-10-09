import { queryOptions } from "@tanstack/react-query";
import { postService } from "@/services/postService";
import { profileService } from "@/services/profileService";
import { interactionService } from "@/services/interactionService";

export const postsQuery = queryOptions({ queryKey: ["posts"], queryFn: postService.getPosts });
export const communitiesQuery = queryOptions({ queryKey: ["communities"], queryFn: postService.getCommunities });
export const usersQuery = queryOptions({ queryKey: ["users"], queryFn: profileService.getUsers });
export const meQuery = queryOptions({ queryKey: ["me"], queryFn: profileService.getCurrentUser });
export const notificationsQuery = queryOptions({ queryKey: ["notifications"], queryFn: interactionService.getNotifications });
export const commentsQuery = (postId: string) =>
  queryOptions({ queryKey: ["comments", postId], queryFn: () => interactionService.getComments(postId) });

/** Shared bundle most pages need */
export const baseQueries = [postsQuery, communitiesQuery, usersQuery, meQuery] as const;
