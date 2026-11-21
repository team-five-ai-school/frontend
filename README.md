# Team Five: frontend

Hackathon template: Next.js 16, shadcn/ui, TanStack Query, caching and image optimization set up, rules for AI coding agents.

- Production: https://team5-ai.vercel.app (`main`)
- Dev: https://team5-ai-dev.vercel.app (`dev`)

## Getting started

```bash
git clone https://github.com/team-five-ai-school/frontend.git
cd frontend
git switch dev
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Requires Node 24 (see `.nvmrc`; `nvm use` picks it up).

## Commands

| Command                        | What it does                                                       |
| ------------------------------ | ------------------------------------------------------------------ |
| `npm run dev`                  | Dev server                                                         |
| `npm run check`                | Lint + typecheck + Prettier. Run before every PR                   |
| `npm run build`                | Production build                                                   |
| `npm start`                    | Serve the production build (test caching here)                     |
| `npm run format`               | Format code (also sorts Tailwind classes)                          |
| `npm run icons`                | Regenerate PWA icons from the mark in `scripts/generate-icons.mjs` |
| `npm run images`               | `assets/images/*` → AVIF + WebP in `public/images/`                |
| `npx shadcn@latest add <name>` | Add a shadcn component (most are already installed)                |

## What's inside

- **Next.js 16** with Cache Components (`"use cache"`, `cacheLife`, `cacheTag`), Partial Prefetching, React Compiler, typed routes.
- **shadcn/ui** (Radix, Nova style): ~45 components in `src/components/ui`, light/dark theme, toasts.
- **TanStack Query** hydrated from the server, with optimistic mutations.
- **Backend wiring:** `api()` for server reads, `apiClient()` + `/api/backend/*` proxy for browser calls (auth cookie → Bearer token), validated env vars, a result type for Server Actions.
- **Images:** `next/image` serves AVIF → WebP, SVGs pass through, a script pre-converts originals.
- **SEO:** metadata, OG image, `robots.txt`, `sitemap.xml`, SVG favicon. Only production is indexable.
- **PWA (optional):** installable to the home screen; offered once in onboarding, never required.
- **UX baseline:** skip link, error/404 pages, skeletons, empty states, `prefers-reduced-motion`.
- **Guardrails:** ESLint fails on raw palette colors, gradients and hex values, so UI stays on theme tokens.
- **CI:** GitHub Actions (lint, typecheck, format, build) on every PR.

The reference for every data pattern is [`src/app/examples/tasks`](src/app/examples/tasks/page.tsx) + [`src/features/tasks`](src/features/tasks). Copy the approach, then delete the example.

## When the task is announced

1. Install Impeccable and run `/impeccable init` in your agent (see below). It writes `PRODUCT.md` and `DESIGN.md`, so every agent builds UI in one style.
2. `src/lib/site.ts`: product name, description, routes.
3. `src/app/globals.css`: brand colors (`--primary` etc. in `:root` and `.dark`); font in `src/lib/fonts.ts`.
4. Backend: set `API_URL` (and `API_KEY` if the backend still requires one) in `.env.local` and in Vercel → Settings → Environment Variables, then redeploy. See AGENTS.md → Backend, env and auth.
5. Replace `src/app/page.tsx` and delete `examples`.

## Product docs

- [`docs/spec.md`](docs/spec.md): product spec: features, AI components, API contract, data model, screens.
- [`docs/roadmap.md`](docs/roadmap.md): hybrid AI + code roadmap.
- [`content/`](content/): courses, course format, onboarding data.
- [`evals/`](evals/): test sets for every AI component.

## Working with AI agents

Project rules live in [`AGENTS.md`](AGENTS.md) (Claude Code reads it via `CLAUDE.md`): stack, caching and data patterns, backend and auth, images, anti-slop UI rules, and how to work in parallel without conflicts.

Skills already in the repo (`.claude/skills`, `.agents/skills`):

- `vercel-react-best-practices`: React/Next performance.
- `vercel-composition-patterns`: component APIs.
- `web-design-guidelines`: UI and accessibility audit ("review my UI").
- `deploy-to-vercel`: deployment.

**Impeccable** ([impeccable.style](https://impeccable.style/)) adds design commands for agents (`critique`, `audit`, `polish`, `distill`…) and an "AI slop" detector. Install it from the repo root:

```bash
npx impeccable install --providers=claude,codex,cursor --scope=project
```

Then restart your agent and run `/impeccable init`.

`.claude/settings.json` pre-approves safe commands (`npm run check`, `build`, `git diff`…) so Claude Code doesn't ask every time.

## Git workflow

- `main` is production, `dev` is the shared development branch. Both change only through PRs.
- Branch off `dev` (`feat/...`, `fix/...`) → PR into `dev` → green CI → **squash merge**.
- Release: PR `dev` → `main`, merged with **"Create a merge commit"**.

```bash
git switch dev && git pull
git switch -c feat/my-feature
# ... work ...
npm run check
git push -u origin feat/my-feature   # then open a PR into dev
```

- Shared files (`globals.css`, `package.json`, `src/components/ui`) change in small separate PRs. For a `package-lock.json` conflict, take the incoming version and run `npm install`.
- The repo is public: **no secrets in code**. Keys go only in `.env.local` and Vercel → Settings → Environment Variables.

## Deploys

Vercel is connected to this repo:

- `main` → https://team5-ai.vercel.app
- `dev` → https://team5-ai-dev.vercel.app
- every PR → its own preview link (Vercel posts it as a PR comment)

If a push or merge does not show up on Vercel:

- Vercel → project `team5` → Settings → Environments: **Preview** must track "All unassigned git branches" (not "Disabled"), and **Production** must track `main`.
- Redeploy manually: Vercel → Deployments → latest deployment of the branch → ⋯ → Redeploy.
- Build logs: Vercel → Deployments → the failed deployment → Build Logs. Check the same with `npm run build` locally.
