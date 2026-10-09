<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- All backend access goes through `src/services/*Service.ts` (profile, post, interaction); each falls back to mock data when its `VITE_*_API_URL` is unset — so the UI can be wired to the Spring Boot services without touching components.
- Client-only UI state (votes, saved, joined, search, area filter, create modal) lives in `src/lib/store.tsx`; server data is read via TanStack Query options in `src/lib/queries.ts`.
