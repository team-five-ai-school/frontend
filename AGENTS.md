<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

Hackathon frontend for Team Five. The product task is decided on the day, so build fast but keep the codebase coherent. When `PRODUCT.md` / `DESIGN.md` exist (created by `/impeccable init`), read them before any UI work and follow them over the defaults below.

## Setup check (start of every session until done)

Before any other work, check these and **remind the user** about each one that is missing. Do not skip the reminder, even if the user asked for something else:

1. **Impeccable is not installed** (no `.claude/skills/impeccable` and no `.agents/skills/impeccable`). Ask the user to run this in the repo root, then restart the agent:

   ```bash
   npx impeccable install --providers=claude,codex,cursor --scope=project
   ```

2. **No `PRODUCT.md` / `DESIGN.md`** in the repo root. Once the hackathon task is known, ask the user to run `/impeccable init` and describe the product, so every agent builds UI in one style.

After both exist, commit them in a PR and delete this section.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Turbopack. **Cache Components** + **Partial Prefetching** + **React Compiler** are on (`next.config.ts`).
- Tailwind CSS v4 (config lives in `src/app/globals.css`, no `tailwind.config`).
- shadcn/ui (Radix base, "nova" style), icons from `lucide-react`, toasts via `sonner`, theming via `next-themes`.
- TanStack Query v5 for client-side server state. Zod v4 for validation.
- npm. Node version in `.nvmrc`.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run check`: lint + typecheck + format check. **Run before every commit/PR.**
- `npm run build`: production build (also catches Cache Components prerender errors)
- `npm run format`: Prettier (sorts Tailwind classes)
- `npx shadcn@latest add <component>`: add a UI component
- `npm run images`: convert `assets/images/*` → AVIF + WebP in `public/images/`

## Structure

```
src/app/            routes only: page, layout, loading, error, route handlers, metadata files
src/features/<x>/   one folder per feature: data.ts (server), actions.ts, <x>-cache.ts, components/
src/components/ui/  shadcn components; treat as generated, extend via variants, don't fork wildly
src/components/     app-wide components (header, providers, theme toggle)
src/lib/            site config, fonts, query client, helpers
```

`src/features/tasks` + `src/app/examples/tasks` is the **reference implementation** of every pattern below. Copy from it; delete it once the real feature exists.

## Data fetching & caching

Decide per piece of data:

| Data                                         | Where                                | How                                                                      |
| -------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| Same for every user, changes rarely          | Server Component                     | `"use cache"` + `cacheLife(...)` + `cacheTag(...)`                       |
| Per-request (cookies, headers, searchParams) | Server Component inside `<Suspense>` | read runtime API, pass values into cached functions                      |
| Interactive / mutated on the client / polled | Client Component                     | TanStack Query (`useSuspenseQuery`/`useQuery`), hydrated from the server |
| Writes                                       | Server Action (`"use server"`)       | validate with Zod, then `updateTag(tag)`                                 |

Rules:

- Every `"use cache"` gets an explicit `cacheLife` and a `cacheTag`. No `fetch` caching options, no `export const revalidate`: that is the old model.
- Wrap anything that reads runtime data or uncached I/O in `<Suspense>` with a skeleton matching the final layout. The build fails otherwise; read the error, don't silence it.
- Never call `Date.now()`, `Math.random()`, `new Date()` in render without `await connection()` (or inside `"use cache"`).
- Start independent requests in parallel (`Promise.all` or sibling Suspense boundaries). No request waterfalls.
- TanStack Query: one cache contract per feature (`key` + `tag` + `queryOptions`, see `task-cache.ts`). Hydrate with `dehydrate()` from `@/lib/query/hydrate` (TanStack's own `dehydrate` breaks prerendering).
- Mutations: optimistic update in `onMutate`, rollback + `toast.error` in `onError`, `invalidateQueries` in `onSettled`.
- Don't use TanStack Query for data a Server Component can render directly. Don't `useEffect` + `fetch`.
- Server Actions and Route Handlers are public endpoints: validate input with Zod, never trust the client.
- Secrets: only in `.env.local` / Vercel env, read only on the server. `NEXT_PUBLIC_*` is visible to everyone. This repo is public.

## Images

- `next/image` for every raster image: always set `width`/`height` (or `fill` + `sizes`) and a meaningful `alt` (`alt=""` if decorative). It serves AVIF → WebP automatically.
- Add `preload` only to the single LCP image above the fold (`priority` is deprecated in Next 16).
- Prefer static imports (file in `src/assets/`, then `import hero from "@/assets/hero.jpg"`): hashed, immutable cache, free blur placeholder.
- Icons: `lucide-react`. Logos/illustrations: SVG (`next/image` serves `.svg` unoptimized automatically). If an SVG must follow `currentColor`, make it a small TSX component.
- Remote images: add the host to `images.remotePatterns` in `next.config.ts` first.
- Heavy originals (CSS backgrounds, OG images): run `npm run images` and use the generated `.avif`/`.webp`.

## UI rules (anti-slop)

Build everything from shadcn components and theme tokens. The goal is a product that looks designed, not generated.

- **Tokens only.** Colors via `bg-background`, `text-muted-foreground`, `border`, `bg-primary`, etc. No raw hex / `bg-blue-500` in components. Brand colors are changed once in `globals.css` (`:root` and `.dark`).
- **Use the existing component before writing a new one.** Check `src/components/ui`; add missing ones with the shadcn CLI.
- **No decorative AI defaults:** no purple/blue gradients, no gradient text, no glow blobs, no glassmorphism cards, no emoji as icons, no grid of three identical icon cards, no cards nested in cards, no colored left-border "accent" cards.
- **Hierarchy through type and spacing, not boxes.** One clear primary action per screen. Related items close, groups further apart. Body ~16px, line length ≤ 75ch (`max-w-prose`), headings `text-balance`.
- **Every async view has all states:** loading (skeleton with the final shape), empty (`Empty` component with a next action), error (message + retry), success. Disable or mark pending actions.
- **Accessibility:** semantic HTML, labels on every input (`Field` + `FieldLabel`), `aria-label` on icon-only buttons, visible focus (don't remove outlines), keyboard reachable, WCAG AA contrast in both themes.
- **Responsive & themes:** check 375px width and both light/dark before calling UI done.
- **Motion:** short (150–250ms), purposeful (feedback, continuity), never on routine dialogs as bounce. `prefers-reduced-motion` is respected globally.
- **Copy:** specific and short. UI language is Ukrainian unless the task says otherwise. No marketing filler ("revolutionary", "seamless", "unlock"), avoid em-dash chains.
- Use `tabular-nums` for changing numbers, `Intl.*` for dates/numbers (format on the server or in an effect-free way to avoid hydration mismatch).

## Skills

Project skills in `.claude/skills` (Claude Code) and `.agents/skills` (Codex, Cursor):

- `vercel-react-best-practices`: performance rules; apply when writing or reviewing React/Next code.
- `vercel-composition-patterns`: component API design (compound components instead of boolean props).
- `web-design-guidelines`: UI/a11y audit; run on finished screens.
- `deploy-to-vercel`: deployment help.
- `impeccable` (if installed, see README): `/impeccable init` once the task is known, then `critique`, `audit`, `polish` on screens.

## Git

- Branches: `main` = production, `dev` = integration/staging. Both are changed only through PRs.
- Flow: branch off `dev` (`feat/...`, `fix/...`) → PR into `dev` → merge after CI is green. Release = PR `dev` → `main`.
- Vercel deploys `main` to production, `dev` to the stable dev domain, and a preview for every PR.
- Small PRs, one feature each. Run `npm run check` before pushing.
