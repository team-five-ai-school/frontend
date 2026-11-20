# Team Five: frontend

Шаблон для хакатону: Next.js 16, shadcn/ui, TanStack Query, налаштовані кешування й оптимізація картинок, правила для AI-агентів.

## Старт

```bash
git clone https://github.com/team-five-ai-school/frontend.git
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Відкрийте http://localhost:3000. Потрібен Node 20.9+ (рекомендовано 24, див. `.nvmrc`).

## Команди

| Команда                        | Що робить                                               |
| ------------------------------ | ------------------------------------------------------- |
| `npm run dev`                  | dev-сервер                                              |
| `npm run check`                | lint + typecheck + prettier. Запускайте перед кожним PR |
| `npm run build`                | продакшн-збірка                                         |
| `npm run format`               | форматування (сортує Tailwind-класи)                    |
| `npm run images`               | `assets/images/*` → AVIF + WebP у `public/images/`      |
| `npx shadcn@latest add <name>` | додати shadcn-компонент                                 |

## Що всередині

- **Next.js 16** з Cache Components (`"use cache"`, `cacheLife`, `cacheTag`), Partial Prefetching, React Compiler, typed routes.
- **shadcn/ui** (Radix, стиль Nova) з ~30 компонентами в `src/components/ui`, світла/темна тема, toasts.
- **TanStack Query** з гідрацією із сервера й оптимістичними мутаціями.
- **Картинки:** `next/image` віддає AVIF → WebP, SVG без оптимізації, скрипт для попередньої конвертації.
- **SEO:** metadata, OG-картинка, `robots.txt`, `sitemap.xml`, SVG-фавікон.
- **UX-база:** skip-link, error/404 сторінки, skeleton-и, empty states, `prefers-reduced-motion`.
- **CI:** GitHub Actions (lint, typecheck, format, build) на кожен PR.

Референс усіх патернів даних: [`src/app/examples/tasks`](src/app/examples/tasks/page.tsx) + [`src/features/tasks`](src/features/tasks). Скопіюйте підхід, а потім видаліть приклад.

## Коли стане відома умова

1. `src/lib/site.ts`: назва, опис продукту.
2. Встановіть Impeccable і запустіть `/impeccable init` в агенті (див. нижче). Він створить `PRODUCT.md` і `DESIGN.md`, і всі агенти будуть генерувати UI в одному стилі.
3. `src/app/globals.css`: кольори бренду (`--primary` тощо в `:root` і `.dark`), шрифт у `src/lib/fonts.ts`.
4. Замініть `src/app/page.tsx` і видаліть `examples`.

## Робота з AI-агентами

Правила проєкту в [`AGENTS.md`](AGENTS.md) (Claude Code читає їх через `CLAUDE.md`). Там стек, патерни кешування й даних, правила для картинок і anti-slop правила для UI.

Скіли вже в репо (`.claude/skills`, `.agents/skills`):

- `vercel-react-best-practices`: продуктивність React/Next.
- `vercel-composition-patterns`: API компонентів.
- `web-design-guidelines`: аудит UI та доступності («review my UI»).
- `deploy-to-vercel`: деплой.

**Impeccable** ([impeccable.style](https://impeccable.style/)) дає дизайн-команди для агентів (`critique`, `audit`, `polish`, `distill`…) і детектор «AI slop». Встановлюється однією командою в корені репо:

```bash
npx impeccable install --providers=claude,codex,cursor --scope=project
```

Після цього перезапустіть агента й виконайте `/impeccable init`.

## Git-процес

- `main` — продакшн, `dev` — спільна гілка розробки. Обидві змінюються тільки через PR.
- Нова гілка від `dev` (`feat/...`, `fix/...`) → PR у `dev` → зелений CI → merge.
- Реліз: PR `dev` → `main`.

```bash
git switch dev && git pull
git switch -c feat/my-feature
# ... робота ...
npm run check
git push -u origin feat/my-feature   # і відкрити PR у dev
```

- Репозиторій публічний: **жодних секретів у коді**. Ключі тільки в `.env.local` і в Vercel → Settings → Environment Variables.

## Деплой

Vercel, підключений до цього репозиторію:

- `main` → продакшн-домен;
- `dev` → сталий dev-домен;
- кожен PR → окреме preview-посилання (Vercel пише його коментарем у PR).
