import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { notificationsQuery } from "@/lib/queries";
import { timeAgo } from "@/lib/types";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Find & Share" },
      { name: "description", content: "Replies, mentions and nearby updates from your neighbourhood." },
      { property: "og:title", content: "Notifications — Find & Share" },
      { property: "og:description", content: "Replies, mentions and nearby updates." },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { data } = useSuspenseQuery(notificationsQuery);
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Notifications</h1>
      <div className="card-surface divide-y">
        {data.map((n) => (
          <Link key={n.id} to="/post/$id" params={{ id: n.postId ?? "p1" }} className="flex gap-3 p-4 hover:bg-muted/60">
            <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.unread ? "bg-primary" : "bg-border")} />
            <span className="text-sm">{n.text}<span className="block text-xs text-muted-foreground">{timeAgo(n.minutesAgo)}</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
