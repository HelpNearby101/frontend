export type PostType = "discussion" | "lost-found" | "recommendation" | "event" | "help" | "deal";

export const POST_TYPES: { value: PostType; label: string }[] = [
  { value: "discussion", label: "Discussion" },
  { value: "lost-found", label: "Lost & Found" },
  { value: "recommendation", label: "Recommendation" },
  { value: "event", label: "Event" },
  { value: "help", label: "Help" },
  { value: "deal", label: "Local Deal" },
];

export const typeLabel = (t: PostType) => POST_TYPES.find((p) => p.value === t)?.label ?? t;

export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarTone: 1 | 2 | 3 | 4 | 5;
  location: string;
  bio: string;
  joined: string;
}

export interface Community {
  id: string; // slug
  name: string;
  area: string;
  members: number;
  online: number;
  description: string;
  rules: string[];
}

export interface Post {
  id: string;
  title: string;
  body: string;
  image?: string | undefined;
  type: PostType;
  communityId: string;
  authorId: string;
  minutesAgo: number;
  distanceKm: number;
  place: string;
  score: number;
  commentCount: number;
  /** position on the stylised map, 0-100 */
  mapX: number;
  mapY: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  body: string;
  minutesAgo: number;
  score: number;
}

export interface Notification {
  id: string;
  text: string;
  minutesAgo: number;
  postId?: string;
  unread: boolean;
}

export type FeedSort = "near" | "latest" | "trending";

export function timeAgo(m: number) {
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  if (m < 60 * 24) return `${Math.floor(m / 60)}h ago`;
  return `${Math.floor(m / (60 * 24))}d ago`;
}

export function compact(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);
}
