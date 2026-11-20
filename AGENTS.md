<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project rules

Hackathon frontend for Team Five. The product task is decided on the day, so build fast but keep the codebase coherent. When `PRODUCT.md` / `DESIGN.md` exist (created by `/impeccable init`), read them before any UI work and follow them over the defaults below.

## Setup check

At the start of a session, check the items below. If one is missing, mention it to the user **once** in your first reply, then continue with their request. Skip this in subagents and non-interactive runs.

1. **Impeccable is not installed** (no `.claude/skills/impeccable` and no `.agents/skills/impeccable`). Ask the user to run this in the repo root, then restart the agent:

   ```bash
   npx impeccable install --providers=claude,codex,cursor --scope=project
   ```

2. **No `PRODUCT.md` / `DESIGN.md`** in the repo root. Once the task is known, ask the user to run `/impeccable init` and describe the product, so every agent builds UI in one style.

When both exist, commit them in a PR and delete this section.

## Stack

- Next.js 16 App Router, React 19, TypeScript, Turbopack. **Cache Components** + **Partial Prefetching** + **React Compiler** + **typed routes** are on (`next.config.ts`).
- Tailwind CSS v4 (config lives in `src/app/globals.css`, no `tailwind.config`).
- shadcn/ui (Radix base, "nova" style), icons from `lucide-react`, toasts via `sonner`, theming via `next-themes`.
- TanStack Query v5 for client-side server state. Zod v4 for validation.
- npm. Node 24 (`.nvmrc`).
- UI copy, code comments and docs are in **English**.

## Commands

- `npm run dev`: dev server on http://localhost:3000
- `npm run check`: lint + typecheck + format check. **Run before every commit/PR.**
- `npm run build`: production build. Also catches Cache Components prerender errors. Some caching bugs only show up here or with `npm run build && npm start`, not in `npm run dev`.
- `npm run format`: Prettier (sorts Tailwind classes)
- `npx shadcn@latest add <component>`: add a UI component
- `npm run images`: convert raw images in `assets/images/` → AVIF + WebP in `public/images/`

## Structure

```
src/app/                 routes only: page, layout, loading, error, route handlers, metadata files
src/features/<x>/        one folder per feature:
  data.ts                  server-only reads/writes, cached with "use cache" + cacheTag
  actions.ts               Server Actions ("use server"), return ActionResult
  <x>-cache.ts             cache contract: Zod schemas, query key, cache tags, queryOptions
  use-<x>-mutations.ts     TanStack mutations with optimistic updates
  components/              feature UI
src/components/ui/       shadcn components; treat as generated, extend via variants
src/components/          app-wide components (header, providers, theme toggle)
src/lib/                 site config + routes, env, api client, action result, fonts, query client
src/assets/              images imported statically into components
assets/images/           raw image sources for `npm run images` (not imported by code)
```

Reference implementation, copy from it and delete it once real features exist:

- `src/app/examples/tasks`: list with server cache → TanStack hydration, optimistic mutations, filter in `searchParams`.
- `src/app/examples/tasks/[id]`: dynamic route with `params`, `generateMetadata`, `notFound()`.
- `src/features/tasks`: data, actions, cache contract, mutations, components.

## Working in parallel (5 people)

- **Routes:** add pages to `routes` in `src/lib/site.ts`; the header nav and `sitemap.xml` are generated from it. Don't hand-edit them.
- **Shared files:** `src/app/globals.css`, `package.json` / `package-lock.json` and `src/components/ui/` change only in small, separate PRs, merged quickly. Most shadcn components are already installed; check `src/components/ui` before adding one.
- **Lockfile conflicts:** take the incoming `package-lock.json`, run `npm install`, commit the result. Never hand-merge it.
- Keep your work inside your feature folder (`src/features/<x>`, `src/app/<route>`).

## Data fetching & caching

Decide per piece of data:

| Data                                                 | Where                                | How                                                                      |
| ---------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------ |
| Same for every user, changes rarely                  | Server Component                     | `"use cache"` + `cacheLife(...)` + `cacheTag(...)`                       |
| Per-request (cookies, headers, searchParams, params) | Server Component inside `<Suspense>` | read the runtime API, pass values into cached functions                  |
| Interactive / mutated on the client / polled         | Client Component                     | TanStack Query (`useSuspenseQuery`/`useQuery`), hydrated from the server |
| Writes                                               | Server Action (`"use server"`)       | validate with Zod, return `ActionResult`, then `updateTag(tag)`          |

Rules:

