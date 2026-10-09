import { createFileRoute, useRouter } from "@tanstack/react-router";
import { CreatePostForm } from "@/components/CreatePostModal";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create a post — Find & Share" },
      { name: "description", content: "Share a recommendation, event, lost item or question with your neighbourhood." },
      { property: "og:title", content: "Create a post — Find & Share" },
      { property: "og:description", content: "Share something with your neighbourhood." },
    ],
  }),
  component: CreatePage,
});

function CreatePage() {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-2xl font-bold">Share something nearby</h1>
      <div className="card-surface p-5">
        <CreatePostForm onDone={() => router.history.back()} />
      </div>
    </div>
  );
}
