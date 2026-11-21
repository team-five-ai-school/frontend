import Link from "next/link";
import { Suspense } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { AccountMenu, AccountMenuSkeleton } from "@/features/auth/components/account-menu";
import { routes, siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center gap-4 px-4 sm:gap-6 sm:px-6">
        <Link href="/" className="shrink-0 font-heading font-semibold tracking-tight whitespace-nowrap">
          {siteConfig.name}
        </Link>
        <nav
          aria-label="Main"
          className="flex min-w-0 [scrollbar-width:none] items-center gap-3 overflow-x-auto text-sm whitespace-nowrap text-muted-foreground sm:gap-4"
        >
          {routes
            .filter((route) => route.nav)
            .map((route) => (
              <Link key={route.href} href={route.href} className="transition-colors hover:text-foreground">
                {route.label}
              </Link>
            ))}
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Suspense fallback={<AccountMenuSkeleton />}>
            <AccountMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
