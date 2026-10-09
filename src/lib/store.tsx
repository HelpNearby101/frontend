import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Comment, Post } from "./types";
import { interactionService, type VoteDir } from "@/services/interactionService";

interface AppState {
  votes: Record<string, VoteDir>;
  vote: (id: string, dir: 1 | -1) => void;
  saved: Set<string>;
  toggleSave: (id: string) => void;
  joined: Set<string>;
  toggleJoin: (id: string) => void;
  newPosts: Post[];
  addPost: (p: Post) => void;
  newComments: Comment[];
  addComment: (c: Comment) => void;
  query: string;
  setQuery: (q: string) => void;
  area: string; // "all" or community id
  setArea: (a: string) => void;
  createOpen: boolean;
  setCreateOpen: (v: boolean) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [votes, setVotes] = useState<Record<string, VoteDir>>({});
  const [saved, setSaved] = useState<Set<string>>(new Set(["p4"]));
  const [joined, setJoined] = useState<Set<string>>(new Set(["koramangala", "indiranagar", "hsr-layout", "whitefield"]));
  const [newPosts, setNewPosts] = useState<Post[]>([]);
  const [newComments, setNewComments] = useState<Comment[]>([]);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState("all");
  const [createOpen, setCreateOpen] = useState(false);

  const vote = useCallback((id: string, dir: 1 | -1) => {
    setVotes((v) => {
      const next: VoteDir = v[id] === dir ? 0 : dir;
      interactionService.vote(id, next);
      return { ...v, [id]: next };
    });
  }, []);

  const toggleIn = (setter: typeof setSaved, cb: (id: string, on: boolean) => void) => (id: string) =>
    setter((s) => {
      const n = new Set(s);
      const on = !n.has(id);
      on ? n.add(id) : n.delete(id);
      cb(id, on);
      return n;
    });

  const value = useMemo<AppState>(
    () => ({
      votes, vote, saved, joined, newPosts, newComments, query, setQuery, area, setArea, createOpen, setCreateOpen,
      toggleSave: toggleIn(setSaved, interactionService.setSaved),
      toggleJoin: toggleIn(setJoined, interactionService.setMembership),
      addPost: (p) => setNewPosts((ps) => [p, ...ps]),
      addComment: (c) => setNewComments((cs) => [...cs, c]),
    }),
    [votes, vote, saved, joined, newPosts, newComments, query, area, createOpen],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be used inside AppStateProvider");
  return c;
}