- Every `"use cache"` gets an explicit `cacheLife` and a `cacheTag`. No `fetch` caching options, no `export const revalidate`: that is the old model.
- Wrap anything that reads runtime data (`params`, `searchParams`, `cookies()`, `headers()`) or uncached I/O in `<Suspense>` with a skeleton matching the final layout. Read `params`/`searchParams` in the child inside the boundary, never at the top of the page. The build fails otherwise; read the error, don't silence it.
- `notFound()` called inside a `<Suspense>` boundary renders the not-found UI with a `noindex` tag, but the HTTP status stays `200` because streaming has started. That is expected; call it before any Suspense boundary only if a real `404` status matters.
- Never call `Date.now()`, `Math.random()` or `new Date()` (current time) in render without `await connection()` (or inside `"use cache"`).
- Start independent requests in parallel (`Promise.all` or sibling Suspense boundaries). No request waterfalls.
- **Route Handlers that TanStack Query refetches must call `await connection()` first.** Otherwise they are prerendered as static responses and a refetch right after a mutation returns stale data, undoing the user's change.
- TanStack Query: one cache contract per feature (`key` + `tag` + `queryOptions`, see `task-cache.ts`). Hydrate with `dehydrate()` from `@/lib/query/hydrate` (TanStack's own `dehydrate` breaks prerendering).
- Mutations: optimistic update in `onMutate`, write the server's response in `onSuccess`, rollback + `toast.error` in `onError`, `invalidateQueries` in `onSettled`.
- Don't use TanStack Query for data a Server Component can render directly. Don't `useEffect` + `fetch`.

## Backend, env and auth

- **API calls** go through `api()` in `src/lib/api.ts` (server-only): typed fetch, Zod-validated response, `ApiError` on non-2xx. Call it from `data.ts` functions, Server Actions and Route Handlers, never from the client.
- **Env vars:** add every variable to `src/lib/env.ts` (validated with Zod) and to `.env.example`. Read `env.X`, not `process.env.X`. Only `NEXT_PUBLIC_*` reaches the browser; this repo is public, so secrets live only in `.env.local` and Vercel → Settings → Environment Variables.
- **Auth tokens:** store in an httpOnly, secure cookie set by a Server Action or Route Handler. Read it with `cookies()` inside a component under `<Suspense>` and pass the token as an argument to `api()` / cached functions. Never put tokens in `localStorage` or `NEXT_PUBLIC_*`.

## Server Actions

- Server Actions are public endpoints: validate input with Zod `safeParse` on the server, never trust the client.
- **Return expected failures, don't throw them.** Use `ok(data)` / `fail("message")` from `@/lib/action-result`. In production Next.js replaces thrown error messages with a generic string, so users would never see your message.
- On the client, `unwrap(await action(input))` inside `mutationFn`, and show `errorMessage(error)` in the toast.

## Forms

- Native `<form>` + `FormData` + the feature's Zod schema (`safeParse`) + shadcn `Field`, `FieldLabel`, `FieldError`. The same schema is validated again in the Server Action. See `add-task-form.tsx`.
- Don't add a form library (react-hook-form etc.) unless a form has dynamic field arrays or many interdependent fields.

## Images

- `next/image` for every raster image: always set `width`/`height` (or `fill` + `sizes`) and a meaningful `alt` (`alt=""` if decorative). It serves AVIF → WebP automatically.
- Add `preload` only to the single LCP image above the fold (`priority` is deprecated in Next 16).
- Prefer static imports: put the file in `src/assets/`, then `import hero from "@/assets/hero.jpg"`. You get hashed, immutable caching and a free blur placeholder.
- Icons: `lucide-react`. Logos/illustrations: SVG (`next/image` serves `.svg` unoptimized automatically). If an SVG must follow `currentColor`, make it a small TSX component.
- Remote images: add the host to `images.remotePatterns` in `next.config.ts` first.
- Images that bypass `next/image` (CSS backgrounds, emails): put the original in `assets/images/`, run `npm run images`, use the generated `.avif`/`.webp` from `public/images/`.

## UI rules (anti-slop)

Build everything from shadcn components and theme tokens. The goal is a product that looks designed, not generated.

- **Tokens only.** Colors via `bg-background`, `text-muted-foreground`, `border`, `bg-primary`, etc. Brand colors are changed once in `globals.css` (`:root` and `.dark`). **ESLint enforces this:** palette colors (`bg-blue-500`), gradients (`bg-linear-to-r`) and arbitrary hex (`bg-[#7c3aed]`) fail `npm run check` outside `src/components/ui`. Fix the code, don't disable the rule; if a color is genuinely missing, add a token to `globals.css`.
- **Use the existing component before writing a new one.** Check `src/components/ui`; import `cn` from `@/lib/utils`.
- **No decorative AI defaults:** no gradient text, no glow blobs, no glassmorphism cards, no emoji as icons, no grid of three identical icon cards, no cards nested in cards, no colored left-border "accent" cards.
- **Hierarchy through type and spacing, not boxes.** One clear primary action per screen. Related items close, groups further apart. Body ~16px, line length ≤ 75ch (`max-w-prose`), headings `text-balance`.
- **Every async view has all states:** loading (skeleton with the final shape), empty (`Empty` component with a next action), error (message + retry), success. Disable or mark pending actions.
- **Accessibility:** semantic HTML, labels on every input (`Field` + `FieldLabel`), `aria-label` on icon-only buttons and links, visible focus (don't remove outlines), keyboard reachable, WCAG AA contrast in both themes.
- **Responsive & themes:** required on every screen, see [Responsive layout](#responsive-layout-required). Check both light and dark before calling UI done.
- **Motion:** short (150–250ms), purposeful (feedback, continuity), no bouncy easing on routine dialogs. `prefers-reduced-motion` is respected globally.
- **Copy:** English, specific and short. No marketing filler ("revolutionary", "seamless", "unlock"), avoid em-dash chains.
- Use `tabular-nums` for changing numbers. Format dates/numbers with `Intl.*` on the server with a fixed `timeZone`, or after hydration on the client, to avoid hydration mismatches.

## Responsive layout (required)

Every screen must work from **360px to 1440px+**. Judges and teammates will open the demo on their phones. Agents tend to build desktop-only layouts, so follow these rules from the first line of markup, not as a fix at the end.

- **Mobile-first.** Base classes describe the phone layout; add `sm:` / `md:` / `lg:` for larger screens. Never write a desktop layout and patch it later.
- **No horizontal page scroll at 360px.** No fixed widths (`w-[600px]`, `min-w-[...]` on layout blocks): use `w-full max-w-*`. Add `min-w-0` to flex/grid children that contain text, and `break-words` for user content.
- **Standard patterns:**
  - page container: `mx-auto w-full max-w-* px-4 sm:px-6`;
  - stack → row: `flex flex-col gap-4 sm:flex-row`;
  - grids: `grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3`;
  - header actions wrap: `flex flex-wrap gap-2`.
- **Navigation:** on mobile collapse into a `Sheet`. The shadcn `Sidebar` already does this.
- **Wide content:** wrap tables in `overflow-x-auto`, or render a card/list layout below `md`. Charts get a responsive container and fewer ticks on small screens.
- **Overlays:** prefer `Drawer` (bottom sheet) on mobile and `Dialog` on desktop for forms and menus. Prefer CSS breakpoints; use `useIsMobile()` from `@/hooks/use-mobile` only when the markup must differ.
- **Touch:** nothing may be reachable only on hover; anything revealed on hover must also work on tap and keyboard focus. Keep shadcn control sizes (they meet WCAG 2.2 target size); don't shrink them, and use `size="lg"` for the main action on mobile.
- **Inputs:** keep the shadcn input font size (`text-base md:text-sm`); smaller text makes iOS zoom in on focus.
- **Full-height layouts:** use `min-h-dvh` / `h-dvh`, not `h-screen` (`100vh` breaks with mobile browser toolbars).
- **Images:** responsive `next/image` needs a `sizes` prop that matches the layout (e.g. `sizes="(min-width: 768px) 50vw, 100vw"`).
- **Verify** in the browser at **375px, 768px and 1280px** (DevTools device toolbar) before calling a screen done.

## Skills

Project skills in `.claude/skills` (Claude Code) and `.agents/skills` (Codex, Cursor):

- `vercel-react-best-practices`: performance rules; apply when writing or reviewing React/Next code.
- `vercel-composition-patterns`: component API design (compound components instead of boolean props).
- `web-design-guidelines`: UI/a11y audit; run on finished screens.
- `deploy-to-vercel`: deployment help.
- `impeccable` (once installed): `/impeccable init` when the task is known, then `critique`, `audit`, `polish` on screens.

## Git & deploys

- Branches: `main` = production, `dev` = integration. Both change only through PRs.
- Flow: branch off `dev` (`feat/...`, `fix/...`) → PR into `dev` → **squash merge** after CI is green.
- Release: PR `dev` → `main`, merged with **"Create a merge commit"** (never squash, or `dev` and `main` histories diverge).
- Vercel: `main` → https://team5-ai.vercel.app, `dev` → https://team5-ai-dev.vercel.app, every PR gets a preview link in a PR comment.
- Small PRs, one feature each. Run `npm run check` before pushing.
